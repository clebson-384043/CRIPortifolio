
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const CaseStudiesSection: React.FC = () => {
  const { text } = useLanguage();
  const [filter, setFilter] = useState<'ALL' | 'AI_AUTOMATION' | 'AI_DATA' | 'AI_DATA_AUTOMATION'>('ALL');

  const filteredItems = text.cases.items.filter((item: any) => 
    filter === 'ALL' || item.category === filter
  );

  return (
    <div className="py-20 bg-obsidian-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">{text.cases.title}</h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-brand-primary to-brand-accent mx-auto rounded-full mb-6"></div>
          <p className="max-w-2xl mx-auto text-xl text-stone-400 leading-relaxed">
            {text.cases.subtitle}
          </p>
        </div>

        {/* Filters */}
        <div className="flex justify-center flex-wrap gap-4 mb-16">
           {[
             { id: 'ALL', label: text.cases.filters.all },
             { id: 'AI_DATA_AUTOMATION', label: text.cases.filters.ai_data_auto },
             { id: 'AI_DATA', label: text.cases.filters.ai_data },
             { id: 'AI_AUTOMATION', label: text.cases.filters.ai_auto },
           ].map(f => (
             <button
               key={f.id}
               onClick={() => setFilter(f.id as any)}
               className={`px-6 py-2 rounded-full text-sm font-bold transition-all border ${
                 filter === f.id 
                  ? 'bg-brand-primary text-white border-brand-primary shadow-lg shadow-brand-primary/25' 
                  : 'bg-obsidian-900 text-stone-400 border-obsidian-800 hover:border-stone-600 hover:text-white'
               }`}
             >
               {f.label}
             </button>
           ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {filteredItems.map((item: any) => (
             <div key={item.id} className="group relative bg-obsidian-900 border border-obsidian-800 rounded-2xl overflow-hidden hover:border-brand-primary/30 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-primary/5">
                
                {/* Decorative Gradient Line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-primary to-brand-purple opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                     <span className={`px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
                        item.category === 'AI_AUTOMATION' ? 'bg-orange-900/50 text-orange-400 border border-orange-800' :
                        item.category === 'AI_DATA' ? 'bg-brand-purple/50 text-rose-300 border border-brand-purple/50' :
                        item.category === 'AI_DATA_AUTOMATION' ? 'bg-cyan-900/50 text-cyan-300 border border-cyan-800' :
                        'bg-stone-900 text-stone-400 border border-stone-800'
                     }`}>
                       {item.category.replace(/_/g, ' & ')}
                     </span>
                     <span className="text-stone-500 font-mono text-xs">{item.client}</span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-brand-primary transition-colors">{item.title}</h3>
                  
                  <div className="space-y-4 mb-8">
                     <div>
                        <p className="text-xs text-stone-500 uppercase font-bold mb-1">{text.cases.labelChallenge}</p>
                        <p className="text-stone-300 text-sm leading-relaxed">{item.challenge}</p>
                     </div>
                     <div>
                        <p className="text-xs text-brand-primary uppercase font-bold mb-1">{text.cases.labelSolution}</p>
                        <p className="text-stone-300 text-sm leading-relaxed">{item.solution}</p>
                     </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-obsidian-800">
                    {item.tech.map((t: string, i: number) => (
                      <span key={i} className="text-xs font-mono text-stone-500 bg-obsidian-950 px-2 py-1 rounded border border-obsidian-800">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Result Badge Overlay */}
                <div className="bg-obsidian-950/50 p-4 border-t border-obsidian-800 flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 text-lg">
                     📈
                   </div>
                   <p className="text-sm font-medium text-green-400 italic">
                     "{item.result}"
                   </p>
                </div>
             </div>
           ))}
        </div>

      </div>
    </div>
  );
};

export default CaseStudiesSection;
