export interface GeneratorFormData {
  websiteName: string;
  websiteDescription: string;
  articleType: ArticleType;
  articleLength: ArticleLength;
  toneOfVoice: ToneOfVoice;
  language: Language;
  customKeywords?: string[];
  targetAudience?: string;
  includeImages?: boolean;
  includeTables?: boolean;
}

export type ArticleType = 'review' | 'guide' | 'about' | 'tool-overview' | 'listicle' | 'comparison' | 'tutorial' | 'news';
export type ArticleLength = 'short' | 'medium' | 'long' | 'extra-long';
export type ToneOfVoice = 'professional' | 'neutral' | 'friendly' | 'authoritative' | 'conversational' | 'technical';
export type Language = 'english' | 'spanish' | 'french' | 'german' | 'italian' | 'portuguese';
export type ExportFormat = 'html' | 'markdown' | 'json' | 'wordpress' | 'pdf-ready' | 'docx';

export interface GeneratedArticle {
  id: string;
  htmlArticle: string;
  markdownArticle?: string;
  title: string;
  category: string;
  tags: string[];
  metaDescription: string;
  slug: string;
  focusKeywords: string[];
  seoScore?: number;
  wordCount?: number;
  readingTime?: number;
  createdAt: string;
  formData: GeneratorFormData;
  uniquenessHash?: string;
}

export interface CopyState {
  html: boolean;
  seo: boolean;
  title: boolean;
  metaDescription: boolean;
  markdown: boolean;
}

export interface BulkGenerationJob {
  id: string;
  items: GeneratorFormData[];
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'paused';
  progress: number;
  results: GeneratedArticle[];
  errors: string[];
  createdAt: string;
  completedAt?: string;
  estimatedTimeRemaining?: number;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  formData: Partial<GeneratorFormData>;
  createdAt: string;
}

export interface CategorySuggestion {
  category: string;
  confidence: number;
  relatedTags: string[];
}

export interface SEOAnalysis {
  score: number;
  issues: string[];
  suggestions: string[];
  strengths: string[];
}

export interface CategoryGenerationConfig {
  category: string;
  count: number;
  articleType: ArticleType;
  articleLength: ArticleLength;
  toneOfVoice: ToneOfVoice;
  language: Language;
  targetAudience?: string;
  customKeywords?: string[];
}

export interface ParsedWebsiteData {
  websiteName: string;
  websiteDescription: string;
  detectedCategory?: string;
  confidence?: number;
}

export interface SmartPasteResult {
  parsed: ParsedWebsiteData[];
  errors: string[];
  totalParsed: number;
  format: 'csv' | 'json' | 'text' | 'mixed';
}
