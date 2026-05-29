import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, ExternalLink, Heart, MapPin } from 'lucide-react';
import { usePortfolioStore } from '../store/portfolioStore';

const formatDate = (date: string) => {
  if (!date) return '';
  const [year, month] = date.split('-');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${months[parseInt(month) - 1]} ${year}`;
};

export default function VolunteeringSection() {
  const { data } = usePortfolioStore();
  const { volunteering } = data;
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="volunteering" className="py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-emerald-600/4 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-violet-600/4 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold tracking-widest uppercase mb-4">
            <Heart className="w-3.5 h-3.5" /> Community
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 section-heading-line">
            Volunteering
          </h2>
          <p className="text-gray-400 text-lg mt-6 max-w-xl mx-auto">
            University clubs and communities I'm actively involved in.
          </p>
        </motion.div>

        {/* One card per row */}
        <div className="space-y-6">
          {volunteering.map((club, i) => (
            <motion.div
              key={club.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -32 : 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.65, delay: i * 0.1 }}
              onHoverStart={() => setHovered(club.id)}
              onHoverEnd={() => setHovered(null)}
              whileHover={{ y: -4 }}
              className="relative glass-card rounded-3xl overflow-hidden hover:border-violet-500/30 hover:shadow-2xl hover:shadow-violet-500/10 transition-all"
            >
              {/* Colour accent bar on left */}
              <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${club.color || 'from-violet-500 to-indigo-500'}`} />

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 p-6 sm:p-8 pl-8 sm:pl-10">
                {/* ── Logo ────────────────────────────── */}
                <div className="shrink-0 w-full sm:w-auto flex justify-center sm:block">
                  <div className="relative flex items-center justify-center sm:min-w-[18rem]">
                    {club.logo ? (
                      <img
                        src={club.logo}
                        alt={club.clubName}
                        className="w-40 sm:w-72 h-auto max-h-40 sm:max-h-72 object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          const img = e.target as HTMLImageElement;
                          img.style.display = 'none';
                          const fb = img.nextElementSibling as HTMLElement | null;
                          if (fb) fb.classList.remove('hidden');
                        }}
                      />
                    ) : null}
                    <div className={`fallback-text hidden flex items-center justify-center w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-white/5 border border-white/10 text-white font-bold text-3xl sm:text-4xl select-none ${club.logo ? '' : '!flex'}`}>
                      {club.logoFallback || club.clubName.slice(0, 2).toUpperCase()}
                    </div>
                  </div>
                </div>

                {/* ── Content ─────────────────────────── */}
                <div className="flex-1 min-w-0 w-full flex flex-col items-center sm:items-start text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 mb-4 w-full">
                    <div className="flex flex-col items-center sm:items-start">
                      <h3 className="text-white font-bold text-xl mb-2 sm:mb-1 leading-snug">
                        {club.clubName}
                      </h3>
                      <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                        <span className="flex items-center gap-1.5 text-violet-400 text-sm font-semibold">
                          <Users className="w-3.5 h-3.5" />
                          {club.role}
                        </span>
                        {club.current && (
                          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/25 text-emerald-300 text-xs font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping-slow" />
                            Active
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {club.link && (
                        <a
                          href={club.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass-card text-gray-400 hover:text-violet-300 hover:border-violet-500/30 text-xs font-medium transition-all"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          Visit
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm leading-relaxed mb-5 sm:mb-4">
                    {club.description}
                  </p>

                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4 text-gray-600 text-xs w-full">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(club.startDate)} – {club.current ? 'Present' : (club.endDate ? formatDate(club.endDate) : '')}
                    </span>
                    {club.clubName.includes('UCSC') && (
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        UCSC, Colombo
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Hover overlay */}
              <motion.div
                animate={{ opacity: hovered === club.id ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className={`absolute inset-0 bg-gradient-to-r ${club.color || 'from-violet-500/5 to-indigo-500/5'} pointer-events-none`}
              />
            </motion.div>
          ))}
        </div>

        {volunteering.length === 0 && (
          <div className="text-center py-16 text-gray-500">No volunteering entries yet.</div>
        )}

        {/* Quote */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-gray-600 text-sm italic mt-14"
        >
          "Alone we can do so little; together we can do so much."
        </motion.p>
      </div>
    </section>
  );
}
