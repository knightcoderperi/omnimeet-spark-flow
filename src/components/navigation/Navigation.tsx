
import React from 'react';
import { Button } from '@/components/ui/button';
import { Camera, BarChart3, MessageSquare } from 'lucide-react';
import { useChatStore } from '@/stores/chatStore';

interface NavigationProps {
  activeView: 'recording' | 'analytics';
  onViewChange: (view: 'recording' | 'analytics') => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeView, onViewChange }) => {
  const { toggleChat, isChatOpen } = useChatStore();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/10">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
            <Camera className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">OmniMeet</h1>
            <p className="text-cyan-400 text-sm">AI-powered meeting assistant</p>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center space-x-4">
          <Button
            variant={activeView === 'recording' ? 'default' : 'outline'}
            onClick={() => onViewChange('recording')}
            className={`${
              activeView === 'recording' 
                ? 'bg-cyan-500 hover:bg-cyan-600 text-white' 
                : 'border-white/20 text-white hover:bg-white/10'
            }`}
          >
            <Camera className="w-4 h-4 mr-2" />
            Recording
          </Button>
          
          <Button
            variant={activeView === 'analytics' ? 'default' : 'outline'}
            onClick={() => onViewChange('analytics')}
            className={`${
              activeView === 'analytics' 
                ? 'bg-cyan-500 hover:bg-cyan-600 text-white' 
                : 'border-white/20 text-white hover:bg-white/10'
            }`}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics
          </Button>

          <Button
            variant={isChatOpen ? 'default' : 'outline'}
            onClick={toggleChat}
            className={`${
              isChatOpen 
                ? 'bg-purple-500 hover:bg-purple-600 text-white' 
                : 'border-white/20 text-white hover:bg-white/10'
            }`}
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            AI Assistant
          </Button>
        </div>
      </div>
    </nav>
  );
};
