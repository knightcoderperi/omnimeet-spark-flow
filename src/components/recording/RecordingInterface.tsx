
import React, { useEffect } from 'react';
import { RecordingControls } from './RecordingControls';
import { AudioVisualizer } from './AudioVisualizer';
import { PermissionManager } from './PermissionManager';
import { RecordingStatus } from './RecordingStatus';
import { useRecordingStore } from '@/stores/recordingStore';
import { Card } from '@/components/ui/card';

export const RecordingInterface = () => {
  const { 
    isRecording, 
    isPaused, 
    duration, 
    audioLevel, 
    setDuration, 
    setAudioLevel,
    mediaStream 
  } = useRecordingStore();

  // Update duration when recording
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording && !isPaused) {
      interval = setInterval(() => {
        setDuration(duration + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording, isPaused, duration, setDuration]);

  // Simulate audio level monitoring with smooth animations
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording && mediaStream) {
      interval = setInterval(() => {
        setAudioLevel(Math.random() * 100);
      }, 50); // Faster updates for smoother animations
    }
    return () => clearInterval(interval);
  }, [isRecording, mediaStream, setAudioLevel]);

  return (
    <div className="space-y-6 h-full">
      {/* Permission Manager */}
      <div className="transform transition-all duration-300 hover:scale-[1.02]">
        <PermissionManager />
      </div>
      
      {/* Recording Status with Glow Effect */}
      <div className="relative group">
        <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
          isRecording 
            ? 'bg-gradient-to-r from-red-500/20 to-pink-500/20 blur-xl opacity-75 group-hover:opacity-100' 
            : 'bg-gradient-to-r from-slate-500/10 to-slate-600/10 blur-xl opacity-0 group-hover:opacity-50'
        }`} />
        <div className="relative">
          <RecordingStatus 
            isRecording={isRecording}
            isPaused={isPaused}
            duration={duration}
          />
        </div>
      </div>

      {/* Audio Visualizer with Premium Glass Effect */}
      <Card className="relative bg-slate-950/60 backdrop-blur-2xl border border-white/10 p-8 shadow-2xl group overflow-hidden">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 opacity-30">
          <div className={`absolute inset-0 bg-gradient-to-br transition-all duration-1000 ${
            isRecording 
              ? 'from-cyan-500/10 via-blue-500/5 to-purple-500/10' 
              : 'from-slate-800/10 to-slate-900/10'
          }`} />
        </div>
        
        {/* Floating Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          {isRecording && (
            <>
              <div className="absolute top-4 right-4 w-3 h-3 bg-cyan-400/40 rounded-full animate-pulse" />
              <div className="absolute bottom-4 left-4 w-2 h-2 bg-blue-400/40 rounded-full animate-pulse delay-500" />
              <div className="absolute top-1/2 right-8 w-1 h-1 bg-purple-400/40 rounded-full animate-pulse delay-1000" />
            </>
          )}
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Audio Levels
            </h3>
            {isRecording && (
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-red-400 text-sm font-medium">LIVE</span>
              </div>
            )}
          </div>
          <AudioVisualizer 
            audioLevel={audioLevel}
            isRecording={isRecording}
          />
        </div>
        
        {/* Subtle Border Glow */}
        <div className={`absolute inset-0 rounded-xl transition-all duration-300 ${
          isRecording 
            ? 'shadow-[0_0_30px_rgba(6,182,212,0.3)]' 
            : 'shadow-[0_0_20px_rgba(148,163,184,0.1)]'
        }`} />
      </Card>

      {/* Recording Controls with Hover Effects */}
      <div className="transform transition-all duration-300 hover:scale-[1.02]">
        <RecordingControls />
      </div>
    </div>
  );
};
