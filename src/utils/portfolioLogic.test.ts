import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateContactForm,
  filterProjects,
  filterSkills,
  generateAtsResumeText
} from './portfolioLogic';
import {
  ProfileData,
  EducationItem,
  SkillItem,
  ProjectItem,
  CertificationItem
} from '../types/portfolio';

test('validateContactForm rejects empty inputs', () => {
  const result = validateContactForm({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  });
  assert.equal(result.isValid, false);
  assert.ok(result.errors.fullName);
  assert.ok(result.errors.email);
  assert.ok(result.errors.subject);
  assert.ok(result.errors.message);
});

test('validateContactForm rejects invalid emails', () => {
  const result = validateContactForm({
    fullName: 'Akshay',
    email: 'not-an-email',
    subject: 'Job Opportunity',
    message: 'Hello, I came across your portfolio and wanted to connect!'
  });
  assert.equal(result.isValid, false);
  assert.equal(result.errors.email, 'Please enter a valid email address.');
});

test('validateContactForm accepts valid form data', () => {
  const result = validateContactForm({
    fullName: 'Tech Recruiter',
    email: 'recruiter@company.com',
    subject: 'Software Engineer Entry-Level Role',
    message: 'We are impressed by your DriveFlow project and would love to schedule an interview.'
  });
  assert.equal(result.isValid, true);
  assert.equal(Object.keys(result.errors).length, 0);
});

test('filterProjects filters by text query and category', () => {
  const sampleProjects: ProjectItem[] = [
    {
      id: 'p1',
      title: 'DriveFlow – A Car Rental and Vehicle Sales Portal',
      tagline: 'Vehicle rental & sales web portal',
      isMainProject: true,
      category: 'Web App',
      technologies: ['Python', 'HTML5', 'CSS3', 'JavaScript'],
      overview: 'End to end vehicle portal',
      problemStatement: 'Manual car booking inefficiencies',
      keyFeatures: ['Catalog', 'Booking'],
      architecture: ['Client', 'Server']
    },
    {
      id: 'p2',
      title: 'Data Entry Automation Tool',
      tagline: 'CSV cleaning script',
      category: 'Python Scripting',
      technologies: ['Python', 'CSV'],
      overview: 'Data formatting',
      problemStatement: 'Manual errors',
      keyFeatures: ['Validation'],
      architecture: ['Script']
    }
  ];

  // Search by keyword "DriveFlow"
  const driveFlowMatches = filterProjects(sampleProjects, 'driveflow', 'All');
  assert.equal(driveFlowMatches.length, 1);
  assert.equal(driveFlowMatches[0].id, 'p1');

  // Search by tech "Python"
  const pythonMatches = filterProjects(sampleProjects, 'python', 'All');
  assert.equal(pythonMatches.length, 2);

  // Filter by category
  const scriptMatches = filterProjects(sampleProjects, '', 'Python Scripting');
  assert.equal(scriptMatches.length, 1);
  assert.equal(scriptMatches[0].id, 'p2');
});

test('filterSkills filters by category correctly', () => {
  const sampleSkills: SkillItem[] = [
    {
      id: 's1',
      name: 'Python',
      category: 'Programming',
      level: 'Beginner',
      percentage: 45,
      description: 'Foundations and syntax'
    },
    {
      id: 's2',
      name: 'Software Testing',
      category: 'Software Testing',
      level: 'Foundational',
      percentage: 60,
      description: 'Test case design'
    }
  ];

  const all = filterSkills(sampleSkills, 'All');
  assert.equal(all.length, 2);

  const prog = filterSkills(sampleSkills, 'Programming');
  assert.equal(prog.length, 1);
  assert.equal(prog[0].name, 'Python');
});

test('generateAtsResumeText creates formatted text containing key profile items', () => {
  const mockProfile: ProfileData = {
    name: 'Akshay B',
    title: 'MCA Student | Aspiring Software Engineer',
    typingTitles: ['MCA Student'],
    email: 'akshaykukku25460@gmail.com',
    phone: '+91 98765 43210',
    location: 'India',
    experienceLevel: 'Fresher',
    careerObjective: 'Seeking an entry-level opportunity in the IT industry.',
    aboutBio: ['BSc graduate and MCA student.'],
    interests: ['Data Entry', 'Web Development', 'Software Testing'],
    programmingLanguages: [{ name: 'Python', level: 'Beginner' }],
    linkedinUrl: 'https://linkedin.com/in/akshay-b',
    githubUrl: 'https://github.com/akshay-b',
    availableForHire: true
  };

  const text = generateAtsResumeText(mockProfile, [], [], [], []);
  assert.ok(text.includes('AKSHAY B'));
  assert.ok(text.includes('akshaykukku25460@gmail.com'));
  assert.ok(text.includes('CAREER OBJECTIVE'));
  assert.ok(text.includes('Seeking an entry-level opportunity'));
});
