
import React, { useState } from 'react';
import { generateVeoVideo } from '../../services/geminiService';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { CREDIT_COSTS } from '../../types';

const VideoVeoPOC: React.FC = () => {
  const { text } = useLanguage();
  const { deductCredits } = useAuth();
  const [prompt, setPrompt] = useState('');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [status, setStatus] = useState('');

  const handleGenerate = async () => {
    if (!prompt) return;

    if (!deductCredits(CREDIT_COSTS.VIDEO_GEN)) {
        setStatus(text.portal.lowCredits);
        return;
    }
    
    setIsGenerating(true);
    setStatus('Checking API Key permissions...');
    setVideoUrl(null);

    try {
      // 1. Check/Request Key via UI wrapper as mandated for Veo
      const win = window as any;
      if (win.aistudio) {
        const hasKey = await win.aistudio.hasSelectedApiKey();
        if (!hasKey) {
          setStatus('Waiting for API Key selection...');
          await win.aistudio.openSelectKey();
        }
      } else {
        // Fallback for dev environment without the wrapper injection
        console.warn("window.aistudio not found. Using default env key if available.");
      }

      setStatus(text.veo.status);
      
      const key = process.env.API_KEY || ''; 
      
      const uri = await generateVeoVideo(prompt, key, aspectRatio);
      
      if (uri) {
        // Fetch the actual binary (requires key appended)
        const fetchUrl = `${uri}&key=${key}`;
        const res = await fetch(fetchUrl);
        const blob = await res.blob();
        setVideoUrl(URL.createObjectURL(blob));
        setStatus('Complete!');
      } else {
        setStatus('Failed to generate video.');
      }

    } catch (e: any) {
      console.error(e);
      setStatus(`Error: ${e.message || 'Unknown error'}`);
      // Retry logic for key
      if (e.message?.includes('Requested entity was not found')) {
          const win = window as any;
          if (win.aistudio) {
             await win.aistudio.openSelectKey();
          }
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
      <div className="p-6 border-b border-slate-800 bg-gradient-to-r from-slate-900 to-indigo-950">
        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
          🎥 {text.veo.title}
        </h3>
        <p className="text-slate-400 text-sm mt-1">
          {text.veo.desc}
        </p>
      </div>

      <div className="flex-1 p-8 flex flex-col items-center justify-center">
        {videoUrl ? (
          <div className="relative w-full max-w-2xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
            <video 
              src={videoUrl} 
              controls 
              autoPlay 
              loop 
              className="w-full h-full"
            />
          </div>
        ) : (
          <div className="text-center opacity-30">
            <div className="text-8xl mb-4">🎞️</div>
            <p>{text.veo.empty}</p>
          </div>
        )}
        
        {isGenerating && (
          <div className="mt-8 flex flex-col items-center animate-pulse">
            <div className="h-2 w-64 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 w-1/2 animate-[translateX_1s_infinite]"></div>
            </div>
            <p className="text-indigo-400 mt-2 font-mono text-sm">{status}</p>
          </div>
        )}
      </div>

      <div className="p-6 bg-slate-950 border-t border-slate-800 z-10">
        <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
          <select 
            className="bg-slate-900 border border-slate-700 text-white rounded-lg px-4 py-3"
            value={aspectRatio}
            onChange={(e) => setAspectRatio(e.target.value as any)}
          >
            <option value="16:9">Landscape (16:9)</option>
            <option value="9:16">Portrait (9:16)</option>
          </select>
          <input 
            type="text" 
            placeholder={text.veo.place}
            className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-indigo-500 outline-none"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isGenerating}
          />
          <button 
            onClick={handleGenerate}
            disabled={isGenerating || !prompt}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-8 rounded-lg transition-all shadow-lg shadow-indigo-900/40 disabled:opacity-50 flex flex-col items-center justify-center leading-none"
          >
            <span>{text.veo.btn}</span>
            <span className="text-[10px] opacity-80 mt-1">(-{CREDIT_COSTS.VIDEO_GEN})</span>
          </button>
        </div>
        <div className="text-center mt-4">
             <button 
               className="text-xs text-slate-500 hover:text-indigo-400 underline"
               onClick={() => window.open('https://ai.google.dev/gemini-api/docs/billing', '_blank')}
             >
               {text.veo.billing}
             </button>
        </div>
      </div>
    </div>
  );
};

export default VideoVeoPOC;
