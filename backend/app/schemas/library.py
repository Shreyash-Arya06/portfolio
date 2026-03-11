from pydantic import BaseModel, ConfigDict

class CreateLibEntry(BaseModel):
    title: str
    author: str | None = None
    rating: float | None = None
    review: str | None = None
    image_url: str | None = None
    is_visible: bool = True

class UpdateLibEntry(BaseModel):
    title: str | None = None
    author: str | None = None
    rating: float | None = None
    review: str | None = None
    image_url: str | None = None
    is_visible: bool | None = None

class GetLibEntry(BaseModel):
    id: int
    title: str
    author: str | None = None
    rating: float | None = None
    review: str | None = None
    image_url: str | None = None
    is_visible: bool

    model_config = ConfigDict(from_attributes=True)