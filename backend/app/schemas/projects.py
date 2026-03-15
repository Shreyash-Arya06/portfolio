from typing import Annotated
from pydantic import BaseModel, ConfigDict, HttpUrl, Field, StringConstraints

SafeTitle = Annotated[str, StringConstraints(strip_whitespace=True, min_length=1, max_length=255)]
SafeKeyword = Annotated[str, StringConstraints(strip_whitespace=True, max_length=100)]
SafeDescription = Annotated[str, StringConstraints(strip_whitespace=True, max_length=5000)]
class CreateProject(BaseModel):
    title: SafeTitle
    keywords: list[SafeKeyword] = Field(default_factory=list, max_length=10)
    description: SafeDescription | None = None
    image_url: HttpUrl | None = None
    is_visible: bool = True
    category_id: int = Field(gt=0)

class UpdateProject(BaseModel):
    title: SafeTitle | None = None
    keywords: list[SafeKeyword] | None = Field(default_factory=list, max_length=10)
    description: SafeDescription | None = None
    image_url: HttpUrl | None = None
    category_id: int | None = Field(default=None, gt=0)

class GetProject(BaseModel):
    id: int
    title: str
    keywords: list[str]
    description: str | None = None
    image_url: HttpUrl | None = None
    order: int
    is_visible: bool
    category_id: int

    model_config = ConfigDict(from_attributes=True)

class SwapOrder(BaseModel):
    project_2_id: int = Field(gt=0)

class UpdateVisibility(BaseModel):
    is_visible: bool