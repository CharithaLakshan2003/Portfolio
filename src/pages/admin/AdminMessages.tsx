import React, { useState } from 'react';
import { usePortfolioStore } from '../../store/portfolioStore';
import { Mail, Trash2, Eye, Clock, CheckCircle2, Circle } from 'lucide-react';

export default function AdminMessages() {
  const { messages, markMessageRead, deleteMessage } = usePortfolioStore();
  const [selected, setSelected] = useState<string | null>(null);

  const selectedMessage = messages.find(m => m.id === selected);

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleString('en-US', {
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
    });
  };

  const handleSelect = (id: string) => {
    setSelected(id === selected ? null : id);
    markMessageRead(id);
  };

  const unreadCount = messages.filter(m => !m.read).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-white text-xl font-bold">Messages</h2>
          <p className="text-gray-400 text-sm mt-1">
            {messages.length} total · {unreadCount} unread
          </p>
        </div>
        {unreadCount > 0 && (
          <span className="px-2.5 py-1 rounded-full bg-violet-500/20 text-violet-400 text-xs font-medium border border-violet-500/30">
            {unreadCount} new
          </span>
        )}
      </div>

      {messages.length === 0 ? (
        <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
          <Mail className="w-10 h-10 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400 font-medium">No messages yet</p>
          <p className="text-gray-600 text-sm mt-1">Messages from your contact form will appear here</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-4">
          {/* Messages list */}
          <div className="space-y-2">
            {[...messages].reverse().map(msg => (
              <div
                key={msg.id}
                onClick={() => handleSelect(msg.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selected === msg.id
                    ? 'bg-violet-500/10 border-violet-500/30'
                    : msg.read
                      ? 'bg-white/3 border-white/10 hover:bg-white/5'
                      : 'bg-white/5 border-violet-500/20 hover:bg-white/8'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {msg.read
                      ? <CheckCircle2 className="w-4 h-4 text-gray-500" />
                      : <Circle className="w-4 h-4 text-violet-400 fill-violet-400" />
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`font-medium text-sm truncate ${msg.read ? 'text-gray-300' : 'text-white'}`}>
                        {msg.name}
                      </span>
                      <span className="text-gray-500 text-xs flex-shrink-0 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatDate(msg.timestamp)}
                      </span>
                    </div>
                    <p className="text-gray-400 text-xs mt-0.5">{msg.email}</p>
                    <p className={`text-sm truncate mt-1 ${msg.read ? 'text-gray-500' : 'text-gray-300'}`}>
                      {msg.subject}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message detail */}
          {selectedMessage && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-white font-semibold">{selectedMessage.subject}</h3>
                  <p className="text-gray-400 text-sm mt-0.5">
                    From: {selectedMessage.name} ({selectedMessage.email})
                  </p>
                  <p className="text-gray-500 text-xs mt-0.5">{formatDate(selectedMessage.timestamp)}</p>
                </div>
                <button
                  onClick={() => {
                    deleteMessage(selectedMessage.id);
                    setSelected(null);
                  }}
                  className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors flex-shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="bg-white/3 rounded-xl p-4 border border-white/5">
                <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">{selectedMessage.message}</p>
              </div>
              <a
                href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                className="mt-4 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600 text-white text-sm font-medium hover:bg-violet-500 transition-colors"
              >
                <Mail className="w-4 h-4" />
                Reply via Email
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
