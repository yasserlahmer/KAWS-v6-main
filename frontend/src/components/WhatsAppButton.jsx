import React from 'react';
import { MessageCircle } from 'lucide-react';
import { siteConfig } from '../data/mock';
import { useLanguage } from '../context/LanguageContext';

const WhatsAppButton = () => {
  const { language } = useLanguage();

  const defaultMessage = language === 'ar'
    ? 'مرحباً! أرغب في الاستفسار عن خدمات تأجير السيارات.'
    : language === 'en'
    ? 'Hello! I would like to inquire about your car rental services.'
    : 'Bonjour ! Je souhaite me renseigner sur vos services de location de voitures.';

  return (
    <a
      href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(defaultMessage)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 hover:scale-110 transition-all duration-300 md:hidden animate-pulse"
      aria-label="Contact via WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  );
};

export default WhatsAppButton;
