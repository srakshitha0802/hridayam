import { BELVO_CATEGORIES, Course, Lesson } from '../types';

export const ASSETS = {
  heroStudio: '/src/assets/images/hero_hridayam_academy_1794840082084.jpg',
  marketingAnalytics: '/src/assets/images/course_marketing_analytics_1794847114972.jpg',
  digitalAi: '/src/assets/images/course_digital_ai_1794840081518.jpg',
  designMedia: '/src/assets/images/course_design_media_1794840081729.jpg',
  videoVfx: '/src/assets/images/course_video_vfx_suite_1794847113046.jpg',
  aiEngineering: '/src/assets/images/course_ai_engineering_lab_1794847116491.jpg',
  ecommerceStudio: '/src/assets/images/course_ecommerce_studio_1794847115102.jpg',
  photographySet: '/src/assets/images/course_photography_set_1794847114088.jpg',
  b2bVenture: '/src/assets/images/course_b2b_venture_table_1794847116663.jpg',
  copySeo: '/src/assets/images/course_copy_seo_desk_1794847115848.jpg',
  cloudBusiness: '/src/assets/images/course_cloud_business_1794840082120.jpg',
  dataBi: '/src/assets/images/course_data_bi_desk_1794847116028.jpg',
  instructorLead: '/src/assets/images/instructor_portrait_lead_1794840082220.jpg',
  mentorArjun: '/src/assets/images/mentor_portrait_arjun_1794847117600.jpg',
  mentorAnanya: '/src/assets/images/mentor_portrait_ananya_1794847118309.jpg',
  alumniPriya: '/src/assets/images/alumni_portrait_priya_1794847118830.jpg',
};

export interface CourseRichMeta {
  toolsCovered: string[];
  nextCohortDate: string;
  rating: number;
  reviewCount: number;
  capstoneProject: string;
  instructorRole: string;
  weeklyFormat: string;
}

export const COURSE_EXTRAS: Record<string, CourseRichMeta> = {
  course_digital_marketing_growth: {
    toolsCovered: ['Meta Ads Manager', 'GA4', 'Looker Studio', 'HubSpot'],
    nextCohortDate: 'Dec 2, 2026',
    rating: 4.9,
    reviewCount: 184,
    capstoneProject: '90-Day Multi-Channel Acquisition Blueprint & ROAS Audit',
    instructorRole: 'Head of Growth Architecture, Belvo',
    weeklyFormat: '4h/wk video labs + live ad-account teardowns',
  },
  course_fullstack_typescript: {
    toolsCovered: ['TypeScript', 'React 19', 'Node.js', 'Firebase'],
    nextCohortDate: 'Dec 5, 2026',
    rating: 4.9,
    reviewCount: 276,
    capstoneProject: 'Production Multi-Tenant SaaS Workspace with Security Rules',
    instructorRole: 'Principal Staff Engineer, Belvo Cloud',
    weeklyFormat: '6h/wk guided builds + code review clinics',
  },
  course_uiux_brand_systems: {
    toolsCovered: ['Figma', 'Variables & Tokens', 'WCAG Audits', 'Storybook'],
    nextCohortDate: 'Open Self-Paced',
    rating: 4.8,
    reviewCount: 412,
    capstoneProject: 'Accessible Multi-Platform Design System & Handoff Spec',
    instructorRole: 'Director of Brand & Product Design, Belvo',
    weeklyFormat: '3h/wk critique studios + Figma file reviews',
  },
  course_motion_vfx_story: {
    toolsCovered: ['DaVinci Resolve', 'After Effects', 'Nuke Basics', 'Rec.709'],
    nextCohortDate: 'Dec 9, 2026',
    rating: 4.8,
    reviewCount: 119,
    capstoneProject: '60-Second Graded Commercial Film with Planar Compositing',
    instructorRole: 'Senior Post-Production Lead, Belvo Media',
    weeklyFormat: '5h/wk timeline labs + dailies critique',
  },
  course_ai_automation_workflows: {
    toolsCovered: ['Gemini API', 'TypeScript SDK', 'Structured JSON', 'Evals'],
    nextCohortDate: 'Dec 7, 2026',
    rating: 4.9,
    reviewCount: 318,
    capstoneProject: 'Grounded Agentic Document Extraction & CRM Automation Pipeline',
    instructorRole: 'Lead AI Systems Researcher, Belvo Labs',
    weeklyFormat: '5h/wk architecture workshops + golden-set evals',
  },
  course_ecommerce_scale: {
    toolsCovered: ['Shopify', 'Klaviyo', 'Margin Modeling', 'CRO'],
    nextCohortDate: 'Open Self-Paced',
    rating: 4.7,
    reviewCount: 205,
    capstoneProject: 'Launch-Ready D2C Storefront & 60-Day Retention Flow',
    instructorRole: 'Commerce Strategy Partner, Belvo',
    weeklyFormat: '3h/wk merchandising walkthroughs + margin spreadsheets',
  },
  course_photography_content: {
    toolsCovered: ['Tethered Capture', 'Lightroom Classic', 'Studio Modifiers'],
    nextCohortDate: 'Dec 12, 2026',
    rating: 4.8,
    reviewCount: 94,
    capstoneProject: '12-Frame Brand Editorial Lookbook & Lighting Diagram',
    instructorRole: 'Commercial Art Director, Belvo Studios',
    weeklyFormat: '4h/wk lighting breakdowns + contact sheet reviews',
  },
  course_b2b_sales_ventures: {
    toolsCovered: ['Consultative Discovery', 'CRM Forecasting', 'Value Pricing'],
    nextCohortDate: 'Dec 14, 2026',
    rating: 4.9,
    reviewCount: 147,
    capstoneProject: 'Enterprise Outbound Playbook & Tiered Retainer Proposal',
    instructorRole: 'VP of Venture Partnerships, Belvo',
    weeklyFormat: '4h/wk live negotiation roleplays + pipeline audits',
  },
  course_seo_copywriting: {
    toolsCovered: ['Search Console', 'Topic Clusters', 'UX Microcopy', 'Schema'],
    nextCohortDate: 'Open Self-Paced',
    rating: 4.8,
    reviewCount: 261,
    capstoneProject: 'High-Intent Landing Page Rewrite & 12-Brief Pillar Cluster',
    instructorRole: 'Editorial & Search Lead, Belvo',
    weeklyFormat: '3h/wk copy clinics + SERP teardown sessions',
  },
  course_cloud_cybersecurity: {
    toolsCovered: ['IAM Policies', 'Docker', 'TLS/Auth', 'Incident Playbooks'],
    nextCohortDate: 'Dec 10, 2026',
    rating: 4.9,
    reviewCount: 168,
    capstoneProject: 'Zero-Trust Deployment Architecture & Disaster Recovery Runbook',
    instructorRole: 'Principal Cloud Security Architect, Belvo',
    weeklyFormat: '4h/wk hardening labs + tabletop drills',
  },
  course_data_analytics_bi: {
    toolsCovered: ['PostgreSQL', 'Window Functions', 'Cohort Modeling', 'BI'],
    nextCohortDate: 'Dec 16, 2026',
    rating: 4.9,
    reviewCount: 229,
    capstoneProject: 'Executive Revenue Waterfall & 12-Month Cohort Retention Model',
    instructorRole: 'Head of Decision Intelligence, Belvo',
    weeklyFormat: '5h/wk SQL modeling labs + executive storytelling',
  },
};

export interface FacultyMentor {
  id: string;
  name: string;
  role: string;
  specialty: string;
  experienceYears: number;
  avatarUrl: string;
  officeHours: string;
  bio: string;
}

export const FACULTY_MENTORS: FacultyMentor[] = [
  {
    id: 'mentor_meera',
    name: 'Meera Nair',
    role: 'Dean of Design & Product Craft',
    specialty: 'UI/UX Systems & Brand Architecture',
    experienceYears: 11,
    avatarUrl: ASSETS.instructorLead,
    officeHours: 'Tuesdays · 6:00 PM IST',
    bio: 'Led design systems for fintech and consumer platforms across Bengaluru and Singapore before shaping Belvo studio pedagogy.',
  },
  {
    id: 'mentor_arjun',
    name: 'Arjun Deshmukh',
    role: 'Growth & Revenue Faculty Lead',
    specialty: 'Performance Marketing & B2B Funnels',
    experienceYears: 9,
    avatarUrl: ASSETS.mentorArjun,
    officeHours: 'Thursdays · 7:30 PM IST',
    bio: 'Managed $18M+ in multi-channel acquisition budgets and now coaches marketers and founders on unit-economic clarity.',
  },
  {
    id: 'mentor_ananya',
    name: 'Dr. Ananya Sen',
    role: 'Principal AI & Engineering Mentor',
    specialty: 'Applied LLMs, TypeScript & Cloud Systems',
    experienceYears: 12,
    avatarUrl: ASSETS.mentorAnanya,
    officeHours: 'Saturdays · 11:00 AM IST',
    bio: 'PhD in Applied Computing; oversees Belvo enterprise automation pipelines, capstone evaluations, and technical rubrics.',
  },
];

export interface AlumniStory {
  id: string;
  name: string;
  previousRole: string;
  currentRole: string;
  organization: string;
  courseTaken: string;
  outcomeMetric: string;
  quote: string;
  avatarUrl: string;
}

export const ALUMNI_STORIES: AlumniStory[] = [
  {
    id: 'alumni_priya_d',
    name: 'Sneha Rajagopal',
    previousRole: 'Print Graphic Designer',
    currentRole: 'Product Designer, Design Systems',
    organization: 'FinStack Labs, Bengaluru',
    courseTaken: 'Editorial Branding, Design Systems & UI/UX',
    outcomeMetric: 'Shipped 42-component Figma library in 8 weeks',
    quote:
      'Instead of watching passive theory videos, every weekly brief pushed me to defend spacing math, WCAG contrast, and engineering handoff tokens with real mentors.',
    avatarUrl: ASSETS.alumniPriya,
  },
  {
    id: 'alumni_dev',
    name: 'Devansh Mehta',
    previousRole: 'Junior Operations Analyst',
    currentRole: 'AI Automation Engineer',
    organization: 'Kora Logistics',
    courseTaken: 'Applied AI, LLM Engineering & Workflow Automation',
    outcomeMetric: 'Cut manual invoice triage time by 68%',
    quote:
      'Learning deterministic JSON schemas and evaluation harnesses gave me the confidence to replace fragile scripts at work with a verified automation workflow.',
    avatarUrl: ASSETS.aiEngineering,
  },
  {
    id: 'alumni_maya',
    name: 'Rhea Cherian',
    previousRole: 'Boutique Skincare Maker',
    currentRole: 'Founder, Eunoia Botanical',
    organization: 'Direct-to-Consumer Brand',
    courseTaken: 'Direct-to-Consumer E-Commerce & Store Operations',
    outcomeMetric: '3.1x repeat order lift in first 90 days',
    quote:
      'The contribution-margin sheet and lifecycle email blueprints paid for my entire Hridayam All-Access Pro year within three weeks of relaunching our store.',
    avatarUrl: ASSETS.ecommerceStudio,
  },
];

export interface LiveWorkshopSession {
  id: string;
  title: string;
  mentorName: string;
  category: string;
  dateLabel: string;
  timeLabel: string;
  seatsLeft: number;
}

export const LIVE_WORKSHOPS: LiveWorkshopSession[] = [
  {
    id: 'ws_ai_evals',
    title: 'Live Clinic: Building Reliable JSON Pipelines & Golden Eval Sets',
    mentorName: 'Dr. Ananya Sen',
    category: BELVO_CATEGORIES[4],
    dateLabel: 'Nov 24, 2026',
    timeLabel: '7:00 PM – 8:15 PM IST',
    seatsLeft: 14,
  },
  {
    id: 'ws_design_tokens',
    title: 'Studio Critique: Accessible Glassmorphic UI & Typography Math',
    mentorName: 'Meera Nair',
    category: BELVO_CATEGORIES[2],
    dateLabel: 'Nov 27, 2026',
    timeLabel: '6:30 PM – 7:45 PM IST',
    seatsLeft: 9,
  },
  {
    id: 'ws_growth_audit',
    title: 'Tear-Down Lab: Diagnosing Creative Fatigue & Funnel Payback',
    mentorName: 'Arjun Deshmukh',
    category: BELVO_CATEGORIES[0],
    dateLabel: 'Nov 30, 2026',
    timeLabel: '7:30 PM – 8:30 PM IST',
    seatsLeft: 19,
  },
];

export interface PartnerUniversity {
  id: string;
  name: string;
  shortCode: string;
  location: string;
  allianceRole: string;
}

export const PARTNER_UNIVERSITIES: PartnerUniversity[] = [
  {
    id: 'iitm-open',
    name: 'Madras Institute of Digital Systems',
    shortCode: 'MIDS',
    location: 'Chennai',
    allianceRole: 'Curriculum Advisory',
  },
  {
    id: 'nid-studio',
    name: 'Ahmedabad School of Applied Design',
    shortCode: 'ASAD',
    location: 'Ahmedabad',
    allianceRole: 'UI/UX Accreditation',
  },
  {
    id: 'bengaluru-tech',
    name: 'Bengaluru Computing Consortium',
    shortCode: 'BCC',
    location: 'Bengaluru',
    allianceRole: 'Engineering Labs',
  },
  {
    id: 'symbiosis-innovation',
    name: 'Pune Innovation & Media Faculty',
    shortCode: 'PIMF',
    location: 'Pune',
    allianceRole: 'Film & VFX Track',
  },
  {
    id: 'nus-continuing',
    name: 'Singapore Applied AI Academy',
    shortCode: 'SAAA',
    location: 'Singapore',
    allianceRole: 'ML Research Partner',
  },
  {
    id: 'delft-systems',
    name: 'Delft Digital Architecture Lab',
    shortCode: 'DDAL',
    location: 'Delft',
    allianceRole: 'Systems Design',
  },
  {
    id: 'hyderabad-analytics',
    name: 'Deccan Data & Decision Institute',
    shortCode: 'DDDI',
    location: 'Hyderabad',
    allianceRole: 'BI Capstone Jury',
  },
  {
    id: 'mumbai-commerce',
    name: 'Bombay School of Digital Commerce',
    shortCode: 'BSDC',
    location: 'Mumbai',
    allianceRole: 'Venture Mentorship',
  },
];

export interface SubscriptionPlan {
  id: 'starter_monthly' | 'pro_annual' | 'enterprise_team';
  name: string;
  audience: string;
  monthlyPrice: number;
  annualMonthlyEquivalent: number;
  annualTotal: number;
  summary: string;
  limits: {
    courseAccess: string;
    assessments: string;
    certificates: string;
    mentorship: string;
  };
}

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'starter_monthly',
    name: 'Belvo Explorer',
    audience: 'For self-paced beginners',
    monthlyPrice: 29,
    annualMonthlyEquivalent: 24,
    annualTotal: 288,
    summary: 'Full access to foundational courses, graded quizzes, and community peer reviews.',
    limits: {
      courseAccess: 'All Beginner & Free Courses (40+ modules)',
      assessments: 'Automated chapter quizzes & rubrics',
      certificates: 'Digital completion badge',
      mentorship: 'Async community forum Q&A',
    },
  },
  {
    id: 'pro_annual',
    name: 'Hridayam All-Access Pro',
    audience: 'For working professionals & freelancers',
    monthlyPrice: 59,
    annualMonthlyEquivalent: 44,
    annualTotal: 528,
    summary: 'Unlimited access across all 11 Belvo digital & technical domains, capstone reviews, and verified certificates.',
    limits: {
      courseAccess: 'All 11 Categories & Capstone Labs',
      assessments: 'Live project grading + unlimited quizzes',
      certificates: 'Verified Hridayam by Belvo Credentials',
      mentorship: 'Bi-weekly Belvo practitioner office hours',
    },
  },
  {
    id: 'enterprise_team',
    name: 'Belvo Studio & Campus',
    audience: 'For agencies, startups & universities',
    monthlyPrice: 149,
    annualMonthlyEquivalent: 119,
    annualTotal: 1428,
    summary: 'Multi-seat upskilling with cohort progress analytics, custom workshops, and university credit alignment.',
    limits: {
      courseAccess: 'Up to 10 team seats + custom tracks',
      assessments: 'Cohort skill benchmarks & admin reports',
      certificates: 'Co-branded institutional credentials',
      mentorship: 'Dedicated Belvo technical lead',
    },
  },
];

export const SEED_COURSES: (Omit<Course, 'createdAt' | 'updatedAt'> & {
  lessons: Omit<Lesson, 'createdAt' | 'updatedAt'>[];
})[] = [
  {
    id: 'course_digital_marketing_growth',
    title: 'Performance Marketing & Social Growth Systems',
    category: BELVO_CATEGORIES[0],
    level: 'Intermediate',
    summary: 'Design full-funnel acquisition campaigns across Meta, Google, and LinkedIn with measurable CAC/LTV discipline.',
    description:
      'Built directly from Belvo agency playbooks, this applied course guides marketers, founders, and freelancers through paid acquisition architecture, creative testing matrices, attribution modeling, and organic social retention systems.',
    price: 79,
    currency: 'USD',
    isFree: false,
    includedInSubscription: true,
    durationHours: 16,
    thumbnailUrl: ASSETS.marketingAnalytics,
    instructorId: 'belvo_faculty_marketing',
    instructorName: 'Arjun Deshmukh',
    status: 'published',
    outcomes: [
      'Structure multi-tier paid acquisition funnels with clear ROAS guardrails',
      'Audit creative fatigue and launch 3-variable ad experiments',
      'Build weekly attribution and content calendar dashboards',
    ],
    modulesCount: 4,
    enrolledCount: 342,
    lessons: [
      {
        id: 'lesson_dm_1',
        courseId: 'course_digital_marketing_growth',
        instructorId: 'belvo_faculty_marketing',
        isPublished: true,
        orderIndex: 1,
        title: 'Unit Economics of Acquisition: CAC, Payback & Funnel Math',
        type: 'video',
        durationMinutes: 28,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        materialUrl: 'https://belvo.edu/materials/dm-funnel-sheet',
        contentSummary:
          'Break down customer acquisition cost, contribution margin, and channel saturation before spending a single dollar on ad platforms.',
      },
      {
        id: 'lesson_dm_2',
        courseId: 'course_digital_marketing_growth',
        instructorId: 'belvo_faculty_marketing',
        isPublished: true,
        orderIndex: 2,
        title: 'Creative Testing Matrix for Paid Social',
        type: 'reading',
        durationMinutes: 20,
        materialUrl: 'https://belvo.edu/materials/creative-testing-playbook',
        contentSummary:
          'Learn how Belvo creative strategists isolate hooks, visual anchors, and offer framing across short-form video and static carousels.',
      },
      {
        id: 'lesson_dm_3',
        courseId: 'course_digital_marketing_growth',
        instructorId: 'belvo_faculty_marketing',
        isPublished: true,
        orderIndex: 3,
        title: 'Campaign Audit Assignment: Diagnose a Live Funnel',
        type: 'assignment',
        durationMinutes: 45,
        contentSummary:
          'Review a sample 90-day e-commerce ad account export, identify the highest-leverage bottleneck, and draft a 2-week recovery sprint.',
      },
      {
        id: 'lesson_dm_4',
        courseId: 'course_digital_marketing_growth',
        instructorId: 'belvo_faculty_marketing',
        isPublished: true,
        orderIndex: 4,
        title: 'Assessment: Paid Acquisition & Attribution Check',
        type: 'quiz',
        durationMinutes: 15,
        contentSummary: 'Verify your mastery of attribution windows, incrementality, and creative retention metrics.',
        quizQuestion: 'When CTR drops while frequency rises above 3.5 in a prospecting campaign, what is the primary diagnosis?',
        quizOptions: [
          'Creative fatigue in the target audience segment',
          'Checkout page latency failure',
          'Domain DNS propagation delay',
          'Organic SEO keyword cannibalization',
        ],
        quizCorrectIndex: 0,
      },
    ],
  },
  {
    id: 'course_fullstack_typescript',
    title: 'Full-Stack Web & Cloud App Engineering',
    category: BELVO_CATEGORIES[1],
    level: 'Intermediate',
    summary: 'Architect production React, TypeScript, and serverless API applications from schema design to deployment.',
    description:
      'Go beyond toy tutorials. Engineer an end-to-end multi-user SaaS product with strict TypeScript contracts, accessible UI primitives, real-time Firestore listeners, and automated CI verification.',
    price: 99,
    currency: 'USD',
    isFree: false,
    includedInSubscription: true,
    durationHours: 28,
    thumbnailUrl: ASSETS.digitalAi,
    instructorId: 'belvo_faculty_eng',
    instructorName: 'Rohan Kulkarni',
    status: 'published',
    outcomes: [
      'Design normalized data schemas and zero-trust API authorization rules',
      'Build responsive, WCAG-compliant React interfaces with TypeScript',
      'Ship optimized production bundles with structured error telemetry',
    ],
    modulesCount: 4,
    enrolledCount: 518,
    lessons: [
      {
        id: 'lesson_fs_1',
        courseId: 'course_fullstack_typescript',
        instructorId: 'belvo_faculty_eng',
        isPublished: true,
        orderIndex: 1,
        title: 'Domain-Driven TypeScript & Component Contracts',
        type: 'video',
        durationMinutes: 35,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        contentSummary:
          'Establish strict boundary types between database schemas, API payloads, and UI state containers.',
      },
      {
        id: 'lesson_fs_2',
        courseId: 'course_fullstack_typescript',
        instructorId: 'belvo_faculty_eng',
        isPublished: true,
        orderIndex: 2,
        title: 'Zero-Trust Data Access & Validation Patterns',
        type: 'reading',
        durationMinutes: 25,
        contentSummary:
          'Enforce ownership checks, field allowlists, and deterministic batch transactions so client tampering cannot corrupt state.',
      },
      {
        id: 'lesson_fs_3',
        courseId: 'course_fullstack_typescript',
        instructorId: 'belvo_faculty_eng',
        isPublished: true,
        orderIndex: 3,
        title: 'Lab: Build a Role-Protected Workspace Module',
        type: 'assignment',
        durationMinutes: 60,
        contentSummary:
          'Implement an authenticated dashboard view with optimistic state updates and proper loading/empty states.',
      },
      {
        id: 'lesson_fs_4',
        courseId: 'course_fullstack_typescript',
        instructorId: 'belvo_faculty_eng',
        isPublished: true,
        orderIndex: 4,
        title: 'Assessment: Architecture & State Safety',
        type: 'quiz',
        durationMinutes: 15,
        contentSummary: 'Confirm your understanding of atomic batches, immutability, and frontend performance budgets.',
        quizQuestion: 'Why should related document writes (such as creating an enrolment and incrementing a counter) run inside an atomic batch?',
        quizOptions: [
          'To compress CSS stylesheets automatically',
          'To guarantee both operations succeed or fail together without partial state drift',
          'To bypass authentication checks in production',
          'To convert TypeScript interfaces to SQL tables',
        ],
        quizCorrectIndex: 1,
      },
    ],
  },
  {
    id: 'course_uiux_brand_systems',
    title: 'Editorial Branding, Design Systems & UI/UX',
    category: BELVO_CATEGORIES[2],
    level: 'Beginner',
    summary: 'Craft coherent visual identities, typographic hierarchies, and multi-platform Figma component systems.',
    description:
      'Learn how Belvo product designers move from brand positioning and grid geometry to token-driven Figma systems that developers can implement cleanly without guesswork.',
    price: 0,
    currency: 'USD',
    isFree: true,
    includedInSubscription: true,
    durationHours: 12,
    thumbnailUrl: ASSETS.designMedia,
    instructorId: 'belvo_faculty_design',
    instructorName: 'Meera Nair',
    status: 'published',
    outcomes: [
      'Construct 60-30-10 color systems with verified WCAG AA contrast',
      'Establish responsive typographic scales and spatial rhythm',
      'Document interactive component states for seamless engineering handoff',
    ],
    modulesCount: 4,
    enrolledCount: 894,
    lessons: [
      {
        id: 'lesson_ux_1',
        courseId: 'course_uiux_brand_systems',
        instructorId: 'belvo_faculty_design',
        isPublished: true,
        orderIndex: 1,
        title: 'Spatial Rhythm, Grids & The 60-30-10 Rule',
        type: 'video',
        durationMinutes: 24,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        contentSummary:
          'Understand why restraint and whitespace produce higher perceived authority than decorative gradients and cluttered cards.',
      },
      {
        id: 'lesson_ux_2',
        courseId: 'course_uiux_brand_systems',
        instructorId: 'belvo_faculty_design',
        isPublished: true,
        orderIndex: 2,
        title: 'Typographic Pairing & Optical Contrast',
        type: 'reading',
        durationMinutes: 18,
        contentSummary:
          'Pair expressive display grotesks with high-legibility body sans and tabular numerals for interfaces.',
      },
      {
        id: 'lesson_ux_3',
        courseId: 'course_uiux_brand_systems',
        instructorId: 'belvo_faculty_design',
        isPublished: true,
        orderIndex: 3,
        title: 'Studio Brief: Design a B2B SaaS Header & Card System',
        type: 'assignment',
        durationMinutes: 40,
        contentSummary:
          'Create a three-zone navigation bar and a zero-pill metadata card grid that maintains clarity across 375px and 1440px.',
      },
      {
        id: 'lesson_ux_4',
        courseId: 'course_uiux_brand_systems',
        instructorId: 'belvo_faculty_design',
        isPublished: true,
        orderIndex: 4,
        title: 'Assessment: Accessibility & Hierarchy Principles',
        type: 'quiz',
        durationMinutes: 10,
        contentSummary: 'Test your command of contrast ratios, affordance cues, and layout math.',
        quizQuestion: 'What is the minimum WCAG AA contrast ratio required for standard body copy?',
        quizOptions: ['2.1 : 1', '3.0 : 1', '4.5 : 1', '7.5 : 1'],
        quizCorrectIndex: 2,
      },
    ],
  },
  {
    id: 'course_motion_vfx_story',
    title: 'Commercial Video Editing, Motion & VFX',
    category: BELVO_CATEGORIES[3],
    level: 'Intermediate',
    summary: 'Master narrative pacing, color grading pipelines, 3D camera tracking, and compositing for brand films.',
    description:
      'Designed for editors and motion artists delivering commercial campaigns, product launch films, and high-retention social narratives.',
    price: 89,
    currency: 'USD',
    isFree: false,
    includedInSubscription: true,
    durationHours: 20,
    thumbnailUrl: ASSETS.videoVfx,
    instructorId: 'belvo_faculty_media',
    instructorName: 'Kabir Malhotra',
    status: 'published',
    outcomes: [
      'Cut multi-cam commercial edits with intentional sound design',
      'Composite clean screen replacements and motion graphics',
      'Deliver calibrated Rec.709 and web-optimized master exports',
    ],
    modulesCount: 3,
    enrolledCount: 214,
    lessons: [
      {
        id: 'lesson_vfx_1',
        courseId: 'course_motion_vfx_story',
        instructorId: 'belvo_faculty_media',
        isPublished: true,
        orderIndex: 1,
        title: 'Rhythm, J-Cuts & Narrative Pacing in Brand Films',
        type: 'video',
        durationMinutes: 30,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoy.mp4',
        contentSummary: 'Control viewer attention through audio pre-lapping, match cuts, and deliberate beat timing.',
      },
      {
        id: 'lesson_vfx_2',
        courseId: 'course_motion_vfx_story',
        instructorId: 'belvo_faculty_media',
        isPublished: true,
        orderIndex: 2,
        title: 'Planar Tracking & Clean Plate Compositing',
        type: 'reading',
        durationMinutes: 25,
        contentSummary: 'Step-by-step workflow for removing rigging markers and integrating typographic callouts into live footage.',
      },
      {
        id: 'lesson_vfx_3',
        courseId: 'course_motion_vfx_story',
        instructorId: 'belvo_faculty_media',
        isPublished: true,
        orderIndex: 3,
        title: 'Assessment: Color Space & Delivery Specs',
        type: 'quiz',
        durationMinutes: 12,
        contentSummary: 'Check your mastery of codecs, bit depth, and broadcast color standards.',
        quizQuestion: 'Which color space is the standard delivery target for web and HD broadcast video?',
        quizOptions: ['CMYK Coated', 'Rec. 709', 'ProPhoto RGB', 'Lab Color'],
        quizCorrectIndex: 1,
      },
    ],
  },
  {
    id: 'course_ai_automation_workflows',
    title: 'Applied AI, LLM Engineering & Workflow Automation',
    category: BELVO_CATEGORIES[4],
    level: 'Advanced',
    summary: 'Build reliable generative AI agents, structured extraction pipelines, and automated business operations.',
    description:
      'Transition from prompting chat boxes to engineering deterministic AI workflows: tool calling, structured JSON schemas, evaluation harnesses, and CRM/ERP automations.',
    price: 129,
    currency: 'USD',
    isFree: false,
    includedInSubscription: true,
    durationHours: 24,
    thumbnailUrl: ASSETS.aiEngineering,
    instructorId: 'belvo_faculty_ai',
    instructorName: 'Dr. Ananya Sen',
    status: 'published',
    outcomes: [
      'Architect structured-output LLM pipelines with schema validation',
      'Automate multi-step support, research, and operations workflows',
      'Design accuracy benchmarks to evaluate hallucination rates before launch',
    ],
    modulesCount: 3,
    enrolledCount: 641,
    lessons: [
      {
        id: 'lesson_ai_1',
        courseId: 'course_ai_automation_workflows',
        instructorId: 'belvo_faculty_ai',
        isPublished: true,
        orderIndex: 1,
        title: 'Structured Schemas, Tool Calling & Grounded Retrieval',
        type: 'video',
        durationMinutes: 34,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
        contentSummary: 'Move from brittle string parsing to typed JSON schema enforcement and grounded source citations.',
      },
      {
        id: 'lesson_ai_2',
        courseId: 'course_ai_automation_workflows',
        instructorId: 'belvo_faculty_ai',
        isPublished: true,
        orderIndex: 2,
        title: 'Evaluating Agent Reliability & Latency Budgets',
        type: 'reading',
        durationMinutes: 22,
        contentSummary: 'Construct golden test sets to catch regressions whenever prompts or models evolve.',
      },
      {
        id: 'lesson_ai_3',
        courseId: 'course_ai_automation_workflows',
        instructorId: 'belvo_faculty_ai',
        isPublished: true,
        orderIndex: 3,
        title: 'Assessment: Production AI Architecture',
        type: 'quiz',
        durationMinutes: 15,
        contentSummary: 'Validate key decisions around grounding, fallback routing, and schema enforcement.',
        quizQuestion: 'What is the primary purpose of enforcing a JSON response schema in an automated extraction pipeline?',
        quizOptions: [
          'To increase image resolution',
          'To ensure downstream software receives predictable, typed fields without brittle regex parsing',
          'To eliminate server authentication',
          'To bypass rate limits',
        ],
        quizCorrectIndex: 1,
      },
    ],
  },
  {
    id: 'course_ecommerce_scale',
    title: 'Direct-to-Consumer E-Commerce & Store Operations',
    category: BELVO_CATEGORIES[5],
    level: 'Beginner',
    summary: 'Launch, merchandise, and scale profitable online storefronts with conversion-focused UX and retention.',
    description:
      'Everything required to take a physical or digital product brand from supplier sourcing and storefront setup to checkout optimization, email lifecycle flows, and inventory forecasting.',
    price: 0,
    currency: 'USD',
    isFree: true,
    includedInSubscription: true,
    durationHours: 10,
    thumbnailUrl: ASSETS.ecommerceStudio,
    instructorId: 'belvo_faculty_commerce',
    instructorName: 'Vikramaditya Rao',
    status: 'published',
    outcomes: [
      'Configure high-converting product detail pages and bundle pricing',
      'Set up automated cart recovery and post-purchase retention sequences',
      'Model gross margin after shipping, returns, and payment fees',
    ],
    modulesCount: 3,
    enrolledCount: 429,
    lessons: [
      {
        id: 'lesson_ec_1',
        courseId: 'course_ecommerce_scale',
        instructorId: 'belvo_faculty_commerce',
        isPublished: true,
        orderIndex: 1,
        title: 'Storefront Merchandising & Product Page Conversion',
        type: 'video',
        durationMinutes: 25,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        contentSummary: 'Structure hero offers, social proof placement, and shipping clarity above the fold.',
      },
      {
        id: 'lesson_ec_2',
        courseId: 'course_ecommerce_scale',
        instructorId: 'belvo_faculty_commerce',
        isPublished: true,
        orderIndex: 2,
        title: 'Retention Loops & Repeat Purchase Economics',
        type: 'reading',
        durationMinutes: 20,
        contentSummary: 'Design 30-60-90 day lifecycle touchpoints that lift repeat order rate without eroding margins.',
      },
      {
        id: 'lesson_ec_3',
        courseId: 'course_ecommerce_scale',
        instructorId: 'belvo_faculty_commerce',
        isPublished: true,
        orderIndex: 3,
        title: 'Assessment: Store Unit Economics',
        type: 'quiz',
        durationMinutes: 10,
        contentSummary: 'Verify your understanding of AOV, contribution margin, and checkout friction.',
        quizQuestion: 'Which metric best measures what remains after COGS, shipping, payment fees, and ad spend?',
        quizOptions: ['Gross Merchandise Value', 'Contribution Margin', 'Bounce Rate', 'Page Impressions'],
        quizCorrectIndex: 1,
      },
    ],
  },
  {
    id: 'course_photography_content',
    title: 'Commercial Photography & Visual Storytelling',
    category: BELVO_CATEGORIES[6],
    level: 'Beginner',
    summary: 'Master natural & studio lighting, composition, tethering, and editorial retouching for brand shoots.',
    description:
      'Turn everyday environments into editorial sets. Learn exposure discipline, modifier selection, product styling, and color-consistent Lightroom workflows.',
    price: 59,
    currency: 'USD',
    isFree: false,
    includedInSubscription: true,
    durationHours: 14,
    thumbnailUrl: ASSETS.photographySet,
    instructorId: 'belvo_faculty_photo',
    instructorName: 'Tara Kapoor',
    status: 'published',
    outcomes: [
      'Shape hard vs diffused window light for portraits and product sets',
      'Build repeatable color grading profiles for multi-platform feeds',
      'Plan shot lists and art direction decks for paying brand clients',
    ],
    modulesCount: 3,
    enrolledCount: 187,
    lessons: [
      {
        id: 'lesson_ph_1',
        courseId: 'course_photography_content',
        instructorId: 'belvo_faculty_photo',
        isPublished: true,
        orderIndex: 1,
        title: 'Light Quality, Inverse Square Law & Modifiers',
        type: 'video',
        durationMinutes: 26,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        contentSummary: 'Control shadow falloff and specular highlights with minimal portable gear.',
      },
      {
        id: 'lesson_ph_2',
        courseId: 'course_photography_content',
        instructorId: 'belvo_faculty_photo',
        isPublished: true,
        orderIndex: 2,
        title: 'Tethered Shooting & Client Art Direction',
        type: 'reading',
        durationMinutes: 18,
        contentSummary: 'Run structured on-set reviews with live overlays and consistent framing.',
      },
      {
        id: 'lesson_ph_3',
        courseId: 'course_photography_content',
        instructorId: 'belvo_faculty_photo',
        isPublished: true,
        orderIndex: 3,
        title: 'Assessment: Exposure & Lighting Physics',
        type: 'quiz',
        durationMinutes: 10,
        contentSummary: 'Check foundational principles of aperture, shutter speed, and diffused lighting.',
        quizQuestion: 'Moving a softbox closer to a subject relative to its size creates what visual effect?',
        quizOptions: [
          'Softer shadow transitions with faster light falloff behind the subject',
          'Harsher, razor-sharp shadow edges',
          'Higher digital sensor noise',
          'Wider focal length distortion',
        ],
        quizCorrectIndex: 0,
      },
    ],
  },
  {
    id: 'course_b2b_sales_ventures',
    title: 'B2B Sales Strategy, Partnerships & Entrepreneurship',
    category: BELVO_CATEGORIES[7],
    level: 'Intermediate',
    summary: 'Structure outbound pipelines, run consultative discovery calls, and close enterprise retainers.',
    description:
      'Built for founders, agency partners, and business development leads who need repeatable revenue processes rather than ad-hoc pitching.',
    price: 75,
    currency: 'USD',
    isFree: false,
    includedInSubscription: true,
    durationHours: 15,
    thumbnailUrl: ASSETS.b2bVenture,
    instructorId: 'belvo_faculty_biz',
    instructorName: 'Siddharth Verma',
    status: 'published',
    outcomes: [
      'Qualify enterprise buyers using structured pain-impact frameworks',
      'Price retainers and milestone scopes based on business value',
      'Manage CRM pipeline stages with accurate quarterly forecasting',
    ],
    modulesCount: 3,
    enrolledCount: 276,
    lessons: [
      {
        id: 'lesson_bd_1',
        courseId: 'course_b2b_sales_ventures',
        instructorId: 'belvo_faculty_biz',
        isPublished: true,
        orderIndex: 1,
        title: 'Consultative Discovery & Qualification Frameworks',
        type: 'video',
        durationMinutes: 29,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        contentSummary: 'Uncover quantified business bottlenecks before presenting a single proposal slide.',
      },
      {
        id: 'lesson_bd_2',
        courseId: 'course_b2b_sales_ventures',
        instructorId: 'belvo_faculty_biz',
        isPublished: true,
        orderIndex: 2,
        title: 'Proposal Architecture & Objection Navigation',
        type: 'reading',
        durationMinutes: 22,
        contentSummary: 'Present three-tier options that anchor value and clarify decision timelines.',
      },
      {
        id: 'lesson_bd_3',
        courseId: 'course_b2b_sales_ventures',
        instructorId: 'belvo_faculty_biz',
        isPublished: true,
        orderIndex: 3,
        title: 'Assessment: Pipeline & Deal Qualification',
        type: 'quiz',
        durationMinutes: 10,
        contentSummary: 'Validate your understanding of buyer alignment and value-based pricing.',
        quizQuestion: 'What should happen before sending a commercial pricing proposal to a B2B prospect?',
        quizOptions: [
          'Confirming the problem cost, decision criteria, and budget authority during discovery',
          'Publishing the prospect logo on your website',
          'Offering an immediate 40% discount',
          'Skipping technical scoping',
        ],
        quizCorrectIndex: 0,
      },
    ],
  },
  {
    id: 'course_seo_copywriting',
    title: 'Technical SEO, Conversion Copywriting & Editorial Strategy',
    category: BELVO_CATEGORIES[8],
    level: 'Beginner',
    summary: 'Write persuasive landing copy and build search-backed content clusters that capture high-intent traffic.',
    description:
      'Combine clarity-first UX copywriting with search intent mapping, internal linking architecture, and SERP topical authority.',
    price: 0,
    currency: 'USD',
    isFree: true,
    includedInSubscription: true,
    durationHours: 11,
    thumbnailUrl: ASSETS.copySeo,
    instructorId: 'belvo_faculty_content',
    instructorName: 'Nandini Joshi',
    status: 'published',
    outcomes: [
      'Audit website messaging for clarity, proof adjacency, and CTA friction',
      'Map commercial and informational search intent into topic clusters',
      'Eliminate technical crawl errors and optimize Core Web Vitals signals',
    ],
    modulesCount: 3,
    enrolledCount: 492,
    lessons: [
      {
        id: 'lesson_seo_1',
        courseId: 'course_seo_copywriting',
        instructorId: 'belvo_faculty_content',
        isPublished: true,
        orderIndex: 1,
        title: 'Search Intent Architecture & Topic Clusters',
        type: 'video',
        durationMinutes: 22,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoy.mp4',
        contentSummary: 'Structure pillar guides and supporting briefs around real buyer questions.',
      },
      {
        id: 'lesson_seo_2',
        courseId: 'course_seo_copywriting',
        instructorId: 'belvo_faculty_content',
        isPublished: true,
        orderIndex: 2,
        title: 'Conversion Copy: Replacing Buzzwords with Proof',
        type: 'reading',
        durationMinutes: 18,
        contentSummary: 'Rewrite vague headlines into specific, verifiable product outcomes.',
      },
      {
        id: 'lesson_seo_3',
        courseId: 'course_seo_copywriting',
        instructorId: 'belvo_faculty_content',
        isPublished: true,
        orderIndex: 3,
        title: 'Assessment: Technical & Editorial SEO',
        type: 'quiz',
        durationMinutes: 10,
        contentSummary: 'Test knowledge of canonicalization, search intent, and copy clarity.',
        quizQuestion: 'What is the main purpose of a canonical link tag on web pages?',
        quizOptions: [
          'To tell search engines which URL represents the authoritative primary version of duplicate or similar pages',
          'To encrypt user passwords',
          'To compress PNG images',
          'To block all mobile crawlers',
        ],
        quizCorrectIndex: 0,
      },
    ],
  },
  {
    id: 'course_cloud_cybersecurity',
    title: 'Cloud Infrastructure, DevOps & Cybersecurity Foundations',
    category: BELVO_CATEGORIES[9],
    level: 'Intermediate',
    summary: 'Harden cloud deployments, enforce IAM least privilege, and implement automated backup & incident playbooks.',
    description:
      'Essential operational security and cloud architecture for developers, IT administrators, and startup teams managing live customer data.',
    price: 95,
    currency: 'USD',
    isFree: false,
    includedInSubscription: true,
    durationHours: 18,
    thumbnailUrl: ASSETS.cloudBusiness,
    instructorId: 'belvo_faculty_cloud',
    instructorName: 'Karthik Subramanian',
    status: 'published',
    outcomes: [
      'Implement IAM least-privilege policies and zero-trust database rules',
      'Automate encrypted snapshots, disaster recovery drills, and log alerts',
      'Identify OWASP Top 10 web vulnerabilities during code review',
    ],
    modulesCount: 3,
    enrolledCount: 305,
    lessons: [
      {
        id: 'lesson_cl_1',
        courseId: 'course_cloud_cybersecurity',
        instructorId: 'belvo_faculty_cloud',
        isPublished: true,
        orderIndex: 1,
        title: 'IAM Least Privilege, Secrets & Zero-Trust Boundaries',
        type: 'video',
        durationMinutes: 31,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
        contentSummary: 'Lock down API credentials, service accounts, and client-facing database rules.',
      },
      {
        id: 'lesson_cl_2',
        courseId: 'course_cloud_cybersecurity',
        instructorId: 'belvo_faculty_cloud',
        isPublished: true,
        orderIndex: 2,
        title: 'Automated Backups & Incident Response Checklists',
        type: 'reading',
        durationMinutes: 20,
        contentSummary: 'Establish RPO/RTO targets and verify backup restoration before an outage occurs.',
      },
      {
        id: 'lesson_cl_3',
        courseId: 'course_cloud_cybersecurity',
        instructorId: 'belvo_faculty_cloud',
        isPublished: true,
        orderIndex: 3,
        title: 'Assessment: Cloud Security Hygiene',
        type: 'quiz',
        durationMinutes: 12,
        contentSummary: 'Verify your grasp of least privilege, secret rotation, and OWASP defenses.',
        quizQuestion: 'Under the Principle of Least Privilege, how should permissions be granted to a service account?',
        quizOptions: [
          'Grant full project owner access to save setup time',
          'Grant only the exact minimum roles and resources required for its specific task',
          'Share one root API key across all microservices',
          'Disable TLS verification in production',
        ],
        quizCorrectIndex: 1,
      },
    ],
  },
  {
    id: 'course_data_analytics_bi',
    title: 'Data Analytics, SQL Modeling & Business Intelligence',
    category: BELVO_CATEGORIES[10],
    level: 'Intermediate',
    summary: 'Transform raw operational data into executive KPI models, cohort retention tables, and decision dashboards.',
    description:
      'Bridge the gap between spreadsheets and decision science. Query relational tables cleanly, model cohort retention, and present executive insights without misleading charts.',
    price: 85,
    currency: 'USD',
    isFree: false,
    includedInSubscription: true,
    durationHours: 19,
    thumbnailUrl: ASSETS.dataBi,
    instructorId: 'belvo_faculty_data',
    instructorName: 'Priya Menon',
    status: 'published',
    outcomes: [
      'Write clean analytical SQL using CTEs and window functions',
      'Construct cohort retention and revenue waterfall models',
      'Design executive BI views with zero chart clutter',
    ],
    modulesCount: 3,
    enrolledCount: 389,
    lessons: [
      {
        id: 'lesson_da_1',
        courseId: 'course_data_analytics_bi',
        instructorId: 'belvo_faculty_data',
        isPublished: true,
        orderIndex: 1,
        title: 'Analytical SQL: Window Functions & Cohort Tables',
        type: 'video',
        durationMinutes: 32,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        contentSummary: 'Compute rolling 30-day retention and moving averages directly in SQL.',
      },
      {
        id: 'lesson_da_2',
        courseId: 'course_data_analytics_bi',
        instructorId: 'belvo_faculty_data',
        isPublished: true,
        orderIndex: 2,
        title: 'Executive KPI Governance & Visualization Clarity',
        type: 'reading',
        durationMinutes: 20,
        contentSummary: 'Avoid vanity metrics and align every dashboard widget to an actionable owner.',
      },
      {
        id: 'lesson_da_3',
        courseId: 'course_data_analytics_bi',
        instructorId: 'belvo_faculty_data',
        isPublished: true,
        orderIndex: 3,
        title: 'Assessment: Data Modeling & BI Accuracy',
        type: 'quiz',
        durationMinutes: 12,
        contentSummary: 'Check your ability to reason about cohort denominators and SQL joins.',
        quizQuestion: 'Which SQL clause defines the partition and ordering for a running total without collapsing rows?',
        quizOptions: ['GROUP BY', 'OVER (PARTITION BY ... ORDER BY ...)', 'HAVING', 'CROSS JOIN'],
        quizCorrectIndex: 1,
      },
    ],
  },
];

