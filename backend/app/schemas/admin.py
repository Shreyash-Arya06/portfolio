from typing import Annotated
from pydantic import BaseModel, EmailStr, ConfigDict, HttpUrl, StringConstraints

SafeName = Annotated[str, StringConstraints(strip_whitespace=True, min_length=1, max_length=100)]
SafePosition = Annotated[str, StringConstraints(strip_whitespace=True, min_length=1, max_length=150)]
SafeAbout = Annotated[str, StringConstraints(strip_whitespace=True, max_length=5000)]
SafePassword = Annotated[str, StringConstraints(strip_whitespace=True, min_length=6, max_length=12, pattern=r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@_]).+$")]

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: EmailStr | None = None

class AdminCreate(BaseModel):
    email: EmailStr
    password: SafePassword
    name: SafeName
    pos_line_1: SafePosition
    pos_line_2: SafeName | None = None
    orgs_name: SafeName
    about: SafeAbout | None = None
    resume_url: HttpUrl | None = None

class AdminUpdate(BaseModel):
    name: SafeName | None = None
    pos_line_1: SafePosition | None = None
    pos_line_2: SafePosition | None = None
    orgs_name: SafeName | None = None
    about: SafeAbout | None = None

class AdminChangeCredentials(BaseModel):
    email: EmailStr | None = None
    password: SafePassword | None = None

class AdminUpdateResume(BaseModel):
    resume_url: HttpUrl | None = None

class GetAdmin(BaseModel):
    name: str
    pos_line_1: str
    pos_line_2: str | None = None
    orgs_name: str
    about: str | None = None
    resume_url: HttpUrl | None = None

    model_config = ConfigDict(from_attributes=True)