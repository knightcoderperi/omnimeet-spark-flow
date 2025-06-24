
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Play, Square, Pause, Camera, Mic } from 'lucide-react';
import { useRecordingStore } from '@/stores/recordingStore';
import { useToast } from '@/hooks/use-toast';

export const RecordingControls = () => {
  const { 
    isRecording, 
    isPaused, 
    setRecording, 
    setPaused, 
    setMediaStream,
    addTranscriptEntry 
  } = useRecordingStore();
  const { toast } = useToast();

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true
      });
      
      setMediaStream(stream);
      setRecording(true);
      setPaused(false);
      
      toast({
        title: "Recording Started",
        description: "Your meeting is now being recorded and transcribed.",
      });

      // Simulate transcript entries
      setTimeout(() => {
        addTranscriptEntry({
          id: '1',
          speaker: 'John Doe',
          text: 'Welcome everyone to today\'s meeting. Let\'s start by reviewing the agenda.',
          timestamp: Date.now(),
          confidence: 0.95,
          color: '#00ff88'
        });
      }, 3000);

      setTimeout(() => {
        addTranscriptEntry({
          id: '2',
          speaker: 'Jane Smith',
          text: 'Thank you John. I\'d like to discuss the Q4 roadmap first.',
          timestamp: Date.now(),
          confidence: 0.92,
          color: '#0ea5e9'
        });
      }, 8000);

    } catch (error) {
      toast({
        title: "Recording Failed",
        description: "Unable to start recording. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const handleStopRecording = () => {
    setRecording(false);
    setPaused(false);
    setMediaStream(null);
    
    toast({
      title: "Recording Stopped",
      description: "Your meeting recording has been saved successfully.",
    });
  };

  const handlePauseRecording = () => {
    setPaused(!isPaused);
    toast({
      title: isPaused ? "Recording Resumed" : "Recording Paused",
      description: isPaused ? "Recording has been resumed." : "Recording has been paused.",
    });
  };

  return (
    <Card className="bg-slate-900/50 backdrop-blur-xl border-white/10 p-6">
      <h3 className="text-white font-semibold mb-4">Recording Controls</h3>
      
      <div className="flex items-center justify-center space-x-4">
        {!isRecording ? (
          <Button
            onClick={handleStartRecording}
            size="lg"
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/25"
          >
            <Play className="w-6 h-6 mr-2" />
            Start Recording
          </Button>
        ) : (
          <div className="flex space-x-3">
            <Button
              onClick={handlePauseRecording}
              size="lg"
              variant="outline"
              className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white px-6 py-3 rounded-full transition-all duration-300"
            >
              <Pause className="w-5 h-5 mr-2" />
              {isPaused ? 'Resume' : 'Pause'}
            </Button>
            
            <Button
              onClick={handleStopRecording}
              size="lg"
              className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-500/25"
            >
              <Square className="w-5 h-5 mr-2" />
              Stop
            </Button>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-center space-x-6 text-sm text-slate-400">
        <div className="flex items-center space-x-2">
          <Camera className="w-4 h-4" />
          <span>Screen Capture</span>
        </div>
        <div className="flex items-center space-x-2">
          <Mic className="w-4 h-4" />
          <span>Audio Recording</span>
        </div>
      </div>
    </Card>
  );
};
