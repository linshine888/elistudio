export enum Platform {
  Instagram = 'Instagram',
  TikTok = 'TikTok',
  Twitter = 'Twitter',
  LinkedIn = 'LinkedIn',
  YouTube = 'YouTube',
  Facebook = 'Facebook'
}

export enum ActivityType {
  Post = 'Post',
  Story = 'Story',
  Reel = 'Reel',
  Engagement = 'Engagement', // Replying to comments, liking
  Strategy = 'Strategy',
  AdCampaign = 'Ad Campaign'
}

export enum Status {
  Draft = 'Draft',
  Published = 'Published',
  Scheduled = 'Scheduled',
  Analyzing = 'Analyzing'
}

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  platform: Platform;
  activityType: ActivityType;
  description: string;
  metrics?: {
    views?: number;
    likes?: number;
    shares?: number;
    comments?: number;
  };
  link?: string;
  status: Status;
  timestamp: string; // ISO Date string
}

export interface User {
  id: string;
  name: string;
  role: 'Manager' | 'Operator';
  avatarUrl: string;
}

export interface GeminiSummary {
  summary: string;
  keyAchievements: string[];
  suggestions: string[];
}
