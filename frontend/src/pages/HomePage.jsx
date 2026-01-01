import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Car, Shield, Clock, Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getCars } from '../services/api';
import { testimonials, siteConfig } from '../data/mock';
import CarCard from '../components/cars/CarCard';
import { Button } from '../components/ui/button';

const HomePage = () => {
  const { t, language } = useLanguage();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch cars from API
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const data = await getCars();
        setCars(data);
      } catch (err) {
        console.error('Error loading cars:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const featuredCars = cars.slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-gray-900 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://customer-assets.emergentagent.com/job_e96caadb-1a3c-4ea7-b6db-6d4b40eec7f4/artifacts/7h2qfjmd_EVOQUE%20.jpg"
            alt="Range Rover Evoque"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 via-gray-900/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative max-w-7xl 3xl:max-w-[1600px] 4xl:max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="max-w-2xl 3xl:max-w-3xl 4xl:max-w-4xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl 3xl:text-8xl font-bold text-white leading-tight mb-6">
              {t.hero.title}
            </h1>

            <p className="text-lg sm:text-xl 3xl:text-2xl text-gray-300 mb-10 leading-relaxed">
              {t.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/fleet">
                <Button
                  size="lg"
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-red-600/25 hover:shadow-xl hover:shadow-red-600/30 transition-all group"
                >
                  {t.hero.cta}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <a href={`tel:${siteConfig.phone}`}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-xl"
                >
                  {t.hero.ctaSecondary}
                </Button>
              </a>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mt-16 pt-8 border-t border-white/10">
              <div>
                <p className="text-3xl font-bold text-white">8+</p>
                <p className="text-gray-400">{language === 'fr' ? 'Véhicules' : 'Vehicles'}</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">500+</p>
                <p className="text-gray-400">{language === 'fr' ? 'Clients satisfaits' : 'Happy Clients'}</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">24/7</p>
                <p className="text-gray-400">{language === 'fr' ? 'Disponible' : 'Available'}</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">🇲🇦</p>
                <p className="text-gray-400">{language === 'fr' ? 'Tout le Maroc' : 'All Morocco'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl 3xl:max-w-[1600px] 4xl:max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: language === 'fr' ? 'Assurance incluse' : (language === 'ar' ? 'التأمين مشمول' : 'Insurance Included'),
                desc: language === 'fr' ? 'Tous nos véhicules sont assurés' : (language === 'ar' ? 'جميع سياراتنا مؤمنة' : 'All our vehicles are insured')
              },
              {
                icon: Clock,
                title: language === 'fr' ? 'Disponible 24/7' : (language === 'ar' ? 'متاح 24/7' : 'Available 24/7'),
                desc: language === 'fr' ? 'Livraison dans tout le Maroc' : (language === 'ar' ? 'توصيل في جميع أنحاء المغرب' : 'Delivery throughout Morocco')
              },
              {
                icon: Star,
                title: language === 'fr' ? 'Service 5 étoiles' : (language === 'ar' ? 'خدمة 5 نجوم' : '5-Star Service'),
                desc: language === 'fr' ? 'Satisfaction garantie' : (language === 'ar' ? 'رضا مضمون' : 'Satisfaction guaranteed')
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-6 3xl:p-8 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="w-14 h-14 3xl:w-16 3xl:h-16 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-7 h-7 3xl:w-8 3xl:h-8 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg 3xl:text-xl font-semibold text-gray-900 mb-1">{feature.title}</h3>
                  <p className="text-gray-600 3xl:text-lg">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Fleet Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl 3xl:max-w-[1600px] 4xl:max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl 3xl:text-5xl font-bold text-gray-900 mb-4">{t.fleet.title}</h2>
            <p className="text-lg sm:text-xl 3xl:text-2xl text-gray-600 max-w-2xl 3xl:max-w-3xl mx-auto">{t.fleet.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 3xl:grid-cols-4 gap-6 3xl:gap-8">
            {featuredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/fleet">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-gray-300 hover:border-gray-400 px-8 py-6 text-lg 3xl:text-xl rounded-xl group"
              >
                {language === 'fr' ? 'Voir toutes nos voitures' : (language === 'ar' ? 'عرض جميع سياراتنا' : 'View All Cars')}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl 3xl:max-w-[1600px] 4xl:max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl 3xl:text-5xl font-bold text-gray-900 mb-4">
              {language === 'fr' ? 'Ce que disent nos clients' : (language === 'ar' ? 'ماذا يقول عملاؤنا' : 'What Our Clients Say')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.comment[language]}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            {language === 'fr' ? 'Prêt à réserver ?' : 'Ready to Book?'}
          </h2>
          <p className="text-xl text-gray-400 mb-10">
            {language === 'fr'
              ? 'Contactez-nous dès maintenant pour réserver votre véhicule'
              : 'Contact us now to book your vehicle'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/booking">
              <Button
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg"
              >
                {t.nav.booking}
              </Button>
            </Link>
            <a
              href={`https://wa.me/${siteConfig.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-xl"
              >
                WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
