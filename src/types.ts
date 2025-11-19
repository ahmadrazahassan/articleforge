export interface GeneratorFormData {
  websiteName: string;
  websiteDescription: string;
  articleType: ArticleType;
  articleLength: ArticleLength;
  toneOfVoice: ToneOfVoice;
  language: Language;
}

export type ArticleType = 'review' | 'guide' | 'about' | 'tool-overview';
export type ArticleLength = 'short' | 'medium' | 'long';
export type ToneOfVoice = 'professional' | 'neutral' | 'friendly';
export type Language = 'english';

export interface GeneratedArticle {
  htmlArticle: string;
  title: string;
  category: string;
  tags: string[];
  metaDescription: string;
  slug: string;
  focusKeywords: string[];
}

export interface CopyState {
  html: boolean;
  seo: boolean;
  title: boolean;
  metaDescription: boolean;
}
