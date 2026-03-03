from typing import List, Optional
from sqlmodel import SQLModel, Field, Relationship
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy import Column, String

class Project(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    title: str = Field(index=True, unique=True)
    keywords: List[str] = Field(default_factory=list, sa_column=Column(ARRAY(String)))
    description: str | None = Field(default=None)
    image_url: str | None = Field(default=None)
    order: int = Field(unique=True)
    is_visible: bool = Field(default=True)
    is_active: bool = Field(default=True)
    category_id: int = Field(foreign_key="categories.id")

    category: Optional["Categories"] = Relationship(back_populates="projects")
