import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Star, Folder } from 'lucide-react';
import { usePortfolioStore } from '../store/portfolioStore';

const COLORS = [
  'from-violet-500/20 to-indigo-500/20',
  'from-indigo-500/20 to-blue-500/20',
  'from-blue-500/20 to-cyan-500/20',
  'from-cyan-500/20 to-teal-500/20',
  'from-purple-500/20 to-pink-500/20',
];

export default function ProjectsSection() {
  const { data } = usePortfolioStore();
  const { projects } = data;
  const [filter, setFilter] = useState<'all' | 'featured'>('all');

  const displayed = filter === 'featured' ? projects.filter(p => p.featured) : projects;

  return (
    <section id="projects" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-600/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-semibold tracking-widest uppercase mb-4">
            My Work
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 section-heading-line">
            Projects
          </h2>
          <p className="text-gray-400 text-lg mt-6 max-w-xl mx-auto">
            A collection of things I've built — from side projects to professional work.
          </p>
        </motion.div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex justify-center gap-3 mb-12"
        >
          {(['all', 'featured'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all capitalize ${
                filter === f
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/25'
                  : 'glass-card text-gray-400 hover:text-white'
              }`}
            >
              {f === 'all' ? 'All Projects' : '⭐ Featured'}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid md:grid-cols-2 lg:grid-cols-2 gap-6"
          >
            {displayed.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="group glass-card rounded-2xl overflow-hidden hover:border-violet-500/30 hover:shadow-xl hover:shadow-violet-500/10 transition-all"
              >
                {/* Image / placeholder */}
                <div className={`h-48 bg-gradient-to-br ${COLORS[i % COLORS.length]} relative overflow-hidden`}>
                  {project.imageUrl ? (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Folder className="w-12 h-12 text-white/30" />
                    </div>
                  )}
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {project.featured && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-yellow-500/20 border border-yellow-500/30 text-yellow-300 text-xs font-semibold">
                      <Star className="w-3 h-3 fill-current" /> Featured
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-white font-bold text-lg mb-2 group-hover:text-violet-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.technologies.slice(0, 5).map(tech => (
                      <span key={tech} className="px-2 py-0.5 rounded-md bg-white/5 text-gray-400 text-xs border border-white/8">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 5 && (
                      <span className="px-2 py-0.5 rounded-md bg-white/5 text-gray-600 text-xs">
                        +{project.technologies.length - 5}
                      </span>
                    )}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-3">
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-600 text-white text-xs font-semibold hover:bg-violet-500 transition-colors shadow-lg shadow-violet-500/20">
                        <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass-card text-gray-300 text-xs font-semibold hover:text-white hover:border-violet-500/30 transition-all">
                        <Github className="w-3.5 h-3.5" /> Code
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {displayed.length === 0 && (
          <p className="text-center text-gray-500 py-16">No projects found.</p>
        )}
      </div>
    </section>
  );
}
