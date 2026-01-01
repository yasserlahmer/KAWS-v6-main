from fastapi import APIRouter, HTTPException
from typing import List
from motor.motor_asyncio import AsyncIOMotorDatabase
from models.booking import Booking, BookingCreate, BookingResponse
from services.email_service_gmail import send_booking_notification
from datetime import datetime, timezone
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/bookings", tags=["bookings"])

def setup_booking_routes(db: AsyncIOMotorDatabase):
    @router.post("", response_model=BookingResponse)
    async def create_booking(booking_input: BookingCreate):
        """
        Create a new booking
        """
        try:
            # Check if car exists
            car = await db.cars.find_one({"id": booking_input.car_id}, {"_id": 0})
            if not car:
                raise HTTPException(status_code=404, detail="Car not found")
            
            # Parse dates
            try:
                pickup_date = datetime.fromisoformat(booking_input.pickup_date.replace('Z', '+00:00'))
                return_date = datetime.fromisoformat(booking_input.return_date.replace('Z', '+00:00'))
            except ValueError:
                raise HTTPException(status_code=400, detail="Invalid date format")
            
            # Validate dates
            if return_date <= pickup_date:
                raise HTTPException(status_code=400, detail="Return date must be after pickup date")
            
            # Create booking object
            booking_dict = booking_input.model_dump()
            booking_dict['pickup_date'] = pickup_date
            booking_dict['return_date'] = return_date
            
            booking = Booking(**booking_dict)
            
            # Convert to dict and serialize datetimes for MongoDB
            doc = booking.model_dump()
            doc['pickup_date'] = doc['pickup_date'].isoformat()
            doc['return_date'] = doc['return_date'].isoformat()
            doc['created_at'] = doc['created_at'].isoformat()
            
            # Insert into database
            await db.bookings.insert_one(doc)
            
            logger.info(f"Created booking: {booking.id} for car: {booking.car_id}")
            
            # Send email notification to support team (non-blocking)
            try:
                await send_booking_notification(doc, car)
                logger.info(f"Email notification sent for booking: {booking.id}")
            except Exception as email_error:
                logger.error(f"Failed to send email notification: {str(email_error)}")
                # Don't fail the booking if email fails
            
            return BookingResponse(
                id=booking.id,
                status=booking.status,
                created_at=booking.created_at,
                message="Booking created successfully"
            )
            
        except HTTPException:
            raise
        except Exception as e:
            logger.error(f"Error creating booking: {str(e)}")
            raise HTTPException(status_code=500, detail=f"Error creating booking: {str(e)}")
    
    @router.get("", response_model=List[Booking])
    async def get_bookings():
        """
        Get all bookings
        """
        try:
            bookings = await db.bookings.find({}, {"_id": 0}).to_list(1000)
            
            # Convert ISO string timestamps back to datetime objects
            for booking in bookings:
                if isinstance(booking.get('pickup_date'), str):
                    booking['pickup_date'] = datetime.fromisoformat(booking['pickup_date'])
                if isinstance(booking.get('return_date'), str):
                    booking['return_date'] = datetime.fromisoformat(booking['return_date'])
                if isinstance(booking.get('created_at'), str):
                    booking['created_at'] = datetime.fromisoformat(booking['created_at'])
            
            logger.info(f"Retrieved {len(bookings)} bookings")
            return bookings
            
        except Exception as e:
            logger.error(f"Error fetching bookings: {str(e)}")
            raise HTTPException(status_code=500, detail="Error fetching bookings")
    
    @router.get("/{booking_id}", response_model=Booking)
    async def get_booking(booking_id: str):
        """
        Get a specific booking by ID
        """
        try:
            booking = await db.bookings.find_one({"id": booking_id}, {"_id": 0})
            
            if not booking:
                raise HTTPException(status_code=404, detail="Booking not found")
            
            # Convert ISO strings to datetime
            if isinstance(booking.get('pickup_date'), str):
                booking['pickup_date'] = datetime.fromisoformat(booking['pickup_date'])
            if isinstance(booking.get('return_date'), str):
                booking['return_date'] = datetime.fromisoformat(booking['return_date'])
            if isinstance(booking.get('created_at'), str):
                booking['created_at'] = datetime.fromisoformat(booking['created_at'])
            
            logger.info(f"Retrieved booking: {booking_id}")
            return booking
            
        except HTTPException:
            raise
        except Exception as e:
            logger.error(f"Error fetching booking {booking_id}: {str(e)}")
            raise HTTPException(status_code=500, detail="Error fetching booking")
    
    return router
