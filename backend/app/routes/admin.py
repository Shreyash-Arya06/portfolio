import os
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from pydantic import BaseModel
from google.oauth2 import id_token
from google.auth.transport import requests
from app.database.db import get_session
from app.auth.auth import verify_password, create_access_token, get_current_admin
from app.models.admin import Admin
from app.schemas.admin import Token

router = APIRouter(tags=["admin_auth"])

class GoogleToken(BaseModel):
    token: str

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")

@router.post("/auth/login", response_model=Token)
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    session: AsyncSession = Depends(get_session)
):
    result = await session.execute(select(Admin).where(Admin.email == form_data.username))
    admin = result.scalars().first()

    if not admin or not verify_password(form_data.password, admin.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(data={"sub": admin.email})
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/auth/google", response_model=Token)
async def google_login(
    token_data: GoogleToken,
    session: AsyncSession = Depends(get_session)
):
    try:
        id_info = id_token.verify_oauth2_token(
            token_data.token, requests.Request(), GOOGLE_CLIENT_ID
        )

        google_email = id_info.get("email")
        if not google_email:
            raise HTTPException(status_code=400, detail="No email provided by Google")

        result = await session.execute(select(Admin).where(Admin.email == google_email))
        admin = result.scalars().first()

        if not admin:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Access denied. Admin account does not exist."
            )
        access_token = create_access_token(data={"sub": admin.email})
        return {"access_token": access_token, "token_type": "bearer"}
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Google token"
        )

@router.get("/admin/dashboard")
async def admin_dashboard(current_admin: Admin = Depends(get_current_admin)):
    return {"message": f"Welcome back, {current_admin.email}. Here is your secret data."}