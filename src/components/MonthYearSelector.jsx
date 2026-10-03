import React from 'react';
import { Calendar, RefreshCw } from 'lucide-react';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const MonthYearSelector = ({
  month,
  year,
  messName,
  onMonthChange,
  onYearChange,
  onMessNameChange,
  onNextMonthPreset
}) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 7 }, (_, i) => currentYear - 3 + i);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm transition-colors mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-4 mb-5">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            Period & Mess Configuration
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Select the billing month, year, and mess name for report branding
          </p>
        </div>

        {onNextMonthPreset && (
          <button
            type="button"
            onClick={onNextMonthPreset}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-200 dark:border-emerald-800/60 transition-colors self-start sm:self-auto"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Set Next Month
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
            Mess / Group Name
          </label>
          <div className="relative">
            <input
              type="text"
              value={messName}
              onChange={(e) => onMessNameChange(e.target.value)}
              placeholder="e.g. Green Mess, Padmapukur Mess"
              className="w-full bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
            Calculation Month <span className="text-rose-500">*</span>
          </label>
          <select
            value={month}
            onChange={(e) => onMonthChange(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all cursor-pointer"
          >
            {MONTHS.map((m) => (
              <option key={m} value={m} className="bg-white dark:bg-slate-900">
                {m}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
            Year <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <select
              value={year}
              onChange={(e) => onYearChange(parseInt(e.target.value, 10))}
              className="w-full bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all cursor-pointer"
            >
              {years.map((y) => (
                <option key={y} value={y} className="bg-white dark:bg-slate-900">
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
