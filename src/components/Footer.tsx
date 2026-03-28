import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { usePortfolioStore } from '../store/portfolioStore';

export default function Footer() {
  const { data } = usePortfolioStore();
  const { personalInfo } = data;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-white font-bold text-lg">{personalInfo.name}</h3>
            <p className="text-gray-400 text-sm mt-1">{personalInfo.title}</p>
          </div>

          <div className="flex items-center gap-4">
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
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> by {personalInfo.name} © {year}
          </p>
          <nav className="flex items-center gap-4">
            {['/', '/about', '/skills', '/projects', '/experience', '/contact'].map((path, i) => {
              const labels = ['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'];
              return (
                <Link key={path} to={path}
                  className="text-gray-500 hover:text-gray-300 text-xs transition-colors">
                  {labels[i]}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </footer>
  );
}
