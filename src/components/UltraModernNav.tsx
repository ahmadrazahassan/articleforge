type ViewMode = 'single' | 'smart-paste' | 'category' | 'bulk' | 'library';

interface UltraModernNavProps {
  currentMode: ViewMode;
  onModeChange: (mode: ViewMode) => void;
  articleCount: number;
}

export default function UltraModernNav({ currentMode, onModeChange, articleCount }: UltraModernNavProps) {
  const modes: Array<{
    id: ViewMode;
    label: string;
    description: string;
    number: string;
  }> = [
    {
      id: 'single',
      label: 'Single',
      description: 'One article, full control',
      number: '01',
    },
    {
      id: 'smart-paste',
      label: 'Smart Paste',
      description: 'Bulk import, any format',
      number: '02',
    },
    {
      id: 'category',
      label: 'AI Category',
      description: 'Auto-generate by topic',
      number: '03',
    },
    {
      id: 'bulk',
      label: 'Manual Bulk',
      description: 'Manual entry, batch mode',
      number: '04',
    },
    {
      id: 'library',
      label: 'Library',
      description: `${articleCount} articles stored`,
      number: '05',
    },
  ];

  return (
    <div 
      className="w-full px-4 sm:px-6 lg:px-8 mb-12"
      style={{ fontFamily: "'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Desktop Horizontal List */}
        <div className="hidden md:block">
          <div className="space-y-1">
            {modes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => onModeChange(mode.id)}
                className={`w-full group border-t transition-all ${
                  currentMode === mode.id 
                    ? 'border-black bg-black/5' 
                    : 'border-black/10 hover:border-black/30 hover:bg-black/5'
                }`}
              >
                <div className="py-8 flex items-center gap-8">
                  {/* Number */}
                  <div className={`text-7xl font-black leading-none transition-colors ${
                    currentMode === mode.id ? 'text-primary' : 'text-black/5 group-hover:text-black/10'
                  }`}>
                    {mode.number}
                  </div>

                  {/* Content */}
                  <div className="flex-1 text-left">
                    <h3 className={`text-3xl sm:text-4xl font-black leading-tight tracking-tight mb-2 transition-colors ${
                      currentMode === mode.id ? 'text-black' : 'text-black/70 group-hover:text-black'
                    }`}>
                      {mode.label}
                    </h3>
                    <p className="text-lg font-medium text-black/50">
                      {mode.description}
                    </p>
                  </div>

                  {/* Indicator */}
                  <div className={`w-12 h-12 border-2 flex items-center justify-center transition-all ${
                    currentMode === mode.id 
                      ? 'border-primary bg-primary' 
                      : 'border-black/10 group-hover:border-black/30'
                  }`}>
                    {currentMode === mode.id && (
                      <div className="w-3 h-3 bg-black" />
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Horizontal Scroll */}
        <div className="md:hidden overflow-x-auto">
          <div className="flex gap-3 pb-4">
            {modes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => onModeChange(mode.id)}
                className={`flex-shrink-0 w-64 border-2 p-6 transition-all ${
                  currentMode === mode.id
                    ? 'border-black bg-black text-primary'
                    : 'border-black/20 bg-white text-black hover:border-black/40'
                }`}
              >
                <div className={`text-5xl font-black mb-4 leading-none ${
                  currentMode === mode.id ? 'text-primary/20' : 'text-black/5'
                }`}>
                  {mode.number}
                </div>
                <h3 className="text-2xl font-black mb-2 leading-tight">
                  {mode.label}
                </h3>
                <p className={`text-sm font-medium ${
                  currentMode === mode.id ? 'text-primary/70' : 'text-black/60'
                }`}>
                  {mode.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
