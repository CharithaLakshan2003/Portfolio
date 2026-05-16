import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SECTIONS = [
  { id: 'hero',         label: 'Home' },
  { id: 'about',        label: 'About' },
  { id: 'skills',       label: 'Skills' },
  { id: 'projects',     label: 'Projects' },
  { id: 'experience',   label: 'Experience' },
  { id: 'volunteering', label: 'Volunteer' },
  { id: 'gallery',      label: 'Gallery' },
  { id: 'contact',      label: 'Contact' },
];

export default function DotNav() {
  const [active, setActive] = useState('hero');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show dot nav after scrolling past hero
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.5);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    SECTIONS.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : 20 }}
      transition={{ duration: 0.4 }}
      className="fixed right-5 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3 pointer-events-none"
      style={{ pointerEvents: visible ? 'auto' : 'none' }}
    >
      {SECTIONS.map(s => {
        const isActive = active === s.id;
        return (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            title={s.label}
            className="group relative flex items-center justify-end gap-2"
          >
            {/* Tooltip label */}
            <span className="text-xs text-gray-400 bg-gray-800/90 backdrop-blur-sm border border-white/10 px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              {s.label}
            </span>
            {/* Dot */}
            <div className={`relative flex items-center justify-center transition-all duration-300 ${
              isActive ? 'w-3 h-3' : 'w-2 h-2 hover:w-2.5 hover:h-2.5'
            }`}>
              <div className={`rounded-full transition-all duration-300 ${
                isActive
                  ? 'w-3 h-3 bg-violet-400 shadow-lg shadow-violet-400/50'
                  : 'w-2 h-2 bg-gray-600 group-hover:bg-gray-400'
              }`} />
              {isActive && (
                <motion.div
                  layoutId="dot-ring"
                  className="absolute inset-0 rounded-full border border-violet-400/50 scale-150"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </div>
          </button>
        );
      })}
    </motion.div>
  );
}
