import { useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  id: string;
  type: ToastType;
  message: string;
  description?: string;
  duration?: number;
  onClose: (id: string) => void;
}

export default function Toast({ id, type, message, description, duration = 5000, onClose }: ToastProps) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose(id);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [id, duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5" strokeWidth={2} />;
      case 'error':
        return <XCircle className="w-5 h-5" strokeWidth={2} />;
      case 'warning':
        return <AlertCircle className="w-5 h-5" strokeWidth={2} />;
      case 'info':
        return <Info className="w-5 h-5" strokeWidth={2} />;
    }
  };

  const getColors = () => {
    switch (type) {
      case 'success':
        return 'bg-secondary text-darkgreen border-success';
      case 'error':
        return 'bg-red-100 text-red-900 border-red-600';
      case 'warning':
        return 'bg-yellow-100 text-yellow-900 border-yellow-600';
      case 'info':
        return 'bg-accent text-white border-accent';
    }
  };

  return (
    <div
      className={`flex items-start gap-3 p-4 border-3 shadow-brutal-sm ${getColors()} min-w-[320px] max-w-md animate-slide-in`}
    >
      <div className="flex-shrink-0 mt-0.5">{getIcon()}</div>
      <div className="flex-1 min-w-0">
        <p className="font-bold text-sm">{message}</p>
        {description && <p className="text-xs mt-1 opacity-90">{description}</p>}
      </div>
      <button
        onClick={() => onClose(id)}
        className="flex-shrink-0 p-1 hover:opacity-70 transition-opacity"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" strokeWidth={2} />
      </button>
    </div>
  );
}
