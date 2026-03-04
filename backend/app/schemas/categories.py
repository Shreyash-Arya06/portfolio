from pydantic import BaseModel, ConfigDict

class CreateCategory(BaseModel):
    category: str
    order: int

class UpdateCategory(BaseModel):
    category: str | None = None
    is_visible: bool | None = None
    is_active: bool | None = None
    order: int | None = None

class GetCategory(BaseModel):
    id: int
    category: str
    order: int
    is_active: bool
    is_visible: bool

    model_config = ConfigDict(from_attributes=True)