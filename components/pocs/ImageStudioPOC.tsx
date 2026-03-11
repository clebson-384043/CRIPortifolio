
import React, { useState, useRef } from 'react';
import { generateOrEditImage } from '../../services/geminiService';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { CREDIT_COSTS } from '../../types';
import { Trash2, Plus, Sparkles, Layers, X } from 'lucide-react';

type OperationType = 'CROP' | 'FILTER' | 'ADJUST' | 'CUSTOM';

interface EditOperation {
  id: string;
  type: OperationType;
  value: string;
  description: string;
}

const ImageStudioPOC: React.FC = () => {
  const { text } = useLanguage();
  const { deductCredits } = useAuth();
  const [prompt, setPrompt] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [mode, setMode] = useState<'GENERATE' | 'EDIT'>('GENERATE');
  const [status, setStatus] = useState('');
  
  // Edit Operations State
  const [operations, setOperations] = useState<EditOperation[]>([]);
  const [newOpType, setNewOpType] = useState<OperationType>('FILTER');
  const [newOpValue, setNewOpValue] = useState('Vintage');

  // Settings for Generation
  const [size, setSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [genModel, setGenModel] = useState<'gemini-2.5-flash-image' | 'gemini-3-pro-image-preview'>('gemini-3-pro-image-preview');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Remove data URL prefix for API
        const base64 = reader.result as string;
        setSelectedImage(base64);
        setMode('EDIT'); // Switch to edit mode automatically
        setResultImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const addOperation = () => {
    if (!newOpValue) return;
    
    let description = '';
    switch (newOpType) {
      case 'CROP': description = `Crop to ${newOpValue}`; break;
      case 'FILTER': description = `Apply ${newOpValue} filter`; break;
      case 'ADJUST': description = `Adjust: ${newOpValue}`; break;
      case 'CUSTOM': description = newOpValue; break;
    }

    setOperations([...operations, {
      id: Date.now().toString(),
      type: newOpType,
      value: newOpValue,
      description
    }]);
    
    if (newOpType === 'CUSTOM') setNewOpValue('');
  };

  const removeOperation = (id: string) => {
    setOperations(operations.filter(op => op.id !== id));
  };

  const execute = async () => {
    // Construct final prompt
    let finalPrompt = prompt;
    if (mode === 'EDIT' && operations.length > 0) {
        const ops = operations.map((op, idx) => `${idx + 1}. ${op.description}`).join(' ');
        finalPrompt = `Apply the following edits sequentially: ${ops}. ${prompt ? 'Additional instruction: ' + prompt : ''}`;
    }

    if (!finalPrompt) return;
    
    // Cost Check
    const cost = mode === 'GENERATE' ? CREDIT_COSTS.IMAGE_GEN : CREDIT_COSTS.IMAGE_EDIT;
    if (!deductCredits(cost)) {
        setStatus(text.portal.lowCredits);
        return;
    }

    setIsProcessing(true);
    setResultImage(null);
    setStatus(text.image.proc);

    try {
      // Key Selection Logic for Gemini 3 Pro Image (Generation Mode)
      // Users MUST select their own API key for this model.
      let apiKey = undefined;

      if (mode === 'GENERATE' && genModel === 'gemini-3-pro-image-preview') {
        const win = window as any;
        if (win.aistudio) {
            const hasKey = await win.aistudio.hasSelectedApiKey();
            if (!hasKey) {
                setStatus('Waiting for API Key selection...');
                await win.aistudio.openSelectKey();
            }
        }
        // Grab the key from env (which should be populated after selection)
        apiKey = process.env.API_KEY;
      }

      setStatus(mode === 'GENERATE' ? 'Generating...' : 'Editing...');

      // For Edit: remove data prefix
      const rawBase64 = selectedImage ? selectedImage.split(',')[1] : undefined;
      
      const response = await generateOrEditImage(
        finalPrompt, 
        mode === 'EDIT' ? rawBase64 : undefined,
        size,
        aspectRatio,
        apiKey,
        genModel
      );

      // Extract image
      let foundImage = false;
      const parts = response.candidates?.[0]?.content?.parts;
      if (parts) {
        for (const part of parts) {
            if (part.inlineData) {
                setResultImage(`data:image/png;base64,${part.inlineData.data}`);
                foundImage = true;
                break;
            }
        }
      }
      
      if (!foundImage) {
        setStatus('No image returned.');
        console.warn("No image found in response parts", response);
      } else {
        setStatus('');
      }

    } catch (e: any) {
      console.error(e);
      setStatus('Error: ' + (e.message || 'Failed'));
      
      // Prompt for key again if permission denied (403)
      if (e.message?.includes('403') || e.message?.includes('permission')) {
          const win = window as any;
          if (win.aistudio) {
             await win.aistudio.openSelectKey();
          }
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
      {/* Controls */}
      <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 flex flex-col gap-6">
        <div>
           <h3 className="text-xl font-bold text-white mb-2">{text.image.title}</h3>
           <p className="text-slate-400 text-sm">
             {mode === 'GENERATE' 
               ? text.image.genMode
               : text.image.editMode}
           </p>
        </div>

        <div className="flex bg-slate-800 p-1 rounded-lg">
          <button 
            onClick={() => { setMode('GENERATE'); setSelectedImage(null); }}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${mode === 'GENERATE' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400'}`}
          >
            {text.image.btnGen}
          </button>
          <button 
            onClick={() => fileInputRef.current?.click()}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${mode === 'EDIT' ? 'bg-purple-600 text-white shadow' : 'text-slate-400'}`}
          >
            {text.image.btnEdit}
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*"
            onChange={handleFileChange} 
          />
        </div>

        {mode === 'GENERATE' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-slate-500 mb-1">Model</label>
              <select 
                value={genModel} 
                onChange={(e) => setGenModel(e.target.value as any)} 
                className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm"
              >
                <option value="gemini-3-pro-image-preview">Gemini 3 Pro (High Quality)</option>
                <option value="gemini-2.5-flash-image">Gemini 2.5 Flash (Fast)</option>
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {genModel === 'gemini-3-pro-image-preview' && (
                <div>
                  <label className="block text-xs text-slate-500 mb-1">{text.image.size}</label>
                  <select value={size} onChange={(e) => setSize(e.target.value as any)} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm">
                    <option value="1K">1K (Standard)</option>
                    <option value="2K">2K (High Res)</option>
                    <option value="4K">4K (Ultra)</option>
                  </select>
                </div>
              )}
              <div className={genModel !== 'gemini-3-pro-image-preview' ? 'col-span-2' : ''}>
                <label className="block text-xs text-slate-500 mb-1">{text.image.ratio}</label>
                <select value={aspectRatio} onChange={(e) => setAspectRatio(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm">
                  <option value="1:1">1:1 Square</option>
                  <option value="16:9">16:9 Landscape</option>
                  <option value="9:16">9:16 Portrait</option>
                  <option value="4:3">4:3 Standard</option>
                  <option value="3:4">3:4 Portrait</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {selectedImage && mode === 'EDIT' && (
           <div className="flex flex-col gap-4">
             <div className="relative rounded-lg overflow-hidden border border-slate-700 max-h-48">
                <img src={selectedImage} alt="Source" className="w-full h-full object-cover opacity-70" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                   <span className="text-xs font-bold bg-black/50 px-2 py-1 rounded text-white">Source Image</span>
                </div>
             </div>

             {/* Operations Stack */}
             <div className="bg-slate-950 rounded-lg p-4 border border-slate-800">
               <div className="flex items-center justify-between mb-3">
                 <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                   <Layers className="w-4 h-4 text-purple-400" />
                   Edit Operations
                 </h4>
                 <span className="text-xs text-slate-500">{operations.length} pending</span>
               </div>

               {/* List of Operations */}
               <div className="space-y-2 mb-4 max-h-32 overflow-y-auto custom-scrollbar">
                 {operations.length === 0 && (
                   <p className="text-xs text-slate-600 italic text-center py-2">No operations added yet.</p>
                 )}
                 {operations.map((op, idx) => (
                   <div key={op.id} className="flex items-center justify-between bg-slate-900 p-2 rounded border border-slate-800 text-xs group">
                     <div className="flex items-center gap-2">
                       <span className="bg-slate-800 text-slate-400 w-5 h-5 flex items-center justify-center rounded-full text-[10px]">{idx + 1}</span>
                       <span className="text-purple-300 font-medium">{op.type}</span>
                       <span className="text-slate-300 truncate max-w-[120px]">{op.value}</span>
                     </div>
                     <button onClick={() => removeOperation(op.id)} className="text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                       <X className="w-3 h-3" />
                     </button>
                   </div>
                 ))}
               </div>

               {/* Add Operation Controls */}
               <div className="flex gap-2">
                 <select 
                   value={newOpType} 
                   onChange={(e) => {
                     setNewOpType(e.target.value as OperationType);
                     // Reset value to default for new type
                     if (e.target.value === 'CROP') setNewOpValue('Square (1:1)');
                     else if (e.target.value === 'FILTER') setNewOpValue('Vintage');
                     else if (e.target.value === 'ADJUST') setNewOpValue('Brightness +20%');
                     else setNewOpValue('');
                   }}
                   className="bg-slate-900 border border-slate-700 rounded text-xs text-white px-2 py-1 w-24"
                 >
                   <option value="FILTER">Filter</option>
                   <option value="CROP">Crop</option>
                   <option value="ADJUST">Adjust</option>
                   <option value="CUSTOM">Custom</option>
                 </select>

                 {newOpType === 'CROP' && (
                   <select value={newOpValue} onChange={(e) => setNewOpValue(e.target.value)} className="flex-1 bg-slate-900 border border-slate-700 rounded text-xs text-white px-2 py-1">
                     <option value="Square (1:1)">Square (1:1)</option>
                     <option value="Landscape (16:9)">Landscape (16:9)</option>
                     <option value="Portrait (9:16)">Portrait (9:16)</option>
                     <option value="Focus on Subject">Focus on Subject</option>
                   </select>
                 )}

                 {newOpType === 'FILTER' && (
                   <select value={newOpValue} onChange={(e) => setNewOpValue(e.target.value)} className="flex-1 bg-slate-900 border border-slate-700 rounded text-xs text-white px-2 py-1">
                     <option value="Vintage">Vintage</option>
                     <option value="Black & White">Black & White</option>
                     <option value="Cyberpunk">Cyberpunk</option>
                     <option value="Watercolor">Watercolor</option>
                     <option value="Oil Painting">Oil Painting</option>
                     <option value="Cinematic">Cinematic</option>
                   </select>
                 )}

                 {newOpType === 'ADJUST' && (
                   <select value={newOpValue} onChange={(e) => setNewOpValue(e.target.value)} className="flex-1 bg-slate-900 border border-slate-700 rounded text-xs text-white px-2 py-1">
                     <option value="Brightness +20%">Brightness +20%</option>
                     <option value="Brightness -20%">Brightness -20%</option>
                     <option value="Contrast +20%">Contrast +20%</option>
                     <option value="Saturation +20%">Saturation +20%</option>
                     <option value="Sharpen">Sharpen</option>
                   </select>
                 )}

                 {newOpType === 'CUSTOM' && (
                   <input 
                     type="text" 
                     value={newOpValue} 
                     onChange={(e) => setNewOpValue(e.target.value)} 
                     placeholder="Describe edit..."
                     className="flex-1 bg-slate-900 border border-slate-700 rounded text-xs text-white px-2 py-1"
                   />
                 )}

                 <button onClick={addOperation} className="bg-purple-600 hover:bg-purple-500 text-white p-1.5 rounded transition-colors">
                   <Plus className="w-4 h-4" />
                 </button>
               </div>
             </div>
           </div>
        )}

        <div className="flex-1 flex flex-col justify-end gap-2">
           <label className="text-sm font-medium text-slate-300">
             {mode === 'GENERATE' ? text.image.descGen : text.image.descEdit}
           </label>
           <textarea
             className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-cyan-500 focus:outline-none resize-none h-32"
             placeholder={mode === 'GENERATE' ? text.image.placeGen : text.image.placeEdit}
             value={prompt}
             onChange={(e) => setPrompt(e.target.value)}
           />
           <button 
             disabled={isProcessing || (!prompt && operations.length === 0)}
             onClick={execute}
             className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg font-bold text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed mt-2 flex justify-center items-center gap-2"
           >
             <span>{isProcessing ? text.image.proc : (mode === 'GENERATE' ? text.image.actionGen : text.image.actionEdit)}</span>
             {!isProcessing && (
                <span className="text-xs bg-black/20 px-2 py-0.5 rounded">-{mode === 'GENERATE' ? CREDIT_COSTS.IMAGE_GEN : CREDIT_COSTS.IMAGE_EDIT}</span>
             )}
           </button>
        </div>
      </div>

      {/* Preview */}
      <div className="bg-black/50 rounded-xl border border-slate-800 flex items-center justify-center relative overflow-hidden">
        {resultImage ? (
           <img src={resultImage} alt="Result" className="max-w-full max-h-full object-contain shadow-2xl" />
        ) : (
           <div className="text-center p-8">
             <div className="text-6xl mb-4 grayscale opacity-20">🖼️</div>
             <p className="text-slate-600">{text.image.result}</p>
           </div>
        )}
        {isProcessing && (
           <div className="absolute inset-0 bg-black/70 flex items-center justify-center backdrop-blur-sm">
              <div className="flex flex-col items-center">
                 <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                 <p className="text-cyan-400 font-mono text-sm animate-pulse">{status}</p>
              </div>
           </div>
        )}
      </div>
    </div>
  );
};

export default ImageStudioPOC;
