from pydantic import BaseModel, ConfigDict

class CreateTimelineEntry(BaseModel):
    month: int
    year: int
    title: str
    sub_title: str | None = None
    is_active: bool = True

class UpdateTimelineEntry(BaseModel):
    month: int | None = None
    year: int | None = None
    title: str | None = None
    sub_title: str | None = None
    is_active: bool | None = None

class GetTimelineEntry(BaseModel):
    id: int
    month: int
    year: int
    title: str
    sub_title: str | None = None
    is_active: bool

    model_config = ConfigDict(from_attributes=True)