from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.db import init_db
from app.routes import admin
from app.routes import manage_admin
from app.routes import skills
from app.routes import categories
from app.routes import timeline
from app.routes import projects
from app.routes import library

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database Setup
@app.on_event("startup")
async def on_startup():
    await init_db()

# Routers
app.include_router(admin.router)

app.include_router(manage_admin.router)

app.include_router(skills.router)

app.include_router(categories.router)

app.include_router(timeline.router)

app.include_router(projects.router)

app.include_router(library.router)