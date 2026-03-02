import React, { useState } from 'react';
import { usePortfolioStore } from '../../store/portfolioStore';
import { Lock, CheckCircle, Eye, EyeOff, AlertCircle } from 'lucide-react';

export default function AdminSettings() {
  const { adminPassword, changeAdminPassword } = usePortfolioStore();
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (currentPw !== adminPassword) {
      setError('Current password is incorrect');
      return;
    }
    if (newPw.length < 6) {
      setError('New password must be at least 6 characters');
      return;
    }
    if (newPw !== confirmPw) {
      setError('Passwords do not match');
      return;
    }
    changeAdminPassword(newPw);
    setSuccess(true);
    setCurrentPw('');
    setNewPw('');
    setConfirmPw('');
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-white text-xl font-bold">Settings</h2>
        <p className="text-gray-400 text-sm mt-1">Manage your admin panel security settings</p>
      </div>

      <div className="max-w-md">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-xl bg-violet-500/10 border border-violet-500/20">
              <Lock className="w-5 h-5 text-violet-400" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Change Password</h3>
              <p className="text-gray-400 text-sm">Update your admin access password</p>
            </div>
          </div>

          <form onSubmit={handleChange} className="space-y-4">
            {['currentPw', 'newPw', 'confirmPw'].map((field) => {
              const labels = { currentPw: 'Current Password', newPw: 'New Password', confirmPw: 'Confirm Password' };
              const values = { currentPw, newPw, confirmPw };
              const setters = { currentPw: setCurrentPw, newPw: setNewPw, confirmPw: setConfirmPw };
              return (
                <div key={field} className="relative">
                  <label className="block text-gray-400 text-sm mb-1.5">{labels[field as keyof typeof labels]}</label>
                  <input
                    type={showPw ? 'text' : 'password'}
                    value={values[field as keyof typeof values]}
                    onChange={e => setters[field as keyof typeof setters](e.target.value)}
                    className="w-full px-4 py-2.5 pr-10 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-violet-500 text-sm"
                  />
                </div>
              );
            })}

            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={showPw} onChange={e => setShowPw(e.target.checked)} />
              <span className="text-gray-400 text-sm">Show passwords</span>
            </label>

            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            {success && (
              <div className="flex items-center gap-2 text-green-400 text-sm bg-green-500/10 border border-green-500/20 rounded-xl px-3 py-2">
                <CheckCircle className="w-4 h-4 flex-shrink-0" />
                Password changed successfully!
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-violet-600 text-white font-medium text-sm hover:bg-violet-500 transition-colors"
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
