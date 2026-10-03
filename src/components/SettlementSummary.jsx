import React from 'react';
import { ArrowDownRight, ArrowUpRight, ArrowRightLeft, AlertCircle, Sparkles } from 'lucide-react';
import { formatCurrency } from '../utils/currency';

export const SettlementSummary = ({ settlement = {} }) => {
  const {
    receivers = [],
    payers = [],
    totalReceive = 0,
    totalPay = 0,
    roundingDifference = 0,
    transfers = []
  } = settlement;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-7 border border-slate-200/80 dark:border-slate-800 shadow-card transition-colors mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-5 mb-6">
        <div>
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <ArrowRightLeft className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            Settlement Summary
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Transparent breakdown of who gets reimbursed and who needs to pay
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs font-bold self-start sm:self-auto">
          <span className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            Total Receive: {formatCurrency(totalReceive)}
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
            Total Pay: {formatCurrency(totalPay)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        <div className="bg-emerald-50/50 dark:bg-emerald-950/20 rounded-2xl p-5 border border-emerald-200/80 dark:border-emerald-900/40">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-extrabold text-sm uppercase tracking-wider">
              <span className="p-1 rounded-lg bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300">
                <ArrowDownRight className="w-4 h-4" />
              </span>
              💰 Members Getting Money Back
            </div>
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100/70 dark:bg-emerald-900/60 px-2 py-0.5 rounded-full">
              {receivers.length}
            </span>
          </div>

          {receivers.length === 0 ? (
            <p className="text-xs text-slate-500 dark:text-slate-400 italic py-2">
              No members have a positive balance this month.
            </p>
          ) : (
            <div className="space-y-2.5">
              {receivers.map((r, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-slate-900 border border-emerald-100 dark:border-emerald-900/60 shadow-sm"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center justify-center">
                      ✓
                    </span>
                    <span className="font-bold text-slate-900 dark:text-white text-sm">
                      {r.name}
                    </span>
                  </div>
                  <span className="font-black text-emerald-600 dark:text-emerald-400 text-sm">
                    +{formatCurrency(r.balance)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-rose-50/50 dark:bg-rose-950/20 rounded-2xl p-5 border border-rose-200/80 dark:border-rose-900/40">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-rose-800 dark:text-rose-300 font-extrabold text-sm uppercase tracking-wider">
              <span className="p-1 rounded-lg bg-rose-100 dark:bg-rose-900 text-rose-700 dark:text-rose-300">
                <ArrowUpRight className="w-4 h-4" />
              </span>
              💳 Members Who Need to Pay
            </div>
            <span className="text-xs font-bold text-rose-700 dark:text-rose-400 bg-rose-100/70 dark:bg-rose-900/60 px-2 py-0.5 rounded-full">
              {payers.length}
            </span>
          </div>

          {payers.length === 0 ? (
            <p className="text-xs text-slate-500 dark:text-slate-400 italic py-2">
              All members have contributed enough bazar to cover their meals!
            </p>
          ) : (
            <div className="space-y-2.5">
              {payers.map((p, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-slate-900 border border-rose-100 dark:border-rose-900/60 shadow-sm"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 text-xs font-bold flex items-center justify-center">
                      !
                    </span>
                    <span className="font-bold text-slate-900 dark:text-white text-sm">
                      {p.name}
                    </span>
                  </div>
                  <span className="font-black text-rose-600 dark:text-rose-400 text-sm">
                    -{formatCurrency(Math.abs(p.balance))}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {transfers.length > 0 && (
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200/80 dark:border-slate-800 mb-4">
          <div className="flex items-center gap-2 text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3">
            <Sparkles className="w-4 h-4 text-emerald-500" />
            Smart Peer-to-Peer Payment Path (Fewest Transactions)
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {transfers.map((t, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-slate-900 dark:text-white">{t.from}</span>
                  <span className="text-slate-400">→</span>
                  <span className="font-extrabold text-slate-900 dark:text-white">{t.to}</span>
                </div>
                <span className="font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-lg border border-emerald-200 dark:border-emerald-800">
                  {formatCurrency(t.amount)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {roundingDifference > 0.005 && (
        <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 flex items-center gap-2 text-xs text-amber-800 dark:text-amber-300 font-medium">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>
            Rounding Adjustment: <strong>{formatCurrency(roundingDifference)}</strong> difference across fraction division. Total receive and pay match closely within standard financial tolerance.
          </span>
        </div>
      )}
    </div>
  );
};
