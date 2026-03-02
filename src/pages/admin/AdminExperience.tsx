import React, { useState } from 'react';
import { usePortfolioStore } from '../../store/portfolioStore';
import { Plus, Trash2, Edit2, X, CheckCircle, Briefcase, GraduationCap } from 'lucide-react';
import type { Experience } from '../../types';

const emptyExp: Omit<Experience, 'id'> = {
  type: 'work',
  title: '',
  organization: '',
  location: '',
  startDate: '',
  endDate: '',
  current: false,
  description: '',
  achievements: [],
};

export default function AdminExperience() {
  const { data, addExperience, updateExperience, deleteExperience } = usePortfolioStore();
  const { experiences } = data;
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Experience>>({});
  const [showAdd, setShowAdd] = useState(false);
  const [newExp, setNewExp] = useState<Omit<Experience, 'id'>>(emptyExp);
  const [achievInput, setAchievInput] = useState('');
  const [newAchievInput, setNewAchievInput] = useState('');

  const startEdit = (exp: Experience) => {
    setEditingId(exp.id);
    setEditForm({ ...exp });
    setAchievInput('');
  };

  const saveEdit = () => {
    if (!editingId) return;
    updateExperience(editingId, editForm);
    setEditingId(null);
  };

  const addAchiev = (toNew: boolean) => {
    const val = toNew ? newAchievInput : achievInput;
    if (!val.trim()) return;
    if (toNew) {
      setNewExp(p => ({ ...p, achievements: [...p.achievements, val.trim()] }));
      setNewAchievInput('');
    } else {
      setEditForm(p => ({ ...p, achievements: [...(p.achievements || []), val.trim()] }));
      setAchievInput('');
    }
  };

  const removeAchiev = (idx: number, toNew: boolean) => {
    if (toNew) {
      setNewExp(p => ({ ...p, achievements: p.achievements.filter((_, i) => i !== idx) }));
    } else {
      setEditForm(p => ({ ...p, achievements: (p.achievements || []).filter((_, i) => i !== idx) }));
    }
  };

  const handleAdd = () => {
    if (!newExp.title.trim()) return;
    addExperience({ ...newExp, id: Date.now().toString() });
    setNewExp(emptyExp);
    setShowAdd(false);
  };

  const renderForm = (form: Partial<Experience>, setForm: (fn: (p: any) => any) => void, isNew: boolean) => (
    <div className="space-y-3">
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-gray-400 text-xs mb-1">Type</label>
          <select
            value={form.type || 'work'}
            onChange={e => setForm((p: any) => ({ ...p, type: e.target.value }))}
            className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500"
          >
            <option value="work">💼 Work</option>
            <option value="education">🎓 Education</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-400 text-xs mb-1">Title *</label>
          <input type="text" value={form.title || ''}
            onChange={e => setForm((p: any) => ({ ...p, title: e.target.value }))}
            placeholder="e.g. Senior Developer"
            className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500"
          />
        </div>
        <div>
          <label className="block text-gray-400 text-xs mb-1">Organization</label>
          <input type="text" value={form.organization || ''}
            onChange={e => setForm((p: any) => ({ ...p, organization: e.target.value }))}
            className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500"
          />
        </div>
        <div>
          <label className="block text-gray-400 text-xs mb-1">Location</label>
          <input type="text" value={form.location || ''}
            onChange={e => setForm((p: any) => ({ ...p, location: e.target.value }))}
            className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500"
          />
        </div>
        <div>
          <label className="block text-gray-400 text-xs mb-1">Start Date (YYYY-MM)</label>
          <input type="text" value={form.startDate || ''}
            onChange={e => setForm((p: any) => ({ ...p, startDate: e.target.value }))}
            placeholder="2022-01"
            className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500"
          />
        </div>
        <div>
          <label className="block text-gray-400 text-xs mb-1">End Date (YYYY-MM)</label>
          <input type="text" value={form.endDate || ''}
            onChange={e => setForm((p: any) => ({ ...p, endDate: e.target.value }))}
            placeholder="2023-12 or leave blank if current"
            disabled={form.current as boolean}
            className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500 disabled:opacity-40"
          />
        </div>
      </div>
      <label className="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" checked={form.current as boolean || false}
          onChange={e => setForm((p: any) => ({ ...p, current: e.target.checked, endDate: e.target.checked ? '' : p.endDate }))}
        />
        <span className="text-gray-400 text-sm">Currently working here</span>
      </label>
      <div>
        <label className="block text-gray-400 text-xs mb-1">Description</label>
        <textarea value={form.description || ''}
          onChange={e => setForm((p: any) => ({ ...p, description: e.target.value }))}
          rows={2}
          className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500 resize-none"
        />
      </div>
      <div>
        <label className="block text-gray-400 text-xs mb-1">Achievements</label>
        <div className="flex gap-2">
          <input type="text"
            value={isNew ? newAchievInput : achievInput}
            onChange={e => isNew ? setNewAchievInput(e.target.value) : setAchievInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addAchiev(isNew)}
            placeholder="Add achievement"
            className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500"
          />
          <button onClick={() => addAchiev(isNew)} className="px-3 py-2 rounded-lg bg-violet-600 text-white text-sm hover:bg-violet-500">Add</button>
        </div>
        <div className="space-y-1.5 mt-2">
          {(form.achievements || []).map((a, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
              <span className="text-violet-400">▸</span>
              <span className="flex-1">{a}</span>
              <button onClick={() => removeAchiev(i, isNew)} className="text-gray-500 hover:text-red-400">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-white text-xl font-bold">Experience Management</h2>
          <p className="text-gray-400 text-sm mt-1">{experiences.length} entries</p>
        </div>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 text-white text-sm font-medium hover:bg-violet-500 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Entry
        </button>
      </div>

      {showAdd && (
        <div className="bg-white/5 border border-violet-500/30 rounded-2xl p-5 mb-6">
          <h3 className="text-white font-medium mb-4">New Experience</h3>
          {renderForm(newExp, (fn) => setNewExp(fn), true)}
          <div className="flex gap-2 mt-4">
            <button onClick={handleAdd} className="px-4 py-2 rounded-lg bg-violet-600 text-white text-sm font-medium hover:bg-violet-500">Add Entry</button>
            <button onClick={() => setShowAdd(false)} className="px-4 py-2 rounded-lg bg-white/5 text-gray-400 text-sm hover:text-white">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {experiences.map(exp => (
          <div key={exp.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            {editingId === exp.id ? (
              <div className="p-5">
                {renderForm(editForm, (fn) => setEditForm(fn), false)}
                <div className="flex gap-2 mt-4">
                  <button onClick={saveEdit} className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-green-500/20 text-green-400 text-sm border border-green-500/30 hover:bg-green-500/30">
                    <CheckCircle className="w-4 h-4" /> Save
                  </button>
                  <button onClick={() => setEditingId(null)} className="px-4 py-2 rounded-lg bg-white/5 text-gray-400 text-sm hover:text-white">Cancel</button>
                </div>
              </div>
            ) : (
              <div className="p-4 flex items-start gap-3">
                <div className={`p-2 rounded-lg flex-shrink-0 ${exp.type === 'work' ? 'bg-violet-500/10' : 'bg-indigo-500/10'}`}>
                  {exp.type === 'work'
                    ? <Briefcase className="w-4 h-4 text-violet-400" />
                    : <GraduationCap className="w-4 h-4 text-indigo-400" />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-white font-medium text-sm">{exp.title}</h3>
                    {exp.current && <span className="px-1.5 py-0.5 rounded bg-green-500/20 text-green-400 text-xs">Current</span>}
                  </div>
                  <p className="text-gray-400 text-xs">{exp.organization} · {exp.startDate} – {exp.current ? 'Present' : exp.endDate}</p>
                </div>
                <div className="flex gap-1.5">
                  <button onClick={() => startEdit(exp)} className="p-1.5 rounded-lg bg-white/5 text-gray-400 hover:text-white">
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => deleteExperience(exp.id)} className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
