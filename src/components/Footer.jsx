import React from 'react';
import { Utensils, ShieldCheck, Trash2 } from 'lucide-react';

export const Footer = ({ onClearAllData }) => {
  return (
    <footer className="w-full border-t border-slate-200/80 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 py-10 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
              <Utensils className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-slate-900 dark:text-white tracking-tight">
              MealMate
            </span>
            <span className="text-xs text-slate-400 font-medium">• Mess Meal Manager</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>100% Client-Side Private • Data stays in your browser</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-600 dark:text-slate-400">
          <button
            onClick={onClearAllData}
            className="hover:text-rose-500 transition-colors flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear All Local Data
          </button>
          <span>•</span>
          <span>A4 Multi-Page PDF Supported</span>
          <span>•</span>
          <span>HD Image Export</span>
        </div>

        <p className="text-xs text-slate-400 dark:text-slate-500">
          Built for modern shared flats, messes & hostels.
        </p>
      </div>
    </footer>
  );
};
