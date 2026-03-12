from pydantic import BaseModel, ConfigDict, Field

class CreateTimelineEntry(BaseModel):
    month: int = Field(ge=1, le=12)
    year: int
    title: str
    sub_title: str | None = None

class UpdateTimelineEntry(BaseModel):
    month: int | None = Field(default=None, ge=1, le=12)
    year: int | None = None
    title: str | None = None
    sub_title: str | None = None

class GetTimelineEntry(BaseModel):
    id: int
    month: int
    year: int
    title: str
    sub_title: str | None = None

    model_config = ConfigDict(from_attributes=True)