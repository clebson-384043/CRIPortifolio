

import React, { useState } from 'react';
import { View, Language } from './types';
import LandingHero from './components/LandingHero';
import ServicesSection from './components/ServicesSection';
import ClientPortal from './components/ClientPortal';
import AboutSection from './components/AboutSection';
import CaseStudiesSection from './components/CaseStudiesSection';
import Logo from './components/Logo';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';

const AppContent: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const { language, setLanguage, text } = useLanguage();

  const navigateToPortal = () => {
    setCurrentView(View.PORTAL);
    window.scrollTo(0, 0);
  };

  const navigateHome = () => {
    setCurrentView(View.HOME);
    window.scrollTo(0, 0);
  };
  
  const navigateAbout = () => {
    setCurrentView(View.ABOUT);
    window.scrollTo(0, 0);
  };

  const navigateCases = () => {
    setCurrentView(View.CASES);
    window.scrollTo(0, 0);
  };

  const navigateToServices = () => {
    // Set view to SERVICES to activate the menu item
    setCurrentView(View.SERVICES);
    // Give React a moment to ensure the element exists if switching from another view
    setTimeout(() => {
      const element = document.getElementById('services');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-obsidian-950 text-stone-100 font-sans selection:bg-brand-primary selection:text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-obsidian-950/80 border-b border-obsidian-800 shadow-lg shadow-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center cursor-pointer group" onClick={navigateHome}>
              <div className="mr-3 transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_0_15px_rgba(234,88,12,0.3)]">
                <Logo className="w-12 h-12" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                NEXU<span className="text-brand-primary"> AI</span>
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={navigateHome}
                className={`text-sm font-medium transition-colors relative group ${currentView === View.HOME ? 'text-white' : 'text-stone-400 hover:text-white'}`}
              >
                {text.nav.portfolio}
                {currentView === View.HOME && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-brand-primary"></span>}
              </button>

              <button 
                onClick={navigateCases}
                className={`text-sm font-medium transition-colors relative group ${currentView === View.CASES ? 'text-white' : 'text-stone-400 hover:text-white'}`}
              >
                {text.nav.cases}
                {currentView === View.CASES && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-brand-primary"></span>}
              </button>

              <button 
                onClick={navigateAbout}
                className={`text-sm font-medium transition-colors relative group ${currentView === View.ABOUT ? 'text-white' : 'text-stone-400 hover:text-white'}`}
              >
                {text.nav.about}
                {currentView === View.ABOUT && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-brand-primary"></span>}
              </button>

              <button 
                onClick={navigateToServices} 
                className={`text-sm font-medium transition-colors relative group ${currentView === View.SERVICES ? 'text-white' : 'text-stone-400 hover:text-white'}`}
              >
                {text.nav.services}
                {currentView === View.SERVICES && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-brand-primary"></span>}
              </button>
              
              {/* Hidden for now as requested
              <button 
                onClick={navigateToPortal}
                className="bg-obsidian-800 hover:bg-obsidian-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all border border-obsidian-700 hover:border-brand-primary/50 hover:shadow-[0_0_20px_rgba(234,88,12,0.2)]"
              >
                {text.nav.portal}
              </button>
              */}
              
              {/* Modern Segmented Control Language Toggle */}
              <div className="flex items-center p-1 bg-obsidian-900 border border-obsidian-800 rounded-full">
                <button
                  onClick={() => setLanguage(Language.PT)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 ${
                    language === Language.PT 
                      ? 'bg-gradient-to-r from-brand-primary to-brand-accent text-white shadow-lg shadow-brand-primary/30' 
                      : 'text-stone-500 hover:text-stone-300'
                  }`}
                  aria-label="Mudar para Português"
                >
                  PT
                </button>
                <button
                  onClick={() => setLanguage(Language.EN)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 ${
                    language === Language.EN 
                      ? 'bg-gradient-to-r from-brand-primary to-brand-accent text-white shadow-lg shadow-brand-primary/30' 
                      : 'text-stone-500 hover:text-stone-300'
                  }`}
                  aria-label="Switch to English"
                >
                  EN
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main>
        {/* Render Landing Page content for both HOME and SERVICES views */}
        {(currentView === View.HOME || currentView === View.SERVICES) && (
          <>
            <LandingHero onEnterPortal={navigateToPortal} onViewCases={navigateCases} />
            <ServicesSection />
            <footer className="bg-obsidian-900 border-t border-obsidian-800 py-12 mt-20">
              <div className="max-w-7xl mx-auto px-4 text-center text-stone-500">
                <p>&copy; {text.footer.copyright}</p>
                <p className="mt-2 text-sm text-stone-600">{text.footer.tagline}</p>
              </div>
            </footer>
          </>
        )}
        
        {currentView === View.ABOUT && (
          <AboutSection />
        )}

        {currentView === View.CASES && (
          <CaseStudiesSection />
        )}

        {currentView === View.PORTAL && (
          <ClientPortal onBack={navigateHome} />
        )}
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LanguageProvider>
  );
};

export default App;
