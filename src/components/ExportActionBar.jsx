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
    <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-teal-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-emerald-500/30 mb-10 transition-all">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold mb-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Calculation Complete & Verified
          </div>
          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            Export & Share Your Monthly Report
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-lg">
            Download high-definition A4 PDF or crisp shareable PNG/JPG image ready for WhatsApp, Messenger & Email.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenPreview}
            className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Eye className="w-4 h-4 text-emerald-300" />
            <span>Preview Report</span>
          </button>

          <button
            type="button"
            onClick={onDownloadPDF}
            disabled={isPdfLoading}
            className="px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30 transition-all cursor-pointer disabled:opacity-50"
          >
            <FileText className="w-4 h-4" />
            <span>{isPdfLoading ? 'Generating PDF...' : 'Download PDF'}</span>
          </button>

          <button
            type="button"
            onClick={onDownloadImage}
            disabled={isImageLoading}
            className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
          >
            <ImageIcon className="w-4 h-4 text-sky-400" />
            <span>{isImageLoading ? 'Preparing...' : 'Download Image'}</span>
          </button>
        </div>
      </div>

      <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onEditCalculation}
            className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white font-semibold underline underline-offset-4"
          >
            <Edit3 className="w-3.5 h-3.5" /> Edit Inputs / Recalculate
          </button>
        </div>

        <button
          type="button"
          onClick={onNewMonth}
          className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-bold hover:underline"
        >
          <PlusCircle className="w-4 h-4" /> + Start New Month Calculation
        </button>
      </div>
    </div>
  );
};
