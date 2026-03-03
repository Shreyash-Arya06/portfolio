from datetime import datetime, timezone
from typing import Optional
from sqlmodel import SQLModel, Field
from sqlalchemy import Column, DateTime, func


class Admin(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    email: str = Field(index=True, unique=True)
    hashed_password: str | None = Field(default=None)
    auth_provider: str = Field(default="local")

    name: str = Field()
    pose_line_1: str = Field()
    pose_line_2: str | None = Field(default=None)
    orgs_name: str = Field()
    about: str | None = Field(default=None)
    resume_url: str | None = Field(default=None)
    updated_at: datetime | None = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        sa_column=Column(
            DateTime(timezone=True),
            server_default=func.now(),
            onupdate=func.now()
        )
    )