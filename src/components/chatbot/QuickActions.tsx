
import React from 'react';
import { Button } from '@/components/ui/button';
import { Clock, Users, CheckSquare, BarChart3 } from 'lucide-react';

interface QuickActionsProps {
  onAction: (action: string) => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ onAction }) => {
  const quickActions = [
    {
      icon: Clock,
      label: 'Last 5 min',
      action: 'Summarize the last 5 minutes of discussion',
      color: 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    },
    {
      icon: Users,
      label: 'Speaking time',
      action: 'Who has spoken the most so far?',
      color: 'bg-green-500/20 text-green-400 border-green-500/30'
    },
    {
      icon: CheckSquare,
      label: 'Action items',
      action: 'Extract all action items mentioned in this meeting',
      color: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
    },
    {
      icon: BarChart3,
      label: 'Key topics',
      action: 'What are the main topics discussed?',
      color: 'bg-orange-500/20 text-orange-400 border-orange-500/30'
    },
  ];

  return (
    <div>
      <p className="text-sm text-slate-400 mb-3">Quick actions:</p>
      <div className="grid grid-cols-2 gap-2">
        {quickActions.map((action, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => onAction(action.action)}
            className={`h-auto p-3 flex flex-col items-center space-y-1 border ${action.color} hover:bg-white/5`}
          >
            <action.icon className="w-4 h-4" />
            <span className="text-xs">{action.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};
