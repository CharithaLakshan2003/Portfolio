import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { usePortfolioStore } from '../store/portfolioStore';

const navLinks = [
  { href: '#hero',          label: 'Home' },
  { href: '#about',         label: 'About' },
  { href: '#skills',        label: 'Skills' },
  { href: '#projects',      label: 'Projects' },
  { href: '#experience',    label: 'Experience' },
  { href: '#volunteering',  label: 'Volunteer' },
  { href: '#gallery',       label: 'Gallery' },
  { href: '#contact',       label: 'Contact' },
];

export default function Navbar() {
  const { data } = usePortfolioStore();
  const [isMenuOpen, setIsMenuOpen]     = useState(false);
  const [scrolled, setScrolled]         = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  /* ── scroll shadow ──────────────────────────────────── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── active section via IntersectionObserver ─────────── */
  useEffect(() => {
    const ids = navLinks.map(l => l.href.slice(1));
    const observers: IntersectionObserver[] = [];

    ids.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  /* ── smooth scroll ───────────────────────────────────── */
  const scrollTo = (href: string) => {
    setIsMenuOpen(false);
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || isMenuOpen
          ? 'bg-gray-950/90 backdrop-blur-xl shadow-2xl shadow-black/30 border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ─────────────────────────────────────── */}
          <button
            onClick={() => scrollTo('#hero')}
            className="flex items-center gap-2 group"
          >
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30 group-hover:shadow-violet-500/50 transition-all group-hover:scale-110 overflow-hidden border border-white/10">
              <img 
                src={data.personalInfo.avatar} 
                alt="Logo" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-400/20 to-indigo-400/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-white font-bold text-lg tracking-tight group-hover:text-violet-300 transition-colors">
              CLE
            </span>
          </button>

          {/* ── Desktop Nav ───────────────────────────────── */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-violet-300'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg bg-violet-500/10 border border-violet-500/20"
                      style={{ zIndex: -1 }}
                      transition={{ type: 'spring', stiffness: 380, damping: 36 }}
                    />
                  )}
                </button>
              );
            })}
            <button
              onClick={() => scrollTo('#contact')}
              className="ml-2 px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-500 hover:to-indigo-500 transition-all shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:-translate-y-0.5 active:translate-y-0"
            >
              Hire Me
            </button>
          </div>

          {/* ── Mobile burger ─────────────────────────────── */}
          <button
            onClick={() => setIsMenuOpen(v => !v)}
            className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ───────────────────────────────────── */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-gray-950/95 backdrop-blur-xl border-t border-white/5"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => scrollTo(link.href)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-violet-300 bg-violet-500/10 border border-violet-500/20'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </motion.button>
                );
              })}
              <button
                onClick={() => scrollTo('#contact')}
                className="mt-2 w-full px-4 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 text-white"
              >
                Hire Me
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
