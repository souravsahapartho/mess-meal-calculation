import React from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

export const ToastContainer = ({ toasts, onRemove }) => {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2.5 max-w-sm w-full px-4 sm:px-0 pointer-events-none">
      {toasts.map((toast) => {
        let bgColor = 'bg-slate-900 text-white border-slate-700';
        let icon = <Info className="w-5 h-5 text-sky-400 shrink-0" />;
        let borderColor = 'border-slate-700/70';

        if (toast.type === 'success') {
          bgColor = 'bg-emerald-900 text-emerald-50 border-emerald-500/50';
          icon = <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />;
        } else if (toast.type === 'error') {
          bgColor = 'bg-rose-900 text-rose-50 border-rose-500/50';
          icon = <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />;
        } else if (toast.type === 'warning') {
          bgColor = 'bg-amber-900 text-amber-50 border-amber-500/50';
          icon = <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />;
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-2xl shadow-2xl border backdrop-blur-xl transition-all duration-300 transform translate-y-0 animate-slide-in ${bgColor} ${borderColor}`}
            role="alert"
          >
            {icon}
            <div className="flex-1 text-sm font-semibold leading-snug">
              {toast.message}
            </div>
            <button
              onClick={() => onRemove(toast.id)}
              className="p-1 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
