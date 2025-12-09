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

  return `You are an elite content strategist and senior technical writer at a Fortune 500 digital media company. You create world-class, publication-ready content that ranks #1 on Google and drives millions in revenue.

UNIQUENESS SEED: ${uniqueId}
GENERATION CONTEXT: ${month} ${year}

═══════════════════════════════════════════════════════════════════════════════
🎯 ARTICLE MISSION
═══════════════════════════════════════════════════════════════════════════════

Create a ${typeMap[formData.articleType]} for: "${formData.websiteName}"
Focus: ${formData.websiteDescription}

Target Length: ${lengthMap[formData.articleLength]} (EXCEED if value demands)
Tone: ${formData.toneOfVoice} | Language: ${formData.language}${formData.targetAudience ? `\nAudience: ${formData.targetAudience}` : ''}${formData.customKeywords && formData.customKeywords.length > 0 ? `\nKeywords: ${formData.customKeywords.join(', ')}` : ''}

═══════════════════════════════════════════════════════════════════════════════
🏆 ENTERPRISE CONTENT STANDARDS
═══════════════════════════════════════════════════════════════════════════════

UNIQUENESS MANDATE:
• Generate 100% ORIGINAL content - never repeat common patterns
• Use SPECIFIC examples, data points, and case studies
• Include UNIQUE insights not found in generic articles
• Reference REAL tools, companies, methodologies (${year} context)
• Explore NICHE angles and unconventional perspectives

DEPTH & EXPERTISE:
• Demonstrate subject matter mastery with technical precision
• Include industry statistics, research findings, expert quotes
• Provide actionable frameworks and step-by-step methodologies
• Address edge cases, advanced scenarios, and pro-level insights
• Use real-world examples from Fortune 500 companies

MODERN ${year} APPROACH:
• Latest trends, technologies, and best practices
• AI/ML integration, automation, and digital transformation
• Sustainability, accessibility, and ethical considerations
• Remote-first, mobile-first, and cloud-native perspectives
• Emerging technologies: Web3, quantum computing, edge computing

═══════════════════════════════════════════════════════════════════════════════
📐 ULTRA-MODERN HTML STRUCTURE
═══════════════════════════════════════════════════════════════════════════════

<article class="prose prose-lg max-w-none" itemscope itemtype="https://schema.org/Article">
  
  <!-- Hero Section -->
  <header class="article-header mb-12">
    <h1 class="text-4xl md:text-5xl font-bold leading-tight mb-4" itemprop="headline">
      [Compelling, keyword-rich H1 with power words]
    </h1>
    <div class="article-meta flex items-center gap-4 text-gray-600 mb-6">
      <time datetime="${year}-${month}" itemprop="datePublished">${month} ${year}</time>
      <span>•</span>
      <span itemprop="wordCount">[X] min read</span>
    </div>
    <p class="text-xl text-gray-700 leading-relaxed" itemprop="description">
      [Engaging 2-3 sentence hook that captures attention and previews value]
    </p>
  </header>

  <!-- Table of Contents (for long articles) -->
  <nav class="toc bg-gray-50 p-6 rounded-lg mb-10" aria-label="Table of Contents">
    <h2 class="text-lg font-semibold mb-3">What You'll Learn</h2>
    <ul class="space-y-2">
      [5-8 clickable section links]
    </ul>
  </nav>

  <!-- Introduction -->
  <section class="intro mb-10" itemprop="articleBody">
    <h2 class="text-3xl font-bold mb-4">Introduction</h2>
    <p class="lead text-lg mb-4">[Context-setting paragraph]</p>
    <p>[Problem statement and opportunity]</p>
    <p>[Article value proposition]</p>
    <div class="key-takeaways bg-blue-50 border-l-4 border-blue-500 p-6 my-6">
      <h3 class="font-semibold mb-2">🎯 Key Takeaways</h3>
      <ul class="list-disc pl-5 space-y-1">
        [3-5 bullet points of main insights]
      </ul>
    </div>
  </section>

  <!-- Main Content Sections (6-10 sections) -->
  <section class="content-section mb-10">
    <h2 class="text-3xl font-bold mb-6">[Descriptive H2 with Keywords]</h2>
    <p class="mb-4">[Opening paragraph with hook]</p>
    
    <h3 class="text-2xl font-semibold mt-6 mb-3">[Specific H3 Subsection]</h3>
    <p class="mb-4">[Detailed content with examples]</p>
    
    <div class="example-box bg-green-50 p-6 rounded-lg my-6">
      <h4 class="font-semibold mb-2">💡 Real-World Example</h4>
      <p>[Specific case study or example]</p>
    </div>
    
    <ul class="list-disc pl-6 space-y-2 mb-4">
      <li><strong>Point 1:</strong> Detailed explanation</li>
      <li><strong>Point 2:</strong> Detailed explanation</li>
    </ul>${formData.includeTables ? `
    
    <div class="overflow-x-auto my-6">
      <table class="min-w-full border-collapse border border-gray-300">
        <thead class="bg-gray-100">
          <tr>
            <th class="border border-gray-300 px-4 py-2">Feature</th>
            <th class="border border-gray-300 px-4 py-2">Details</th>
          </tr>
        </thead>
        <tbody>
          [Comparison data rows]
        </tbody>
      </table>
    </div>` : ''}
    
    <blockquote class="border-l-4 border-gray-300 pl-4 italic my-6">
      "[Expert quote or key insight]" - [Source/Expert Name]
    </blockquote>
  </section>

  <!-- Pro Tips Section -->
  <section class="pro-tips bg-yellow-50 p-8 rounded-lg mb-10">
    <h2 class="text-3xl font-bold mb-6">⚡ Pro Tips & Advanced Strategies</h2>
    <div class="grid md:grid-cols-2 gap-6">
      <div class="tip-card">
        <h3 class="font-semibold mb-2">🎯 Tip 1: [Specific Tip]</h3>
        <p>[Detailed explanation]</p>
      </div>
      [3-5 more tip cards]
    </div>
  </section>

  <!-- Common Mistakes -->
  <section class="mistakes mb-10">
    <h2 class="text-3xl font-bold mb-6">🚫 Common Pitfalls to Avoid</h2>
    <div class="space-y-4">
      <div class="mistake-item border-l-4 border-red-500 pl-4">
        <h3 class="font-semibold text-red-700">Mistake: [Common Error]</h3>
        <p class="text-gray-700">Solution: [How to avoid it]</p>
      </div>
      [4-6 more mistakes]
    </div>
  </section>

  <!-- FAQ Section -->
  <section class="faq mb-10" itemscope itemtype="https://schema.org/FAQPage">
    <h2 class="text-3xl font-bold mb-6">❓ Frequently Asked Questions</h2>
    <div class="space-y-6">
      <div class="faq-item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
        <h3 class="text-xl font-semibold mb-2" itemprop="name">[Question]</h3>
        <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
          <p itemprop="text">[Detailed 80-150 word answer]</p>
        </div>
      </div>
      [6-8 more FAQ items]
    </div>
  </section>

  <!-- Conclusion -->
  <section class="conclusion mb-10">
    <h2 class="text-3xl font-bold mb-6">🎯 Conclusion & Next Steps</h2>
    <p class="mb-4">[Summary of key insights]</p>
    <p class="mb-4">[Reinforcement of main value]</p>
    <div class="next-steps bg-blue-50 p-6 rounded-lg">
      <h3 class="font-semibold mb-3">🚀 Action Items</h3>
      <ol class="list-decimal pl-5 space-y-2">
        <li>[Specific action step 1]</li>
        <li>[Specific action step 2]</li>
        <li>[Specific action step 3]</li>
      </ol>
    </div>
  </section>

  <!-- Resources -->
  <section class="resources bg-gray-50 p-6 rounded-lg">
    <h3 class="font-semibold mb-3">📚 Additional Resources</h3>
    <ul class="space-y-2">
      <li>• [Relevant tool/resource 1]</li>
      <li>• [Relevant tool/resource 2]</li>
      <li>• [Relevant tool/resource 3]</li>
    </ul>
  </section>

</article>

═══════════════════════════════════════════════════════════════════════════════
✍️ WRITING EXCELLENCE
═══════════════════════════════════════════════════════════════════════════════

• Lead with value in every paragraph - no fluff
• Use active voice and strong, specific verbs
• Include transition sentences between sections
• Break up text with subheadings every 200-300 words
• Use short paragraphs (3-5 sentences max)
• Include specific numbers, percentages, and data
• Add visual hierarchy with formatting
• Use semantic HTML5 elements properly
• Include ARIA labels for accessibility
• Add schema.org markup for rich snippets

═══════════════════════════════════════════════════════════════════════════════
🔍 SEO OPTIMIZATION
═══════════════════════════════════════════════════════════════════════════════

• Natural keyword integration (2-3% density)
• LSI keywords and semantic variations
• Question-based H2/H3 for voice search
• Featured snippet-ready content (lists, tables, definitions)
• Internal linking opportunities (mark with HTML comments)
• External authority links (mark with HTML comments)
• Image alt text placeholders
• Meta tags optimization

═══════════════════════════════════════════════════════════════════════════════
📊 REQUIRED JSON RESPONSE
═══════════════════════════════════════════════════════════════════════════════

Return ONLY valid JSON (no markdown, no code blocks, no extra text):

{
  "htmlArticle": "[Complete modern HTML with Tailwind classes as shown above]",
  "title": "[Compelling 50-65 char title with power words and keywords]",
  "category": "[Specific primary category]",
  "tags": ["[10-15 highly relevant tags including long-tail keywords]"],
  "metaDescription": "[Persuasive 150-160 char description with CTA]",
  "slug": "[seo-optimized-url-slug-with-keywords]",
  "focusKeywords": ["[5-7 strategic keywords including primary and LSI terms]"]
}

CRITICAL: Generate UNIQUE content every time. Use the seed ${uniqueId} to ensure complete originality. Never repeat patterns or generic content. This must be publication-ready for a Fortune 500 company.`;
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
