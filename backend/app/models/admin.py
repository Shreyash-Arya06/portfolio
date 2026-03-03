from datetime import datetime, timezone
from sqlmodel import SQLModel, Field
from sqlalchemy import Column, DateTime, func


class Admin(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    email: str = Field(index=True, unique=True)
    password: str | None = Field(default=None)
    auth_provider: str = Field(default="local")
    name: str = Field()
    pos_line_1: str = Field()
    pos_line_2: str | None = Field(default=None)
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