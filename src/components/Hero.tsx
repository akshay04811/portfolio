import React, { useState, useEffect, useRef } from 'react';
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
  Briefcase,
  Camera,
  UploadCloud,
  Trash2,
  Image as ImageIcon
} from 'lucide-react';
import { ProfileData } from '../types/portfolio';
import { processImageFile } from '../utils/portfolioLogic';

interface HeroProps {
  profile: ProfileData;
  onOpenResume: () => void;
  onUpdatePhoto: (photoUrl?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ profile, onOpenResume, onUpdatePhoto }) => {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    setUploadError(null);
    try {
      const dataUrl = await processImageFile(file);
      onUpdatePhoto(dataUrl);
    } catch (err: any) {
      setUploadError(err.message || 'Failed to process photo.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleRemovePhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    onUpdatePhoto(undefined);
  };

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
                
                {/* Hidden File Input for User Photo */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handlePhotoUpload}
                  accept="image/*"
                  className="hidden"
                  aria-label="Upload your profile photo"
                />

                {/* Visual Avatar / Photo Area */}
                <div className="relative mx-auto w-52 h-52 sm:w-60 sm:h-60 rounded-2xl p-1 bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-500 shadow-xl group">
                  <div className="w-full h-full rounded-[14px] bg-[#070b16] overflow-hidden flex flex-col items-center justify-center relative">
                    
                    {/* Futuristic Developer Portrait Canvas */}
                    <div className="w-full h-full bg-gradient-to-b from-blue-950/60 to-slate-950 flex flex-col items-center justify-center p-3 text-center select-none relative">
                      {/* Grid background on avatar */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:16px_16px]" />

                      {profile.photoUrl ? (
                        /* User's Uploaded Photo View */
                        <div className="relative z-10 w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-blue-400 via-indigo-400 to-purple-500 shadow-xl shadow-blue-500/25 mb-2 group/photo">
                          <img
                            src={profile.photoUrl}
                            alt={profile.name}
                            className="w-full h-full rounded-full object-cover"
                          />
                          {/* Live active ring indicator */}
                          <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#070b16] shadow-sm flex items-center justify-center">
                            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                          </div>

                          {/* Hover Overlay to Change or Remove */}
                          <div className="absolute inset-0 rounded-full bg-black/60 opacity-0 group-hover/photo:opacity-100 flex items-center justify-center gap-2 transition-opacity">
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="p-1.5 rounded-full bg-blue-600 text-white hover:scale-110 transition-transform"
                              title="Change Photo"
                              aria-label="Change Photo"
                            >
                              <Camera className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={handleRemovePhoto}
                              className="p-1.5 rounded-full bg-rose-600 text-white hover:scale-110 transition-transform"
                              title="Remove Photo"
                              aria-label="Remove Photo"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        /* Default AB Monogram with Click-to-Upload */
                        <div
                          onClick={() => fileInputRef.current?.click()}
                          className="relative z-10 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 p-0.5 shadow-xl shadow-blue-500/30 mb-2 cursor-pointer group/ab hover:scale-105 transition-transform"
                          title="Click to upload your photo"
                        >
                          <div className="w-full h-full rounded-full bg-[#0b1021] flex flex-col items-center justify-center relative overflow-hidden">
                            <span className="text-3xl font-extrabold tracking-wider bg-gradient-to-br from-blue-300 via-indigo-200 to-purple-300 bg-clip-text text-transparent group-hover/ab:opacity-20 transition-opacity">
                              AB
                            </span>
                            
                            {/* Hover overlay hint */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover/ab:opacity-100 bg-blue-950/80 transition-opacity text-[10px] text-blue-200 font-medium space-y-1">
                              <Camera className="w-5 h-5 text-blue-300" />
                              <span>Upload Photo</span>
                            </div>
                          </div>

                          {/* Live active ring indicator */}
                          <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#070b16] shadow-sm flex items-center justify-center">
                            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                          </div>
                        </div>
                      )}

                      <span className="relative z-10 text-white font-bold text-sm tracking-wide">
                        {profile.name}
                      </span>
                      <span className="relative z-10 text-[11px] font-mono text-blue-400">
                        @akshay-b • MCA
                      </span>

                      {/* Photo Upload/Change Action Button */}
                      <div className="relative z-10 mt-2 flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={isUploading}
                          className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-blue-500/15 hover:bg-blue-500/30 text-blue-300 border border-blue-400/30 flex items-center gap-1 transition-all active:scale-95"
                        >
                          <Camera className="w-3 h-3 text-blue-400" />
                          <span>{isUploading ? 'Uploading...' : profile.photoUrl ? 'Change Photo' : 'Upload Photo'}</span>
                        </button>

                        {profile.photoUrl && (
                          <button
                            type="button"
                            onClick={handleRemovePhoto}
                            className="p-1 rounded-full text-[10px] bg-slate-800 hover:bg-rose-900/40 text-slate-400 hover:text-rose-300 border border-white/10 transition-colors"
                            title="Reset to AB Monogram"
                            aria-label="Reset to AB Monogram"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                      </div>

                      {uploadError && (
                        <p className="relative z-10 text-[10px] text-rose-400 mt-1">
                          {uploadError}
                        </p>
                      )}
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
