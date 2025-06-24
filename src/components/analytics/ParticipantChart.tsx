
import React from 'react';
import { Card } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const data = [
  { name: 'John Doe', value: 35, color: '#00ff88' },
  { name: 'Jane Smith', value: 28, color: '#0ea5e9' },
  { name: 'Mike Johnson', value: 20, color: '#a855f7' },
  { name: 'Sarah Wilson', value: 12, color: '#f59e0b' },
  { name: 'Tom Brown', value: 5, color: '#ef4444' },
];

export const ParticipantChart = () => {
  return (
    <Card className="bg-slate-900/50 backdrop-blur-xl border-white/10 p-6">
      <h3 className="text-white font-semibold mb-4">Speaking Time Distribution</h3>
      
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={120}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1e293b', 
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              color: '#fff'
            }}
            formatter={(value) => [`${value}%`, 'Speaking Time']}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            wrapperStyle={{ color: '#94a3b8' }}
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="mt-4 space-y-2">
        {data.map((participant, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: participant.color }}
              />
              <span className="text-slate-200 text-sm">{participant.name}</span>
            </div>
            <span className="text-slate-400 text-sm">{participant.value}%</span>
          </div>
        ))}
      </div>
    </Card>
  );
};
