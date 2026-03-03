from sqlmodel import SQLModel, Field

class Skills(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    title: str = Field(index=True, unique=True)
    order: int = Field(unique=True)
    is_active: bool = Field(default=True)