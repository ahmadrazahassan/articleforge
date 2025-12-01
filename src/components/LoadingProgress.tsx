import { Loader2 } from 'lucide-react';

interface LoadingProgressProps {
  message?: string;
  progress?: number;
  total?: number;
  showPercentage?: boolean;
}

export default function LoadingProgress({ 
  message = 'Generating article...', 
  progress, 
  total,
  showPercentage = true 
}: LoadingProgressProps) {
  const percentage = progress !== undefined && total !== undefined 
    ? Math.round((progress / total) * 100) 
    : undefined;

  return (
    <div className="fixed inset-0 bg-darkgreen/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-background border-4 border-darkgreen shadow-brutal-lg p-8 max-w-md w-full">
        {/* Loading Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <Loader2 className="w-16 h-16 text-primary animate-spin" strokeWidth={2} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-primary rounded-full opacity-20 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Message */}
        <h3 className="text-xl font-black text-center text-darkgreen mb-2">
          {message}
        </h3>

        {/* Progress Info */}
        {progress !== undefined && total !== undefined && (
          <p className="text-sm font-bold text-center text-darkgreen/70 mb-4">
            {progress} of {total} completed
          </p>
        )}

        {/* Progress Bar */}
        {percentage !== undefined && (
          <div className="space-y-2">
            <div className="w-full h-3 bg-cream border-2 border-darkgreen overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300 ease-out"
                style={{ width: `${percentage}%` }}
              />
            </div>
            {showPercentage && (
              <p className="text-xs font-black text-center text-darkgreen">
                {percentage}%
              </p>
            )}
          </div>
        )}

        {/* Indeterminate Progress */}
        {percentage === undefined && (
          <div className="w-full h-3 bg-cream border-2 border-darkgreen overflow-hidden">
            <div className="h-full w-1/3 bg-primary animate-progress" />
          </div>
        )}

        {/* Status Text */}
        <p className="text-xs font-medium text-center text-darkgreen/60 mt-4">
          Please wait while we generate your content
        </p>
      </div>
    </div>
  );
}
