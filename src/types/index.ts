export const GenerationType = {
  VIDEO: "VIDEO",
  AUDIO: "AUDIO",
} as const;

export type GenerationTypeValue = typeof GenerationType[keyof typeof GenerationType];

export const GenerationStatus = {
  PENDING: "PENDING",
  PROCESSING: "PROCESSING",
  GENERATING_VOICE: "GENERATING_VOICE",
  GENERATING_VIDEO: "GENERATING_VIDEO",
  COMPLETED: "COMPLETED",
  FAILED: "FAILED",
} as const;

export type GenerationStatusValue =
  typeof GenerationStatus[keyof typeof GenerationStatus];

export interface Avatar {
  id: string;
  name: string;
  imageUrl: string;
  voiceId: string;
  videoUrl: string | null;
  audioUrl: string | null;
  textTemplate: string;
}

export interface Generation {
  id: string;
  avatarId: string;
  type: GenerationTypeValue;
  text: string;
  status: GenerationStatusValue;
  videoUrl?: string | null;
  audioUrl?: string | null;
  createdAt: string;
  errorMessage?: string;
  avatar: {
    id: string;
    name: string;
    imageUrl: string;
  };
}

export interface GenerateRequest {
  avatarId: string;
  type: GenerationTypeValue;
  text: string;
}

export interface GenerateResponse {
  id: string;
}

export interface Limits {
  audio: number;
  video: number;
}

