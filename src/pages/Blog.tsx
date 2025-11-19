import { Calendar, Clock, ArrowRight, TrendingUp, Search } from 'lucide-react';
import { useState } from 'react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  featured?: boolean;
}

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'tutorials', 'seo', 'ai', 'updates'];

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: 'Mastering SEO-Optimized Content with AI',
      excerpt: 'Learn how to leverage AI tools to create content that ranks higher and drives more organic traffic to your website.',
      category: 'seo',
      date: 'Nov 15, 2024',
      readTime: '8 min',
      featured: true
    },
    {
      id: 2,
      title: 'The Future of Content Creation: AI & Human Creativity',
      excerpt: 'Exploring how AI augments human creativity rather than replacing it, and why this matters for content creators.',
      category: 'ai',
      date: 'Nov 12, 2024',
      readTime: '6 min',
      featured: true
    },
    {
      id: 3,
      title: 'Complete Guide to Article Metadata',
      excerpt: 'Everything you need to know about meta titles, descriptions, and structured data for better SEO performance.',
      category: 'tutorials',
      date: 'Nov 8, 2024',
      readTime: '10 min'
    },
    {
      id: 4,
      title: 'New Feature: Multi-Language Support',
      excerpt: 'Generate articles in 10+ languages with the same quality and SEO optimization. Available now for all users.',
      category: 'updates',
      date: 'Nov 5, 2024',
      readTime: '4 min'
    },
    {
      id: 5,
      title: '10 SEO Mistakes That Kill Your Rankings',
      excerpt: 'Common SEO errors that prevent your content from ranking, and how to fix them quickly.',
      category: 'seo',
      date: 'Oct 28, 2024',
      readTime: '7 min'
    },
    {
      id: 6,
      title: 'Building Your Content Strategy with AI',
      excerpt: 'A step-by-step guide to incorporating AI tools into your content marketing workflow.',
      category: 'tutorials',
      date: 'Oct 22, 2024',
      readTime: '12 min'
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b-4 border-black">
        <div className="max-w-7xl mx-auto">
          <div className="inline-block px-4 py-2 bg-black text-primary font-black text-xs tracking-widest mb-8 border-3 border-black">
            BLOG
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] mb-8">
            Articles &
            <span className="block text-6xl sm:text-7xl lg:text-8xl italic mt-4">Insights</span>
          </h1>
          
          <p className="text-xl sm:text-2xl font-medium text-gray-700 max-w-3xl mb-12">
            Tips, tutorials, and news about AI-powered content creation, SEO, and digital marketing.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-500" strokeWidth={2.5} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-5 border-4 border-black font-bold text-lg focus:outline-none focus:ring-4 focus:ring-primary"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 border-b-4 border-black bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 font-black text-sm uppercase tracking-wider border-3 border-black transition-all ${
                  selectedCategory === category
                    ? 'bg-black text-primary'
                    : 'bg-white hover:bg-primary'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Featured Posts */}
          {selectedCategory === 'all' && searchQuery === '' && (
            <div className="mb-20">
              <div className="flex items-center gap-3 mb-8">
                <TrendingUp className="w-8 h-8" strokeWidth={2.5} />
                <h2 className="text-3xl font-black">Featured</h2>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-8">
                {blogPosts.filter(post => post.featured).map((post) => (
                  <article
                    key={post.id}
                    className="border-4 border-black bg-white p-8 shadow-brutal hover-lift group cursor-pointer"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-primary border-2 border-black text-xs font-black uppercase tracking-wider">
                        {post.category}
                      </span>
                      <div className="flex items-center gap-4 text-sm font-bold text-gray-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" strokeWidth={2.5} />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" strokeWidth={2.5} />
                          {post.readTime}
                        </span>
                      </div>
                    </div>
                    
                    <h3 className="text-3xl font-black mb-4 group-hover:translate-x-2 transition-transform">
                      {post.title}
                    </h3>
                    
                    <p className="text-lg font-medium text-gray-700 mb-6 leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center gap-2 font-black text-base group-hover:translate-x-2 transition-transform">
                      Read More
                      <ArrowRight className="w-5 h-5" strokeWidth={3} />
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* All Posts */}
          <div className="mb-8">
            <h2 className="text-3xl font-black mb-8">
              {selectedCategory === 'all' ? 'All Articles' : `${selectedCategory.toUpperCase()} Articles`}
            </h2>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-2xl font-bold text-gray-500">No articles found</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.filter(post => !post.featured || selectedCategory !== 'all' || searchQuery !== '').map((post) => (
                <article
                  key={post.id}
                  className="border-4 border-black bg-white p-6 shadow-brutal-sm hover-lift group cursor-pointer"
                >
                  <span className="inline-block px-3 py-1 bg-black text-primary border-2 border-black text-xs font-black uppercase tracking-wider mb-4">
                    {post.category}
                  </span>
                  
                  <h3 className="text-2xl font-black mb-3 leading-tight group-hover:translate-x-1 transition-transform">
                    {post.title}
                  </h3>
                  
                  <p className="text-base font-medium text-gray-700 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm font-bold text-gray-600 mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" strokeWidth={2.5} />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" strokeWidth={2.5} />
                      {post.readTime}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 font-black text-sm group-hover:translate-x-1 transition-transform">
                    Read More
                    <ArrowRight className="w-4 h-4" strokeWidth={3} />
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
