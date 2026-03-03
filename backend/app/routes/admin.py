from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from app.database.db import get_session
from app.auth.auth import verify_password, create_access_token, get_current_admin
from app.models.admin import Admin
from app.schemas.admin import Token

router = APIRouter(tags=["admin"])

@router.post("/auth/login", response_model=Token)
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    session: AsyncSession = Depends(get_session)
):
    result = await session.execute(select(Admin).where(Admin.username == form_data.username))
    admin = result.scalars().first()

    if not admin or not verify_password(form_data.password, admin.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(data={"sub": admin.username})
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/admin/dashboard")
async def admin_dashboard(current_admin: Admin = Depends(get_current_admin)):
    return {"message": f"Welcome back, {current_admin.username}. Here is your secret data."}