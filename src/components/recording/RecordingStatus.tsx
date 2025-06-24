
import React from 'react';
import { Card } from '@/components/ui/card';
import { Circle } from 'lucide-react';

interface RecordingStatusProps {
  isRecording: boolean;
  isPaused: boolean;
  duration: number;
}

export const RecordingStatus: React.FC<RecordingStatusProps> = ({ 
  isRecording, 
  isPaused, 
  duration 
}) => {
  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusText = () => {
    if (!isRecording) return 'Ready to Record';
    if (isPaused) return 'Recording Paused';
    return 'Recording Live';
  };

  const getStatusColor = () => {
    if (!isRecording) return 'text-slate-400';
    if (isPaused) return 'text-yellow-400';
    return 'text-green-400';
  };

  return (
    <Card className="bg-slate-900/50 backdrop-blur-xl border-white/10 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Circle 
              className={`w-4 h-4 ${getStatusColor()} ${
                isRecording && !isPaused ? 'animate-pulse' : ''
              }`}
              fill="currentColor"
            />
            {isRecording && !isPaused && (
              <div className="absolute inset-0 w-4 h-4 bg-green-400 rounded-full animate-ping opacity-75" />
            )}
          </div>
          <span className={`font-medium ${getStatusColor()}`}>
            {getStatusText()}
          </span>
        </div>
        
        <div className="text-right">
          <div className="text-2xl font-mono text-white">
            {formatDuration(duration)}
          </div>
          <div className="text-sm text-slate-400">
            Duration
          </div>
        </div>
      </div>
    </Card>
  );
};
