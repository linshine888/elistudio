import React, { useState } from 'react';
import { Sparkles, RefreshCw, Lightbulb, Trophy, FileText, Copy, Check } from 'lucide-react';
import { ActivityLog, GeminiSummary } from '../types';
import { generateDailySummary } from '../services/geminiService';

interface GeminiInsightProps {
  logs: ActivityLog[];
}

const GeminiInsight: React.FC<GeminiInsightProps> = ({ logs }) => {
  const [summaryData, setSummaryData] = useState<GeminiSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const result = await generateDailySummary(logs);
      setSummaryData(result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!summaryData) return;

    const text = [
      `🤖 **AI 智能总结**`,
      ``,
      `📌 **执行摘要**:`,
      `${summaryData.summary}`,
      ``,
      `🏆 **关键成就**:`,
      ...summaryData.keyAchievements.map(item => `- ${item}`),
      ``,
      `💡 **建议与机会**:`,
      ...summaryData.suggestions.map(item => `- ${item}`)
    ].join('\n');

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-violet-50 rounded-xl border border-indigo-100 p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-2 rounded-lg shadow-lg shadow-indigo-200">
            <Sparkles className="text-white" size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800">AI 每日简报</h2>
            <p className="text-sm text-slate-500">由 Gemini 2.5 Flash 驱动</p>
          </div>
        </div>
        <div className="flex gap-2">
            {summaryData && (
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-3 py-2 bg-white border border-indigo-200 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors text-sm font-medium"
                    title="复制简报"
                >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? "已复制" : "复制"}
                </button>
            )}
            <button
            onClick={handleGenerate}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-indigo-200 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            {loading ? "正在分析..." : "生成简报"}
            </button>
        </div>
      </div>

      {!summaryData && !loading && (
        <div className="text-center py-8 text-slate-400">
          <p>点击“生成简报”来分析今天的 {logs.length} 条活动记录。</p>
        </div>
      )}

      {summaryData && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-white p-4 rounded-xl border border-indigo-100 shadow-sm">
            <div className="flex items-start gap-3">
              <FileText className="text-indigo-500 mt-1 shrink-0" size={20} />
              <div>
                <h3 className="text-sm font-semibold text-slate-700 mb-1 uppercase tracking-wide">执行摘要</h3>
                <p className="text-slate-600 leading-relaxed">{summaryData.summary}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl border border-emerald-100 shadow-sm">
              <div className="flex items-center gap-2 mb-3 text-emerald-700">
                <Trophy size={18} />
                <h3 className="font-semibold">关键成就</h3>
              </div>
              <ul className="space-y-2">
                {summaryData.keyAchievements.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-4 rounded-xl border border-amber-100 shadow-sm">
              <div className="flex items-center gap-2 mb-3 text-amber-700">
                <Lightbulb size={18} />
                <h3 className="font-semibold">建议与机会</h3>
              </div>
              <ul className="space-y-2">
                {summaryData.suggestions.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeminiInsight;