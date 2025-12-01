import { useState, useEffect } from 'react';
import { FileText, Clipboard, Grid3x3, Layers, Library } from 'lucide-react';

type ViewMode = 'single' | 'smart-paste' | 'category' | 'bulk' | 'library';

interface ModernNavigationProps {
  currentMode: ViewMode;
  onModeChange: (mode: ViewMode) => void;
  articleCount: number;
}

export default function ModernNavigation({ currentMode, onModeChange, articleCount }: ModernNavigationProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const modes: Array<{
    id: ViewMode;
    label: string;
    description: string;
    icon: React.ReactNode;
    shortcut: string;
  }> = [
    {
      id: 'single',
      label: 'Single',
      description: 'Generate one article',
      icon: <FileText className="w-5 h-5" strokeWidth={1.5} />,
      shortcut: '1',
    },
    {
      id: 'smart-paste',
      label: 'Smart Paste',
      description: 'Paste 50-200 websites',
      icon: <Clipboard className="w-5 h-5" strokeWidth={1.5} />,
      shortcut: '2',
    },
    {
      id: 'category',
      label: 'AI Category',
      description: 'Generate by category',
      icon: <Grid3x3 className="w-5 h-5" strokeWidth={1.5} />,
      shortcut: '3',
    },
    {
      id: 'bulk',
      label: 'Manual Bulk',
      description: 'Add items manually',
      icon: <Layers className="w-5 h-5" strokeWidth={1.5} />,
      shortcut: '4',
    },
    {
      id: 'library',
      label: 'Library',
      description: `${articleCount} articles`,
      icon: <Library className="w-5 h-5" strokeWidth={1.5} />,
      shortcut: '5',
    },
  ];

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        const key = e.key;
        const modeMap: { [key: string]: ViewMode } = {
          '1': 'single',
          '2': 'smart-paste',
          '3': 'category',
          '4': 'bulk',
          '5': 'library',
        };
        if (modeMap[key]) {
          e.preventDefault();
          onModeChange(modeMap[key]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onModeChange]);

  return (
    <div className="relative">
      {/* Desktop Navigation - Horizontal Sidebar */}
      <div className="hidden lg:block fixed left-0 top-0 h-screen w-64 bg-white border-r-4 border-black pt-20 overflow-y-auto">
        <div className="p-6 space-y-2">
          <div className="mb-8">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-4">Navigation</h3>
            <div className="w-12 h-1 bg-black"></div>
          </div>

          <div className="space-y-3">
            {modes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => onModeChange(mode.id)}
                className={`w-full text-left px-6 py-4 border-4 transition-all duration-200 ${
                  currentMode === mode.id
                    ? 'border-black bg-black text-primary shadow-brutal'
                    : 'border-black bg-white hover:bg-gray-50 text-black'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={currentMode === mode.id ? 'text-primary' : 'text-black'}>
                    {mode.icon}
                  </div>
                  <span className="font-black text-sm uppercase tracking-wide">{mode.label}</span>
                </div>
                <p className="text-xs font-medium text-gray-600 ml-8">{mode.description}</p>
                <p className="text-xs font-bold text-gray-400 ml-8 mt-1">Ctrl+{mode.shortcut}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Bottom Sheet */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
        {isExpanded && (
          <div
            className="fixed inset-0 bg-black/30 z-40"
            onClick={() => setIsExpanded(false)}
          />
        )}

        <div
          className={`bg-white border-t-4 border-black transition-all duration-300 ${
            isExpanded ? 'max-h-96' : 'max-h-20'
          } overflow-hidden`}
        >
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full px-6 py-4 flex items-center justify-between border-b-4 border-black"
          >
            <span className="font-black text-lg uppercase">
              {modes.find(m => m.id === currentMode)?.label}
            </span>
            <div className={`w-6 h-6 border-2 border-black transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
              <div className="w-full h-full flex items-center justify-center">▼</div>
            </div>
          </button>

          {isExpanded && (
            <div className="grid grid-cols-2 gap-2 p-4">
              {modes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => {
                    onModeChange(mode.id);
                    setIsExpanded(false);
                  }}
                  className={`px-4 py-3 border-3 transition-all ${
                    currentMode === mode.id
                      ? 'border-black bg-black text-primary'
                      : 'border-black bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {mode.icon}
                    <span className="font-black text-xs uppercase">{mode.label}</span>
                  </div>
                  <p className="text-xs font-medium text-gray-600">{mode.description}</p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area - Adjusted for sidebar */}
      <div className="lg:ml-64">
        {/* Content will be rendered here */}
      </div>
    </div>
  );
}
