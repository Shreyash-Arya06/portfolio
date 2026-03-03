import os
from sqlmodel import SQLModel
from sqlalchemy.ext.asyncio import create_async_engine
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

load_dotenv()

# 1. Connection Setup
DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_async_engine(
    DATABASE_URL,
    echo=False,
    future=True,
    connect_args={"statement_cache_size": 0}
)


# 2. Session Generator
async def get_session() -> AsyncSession:
    async_session = sessionmaker(
        engine, class_=AsyncSession, expire_on_commit=False
    )
    async with async_session() as session:
        yield session


# 3. Table Creation Logic (Standard Pattern)
async def init_db():
    async with engine.begin() as conn:
        # 👇 IMPORTANT: Import all your models here!
        # This registers them with SQLModel.metadata before we create tables.
        from app.models.admin import Admin
        # from app.models.projects import Project  <-- Add future models here

        # This creates tables ONLY if they don't exist
        await conn.run_sync(SQLModel.metadata.create_all)