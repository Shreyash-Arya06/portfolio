from fastapi import APIRouter, Depends, status, HTTPException
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select
from sqlalchemy import func

from app.database.db import get_session
from app.auth.auth import get_current_admin
from app.models.categories import Categories
from app.schemas.categories import CreateCategory, UpdateCategory, UpdateVisibility, SwapOrder, GetCategory

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
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Category already exists",
        )

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
        .order_by(Categories.order)
    )

    return result.scalars().all()

@router.delete(
    "/{category_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    dependencies=[Depends(get_current_admin)]
)
async def delete_category(
        category_id: int,
        session: AsyncSession = Depends(get_session),
):
    result = await session.get(Categories, category_id)
    if not result:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category does not exist.",
        )
    await session.delete(result)
    await session.commit()

@router.patch(
    "/update-category/{category_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    dependencies=[Depends(get_current_admin)]
)
async def update_category(
        category_id: int,
        new_category: UpdateCategory,
        session: AsyncSession = Depends(get_session)
):
    category = await session.get(Categories, category_id)
    if not category:
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
    "/swap-order/{category_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    dependencies=[Depends(get_current_admin)]
)
async def update_order(
        category_id: int,
        swap_data: SwapOrder,
        session: AsyncSession = Depends(get_session)
):
    if category_id == swap_data.id:
        return

    category_1 = await session.get(Categories, category_id)
    category_2 = await session.get(Categories, swap_data.id)
    if not category_1 or not category_2:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Either category does not exist.",
        )

    order_1 = category_1.order
    order_2 = category_2.order

    category_1.order = 0
    session.add(category_1)
    await session.flush()

    category_2.order = order_1
    session.add(category_2)
    await session.flush()

    category_1.order = order_2
    session.add(category_1)

    await session.commit()

@router.patch(
    "update-visibility/{category_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    dependencies=[Depends(get_current_admin)]
)
async def update_visibility(
        category_id: int,
        updated_visibility: UpdateVisibility,
        session: AsyncSession = Depends(get_session)
):
    category = await session.get(Categories, category_id)
    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category does not exist.",
        )

    if category.is_visible == updated_visibility.is_visible:
        return

    category.is_visible = updated_visibility.is_visible
    session.add(category)
    await session.commit()