import React, { useState, useRef } from 'react';
import {
  Award,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  FileCheck2,
  Calendar,
  X,
  Sparkles,
  Printer,
  Upload,
  Plus,
  Trash2,
  Eye,
  FileText,
  Image as ImageIcon,
  Download,
  ZoomIn,
  ZoomOut,
  RefreshCw
} from 'lucide-react';
import { CertificationItem } from '../types/portfolio';
import { validateCertificateForm } from '../utils/portfolioLogic';

interface CertificationsProps {
  certifications: CertificationItem[];
  onAddCertificate: (cert: CertificationItem) => void;
  onDeleteCertificate: (id: string) => void;
  onResetCertificates: () => void;
}

export const Certifications: React.FC<CertificationsProps> = ({
  certifications,
  onAddCertificate,
  onDeleteCertificate,
  onResetCertificates
}) => {
  const [activeCert, setActiveCert] = useState<CertificationItem | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const [imageZoom, setImageZoom] = useState<number>(1);

  // New Certificate Form State
  const [title, setTitle] = useState('');
  const [issuingOrg, setIssuingOrg] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [credentialId, setCredentialId] = useState('');
  const [skillsText, setSkillsText] = useState('');
  const [description, setDescription] = useState('');
  const [fileUrl, setFileUrl] = useState<string | undefined>(undefined);
  const [fileName, setFileName] = useState<string | undefined>(undefined);
  const [fileType, setFileType] = useState<'image' | 'pdf' | undefined>(undefined);
  const [formError, setFormError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const isPdf = file.type === 'application/pdf';
    setFileType(isPdf ? 'pdf' : 'image');

    const reader = new FileReader();
    reader.onload = (event) => {
      setFileUrl(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleGenerateSample = () => {
    // Generate a clean sample SVG certificate as a data URL for instant testing
    const sampleSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="560" viewBox="0 0 800 560" style="background:#0c1228;font-family:sans-serif;">
      <rect x="20" y="20" width="760" height="520" fill="none" stroke="#38bdf8" stroke-width="4" stroke-dasharray="12,6" rx="20"/>
      <rect x="35" y="35" width="730" height="490" fill="none" stroke="#818cf8" stroke-width="1.5" rx="14"/>
      <circle cx="400" cy="110" r="42" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
      <text x="400" y="118" fill="#38bdf8" font-size="28" text-anchor="middle" font-weight="bold">★</text>
      <text x="400" y="190" fill="#94a3b8" font-size="14" font-weight="600" text-anchor="middle" letter-spacing="4">OFFICIAL CERTIFICATE OF COMPLETION</text>
      <text x="400" y="240" fill="#ffffff" font-size="28" font-weight="bold" text-anchor="middle">PROUDLY PRESENTED TO</text>
      <text x="400" y="295" fill="#38bdf8" font-size="34" font-weight="900" text-anchor="middle">AKSHAY B</text>
      <line x1="220" y1="315" x2="580" y2="315" stroke="#475569" stroke-width="2"/>
      <text x="400" y="355" fill="#cbd5e1" font-size="16" text-anchor="middle">for successfully demonstrating required competencies in</text>
      <text x="400" y="390" fill="#c084fc" font-size="22" font-weight="bold" text-anchor="middle">Professional IT &amp; Technical Skills</text>
      <text x="180" y="475" fill="#64748b" font-size="12" text-anchor="middle">AUTHORIZED SIGNATURE</text>
      <line x1="100" y1="455" x2="260" y2="455" stroke="#64748b" stroke-width="1"/>
      <text x="620" y="475" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">VERIFIED CREDENTIAL</text>
      <text x="620" y="492" fill="#64748b" font-size="11" text-anchor="middle">ID: CERT-2024-AKSHAY</text>
    </svg>`;
    const dataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(sampleSvg)}`;
    setFileUrl(dataUrl);
    setFileName('Sample_Certificate_Akshay.svg');
    setFileType('image');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateCertificateForm(title, issuingOrg);
    if (!validation.isValid) {
      setFormError(validation.error || 'Please fill required fields.');
      return;
    }

    const skillsArray = skillsText
      ? skillsText.split(',').map((s) => s.trim()).filter(Boolean)
      : ['Practical Application', 'Verification & Quality'];

    const newCert: CertificationItem = {
      id: `cert-${Date.now()}`,
      title: title.trim(),
      issuingOrganization: issuingOrg.trim(),
      issueDate: issueDate.trim() || 'Verified',
      credentialId: credentialId.trim() || `ID-${Math.floor(100000 + Math.random() * 900000)}`,
      verified: true,
      skillsAcquired: skillsArray,
      description:
        description.trim() ||
        `Verified credential in ${title.trim()} issued by ${issuingOrg.trim()}. Demonstrates applied technical expertise.`,
      fileUrl,
      fileName,
      fileType
    };

    onAddCertificate(newCert);
    setIsUploadModalOpen(false);

    // Reset Form
    setTitle('');
    setIssuingOrg('');
    setIssueDate('');
    setCredentialId('');
    setSkillsText('');
    setDescription('');
    setFileUrl(undefined);
    setFileName(undefined);
    setFileType(undefined);
    setFormError(null);
  };

  return (
    <section id="certifications" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium">
              <Award className="w-3.5 h-3.5" />
              <span>VERIFIED QUALIFICATIONS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Certifications &amp; <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Credentials</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Formal recognition demonstrating practical precision, digital document management, and certified technical capabilities.
            </p>
          </div>

          {/* Action: Upload Certificate Button */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setIsUploadModalOpen(true)}
              className="px-5 py-3 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 shadow-xl shadow-emerald-600/20 hover:shadow-emerald-600/40 flex items-center gap-2 active:scale-95 transition-all"
            >
              <Upload className="w-4 h-4" />
              <span>Upload Certificate</span>
            </button>
          </div>
        </div>

        {/* Certifications List */}
        <div className="max-w-4xl mx-auto space-y-6">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="glass-panel hover:border-emerald-500/40 p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div className="flex items-center gap-4">
                  <div className="p-3.5 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 text-emerald-400 border border-emerald-500/30 shadow-lg shadow-emerald-500/10 shrink-0">
                    <FileCheck2 className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                        {cert.title}
                      </h3>
                      {cert.verified && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Verified</span>
                        </span>
                      )}
                      {cert.fileUrl && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-blue-500/20 text-blue-300 border border-blue-500/30">
                          <ImageIcon className="w-3 h-3" />
                          <span>Attachment Available</span>
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                      {cert.issuingOrganization}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveCert(cert);
                      setImageZoom(1);
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-emerald-300 bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/30 transition-colors flex items-center gap-1.5"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Certificate</span>
                  </button>

                  {/* Allow deleting user-uploaded certificates */}
                  {cert.id !== 'cert-data-entry' && (
                    <button
                      type="button"
                      onClick={() => onDeleteCertificate(cert.id)}
                      className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 border border-white/5 transition-colors"
                      title="Remove Certificate"
                      aria-label={`Remove certificate ${cert.title}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
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
      {/* 1. UPLOAD CERTIFICATE MODAL */}
      {/* ========================================================================= */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-[#090e1f] border border-emerald-500/40 rounded-3xl shadow-2xl overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-5 bg-[#0d142b] border-b border-white/10 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    Upload &amp; Add Certificate
                  </h3>
                  <p className="text-xs text-slate-400">
                    Attach a document or image to display on your portfolio
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsUploadModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                aria-label="Close upload modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-4 text-xs">
              
              {formError && (
                <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300">
                  {formError}
                </div>
              )}

              {/* Title & Organization */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="cert-title" className="font-semibold text-slate-300 block">
                    Certificate Title <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="cert-title"
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Python for Beginners"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="cert-issuer" className="font-semibold text-slate-300 block">
                    Issuing Organization <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="cert-issuer"
                    type="text"
                    required
                    value={issuingOrg}
                    onChange={(e) => setIssuingOrg(e.target.value)}
                    placeholder="e.g. HackerRank / Coursera / Gov Board"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              {/* Date & Credential ID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="cert-date" className="font-semibold text-slate-300 block">Issue Date / Year</label>
                  <input
                    id="cert-date"
                    type="text"
                    value={issueDate}
                    onChange={(e) => setIssueDate(e.target.value)}
                    placeholder="e.g. November 2024"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="cert-id" className="font-semibold text-slate-300 block">Credential ID / URL (Optional)</label>
                  <input
                    id="cert-id"
                    type="text"
                    value={credentialId}
                    onChange={(e) => setCredentialId(e.target.value)}
                    placeholder="e.g. HR-PY-99238"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              {/* Skills Validated */}
              <div className="space-y-1">
                <label htmlFor="cert-skills" className="font-semibold text-slate-300 block">
                  Skills Validated (Comma Separated)
                </label>
                <input
                  id="cert-skills"
                  type="text"
                  value={skillsText}
                  onChange={(e) => setSkillsText(e.target.value)}
                  placeholder="e.g. Python Scripting, Data Structures, OOP"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                />
              </div>

              {/* File Attachment / Upload Area */}
              <div className="space-y-2 pt-2">
                <span className="font-semibold text-slate-300 block">
                  Certificate Document / Image File:
                </span>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*,application/pdf"
                  className="hidden"
                />

                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="p-6 border-2 border-dashed border-emerald-500/30 hover:border-emerald-500/60 rounded-2xl bg-slate-950/60 text-center cursor-pointer transition-colors space-y-2 group"
                >
                  <div className="w-10 h-10 mx-auto rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">
                      Click to browse or upload certificate file
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Supports PNG, JPG, WEBP, SVG, or PDF images
                    </p>
                  </div>
                </div>

                {/* Previews / Instant sample button */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <span className="text-[11px] text-slate-400">
                    No image file ready right now?
                  </span>
                  <button
                    type="button"
                    onClick={handleGenerateSample}
                    className="text-[11px] font-semibold text-emerald-300 hover:text-emerald-200 underline flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3 text-purple-400" />
                    <span>Generate Sample Certificate Template</span>
                  </button>
                </div>

                {fileUrl && (
                  <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileCheck2 className="w-4 h-4 text-emerald-400" />
                      <span className="text-white font-medium truncate max-w-[280px]">
                        {fileName || 'Certificate_File'}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setFileUrl(undefined);
                        setFileName(undefined);
                        setFileType(undefined);
                      }}
                      className="text-xs text-rose-400 hover:text-rose-300"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-md shadow-emerald-600/30 active:scale-95 transition-all"
                >
                  Save Certificate
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. CERTIFICATE VIEWER MODAL (SEE CERTIFICATE) */}
      {/* ========================================================================= */}
      {activeCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#090d1c] border-2 border-emerald-500/40 rounded-3xl shadow-2xl overflow-hidden">
            
            {/* Modal Toolbar */}
            <div className="p-4 sm:p-5 bg-[#0c1328] border-b border-white/10 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                    <span>{activeCert.title}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Verified
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    Issuer: {activeCert.issuingOrganization} • {activeCert.issueDate}
                  </p>
                </div>
              </div>

              {/* Action Buttons: Zoom, Print, Close */}
              <div className="flex items-center gap-2">
                {activeCert.fileUrl && (
                  <>
                    <button
                      type="button"
                      onClick={() => setImageZoom((prev) => Math.max(0.6, prev - 0.2))}
                      className="p-2 rounded-xl text-slate-300 hover:text-white bg-slate-800/80 border border-white/5"
                      title="Zoom Out"
                      aria-label="Zoom out"
                    >
                      <ZoomOut className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageZoom(1)}
                      className="px-2.5 py-1.5 rounded-xl text-xs font-mono text-slate-300 hover:text-white bg-slate-800/80 border border-white/5"
                      title="Reset Zoom"
                    >
                      {Math.round(imageZoom * 100)}%
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageZoom((prev) => Math.min(2.5, prev + 0.2))}
                      className="p-2 rounded-xl text-slate-300 hover:text-white bg-slate-800/80 border border-white/5"
                      title="Zoom In"
                      aria-label="Zoom in"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                  </>
                )}

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-200 bg-slate-800 hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveCert(null)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-1"
                  aria-label="Close certificate viewer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Certificate Presentation Body */}
            <div className="overflow-y-auto p-4 sm:p-8 flex-1 flex flex-col items-center justify-center bg-[#070b16]">
              {activeCert.fileUrl ? (
                /* Actual Attached Certificate Image / Document */
                <div className="w-full flex justify-center overflow-auto p-2">
                  <img
                    src={activeCert.fileUrl}
                    alt={`Certificate for ${activeCert.title}`}
                    style={{ transform: `scale(${imageZoom})`, transformOrigin: 'top center' }}
                    className="max-w-full max-h-[65vh] object-contain rounded-xl shadow-2xl border border-emerald-500/20 transition-transform duration-200"
                  />
                </div>
              ) : (
                /* Stylized Digital Credential Plaque */
                <div className="w-full max-w-2xl p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-[#0c142b] to-[#080d1d] border-4 border-double border-emerald-500/30 text-center space-y-6 relative overflow-hidden shadow-2xl">
                  <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 flex items-center justify-center shadow-lg">
                    <Award className="w-10 h-10" />
                  </div>

                  <div className="space-y-1.5">
                    <h4 className="text-xs uppercase font-mono tracking-widest text-slate-400">
                      Official Certificate of Qualification
                    </h4>
                    <p className="text-2xl sm:text-4xl font-extrabold text-white tracking-wide">
                      AKSHAY B
                    </p>
                    <p className="text-xs text-slate-300">
                      has met all evaluation criteria and is certified in
                    </p>
                    <h5 className="text-xl sm:text-2xl font-bold text-emerald-300">
                      {activeCert.title}
                    </h5>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
                    {activeCert.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-white/10 max-w-md mx-auto">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                      Certified Competencies:
                    </span>
                    <div className="flex flex-wrap justify-center gap-1.5">
                      {activeCert.skillsAcquired.map((s, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-md text-xs bg-slate-900/90 text-emerald-300 border border-emerald-500/30"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>Issued By: {activeCert.issuingOrganization}</span>
                    <span className="text-emerald-400 font-bold">Credential: {activeCert.credentialId}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Footer Details */}
            <div className="p-4 bg-[#0a0f20] border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono">
                {activeCert.fileName ? `File: ${activeCert.fileName}` : 'Digital Verified Credential'}
              </span>
              <button
                type="button"
                onClick={() => setActiveCert(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors"
              >
                Close View
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
