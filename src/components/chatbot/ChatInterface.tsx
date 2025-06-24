
import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Mic, X, Minimize2 } from 'lucide-react';
import { MessageBubble } from './MessageBubble';
import { QuickActions } from './QuickActions';
import { useChatStore } from '@/stores/chatStore';

interface ChatInterfaceProps {
  isOpen: boolean;
  onToggle: () => void;
  meetingContext: string;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  isOpen, 
  onToggle, 
  meetingContext 
}) => {
  const [message, setMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const { messages, isLoading, addMessage, setLoading } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (text: string = message) => {
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: Date.now(),
    };

    addMessage(userMessage);
    setMessage('');
    setLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on the meeting discussion, I can see that the main topics have been Q4 roadmap and project strategy. Would you like me to extract the key action items mentioned?",
        "The conversation shows good engagement from all participants. John has spoken for about 40% of the time, and Jane has contributed significantly to the strategic discussions.",
        "I notice several decision points in your meeting. Would you like me to summarize the key decisions made so far?",
        "From the transcript, I can identify 3 potential action items. Should I create a task list for follow-up?",
      ];

      const response = {
        id: (Date.now() + 1).toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        isUser: false,
        timestamp: Date.now(),
      };

      addMessage(response);
      setLoading(false);
    }, 2000);
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    // Voice input implementation would go here
  };

  const handleQuickAction = (action: string) => {
    handleSendMessage(action);
  };

  return (
    <div className={`fixed right-0 top-16 h-[calc(100vh-4rem)] transition-all duration-300 z-40 ${
      isOpen ? 'w-96' : 'w-0'
    }`}>
      <Card className={`h-full bg-slate-900/95 backdrop-blur-xl border-l border-white/10 rounded-none flex flex-col ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <div>
            <h3 className="text-white font-semibold">AI Assistant</h3>
            <p className="text-sm text-slate-400">Ask me about your meeting</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="text-slate-400 hover:text-white"
            >
              <Minimize2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-4 border-b border-white/10">
          <QuickActions onAction={handleQuickAction} />
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-800 rounded-lg p-3 max-w-xs">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/10">
          <div className="flex space-x-2">
            <div className="flex-1 relative">
              <Input
                placeholder="Ask about your meeting..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="bg-slate-800/50 border-white/10 text-white placeholder-slate-400 pr-10"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={handleVoiceInput}
                className={`absolute right-1 top-1/2 transform -translate-y-1/2 ${
                  isListening ? 'text-red-400' : 'text-slate-400'
                }`}
              >
                <Mic className="w-4 h-4" />
              </Button>
            </div>
            
            <Button
              onClick={() => handleSendMessage()}
              disabled={!message.trim() || isLoading}
              className="bg-cyan-500 hover:bg-cyan-600 text-white"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
