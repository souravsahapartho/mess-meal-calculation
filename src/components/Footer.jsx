import React from 'react';
import { Utensils, Trash2 } from 'lucide-react';

export const Footer = ({ onClearAllData }) => {
  return (
    <footer className="w-full border-t border-slate-200/80 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 py-8 px-4 sm:px-6 lg:px-8 transition-colors mt-auto">
      <div className="max-w-7xl w-full mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
            <Utensils className="w-3.5 h-3.5" />
          </div>
          <span className="font-extrabold text-slate-900 dark:text-white tracking-tight">
            MealMate
          </span>
          <span className="text-slate-400 font-medium">• Mess Meal Management</span>
        </div>

        <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400 font-medium">
          <button
            onClick={onClearAllData}
            className="hover:text-rose-500 transition-colors flex items-center gap-1 font-semibold"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear Stored Data
          </button>
        </div>
      </div>
    </footer>
  );
};
