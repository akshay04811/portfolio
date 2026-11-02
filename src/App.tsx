/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { VFXBackground } from './components/VFXBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Education } from './components/Education';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Certifications } from './components/Certifications';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { ProfileEditModal } from './components/ProfileEditModal';

import {
  DEFAULT_PROFILE,
  DEFAULT_EDUCATION,
  DEFAULT_SKILLS,
  DEFAULT_PROJECTS,
  DEFAULT_CERTIFICATIONS
} from './data/defaultProfile';
import { ProfileData } from './types/portfolio';
import { loadProfileFromStorage, saveProfileToStorage } from './utils/portfolioLogic';

export default function App() {
  const [profile, setProfile] = useState<ProfileData>(() =>
    loadProfileFromStorage(DEFAULT_PROFILE)
  );

  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState<boolean>(false);

  const handleSaveProfile = (updated: ProfileData) => {
    setProfile(updated);
    saveProfileToStorage(updated);
  };

  return (
    <div className="relative min-h-screen bg-[#05070f] text-slate-100 flex flex-col overflow-x-hidden selection:bg-blue-600/30 selection:text-blue-200">
      {/* Interactive VFX Particle & Constellation Background */}
      <VFXBackground initialActive={true} />

      {/* Sticky Navigation Bar */}
      <Navbar
        profile={profile}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenEditProfile={() => setIsEditProfileOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1 w-full">
        {/* Hero Section */}
        <Hero
          profile={profile}
          onOpenResume={() => setIsResumeOpen(true)}
        />

        {/* About Me Section */}
        <About profile={profile} />

        {/* Education Timeline */}
        <Education education={DEFAULT_EDUCATION} />

        {/* Technical Skills Section */}
        <Skills skills={DEFAULT_SKILLS} />

        {/* Projects Showcase (DriveFlow Flagship) */}
        <Projects projects={DEFAULT_PROJECTS} />

        {/* Certifications (Data Entry Operator) */}
        <Certifications certifications={DEFAULT_CERTIFICATIONS} />

        {/* Contact Section */}
        <Contact profile={profile} />
      </main>

      {/* Footer */}
      <Footer
        profile={profile}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* ATS Printable & Downloadable Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        profile={profile}
        education={DEFAULT_EDUCATION}
        skills={DEFAULT_SKILLS}
        projects={DEFAULT_PROJECTS}
        certifications={DEFAULT_CERTIFICATIONS}
      />

      {/* Customizable Profile Details Modal */}
      <ProfileEditModal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        currentProfile={profile}
        onSave={handleSaveProfile}
      />
    </div>
  );
}
