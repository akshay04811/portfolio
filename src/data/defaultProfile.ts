import {
  ProfileData,
  EducationItem,
  SkillItem,
  ProjectItem,
  CertificationItem
} from '../types/portfolio';

export const DEFAULT_PROFILE: ProfileData = {
  name: 'Akshay B',
  title: 'MCA Student | Aspiring Software Engineer & IT Fresher',
  typingTitles: [
    'MCA Postgraduate Student',
    'BSc Computer Science Graduate',
    'Python Enthusiast (Beginner)',
    'Web Development Explorer',
    'Quality Assurance & Testing Learner',
    'Certified Data Entry Operator'
  ],
  email: 'akshaykukku25460@gmail.com',
  phone: '+91 98765 43210',
  location: 'India',
  experienceLevel: 'Fresher (Entry-Level)',
  careerObjective:
    'Seeking an entry-level opportunity in the IT industry where I can develop my technical skills, contribute to real-world software solutions, and build a successful and impactful career.',
  aboutBio: [
    'I am an ambitious and detail-oriented IT fresher who graduated with a Bachelor of Science (BSc) in Computer Science and am currently pursuing my Master of Computer Applications (MCA).',
    'My foundational journey centers around Python programming, modern front-end web development, and software testing principles. I also hold a certified Data Entry Operator qualification, which has honed my typing speed, precision, document structuring, and data organization discipline.',
    'I believe in strong fundamentals, intellectual honesty, and rapid adaptability. I am excited to contribute to collaborative engineering teams through entry-level software development, quality assurance, web design, or technical data operations.'
  ],
  interests: [
    'Data Entry & Data Management',
    'Web Development & Responsive UI',
    'Software Testing & Test Case Design',
    'Learning New Technologies & Frameworks'
  ],
  programmingLanguages: [
    { name: 'Python', level: 'Beginner' }
  ],
  linkedinUrl: 'https://linkedin.com/in/akshay-b',
  githubUrl: 'https://github.com/akshay-b',
  availableForHire: true
};

export const DEFAULT_EDUCATION: EducationItem[] = [
  {
    id: 'edu-mca',
    degree: 'Master of Computer Applications (MCA)',
    field: 'Computer Applications & Advanced Software Development',
    institution: 'Postgraduate University Program',
    period: '2024 – Present (Pursuing)',
    status: 'Currently Pursuing',
    highlights: [
      'Deepening theoretical and practical foundations in Object-Oriented Software Engineering and Web Architecture',
      'Studying Advanced Database Management Systems, Computer Networks, and Full-Stack development paradigms',
      'Active participant in technical seminars, coding challenges, and software engineering coursework'
    ],
    keySubjects: [
      'Advanced Python & Web Frameworks',
      'Database Management Systems (RDBMS)',
      'Software Engineering & Testing Methodologies',
      'Computer Networks & Distributed Systems',
      'Web Technologies'
    ]
  },
  {
    id: 'edu-bsc',
    degree: 'Bachelor of Science (BSc) in Computer Science',
    field: 'Computer Science',
    institution: 'University College',
    period: '2021 – 2024',
    status: 'Completed',
    highlights: [
      'Graduated with strong conceptual understanding of computational logic and problem-solving',
      'Developed academic projects including the flagship DriveFlow portal',
      'Demonstrated high academic consistency in laboratory practicals, programming assignments, and data structures'
    ],
    keySubjects: [
      'Programming in Python & C Basics',
      'Data Structures & Algorithms Foundations',
      'Relational Databases & SQL',
      'Operating Systems & Shell Basics',
      'System Analysis & Design'
    ]
  }
];

