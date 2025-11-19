import { useState } from 'react';
import Hero from '../components/Hero';
import GeneratorForm from '../components/GeneratorForm';
import ResultsTabs from '../components/ResultsTabs';
import HowItWorks from '../components/HowItWorks';
import FAQ from '../components/FAQ';
import { GeneratorFormData, GeneratedArticle } from '../types';
import { generateArticle } from '../services/aiService';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedArticle, setGeneratedArticle] = useState<GeneratedArticle | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (formData: GeneratorFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const article = await generateArticle(formData);
      setGeneratedArticle(article);
      
      // Scroll to results
      setTimeout(() => {
        const resultsElement = document.getElementById('results');
        if (resultsElement) {
          resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while generating the article');
      console.error('Generation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Hero />
      
      {/* Generator Section */}
      <section id="generator" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <GeneratorForm onGenerate={handleGenerate} isLoading={isLoading} />
          
          {/* Error Message */}
          {error && (
            <div className="mt-8 p-6 bg-red-100 border-4 border-red-600">
              <p className="text-red-900 font-black text-lg mb-2">⚠ Error: {error}</p>
              <p className="text-red-800 font-bold text-sm">
                Note: If you haven't added an API key, the app will use mock data.
              </p>
            </div>
          )}
          
          {/* Results Section */}
          {generatedArticle && (
            <div id="results" className="mt-12">
              <ResultsTabs article={generatedArticle} />
            </div>
          )}
        </div>
      </section>

      <HowItWorks />
      <FAQ />
    </>
  );
}
