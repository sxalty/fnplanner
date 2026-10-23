from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr, Field
from sqlmodel import Session, select

from db import engine
from accounts.models import User
from accounts.security import hash_password


class RegisterRequest(BaseModel):
    name: str
    email: EmailStr
    password: str = Field(min_length=8)


class RegisterResponse(BaseModel):
    id: int
    name: str
    email: EmailStr

app = FastAPI()


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.post("/api/register", response_model=RegisterResponse, status_code=201)
def register(user: RegisterRequest):
    with Session(engine) as session:
        existing_user = session.exec(select(User).where(User.email == user.email)).first()
        if existing_user is not None:
            raise HTTPException(status_code=409, detail="Email already registered")
        else:
            db_user = User(name = user.name,
                        email = user.email,
                        password_hash = hash_password(user.password))
            session.add(db_user)
            session.commit()
            session.refresh(db_user)
            return {"name": db_user.name,
                    "email": db_user.email,
                    "id": db_user.id}
