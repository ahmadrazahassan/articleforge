import { GeneratedArticle, Template, BulkGenerationJob } from '../types';

const STORAGE_KEYS = {
  ARTICLES: 'articleforge_articles',
  TEMPLATES: 'articleforge_templates',
  JOBS: 'articleforge_jobs',
};

export class StorageService {
  // Articles
  static saveArticle(article: GeneratedArticle): void {
    const articles = this.getArticles();
    articles.unshift(article);
    localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(articles));
  }

  static getArticles(): GeneratedArticle[] {
    const data = localStorage.getItem(STORAGE_KEYS.ARTICLES);
    return data ? JSON.parse(data) : [];
  }

  static deleteArticle(id: string): void {
    const articles = this.getArticles().filter(a => a.id !== id);
    localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(articles));
  }

  static updateArticle(id: string, updates: Partial<GeneratedArticle>): void {
    const articles = this.getArticles();
    const index = articles.findIndex(a => a.id === id);
    if (index !== -1) {
      articles[index] = { ...articles[index], ...updates };
      localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(articles));
    }
  }

  static clearArticles(): void {
    localStorage.removeItem(STORAGE_KEYS.ARTICLES);
  }

  // Templates
  static saveTemplate(template: Template): void {
    const templates = this.getTemplates();
    templates.push(template);
    localStorage.setItem(STORAGE_KEYS.TEMPLATES, JSON.stringify(templates));
  }

  static getTemplates(): Template[] {
    const data = localStorage.getItem(STORAGE_KEYS.TEMPLATES);
    return data ? JSON.parse(data) : [];
  }

  static deleteTemplate(id: string): void {
    const templates = this.getTemplates().filter(t => t.id !== id);
    localStorage.setItem(STORAGE_KEYS.TEMPLATES, JSON.stringify(templates));
  }

  // Bulk Jobs
  static saveJob(job: BulkGenerationJob): void {
    const jobs = this.getJobs();
    const index = jobs.findIndex(j => j.id === job.id);
    if (index !== -1) {
      jobs[index] = job;
    } else {
      jobs.unshift(job);
    }
    localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(jobs));
  }

  static getJobs(): BulkGenerationJob[] {
    const data = localStorage.getItem(STORAGE_KEYS.JOBS);
    return data ? JSON.parse(data) : [];
  }

  static deleteJob(id: string): void {
    const jobs = this.getJobs().filter(j => j.id !== id);
    localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(jobs));
  }
}
