import { GoogleGenAI, Type } from "@google/genai";
import { ActivityLog, GeminiSummary } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateDailySummary = async (logs: ActivityLog[]): Promise<GeminiSummary> => {
  if (logs.length === 0) {
    return {
      summary: "未找到所选期间的活动日志。",
      keyAchievements: [],
      suggestions: ["鼓励团队记录他们的日常工作。"]
    };
  }

  // Prepare data for the prompt
  const dataString = JSON.stringify(logs.map(log => ({
    platform: log.platform,
    type: log.activityType,
    description: log.description,
    metrics: log.metrics,
    user: log.userName,
    status: log.status
  })));

  const prompt = `
    你是一位资深的海外社交媒体运营经理，正在分析团队的每日日报。
    以下是今天的原始活动数据：
    ${dataString}

    请提供一个JSON格式的结构化摘要（请使用中文回答），包含以下字段：
    - summary: 一个简洁的段落（最多3句话），总结团队今天的整体重心和产出。
    - keyAchievements: 一个字符串数组，列出具体的胜利、高表现的内容或高互动量。
    - suggestions: 一个字符串数组，基于数据提出的可操作建议或错失的机会。
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            keyAchievements: { type: Type.ARRAY, items: { type: Type.STRING } },
            suggestions: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["summary", "keyAchievements", "suggestions"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as GeminiSummary;

  } catch (error) {
    console.error("Error generating summary:", error);
    return {
      summary: "由于错误，无法生成AI摘要。",
      keyAchievements: [],
      suggestions: ["请检查API配置。"]
    };
  }
};