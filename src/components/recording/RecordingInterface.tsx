
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

  // Simulate audio level monitoring
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording && mediaStream) {
      interval = setInterval(() => {
        setAudioLevel(Math.random() * 100);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isRecording, mediaStream, setAudioLevel]);

  return (
    <div className="space-y-6">
      {/* Permission Manager */}
      <PermissionManager />
      
      {/* Recording Status */}
      <RecordingStatus 
        isRecording={isRecording}
        isPaused={isPaused}
        duration={duration}
      />

      {/* Audio Visualizer */}
      <Card className="bg-slate-900/50 backdrop-blur-xl border-white/10 p-6">
        <h3 className="text-white font-semibold mb-4">Audio Levels</h3>
        <AudioVisualizer 
          audioLevel={audioLevel}
          isRecording={isRecording}
        />
      </Card>

      {/* Recording Controls */}
      <RecordingControls />
    </div>
  );
};
