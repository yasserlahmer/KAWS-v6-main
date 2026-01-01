import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Fuel, Settings2, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

const CarCard = ({ car }) => {
  const { t, language } = useLanguage();

  const transmissionLabel = {
    auto: language === 'fr' ? 'Automatique' : (language === 'ar' ? 'أوتوماتيك' : 'Automatic'),
    manual: language === 'fr' ? 'Manuelle' : (language === 'ar' ? 'يدوي' : 'Manual')
  };

  const fuelLabel = {
    essence: language === 'fr' ? 'Essence' : (language === 'ar' ? 'بنزين' : 'Petrol'),
    diesel: 'Diesel'
  };

  const availableLabel = {
    fr: 'disponible',
    en: 'available',
    ar: 'متاح'
  };

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-[16/10]">
        <img
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Quantity Badge */}
        {car.quantity > 1 && (
          <div className="absolute top-4 left-4">
            <Badge className="bg-red-600 text-white px-3 py-1">
              {car.quantity}x {availableLabel[language] || availableLabel.en}
            </Badge>
          </div>
        )}
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Brand & Model */}
        <div className="mb-3">
          <p className="text-sm text-gray-500 font-medium">{car.brand}</p>
          <h3 className="text-xl font-bold text-gray-900">
            {car.model} <span className="text-gray-400 font-normal">({car.year})</span>
          </h3>
        </div>

        {/* Price - Moved here from image */}
        <div className="mb-4 p-3 bg-gray-50 rounded-xl">
          <span className="text-2xl font-bold text-red-600">{car.price_per_day}</span>
          <span className="text-gray-600 text-sm ml-1">{car.currency}{t.fleet.pricePerDay}</span>
        </div>

        {/* Specs */}
        <div className="flex items-center flex-wrap gap-3 mb-5 text-sm text-gray-600">
          <div className="flex items-center space-x-1.5 bg-gray-100 px-2 py-1 rounded-lg">
            <Users className="w-4 h-4 text-gray-400" />
            <span>{car.seats}</span>
          </div>
          <div className="flex items-center space-x-1.5 bg-gray-100 px-2 py-1 rounded-lg">
            <Settings2 className="w-4 h-4 text-gray-400" />
            <span>{transmissionLabel[car.transmission]}</span>
          </div>
          <div className="flex items-center space-x-1.5 bg-gray-100 px-2 py-1 rounded-lg">
            <Fuel className="w-4 h-4 text-gray-400" />
            <span>{fuelLabel[car.fuel]}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-3">
          <Link to={`/car/${car.id}`} className="flex-1">
            <Button
              variant="outline"
              className="w-full border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700"
            >
              {t.fleet.details}
            </Button>
          </Link>
          <Link to={`/booking?car=${car.id}`} className="flex-1">
            <Button className="w-full bg-red-600 hover:bg-red-700 text-white group/btn">
              {t.fleet.book}
              <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
