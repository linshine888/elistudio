import React from 'react';
import { LayoutDashboard, PenTool, BarChart3, Users, Settings, Globe } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: '概览', icon: LayoutDashboard },
    { id: 'reports', label: '每日日报', icon: PenTool },
    { id: 'analytics', label: '数据分析', icon: BarChart3 },
    { id: 'team', label: '团队成员', icon: Users },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col h-screen sticky top-0 hidden md:flex">
      <div className="p-6 flex items-center gap-2">
        <div className="bg-indigo-500 p-2 rounded-lg">
          <Globe size={24} className="text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight">GlobalSync</span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-2">
          运营管理
        </div>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors duration-200 ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button className="w-full flex items-center gap-3 px-3 py-3 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
          <Settings size={20} />
          <span className="font-medium">系统设置</span>
        </button>
        <div className="mt-4 flex items-center gap-3 px-3">
          <img
            src="https://picsum.photos/40/40"
            alt="User"
            className="w-8 h-8 rounded-full ring-2 ring-slate-700"
          />
          <div className="flex flex-col text-left">
            <span className="text-sm font-medium text-white">Alex Manager</span>
            <span className="text-xs text-slate-400">管理员</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;