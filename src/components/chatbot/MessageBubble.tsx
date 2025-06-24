
import React from 'react';
import { ChatMessage } from '@/stores/chatStore';
import { Bot, User } from 'lucide-react';

interface MessageBubbleProps {
  message: ChatMessage;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex items-start space-x-2 max-w-xs ${
        message.isUser ? 'flex-row-reverse space-x-reverse' : ''
      }`}>
        {/* Avatar */}
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          message.isUser 
            ? 'bg-cyan-500' 
            : 'bg-gradient-to-br from-purple-500 to-pink-500'
        }`}>
          {message.isUser ? (
            <User className="w-4 h-4 text-white" />
          ) : (
            <Bot className="w-4 h-4 text-white" />
          )}
        </div>

        {/* Message Content */}
        <div className={`rounded-lg p-3 ${
          message.isUser 
            ? 'bg-cyan-500 text-white' 
            : 'bg-slate-800 text-slate-200'
        }`}>
          <p className="text-sm leading-relaxed">{message.text}</p>
          
          {/* Citations */}
          {message.citations && message.citations.length > 0 && (
            <div className="mt-2 pt-2 border-t border-white/20">
              <p className="text-xs opacity-75">Sources:</p>
              {message.citations.map((citation, index) => (
                <button
                  key={index}
                  className="text-xs text-cyan-300 hover:text-cyan-200 underline block"
                  onClick={() => {
                    // Navigate to transcript position
                    console.log('Navigate to:', citation);
                  }}
                >
                  {citation}
                </button>
              ))}
            </div>
          )}
          
          {/* Timestamp */}
          <div className="mt-1">
            <span className="text-xs opacity-60">{formatTime(message.timestamp)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
