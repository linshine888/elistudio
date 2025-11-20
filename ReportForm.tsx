import React, { useState } from 'react';
import { ActivityType, Platform, Status, User } from '../types';
import { Send, X } from 'lucide-react';

interface ReportFormProps {
  currentUser: User;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const ReportForm: React.FC<ReportFormProps> = ({ currentUser, onSubmit, onCancel }) => {
  const [platform, setPlatform] = useState<Platform>(Platform.Instagram);
  const [type, setType] = useState<ActivityType>(ActivityType.Post);
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [status, setStatus] = useState<Status>(Status.Published);
  
  // Simple metrics state
  const [views, setViews] = useState(0);
  const [likes, setLikes] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      userId: currentUser.id,
      userName: currentUser.name,
      platform,
      activityType: type,
      description,
      link,
      status,
      metrics: { views, likes },
      timestamp: new Date().toISOString()
    });
  };

  const activityTypeMap: Record<string, string> = {
    [ActivityType.Post]: '帖子',
    [ActivityType.Story]: '快拍',
    [ActivityType.Reel]: '短视频/Reel',
    [ActivityType.Engagement]: '互动维护',
    [ActivityType.Strategy]: '策略规划',
    [ActivityType.AdCampaign]: '广告投放'
  };

  const statusMap: Record<string, string> = {
    [Status.Draft]: '草稿',
    [Status.Published]: '已发布',
    [Status.Scheduled]: '已排期',
    [Status.Analyzing]: '分析中'
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-lg p-6 max-w-2xl mx-auto animate-in fade-in zoom-in duration-300">
      <div className="flex justify-between items-center mb-6">
        <div>
            <h2 className="text-xl font-bold text-slate-800">新增活动日报</h2>
            <p className="text-sm text-slate-500">记录您的工作: {currentUser.name}</p>
        </div>
        <button onClick={onCancel} className="text-slate-400 hover:text-slate-600">
            <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">平台</label>
            <select 
              value={platform} 
              onChange={(e) => setPlatform(e.target.value as Platform)}
              className="w-full rounded-lg border-slate-300 border px-3 py-2 text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            >
              {Object.values(Platform).map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">活动类型</label>
            <select 
              value={type} 
              onChange={(e) => setType(e.target.value as ActivityType)}
              className="w-full rounded-lg border-slate-300 border px-3 py-2 text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            >
              {Object.values(ActivityType).map(t => (
                <option key={t} value={t}>{activityTypeMap[t] || t}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">描述 / 文案</label>
          <textarea 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-lg border-slate-300 border px-3 py-2 text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all h-24 resize-none"
            placeholder="今天发布了什么内容？采取了什么策略？"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">内容链接 (选填)</label>
                <input 
                    type="url" 
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    className="w-full rounded-lg border-slate-300 border px-3 py-2 text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    placeholder="https://..."
                />
            </div>
             <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">状态</label>
                <select 
                value={status} 
                onChange={(e) => setStatus(e.target.value as Status)}
                className="w-full rounded-lg border-slate-300 border px-3 py-2 text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                >
                {Object.values(Status).map(s => (
                    <option key={s} value={s}>{statusMap[s] || s}</option>
                ))}
                </select>
            </div>
        </div>

        {/* Metrics Section - Optional for Drafts */}
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
            <h4 className="text-sm font-semibold text-slate-700 mb-3">初始数据 (如有)</h4>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">浏览量 / 覆盖人数</label>
                    <input 
                        type="number" 
                        min="0"
                        value={views}
                        onChange={(e) => setViews(parseInt(e.target.value) || 0)}
                        className="w-full rounded border-slate-200 border px-2 py-1.5 text-sm text-slate-700 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">点赞 / 互动量</label>
                    <input 
                        type="number" 
                        min="0"
                        value={likes}
                        onChange={(e) => setLikes(parseInt(e.target.value) || 0)}
                        className="w-full rounded border-slate-200 border px-2 py-1.5 text-sm text-slate-700 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
            </div>
        </div>

        <div className="flex gap-3 pt-2">
            <button 
                type="submit" 
                className="flex-1 bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex justify-center items-center gap-2 shadow-lg shadow-indigo-200"
            >
                <Send size={18} />
                提交日报
            </button>
        </div>
      </form>
    </div>
  );
};

export default ReportForm;