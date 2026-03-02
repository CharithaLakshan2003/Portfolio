import React, { useState } from 'react';
import { usePortfolioStore } from '../../store/portfolioStore';
import { Plus, Trash2, Edit2, X, ExternalLink, Github, Star, CheckCircle } from 'lucide-react';
import type { Project } from '../../types';

const emptyProject: Omit<Project, 'id'> = {
  title: '',
  description: '',
  technologies: [],
  imageUrl: '',
  liveUrl: '',
  githubUrl: '',
  featured: false,
};

export default function AdminProjects() {
  const { data, addProject, updateProject, deleteProject } = usePortfolioStore();
  const { projects } = data;
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Project>>({});
  const [showAdd, setShowAdd] = useState(false);
  const [newProject, setNewProject] = useState<Omit<Project, 'id'>>(emptyProject);
  const [techInput, setTechInput] = useState('');
  const [newTechInput, setNewTechInput] = useState('');
  const [saved, setSaved] = useState(false);

  const startEdit = (project: Project) => {
    setEditingId(project.id);
    setEditForm({ ...project });
    setTechInput('');
  };

  const saveEdit = () => {
    if (!editingId) return;
    updateProject(editingId, editForm);
    setEditingId(null);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  const addEditTech = () => {
    if (!techInput.trim()) return;
    setEditForm(prev => ({ ...prev, technologies: [...(prev.technologies || []), techInput.trim()] }));
    setTechInput('');
  };

  const removeEditTech = (tech: string) => {
    setEditForm(prev => ({ ...prev, technologies: (prev.technologies || []).filter(t => t !== tech) }));
  };

  const addNewTech = () => {
    if (!newTechInput.trim()) return;
    setNewProject(prev => ({ ...prev, technologies: [...prev.technologies, newTechInput.trim()] }));
    setNewTechInput('');
  };

  const removeNewTech = (tech: string) => {
    setNewProject(prev => ({ ...prev, technologies: prev.technologies.filter(t => t !== tech) }));
  };

  const handleAdd = () => {
    if (!newProject.title.trim()) return;
    addProject({ ...newProject, id: Date.now().toString() });
    setNewProject(emptyProject);
    setShowAdd(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-white text-xl font-bold">Projects Management</h2>
          <p className="text-gray-400 text-sm mt-1">{projects.length} projects total</p>
        </div>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 text-white text-sm font-medium hover:bg-violet-500 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </button>
      </div>

      {/* Add form */}
      {showAdd && (
        <div className="bg-white/5 border border-violet-500/30 rounded-2xl p-5 mb-6">
          <h3 className="text-white font-medium mb-4">New Project</h3>
          <div className="space-y-3">
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-gray-400 text-xs mb-1">Title *</label>
                <input type="text" value={newProject.title}
                  onChange={e => setNewProject(p => ({ ...p, title: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-xs mb-1">Live URL</label>
                <input type="url" value={newProject.liveUrl}
                  onChange={e => setNewProject(p => ({ ...p, liveUrl: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-400 text-xs mb-1">Description</label>
              <textarea value={newProject.description}
                onChange={e => setNewProject(p => ({ ...p, description: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500 resize-none"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-gray-400 text-xs mb-1">GitHub URL</label>
                <input type="url" value={newProject.githubUrl}
                  onChange={e => setNewProject(p => ({ ...p, githubUrl: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-xs mb-1">Image URL</label>
                <input type="url" value={newProject.imageUrl}
                  onChange={e => setNewProject(p => ({ ...p, imageUrl: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-400 text-xs mb-1">Technologies</label>
              <div className="flex gap-2">
                <input type="text" value={newTechInput}
                  onChange={e => setNewTechInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addNewTech()}
                  placeholder="Add tech and press Enter"
                  className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500"
                />
                <button onClick={addNewTech} className="px-3 py-2 rounded-lg bg-violet-600 text-white text-sm hover:bg-violet-500">Add</button>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {newProject.technologies.map(t => (
                  <span key={t} className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-violet-500/20 text-violet-300 text-xs">
                    {t}
                    <button onClick={() => removeNewTech(t)}><X className="w-3 h-3" /></button>
                  </span>
                ))}
              </div>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={newProject.featured}
                onChange={e => setNewProject(p => ({ ...p, featured: e.target.checked }))}
                className="rounded"
              />
              <span className="text-gray-400 text-sm">Featured project</span>
            </label>
          </div>
          <div className="flex gap-2 mt-4">
            <button onClick={handleAdd} className="px-4 py-2 rounded-lg bg-violet-600 text-white text-sm font-medium hover:bg-violet-500">Add Project</button>
            <button onClick={() => setShowAdd(false)} className="px-4 py-2 rounded-lg bg-white/5 text-gray-400 text-sm hover:text-white">Cancel</button>
          </div>
        </div>
      )}

      {/* Projects list */}
      <div className="space-y-4">
        {projects.map(project => (
          <div key={project.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            {editingId === project.id ? (
              <div className="p-5 space-y-3">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-400 text-xs mb-1">Title</label>
                    <input type="text" value={editForm.title || ''}
                      onChange={e => setEditForm(p => ({ ...p, title: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs mb-1">Live URL</label>
                    <input type="url" value={editForm.liveUrl || ''}
                      onChange={e => setEditForm(p => ({ ...p, liveUrl: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 text-xs mb-1">Description</label>
                  <textarea value={editForm.description || ''}
                    onChange={e => setEditForm(p => ({ ...p, description: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500 resize-none"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-400 text-xs mb-1">GitHub URL</label>
                    <input type="url" value={editForm.githubUrl || ''}
                      onChange={e => setEditForm(p => ({ ...p, githubUrl: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs mb-1">Image URL</label>
                    <input type="url" value={editForm.imageUrl || ''}
                      onChange={e => setEditForm(p => ({ ...p, imageUrl: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 text-xs mb-1">Technologies</label>
                  <div className="flex gap-2">
                    <input type="text" value={techInput}
                      onChange={e => setTechInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && addEditTech()}
                      placeholder="Add tech"
                      className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500"
                    />
                    <button onClick={addEditTech} className="px-3 py-2 rounded-lg bg-violet-600 text-white text-sm hover:bg-violet-500">Add</button>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {(editForm.technologies || []).map(t => (
                      <span key={t} className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-violet-500/20 text-violet-300 text-xs">
                        {t}
                        <button onClick={() => removeEditTech(t)}><X className="w-3 h-3" /></button>
                      </span>
                    ))}
                  </div>
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={editForm.featured || false}
                    onChange={e => setEditForm(p => ({ ...p, featured: e.target.checked }))}
                  />
                  <span className="text-gray-400 text-sm">Featured</span>
                </label>
                <div className="flex gap-2">
                  <button onClick={saveEdit} className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-green-500/20 text-green-400 text-sm hover:bg-green-500/30 border border-green-500/30">
                    <CheckCircle className="w-4 h-4" /> Save
                  </button>
                  <button onClick={() => setEditingId(null)} className="px-4 py-2 rounded-lg bg-white/5 text-gray-400 text-sm hover:text-white">Cancel</button>
                </div>
              </div>
            ) : (
              <div className="p-5 flex items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white font-medium">{project.title}</h3>
                    {project.featured && <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />}
                  </div>
                  <p className="text-gray-400 text-sm line-clamp-2 mb-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 4).map(t => (
                      <span key={t} className="px-2 py-0.5 rounded bg-white/5 text-gray-500 text-xs">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-1.5 flex-shrink-0">
                  <button onClick={() => startEdit(project)} className="p-1.5 rounded-lg bg-white/5 text-gray-400 hover:text-white transition-colors">
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => deleteProject(project.id)} className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors">
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
