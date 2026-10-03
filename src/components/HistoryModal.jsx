import React from 'react';
import { X, History, Trash2, ExternalLink, FileText } from 'lucide-react';
import { formatCurrency, formatNumber } from '../utils/currency';
import { generateMealPDF } from '../utils/pdfGenerator';
import { toast } from '../hooks/useToast';

export const HistoryModal = ({
  isOpen,
  onClose,
  history = [],
  onLoadHistoryItem,
  onDeleteHistoryItem
}) => {
  if (!isOpen) return null;

  const handleQuickDownloadPdf = async (item) => {
    try {
      toast.info('Generating PDF...');
      const filename = await generateMealPDF(item);
      toast.success(`PDF downloaded: ${filename}`);
    } catch {
      toast.error('Failed to generate PDF');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-fade-in flex flex-col max-h-[85vh]">
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Saved Calculation History
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Browse, reload, or download past monthly calculations
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 overflow-y-auto flex-1 divide-y divide-slate-100 dark:divide-slate-800">
          {history.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <History className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="text-base font-semibold text-slate-600 dark:text-slate-300">
                No past calculations found.
              </p>
              <p className="text-xs mt-1 text-slate-400">
                Calculations you perform will be saved locally in this browser.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/70 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-800 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-extrabold text-base text-slate-900 dark:text-white">
                        {item.month} {item.year}
                      </span>
                      <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
                        {item.messName}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-medium mt-1.5">
                      <span>Rate: <strong className="text-emerald-600 dark:text-emerald-400 font-bold">{formatCurrency(item.mealRate)}</strong></span>
                      <span>•</span>
                      <span>Total Bazar: <strong>{formatCurrency(item.totalBazar)}</strong></span>
                      <span>•</span>
                      <span>Meals: <strong>{formatNumber(item.totalMeals)}</strong></span>
                      <span>•</span>
                      <span>{item.memberCount} Members</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleQuickDownloadPdf(item)}
                      className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                      title="Download PDF"
                    >
                      <FileText className="w-3.5 h-3.5 text-emerald-600" />
                      <span>PDF</span>
                    </button>

                    <button
                      onClick={() => {
                        onLoadHistoryItem(item);
                        onClose();
                      }}
                      className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
                      title="Load into active view"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Open</span>
                    </button>

                    <button
                      onClick={() => onDeleteHistoryItem(item.id)}
                      className="p-2 rounded-xl text-rose-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                      title="Delete record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/70 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