export interface PlacementMetric {
  id: string;
  value: string;
  label: string;
  detail: string;
}

export const PLACEMENT_METRICS: PlacementMetric[] = [
  {
    id: 'learners',
    value: '40,000+',
    label: 'Learners Trained',
    detail: 'Across technical, creative & marketing cohorts',
  },
  {
    id: 'package',
    value: '19.5 LPA',
    label: 'Highest Package',
    detail: 'Top annual graduate placement offer',
  },
  {
    id: 'partners',
    value: '5,000+',
    label: 'Hiring Partners',
    detail: 'Startups, global studios & enterprise teams',
  },
  {
    id: 'drives',
    value: '1,000+',
    label: 'Placement Drives',
    detail: 'Curated campus & remote interview drives',
  },
];

export interface ThreeAPillar {
  id: string;
  step: string;
  title: string;
  subtitle: string;
  description: string;
  highlight: string;
}

export const THREE_A_PILLARS: ThreeAPillar[] = [
  {
    id: 'attend',
    step: '01. Attend',
    title: '80% Practical Studio Learning',
    subtitle: 'Live Mentor Builds & Lab Sessions',
    description:
      'Skip passive slide decks. Build campaigns, React apps, Figma design systems, and BI models side-by-side with active Belvo practitioners.',
    highlight: '80% Hands-On · 20% Core Theory',
  },
  {
    id: 'assess',
    step: '02. Assess',
    title: 'Progress Pulse & Rubric Checks',
    subtitle: 'Quizzes, Capstones & Mock Reviews',
    description:
      'Measure weekly growth through automated quizzes, graded deliverables, and faculty code/creative reviews engineered around 75%+ readiness benchmarks.',
    highlight: 'Weekly Progress Pulse · Portfolio Audits',
  },
  {
    id: 'achieve',
    step: '03. Achieve',
    title: 'Placement Drives & Credentials',
    subtitle: 'Career Assistance & Verified IDs',
    description:
      'Unlock curated placement drives, ATS resume clinics, and employer-verifiable Hridayam by Belvo completion certificates upon graduating.',
    highlight: 'Direct Hiring Drives · Verified Registry',
  },
];

