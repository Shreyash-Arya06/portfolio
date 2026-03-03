from pydantic import BaseModel, ConfigDict

class CreateSkill(BaseModel):
    title: str
    order: int

class GetSkill(BaseModel):
    id: int
    title: str
    order: int
    is_active: bool
    
    model_config = ConfigDict(from_attributes=True)

class UpdateSkill(BaseModel):
    title: str | None = None
    is_active: bool | None = None
    order: int | None = None