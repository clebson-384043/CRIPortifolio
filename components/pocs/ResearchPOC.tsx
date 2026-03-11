
import React, { useState } from 'react';
import { searchGroundingQuery } from '../../services/geminiService';
import { GroundingChunk, CREDIT_COSTS } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';

const ResearchPOC: React.FC = () => {
  const { text } = useLanguage();
  const { deductCredits } = useAuth();
  const [query, setQuery] = useState('');
  const [tool, setTool] = useState<'SEARCH' | 'MAPS'>('SEARCH');
  const [result, setResult] = useState<string>('');
  const [sources, setSources] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;

    if (!deductCredits(CREDIT_COSTS.SEARCH)) {
        alert(text.portal.lowCredits);
        return;
    }

    setIsLoading(true);
    setResult('');
    setSources([]);

    try {
      const response = await searchGroundingQuery(query, tool === 'MAPS');
      const text = response.text || '';
      setResult(text);
      
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks as GroundingChunk[];
      if (chunks) {
        setSources(chunks);
      }
    } catch (e) {
      console.error(e);
      setResult(text.research.err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 rounded-xl border border-slate-800">
      <div className="p-6 border-b border-slate-800 flex justify-between items-center">
        <h3 className="text-xl font-bold text-white">{text.research.title}</h3>
        <div className="flex bg-slate-950 rounded-lg p-1 border border-slate-800">
          <button 
            onClick={() => setTool('SEARCH')}
            className={`px-4 py-1.5 text-xs font-bold rounded-md transition-colors ${tool === 'SEARCH' ? 'bg-blue-600 text-white' : 'text-slate-500'}`}
          >
            {text.research.btnSearch}
          </button>
          <button 
            onClick={() => setTool('MAPS')}
            className={`px-4 py-1.5 text-xs font-bold rounded-md transition-colors ${tool === 'MAPS' ? 'bg-green-600 text-white' : 'text-slate-500'}`}
          >
            {text.research.btnMaps}
          </button>
        </div>
      </div>

      <div className="p-6 border-b border-slate-800 bg-slate-800/50">
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder={tool === 'SEARCH' ? text.research.placeSearch : text.research.placeMaps}
            className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button 
            onClick={handleSearch}
            disabled={isLoading}
            className={`px-6 rounded-lg font-bold text-white transition-all flex flex-col items-center justify-center leading-none ${tool === 'SEARCH' ? 'bg-blue-600 hover:bg-blue-500' : 'bg-green-600 hover:bg-green-500'}`}
          >
            <span>{isLoading ? '...' : text.research.btnQuery}</span>
            {!isLoading && <span className="text-[10px] opacity-80 mt-1">(-{CREDIT_COSTS.SEARCH})</span>}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <h4 className="text-sm font-bold text-slate-500 mb-4 uppercase tracking-wider">{text.research.analysis}</h4>
          <div className="prose prose-invert max-w-none prose-p:text-slate-300 prose-a:text-blue-400">
             {result ? (
               <div dangerouslySetInnerHTML={{ __html: result.replace(/\n/g, '<br/>') }} />
             ) : (
               <p className="text-slate-600 italic">Results will appear here...</p>
             )}
          </div>
        </div>
        
        {sources.length > 0 && (
          <div className="w-full md:w-72 border-t md:border-t-0 md:border-l border-slate-700 pt-6 md:pt-0 md:pl-6">
             <h4 className="text-sm font-bold text-slate-500 mb-4 uppercase tracking-wider">{text.research.cit}</h4>
             <ul className="space-y-3">
               {sources.map((source, i) => {
                 const data = source.web || source.maps;
                 if (!data) return null;
                 return (
                   <li key={i} className="bg-slate-950 p-3 rounded border border-slate-800 hover:border-slate-600 transition-colors">
                     <a href={data.uri} target="_blank" rel="noopener noreferrer" className="block">
                       <p className="text-sm font-semibold text-blue-400 truncate">{data.title}</p>
                       <p className="text-xs text-slate-500 mt-1 truncate">{data.uri}</p>
                     </a>
                   </li>
                 );
               })}
             </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResearchPOC;
