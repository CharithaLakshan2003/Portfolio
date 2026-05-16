import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Github, Linkedin, Facebook, Instagram, GraduationCap, User } from 'lucide-react';
import { usePortfolioStore } from '../store/portfolioStore';

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] as const},
});

export default function AboutSection() {
  const { data } = usePortfolioStore();
  const { personalInfo } = data;

  return (
    <section id="about" className="py-28 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
        <div className="absolute -top-40 right-0 w-96 h-96 bg-violet-600/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        {/* Section header */}
        <motion.div {...inView(0)} className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-semibold tracking-widest uppercase mb-4">
            Who I Am
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 section-heading-line">About Me</h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto mt-6">
            A little about who I am, what I do, and what I'm passionate about.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Profile card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="glass-card rounded-3xl p-8 sticky top-24 hover:border-violet-500/20 transition-all">
              {/* Avatar */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  {personalInfo.avatar ? (
                    <img
                      src={personalInfo.avatar}
                      alt={personalInfo.name}
                      className="w-32 h-32 rounded-2xl object-cover border-2 border-violet-500/30 shadow-xl shadow-violet-500/20"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                      <span className="text-white text-5xl font-bold">{personalInfo.name.charAt(0)}</span>
                    </div>
                  )}
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-green-400 border-2 border-gray-950 shadow-lg" />
                </div>
              </div>

              <h3 className="text-lg font-bold text-white text-center mb-1">{personalInfo.name}</h3>
              <p className="text-violet-400 text-center text-sm mb-6">{personalInfo.title}</p>

              {/* Info items */}
              <div className="space-y-3 mb-6">
                {[
                  { icon: MapPin,          value: personalInfo.location,   href: null },
                  { icon: Mail,            value: personalInfo.email,      href: `mailto:${personalInfo.email}` },
                  { icon: Phone,           value: personalInfo.phone,      href: `tel:${personalInfo.phone}` },
                  { icon: GraduationCap,   value: personalInfo.university, href: null },
                ].filter(i => i.value).map(({ icon: Icon, value, href }) => (
                  <div key={value} className="flex items-center gap-3 text-gray-400 text-sm">
                    <Icon className="w-4 h-4 text-violet-400 shrink-0" />
                    {href ? (
                      <a href={href} className="hover:text-violet-300 transition-colors truncate">{value}</a>
                    ) : (
                      <span className="truncate">{value}</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Socials */}
              <div className="flex justify-center gap-2">
                {[
                  { icon: Github,    href: personalInfo.github },
                  { icon: Linkedin,  href: personalInfo.linkedin },
                  { icon: Facebook,  href: personalInfo.facebook },
                  { icon: Instagram, href: personalInfo.instagram },
                ].filter(s => s.href).map(({ icon: Icon, href }) => (
                  <a key={href} href={href!} target="_blank" rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-white/5 text-gray-400 hover:text-white hover:bg-violet-500/20 hover:border-violet-500/30 border border-white/5 transition-all">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Bio + facts */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Bio card */}
            <div className="glass-card rounded-3xl p-8 hover:border-violet-500/20 transition-all">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-violet-400" /> Biography
              </h3>
              <div className="space-y-4">
                {personalInfo.bio.split('\n\n').map((para, i) => (
                  <p key={i} className="text-gray-300 leading-relaxed">{para}</p>
                ))}
              </div>
            </div>

            {/* Quick facts */}
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { label: 'Full Name',  value: personalInfo.name },
                { label: 'Role',       value: personalInfo.title },
                { label: 'Location',   value: 'Sri Lanka' },
                { label: 'Email',      value: personalInfo.email },
                { label: 'Available',  value: 'Open to opportunities' },
                { label: 'Languages',  value: 'English, Sinhala' },
              ].map((fact, i) => (
                <motion.div
                  key={fact.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.06 }}
                  className="glass-card rounded-2xl p-4 hover:border-violet-500/20 transition-all"
                >
                  <span className="text-gray-500 text-xs uppercase tracking-wider">{fact.label}</span>
                  <p className="text-white font-medium mt-1 truncate">{fact.value}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
