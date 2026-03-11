
import React, { useState, useRef, useEffect } from 'react';
import { createChatSession } from '../../services/geminiService';
import { ChatMessage, CREDIT_COSTS } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';

const ChatBotPOC: React.FC = () => {
  const { text, language } = useLanguage();
  const { deductCredits } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  // Initialize chat session
  const chatSessionRef = useRef<any>(null);

  useEffect(() => {
    // Reset messages and session when language changes
    setMessages([
      { role: 'model', text: text.chat.init, timestamp: new Date() }
    ]);
    chatSessionRef.current = createChatSession(text.chat.system);
  }, [language, text]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    // Check credits
    if (!deductCredits(CREDIT_COSTS.CHAT_MSG)) {
      alert(`${text.portal.lowCredits}. ${text.portal.cost}: ${CREDIT_COSTS.CHAT_MSG}`);
      return;
    }

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    const currentInput = input; // Store for retry
    setInput('');
    setIsLoading(true);

    try {
      const result = await chatSessionRef.current.sendMessage({ message: userMsg.text });
      const modelMsg: ChatMessage = {
        role: 'model',
        text: result.text,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, modelMsg]);
    } catch (error: any) {
      console.error("Chat Error:", error);
      
      let errorMessage = "I encountered an unexpected error. Please try again.";
      let errorType = "UNKNOWN";

      if (error.message) {
        if (error.message.includes("429") || error.message.includes("Resource has been exhausted")) {
          errorMessage = "I'm currently receiving too many requests. Please wait a moment before trying again.";
          errorType = "RATE_LIMIT";
        } else if (error.message.includes("401") || error.message.includes("API key")) {
          errorMessage = "There seems to be an issue with the API configuration. Please check your API key.";
          errorType = "AUTH";
        } else if (error.message.includes("503") || error.message.includes("overloaded")) {
          errorMessage = "The AI service is currently overloaded. Please try again in a few seconds.";
          errorType = "SERVER_OVERLOAD";
        } else if (error.message.includes("SAFETY")) {
          errorMessage = "I cannot generate a response for that input due to safety guidelines.";
          errorType = "SAFETY";
        } else if (error.message.includes("fetch failed") || error.message.includes("network")) {
          errorMessage = "Network error. Please check your internet connection.";
          errorType = "NETWORK";
        }
      }

      setMessages(prev => [...prev, { 
        role: 'model', 
        text: errorMessage, 
        timestamp: new Date(),
        isError: true,
        errorType
      }]);
      
      // Optional: Restore input if it was a transient error so user can retry easily
      if (errorType === 'NETWORK' || errorType === 'SERVER_OVERLOAD' || errorType === 'RATE_LIMIT') {
          setInput(currentInput);
      }

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 rounded-xl border border-slate-800 shadow-2xl overflow-hidden">
      <div className="bg-slate-800 px-6 py-4 border-b border-slate-700 flex justify-between items-center">
        <h3 className="font-semibold text-white flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          {text.chat.title}
        </h3>
        <span className="text-xs text-slate-400 border border-slate-600 px-2 py-1 rounded">{text.chat.thinking}</span>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-5 py-4 ${
              msg.role === 'user' 
                ? 'bg-cyan-600 text-white rounded-br-none' 
                : msg.isError 
                  ? 'bg-red-900/50 text-red-200 border border-red-700 rounded-bl-none'
                  : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none'
            }`}>
              {msg.isError && (
                <div className="flex items-center gap-2 mb-2 text-red-400 text-xs font-bold uppercase tracking-wider">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Error
                </div>
              )}
              <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
              <p className="text-[10px] opacity-50 mt-2 text-right">
                {msg.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-800 rounded-2xl px-5 py-4 rounded-bl-none border border-slate-700">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75"></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="p-4 bg-slate-900 border-t border-slate-800">
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
            placeholder={text.chat.placeholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-medium transition-colors flex flex-col items-center justify-center leading-none"
          >
            <span>{text.chat.send}</span>
            <span className="text-[10px] opacity-80 mt-1">(-{CREDIT_COSTS.CHAT_MSG})</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBotPOC;
