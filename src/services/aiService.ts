import { GeneratorFormData, GeneratedArticle } from '../types';
import OpenAI from 'openai';

// Get API key from environment variable
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY || '';

// Initialize OpenAI client with OpenRouter configuration
const client = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: OPENROUTER_API_KEY,
  dangerouslyAllowBrowser: true, // Required for client-side usage
});

const mockArticleData: GeneratedArticle = {
  htmlArticle: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Comprehensive review and analysis of leading cryptocurrency platforms and fintech tools">
    <title>The Ultimate Guide to Cryptocurrency Reviews and Fintech Tools</title>
</head>
<body>
    <article>
        <header>
            <h1>The Ultimate Guide to Cryptocurrency Reviews and Fintech Tools</h1>
            <p class="intro">In today's rapidly evolving digital financial landscape, choosing the right cryptocurrency platforms and fintech tools has become more critical than ever.</p>
        </header>

        <section>
            <h2>Understanding the Cryptocurrency Ecosystem</h2>
            <p>The cryptocurrency market has grown exponentially over the past decade, transforming from a niche technology into a mainstream financial instrument. This growth has led to an explosion of platforms, exchanges, and tools designed to help users navigate this complex landscape.</p>
            
            <h3>Key Components of the Crypto Space</h3>
            <ul>
                <li><strong>Exchanges:</strong> Platforms where users can buy, sell, and trade cryptocurrencies</li>
                <li><strong>Wallets:</strong> Digital storage solutions for securing crypto assets</li>
                <li><strong>DeFi Platforms:</strong> Decentralized finance applications offering lending, borrowing, and yield farming</li>
                <li><strong>Analytics Tools:</strong> Software for tracking portfolio performance and market trends</li>
            </ul>
        </section>

        <section>
            <h2>Essential Criteria for Evaluating Crypto Platforms</h2>
            <p>When reviewing cryptocurrency platforms and fintech tools, several critical factors must be considered to ensure you're making informed decisions.</p>

            <h3>Security and Compliance</h3>
            <p>Security should be your top priority when selecting any cryptocurrency platform. Look for platforms that implement:</p>
            <ul>
                <li>Two-factor authentication (2FA)</li>
                <li>Cold storage for the majority of user funds</li>
                <li>Regular security audits by reputable third-party firms</li>
                <li>Compliance with relevant regulatory frameworks</li>
                <li>Insurance coverage for user deposits</li>
            </ul>

            <h3>User Experience and Interface</h3>
            <p>A platform's interface can significantly impact your trading experience. The best platforms offer intuitive navigation, clear data visualization, and responsive customer support.</p>
        </section>

        <section>
            <h2>Top Cryptocurrency Exchanges Reviewed</h2>
            <p>Based on extensive research and user feedback, here are some of the most reliable cryptocurrency exchanges available today.</p>

            <h3>Enterprise-Grade Exchanges</h3>
            <p>These platforms cater to serious traders and institutions, offering advanced features, deep liquidity, and robust security measures. They typically support a wide range of cryptocurrencies and trading pairs, along with professional-grade charting tools and API access for algorithmic trading.</p>

            <h3>Beginner-Friendly Platforms</h3>
            <p>For those new to cryptocurrency, certain platforms stand out for their simplicity and educational resources. These exchanges prioritize ease of use while maintaining strong security standards, making them ideal entry points for crypto newcomers.</p>
        </section>

        <section>
            <h2>Fintech Tools for Portfolio Management</h2>
            <p>Managing a cryptocurrency portfolio requires sophisticated tools that can track multiple assets across various platforms and provide real-time insights.</p>

            <h3>Portfolio Trackers</h3>
            <p>Modern portfolio tracking tools offer features such as:</p>
            <ul>
                <li>Real-time price updates and alerts</li>
                <li>Multi-exchange integration</li>
                <li>Tax reporting and transaction history</li>
                <li>Performance analytics and profit/loss calculations</li>
                <li>Mobile app support for on-the-go monitoring</li>
            </ul>
        </section>

        <section>
            <h2>Risk Management and Best Practices</h2>
            <p>Successful cryptocurrency investing requires disciplined risk management and adherence to proven best practices.</p>

            <h3>Diversification Strategies</h3>
            <p>Never put all your eggs in one basket. Diversify across different cryptocurrencies, sectors, and platforms to minimize risk exposure. Consider allocating funds to both established cryptocurrencies and promising emerging projects.</p>

            <h3>Security Protocols</h3>
            <p>Implement strong security measures including hardware wallets for long-term storage, unique passwords for each platform, and regular security audits of your holdings. Stay informed about common scams and phishing attempts in the crypto space.</p>
        </section>

        <section>
            <h2>Future Trends in Cryptocurrency and Fintech</h2>
            <p>The cryptocurrency and fintech industries continue to evolve rapidly, with several emerging trends shaping the future landscape.</p>

            <h3>Decentralized Finance (DeFi)</h3>
            <p>DeFi platforms are revolutionizing traditional financial services by offering decentralized alternatives to banking, lending, and trading. These platforms operate without intermediaries, providing users with greater control over their assets.</p>

            <h3>Central Bank Digital Currencies (CBDCs)</h3>
            <p>Governments worldwide are exploring and developing their own digital currencies, which could significantly impact the broader cryptocurrency ecosystem and adoption rates.</p>
        </section>

        <section>
            <h2>Conclusion</h2>
            <p>Navigating the cryptocurrency and fintech landscape requires careful research, due diligence, and ongoing education. By understanding the key features to look for in platforms and tools, implementing strong security practices, and staying informed about industry trends, you can make more confident decisions in this dynamic space.</p>
            <p>Remember that cryptocurrency investments carry inherent risks, and it's essential to only invest what you can afford to lose. Always conduct thorough research before making any investment decisions, and consider consulting with financial advisors when appropriate.</p>
        </section>
    </article>
</body>
</html>`,
  title: 'The Ultimate Guide to Cryptocurrency Reviews and Fintech Tools',
  category: 'Cryptocurrency',
  tags: [
    'cryptocurrency',
    'fintech',
    'crypto reviews',
    'blockchain',
    'digital currency',
    'crypto exchanges',
    'portfolio management',
    'DeFi',
    'investment tools',
    'financial technology'
  ],
  metaDescription: 'Comprehensive review and analysis of leading cryptocurrency platforms and fintech tools. Learn how to evaluate exchanges, manage your portfolio, and navigate the crypto landscape safely.',
  slug: 'ultimate-guide-cryptocurrency-reviews-fintech-tools',
  focusKeywords: [
    'cryptocurrency reviews',
    'fintech tools',
    'crypto platforms',
    'blockchain technology',
    'digital currency exchanges'
  ]
};

function buildPrompt(formData: GeneratorFormData): string {
  const lengthMap = {
    short: '2000-3000 words',
    medium: '3500-5000 words',
    long: '5500-8000 words'
  };

  const typeMap = {
    review: 'Professional Review Article',
    guide: 'Comprehensive Expert Guide',
    about: 'Professional About Page',
    'tool-overview': 'In-Depth Tool/SaaS Analysis'
  };

  return `You are a senior full-stack developer and expert SEO content strategist with 15+ years of experience writing authoritative, modern, and professional content. Generate an exceptional, publication-ready ${typeMap[formData.articleType]} for "${formData.websiteName}".

Website Focus: ${formData.websiteDescription}

CRITICAL REQUIREMENTS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 CONTENT SPECIFICATIONS:
- Target Length: ${lengthMap[formData.articleLength]} (MINIMUM - go longer if needed for quality)
- Tone: ${formData.toneOfVoice}, modern, authoritative, and engaging
- Language: ${formData.language}
- Writing Level: Professional industry expert addressing informed readers

🎯 CONTENT QUALITY STANDARDS:
1. DEPTH & EXPERTISE: Demonstrate deep subject matter knowledge with specific examples, data points, and industry insights
2. MODERN APPROACH: Use current 2025 trends, technologies, and best practices
3. PROFESSIONAL STRUCTURE: Clear hierarchy with engaging subheadings that preview content
4. ACTIONABLE VALUE: Include practical tips, real-world applications, and concrete takeaways
5. COMPREHENSIVE COVERAGE: Address topic from multiple angles with nuanced perspectives
6. ENGAGING NARRATIVE: Use storytelling elements, case studies, and relatable scenarios

📝 ARTICLE STRUCTURE (MANDATORY):

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
}

