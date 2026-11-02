import React, { useState } from 'react';
import {
  GraduationCap,
  X,
  Save,
  CheckCircle2,
  FileText,
  Upload,
  Sparkles,
  Info
} from 'lucide-react';
import { EducationItem } from '../types/portfolio';
import { processImageFile } from '../utils/portfolioLogic';

interface PlusTwoModalProps {
  isOpen: boolean;
  onClose: () => void;
  plusTwoItem?: EducationItem;
  onSave: (updatedItem: EducationItem) => void;
}

export const PlusTwoModal: React.FC<PlusTwoModalProps> = ({
  isOpen,
  onClose,
  plusTwoItem,
  onSave
}) => {
  const [degree, setDegree] = useState(
    plusTwoItem?.degree || 'Higher Secondary School Examination (+2 / 12th)'
  );
  const [field, setField] = useState(
    plusTwoItem?.field || 'Science Stream (Computer Science & Mathematics)'
  );
  const [institution, setInstitution] = useState(
    plusTwoItem?.institution || 'Higher Secondary School'
  );
  const [period, setPeriod] = useState(plusTwoItem?.period || '2019 – 2021');
  const [gradeOrScore, setGradeOrScore] = useState(
    plusTwoItem?.gradeOrScore || 'First Class / Distinction'
  );
  const [subjectsText, setSubjectsText] = useState(
    plusTwoItem?.keySubjects.join(', ') ||
      'Computer Science, Mathematics, Physics, Chemistry, English'
  );
  const [highlightsText, setHighlightsText] = useState(
    plusTwoItem?.highlights.join('\n') ||
      'Completed Higher Secondary (+2) with strong academic standing in Computer Science\nDeveloped foundational programming principles and logical reasoning\nActive participant in science exhibitions and computer laboratory sessions'
  );
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const keySubjects = subjectsText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const highlights = highlightsText
      .split('\n')
      .map((h) => h.trim())
      .filter(Boolean);

    const updated: EducationItem = {
      id: plusTwoItem?.id || 'edu-plus-two',
      degree: degree.trim() || 'Higher Secondary School Examination (+2 / 12th)',
      field: field.trim() || 'Science Stream',
      institution: institution.trim() || 'Higher Secondary School',
      period: period.trim() || '2019 – 2021',
      status: 'Completed',
      gradeOrScore: gradeOrScore.trim(),
      keySubjects: keySubjects.length > 0 ? keySubjects : ['Computer Science', 'Mathematics'],
      highlights:
        highlights.length > 0
          ? highlights
          : ['Completed Plus Two (+2) examination with strong foundational subjects.']
    };

    onSave(updated);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl max-h-[92vh] flex flex-col bg-[#0a0f24] border border-blue-500/30 rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-5 bg-[#0e142c] border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Plus Two (+2 / 12th) Education Details
              </h3>
              <p className="text-xs text-slate-400">
                Manage your Higher Secondary qualifications, school, stream, and marks
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            aria-label="Close Plus Two modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-4 text-xs">
          
          <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-500/20 text-blue-300 flex items-start gap-2">
            <Info className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              Your +2 details appear chronologically in your Education timeline and are automatically synced with your ATS resume download.
            </span>
          </div>

          {/* Degree & Stream */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Degree / Certificate Name</label>
              <input
                type="text"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                placeholder="e.g. Higher Secondary Examination (+2 / 12th)"
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-blue-400"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Stream / Major</label>
              <input
                type="text"
                value={field}
                onChange={(e) => setField(e.target.value)}
                placeholder="e.g. Science (Computer Science & Maths)"
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-blue-400"
                required
              />
            </div>
          </div>

          {/* School Name & Passing Period */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-semibold text-slate-300">School / Junior College Name</label>
              <input
                type="text"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                placeholder="e.g. St. Thomas Higher Secondary School"
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-blue-400"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Years / Period</label>
              <input
                type="text"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                placeholder="e.g. 2019 – 2021"
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-blue-400"
                required
              />
            </div>
          </div>

          {/* Grade / Percentage */}
          <div className="space-y-1">
            <label className="font-semibold text-slate-300">Grade / Percentage / Score</label>
            <input
              type="text"
              value={gradeOrScore}
              onChange={(e) => setGradeOrScore(e.target.value)}
              placeholder="e.g. 85% / Distinction / First Class"
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-blue-400"
            />
          </div>

          {/* Key Subjects */}
          <div className="space-y-1">
            <label className="font-semibold text-slate-300">
              Key Subjects <span className="text-slate-400 font-normal">(Comma separated)</span>
            </label>
            <input
              type="text"
              value={subjectsText}
              onChange={(e) => setSubjectsText(e.target.value)}
              placeholder="Computer Science, Mathematics, Physics, Chemistry, English"
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-blue-400"
            />
          </div>

          {/* Highlights / Achievements */}
          <div className="space-y-1">
            <label className="font-semibold text-slate-300">
              Academic Highlights / Notes <span className="text-slate-400 font-normal">(One per line)</span>
            </label>
            <textarea
              rows={3}
              value={highlightsText}
              onChange={(e) => setHighlightsText(e.target.value)}
              placeholder="Enter key achievements or projects from +2..."
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-blue-400"
            />
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-95 shadow-md flex items-center gap-1.5 transition-all"
            >
              {savedSuccess ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>Save +2 Details</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
