import React, { useState, useEffect } from 'react';
import {
  FileDown,
  ArrowRight,
  Sparkles,
  Github,
  Linkedin,
  Mail,
  GraduationCap,
  Code2,
  CheckCircle2,
  Briefcase
} from 'lucide-react';
import { ProfileData } from '../types/portfolio';

interface HeroProps {
  profile: ProfileData;
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ profile, onOpenResume }) => {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Animated typing effect
  useEffect(() => {
    const currentTitle = profile.typingTitles[titleIndex] || profile.title;
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayText.length < currentTitle.length) {
        timer = setTimeout(() => {
          setDisplayText(currentTitle.slice(0, displayText.length + 1));
        }, 80);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentTitle.slice(0, displayText.length - 1));
        }, 40);
      } else {
        setIsDeleting(false);
        setTitleIndex((prev) => (prev + 1) % profile.typingTitles.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, titleIndex, profile.typingTitles, profile.title]);

  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center pt-28 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-emerald-300 text-xs font-medium shadow-lg shadow-emerald-950/40">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Available for Entry-Level IT Roles & Internships</span>
            </div>

            {/* Main Greeting & Name */}
            <div className="space-y-2">
              <p className="text-sm sm:text-base font-mono text-blue-400 uppercase tracking-widest font-semibold flex items-center justify-center lg:justify-start gap-2">
                <span>Hello, I am</span>
                <span className="h-px w-8 bg-blue-500/60 inline-block" />
              </p>
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
                <span className="block">{profile.name}</span>
                <span className="block text-2xl sm:text-4xl xl:text-5xl font-bold mt-2 bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                  IT Fresher & Developer
                </span>
              </h1>
            </div>

            {/* Dynamic Animated Typing Text */}
            <div className="h-10 flex items-center justify-center lg:justify-start">
              <div className="font-mono text-base sm:text-xl text-slate-300 flex items-center gap-1.5 bg-slate-900/40 px-3 py-1.5 rounded-lg border border-white/5">
                <span className="text-purple-400">&gt;</span>
                <span className="font-medium text-blue-300">{displayText}</span>
                <span className="w-2 h-5 bg-blue-400 animate-pulse ml-0.5 inline-block" />
              </div>
            </div>

            {/* Career Objective / Brief Summary */}
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {profile.careerObjective}
            </p>

            {/* Key Value Proposition Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-2">
              <span className="px-3 py-1 rounded-md text-xs bg-slate-900/80 border border-blue-500/20 text-slate-300 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-blue-400" />
                BSc CS Graduate • MCA Ongoing
              </span>
              <span className="px-3 py-1 rounded-md text-xs bg-slate-900/80 border border-purple-500/20 text-slate-300 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-purple-400" />
                Python (Beginner) & Web Basics
              </span>
              <span className="px-3 py-1 rounded-md text-xs bg-slate-900/80 border border-emerald-500/20 text-slate-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Certified Data Entry Operator
              </span>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              <a
                href="#projects"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 transition-all duration-200 flex items-center justify-center gap-2 group active:scale-95"
              >
                <span>View DriveFlow Project</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                type="button"
                onClick={onOpenResume}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-200 bg-slate-900/80 hover:bg-slate-800/80 border border-blue-400/30 hover:border-blue-400/60 shadow-lg hover:shadow-blue-500/10 transition-all duration-200 flex items-center justify-center gap-2 active:scale-95"
              >
                <FileDown className="w-4 h-4 text-blue-400" />
                <span>Download Resume</span>
              </button>

              <a
                href="#contact"
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl font-medium text-sm text-slate-400 hover:text-white transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Contact Me</span>
              </a>
            </div>

            {/* Social Icons Quick Bar */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-4 text-xs text-slate-400">
              <span className="font-mono">Find me:</span>
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-blue-400 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <span className="text-slate-700">•</span>
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-blue-400 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
              <span className="text-slate-700">•</span>
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-1.5 hover:text-blue-400 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </a>
            </div>
          </div>

          {/* Right Column: High-Tech Profile Card & Portrait Avatar */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Outer Glow Halo */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 rounded-3xl blur-xl opacity-40 animate-pulse" />

              {/* Glassmorphic Profile Card */}
              <div className="relative bg-[#0d1222]/90 backdrop-blur-xl rounded-3xl border border-white/10 p-6 sm:p-8 shadow-2xl space-y-6">
                
                {/* Visual Avatar / Photo Area */}
                <div className="relative mx-auto w-48 h-48 sm:w-56 sm:h-56 rounded-2xl p-1 bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-500 shadow-xl group">
                  <div className="w-full h-full rounded-[14px] bg-[#070b16] overflow-hidden flex flex-col items-center justify-center relative">
                    
                    {/* Futuristic Developer Portrait Canvas */}
                    <div className="w-full h-full bg-gradient-to-b from-blue-950/60 to-slate-950 flex flex-col items-center justify-center p-4 text-center select-none relative">
                      {/* Grid background on avatar */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:16px_16px]" />

                      {/* Stylized Developer Silhouette / Monogram */}
                      <div className="relative z-10 w-24 h-24 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 p-0.5 shadow-xl shadow-blue-500/30 mb-3">
                        <div className="w-full h-full rounded-full bg-[#0b1021] flex items-center justify-center">
                          <span className="text-3xl font-extrabold tracking-wider bg-gradient-to-br from-blue-300 via-indigo-200 to-purple-300 bg-clip-text text-transparent">
                            AB
                          </span>
                        </div>
                        {/* Live active ring indicator */}
                        <div className="absolute bottom-0 right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#070b16] shadow-sm flex items-center justify-center">
                          <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                        </div>
                      </div>

                      <span className="relative z-10 text-white font-bold text-base tracking-wide">
                        {profile.name}
                      </span>
                      <span className="relative z-10 text-xs font-mono text-blue-400 mt-0.5">
                        @akshay-b • MCA
                      </span>

                      {/* Small badge */}
                      <div className="relative z-10 mt-3 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-[10px] text-blue-300 font-medium">
                        <Sparkles className="w-3 h-3 text-purple-400" />
                        <span>Ready to build & learn</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Info Grid inside Hero Card */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 space-y-1">
                    <span className="text-[10px] uppercase font-mono text-slate-400 tracking-wider">Education</span>
                    <p className="text-xs font-semibold text-white truncate">BSc CS &amp; MCA</p>
                    <p className="text-[11px] text-blue-400">Computer Science</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 space-y-1">
                    <span className="text-[10px] uppercase font-mono text-slate-400 tracking-wider">Experience</span>
                    <p className="text-xs font-semibold text-white truncate">Fresher</p>
                    <p className="text-[11px] text-emerald-400">Entry-Level Eager</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 space-y-1">
                    <span className="text-[10px] uppercase font-mono text-slate-400 tracking-wider">Main Project</span>
                    <p className="text-xs font-semibold text-white truncate">DriveFlow</p>
                    <p className="text-[11px] text-purple-400">Vehicle Rental/Sales</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 space-y-1">
                    <span className="text-[10px] uppercase font-mono text-slate-400 tracking-wider">Primary Language</span>
                    <p className="text-xs font-semibold text-white truncate">Python</p>
                    <p className="text-[11px] text-sky-400">Beginner Level</p>
                  </div>
                </div>

                {/* Quick Career Goal Tagline */}
                <div className="pt-1 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-blue-400" />
                    <span>Goal: Junior Software Dev / QA</span>
                  </span>
                  <span className="font-mono text-emerald-400 font-semibold">Immediate Joiner</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
