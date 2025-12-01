import { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import GeneratorForm from '../components/GeneratorForm';
import ResultsTabs from '../components/ResultsTabs';
import HowItWorks from '../components/HowItWorks';
import FAQ from '../components/FAQ';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import FinalCTA from '../components/FinalCTA';
import BulkGenerator from '../components/BulkGenerator';
import ArticleLibrary from '../components/ArticleLibrary';
import ExportModal from '../components/ExportModal';
import SEOAnalyzer from '../components/SEOAnalyzer';
import SmartPasteGenerator from '../components/SmartPasteGenerator';
import CategoryGenerator from '../components/CategoryGenerator';
import UltraModernNav from '../components/UltraModernNav';
import LoadingProgress from '../components/LoadingProgress';
import { useToast } from '../components/ToastContainer';
import { GeneratorFormData, GeneratedArticle, BulkGenerationJob } from '../types';
import { generateArticle, generateBulkArticles } from '../services/aiService';
import { StorageService } from '../services/storageService';

type ViewMode = 'single' | 'bulk' | 'library' | 'smart-paste' | 'category';

export default function HomePage() {
  const [viewMode, setViewMode] = useState<ViewMode>('single');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedArticle, setGeneratedArticle] = useState<GeneratedArticle | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [articles, setArticles] = useState<GeneratedArticle[]>([]);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showSEOAnalyzer, setShowSEOAnalyzer] = useState(false);
  const [bulkProgress, setBulkProgress] = useState<{ current: number; total: number } | null>(null);
  const toast = useToast();

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = () => {
    setArticles(StorageService.getArticles());
  };

  const handleGenerate = async (formData: GeneratorFormData) => {
    setIsLoading(true);
    setError(null);
    toast.showInfo('Starting article generation', 'Please wait while we create your content');

    try {
      const article = await generateArticle(formData);
      setGeneratedArticle(article);
      StorageService.saveArticle(article);
      loadArticles();
      
      toast.showSuccess('Article generated successfully', `Created: ${article.title}`);
      
      setTimeout(() => {
        const resultsElement = document.getElementById('results');
        if (resultsElement) {
          resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'An error occurred while generating the article';
      setError(errorMsg);
      toast.showError('Generation failed', errorMsg);
      console.error('Generation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBulkComplete = (job: BulkGenerationJob) => {
    loadArticles();
    setBulkProgress(null);
    
    if (job.errors.length === 0) {
      toast.showSuccess('Bulk generation complete', `Successfully generated ${job.results.length} articles`);
    } else if (job.results.length > 0) {
      toast.showWarning('Bulk generation completed with errors', `Generated ${job.results.length} articles, ${job.errors.length} failed`);
    } else {
      toast.showError('Bulk generation failed', 'All articles failed to generate');
    }
    
    setViewMode('library');
  };

  const handleSmartPasteGenerate = async (items: GeneratorFormData[]) => {
    setIsLoading(true);
    setError(null);
    setBulkProgress({ current: 0, total: items.length });
    toast.showInfo('Starting bulk generation', `Generating ${items.length} articles`);

    try {
      const { results, errors } = await generateBulkArticles(items, (current, total) => {
        setBulkProgress({ current, total });
      });

      results.forEach(article => StorageService.saveArticle(article));
      loadArticles();

      if (errors.length === 0) {
        toast.showSuccess('Bulk generation complete', `Successfully generated ${results.length} articles`);
      } else {
        toast.showWarning('Bulk generation completed with errors', `Generated ${results.length} articles, ${errors.length} failed`);
      }
      
      setViewMode('library');
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMsg);
      toast.showError('Bulk generation failed', errorMsg);
    } finally {
      setIsLoading(false);
      setBulkProgress(null);
    }
  };

  const handleCategoryGenerate = async (items: GeneratorFormData[]) => {
    console.log('Starting category generation with items:', items);
    setIsLoading(true);
    setError(null);
    setBulkProgress({ current: 0, total: items.length });
    toast.showInfo('Starting category generation', `Generating ${items.length} articles`);

    try {
      if (!items || items.length === 0) {
        throw new Error('No items to generate');
      }

      console.log(`Generating ${items.length} articles...`);
      const { results, errors } = await generateBulkArticles(items, (current, total) => {
        console.log(`Progress: ${current}/${total}`);
        setBulkProgress({ current, total });
      });

      console.log(`Generation complete. Results: ${results.length}, Errors: ${errors.length}`);
      
      results.forEach(article => StorageService.saveArticle(article));
      loadArticles();

      if (errors.length === 0) {
        toast.showSuccess('Category generation complete', `Successfully generated ${results.length} articles`);
      } else {
        toast.showWarning('Category generation completed with errors', `Generated ${results.length} articles, ${errors.length} failed`);
      }
      
      setViewMode('library');
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'An error occurred during generation';
      console.error('Category generation error:', err);
      setError(errorMsg);
      toast.showError('Category generation failed', errorMsg);
    } finally {
      setIsLoading(false);
      setBulkProgress(null);
    }
  };

  const handleArticleSelect = (article: GeneratedArticle) => {
    setGeneratedArticle(article);
    setViewMode('single');
    setTimeout(() => {
      const resultsElement = document.getElementById('results');
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <>
      <Hero />
      
      {/* Ultra Modern Navigation */}
      <UltraModernNav 
        currentMode={viewMode} 
        onModeChange={setViewMode}
        articleCount={articles.length}
      />

      {/* Generator Section */}
      <section id="generator" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          {viewMode === 'single' && (
            <>
              <GeneratorForm onGenerate={handleGenerate} isLoading={isLoading} />
              
              {error && (
                <div className="mt-8 p-6 bg-red-100 border-4 border-red-600">
                  <p className="text-red-900 font-black text-lg mb-2">⚠ Error: {error}</p>
                  <p className="text-red-800 font-bold text-sm">
                    Note: If you haven't added an API key, the app will use mock data.
                  </p>
                </div>
              )}
              
              {generatedArticle && (
                <div id="results" className="mt-12 space-y-8">
                  <div className="flex gap-4 justify-end">
                    <button
                      onClick={() => setShowSEOAnalyzer(!showSEOAnalyzer)}
                      className="px-6 py-3 border-4 border-black bg-white hover:bg-primary transition-colors font-black uppercase"
                    >
                      {showSEOAnalyzer ? 'Hide' : 'Show'} SEO Analysis
                    </button>
                    <button
                      onClick={() => setShowExportModal(true)}
                      className="px-6 py-3 border-4 border-black bg-black text-primary hover:bg-primary hover:text-black transition-colors font-black uppercase"
                    >
                      Export Article
                    </button>
                  </div>
                  
                  {showSEOAnalyzer && <SEOAnalyzer article={generatedArticle} />}
                  <ResultsTabs article={generatedArticle} />
                </div>
              )}
            </>
          )}

          {viewMode === 'smart-paste' && (
            <SmartPasteGenerator onGenerate={handleSmartPasteGenerate} />
          )}

          {viewMode === 'category' && (
            <CategoryGenerator onGenerate={handleCategoryGenerate} />
          )}

          {viewMode === 'bulk' && (
            <BulkGenerator onComplete={handleBulkComplete} />
          )}

          {viewMode === 'library' && (
            <ArticleLibrary 
              articles={articles} 
              onArticleSelect={handleArticleSelect}
              onRefresh={loadArticles}
            />
          )}
        </div>
      </section>

      <HowItWorks />
      <FAQ />
      <Features />
      <Testimonials />
      <FinalCTA />

      {showExportModal && generatedArticle && (
        <ExportModal 
          article={generatedArticle} 
          onClose={() => setShowExportModal(false)} 
        />
      )}

      {/* Loading Progress Overlay */}
      {isLoading && bulkProgress && (
        <LoadingProgress 
          message={`Generating articles...`}
          progress={bulkProgress.current}
          total={bulkProgress.total}
        />
      )}

      {/* Simple Loading for Single Article */}
      {isLoading && !bulkProgress && (
        <LoadingProgress message="Generating article..." />
      )}
    </>
  );
}
