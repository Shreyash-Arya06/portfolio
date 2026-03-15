from typing import Annotated
from pydantic import BaseModel, ConfigDict, Field, StringConstraints

SafeTitle = Annotated[str, StringConstraints(strip_whitespace=True, min_length=1, max_length=100)]
SafeSubTitle = Annotated[str, StringConstraints(strip_whitespace=True, min_length=1, max_length=150)]

class CreateTimelineEntry(BaseModel):
    month: int = Field(ge=1, le=12)
    year: int = Field(ge=1950, le=2100)
    title: SafeTitle
    sub_title: SafeSubTitle | None = None

class UpdateTimelineEntry(BaseModel):
    month: int | None = Field(default=None, ge=1, le=12)
    year: int | None = Field(default=None, ge=1950, le=2100)
    title: SafeTitle | None = None
    sub_title: SafeSubTitle | None = None

class GetTimelineEntry(BaseModel):
    id: int
    month: int
    year: int
    title: str
    sub_title: str | None = None

    model_config = ConfigDict(from_attributes=True)