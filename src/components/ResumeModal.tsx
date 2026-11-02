import React, { useState } from 'react';
import {
  FileDown,
  Printer,
  Copy,
  Check,
  X,
  ExternalLink,
  GraduationCap,
  Briefcase,
  Layers,
  Award,
  Sparkles
} from 'lucide-react';
import {
  ProfileData,
  EducationItem,
  SkillItem,
  ProjectItem,
  CertificationItem
} from '../types/portfolio';
import { generateAtsResumeText } from '../utils/portfolioLogic';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
  education: EducationItem[];
  skills: SkillItem[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
  profile,
  education,
  skills,
  projects,
  certifications
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const atsText = generateAtsResumeText(profile, education, skills, projects, certifications);

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(atsText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleDownloadTxt = () => {
    const blob = new Blob([atsText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${profile.name.replace(/\s+/g, '_')}_Resume_ATS.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#0b0f1e] border border-blue-500/30 rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Modal Toolbar (Non-printable) */}
        <div className="no-print p-4 sm:p-5 bg-[#0e1428] border-b border-white/10 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400">
              <FileDown className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span>ATS Resume Preview</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                  ATS-Friendly
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Print or download structured resume for recruiters
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyText}
              className="px-3 py-1.5 rounded-xl text-xs font-medium text-slate-300 bg-slate-800 hover:text-white flex items-center gap-1.5 transition-colors"
              title="Copy ATS Plain Text"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadTxt}
              className="px-3 py-1.5 rounded-xl text-xs font-medium text-blue-300 bg-blue-950/60 hover:bg-blue-900/60 border border-blue-500/30 flex items-center gap-1.5 transition-colors"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Download (.txt)</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-95 shadow-md flex items-center gap-1.5 transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print to PDF</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-1"
              aria-label="Close resume preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Resume Content Sheet (Styled for clean dark view & crisp print view) */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-8 bg-slate-950 text-slate-200 text-xs sm:text-sm font-sans selection:bg-blue-900">
          
          {/* Header */}
          <header className="border-b border-slate-800 pb-6 text-center space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
              {profile.name}
            </h1>
            <p className="text-blue-400 font-semibold text-xs sm:text-sm">
              {profile.title}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs text-slate-400 font-mono pt-1">
              <span>{profile.email}</span>
              <span>•</span>
              <span>{profile.phone}</span>
              <span>•</span>
              <span>{profile.location}</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400 pt-1">
              <span>LinkedIn: {profile.linkedinUrl}</span>
              <span>•</span>
              <span>GitHub: {profile.githubUrl}</span>
            </div>
          </header>

          {/* Career Objective */}
          <section className="space-y-2">
            <h2 className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest border-b border-slate-800 pb-1">
              CAREER OBJECTIVE
            </h2>
            <p className="text-slate-300 leading-relaxed">
              {profile.careerObjective}
            </p>
          </section>

          {/* Education */}
          <section className="space-y-4">
            <h2 className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest border-b border-slate-800 pb-1">
              EDUCATION
            </h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="space-y-1">
                  <div className="flex flex-wrap items-baseline justify-between font-bold text-white">
                    <span>{edu.degree} — {edu.field}</span>
                    <span className="text-xs font-mono text-slate-400">{edu.period} ({edu.status})</span>
                  </div>
                  <p className="text-xs text-blue-300 font-mono">{edu.institution}</p>
                  <ul className="list-disc list-inside text-xs text-slate-300 space-y-0.5 pt-1">
                    {edu.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                  <p className="text-xs text-slate-400 pt-0.5">
                    <span className="font-semibold text-slate-300">Coursework:</span>{' '}
                    {edu.keySubjects.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Technical Skills */}
          <section className="space-y-2">
            <h2 className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest border-b border-slate-800 pb-1">
              TECHNICAL SKILLS &amp; COMPETENCIES
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="space-y-1">
                <span className="font-semibold text-white">Programming Languages:</span>
                <p className="text-slate-300">Python (Beginner — Syntax, Logic, File I/O, OOP Basics)</p>
              </div>
              <div className="space-y-1">
                <span className="font-semibold text-white">Web Technologies:</span>
                <p className="text-slate-300">HTML5, CSS3, JavaScript (Foundational), Tailwind CSS</p>
              </div>
              <div className="space-y-1">
                <span className="font-semibold text-white">Software Quality &amp; Testing:</span>
                <p className="text-slate-300">Manual Testing, Test Case Authoring, Defect Logging, STLC</p>
              </div>
              <div className="space-y-1">
                <span className="font-semibold text-white">Data &amp; Office Operations:</span>
                <p className="text-slate-300">Data Entry (Certified, High Accuracy), MS Excel, MS Office Suite</p>
              </div>
              <div className="space-y-1">
                <span className="font-semibold text-white">Tools &amp; Environments:</span>
                <p className="text-slate-300">Git &amp; GitHub, VS Code, Command Line Basics</p>
              </div>
              <div className="space-y-1">
                <span className="font-semibold text-white">Soft Skills:</span>
                <p className="text-slate-300">Fast Learner, Detail-Oriented, Team Collaboration, Problem Solving</p>
              </div>
            </div>
          </section>

          {/* Projects */}
          <section className="space-y-4">
            <h2 className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest border-b border-slate-800 pb-1">
              ACADEMIC PROJECTS
            </h2>
            <div className="space-y-4">
              {projects.map((proj) => (
                <div key={proj.id} className="space-y-1.5">
                  <div className="flex flex-wrap items-baseline justify-between font-bold text-white">
                    <span>
                      {proj.title} {proj.isMainProject && '(Flagship Capstone)'}
                    </span>
                    <span className="text-xs font-mono text-purple-400">{proj.category}</span>
                  </div>
                  <p className="text-xs font-mono text-slate-400">
                    <span className="text-slate-500">Tech:</span> {proj.technologies.join(', ')}
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {proj.overview}
                  </p>
                  <ul className="list-disc list-inside text-xs text-slate-300 space-y-0.5">
                    {proj.keyFeatures.slice(0, 3).map((feat, fIdx) => (
                      <li key={fIdx}>{feat}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Certifications */}
          <section className="space-y-2">
            <h2 className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest border-b border-slate-800 pb-1">
              CERTIFICATIONS
            </h2>
            <div className="space-y-2">
              {certifications.map((cert) => (
                <div key={cert.id} className="text-xs space-y-0.5">
                  <div className="flex justify-between font-bold text-white">
                    <span>{cert.title}</span>
                    <span className="font-mono text-emerald-400">Verified</span>
                  </div>
                  <p className="text-slate-400">{cert.issuingOrganization} • {cert.issueDate}</p>
                  <p className="text-slate-300">
                    Skills: {cert.skillsAcquired.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Interests */}
          <section className="space-y-1">
            <h2 className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest border-b border-slate-800 pb-1">
              INTERESTS
            </h2>
            <p className="text-xs text-slate-300">
              {profile.interests.join(' • ')}
            </p>
          </section>

        </div>

      </div>
    </div>
  );
};