export const DEFAULT_SKILLS: SkillItem[] = [
  // Programming Language (Honest: Beginner)
  {
    id: 'skill-python',
    name: 'Python',
    category: 'Programming',
    level: 'Beginner',
    percentage: 50,
    highlight: 'Core Language',
    description: 'Foundational syntax, variables, lists, dictionaries, loops, functions, file I/O, OOP basics, and basic scripting for tasks.'
  },
  // Web Technologies
  {
    id: 'skill-html5',
    name: 'HTML5',
    category: 'Web Development',
    level: 'Intermediate',
    percentage: 75,
    highlight: 'Semantic Structure',
    description: 'Semantic markup, accessibility foundations, form controls, audio/video tags, and responsive viewport configuration.'
  },
  {
    id: 'skill-css3',
    name: 'CSS3 & Styling',
    category: 'Web Development',
    level: 'Intermediate',
    percentage: 70,
    highlight: 'Modern Layouts',
    description: 'Flexbox, CSS Grid, media queries, animations, modern gradients, responsive design principles, and Tailwind CSS utility styling.'
  },
  {
    id: 'skill-js',
    name: 'JavaScript',
    category: 'Web Development',
    level: 'Foundational',
    percentage: 60,
    highlight: 'DOM & Interactivity',
    description: 'ES6+ syntax, DOM manipulation, event handling, fetch API, asynchronous promises, and form validation.'
  },
  // Software Testing
  {
    id: 'skill-manual-testing',
    name: 'Manual Software Testing',
    category: 'Software Testing',
    level: 'Foundational',
    percentage: 65,
    highlight: 'Quality Assurance',
    description: 'Understanding of SDLC & STLC, test execution, identifying functional flaws, UI responsiveness inspection, and boundary testing.'
  },
  {
    id: 'skill-test-cases',
    name: 'Test Case Design & Bug Reporting',
    category: 'Software Testing',
    level: 'Foundational',
    percentage: 65,
    highlight: 'Defect Logging',
    description: 'Writing clear test scenarios, expected vs actual outcomes, severity/priority tagging, and structured bug reporting.'
  },
  // Data Entry & Office
  {
    id: 'skill-data-entry',
    name: 'Data Entry & Data Accuracy',
    category: 'Data & Office',
    level: 'Proficient',
    percentage: 90,
    highlight: 'Certified Competency',
    description: 'High-speed alphanumeric keyboarding, 98%+ accuracy, data verification, digital document archiving, and meticulous attention to detail.'
  },
  {
    id: 'skill-excel',
    name: 'Microsoft Excel / Spreadsheets',
    category: 'Data & Office',
    level: 'Intermediate',
    percentage: 75,
    highlight: 'Analysis & Organization',
    description: 'VLOOKUP/XLOOKUP basics, formulas (SUM, COUNTIF, IF), data cleaning, filtering, sorting, conditional formatting, and pivot tables.'
  },
  {
    id: 'skill-office',
    name: 'MS Office Suite (Word, PowerPoint)',
    category: 'Data & Office',
    level: 'Proficient',
    percentage: 85,
    highlight: 'Documentation',
    description: 'Professional technical documentation formatting, presentation design, reports generation, and PDF conversions.'
  },
  // Tools & Version Control
  {
    id: 'skill-git',
    name: 'Git & GitHub',
    category: 'Tools & Version Control',
    level: 'Foundational',
    percentage: 55,
    highlight: 'Version Control',
    description: 'Cloning repositories, commit workflows, branches, pushing code to GitHub, pull requests, and readme documentation.'
  },
  {
    id: 'skill-vscode',
    name: 'VS Code & Dev Environment',
    category: 'Tools & Version Control',
    level: 'Intermediate',
    percentage: 75,
    highlight: 'Productivity',
    description: 'Configuring extensions for Python & Web, terminal commands, linter setup, debugger basics, and efficient workflow management.'
  }
];

