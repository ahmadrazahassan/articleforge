import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: 'Can I use the generated HTML directly in Blogger or WordPress?',
      answer: 'Yes! The generated HTML is a complete, standalone document that you can paste directly into most blogging platforms. For WordPress, you can paste it into the HTML/Code editor. For Blogger, use the HTML view. You may need to adjust some styling to match your theme.',
    },
    {
      question: 'Does the tool also give me SEO title, tags, and category?',
      answer: 'Absolutely! Along with the HTML article, you get a complete SEO package including an optimized title, category, tags, meta description, URL slug, and focus keywords. All of these can be copied individually or all at once.',
    },
    {
      question: 'Can I change the language or tone of the article?',
      answer: 'Yes, you can customize the tone of voice (Professional, Neutral, or Friendly) before generating. Currently, English is supported, but the structure is designed to accommodate more languages in future updates.',
    },
    {
      question: 'Do I need an API key to use this tool?',
      answer: 'The tool includes a mock generator that works without an API key for testing purposes. To generate custom AI-powered articles, you\'ll need to add your own OpenAI API key in the source code.',
    },
    {
      question: 'How long are the generated articles?',
      answer: 'You can choose from three length options: Short (800-1200 words), Medium (1500-2500 words), or Long (2500+ words). The AI will generate content within your selected range.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section 
      id="faq" 
      className="px-4 sm:px-6 lg:px-8 mb-20"
      style={{ fontFamily: "'SF Pro Display', 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif" }}
    >
      {/* Rounded Background Container */}
      <div className="bg-primary rounded-[60px] relative overflow-hidden">
        {/* Subtle Grid Background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="max-w-4xl mx-auto relative z-10 py-20 sm:py-24 lg:py-32">
          {/* Header - Ultra Modern Typography */}
          <div className="mb-24">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-16 bg-black/20" />
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-black/40">
                FAQ
              </span>
            </div>
            <h2 
              className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.85] tracking-tighter mb-8 text-black"
              style={{ fontFamily: "'Outfit', 'SF Pro Display', sans-serif" }}
            >
              <span className="block">Common</span>
              <span className="block text-black/70">questions</span>
            </h2>
            <p className="text-xl sm:text-2xl font-medium text-black/50 max-w-2xl leading-relaxed">
              Everything you need to know about the platform
            </p>
          </div>

          {/* FAQ Items - Minimal List Design */}
          <div className="space-y-1 mb-24">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="group border-t border-black/10 hover:border-black/30 transition-all"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full py-8 flex items-start justify-between text-left"
                >
                  <span 
                    className="font-black text-2xl sm:text-3xl lg:text-4xl pr-8 leading-tight text-black tracking-tight flex-1"
                    style={{ fontFamily: "'Outfit', 'SF Pro Display', sans-serif" }}
                  >
                    {faq.question}
                  </span>
                  <div className="flex-shrink-0 text-6xl font-black text-black/10 group-hover:text-black/20 transition-colors leading-none">
                    {openIndex === index ? '−' : '+'}
                  </div>
                </button>
                {openIndex === index && (
                  <div className="pb-8 pr-24">
                    <p className="text-lg sm:text-xl font-medium text-black/60 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom CTA - Minimal Design */}
          <div className="border-t border-black/10 pt-16">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="flex-1">
                <h3 
                  className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 text-black leading-tight tracking-tight"
                  style={{ fontFamily: "'Outfit', 'SF Pro Display', sans-serif" }}
                >
                  Still have questions?
                </h3>
                <p className="text-xl font-medium text-black/50">
                  We're here to help you get started
                </p>
              </div>
              <button className="relative px-10 py-5 bg-black text-primary font-black text-lg overflow-hidden group">
                <div className="absolute inset-0 bg-white transform translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                <span className="relative z-10 group-hover:text-black transition-colors">
                  CONTACT SUPPORT
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
