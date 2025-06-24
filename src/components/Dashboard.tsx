
import React, { useState } from 'react';
import { RecordingInterface } from './recording/RecordingInterface';
import { LiveTranscript } from './transcription/LiveTranscript';
import { ChatInterface } from './chatbot/ChatInterface';
import { AnalyticsDashboard } from './analytics/AnalyticsDashboard';
import { Navigation } from './navigation/Navigation';
import { useRecordingStore } from '@/stores/recordingStore';
import { useChatStore } from '@/stores/chatStore';

export const Dashboard = () => {
  const [activeView, setActiveView] = useState<'recording' | 'analytics'>('recording');
  const { isRecording, transcriptEntries } = useRecordingStore();
  const { isChatOpen, toggleChat } = useChatStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.02"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
      
      {/* Navigation */}
      <Navigation activeView={activeView} onViewChange={setActiveView} />

      {/* Main Content Area */}
      <div className="flex h-screen pt-16">
        {/* Left Panel - Recording/Analytics */}
        <div className={`flex-1 transition-all duration-300 ${isChatOpen ? 'mr-96' : 'mr-0'}`}>
          {activeView === 'recording' ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 h-full">
              {/* Recording Controls */}
              <div className="space-y-6">
                <RecordingInterface />
              </div>
              
              {/* Live Transcript */}
              <div>
                <LiveTranscript 
                  entries={transcriptEntries} 
                  isLive={isRecording}
                />
              </div>
            </div>
          ) : (
            <div className="p-6 h-full">
              <AnalyticsDashboard />
            </div>
          )}
        </div>

        {/* Right Panel - AI Chat */}
        <ChatInterface 
          isOpen={isChatOpen} 
          onToggle={toggleChat}
          meetingContext={transcriptEntries.map(entry => entry.text).join(' ')}
        />
      </div>
    </div>
  );
};
