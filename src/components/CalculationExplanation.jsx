import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { formatCurrency, formatNumber } from '../utils/currency';

export const CalculationExplanation = ({ result }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!result) return null;

  const { totalBazar = 0, totalMeals = 0, mealRate = 0 } = result;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden mb-8 transition-colors">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center">
            <HelpCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              How was this calculated?
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Clear breakdown of mathematical formulas and balance rules
            </p>
          </div>
        </div>

        <div className="p-1 rounded-lg text-slate-400">
          {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </button>

      {isOpen && (
        <div className="p-5 sm:p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-4 animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <span className="font-bold text-slate-900 dark:text-white block mb-1 text-xs uppercase tracking-wider">
                1. Meal Rate Formula
              </span>
              <p className="font-mono text-emerald-600 dark:text-emerald-400 font-bold text-xs mb-1">
                Meal Rate = Total Bazar ÷ Total Meals
              </p>
              <p className="text-xs text-slate-500">
                {formatCurrency(totalBazar)} ÷ {formatNumber(totalMeals)} = <strong>{formatCurrency(mealRate)}</strong>
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <span className="font-bold text-slate-900 dark:text-white block mb-1 text-xs uppercase tracking-wider">
                2. Individual Meal Cost
              </span>
              <p className="font-mono text-emerald-600 dark:text-emerald-400 font-bold text-xs mb-1">
                Meal Cost = Member Meals × Meal Rate
              </p>
              <p className="text-xs text-slate-500">
                Calculates the exact monetary value of meals eaten by that member.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <span className="font-bold text-slate-900 dark:text-white block mb-1 text-xs uppercase tracking-wider">
                3. Final Balance
              </span>
              <p className="font-mono text-emerald-600 dark:text-emerald-400 font-bold text-xs mb-1">
                Balance = Bazar Contrib. − Meal Cost
              </p>
              <p className="text-xs text-slate-500">
                Positive (+): <strong>GET BACK</strong> • Negative (-): <strong>PAY</strong> • 0: <strong>SETTLED</strong>.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
