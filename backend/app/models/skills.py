from sqlmodel import SQLModel, Field

class Skills(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    title: str = Field(index=True, unique=True)
    order: int = Field(unique=True)