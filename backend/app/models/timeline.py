from sqlmodel import SQLModel, Field

class Timeline(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    month: int = Field()
    year: int = Field()
    title: str = Field(index=True, unique=True)
    sub_title: str | None = Field()
    is_active: bool = Field(default=True)