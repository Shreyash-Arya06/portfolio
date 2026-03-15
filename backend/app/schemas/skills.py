from typing import Annotated
from pydantic import BaseModel, ConfigDict, StringConstraints, Field

SafeTitle = Annotated[str, StringConstraints(strip_whitespace=True, min_length=1, max_length=100)]

class CreateSkill(BaseModel):
    title: SafeTitle

class GetSkill(BaseModel):
    id: int
    title: str
    order: int
    
    model_config = ConfigDict(from_attributes=True)

class UpdateTitle(BaseModel):
    title: SafeTitle

class SwapOrder(BaseModel):
    id: int = Field(gt=0)