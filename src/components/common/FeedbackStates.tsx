import React from 'react';
import { Inbox, Loader2, AlertTriangle } from 'lucide-react';

export const EmptyState: React.FC<{
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}> = ({ title, description, actionLabel, onAction, icon }) => (
  <div className="bg-white rounded-3xl p-8 text-center card-soft-shadow border border-[#5149B8]/10 my-4">
    <div className="w-14 h-14 rounded-2xl bg-[#5149B8]/10 text-[#5149B8] flex items-center justify-center mx-auto mb-4">
      {icon || <Inbox className="w-7 h-7" />}
    </div>
    <h3 className="text-lg font-bold text-[#202744] mb-1.5">{title}</h3>
    <p className="text-sm text-[#858BA1] max-w-md mx-auto mb-5 leading-relaxed">{description}</p>
    {actionLabel && onAction && (
      <button
        type="button"
        onClick={onAction}
        className="inline-flex items-center justify-center px-5 py-2.5 rounded-2xl bg-[#5149B8] hover:bg-[#433ba0] text-white text-sm font-semibold transition cursor-pointer"
      >
        {actionLabel}
      </button>
    )}
  </div>
);

export const LoadingState: React.FC<{ message?: string }> = ({
  message = 'Cargando información...',
}) => (
  <div className="bg-white rounded-3xl p-10 text-center card-soft-shadow border border-[#5149B8]/10 my-4 flex flex-col items-center justify-center">
    <Loader2 className="w-8 h-8 text-[#5149B8] animate-spin mb-3" />
    <p className="text-sm font-medium text-[#858BA1]">{message}</p>
  </div>
);

export const ErrorState: React.FC<{
  title?: string;
  message: string;
  onRetry?: () => void;
}> = ({ title = 'Ocurrió un inconveniente', message, onRetry }) => (
  <div className="bg-red-50/90 rounded-3xl p-6 text-center border border-red-200 my-4">
    <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-3">
      <AlertTriangle className="w-6 h-6" />
    </div>
    <h3 className="text-base font-bold text-red-900 mb-1">{title}</h3>
    <p className="text-sm text-red-700 max-w-md mx-auto mb-4">{message}</p>
    {onRetry && (
      <button
        type="button"
        onClick={onRetry}
        className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition cursor-pointer"
      >
        Intentar nuevamente
      </button>
    )}
  </div>
);