export interface PlacementRoadmapStep {
  id: string;
  stepNumber: string;
  title: string;
  summary: string;
}

export const PLACEMENT_ROADMAP_STEPS: PlacementRoadmapStep[] = [
  {
    id: 'step-resume',
    stepNumber: '01',
    title: 'Portfolio & ATS Resume Studio',
    summary: 'Structure GitHub repos, Figma case studies, and quantified campaign decks with faculty feedback.',
  },
  {
    id: 'step-mock',
    stepNumber: '02',
    title: 'Technical & Creative Mock Interviews',
    summary: 'Practice live whiteboard problem-solving, SQL/BI drills, and media pitch walkthroughs.',
  },
  {
    id: 'step-unlock',
    stepNumber: '03',
    title: '75%+ Assessment Readiness Unlock',
    summary: 'Clear module quizzes and capstone rubrics with 75%+ scores to enter active placement pools.',
  },
  {
    id: 'step-drives',
    stepNumber: '04',
    title: 'Dedicated Belvo Hiring Drives',
    summary: 'Interview directly with hiring partners across engineering, growth marketing, UI/UX, and analytics.',
  },
];

export interface PlacedAlumniSpotlight {
  id: string;
  name: string;
  placedRole: string;
  companyName: string;
  track: string;
  avatarUrl: string;
  compensationNote: string;
}

