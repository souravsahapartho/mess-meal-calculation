import React from 'react';
import { formatCurrency, formatNumber } from '../utils/currency';
import { ArrowUpRight, ArrowDownRight, Check, Users } from 'lucide-react';

export const MobileResultCards = ({ members = [] }) => {
  return (
    <div className="md:hidden space-y-3.5 mb-8">
      <div className="flex items-center justify-between px-1 mb-2">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Users className="w-4 h-4 text-emerald-600" />
          Member Results ({members.length})
        </h3>
        <span className="text-[11px] text-slate-500 font-medium">Card view</span>
      </div>

      {members.map((member, idx) => {
        const isReceiver = member.status === 'GET BACK';
        const isPayer = member.status === 'PAY';

        return (
          <div
            key={member.id || idx}
            className="bg-white dark:bg-slate-900 rounded-2xl p-4.5 border border-slate-200/80 dark:border-slate-800 shadow-card transition-all"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold text-xs flex items-center justify-center border border-emerald-300/60 dark:border-emerald-700">
                  {idx + 1}
                </div>
                <span className="font-extrabold text-base text-slate-900 dark:text-white">
                  {member.name}
                </span>
              </div>

              {isReceiver ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                  <ArrowDownRight className="w-3 h-3 text-emerald-600" />
                  GET BACK
                </span>
              ) : isPayer ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300">
                  <ArrowUpRight className="w-3 h-3 text-rose-600" />
                  PAY
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  <Check className="w-3 h-3 text-emerald-500" />
                  SETTLED
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs mb-3.5">
              <div className="bg-slate-50 dark:bg-slate-950/50 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400 block text-[10px] font-bold uppercase">
                  Bazar Contrib.
                </span>
                <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                  {formatCurrency(member.bazar)}
                </span>
              </div>

              <div className="bg-slate-50 dark:bg-slate-950/50 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400 block text-[10px] font-bold uppercase">
                  Meals Count
                </span>
                <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                  {formatNumber(member.meals)}
                </span>
              </div>

              <div className="bg-slate-50 dark:bg-slate-950/50 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400 block text-[10px] font-bold uppercase">
                  Meal Cost
                </span>
                <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                  {formatCurrency(member.mealCost)}
                </span>
              </div>

              <div className="bg-slate-50 dark:bg-slate-950/50 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400 block text-[10px] font-bold uppercase">
                  Net Balance
                </span>
                <span
                  className={`font-black text-sm ${
                    isReceiver
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : isPayer
                      ? 'text-rose-600 dark:text-rose-400'
                      : 'text-slate-600'
                  }`}
                >
                  {formatCurrency(member.balance, true, true)}
                </span>
              </div>
            </div>

            <div
              className={`p-2.5 rounded-xl flex items-center justify-between text-xs font-bold ${
                isReceiver
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800'
                  : isPayer
                  ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200 border border-rose-200 dark:border-rose-800'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              <span>Settlement Action:</span>
              <span>
                {isReceiver
                  ? `Receive ${formatCurrency(member.balance)}`
                  : isPayer
                  ? `Pay ${formatCurrency(Math.abs(member.balance))}`
                  : 'All settled!'}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
