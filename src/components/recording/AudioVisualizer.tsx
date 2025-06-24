
import React from 'react';

interface AudioVisualizerProps {
  audioLevel: number;
  isRecording: boolean;
}

export const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ audioLevel, isRecording }) => {
  const bars = Array.from({ length: 32 }, (_, i) => {
    const baseHeight = 8;
    const dynamicHeight = isRecording ? (Math.random() * audioLevel * 0.8) + (Math.sin(Date.now() * 0.01 + i * 0.5) * 10) : baseHeight;
    const height = Math.max(baseHeight, Math.min(dynamicHeight, 90));
    return height;
  });

  return (
    <div className="relative">
      {/* Reflection Effect */}
      <div className="absolute inset-0 top-1/2 transform rotate-180 opacity-20 pointer-events-none">
        <div className="flex items-end justify-center space-x-1 h-32">
          {bars.map((height, index) => (
            <div
              key={`reflection-${index}`}
              className={`w-2 rounded-t-full transition-all duration-150 ${
                isRecording
                  ? index % 4 === 0 
                    ? 'bg-gradient-to-t from-cyan-500/60 to-cyan-300/40'
                    : index % 4 === 1
                    ? 'bg-gradient-to-t from-blue-500/60 to-blue-300/40'
                    : index % 4 === 2
                    ? 'bg-gradient-to-t from-purple-500/60 to-purple-300/40'
                    : 'bg-gradient-to-t from-pink-500/60 to-pink-300/40'
                  : 'bg-gradient-to-t from-slate-600/60 to-slate-400/40'
              }`}
              style={{
                height: `${height * 0.3}%`,
                animationDelay: `${index * 25}ms`,
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Main Visualizer */}
      <div className="flex items-end justify-center space-x-1 h-32 relative z-10">
        {bars.map((height, index) => (
          <div
            key={index}
            className={`w-2 rounded-full transition-all duration-150 transform hover:scale-110 ${
              isRecording
                ? index % 4 === 0 
                  ? 'bg-gradient-to-t from-cyan-500 to-cyan-300 shadow-lg shadow-cyan-500/25'
                  : index % 4 === 1
                  ? 'bg-gradient-to-t from-blue-500 to-blue-300 shadow-lg shadow-blue-500/25'
                  : index % 4 === 2
                  ? 'bg-gradient-to-t from-purple-500 to-purple-300 shadow-lg shadow-purple-500/25'
                  : 'bg-gradient-to-t from-pink-500 to-pink-300 shadow-lg shadow-pink-500/25'
                : 'bg-gradient-to-t from-slate-600 to-slate-400'
            }`}
            style={{
              height: `${height}%`,
              animationDelay: `${index * 25}ms`,
            }}
          />
        ))}
      </div>
      
      {/* Frequency Labels */}
      <div className="flex justify-between mt-4 text-xs text-slate-400">
        <span>20Hz</span>
        <span>200Hz</span>
        <span>2kHz</span>
        <span>20kHz</span>
      </div>
      
      {/* Audio Level Indicator */}
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-slate-400">Level:</span>
        <div className="flex-1 mx-4 h-2 bg-slate-800 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-200 rounded-full ${
              isRecording 
                ? audioLevel > 70 
                  ? 'bg-gradient-to-r from-red-500 to-pink-500' 
                  : audioLevel > 40 
                  ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                  : 'bg-gradient-to-r from-green-500 to-emerald-500'
                : 'bg-slate-600'
            }`}
            style={{ width: `${isRecording ? audioLevel : 0}%` }}
          />
        </div>
        <span className="text-sm text-slate-400 min-w-[3rem] text-right">
          {isRecording ? Math.round(audioLevel) : 0}%
        </span>
      </div>
    </div>
  );
};
