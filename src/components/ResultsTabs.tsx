import { useState } from 'react';
import { GeneratedArticle, CopyState } from '../types';
import { Copy, Check, FileText, Tag, Code2, Search, Link2, Hash, BookOpen, FolderOpen } from 'lucide-react';

interface ResultsTabsProps {
  article: GeneratedArticle;
}

export default function ResultsTabs({ article }: ResultsTabsProps) {
  const [activeTab, setActiveTab] = useState<'html' | 'seo'>('html');
  const [copyState, setCopyState] = useState<CopyState>({
    html: false,
    seo: false,
    title: false,
    metaDescription: false,
  });

  const copyToClipboard = async (text: string, field: keyof CopyState) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyState({ ...copyState, [field]: true });
      setTimeout(() => {
        setCopyState((prev) => ({ ...prev, [field]: false }));
      }, 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const formatSEODetails = () => {
    return `Title: ${article.title}

Category: ${article.category}

Tags: ${article.tags.join(', ')}

Meta Description: ${article.metaDescription}

Slug: ${article.slug}

Focus Keywords: ${article.focusKeywords.join(', ')}`;
  };

  return (
    <div className="relative bg-white border-4 border-black shadow-brutal-lg overflow-hidden">
      {/* Decorative Element */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-primary opacity-10 -rotate-12 border-r-4 border-b-4 border-black" />
      
      {/* Header Section */}
      <div className="relative border-b-4 border-black bg-white p-6 sm:p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-black text-primary border-4 border-black flex items-center justify-center -rotate-3">
            <BookOpen className="w-7 h-7" strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="text-3xl sm:text-4xl font-black tracking-tight">Generated Results</h3>
            <p className="text-sm font-bold text-gray-600 uppercase tracking-wide">Your AI-Generated Content</p>
          </div>
        </div>
        
        {/* Modern Tab Switcher */}
        <div className="flex gap-3">
          <button
            onClick={() => setActiveTab('html')}
            className={`relative flex items-center gap-3 px-8 py-4 font-black text-base uppercase tracking-wide transition-all group ${
              activeTab === 'html'
                ? 'bg-black text-primary border-4 border-black shadow-brutal'
                : 'bg-white border-4 border-black hover:shadow-brutal-sm hover:translate-x-[-2px] hover:translate-y-[-2px]'
            }`}
          >
            <Code2 className="w-6 h-6" strokeWidth={2.5} />
            <span>HTML Article</span>
            {activeTab === 'html' && (
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-primary border-2 border-black rotate-45" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('seo')}
            className={`relative flex items-center gap-3 px-8 py-4 font-black text-base uppercase tracking-wide transition-all group ${
              activeTab === 'seo'
                ? 'bg-black text-primary border-4 border-black shadow-brutal'
                : 'bg-white border-4 border-black hover:shadow-brutal-sm hover:translate-x-[-2px] hover:translate-y-[-2px]'
            }`}
          >
            <Search className="w-6 h-6" strokeWidth={2.5} />
            <span>SEO Metadata</span>
            {activeTab === 'seo' && (
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-primary border-2 border-black rotate-45" />
            )}
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6 sm:p-8">
        {activeTab === 'html' ? (
          <div className="space-y-6">
            {/* Title Preview Card */}
            <div className="bg-primary/20 border-4 border-black p-6 shadow-brutal">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-black text-primary border-3 border-black flex items-center justify-center rotate-2 flex-shrink-0">
                  <FileText className="w-6 h-6" strokeWidth={2.5} />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-black mb-2 uppercase tracking-wider text-gray-700">Article Title</p>
                  <h4 className="text-xl sm:text-2xl font-black leading-tight">{article.title}</h4>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between p-5 bg-white border-4 border-black">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary border border-black"></div>
                <p className="text-sm font-black uppercase tracking-wide">Complete HTML Document Ready</p>
              </div>
              <button
                onClick={() => copyToClipboard(article.htmlArticle, 'html')}
                className="px-8 py-4 bg-black text-primary border-4 border-black font-black text-base shadow-brutal hover:bg-primary hover:text-black hover-lift flex items-center gap-3 uppercase tracking-wide"
              >
                {copyState.html ? (
                  <>
                    <Check className="w-6 h-6" strokeWidth={3} />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-6 h-6" strokeWidth={3} />
                    <span>Copy HTML</span>
                  </>
                )}
              </button>
            </div>

            {/* Code Preview */}
            <div className="relative">
              <div className="absolute top-4 right-4 z-10 px-3 py-2 bg-black text-primary border-2 border-black text-xs font-black uppercase tracking-wider">
                HTML5
              </div>
              <textarea
                readOnly
                value={article.htmlArticle}
                className="w-full h-[500px] px-6 py-6 border-4 border-black font-mono text-sm resize-none focus:outline-none bg-white focus:shadow-brutal transition-shadow leading-relaxed"
              />
            </div>
            
            {/* Info Footer */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-white border-3 border-black p-4">
                <p className="text-xs font-black uppercase tracking-wider text-gray-600 mb-2">Format</p>
                <p className="text-base font-black">HTML5</p>
              </div>
              <div className="bg-white border-3 border-black p-4">
                <p className="text-xs font-black uppercase tracking-wider text-gray-600 mb-2">Structure</p>
                <p className="text-base font-black">Semantic</p>
              </div>
              <div className="bg-white border-3 border-black p-4">
                <p className="text-xs font-black uppercase tracking-wider text-gray-600 mb-2">SEO Ready</p>
                <p className="text-base font-black">Yes</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between p-5 bg-primary/20 border-4 border-black shadow-brutal">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-black border border-black\"></div>
                <p className="text-sm font-black uppercase tracking-wide">Complete SEO Metadata Package</p>
              </div>
              <button
                onClick={() => copyToClipboard(formatSEODetails(), 'seo')}
                className="px-8 py-4 bg-black text-primary border-4 border-black font-black text-base shadow-brutal hover:bg-primary hover:text-black hover-lift flex items-center gap-3 uppercase tracking-wide"
              >
                {copyState.seo ? (
                  <>
                    <Check className="w-6 h-6" strokeWidth={3} />
                    <span>All Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-6 h-6" strokeWidth={3} />
                    <span>Copy All SEO</span>
                  </>
                )}
              </button>
            </div>

            {/* Grid Layout for SEO Fields */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="md:col-span-2 bg-white border-4 border-black p-6 shadow-brutal hover:shadow-brutal-lg transition-shadow">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 bg-primary border-3 border-black flex items-center justify-center -rotate-2 flex-shrink-0">
                    <FileText className="w-5 h-5" strokeWidth={2.5} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-xs font-black uppercase tracking-wider">SEO Title</label>
                      <button
                        onClick={() => copyToClipboard(article.title, 'title')}
                        className="px-4 py-2 border-3 border-black bg-white hover:bg-primary transition-colors flex items-center gap-2 text-xs font-black uppercase shadow-brutal-sm"
                      >
                        {copyState.title ? (
                          <>
                            <Check className="w-4 h-4" strokeWidth={3} />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" strokeWidth={3} />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-lg font-black leading-tight">{article.title}</p>
                  </div>
                </div>
              </div>

              {/* Category */}
              <div className="bg-white border-4 border-black p-6 shadow-brutal-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-black text-primary border-2 border-black flex items-center justify-center rotate-3">
                    <FolderOpen className="w-4 h-4" strokeWidth={2.5} />
                  </div>
                  <label className="text-xs font-black uppercase tracking-wider">Category</label>
                </div>
                <p className="text-lg font-black">{article.category}</p>
              </div>

              {/* Slug */}
              <div className="bg-white border-4 border-black p-6 shadow-brutal-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-primary border-2 border-black flex items-center justify-center -rotate-2">
                    <Link2 className="w-4 h-4" strokeWidth={2.5} />
                  </div>
                  <label className="text-xs font-black uppercase tracking-wider">URL Slug</label>
                </div>
                <p className="text-base font-mono font-black break-all">{article.slug}</p>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white border-4 border-black p-6 shadow-brutal">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-primary border-3 border-black flex items-center justify-center rotate-2">
                  <Hash className="w-5 h-5" strokeWidth={2.5} />
                </div>
                <label className="text-sm font-black uppercase tracking-wider">Article Tags</label>
              </div>
              <div className="flex flex-wrap gap-3">
                {article.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-primary border-3 border-black text-sm font-black uppercase tracking-wide hover:shadow-brutal-sm transition-shadow"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Meta Description */}
            <div className="bg-white border-4 border-black p-6 shadow-brutal">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-black text-primary border-3 border-black flex items-center justify-center rotate-3 flex-shrink-0">
                  <Search className="w-5 h-5" strokeWidth={2.5} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-xs font-black uppercase tracking-wider">Meta Description</label>
                    <button
                      onClick={() => copyToClipboard(article.metaDescription, 'metaDescription')}
                      className="px-4 py-2 border-3 border-black bg-white hover:bg-primary transition-colors flex items-center gap-2 text-xs font-black uppercase shadow-brutal-sm"
                    >
                      {copyState.metaDescription ? (
                        <>
                          <Check className="w-4 h-4" strokeWidth={3} />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" strokeWidth={3} />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-base font-medium leading-relaxed text-gray-800">{article.metaDescription}</p>
                </div>
              </div>
            </div>

            {/* Focus Keywords */}
            <div className="bg-black text-primary border-4 border-black p-6 shadow-brutal-lg">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-primary text-black border-3 border-black flex items-center justify-center -rotate-3">
                  <Tag className="w-5 h-5" strokeWidth={2.5} />
                </div>
                <label className="text-sm font-black uppercase tracking-wider">Focus Keywords</label>
              </div>
              <div className="flex flex-wrap gap-3">
                {article.focusKeywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-primary text-black border-3 border-black text-sm font-black uppercase tracking-wide shadow-brutal-sm"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
