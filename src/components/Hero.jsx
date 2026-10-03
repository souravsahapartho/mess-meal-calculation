import React from 'react';
import { Calculator, FileText, Image as ImageIcon } from 'lucide-react';

export const Hero = ({ onStartClick }) => {
  return (
    <section className="pt-6 pb-8 sm:pt-10 sm:pb-12 px-4 sm:px-6 lg:px-8 text-center max-w-4xl w-full mx-auto">
      <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.2]">
        Monthly Mess Meal Calculation,{' '}
        <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-500 bg-clip-text text-transparent">
          Simplified.
        </span>
      </h1>

      <p className="mt-3.5 sm:mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
        Track grocery spending, calculate individual meal costs & balances, and download clean PDF & Image reports in seconds.
      </p>

      {/* Feature Badges */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-slate-600 dark:text-slate-400">
        <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
          <Calculator className="w-3.5 h-3.5 text-emerald-500" /> Automatic Settlement
        </span>
        <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
          <FileText className="w-3.5 h-3.5 text-teal-500" /> Professional PDF
        </span>
        <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
          <ImageIcon className="w-3.5 h-3.5 text-sky-500" /> Shareable Image
        </span>
      </div>
    </section>
  );
};
