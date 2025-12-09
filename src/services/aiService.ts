import { GeneratorFormData, GeneratedArticle, CategorySuggestion } from '../types';
import OpenAI from 'openai';
import { SEOService } from './seoService';

const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY || '';
const SITE_URL = import.meta.env.VITE_SITE_URL || window.location.origin;
const SITE_NAME = import.meta.env.VITE_SITE_NAME || 'Article Generator';

const client = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: OPENROUTER_API_KEY,
  dangerouslyAllowBrowser: true,
  defaultHeaders: {
    'HTTP-Referer': SITE_URL,
    'X-Title': SITE_NAME,
  },
});



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

  let prompt = `You are a senior full-stack developer and expert SEO content strategist with 15+ years of experience. Generate an exceptional, publication-ready ${typeMap[formData.articleType]} for "${formData.websiteName}".

Website Focus: ${formData.websiteDescription}

CRITICAL REQUIREMENTS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 CONTENT SPECIFICATIONS:
- Target Length: ${lengthMap[formData.articleLength]} (MINIMUM - go longer if needed for quality)
- Tone: ${formData.toneOfVoice}, modern, authoritative, and engaging
- Language: ${formData.language}
- Writing Level: Professional industry expert addressing informed readers`;

  if (formData.targetAudience) {
    prompt += `\n- Target Audience: ${formData.targetAudience}`;
  }

  if (formData.customKeywords && formData.customKeywords.length > 0) {
    prompt += `\n- Required Keywords: ${formData.customKeywords.join(', ')}`;
  }

  prompt += `\n\n🎯 CONTENT QUALITY STANDARDS:
1. DEPTH & EXPERTISE: Demonstrate deep subject matter knowledge with specific examples, data points, and industry insights
2. MODERN APPROACH: Use current 2024-2025 trends, technologies, and best practices
3. PROFESSIONAL STRUCTURE: Clear hierarchy with engaging subheadings that preview content
4. ACTIONABLE VALUE: Include practical tips, real-world applications, and concrete takeaways
5. COMPREHENSIVE COVERAGE: Address topic from multiple angles with nuanced perspectives
6. ENGAGING NARRATIVE: Use storytelling elements, case studies, and relatable scenarios`;

  if (formData.includeTables) {
    prompt += `\n7. DATA VISUALIZATION: Include comparison tables, feature matrices, and data tables where appropriate`;
  }

  prompt += `\n\n📝 ARTICLE STRUCTURE (MANDATORY):

<article>
  <header>
    • Compelling H1 with power words
    • Engaging meta description preview paragraph (100-150 words)
    • Key statistics or hook statement
  </header>

  <section id="introduction">
    • Context setting (200-400 words)
    • Problem statement or opportunity
    • Article value proposition
    • Quick navigation preview of what's covered
  </section>

  <section id="main-content">
    • 6-10 major sections with descriptive H2 headings
    • Each section: 300-600 words minimum
    • 2-4 H3 subsections per H2
    • Mix of paragraphs, lists, tables, and callouts
    • Include: examples, statistics, quotes, case studies
    • Use semantic HTML: <strong>, <em>, <blockquote>, <code>, <ul>, <ol>, <table>
  </section>

  <section id="advanced-insights">
    • Expert tips and pro strategies
    • Common pitfalls and how to avoid them
    • Industry trends and future outlook
  </section>

  <section id="faqs">
    • 5-8 frequently asked questions with detailed answers
    • Each answer: 80-150 words
  </section>

  <section id="conclusion">
    • Summary of key points (150-250 words)
    • Actionable next steps
    • Future considerations
  </section>
</article>

🎨 FORMATTING EXCELLENCE:
- Use semantic HTML5 elements properly
- Add descriptive class names where appropriate
- Include data attributes for better structure
- Use proper heading hierarchy (never skip levels)
- Add alt-friendly image placeholders with descriptive comments
- Include meta tags for SEO, Open Graph, and Twitter Cards
- Add structured data hints in HTML comments

💡 WRITING STYLE:
- Lead with value in every paragraph
- Use transition sentences between sections
- Include relevant statistics and data (cite with [Source: Industry Report 2024])
- Add practical examples and use cases
- Use active voice and strong verbs
- Break up long paragraphs (max 4-5 sentences)
- Include bullet points for scannability
- Add emphasis with <strong> and <em> strategically

🔍 SEO OPTIMIZATION:
- Natural keyword integration (avoid stuffing)
- LSI keywords and semantic variations
- Internal linking opportunities (mark with HTML comments)
- External resource suggestions (mark with HTML comments)
- Featured snippet-ready content (lists, tables, definitions)
- Question-based H2/H3 for voice search

JSON RESPONSE FORMAT:
{
  "htmlArticle": "Complete, production-ready HTML document with all requirements above",
  "title": "Compelling, keyword-rich title (50-65 characters, include power words)",
  "category": "Specific primary category",
  "tags": ["10-15 highly relevant tags including long-tail variations"],
  "metaDescription": "Persuasive meta description with call-to-action (150-160 characters)",
  "slug": "seo-optimized-url-slug-with-primary-keywords",
  "focusKeywords": ["5-7 strategically chosen keywords including primary and LSI terms"]
}

EXCELLENCE CHECKLIST:
✓ Article is comprehensive, authoritative, and publication-ready
✓ Modern examples and current industry standards (2024-2025)
✓ Professional tone with personality and engagement
✓ Exceeds minimum word count with substantial value
✓ Perfect HTML structure with semantic markup
✓ Natural SEO integration without keyword stuffing
✓ Actionable insights readers can immediately apply
✓ Engaging introduction that hooks readers
✓ Satisfying conclusion with clear next steps

Generate content that would rank on page 1 of Google and establish the site as an industry authority.`;

  return prompt;
}

