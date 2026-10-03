import React, { forwardRef } from 'react';
import { formatCurrency, formatNumber } from '../utils/currency';
import { Utensils, Calendar, Users, ArrowRightLeft, CheckCircle2, AlertCircle } from 'lucide-react';

export const MealImageReport = forwardRef(({ reportData }, ref) => {
  if (!reportData) return null;

  const {
    messName = 'MealMate Mess',
    month = 'October',
    year = 2026,
    totalBazar = 0,
    totalMeals = 0,
    mealRate = 0,
    memberCount = 0,
    members = [],
    settlement = {}
  } = reportData;

  const generatedDate = new Date().toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  return (
    <div
      ref={ref}
      style={{ width: '1000px' }}
      className="bg-white text-slate-900 font-sans p-10 select-none shadow-2xl border border-slate-200"
    >
      {/* 1. Header */}
      <div className="flex items-center justify-between border-b-2 border-emerald-500 pb-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
            <Utensils className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 uppercase">
              {messName}
            </h1>
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600 mt-0.5">
              Official Monthly Meal Calculation Report
            </p>
          </div>
        </div>

        <div className="text-right">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-xl text-emerald-800 font-bold text-base shadow-sm">
            <Calendar className="w-4 h-4 text-emerald-600" />
            <span>{month} {year}</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1 font-medium">
            Generated: {generatedDate}
          </p>
        </div>
      </div>

      {/* 2. KPI Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
            Total Bazar
          </span>
          <span className="text-2xl font-black text-slate-900 block tracking-tight">
            {formatCurrency(totalBazar)}
          </span>
          <span className="text-[10px] text-slate-500 font-medium mt-1 block">Total grocery expenses</span>
        </div>

        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
            Total Meals
          </span>
          <span className="text-2xl font-black text-slate-900 block tracking-tight">
            {formatNumber(totalMeals)}
          </span>
          <span className="text-[10px] text-slate-500 font-medium mt-1 block">All members combined</span>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 shadow-sm">
          <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block mb-1">
            Meal Rate
          </span>
          <span className="text-2xl font-black text-emerald-700 block tracking-tight">
            {formatCurrency(mealRate)}
          </span>
          <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">Cost per meal unit</span>
        </div>

        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
            Active Members
          </span>
          <span className="text-2xl font-black text-slate-900 block tracking-tight">
            {memberCount}
          </span>
          <span className="text-[10px] text-slate-500 font-medium mt-1 block">Contributing persons</span>
        </div>
      </div>

      {/* 3. Table */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-slate-800 uppercase tracking-wide flex items-center gap-2">
            <Users className="w-4 h-4 text-emerald-600" />
            Individual Member Breakdown
          </h2>
          <span className="text-xs text-slate-500 font-medium">Sorted by contribution list</span>
        </div>

        <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider border-b border-slate-200">
                <th className="py-3 px-4 w-12 text-center">#</th>
                <th className="py-3 px-4">Member Name</th>
                <th className="py-3 px-4 text-right">Bazar Contrib.</th>
                <th className="py-3 px-4 text-center">Meals</th>
                <th className="py-3 px-4 text-right">Meal Cost</th>
                <th className="py-3 px-4 text-right">Balance</th>
                <th className="py-3 px-4 text-center">Settlement Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {members.map((m, idx) => (
                <tr key={m.id || idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/70'}>
                  <td className="py-3.5 px-4 text-center text-xs text-slate-600 font-medium">{idx + 1}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">{m.name}</td>
                  <td className="py-3.5 px-4 text-right font-medium text-slate-700">{formatCurrency(m.bazar)}</td>
                  <td className="py-3.5 px-4 text-center font-medium text-slate-700">{formatNumber(m.meals)}</td>
                  <td className="py-3.5 px-4 text-right font-medium text-slate-700">{formatCurrency(m.mealCost)}</td>
                  <td className={`py-3.5 px-4 text-right font-bold ${
                    m.balance > 0.005 ? 'text-emerald-600' : m.balance < -0.005 ? 'text-rose-600' : 'text-slate-600'
                  }`}>
                    {formatCurrency(m.balance, true, true)}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {m.status === 'GET BACK' ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        GET BACK {formatCurrency(m.balance)}
                      </span>
                    ) : m.status === 'PAY' ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                        PAY {formatCurrency(Math.abs(m.balance))}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
                        ✓ SETTLED
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Settlement Summary Box */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-8 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
          <h2 className="text-base font-bold text-slate-800 uppercase tracking-wide flex items-center gap-2">
            <ArrowRightLeft className="w-4 h-4 text-emerald-600" />
            Settlement Summary & Actions
          </h2>
          <div className="text-xs text-slate-600 font-semibold flex items-center gap-4">
            <span>Total to Receive: <strong className="text-emerald-700">{formatCurrency(settlement.totalReceive || 0)}</strong></span>
            <span>Total to Pay: <strong className="text-rose-700">{formatCurrency(settlement.totalPay || 0)}</strong></span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white border border-emerald-100 rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider mb-3">
              <CheckCircle2 className="w-4 h-4" />
              Members Getting Money Back ({settlement.receivers?.length || 0})
            </div>
            {settlement.receivers && settlement.receivers.length > 0 ? (
              <ul className="space-y-2 text-sm">
                {settlement.receivers.map((r, idx) => (
                  <li key={idx} className="flex justify-between items-center py-1 border-b border-slate-100 last:border-0">
                    <span className="font-semibold text-slate-800">👤 {r.name}</span>
                    <span className="font-bold text-emerald-600">+{formatCurrency(r.balance)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-500 italic">No members receive money back this month.</p>
            )}
          </div>

          <div className="bg-white border border-rose-100 rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 text-rose-700 font-bold text-xs uppercase tracking-wider mb-3">
              <AlertCircle className="w-4 h-4" />
              Members Who Need to Pay ({settlement.payers?.length || 0})
            </div>
            {settlement.payers && settlement.payers.length > 0 ? (
              <ul className="space-y-2 text-sm">
                {settlement.payers.map((p, idx) => (
                  <li key={idx} className="flex justify-between items-center py-1 border-b border-slate-100 last:border-0">
                    <span className="font-semibold text-slate-800">👤 {p.name}</span>
                    <span className="font-bold text-rose-600">-{formatCurrency(Math.abs(p.balance))}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-500 italic">All members are settled or overpaid.</p>
            )}
          </div>
        </div>

        {settlement.transfers && settlement.transfers.length > 0 && (
          <div className="mt-4 pt-4 border-t border-slate-200">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
              Suggested Direct Transactions (Settle in fewest steps):
            </span>
            <div className="flex flex-wrap gap-2">
              {settlement.transfers.map((t, idx) => (
                <div key={idx} className="bg-emerald-50 text-emerald-900 border border-emerald-200/80 px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5">
                  <span className="font-bold text-slate-900">{t.from}</span>
                  <span className="text-slate-500">pays</span>
                  <span className="font-bold text-emerald-800">{formatCurrency(t.amount)}</span>
                  <span className="text-slate-500">to</span>
                  <span className="font-bold text-slate-900">{t.to}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 5. Formulas */}
      <div className="bg-slate-100 rounded-xl p-4 mb-8 text-xs text-slate-600 flex items-center justify-between">
        <div>
          <span className="font-bold text-slate-800 uppercase tracking-wider block mb-0.5">
            Transparent Calculation Formulas:
          </span>
          <span>
            Meal Rate = Total Bazar ({formatCurrency(totalBazar)}) ÷ Total Meals ({formatNumber(totalMeals)}) = <strong>{formatCurrency(mealRate)}</strong>
            &nbsp;•&nbsp; Member Meal Cost = Meals × Meal Rate &nbsp;•&nbsp; Balance = Bazar − Meal Cost
          </span>
        </div>
      </div>

      {/* 6. Footer */}
      <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 font-medium">
        <div className="flex items-center gap-2">
          <span className="font-bold text-emerald-700">MealMate</span>
          <span>•</span>
          <span>Mess & Shared Living Meal Calculator</span>
        </div>
        <div>
          <span>{month} {year} Report</span>
          <span className="mx-2">•</span>
          <span>100% Client-Side Privacy Guaranteed</span>
        </div>
      </div>
    </div>
  );
});
