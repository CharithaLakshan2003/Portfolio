import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { usePortfolioStore } from '../store/portfolioStore';

export default function Footer() {
  const { data } = usePortfolioStore();
  const { personalInfo } = data;

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="border-t border-white/5 bg-gray-950/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <button onClick={() => scrollTo('hero')} className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center overflow-hidden border border-white/10 shadow-lg group-hover:scale-110 transition-transform">
              <img 
                src={personalInfo.avatar} 
                alt="Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-white font-bold group-hover:text-violet-300 transition-colors">
              {personalInfo.name.split(' ')[0]} Edirimanna
            </span>
          </button>

          {/* Nav links */}
          <div className="flex items-center gap-4 text-sm text-gray-500">
            {['hero','about','skills','projects','experience','volunteering','gallery','contact'].map(id => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="capitalize hover:text-violet-400 transition-colors"
              >
                {id === 'hero' ? 'Home' : id}
              </button>
            ))}
          </div>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {personalInfo.github && (
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer"
                className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/8 transition-all">
                <Github className="w-4 h-4" />
              </a>
            )}
            {personalInfo.linkedin && (
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer"
                className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/8 transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {personalInfo.email && (
              <a href={`mailto:${personalInfo.email}`}
                className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/8 transition-all">
                <Mail className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 text-center text-gray-600 text-sm">
          <p className="flex items-center justify-center gap-1.5">
            Made with <Heart className="w-3.5 h-3.5 text-violet-500 fill-current" /> by Charitha Lakshan Edirimanna
            &nbsp;·&nbsp; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
