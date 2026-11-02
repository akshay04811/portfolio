import React, { useState } from 'react';
import {
  Mail,
  Send,
  Linkedin,
  Github,
  MapPin,
  Phone,
  Copy,
  Check,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { ContactFormData, ContactValidationErrors, ProfileData } from '../types/portfolio';
import { validateContactForm } from '../utils/portfolioLogic';

interface ContactProps {
  profile: ProfileData;
}

export const Contact: React.FC<ContactProps> = ({ profile }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<ContactValidationErrors>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2200);
    } catch {
      // ignore
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear field-specific error as user types
    if (errors[name as keyof ContactValidationErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateContactForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);

    // Simulate async submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        fullName: '',
        email: '',
        subject: '',
        message: ''
      });
      setErrors({});
    }, 700);
  };

  return (
    <section id="contact" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-medium">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>GET IN TOUCH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Let&apos;s <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Connect</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Interested in hiring an enthusiastic IT fresher, reviewing DriveFlow, or discussing entry-level roles? Send a message or connect directly.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          
          {/* Left Column: Direct Contact Info & Socials */}
          <div className="lg:col-span-5 space-y-5">
            <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-white/10 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white">Contact Information</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Open to full-time opportunities, internships, and entry-level positions.
                </p>
              </div>

              {/* Email Card with 1-Click Copy */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-blue-500/20 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-4 h-4 text-blue-400" />
                    <span>Direct Email</span>
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 font-mono transition-colors"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedEmail ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                <a
                  href={`mailto:${profile.email}`}
                  className="text-sm font-semibold text-white hover:text-blue-300 transition-colors block break-all font-mono"
                >
                  {profile.email}
                </a>
              </div>

              {/* Location Card */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <MapPin className="w-4 h-4 text-purple-400" />
                  <span>Location</span>
                </div>
                <p className="text-sm font-semibold text-white">
                  {profile.location} (Open to Remote / On-site Relocation)
                </p>
              </div>

              {/* Availability Status */}
              <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping shrink-0" />
                <div className="text-xs text-emerald-300">
                  <span className="font-bold block">Immediate Availability</span>
                  <span>Ready to join for entry-level engineering and QA roles.</span>
                </div>
              </div>

              {/* Social Channels */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Professional Profiles:
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 rounded-xl bg-slate-900/80 hover:bg-blue-600/20 border border-white/10 hover:border-blue-400/40 text-xs font-semibold text-slate-200 hover:text-blue-300 transition-all flex items-center justify-center gap-2"
                  >
                    <Linkedin className="w-4 h-4 text-blue-400" />
                    <span>LinkedIn</span>
                  </a>

                  <a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 rounded-xl bg-slate-900/80 hover:bg-purple-600/20 border border-white/10 hover:border-purple-400/40 text-xs font-semibold text-slate-200 hover:text-purple-300 transition-all flex items-center justify-center gap-2"
                  >
                    <Github className="w-4 h-4 text-purple-400" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Functional Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl">
              <h3 className="text-lg font-bold text-white mb-2">Send a Direct Message</h3>
              <p className="text-xs text-slate-400 mb-6">
                Fill in the details below. All fields are validated in real-time.
              </p>

              {isSubmitted && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 flex items-start gap-3 animate-in fade-in">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="space-y-1 text-xs">
                    <p className="font-bold text-sm text-white">Thank you! Your message has been sent.</p>
                    <p className="text-emerald-400/90">
                      I will respond to you promptly via email at {profile.email}.
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsSubmitted(false)}
                      className="text-xs underline text-emerald-300 hover:text-white pt-1 block"
                    >
                      Send another message
                    </button>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="contact-fullName" className="text-xs font-medium text-slate-300 block">
                      Your Full Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      id="contact-fullName"
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. John Doe / Recruiter"
                      className={`w-full px-4 py-2.5 rounded-xl text-xs bg-slate-900/90 border text-white placeholder-slate-500 focus:outline-none transition-colors ${
                        errors.fullName
                          ? 'border-rose-500/80 focus:border-rose-500'
                          : 'border-white/10 focus:border-blue-400'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-[11px] text-rose-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.fullName}</span>
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-email" className="text-xs font-medium text-slate-300 block">
                      Email Address <span className="text-rose-400">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="recruiter@company.com"
                      className={`w-full px-4 py-2.5 rounded-xl text-xs bg-slate-900/90 border text-white placeholder-slate-500 focus:outline-none transition-colors ${
                        errors.email
                          ? 'border-rose-500/80 focus:border-rose-500'
                          : 'border-white/10 focus:border-blue-400'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-rose-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject Field */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-subject" className="text-xs font-medium text-slate-300 block">
                    Subject <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Interview Invitation: Entry-Level Software Developer"
                    className={`w-full px-4 py-2.5 rounded-xl text-xs bg-slate-900/90 border text-white placeholder-slate-500 focus:outline-none transition-colors ${
                      errors.subject
                        ? 'border-rose-500/80 focus:border-rose-500'
                        : 'border-white/10 focus:border-blue-400'
                    }`}
                  />
                  {errors.subject && (
                    <p className="text-[11px] text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.subject}</span>
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="text-xs font-medium text-slate-300 block">
                    Message <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your note or opportunity details here..."
                    className={`w-full px-4 py-2.5 rounded-xl text-xs bg-slate-900/90 border text-white placeholder-slate-500 focus:outline-none transition-colors ${
                      errors.message
                        ? 'border-rose-500/80 focus:border-rose-500'
                        : 'border-white/10 focus:border-blue-400'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-[11px] text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-xl shadow-blue-500/25 flex items-center justify-center gap-2 active:scale-95 transition-all duration-200 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Sending message...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
