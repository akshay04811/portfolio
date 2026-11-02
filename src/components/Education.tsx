import React from 'react';
import {
  GraduationCap,
  Calendar,
  BookOpen,
  Award,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { EducationItem } from '../types/portfolio';

interface EducationProps {
  education: EducationItem[];
}

export const Education: React.FC<EducationProps> = ({ education }) => {
  return (
    <section id="education" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono font-medium">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>ACADEMIC BACKGROUND</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Education <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Timeline</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Structured foundation in Computer Science, bridging fundamental algorithmic theory with modern application engineering.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Glowing Timeline Line */}
          <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 -ml-px w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-transparent opacity-40 hidden sm:block" />

          <div className="space-y-12">
            {education.map((item, index) => {
              const isEven = index % 2 === 0;
              const isPursuing = item.status === 'Currently Pursuing';

              return (
                <div
                  key={item.id}
                  className={`relative flex flex-col sm:flex-row items-center ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Central Node Badge */}
                  <div className="hidden sm:flex absolute left-1/2 -ml-5 w-10 h-10 rounded-full bg-[#0a0f24] border-2 border-blue-400 shadow-lg shadow-blue-500/30 items-center justify-center z-10">
                    <GraduationCap className="w-5 h-5 text-blue-400" />
                  </div>

                  {/* Spacer for other column on desktop */}
                  <div className="hidden sm:block w-1/2" />

                  {/* Card Content Column */}
                  <div className={`w-full sm:w-1/2 ${isEven ? 'sm:pr-12' : 'sm:pl-12'}`}>
                    <div className="glass-panel hover:border-blue-400/40 p-6 sm:p-7 rounded-3xl border border-white/10 shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                      
                      {/* Top Meta Line: Status & Period */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                            isPursuing
                              ? 'bg-blue-500/15 text-blue-300 border border-blue-500/30'
                              : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                          }`}
                        >
                          {isPursuing ? (
                            <>
                              <Clock className="w-3.5 h-3.5 animate-spin" />
                              <span>Currently Pursuing</span>
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Graduated / Completed</span>
                            </>
                          )}
                        </span>

                        <span className="flex items-center gap-1 text-xs font-mono text-slate-400">
                          <Calendar className="w-3.5 h-3.5 text-slate-500" />
                          <span>{item.period}</span>
                        </span>
                      </div>

                      {/* Degree Title */}
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                        {item.degree}
                      </h3>
                      <p className="text-sm font-medium text-slate-300 mt-1">
                        {item.field}
                      </p>
                      <p className="text-xs text-blue-400/90 font-mono mt-0.5">
                        {item.institution}
                      </p>

                      {/* Highlights */}
                      <div className="mt-4 space-y-2 text-xs text-slate-300">
                        {item.highlights.map((highlight, hIdx) => (
                          <div key={hIdx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0" />
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>

                      {/* Key Coursework / Subjects */}
                      <div className="mt-5 pt-4 border-t border-white/10 space-y-2">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                          <BookOpen className="w-3 h-3 text-indigo-400" />
                          <span>Relevant Coursework</span>
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {item.keySubjects.map((subject, sIdx) => (
                            <span
                              key={sIdx}
                              className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-900/80 border border-white/5 text-slate-300"
                            >
                              {subject}
                            </span>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
