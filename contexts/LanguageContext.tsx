import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Language } from '../types';
import { t } from '../utils/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  text: typeof t[Language.EN];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Defaulting to Portuguese as requested
  const [language, setLanguage] = useState<Language>(Language.PT);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, text: t[language] }}>
      {children}
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