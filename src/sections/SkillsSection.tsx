import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolioStore } from '../store/portfolioStore';

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

const getSkillLogo = (name: string) => {
  const DI = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';
  const normalized = name.toLowerCase().replace('.', '').replace(' ', '');
  
  const mapping: Record<string, string> = {
    'react': 'react/react-original.svg',
    'typescript': 'typescript/typescript-original.svg',
    'nextjs': 'nextjs/nextjs-original.svg',
    'tailwind': 'tailwindcss/tailwindcss-original.svg',
    'tailwindcss': 'tailwindcss/tailwindcss-original.svg',
    'postgresql': 'postgresql/postgresql-original.svg',
    'docker': 'docker/docker-original.svg',
    'aws': 'amazonwebservices/amazonwebservices-plain-wordmark.svg',
    'git': 'git/git-original.svg',
    'java': 'java/java-original.svg',
    'spring': 'spring/spring-original.svg',
    'springboot': 'spring/spring-original.svg',
    'mongodb': 'mongodb/mongodb-original.svg',
    'nodejs': 'nodejs/nodejs-original.svg',
    'javascript': 'javascript/javascript-original.svg',
    'html5': 'html5/html5-original.svg',
    'css': 'css3/css3-original.svg',
    'php': 'php/php-original.svg',
    'mysql': 'mysql/mysql-original.svg',
    'prisma': 'prisma/prisma-original.svg',
    'reactnative': 'react/react-original.svg',
  };

  const path = mapping[normalized] || `${normalized}/${normalized}-original.svg`;
  return `${DI}/${path}`;
};

function SkillCard({ skill, delay }: { skill: any; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02, y: -2 }}
      className="glass-card rounded-2xl p-5 hover:border-violet-500/25 transition-all group"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <img 
            src={getSkillLogo(skill.name)} 
            alt={skill.name} 
            className="w-5 h-5 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <span className="text-white font-medium text-sm">{skill.name}</span>
        </div>
        <span className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
          {getLevelLabel(skill.level)}
        </span>
      </div>
      <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: delay + 0.2, ease: 'easeOut' }}
          className={`h-full rounded-full bg-gradient-to-r ${getLevelColor(skill.level)} shadow-sm`}
        />
      </div>
      <div className="mt-2 text-right text-xs text-gray-600 group-hover:text-gray-400 transition-colors">
        {skill.level}%
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  const { data } = usePortfolioStore();
  const { skills } = data;
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(skills.map(s => s.category)))];

  const filtered = activeCategory === 'All'
    ? skills
    : skills.filter(s => s.category === activeCategory);

  const grouped = filtered.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <section id="skills" className="py-28 bg-gray-900/30 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-indigo-600/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold tracking-widest uppercase mb-4">
            My Toolkit
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 section-heading-line">
            Skills & Expertise
          </h2>
          <p className="text-gray-400 text-lg mt-6 max-w-xl mx-auto">
            Technologies and tools I've worked with and mastered over the years.
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/25'
                  : 'glass-card text-gray-400 hover:text-white hover:border-white/15'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {activeCategory === 'All' ? (
              <div className="space-y-10">
                {Object.entries(grouped).map(([cat, catSkills], ci) => (
                  <div key={cat}>
                    <motion.h3
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: ci * 0.05 }}
                      className="text-sm font-semibold text-violet-400 uppercase tracking-widest mb-4 flex items-center gap-2"
                    >
                      <span className="w-6 h-px bg-violet-500" />
                      {cat}
                    </motion.h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {catSkills.map((skill, i) => (
                        <SkillCard key={skill.id} skill={skill} delay={i * 0.05} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((skill, i) => (
                  <SkillCard key={skill.id} skill={skill} delay={i * 0.05} />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Summary stats */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { number: skills.length,                                           label: 'Total Skills' },
            { number: skills.filter(s => s.level >= 90).length,               label: 'Expert Level' },
            { number: skills.filter(s => s.level >= 75 && s.level < 90).length, label: 'Advanced' },
            { number: Array.from(new Set(skills.map(s => s.category))).length, label: 'Categories' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.06 }}
              className="glass-card rounded-2xl p-5 text-center hover:border-violet-500/20 transition-all"
            >
              <div className="text-2xl font-bold shimmer-text mb-1">{stat.number}</div>
              <div className="text-gray-500 text-xs">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
