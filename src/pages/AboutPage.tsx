import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Github, Linkedin, Twitter, Download, User } from 'lucide-react';
import { usePortfolioStore } from '../store/portfolioStore';

export default function AboutPage() {
  const { data } = usePortfolioStore();
  const { personalInfo } = data;

  return (
    <div className="min-h-screen bg-gray-950 pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">About Me</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A little bit about who I am, what I do, and what I'm passionate about.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Left: Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 sticky top-24">
              {/* Avatar */}
              <div className="flex justify-center mb-6">
                {personalInfo.avatar ? (
                  <img
                    src={personalInfo.avatar}
                    alt={personalInfo.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-violet-500/30"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center border-4 border-violet-500/30">
                    <span className="text-white text-5xl font-bold">{personalInfo.name.charAt(0)}</span>
                  </div>
                )}
              </div>

              <h2 className="text-xl font-bold text-white text-center mb-1">{personalInfo.name}</h2>
              <p className="text-violet-400 text-center text-sm mb-6">{personalInfo.title}</p>

              {/* Contact info */}
              <div className="space-y-3 mb-6">
                {personalInfo.location && (
                  <div className="flex items-center gap-3 text-gray-400 text-sm">
                    <MapPin className="w-4 h-4 text-violet-400 flex-shrink-0" />
                    <span>{personalInfo.location}</span>
                  </div>
                )}
                {personalInfo.email && (
                  <div className="flex items-center gap-3 text-gray-400 text-sm">
                    <Mail className="w-4 h-4 text-violet-400 flex-shrink-0" />
                    <a href={`mailto:${personalInfo.email}`} className="hover:text-white transition-colors truncate">
                      {personalInfo.email}
                    </a>
                  </div>
                )}
                {personalInfo.phone && (
                  <div className="flex items-center gap-3 text-gray-400 text-sm">
                    <Phone className="w-4 h-4 text-violet-400 flex-shrink-0" />
                    <span>{personalInfo.phone}</span>
                  </div>
                )}
              </div>

              {/* Social Links */}
              <div className="flex justify-center gap-3 mb-6">
                {personalInfo.github && (
                  <a href={personalInfo.github} target="_blank" rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {personalInfo.linkedin && (
                  <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {personalInfo.twitter && (
                  <a href={personalInfo.twitter} target="_blank" rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                    <Twitter className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right: Bio Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-violet-400" />
                Biography
              </h3>
              <div className="space-y-4">
                {personalInfo.bio.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="text-gray-300 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Quick Facts */}
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { label: 'Name', value: personalInfo.name },
                { label: 'Title', value: personalInfo.title },
                { label: 'Location', value: personalInfo.location },
                { label: 'Email', value: personalInfo.email },
                { label: 'Available', value: 'Open to opportunities' },
                { label: 'Languages', value: 'English' },
              ].map((fact) => (
                <div
                  key={fact.label}
                  className="bg-white/5 border border-white/10 rounded-xl p-4"
                >
                  <span className="text-gray-500 text-xs uppercase tracking-wider">{fact.label}</span>
                  <p className="text-white font-medium mt-1 truncate">{fact.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
