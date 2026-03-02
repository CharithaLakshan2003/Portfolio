import React, { useState } from 'react';
import { usePortfolioStore } from '../../store/portfolioStore';
import { Save, User, Mail, Phone, MapPin, Github, Linkedin, Twitter, Globe, CheckCircle } from 'lucide-react';

export default function AdminProfile() {
  const { data, updatePersonalInfo } = usePortfolioStore();
  const [form, setForm] = useState(data.personalInfo);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updatePersonalInfo(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const fields = [
    { key: 'name', label: 'Full Name', icon: User, placeholder: 'John Doe', type: 'text' },
    { key: 'title', label: 'Professional Title', icon: User, placeholder: 'Full-Stack Developer', type: 'text' },
    { key: 'email', label: 'Email', icon: Mail, placeholder: 'email@example.com', type: 'email' },
    { key: 'phone', label: 'Phone', icon: Phone, placeholder: '+1 (555) 123-4567', type: 'text' },
    { key: 'location', label: 'Location', icon: MapPin, placeholder: 'San Francisco, CA', type: 'text' },
    { key: 'github', label: 'GitHub URL', icon: Github, placeholder: 'https://github.com/...', type: 'url' },
    { key: 'linkedin', label: 'LinkedIn URL', icon: Linkedin, placeholder: 'https://linkedin.com/in/...', type: 'url' },
    { key: 'twitter', label: 'Twitter URL', icon: Twitter, placeholder: 'https://twitter.com/...', type: 'url' },
    { key: 'website', label: 'Website', icon: Globe, placeholder: 'https://yoursite.com', type: 'url' },
  ] as const;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-white text-xl font-bold">Personal Information</h2>
          <p className="text-gray-400 text-sm mt-1">Update your profile and contact details</p>
        </div>
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all ${
            saved
              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
              : 'bg-violet-600 text-white hover:bg-violet-500'
          }`}
        >
          {saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      <div className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          {fields.map(({ key, label, icon: Icon, placeholder, type }) => (
            <div key={key}>
              <label className="block text-gray-400 text-sm mb-1.5 flex items-center gap-1.5">
                <Icon className="w-3.5 h-3.5" />
                {label}
              </label>
              <input
                type={type}
                value={form[key] || ''}
                onChange={e => setForm(prev => ({ ...prev, [key]: e.target.value }))}
                placeholder={placeholder}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 text-sm transition-colors"
              />
            </div>
          ))}
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-1.5">Short Bio (used on homepage)</label>
          <textarea
            value={form.shortBio || ''}
            onChange={e => setForm(prev => ({ ...prev, shortBio: e.target.value }))}
            placeholder="Brief description for the homepage hero..."
            rows={2}
            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 text-sm transition-colors resize-none"
          />
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-1.5">Full Biography (About page)</label>
          <textarea
            value={form.bio || ''}
            onChange={e => setForm(prev => ({ ...prev, bio: e.target.value }))}
            placeholder="Your detailed professional biography..."
            rows={8}
            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 text-sm transition-colors resize-none"
          />
          <p className="text-gray-600 text-xs mt-1">Separate paragraphs with a blank line.</p>
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-1.5">Tagline</label>
          <input
            type="text"
            value={form.tagline || ''}
            onChange={e => setForm(prev => ({ ...prev, tagline: e.target.value }))}
            placeholder="Your personal tagline..."
            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 text-sm transition-colors"
          />
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={handleSave}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
              saved
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'bg-violet-600 text-white hover:bg-violet-500'
            }`}
          >
            {saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
