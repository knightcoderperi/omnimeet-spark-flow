
import React from 'react';
import { ParticipantChart } from './ParticipantChart';
import { TopicAnalysis } from './TopicAnalysis';
import { EngagementMetrics } from './EngagementMetrics';
import { Card } from '@/components/ui/card';
import { BarChart3, TrendingUp, Clock, Users } from 'lucide-react';

export const AnalyticsDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <BarChart3 className="w-8 h-8 text-cyan-400" />
        <div>
          <h2 className="text-2xl font-bold text-white">Meeting Analytics</h2>
          <p className="text-slate-400">Real-time insights and performance metrics</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-slate-900/50 backdrop-blur-xl border-white/10 p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Duration</p>
              <p className="text-2xl font-bold text-white">45:32</p>
            </div>
          </div>
        </Card>

        <Card className="bg-slate-900/50 backdrop-blur-xl border-white/10 p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Participants</p>
              <p className="text-2xl font-bold text-white">5</p>
            </div>
          </div>
        </Card>

        <Card className="bg-slate-900/50 backdrop-blur-xl border-white/10 p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Engagement</p>
              <p className="text-2xl font-bold text-white">87%</p>
            </div>
          </div>
        </Card>

        <Card className="bg-slate-900/50 backdrop-blur-xl border-white/10 p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Action Items</p>
              <p className="text-2xl font-bold text-white">12</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ParticipantChart />
        <EngagementMetrics />
      </div>

      {/* Topic Analysis */}
      <TopicAnalysis />
    </div>
  );
};
