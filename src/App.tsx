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
import { PlusTwoModal } from './components/PlusTwoModal';

import {
  DEFAULT_PROFILE,
  DEFAULT_EDUCATION,
  DEFAULT_SKILLS,
  DEFAULT_PROJECTS,
  DEFAULT_CERTIFICATIONS
} from './data/defaultProfile';
import { EducationItem, ProfileData } from './types/portfolio';
import {
  loadProfileFromStorage,
  saveProfileToStorage,
  loadEducationFromStorage,
  saveEducationToStorage
} from './utils/portfolioLogic';

export default function App() {
  const [profile, setProfile] = useState<ProfileData>(() =>
    loadProfileFromStorage(DEFAULT_PROFILE)
  );

  const [education, setEducation] = useState<EducationItem[]>(() =>
    loadEducationFromStorage(DEFAULT_EDUCATION)
  );

  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState<boolean>(false);
  const [isPlusTwoModalOpen, setIsPlusTwoModalOpen] = useState<boolean>(false);

  const handleSaveProfile = (updated: ProfileData) => {
    setProfile(updated);
    saveProfileToStorage(updated);
  };

  const handleUpdatePhoto = (photoUrl?: string) => {
    const updated = { ...profile, photoUrl };
    setProfile(updated);
    saveProfileToStorage(updated);
  };

  const handleSavePlusTwo = (updatedItem: EducationItem) => {
    setEducation((prev) => {
      const index = prev.findIndex((e) => e.id === updatedItem.id);
      let next: EducationItem[];
      if (index >= 0) {
        next = [...prev];
        next[index] = updatedItem;
      } else {
        next = [...prev, updatedItem];
      }
      saveEducationToStorage(next);
      return next;
    });
  };

  const plusTwoItem = education.find(
    (e) => e.id.includes('plus-two') || e.degree.toLowerCase().includes('+2')
  );

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
        {/* Hero Section with Front AB Section & Photo Upload */}
        <Hero
          profile={profile}
          onOpenResume={() => setIsResumeOpen(true)}
          onUpdatePhoto={handleUpdatePhoto}
        />

        {/* About Me Section */}
        <About profile={profile} />

        {/* Education Timeline with Plus Two (+2) Support & Edit Facility */}
        <Education
          education={education}
          onOpenPlusTwoModal={() => setIsPlusTwoModalOpen(true)}
        />

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
        education={education}
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

      {/* Plus Two (+2 / 12th) Details Upload & Management Modal */}
      <PlusTwoModal
        isOpen={isPlusTwoModalOpen}
        onClose={() => setIsPlusTwoModalOpen(false)}
        plusTwoItem={plusTwoItem}
        onSave={handleSavePlusTwo}
      />
    </div>
  );
}
