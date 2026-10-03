import React from 'react';
import { Calculator, FileText, Image as ImageIcon, Zap } from 'lucide-react';

export const Hero = ({ onStartClick, onManageMembers }) => {
  return (
    <section className="pt-8 pb-10 sm:pt-12 sm:pb-14 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto">
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm font-semibold mb-6 shadow-sm">
        <Zap className="w-4 h-4 text-emerald-600 dark:text-emerald-400 fill-emerald-500/20" />
        Zero Server Storage • 100% Client-Side Private • Instant Calculation
      </div>

      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
        Your Monthly Meal Calculation,{' '}
        <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-500 bg-clip-text text-transparent">
          Simplified.
        </span>
      </h1>

      <p className="mt-4 sm:mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
        Track bazar contributions, calculate precise meal rates, settle who pays or gets money back, and export professional PDF & Image reports in seconds.
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800">
          <Calculator className="w-4 h-4 text-emerald-500" /> Auto-Balanced Settlement
        </span>
        <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800">
          <FileText className="w-4 h-4 text-teal-500" /> A4 Multi-Page PDF
        </span>
        <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800">
          <ImageIcon className="w-4 h-4 text-sky-500" /> HD Shareable Image
        </span>
      </div>
    </section>
  );
};
