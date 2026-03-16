from fastapi import FastAPI

from app.database.db import init_db
from app.routes import admin
from app.routes import manage_admin
from app.routes import skills
from app.routes import categories
from app.routes import timeline
from app.routes import projects
from app.routes import library

app = FastAPI()

# Database Setup (Create Tables on Startup)
@app.on_event("startup")
async def on_startup():
    await init_db()

app.include_router(admin.router)

app.include_router(manage_admin.router)

app.include_router(skills.router)

app.include_router(categories.router)

app.include_router(timeline.router)

app.include_router(projects.router)

app.include_router(library.router)