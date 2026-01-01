import React, { useState, useMemo, useEffect } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getCars } from '../services/api';
import CarCard from '../components/cars/CarCard';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

const FleetPage = () => {
  const { t, language } = useLanguage();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState('all');
  const [transmission, setTransmission] = useState('all');
  const [category, setCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Fetch cars from API on mount
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const data = await getCars();
        console.log('FleetPage: Loaded cars from API:', data.length);
        setCars(data);
        setError(null);
      } catch (err) {
        console.error('Error loading cars:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const categories = [
    { value: 'all', label: language === 'fr' ? 'Toutes' : 'All' },
    { value: 'compact', label: language === 'fr' ? 'Compacte' : 'Compact' },
    { value: 'berline', label: language === 'fr' ? 'Berline' : 'Sedan' },
    { value: 'suv', label: 'SUV' },
    { value: 'suv-compact', label: language === 'fr' ? 'SUV Compact' : 'Compact SUV' },
    { value: 'suv-premium', label: language === 'fr' ? 'SUV Premium' : 'Premium SUV' },
  ];

  const priceRanges = [
    { value: 'all', label: language === 'fr' ? 'Tous les prix' : 'All Prices' },
    { value: '0-400', label: '0 - 400 DH' },
    { value: '400-700', label: '400 - 700 DH' },
    { value: '700-1000', label: '700 - 1000 DH' },
    { value: '1000+', label: '1000+ DH' },
  ];

  const transmissions = [
    { value: 'all', label: language === 'fr' ? 'Toutes' : 'All' },
    { value: 'auto', label: language === 'fr' ? 'Automatique' : 'Automatic' },
    { value: 'manual', label: language === 'fr' ? 'Manuelle' : 'Manual' },
  ];

  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      // Search filter
      const searchMatch =
        searchTerm === '' ||
        car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.brand.toLowerCase().includes(searchTerm.toLowerCase());

      // Price range filter
      let priceMatch = true;
      if (priceRange !== 'all') {
        if (priceRange === '0-400') priceMatch = car.price_per_day <= 400;
        else if (priceRange === '400-700')
          priceMatch = car.price_per_day > 400 && car.price_per_day <= 700;
        else if (priceRange === '700-1000')
          priceMatch = car.price_per_day > 700 && car.price_per_day <= 1000;
        else if (priceRange === '1000+')
          priceMatch = car.price_per_day > 1000;
      }

      // Transmission filter
      const transmissionMatch =
        transmission === 'all' || car.transmission === transmission;

      // Category filter
      const categoryMatch = category === 'all' || car.category === category;

      return searchMatch && priceMatch && transmissionMatch && categoryMatch;
    });
  }, [cars, searchTerm, priceRange, transmission, category]);

  const clearFilters = () => {
    setSearchTerm('');
    setPriceRange('all');
    setTransmission('all');
    setCategory('all');
  };

  const hasActiveFilters =
    searchTerm !== '' ||
    priceRange !== 'all' ||
    transmission !== 'all' ||
    category !== 'all';

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <section className="bg-gray-900 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t.fleet.title}
            </h1>
            <p className="text-xl text-gray-400">{t.fleet.subtitle}</p>
          </div>
        </section>
        <div className="flex justify-center items-center py-20">
          <p className="text-xl text-gray-600">
            {language === 'fr' ? 'Chargement...' : 'Loading...'}
          </p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <section className="bg-gray-900 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t.fleet.title}
            </h1>
            <p className="text-xl text-gray-400">{t.fleet.subtitle}</p>
          </div>
        </section>
        <div className="flex justify-center items-center py-20">
          <p className="text-xl text-red-600">
            {language === 'fr' ? 'Erreur lors du chargement des voitures' : 'Error loading cars'}: {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero */}
      <section className="bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t.fleet.title}
          </h1>
          <p className="text-xl text-gray-400">{t.fleet.subtitle}</p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white shadow-sm sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder={
                  language === 'fr' ? 'Rechercher un véhicule...' : 'Search a vehicle...'
                }
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 border-gray-200"
              />
            </div>

            {/* Desktop Filters */}
            <div className="hidden lg:flex items-center gap-3">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-40 h-12">
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="w-40 h-12">
                  <SelectValue placeholder="Prix" />
                </SelectTrigger>
                <SelectContent>
                  {priceRanges.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={transmission} onValueChange={setTransmission}>
                <SelectTrigger className="w-40 h-12">
                  <SelectValue placeholder="Transmission" />
                </SelectTrigger>
                <SelectContent>
                  {transmissions.map((trans) => (
                    <SelectItem key={trans.value} value={trans.value}>
                      {trans.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  onClick={clearFilters}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-4 h-4 mr-1" />
                  {language === 'fr' ? 'Effacer' : 'Clear'}
                </Button>
              )}
            </div>

            {/* Mobile Filter Toggle */}
            <Button
              variant="outline"
              className="lg:hidden flex items-center"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              {t.fleet.filter}
            </Button>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="lg:hidden mt-4 pt-4 border-t space-y-3">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full h-12">
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="w-full h-12">
                  <SelectValue placeholder="Prix" />
                </SelectTrigger>
                <SelectContent>
                  {priceRanges.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={transmission} onValueChange={setTransmission}>
                <SelectTrigger className="w-full h-12">
                  <SelectValue placeholder="Transmission" />
                </SelectTrigger>
                <SelectContent>
                  {transmissions.map((trans) => (
                    <SelectItem key={trans.value} value={trans.value}>
                      {trans.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {hasActiveFilters && (
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="w-full"
                >
                  <X className="w-4 h-4 mr-1" />
                  {language === 'fr' ? 'Effacer les filtres' : 'Clear Filters'}
                </Button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Results */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Count */}
          <p className="text-gray-600 mb-8">
            {filteredCars.length}{' '}
            {language === 'fr' ? 'véhicule(s) trouvé(s)' : 'vehicle(s) found'}
          </p>

          {/* Cars Grid */}
          {filteredCars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-gray-500">
                {language === 'fr'
                  ? 'Aucun véhicule ne correspond à vos critères'
                  : 'No vehicles match your criteria'}
              </p>
              <Button onClick={clearFilters} className="mt-4">
                {language === 'fr' ? 'Réinitialiser les filtres' : 'Reset Filters'}
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default FleetPage;
