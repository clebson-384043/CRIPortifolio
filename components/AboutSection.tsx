

import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Logo from './Logo';

const AboutSection: React.FC = () => {
  const { text } = useLanguage();
  
  const skills = [
    "Enterprise AI Strategy", "Cloud Architecture", "Python Automation", 
    "SharePoint Ecosystems", "Technical Governance", "Security & Compliance"
  ];

  const downloadLogo = () => {
    const canvas = document.createElement('canvas');
    const size = 2048; // High res
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;
  
    // Exact SVG string matching Logo.tsx logic
    const svgString = `
      <svg width="${size}" height="${size}" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="logoGradient" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop stop-color="#ea580c" />
            <stop offset="1" stop-color="#dc2626" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <path d="M50 10 L85 27.5 V72.5 L50 90 L15 72.5 V27.5 Z" fill="url(#logoGradient)" fill-opacity="0.15" stroke="url(#logoGradient)" stroke-width="3" stroke-linejoin="round" />
        <g filter="url(#glow)">
          <path d="M35 35 V65" stroke="white" stroke-width="6" stroke-linecap="round" />
          <path d="M65 35 V65" stroke="white" stroke-width="6" stroke-linecap="round" />
          <path d="M35 35 L65 65" stroke="white" stroke-width="6" stroke-linecap="round" />
        </g>
        <circle cx="35" cy="35" r="5" fill="white" />
        <circle cx="65" cy="65" r="5" fill="white" />
        <circle cx="65" cy="35" r="4" fill="#ea580c" />
        <circle cx="35" cy="65" r="3" fill="#dc2626" />
      </svg>
    `;
  
    const img = new Image();
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
  
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      const pngUrl = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = 'NEXU_AI_Logo_HighRes.png';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(url);
    };
  
    img.src = url;
  };

  return (
    <div className="py-20 bg-obsidian-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Founder Hero */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20 items-center">
          <div className="md:col-span-4 flex justify-center md:justify-end">
             <div className="relative w-64 h-64 md:w-80 md:h-80">
               <div className="absolute inset-0 bg-gradient-to-br from-brand-primary to-brand-purple rounded-full blur-3xl opacity-30 animate-pulse-slow"></div>
               <div className="relative w-full h-full bg-obsidian-900 border-2 border-brand-primary/30 rounded-full overflow-hidden flex items-center justify-center shadow-2xl">
                 {/* Placeholder for real photo */}
                 <span className="text-8xl select-none">🧔🏻‍♂️</span>
               </div>
               <div className="absolute bottom-6 -right-2 bg-brand-primary text-white font-bold px-4 py-2 rounded-xl text-sm shadow-xl border border-white/10">
                 NEXU AI Founder
               </div>
             </div>
          </div>
          
          <div className="md:col-span-8 space-y-8">
            <div>
                <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight mb-2">
                Clebson Carmo
                </h2>
                <p className="text-2xl text-brand-primary font-medium tracking-wide">
                {text.about.subtitle}
                </p>
            </div>
            
            <p className="text-stone-300 leading-relaxed text-lg max-w-3xl border-l-4 border-brand-primary pl-6 py-2">
              {text.about.summary}
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <a href="mailto:clebsoncarmo@yahoo.com.br" className="px-8 py-4 bg-brand-cream text-obsidian-950 font-bold rounded-xl hover:bg-white transition-all shadow-[0_0_20px_rgba(255,247,237,0.15)] flex items-center gap-3">
                🤝 {text.about.contact}
              </a>
              <button className="px-8 py-4 bg-obsidian-900 text-white font-semibold rounded-xl border border-obsidian-700 hover:border-brand-primary/50 transition-all flex items-center gap-3">
                📄 {text.about.downloadCv}
              </button>
            </div>
          </div>
        </div>

        {/* Philosophy / Values Grid */}
        <div className="mb-24">
            <h3 className="text-2xl font-bold text-white mb-10 text-center">{text.about.skillsTitle}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {text.about.values.map((val: any, idx: number) => (
                    <div key={idx} className="bg-obsidian-900 p-8 rounded-2xl border border-obsidian-800 hover:border-brand-primary/30 transition-all hover:-translate-y-1">
                        <div className="w-12 h-12 bg-obsidian-950 rounded-lg flex items-center justify-center text-2xl mb-4 border border-obsidian-800">
                            {idx === 0 ? '💼' : idx === 1 ? '🛡️' : '🏗️'}
                        </div>
                        <h4 className="text-xl font-bold text-white mb-3">{val.title}</h4>
                        <p className="text-stone-400 leading-relaxed">{val.desc}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* Authority & Experience */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
           <div className="lg:col-span-8">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                  <span className="w-8 h-1 bg-brand-primary rounded-full"></span>
                  {text.about.expTitle}
              </h3>
              
              <div className="space-y-8">
                 {text.about.jobs.map((job: any, index: number) => (
                   <div key={index} className="group">
                      <div className="bg-gradient-to-r from-obsidian-900 to-transparent p-6 rounded-2xl border-l-4 border-obsidian-700 hover:border-brand-primary transition-all">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                            <h4 className="text-xl font-bold text-white group-hover:text-brand-primary transition-colors">{job.role}</h4>
                            <span className="font-mono text-xs text-stone-500 bg-obsidian-950 px-3 py-1 rounded-full border border-obsidian-800 mt-2 md:mt-0 w-fit">{job.period}</span>
                        </div>
                        <p className="text-sm font-bold text-brand-purple mb-4">{job.company}</p>
                        <p className="text-stone-400 text-base leading-relaxed">
                          {job.desc}
                        </p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           {/* Side Column: Education & Certs */}
           <div className="lg:col-span-4 space-y-12">
              
              {/* Education */}
              <div>
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="text-green-500">🎓</span>
                    {text.about.eduTitle}
                </h3>
                {text.about.education.map((edu: any, i: number) => (
                   <div key={i} className="bg-obsidian-900 p-5 rounded-xl border border-obsidian-800">
                      <h4 className="font-bold text-white">{edu.degree}</h4>
                      <p className="text-stone-400 text-sm mt-1">{edu.school}</p>
                      <p className="text-xs text-stone-600 mt-2">{edu.period}</p>
                   </div>
                 ))}
              </div>

              {/* Certifications */}
              <div>
                 <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="text-yellow-500">🏆</span>
                    {text.about.lblCerts}
                 </h3>
                 <ul className="space-y-3">
                    {text.about.certs.map((cert: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-stone-400 text-sm bg-obsidian-950/50 p-3 rounded-lg border border-obsidian-800/50">
                        <span className="text-brand-primary mt-0.5">✓</span>
                        {cert}
                    </li>
                    ))}
                 </ul>
              </div>

              {/* Tag Cloud */}
              <div>
                  <h3 className="text-xl font-bold text-white mb-6">Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-obsidian-900 border border-obsidian-800 rounded text-xs font-mono text-stone-500">
                        {skill}
                    </span>
                    ))}
                  </div>
              </div>

           </div>
        </div>

        {/* Brand Assets Section */}
        <div className="border-t border-obsidian-800 pt-16">
           <div className="bg-gradient-to-br from-obsidian-900 to-obsidian-950 p-8 rounded-3xl border border-obsidian-800 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-6">
                 <div className="w-24 h-24 bg-obsidian-900 rounded-2xl flex items-center justify-center shadow-lg border border-obsidian-800">
                    <Logo className="w-16 h-16" />
                 </div>
                 <div>
                    <h3 className="text-2xl font-bold text-white">{text.about.brandAssets}</h3>
                    <p className="text-stone-400 text-sm mt-2 max-w-md">
                       PNG • 2048x2048px • Transparent Background
                    </p>
                 </div>
              </div>
              
              <button 
                onClick={downloadLogo}
                className="px-8 py-4 bg-white text-obsidian-950 font-bold rounded-xl hover:bg-stone-200 transition-all flex items-center gap-3 shadow-xl"
              >
                <span>⬇️</span> {text.about.downloadLogo}
              </button>
           </div>
        </div>

      </div>
    </div>
  );
};

export default AboutSection;
