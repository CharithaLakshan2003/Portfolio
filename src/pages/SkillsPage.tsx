import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { usePortfolioStore } from '../store/portfolioStore';

const CATEGORIES = ['All', 'Frontend', 'Backend', 'Languages', 'Database', 'DevOps', 'Tools'];

export default function SkillsPage() {
  const { data } = usePortfolioStore();
  const { skills } = data;
  const [activeCategory, setActiveCategory] = useState('All');

  const availableCategories = ['All', ...Array.from(new Set(skills.map((s) => s.category)))];

  const filteredSkills = activeCategory === 'All'
    ? skills
    : skills.filter((s) => s.category === activeCategory);

  const groupedSkills = filteredSkills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  const getLevelLabel = (level: number) => {
    if (level >= 90) return 'Expert';
    if (level >= 75) return 'Advanced';
    if (level >= 60) return 'Intermediate';
    return 'Beginner';
  };

  const getLevelColor = (level: number) => {
    if (level >= 90) return 'from-violet-500 to-purple-500';
    if (level >= 75) return 'from-indigo-500 to-blue-500';
    if (level >= 60) return 'from-sky-500 to-cyan-500';
    return 'from-teal-500 to-green-500';
  };

  return (
    <div className="min-h-screen bg-gray-950 pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Skills & Expertise</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Technologies and tools I've worked with and mastered over the years.
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {availableCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/25'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Skills grid by category */}
        {activeCategory === 'All' ? (
          <div className="space-y-10">
            {Object.entries(groupedSkills).map(([category, categorySkills], catIdx) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: catIdx * 0.05 }}
              >
                <h2 className="text-lg font-semibold text-violet-400 mb-4">{category}</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categorySkills.map((skill, i) => (
                    <SkillCard key={skill.id} skill={skill} delay={i * 0.05} getLevelLabel={getLevelLabel} getLevelColor={getLevelColor} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSkills.map((skill, i) => (
              <SkillCard key={skill.id} skill={skill} delay={i * 0.05} getLevelLabel={getLevelLabel} getLevelColor={getLevelColor} />
            ))}
          </div>
        )}

        {/* Summary stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { number: skills.length, label: 'Total Skills' },
            { number: skills.filter(s => s.level >= 90).length, label: 'Expert Level' },
            { number: skills.filter(s => s.level >= 75 && s.level < 90).length, label: 'Advanced Level' },
            { number: Array.from(new Set(skills.map(s => s.category))).length, label: 'Categories' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
              <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function SkillCard({ skill, delay, getLevelLabel, getLevelColor }: {
  skill: any;
  delay: number;
  getLevelLabel: (n: number) => string;
  getLevelColor: (n: number) => string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/8 hover:border-violet-500/20 transition-all group"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-white font-medium">{skill.name}</span>
        <span className="text-xs text-gray-400 bg-white/5 px-2 py-0.5 rounded-full">
          {getLevelLabel(skill.level)}
        </span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${skill.level}%` }}
          transition={{ delay: delay + 0.2, duration: 0.8, ease: 'easeOut' }}
          className={`h-full rounded-full bg-gradient-to-r ${getLevelColor(skill.level)}`}
        />
      </div>
      <div className="mt-2 text-right text-xs text-gray-500">{skill.level}%</div>
    </motion.div>
  );
}
