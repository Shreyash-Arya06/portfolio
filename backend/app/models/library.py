from sqlmodel import SQLModel, Field
from sqlalchemy import Column, Text

class Library(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    title: str = Field(index=True, unique=True)
    author: str | None = Field(default=None)
    rating: float | None = Field(default=None)
    review: str | None = Field(default=None, sa_column=Column(Text))
    image_url: str | None = Field(default=None, sa_column=Column(Text))
    is_visible: bool = Field(default=True)