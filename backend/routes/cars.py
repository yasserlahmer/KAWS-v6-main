from fastapi import APIRouter, HTTPException
from typing import List
from motor.motor_asyncio import AsyncIOMotorDatabase
from models.car import Car
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/cars", tags=["cars"])

def setup_car_routes(db: AsyncIOMotorDatabase):
    @router.get("", response_model=List[Car])
    async def get_cars():
        """
        Get all cars from the database
        """
        try:
            cars = await db.cars.find({}, {"_id": 0}).to_list(1000)
            logger.info(f"Retrieved {len(cars)} cars from database")
            return cars
        except Exception as e:
            logger.error(f"Error fetching cars: {str(e)}")
            raise HTTPException(status_code=500, detail="Error fetching cars")
    
    @router.get("/{car_id}", response_model=Car)
    async def get_car(car_id: str):
        """
        Get a specific car by ID
        """
        try:
            car = await db.cars.find_one({"id": car_id}, {"_id": 0})
            
            if not car:
                logger.warning(f"Car not found: {car_id}")
                raise HTTPException(status_code=404, detail="Car not found")
            
            logger.info(f"Retrieved car: {car_id}")
            return car
        except HTTPException:
            raise
        except Exception as e:
            logger.error(f"Error fetching car {car_id}: {str(e)}")
            raise HTTPException(status_code=500, detail="Error fetching car")
    
    return router
