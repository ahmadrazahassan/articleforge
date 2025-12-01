import { X, Download, FileText, FileCode, FileJson, Globe, FileType } from 'lucide-react';
import { GeneratedArticle, ExportFormat } from '../types';
import { ExportService } from '../services/exportService';

interface ExportModalProps {
  article: GeneratedArticle;
  onClose: () => void;
}

export default function ExportModal({ article, onClose }: ExportModalProps) {
  const exportOptions: { format: ExportFormat; icon: any; label: string; description: string }[] = [
    { format: 'html', icon: FileCode, label: 'HTML', description: 'Clean HTML5 document' },
    { format: 'markdown', icon: FileText, label: 'Markdown', description: 'Markdown format for docs' },
    { format: 'json', icon: FileJson, label: 'JSON', description: 'Structured data format' },
    { format: 'wordpress', icon: Globe, label: 'WordPress XML', description: 'Import to WordPress' },
    { format: 'pdf-ready', icon: FileType, label: 'PDF Ready', description: 'Print-optimized HTML' },
  ];

  const handleExport = (format: ExportFormat) => {
    ExportService.exportArticle(article, format);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white border-4 border-black shadow-brutal-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="border-b-4 border-black p-6 flex items-center justify-between sticky top-0 bg-white">
          <h3 className="text-2xl font-black">Export Article</h3>
          <button
            onClick={onClose}
            className="p-2 border-3 border-black hover:bg-red-500 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6 bg-primary/10 border-3 border-black p-4">
            <p className="font-black text-sm">{article.title}</p>
            <p className="text-xs text-gray-600 mt-1">{article.category} • {article.wordCount} words</p>
          </div>

          <div className="grid gap-4">
            {exportOptions.map(({ format, icon: Icon, label, description }) => (
              <button
                key={format}
                onClick={() => handleExport(format)}
                className="flex items-center gap-4 p-6 border-4 border-black bg-white hover:bg-primary hover:shadow-brutal transition-all text-left"
              >
                <div className="w-12 h-12 bg-black text-primary border-3 border-black flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6" strokeWidth={2.5} />
                </div>
                <div className="flex-1">
                  <p className="font-black text-lg mb-1">{label}</p>
                  <p className="text-sm text-gray-600">{description}</p>
                </div>
                <Download className="w-6 h-6 flex-shrink-0" />
              </button>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gray-50 border-3 border-black">
            <p className="text-xs font-bold text-gray-700">
              💡 Tip: Use WordPress XML for direct import, Markdown for documentation, and PDF Ready for printing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
