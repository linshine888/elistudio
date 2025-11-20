import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon: React.ElementType;
  colorClass: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, trend, icon: Icon, colorClass }) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-lg ${colorClass} bg-opacity-10`}>
          <Icon className={colorClass.replace('bg-', 'text-')} size={24} />
        </div>
        {change && (
          <div className={`flex items-center text-sm font-medium ${trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
            {trend === 'up' ? <ArrowUpRight size={16} className="mr-1" /> : <ArrowDownRight size={16} className="mr-1" />}
            {change}
          </div>
        )}
      </div>
      <h3 className="text-slate-500 text-sm font-medium mb-1">{title}</h3>
      <p className="text-2xl font-bold text-slate-800">{value}</p>
    </div>
  );
};

export default StatCard;
