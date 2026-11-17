import React from 'react';
import { GoogleIcon } from './GoogleIcon';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

export function ToastStack({
  toasts,
  onDismiss,
}: {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}) {
  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0"
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto glass-panel rounded-2xl px-4 py-3.5 flex items-start gap-3 transition-all duration-150 shadow-xl border-pink-200/80 bg-white/95"
          role="status"
        >
          {toast.type === 'error' ? (
            <GoogleIcon name="error" size={18} className="text-pink-600 shrink-0 mt-0.5" filled />
          ) : toast.type === 'info' ? (
            <GoogleIcon name="info" size={18} className="text-pink-600 shrink-0 mt-0.5" filled />
          ) : (
            <GoogleIcon name="check_circle" size={18} className="text-pink-600 shrink-0 mt-0.5" filled />
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-slate-900 leading-snug">{toast.title}</p>
            {toast.description && (
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{toast.description}</p>
            )}
          </div>
          <button
            type="button"
            onClick={() => onDismiss(toast.id)}
            aria-label="Dismiss notification"
            className="text-slate-400 hover:text-slate-900 p-1 rounded transition-colors shrink-0 cursor-pointer"
          >
            <GoogleIcon name="close" size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}