export type ApprovalChance = 'Poor' | 'Average' | 'Good' | 'Excellent';
export type PageStatus = 'Available' | 'Missing' | 'Needs Improvement';
export type ChecklistSeverity = 'Low' | 'Medium' | 'High';

export interface PageRequirement {
  id: string;
  name: string;
  status: PageStatus;
  type: 'policy' | 'essential' | 'technical';
  details: string;
}

export interface ContentMetric {
  id: string;
  metric: string;
  score: number;
  status: 'Good' | 'Warning' | 'Critical';
  value: string;
  details: string;
}

export interface SeoMetric {
  id: string;
  name: string;
  score: number;
  status: 'Pass' | 'Fail' | 'Optimize';
  value: string;
  details: string;
}

export interface TechnicalMetric {
  id: string;
  name: string;
  score: number;
  status: 'Optimal' | 'Suboptimal' | 'Slow';
  value: string;
  details: string;
}

export interface AdSenseIssue {
  id: string;
  name: string;
  severity: ChecklistSeverity;
  impact: string;
  solution: string;
  category: 'Content' | 'Policy' | 'SEO' | 'Technical' | 'UX';
}

export interface RecommendationItem {
  id: string;
  priority: ChecklistSeverity;
  category: string;
  suggestion: string;
  actionStep: string;
}

export interface AnalysisReport {
  id: string;
  url: string;
  domain: string;
  score: number;
  approvalChance: ApprovalChance;
  analyzedAt: string;
  pagesCheck: PageRequirement[];
  contentQuality: ContentMetric[];
  seoCheck: SeoMetric[];
  technicalCheck: TechnicalMetric[];
  issues: AdSenseIssue[];
  recommendations: RecommendationItem[];
  isFavorite?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  plan: 'free' | 'premium';
  scansUsed: number;
  maxScans: number;
  createdAt: string;
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  date: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  date: string;
  readTime: string;
  image: string;
  comments: Comment[];
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
}

export interface SubscriptionPlan {
  id: 'free' | 'premium';
  name: string;
  price: string;
  period: string;
  scansLimit: string;
  features: string[];
  stripePriceId?: string;
}
