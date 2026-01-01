"""
Vercel Serverless API Entry Point for KAWS CAR
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
from pathlib import Path
import sys

# Add parent directory to path for imports
sys.path.insert(0, str(Path(__file__).parent.parent))

from routes.cars import setup_car_routes
from routes.bookings import setup_booking_routes

# Create FastAPI app
app = FastAPI(title="KAWS CAR API", version="1.0.0")

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
db_name = os.environ.get('DB_NAME', 'test_database')
client = AsyncIOMotorClient(mongo_url)
db = client[db_name]

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],  # Configure with your Vercel domain
    allow_methods=["*"],
    allow_headers=["*"],
)

# Setup routes
car_router = setup_car_routes(db)
app.include_router(car_router, prefix="/api")

booking_router = setup_booking_routes(db)
app.include_router(booking_router, prefix="/api")

# Root endpoint
@app.get("/api")
async def root():
    return {"message": "KAWS CAR API - Running on Vercel", "status": "online"}

# Health check
@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "database": "connected"}

# For Vercel serverless
handler = app
