import React, { useState } from 'react';
import {
  Code2,
  CheckCircle,
  FileCheck2,
  Search,
  Filter,
  Layers,
  Sparkles,
  Terminal,
  ShieldCheck,
  Award
} from 'lucide-react';
import { SkillItem, SkillLevel } from '../types/portfolio';
import { filterSkills } from '../utils/portfolioLogic';

interface SkillsProps {
  skills: SkillItem[];
}

export const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Programming',
    'Web Development',
    'Software Testing',
    'Data & Office',
    'Tools & Version Control'
  ];

  const filteredByCategory = filterSkills(skills, selectedCategory);
  const filteredSkills = filteredByCategory.filter((skill) =>
    skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    skill.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getLevelBadge = (level: SkillLevel) => {
    switch (level) {
      case 'Beginner':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
      case 'Foundational':
        return 'bg-blue-500/15 text-blue-300 border-blue-500/30';
      case 'Intermediate':
        return 'bg-purple-500/15 text-purple-300 border-purple-500/30';
      case 'Proficient':
        return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
      default:
        return 'bg-slate-500/15 text-slate-300 border-slate-500/30';
    }
  };

  const getBarColor = (level: SkillLevel) => {
    switch (level) {
      case 'Beginner':
        return 'from-amber-500 to-orange-500';
      case 'Foundational':
        return 'from-blue-500 to-indigo-500';
      case 'Intermediate':
        return 'from-purple-500 to-pink-500';
      case 'Proficient':
        return 'from-emerald-500 to-teal-400';
      default:
        return 'from-blue-500 to-purple-500';
    }
  };

  return (
    <section id="skills" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono font-medium">
            <Layers className="w-3.5 h-3.5" />
            <span>AUTHENTIC EXPERTISE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Technical <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Skills</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Transparent breakdown of technical competencies, foundational programming, testing rigor, and certified data operations.
          </p>
        </div>

        {/* Honest Disclosure Banner */}
        <div className="max-w-4xl mx-auto mb-10 p-4 rounded-2xl bg-slate-900/70 border border-blue-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-xs text-slate-300">
              <span className="font-semibold text-white">Genuine Fresher Skillset:</span>{' '}
              Skill ratings reflect actual practical exposure and academic proficiency without exaggerated claims.
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono shrink-0">
            <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">Beginner</span>
            <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">Foundational</span>
            <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">Intermediate</span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">Proficient</span>
          </div>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="max-w-4xl mx-auto mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 rounded-2xl bg-slate-900/60 border border-white/5 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md shadow-blue-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skill..."
              className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-400 transition-colors"
            />
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="glass-panel hover:border-blue-400/30 p-5 rounded-2xl border border-white/10 shadow-lg flex flex-col justify-between space-y-4 group transition-all duration-300 hover:-translate-y-1"
            >
              <div className="space-y-2">
                {/* Header: Skill Name & Honest Level Badge */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                      {skill.name}
                    </h3>
                    <span className="text-[11px] font-mono text-slate-400">
                      {skill.category}
                    </span>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-semibold border ${getLevelBadge(skill.level)}`}>
                    {skill.level}
                  </span>
                </div>

                {/* Skill Description */}
                <p className="text-xs text-slate-300 leading-relaxed min-h-[38px]">
                  {skill.description}
                </p>
              </div>

              {/* Progress Meter & Metric */}
              <div className="space-y-1.5 pt-2 border-t border-white/5">
                <div className="flex justify-between items-center text-[11px] font-mono">
                  <span className="text-slate-400">{skill.highlight || 'Proficiency'}</span>
                  <span className="text-blue-300 font-semibold">{skill.percentage}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800/80 overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${getBarColor(skill.level)} transition-all duration-700`}
                    style={{ width: `${skill.percentage}%` }}
                  />
                </div>
              </div>
            </div>
          ))}

          {filteredSkills.length === 0 && (
            <div className="col-span-full py-12 text-center text-slate-400">
              <p>No skills found matching &ldquo;{searchQuery}&rdquo;.</p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
