import React from 'react';
import {
  ArrowUp,
  Heart,
  Github,
  Linkedin,
  Mail,
  Code2,
  FileDown
} from 'lucide-react';
import { ProfileData } from '../types/portfolio';

interface FooterProps {
  profile: ProfileData;
  onOpenResume: () => void;
}

export const Footer: React.FC<FooterProps> = ({ profile, onOpenResume }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#04060d] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-white/10 items-start">
          
          {/* Brand & Summary */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-purple-600 p-[1.5px]">
                <div className="w-full h-full bg-[#090d1a] rounded-[6px] flex items-center justify-center">
                  <Code2 className="w-4 h-4 text-blue-400" />
                </div>
              </div>
              <span className="font-bold text-lg text-white">
                {profile.name}
              </span>
            </div>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              BSc Computer Science graduate &amp; MCA postgraduate student seeking entry-level software engineering, quality assurance, or web development roles.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-900 border border-white/5 text-slate-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-900 border border-white/5 text-slate-400 hover:text-blue-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="p-2 rounded-lg bg-slate-900 border border-white/5 text-slate-400 hover:text-emerald-400 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold block">
              Navigation
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-400">
              <a href="#about" className="hover:text-blue-400 transition-colors">About Me</a>
              <a href="#education" className="hover:text-blue-400 transition-colors">Education Timeline</a>
              <a href="#skills" className="hover:text-blue-400 transition-colors">Technical Skills</a>
              <a href="#projects" className="hover:text-blue-400 transition-colors">DriveFlow Project</a>
              <a href="#certifications" className="hover:text-blue-400 transition-colors">Certifications</a>
              <a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a>
            </div>
          </div>

          {/* Direct CTA */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold block">
              Quick Action
            </span>
            <button
              type="button"
              onClick={onOpenResume}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-blue-600/80 hover:bg-blue-600 flex items-center justify-center gap-2 border border-blue-400/30 transition-all"
            >
              <FileDown className="w-4 h-4" />
              <span>Download ATS Resume</span>
            </button>
            <p className="text-[11px] text-slate-500 text-center">
              Available for immediate joining
            </p>
          </div>

        </div>

        {/* Bottom Bar with Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} {profile.name}. All rights reserved. Crafted with React &amp; Tailwind CSS.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/5 transition-colors"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