export const DEFAULT_PROJECTS: ProjectItem[] = [
  {
    id: 'proj-driveflow',
    title: 'DriveFlow – Car Rental & Vehicle Sales Portal',
    tagline: 'Comprehensive Web Portal for Streamlined Car Rentals and Direct Vehicle Purchases',
    isMainProject: true,
    category: 'Web App',
    technologies: ['Python', 'HTML5', 'CSS3', 'JavaScript', 'SQLite / Relational Schema', 'Tailwind CSS'],
    overview:
      'DriveFlow is an all-in-one automotive web application designed to bridge the gap between vehicle rental services and direct second-hand/new vehicle sales. Developed as my flagship academic capstone project, it provides a unified platform where customers can browse car fleets, filter by transmission, fuel type, or seating capacity, calculate instant rental tariffs, and submit booking or purchase inquiries.',
    problemStatement:
      'Traditional car rental and vehicle dealership workflows often rely on disjointed paper ledgers or phone-based inquiries, resulting in booking collisions, lack of transparent pricing, and slow customer follow-ups. DriveFlow automates the catalog display, pricing calculation, and reservation intake into a clean responsive interface.',
    keyFeatures: [
      'Dual-Mode Vehicle Catalog: Seamlessly switch between Rental Fleet (daily/hourly rates) and Sales Showroom (outright purchase price).',
      'Dynamic Search & Multi-Param Filter: Filter by vehicle make, budget range, transmission (Automatic/Manual), and seating capacity (4, 5, 7 seats).',
      'Automated Tariff Calculator: Real-time calculation based on selected pickup/return dates, security deposit estimation, and transparent itemized breakdown.',
      'Customer Booking & Inquiry Engine: Multi-step interactive booking form with field validation, customer contact verification, and confirmation receipt summary.',
      'Vehicle Detail Modals: Rich specification cards showcasing mileage, fuel type, engine specs, safety ratings, and high-resolution photo galleries.',
      'Administrative Listing View: Conceptual backend view for adding new vehicles, marking vehicles as booked or available, and reviewing rental requests.'
    ],
    architecture: [
      'Presentation Layer: Modern responsive UI built with semantic HTML5, modern CSS3 layout paradigms, and JavaScript event handlers for dynamic DOM updates.',
      'Business Logic Layer: Python-based data processing handling rental price formulas, date-difference calculations, and input sanitization.',
      'Data Modeling Layer: Structured schema modeling Vehicle, Customer, RentalBooking, and SalesInquiry entities with relational foreign keys.'
    ],
    stats: [
      { label: 'Catalog Items', value: '24+ Vehicles' },
      { label: 'Booking Steps', value: '3-Step Flow' },
      { label: 'Device Support', value: '100% Mobile Ready' },
      { label: 'Architecture', value: 'Modular MVC' }
    ],
    githubUrl: 'https://github.com/akshay-b/driveflow-portal',
    liveDemoUrl: '#demo'
  },
  {
    id: 'proj-test-suite',
    title: 'Quality Assurance Test Suite & Defect Report',
    tagline: 'Structured Manual Test Scenarios & Bug Traceability Matrix for E-Commerce Cart & Checkout',
    isMainProject: false,
    category: 'Quality Assurance',
    technologies: ['Software Testing', 'Test Case Design', 'Boundary Value Analysis', 'Equivalence Partitioning', 'Excel'],
    overview:
      'An end-to-end practical software testing project demonstrating systematic test case design, negative testing scenarios, boundary value calculations, and structured bug tracking for critical user checkout journeys.',
    problemStatement:
      'Untested user input flows in checkout and payment gateways lead to cart abandonment and revenue leakage. This project established a formal quality gate matrix verifying 40+ user paths.',
    keyFeatures: [
      'Comprehensive Test Matrix covering Functional, UI, Usability, and Boundary Value scenarios.',
      'Documented 35+ test cases with Preconditions, Test Steps, Test Data, Expected Results, and Actual Results.',
      'Defect Lifecycle Logging including Severity (Critical, Major, Minor) and Priority assignments.',
      'Form validation edge-cases testing (invalid credit card inputs, expired dates, SQL injection inputs in search).'
    ],
    architecture: [
      'Requirements Analysis -> Test Scenario Generation -> Test Case Authoring -> Execution Simulation -> Defect Reporting'
    ],
    stats: [
      { label: 'Test Cases', value: '35+ Scenarios' },
      { label: 'Pass Rate', value: '92%' },
      { label: 'Defects Logged', value: '6 Identified' }
    ],
    githubUrl: 'https://github.com/akshay-b/qa-manual-test-suite'
  },
  {
    id: 'proj-data-automation',
    title: 'Data Entry & CSV Cleaning Utility',
    tagline: 'Python-Powered Script for Automated Record Sanitization, Deduplication, and Validation',
    isMainProject: false,
    category: 'Python Scripting',
    technologies: ['Python', 'File I/O', 'CSV Module', 'Regular Expressions', 'Data Validation'],
    overview:
      'A practical Python utility built to automate tedious spreadsheet data entry workflows. It parses raw customer survey and inventory spreadsheets, cleans whitespace, validates phone and email formatting, detects duplicate records, and outputs standardized clean files.',
    problemStatement:
      'Manual entry of thousands of customer rows frequently introduces human typos, mismatched casing, and duplicate phone numbers. This utility reduces cleaning time from hours to seconds.',
    keyFeatures: [
      'Automated format normalization: title-cases names, trims stray spaces, and cleans phone number formatting.',
      'Regex email validator flagging malformed domains or missing symbols.',
      'Duplicate detection engine comparing primary identifiers to output audit logs.',
      'Summary report generator summarizing valid vs rejected records.'
    ],
    architecture: [
      'Input CSV Reader -> Parsing & Regex Engine -> Validation Rules Evaluator -> Clean Output Writer & Error Log'
    ],
    stats: [
      { label: 'Processing Speed', value: '10k rows / 2s' },
      { label: 'Error Reduction', value: '99.4%' },
      { label: 'Language', value: 'Python 3' }
    ],
    githubUrl: 'https://github.com/akshay-b/python-data-entry-cleaner'
  }
];

export const DEFAULT_CERTIFICATIONS: CertificationItem[] = [
  {
    id: 'cert-data-entry',
    title: 'Data Entry Operator Certificate',
    issuingOrganization: 'Vocational Training & Skill Certification Authority',
    issueDate: 'Certified',
    credentialId: 'DEO-IND-2023-8842',
    verified: true,
    skillsAcquired: [
      'High-Speed Alphanumeric Touch Typing',
      'Data Verification & Proofreading (98%+ Accuracy)',
      'Spreadsheet Management (MS Excel Formulas, Data Sorting)',
      'Digital Document Formatting & Archiving (MS Word)',
      'Confidentiality & Data Integrity Standards'
    ],
    description:
      'Formal professional certification verifying high-speed alphanumeric data entry, computerized database record maintenance, document structuring, spreadsheet data hygiene, and organizational accuracy under tight timelines.'
  }
];
