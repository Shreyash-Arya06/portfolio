from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel.ext.asyncio.session import AsyncSession

from app.database.db import get_session
from app.auth.auth import get_current_admin, get_password_hash
from app.models.admin import Admin
from app.schemas.admin import GetAdmin, AdminUpdate, AdminChangeCredentials, AdminUpdateResume

router = APIRouter(prefix="/admin", tags=["admin_management"])

@router.get("/me", response_model=GetAdmin, status_code=status.HTTP_200_OK)
async def get_my_profile(current_admin = Depends(get_current_admin)):
    return current_admin

@router.patch("/me", status_code=status.HTTP_204_NO_CONTENT)
async def update_my_profile(
        update_data: AdminUpdate,
        current_admin: Admin = Depends(get_current_admin),
        session: AsyncSession = Depends(get_session)
):
    update_dict = update_data.model_dump(exclude_unset=True)

    if not update_dict:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No data provided to update.")

    for key, value in update_dict.items():
        setattr(current_admin, key, value)

    session.add(current_admin)
    await session.commit()

@router.patch("/me/resume", status_code=status.HTTP_204_NO_CONTENT)
async def update_my_resume(
        resume_data: AdminUpdateResume,
        current_admin: Admin = Depends(get_current_admin),
        session: AsyncSession = Depends(get_session)
):
    current_admin.resume_url = resume_data.resume_url
    session.add(current_admin)
    await session.commit()

@router.patch("/me/credentials", status_code=status.HTTP_204_NO_CONTENT)
async def update_my_credentials(
        credentials: AdminChangeCredentials,
        current_admin: Admin = Depends(get_current_admin),
        session: AsyncSession = Depends(get_session)
):
    update_dict = credentials.model_dump(exclude_unset=True)

    if not update_dict:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No credentials provided to update.")

    if "password" in update_dict:
        update_dict["password"] = get_password_hash(update_dict["password"])

    for key, value in update_dict.items():
        setattr(current_admin, key, value)

    session.add(current_admin)
    await session.commit()