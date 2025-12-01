import { useState, useMemo } from 'react';
import { Search, Download, Trash2, Eye, Calendar, TrendingUp, FileText, CheckSquare, Square, Copy, Share2, Filter, RotateCcw } from 'lucide-react';
import { GeneratedArticle, ExportFormat } from '../types';
import { StorageService } from '../services/storageService';
import { ExportService } from '../services/exportService';

interface ArticleLibraryProps {
  articles: GeneratedArticle[];
  onArticleSelect: (article: GeneratedArticle) => void;
  onRefresh: () => void;
}

export default function ArticleLibrary({ articles, onArticleSelect, onRefresh }: ArticleLibraryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [selectedArticles, setSelectedArticles] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'score'>('date');
  const [isExporting, setIsExporting] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [minSeoScore, setMinSeoScore] = useState(0);
  const [minWordCount, setMinWordCount] = useState(0);

  const categories = useMemo(() => {
    const cats = new Set(articles.map(a => a.category));
    return ['all', ...Array.from(cats)];
  }, [articles]);

  const filteredArticles = useMemo(() => {
    let filtered = articles;

    if (searchTerm) {
      filtered = filtered.filter(a => 
        a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.metaDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (filterCategory !== 'all') {
      filtered = filtered.filter(a => a.category === filterCategory);
    }

    // Apply SEO score filter
    if (minSeoScore > 0) {
      filtered = filtered.filter(a => (a.seoScore || 0) >= minSeoScore);
    }

    // Apply word count filter
    if (minWordCount > 0) {
      filtered = filtered.filter(a => (a.wordCount || 0) >= minWordCount);
    }

    filtered.sort((a, b) => {
      if (sortBy === 'date') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'score') return (b.seoScore || 0) - (a.seoScore || 0);
      return 0;
    });

    return filtered;
  }, [articles, searchTerm, filterCategory, sortBy, minSeoScore, minWordCount]);

  const toggleSelection = (id: string) => {
    const newSelection = new Set(selectedArticles);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedArticles(newSelection);
  };

  const toggleSelectAll = () => {
    if (selectedArticles.size === filteredArticles.length) {
      setSelectedArticles(new Set());
    } else {
      setSelectedArticles(new Set(filteredArticles.map(a => a.id)));
    }
  };

  const handleBulkExport = (format: ExportFormat) => {
    const selected = articles.filter(a => selectedArticles.has(a.id));
    if (selected.length === 0) {
      alert('Please select articles to export');
      return;
    }
    ExportService.exportBulk(selected, format);
  };

  const handleExportEachFile = async (format: ExportFormat) => {
    const selected = articles.filter(a => selectedArticles.has(a.id));
    if (selected.length === 0) {
      alert('Please select articles to export');
      return;
    }

    setIsExporting(true);
    try {
      for (const article of selected) {
        // Small delay between downloads to prevent browser blocking
        await new Promise(resolve => setTimeout(resolve, 500));
        ExportService.exportArticle(article, format);
      }
      alert(`Successfully exported ${selected.length} articles as separate files!`);
    } catch (error) {
      console.error('Export error:', error);
      alert('Error exporting articles');
    } finally {
      setIsExporting(false);
    }
  };

  const handleBulkDelete = () => {
    if (selectedArticles.size === 0) return;
    if (!confirm(`Delete ${selectedArticles.size} articles?`)) return;
    
    selectedArticles.forEach(id => StorageService.deleteArticle(id));
    setSelectedArticles(new Set());
    onRefresh();
  };

  const handleDuplicateArticle = (article: GeneratedArticle) => {
    const newArticle: GeneratedArticle = {
      ...article,
      id: `article-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      title: `${article.title} (Copy)`,
      slug: `${article.slug}-copy`,
    };
    StorageService.saveArticle(newArticle);
    onRefresh();
    alert('Article duplicated successfully!');
  };

  const handleCopyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Copied to clipboard!');
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  const handleBulkUpdateCategory = (newCategory: string) => {
    if (selectedArticles.size === 0) return;
    if (!newCategory.trim()) return;

    selectedArticles.forEach(id => {
      const article = articles.find(a => a.id === id);
      if (article) {
        StorageService.updateArticle(id, { category: newCategory });
      }
    });
    setSelectedArticles(new Set());
    onRefresh();
    alert(`Updated ${selectedArticles.size} articles to category: ${newCategory}`);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setFilterCategory('all');
    setMinSeoScore(0);
    setMinWordCount(0);
  };

  const getStats = () => {
    return {
      total: articles.length,
      avgSeoScore: articles.length > 0 
        ? Math.round(articles.reduce((sum, a) => sum + (a.seoScore || 0), 0) / articles.length)
        : 0,
      totalWords: articles.reduce((sum, a) => sum + (a.wordCount || 0), 0),
      categories: new Set(articles.map(a => a.category)).size,
    };
  };

  const getSEOScoreColor = (score?: number) => {
    if (!score) return 'bg-gray-400';
    if (score >= 80) return 'bg-black';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const stats = getStats();

  return (
    <div className="bg-white relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 border-[60px] border-black/5 rounded-full -translate-y-48 translate-x-48 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 border-[40px] border-primary/5 rotate-45 -translate-x-32 translate-y-32 pointer-events-none" />
      
      <div className="relative z-10">
        {/* Ultra-Modern Header */}
        <div className="relative bg-black text-white p-8 sm:p-12">
          {/* Accent Lines */}
          <div className="absolute top-0 left-0 w-full h-2 bg-primary" />
          <div className="absolute bottom-0 right-0 w-2 h-full bg-primary" />
          
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8 mb-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-1 bg-primary" />
                <span className="text-xs font-black uppercase tracking-widest text-primary">Content Hub</span>
              </div>
              <h2 className="text-5xl sm:text-7xl font-black tracking-tighter mb-4 leading-none">
                Article<br/>
                <span className="text-primary">Archive</span>
              </h2>
              <p className="text-base font-medium text-gray-300 max-w-2xl">
                Your complete content repository with advanced filtering, bulk operations, and instant exports
              </p>
            </div>
            
            {/* Stats Grid - Modern Minimal Design */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              <div className="relative bg-white/10 backdrop-blur-sm p-5 min-w-[120px] group hover:bg-white/20 transition-all">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                <p className="text-xs font-black uppercase text-gray-400 mb-2">Total</p>
                <p className="text-4xl font-black text-white">{stats.total}</p>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-t-2 border-l-2 border-primary/30" />
              </div>
              <div className="relative bg-white/10 backdrop-blur-sm p-5 min-w-[120px] group hover:bg-white/20 transition-all">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                <p className="text-xs font-black uppercase text-gray-400 mb-2">Avg SEO</p>
                <p className="text-4xl font-black text-primary">{stats.avgSeoScore}</p>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-t-2 border-l-2 border-primary/30" />
              </div>
              <div className="relative bg-white/10 backdrop-blur-sm p-5 min-w-[120px] group hover:bg-white/20 transition-all">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                <p className="text-xs font-black uppercase text-gray-400 mb-2">Words</p>
                <p className="text-4xl font-black text-white">{(stats.totalWords / 1000).toFixed(1)}k</p>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-t-2 border-l-2 border-primary/30" />
              </div>
              <div className="relative bg-white/10 backdrop-blur-sm p-5 min-w-[120px] group hover:bg-white/20 transition-all">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                <p className="text-xs font-black uppercase text-gray-400 mb-2">Categories</p>
                <p className="text-4xl font-black text-white">{stats.categories}</p>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-t-2 border-l-2 border-primary/30" />
              </div>
            </div>
          </div>

        {/* Search and Filters - Modern Minimal */}
        <div className="space-y-4">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2 relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Search articles, categories, tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-5 py-4 border-2 border-white bg-white/50 backdrop-blur-sm font-bold text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:bg-white/70 transition-all"
              />
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-focus-within:w-full transition-all duration-300" />
            </div>
            
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-5 py-4 border-2 border-white bg-white/50 backdrop-blur-sm font-bold text-white focus:outline-none focus:border-primary focus:bg-white/70 transition-all"
            >
              {categories.map(cat => (
                <option key={cat} value={cat} className="text-black">{cat === 'all' ? 'All Categories' : cat}</option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-5 py-4 border-2 border-white bg-white/50 backdrop-blur-sm font-bold text-white focus:outline-none focus:border-primary focus:bg-white/70 transition-all"
            >
              <option value="date" className="text-black">Sort by Date</option>
              <option value="title" className="text-black">Sort by Title</option>
              <option value="score" className="text-black">Sort by SEO Score</option>
            </select>
          </div>

          {/* Advanced Filters - Minimal Design */}
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="relative px-5 py-3 border-2 border-white bg-white/50 backdrop-blur-sm hover:bg-white/70 transition-all font-bold flex items-center gap-2 text-white overflow-hidden group"
            >
              <div className="absolute bottom-0 left-0 w-full h-0 bg-primary group-hover:h-full transition-all duration-300" />
              <Filter className="w-4 h-4 relative z-10 group-hover:text-black transition-colors" />
              <span className="relative z-10 group-hover:text-black transition-colors">{showFilters ? 'Hide' : 'Show'} Filters</span>
            </button>
            {(minSeoScore > 0 || minWordCount > 0) && (
              <button
                onClick={handleClearFilters}
                className="relative px-5 py-3 border-2 border-white bg-white/50 backdrop-blur-sm hover:bg-white/70 transition-all font-bold flex items-center gap-2 text-white overflow-hidden group"
              >
                <div className="absolute bottom-0 left-0 w-full h-0 bg-primary group-hover:h-full transition-all duration-300" />
                <RotateCcw className="w-4 h-4 relative z-10 group-hover:text-black transition-colors" />
                <span className="relative z-10 group-hover:text-black transition-colors">Clear Filters</span>
              </button>
            )}
            <div className="flex gap-2 ml-auto">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-5 py-3 border-2 font-bold transition-all ${viewMode === 'grid' ? 'bg-primary text-black border-primary' : 'bg-white/50 text-white border-white hover:bg-white/70'}`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-5 py-3 border-2 font-bold transition-all ${viewMode === 'list' ? 'bg-primary text-black border-primary' : 'bg-white/50 text-white border-white hover:bg-white/70'}`}
              >
                List
              </button>
            </div>
          </div>

          {/* Advanced Filter Options */}
          {showFilters && (
            <div className="bg-white border-3 border-black p-4 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase mb-2">Min SEO Score: {minSeoScore}</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={minSeoScore}
                    onChange={(e) => setMinSeoScore(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase mb-2">Min Word Count: {minWordCount}</label>
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    step="500"
                    value={minWordCount}
                    onChange={(e) => setMinWordCount(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {selectedArticles.size > 0 && (
          <div className="space-y-4">
            <div className="bg-primary/20 border-3 border-black p-4">
              <p className="font-black text-lg mb-4">{selectedArticles.size} articles selected</p>
              
              <div className="space-y-3">
                <div>
                  <p className="font-black text-sm uppercase mb-2">Export Each as Separate File:</p>
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => handleExportEachFile('html')}
                      disabled={isExporting}
                      className="px-4 py-2 border-3 border-black bg-white hover:bg-primary transition-colors font-bold flex items-center gap-2 disabled:opacity-50"
                    >
                      <Download className="w-4 h-4" />
                      HTML Files
                    </button>
                    <button
                      onClick={() => handleExportEachFile('markdown')}
                      disabled={isExporting}
                      className="px-4 py-2 border-3 border-black bg-white hover:bg-primary transition-colors font-bold flex items-center gap-2 disabled:opacity-50"
                    >
                      <Download className="w-4 h-4" />
                      Markdown Files
                    </button>
                    <button
                      onClick={() => handleExportEachFile('json')}
                      disabled={isExporting}
                      className="px-4 py-2 border-3 border-black bg-white hover:bg-primary transition-colors font-bold flex items-center gap-2 disabled:opacity-50"
                    >
                      <Download className="w-4 h-4" />
                      JSON Files
                    </button>
                    <button
                      onClick={() => handleExportEachFile('wordpress')}
                      disabled={isExporting}
                      className="px-4 py-2 border-3 border-black bg-white hover:bg-primary transition-colors font-bold flex items-center gap-2 disabled:opacity-50"
                    >
                      <Download className="w-4 h-4" />
                      WordPress Files
                    </button>
                  </div>
                </div>

                <div>
                  <p className="font-black text-sm uppercase mb-2">Bulk Export (Single File):</p>
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => handleBulkExport('html')}
                      className="px-4 py-2 border-3 border-black bg-white hover:bg-primary transition-colors font-bold flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Bulk HTML
                    </button>
                    <button
                      onClick={() => handleBulkExport('markdown')}
                      className="px-4 py-2 border-3 border-black bg-white hover:bg-primary transition-colors font-bold flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Bulk MD
                    </button>
                    <button
                      onClick={() => handleBulkExport('json')}
                      className="px-4 py-2 border-3 border-black bg-white hover:bg-primary transition-colors font-bold flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Bulk JSON
                    </button>
                  </div>
                </div>

                <div>
                  <p className="font-black text-sm uppercase mb-2">Bulk Actions:</p>
                  <div className="flex gap-2 flex-wrap">
                    <input
                      type="text"
                      placeholder="New category..."
                      id="bulkCategory"
                      className="px-3 py-2 border-3 border-black font-bold text-sm"
                    />
                    <button
                      onClick={() => {
                        const input = document.getElementById('bulkCategory') as HTMLInputElement;
                        if (input) handleBulkUpdateCategory(input.value);
                      }}
                      className="px-4 py-2 border-3 border-black bg-white hover:bg-primary transition-colors font-bold flex items-center gap-2"
                    >
                      Update Category
                    </button>
                  </div>
                </div>

                <div>
                  <button
                    onClick={handleBulkDelete}
                    className="px-4 py-2 border-3 border-black bg-red-500 text-white hover:bg-red-600 transition-colors font-bold flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete {selectedArticles.size} Articles
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-6">
        {/* Select All / Deselect All */}
        {filteredArticles.length > 0 && (
          <div className="mb-6 flex items-center gap-3 p-4 bg-gray-50 border-3 border-black">
            <button
              onClick={toggleSelectAll}
              className="flex items-center gap-2 px-4 py-2 border-3 border-black bg-white hover:bg-primary transition-colors font-black"
            >
              {selectedArticles.size === filteredArticles.length ? (
                <>
                  <CheckSquare className="w-5 h-5" />
                  Deselect All
                </>
              ) : (
                <>
                  <Square className="w-5 h-5" />
                  Select All ({filteredArticles.length})
                </>
              )}
            </button>
            {selectedArticles.size > 0 && (
              <span className="font-black text-lg">
                {selectedArticles.size} / {filteredArticles.length} selected
              </span>
            )}
          </div>
        )}

        {filteredArticles.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p className="text-xl font-black text-gray-400">No articles found</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredArticles.map(article => (
              <div
                key={article.id}
                className={`border-4 border-black p-6 transition-all hover:shadow-brutal ${
                  selectedArticles.has(article.id) ? 'bg-primary/20' : 'bg-white'
                }`}
              >
                <div className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    checked={selectedArticles.has(article.id)}
                    onChange={() => toggleSelection(article.id)}
                    className="mt-1 w-5 h-5 cursor-pointer"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-black mb-2">{article.title}</h3>
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="px-3 py-1 bg-black text-primary border-2 border-black text-xs font-black uppercase">
                            {article.category}
                          </span>
                          {article.seoScore !== undefined && (
                            <span className={`px-3 py-1 ${getSEOScoreColor(article.seoScore)} text-white border-2 border-black text-xs font-black uppercase flex items-center gap-1`}>
                              <TrendingUp className="w-3 h-3" />
                              SEO: {article.seoScore}
                            </span>
                          )}
                          {article.wordCount && (
                            <span className="text-xs font-bold text-gray-600">
                              {article.wordCount} words • {article.readingTime} min read
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <button
                        onClick={() => onArticleSelect(article)}
                        className="px-4 py-2 border-3 border-black bg-white hover:bg-primary transition-colors font-black text-sm uppercase flex items-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                    </div>

                    <p className="text-sm text-gray-700 mb-3">{article.metaDescription}</p>

                    <div className="flex items-center gap-2 flex-wrap">
                      {article.tags.slice(0, 5).map((tag, i) => (
                        <span key={i} className="px-2 py-1 bg-white border-2 border-black text-xs font-bold">
                          #{tag}
                        </span>
                      ))}
                      {article.tags.length > 5 && (
                        <span className="text-xs font-bold text-gray-500">
                          +{article.tags.length - 5} more
                        </span>
                      )}
                    </div>

                    <div className="mt-3 flex items-center gap-2 text-xs font-bold text-gray-500 mb-4">
                      <Calendar className="w-4 h-4" />
                      {new Date(article.createdAt).toLocaleDateString()}
                    </div>

                    {/* Individual Article Actions */}
                    <div className="flex gap-2 flex-wrap pt-4 border-t-2 border-gray-300">
                      <button
                        onClick={() => ExportService.exportArticle(article, 'html')}
                        className="px-3 py-1 border-2 border-black bg-white hover:bg-primary transition-colors font-bold text-xs flex items-center gap-1"
                        title="Export as HTML"
                      >
                        <Download className="w-3 h-3" />
                        HTML
                      </button>
                      <button
                        onClick={() => ExportService.exportArticle(article, 'markdown')}
                        className="px-3 py-1 border-2 border-black bg-white hover:bg-primary transition-colors font-bold text-xs flex items-center gap-1"
                        title="Export as Markdown"
                      >
                        <Download className="w-3 h-3" />
                        MD
                      </button>
                      <button
                        onClick={() => ExportService.exportArticle(article, 'json')}
                        className="px-3 py-1 border-2 border-black bg-white hover:bg-primary transition-colors font-bold text-xs flex items-center gap-1"
                        title="Export as JSON"
                      >
                        <Download className="w-3 h-3" />
                        JSON
                      </button>
                      <button
                        onClick={() => handleCopyToClipboard(article.title)}
                        className="px-3 py-1 border-2 border-black bg-white hover:bg-primary transition-colors font-bold text-xs flex items-center gap-1"
                        title="Copy title"
                      >
                        <Copy className="w-3 h-3" />
                        Title
                      </button>
                      <button
                        onClick={() => handleCopyToClipboard(article.htmlArticle)}
                        className="px-3 py-1 border-2 border-black bg-white hover:bg-primary transition-colors font-bold text-xs flex items-center gap-1"
                        title="Copy article content"
                      >
                        <Copy className="w-3 h-3" />
                        Content
                      </button>
                      <button
                        onClick={() => handleDuplicateArticle(article)}
                        className="px-3 py-1 border-2 border-black bg-white hover:bg-primary transition-colors font-bold text-xs flex items-center gap-1"
                        title="Duplicate article"
                      >
                        <Share2 className="w-3 h-3" />
                        Duplicate
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('Delete this article?')) {
                            StorageService.deleteArticle(article.id);
                            onRefresh();
                          }
                        }}
                        className="px-3 py-1 border-2 border-red-500 bg-red-50 hover:bg-red-500 hover:text-white transition-colors font-bold text-xs flex items-center gap-1 ml-auto"
                        title="Delete article"
                      >
                        <Trash2 className="w-3 h-3" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
