
import React from 'react';
import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { time: '0:00', engagement: 45 },
  { time: '5:00', engagement: 67 },
  { time: '10:00', engagement: 89 },
  { time: '15:00', engagement: 78 },
  { time: '20:00', engagement: 92 },
  { time: '25:00', engagement: 85 },
  { time: '30:00', engagement: 73 },
  { time: '35:00', engagement: 88 },
  { time: '40:00', engagement: 91 },
  { time: '45:00', engagement: 87 },
];

export const EngagementMetrics = () => {
  return (
    <Card className="bg-slate-900/50 backdrop-blur-xl border-white/10 p-6">
      <h3 className="text-white font-semibold mb-4">Engagement Over Time</h3>
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis 
            dataKey="time" 
            stroke="#94a3b8"
            fontSize={12}
          />
          <YAxis 
            stroke="#94a3b8"
            fontSize={12}
            domain={[0, 100]}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1e293b', 
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              color: '#fff'
            }}
            formatter={(value) => [`${value}%`, 'Engagement']}
          />
          <Line 
            type="monotone" 
            dataKey="engagement" 
            stroke="#00ff88" 
            strokeWidth={3}
            dot={{ fill: '#00ff88', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#00ff88', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-slate-400 text-sm">Average</p>
          <p className="text-cyan-400 font-semibold">79%</p>
        </div>
        <div className="text-center">
          <p className="text-slate-400 text-sm">Peak</p>
          <p className="text-green-400 font-semibold">92%</p>
        </div>
        <div className="text-center">
          <p className="text-slate-400 text-sm">Low</p>
          <p className="text-red-400 font-semibold">45%</p>
        </div>
      </div>
    </Card>
  );
};
