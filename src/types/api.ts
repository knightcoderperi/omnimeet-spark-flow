
// Authentication Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: User;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

// Recording Types
export interface RecordingConfig {
  quality: 'high' | 'medium' | 'low';
  format: 'mp4' | 'webm' | 'wav';
  sampleRate?: number;
  bitrate?: number;
}

export interface RecordingSession {
  id: string;
  status: 'idle' | 'recording' | 'paused' | 'completed';
  startTime: Date;
  endTime?: Date;
  duration: number;
  fileSize?: number;
  config: RecordingConfig;
}

export interface RecordingStatus {
  sessionId: string;
  status: RecordingSession['status'];
  duration: number;
  audioLevel: number;
  isConnected: boolean;
}

// Transcription Types
export interface TranscriptionEntry {
  id: string;
  sessionId: string;
  text: string;
  speaker: string;
  timestamp: Date;
  confidence: number;
  startTime: number;
  endTime: number;
  color?: string;
}

export interface TranscriptionUpdate {
  type: 'partial' | 'final';
  entry: TranscriptionEntry;
}

// Chat Types
export interface ChatMessage {
  id: string;
  sessionId: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  context?: string;
}

export interface ChatResponse {
  message: ChatMessage;
  suggestions?: string[];
  actionItems?: string[];
}

// Analytics Types
export interface SessionAnalytics {
  sessionId: string;
  duration: number;
  speakerStats: SpeakerStats[];
  topics: Topic[];
  sentiment: SentimentAnalysis;
  actionItems: ActionItem[];
  summary: string;
}

export interface SpeakerStats {
  speaker: string;
  speakingTime: number;
  wordCount: number;
  percentage: number;
}

export interface Topic {
  name: string;
  confidence: number;
  mentions: number;
  timeSpent: number;
}

export interface SentimentAnalysis {
  overall: 'positive' | 'neutral' | 'negative';
  score: number;
  timeline: SentimentPoint[];
}

export interface SentimentPoint {
  timestamp: Date;
  score: number;
  sentiment: 'positive' | 'neutral' | 'negative';
}

export interface ActionItem {
  id: string;
  text: string;
  assignee?: string;
  priority: 'high' | 'medium' | 'low';
  dueDate?: Date;
  completed: boolean;
}

// File Upload Types
export interface UploadProgress {
  sessionId: string;
  chunkIndex: number;
  totalChunks: number;
  percentage: number;
  bytesUploaded: number;
  totalBytes: number;
}

export interface UploadError {
  sessionId: string;
  chunkIndex: number;
  error: string;
  retryable: boolean;
}

// WebSocket Event Types
export interface SocketEvents {
  // Recording events
  'recording:status': (data: RecordingStatus) => void;
  'recording:start': (config: RecordingConfig) => void;
  'recording:stop': (data: { sessionId: string }) => void;
  'recording:pause': (data: { sessionId: string }) => void;
  'recording:resume': (data: { sessionId: string }) => void;

  // Transcription events
  'transcription:update': (data: TranscriptionUpdate) => void;
  'transcription:complete': (data: { sessionId: string; entries: TranscriptionEntry[] }) => void;

  // Chat events
  'chat:message': (message: ChatMessage) => void;
  'chat:send': (data: { message: string; context: string }) => void;

  // Audio events
  'audio:level': (level: number) => void;
  'audio:data': (data: ArrayBuffer) => void;

  // System events
  'connect': () => void;
  'disconnect': (reason: string) => void;
  'error': (error: Error) => void;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface ApiError {
  message: string;
  code: string;
  details?: any;
}
