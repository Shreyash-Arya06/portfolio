from pydantic import BaseModel, ConfigDict

class CreateCategory(BaseModel):
    category: str

class UpdateCategory(BaseModel):
    category: str

class UpdateVisibility(BaseModel):
    is_visible: bool

class UpdateOrder(BaseModel):
    order: int

class GetCategory(BaseModel):
    id: int
    category: str
    order: int
    is_visible: bool

    model_config = ConfigDict(from_attributes=True)