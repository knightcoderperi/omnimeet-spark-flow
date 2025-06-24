
import { create } from 'zustand';

export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: number;
  citations?: string[];
}

interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  isChatOpen: boolean;
  addMessage: (message: ChatMessage) => void;
  setLoading: (loading: boolean) => void;
  toggleChat: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [
    {
      id: '1',
      text: 'Hi! I\'m your AI meeting assistant. I can help you analyze your meeting in real-time, extract action items, and answer questions about what\'s being discussed.',
      isUser: false,
      timestamp: Date.now(),
    }
  ],
  isLoading: false,
  isChatOpen: false,
  addMessage: (message) => set((state) => ({ 
    messages: [...state.messages, message] 
  })),
  setLoading: (loading) => set({ isLoading: loading }),
  toggleChat: () => set((state) => ({ isChatOpen: !state.isChatOpen })),
}));
