from pydantic import BaseModel, ConfigDict

class CreateSkill(BaseModel):
    title: str

class GetSkill(BaseModel):
    id: int
    title: str
    order: int
    is_active: bool
    
    model_config = ConfigDict(from_attributes=True)

class UpdateTitle(BaseModel):
    title: str

class UpdateOrder(BaseModel):
    order: int