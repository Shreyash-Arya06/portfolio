from pydantic import BaseModel, EmailStr, ConfigDict

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: str | None = None

class AdminCreate(BaseModel):
    email: EmailStr
    password: str
    name: str
    pos_line_1: str
    pos_line_2: str | None = None
    orgs_name: str
    about: str | None = None
    resume_url: str | None = None

class AdminUpdate(BaseModel):
    name: str | None = None
    pos_line_1: str | None = None
    pos_line_2: str | None = None
    orgs_name: str | None = None
    about: str | None = None

class AdminChangeCredentials(BaseModel):
    email: EmailStr | None = None
    password: str | None = None

class AdminUpdateResume(BaseModel):
    resume_url: str | None = None

class GetAdmin(BaseModel):
    name: str
    pos_line_1: str
    pos_line_2: str | None = None
    orgs_name: str
    about: str | None = None
    resume_url: str | None = None

    model_config = ConfigDict(from_attributes=True)