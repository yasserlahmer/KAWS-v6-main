import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { siteConfig } from '../../data/mock';
import { Button } from '../ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const { t, language, setLanguage, languages, currentLanguage } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setLangMenuOpen(false);
  }, [location]);

  const navLinks = [
    { path: '/', label: t.nav.home },
    { path: '/fleet', label: t.nav.fleet },
    { path: '/about', label: t.nav.about },
    { path: '/contact', label: t.nav.contact },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLanguageChange = (langCode) => {
    setLanguage(langCode);
    setLangMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/80 backdrop-blur-lg shadow-xl'
          : 'bg-black/40 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-28">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/logo/logo-footer.png"
              alt="KAWS CAR"
              className="h-36 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? 'text-red-500 bg-white/20'
                    : 'text-white hover:text-red-400 hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all"
              >
                <span className="font-bold">{currentLanguage?.label || 'FR'}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${langMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {langMenuOpen && (
                <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-xl py-2 min-w-[150px] z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center justify-between ${
                        language === lang.code ? 'bg-red-50 text-red-600' : 'text-gray-700'
                      }`}
                    >
                      <span className="font-medium">{lang.label}</span>
                      <span className="text-gray-500 text-sm">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Phone */}
            <a
              href={`tel:${siteConfig.phone}`}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-white/80 hover:text-white"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden xl:inline">{siteConfig.phone}</span>
            </a>

            {/* Book CTA */}
            <Link to="/booking">
              <Button
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {t.nav.booking}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            {/* Mobile Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="p-2 rounded-lg text-white font-bold"
              >
                {currentLanguage?.label || 'FR'}
              </button>
              
              {langMenuOpen && (
                <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-xl py-2 min-w-[120px] z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`w-full px-4 py-2 text-left hover:bg-gray-100 ${
                        language === lang.code ? 'bg-red-50 text-red-600' : 'text-gray-700'
                      }`}
                    >
                      <span className="font-medium">{lang.label}</span>
                      <span className="text-gray-500 text-sm ml-2">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-white"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        <div className="bg-white shadow-xl border-t px-4 py-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                isActive(link.path)
                  ? 'text-red-600 bg-red-50'
                  : 'text-gray-700 hover:text-red-600 hover:bg-gray-50'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 border-t mt-4">
            <a
              href={`tel:${siteConfig.phone}`}
              className="flex items-center space-x-3 px-4 py-3 text-gray-600"
            >
              <Phone className="w-5 h-5" />
              <span>{siteConfig.phone}</span>
            </a>
            <Link to="/booking" className="block mt-2">
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium">
                {t.nav.booking}
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Click outside to close language menu */}
      {langMenuOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setLangMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
