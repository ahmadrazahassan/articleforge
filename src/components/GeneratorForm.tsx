import { useState } from 'react';
import { Loader2, RotateCcw, PenTool, FileText, AlignLeft, MessageSquare, Globe, Building2, Layers, Target } from 'lucide-react';
import { GeneratorFormData, ArticleType, ArticleLength, ToneOfVoice, Language } from '../types';

interface GeneratorFormProps {
  onGenerate: (formData: GeneratorFormData) => Promise<void>;
  isLoading: boolean;
}

export default function GeneratorForm({ onGenerate, isLoading }: GeneratorFormProps) {
  const [formData, setFormData] = useState<GeneratorFormData>({
    websiteName: '',
    websiteDescription: '',
    articleType: 'guide',
    articleLength: 'medium',
    toneOfVoice: 'professional',
    language: 'english',
    customKeywords: [],
    targetAudience: '',
    includeImages: false,
    includeTables: true,
  });
  const [keywordInput, setKeywordInput] = useState('');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.websiteName.trim()) {
      newErrors.websiteName = 'Website name is required';
    }

    if (!formData.websiteDescription.trim()) {
      newErrors.websiteDescription = 'Website description is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      await onGenerate(formData);
    }
  };

  const handleReset = () => {
    setFormData({
      websiteName: '',
      websiteDescription: '',
      articleType: 'guide',
      articleLength: 'medium',
      toneOfVoice: 'professional',
      language: 'english',
      customKeywords: [],
      targetAudience: '',
      includeImages: false,
      includeTables: true,
    });
    setErrors({});
    setKeywordInput('');
  };

  const addKeyword = () => {
    if (keywordInput.trim() && !formData.customKeywords?.includes(keywordInput.trim())) {
      setFormData({
        ...formData,
        customKeywords: [...(formData.customKeywords || []), keywordInput.trim()]
      });
      setKeywordInput('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setFormData({
      ...formData,
      customKeywords: formData.customKeywords?.filter(k => k !== keyword) || []
    });
  };

  return (
    <div className="relative overflow-hidden">
      {/* Rounded Background Container */}
      <div className="bg-primary rounded-[60px] relative overflow-hidden">
        {/* Subtle Grid Background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </div>
      
        <div className="relative z-10">
        {/* Ultra-Modern Header */}
        <div className="relative bg-black text-white p-8 sm:p-12 overflow-hidden">
          {/* Accent Shapes */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary opacity-20 clip-triangle" />
          <div className="absolute bottom-0 left-20 w-2 h-full bg-primary/30" />
          
          <div className="relative flex items-start gap-6 mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-primary flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                <PenTool className="w-10 h-10 relative z-10 group-hover:text-black transition-colors" strokeWidth={2} />
              </div>
              <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-primary border-4 border-black" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-1 w-12 bg-primary" />
                <span className="text-xs font-black uppercase tracking-widest text-primary">Single Article</span>
              </div>
              <h2 className="text-4xl sm:text-6xl font-black tracking-tight mb-3 leading-none">
                Precision<br/>Generator
              </h2>
              <p className="text-base font-medium text-gray-300 max-w-2xl">
                Craft individual masterpieces with granular control over every aspect of your content
              </p>
            </div>
          </div>
          
          <div className="relative bg-white/10 backdrop-blur-sm border-l-4 border-primary p-5">
            <div className="flex items-start gap-3">
              <Target className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" strokeWidth={2.5} />
              <p className="text-sm font-bold text-white/90">
                Perfect for detailed, customized articles where you need complete control over tone, length, and style
              </p>
            </div>
          </div>
        </div>
        
        <div className="p-6 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-8">
          {/* Primary Inputs - Two Column Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Website Name */}
            <div className="md:col-span-2">
              <div className="bg-white border-4 border-black p-6 shadow-brutal-sm hover:shadow-brutal transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary border-3 border-black flex items-center justify-center -rotate-3">
                    <Building2 className="w-5 h-5" strokeWidth={2.5} />
                  </div>
                  <label htmlFor="websiteName" className="text-sm font-black uppercase tracking-wider">
                    Website Name *
                  </label>
                </div>
                <input
                  type="text"
                  id="websiteName"
                  value={formData.websiteName}
                  onChange={(e) => setFormData({ ...formData, websiteName: e.target.value })}
                  className={`w-full px-5 py-4 border-3 font-bold text-lg ${
                    errors.websiteName ? 'border-red-500 bg-red-50' : 'border-black bg-white'
                  } focus:outline-none focus:shadow-brutal-sm focus:translate-x-[-2px] focus:translate-y-[-2px] transition-all`}
                  placeholder="Enter your website name..."
                  disabled={isLoading}
                />
                {errors.websiteName && (
                  <div className="mt-3 p-3 bg-red-100 border-3 border-red-500">
                    <p className="text-red-700 text-sm font-black uppercase">⚠ {errors.websiteName}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Website Description */}
            <div className="md:col-span-2">
              <div className="bg-white border-4 border-black p-6 shadow-brutal-sm hover:shadow-brutal transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-black text-primary border-3 border-black flex items-center justify-center rotate-2">
                    <AlignLeft className="w-5 h-5" strokeWidth={2.5} />
                  </div>
                  <label htmlFor="websiteDescription" className="text-sm font-black uppercase tracking-wider">
                    Website Description / Niche *
                  </label>
                </div>
                <textarea
                  id="websiteDescription"
                  value={formData.websiteDescription}
                  onChange={(e) => setFormData({ ...formData, websiteDescription: e.target.value })}
                  rows={5}
                  className={`w-full px-5 py-4 border-3 font-medium text-base ${
                    errors.websiteDescription ? 'border-red-500 bg-red-50' : 'border-black bg-white'
                  } focus:outline-none focus:shadow-brutal-sm focus:translate-x-[-2px] focus:translate-y-[-2px] transition-all resize-none`}
                  placeholder="Describe your website focus, target audience, and niche in detail..."
                  disabled={isLoading}
                />
                <div className="mt-3 flex items-center gap-2 text-xs font-bold text-gray-600">
                  <span className="inline-block w-2 h-2 bg-primary border border-black"></span>
                  <span>Be specific to get better AI-generated content</span>
                </div>
                {errors.websiteDescription && (
                  <div className="mt-3 p-3 bg-red-100 border-3 border-red-500">
                    <p className="text-red-700 text-sm font-black uppercase">⚠ {errors.websiteDescription}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Advanced Options Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Article Type */}
            <div>
              <div className="bg-white border-4 border-black p-5 shadow-brutal-sm">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-5 h-5" strokeWidth={2.5} />
                  <label htmlFor="articleType" className="text-xs font-black uppercase tracking-wider">
                    Article Type
                  </label>
                </div>
                <select
                  id="articleType"
                  value={formData.articleType}
                  onChange={(e) => setFormData({ ...formData, articleType: e.target.value as ArticleType })}
                  className="w-full px-4 py-3.5 border-3 border-black bg-primary/20 focus:outline-none focus:shadow-brutal-sm transition-all font-black cursor-pointer hover:bg-gray-200"
                  disabled={isLoading}
                >
                  <option value="review">Review Article</option>
                  <option value="guide">In-Depth Guide</option>
                  <option value="about">About Page</option>
                  <option value="tool-overview">Tool / SaaS Overview</option>
                  <option value="listicle">Listicle</option>
                  <option value="comparison">Comparison</option>
                  <option value="tutorial">Tutorial</option>
                  <option value="news">News Article</option>
                </select>
              </div>
            </div>

            {/* Article Length */}
            <div>
              <div className="bg-white border-4 border-black p-5 shadow-brutal-sm">
                <div className="flex items-center gap-2 mb-3">
                  <AlignLeft className="w-5 h-5" strokeWidth={2.5} />
                  <label htmlFor="articleLength" className="text-xs font-black uppercase tracking-wider">
                    Article Length
                  </label>
                </div>
                <select
                  id="articleLength"
                  value={formData.articleLength}
                  onChange={(e) => setFormData({ ...formData, articleLength: e.target.value as ArticleLength })}
                  className="w-full px-4 py-3.5 border-3 border-black bg-primary/20 focus:outline-none focus:shadow-brutal-sm transition-all font-black cursor-pointer hover:bg-gray-200"
                  disabled={isLoading}
                >
                  <option value="short">Short (2000-3000 words)</option>
                  <option value="medium">Medium (3500-5000 words)</option>
                  <option value="long">Long (5500-8000 words)</option>
                  <option value="extra-long">Extra Long (8000-12000 words)</option>
                </select>
              </div>
            </div>

            {/* Tone of Voice */}
            <div>
              <div className="bg-white border-4 border-black p-5 shadow-brutal-sm">
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare className="w-5 h-5" strokeWidth={2.5} />
                  <label htmlFor="toneOfVoice" className="text-xs font-black uppercase tracking-wider">
                    Tone of Voice
                  </label>
                </div>
                <select
                  id="toneOfVoice"
                  value={formData.toneOfVoice}
                  onChange={(e) => setFormData({ ...formData, toneOfVoice: e.target.value as ToneOfVoice })}
                  className="w-full px-4 py-3.5 border-3 border-black bg-primary/20 focus:outline-none focus:shadow-brutal-sm transition-all font-black cursor-pointer hover:bg-gray-200"
                  disabled={isLoading}
                >
                  <option value="professional">Professional</option>
                  <option value="neutral">Neutral</option>
                  <option value="friendly">Friendly</option>
                  <option value="authoritative">Authoritative</option>
                  <option value="conversational">Conversational</option>
                  <option value="technical">Technical</option>
                </select>
              </div>
            </div>

            {/* Language */}
            <div>
              <div className="bg-white border-4 border-black p-5 shadow-brutal-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Globe className="w-5 h-5" strokeWidth={2.5} />
                  <label htmlFor="language" className="text-xs font-black uppercase tracking-wider">
                    Language
                  </label>
                </div>
                <select
                  id="language"
                  value={formData.language}
                  onChange={(e) => setFormData({ ...formData, language: e.target.value as Language })}
                  className="w-full px-4 py-3.5 border-3 border-black bg-primary/20 focus:outline-none focus:shadow-brutal-sm transition-all font-black cursor-pointer hover:bg-gray-200"
                  disabled={isLoading}
                >
                  <option value="english">English</option>
                  <option value="spanish">Spanish</option>
                  <option value="french">French</option>
                  <option value="german">German</option>
                  <option value="italian">Italian</option>
                  <option value="portuguese">Portuguese</option>
                </select>
              </div>
            </div>
          </div>

          {/* Advanced Options */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Target Audience */}
            <div className="md:col-span-2">
              <div className="bg-white border-4 border-black p-5 shadow-brutal-sm">
                <label htmlFor="targetAudience" className="text-xs font-black uppercase tracking-wider mb-3 block">
                  Target Audience (Optional)
                </label>
                <input
                  type="text"
                  id="targetAudience"
                  value={formData.targetAudience || ''}
                  onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                  className="w-full px-4 py-3 border-3 border-black font-medium"
                  placeholder="e.g., Small business owners, Tech enthusiasts, Beginners..."
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Custom Keywords */}
            <div className="md:col-span-2">
              <div className="bg-white border-4 border-black p-5 shadow-brutal-sm">
                <label className="text-xs font-black uppercase tracking-wider mb-3 block">
                  Custom Keywords (Optional)
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
                    className="flex-1 px-4 py-3 border-3 border-black font-medium"
                    placeholder="Add keyword and press Enter..."
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={addKeyword}
                    className="px-6 py-3 border-3 border-black bg-primary hover:bg-gray-800 hover:text-white font-black"
                    disabled={isLoading}
                  >
                    Add
                  </button>
                </div>
                {formData.customKeywords && formData.customKeywords.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.customKeywords.map((keyword, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-black text-primary border-2 border-black text-sm font-bold flex items-center gap-2"
                      >
                        {keyword}
                        <button
                          type="button"
                          onClick={() => removeKeyword(keyword)}
                          className="hover:text-red-500"
                          disabled={isLoading}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Content Options */}
            <div className="md:col-span-2">
              <div className="bg-white border-4 border-black p-5 shadow-brutal-sm">
                <label className="text-xs font-black uppercase tracking-wider mb-3 block">
                  Content Options
                </label>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.includeTables || false}
                      onChange={(e) => setFormData({ ...formData, includeTables: e.target.checked })}
                      className="w-5 h-5"
                      disabled={isLoading}
                    />
                    <span className="font-bold">Include comparison tables and data visualizations</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.includeImages || false}
                      onChange={(e) => setFormData({ ...formData, includeImages: e.target.checked })}
                      className="w-5 h-5"
                      disabled={isLoading}
                    />
                    <span className="font-bold">Include image placeholders with alt text</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-8 mt-8 relative">
            <div className="absolute top-0 left-0 right-0 h-px bg-black" />
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                disabled={isLoading}
                className="relative flex-1 bg-black text-primary px-8 py-6 font-black text-xl overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 uppercase tracking-wide"
              >
                <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
                <div className="absolute bottom-0 right-0 w-1 h-full bg-primary" />
                {isLoading ? (
                  <>
                    <Loader2 className="w-7 h-7 animate-spin relative z-10" strokeWidth={2.5} />
                    <span className="relative z-10">Generating Article...</span>
                  </>
                ) : (
                  <>
                    <Layers className="w-7 h-7 relative z-10 group-hover:text-black transition-colors" strokeWidth={2.5} />
                    <span className="relative z-10 group-hover:text-black transition-colors">Generate Article</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleReset}
                disabled={isLoading}
                className="sm:w-auto px-8 py-6 border-2 border-black bg-white font-black text-lg hover:bg-black hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 uppercase tracking-wide"
              >
                <RotateCcw className="w-5 h-5" strokeWidth={2.5} />
                <span>Reset</span>
              </button>
            </div>
          </div>
          </form>
        </div>
        </div>
      </div>
    </div>
  );
}
