import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Users,
  Fuel,
  Settings2,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getCarById } from '../services/api';
import { siteConfig } from '../data/mock';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

const CarDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch car details from API
  useEffect(() => {
    const fetchCar = async () => {
      try {
        setLoading(true);
        const data = await getCarById(id);
        setCar(data);
        setError(null);
      } catch (err) {
        console.error('Error loading car:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <p className="text-xl text-gray-600">
          {language === 'fr' ? 'Chargement...' : 'Loading...'}
        </p>
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {language === 'fr' ? 'Véhicule non trouvé' : 'Vehicle not found'}
          </h1>
          <Link to="/fleet">
            <Button>{language === 'fr' ? 'Retour à la flotte' : 'Back to fleet'}</Button>
          </Link>
        </div>
      </div>
    );
  }

  const transmissionLabel = {
    auto: language === 'fr' ? 'Automatique' : 'Automatic',
    manual: language === 'fr' ? 'Manuelle' : 'Manual',
  };

  const fuelLabel = {
    essence: language === 'fr' ? 'Essence' : 'Petrol',
    diesel: 'Diesel',
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === car.gallery.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? car.gallery.length - 1 : prev - 1
    );
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      language === 'fr'
        ? `Bonjour, je souhaite réserver le ${car.brand} ${car.model} (${car.year}).`
        : `Hello, I would like to book the ${car.brand} ${car.model} (${car.year}).`
    );
    window.open(
      `https://wa.me/${siteConfig.whatsapp}?text=${message}`,
      '_blank'
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            {language === 'fr' ? 'Retour' : 'Back'}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-gray-100">
              <img
                src={car.gallery[currentImageIndex]}
                alt={`${car.brand} ${car.model}`}
                className="w-full h-full object-cover"
              />
              {car.gallery.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
              {car.quantity > 1 && (
                <div className="absolute top-4 left-4">
                  <Badge className="bg-red-600 text-white px-3 py-1">
                    {car.quantity}x {language === 'fr' ? 'disponible' : 'available'}
                  </Badge>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {car.gallery.length > 1 && (
              <div className="flex gap-3">
                {car.gallery.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-24 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentImageIndex
                        ? 'border-red-600 ring-2 ring-red-200'
                        : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${car.brand} ${car.model} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <p className="text-red-600 font-medium mb-1">{car.brand}</p>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {car.model}{' '}
                <span className="text-gray-400 font-normal">({car.year})</span>
              </h1>
              <p className="text-gray-600 leading-relaxed">
                {car.description[language]}
              </p>
            </div>

            {/* Price */}
            <div className="bg-gray-100 rounded-2xl p-6">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-4xl font-bold text-gray-900">
                    {car.price_per_day}
                  </span>
                  <span className="text-gray-600 ml-2">
                    {car.currency} {t.fleet.pricePerDay}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2">{t.carDetail.priceNote}</p>
            </div>

            {/* Specifications */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {t.carDetail.specifications}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-4 bg-white rounded-xl border">
                  <Users className="w-6 h-6 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">{t.carDetail.seats}</p>
                    <p className="font-semibold">{car.seats}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-white rounded-xl border">
                  <Settings2 className="w-6 h-6 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">{t.carDetail.transmission}</p>
                    <p className="font-semibold">{transmissionLabel[car.transmission]}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-white rounded-xl border">
                  <Fuel className="w-6 h-6 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">{t.carDetail.fuel}</p>
                    <p className="font-semibold">{fuelLabel[car.fuel]}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-white rounded-xl border">
                  <Calendar className="w-6 h-6 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">{t.carDetail.year}</p>
                    <p className="font-semibold">{car.year}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {t.carDetail.features}
              </h3>
              <div className="flex flex-wrap gap-2">
                {car.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 bg-gray-100 rounded-full px-4 py-2"
                  >
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-gray-700">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to={`/booking?car=${car.id}`} className="flex-1">
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-lg rounded-xl">
                  {t.carDetail.bookNow}
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={handleWhatsApp}
                className="flex-1 border-2 py-6 text-lg rounded-xl"
              >
                WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailPage;
