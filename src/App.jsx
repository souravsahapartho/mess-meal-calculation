import React, { useState, useEffect, useRef, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  getSavedMembers,
  saveMembers,
  getCalculationHistory,
  saveCalculationToHistory,
  deleteHistoryItem,
  getSavedMessName,
  saveMessName,
  getSavedTheme,
  saveTheme,
  clearAllData
} from './utils/storage';
import { calculateMonthlySummary, calculateTotalBazar, calculateTotalMeals, calculateMealRate } from './utils/calculations';
import { generateMealPDF } from './utils/pdfGenerator';
import { generateMealImage } from './utils/imageGenerator';
import { formatRate } from './utils/currency';
import { useToast, toast } from './hooks/useToast';
import { ToastContainer } from './components/ToastContainer';

// UI Components
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { StepIndicator } from './components/StepIndicator';
import { MonthYearSelector } from './components/MonthYearSelector';
import { MemberManagerModal } from './components/MemberManagerModal';
import { MemberInputTable } from './components/MemberInputTable';
import { CalculationSummaryCards } from './components/CalculationSummaryCards';
import { DesktopResultTable } from './components/DesktopResultTable';
import { MobileResultCards } from './components/MobileResultCards';
import { SettlementSummary } from './components/SettlementSummary';
import { CalculationExplanation } from './components/CalculationExplanation';
import { ExportActionBar } from './components/ExportActionBar';
import { ReportPreviewModal } from './components/ReportPreviewModal';
import { HistoryModal } from './components/HistoryModal';
import { ResetConfirmModal } from './components/ResetConfirmModal';
import { Footer } from './components/Footer';
import { MealImageReport } from './reports/MealImageReport';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export function App() {
  const { toasts, removeToast } = useToast();

  const [theme, setTheme] = useState(() => getSavedTheme());
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    saveTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const currentDate = new Date();
  const [month, setMonth] = useState(() => MONTH_NAMES[currentDate.getMonth()]);
  const [year, setYear] = useState(() => currentDate.getFullYear());
  const [messName, setMessName] = useState(() => getSavedMessName());

  const handleMessNameChange = (name) => {
    setMessName(name);
    saveMessName(name);
  };

  const [savedMembers, setSavedMembers] = useState(() => getSavedMembers());
  const [activeMembers, setActiveMembers] = useState(() => {
    const saved = getSavedMembers();
    return saved.slice(0, 5).map((m, idx) => ({
      id: m.id || `active_${idx}`,
      name: m.name,
      bazar: '',
      meals: ''
    }));
  });

  const [calculationResult, setCalculationResult] = useState(null);
  const [history, setHistory] = useState(() => getCalculationHistory());
  const [validationErrors, setValidationErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(2);

  const [isMemberManagerOpen, setIsMemberManagerOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [isClearAllConfirmOpen, setIsClearAllConfirmOpen] = useState(false);

  const [isPdfLoading, setIsPdfLoading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);

  const offscreenReportRef = useRef(null);
  const resultsRef = useRef(null);

  const handleSaveMembers = (updatedList) => {
    setSavedMembers(updatedList);
    saveMembers(updatedList);
  };

  const handleAddMemberRow = () => {
    const newId = `active_${Date.now()}`;
    setActiveMembers(prev => [...prev, { id: newId, name: '', bazar: '', meals: '' }]);
    setValidationErrors({});
    toast.info('Added new member row.');
  };

  const handleRemoveMemberRow = (id) => {
    if (activeMembers.length <= 1) {
      toast.warning('At least one member is required.');
      return;
    }
    setActiveMembers(prev => prev.filter(m => m.id !== id));
    setValidationErrors(prev => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  const handleUpdateMember = (id, field, value) => {
    setActiveMembers(prev =>
      prev.map(m => {
        if (m.id === id) {
          return { ...m, [field]: value };
        }
        return m;
      })
    );
    if (validationErrors[id]?.[field]) {
      setValidationErrors(prev => ({
        ...prev,
        [id]: { ...prev[id], [field]: null }
      }));
    }
  };

  const handleApplySelectedToCurrent = (selected) => {
    const newMembers = selected.map(s => {
      const existing = activeMembers.find(a => a.name.toLowerCase() === s.name.toLowerCase());
      return {
        id: s.id,
        name: s.name,
        bazar: existing ? existing.bazar : '',
        meals: existing ? existing.meals : ''
      };
    });
    setActiveMembers(newMembers);
  };

  const liveSummary = useMemo(() => {
    const totalBazar = calculateTotalBazar(activeMembers);
    const totalMeals = calculateTotalMeals(activeMembers);
    const estimatedRate = calculateMealRate(totalBazar, totalMeals);
    return { totalBazar, totalMeals, estimatedRate };
  }, [activeMembers]);

  const handleNextMonthPreset = () => {
    const currentIndex = MONTH_NAMES.indexOf(month);
    let nextIndex = (currentIndex + 1) % 12;
    let nextYear = year;
    if (nextIndex === 0) {
      nextYear += 1;
    }
    setMonth(MONTH_NAMES[nextIndex]);
    setYear(nextYear);
    toast.success(`Set period to ${MONTH_NAMES[nextIndex]} ${nextYear}`);
  };

  const handleCalculate = () => {
    const errors = {};
    let hasError = false;

    if (!activeMembers || activeMembers.length === 0) {
      errors.general = 'Please add at least one member to calculate.';
      hasError = true;
    }

    activeMembers.forEach((m) => {
      const mErrors = {};
      if (!m.name || !m.name.trim()) {
        mErrors.name = 'Member name is required';
        hasError = true;
      }

      const bVal = parseFloat(m.bazar);
      if (m.bazar !== '' && (isNaN(bVal) || bVal < 0)) {
        mErrors.bazar = 'Enter a valid amount (>= 0)';
        hasError = true;
      }

      const mealVal = parseFloat(m.meals);
      if (m.meals !== '' && (isNaN(mealVal) || mealVal < 0)) {
        mErrors.meals = 'Enter valid meals (>= 0)';
        hasError = true;
      }

      if (Object.keys(mErrors).length > 0) {
        errors[m.id] = mErrors;
      }
    });

    const totalMeals = calculateTotalMeals(activeMembers);
    if (!hasError && totalMeals <= 0) {
      errors.general = 'Total meals must be greater than 0 to calculate meal rate.';
      hasError = true;
    }

    if (hasError) {
      setValidationErrors(errors);
      toast.error(errors.general || 'Please fix the highlighted input errors.');
      return;
    }

    setValidationErrors({});

    const summary = calculateMonthlySummary({
      month,
      year,
      messName,
      members: activeMembers
    });

    setCalculationResult(summary);
    const updatedHistory = saveCalculationToHistory(summary);
    setHistory(updatedHistory);

    setCurrentStep(3);
    toast.success(`Calculated for ${month} ${year}! Meal Rate: ${formatRate(summary.mealRate)}`);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch {
      // ignore
    }

    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleDownloadPDF = async () => {
    if (!calculationResult) {
      toast.warning('Please calculate before downloading PDF.');
      return;
    }
    try {
      setIsPdfLoading(true);
      toast.info('Generating PDF report...');
      await new Promise(r => setTimeout(r, 100));
      const filename = await generateMealPDF(calculationResult);
      toast.success(`PDF downloaded: ${filename}`);
    } catch (err) {
      console.error('PDF error:', err);
      toast.error("We couldn't generate the PDF. Please try again.");
    } finally {
      setIsPdfLoading(false);
    }
  };

  const handleDownloadImage = async () => {
    if (!calculationResult) {
      toast.warning('Please calculate before downloading Image.');
      return;
    }
    try {
      setIsImageLoading(true);
      toast.info('Preparing PNG image report...');
      await new Promise(r => setTimeout(r, 150));
      const filename = await generateMealImage(offscreenReportRef.current, calculationResult, 'png');
      toast.success(`Image downloaded: ${filename}`);
    } catch (err) {
      console.error('Image export error:', err);
      toast.error("We couldn't generate the image. Please try again.");
    } finally {
      setIsImageLoading(false);
    }
  };

  const handleNewMonth = () => {
    handleNextMonthPreset();
    setActiveMembers(prev =>
      prev.map(m => ({
        ...m,
        bazar: '',
        meals: ''
      }))
    );
    setCalculationResult(null);
    setCurrentStep(2);
    toast.info('Ready for new month entries! Member names preserved.');
  };

  const handleConfirmReset = () => {
    setActiveMembers(savedMembers.slice(0, 5).map((m, idx) => ({
      id: m.id || `active_${idx}`,
      name: m.name,
      bazar: '',
      meals: ''
    })));
    setCalculationResult(null);
    setCurrentStep(2);
    toast.info('Form cleared.');
  };

  const handleConfirmClearAll = () => {
    clearAllData();
    setSavedMembers(getSavedMembers());
    setHistory([]);
    setActiveMembers(getSavedMembers().slice(0, 5).map((m, idx) => ({
      id: m.id || `active_${idx}`,
      name: m.name,
      bazar: '',
      meals: ''
    })));
    setCalculationResult(null);
    toast.success('All stored data cleared.');
  };

  const handleLoadHistoryItem = (item) => {
    setMonth(item.month);
    setYear(item.year);
    setMessName(item.messName);
    setActiveMembers(item.members.map(m => ({
      id: m.id,
      name: m.name,
      bazar: m.bazar,
      meals: m.meals
    })));
    setCalculationResult(item);
    setCurrentStep(3);
    toast.success(`Loaded history for ${item.month} ${item.year}`);
  };

  const handleDeleteHistoryItem = (id) => {
    const updated = deleteHistoryItem(id);
    setHistory(updated);
    toast.info('History record removed.');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenMemberManager={() => setIsMemberManagerOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onResetData={() => setIsResetConfirmOpen(true)}
        historyCount={history.length}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Hero
          onStartClick={() => {
            const el = document.getElementById('config-section');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        <StepIndicator
          currentStep={currentStep}
          hasResults={!!calculationResult}
          onStepClick={(step) => {
            setCurrentStep(step);
            if (step === 3 && resultsRef.current) {
              resultsRef.current.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        />

        <div id="config-section" className="w-full">
          <MonthYearSelector
            month={month}
            year={year}
            messName={messName}
            onMonthChange={setMonth}
            onYearChange={setYear}
            onMessNameChange={handleMessNameChange}
            onNextMonthPreset={handleNextMonthPreset}
          />

          <MemberInputTable
            members={activeMembers}
            onUpdateMember={handleUpdateMember}
            onAddMember={handleAddMemberRow}
            onRemoveMember={handleRemoveMemberRow}
            onOpenSavedModal={() => setIsMemberManagerOpen(true)}
            onCalculate={handleCalculate}
            validationErrors={validationErrors}
            liveSummary={liveSummary}
          />
        </div>

        {calculationResult && (
          <div ref={resultsRef} className="pt-6 animate-fade-in w-full">
            <CalculationSummaryCards result={calculationResult} />
            <DesktopResultTable members={calculationResult.members} />
            <MobileResultCards members={calculationResult.members} />
            <SettlementSummary settlement={calculationResult.settlement} />
            <CalculationExplanation result={calculationResult} />

            <ExportActionBar
              onDownloadPDF={handleDownloadPDF}
              onDownloadImage={handleDownloadImage}
              onOpenPreview={() => setIsPreviewOpen(true)}
              onEditCalculation={() => {
                const el = document.getElementById('config-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onNewMonth={handleNewMonth}
              isPdfLoading={isPdfLoading}
              isImageLoading={isImageLoading}
            />
          </div>
        )}
      </main>

      <Footer onClearAllData={() => setIsClearAllConfirmOpen(true)} />

      <MemberManagerModal
        isOpen={isMemberManagerOpen}
        onClose={() => setIsMemberManagerOpen(false)}
        savedMembers={savedMembers}
        onSaveMembers={handleSaveMembers}
        onApplySelectedToCurrent={handleApplySelectedToCurrent}
      />

      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onLoadHistoryItem={handleLoadHistoryItem}
        onDeleteHistoryItem={handleDeleteHistoryItem}
      />

      <ReportPreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        reportData={calculationResult}
      />

      <ResetConfirmModal
        isOpen={isResetConfirmOpen}
        onClose={() => setIsResetConfirmOpen(false)}
        onConfirm={handleConfirmReset}
        title="Reset Form Entries?"
        description="This will clear the current grocery and meal inputs on the form. Your saved member profiles will not be deleted."
        confirmText="Reset Form"
      />

      <ResetConfirmModal
        isOpen={isClearAllConfirmOpen}
        onClose={() => setIsClearAllConfirmOpen(false)}
        onConfirm={handleConfirmClearAll}
        title="Clear Stored Data?"
        description="This will remove all saved member profiles, calculation history, and settings stored in your browser."
        confirmText="Clear Everything"
      />

      {calculationResult && (
        <div style={{ position: 'fixed', left: '-9999px', top: '-9999px', zIndex: -100 }}>
          <MealImageReport ref={offscreenReportRef} reportData={calculationResult} />
        </div>
      )}
    </div>
  );
}

export default App;
