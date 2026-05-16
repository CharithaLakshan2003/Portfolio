import { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, MapPin, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { usePortfolioStore } from '../store/portfolioStore';

const formatDate = (date: string) => {
  if (!date) return '';
  const [year, month] = date.split('-');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${months[parseInt(month) - 1]} ${year}`;
};

export default function ExperienceSection() {
  const { data } = usePortfolioStore();
  const { experiences } = data;
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeType, setActiveType] = useState<'all' | 'work' | 'education'>('all');

  const displayed = activeType === 'all' ? experiences : experiences.filter(e => e.type === activeType);
  const workExp   = experiences.filter(e => e.type === 'work');
  const eduExp    = experiences.filter(e => e.type === 'education');

  return (
    <section id="experience" className="py-28 bg-gray-900/30 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-indigo-600/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold tracking-widest uppercase mb-4">
            My Journey
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 section-heading-line">
            Experience
          </h2>
          <p className="text-gray-400 text-lg mt-6 max-w-xl mx-auto">
            My professional journey and educational background.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-4 mb-10"
        >
          {[
            { icon: Briefcase,     label: 'Work Experience', count: workExp.length,  color: 'text-violet-400' },
            { icon: GraduationCap, label: 'Education',       count: eduExp.length,   color: 'text-indigo-400' },
            { icon: Calendar,      label: 'Years Active',
              count: workExp.length > 0
                ? new Date().getFullYear() - parseInt(workExp[workExp.length - 1]?.startDate?.split('-')[0] || '2024')
                : 1,
              color: 'text-blue-400' },
          ].map(stat => (
            <div key={stat.label} className="glass-card rounded-2xl p-5 text-center hover:border-violet-500/20 transition-all">
              <stat.icon className={`w-5 h-5 ${stat.color} mx-auto mb-2`} />
              <div className="text-2xl font-bold text-white mb-1">{stat.count}</div>
              <div className="text-gray-500 text-xs">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Filter */}
        <div className="flex justify-center gap-2 mb-10">
          {(['all', 'work', 'education'] as const).map(type => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize ${
                activeType === type
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/25'
                  : 'glass-card text-gray-400 hover:text-white'
              }`}
            >
              {type === 'all' ? 'All' : type === 'work' ? 'Work' : 'Education'}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Animated vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            style={{ originY: 0 }}
            className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/60 via-indigo-500/40 to-transparent"
          />

          <div className="space-y-6">
            {displayed.map((exp, i) => {
              const isExpanded = expandedId === exp.id;
              const isWork = exp.type === 'work';

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.55, delay: i * 0.08 }}
                  className="relative pl-16 sm:pl-20"
                >
                  {/* Timeline dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 + 0.2 }}
                    className={`absolute left-4 sm:left-5 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      isWork
                        ? 'bg-violet-900 border-violet-500 shadow-lg shadow-violet-500/30'
                        : 'bg-indigo-900 border-indigo-500 shadow-lg shadow-indigo-500/30'
                    }`}
                    style={{ top: '1.25rem' }}
                  >
                    {isWork
                      ? <Briefcase className="w-2.5 h-2.5 text-violet-300" />
                      : <GraduationCap className="w-2.5 h-2.5 text-indigo-300" />}
                  </motion.div>

                  {/* Card */}
                  <div
                    className={`glass-card rounded-2xl overflow-hidden transition-all cursor-pointer ${
                      isExpanded
                        ? 'border-violet-500/30 shadow-lg shadow-violet-500/10'
                        : 'hover:border-white/15'
                    }`}
                    onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                  >
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <h3 className="text-white font-semibold">{exp.title}</h3>
                            {exp.current && (
                              <span className="px-2 py-0.5 rounded-full bg-green-500/15 text-green-400 text-xs border border-green-500/25">
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
                                <MapPin className="w-3.5 h-3.5" /> {exp.location}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-gray-500 shrink-0 mt-1">
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </div>

                      {/* Expanded content */}
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 pt-4 border-t border-white/8"
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
    </section>
  );
}
