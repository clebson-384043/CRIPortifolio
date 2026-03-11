

import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface LandingHeroProps {
  onEnterPortal: () => void;
  onViewCases?: () => void;
}

const LandingHero: React.FC<LandingHeroProps> = ({ onEnterPortal, onViewCases }) => {
  const { text } = useLanguage();

  return (
    <div className="relative overflow-hidden pt-20 pb-40">
      {/* Dynamic Background Elements - Fire/Magma Theme */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand-primary/20 rounded-full mix-blend-screen filter blur-[120px] opacity-40 animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-brand-purple/20 rounded-full mix-blend-screen filter blur-[100px] opacity-30"></div>
        <div className="absolute top-40 left-0 w-[400px] h-[400px] bg-brand-accent/20 rounded-full mix-blend-screen filter blur-[80px] opacity-30 animate-float"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Availability Badge */}
        <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-brand-primary/30 bg-brand-primary/5 backdrop-blur-md text-brand-primary text-xs font-semibold uppercase tracking-wider mb-8 shadow-lg shadow-brand-primary/10">
          <span className="w-2 h-2 rounded-full bg-brand-primary mr-2 animate-pulse"></span>
          {text.hero.avail}
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 leading-tight text-white">
          {text.hero.title1} <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-primary via-orange-400 to-brand-accent">
            {text.hero.title2}
          </span>
        </h1>
        
        <p className="mt-4 max-w-2xl text-xl text-stone-300 mb-12 leading-relaxed">
          {text.hero.desc}
        </p>

        <div className="flex flex-col sm:flex-row gap-6">
          {/* POC Button hidden for now
          <button 
            onClick={onEnterPortal}
            className="px-8 py-4 bg-brand-cream text-obsidian-950 rounded-xl font-bold hover:bg-white transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(255,247,237,0.2)] flex items-center justify-center gap-2"
          >
            <span className="text-xl">🚀</span>
            {text.hero.btnPoc}
          </button>
          */}
          <button 
            onClick={onViewCases}
            className="px-8 py-4 bg-obsidian-800/50 backdrop-blur-md border border-obsidian-700 text-white rounded-xl font-semibold hover:bg-obsidian-700 hover:border-brand-primary/30 transition-all"
          >
            {text.hero.btnCase}
          </button>
        </div>

        {/* Tech Stack - Refined */}
        <div className="mt-24 w-full max-w-4xl border-t border-obsidian-800/50 pt-10">
          <p className="text-xs text-stone-500 uppercase tracking-[0.2em] mb-8">{text.hero.tech}</p>
          <div className="flex flex-wrap justify-center gap-12 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
             {/* Text Placeholders for Logos */}
             <span className="text-xl font-bold text-stone-300 flex items-center gap-2"><div className="w-3 h-3 bg-blue-500 rounded-full"></div>Azure OpenAI</span>
             <span className="text-xl font-bold text-stone-300 flex items-center gap-2"><div className="w-3 h-3 bg-yellow-500 rounded-full"></div>Python</span>
             <span className="text-xl font-bold text-stone-300 flex items-center gap-2"><div className="w-3 h-3 bg-teal-500 rounded-full"></div>SharePoint</span>
             <span className="text-xl font-bold text-stone-300 flex items-center gap-2"><div className="w-3 h-3 bg-cyan-500 rounded-full"></div>Copilot Studio</span>
             <span className="text-xl font-bold text-stone-300 flex items-center gap-2"><div className="w-3 h-3 bg-brand-primary rounded-full"></div>Power Platform</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingHero;
