import { useState } from 'react';
import { Plus, Trash2, Upload, Loader2 } from 'lucide-react';
import { GeneratorFormData, BulkGenerationJob } from '../types';
import { generateBulkArticles } from '../services/aiService';
import { StorageService } from '../services/storageService';

interface BulkGeneratorProps {
  onComplete: (job: BulkGenerationJob) => void;
}

export default function BulkGenerator({ onComplete }: BulkGeneratorProps) {
  const [items, setItems] = useState<Partial<GeneratorFormData>[]>([
    { websiteName: '', websiteDescription: '', articleType: 'guide', articleLength: 'medium', toneOfVoice: 'professional', language: 'english' }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });

  const addItem = () => {
    setItems([...items, { 
      websiteName: '', 
      websiteDescription: '', 
      articleType: 'guide', 
      articleLength: 'medium', 
      toneOfVoice: 'professional', 
      language: 'english' 
    }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: keyof GeneratorFormData, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const handleGenerate = async () => {
    const validItems = items.filter(item => 
      item.websiteName?.trim() && item.websiteDescription?.trim()
    ) as GeneratorFormData[];

    if (validItems.length === 0) {
      alert('Please fill in at least one valid item');
      return;
    }

    const job: BulkGenerationJob = {
      id: `job-${Date.now()}`,
      items: validItems,
      status: 'processing',
      progress: 0,
      results: [],
      errors: [],
      createdAt: new Date().toISOString()
    };

    setIsProcessing(true);
    setProgress({ current: 0, total: validItems.length });

    try {
      const { results, errors } = await generateBulkArticles(validItems, (current, total) => {
        setProgress({ current, total });
        job.progress = (current / total) * 100;
        StorageService.saveJob(job);
      });

      job.results = results;
      job.errors = errors;
      job.status = errors.length === validItems.length ? 'failed' : 'completed';
      job.completedAt = new Date().toISOString();
      job.progress = 100;

      // Save all articles
      results.forEach(article => StorageService.saveArticle(article));
      StorageService.saveJob(job);

      onComplete(job);
    } catch (error) {
      job.status = 'failed';
      job.errors.push(error instanceof Error ? error.message : 'Unknown error');
      StorageService.saveJob(job);
    } finally {
      setIsProcessing(false);
    }
  };

  const importCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const lines = text.split('\n').filter(line => line.trim());
      const headers = lines[0].split(',').map(h => h.trim());
      
      const imported = lines.slice(1).map(line => {
        const values = line.split(',').map(v => v.trim());
        const item: Partial<GeneratorFormData> = {};
        headers.forEach((header, i) => {
          if (header === 'websiteName') item.websiteName = values[i];
          if (header === 'websiteDescription') item.websiteDescription = values[i];
          if (header === 'articleType') item.articleType = values[i] as any;
          if (header === 'articleLength') item.articleLength = values[i] as any;
          if (header === 'toneOfVoice') item.toneOfVoice = values[i] as any;
        });
        return item;
      });

      setItems(imported);
    };
    reader.readAsText(file);
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
      
        <div className="relative z-10 p-8 sm:p-12">
        {/* Header Section */}
        <div className="mb-10">
          <div className="flex items-start justify-between gap-8 mb-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-1 w-16 bg-black" />
                <span className="text-xs font-black uppercase tracking-widest text-gray-500">Manual Bulk</span>
              </div>
              <h2 className="text-5xl sm:text-6xl font-black tracking-tight mb-5 leading-none">
                Structured<br/>
                <span className="relative inline-block">
                  Mass Production
                  <div className="absolute -bottom-2 left-0 w-3/4 h-1 bg-primary" />
                </span>
              </h2>
              <p className="text-lg font-medium text-gray-700 max-w-2xl">
                Build your content pipeline manually or import from CSV. Perfect for organized, systematic content generation.
              </p>
            </div>
            
            {/* Upload Section */}
            <div className="flex-shrink-0">
              <label className="relative block w-32 h-32 border-4 border-black bg-white hover:bg-black group cursor-pointer overflow-hidden transition-all">
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                  <Upload className="w-10 h-10 mb-2 text-black group-hover:text-white transition-colors" />
                  <span className="text-xs font-black uppercase text-center text-black group-hover:text-white transition-colors">Import<br/>CSV</span>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-0 bg-black group-hover:h-full transition-all duration-300" />
                <input type="file" accept=".csv" onChange={importCSV} className="hidden" />
              </label>
            </div>
          </div>
          
          {/* Feature Pills */}
          <div className="flex gap-3 flex-wrap">
            <div className="px-4 py-2 bg-black text-white text-xs font-black uppercase flex items-center gap-2">
              <div className="w-2 h-2 bg-primary" />
              CSV Import
            </div>
            <div className="px-4 py-2 bg-black text-white text-xs font-black uppercase flex items-center gap-2">
              <div className="w-2 h-2 bg-primary" />
              Manual Entry
            </div>
            <div className="px-4 py-2 bg-black text-white text-xs font-black uppercase flex items-center gap-2">
              <div className="w-2 h-2 bg-primary" />
              Batch Control
            </div>
          </div>
        </div>

      {isProcessing && (
        <div className="mb-6 bg-primary/20 border-4 border-black p-6">
          <div className="flex items-center gap-4 mb-4">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span className="font-black text-lg">Processing: {progress.current} / {progress.total}</span>
          </div>
          <div className="w-full h-4 bg-white border-3 border-black">
            <div 
              className="h-full bg-black transition-all duration-300"
              style={{ width: `${(progress.current / progress.total) * 100}%` }}
            />
          </div>
        </div>
      )}

      <div className="space-y-4 mb-6">
        {items.map((item, index) => (
          <div key={index} className="border-4 border-black p-6 bg-white shadow-brutal-sm">
            <div className="flex items-start justify-between mb-4">
              <span className="font-black text-lg">Item {index + 1}</span>
              <button
                onClick={() => removeItem(index)}
                className="p-2 border-3 border-black hover:bg-red-500 hover:text-white transition-colors"
                disabled={isProcessing}
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Website Name"
                value={item.websiteName || ''}
                onChange={(e) => updateItem(index, 'websiteName', e.target.value)}
                className="px-4 py-3 border-3 border-black font-bold bg-white"
                disabled={isProcessing}
              />
              <input
                type="text"
                placeholder="Website Description"
                value={item.websiteDescription || ''}
                onChange={(e) => updateItem(index, 'websiteDescription', e.target.value)}
                className="px-4 py-3 border-3 border-black font-bold bg-white"
                disabled={isProcessing}
              />
              <select
                value={item.articleType || 'guide'}
                onChange={(e) => updateItem(index, 'articleType', e.target.value)}
                className="px-4 py-3 border-3 border-black font-bold bg-white"
                disabled={isProcessing}
              >
                <option value="review">Review</option>
                <option value="guide">Guide</option>
                <option value="about">About</option>
                <option value="tool-overview">Tool Overview</option>
                <option value="listicle">Listicle</option>
                <option value="comparison">Comparison</option>
                <option value="tutorial">Tutorial</option>
              </select>
              <select
                value={item.articleLength || 'medium'}
                onChange={(e) => updateItem(index, 'articleLength', e.target.value)}
                className="px-4 py-3 border-3 border-black font-bold bg-white"
                disabled={isProcessing}
              >
                <option value="short">Short</option>
                <option value="medium">Medium</option>
                <option value="long">Long</option>
                <option value="extra-long">Extra Long</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <button
          onClick={addItem}
          className="px-6 py-4 border-4 border-black bg-white hover:bg-gray-800 hover:text-white transition-colors font-black uppercase flex items-center gap-2"
          disabled={isProcessing}
        >
          <Plus className="w-5 h-5" />
          Add Item
        </button>
        <button
          onClick={handleGenerate}
          className="relative flex-1 px-8 py-5 bg-black text-primary font-black uppercase overflow-hidden group disabled:opacity-50"
          disabled={isProcessing || items.length === 0}
        >
          <div className="absolute inset-0 bg-white transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          <div className="absolute top-0 left-0 w-2 h-full bg-primary" />
          <div className="absolute bottom-0 right-0 w-full h-2 bg-primary" />
          <span className="relative z-10 group-hover:text-black transition-colors">
            {isProcessing ? 'Generating...' : `Generate ${items.length} Articles`}
          </span>
        </button>
        </div>
        </div>
      </div>
    </div>
  );
}
