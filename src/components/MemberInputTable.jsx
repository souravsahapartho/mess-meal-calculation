import React, { useState } from 'react';
import { Plus, Trash2, Users, Calculator, AlertCircle, AlertTriangle } from 'lucide-react';
import { formatCurrency, formatNumber, formatRate } from '../utils/currency';

export const MemberInputTable = ({
  members,
  onUpdateMember,
  onAddMember,
  onRemoveMember,
  onOpenSavedModal,
  onCalculate,
  validationErrors = {},
  liveSummary = {}
}) => {
  const [rowToDelete, setRowToDelete] = useState(null);

  const handleRequestDelete = (member) => {
    // If empty row, delete directly; if has name or data, confirm with user
    if (!member.name && !member.bazar && !member.meals) {
      onRemoveMember(member.id);
    } else {
      setRowToDelete(member);
    }
  };

  const handleConfirmRowDelete = () => {
    if (rowToDelete) {
      onRemoveMember(rowToDelete.id);
      setRowToDelete(null);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-7 border border-slate-200/80 dark:border-slate-800 shadow-card transition-colors mb-8">
      {/* Table Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800/80 pb-5 mb-6">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-sm font-black">
              02
            </span>
            Member Bazar & Meal Entries
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Enter each member's total grocery expense and meal count
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={onOpenSavedModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/60 dark:border-slate-700 transition-colors cursor-pointer"
          >
            <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            Pick Saved Profiles
          </button>

          <button
            type="button"
            onClick={onAddMember}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-300/80 dark:border-emerald-700 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Row
          </button>
        </div>
      </div>

      {/* Global Validation Alert */}
      {validationErrors.general && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 flex items-center gap-3 text-rose-700 dark:text-rose-300 text-sm font-medium">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{validationErrors.general}</span>
        </div>
      )}

      {/* Member Rows */}
      <div className="space-y-3">
        {members.map((member, index) => {
          const rowError = validationErrors[member.id] || {};

          return (
            <div
              key={member.id || index}
              className="group p-4 sm:p-4.5 rounded-2xl bg-slate-50/80 dark:bg-slate-950/40 border border-slate-200/70 dark:border-slate-800/80 hover:border-emerald-300 dark:hover:border-emerald-800/80 transition-all duration-200 shadow-sm"
            >
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 items-center">
                <div className="sm:col-span-5">
                  <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                    Member #{index + 1} Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={member.name}
                      onChange={(e) => onUpdateMember(member.id, 'name', e.target.value)}
                      placeholder="e.g. Rahim"
                      className={`w-full bg-white dark:bg-slate-900 border rounded-xl px-3.5 py-2.5 text-sm font-bold text-slate-900 dark:text-white placeholder-slate-400 outline-none transition-all ${
                        rowError.name
                          ? 'border-rose-400 dark:border-rose-700 focus:ring-2 focus:ring-rose-500'
                          : 'border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-emerald-500'
                      }`}
                    />
                  </div>
                  {rowError.name && (
                    <span className="text-[11px] text-rose-500 font-medium mt-1 block">
                      {rowError.name}
                    </span>
                  )}
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                    Bazar (৳)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-slate-400 font-bold text-sm select-none">
                      ৳
                    </span>
                    <input
                      type="number"
                      min="0"
                      step="any"
                      onWheel={(e) => e.target.blur()}
                      value={member.bazar === 0 ? '' : member.bazar}
                      onChange={(e) => onUpdateMember(member.id, 'bazar', e.target.value)}
                      placeholder="0"
                      className={`w-full bg-white dark:bg-slate-900 border rounded-xl pl-8 pr-3.5 py-2.5 text-sm font-semibold text-slate-900 dark:text-white placeholder-slate-400 outline-none transition-all text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                        rowError.bazar
                          ? 'border-rose-400 dark:border-rose-700 focus:ring-2 focus:ring-rose-500'
                          : 'border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-emerald-500'
                      }`}
                    />
                  </div>
                  {rowError.bazar && (
                    <span className="text-[11px] text-rose-500 font-medium mt-1 block">
                      {rowError.bazar}
                    </span>
                  )}
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                    Meals Count
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      step="any"
                      onWheel={(e) => e.target.blur()}
                      value={member.meals === 0 ? '' : member.meals}
                      onChange={(e) => onUpdateMember(member.id, 'meals', e.target.value)}
                      placeholder="0"
                      className={`w-full bg-white dark:bg-slate-900 border rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-900 dark:text-white placeholder-slate-400 outline-none transition-all text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                        rowError.meals
                          ? 'border-rose-400 dark:border-rose-700 focus:ring-2 focus:ring-rose-500'
                          : 'border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-emerald-500'
                      }`}
                    />
                  </div>
                  {rowError.meals && (
                    <span className="text-[11px] text-rose-500 font-medium mt-1 block">
                      {rowError.meals}
                    </span>
                  )}
                </div>

                <div className="sm:col-span-1 flex items-center justify-end sm:justify-center pt-2 sm:pt-6">
                  <button
                    type="button"
                    onClick={() => handleRequestDelete(member)}
                    disabled={members.length <= 1}
                    className="p-2.5 rounded-xl text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                    title="Remove this row"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <button
          type="button"
          onClick={onAddMember}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 text-slate-600 dark:text-slate-300 hover:text-emerald-600 font-bold text-sm transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" /> + Add Another Member
        </button>

        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
          <span className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            Total Bazar: <strong>{formatCurrency(liveSummary.totalBazar || 0)}</strong>
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            Total Meals: <strong>{formatNumber(liveSummary.totalMeals || 0)}</strong>
          </span>
          {liveSummary.estimatedRate > 0 && (
            <span className="px-3 py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300/60 dark:border-emerald-800">
              Est. Rate: <strong>{formatRate(liveSummary.estimatedRate)}</strong>
            </span>
          )}
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
        <button
          type="button"
          onClick={onCalculate}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white font-extrabold text-base sm:text-lg tracking-wide shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-3 cursor-pointer"
        >
          <Calculator className="w-6 h-6" />
          <span>Calculate Monthly Settlement</span>
        </button>
      </div>

      {/* Row Delete Confirmation Dialog */}
      {rowToDelete && (
        <div className="fixed inset-0 z-[60] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 animate-fade-in text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">
              Remove Member Entry?
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Are you sure you want to remove <strong className="text-slate-800 dark:text-slate-200">"{rowToDelete.name || 'this row'}"</strong> from current calculation?
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setRowToDelete(null)}
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmRowDelete}
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-rose-600 hover:bg-rose-700 transition-colors shadow-sm"
              >
                Yes, Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
