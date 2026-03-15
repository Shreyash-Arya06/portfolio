from pydantic import BaseModel, ConfigDict

class CreateProject(BaseModel):
    title: str
    keywords: list[str] = []
    description: str | None = None
    image_url: str | None = None
    order: int
    is_visible: bool = True
    category_id: int

class UpdateProject(BaseModel):
    title: str | None = None
    keywords: list[str] | None = None
    description: str | None = None
    image_url: str | None = None
    category_id: int | None = None

class GetProject(BaseModel):
    id: int
    title: str
    keywords: list[str]
    description: str | None = None
    image_url: str | None = None
    order: int
    is_visible: bool
    category_id: int

    model_config = ConfigDict(from_attributes=True)

class SwapOrder(BaseModel):
    project_2_id: int

class UpdateVisibility(BaseModel):
    is_visible: bool