export const PLACED_ALUMNI_SPOTLIGHTS: PlacedAlumniSpotlight[] = [
  {
    id: 'placed-1',
    name: 'Ritika Deshpande',
    placedRole: 'Full-Stack Software Engineer',
    companyName: 'Freshworks',
    track: 'Web, App & Software Development',
    avatarUrl: ASSETS.alumniPriya,
    compensationNote: '4.2 LPA -> 11.4 LPA Jump',
  },
  {
    id: 'placed-2',
    name: 'Devansh Kulkarni',
    placedRole: 'Senior Performance Marketer',
    companyName: 'Razorpay Growth Studio',
    track: 'Digital Marketing & Social Media',
    avatarUrl: ASSETS.mentorArjun,
    compensationNote: 'Placed via Cohort Drive #42',
  },
  {
    id: 'placed-3',
    name: 'Sana Merchant',
    placedRole: 'Product & UI/UX Designer',
    companyName: 'Zoho Corp',
    track: 'Graphic Design, Branding & UI/UX',
    avatarUrl: ASSETS.mentorAnanya,
    compensationNote: '3 Portfolio Capstones Shipped',
  },
  {
    id: 'placed-4',
    name: 'Aryan Krishnan',
    placedRole: 'BI & Cloud Analytics Associate',
    companyName: 'Deloitte Digital',
    track: 'Data Analytics & Business Intelligence',
    avatarUrl: ASSETS.instructorLead,
    compensationNote: 'Cleared 75%+ Honors Track',
  },
];

