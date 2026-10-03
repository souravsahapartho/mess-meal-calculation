import React, { useState } from 'react';
import { X, Plus, Trash2, Edit2, Check, UserPlus, Users, AlertTriangle } from 'lucide-react';
import { toast } from '../hooks/useToast';

export const MemberManagerModal = ({
  isOpen,
  onClose,
  savedMembers,
  onSaveMembers,
  onApplySelectedToCurrent
}) => {
  const [newMemberName, setNewMemberName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [memberToDelete, setMemberToDelete] = useState(null);

  if (!isOpen) return null;

  const handleAddMember = (e) => {
    e.preventDefault();
    const name = newMemberName.trim();
    if (!name) {
      toast.warning('Please enter a valid member name.');
      return;
    }
    if (savedMembers.some(m => m.name.toLowerCase() === name.toLowerCase())) {
      toast.warning(`Member "${name}" already exists.`);
      return;
    }

    const updated = [...savedMembers, { id: `m_${Date.now()}`, name }];
    onSaveMembers(updated);
    setNewMemberName('');
    toast.success(`Added "${name}" to saved members.`);
  };

  const handleStartEdit = (member) => {
    setEditingId(member.id);
    setEditingName(member.name);
  };

  const handleSaveEdit = (id) => {
    const name = editingName.trim();
    if (!name) {
      toast.warning('Member name cannot be empty.');
      return;
    }
    const updated = savedMembers.map(m => (m.id === id ? { ...m, name } : m));
    onSaveMembers(updated);
    setEditingId(null);
    setEditingName('');
    toast.success('Member renamed successfully.');
  };

  const handleConfirmDelete = () => {
    if (!memberToDelete) return;
    const updated = savedMembers.filter(m => m.id !== memberToDelete.id);
    onSaveMembers(updated);
    toast.info(`Removed "${memberToDelete.name}" from saved list.`);
    setMemberToDelete(null);
  };

  const toggleSelect = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedIds.length === savedMembers.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(savedMembers.map(m => m.id));
    }
  };

  const handleApply = () => {
    if (selectedIds.length === 0) {
      toast.warning('Select at least one member to load.');
      return;
    }
    const selected = savedMembers.filter(m => selectedIds.includes(m.id));
    onApplySelectedToCurrent(selected);
    toast.success(`Loaded ${selected.length} members into calculation.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-fade-in flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Manage Saved Mess Members
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Store permanent profiles to quickly reuse for any month
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Add Member Form */}
        <div className="p-5 sm:p-6 bg-slate-50/70 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800">
          <form onSubmit={handleAddMember} className="flex gap-2">
            <input
              type="text"
              value={newMemberName}
              onChange={(e) => setNewMemberName(e.target.value)}
              placeholder="Enter new member name (e.g. Tanvir)"
              className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 outline-none font-medium"
            />
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1.5 shrink-0 shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add
            </button>
          </form>
        </div>

        {/* Member List */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 divide-y divide-slate-100 dark:divide-slate-800">
          <div className="flex items-center justify-between pb-3 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            <span>Saved Profiles ({savedMembers.length})</span>
            {savedMembers.length > 0 && (
              <button
                onClick={selectAll}
                className="text-emerald-600 dark:text-emerald-400 hover:underline lowercase font-semibold"
              >
                {selectedIds.length === savedMembers.length ? 'Deselect All' : 'Select All'}
              </button>
            )}
          </div>

          {savedMembers.length === 0 ? (
            <div className="py-8 text-center text-slate-400">
              <Users className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p className="text-sm">No saved members found.</p>
              <p className="text-xs mt-1">Add members above to get started.</p>
            </div>
          ) : (
            <div className="space-y-2 pt-2">
              {savedMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/70 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-800 transition-all"
                >
                  {editingId === member.id ? (
                    <div className="flex items-center gap-2 flex-1 mr-2">
                      <input
                        type="text"
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleSaveEdit(member.id);
                          } else if (e.key === 'Escape') {
                            setEditingId(null);
                          }
                        }}
                        autoFocus
                        placeholder="Press Enter to save"
                        className="w-full bg-white dark:bg-slate-900 border border-emerald-500 rounded-lg px-3 py-1.5 text-sm text-slate-900 dark:text-white outline-none font-semibold"
                      />
                      <button
                        onClick={() => handleSaveEdit(member.id)}
                        className="p-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 cursor-pointer"
                        title="Save name (Enter)"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="flex items-center gap-3 cursor-pointer flex-1 select-none">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(member.id)}
                        onChange={() => toggleSelect(member.id)}
                        className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 cursor-pointer"
                      />
                      <span className="text-sm font-semibold text-slate-900 dark:text-white">
                        {member.name}
                      </span>
                    </label>
                  )}

                  {editingId !== member.id && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleStartEdit(member)}
                        className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                        title="Rename"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setMemberToDelete(member)}
                        className="p-1.5 text-rose-400 hover:text-rose-600 dark:hover:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors cursor-pointer"
                        title="Delete profile"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/70 flex items-center justify-between gap-3">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            {selectedIds.length} member(s) selected
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              disabled={selectedIds.length === 0}
              className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <UserPlus className="w-4 h-4" /> Load to Calculation
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Nested Dialog */}
      {memberToDelete && (
        <div className="fixed inset-0 z-[60] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 animate-fade-in text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">
              Delete Member Profile?
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Are you sure you want to delete <strong className="text-slate-800 dark:text-slate-200">"{memberToDelete.name}"</strong>? This will remove them from your saved list.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setMemberToDelete(null)}
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-rose-600 hover:bg-rose-700 transition-colors shadow-sm"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