export async function generateArticle(
  formData: GeneratorFormData
): Promise<GeneratedArticle> {
  // If no API key is provided, return mock data
  if (!OPENROUTER_API_KEY || (typeof OPENROUTER_API_KEY === 'string' && OPENROUTER_API_KEY.trim() === '')) {
    console.warn('No OpenRouter API key found. Using mock data. Add VITE_OPENROUTER_API_KEY to your .env file.');
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Customize mock data slightly based on input
    return {
      ...mockArticleData,
      title: `Complete Guide to ${formData.websiteName}`,
      slug: formData.websiteName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
    };
  }

  try {
    // Generate professional, comprehensive article using Alibaba Tongyi Deep Research model
    const apiResponse = await client.chat.completions.create({
      model: 'alibaba/tongyi-deepresearch-30b-a3b:free',
      messages: [
        {
          role: 'system',
          content: 'You are a senior full-stack developer and elite SEO content strategist with 15+ years of experience. You create authoritative, modern, professional content that ranks #1 on Google. Your articles are comprehensive (3000-8000 words), expertly structured, and packed with actionable insights. You ALWAYS respond with perfectly formatted, valid JSON. Every piece you write demonstrates deep expertise, uses current 2024-2025 trends, and provides exceptional value that establishes industry authority.'
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

    // Extract the assistant message
    const response = apiResponse.choices[0].message;
    
    if (!response.content) {
      throw new Error('No content received from API');
    }

    // Parse the JSON response
    const result = JSON.parse(response.content);

    // Validate the response structure
    if (!result.htmlArticle || !result.title || !result.category || !result.tags || 
        !result.metaDescription || !result.slug || !result.focusKeywords) {
      throw new Error('Invalid response structure from API');
    }

    return result as GeneratedArticle;
  } catch (error) {
    console.error('Error generating article:', error);
    
    // Provide more specific error messages
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
