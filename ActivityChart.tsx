import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ActivityLog, Platform } from '../types';

interface ActivityChartProps {
  logs: ActivityLog[];
}

const ActivityChart: React.FC<ActivityChartProps> = ({ logs }) => {
  // Aggregate data by platform
  const data = Object.values(Platform).map(platform => {
    return {
      name: platform,
      count: logs.filter(log => log.platform === platform).length,
      color: getPlatformColor(platform)
    };
  });

  function getPlatformColor(platform: Platform): string {
    switch (platform) {
      case Platform.Instagram: return '#E1306C';
      case Platform.TikTok: return '#000000';
      case Platform.Twitter: return '#1DA1F2';
      case Platform.LinkedIn: return '#0A66C2';
      case Platform.YouTube: return '#FF0000';
      case Platform.Facebook: return '#1877F2';
      default: return '#64748b';
    }
  }

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-96">
      <h3 className="text-lg font-bold text-slate-800 mb-6">各平台每日活动量</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{fill: '#64748b', fontSize: 12}} 
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{fill: '#64748b', fontSize: 12}} 
          />
          <Tooltip 
            cursor={{fill: '#f8fafc'}}
            contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
          />
          <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={40}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ActivityChart;