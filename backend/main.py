from fastapi import FastAPI
from pydantic import BaseModel, EmailStr, Field


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
    return {"name": user.name,
            "email": user.email,
            "id": 1}
