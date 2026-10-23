from fastapi import FastAPI
from pydantic import BaseModel, EmailStr, Field
from sqlmodel import Session

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


@app.post("/api/register", response_model=RegisterResponse)
def register(user: RegisterRequest):
    db_user = User(name = user.name,
                   email = user.email,
                   password_hash = hash_password(user.password))
    with Session(engine) as session:
        session.add(db_user)
        session.commit()
        session.refresh(db_user)
        return {"name": db_user.name,
                "email": db_user.email,
                "id": db_user.id}
