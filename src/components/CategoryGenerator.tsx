import { useState } from 'react';
import { Plus, Trash2, FileText, Loader2, Grid3x3 } from 'lucide-react';
import { CategoryGenerationConfig, GeneratorFormData } from '../types';
import { CategoryGeneratorService } from '../services/categoryGeneratorService';

interface CategoryGeneratorProps {
  onGenerate: (items: GeneratorFormData[]) => void;
}

export default function CategoryGenerator({ onGenerate }: CategoryGeneratorProps) {
  const [categories, setCategories] = useState<CategoryGenerationConfig[]>([
    {
      category: 'Technology',
      count: 5,
      articleType: 'guide',
      articleLength: 'medium',
      toneOfVoice: 'professional',
      language: 'english',
    }
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedIdeas, setGeneratedIdeas] = useState<GeneratorFormData[]>([]);

  const addCategory = () => {
    setCategories([...categories, {
      category: '',
      count: 5,
      articleType: 'guide',
      articleLength: 'medium',
      toneOfVoice: 'professional',
      language: 'english',
    }]);
  };

  const removeCategory = (index: number) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  const updateCategory = (index: number, field: keyof CategoryGenerationConfig, value: any) => {
    const updated = [...categories];
    updated[index] = { ...updated[index], [field]: value };
    setCategories(updated);
  };

  const handleGenerateIdeas = async () => {
    const validCategories = categories.filter(c => c.category.trim() && c.count > 0);
    
    if (validCategories.length === 0) {
      alert('Please add at least one category with a name');
      return;
    }

    setIsGenerating(true);
    const allIdeas: GeneratorFormData[] = [];

    try {
      for (const config of validCategories) {
        const ideas = await CategoryGeneratorService.generateArticleIdeas(config);
        allIdeas.push(...ideas);
        
        // Small delay between categories to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      setGeneratedIdeas(allIdeas);
    } catch (error) {
      console.error('Error generating ideas:', error);
      alert('Error generating ideas. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateArticles = () => {
    console.log('Generate Articles button clicked');
    console.log('Generated ideas count:', generatedIdeas.length);
    
    if (generatedIdeas.length === 0) {
      alert('Please generate ideas first');
      return;
    }
    
    console.log('Calling onGenerate with ideas:', generatedIdeas);
    onGenerate(generatedIdeas);
  };

  const popularCategories = [
    'Technology', 'Startups', 'Reviews', 'AI', 'Marketing',
    'Leadership', 'Finance', 'SaaS', 'Productivity', 'Business'
  ];

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
          {/* Modern Header */}
          <div className="relative p-8 sm:p-12">
          <div className="flex items-start gap-8 mb-8">
            {/* Stacked Icon Design */}
            <div className="relative flex-shrink-0">
              <div className="relative">
                <div className="w-28 h-28 border-4 border-black bg-primary relative">
                  <Grid3x3 className="absolute inset-0 m-auto w-14 h-14 text-black" strokeWidth={2} />
                </div>
                <div className="absolute -bottom-4 -right-4 w-16 h-16 border-4 border-black bg-white" />
                <div className="absolute -top-2 -left-2 w-8 h-8 bg-black" />
              </div>
            </div>
            
            {/* Title Section */}
            <div className="flex-1">
              <div className="mb-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-black text-primary mb-4">
                  <div className="w-2 h-2 bg-primary" />
                  <span className="text-xs font-black uppercase tracking-widest">AI Category</span>
                </div>
              </div>
              <h2 className="text-5xl sm:text-7xl font-black tracking-tighter mb-5 leading-none">
                Category<br/>
                <span className="relative inline-block">
                  Intelligence
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-primary" />
                </span>
              </h2>
              <p className="text-lg font-medium text-gray-700 mb-8 max-w-2xl">
                Define categories, set quantities. AI generates completely unique article concepts every single time.
              </p>
              
              {/* Process Steps */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="relative p-4 border-2 border-black bg-white hover:bg-black hover:text-white transition-all group">
                  <div className="absolute top-0 left-0 w-2 h-full bg-primary" />
                  <div className="text-3xl font-black mb-2 group-hover:text-primary">01</div>
                  <div className="text-xs font-bold uppercase">Set Categories</div>
                </div>
                <div className="relative p-4 border-2 border-black bg-white hover:bg-black hover:text-white transition-all group">
                  <div className="absolute top-0 left-0 w-2 h-full bg-primary" />
                  <div className="text-3xl font-black mb-2 group-hover:text-primary">02</div>
                  <div className="text-xs font-bold uppercase">AI Generates</div>
                </div>
                <div className="relative p-4 border-2 border-black bg-white hover:bg-black hover:text-white transition-all group">
                  <div className="absolute top-0 left-0 w-2 h-full bg-primary" />
                  <div className="text-3xl font-black mb-2 group-hover:text-primary">03</div>
                  <div className="text-xs font-bold uppercase">Review Ideas</div>
                </div>
                <div className="relative p-4 border-2 border-black bg-white hover:bg-black hover:text-white transition-all group">
                  <div className="absolute top-0 left-0 w-2 h-full bg-primary" />
                  <div className="text-3xl font-black mb-2 group-hover:text-primary">04</div>
                  <div className="text-xs font-bold uppercase">Generate All</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="h-px bg-black/10 mx-8" />

          <div className="p-8 sm:p-12">
        {/* Popular Categories Quick Select */}
        <div className="mb-6 bg-primary/10 border-3 border-black p-4 relative z-10">
          <p className="font-black text-sm uppercase mb-3">Quick Select Popular Categories:</p>
          <div className="flex flex-wrap gap-2">
            {popularCategories.map(cat => (
              <button
                key={cat}
                onClick={() => {
                  const exists = categories.find(c => c.category === cat);
                  if (!exists) {
                    setCategories([...categories, {
                      category: cat,
                      count: 5,
                      articleType: 'guide',
                      articleLength: 'medium',
                      toneOfVoice: 'professional',
                      language: 'english',
                    }]);
                  }
                }}
                className="px-3 py-2 bg-white border-2 border-black text-xs font-bold hover:bg-gray-800 hover:text-white transition-colors"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Category Configurations */}
        <div className="space-y-4 mb-6">
          {categories.map((config, index) => (
            <div key={index} className="border-4 border-black p-6 bg-white shadow-brutal-sm">
              <div className="flex items-start justify-between mb-4">
                <span className="font-black text-lg">Category {index + 1}</span>
                <button
                  onClick={() => removeCategory(index)}
                  className="p-2 border-3 border-black hover:bg-red-500 hover:text-white transition-colors"
                  disabled={isGenerating}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-black uppercase mb-2">Category Name *</label>
                  <input
                    type="text"
                    value={config.category}
                    onChange={(e) => updateCategory(index, 'category', e.target.value)}
                    placeholder="e.g., Technology, Health, Finance..."
                    className="w-full px-4 py-3 border-3 border-black font-bold bg-white"
                    disabled={isGenerating}
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase mb-2">Articles to Generate</label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={config.count}
                    onChange={(e) => updateCategory(index, 'count', parseInt(e.target.value) || 1)}
                    className="w-full px-4 py-3 border-3 border-black font-bold bg-white"
                    disabled={isGenerating}
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase mb-2">Article Type</label>
                  <select
                    value={config.articleType}
                    onChange={(e) => updateCategory(index, 'articleType', e.target.value)}
                    className="w-full px-4 py-3 border-3 border-black font-bold bg-white"
                    disabled={isGenerating}
                  >
                    <option value="review">Review</option>
                    <option value="guide">Guide</option>
                    <option value="about">About</option>
                    <option value="tool-overview">Tool Overview</option>
                    <option value="listicle">Listicle</option>
                    <option value="comparison">Comparison</option>
                    <option value="tutorial">Tutorial</option>
                    <option value="news">News</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase mb-2">Length</label>
                  <select
                    value={config.articleLength}
                    onChange={(e) => updateCategory(index, 'articleLength', e.target.value)}
                    className="w-full px-4 py-3 border-3 border-black font-bold bg-white"
                    disabled={isGenerating}
                  >
                    <option value="short">Short (2-3k)</option>
                    <option value="medium">Medium (3.5-5k)</option>
                    <option value="long">Long (5.5-8k)</option>
                    <option value="extra-long">Extra Long (8-12k)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase mb-2">Tone</label>
                  <select
                    value={config.toneOfVoice}
                    onChange={(e) => updateCategory(index, 'toneOfVoice', e.target.value)}
                    className="w-full px-4 py-3 border-3 border-black font-bold bg-white"
                    disabled={isGenerating}
                  >
                    <option value="professional">Professional</option>
                    <option value="neutral">Neutral</option>
                    <option value="friendly">Friendly</option>
                    <option value="authoritative">Authoritative</option>
                    <option value="conversational">Conversational</option>
                    <option value="technical">Technical</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-black uppercase mb-2">Target Audience (Optional)</label>
                  <input
                    type="text"
                    value={config.targetAudience || ''}
                    onChange={(e) => updateCategory(index, 'targetAudience', e.target.value)}
                    placeholder="e.g., Small business owners, Beginners, Professionals..."
                    className="w-full px-4 py-3 border-3 border-black font-medium bg-white"
                    disabled={isGenerating}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={addCategory}
            className="px-6 py-4 border-4 border-black bg-white hover:bg-gray-800 hover:text-white transition-colors font-black uppercase flex items-center gap-2"
            disabled={isGenerating}
          >
            <Plus className="w-5 h-5" />
            Add Category
          </button>

          <button
            onClick={handleGenerateIdeas}
            className="relative flex-1 px-8 py-5 bg-black text-primary font-black uppercase overflow-hidden group disabled:opacity-50 flex items-center justify-center gap-3"
            disabled={isGenerating || categories.length === 0}
          >
            <div className="absolute inset-0 bg-white transform translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            <div className="absolute top-0 left-0 w-2 h-full bg-primary" />
            <div className="absolute bottom-0 right-0 w-full h-2 bg-primary" />
            {isGenerating ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin relative z-10" />
                <span className="relative z-10">Generating Ideas...</span>
              </>
            ) : (
              <>
                <FileText className="w-6 h-6 relative z-10 group-hover:text-black transition-colors" />
                <span className="relative z-10 group-hover:text-black transition-colors">Generate Article Ideas</span>
              </>
            )}
          </button>
        </div>

        {/* Generated Ideas Preview */}
        {generatedIdeas.length > 0 && (
          <div className="bg-green-50 border-4 border-green-500 p-6">
            <h3 className="font-black text-xl mb-4">✨ Generated {generatedIdeas.length} Unique Article Ideas!</h3>
            
            <div className="bg-white border-3 border-black p-4 max-h-96 overflow-y-auto mb-4">
              <div className="space-y-3">
                {generatedIdeas.map((idea, index) => (
                  <div key={index} className="p-4 bg-gray-50 border-2 border-gray-300">
                    <p className="font-black text-sm mb-2">{index + 1}. {idea.websiteName}</p>
                    <p className="text-xs text-gray-700">{idea.websiteDescription.substring(0, 150)}...</p>
                    <div className="mt-2 flex gap-2 flex-wrap">
                      <span className="px-2 py-1 bg-black text-primary text-xs font-bold">{idea.articleType}</span>
                      <span className="px-2 py-1 bg-primary text-black text-xs font-bold">{idea.articleLength}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerateArticles}
              className="relative w-full px-8 py-7 bg-black text-primary font-black text-xl uppercase overflow-hidden group flex items-center justify-center gap-3"
            >
              <div className="absolute inset-0 bg-white transform scale-0 group-hover:scale-100 transition-transform duration-700 origin-center" />
              <div className="absolute top-0 left-0 w-full h-2 bg-primary" />
              <div className="absolute bottom-0 right-0 w-2 h-full bg-primary" />
              <FileText className="w-7 h-7 relative z-10 group-hover:text-black transition-colors" />
              <span className="relative z-10 group-hover:text-black transition-colors">Generate All {generatedIdeas.length} Articles Now</span>
            </button>
          </div>
        )}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
