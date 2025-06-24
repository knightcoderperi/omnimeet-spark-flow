
import React from 'react';

interface AudioVisualizerProps {
  audioLevel: number;
  isRecording: boolean;
}

export const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ audioLevel, isRecording }) => {
  const bars = Array.from({ length: 20 }, (_, i) => {
    const height = isRecording ? Math.random() * audioLevel + 10 : 5;
    return height;
  });

  return (
    <div className="flex items-end justify-center space-x-1 h-24">
      {bars.map((height, index) => (
        <div
          key={index}
          className={`w-3 rounded-t-full transition-all duration-150 ${
            isRecording
              ? 'bg-gradient-to-t from-cyan-500 to-cyan-300'
              : 'bg-slate-600'
          }`}
          style={{
            height: `${Math.max(height, 5)}%`,
            animationDelay: `${index * 50}ms`,
          }}
        />
      ))}
    </div>
  );
};
