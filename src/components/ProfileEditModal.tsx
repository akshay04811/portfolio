import React, { useState } from 'react';
import {
  SlidersHorizontal,
  X,
  RotateCcw,
  Save,
  CheckCircle2,
  Info
} from 'lucide-react';
import { ProfileData } from '../types/portfolio';
import { DEFAULT_PROFILE } from '../data/defaultProfile';

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: ProfileData;
  onSave: (updated: ProfileData) => void;
}

export const ProfileEditModal: React.FC<ProfileEditModalProps> = ({
  isOpen,
  onClose,
  currentProfile,
  onSave
}) => {
  const [formData, setFormData] = useState<ProfileData>(currentProfile);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 900);
  };

  const handleReset = () => {
    setFormData(DEFAULT_PROFILE);
    onSave(DEFAULT_PROFILE);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-[#0a0f24] border border-purple-500/30 rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-5 bg-[#0e142c] border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Customize Personal Details
              </h3>
              <p className="text-xs text-slate-400">
                Update your contact info, social handles, or objective anytime
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            aria-label="Close edit profile"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="overflow-y-auto p-6 space-y-4 text-xs">
          
          <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-500/20 text-blue-300 flex items-start gap-2">
            <Info className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              All modifications are stored in your local browser profile and instantly update the entire website and ATS resume download.
            </span>
          </div>

          {/* Full Name & Headline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-purple-400"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Professional Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-purple-400"
              />
            </div>
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-purple-400"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-purple-400"
              />
            </div>
          </div>

          {/* Location & Experience Level */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-purple-400"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Experience Level</label>
              <input
                type="text"
                name="experienceLevel"
                value={formData.experienceLevel}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-purple-400"
              />
            </div>
          </div>

          {/* Social Profiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-semibold text-slate-300">LinkedIn Profile URL</label>
              <input
                type="url"
                name="linkedinUrl"
                value={formData.linkedinUrl}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-purple-400"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-300">GitHub Profile URL</label>
              <input
                type="url"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-purple-400"
              />
            </div>
          </div>

          {/* Career Objective */}
          <div className="space-y-1">
            <label className="font-semibold text-slate-300">Career Objective</label>
            <textarea
              name="careerObjective"
              rows={3}
              value={formData.careerObjective}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-purple-400"
            />
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <button
              type="button"
              onClick={handleReset}
              className="px-3.5 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Defaults</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-slate-300 hover:bg-slate-800 transition-colors"
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
                    <span>Save Details</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
