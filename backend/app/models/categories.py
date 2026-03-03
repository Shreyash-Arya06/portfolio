from sqlmodel import SQLModel, Field, Relationship
from typing import List
from projects import Project

class Categories(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    category: str = Field(index=True)
    is_visible: bool = Field(default=True)
    is_active: bool = Field(default=True)
    order: int = Field(unique=True)

    projects: List["Project"] = Relationship(back_populates="category")