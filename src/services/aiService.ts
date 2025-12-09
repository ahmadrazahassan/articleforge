import { GeneratorFormData, GeneratedArticle, CategorySuggestion } from '../types';
import OpenAI from 'openai';
import { SEOService } from './seoService';

const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY || '';
const SITE_URL = import.meta.env.VITE_SITE_URL || window.location.origin;
const SITE_NAME = import.meta.env.VITE_SITE_NAME || 'Article Generator';

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: OPENROUTER_API_KEY,
  dangerouslyAllowBrowser: true,
  defaultHeaders: {
    'HTTP-Referer': SITE_URL,
    'X-Title': SITE_NAME,
  },
});

// Retry helper with exponential backoff for rate limits
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  initialDelay = 2000
): Promise<T> {
  let lastError: Error | undefined;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error: any) {
      lastError = error;
      
      if (error?.status === 429 || error?.message?.includes('429') || error?.message?.includes('rate limit')) {
        const delay = initialDelay * Math.pow(2, i);
        console.log(`Rate limit hit. Retrying in ${delay}ms... (Attempt ${i + 1}/${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      
      throw error;
    }
  }
  
  throw lastError || new Error('Max retries exceeded');
}

// Extract JSON from AI response (handles markdown code blocks)
function extractJSON(content: string): any {
  if (!content) return {};
  
  // Remove markdown code blocks
  const codeBlockMatch = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  if (codeBlockMatch) {
    content = codeBlockMatch[1].trim();
  }
  
  // Find JSON object boundaries
  const firstBrace = content.indexOf('{');
  const lastBrace = content.lastIndexOf('}');
  
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    content = content.substring(firstBrace, lastBrace + 1);
  }
  
  try {
    return JSON.parse(content.trim());
  } catch (error) {
    console.error('JSON parse error:', error);
    throw new Error('Failed to parse AI response. Please try again.');
  }
}

function buildPrompt(formData: GeneratorFormData): string {
  const lengthMap = {
    short: '2000-3000 words',
    medium: '3500-5000 words',
    long: '5500-8000 words',
    'extra-long': '8000-12000 words'
  };

  const typeMap = {
    review: 'Professional Review Article',
    guide: 'Comprehensive Expert Guide',
    about: 'Professional About Page',
    'tool-overview': 'In-Depth Tool/SaaS Analysis',
    listicle: 'Engaging Listicle Article',
    comparison: 'Detailed Comparison Article',
    tutorial: 'Step-by-Step Tutorial',
    news: 'News Article'
  };

  let prompt = `Generate an exceptional, publication-ready ${typeMap[formData.articleType]} for "${formData.websiteName}".

Website Focus: ${formData.websiteDescription}

SPECIFICATIONS:
- Target Length: ${lengthMap[formData.articleLength]} (MINIMUM)
- Tone: ${formData.toneOfVoice}, modern, authoritative
- Language: ${formData.language}`;

  if (formData.targetAudience) {
    prompt += `\n- Target Audience: ${formData.targetAudience}`;
  }

  if (formData.customKeywords && formData.customKeywords.length > 0) {
    prompt += `\n- Keywords: ${formData.customKeywords.join(', ')}`;
  }

  prompt += `\n\nCONTENT REQUIREMENTS:
1. Deep subject matter knowledge with examples and data
2. Current 2024-2025 trends and best practices
3. Professional structure with engaging subheadings
4. Actionable tips and real-world applications
5. Comprehensive coverage from multiple angles
6. Storytelling elements and case studies`;

  if (formData.includeTables) {
    prompt += `\n7. Include comparison tables and data visualizations`;
  }

  prompt += `\n\nARTICLE STRUCTURE:
- Compelling H1 with power words
- Engaging introduction (200-400 words)
- 6-10 major sections with H2 headings
- Each section: 300-600 words minimum
- 2-4 H3 subsections per H2
- FAQ section with 5-8 questions
- Conclusion with actionable next steps (150-250 words)

Use semantic HTML: <h1>, <h2>, <h3>, <p>, <strong>, <em>, <ul>, <ol>, <table>, <blockquote>

RESPOND WITH VALID JSON ONLY (no markdown, no code blocks):
{
  "htmlArticle": "Complete HTML article content",
  "title": "SEO-optimized title (50-65 characters)",
  "category": "Primary category",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5", "tag6", "tag7", "tag8", "tag9", "tag10"],
  "metaDescription": "Compelling meta description (150-160 characters)",
  "slug": "seo-url-slug",
  "focusKeywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"]
}`;

  return prompt;
}

export async function generateArticle(formData: GeneratorFormData): Promise<GeneratedArticle> {
  if (!OPENROUTER_API_KEY || OPENROUTER_API_KEY.trim() === '') {
    throw new Error('No OpenRouter API key found. Add VITE_OPENROUTER_API_KEY to your .env file.');
  }

  try {
    const completion = await retryWithBackoff(() =>
      openai.chat.completions.create({
        model: 'mistralai/devstral-2512:free',
        messages: [
          {
            role: 'user',
            content: buildPrompt(formData)
          }
        ]
      })
    );

    const response = completion.choices[0].message;
    
    if (!response.content) {
      throw new Error('No content received from API');
    }

    const result = extractJSON(response.content);

    if (!result.htmlArticle || !result.title || !result.category || !result.tags || 
        !result.metaDescription || !result.slug || !result.focusKeywords) {
      throw new Error('Invalid response structure from API');
    }

    const wordCount = SEOService.countWords(result.htmlArticle);
    const readingTime = SEOService.calculateReadingTime(result.htmlArticle);

    const article: GeneratedArticle = {
      id: `article-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
      ...result,
      wordCount,
      readingTime,
      createdAt: new Date().toISOString(),
      formData
    };

    const seoAnalysis = SEOService.analyzeSEO(article);
    article.seoScore = seoAnalysis.score;

    return article;
  } catch (error) {
    console.error('Error generating article:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        throw new Error('Invalid API key. Please check your VITE_OPENROUTER_API_KEY in the .env file.');
      } else if (error.message.includes('JSON') || error.message.includes('parse')) {
        throw new Error('Failed to parse AI response. Please try again.');
      }
      throw new Error(`Failed to generate article: ${error.message}`);
    }
    
    throw new Error('An unexpected error occurred. Please try again.');
  }
}

