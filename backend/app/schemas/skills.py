from pydantic import BaseModel, ConfigDict

class CreateSkill(BaseModel):
    title: str

class GetSkill(BaseModel):
    id: int
    title: str
    order: int
    
    model_config = ConfigDict(from_attributes=True)

class UpdateTitle(BaseModel):
    title: str

class UpdateOrder(BaseModel):
    order: int