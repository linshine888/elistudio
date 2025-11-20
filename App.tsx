import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import StatCard from './components/StatCard';
import ActivityChart from './components/ActivityChart';
import ActivityList from './components/ActivityList';
import ReportForm from './components/ReportForm';
import GeminiInsight from './components/GeminiInsight';
import { ActivityLog, Platform, ActivityType, Status, User } from './types';
import { Users, Activity, Share2, TrendingUp, Plus, Copy, Check } from 'lucide-react';

// Mock Initial Data
const MOCK_USER: User = {
  id: 'u1',
  name: 'Sarah Chen',
  role: 'Operator',
  avatarUrl: 'https://picsum.photos/100'
};

const MOCK_LOGS: ActivityLog[] = [
  {
    id: '1',
    userId: 'u1',
    userName: 'Sarah Chen',
    platform: Platform.TikTok,
    activityType: ActivityType.Reel,
    description: '发布了新产品发布会的幕后花絮视频。使用了热门音频。',
    metrics: { views: 12500, likes: 3400 },
    status: Status.Published,
    timestamp: new Date(new Date().setHours(10, 30)).toISOString()
  },
  {
    id: '2',
    userId: 'u2',
    userName: 'Mike Ross',
    platform: Platform.LinkedIn,
    activityType: ActivityType.Post,
    description: '起草了一篇关于跨境电商趋势的思想领导力文章。',
    status: Status.Draft,
    timestamp: new Date(new Date().setHours(11, 15)).toISOString()
  },
  {
    id: '3',
    userId: 'u1',
    userName: 'Sarah Chen',
    platform: Platform.Instagram,
    activityType: ActivityType.Story,
    description: '发布投票，询问粉丝最喜欢的夏季系列颜色。',
    metrics: { views: 4500, likes: 120 },
    status: Status.Published,
    timestamp: new Date(new Date().setHours(14, 20)).toISOString()
  },
  {
    id: '4',
    userId: 'u3',
    userName: 'Jessica Lee',
    platform: Platform.Twitter,
    activityType: ActivityType.Engagement,
    description: '回复了15个客户支持查询，转发了3条正面评价。',
    status: Status.Published,
    timestamp: new Date(new Date().setHours(9, 0)).toISOString()
  }
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [logs, setLogs] = useState<ActivityLog[]>(MOCK_LOGS);
  const [showReportModal, setShowReportModal] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  const handleAddReport = (data: Omit<ActivityLog, 'id'>) => {
    const newLog: ActivityLog = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
    };
    setLogs([newLog, ...logs]);
    setShowReportModal(false);
    // If on dashboard, stay there, otherwise go to reports to see it
    if (activeTab !== 'dashboard') setActiveTab('reports');
  };

  const todayLogs = logs.filter(log => {
    const date = new Date(log.timestamp);
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  });

  const handleExportReport = () => {
    const dateStr = new Date().toLocaleDateString('zh-CN', { month: 'long', day: 'numeric' });
    let text = `📅 **${dateStr} 运营日报汇总**\n\n`;
    
    if (logs.length === 0) {
        text += "今日暂无活动记录。";
    } else {
        logs.forEach((log, index) => {
            const time = new Date(log.timestamp).toLocaleTimeString('zh-CN', {hour: '2-digit', minute:'2-digit'});
            text += `${index + 1}. 【${log.platform}】${log.activityType} - ${log.userName} (${time})\n`;
            text += `   📝 内容: ${log.description}\n`;
            text += `   📊 状态: ${log.status}`;
            if (log.metrics && (log.metrics.views || log.metrics.likes)) {
                text += ` | 数据: 👁️${log.metrics.views || 0}  ❤️${log.metrics.likes || 0}`;
            }
            if (log.link) text += `\n   🔗 链接: ${log.link}`;
            text += `\n\n`;
        });
    }

    navigator.clipboard.writeText(text);
    setIsExporting(true);
    setTimeout(() => setIsExporting(false), 2000);
  };

  const renderContent = () => {
    if (showReportModal) {
      return (
        <div className="max-w-3xl mx-auto">
          <ReportForm 
            currentUser={MOCK_USER} 
            onSubmit={handleAddReport} 
            onCancel={() => setShowReportModal(false)} 
          />
        </div>
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-800">仪表盘</h1>
                <p className="text-slate-500">欢迎回来，这是今天的运营概览。</p>
              </div>
              <button 
                onClick={() => setShowReportModal(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 shadow-lg shadow-indigo-200 transition-all active:scale-95"
              >
                <Plus size={20} />
                记一笔
              </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard 
                title="今日活动总数" 
                value={logs.length} 
                change="+12%" 
                trend="up" 
                icon={Activity} 
                colorClass="bg-indigo-500" 
              />
              <StatCard 
                title="进行中的活动" 
                value="8" 
                icon={TrendingUp} 
                colorClass="bg-emerald-500" 
              />
              <StatCard 
                title="总覆盖人数" 
                value="45.2K" 
                change="+5%" 
                trend="up" 
                icon={Share2} 
                colorClass="bg-pink-500" 
              />
              <StatCard 
                title="团队成员" 
                value="12" 
                icon={Users} 
                colorClass="bg-amber-500" 
              />
            </div>

            {/* Main Content: Charts & AI */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <ActivityChart logs={logs} />
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-slate-800">最近动态</h3>
                        <button onClick={() => setActiveTab('reports')} className="text-indigo-600 text-sm font-medium hover:underline">查看全部</button>
                    </div>
                    <ActivityList logs={logs.slice(0, 3)} />
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <GeminiInsight logs={todayLogs} />
              </div>
            </div>
          </div>
        );
      
      case 'reports':
        return (
          <div className="space-y-6 animate-fade-in">
             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-2xl font-bold text-slate-800">每日日报</h1>
                <div className="flex gap-3">
                    <button 
                        onClick={handleExportReport}
                        className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 border transition-all ${isExporting ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
                    >
                        {isExporting ? <Check size={18} /> : <Copy size={18} />}
                        {isExporting ? '已复制' : '导出文本'}
                    </button>
                    <button 
                    onClick={() => setShowReportModal(true)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 shadow-sm"
                    >
                    <Plus size={20} />
                    新建记录
                    </button>
                </div>
            </div>
            <ActivityList logs={logs} />
          </div>
        );

      default:
        return (
          <div className="flex flex-col items-center justify-center h-96 text-slate-400">
            <div className="bg-slate-100 p-6 rounded-full mb-4">
                <Activity size={48} />
            </div>
            <h2 className="text-xl font-semibold text-slate-600">敬请期待</h2>
            <p>此模块正在开发中。</p>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
        {/* Mobile Header (Visible only on small screens) */}
        <div className="md:hidden flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
           <div className="flex items-center gap-2 font-bold text-slate-800">
             <span className="bg-indigo-600 text-white p-1 rounded">GS</span> GlobalSync
           </div>
           {/* Simple mobile nav toggle placeholder */}
           <button className="p-2 text-slate-600 bg-white rounded border border-slate-200">菜单</button>
        </div>

        {renderContent()}
      </main>
    </div>
  );
};

export default App;