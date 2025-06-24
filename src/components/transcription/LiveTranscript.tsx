
import React, { useRef, useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Download, Users } from 'lucide-react';
import { TranscriptEntry } from '@/stores/recordingStore';
import { SpeakerLabel } from './SpeakerLabel';

interface LiveTranscriptProps {
  entries: TranscriptEntry[];
  isLive: boolean;
}

export const LiveTranscript: React.FC<LiveTranscriptProps> = ({ entries, isLive }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [autoScroll, setAutoScroll] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoScroll && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [entries, autoScroll]);

  const filteredEntries = entries.filter(entry =>
    entry.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.speaker.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExport = () => {
    const transcript = entries.map(entry => 
      `[${new Date(entry.timestamp).toLocaleTimeString()}] ${entry.speaker}: ${entry.text}`
    ).join('\n');
    
    const blob = new Blob([transcript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `meeting-transcript-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
  };

  return (
    <Card className="bg-slate-900/50 backdrop-blur-xl border-white/10 h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-cyan-400" />
            <h3 className="text-white font-semibold">Live Transcript</h3>
            {isLive && (
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-red-400 text-sm">LIVE</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
              className="border-white/20 text-white hover:bg-white/10"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search transcript..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-slate-800/50 border-white/10 text-white placeholder-slate-400"
          />
        </div>
      </div>

      {/* Transcript Content */}
      <div 
        ref={scrollRef}
        className="flex-1 p-4 overflow-y-auto space-y-4"
        onScroll={(e) => {
          const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
          setAutoScroll(scrollHeight - scrollTop === clientHeight);
        }}
      >
        {filteredEntries.length === 0 ? (
          <div className="text-center text-slate-400 py-8">
            {entries.length === 0 ? (
              <div>
                <div className="text-4xl mb-2">🎤</div>
                <p>Start recording to see live transcript</p>
              </div>
            ) : (
              <p>No results found for "{searchQuery}"</p>
            )}
          </div>
        ) : (
          filteredEntries.map((entry) => (
            <div key={entry.id} className="space-y-2">
              <SpeakerLabel 
                speaker={entry.speaker}
                timestamp={entry.timestamp}
                confidence={entry.confidence}
                color={entry.color}
              />
              <div className="bg-slate-800/30 rounded-lg p-3 ml-4">
                <p className="text-slate-200 leading-relaxed">{entry.text}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Auto-scroll indicator */}
      {!autoScroll && entries.length > 0 && (
        <div className="p-2 border-t border-white/10">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setAutoScroll(true);
              if (scrollRef.current) {
                scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
              }
            }}
            className="w-full border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10"
          >
            Resume auto-scroll
          </Button>
        </div>
      )}
    </Card>
  );
};
