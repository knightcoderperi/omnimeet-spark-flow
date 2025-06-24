
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
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10"></div>
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}
        ></div>
      </div>
      
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
