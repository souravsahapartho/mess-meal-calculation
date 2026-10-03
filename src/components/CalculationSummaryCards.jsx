import React from 'react';
import { DollarSign, Utensils, TrendingUp, Users } from 'lucide-react';
import { formatCurrency, formatNumber } from '../utils/currency';

export const CalculationSummaryCards = ({ result }) => {
  if (!result) return null;

  const {
    totalBazar = 0,
    totalMeals = 0,
    mealRate = 0,
    memberCount = 0,
    month = 'October',
    year = 2026,
    messName = 'MealMate Mess'
  } = result;

  const cards = [
    {
      title: 'TOTAL BAZAR',
      value: formatCurrency(totalBazar),
      subtitle: 'All grocery & mess spending',
      icon: DollarSign,
      gradient: 'from-blue-500/10 to-indigo-500/10 dark:from-blue-500/20 dark:to-indigo-500/20',
      iconColor: 'text-blue-600 dark:text-blue-400',
      borderColor: 'border-blue-200/80 dark:border-blue-900/60',
    },
    {
      title: 'TOTAL MEALS',
      value: formatNumber(totalMeals),
      subtitle: 'Combined count consumed',
      icon: Utensils,
      gradient: 'from-amber-500/10 to-orange-500/10 dark:from-amber-500/20 dark:to-orange-500/20',
      iconColor: 'text-amber-600 dark:text-amber-400',
      borderColor: 'border-amber-200/80 dark:border-amber-900/60',
    },
    {
      title: 'MEAL RATE',
      value: formatCurrency(mealRate),
      subtitle: 'Cost per meal unit',
      icon: TrendingUp,
      gradient: 'from-emerald-500/15 to-teal-500/15 dark:from-emerald-500/25 dark:to-teal-500/25',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      borderColor: 'border-emerald-300 dark:border-emerald-700 shadow-glow',
      isPrimary: true,
    },
    {
      title: 'ACTIVE MEMBERS',
      value: `${memberCount} Persons`,
      subtitle: 'Contributing mess members',
      icon: Users,
      gradient: 'from-purple-500/10 to-fuchsia-500/10 dark:from-purple-500/20 dark:to-fuchsia-500/20',
      iconColor: 'text-purple-600 dark:text-purple-400',
      borderColor: 'border-purple-200/80 dark:border-purple-900/60',
    },
  ];

  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
            {messName} • {month} {year}
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Monthly Meal Summary Dashboard
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className={`relative overflow-hidden rounded-3xl p-5 bg-white dark:bg-slate-900 border ${card.borderColor} shadow-card hover:shadow-card-hover transition-all duration-300`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-50 pointer-events-none`}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black tracking-wider uppercase text-slate-500 dark:text-slate-400">
                    {card.title}
                  </span>
                  <div className={`p-2 rounded-xl bg-white dark:bg-slate-800 shadow-sm ${card.iconColor}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  {card.value}
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 font-medium">
                  {card.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
