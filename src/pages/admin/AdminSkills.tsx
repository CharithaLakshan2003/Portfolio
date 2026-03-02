import React, { useState } from 'react';
import { usePortfolioStore } from '../../store/portfolioStore';
import { Plus, Trash2, Save, CheckCircle, Edit2, X } from 'lucide-react';
import type { Skill } from '../../types';

export default function AdminSkills() {
  const { data, addSkill, updateSkill, deleteSkill } = usePortfolioStore();
  const { skills } = data;

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Skill>>({});
  const [showAdd, setShowAdd] = useState(false);
  const [newSkill, setNewSkill] = useState<Partial<Skill>>({ name: '', level: 75, category: '' });
  const [saved, setSaved] = useState<string | null>(null);

  const categories = Array.from(new Set(skills.map(s => s.category)));

  const startEdit = (skill: Skill) => {
    setEditingId(skill.id);
    setEditForm({ ...skill });
  };

  const saveEdit = () => {
    if (!editingId) return;
    updateSkill(editingId, editForm);
    setEditingId(null);
    setSaved(editingId);
    setTimeout(() => setSaved(null), 1500);
  };

  const handleAdd = () => {
    if (!newSkill.name || !newSkill.category) return;
    addSkill({
      id: Date.now().toString(),
      name: newSkill.name || '',
      level: newSkill.level || 75,
      category: newSkill.category || '',
    });
    setNewSkill({ name: '', level: 75, category: '' });
    setShowAdd(false);
  };

  const groupedSkills = skills.reduce((acc: Record<string, Skill[]>, skill: Skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-white text-xl font-bold">Skills Management</h2>
          <p className="text-gray-400 text-sm mt-1">{skills.length} skills across {categories.length} categories</p>
        </div>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 text-white text-sm font-medium hover:bg-violet-500 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Skill
        </button>
      </div>

      {/* Add form */}
      {showAdd && (
        <div className="bg-white/5 border border-violet-500/30 rounded-2xl p-5 mb-6">
          <h3 className="text-white font-medium mb-4">New Skill</h3>
          <div className="grid sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-gray-400 text-xs mb-1">Skill Name *</label>
              <input
                type="text"
                value={newSkill.name}
                onChange={e => setNewSkill(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g. React"
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-xs mb-1">Category *</label>
              <input
                type="text"
                value={newSkill.category}
                onChange={e => setNewSkill(prev => ({ ...prev, category: e.target.value }))}
                placeholder="e.g. Frontend"
                list="categories"
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 text-sm"
              />
              <datalist id="categories">
                {categories.map(c => <option key={c} value={c} />)}
              </datalist>
            </div>
            <div>
              <label className="block text-gray-400 text-xs mb-1">Level: {newSkill.level}%</label>
              <input
                type="range"
                min="0"
                max="100"
                value={newSkill.level}
                onChange={e => setNewSkill(prev => ({ ...prev, level: parseInt(e.target.value) }))}
                className="w-full mt-1.5"
              />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleAdd}
              className="px-4 py-2 rounded-lg bg-violet-600 text-white text-sm font-medium hover:bg-violet-500 transition-colors"
            >
              Add Skill
            </button>
            <button
              onClick={() => setShowAdd(false)}
              className="px-4 py-2 rounded-lg bg-white/5 text-gray-400 text-sm hover:text-white transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Skills by category */}
      <div className="space-y-6">
        {Object.entries(groupedSkills).map(([category, catSkills]) => (
          <div key={category}>
            <h3 className="text-violet-400 text-sm font-medium mb-3">{category}</h3>
            <div className="space-y-2">
              {catSkills.map(skill=> (
                <div key={skill.id} className="bg-white/5 border border-white/10 rounded-xl p-4">
                  {editingId === skill.id ? (
                    <div className="grid sm:grid-cols-4 gap-3 items-center">
                      <input
                        type="text"
                        value={editForm.name || ''}
                        onChange={e => setEditForm(p => ({ ...p, name: e.target.value }))}
                        className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500"
                      />
                      <input
                        type="text"
                        value={editForm.category || ''}
                        onChange={e => setEditForm(p => ({ ...p, category: e.target.value }))}
                        className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500"
                      />
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={editForm.level || 75}
                          onChange={e => setEditForm(p => ({ ...p, level: parseInt(e.target.value) }))}
                          className="flex-1"
                        />
                        <span className="text-white text-xs w-8">{editForm.level}%</span>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={saveEdit} className="p-1.5 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors">
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button onClick={() => setEditingId(null)} className="p-1.5 rounded-lg bg-white/5 text-gray-400 hover:text-white transition-colors">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-white text-sm font-medium">{skill.name}</span>
                          <span className="text-gray-400 text-xs">{skill.level}%</span>
                        </div>
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex gap-1.5">
                        <button onClick={() => startEdit(skill)} className="p-1.5 rounded-lg bg-white/5 text-gray-400 hover:text-white transition-colors">
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => deleteSkill(skill.id)} className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
