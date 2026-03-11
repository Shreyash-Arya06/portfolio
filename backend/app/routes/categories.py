from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.testing.pickleable import Order
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select
from sqlalchemy import func

from app.database.db import get_session
from app.auth.auth import get_current_admin
from app.models.admin import Admin
from app.models.categories import Categories
from app.schemas.categories import CreateCategory, UpdateCategory, UpdateVisibility, UpdateOrder, GetCategory

router = APIRouter(prefix="/categories", tags=["categories"])

@router.post(
    "/new",
    response_model=GetCategory,
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(get_current_admin)]
)
async def create_category(
        new_category: CreateCategory,
        session: AsyncSession = Depends(get_session),
):
    result = await session.execute(
        select(Categories)
        .where(Categories.category == new_category.category)
    )
    existing_category = result.scalars().first()

    if existing_category:
        if existing_category.is_active:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Category already exists",
            )
        else:
            existing_category.is_active = True
            session.add(existing_category)
            await session.commit()
            await session.refresh(existing_category)

            return existing_category

    order_result = await session.execute(
        select(func.max(Categories.order))
    )
    max_order = order_result.scalar()
    next_order = (max_order or 0) + 1
    created_category = Categories(category=new_category.category, order=next_order)
    session.add(created_category)
    await session.commit()
    await session.refresh(created_category)

    return created_category

@router.get(
    "",
    response_model=list[GetCategory],
    status_code=status.HTTP_200_OK
)
async def get_categories(
        session: AsyncSession = Depends(get_session),
):
    result = await session.execute(
        select(Categories)
        .where(Categories.is_active == True)
        .order_by(Categories.order)
    )

    return result.scalars().all()

@router.delete(
    "/{id}",
    status_code=status.HTTP_204_NO_CONTENT,
    dependencies=[Depends(get_current_admin)]
)
async def delete_category(
        id: int,
        session: AsyncSession = Depends(get_session),
):
    result = await session.get(Categories, id)
    if not result or not result.is_active:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category does not exist.",
        )

    result.is_active = False
    session.add(result)
    await session.commit()

@router.patch(
    "/update-category/{id}",
    status_code=status.HTTP_204_NO_CONTENT,
    dependencies=[Depends(get_current_admin)]
)
async def update_category(
        id: int,
        new_category: UpdateCategory,
        session: AsyncSession = Depends(get_session)
):
    category = await session.get(Categories, id)
    if not category or not category.is_active:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category does not exist.",
        )

    conflicting_category = await session.execute(
        select(Categories)
        .where(Categories.category == new_category.category)
    )
    if conflicting_category.scalars().first():
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Category already exists.",
        )

    category.category = new_category.category
    session.add(category)
    await session.commit()

@router.patch(
    "/update-order/{id}",
    status_code=status.HTTP_204_NO_CONTENT,
    dependencies=[Depends(get_current_admin)]
)
async def update_order(
        id: int,
        updated_order: UpdateOrder,
        session: AsyncSession = Depends(get_session)
):
    category = await session.get(Categories, id)
    if not category or not category.is_active:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category does not exist.",
        )

    if category.order == updated_order.order:
        return

    result = await session.execute(
        select(Categories)
        .where(Categories.order == updated_order.order)
    )
    conflicting_category = result.scalars().first()
    if conflicting_category:
        original_order = category.order
        conflicting_category.order = 0
        session.add(conflicting_category)
        await session.flush()

        category.order = updated_order.order
        session.add(category)
        await session.flush()

        conflicting_category.order = original_order
        session.add(conflicting_category)
    else:
        category.order = updated_order.order
        session.add(category)

    await session.commit()

@router.patch(
    "update-visibility/{id}",
    status_code=status.HTTP_204_NO_CONTENT,
    dependencies=[Depends(get_current_admin)]
)
async def update_visibility(
        id: int,
        updated_visibility: UpdateVisibility,
        session: AsyncSession = Depends(get_session)
):
    category = await session.get(Categories, id)
    if not category or not category.is_active:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category does not exist.",
        )

    if category.is_visible == updated_visibility.is_visible:
        return

    category.is_visible = updated_visibility.is_visible
    session.add(category)
    await session.commit()