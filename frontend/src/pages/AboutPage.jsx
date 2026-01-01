import React from 'react';
import { Shield, Award, Users, Car } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { siteConfig } from '../data/mock';

const AboutPage = () => {
  const { t, language } = useLanguage();

  const values = [
    {
      icon: Shield,
      title: t.about.values.quality,
      desc: t.about.values.qualityDesc,
    },
    {
      icon: Users,
      title: t.about.values.service,
      desc: t.about.values.serviceDesc,
    },
    {
      icon: Award,
      title: t.about.values.price,
      desc: t.about.values.priceDesc,
    },
  ];

  const stats = [
    {
      value: '500+',
      label: language === 'fr' ? 'Clients satisfaits' : 'Satisfied Clients',
    },
    {
      value: '8+',
      label: language === 'fr' ? 'Véhicules disponibles' : 'Vehicles Available',
    },
    {
      value: '5+',
      label: language === 'fr' ? 'Années d\'expérience' : 'Years of Experience',
    },
    {
      value: '24/7',
      label: language === 'fr' ? 'Disponible' : 'Available',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero */}
      <section className="bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t.about.title}
          </h1>
          <p className="text-xl text-gray-400">{t.about.subtitle}</p>
          <p className="text-red-500 mt-4 font-medium">
            {language === 'fr' ? '🚗 Livraison dans tout le Maroc' : '🚗 Delivery throughout Morocco'}
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {language === 'fr' ? 'Notre Histoire' : 'Our Story'}
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>{t.about.story}</p>
                <p>
                  {language === 'fr'
                    ? 'Notre mission est de vous offrir une expérience de location simple, rapide et agréable. Nous nous engageons à fournir des véhicules propres, bien entretenus et à un prix juste.'
                    : 'Our mission is to offer you a simple, fast and enjoyable rental experience. We are committed to providing clean, well-maintained vehicles at a fair price.'}
                </p>
                <p>
                  {language === 'fr'
                    ? 'Que ce soit pour un déplacement professionnel, des vacances en famille ou un événement spécial, KAWS CAR est votre partenaire de confiance pour tous vos besoins de mobilité.'
                    : 'Whether for a business trip, a family vacation or a special event, KAWS CAR is your trusted partner for all your mobility needs.'}
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1638686302275-0e87df720aca?w=800&auto=format&fit=crop"
                  alt="KAWS CAR Fleet"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-red-600 text-white rounded-2xl p-6 shadow-xl">
                <Car className="w-10 h-10 mb-2" />
                <p className="text-2xl font-bold">{siteConfig.name}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.value}
                </p>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t.about.values.title}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {language === 'fr' ? 'Pourquoi nous choisir ?' : 'Why Choose Us?'}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: language === 'fr' ? 'Flotte variée' : 'Varied Fleet',
                desc:
                  language === 'fr'
                    ? 'Des citadines aux SUV premium, trouvez le véhicule parfait pour vos besoins.'
                    : 'From city cars to premium SUVs, find the perfect vehicle for your needs.',
              },
              {
                title: language === 'fr' ? 'Prix transparents' : 'Transparent Pricing',
                desc:
                  language === 'fr'
                    ? 'Pas de frais cachés. Le prix affiché est le prix que vous payez.'
                    : 'No hidden fees. The price displayed is the price you pay.',
              },
              {
                title: language === 'fr' ? 'Service client' : 'Customer Service',
                desc:
                  language === 'fr'
                    ? 'Une équipe disponible 7j/7 pour répondre à toutes vos questions.'
                    : 'A team available 7 days a week to answer all your questions.',
              },
              {
                title: language === 'fr' ? 'Livraison possible' : 'Delivery Available',
                desc:
                  language === 'fr'
                    ? 'Nous pouvons livrer votre véhicule à l\'aéroport ou à votre hôtel.'
                    : 'We can deliver your vehicle to the airport or your hotel.',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-6 bg-gray-50 rounded-2xl"
              >
                <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
