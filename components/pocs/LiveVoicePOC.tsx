
import React, { useState, useRef, useEffect } from 'react';
import { encodeAudio, decodeAudio, decodeAudioData } from '../../services/geminiService';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { CREDIT_COSTS } from '../../types';

const LiveVoicePOC: React.FC = () => {
  const { text } = useLanguage();
  const { deductCredits } = useAuth();
  const [isConnected, setIsConnected] = useState(false);
  const [status, setStatus] = useState('');
  const [volume, setVolume] = useState(0);

  // Initialize status with translated text
  useEffect(() => {
    setStatus(text.voice.ready);
  }, [text]);

  // Audio Refs
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const sessionPromiseRef = useRef<Promise<any> | null>(null);

  const cleanup = () => {
    // Stop all audio sources
    sourcesRef.current.forEach(source => {
        try { source.stop(); } catch(e) {}
    });
    sourcesRef.current.clear();
    
    // Close contexts
    inputAudioContextRef.current?.close();
    outputAudioContextRef.current?.close();
    
    inputAudioContextRef.current = null;
    outputAudioContextRef.current = null;
    setIsConnected(false);
    setStatus('Disconnected');
  };

  const startSession = async () => {
    // Check credits
    if (!deductCredits(CREDIT_COSTS.VOICE_SESSION)) {
       setStatus(text.portal.lowCredits);
       return;
    }

    try {
      setStatus(text.voice.init);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      inputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      const outputNode = outputAudioContextRef.current!.createGain();
      outputNode.connect(outputAudioContextRef.current!.destination);

      setStatus(text.voice.connecting);

      // Instantiate local client to ensure we have the latest API KEY from env
      const client = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

      sessionPromiseRef.current = client.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        callbacks: {
          onopen: () => {
            setStatus(text.voice.connected);
            setIsConnected(true);
            
            // Audio Input Pipeline
            const source = inputAudioContextRef.current!.createMediaStreamSource(stream);
            const scriptProcessor = inputAudioContextRef.current!.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              // Calculate volume for visualizer
              let sum = 0;
              for(let i=0; i<inputData.length; i++) sum += inputData[i]*inputData[i];
              setVolume(Math.sqrt(sum/inputData.length));

              // PCM Conversion
              const l = inputData.length;
              const int16 = new Int16Array(l);
              for (let i = 0; i < l; i++) {
                int16[i] = inputData[i] * 32768;
              }
              const pcmData = encodeAudio(new Uint8Array(int16.buffer));
              
              sessionPromiseRef.current!.then(session => {
                session.sendRealtimeInput({
                  media: {
                    mimeType: 'audio/pcm;rate=16000',
                    data: pcmData
                  }
                });
              });
            };
            
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputAudioContextRef.current!.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            
            if (base64Audio && outputAudioContextRef.current) {
              const ctx = outputAudioContextRef.current;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
              
              const audioBuffer = await decodeAudioData(
                decodeAudio(base64Audio),
                ctx,
                24000,
                1
              );
              
              const source = ctx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(outputNode);
              source.addEventListener('ended', () => sourcesRef.current.delete(source));
              
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
            }
            
            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => s.stop());
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onclose: () => {
             cleanup();
          },
          onerror: (err) => {
             console.error(err);
             setStatus('Error occurred: ' + err.message);
             cleanup();
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Fenrir' } }
          },
          systemInstruction: "You are a professional, slightly witty AI technical consultant. Keep answers concise."
        }
      });

    } catch (e: any) {
      console.error(e);
      setStatus('Failed to start session. ' + e.message);
    }
  };

  const handleToggle = () => {
    if (isConnected) {
      cleanup();
    } else {
      startSession();
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-8 bg-slate-900 rounded-xl border border-slate-800">
      <div className={`w-48 h-48 rounded-full flex items-center justify-center border-4 transition-all duration-500 ${isConnected ? 'border-cyan-500 shadow-[0_0_50px_rgba(6,182,212,0.4)]' : 'border-slate-700'}`}>
         {isConnected ? (
           <div className="flex gap-2 items-center h-16">
             {[1,2,3,4,5].map(i => (
               <div key={i} className="w-2 bg-cyan-400 rounded-full transition-all duration-75" 
                    style={{ height: `${20 + (volume * 1000 * Math.random())}px` }}></div>
             ))}
           </div>
         ) : (
           <div className="text-6xl">🎙️</div>
         )}
      </div>

      <div className="mt-8 text-center space-y-4">
        <h3 className="text-2xl font-bold text-white">{text.voice.title}</h3>
        <p className={`font-mono ${isConnected ? 'text-green-400' : 'text-slate-500'}`}>{status}</p>
        
        <button
          onClick={handleToggle}
          className={`px-8 py-3 rounded-full font-bold text-lg transition-all flex items-center justify-center mx-auto gap-2 ${
            isConnected 
              ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30 border border-red-500/50' 
              : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-900/50'
          }`}
        >
          {isConnected ? text.voice.end : (
            <>
               <span>{text.voice.start}</span>
               <span className="text-sm opacity-80 bg-black/20 px-2 rounded-full">-{CREDIT_COSTS.VOICE_SESSION}</span>
            </>
          )}
        </button>
      </div>

      <div className="mt-8 text-xs text-slate-500 max-w-md text-center">
        {text.voice.desc}
      </div>
    </div>
  );
};

export default LiveVoicePOC;
