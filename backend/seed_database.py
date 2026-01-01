"""
Script to seed the MongoDB database with initial car data from the frontend mock
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Car data from frontend mock.js
CARS_DATA = [
    {
        "id": "clio-5-2025",
        "model": "Clio 5",
        "brand": "Renault",
        "year": 2025,
        "price_per_day": 300,
        "currency": "DH",
        "seats": 5,
        "transmission": "manual",
        "fuel": "essence",
        "category": "compact",
        "quantity": 2,
        "image": "/cars/clio-megane.jpg",
        "gallery": ["/cars/clio-megane.jpg"],
        "features": ["Climatisation", "Bluetooth", "USB", "Direction assistée"],
        "description": {
            "fr": "La Renault Clio 5 est la voiture citadine parfaite pour vos déplacements urbains. Économique et confortable.",
            "en": "The Renault Clio 5 is the perfect city car for your urban trips. Economical and comfortable.",
            "ar": "رينو كليو 5 هي السيارة المثالية للتنقل في المدينة. اقتصادية ومريحة."
        }
    },
    {
        "id": "accent-2025",
        "model": "Accent",
        "brand": "Hyundai",
        "year": 2025,
        "price_per_day": 350,
        "currency": "DH",
        "seats": 5,
        "transmission": "auto",
        "fuel": "essence",
        "category": "berline",
        "quantity": 4,
        "image": "/cars/accent-new.jpg",
        "gallery": ["/cars/accent-new.jpg", "/cars/accent.jpg"],
        "features": ["Climatisation", "Bluetooth", "Caméra de recul", "Régulateur de vitesse"],
        "description": {
            "fr": "La Hyundai Accent allie élégance et praticité. Idéale pour les trajets quotidiens et les voyages.",
            "en": "The Hyundai Accent combines elegance and practicality. Ideal for daily commutes and travel.",
            "ar": "هيونداي أكسنت تجمع بين الأناقة والعملية. مثالية للتنقل اليومي والسفر."
        }
    },
    {
        "id": "megane-2025",
        "model": "Megane",
        "brand": "Renault",
        "year": 2025,
        "price_per_day": 450,
        "currency": "DH",
        "seats": 5,
        "transmission": "auto",
        "fuel": "diesel",
        "category": "berline",
        "quantity": 1,
        "image": "/cars/megane2.jpg",
        "gallery": ["/cars/megane2.jpg", "/cars/megane.jpg"],
        "features": ["Climatisation bi-zone", "GPS intégré", "Sièges chauffants", "Bluetooth"],
        "description": {
            "fr": "La Renault Megane offre confort et technologie avancée. Parfaite pour les longs trajets.",
            "en": "The Renault Megane offers comfort and advanced technology. Perfect for long journeys.",
            "ar": "رينو ميغان توفر الراحة والتكنولوجيا المتقدمة. مثالية للرحلات الطويلة."
        }
    },
    {
        "id": "touareg-vw",
        "model": "Touareg",
        "brand": "Volkswagen",
        "year": 2024,
        "price_per_day": 800,
        "currency": "DH",
        "seats": 5,
        "transmission": "auto",
        "fuel": "diesel",
        "category": "suv",
        "quantity": 1,
        "image": "/cars/touareg.jpg",
        "gallery": ["/cars/touareg.jpg"],
        "features": ["4x4", "Toit panoramique", "Cuir", "GPS", "Caméra 360°"],
        "description": {
            "fr": "Le Volkswagen Touareg est le SUV premium par excellence. Puissance et luxe réunis.",
            "en": "The Volkswagen Touareg is the ultimate premium SUV. Power and luxury combined.",
            "ar": "فولكس فاجن طوارق هي السيارة الرياضية الفاخرة بامتياز. القوة والفخامة معاً."
        }
    },
    {
        "id": "golf-8",
        "model": "Golf 8",
        "brand": "Volkswagen",
        "year": 2024,
        "price_per_day": 600,
        "currency": "DH",
        "seats": 5,
        "transmission": "auto",
        "fuel": "diesel",
        "category": "compact",
        "quantity": 1,
        "image": "/cars/golf8.png",
        "gallery": ["/cars/golf8.png"],
        "features": ["Système multimédia", "LED Matrix", "Aide au stationnement", "ACC"],
        "description": {
            "fr": "La Golf 8 représente l'excellence allemande. Sportive, élégante et technologique.",
            "en": "The Golf 8 represents German excellence. Sporty, elegant and technological.",
            "ar": "غولف 8 تمثل التميز الألماني. رياضية وأنيقة وتكنولوجية."
        }
    },
    {
        "id": "q8-2024",
        "model": "Q8",
        "brand": "Audi",
        "year": 2024,
        "price_per_day": 1600,
        "currency": "DH",
        "seats": 5,
        "transmission": "auto",
        "fuel": "diesel",
        "category": "suv-premium",
        "quantity": 1,
        "image": "https://images.unsplash.com/photo-1655284615415-b52cb3c2f8aa?w=800&auto=format&fit=crop",
        "gallery": ["https://images.unsplash.com/photo-1655284615415-b52cb3c2f8aa?w=800&auto=format&fit=crop"],
        "features": ["Quattro", "Virtual Cockpit", "Bang & Olufsen", "Massage", "Night Vision"],
        "description": {
            "fr": "L'Audi Q8 incarne le luxe absolu. Une expérience de conduite exceptionnelle.",
            "en": "The Audi Q8 embodies absolute luxury. An exceptional driving experience.",
            "ar": "أودي Q8 تجسد الفخامة المطلقة. تجربة قيادة استثنائية."
        }
    },
    {
        "id": "peugeot-2008",
        "model": "2008",
        "brand": "Peugeot",
        "year": 2024,
        "price_per_day": 350,
        "currency": "DH",
        "seats": 5,
        "transmission": "auto",
        "fuel": "diesel",
        "category": "suv-compact",
        "quantity": 1,
        "image": "https://images.unsplash.com/photo-1566421740474-8456c6840c71?w=800&auto=format&fit=crop",
        "gallery": ["https://images.unsplash.com/photo-1566421740474-8456c6840c71?w=800&auto=format&fit=crop"],
        "features": ["i-Cockpit", "Caméra de recul", "CarPlay", "Android Auto"],
        "description": {
            "fr": "Le Peugeot 2008 combine style et polyvalence. Un SUV compact idéal pour la ville.",
            "en": "The Peugeot 2008 combines style and versatility. An ideal compact SUV for the city.",
            "ar": "بيجو 2008 تجمع بين الأناقة والتنوع. سيارة SUV مثالية للمدينة."
        }
    },
    {
        "id": "evoque",
        "model": "Evoque",
        "brand": "Range Rover",
        "year": 2024,
        "price_per_day": 1200,
        "currency": "DH",
        "seats": 5,
        "transmission": "auto",
        "fuel": "diesel",
        "category": "suv-premium",
        "quantity": 1,
        "image": "/cars/evoque.jpg",
        "gallery": ["/cars/evoque.jpg"],
        "features": ["Terrain Response", "Toit panoramique", "Meridian Sound", "Cuir Windsor"],
        "description": {
            "fr": "Le Range Rover Evoque allie luxe britannique et capacités tout-terrain.",
            "en": "The Range Rover Evoque combines British luxury with off-road capabilities.",
            "ar": "رينج روفر إيفوك تجمع بين الفخامة البريطانية وقدرات الطرق الوعرة."
        }
    }
]

async def seed_database():
    """Seed the database with initial car data"""
    try:
        # Connect to MongoDB
        mongo_url = os.environ['MONGO_URL']
        client = AsyncIOMotorClient(mongo_url)
        db = client[os.environ['DB_NAME']]
        
        print("Connected to MongoDB")
        
        # Clear existing cars
        result = await db.cars.delete_many({})
        print(f"Deleted {result.deleted_count} existing cars")
        
        # Insert new cars
        result = await db.cars.insert_many(CARS_DATA)
        print(f"Inserted {len(result.inserted_ids)} cars")
        
        # Verify insertion
        count = await db.cars.count_documents({})
        print(f"Total cars in database: {count}")
        
        # List all cars
        cars = await db.cars.find({}, {"_id": 0, "id": 1, "brand": 1, "model": 1}).to_list(100)
        print("\nCars in database:")
        for car in cars:
            print(f"  - {car['brand']} {car['model']} ({car['id']})")
        
        print("\n✅ Database seeded successfully!")
        
        client.close()
        
    except Exception as e:
        print(f"❌ Error seeding database: {str(e)}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(seed_database())