export interface RoiStudioCase {
  id: string;
  discipline: 'SEO' | 'PPC' | 'Web & E-Commerce' | 'Automation & ORM';
  title: string;
  headlineMetric: string;
  timeframe: string;
  clientProfile: string;
  executionSummary: string;
  mappedCourseId: string;
  mappedCourseTitle: string;
}

export const WEBHOPERS_ROI_CASES: RoiStudioCase[] = [
  {
    id: 'roi-seo',
    discipline: 'SEO',
    title: 'Technical & Local Search Growth Playbook',
    headlineMetric: '+180% Organic Visibility',
    timeframe: 'Within 6 Months',
    clientProfile: 'Multi-city SaaS & Service Brand',
    executionSummary:
      'Eliminated crawl bloat, rebuilt commercial topic clusters, and tuned Core Web Vitals to capture high-intent search queries.',
    mappedCourseId: 'course_seo_copywriting',
    mappedCourseTitle: 'Technical SEO, Conversion Copywriting & Editorial Strategy',
  },
  {
    id: 'roi-ppc',
    discipline: 'PPC',
    title: 'Full-Funnel Google & Meta Ads Scaling',
    headlineMetric: '3.8x Blended ROAS',
    timeframe: 'Over 90-Day Sprint',
    clientProfile: 'D2C Lifestyle & B2B Lead Funnel',
    executionSummary:
      'Implemented 3-variable creative matrices, tight negative keyword sculpting, and server-side conversion attribution.',
    mappedCourseId: 'course_digital_marketing_growth',
    mappedCourseTitle: 'Performance Marketing & Social Growth Systems',
  },
  {
    id: 'roi-ecom',
    discipline: 'Web & E-Commerce',
    title: 'High-Speed Shopify & React Commerce Re-Architecture',
    headlineMetric: '2.4x D2C Traffic & Checkout Lift',
    timeframe: 'Post-Launch Quarter',
    clientProfile: 'Direct-to-Consumer Consumer Brand',
    executionSummary:
      'Redesigned above-the-fold merchandising, bundle offers, and automated cart recovery sequences to expand contribution margin.',
    mappedCourseId: 'course_ecommerce_scale',
    mappedCourseTitle: 'Direct-to-Consumer E-Commerce & Store Operations',
  },
  {
    id: 'roi-orm',
    discipline: 'Automation & ORM',
    title: 'AI Lead Triage, CRM & Reputation Systems',
    headlineMetric: '+140% Qualified Inbound Leads',
    timeframe: 'In 4 Months',
    clientProfile: 'B2B Consulting & Agency Group',
    executionSummary:
      'Deployed structured AI enquiry triage, automated response playbooks, and consultative sales qualification pipelines.',
    mappedCourseId: 'course_ai_automation_workflows',
    mappedCourseTitle: 'Applied AI, LLM Engineering & Workflow Automation',
  },
];

export interface ReferEarnStep {
  id: string;
  step: string;
  title: string;
  description: string;
}

export const REFER_EARN_STEPS: ReferEarnStep[] = [
  {
    id: 'ref-1',
    step: '01',
    title: 'Generate Your GenZ Referral Code',
    description:
      'Submit your name, email, and friend’s details below to register an official Hridayam by Belvo referral code.',
  },
  {
    id: 'ref-2',
    step: '02',
    title: 'Friend Enrols with Your Discount',
    description:
      'Your peer gets an instant $60 (₹5,000) tuition concession on any Pro annual membership or flagship career track.',
  },
  {
    id: 'ref-3',
    step: '03',
    title: 'Unlock $60 / ₹5,000 Reward Credit',
    description:
      'Once their enrolment milestone clears, your $60 (₹5,000) reward voucher or fee credit is unlocked in your Belvo ledger.',
  },
];

