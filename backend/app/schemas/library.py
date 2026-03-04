from pydantic import BaseModel, ConfigDict

class CreateLibEntry(BaseModel):
    title: str
    author: str | None = None
    rating: float | None = None
    review: str | None = None
    image_url: str | None = None
    is_visible: bool = True
    is_active: bool = True

class UpdateLibEntry(BaseModel):
    title: str | None = None
    author: str | None = None
    rating: float | None = None
    review: str | None = None
    image_url: str | None = None
    is_visible: bool | None = None
    is_active: bool | None = None

class GetLibEntry(BaseModel):
    id: int
    title: str
    author: str | None = None
    rating: float | None = None
    review: str | None = None
    image_url: str | None = None
    is_visible: bool
    is_active: bool

    model_config = ConfigDict(from_attributes=True)