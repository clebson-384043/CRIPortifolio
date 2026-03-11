import React, { useState } from 'react';
import { POCType } from '../types';
import ChatBotPOC from './pocs/ChatBotPOC';
import LiveVoicePOC from './pocs/LiveVoicePOC';
import ImageStudioPOC from './pocs/ImageStudioPOC';
import VideoVeoPOC from './pocs/VideoVeoPOC';
import ResearchPOC from './pocs/ResearchPOC';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

interface ClientPortalProps {
  onBack: () => void;
}

const ClientPortal: React.FC<ClientPortalProps> = ({ onBack }) => {
  const [activePOC, setActivePOC] = useState<POCType>(POCType.CHAT_CONSULTANT);
  const { text } = useLanguage();
  const { user, login, credits } = useAuth();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    await login();
    setIsLoggingIn(false);
  };

  // Login Screen (if not authenticated)
  if (!user) {
    return (
      <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-obsidian-950 p-4 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-purple/10 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '1s'}}></div>
        
        <div className="max-w-md w-full bg-obsidian-900/80 backdrop-blur-xl rounded-3xl border border-obsidian-800 p-10 shadow-2xl relative z-10">
          
          <div className="relative z-10 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-obsidian-800 to-obsidian-900 rounded-2xl mx-auto flex items-center justify-center mb-8 border border-obsidian-700 shadow-lg">
               <span className="text-4xl">🔒</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-3">{text.portal.loginTitle}</h2>
            <p className="text-stone-400 mb-10 leading-relaxed">{text.portal.loginDesc}</p>
            
            <button 
              onClick={handleLogin}
              disabled={isLoggingIn}
              className="w-full bg-brand-cream text-obsidian-950 hover:bg-white font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-3 shadow-lg shadow-white/5"
            >
              {isLoggingIn ? (
                <div className="w-5 h-5 border-2 border-obsidian-600 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  {text.portal.loginBtn}
                </>
              )}
            </button>
            <button onClick={onBack} className="mt-8 text-sm text-stone-500 hover:text-white transition-colors">
               ← {text.portal.exit}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const renderPOC = () => {
    switch (activePOC) {
      case POCType.CHAT_CONSULTANT: return <ChatBotPOC />;
      case POCType.LIVE_VOICE: return <LiveVoicePOC />;
      case POCType.IMAGE_STUDIO: return <ImageStudioPOC />;
      case POCType.VIDEO_VEO: return <VideoVeoPOC />;
      case POCType.KNOWLEDGE_SEARCH: return <ResearchPOC />;
      default: return <ChatBotPOC />;
    }
  };

  return (
    <div className="flex h-[calc(100vh-5rem)] bg-obsidian-950">
      {/* Sidebar */}
      <aside className="w-72 bg-obsidian-900 border-r border-obsidian-800 hidden md:flex flex-col z-20 shadow-xl">
        <div className="p-6 border-b border-obsidian-800 bg-obsidian-900">
           {/* User Profile Snippet */}
           <div className="flex items-center gap-4 mb-6 p-2 rounded-lg hover:bg-obsidian-800 transition-colors cursor-pointer">
              <img src={user.avatarUrl} alt="Avatar" className="w-10 h-10 rounded-full border border-obsidian-700" />
              <div className="overflow-hidden">
                 <p className="text-sm font-bold text-white truncate">{user.name}</p>
                 <p className="text-xs text-stone-500 truncate">{user.email}</p>
              </div>
           </div>
           
           {/* Credits Badge */}
           <div className="bg-obsidian-950 border border-obsidian-800 rounded-xl p-4 flex justify-between items-center shadow-inner">
              <span className="text-xs text-stone-400 uppercase font-bold tracking-wider">{text.portal.credits}</span>
              <span className={`font-mono font-bold text-lg ${credits > 20 ? 'text-brand-primary' : 'text-red-500 animate-pulse'}`}>
                {credits}
              </span>
           </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
           <p className="px-4 py-2 text-xs font-bold text-stone-500 uppercase tracking-widest">{text.portal.menuTitle}</p>
           {[
             { id: POCType.CHAT_CONSULTANT, label: text.portal.pocChat, icon: '🤖' },
             { id: POCType.LIVE_VOICE, label: text.portal.pocVoice, icon: '🎙️' },
             { id: POCType.IMAGE_STUDIO, label: text.portal.pocImage, icon: '🎨' },
             { id: POCType.VIDEO_VEO, label: text.portal.pocVeo, icon: '🎬' },
             { id: POCType.KNOWLEDGE_SEARCH, label: text.portal.pocSearch, icon: '🔍' },
           ].map((item) => (
            <button 
              key={item.id}
              onClick={() => setActivePOC(item.id)}
              className={`w-full text-left px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-3 ${
                activePOC === item.id 
                  ? 'bg-brand-primary/10 text-brand-primary border border-brand-primary/20 shadow-lg shadow-brand-primary/5' 
                  : 'text-stone-400 hover:bg-obsidian-800 hover:text-white'
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
           ))}
        </nav>
        <div className="p-6 border-t border-obsidian-800 bg-obsidian-900">
           <button onClick={onBack} className="flex items-center gap-2 text-stone-400 hover:text-white text-sm font-medium transition-colors">
             <span className="text-lg">↩</span> {text.portal.exit}
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative bg-obsidian-950">
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>

        {/* Mobile Header (Credits + Select) */}
        <div className="md:hidden bg-obsidian-900 border-b border-obsidian-800 p-4 flex flex-col gap-4 z-20">
           <div className="flex justify-between items-center">
             <div className="flex items-center gap-3">
                <img src={user.avatarUrl} alt="Avatar" className="w-8 h-8 rounded-full" />
                <span className="text-sm font-bold text-white">{user.name}</span>
             </div>
             <div className="bg-obsidian-950 border border-obsidian-700 rounded-lg px-3 py-1.5">
                 <span className={`font-mono font-bold text-sm ${credits > 20 ? 'text-brand-primary' : 'text-red-500'}`}>
                   {credits} CR
                 </span>
             </div>
           </div>
           
           <select 
             className="bg-obsidian-800 text-white p-3 rounded-lg border border-obsidian-700 w-full focus:outline-none focus:border-brand-primary"
             value={activePOC}
             onChange={(e) => setActivePOC(e.target.value as POCType)}
           >
              <option value={POCType.CHAT_CONSULTANT}>{text.portal.pocChat}</option>
              <option value={POCType.LIVE_VOICE}>{text.portal.pocVoice}</option>
              <option value={POCType.IMAGE_STUDIO}>{text.portal.pocImage}</option>
              <option value={POCType.VIDEO_VEO}>{text.portal.pocVeo}</option>
              <option value={POCType.KNOWLEDGE_SEARCH}>{text.portal.pocSearch}</option>
           </select>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 relative z-10">
          <div className="max-w-6xl mx-auto h-full">
            {renderPOC()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientPortal;