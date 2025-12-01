import { useState } from 'react';
import { Clipboard, CheckCircle, AlertCircle, FileText } from 'lucide-react';
import { ParserService } from '../services/parserService';
import { ParsedWebsiteData, GeneratorFormData, ArticleType, ArticleLength, ToneOfVoice, Language } from '../types';

interface SmartPasteGeneratorProps {
  onGenerate: (items: GeneratorFormData[]) => void;
}

export default function SmartPasteGenerator({ onGenerate }: SmartPasteGeneratorProps) {
  const [pasteInput, setPasteInput] = useState('');
  const [parsedData, setParsedData] = useState<ParsedWebsiteData[]>([]);
  const [parseError, setParseError] = useState('');
  const [showExamples, setShowExamples] = useState(false);
  
  // Default settings for all parsed items
  const [defaultSettings, setDefaultSettings] = useState({
    articleType: 'guide' as ArticleType,
    articleLength: 'medium' as ArticleLength,
    toneOfVoice: 'professional' as ToneOfVoice,
    language: 'english' as Language,
  });

  const handleParse = () => {
    if (!pasteInput.trim()) {
      setParseError('Please paste some data');
      return;
    }

    const result = ParserService.parseSmartPaste(pasteInput);
    
    if (result.errors.length > 0 && result.parsed.length === 0) {
      setParseError(result.errors.join(', '));
      setParsedData([]);
      return;
    }

    const validation = ParserService.validateParsedData(result.parsed);
    
    if (validation.invalid.length > 0) {
      setParseError(`${validation.invalid.length} items have issues. Showing ${validation.valid.length} valid items.`);
    } else {
      setParseError('');
    }

    setParsedData(validation.valid);
  };

  const handleGenerate = () => {
    const items: GeneratorFormData[] = parsedData.map(data => ({
      websiteName: data.websiteName,
      websiteDescription: data.websiteDescription,
      articleType: defaultSettings.articleType,
      articleLength: defaultSettings.articleLength,
      toneOfVoice: defaultSettings.toneOfVoice,
      language: defaultSettings.language,
      includeTables: true,
      includeImages: false,
    }));

    onGenerate(items);
  };

  const examples = ParserService.getExampleFormats();

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
      
        <div className="relative z-10 p-8 sm:p-12">
        <div className="flex items-start gap-8 mb-8">
          {/* Icon Section */}
          <div className="relative flex-shrink-0">
            <div className="w-24 h-24 bg-white border-4 border-black relative overflow-hidden group">
              <div className="absolute inset-0 bg-black transform scale-0 group-hover:scale-100 transition-transform duration-500 origin-center" />
              <Clipboard className="absolute inset-0 m-auto w-12 h-12 group-hover:text-primary transition-colors z-10" strokeWidth={2} />
            </div>
            <div className="absolute -top-3 -right-3 w-8 h-8 bg-primary border-4 border-black rotate-45" />
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-black" />
          </div>
          
          {/* Title Section */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-8 bg-black" />
              <span className="text-xs font-black uppercase tracking-widest text-gray-500">Smart Paste</span>
            </div>
            <h2 className="text-5xl sm:text-6xl font-black tracking-tight mb-4 leading-none">
              Intelligent<br/>
              <span className="text-primary">Bulk Import</span>
            </h2>
            <p className="text-lg font-medium text-gray-700 mb-6 max-w-2xl">
              Drop 50-200 websites in any format. Our AI parser handles CSV, JSON, plain text, or mixed formats instantly.
            </p>
            
            {/* Stats Bar */}
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-black" />
                <span className="text-sm font-black">Multi-Format</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary" />
                <span className="text-sm font-black">Auto-Detect</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-black" />
                <span className="text-sm font-black">Instant Parse</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mb-8">
          <button
            onClick={() => setShowExamples(!showExamples)}
            className="relative px-6 py-3 border-2 border-black bg-white hover:bg-black hover:text-white transition-all font-bold text-sm flex items-center gap-2 group overflow-hidden"
          >
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform" />
            <FileText className="w-4 h-4" />
            {showExamples ? 'Hide' : 'Show'} Format Examples
          </button>
        </div>
      </div>

      {showExamples && (
        <div className="border-b-4 border-black p-6 bg-gray-50">
          <h3 className="font-black text-lg mb-4">Supported Formats:</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(examples).map(([format, example]) => (
              <div key={format} className="bg-white border-3 border-black p-4">
                <p className="font-black text-sm mb-2 text-primary">{format}</p>
                <pre className="text-xs font-mono bg-gray-100 p-3 border-2 border-gray-300 overflow-x-auto">
                  {example}
                </pre>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="p-6">
        {/* Paste Area */}
        <div className="mb-6">
          <label className="block font-black text-sm uppercase mb-3">
            Paste Your Data (CSV, JSON, Text, or Mixed)
          </label>
          <textarea
            value={pasteInput}
            onChange={(e) => setPasteInput(e.target.value)}
            placeholder="Paste your websites here... Supports CSV, JSON, tab-separated, or simple text format"
            className="w-full h-64 px-4 py-3 border-4 border-black font-mono text-sm resize-none focus:outline-none focus:shadow-brutal"
          />
          <div className="mt-3 flex items-center justify-between">
            <p className="text-xs font-bold text-gray-600">
              {pasteInput.split('\n').filter(l => l.trim()).length} lines detected
            </p>
            <button
              onClick={handleParse}
              className="px-6 py-3 bg-black text-primary border-4 border-black font-black uppercase hover:bg-primary hover:text-black transition-colors flex items-center gap-2"
            >
              <FileText className="w-5 h-5" />
              Parse Data
            </button>
          </div>
        </div>

        {/* Parse Error */}
        {parseError && (
          <div className="mb-6 p-4 bg-yellow-100 border-3 border-yellow-500 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-700 flex-shrink-0 mt-0.5" />
            <p className="font-bold text-sm text-yellow-900">{parseError}</p>
          </div>
        )}

        {/* Parsed Results */}
        {parsedData.length > 0 && (
          <>
            <div className="mb-6 p-6 bg-green-50 border-4 border-green-500">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <h3 className="font-black text-xl">Successfully Parsed {parsedData.length} Websites!</h3>
              </div>
              
              {/* Default Settings */}
              <div className="bg-white border-3 border-black p-4 mb-4">
                <p className="font-black text-sm uppercase mb-3">Apply These Settings to All:</p>
                <div className="grid md:grid-cols-4 gap-3">
                  <select
                    value={defaultSettings.articleType}
                    onChange={(e) => setDefaultSettings({ ...defaultSettings, articleType: e.target.value as ArticleType })}
                    className="px-3 py-2 border-3 border-black font-bold text-sm"
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
                  <select
                    value={defaultSettings.articleLength}
                    onChange={(e) => setDefaultSettings({ ...defaultSettings, articleLength: e.target.value as ArticleLength })}
                    className="px-3 py-2 border-3 border-black font-bold text-sm"
                  >
                    <option value="short">Short</option>
                    <option value="medium">Medium</option>
                    <option value="long">Long</option>
                    <option value="extra-long">Extra Long</option>
                  </select>
                  <select
                    value={defaultSettings.toneOfVoice}
                    onChange={(e) => setDefaultSettings({ ...defaultSettings, toneOfVoice: e.target.value as ToneOfVoice })}
                    className="px-3 py-2 border-3 border-black font-bold text-sm"
                  >
                    <option value="professional">Professional</option>
                    <option value="neutral">Neutral</option>
                    <option value="friendly">Friendly</option>
                    <option value="authoritative">Authoritative</option>
                    <option value="conversational">Conversational</option>
                    <option value="technical">Technical</option>
                  </select>
                  <select
                    value={defaultSettings.language}
                    onChange={(e) => setDefaultSettings({ ...defaultSettings, language: e.target.value as Language })}
                    className="px-3 py-2 border-3 border-black font-bold text-sm"
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

              {/* Preview */}
              <div className="bg-white border-3 border-black p-4 max-h-64 overflow-y-auto">
                <p className="font-black text-sm uppercase mb-3">Preview (First 10):</p>
                <div className="space-y-2">
                  {parsedData.slice(0, 10).map((item, index) => (
                    <div key={index} className="p-3 bg-gray-50 border-2 border-gray-300">
                      <p className="font-black text-sm">{index + 1}. {item.websiteName}</p>
                      <p className="text-xs text-gray-600 mt-1">{item.websiteDescription.substring(0, 100)}...</p>
                    </div>
                  ))}
                  {parsedData.length > 10 && (
                    <p className="text-xs font-bold text-gray-500 text-center py-2">
                      ... and {parsedData.length - 10} more
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              className="relative w-full px-8 py-7 bg-black text-primary font-black text-xl uppercase overflow-hidden group flex items-center justify-center gap-3"
            >
              <div className="absolute inset-0 bg-primary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              <div className="absolute top-0 left-0 w-full h-2 bg-primary" />
              <div className="absolute bottom-0 right-0 w-2 h-full bg-primary" />
              <FileText className="w-7 h-7 relative z-10 group-hover:text-black transition-colors" />
              <span className="relative z-10 group-hover:text-black transition-colors">Generate {parsedData.length} Articles</span>
            </button>
          </>
        )}
        </div>
      </div>
    </div>
  );
}
