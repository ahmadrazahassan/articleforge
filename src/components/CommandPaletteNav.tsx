import { useState, useEffect } from 'react';
import { FileText, Clipboard, Grid3x3, Layers, Library, Search } from 'lucide-react';

type ViewMode = 'single' | 'smart-paste' | 'category' | 'bulk' | 'library';

interface CommandPaletteNavProps {
  currentMode: ViewMode;
  onModeChange: (mode: ViewMode) => void;
  articleCount: number;
}

export default function CommandPaletteNav({ currentMode, onModeChange, articleCount }: CommandPaletteNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const modes: Array<{
    id: ViewMode;
    label: string;
    description: string;
    icon: React.ReactNode;
    keywords: string[];
  }> = [
    {
      id: 'single',
      label: 'Single Article',
      description: 'Generate one article with full customization',
      icon: <FileText className="w-5 h-5" strokeWidth={1.5} />,
      keywords: ['single', 'one', 'article', 'generate'],
    },
    {
      id: 'smart-paste',
      label: 'Smart Paste',
      description: 'Paste 50-200 websites in any format',
      icon: <Clipboard className="w-5 h-5" strokeWidth={1.5} />,
      keywords: ['paste', 'smart', 'bulk', 'csv', 'json'],
    },
    {
      id: 'category',
      label: 'AI Category',
      description: 'AI generates unique articles by category',
      icon: <Grid3x3 className="w-5 h-5" strokeWidth={1.5} />,
      keywords: ['category', 'ai', 'auto', 'generate'],
    },
    {
      id: 'bulk',
      label: 'Manual Bulk',
      description: 'Add items manually with full control',
      icon: <Layers className="w-5 h-5" strokeWidth={1.5} />,
      keywords: ['bulk', 'manual', 'batch', 'multiple'],
    },
    {
      id: 'library',
      label: 'Article Library',
      description: `Manage and organize ${articleCount} articles`,
      icon: <Library className="w-5 h-5" strokeWidth={1.5} />,
      keywords: ['library', 'articles', 'manage', 'organize'],
    },
  ];

  const filteredModes = modes.filter(
    (mode) =>
      mode.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mode.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mode.keywords.some((k) => k.includes(searchTerm.toLowerCase()))
  );

  // Keyboard shortcut to open
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isOpen]);

  return (
    <>
      {/* Command Palette Trigger */}
      <div className="sticky top-0 z-40 bg-white border-b-4 border-black p-4">
        <button
          onClick={() => setIsOpen(true)}
          className="w-full max-w-2xl mx-auto px-6 py-3 border-4 border-black bg-white hover:bg-gray-50 transition-colors flex items-center gap-3 justify-between"
        >
          <div className="flex items-center gap-3">
            <Search className="w-5 h-5 text-gray-400" strokeWidth={1.5} />
            <span className="text-sm font-bold text-gray-500">
              {modes.find((m) => m.id === currentMode)?.label}
            </span>
          </div>
          <span className="text-xs font-black text-gray-400 bg-gray-100 px-2 py-1 border border-gray-300">
            Ctrl+K
          </span>
        </button>
      </div>

      {/* Command Palette Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsOpen(false)}
          />

          {/* Palette */}
          <div className="relative w-full max-w-2xl mx-4 border-4 border-black bg-white shadow-brutal-lg">
            {/* Search Input */}
            <div className="border-b-4 border-black p-6">
              <div className="flex items-center gap-3">
                <Search className="w-6 h-6 text-black" strokeWidth={1.5} />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search modes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 text-lg font-bold outline-none"
                />
              </div>
            </div>

            {/* Results */}
            <div className="max-h-96 overflow-y-auto">
              {filteredModes.length > 0 ? (
                filteredModes.map((mode, index) => (
                  <button
                    key={mode.id}
                    onClick={() => {
                      onModeChange(mode.id);
                      setIsOpen(false);
                      setSearchTerm('');
                    }}
                    className={`w-full text-left px-6 py-4 border-b-4 border-black transition-colors ${
                      currentMode === mode.id
                        ? 'bg-black text-primary'
                        : 'bg-white hover:bg-gray-50'
                    } ${index === filteredModes.length - 1 ? 'border-b-0' : ''}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={currentMode === mode.id ? 'text-primary' : 'text-black'}>
                        {mode.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-black text-base uppercase tracking-wide">
                          {mode.label}
                        </h3>
                        <p className={`text-sm font-medium ${
                          currentMode === mode.id ? 'text-primary/80' : 'text-gray-600'
                        }`}>
                          {mode.description}
                        </p>
                      </div>
                      {currentMode === mode.id && (
                        <div className="w-3 h-3 bg-primary border-2 border-primary" />
                      )}
                    </div>
                  </button>
                ))
              ) : (
                <div className="px-6 py-12 text-center">
                  <p className="font-black text-gray-400">No modes found</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t-4 border-black p-4 bg-gray-50 flex items-center justify-between text-xs font-bold text-gray-600">
              <div className="flex gap-4">
                <span>↑↓ Navigate</span>
                <span>Enter Select</span>
                <span>Esc Close</span>
              </div>
              <span>{filteredModes.length} results</span>
            </div>
          </div>
        </div>
      )}

      {/* Keyboard shortcut handler */}
      {isOpen && (
        <div
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setIsOpen(false);
              setSearchTerm('');
            }
          }}
        />
      )}
    </>
  );
}
