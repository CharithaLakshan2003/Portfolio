import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, Github, Linkedin, Mail, MapPin, Sparkles } from 'lucide-react';
import { usePortfolioStore } from '../store/portfolioStore';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

export default function HomePage() {
  const { data } = usePortfolioStore();
  const { personalInfo, skills } = data;

  const topSkills = skills.slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-20 pt-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text content */}
            <div>
              <motion.div
                {...fadeUp}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm mb-6"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Available for opportunities</span>
              </motion.div>

              <motion.h1
                {...fadeUp}
                transition={{ delay: 0.2 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4"
              >
                Hi, I'm{' '}
                <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                  {personalInfo.name}
                </span>
              </motion.h1>

              <motion.p
                {...fadeUp}
                transition={{ delay: 0.3 }}
                className="text-xl sm:text-2xl text-gray-300 font-medium mb-4"
              >
                {personalInfo.title}
              </motion.p>

              <motion.p
                {...fadeUp}
                transition={{ delay: 0.4 }}
                className="text-gray-400 text-lg leading-relaxed mb-8 max-w-lg"
              >
                {personalInfo.shortBio}
              </motion.p>

              <motion.div
                {...fadeUp}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap items-center gap-4 mb-8"
              >
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold hover:from-violet-500 hover:to-indigo-500 transition-all shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:-translate-y-0.5"
                >
                  Get In Touch
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/15 transition-all border border-white/10"
                >
                  View My Work
                </Link>
              </motion.div>

              {/* Social links */}
              <motion.div
                {...fadeUp}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-4"
              >
                {personalInfo.github && (
                  <a href={personalInfo.github} target="_blank" rel="noopener noreferrer"
                    className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {personalInfo.linkedin && (
                  <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer"
                    className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {personalInfo.email && (
                  <a href={`mailto:${personalInfo.email}`}
                    className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                    <Mail className="w-5 h-5" />
                  </a>
                )}
                {personalInfo.location && (
                  <div className="flex items-center gap-1.5 text-gray-400 text-sm ml-2">
                    <MapPin className="w-4 h-4" />
                    <span>{personalInfo.location}</span>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Avatar / Visual card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="hidden lg:flex justify-center"
            >
              <div className="relative">
                <div className="w-72 h-72 rounded-3xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 border border-white/10 overflow-hidden backdrop-blur-sm">
                  <img
                    src={personalInfo.avatar || '/avatar.jpg'}
                    alt={personalInfo.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Floating skill badges */}
                <div className="absolute -top-4 -right-4 px-3 py-1.5 rounded-lg bg-gray-800 border border-white/10 text-white text-xs font-medium shadow-xl">
                  React
                </div>
                <div className="absolute -bottom-4 -left-4 px-3 py-1.5 rounded-lg bg-gray-800 border border-white/10 text-white text-xs font-medium shadow-xl">
                  TypeScript
                </div>
                <div className="absolute top-1/2 -right-8 px-3 py-1.5 rounded-lg bg-violet-500/20 border border-violet-500/30 text-violet-300 text-xs font-medium shadow-xl">
                  Node.js
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center pt-2">
            <div className="w-1 h-2 rounded-full bg-white/40" />
          </div>
        </motion.div>
      </section>

      {/* Quick stats */}
      <section className="py-20 bg-gray-900/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: '2+', label: 'Years Experience' },
              { number: '4+', label: 'Projects Completed' },
              { number: '5+', label: 'Happy Clients' },
              { number: '12+', label: 'Technologies' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl bg-white/5 border border-white/10"
              >
                <div className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills preview */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Top Skills</h2>
            <p className="text-gray-400">Technologies I work with</p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3">
            {topSkills.map((skill, i) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-sm font-medium hover:bg-white/10 hover:border-violet-500/30 transition-all"
              >
                {skill.name}
              </motion.div>
            ))}
            <Link
              to="/skills"
              className="px-4 py-2 rounded-xl text-violet-400 text-sm font-medium hover:text-violet-300 transition-colors flex items-center gap-1"
            >
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Let's Work Together
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              I'm always interested in new projects and opportunities. Let's create something amazing!
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold hover:from-violet-500 hover:to-indigo-500 transition-all shadow-lg shadow-violet-500/25 text-lg"
            >
              Start a Conversation
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
