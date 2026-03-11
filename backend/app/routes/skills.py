from fastapi import APIRouter, Depends, status, HTTPException
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select
from sqlalchemy import func

from app.database.db import get_session
from app.auth.auth import get_current_admin
from app.models.admin import Admin
from app.models.skills import Skills
from app.schemas.skills import CreateSkill, GetSkill, UpdateTitle, UpdateOrder

router = APIRouter(prefix="/skills", tags=["skills_management"])

@router.post("", response_model=GetSkill, status_code=status.HTTP_200_OK, dependencies=[Depends(get_current_admin)])
async def add_skill(
        skill_data: CreateSkill,
        session: AsyncSession = Depends(get_session)
):
    result = await session.execute(
        select(Skills)
        .where(Skills.title == skill_data.title)
    )
    existing_skill = result.scalars().first()

    if existing_skill:
        if existing_skill.is_active:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Skill already exists."
            )
        else:
            existing_skill.is_active = True
            session.add(existing_skill)
            await session.commit()
            await session.refresh(existing_skill)

            return existing_skill

    order_result = await session.execute(
        select(func.max(Skills.order))
    )
    max_order = order_result.scalar()
    next_order = (max_order or 0) + 1
    new_skill = Skills(title=skill_data.title, order=next_order)
    session.add(new_skill)
    await session.commit()
    await session.refresh(new_skill)

    return new_skill

@router.get("", response_model=list[GetSkill], status_code=status.HTTP_200_OK)
async def get_skills(
        session: AsyncSession = Depends(get_session)
):
    result = await session.execute(
        select(Skills)
        .where(Skills.is_active == True)
        .order_by(Skills.order)
    )

    return result.scalars().all()

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT, dependencies=[Depends(get_current_admin)])
async def delete_skill(
        id: int,
        session: AsyncSession = Depends(get_session)
):
    skill = await session.get(Skills, id)
    if not skill or not skill.is_active:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Skill does not exist."
        )

    skill.is_active = False

    session.add(skill)
    await session.commit()

@router.patch("/update-title/{skill_id}", status_code=status.HTTP_200_OK, dependencies=[Depends(get_current_admin)])
async def update_skill(
        skill_id: int,
        skill_title: UpdateTitle,
        session: AsyncSession = Depends(get_session)
):
    skill = await session.get(Skills, skill_id)
    if not skill or not skill.is_active:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Skill does not exist."
        )

    conflict_result = await session.execute(
        select(Skills)
        .where(Skills.title == skill_title.title)
    )
    if conflict_result.scalars().first():
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="This skill already exists."
        )
    
    skill.title = skill_title.title

    session.add(skill)
    await session.commit()

    return {"message": "Skill updated."}

@router.patch("/update-order/{skill_id}", status_code=status.HTTP_204_NO_CONTENT, dependencies=[Depends(get_current_admin)])
async def update_skill_order(
        skill_id: int,
        skill_order: UpdateOrder,
        session: AsyncSession = Depends(get_session)
):
    skill = await session.get(Skills, skill_id)
    if not skill or not skill.is_active:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Skill does not exist."
        )

    if skill.order == skill_order.order:
        return

    conflict_result = await session.execute(
        select(Skills)
        .where(Skills.order == skill_order.order)
    )
    conflict_skill = conflict_result.scalars().first()
    if conflict_skill:
        original_order = skill.order
        conflict_skill.order = 0
        session.add(conflict_skill)
        await session.flush()
        skill.order = skill_order.order
        session.add(skill)
        await session.flush()
        conflict_skill.order = original_order
        session.add(conflict_skill)
    else:
        skill.order = skill_order.order
        session.add(skill)

    await session.commit()