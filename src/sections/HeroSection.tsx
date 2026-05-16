import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, MapPin, Sparkles } from 'lucide-react';
import { usePortfolioStore } from '../store/portfolioStore';

/* ── Devicon CDN base ─────────────────────────────────────────── */
const DI = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

/* Skills for the two orbital rings */
const OUTER_SKILLS = [
  { name: 'React',       logo: `${DI}/react/react-original.svg` },
  { name: 'Next.js',     logo: `${DI}/nextjs/nextjs-original.svg` },
  { name: 'TypeScript',  logo: `${DI}/typescript/typescript-original.svg` },
  { name: 'Tailwind',    logo: `${DI}/tailwindcss/tailwindcss-original.svg` },
  { name: 'PostgreSQL',  logo: `${DI}/postgresql/postgresql-original.svg` },
  { name: 'Docker',      logo: `${DI}/docker/docker-original.svg` },
  { name: 'AWS',         logo: `${DI}/amazonwebservices/amazonwebservices-plain-wordmark.svg` },
  { name: 'Git',         logo: `${DI}/git/git-original.svg` },
];

const INNER_SKILLS = [
  { name: 'Java',        logo: `${DI}/java/java-original.svg` },
  { name: 'Spring',      logo: `${DI}/spring/spring-original.svg` },
  { name: 'MongoDB',     logo: `${DI}/mongodb/mongodb-original.svg` },
  { name: 'Node.js',     logo: `${DI}/nodejs/nodejs-original.svg` }, 
  { name: 'JavaScript',  logo: `${DI}/javascript/javascript-original.svg` },
  { name: 'HTML5',       logo: `${DI}/html5/html5-original.svg` },
];

/* CSS injected once for orbit keyframes */
const ORBIT_CSS = `
@keyframes orbit-cw  { from { transform: rotate(0deg);   } to { transform: rotate(360deg);  } }
@keyframes orbit-ccw { from { transform: rotate(0deg);   } to { transform: rotate(-360deg); } }
@keyframes counter-cw  { from { transform: rotate(0deg);  } to { transform: rotate(-360deg); } }
@keyframes counter-ccw { from { transform: rotate(0deg);  } to { transform: rotate(360deg);  } }
`;

function OrbitalSkills({ avatarSrc, avatarAlt }: { avatarSrc: string; avatarAlt: string }) {
  /* inject keyframes once */
  useEffect(() => {
    const id = 'orbital-skills-css';
    if (document.getElementById(id)) return;
    const style = document.createElement('style');
    style.id = id;
    style.textContent = ORBIT_CSS;
    document.head.appendChild(style);
  }, []);

  const outerR = 185;
  const innerR = 128;
  const containerSize = (outerR + 36) * 2;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: containerSize, height: containerSize }}
    >
      {/* ── Outer orbit track ─────────────────────── */}
      <div
        className="absolute rounded-full border border-violet-500/15"
        style={{ width: outerR * 2, height: outerR * 2 }}
      />
      {/* ── Inner orbit track ─────────────────────── */}
      <div
        className="absolute rounded-full border border-indigo-500/12"
        style={{ width: innerR * 2, height: innerR * 2 }}
      />

      {/* ── Outer ring (clockwise, 28s) ────────────── */}
      <div
        className="absolute"
        style={{
          width: outerR * 2,
          height: outerR * 2,
          animation: 'orbit-cw 28s linear infinite',
        }}
      >
        {OUTER_SKILLS.map((skill, i) => {
          const angle = (360 / OUTER_SKILLS.length) * i;
          const rad = (angle * Math.PI) / 180;
          const x = outerR + outerR * Math.cos(rad) - 36; // 36 = badge half-width
          const y = outerR + outerR * Math.sin(rad) - 22; // 22 = badge half-height
          return (
            <div
              key={skill.name}
              className="absolute flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-gray-900/90 backdrop-blur-sm border border-white/10 shadow-lg hover:border-violet-500/40 transition-colors group"
              style={{
                left: x,
                top: y,
                animation: 'counter-cw 28s linear infinite',
                minWidth: 80,
              }}
              title={skill.name}
            >
              <img src={skill.logo} alt={skill.name} className="w-4 h-4 shrink-0" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              <span className="text-white text-[10px] font-semibold whitespace-nowrap">{skill.name}</span>
            </div>
          );
        })}
      </div>

      {/* ── Inner ring (counter-clockwise, 20s) ────── */}
      <div
        className="absolute"
        style={{
          width: innerR * 2,
          height: innerR * 2,
          animation: 'orbit-ccw 20s linear infinite',
        }}
      >
        {INNER_SKILLS.map((skill, i) => {
          const angle = (360 / INNER_SKILLS.length) * i;
          const rad = (angle * Math.PI) / 180;
          const x = innerR + innerR * Math.cos(rad) - 32;
          const y = innerR + innerR * Math.sin(rad) - 20;
          return (
            <div
              key={skill.name}
              className="absolute flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-gray-950/90 backdrop-blur-sm border border-indigo-500/20 shadow-lg hover:border-indigo-400/50 transition-colors"
              style={{
                left: x,
                top: y,
                animation: 'counter-ccw 20s linear infinite',
                minWidth: 76,
              }}
              title={skill.name}
            >
              <img src={skill.logo} alt={skill.name} className="w-4 h-4 shrink-0" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              <span className="text-indigo-200 text-[10px] font-semibold whitespace-nowrap">{skill.name}</span>
            </div>
          );
        })}
      </div>

      {/* ── Central avatar ────────────────────────── */}
      <div className="relative z-10 w-52 h-52 rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-violet-500/25 glow-violet">
        <img
          src={avatarSrc}
          alt={avatarAlt}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 via-transparent to-transparent" />
      </div>

      {/* Subtle center glow */}
      <div className="absolute w-52 h-52 rounded-3xl bg-violet-500/8 blur-2xl pointer-events-none" />
    </div>
  );
}

