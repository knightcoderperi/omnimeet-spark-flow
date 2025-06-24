
import { create } from 'zustand';

export interface TranscriptEntry {
  id: string;
  speaker: string;
  text: string;
  timestamp: number;
  confidence: number;
  color: string;
}

interface RecordingState {
  isRecording: boolean;
  isPaused: boolean;
  duration: number;
  audioLevel: number;
  transcriptEntries: TranscriptEntry[];
  mediaStream: MediaStream | null;
  setRecording: (recording: boolean) => void;
  setPaused: (paused: boolean) => void;
  setDuration: (duration: number) => void;
  setAudioLevel: (level: number) => void;
  addTranscriptEntry: (entry: TranscriptEntry) => void;
  setMediaStream: (stream: MediaStream | null) => void;
}

export const useRecordingStore = create<RecordingState>((set) => ({
  isRecording: false,
  isPaused: false,
  duration: 0,
  audioLevel: 0,
  transcriptEntries: [],
  mediaStream: null,
  setRecording: (recording) => set({ isRecording: recording }),
  setPaused: (paused) => set({ isPaused: paused }),
  setDuration: (duration) => set({ duration }),
  setAudioLevel: (level) => set({ audioLevel: level }),
  addTranscriptEntry: (entry) => set((state) => ({ 
    transcriptEntries: [...state.transcriptEntries, entry] 
  })),
  setMediaStream: (stream) => set({ mediaStream: stream }),
}));
