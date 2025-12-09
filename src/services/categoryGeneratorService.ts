import { CategoryGenerationConfig, GeneratorFormData } from '../types';
import OpenAI from 'openai';

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
      
      // Check if it's a rate limit error
      if (error?.status === 429 || error?.message?.includes('429') || error?.message?.includes('rate limit')) {
        const delay = initialDelay * Math.pow(2, i);
        console.log(`Rate limit hit. Retrying in ${delay}ms... (Attempt ${i + 1}/${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      
      // If it's not a rate limit error, throw immediately
      throw error;
    }
  }
  
  throw lastError || new Error('Max retries exceeded');
}

export class CategoryGeneratorService {
  /**
   * Generates unique article ideas for a given category
   * Uses AI to create fresh, diverse topics every time
   */
  static async generateArticleIdeas(config: CategoryGenerationConfig): Promise<GeneratorFormData[]> {
    if (!OPENROUTER_API_KEY || OPENROUTER_API_KEY.trim() === '') {
      // Fallback to template-based generation
      return this.generateTemplateIdeas(config);
    }

    try {
      const prompt = this.buildCategoryPrompt(config);
      
      // Use Mistral Devstral for superior article idea generation
      const response = await retryWithBackoff(() =>
        openai.chat.completions.create({
          model: 'mistralai/devstral-2512:free',
          messages: [
            {
              role: 'user',
              content: `You are a world-class content strategist and SEO expert. Generate breakthrough, highly specific, and unique article ideas. Always respond with valid JSON (no markdown).\n\n${prompt}`
            }
          ]
        })
      );

      const responseMessage = response.choices[0].message;
      
      // Extract and parse JSON from response
      const result = extractJSON(responseMessage.content || '{}');
      
      if (!result.articles || !Array.isArray(result.articles)) {
        throw new Error('Invalid response format');
      }

      return result.articles.map((article: any) => ({
        websiteName: article.websiteName || article.title,
        websiteDescription: article.websiteDescription || article.description,
        articleType: config.articleType,
        articleLength: config.articleLength,
        toneOfVoice: config.toneOfVoice,
        language: config.language,
        targetAudience: config.targetAudience,
        customKeywords: article.keywords || config.customKeywords,
        includeTables: true,
        includeImages: false,
      }));
    } catch (error) {
      console.error('Error generating category ideas:', error);
      return this.generateTemplateIdeas(config);
    }
  }

  private static buildCategoryPrompt(config: CategoryGenerationConfig): string {
    const currentYear = 2025;
    const currentMonth = new Date().toLocaleString('default', { month: 'long' });
    const timestamp = Date.now();
    const randomSeed = Math.floor(Math.random() * 10000);

    return `Generate ${config.count} COMPLETELY FRESH AND UNIQUE article ideas for the "${config.category}" category.

⚠️ CRITICAL: DO NOT repeat common or generic topics. Think creatively and generate truly innovative ideas.

UNIQUENESS SEED: ${timestamp}-${randomSeed}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📅 CURRENT CONTEXT:
- Year: ${currentYear}
- Month: ${currentMonth}
- Focus on CUTTING-EDGE trends, emerging technologies, and innovative approaches
- Include ${currentYear} breakthrough developments and future predictions
- Reference real-world case studies and success stories

🎯 ARTICLE SPECIFICATIONS:
- Category: ${config.category}
- Type: ${config.articleType}
- Tone: ${config.toneOfVoice}
- Language: ${config.language}
${config.targetAudience ? `- Target Audience: ${config.targetAudience}` : ''}
${config.customKeywords ? `- Include Keywords: ${config.customKeywords.join(', ')}` : ''}

💡 MAXIMUM CREATIVITY REQUIREMENTS:
1. Each article MUST be 100% UNIQUE - no repetition of common topics
2. Explore NICHE subtopics, emerging trends, and unconventional angles
3. Include SPECIFIC use cases, industries, or scenarios (e.g., "for remote teams", "in healthcare", "for startups")
4. Mix different complexity levels: beginner-friendly, intermediate deep-dives, expert-level analysis
5. Combine multiple concepts (e.g., "AI + Sustainability", "Blockchain + Healthcare")
6. Reference SPECIFIC tools, platforms, frameworks, or methodologies
7. Include timely topics: recent developments, upcoming trends, seasonal relevance
8. Think globally: different markets, regions, cultural perspectives
9. Address pain points: common challenges, mistakes, optimization opportunities
10. Future-focused: predictions, upcoming changes, preparation strategies

📝 EXTREME DIVERSITY GUIDELINES:
- Content types: how-to guides, case studies, comparisons, trend analysis, expert interviews, tool reviews, strategy frameworks, checklists, troubleshooting guides, optimization tips
- Audience segments: solopreneurs, enterprises, developers, marketers, executives, students, freelancers, agencies, non-profits
- Formats: step-by-step tutorials, comprehensive handbooks, quick-start guides, advanced masterclasses, beginner crash courses
- Perspectives: cost optimization, time-saving, quality improvement, risk mitigation, growth acceleration, automation, innovation
- Industries: fintech, healthtech, edtech, e-commerce, SaaS, manufacturing, retail, services
- Scales: individual, small team, mid-size company, enterprise, global organization

🎨 CREATIVE ANGLES TO EXPLORE:
- "Hidden" or "underrated" aspects of the category
- Controversial or contrarian viewpoints
- Cross-industry applications
- Budget-conscious vs premium approaches
- DIY vs professional solutions
- Traditional vs modern methods
- Regional or cultural variations
- Accessibility and inclusivity angles
- Environmental and sustainability aspects
- Security and privacy considerations
- Mobile-first or remote-first approaches
- Integration with other tools/platforms

🔍 PREMIUM QUALITY STANDARDS:
- Titles must be HIGHLY SPECIFIC and descriptive (not generic)
- Descriptions must be 150-250 words with rich detail
- Include concrete examples, statistics, or data points
- Mention specific pain points and clear solutions
- Highlight unique value proposition
- Add urgency or relevance to ${currentYear}
- Include actionable takeaways
- Reference real tools, companies, or methodologies

JSON RESPONSE FORMAT:
{
  "articles": [
    {
      "websiteName": "Ultra-specific, compelling title with niche focus",
      "websiteDescription": "Detailed 150-250 word description with: specific target audience, concrete problem/opportunity, detailed solutions, unique insights, real-world examples, ${currentYear} relevance, and clear value proposition",
      "keywords": ["specific-keyword-1", "niche-keyword-2", "long-tail-keyword-3"]
    }
  ]
}

INSPIRATION EXAMPLES (DO NOT COPY - USE AS CREATIVITY SPRINGBOARD):
- "Zero-Budget Content Marketing Strategies for B2B SaaS Startups in Emerging Markets"
- "Implementing Ethical AI Governance Frameworks for Healthcare Data Privacy Compliance"
- "Micro-SaaS Validation Techniques: From Idea to First 100 Paying Customers in 90 Days"
- "Sustainable Web Development: Reducing Carbon Footprint Through Code Optimization"
- "Neurodiversity-Inclusive UX Design Patterns for Enterprise Software Applications"

🚀 NOW GENERATE ${config.count} BREAKTHROUGH, INNOVATIVE, HIGHLY SPECIFIC ARTICLE IDEAS:
Think outside the box. Be creative. Be specific. Be valuable. Make each idea something people haven't seen before.`;
  }

  /**
   * Template-based fallback when API is not available
   */
  private static generateTemplateIdeas(config: CategoryGenerationConfig): GeneratorFormData[] {
    const templates = this.getCategoryTemplates(config.category);
    const selected = templates.slice(0, config.count);

    return selected.map((template, _index) => ({
      websiteName: template.name,
      websiteDescription: template.description,
      articleType: config.articleType,
      articleLength: config.articleLength,
      toneOfVoice: config.toneOfVoice,
      language: config.language,
      targetAudience: config.targetAudience,
      customKeywords: config.customKeywords,
      includeTables: true,
      includeImages: false,
    }));
  }

  private static getCategoryTemplates(category: string): { name: string; description: string }[] {
    const templates: { [key: string]: { name: string; description: string }[] } = {
      'Technology': [
        { name: 'Latest Tech News and Gadget Reviews 2025', description: 'Latest tech news, gadgets, and innovations covering smartphones, laptops, wearables, smart home devices, and emerging technologies shaping 2025.' },
        { name: 'Cloud Computing Best Practices', description: 'Expert guide to cloud infrastructure, multi-cloud strategies, serverless architecture, and cost optimization techniques for modern businesses.' },
        { name: 'Cybersecurity Essentials', description: 'Complete cybersecurity framework covering threat detection, zero-trust architecture, incident response, and compliance requirements for 2025.' },
        { name: 'Web Development Frameworks Comparison', description: 'In-depth comparison of React, Vue, Angular, and emerging frameworks, with performance benchmarks and use case recommendations.' },
        { name: 'DevOps and CI/CD Pipeline Guide', description: 'Practical guide to implementing DevOps culture, continuous integration/deployment, infrastructure as code, and automation tools.' },
      ],
      'Startups': [
        { name: 'Startup Stories and Funding News', description: 'Startup stories, funding news, and growth strategies covering venture capital, bootstrapping, product-market fit, and scaling techniques for 2025.' },
        { name: 'Startup Growth Hacking Techniques', description: 'Proven growth strategies for startups including viral marketing, product-led growth, customer acquisition, and retention tactics.' },
        { name: 'Startup Fundraising Guide', description: 'Complete guide to raising capital including pitch decks, investor relations, term sheets, and negotiation strategies.' },
        { name: 'Building MVP and Product Launch', description: 'Step-by-step guide to building minimum viable products, beta testing, and successful product launches.' },
        { name: 'Startup Team Building', description: 'Strategies for recruiting, hiring, and building high-performing startup teams with limited resources.' },
      ],
      'Reviews': [
        { name: 'Product Reviews and Comparisons', description: 'Product reviews, comparisons, and recommendations covering software, hardware, services, and tools with detailed analysis and ratings.' },
        { name: 'Software Tool Reviews 2025', description: 'Comprehensive reviews of productivity tools, project management software, and business applications.' },
        { name: 'Tech Gadget Comparison Guide', description: 'Side-by-side comparisons of smartphones, laptops, tablets, and consumer electronics.' },
        { name: 'SaaS Platform Reviews', description: 'In-depth reviews of SaaS platforms including features, pricing, pros, cons, and alternatives.' },
        { name: 'Service Provider Comparisons', description: 'Detailed comparisons of web hosting, cloud services, and digital service providers.' },
      ],
      'AI': [
        { name: 'Artificial Intelligence and Machine Learning 2025', description: 'Artificial Intelligence, machine learning, and automation covering GPT models, neural networks, computer vision, and AI applications in business.' },
        { name: 'AI Tools for Business', description: 'Practical guide to implementing AI tools for marketing, sales, customer service, and operations.' },
        { name: 'Machine Learning Algorithms Explained', description: 'Comprehensive guide to ML algorithms, training models, and real-world applications.' },
        { name: 'AI Ethics and Responsible AI', description: 'Discussion of AI ethics, bias, privacy, and responsible AI development practices.' },
        { name: 'Generative AI Applications', description: 'Exploring generative AI tools for content creation, design, coding, and business automation.' },
      ],
      'Marketing': [
        { name: 'Digital Marketing and SEO Strategies', description: 'Digital marketing, SEO, and growth hacking covering content marketing, social media, paid ads, email campaigns, and conversion optimization.' },
        { name: 'SEO Best Practices 2025', description: 'Modern SEO strategies including technical SEO, content optimization, link building, and local SEO.' },
        { name: 'Social Media Marketing Guide', description: 'Platform-specific strategies for Instagram, TikTok, LinkedIn, Twitter, and emerging social platforms.' },
        { name: 'Content Marketing Strategy', description: 'Creating and distributing valuable content to attract and retain customers.' },
        { name: 'Email Marketing Automation', description: 'Building effective email campaigns with automation, segmentation, and personalization.' },
      ],
      'Leadership': [
        { name: 'Leadership Insights and Management Strategies', description: 'Leadership insights and management strategies covering team building, decision-making, communication, and organizational culture.' },
        { name: 'Remote Team Leadership', description: 'Leading distributed teams effectively with communication tools, culture building, and performance management.' },
        { name: 'Executive Decision Making', description: 'Strategic decision-making frameworks for executives and business leaders.' },
        { name: 'Building High-Performance Teams', description: 'Strategies for recruiting, developing, and retaining top talent.' },
        { name: 'Change Management Guide', description: 'Leading organizational change and transformation initiatives successfully.' },
      ],
      'Finance': [
        { name: 'Financial News and Investment Tips', description: 'Financial news, investment tips, and market analysis covering stocks, bonds, real estate, cryptocurrency, and portfolio management.' },
        { name: 'Personal Finance Management', description: 'Complete personal finance framework including budgeting, debt management, savings strategies, and retirement planning.' },
        { name: 'Cryptocurrency Investment Guide', description: 'Comprehensive cryptocurrency guide covering Bitcoin, Ethereum, DeFi, NFTs, and blockchain technology applications.' },
        { name: 'Tax Optimization Strategies', description: 'Legal tax reduction strategies for individuals and businesses, including deductions, credits, and tax-advantaged accounts.' },
        { name: 'Real Estate Investment Guide', description: 'Real estate investing strategies covering residential, commercial, REITs, and property management best practices.' },
      ],
      'SaaS': [
        { name: 'Software as a Service Trends and Tools', description: 'Software as a Service trends, tools, and best practices covering SaaS metrics, pricing strategies, customer success, and product development.' },
        { name: 'SaaS Pricing Strategies', description: 'Comprehensive guide to SaaS pricing models, packaging, and revenue optimization.' },
        { name: 'SaaS Customer Success', description: 'Building customer success programs to reduce churn and increase lifetime value.' },
        { name: 'SaaS Metrics and Analytics', description: 'Key SaaS metrics including MRR, ARR, CAC, LTV, and churn rate analysis.' },
        { name: 'Building Scalable SaaS Products', description: 'Technical and business strategies for building and scaling SaaS applications.' },
      ],
      'Productivity': [
        { name: 'Tools and Tips to Boost Productivity', description: 'Tools and tips to boost your productivity covering time management, workflow optimization, automation, and productivity apps.' },
        { name: 'Time Management Techniques', description: 'Proven time management methods including Pomodoro, time blocking, and priority matrices.' },
        { name: 'Productivity Apps Comparison', description: 'Reviews and comparisons of task managers, note-taking apps, and productivity tools.' },
        { name: 'Remote Work Productivity', description: 'Strategies for staying productive while working from home or remotely.' },
        { name: 'Workflow Automation Guide', description: 'Automating repetitive tasks with tools like Zapier, Make, and custom scripts.' },
      ],
      'Business': [
        { name: 'Business Strategies and Entrepreneurship', description: 'Business strategies, insights, and entrepreneurship covering business models, market analysis, competitive strategy, and growth planning.' },
        { name: 'Business Model Innovation', description: 'Exploring new business models including subscription, marketplace, and platform strategies.' },
        { name: 'Competitive Analysis Framework', description: 'Analyzing competitors and positioning your business for success.' },
        { name: 'Business Growth Strategies', description: 'Proven strategies for scaling businesses including partnerships, expansion, and diversification.' },
        { name: 'Entrepreneurship Fundamentals', description: 'Essential guide for aspiring entrepreneurs covering ideation, validation, and execution.' },
      ],
    };

    return templates[category] || templates['Technology'];
  }

  /**
   * Generates variations of a single topic to create multiple unique articles
   */
  static generateTopicVariations(baseTopic: string, count: number, config: Partial<CategoryGenerationConfig>): GeneratorFormData[] {
    const variations = [
      `Complete Beginner's Guide to ${baseTopic}`,
      `Advanced ${baseTopic} Strategies for Professionals`,
      `${baseTopic}: Common Mistakes and How to Avoid Them`,
      `The Ultimate ${baseTopic} Checklist for 2025`,
      `${baseTopic} vs Alternatives: Comprehensive Comparison`,
      `How to Master ${baseTopic} in 30 Days`,
      `${baseTopic} Case Studies and Success Stories`,
      `Future of ${baseTopic}: Trends and Predictions`,
      `${baseTopic} Tools and Resources Guide`,
      `${baseTopic} Best Practices from Industry Experts`,
    ];

    return variations.slice(0, count).map((title) => ({
      websiteName: title,
      websiteDescription: `Comprehensive guide covering ${baseTopic} with practical examples, expert insights, and actionable strategies for 2025.`,
      articleType: config.articleType || 'guide',
      articleLength: config.articleLength || 'medium',
      toneOfVoice: config.toneOfVoice || 'professional',
      language: config.language || 'english',
      targetAudience: config.targetAudience,
      customKeywords: config.customKeywords,
      includeTables: true,
      includeImages: false,
    }));
  }
}
