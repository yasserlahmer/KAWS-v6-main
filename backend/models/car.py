from pydantic import BaseModel, Field, ConfigDict
from typing import List, Dict, Optional
from datetime import datetime

class CarDescription(BaseModel):
    fr: str
    en: str
    ar: str

class Car(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str
    model: str
    brand: str
    year: int
    price_per_day: int
    currency: str = "DH"
    seats: int
    transmission: str
    fuel: str
    category: str
    quantity: int
    image: str
    gallery: List[str]
    features: List[str]
    description: CarDescription

class CarCreate(BaseModel):
    model: str
    brand: str
    year: int
    price_per_day: int
    currency: str = "DH"
    seats: int
    transmission: str
    fuel: str
    category: str
    quantity: int
    image: str
    gallery: List[str]
    features: List[str]
    description: Dict[str, str]
