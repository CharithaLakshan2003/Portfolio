import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { usePortfolioStore } from '../../store/portfolioStore';
import AdminLogin from './AdminLogin';
import AdminProfile from './AdminProfile';
import AdminSkills from './AdminSkills';
import AdminProjects from './AdminProjects';
import AdminExperience from './AdminExperience';
import AdminMessages from './AdminMessages';
import AdminSettings from './AdminSettings';
import {
  LayoutDashboard, User, Cpu, FolderKanban, Briefcase, Mail,
  Settings, LogOut, Home, ChevronRight, Menu, X
} from 'lucide-react';

type AdminTab = 'overview' | 'profile' | 'skills' | 'projects' | 'experience' | 'messages' | 'settings';

const tabs: { id: AdminTab; label: string; icon: React.ElementType }[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'skills', label: 'Skills', icon: Cpu },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'messages', label: 'Messages', icon: Mail },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function AdminPage() {
  const { isAdminLoggedIn, adminLogout, data, messages } = usePortfolioStore();
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!isAdminLoggedIn) {
    return <AdminLogin onLogin={() => {}} />;
  }

  const unread = messages.filter(m => !m.read).length;

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <AdminOverview data={data} messages={messages} setActiveTab={setActiveTab} />;
      case 'profile': return <AdminProfile />;
      case 'skills': return <AdminSkills />;
      case 'projects': return <AdminProjects />;
      case 'experience': return <AdminExperience />;
      case 'messages': return <AdminMessages />;
      case 'settings': return <AdminSettings />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Sidebar overlay on mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gray-900 border-r border-white/10 flex flex-col transition-transform duration-200 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        {/* Header */}
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-bold">Admin Panel</p>
              <p className="text-gray-400 text-xs mt-0.5">{data.personalInfo.name}</p>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-violet-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <tab.icon className="w-4 h-4 flex-shrink-0" />
              {tab.label}
              {tab.id === 'messages' && unread > 0 && (
                <span className="ml-auto px-1.5 py-0.5 rounded-full bg-violet-400 text-gray-900 text-xs font-bold">
                  {unread}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-white/10 space-y-1">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 text-sm transition-all"
          >
            <Home className="w-4 h-4" />
            View Website
          </Link>
          <button
            onClick={adminLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 text-sm transition-all"
          >
            <LogOut className="w-4 h-4" />
            Log Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top bar */}
        <header className="bg-gray-900/50 border-b border-white/10 px-4 sm:px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>Admin</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white capitalize">{activeTab}</span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>
    </div>
  );
}

function AdminOverview({ data, messages, setActiveTab }: {
  data: any;
  messages: any[];
  setActiveTab: (tab: AdminTab) => void;
}) {
  const stats = [
    { label: 'Skills', count: data.skills.length, tab: 'skills' as AdminTab, color: 'text-violet-400' },
    { label: 'Projects', count: data.projects.length, tab: 'projects' as AdminTab, color: 'text-indigo-400' },
    { label: 'Experience', count: data.experiences.length, tab: 'experience' as AdminTab, color: 'text-blue-400' },
    { label: 'Messages', count: messages.length, tab: 'messages' as AdminTab, color: 'text-cyan-400' },
  ];

  return (
    <div>
      <h2 className="text-white text-xl font-bold mb-2">Dashboard Overview</h2>
      <p className="text-gray-400 text-sm mb-8">Welcome back! Here's a summary of your portfolio content.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(stat => (
          <button
            key={stat.label}
            onClick={() => setActiveTab(stat.tab)}
            className="bg-white/5 border border-white/10 rounded-2xl p-5 text-left hover:bg-white/8 hover:border-violet-500/20 transition-all group"
          >
            <div className={`text-3xl font-bold mb-1 ${stat.color}`}>{stat.count}</div>
            <div className="text-gray-400 text-sm">{stat.label}</div>
            <div className="text-xs text-gray-600 group-hover:text-gray-400 mt-1 transition-colors">
              Manage →
            </div>
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <h3 className="text-white font-semibold mb-4">Portfolio Owner</h3>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xl font-bold">{data.personalInfo.name.charAt(0)}</span>
            </div>
            <div>
              <p className="text-white font-medium">{data.personalInfo.name}</p>
              <p className="text-gray-400 text-sm">{data.personalInfo.title}</p>
              <p className="text-gray-500 text-xs">{data.personalInfo.email}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <h3 className="text-white font-semibold mb-4">Recent Messages</h3>
          {messages.length === 0 ? (
            <p className="text-gray-500 text-sm">No messages yet.</p>
          ) : (
            <div className="space-y-2">
              {[...messages].reverse().slice(0, 3).map(msg => (
                <div key={msg.id} className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${msg.read ? 'bg-gray-600' : 'bg-violet-400'}`} />
                  <div className="min-w-0">
                    <p className="text-white text-sm font-medium truncate">{msg.name}</p>
                    <p className="text-gray-400 text-xs truncate">{msg.subject}</p>
                  </div>
                </div>
              ))}
              <button
                onClick={() => setActiveTab('messages')}
                className="text-violet-400 text-xs hover:text-violet-300 transition-colors"
              >
                View all messages →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
