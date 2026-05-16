import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, ChevronLeft, ChevronRight, ZoomIn, Images, Grid3X3, LayoutGrid,
} from 'lucide-react';
import { usePortfolioStore } from '../store/portfolioStore';

/* ── Lightbox ──────────────────────────────────────────────────── */
function Lightbox({
  images, index, onClose,
}: {
  images: { id: string; url: string; title: string; category?: string }[];
  index: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(index);

  const prev = useCallback(() => setCurrent(c => (c - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setCurrent(c => (c + 1) % images.length), [images.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [prev, next, onClose]);

  // Lock body scroll while lightbox open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const img = images[current];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[200] flex flex-col"
      style={{ background: 'rgba(3,7,18,0.97)', backdropFilter: 'blur(20px)' }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 shrink-0">
        <div>
          <p className="text-white font-semibold">{img.title}</p>
          {img.category && <p className="text-violet-400 text-xs mt-0.5">{img.category}</p>}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-gray-500 text-sm">{current + 1} / {images.length}</span>
          <button
            onClick={onClose}
            className="p-2 rounded-xl glass-card text-gray-400 hover:text-white hover:border-white/20 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main area */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden px-16 py-6">
        {/* Prev */}
        <button
          onClick={prev}
          className="absolute left-4 z-10 p-3 rounded-2xl glass-card text-gray-300 hover:text-white hover:border-violet-500/30 transition-all hover:-translate-x-0.5"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.98, x: -20 }}
            transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative max-w-5xl w-full max-h-[calc(100vh-200px)]"
          >
            <img
              src={img.url}
              alt={img.title}
              className="w-full h-full object-contain rounded-2xl shadow-2xl shadow-black/70 select-none"
              style={{ maxHeight: 'calc(100vh - 200px)' }}
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>

        {/* Next */}
        <button
          onClick={next}
          className="absolute right-4 z-10 p-3 rounded-2xl glass-card text-gray-300 hover:text-white hover:border-violet-500/30 transition-all hover:translate-x-0.5"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Thumbnail strip */}
      <div className="shrink-0 border-t border-white/5 py-4 px-6 overflow-x-auto">
        <div className="flex gap-2.5 justify-center min-w-max mx-auto">
          {images.map((im, i) => (
            <button
              key={im.id}
              onClick={() => setCurrent(i)}
              className={`relative shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                i === current
                  ? 'border-violet-400 scale-110 shadow-lg shadow-violet-400/30'
                  : 'border-white/10 opacity-40 hover:opacity-75 hover:border-white/25'
              }`}
            >
              <img src={im.url} alt={im.title} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Gallery card ──────────────────────────────────────────────── */
function GalleryCard({
  img,
  index,
  onClick,
  layout,
  isFeatured,
}: {
  img: { id: string; url: string; title: string; category?: string };
  index: number;
  onClick: () => void;
  layout: 'masonry' | 'grid';
  isFeatured?: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  const aspectClass = layout === 'grid'
    ? 'aspect-square'
    : isFeatured
      ? 'aspect-[16/9]'
      : index % 3 === 0 ? 'aspect-[4/5]' : index % 3 === 1 ? 'aspect-[3/4]' : 'aspect-[4/3]';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ scale: layout === 'grid' ? 1.02 : 1.01 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl cursor-pointer glass-card hover:border-violet-500/30 ${aspectClass} group`}
    >
      {/* Image */}
      <img
        src={img.url}
        alt={img.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Dark vignette always visible */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-transparent to-transparent" />

      {/* Overlay on hover */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 bg-violet-900/30 backdrop-blur-[2px]"
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-4">
        {/* Category top-left */}
        {img.category && (
          <motion.span
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : -6 }}
            transition={{ duration: 0.2 }}
            className="self-start px-2.5 py-1 rounded-lg bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest border border-white/10"
          >
            {img.category}
          </motion.span>
        )}

        {/* Bottom: title + zoom icon */}
        <div className="flex items-end justify-between">
          <motion.div
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
            transition={{ duration: 0.25 }}
          >
            <p className="text-white font-semibold text-sm drop-shadow">{img.title}</p>
          </motion.div>

          <motion.div
            animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.8 }}
            transition={{ duration: 0.2 }}
            className="p-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 shadow-lg"
          >
            <ZoomIn className="w-4 h-4 text-white" />
          </motion.div>
        </div>
      </div>

      {/* Featured badge */}
      {isFeatured && (
        <div className="absolute top-3 right-3">
          <span className="px-2.5 py-1 rounded-full bg-violet-500/25 border border-violet-400/30 text-violet-200 text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm">
            Featured
          </span>
        </div>
      )}
    </motion.div>
  );
}

/* ── Main section ──────────────────────────────────────────────── */
export default function GallerySection() {
  const { data } = usePortfolioStore();
  const { gallery } = data;

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [layout, setLayout] = useState<'masonry' | 'grid'>('masonry');

  const categories = ['All', ...Array.from(new Set(gallery.map(g => g.category || 'Other').filter(Boolean)))];
  const filtered = activeCategory === 'All' ? gallery : gallery.filter(g => g.category === activeCategory);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  // Masonry: split into 3 columns
  const cols: (typeof filtered)[] = [[], [], []];
  filtered.forEach((img, i) => cols[i % 3].push(img));

  return (
    <>
      <section id="gallery" className="py-28 bg-gray-900/30 relative overflow-hidden">
        {/* BG accents */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-violet-600/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-semibold tracking-widest uppercase mb-4">
              <Images className="w-3.5 h-3.5" /> Visual Journey
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 section-heading-line">
              Gallery
            </h2>
            <p className="text-gray-400 text-lg mt-6 max-w-xl mx-auto">
              A visual snapshot of my work, projects and journey.
            </p>
          </motion.div>

          {/* Controls row */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap items-center justify-between gap-4 mb-10"
          >
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    activeCategory === cat
                      ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/25'
                      : 'glass-card text-gray-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Layout toggle */}
            <div className="flex items-center gap-1 glass-card rounded-xl p-1">
              <button
                onClick={() => setLayout('masonry')}
                className={`p-2 rounded-lg transition-all ${layout === 'masonry' ? 'bg-violet-600 text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
                title="Masonry layout"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setLayout('grid')}
                className={`p-2 rounded-lg transition-all ${layout === 'grid' ? 'bg-violet-600 text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
                title="Grid layout"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Image count */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-600 text-xs mb-6"
          >
            {filtered.length} {filtered.length === 1 ? 'image' : 'images'}
          </motion.p>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeCategory}-${layout}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {layout === 'masonry' ? (
                /* ── Masonry ── */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cols.map((col, ci) => (
                    <div key={ci} className="flex flex-col gap-4">
                      {col.map((img) => {
                        const gi = filtered.indexOf(img);
                        return (
                          <GalleryCard
                            key={img.id}
                            img={img}
                            index={gi}
                            layout="masonry"
                            isFeatured={gi === 0}
                            onClick={() => setLightboxIndex(gi)}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              ) : (
                /* ── Grid ── */
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filtered.map((img, i) => (
                    <GalleryCard
                      key={img.id}
                      img={img}
                      index={i}
                      layout="grid"
                      onClick={() => setLightboxIndex(i)}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-500">No images in this category.</div>
          )}

          {/* Hint text */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-gray-600 text-xs mt-10"
          >
            Click any image to open the viewer
          </motion.p>
        </div>
      </section>

      {/* Lightbox portal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={filtered}
            index={lightboxIndex}
            onClose={closeLightbox}
          />
        )}
      </AnimatePresence>
    </>
  );
}
