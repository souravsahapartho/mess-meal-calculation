import React from 'react';
import { Calendar, Users, Calculator, Download, Check } from 'lucide-react';

export const StepIndicator = ({ currentStep, hasResults, onStepClick }) => {
  const steps = [
    { id: 1, label: 'Month & Year', sublabel: 'Set Period', icon: Calendar },
    { id: 2, label: 'Members & Inputs', sublabel: 'Bazar & Meals', icon: Users },
    { id: 3, label: 'Result Summary', sublabel: 'Rate & Balances', icon: Calculator },
    { id: 4, label: 'Export & Share', sublabel: 'PDF & Image', icon: Download },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-8">
      {/* Desktop Step Bar */}
      <div className="hidden sm:grid grid-cols-4 gap-3 bg-white dark:bg-slate-900 p-2.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        {steps.map((step) => {
          const Icon = step.icon;
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id || (step.id <= 3 && hasResults);
          const isClickable = step.id <= 2 || (hasResults && step.id <= 4);

          return (
            <button
              key={step.id}
              onClick={() => isClickable && onStepClick?.(step.id)}
              disabled={!isClickable}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all text-left ${
                isActive
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 shadow-sm'
                  : isCompleted
                  ? 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  : 'text-slate-400 dark:text-slate-600 opacity-60 cursor-not-allowed'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 transition-colors ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : isCompleted
                    ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                }`}
              >
                {isCompleted && !isActive ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-wider truncate">
                  0{step.id} {step.label}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  {step.sublabel}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Mobile Compact Step Indicator */}
      <div className="sm:hidden bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shadow-sm">
            0{currentStep}
          </span>
          <div>
            <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block">
              {steps[currentStep - 1]?.label}
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 block">
              Step {currentStep} of 4 • {steps[currentStep - 1]?.sublabel}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {steps.map((s) => (
            <span
              key={s.id}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                s.id === currentStep
                  ? 'bg-emerald-600 ring-2 ring-emerald-300 dark:ring-emerald-800'
                  : s.id < currentStep || (hasResults && s.id <= 3)
                  ? 'bg-emerald-400 dark:bg-emerald-600'
                  : 'bg-slate-200 dark:bg-slate-800'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
