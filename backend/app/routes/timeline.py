from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select, col
from sqlalchemy import func

from app.database.db import get_session
from app.auth.auth import get_current_admin
from app.models.timeline import Timeline
from app.schemas.timeline import CreateTimelineEntry, UpdateTimelineEntry, GetTimelineEntry

router = APIRouter(prefix="/timeline", tags=["timeline"])

@router.post(
    "/new",
    response_model=GetTimelineEntry,
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(get_current_admin)]
)
async def create_timeline_entry(
        timeline_data: CreateTimelineEntry,
        session: AsyncSession = Depends(get_session)
):
    result = await session.execute(
        select(Timeline)
        .where(Timeline.title == timeline_data.title)
    )
    existing_entry = result.scalars().first()
    if existing_entry:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Timeline entry already exists."
        )

    new_entry = Timeline(**timeline_data.model_dump())

    session.add(new_entry)
    await session.commit()
    await session.refresh(new_entry)

    return new_entry

@router.get(
    "",
    response_model=list[GetTimelineEntry],
    status_code=status.HTTP_200_OK
)
async def get_timeline_entries(
        session: AsyncSession = Depends(get_session)
):
    result = await session.execute(
        select(Timeline)
        .order_by(col(Timeline.year), col(Timeline.month))
    )

    return result.scalars().all()

@router.delete(
    "/{timeline_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    dependencies=[Depends(get_current_admin)]
)
async def delete_timeline_entry(
        timeline_id: int,
        session: AsyncSession = Depends(get_session)
):
    entry = await session.get(Timeline, timeline_id)
    if not entry:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Timeline entry not found."
        )

    await session.delete(entry)
    await session.commit()

@router.patch(
    "/{timeline_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    dependencies=[Depends(get_current_admin)]
)
async def update_timeline_entry(
        timeline_id: int,
        new_data: UpdateTimelineEntry,
        session: AsyncSession = Depends(get_session)
):
    entry = await session.get(Timeline, timeline_id)
    if not entry:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Timeline entry not found."
        )

    update_data = new_data.model_dump(exclude_unset=True)

    if "title" in update_data:
        conflict_result = await session.execute(
            select(Timeline)
            .where(Timeline.title == update_data["title"],
                   Timeline.id != timeline_id)
        )

        if conflict_result.scalars().first():
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Another timeline entry with this title already exists."
            )

    for key, value in update_data.items():
        setattr(entry, key, value)

    session.add(entry)
    await session.commit()