export async function generateArticle(formData: GeneratorFormData): Promise<GeneratedArticle> {
  if (!OPENROUTER_API_KEY || OPENROUTER_API_KEY.trim() === '') {
    throw new Error('No OpenRouter API key found. Add VITE_OPENROUTER_API_KEY to your .env file.');
  }

  try {
    // Use Google Gemma 3 27B for superior article generation
    const apiResponse = await client.chat.completions.create({
      model: 'google/gemma-3-27b-it:free',
      messages: [
        {
          role: 'system',
          content: 'You are a senior full-stack developer and elite SEO content strategist with 15+ years of experience. You create authoritative, modern, professional content that ranks #1 on Google. Your articles are comprehensive, expertly structured, and packed with actionable insights. You ALWAYS respond with perfectly formatted, valid JSON.'
        },
        {
          role: 'user',
          content: buildPrompt(formData)
        }
      ],
      temperature: 0.8,
      max_tokens: 16000,
      response_format: { type: 'json_object' }
    });

    const response = apiResponse.choices[0].message;
    
    if (!response.content) {
      throw new Error('No content received from API');
    }

    const result = JSON.parse(response.content);

    if (!result.htmlArticle || !result.title || !result.category || !result.tags || 
        !result.metaDescription || !result.slug || !result.focusKeywords) {
      throw new Error('Invalid response structure from API');
    }

    const wordCount = SEOService.countWords(result.htmlArticle);
    const readingTime = SEOService.calculateReadingTime(result.htmlArticle);

    const article: GeneratedArticle = {
      id: `article-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
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
      } else if (error.message.includes('JSON')) {
        throw new Error('Failed to parse AI response. The model may have returned invalid JSON.');
      }
      throw new Error(`Failed to generate article: ${error.message}`);
    }
    
    throw new Error('An unexpected error occurred while generating the article. Please try again.');
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
      
      // Add delay to avoid rate limiting
      if (i < formDataList.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 2000));
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
    // Use Google Gemma 3 27B for intelligent category suggestions
    const apiResponse = await client.chat.completions.create({
      model: 'google/gemma-3-27b-it:free',
      messages: [
        {
          role: 'system',
          content: 'You are an expert content categorization specialist. Analyze website descriptions and suggest relevant categories with confidence scores and related tags. Always respond with valid JSON.'
        },
        {
          role: 'user',
          content: `Analyze this website description and suggest 5 relevant categories with confidence scores (0-1) and 3-5 related tags for each:\n\n"${description}"\n\nRespond with JSON: { "suggestions": [{ "category": "string", "confidence": number, "relatedTags": ["string"] }] }`
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
      response_format: { type: 'json_object' }
    });

    const response = apiResponse.choices[0].message;
    if (!response.content) return [];

    const result = JSON.parse(response.content);
    return result.suggestions || [];
  } catch (error) {
    console.error('Error suggesting categories:', error);
    return [];
  }
}
