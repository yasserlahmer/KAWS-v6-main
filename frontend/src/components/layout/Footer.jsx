import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { siteConfig } from '../../data/mock';

const Footer = () => {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="inline-block">
              <img
                src="/logo/logo-footer.png"
                alt="KAWS CAR"
                className="h-32 w-auto"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              {language === 'fr'
                ? "Votre partenaire de confiance pour la location de véhicules de qualité. Livraison dans tout le Maroc."
                : "Your trusted partner for quality vehicle rental. Delivery throughout Morocco."}
            </p>
            <div className="flex space-x-4">
              <a
                href={siteConfig.social.instagram}
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={siteConfig.social.facebook}
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Navigation</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link to="/fleet" className="text-gray-400 hover:text-white transition-colors">
                  {t.nav.fleet}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6">{t.contact.title}</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors"
                >
                  <Phone className="w-5 h-5 text-red-500" />
                  <span>{siteConfig.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors"
                >
                  <Mail className="w-5 h-5 text-red-500" />
                  <span>{siteConfig.email}</span>
                </a>
              </li>
              <li>
                <div className="flex items-start space-x-3 text-gray-400">
                  <MapPin className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>{siteConfig.address[language]}</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-6">
              {language === 'fr' ? 'Disponibilité' : 'Availability'}
            </h4>
            <div className="bg-gray-800 rounded-xl p-6">
              <p className="text-3xl font-bold text-white mb-2">24/7</p>
              <p className="text-gray-300 mb-4">
                {language === 'fr' ? 'Disponible 24h/24, 7j/7' : 'Available 24/7'}
              </p>
              <div className="pt-4 border-t border-gray-700">
                <p className="text-red-500 font-medium">
                  {language === 'fr' ? '🚗 Livraison dans tout le Maroc' : '🚗 Delivery throughout Morocco'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center gap-2">
              <p className="text-gray-500 text-sm">
                © {currentYear} {siteConfig.name}. {t.footer.rights}.
              </p>
              <span className="hidden md:inline text-gray-700">|</span>
              <p className="text-gray-600 text-sm">
                Designed by <span className="text-red-500 font-semibold">YVSSΣR</span>
              </p>
            </div>
            <div className="flex space-x-6">
              <Link
                to="/terms"
                className="text-gray-500 hover:text-white text-sm transition-colors"
              >
                {t.footer.terms}
              </Link>
              <Link
                to="/privacy"
                className="text-gray-500 hover:text-white text-sm transition-colors"
              >
                {t.footer.privacy}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
