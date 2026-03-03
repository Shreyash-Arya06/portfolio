from fastapi import FastAPI

from app.database.db import init_db
from app.routes import admin

app = FastAPI()

# Database Setup (Create Tables on Startup)
@app.on_event("startup")
async def on_startup():
    await init_db()

app.include_router(admin.router)