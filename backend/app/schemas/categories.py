from typing import Annotated
from pydantic import BaseModel, ConfigDict, StringConstraints, Field

SafeCategoryName = Annotated[str, StringConstraints(strip_whitespace=True, min_length=1, max_length=100)]

class CreateCategory(BaseModel):
    category: SafeCategoryName

class UpdateCategory(BaseModel):
    category: SafeCategoryName

class UpdateVisibility(BaseModel):
    is_visible: bool

class SwapOrder(BaseModel):
    id: int = Field(gt=0)

class GetCategory(BaseModel):
    id: int
    category: str
    order: int
    is_visible: bool

    model_config = ConfigDict(from_attributes=True)