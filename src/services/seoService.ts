import { GeneratedArticle, SEOAnalysis } from '../types';

export class SEOService {
  static analyzeSEO(article: GeneratedArticle): SEOAnalysis {
    const issues: string[] = [];
    const suggestions: string[] = [];
    const strengths: string[] = [];
    let score = 100;

    // Title analysis
    if (article.title.length < 30) {
      issues.push('Title is too short (< 30 characters)');
      score -= 10;
    } else if (article.title.length > 60) {
      issues.push('Title is too long (> 60 characters)');
      score -= 5;
    } else {
      strengths.push('Title length is optimal');
    }

    // Meta description analysis
    if (article.metaDescription.length < 120) {
      issues.push('Meta description is too short (< 120 characters)');
      score -= 10;
    } else if (article.metaDescription.length > 160) {
      issues.push('Meta description is too long (> 160 characters)');
      score -= 5;
    } else {
      strengths.push('Meta description length is optimal');
    }

    // Keywords analysis
    if (article.focusKeywords.length < 3) {
      suggestions.push('Consider adding more focus keywords (3-7 recommended)');
      score -= 5;
    } else {
      strengths.push('Good number of focus keywords');
    }

    // Tags analysis
    if (article.tags.length < 5) {
      suggestions.push('Add more tags for better categorization (5-15 recommended)');
      score -= 5;
    } else if (article.tags.length > 15) {
      suggestions.push('Too many tags might dilute focus');
      score -= 3;
    } else {
      strengths.push('Optimal number of tags');
    }

    // Content analysis
    const wordCount = this.countWords(article.htmlArticle);
    if (wordCount < 1000) {
      issues.push('Content is too short for good SEO (< 1000 words)');
      score -= 15;
    } else if (wordCount > 2000) {
      strengths.push('Comprehensive content length');
    }

    // Heading structure
    const h1Count = (article.htmlArticle.match(/<h1/gi) || []).length;
    const h2Count = (article.htmlArticle.match(/<h2/gi) || []).length;
    
    if (h1Count === 0) {
      issues.push('Missing H1 heading');
      score -= 10;
    } else if (h1Count > 1) {
      issues.push('Multiple H1 headings detected');
      score -= 5;
    } else {
      strengths.push('Proper H1 structure');
    }

    if (h2Count < 3) {
      suggestions.push('Add more H2 headings for better structure');
      score -= 5;
    } else {
      strengths.push('Good heading structure');
    }

    // Keyword density check
    const titleLower = article.title.toLowerCase();
    const primaryKeyword = article.focusKeywords[0]?.toLowerCase();
    
    if (primaryKeyword) {
      if (!titleLower.includes(primaryKeyword)) {
        issues.push('Primary keyword not in title');
        score -= 10;
      } else {
        strengths.push('Primary keyword in title');
      }

      if (!article.metaDescription.toLowerCase().includes(primaryKeyword)) {
        suggestions.push('Consider adding primary keyword to meta description');
        score -= 5;
      }
    }

    // Ensure score doesn't go below 0
    score = Math.max(0, score);

    return {
      score,
      issues,
      suggestions,
      strengths
    };
  }

  static countWords(html: string): number {
    const text = html.replace(/<[^>]+>/g, ' ');
    const words = text.trim().split(/\s+/);
    return words.filter(word => word.length > 0).length;
  }

  static calculateReadingTime(html: string): number {
    const wordCount = this.countWords(html);
    const wordsPerMinute = 200;
    return Math.ceil(wordCount / wordsPerMinute);
  }
}
