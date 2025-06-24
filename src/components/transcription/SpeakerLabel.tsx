
import React from 'react';
import { User } from 'lucide-react';

interface SpeakerLabelProps {
  speaker: string;
  timestamp: number;
  confidence: number;
  color: string;
}

export const SpeakerLabel: React.FC<SpeakerLabelProps> = ({ 
  speaker, 
  timestamp, 
  confidence, 
  color 
}) => {
  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return 'text-green-400';
    if (confidence >= 0.7) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="flex items-center space-x-3">
      <div 
        className="w-8 h-8 rounded-full flex items-center justify-center"
        style={{ backgroundColor: color + '20', border: `2px solid ${color}` }}
      >
        <User className="w-4 h-4" style={{ color }} />
      </div>
      
      <div className="flex items-center space-x-3 flex-1">
        <span className="font-medium text-white">{speaker}</span>
        <span className="text-xs text-slate-400">{formatTime(timestamp)}</span>
        <div className="flex items-center space-x-1">
          <div className="w-1 h-1 bg-slate-500 rounded-full" />
          <span className={`text-xs ${getConfidenceColor(confidence)}`}>
            {Math.round(confidence * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
};
