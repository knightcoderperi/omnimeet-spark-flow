
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
        <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-48 md:w-64 h-48 md:h-64 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-2xl animate-pulse delay-500"></div>
        
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
      
      {/* Navigation */}
      <Navigation activeView={activeView} onViewChange={setActiveView} />

      {/* Main Content Area */}
      <div className="pt-16 md:pt-20 min-h-screen">
        {/* Desktop Layout */}
        <div className="hidden md:flex h-screen pt-4">
          {/* Left Panel - Recording/Analytics */}
          <div className={`flex-1 transition-all duration-500 ease-in-out transform overflow-hidden ${
            isChatOpen ? 'mr-80 lg:mr-96 scale-[0.98]' : 'mr-0 scale-100'
          }`}>
            <div className="h-full p-6 space-y-6 overflow-y-auto smooth-scroll">
              {activeView === 'recording' ? (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 min-h-full">
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
          <div className={`fixed right-0 top-16 md:top-20 bottom-0 w-80 lg:w-96 transition-all duration-500 ease-in-out transform ${
            isChatOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
          }`}>
            <ChatInterface 
              isOpen={isChatOpen} 
              onToggle={toggleChat}
              meetingContext={transcriptEntries.map(entry => entry.text).join(' ')}
            />
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden min-h-screen">
          <div className="p-4 space-y-4">
            {/* Mobile Chat Toggle for better UX */}
            {isChatOpen ? (
              <div className="h-[calc(100vh-8rem)]">
                <ChatInterface 
                  isOpen={isChatOpen} 
                  onToggle={toggleChat}
                  meetingContext={transcriptEntries.map(entry => entry.text).join(' ')}
                />
              </div>
            ) : (
              <>
                {activeView === 'recording' ? (
                  <div className="space-y-4">
                    {/* Recording Controls */}
                    <div className="bg-slate-950/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl">
                      <RecordingInterface />
                    </div>
                    
                    {/* Live Transcript */}
                    <div className="bg-slate-950/40 backdrop-blur-xl border border-white/10 rounded-2xl h-96 shadow-2xl overflow-hidden">
                      <LiveTranscript 
                        entries={transcriptEntries} 
                        isLive={isRecording}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-950/40 backdrop-blur-xl border border-white/10 rounded-2xl h-[calc(100vh-12rem)] p-4 shadow-2xl">
                    <AnalyticsDashboard />
                  </div>
                )}
              </>
            )}
          </div>
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
