"""
Vercel Serverless API Entry Point for KAWS CAR
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime
import os

# Create FastAPI app
app = FastAPI(
    title="KAWS CAR API",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json"
)

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
db_name = os.environ.get('DB_NAME', 'kawscar')
client = None
db = None

def get_db():
    global client, db
    if client is None:
        client = AsyncIOMotorClient(mongo_url)
        db = client[db_name]
    return db

# CORS configuration
cors_origins = os.environ.get('CORS_ORIGINS', '*')
origins = cors_origins.split(',') if cors_origins != '*' else ['*']

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class CarDescription(BaseModel):
    fr: str = ""
    en: str = ""
    ar: str = ""

class Car(BaseModel):
    id: Optional[str] = None
    model: str
    brand: str
    year: int
    price_per_day: float
    currency: str = "DH"
    seats: int
    transmission: str
    fuel: str
    category: str
    quantity: int = 1
    image: str
    gallery: List[str] = []
    features: List[str] = []
    description: CarDescription = CarDescription()

class BookingCreate(BaseModel):
    full_name: str
    email: EmailStr
    phone: str
    car_id: str
    pickup_date: str
    return_date: str
    pickup_location: str
    message: Optional[str] = ""

class Booking(BookingCreate):
    id: Optional[str] = None
    status: str = "pending"
    created_at: Optional[datetime] = None

# Root endpoint
@app.get("/api")
async def root():
    return {"message": "KAWS CAR API - Running on Vercel", "status": "online"}

# Health check
@app.get("/api/health")
async def health_check():
    try:
        db = get_db()
        await db.command('ping')
        return {"status": "healthy", "database": "connected"}
    except Exception as e:
        return {"status": "unhealthy", "database": "disconnected", "error": str(e)}

# Cars endpoints
@app.get("/api/cars")
async def get_cars():
    try:
        db = get_db()
        cars = []
        cursor = db.cars.find({})
        async for car in cursor:
            car['id'] = str(car.pop('_id'))
            cars.append(car)
        return cars
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/cars/{car_id}")
async def get_car(car_id: str):
    try:
        from bson import ObjectId
        db = get_db()
        car = await db.cars.find_one({"_id": ObjectId(car_id)})
        if not car:
            raise HTTPException(status_code=404, detail="Car not found")
        car['id'] = str(car.pop('_id'))
        return car
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Bookings endpoints
@app.post("/api/bookings")
async def create_booking(booking: BookingCreate):
    try:
        db = get_db()
        booking_dict = booking.model_dump()
        booking_dict['status'] = 'pending'
        booking_dict['created_at'] = datetime.utcnow()

        result = await db.bookings.insert_one(booking_dict)
        booking_dict['id'] = str(result.inserted_id)
        del booking_dict['_id'] if '_id' in booking_dict else None

        # Send email notification (optional)
        try:
            await send_booking_email(booking_dict)
        except Exception as email_error:
            print(f"Email sending failed: {email_error}")

        return booking_dict
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/bookings")
async def get_bookings():
    try:
        db = get_db()
        bookings = []
        cursor = db.bookings.find({})
        async for booking in cursor:
            booking['id'] = str(booking.pop('_id'))
            bookings.append(booking)
        return bookings
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/bookings/{booking_id}")
async def get_booking(booking_id: str):
    try:
        from bson import ObjectId
        db = get_db()
        booking = await db.bookings.find_one({"_id": ObjectId(booking_id)})
        if not booking:
            raise HTTPException(status_code=404, detail="Booking not found")
        booking['id'] = str(booking.pop('_id'))
        return booking
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Email service
async def send_booking_email(booking: dict):
    resend_api_key = os.environ.get('RESEND_API_KEY')
    sender_email = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
    support_email = os.environ.get('SUPPORT_EMAIL')

    if not resend_api_key or not support_email:
        return

    try:
        import resend
        resend.api_key = resend_api_key

        resend.Emails.send({
            "from": sender_email,
            "to": [support_email],
            "subject": f"Nouvelle réservation - {booking.get('full_name', 'Client')}",
            "html": f"""
            <h2>Nouvelle réservation KAWS CAR</h2>
            <p><strong>Nom:</strong> {booking.get('full_name')}</p>
            <p><strong>Email:</strong> {booking.get('email')}</p>
            <p><strong>Téléphone:</strong> {booking.get('phone')}</p>
            <p><strong>Voiture ID:</strong> {booking.get('car_id')}</p>
            <p><strong>Date de prise en charge:</strong> {booking.get('pickup_date')}</p>
            <p><strong>Date de retour:</strong> {booking.get('return_date')}</p>
            <p><strong>Lieu de prise en charge:</strong> {booking.get('pickup_location')}</p>
            <p><strong>Message:</strong> {booking.get('message', 'Aucun')}</p>
            """
        })
    except Exception as e:
        print(f"Resend email error: {e}")

# For Vercel serverless
handler = app
