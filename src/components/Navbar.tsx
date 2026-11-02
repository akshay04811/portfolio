import React, { useState, useEffect } from 'react';
import {
  FileDown,
  UserCheck,
  Menu,
  X,
  Github,
  Linkedin,
  Mail,
  SlidersHorizontal,
  Code2
} from 'lucide-react';
import { ProfileData } from '../types/portfolio';

interface NavbarProps {
  profile: ProfileData;
  onOpenResume: () => void;
  onOpenEditProfile: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  onOpenResume,
  onOpenEditProfile
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['hero', 'about', 'education', 'skills', 'projects', 'certifications', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Education', href: '#education' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#05070f]/85 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/30 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <a
            href="#hero"
            className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-lg p-1"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 p-[1.5px] shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow">
              <div className="w-full h-full bg-[#090d1a] rounded-[10px] flex items-center justify-center">
                <Code2 className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all">
                  {profile.name}
                </span>
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Available for Hire" />
              </div>
              <p className="text-[11px] font-mono text-slate-400 leading-none">
                BSc CS • MCA Student
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-white/5 backdrop-blur-sm">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/30 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Action CTAs & Socials */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Social Links */}
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/70 border border-white/5 transition-all"
              title="GitHub Profile"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-slate-300 hover:text-blue-400 hover:bg-slate-800/70 border border-white/5 transition-all"
              title="LinkedIn Profile"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            {/* Edit details button */}
            <button
              type="button"
              onClick={onOpenEditProfile}
              className="p-2 rounded-lg text-slate-400 hover:text-purple-300 hover:bg-purple-950/30 border border-purple-500/20 transition-all text-xs flex items-center gap-1.5"
              title="Edit Profile Details"
              aria-label="Edit Profile Details"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span className="hidden xl:inline text-[11px]">Edit Info</span>
            </button>

            {/* Resume Button */}
            <button
              type="button"
              onClick={onOpenResume}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-95 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 active:scale-95 transition-all"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>
          </div>

          {/* Mobile menu hamburger toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              type="button"
              onClick={onOpenResume}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-blue-600 flex items-center gap-1"
            >
              <FileDown className="w-3 h-3" />
              <span>CV</span>
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white bg-slate-900/80 border border-white/10"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden px-4 pt-3 pb-6 bg-[#070b18]/95 backdrop-blur-xl border-b border-white/10 mt-2 space-y-3 animate-in fade-in slide-in-from-top-2">
          <nav aria-label="Mobile navigation" className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/70 border border-white/5"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-slate-300 bg-slate-800/60"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-slate-300 bg-slate-800/60"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="p-2 rounded-lg text-slate-300 bg-slate-800/60"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEditProfile();
              }}
              className="text-xs text-purple-300 flex items-center gap-1 px-3 py-1.5 rounded-lg bg-purple-950/40 border border-purple-500/30"
            >
              <SlidersHorizontal className="w-3 h-3" />
              <span>Edit Details</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
