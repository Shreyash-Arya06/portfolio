from sqlmodel import SQLModel, Field

class Library(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    title: str = Field(index=True, unique=True)
    author: str | None = Field(default=None)
    rating: float | None = Field(default=None)
    review: str | None = Field(default=None)
    image_url: str | None = Field(default=None)
    hidden: bool = Field(default=False)
    is_active: bool = Field(default=True)