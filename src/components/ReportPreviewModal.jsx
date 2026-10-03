import React, { useRef, useState } from 'react';
import { X, FileText, Image as ImageIcon, Printer, Loader2, Sparkles } from 'lucide-react';
import { MealImageReport } from '../reports/MealImageReport';
import { generateMealPDF } from '../utils/pdfGenerator';
import { generateMealImage } from '../utils/imageGenerator';
import { toast } from '../hooks/useToast';

export const ReportPreviewModal = ({ isOpen, onClose, reportData }) => {
  const [imageFormat, setImageFormat] = useState('png');
  const [isPdfLoading, setIsPdfLoading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);

  const reportCaptureRef = useRef(null);

  if (!isOpen || !reportData) return null;

  const handleDownloadPDF = async () => {
    try {
      setIsPdfLoading(true);
      toast.info('Generating PDF report...');
      await new Promise(r => setTimeout(r, 100));
      const filename = await generateMealPDF(reportData);
      toast.success(`PDF downloaded: ${filename}`);
    } catch (err) {
      console.error('PDF error:', err);
      toast.error("We couldn't generate the PDF. Please try again.");
    } finally {
      setIsPdfLoading(false);
    }
  };

  const handleDownloadImage = async () => {
    try {
      setIsImageLoading(true);
      toast.info(`Preparing ${imageFormat.toUpperCase()} image...`);
      await new Promise(r => setTimeout(r, 150));
      const filename = await generateMealImage(reportCaptureRef.current, reportData, imageFormat);
      toast.success(`Image downloaded: ${filename}`);
    } catch (err) {
      console.error('Image export error:', err);
      toast.error("We couldn't generate the image. Please try again.");
    } finally {
      setIsImageLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 w-full max-w-5xl rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-fade-in my-auto">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-slate-950/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Monthly Report Preview & Export
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {reportData.messName} • {reportData.month} {reportData.year}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Controls */}
        <div className="p-3 sm:p-4 bg-emerald-50/50 dark:bg-emerald-950/20 border-b border-emerald-100 dark:border-emerald-900/30 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            Export high-definition report ready for WhatsApp & Messenger
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleDownloadPDF}
              disabled={isPdfLoading}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer"
            >
              {isPdfLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Generating PDF...</span>
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4" />
                  <span>Download PDF</span>
                </>
              )}
            </button>

            <div className="inline-flex items-center rounded-xl bg-slate-900 text-white dark:bg-slate-800 p-0.5 shadow-sm">
              <select
                value={imageFormat}
                onChange={(e) => setImageFormat(e.target.value)}
                className="bg-transparent text-white text-xs font-bold px-2 py-1.5 outline-none cursor-pointer border-r border-slate-700"
              >
                <option value="png" className="bg-slate-900 text-white">PNG</option>
                <option value="jpeg" className="bg-slate-900 text-white">JPG</option>
              </select>

              <button
                onClick={handleDownloadImage}
                disabled={isImageLoading}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 hover:bg-slate-800 dark:hover:bg-slate-700 disabled:opacity-50 rounded-lg text-xs font-bold transition-colors cursor-pointer"
              >
                {isImageLoading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Preparing...</span>
                  </>
                ) : (
                  <>
                    <ImageIcon className="w-3.5 h-3.5 text-sky-400" />
                    <span>Download Image</span>
                  </>
                )}
              </button>
            </div>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 font-semibold text-xs transition-colors"
              title="Print calculation report (Ctrl+P)"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print</span>
            </button>
          </div>
        </div>

        {/* Scrollable & Scaled Preview Area */}
        <div className="p-3 sm:p-6 overflow-auto flex-1 bg-slate-100 dark:bg-slate-950 flex justify-center items-start">
          <div className="w-full max-w-[1000px] overflow-x-auto rounded-2xl shadow-xl bg-white">
            <MealImageReport ref={reportCaptureRef} reportData={reportData} />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 sm:p-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <span>Both PDF and Image use identical calculations.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-200 transition-colors"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};
