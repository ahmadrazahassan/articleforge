import { TrendingUp, AlertCircle, CheckCircle, Lightbulb } from 'lucide-react';
import { GeneratedArticle } from '../types';
import { SEOService } from '../services/seoService';

interface SEOAnalyzerProps {
  article: GeneratedArticle;
}

export default function SEOAnalyzer({ article }: SEOAnalyzerProps) {
  const analysis = SEOService.analyzeSEO(article);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    return 'Needs Improvement';
  };

  return (
    <div className="bg-white border-4 border-black shadow-brutal-lg">
      <div className="border-b-4 border-black p-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-black text-primary border-3 border-black flex items-center justify-center">
            <TrendingUp className="w-7 h-7" strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="text-3xl font-black">SEO Analysis</h3>
            <p className="text-sm font-bold text-gray-600">Comprehensive SEO Score & Recommendations</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Score Display */}
        <div className="mb-8 bg-primary/10 border-4 border-black p-8 text-center">
          <div className="inline-flex items-center justify-center w-32 h-32 rounded-full border-8 border-black bg-white mb-4">
            <div className="text-center">
              <div className="text-5xl font-black">{analysis.score}</div>
              <div className="text-xs font-black uppercase">/ 100</div>
            </div>
          </div>
          <div className={`inline-block px-6 py-3 ${getScoreColor(analysis.score)} text-white border-4 border-black font-black text-xl uppercase`}>
            {getScoreLabel(analysis.score)}
          </div>
        </div>

        {/* Strengths */}
        {analysis.strengths.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" strokeWidth={2.5} />
              <h4 className="text-xl font-black">Strengths</h4>
            </div>
            <div className="space-y-2">
              {analysis.strengths.map((strength, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-green-50 border-3 border-green-500">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="font-bold text-sm">{strength}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Issues */}
        {analysis.issues.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-red-600" strokeWidth={2.5} />
              <h4 className="text-xl font-black">Issues to Fix</h4>
            </div>
            <div className="space-y-2">
              {analysis.issues.map((issue, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-red-50 border-3 border-red-500">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="font-bold text-sm">{issue}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Suggestions */}
        {analysis.suggestions.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Lightbulb className="w-6 h-6 text-yellow-600" strokeWidth={2.5} />
              <h4 className="text-xl font-black">Suggestions</h4>
            </div>
            <div className="space-y-2">
              {analysis.suggestions.map((suggestion, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-yellow-50 border-3 border-yellow-500">
                  <Lightbulb className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <p className="font-bold text-sm">{suggestion}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Metrics */}
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <div className="bg-white border-3 border-black p-4 text-center">
            <p className="text-xs font-black uppercase text-gray-600 mb-2">Word Count</p>
            <p className="text-3xl font-black">{article.wordCount || 0}</p>
          </div>
          <div className="bg-white border-3 border-black p-4 text-center">
            <p className="text-xs font-black uppercase text-gray-600 mb-2">Reading Time</p>
            <p className="text-3xl font-black">{article.readingTime || 0} min</p>
          </div>
          <div className="bg-white border-3 border-black p-4 text-center">
            <p className="text-xs font-black uppercase text-gray-600 mb-2">Keywords</p>
            <p className="text-3xl font-black">{article.focusKeywords.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
