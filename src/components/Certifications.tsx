import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  FileCheck2,
  Calendar,
  X,
  Sparkles,
  Printer
} from 'lucide-react';
import { CertificationItem } from '../types/portfolio';

interface CertificationsProps {
  certifications: CertificationItem[];
}

export const Certifications: React.FC<CertificationsProps> = ({ certifications }) => {
  const [activeCert, setActiveCert] = useState<CertificationItem | null>(null);

  return (
    <section id="certifications" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium">
            <Award className="w-3.5 h-3.5" />
            <span>VERIFIED QUALIFICATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Professional <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Certifications</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Formal recognition demonstrating practical precision, digital document management, and high-speed data handling.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="max-w-4xl mx-auto space-y-6">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="glass-panel hover:border-emerald-500/40 p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div className="flex items-center gap-4">
                  <div className="p-3.5 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 text-emerald-400 border border-emerald-500/30 shadow-lg shadow-emerald-500/10">
                    <FileCheck2 className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                        {cert.title}
                      </h3>
                      {cert.verified && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Verified</span>
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                      {cert.issuingOrganization}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveCert(cert)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-emerald-300 bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/30 transition-colors flex items-center gap-1.5 self-end sm:self-auto"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>View Certificate</span>
                </button>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-5">
                {cert.description}
              </p>

              {/* Acquired Competencies */}
              <div className="mt-5 space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Key Skills Validated:
                </span>
                <div className="flex flex-wrap gap-2">
                  {cert.skillsAcquired.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900/80 border border-white/5 text-slate-200 flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{skill}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer Meta */}
              <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between text-xs text-slate-400 font-mono">
                <span>Credential ID: {cert.credentialId || 'DEO-2023-VERIFIED'}</span>
                <span>Issue Date: {cert.issueDate}</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ========================================================================= */}
      {/* CERTIFICATE DETAIL PREVIEW MODAL */}
      {/* ========================================================================= */}
      {activeCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-[#090d1c] border-2 border-emerald-500/40 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6">
            
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>Certificate of Qualification</span>
              </span>
              <button
                type="button"
                onClick={() => setActiveCert(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                aria-label="Close certificate modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Stylized Certificate Plaque */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0c142b] to-[#080d1d] border-4 border-double border-emerald-500/30 text-center space-y-4 relative overflow-hidden">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 flex items-center justify-center shadow-lg">
                <Award className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h4 className="text-xs uppercase font-mono tracking-widest text-slate-400">
                  This Certifies That
                </h4>
                <p className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
                  AKSHAY B
                </p>
                <p className="text-xs text-slate-300">
                  has successfully qualified in
                </p>
                <h5 className="text-lg font-bold text-emerald-300">
                  {activeCert.title}
                </h5>
              </div>

              <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                Demonstrating high typing speed, accuracy, database records entry, spreadsheet manipulation, and administrative data integrity.
              </p>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Issuer: {activeCert.issuingOrganization}</span>
                <span className="text-emerald-400 font-semibold">Status: Verified</span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Document</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveCert(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
