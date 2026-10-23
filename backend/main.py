from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr, Field
from sqlmodel import Session, select

from db import engine
from accounts.models import User
from accounts.security import hash_password, verify_password


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
def login(user: LoginRequest):
    email = user.email.lower()
    with Session(engine) as session:
        existing_user = session.exec(select(User).where(User.email == email)).first()
        if existing_user is None:
            raise HTTPException(status_code=401, detail="Invalid email or password")
        elif not verify_password(user.password, existing_user.password_hash):
            raise HTTPException(status_code=401, detail="Invalid email or password")
        else:
            return {"message": "Credentials verified"}


