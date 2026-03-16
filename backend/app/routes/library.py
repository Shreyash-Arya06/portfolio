import os
import httpx
from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.ext.asyncio.session import AsyncSession
from sqlmodel import select, col

from app.database.db import get_session
from app.auth.auth import get_current_admin
from app.models.library import Library
from app.schemas.library import CreateLibEntry, UpdateLibEntry, GetLibEntry, UpdateLibEntryVisibility

router = APIRouter(prefix="/library", tags=["library"])

@router.post(
    "/new",
    response_model=GetLibEntry,
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(get_current_admin)]
)
async def create_new_library(
        entry_data: CreateLibEntry,
        auto_fetch: bool = False,
        session: AsyncSession = Depends(get_session)
):
    if auto_fetch:
        try:
            async with httpx.AsyncClient() as client:
                search_query = f"intitle:{entry_data.title}"
                if entry_data.author:
                    search_query += f"+inauthor:{entry_data.author}"

                google_api_key = os.getenv("GOOGLE_BOOKS_API_KEY")

                search_params = {
                    "q": search_query,
                    "maxResults": 1
                }
                if google_api_key:
                    search_params["key"] = google_api_key

                google_url = "https://www.googleapis.com/books/v1/volumes"
                response = await client.get(
                    google_url,
                    params=search_params
                )

                if response.status_code != 200:
                    raise HTTPException(
                        status_code=status.HTTP_502_BAD_GATEWAY,
                        detail=f"Google Books API error: {response.status_code} - {response.text}"
                    )

                data = response.json()
                if "items" not in data or len(data["items"]) == 0:
                    raise HTTPException(
                        status_code=status.HTTP_404_NOT_FOUND,
                        detail="Auto-fetch failed: Could not find a book matching those details."
                    )

                volume_info = data["items"][0].get("volumeInfo", {})

                fetched_title = volume_info.get("title")
                if fetched_title:
                    entry_data.title = fetched_title

                fetched_authors = volume_info.get("authors")
                if fetched_authors:
                    entry_data.author = ", ".join(fetched_authors)

                fetched_image_links = volume_info.get("imageLinks", {})
                thumbnail = fetched_image_links.get("thumbnail")
                if thumbnail:
                    entry_data.image_url = thumbnail.replace("http://", "https://")
        except httpx.RequestError:
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="Could not connect to Google Books API. Please check server network."
            )

    query = select(Library).where(Library.title == entry_data.title)
    if entry_data.author:
        query = query.where(Library.author == entry_data.author)
    else:
        query = query.where(col(Library.author).is_(None))

    result = await session.execute(query)
    if result.scalars().first():
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"This book already exists."
        )

    new_book = Library(**entry_data.model_dump(exclude_unset=True, mode='json'))
    session.add(new_book)
    await session.commit()
    await session.refresh(new_book)

    return new_book

@router.get(
    "",
    response_model=list[GetLibEntry],
    status_code=status.HTTP_200_OK
)
async def get_all_books(
        session: AsyncSession = Depends(get_session)
):
    result = await session.execute(
        select(Library)
        .order_by(col(Library.rating).desc())
    )

    return result.scalars().all()

@router.delete(
    "/{entry_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    dependencies=[Depends(get_current_admin)]
)
async def delete_library_entry(
        entry_id: int,
        session: AsyncSession = Depends(get_session)
):
    entry = await session.get(Library, entry_id)
    if not entry:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Library entry does not exist."
        )

    await session.delete(entry)
    await session.commit()

@router.patch(
    "/{entry_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    dependencies=[Depends(get_current_admin)]
)
async def update_library_entry(
        entry_id: int,
        updated_data: UpdateLibEntry,
        session: AsyncSession = Depends(get_session)
):
    entry = await session.get(Library, entry_id)
    if not entry:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Library entry does not exist."
        )

    new_data = updated_data.model_dump(exclude_unset=True, mode='json')
    if "title" in new_data:
        conflict_result = await session.execute(
            select(Library)
            .where(Library.title == new_data["title"])
        )
        if conflict_result.scalars().first():
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="This book already exists."
            )

    for key, value in new_data.items():
        setattr(entry, key, value)

    session.add(entry)
    await session.commit()

@router.patch(
    "/update-visibility/{entry_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    dependencies=[Depends(get_current_admin)]
)
async def update_library_visibility(
        entry_id: int,
        visibility: UpdateLibEntryVisibility,
        session: AsyncSession = Depends(get_session)
):
    entry = await session.get(Library, entry_id)
    if not entry:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Library entry does not exist."
        )

    if entry.is_visible == visibility.is_visible:
        return

    entry.is_visible = visibility.is_visible
    session.add(entry)
    await session.commit()