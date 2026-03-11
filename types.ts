
export enum View {
  HOME = 'HOME',
  SERVICES = 'SERVICES',
  PORTAL = 'PORTAL',
  ABOUT = 'ABOUT',
  CASES = 'CASES'
}

export enum POCType {
  CHAT_CONSULTANT = 'CHAT_CONSULTANT',
  LIVE_VOICE = 'LIVE_VOICE',
  IMAGE_STUDIO = 'IMAGE_STUDIO',
  VIDEO_VEO = 'VIDEO_VEO',
  KNOWLEDGE_SEARCH = 'KNOWLEDGE_SEARCH'
}

export enum Language {
  EN = 'EN',
  PT = 'PT'
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
}

export const CREDIT_COSTS = {
  CHAT_MSG: 1,
  SEARCH: 2,
  VOICE_SESSION: 10,
  IMAGE_EDIT: 5,
  IMAGE_GEN: 15,
  VIDEO_GEN: 40
};

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isError?: boolean;
  errorType?: string;
}

// Veo / Video Types
export interface GeneratedVideo {
  uri: string;
}

// Grounding Types
export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
  maps?: {
    uri: string;
    title: string;
  }
}
