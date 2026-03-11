import { GoogleGenAI, LiveServerMessage, Modality, Type } from "@google/genai";

// Ensure API Key is available
const API_KEY = process.env.API_KEY || '';

// Singleton instance (Legacy/Default)
export const ai = new GoogleGenAI({ apiKey: API_KEY });

// Helper to get a fresh client (crucial for picking up API keys selected at runtime)
const getClient = (apiKey?: string) => {
  return new GoogleGenAI({ apiKey: apiKey || process.env.API_KEY || '' });
};

// --- Chat Service ---
export const createChatSession = (systemInstruction: string) => {
  // Use fresh client to capture environment key changes
  return getClient().chats.create({
    model: 'gemini-3-pro-preview',
    config: {
      systemInstruction,
      thinkingConfig: { thinkingBudget: 1024 } // Mild thinking for better reasoning
    },
  });
};

// --- Grounding Service ---
export const searchGroundingQuery = async (query: string, useMaps: boolean = false) => {
  // Select model and tools based on intent
  const model = 'gemini-2.5-flash';
  const tools = useMaps ? [{ googleMaps: {} }] : [{ googleSearch: {} }];
  
  // For maps, we try to get location if possible, else default
  let toolConfig = undefined;
  if (useMaps) {
     // Simplified for demo: static location or could be dynamic
     toolConfig = {
      retrievalConfig: {
        latLng: {
          latitude: 37.7749, // Default to SF or get from browser
          longitude: -122.4194
        }
      }
    };
  }

  // Use fresh client
  const response = await getClient().models.generateContent({
    model,
    contents: query,
    config: {
      tools,
      toolConfig
    }
  });

  return response;
};

// --- Image Generation & Editing (Nano Banana / Pro) ---
export const generateOrEditImage = async (
  prompt: string, 
  base64Image?: string, 
  size: '1K'|'2K'|'4K' = '1K',
  aspectRatio: string = '1:1',
  apiKey?: string,
  generationModel: 'gemini-2.5-flash-image' | 'gemini-3-pro-image-preview' = 'gemini-3-pro-image-preview'
) => {
  const client = getClient(apiKey);
  
  if (base64Image) {
    // If editing (image provided), use Flash Image (Nano Banana)
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image,
              mimeType: 'image/jpeg', 
            },
          },
          { text: prompt },
        ],
      },
    });
    return response;
  } else {
    // Generation
    // 'gemini-3-pro-image-preview' supports imageSize
    // 'gemini-2.5-flash-image' does NOT support imageSize
    
    const config: any = {
      imageConfig: {
        aspectRatio: aspectRatio,
      }
    };

    if (generationModel === 'gemini-3-pro-image-preview') {
      config.imageConfig.imageSize = size;
    }

    const response = await client.models.generateContent({
      model: generationModel,
      contents: {
        parts: [{ text: prompt }],
      },
      config: config,
    });
    return response;
  }
};

// --- Veo Video Generation ---
// NOTE: Veo requires the user to select their own key via window.aistudio
export const generateVeoVideo = async (
  prompt: string, 
  videoKey: string, // Passed from the component after selection
  aspectRatio: '16:9' | '9:16' = '16:9',
  imageBytes?: string
) => {
  // Create a specific instance with the selected key
  const veoAi = new GoogleGenAI({ apiKey: videoKey });

  let operation;
  
  if (imageBytes) {
    // Image-to-Video
    operation = await veoAi.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: prompt, // Optional but good to have
      image: {
        imageBytes: imageBytes,
        mimeType: 'image/jpeg' 
      },
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: aspectRatio
      }
    });
  } else {
    // Text-to-Video
    operation = await veoAi.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: prompt,
      config: {
        numberOfVideos: 1,
        resolution: '1080p',
        aspectRatio: aspectRatio
      }
    });
  }

  // Polling
  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 5000));
    operation = await veoAi.operations.getVideosOperation({operation: operation});
  }

  return operation.response?.generatedVideos?.[0]?.video?.uri;
};

// --- Audio Utils for Live API ---
export const encodeAudio = (bytes: Uint8Array) => {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};

export const decodeAudio = (base64: string) => {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};

export const decodeAudioData = async (
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> => {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}