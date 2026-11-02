import React from 'react';
import {
  User,
  GraduationCap,
  Target,
  Sparkles,
  Heart,
  Compass,
  CheckCircle,
  FileCheck2,
  Code
} from 'lucide-react';
import { ProfileData } from '../types/portfolio';

interface AboutProps {
  profile: ProfileData;
}

export const About: React.FC<AboutProps> = ({ profile }) => {
  const highlights = [
    {
      title: 'Academic Foundation',
      desc: 'BSc Computer Science graduate with strong core concepts in algorithms, computer architecture, and database basics; now advancing in MCA.',
      icon: GraduationCap,
      color: 'from-blue-500/20 to-blue-600/10 border-blue-500/30 text-blue-400'
    },
    {
      title: 'Python & Web Development',
      desc: 'Hands-on beginner in Python scripting and logic, building responsive front-ends with HTML5, CSS3, and JavaScript.',
      icon: Code,
      color: 'from-purple-500/20 to-purple-600/10 border-purple-500/30 text-purple-400'
    },
    {
      title: 'Testing & Quality Discipline',
      desc: 'Enthusiastic about software testing principles, test case authoring, boundary analysis, and manual quality assurance workflows.',
      icon: CheckCircle,
      color: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/30 text-emerald-400'
    },
    {
      title: 'Certified Data Entry Precision',
      desc: 'Certified Data Entry Operator possessing high typing speed, document structuring rigor, and sharp attention to data accuracy.',
      icon: FileCheck2,
      color: 'from-sky-500/20 to-sky-600/10 border-sky-500/30 text-sky-400'
    }
  ];

  return (
    <section id="about" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-medium">
            <User className="w-3.5 h-3.5" />
            <span>DISCOVER MY JOURNEY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            About <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Me</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            An ambitious IT fresher dedicated to building practical software solutions, refining coding fundamentals, and mastering quality processes.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Story Narrative */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Compass className="w-5 h-5 text-blue-400" />
                <span>My Background &amp; Motivation</span>
              </h3>
              
              <div className="space-y-3.5 text-slate-300 text-sm sm:text-base leading-relaxed">
                {profile.aboutBio.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Career Objective Feature Box */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-purple-900/40 border border-blue-500/30 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-blue-300 font-semibold">
                <Target className="w-4 h-4 text-purple-400" />
                <span>Career Objective</span>
              </div>
              <p className="text-sm font-medium text-slate-100 italic">
                &ldquo;{profile.careerObjective}&rdquo;
              </p>
            </div>

            {/* Core Interests Tags */}
            <div className="space-y-2.5 pt-2 border-t border-white/10">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-rose-400" />
                <span>Core Technical Interests</span>
              </span>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900/80 border border-white/10 text-slate-200 hover:border-blue-400/50 hover:text-blue-300 transition-colors"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Highlights 2x2 Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className={`p-5 rounded-2xl bg-gradient-to-br ${item.color} border transition-all duration-300 hover:scale-[1.02] flex flex-col justify-start space-y-2`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-slate-900/80 border border-white/10 shadow-sm">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-bold text-white">{item.title}</h4>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed pl-1">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
