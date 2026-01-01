from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import Optional
from datetime import datetime, timezone
import uuid

class Booking(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    full_name: str
    email: EmailStr
    phone: str
    car_id: str
    pickup_date: datetime
    return_date: datetime
    pickup_location: str
    message: Optional[str] = None
    status: str = "pending"  # pending, confirmed, cancelled
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class BookingCreate(BaseModel):
    full_name: str
    email: EmailStr
    phone: str
    car_id: str
    pickup_date: str  # Will be converted to datetime
    return_date: str  # Will be converted to datetime
    pickup_location: str
    message: Optional[str] = None

class BookingResponse(BaseModel):
    id: str
    status: str
    created_at: datetime
    message: str = "Booking created successfully"
