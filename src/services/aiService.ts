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

async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries = 5,
  initialDelay = 3000
): Promise<T> {
  let lastError: Error | undefined;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error: any) {
      lastError = error;
      
      // Handle both rate limits and server errors
      if (error?.status === 429 || error?.status === 500 || 
          error?.message?.includes('429') || error?.message?.includes('500') ||
          error?.message?.includes('rate limit') || error?.message?.includes('Internal Server Error')) {
        const delay = initialDelay * Math.pow(2, i);
        console.log(`API error (${error?.status || 'unknown'}). Retrying in ${delay}ms... (Attempt ${i + 1}/${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      
      throw error;
    }
  }
  
  throw lastError || new Error('Max retries exceeded');
}

function extractJSON(content: string): any {
  if (!content) return {};
  
  const codeBlockMatch = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  if (codeBlockMatch) {
    content = codeBlockMatch[1].trim();
  }
  
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
  const timestamp = Date.now();
  const randomSeed = Math.floor(Math.random() * 1000000);
  const uniqueId = `${timestamp}-${randomSeed}`;
  
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

  const currentDate = new Date();
  const month = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();

  return `You are a senior content strategist at a leading digital media company. Create a professional, modern ${typeMap[formData.articleType]} that matches the quality of TechCrunch, The Verge, or Harvard Business Review.

UNIQUENESS SEED: ${uniqueId}
CONTEXT: ${month} ${year}

ARTICLE BRIEF:
Title: "${formData.websiteName}"
Focus: ${formData.websiteDescription}
Length: ${lengthMap[formData.articleLength]}
Tone: ${formData.toneOfVoice}
Language: ${formData.language}${formData.targetAudience ? `\nAudience: ${formData.targetAudience}` : ''}${formData.customKeywords && formData.customKeywords.length > 0 ? `\nKeywords: ${formData.customKeywords.join(', ')}` : ''}

CONTENT STANDARDS:
- Write with authority and expertise
- Use data, statistics, and real examples
- Include specific company names, tools, and methodologies
- Reference current ${year} trends and technologies
- Provide actionable insights and frameworks
- Use professional, engaging language
- NO emojis or casual symbols
- NO generic content - be specific and unique

MODERN HTML STRUCTURE:
Create a clean, professional article with these sections:

<article class="max-w-4xl mx-auto px-6 py-12">
  
  <header class="mb-12">
    <h1 class="text-4xl font-bold text-gray-900 leading-tight mb-4">
      [Compelling headline with keywords]
    </h1>
    <div class="flex items-center gap-4 text-sm text-gray-600 mb-6">
      <time datetime="${year}-${month.substring(0,3)}">${month} ${year}</time>
      <span class="text-gray-400">•</span>
      <span>[X] min read</span>
    </div>
    <p class="text-xl text-gray-700 leading-relaxed">
      [Engaging 2-3 sentence summary that hooks the reader]
    </p>
  </header>

  <nav class="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-12">
    <h2 class="text-lg font-semibold text-gray-900 mb-4">Table of Contents</h2>
    <ul class="space-y-2 text-gray-700">
      [5-8 section links]
    </ul>
  </nav>

  <section class="prose prose-lg max-w-none mb-12">
    <h2 class="text-3xl font-bold text-gray-900 mb-6">Introduction</h2>
    <p class="text-lg text-gray-800 mb-4">[Opening paragraph with context]</p>
    <p class="mb-4">[Problem statement]</p>
    <p class="mb-4">[Article value proposition]</p>
    
    <div class="bg-blue-50 border-l-4 border-blue-600 p-6 my-8">
      <h3 class="font-semibold text-gray-900 mb-3">Key Takeaways</h3>
      <ul class="space-y-2 text-gray-800">
        [3-5 main insights]
      </ul>
    </div>
  </section>

  <section class="prose prose-lg max-w-none mb-12">
    <h2 class="text-3xl font-bold text-gray-900 mb-6">[Section Title with Keywords]</h2>
    <p class="mb-4">[Opening paragraph]</p>
    
    <h3 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">[Subsection Title]</h3>
    <p class="mb-4">[Detailed content with examples]</p>
    
    <div class="bg-green-50 border border-green-200 rounded-lg p-6 my-8">
      <h4 class="font-semibold text-gray-900 mb-3">Case Study</h4>
      <p class="text-gray-800">[Real-world example with specific company/data]</p>
    </div>
    
    <ul class="space-y-3 my-6">
      <li class="flex items-start">
        <span class="text-blue-600 mr-2">▸</span>
        <span><strong>Point 1:</strong> Detailed explanation</span>
      </li>
      [More list items]
    </ul>${formData.includeTables ? `
    
    <div class="overflow-x-auto my-8">
      <table class="min-w-full divide-y divide-gray-200 border border-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Feature</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Details</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          [Table rows with data]
        </tbody>
      </table>
    </div>` : ''}
    
    <blockquote class="border-l-4 border-gray-300 pl-6 py-2 italic text-gray-700 my-8">
      "[Expert insight or key quote]" — [Source/Expert Name]
    </blockquote>
  </section>

  <section class="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-8 mb-12">
    <h2 class="text-3xl font-bold text-gray-900 mb-6">Expert Insights & Best Practices</h2>
    <div class="grid md:grid-cols-2 gap-6">
      <div class="bg-white rounded-lg p-6 shadow-sm">
        <h3 class="font-semibold text-gray-900 mb-2">[Insight Title]</h3>
        <p class="text-gray-700">[Detailed explanation]</p>
      </div>
      [3-5 more insight cards]
    </div>
  </section>

  <section class="mb-12">
    <h2 class="text-3xl font-bold text-gray-900 mb-6">Common Challenges & Solutions</h2>
    <div class="space-y-6">
      <div class="border-l-4 border-red-500 bg-red-50 p-6 rounded-r-lg">
        <h3 class="font-semibold text-red-900 mb-2">Challenge: [Specific Problem]</h3>
        <p class="text-gray-800">Solution: [Actionable fix]</p>
      </div>
      [4-6 more challenge/solution pairs]
    </div>
  </section>

  <section class="mb-12">
    <h2 class="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
    <div class="space-y-6">
      <div class="border-b border-gray-200 pb-6">
        <h3 class="text-xl font-semibold text-gray-900 mb-3">[Question]</h3>
        <p class="text-gray-700">[Comprehensive 80-150 word answer]</p>
      </div>
      [6-8 more FAQ items]
    </div>
  </section>

  <section class="mb-12">
    <h2 class="text-3xl font-bold text-gray-900 mb-6">Conclusion & Next Steps</h2>
    <p class="text-lg text-gray-800 mb-4">[Summary of key points]</p>
    <p class="mb-6">[Final thoughts and future outlook]</p>
    
    <div class="bg-blue-600 text-white rounded-lg p-8">
      <h3 class="text-2xl font-bold mb-4">Ready to Get Started?</h3>
      <p class="mb-6">[Compelling CTA message]</p>
      <div class="space-y-3">
        <div class="flex items-center">
          <span class="mr-3">1.</span>
          <span>[Action step 1]</span>
        </div>
        <div class="flex items-center">
          <span class="mr-3">2.</span>
          <span>[Action step 2]</span>
        </div>
        <div class="flex items-center">
          <span class="mr-3">3.</span>
          <span>[Action step 3]</span>
        </div>
      </div>
    </div>
  </section>

  <section class="bg-gray-50 border border-gray-200 rounded-lg p-6">
    <h3 class="font-semibold text-gray-900 mb-4">Additional Resources</h3>
    <ul class="space-y-2 text-gray-700">
      <li><a href="#" class="text-blue-600 hover:underline">[Resource 1]</a></li>
      <li><a href="#" class="text-blue-600 hover:underline">[Resource 2]</a></li>
      <li><a href="#" class="text-blue-600 hover:underline">[Resource 3]</a></li>
    </ul>
  </section>

</article>

WRITING GUIDELINES:
- Use active voice and strong verbs
- Include specific data and statistics
- Reference real companies and tools
- Add transition sentences between sections
- Keep paragraphs concise (3-5 sentences)
- Use professional language throughout
- Include schema.org markup where appropriate
- Add proper semantic HTML5 elements
- Ensure mobile-responsive design
- NO emojis or casual symbols

SEO OPTIMIZATION:
- Natural keyword integration (2-3% density)
- LSI keywords and semantic variations
- Question-based headings for voice search
- Featured snippet-ready content
- Internal linking opportunities (HTML comments)
- External authority links (HTML comments)
- Proper heading hierarchy (H1 > H2 > H3)
- Meta description optimization

RESPOND WITH VALID JSON ONLY (no markdown, no code blocks):
{
  "htmlArticle": "[Complete modern HTML as specified above]",
  "title": "[Professional 50-65 character title with keywords]",
  "category": "[Specific category]",
  "tags": ["[10-15 relevant tags]"],
  "metaDescription": "[Compelling 150-160 character description]",
  "slug": "[seo-optimized-url-slug]",
  "focusKeywords": ["[5-7 strategic keywords]"]
}

CRITICAL: Generate completely unique content using seed ${uniqueId}. This must be publication-ready for a professional media company. NO emojis. Professional tone only.`;
}

export async function generateArticle(formData: GeneratorFormData): Promise<GeneratedArticle> {
  if (!OPENROUTER_API_KEY || OPENROUTER_API_KEY.trim() === '') {
    throw new Error('No OpenRouter API key found. Add VITE_OPENROUTER_API_KEY to your .env file.');
  }

  try {
    const completion = await retryWithBackoff(() =>
      openai.chat.completions.create({
        model: 'tngtech/tng-r1t-chimera:free',
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
        await new Promise(resolve => setTimeout(resolve, 5000));
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
        model: 'tngtech/tng-r1t-chimera:free',
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
