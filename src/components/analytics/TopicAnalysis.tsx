
import React from 'react';
import { Card } from '@/components/ui/card';
import { Tag, TrendingUp } from 'lucide-react';

const topics = [
  { name: 'Q4 Roadmap', mentions: 24, sentiment: 'positive', color: '#00ff88' },
  { name: 'Budget Planning', mentions: 18, sentiment: 'neutral', color: '#0ea5e9' },
  { name: 'Team Structure', mentions: 15, sentiment: 'positive', color: '#a855f7' },
  { name: 'Market Analysis', mentions: 12, sentiment: 'neutral', color: '#f59e0b' },
  { name: 'Risk Assessment', mentions: 8, sentiment: 'negative', color: '#ef4444' },
  { name: 'User Feedback', mentions: 6, sentiment: 'positive', color: '#10b981' },
];

const actionItems = [
  { task: 'Finalize Q4 budget allocation', assignee: 'John Doe', priority: 'high' },
  { task: 'Schedule team restructuring meeting', assignee: 'Jane Smith', priority: 'medium' },
  { task: 'Review market analysis report', assignee: 'Mike Johnson', priority: 'low' },
  { task: 'Update risk mitigation strategies', assignee: 'Sarah Wilson', priority: 'high' },
];

export const TopicAnalysis = () => {
  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return '😊';
      case 'negative':
        return '😟';
      default:
        return '😐';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-400 bg-red-400/10';
      case 'medium':
        return 'text-yellow-400 bg-yellow-400/10';
      default:
        return 'text-green-400 bg-green-400/10';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Topics */}
      <Card className="bg-slate-900/50 backdrop-blur-xl border-white/10 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Tag className="w-5 h-5 text-cyan-400" />
          <h3 className="text-white font-semibold">Topic Analysis</h3>
        </div>
        
        <div className="space-y-3">
          {topics.map((topic, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: topic.color }}
                />
                <span className="text-slate-200">{topic.name}</span>
                <span className="text-lg">{getSentimentIcon(topic.sentiment)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-slate-400" />
                <span className="text-slate-400 text-sm">{topic.mentions}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Action Items */}
      <Card className="bg-slate-900/50 backdrop-blur-xl border-white/10 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="w-5 h-5 text-cyan-400" />
          <h3 className="text-white font-semibold">Action Items</h3>
        </div>
        
        <div className="space-y-3">
          {actionItems.map((item, index) => (
            <div key={index} className="p-3 bg-slate-800/30 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <p className="text-slate-200 text-sm flex-1">{item.task}</p>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                  {item.priority}
                </span>
              </div>
              <p className="text-slate-400 text-xs">Assigned to: {item.assignee}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
