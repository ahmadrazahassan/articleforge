import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

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
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <div className="inline-block mb-4">
            <div className="px-4 py-2 bg-black text-primary font-bold text-xs tracking-widest border-3 border-black">
              QUESTIONS & ANSWERS
            </div>
          </div>
          <h2 className="text-5xl sm:text-6xl font-black mb-4 leading-tight">
            Frequently Asked <span className="italic">Questions</span>
          </h2>
          <p className="text-xl font-medium text-gray-700">
            Everything you need to know about ArticleForge AI
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border-4 border-black transition-all ${
                openIndex === index ? 'bg-primary shadow-brutal-lg' : 'bg-white shadow-brutal'
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-start justify-between text-left group"
              >
                <span className="font-black text-lg pr-6 leading-tight">{faq.question}</span>
                <div className={`flex-shrink-0 w-8 h-8 border-3 border-black flex items-center justify-center transition-all ${
                  openIndex === index ? 'bg-black text-primary rotate-90' : 'bg-white text-black'
                }`}>
                  {openIndex === index ? (
                    <Minus className="w-5 h-5" strokeWidth={3} />
                  ) : (
                    <Plus className="w-5 h-5" strokeWidth={3} />
                  )}
                </div>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6 pt-2">
                  <div className="border-t-3 border-black pt-4">
                    <p className="font-medium text-gray-800 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-black border-4 border-black p-8 shadow-brutal-lg">
            <p className="text-primary font-black text-xl mb-4">Still have questions?</p>
            <p className="text-primary font-medium mb-6">We're here to help you get started</p>
            <button className="px-8 py-4 bg-primary text-black border-4 border-black font-black text-lg shadow-brutal-sm hover-lift">
              CONTACT SUPPORT
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
