import { useState } from 'react';
import { Loader2, Wand2, RotateCcw, PenTool, FileText, AlignLeft, MessageSquare, Globe, Building2 } from 'lucide-react';
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
  });

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
    });
    setErrors({});
  };

  return (
    <div className="relative bg-white border-4 border-black shadow-brutal-lg overflow-hidden">
      {/* Decorative Corner Element */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary border-l-4 border-b-4 border-black -rotate-0 opacity-20" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-black opacity-5" />
      
      <div className="relative p-6 sm:p-10">
        {/* Header Section */}
        <div className="mb-10">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-black text-primary border-4 border-black flex items-center justify-center rotate-3 hover:rotate-6 transition-transform">
                <PenTool className="w-8 h-8" strokeWidth={2.5} />
              </div>
              <div>
                <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-2">Article Generator</h2>
                <p className="text-sm font-bold text-gray-600 uppercase tracking-wide">AI-Powered Content Creation</p>
              </div>
            </div>
          </div>
          <div className="bg-primary/10 border-l-4 border-black p-4">
            <p className="text-sm font-bold text-gray-800">✦ Fill in the details below to generate a professional, SEO-optimized article in seconds</p>
          </div>
        </div>
      
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
                  className="w-full px-4 py-3.5 border-3 border-black bg-primary/20 focus:outline-none focus:shadow-brutal-sm transition-all font-black cursor-pointer hover:bg-primary/30"
                  disabled={isLoading}
                >
                  <option value="review">Review Article</option>
                  <option value="guide">In-Depth Guide</option>
                  <option value="about">About Page</option>
                  <option value="tool-overview">Tool / SaaS Overview</option>
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
                  className="w-full px-4 py-3.5 border-3 border-black bg-primary/20 focus:outline-none focus:shadow-brutal-sm transition-all font-black cursor-pointer hover:bg-primary/30"
                  disabled={isLoading}
                >
                  <option value="short">Short (2000-3000 words)</option>
                  <option value="medium">Medium (3500-5000 words)</option>
                  <option value="long">Long (5500-8000 words)</option>
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
                  className="w-full px-4 py-3.5 border-3 border-black bg-primary/20 focus:outline-none focus:shadow-brutal-sm transition-all font-black cursor-pointer hover:bg-primary/30"
                  disabled={isLoading}
                >
                  <option value="professional">Professional</option>
                  <option value="neutral">Neutral</option>
                  <option value="friendly">Friendly</option>
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
                  className="w-full px-4 py-3.5 border-3 border-black bg-primary/20 focus:outline-none focus:shadow-brutal-sm transition-all font-black cursor-pointer hover:bg-primary/30"
                  disabled={isLoading}
                >
                  <option value="english">English</option>
                </select>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-6 border-t-4 border-black mt-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-black text-primary border-4 border-black px-8 py-5 font-black text-xl shadow-brutal-lg hover:bg-primary hover:text-black hover-lift disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none disabled:hover:shadow-brutal-lg flex items-center justify-center gap-3 uppercase tracking-wide group"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-7 h-7 animate-spin" strokeWidth={3} />
                    <span>Generating Article...</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="w-6 h-6 group-hover:rotate-12 transition-transform" strokeWidth={3} />
                    <span>Generate Article</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleReset}
                disabled={isLoading}
                className="sm:w-auto px-8 py-5 border-4 border-black bg-white font-black text-lg hover:bg-black hover:text-primary transition-colors shadow-brutal-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 uppercase tracking-wide"
              >
                <RotateCcw className="w-5 h-5" strokeWidth={3} />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
