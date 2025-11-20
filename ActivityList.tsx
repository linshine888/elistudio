import React from 'react';
import { ActivityLog, Platform, Status, ActivityType } from '../types';
import { Instagram, Twitter, Linkedin, Youtube, Facebook, Video, ExternalLink, CheckCircle2, Clock, FileText } from 'lucide-react';

interface ActivityListProps {
  logs: ActivityLog[];
}

const ActivityList: React.FC<ActivityListProps> = ({ logs }) => {
  const getIcon = (platform: Platform) => {
    switch (platform) {
      case Platform.Instagram: return Instagram;
      case Platform.Twitter: return Twitter;
      case Platform.LinkedIn: return Linkedin;
      case Platform.YouTube: return Youtube;
      case Platform.Facebook: return Facebook;
      case Platform.TikTok: return Video;
      default: return Video;
    }
  };

  const getPlatformColor = (platform: Platform) => {
    switch (platform) {
      case Platform.Instagram: return 'text-pink-600 bg-pink-50 border-pink-100';
      case Platform.Twitter: return 'text-sky-500 bg-sky-50 border-sky-100';
      case Platform.LinkedIn: return 'text-blue-700 bg-blue-50 border-blue-100';
      case Platform.YouTube: return 'text-red-600 bg-red-50 border-red-100';
      case Platform.Facebook: return 'text-blue-600 bg-blue-50 border-blue-100';
      case Platform.TikTok: return 'text-slate-800 bg-slate-100 border-slate-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-100';
    }
  };

  const getStatusBadge = (status: Status) => {
    switch(status) {
        case Status.Published: return <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700"><CheckCircle2 size={12}/> 已发布</span>
        case Status.Draft: return <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600"><FileText size={12}/> 草稿</span>
        case Status.Scheduled: return <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700"><Clock size={12}/> 已排期</span>
        default: return <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">{status}</span>
    }
  }

  const activityTypeMap: Record<string, string> = {
    [ActivityType.Post]: '帖子',
    [ActivityType.Story]: '快拍',
    [ActivityType.Reel]: '短视频',
    [ActivityType.Engagement]: '互动',
    [ActivityType.Strategy]: '策略',
    [ActivityType.AdCampaign]: '广告'
  };

  if (logs.length === 0) {
      return (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
              <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="text-slate-300" size={32} />
              </div>
              <h3 className="text-slate-800 font-medium mb-1">暂无活动记录</h3>
              <p className="text-slate-500 text-sm">团队成员提交日报后将在此显示。</p>
          </div>
      )
  }

  return (
    <div className="space-y-4">
      {logs.map((log) => {
        const PlatformIcon = getIcon(log.platform);
        const themeClass = getPlatformColor(log.platform);
        
        return (
          <div key={log.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 group">
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-xl border ${themeClass} shrink-0`}>
                <PlatformIcon size={24} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-slate-800 truncate">{log.userName}</h4>
                      <span className="text-xs text-slate-400">•</span>
                      <span className="text-xs text-slate-500">{new Date(log.timestamp).toLocaleTimeString('zh-CN', {hour: '2-digit', minute:'2-digit'})}</span>
                    </div>
                    <p className="text-sm text-slate-600 mb-2 line-clamp-2">{log.description}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {getStatusBadge(log.status)}
                    <span className="text-xs font-medium px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-md border border-indigo-100">
                        {activityTypeMap[log.activityType] || log.activityType}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-2 pt-2 border-t border-slate-100">
                  {log.metrics && (
                    <div className="flex gap-3 text-xs text-slate-500 font-medium">
                      <span>{log.metrics.views?.toLocaleString()} 浏览</span>
                      <span>{log.metrics.likes?.toLocaleString()} 点赞</span>
                    </div>
                  )}
                  {log.link && (
                    <a 
                        href={log.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="ml-auto flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800 font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        查看帖子 <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ActivityList;