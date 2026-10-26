from fastapi import FastAPI, HTTPException, Response, Cookie
from pydantic import BaseModel, EmailStr, Field
from sqlmodel import Session, select
from datetime import datetime, timedelta, UTC
from typing import Annotated

from db import engine
from accounts.models import User, LoginSession
from accounts.security import hash_password, verify_password, generate_session_token, hash_session_token


class RegisterRequest(BaseModel):
    name: str
    email: EmailStr
    password: str = Field(min_length=8)


class RegisterResponse(BaseModel):
    id: int
    name: str
    email: EmailStr

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

app = FastAPI()


@app.get("/api/health")
def health():
    return {"status": "ok"}

@app.post("/api/register", response_model=RegisterResponse, status_code=201, responses={409: {"description": "Email already registered"}})
def register(user: RegisterRequest):
    email = user.email.lower()
    with Session(engine) as session:
        existing_user = session.exec(select(User).where(User.email == email)).first()
        if existing_user is not None:
            raise HTTPException(status_code=409, detail="Email already registered")
        else:
            db_user = User(name = user.name,
                        email = email,
                        password_hash = hash_password(user.password))
            session.add(db_user)
            session.commit()
            session.refresh(db_user)
            return {"name": db_user.name,
                    "email": db_user.email,
                    "id": db_user.id}

@app.post("/api/login", responses={401: {"description": "Invalid email or password"}})
def login(user: LoginRequest, response: Response):
    email = user.email.lower()
    with Session(engine) as session:
        existing_user = session.exec(select(User).where(User.email == email)).first()
        if existing_user is None:
            raise HTTPException(status_code=401, detail="Invalid email or password")
        elif not verify_password(user.password, existing_user.password_hash):
            raise HTTPException(status_code=401, detail="Invalid email or password")
        else:
            token = generate_session_token()
            token_hash = hash_session_token(token)
            login_session = LoginSession(user_id=existing_user.id,
                                         token_hash=token_hash,
                                         expires_at=datetime.now(UTC) + timedelta(hours=1))
            session.add(login_session)
            session.commit()
            response.set_cookie(key="session_token", value=token, max_age=3600, path="/", secure=False, httponly=True,samesite="lax")
            return {"message": "Credentials verified"}
            
@app.get("/api/me", response_model=RegisterResponse, responses={401: {"description": "Not authenticated"}})
def user_check(session_token: Annotated[str | None, Cookie()] = None):
    if session_token is None:
        raise HTTPException(status_code=401, detail="Not authenticated")
    else:
        hashed_session_token = hash_session_token(session_token)
        with Session(engine) as session:
            login_session = session.exec(select(LoginSession).where(LoginSession.token_hash == hashed_session_token)).first()
            if login_session is None:
                raise HTTPException(status_code=401, detail="Not authenticated")
            if login_session.expires_at.replace(tzinfo=UTC) <= datetime.now(UTC):
                raise HTTPException(status_code=401, detail="Not authenticated")
            current_user = session.exec(select(User).where(User.id == login_session.user_id)).first()
            if current_user is None:
                raise HTTPException(status_code=401, detail="Not authenticated")
            return {"name": current_user.name,
                    "email": current_user.email,
                    "id": current_user.id}

@app.post("/api/logout")
def logout(response: Response, session_token: Annotated[str | None, Cookie()] = None):
    if session_token is not None:
        hashed_session_token = hash_session_token(session_token)
        with Session(engine) as session:
            login_session = session.exec(select(LoginSession).where(LoginSession.token_hash == hashed_session_token)).first()
            if login_session is not None:
                session.delete(login_session)
                session.commit()
    response.delete_cookie(key="session_token", path="/")
    return {"message": "Logged out"}