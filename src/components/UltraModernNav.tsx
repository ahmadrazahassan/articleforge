import { FileText, Clipboard, Grid3x3, Layers, Library } from 'lucide-react';

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
    icon: React.ReactNode;
    color: string;
    stats?: string;
  }> = [
    {
      id: 'single',
      label: 'Single',
      description: 'Generate one article with full customization',
      icon: <FileText className="w-8 h-8" strokeWidth={1.5} />,
      color: 'from-blue-50 to-blue-100',
    },
    {
      id: 'smart-paste',
      label: 'Smart Paste',
      description: 'Paste 50-200 websites in any format',
      icon: <Clipboard className="w-8 h-8" strokeWidth={1.5} />,
      color: 'from-purple-50 to-purple-100',
    },
    {
      id: 'category',
      label: 'AI Category',
      description: 'AI generates unique articles by category',
      icon: <Grid3x3 className="w-8 h-8" strokeWidth={1.5} />,
      color: 'from-green-50 to-green-100',
    },
    {
      id: 'bulk',
      label: 'Manual Bulk',
      description: 'Add items manually with full control',
      icon: <Layers className="w-8 h-8" strokeWidth={1.5} />,
      color: 'from-orange-50 to-orange-100',
    },
    {
      id: 'library',
      label: 'Library',
      description: `Manage and organize ${articleCount} articles`,
      icon: <Library className="w-8 h-8" strokeWidth={1.5} />,
      color: 'from-red-50 to-red-100',
      stats: articleCount.toString(),
    },
  ];

  return (
    <div className="w-full">
      {/* Desktop Grid Navigation */}
      <div className="hidden md:block">
        <div className="grid grid-cols-5 gap-4 p-8 bg-white border-b-4 border-black">
          {modes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => onModeChange(mode.id)}
              className={`relative group transition-all duration-300 ${
                currentMode === mode.id ? 'scale-105' : 'hover:scale-102'
              }`}
            >
              {/* Card Background */}
              <div
                className={`absolute inset-0 border-4 transition-all duration-300 ${
                  currentMode === mode.id
                    ? 'border-black bg-black'
                    : 'border-black bg-white group-hover:bg-gray-50'
                }`}
              />

              {/* Card Content */}
              <div className="relative p-6 text-left">
                {/* Icon */}
                <div
                  className={`mb-4 transition-colors duration-300 ${
                    currentMode === mode.id ? 'text-primary' : 'text-black'
                  }`}
                >
                  {mode.icon}
                </div>

                {/* Label */}
                <h3
                  className={`font-black text-lg uppercase tracking-wide mb-2 transition-colors duration-300 ${
                    currentMode === mode.id ? 'text-primary' : 'text-black'
                  }`}
                >
                  {mode.label}
                </h3>

                {/* Description */}
                <p
                  className={`text-xs font-medium leading-tight transition-colors duration-300 ${
                    currentMode === mode.id ? 'text-primary/80' : 'text-gray-600'
                  }`}
                >
                  {mode.description}
                </p>

                {/* Stats Badge */}
                {mode.stats && (
                  <div
                    className={`mt-4 inline-block px-3 py-1 border-2 font-black text-sm transition-colors duration-300 ${
                      currentMode === mode.id
                        ? 'border-primary bg-primary text-black'
                        : 'border-black bg-white text-black'
                    }`}
                  >
                    {mode.stats}
                  </div>
                )}

                {/* Active Indicator */}
                {currentMode === mode.id && (
                  <div className="absolute top-2 right-2 w-3 h-3 bg-primary border-2 border-primary" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Carousel Navigation */}
      <div className="md:hidden overflow-x-auto border-b-4 border-black bg-white">
        <div className="flex gap-3 p-4 min-w-min">
          {modes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => onModeChange(mode.id)}
              className={`flex-shrink-0 w-40 px-4 py-3 border-4 transition-all ${
                currentMode === mode.id
                  ? 'border-black bg-black text-primary'
                  : 'border-black bg-white text-black'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                {mode.icon}
                <span className="font-black text-sm uppercase">{mode.label}</span>
              </div>
              <p className="text-xs font-medium text-left">{mode.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