const TYPED_TITLES = [
  'Full-Stack Developer',
  'React Specialist',
  'Spring Boot Engineer',
  'Problem Solver',
];

function useTypewriter(words: string[], speed = 80, pause = 1800) {
  const [displayed, setDisplayed] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplayed(current.slice(0, charIndex + 1));
        if (charIndex + 1 === current.length) {
          setTimeout(() => setDeleting(true), pause);
        } else {
          setCharIndex(c => c + 1);
        }
      } else {
        setDisplayed(current.slice(0, charIndex - 1));
        if (charIndex === 0) {
          setDeleting(false);
          setWordIndex(w => w + 1);
        } else {
          setCharIndex(c => c - 1);
        }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex, words, speed, pause]);

  return displayed;
}

export default function HeroSection() {
  const { data } = usePortfolioStore();
  const { personalInfo } = data;
  const typed = useTypewriter(TYPED_TITLES);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /* ── tiny particle canvas ─────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf: number;
    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const dots = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.4 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach(d => {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0) d.x = canvas.width;
        if (d.x > canvas.width) d.x = 0;
        if (d.y < 0) d.y = canvas.height;
        if (d.y > canvas.height) d.y = 0;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139,92,246,${d.alpha})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 32 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] as const },
  });

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Gradient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[480px] h-[480px] bg-violet-600/12 rounded-full blur-3xl animate-float-orb" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-3xl animate-float-orb-2" />
        <div className="absolute top-2/3 left-1/2 w-[300px] h-[300px] bg-purple-500/8 rounded-full blur-3xl animate-float-orb-3" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-24 pt-32">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* ── Text side ─────────────────────────────── */}
          <div>
            <motion.div {...fadeUp(0.1)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm mb-6"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Available for opportunities</span>
              <span className="w-2 h-2 rounded-full bg-green-400 animate-ping-slow" />
            </motion.div>

            <motion.h1 {...fadeUp(0.2)}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4"
            >
              Hi, I'm{' '}
              <span className="shimmer-text">{personalInfo.name.split(' ')[0]}</span>
              <br />
              <span className="text-white">{personalInfo.name.split(' ').slice(1).join(' ')}</span>
            </motion.h1>

            {/* Typewriter */}
            <motion.div {...fadeUp(0.3)} className="text-xl sm:text-2xl text-violet-300 font-semibold mb-5 h-8">
              <span>{typed}</span>
              <span className="cursor-blink" />
            </motion.div>

            <motion.p {...fadeUp(0.4)}
              className="text-gray-400 text-lg leading-relaxed mb-8 max-w-lg"
            >
              {personalInfo.shortBio}
            </motion.p>

            {/* CTA buttons */}
            <motion.div {...fadeUp(0.5)} className="flex flex-wrap gap-4 mb-8">
              <button
                onClick={() => scrollTo('contact')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold hover:from-violet-500 hover:to-indigo-500 transition-all shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 hover:-translate-y-0.5 active:translate-y-0"
              >
                Get In Touch
              </button>
              <button
                onClick={() => scrollTo('projects')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/8 text-white font-semibold hover:bg-white/12 transition-all border border-white/10"
              >
                View My Work
              </button>
            </motion.div>

            {/* Socials */}
            <motion.div {...fadeUp(0.6)} className="flex items-center gap-3">
              {personalInfo.github && (
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer"
                  className="p-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all border border-white/5 hover:border-violet-500/30">
                  <Github className="w-5 h-5" />
                </a>
              )}
              {personalInfo.linkedin && (
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer"
                  className="p-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all border border-white/5 hover:border-violet-500/30">
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {personalInfo.email && (
                <a href={`mailto:${personalInfo.email}`}
                  className="p-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all border border-white/5 hover:border-violet-500/30">
                  <Mail className="w-5 h-5" />
                </a>
              )}
              {personalInfo.location && (
                <div className="flex items-center gap-1.5 text-gray-500 text-sm ml-1">
                  <MapPin className="w-4 h-4" />
                  <span>Sri Lanka</span>
                </div>
              )}
            </motion.div>
          </div>

          {/* ── Avatar + Orbital Skills ────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="hidden lg:flex justify-center"
          >
            <OrbitalSkills avatarSrc={personalInfo.avatar || '/avatar.jpg'} avatarAlt={personalInfo.name} />
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20"
        >
          {[
            { number: '2+', label: 'Years Experience' },
            { number: '4+', label: 'Projects Built' },
            { number: '12+', label: 'Technologies' },
            { number: '100%', label: 'Commitment' },
          ].map((s) => (
            <div key={s.label} className="text-center p-5 rounded-2xl glass-card hover:border-violet-500/20 transition-all">
              <div className="text-2xl font-bold shimmer-text mb-1">{s.number}</div>
              <div className="text-gray-500 text-xs">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollTo('about')}
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 hover:text-violet-400 transition-colors"
        aria-label="Scroll down"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ArrowDown className="w-4 h-4" />
      </motion.button>
    </section>
  );
}
