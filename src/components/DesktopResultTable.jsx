import React from 'react';
import { formatCurrency, formatNumber } from '../utils/currency';
import { ArrowUpRight, ArrowDownRight, Check, Users } from 'lucide-react';

export const DesktopResultTable = ({ members = [] }) => {
  return (
    <div className="hidden md:block bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-card overflow-hidden mb-8 w-full">
      <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            Member Breakdown & Calculation
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Individual grocery contribution, meal cost, balance and final settlement action
          </p>
        </div>
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl">
          {members.length} Members
        </span>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-950/60 text-slate-600 dark:text-slate-400 text-xs font-black uppercase tracking-wider border-b border-slate-200/80 dark:border-slate-800">
              <th className="py-4 px-5 w-14 text-center">#</th>
              <th className="py-4 px-5">Member Name</th>
              <th className="py-4 px-5 text-right">Bazar Contrib.</th>
              <th className="py-4 px-5 text-center">Meals</th>
              <th className="py-4 px-5 text-right">Meal Cost</th>
              <th className="py-4 px-5 text-right">Balance</th>
              <th className="py-4 px-6 text-center">Settlement Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
            {members.map((member, idx) => {
              const isReceiver = member.status === 'GET BACK';
              const isPayer = member.status === 'PAY';

              return (
                <tr
                  key={member.id || idx}
                  className={`hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors ${
                    idx % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-50/40 dark:bg-slate-950/20'
                  }`}
                >
                  <td className="py-4 px-5 text-center text-xs font-bold text-slate-400">
                    {idx + 1}
                  </td>
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center justify-center border border-slate-200 dark:border-slate-700 shrink-0">
                        {member.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-extrabold text-slate-900 dark:text-white">
                        {member.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-5 text-right font-bold text-slate-700 dark:text-slate-200">
                    {formatCurrency(member.bazar)}
                  </td>
                  <td className="py-4 px-5 text-center font-bold text-slate-700 dark:text-slate-200">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs">
                      {formatNumber(member.meals)}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-right font-bold text-slate-700 dark:text-slate-200">
                    {formatCurrency(member.mealCost)}
                  </td>
                  <td className="py-4 px-5 text-right">
                    <span
                      className={`font-black text-sm ${
                        isReceiver
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : isPayer
                          ? 'text-rose-600 dark:text-rose-400'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {formatCurrency(member.balance, true, true)}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    {isReceiver ? (
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 shadow-sm whitespace-nowrap">
                        <ArrowDownRight className="w-3.5 h-3.5 text-emerald-600" />
                        GET BACK {formatCurrency(member.balance)}
                      </span>
                    ) : isPayer ? (
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-700 shadow-sm whitespace-nowrap">
                        <ArrowUpRight className="w-3.5 h-3.5 text-rose-600" />
                        PAY {formatCurrency(Math.abs(member.balance))}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 whitespace-nowrap">
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        SETTLED
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
