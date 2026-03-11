import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const ServicesSection: React.FC = () => {
  const { text } = useLanguage();
  
  const icons = ['🧠', '🔗', '☁️', '⚡', '🏢', '🛡️'];
  
  // Warm Fire/Magma Gradients
  const gradients = [
    'from-orange-500/20 to-red-500/20',     // IA
    'from-amber-500/20 to-orange-500/20',   // Legacy/APIs
    'from-red-500/20 to-rose-500/20',       // Cloud
    'from-yellow-500/20 to-amber-500/20',   // Automation
    'from-orange-400/20 to-pink-500/20',    // SharePoint
    'from-stone-500/20 to-gray-500/20'      // DevOps
  ];

  return (
    <div id="services" className="py-24 bg-obsidian-900 border-t border-obsidian-800 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">{text.services.title}</h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-brand-primary to-brand-accent mx-auto rounded-full mb-8"></div>
          <p className="max-w-2xl mx-auto text-xl text-stone-400 leading-relaxed">{text.services.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {text.services.offerings.map((service: any, index: number) => (
            <div key={index} className="relative group">
              {/* Card Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]} rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              <div className="relative p-8 bg-obsidian-950 rounded-3xl border border-obsidian-800 hover:border-obsidian-700 transition-all duration-300 h-full flex flex-col group-hover:-translate-y-2 shadow-2xl">
                <div className="flex items-start justify-between mb-6">
                   <div className="w-16 h-16 bg-obsidian-900 rounded-2xl flex items-center justify-center text-4xl shadow-inner border border-obsidian-800 group-hover:scale-110 transition-transform duration-300 group-hover:border-brand-primary/30">
                      {icons[index % icons.length]}
                   </div>
                   <div className="text-obsidian-800 group-hover:text-obsidian-700 font-black text-6xl opacity-20 select-none transition-colors">
                     0{index + 1}
                   </div>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-brand-primary transition-colors min-h-[64px]">
                    {service.title}
                </h3>
                
                <p className="text-stone-400 text-base leading-relaxed mb-8 flex-1">
                    {service.desc}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 pt-6 border-t border-obsidian-800/50">
                  {service.tags.map((tag: string, tIdx: number) => (
                    <span key={tIdx} className="px-3 py-1 bg-obsidian-900 border border-obsidian-800 rounded-lg text-xs font-mono text-stone-500 group-hover:text-stone-300 group-hover:border-obsidian-700 transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-24 text-center">
           <div className="inline-flex flex-col items-center bg-gradient-to-br from-obsidian-900 to-obsidian-950 p-8 rounded-3xl border border-obsidian-800 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-brand-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <h3 className="text-2xl font-bold text-white mb-2 relative z-10">{text.services.ctaTitle}</h3>
              <button 
                className="mt-6 px-8 py-3 bg-brand-cream text-obsidian-950 font-bold rounded-xl hover:bg-white transition-all shadow-lg hover:scale-105 relative z-10"
                onClick={() => window.open('mailto:clebsoncarmo@yahoo.com.br')}
              >
                {text.services.ctaBtn}
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;