import {
  ContactFormData,
  ContactValidationErrors,
  ProfileData,
  EducationItem,
  SkillItem,
  ProjectItem,
  CertificationItem
} from '../types/portfolio';

/**
 * Validates the contact form inputs
 */
export function validateContactForm(data: ContactFormData): {
  isValid: boolean;
  errors: ContactValidationErrors;
} {
  const errors: ContactValidationErrors = {};

  const trimmedName = data.fullName.trim();
  if (!trimmedName) {
    errors.fullName = 'Please enter your name.';
  } else if (trimmedName.length < 2) {
    errors.fullName = 'Name must be at least 2 characters.';
  }

  const trimmedEmail = data.email.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!trimmedEmail) {
    errors.email = 'Please provide an email address.';
  } else if (!emailRegex.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address.';
  }

  const trimmedSubject = data.subject.trim();
  if (!trimmedSubject) {
    errors.subject = 'Please specify a subject.';
  } else if (trimmedSubject.length < 3) {
    errors.subject = 'Subject should be at least 3 characters.';
  }

  const trimmedMessage = data.message.trim();
  if (!trimmedMessage) {
    errors.message = 'Please write a message.';
  } else if (trimmedMessage.length < 10) {
    errors.message = 'Message must be at least 10 characters long.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Filters projects by search query and category
 */
export function filterProjects(
  projects: ProjectItem[],
  query: string,
  category: string
): ProjectItem[] {
  const normalizedQuery = query.toLowerCase().trim();

  return projects.filter((project) => {
    const matchesCategory =
      category === 'All' || project.category === category || (category === 'Main' && project.isMainProject);

    if (!matchesCategory) return false;

    if (!normalizedQuery) return true;

    const inTitle = project.title.toLowerCase().includes(normalizedQuery);
    const inTagline = project.tagline.toLowerCase().includes(normalizedQuery);
    const inOverview = project.overview.toLowerCase().includes(normalizedQuery);
    const inTech = project.technologies.some((t) => t.toLowerCase().includes(normalizedQuery));

    return inTitle || inTagline || inOverview || inTech;
  });
}

/**
 * Filters skills by category
 */
export function filterSkills(
  skills: SkillItem[],
  category: string
): SkillItem[] {
  if (category === 'All') return skills;
  return skills.filter((s) => s.category === category);
}

/**
 * Generates plain text ATS resume representation
 */
export function generateAtsResumeText(
  profile: ProfileData,
  education: EducationItem[],
  skills: SkillItem[],
  projects: ProjectItem[],
  certifications: CertificationItem[]
): string {
  const line = '------------------------------------------------------------';

  const eduSection = education
    .map(
      (e) =>
        `${e.degree} - ${e.field} (${e.status})${e.gradeOrScore ? ` | Grade/Score: ${e.gradeOrScore}` : ''}\n${e.institution} | ${e.period}\nHighlights: ${e.highlights.join(
          ', '
        )}\nKey Subjects: ${e.keySubjects.join(', ')}`
    )
    .join('\n\n');

  const skillsByCategory = skills.reduce((acc, curr) => {
    if (!acc[curr.category]) acc[curr.category] = [];
    acc[curr.category].push(`${curr.name} (${curr.level})`);
    return acc;
  }, {} as Record<string, string[]>);

  const skillsSection = Object.entries(skillsByCategory)
    .map(([cat, list]) => `${cat}: ${list.join(', ')}`)
    .join('\n');

  const projSection = projects
    .map(
      (p) =>
        `${p.title} [${p.category}]\nTech Stack: ${p.technologies.join(
          ', '
        )}\nOverview: ${p.overview}\nKey Features:\n${p.keyFeatures.map((f) => ` - ${f}`).join('\n')}`
    )
    .join('\n\n');

  const certSection = certifications
    .map(
      (c) =>
        `${c.title} - ${c.issuingOrganization} (${c.issueDate})\nSkills: ${c.skillsAcquired.join(', ')}`
    )
    .join('\n\n');

  return `
${profile.name.toUpperCase()}
Email: ${profile.email} | Phone: ${profile.phone}
Location: ${profile.location}
LinkedIn: ${profile.linkedinUrl} | GitHub: ${profile.githubUrl}
Status: ${profile.experienceLevel} | Available for Entry-Level Roles

CAREER OBJECTIVE
${line}
${profile.careerObjective}

EDUCATION
${line}
${eduSection}

TECHNICAL SKILLS & COMPETENCIES
${line}
${skillsSection}

PROJECTS
${line}
${projSection}

CERTIFICATIONS
${line}
${certSection}

INTERESTS
${line}
${profile.interests.join(', ')}
`.trim();
}

const STORAGE_KEY = 'akshay_portfolio_profile_v1';
const EDUCATION_STORAGE_KEY = 'akshay_portfolio_education_v1';

export function saveProfileToStorage(profile: ProfileData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch {
    // local storage might be restricted or full
  }
}

export function loadProfileFromStorage(defaultProfile: ProfileData): ProfileData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProfile;
    const parsed = JSON.parse(raw);
    return { ...defaultProfile, ...parsed };
  } catch {
    return defaultProfile;
  }
}

export function saveEducationToStorage(education: EducationItem[]): void {
  try {
    localStorage.setItem(EDUCATION_STORAGE_KEY, JSON.stringify(education));
  } catch {
    // local storage might be restricted or full
  }
}

export function loadEducationFromStorage(defaultEducation: EducationItem[]): EducationItem[] {
  try {
    const raw = localStorage.getItem(EDUCATION_STORAGE_KEY);
    if (!raw) return defaultEducation;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return defaultEducation;
  } catch {
    return defaultEducation;
  }
}

/**
 * Resizes and compresses user-uploaded photo to a clean, fast data URL
 * to avoid exceeding browser localStorage quotas while looking sharp.
 */
export function processImageFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('Please upload an image file (PNG, JPG, JPEG, WEBP).'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      const img = new Image();
      img.onload = () => {
        const maxDimension = 420;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxDimension) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          }
        } else {
          if (height > maxDimension) {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(readerEvent.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        // Use high-quality JPEG compression
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.88);
        resolve(compressedDataUrl);
      };

      img.onerror = () => reject(new Error('Failed to load image.'));
      img.src = readerEvent.target?.result as string;
    };

    reader.onerror = () => reject(new Error('Failed to read image file.'));
    reader.readAsDataURL(file);
  });
}
