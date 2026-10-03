import React from 'react';
import { FileText, Image as ImageIcon, Eye, Edit3, PlusCircle, CheckCircle2 } from 'lucide-react';

export const ExportActionBar = ({
  onDownloadPDF,
  onDownloadImage,
  onOpenPreview,
  onEditCalculation,
  onNewMonth,
  isPdfLoading,
  isImageLoading
}) => {
  return (
    <div className="bg-gradient-to-br from-emerald-50 via-teal-50/70 to-emerald-100/60 dark:bg-gradient-to-r dark:from-emerald-950/80 dark:via-slate-900 dark:to-teal-950 text-slate-900 dark:text-white rounded-3xl p-6 sm:p-8 shadow-card border border-emerald-200 dark:border-emerald-800/60 mb-10 transition-all w-full">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-300 dark:border-emerald-400/30 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            Calculation Complete
          </div>
          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            Export & Share Your Monthly Report
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-lg">
            Download high-definition A4 PDF or crisp shareable PNG/JPG image ready for WhatsApp, Messenger & Telegram.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenPreview}
            className="px-5 py-3 rounded-2xl bg-white dark:bg-white/10 hover:bg-slate-100 dark:hover:bg-white/20 border border-slate-200 dark:border-white/20 text-slate-800 dark:text-white font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
          >
            <Eye className="w-4 h-4 text-emerald-600 dark:text-emerald-300" />
            <span>Preview Report</span>
          </button>

          <button
            type="button"
            onClick={onDownloadPDF}
            disabled={isPdfLoading}
            className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all cursor-pointer disabled:opacity-50"
          >
            <FileText className="w-4 h-4" />
            <span>{isPdfLoading ? 'Generating PDF...' : 'Download PDF'}</span>
          </button>

          <button
            type="button"
            onClick={onDownloadImage}
            disabled={isImageLoading}
            className="px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-sm border border-slate-800 dark:border-slate-700 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 shadow-sm"
          >
            <ImageIcon className="w-4 h-4 text-sky-400" />
            <span>{isImageLoading ? 'Preparing...' : 'Download Image'}</span>
          </button>
        </div>
      </div>

      {/* Secondary Controls */}
      <div className="mt-6 pt-5 border-t border-emerald-200/80 dark:border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onEditCalculation}
            className="inline-flex items-center gap-1.5 text-slate-700 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-white font-semibold underline underline-offset-4 cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" /> Edit Inputs / Recalculate
          </button>
        </div>

        <button
          type="button"
          onClick={onNewMonth}
          className="inline-flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 font-bold hover:underline cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" /> + Start New Month Calculation
        </button>
      </div>
    </div>
  );
};
