from sqlmodel import SQLModel, Field

class Library(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    title: str = Field(index=True, unique=True)
    author: str | None = Field(default=None)
    rating: float | None = Field(default=None)
    review: str | None = Field(default=None)
    image_url: str | None = Field(default=None)
    is_visible: bool = Field(default=True)