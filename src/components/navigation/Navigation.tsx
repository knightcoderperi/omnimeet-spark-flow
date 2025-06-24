
import React from 'react';
import { Button } from '@/components/ui/button';
import { Camera, BarChart3, MessageSquare, Menu, X } from 'lucide-react';
import { useChatStore } from '@/stores/chatStore';

interface NavigationProps {
  activeView: 'recording' | 'analytics';
  onViewChange: (view: 'recording' | 'analytics') => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeView, onViewChange }) => {
  const { toggleChat, isChatOpen } = useChatStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-2xl border-b border-white/10">
      {/* Gradient Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      
      <div className="flex items-center justify-between px-4 md:px-8 py-3 md:py-4">
        {/* Logo Section with Glow Effect */}
        <div className="flex items-center space-x-3 md:space-x-4 group">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-2xl transform group-hover:scale-105 transition-all duration-300 overflow-hidden">
              <img 
                src="/lovable-uploads/f2c4748b-051b-49c1-a8b8-f7eed11ff513.png" 
                alt="OmniMeet Logo" 
                className="w-8 h-8 md:w-10 md:h-10 object-contain"
              />
            </div>
          </div>
          <div className="transform group-hover:translate-x-1 transition-transform duration-300">
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent">
              OmniMeet
            </h1>
            <p className="text-cyan-400/80 text-xs md:text-sm font-medium mobile-hidden">AI-powered meeting assistant</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-3">
          <Button
            variant="ghost"
            onClick={() => onViewChange('recording')}
            className={`relative px-4 lg:px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 group ${
              activeView === 'recording' 
                ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30 shadow-lg shadow-cyan-500/20' 
                : 'text-white/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20'
            }`}
          >
            <div className={`absolute inset-0 rounded-xl transition-opacity duration-300 ${
              activeView === 'recording' 
                ? 'bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-100' 
                : 'bg-gradient-to-r from-white/5 to-white/10 opacity-0 group-hover:opacity-100'
            }`} />
            <div className="relative flex items-center">
              <Camera className="w-4 h-4 mr-2" />
              <span className="hidden lg:inline">Recording</span>
            </div>
          </Button>
          
          <Button
            variant="ghost"
            onClick={() => onViewChange('analytics')}
            className={`relative px-4 lg:px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 group ${
              activeView === 'analytics' 
                ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border border-emerald-500/30 shadow-lg shadow-emerald-500/20' 
                : 'text-white/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20'
            }`}
          >
            <div className={`absolute inset-0 rounded-xl transition-opacity duration-300 ${
              activeView === 'analytics' 
                ? 'bg-gradient-to-r from-emerald-500/10 to-teal-500/10 opacity-100' 
                : 'bg-gradient-to-r from-white/5 to-white/10 opacity-0 group-hover:opacity-100'
            }`} />
            <div className="relative flex items-center">
              <BarChart3 className="w-4 h-4 mr-2" />
              <span className="hidden lg:inline">Analytics</span>
            </div>
          </Button>

          <Button
            variant="ghost"
            onClick={toggleChat}
            className={`relative px-4 lg:px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 group ${
              isChatOpen 
                ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30 shadow-lg shadow-purple-500/20' 
                : 'text-white/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20'
            }`}
          >
            <div className={`absolute inset-0 rounded-xl transition-opacity duration-300 ${
              isChatOpen 
                ? 'bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-100' 
                : 'bg-gradient-to-r from-white/5 to-white/10 opacity-0 group-hover:opacity-100'
            }`} />
            <div className="relative flex items-center">
              <MessageSquare className="w-4 h-4 mr-2" />
              <span className="hidden lg:inline">AI Assistant</span>
              {isChatOpen && (
                <div className="ml-2 w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
              )}
            </div>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-white/80 hover:text-white"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-950/95 backdrop-blur-xl border-t border-white/10 px-4 py-4 space-y-2">
          <Button
            variant="ghost"
            onClick={() => {
              onViewChange('recording');
              setIsMobileMenuOpen(false);
            }}
            className={`w-full justify-start ${
              activeView === 'recording' ? 'bg-cyan-500/20 text-cyan-300' : 'text-white/80'
            }`}
          >
            <Camera className="w-4 h-4 mr-3" />
            Recording
          </Button>
          
          <Button
            variant="ghost"
            onClick={() => {
              onViewChange('analytics');
              setIsMobileMenuOpen(false);
            }}
            className={`w-full justify-start ${
              activeView === 'analytics' ? 'bg-emerald-500/20 text-emerald-300' : 'text-white/80'
            }`}
          >
            <BarChart3 className="w-4 h-4 mr-3" />
            Analytics
          </Button>

          <Button
            variant="ghost"
            onClick={() => {
              toggleChat();
              setIsMobileMenuOpen(false);
            }}
            className={`w-full justify-start ${
              isChatOpen ? 'bg-purple-500/20 text-purple-300' : 'text-white/80'
            }`}
          >
            <MessageSquare className="w-4 h-4 mr-3" />
            AI Assistant
            {isChatOpen && (
              <div className="ml-auto w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
            )}
          </Button>
        </div>
      )}
    </nav>
  );
};
