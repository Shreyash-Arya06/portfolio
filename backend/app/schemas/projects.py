from pydantic import BaseModel, ConfigDict

class CreateProject(BaseModel):
    title: str
    keywords: list[str] = []
    description: str | None = None
    image_url: str | None = None
    order: int
    is_visible: bool = True
    is_active: bool = True
    category_id: int

class UpdateProject(BaseModel):
    title: str | None = None
    keywords: list[str] | None = None
    description: str | None = None
    image_url: str | None = None
    order: int | None = None
    is_visible: bool | None = None
    is_active: bool | None = None
    category_id: int | None = None

class GetProject(BaseModel):
    id: int
    title: str
    keywords: list[str]
    description: str | None = None
    image_url: str | None = None
    order: int
    is_visible: bool
    is_active: bool
    category_id: int

    model_config = ConfigDict(from_attributes=True)