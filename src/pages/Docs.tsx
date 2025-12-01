import { Book, Code, Rocket, Settings, FileText, Search, ChevronRight, ExternalLink } from 'lucide-react';
import { useState } from 'react';

interface DocSection {
  id: string;
  title: string;
  icon: any;
  items: { title: string; description: string }[];
}

export default function Docs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('getting-started');

  const docSections: DocSection[] = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: Rocket,
      items: [
        { title: 'Quick Start Guide', description: 'Get up and running in 5 minutes' },
        { title: 'Creating Your First Article', description: 'Step-by-step tutorial' },
        { title: 'Understanding Article Types', description: 'Choose the right format' },
        { title: 'Best Practices', description: 'Tips for optimal results' }
      ]
    },
    {
      id: 'features',
      title: 'Features',
      icon: Settings,
      items: [
        { title: 'Article Generation', description: 'Core content creation features' },
        { title: 'SEO Optimization', description: 'Meta tags and keywords' },
        { title: 'Multi-Language Support', description: 'Generate in 10+ languages' },
        { title: 'Export Formats', description: 'HTML, Markdown, and more' }
      ]
    },
    {
      id: 'api',
      title: 'API Reference',
      icon: Code,
      items: [
        { title: 'Authentication', description: 'API keys and security' },
        { title: 'Generate Endpoint', description: 'Create articles programmatically' },
        { title: 'Rate Limits', description: 'Understanding request quotas' },
        { title: 'Error Handling', description: 'Common errors and solutions' }
      ]
    },
    {
      id: 'guides',
      title: 'Guides & Tutorials',
      icon: Book,
      items: [
        { title: 'SEO Checklist', description: 'Optimize your content for search' },
        { title: 'Content Strategy', description: 'Planning your content calendar' },
        { title: 'Integration Guide', description: 'Connect with your CMS' },
        { title: 'Advanced Features', description: 'Power user techniques' }
      ]
    }
  ];

  const quickLinks = [
    { title: 'API Documentation', icon: Code, href: '#' },
    { title: 'Video Tutorials', icon: FileText, href: '#' },
    { title: 'Community Forum', icon: ExternalLink, href: '#' },
    { title: 'GitHub Examples', icon: ExternalLink, href: '#' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b-4 border-black">
        <div className="max-w-7xl mx-auto">
          <div className="inline-block px-4 py-2 bg-black text-primary font-black text-xs tracking-widest mb-8 border-3 border-black">
            DOCUMENTATION
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] mb-8">
            Learn How to
            <span className="block text-6xl sm:text-7xl lg:text-8xl italic mt-4">Master ArticleForge</span>
          </h1>
          
          <p className="text-xl sm:text-2xl font-medium text-gray-700 max-w-3xl mb-12">
            Everything you need to know about using ArticleForge AI Studio, from basics to advanced features.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl">
            <div className="relative">
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-500" strokeWidth={2.5} />
              <input
                type="text"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-16 pr-6 py-5 border-4 border-black font-bold text-lg focus:outline-none focus:ring-4 focus:ring-primary shadow-brutal-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 border-b-4 border-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <a
                  key={index}
                  href={link.href}
                  className="border-4 border-black bg-white p-6 shadow-brutal-sm hover-lift group text-center"
                >
                  <Icon className="w-8 h-8 mx-auto mb-3 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
                  <p className="font-black text-sm">{link.title}</p>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Documentation */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Sidebar Navigation */}
            <aside className="lg:col-span-1">
              <div className="lg:sticky lg:top-8 space-y-3">
                <h2 className="text-sm font-black uppercase tracking-widest mb-4">Contents</h2>
                {docSections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full text-left px-4 py-3 border-3 border-black font-bold flex items-center gap-3 transition-all ${
                        activeSection === section.id
                          ? 'bg-primary'
                          : 'bg-white hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" strokeWidth={2.5} />
                      {section.title}
                    </button>
                  );
                })}
              </div>
            </aside>

            {/* Content Area */}
            <div className="lg:col-span-3">
              {docSections.map((section) => {
                const Icon = section.icon;
                return (
                  activeSection === section.id && (
                    <div key={section.id}>
                      <div className="flex items-center gap-4 mb-12">
                        <div className="w-16 h-16 border-4 border-black bg-primary flex items-center justify-center rotate-3">
                          <Icon className="w-8 h-8" strokeWidth={2.5} />
                        </div>
                        <h2 className="text-4xl font-black">{section.title}</h2>
                      </div>

                      <div className="space-y-6">
                        {section.items.map((item, idx) => (
                          <article
                            key={idx}
                            className="border-4 border-black bg-white p-8 shadow-brutal-sm hover-lift group cursor-pointer"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <h3 className="text-2xl font-black mb-2 group-hover:translate-x-2 transition-transform">
                                  {item.title}
                                </h3>
                                <p className="text-lg font-medium text-gray-700">
                                  {item.description}
                                </p>
                              </div>
                              <ChevronRight className="w-6 h-6 flex-shrink-0 group-hover:translate-x-2 transition-transform" strokeWidth={2.5} />
                            </div>
                          </article>
                        ))}
                      </div>

                      {/* Code Example */}
                      {section.id === 'api' && (
                        <div className="mt-12 border-4 border-black bg-black text-primary p-8 shadow-brutal">
                          <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
                            <Code className="w-6 h-6" strokeWidth={2.5} />
                            Quick API Example
                          </h3>
                          <pre className="font-mono text-sm overflow-x-auto">
{`// Initialize ArticleForge API
const articleForge = new ArticleForge({
  apiKey: 'your-api-key'
});

// Generate an article
const article = await articleForge.generate({
  websiteName: 'Tech Blog',
  websiteDescription: 'Latest tech news',
  articleType: 'guide',
  articleLength: 'medium'
});

console.log(article.html);`}
                          </pre>
                        </div>
                      )}

                      {/* Getting Started Example */}
                      {section.id === 'getting-started' && (
                        <div className="mt-12 border-4 border-black bg-primary p-8">
                          <h3 className="text-2xl font-black mb-6">Need Help Getting Started?</h3>
                          <p className="text-lg font-medium mb-6">
                            Watch our 5-minute video tutorial or join our live onboarding sessions.
                          </p>
                          <div className="flex flex-wrap gap-4">
                            <button className="px-6 py-3 bg-black text-primary border-3 border-black font-black hover:bg-white hover:border-white transition-colors">
                              Watch Tutorial
                            </button>
                            <button className="px-6 py-3 bg-white border-3 border-black font-black hover:bg-black hover:text-primary transition-colors">
                              Join Live Session
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t-4 border-black bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-black mb-6">Still Need Help?</h2>
          <p className="text-xl font-medium text-gray-700 mb-12">
            Our support team is here to help you succeed
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border-4 border-black bg-white p-6">
              <h3 className="text-xl font-black mb-2">Live Chat</h3>
              <p className="font-medium text-gray-700 mb-4">Get instant answers</p>
              <button className="px-6 py-3 bg-primary border-3 border-black font-black w-full hover-lift">
                Start Chat
              </button>
            </div>

            <div className="border-4 border-black bg-white p-6">
              <h3 className="text-xl font-black mb-2">Email Support</h3>
              <p className="font-medium text-gray-700 mb-4">Response in 24h</p>
              <button className="px-6 py-3 bg-black text-primary border-3 border-black font-black w-full hover-lift">
                Send Email
              </button>
            </div>

            <div className="border-4 border-black bg-white p-6">
              <h3 className="text-xl font-black mb-2">Community</h3>
              <p className="font-medium text-gray-700 mb-4">Join discussions</p>
              <button className="px-6 py-3 bg-white border-3 border-black font-black w-full hover:bg-primary transition-colors">
                Visit Forum
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