export async function generateBulkArticles(
  formDataList: GeneratorFormData[],
  onProgress?: (current: number, total: number) => void
): Promise<{ results: GeneratedArticle[]; errors: string[] }> {
  const results: GeneratedArticle[] = [];
  const errors: string[] = [];

  for (let i = 0; i < formDataList.length; i++) {
    try {
      const article = await generateArticle(formDataList[i]);
      results.push(article);
      onProgress?.(i + 1, formDataList.length);
      
      if (i < formDataList.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      errors.push(`Item ${i + 1}: ${errorMsg}`);
      onProgress?.(i + 1, formDataList.length);
    }
  }

  return { results, errors };
}

export async function suggestCategories(description: string): Promise<CategorySuggestion[]> {
  if (!OPENROUTER_API_KEY || OPENROUTER_API_KEY.trim() === '') {
    return [];
  }

  try {
    const completion = await retryWithBackoff(() =>
      openai.chat.completions.create({
        model: 'mistralai/devstral-2512:free',
        messages: [
          {
            role: 'user',
            content: `Analyze this website description and suggest 5 relevant categories with confidence scores (0-1) and 3-5 related tags for each.

Website: "${description}"

Respond with VALID JSON ONLY (no markdown):
{
  "suggestions": [
    {
      "category": "Category Name",
      "confidence": 0.95,
      "relatedTags": ["tag1", "tag2", "tag3"]
    }
  ]
}`
          }
        ]
      })
    );

    const response = completion.choices[0].message;
    if (!response.content) return [];

    const result = extractJSON(response.content);
    return result.suggestions || [];
  } catch (error) {
    console.error('Error suggesting categories:', error);
    return [];
  }
}
