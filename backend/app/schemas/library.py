from typing import Annotated
from pydantic import BaseModel, ConfigDict, Field, StringConstraints, HttpUrl

SafeName = Annotated[str, StringConstraints(strip_whitespace=True, min_length=1, max_length=255)]
SafeReview = Annotated[str, StringConstraints(strip_whitespace=True, min_length=1, max_length=5000)]

class CreateLibEntry(BaseModel):
    title: SafeName
    author: SafeName | None = None
    rating: float = Field(ge=0.0, le=5.0)
    review: SafeReview | None = None
    image_url: HttpUrl | None = None
    is_visible: bool = True

class UpdateLibEntry(BaseModel):
    title: SafeName | None = None
    author: SafeName | None = None
    rating: float | None = Field(default=None, ge=0.0, le=5.0)
    review: SafeReview | None = None
    image_url: HttpUrl | None = None

class GetLibEntry(BaseModel):
    id: int
    title: str
    author: str | None = None
    rating: float | None = None
    review: str | None = None
    image_url: str | None = None
    is_visible: bool

    model_config = ConfigDict(from_attributes=True)

class UpdateLibEntryVisibility(BaseModel):
    is_visible: bool