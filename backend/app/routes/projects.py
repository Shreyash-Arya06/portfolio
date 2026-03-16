from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.ext.asyncio.session import AsyncSession
from sqlmodel import select
from sqlalchemy import func

from app.database.db import get_session
from app.auth.auth import get_current_admin
from app.models.projects import Project
from app.models.categories import Categories
from app.schemas.projects import CreateProject, UpdateProject, GetProject, SwapOrder, UpdateVisibility

router = APIRouter(prefix="/projects", tags=["projects"])

@router.post(
    "/new",
    response_model=GetProject,
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(get_current_admin)]
)
async def add_project(
        project_data: CreateProject,
        session: AsyncSession = Depends(get_session)
):
    if project_data.category_id is not None:
        category = await session.get(Categories, project_data.category_id)
        if not category:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="The specified category does not exist."
            )

    result = await session.execute(
        select(Project)
        .where(Project.title == project_data.title)
    )

    if result.scalars().first():
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Project with same title already exists."
        )

    order_result = await session.execute(
        select(func.max(Project.order))
    )
    max_order = order_result.scalar()
    next_order = (max_order or 0) + 1
    new_project = Project(**project_data.model_dump(exclude_unset=True))
    new_project.order = next_order

    session.add(new_project)
    await session.commit()
    await session.refresh(new_project)

    return new_project

@router.get(
    "",
    response_model=list[GetProject],
    status_code=status.HTTP_200_OK,
)
async def get_projects(
        session: AsyncSession = Depends(get_session)
):
    result = await session.execute(
        select(Project)
        .order_by(Project.order)
    )

    return result.scalars().all()

@router.delete(
    "/{project_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    dependencies=[Depends(get_current_admin)]
)
async def delete_project(
        project_id: int,
        session: AsyncSession = Depends(get_session)
):
    project = await session.get(Project, project_id)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project does not exist."
        )

    await session.delete(project)
    await session.commit()

@router.patch(
    "/{project_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    dependencies=[Depends(get_current_admin)]
)
async def update_project(
        project_id: int,
        update_data: UpdateProject,
        session: AsyncSession = Depends(get_session)
):
    project = await session.get(Project, project_id)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project does not exist."
        )

    new_data = update_data.model_dump(exclude_unset=True, mode='json')
    if "category_id" in new_data and new_data["category_id"] is not None:
        category = await session.get(Categories, new_data["category_id"])
        if not category:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="The specified category does not exist."
            )

    if "title" in new_data:
        conflict_result = await session.execute(
            select(Project)
            .where(Project.title == new_data["title"], Project.id != project.id)
        )
        if conflict_result.scalars().first():
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Another project with this title already exists."
            )

    for key, value in new_data.items():
        setattr(project, key, value)

    session.add(project)
    await session.commit()

@router.patch(
    "/swap-order/{project_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    dependencies=[Depends(get_current_admin)]
)
async def swap_order(
        project_id: int,
        id_2_data: SwapOrder,
        session: AsyncSession = Depends(get_session)
):
    if project_id == id_2_data.project_2_id:
        return

    project_1 = await session.get(Project, project_id)
    project_2 = await session.get(Project, id_2_data.project_2_id)
    if not project_1 or not project_2:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Either of the projects do not exist."
        )

    order_1 = project_1.order
    order_2 = project_2.order

    project_1.order = 0
    session.add(project_1)
    await session.flush()

    project_2.order = order_1
    session.add(project_2)
    await session.flush()

    project_1.order = order_2
    session.add(project_1)

    await session.commit()

@router.patch(
    "/update-visibility/{project_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    dependencies=[Depends(get_current_admin)]
)
async def update_visibility(
        project_id: int,
        visibility_data: UpdateVisibility,
        session: AsyncSession = Depends(get_session)
):
    project = await session.get(Project, project_id)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project does not exist."
        )

    if project.is_visible == visibility_data.is_visible:
        return

    project.is_visible = visibility_data.is_visible
    session.add(project)
    await session.commit()