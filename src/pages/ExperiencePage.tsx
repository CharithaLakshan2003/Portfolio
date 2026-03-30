import { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, MapPin, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { usePortfolioStore } from '../store/portfolioStore';

export default function ExperiencePage() {
  const { data } = usePortfolioStore();
  const { experiences } = data;
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeType, setActiveType] = useState<'all' | 'work' | 'education'>('all');

  const displayed = activeType === 'all' ? experiences : experiences.filter(e => e.type === activeType);
  const workExp = experiences.filter(e => e.type === 'work');
  const eduExp = experiences.filter(e => e.type === 'education');

  const formatDate = (date: string) => {
    if (!date) return '';
    const [year, month] = date.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[parseInt(month) - 1]} ${year}`;
  };

  return (
    <div className="min-h-screen bg-gray-950 pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Experience</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            My professional journey and educational background.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-4 mb-10"
        >
          {[
            { icon: Briefcase, label: 'Work Experience', count: workExp.length, color: 'text-violet-400' },
            { icon: GraduationCap, label: 'Education', count: eduExp.length, color: 'text-indigo-400' },
            {
              icon: Calendar,
              label: 'Years Active',
              count: workExp.length > 0 ? new Date().getFullYear() - parseInt(workExp[workExp.length - 1]?.startDate?.split('-')[0] || '2019') : 0,
              color: 'text-blue-400'
            },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
              <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
              <div className="text-2xl font-bold text-white mb-1">{stat.count}</div>
              <div className="text-gray-400 text-xs">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Filter tabs */}
        <div className="flex justify-center gap-2 mb-10">
          {(['all', 'work', 'education'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize ${
                activeType === type
                  ? 'bg-violet-600 text-white'
                  : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'
              }`}
            >
              {type === 'all' ? 'All' : type === 'work' ? '💼 Work' : '🎓 Education'}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-white/10" />

          <div className="space-y-6">
            {displayed.map((exp, i) => {
              const isExpanded = expandedId === exp.id;
              const isWork = exp.type === 'work';

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="relative pl-16 sm:pl-20"
                >
                  {/* Timeline dot */}
                  <div className={`absolute left-4 sm:left-5.5 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    isWork
                      ? 'bg-violet-900 border-violet-500'
                      : 'bg-indigo-900 border-indigo-500'
                  }`}>
                    {isWork
                      ? <Briefcase className="w-2.5 h-2.5 text-violet-300" />
                      : <GraduationCap className="w-2.5 h-2.5 text-indigo-300" />
                    }
                  </div>

                  {/* Card */}
                  <div
                    className={`bg-white/5 border rounded-2xl overflow-hidden transition-all cursor-pointer ${
                      isExpanded ? 'border-violet-500/30' : 'border-white/10 hover:border-white/20'
                    }`}
                    onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                  >
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <h3 className="text-white font-semibold">{exp.title}</h3>
                            {exp.current && (
                              <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs border border-green-500/30">
                                Current
                              </span>
                            )}
                          </div>
                          <p className="text-violet-400 font-medium text-sm mb-2">{exp.organization}</p>
                          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" />
                              {formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}
                            </span>
                            {exp.location && (
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5" />
                                {exp.location}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-gray-500 shrink-0">
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </div>

                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-4 pt-4 border-t border-white/10"
                        >
                          <p className="text-gray-300 text-sm leading-relaxed mb-4">{exp.description}</p>
                          {exp.achievements.length > 0 && (
                            <ul className="space-y-2">
                              {exp.achievements.map((a, ai) => (
                                <li key={ai} className="flex items-start gap-2 text-sm text-gray-400">
                                  <span className="text-violet-400 mt-0.5">▸</span>
                                  {a}
                                </li>
                              ))}
                            </ul>
                          )}
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
