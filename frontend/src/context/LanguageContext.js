import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/mock';

const LanguageContext = createContext(null);

const languages = [
  { code: 'fr', label: 'FR', name: 'Français', rtl: false },
  { code: 'en', label: 'EN', name: 'English', rtl: false },
  { code: 'ar', label: 'AR', name: 'العربية', rtl: true }
];

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('fr');
  const [mounted, setMounted] = useState(false);

  // Load saved language on mount
  useEffect(() => {
    const saved = localStorage.getItem('kaws-language');
    if (saved && ['fr', 'en', 'ar'].includes(saved)) {
      setLanguage(saved);
    }
    setMounted(true);
  }, []);

  // Update HTML attributes whenever language changes
  useEffect(() => {
    // Update HTML lang attribute
    document.documentElement.lang = language;
    
    // Update HTML dir attribute for RTL
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    
    // Apply Arabic font class if needed
    if (language === 'ar') {
      document.documentElement.classList.add('font-arabic');
    } else {
      document.documentElement.classList.remove('font-arabic');
    }
    
    // Save to localStorage (only after mount)
    if (mounted) {
      localStorage.setItem('kaws-language', language);
    }
  }, [language, mounted]);

  const t = translations[language] || translations.fr;
  const isRTL = language === 'ar';
  const currentLanguage = languages.find(l => l.code === language) || languages[0];

  const changeLanguage = (newLang) => {
    if (['fr', 'en', 'ar'].includes(newLang)) {
      setLanguage(newLang);
    }
  };

  const value = {
    language,
    setLanguage: changeLanguage,
    t,
    isRTL,
    languages,
    currentLanguage
  };

  return (
    <LanguageContext.Provider value={value}>
      <div dir={isRTL ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
