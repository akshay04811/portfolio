/**
 * Type definitions for Akshay B's Portfolio Application
 */

export type SkillLevel = 'Beginner' | 'Foundational' | 'Intermediate' | 'Proficient';

export interface SkillItem {
  id: string;
  name: string;
  category: 'Programming' | 'Web Development' | 'Software Testing' | 'Data & Office' | 'Tools & Version Control';
  level: SkillLevel;
  percentage: number;
  highlight?: string;
  description: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  field: string;
  institution: string;
  period: string;
  status: 'Currently Pursuing' | 'Completed';
  highlights: string[];
  keySubjects: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  isMainProject?: boolean;
  category: 'Web App' | 'Python Scripting' | 'Quality Assurance' | 'Data Utility';
  technologies: string[];
  overview: string;
  problemStatement: string;
  keyFeatures: string[];
  architecture: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  stats?: { label: string; value: string }[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuingOrganization: string;
  issueDate: string;
  credentialId?: string;
  verified: boolean;
  skillsAcquired: string[];
  description: string;
}

export interface ProfileData {
  name: string;
  title: string;
  typingTitles: string[];
  email: string;
  phone: string;
  location: string;
  experienceLevel: string;
  careerObjective: string;
  aboutBio: string[];
  interests: string[];
  programmingLanguages: { name: string; level: string }[];
  linkedinUrl: string;
  githubUrl: string;
  availableForHire: boolean;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactValidationErrors {
  fullName?: string;
  email?: string;
  subject?: string;
  message?: string;
}
