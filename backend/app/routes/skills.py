from fastapi import APIRouter, Depends, status, HTTPException
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select
from sqlalchemy import func

from app.database.db import get_session
from app.auth.auth import get_current_admin
from app.models.skills import Skills
from app.schemas.skills import CreateSkill, GetSkill, UpdateTitle, SwapOrder

router = APIRouter(prefix="/skills", tags=["skills_management"])

@router.post(
    "/new",
    response_model=GetSkill,
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(get_current_admin)]
)
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
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Skill already exists."
        )

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

@router.get(
    "",
    response_model=list[GetSkill],
    status_code=status.HTTP_200_OK
)
async def get_skills(
        session: AsyncSession = Depends(get_session)
):
    result = await session.execute(
        select(Skills)
        .order_by(Skills.order)
    )

    return result.scalars().all()

@router.delete(
    "/{skill_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    dependencies=[Depends(get_current_admin)]
)
async def delete_skill(
        skill_id: int,
        session: AsyncSession = Depends(get_session)
):
    skill = await session.get(Skills, skill_id)
    if not skill:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Skill does not exist."
        )

    await session.delete(skill)
    await session.commit()

@router.patch(
    "/update-title/{skill_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    dependencies=[Depends(get_current_admin)]
)
async def update_skill(
        skill_id: int,
        skill_title: UpdateTitle,
        session: AsyncSession = Depends(get_session)
):
    skill = await session.get(Skills, skill_id)
    if not skill:
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

@router.patch(
    "/swap-order/{skill_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    dependencies=[Depends(get_current_admin)]
)
async def update_skill_order(
        skill_id: int,
        swap_data: SwapOrder,
        session: AsyncSession = Depends(get_session)
):
    if skill_id == swap_data.id:
        return

    skill_1 = await session.get(Skills, skill_id)
    skill_2 = await session.get(Skills, swap_data.id)
    if not skill_1 or not skill_2:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Either skills does not exist."
        )

    order_1 = skill_1.order
    order_2 = skill_2.order

    skill_1.order = 0
    session.add(skill_1)
    await session.flush()

    skill_2.order = order_1
    session.add(skill_2)
    await session.flush()

    skill_1.order = order_2
    session.add(skill_1)

    await session.commit()