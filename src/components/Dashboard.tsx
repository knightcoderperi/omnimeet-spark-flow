
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 opacity-30">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-2xl animate-pulse delay-500"></div>
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-10" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 136, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 136, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
      </div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      
      {/* Navigation - Fixed positioning */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navigation activeView={activeView} onViewChange={setActiveView} />
      </div>

      {/* Main Content Area - Fixed height with proper top padding */}
      <div className="fixed inset-0 pt-20 flex">
        {/* Left Panel - Recording/Analytics */}
        <div className={`flex-1 transition-all duration-500 ease-in-out transform overflow-hidden ${
          isChatOpen ? 'mr-96 scale-[0.98]' : 'mr-0 scale-100'
        }`}>
          <div className="h-full p-6 space-y-6 overflow-y-auto">
            {activeView === 'recording' ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-full">
                {/* Recording Controls Panel */}
                <div className="space-y-6">
                  <div className="bg-slate-950/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl transition-all duration-300 hover:shadow-cyan-500/10 hover:border-cyan-500/20 group">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative z-10">
                      <RecordingInterface />
                    </div>
                  </div>
                </div>
                
                {/* Live Transcript Panel */}
                <div className="min-h-[600px]">
                  <div className="bg-slate-950/40 backdrop-blur-xl border border-white/10 rounded-2xl h-full shadow-2xl transition-all duration-300 hover:shadow-purple-500/10 hover:border-purple-500/20 group overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative z-10 h-full">
                      <LiveTranscript 
                        entries={transcriptEntries} 
                        isLive={isRecording}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="min-h-full">
                <div className="bg-slate-950/40 backdrop-blur-xl border border-white/10 rounded-2xl h-full p-6 shadow-2xl transition-all duration-300 hover:shadow-emerald-500/10 hover:border-emerald-500/20 group">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10 h-full">
                    <AnalyticsDashboard />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - AI Chat with Slide Animation */}
        <div className={`fixed right-0 top-20 bottom-0 w-96 transition-all duration-500 ease-in-out transform ${
          isChatOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}>
          <ChatInterface 
            isOpen={isChatOpen} 
            onToggle={toggleChat}
            meetingContext={transcriptEntries.map(entry => entry.text).join(' ')}
          />
        </div>
      </div>

      {/* Ambient Light Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
    </div>
  );
};
