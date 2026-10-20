import { Category, Course, LearningPath, User, Enrolment, Certificate, Announcement, PlatformSettings, EmailNotification } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    name: 'Digital Marketing & Social Media Management',
    slug: 'digital-marketing',
    description: 'Master audience acquisition, performance advertising, social media growth, and conversion analytics.',
    subtopics: ['Social media strategy', 'Campaign management', 'Paid advertising (Meta & Google)', 'Analytics & reporting'],
    iconName: 'Megaphone',
    colorAccent: 'sky',
    displayOrder: 1,
    isActive: true,
  },
  {
    id: 'cat-2',
    name: 'Web, App & Software Development',
    slug: 'software-development',
    description: 'Build modern responsive web applications, robust backend services, APIs, and scalable software systems.',
    subtopics: ['HTML, CSS, JavaScript', 'Frontend & backend frameworks', 'Full-stack application architecture', 'Databases, REST APIs & Git'],
    iconName: 'Code',
    colorAccent: 'teal',
    displayOrder: 2,
    isActive: true,
  },
  {
    id: 'cat-3',
    name: 'Graphic Design, Branding & UI/UX',
    slug: 'design-branding-uiux',
    description: 'Develop brand identities, user research methodologies, responsive design systems, and clickable prototypes.',
    subtopics: ['Visual design fundamentals', 'Brand identity design', 'UI/UX research & wireframing', 'Prototyping & design tokens'],
    iconName: 'Palette',
    colorAccent: 'indigo',
    displayOrder: 3,
    isActive: true,
  },
  {
    id: 'cat-4',
    name: 'Video Editing, Animation & VFX',
    slug: 'video-editing-animation',
    description: 'Edit cinematic footage, create engaging motion graphics, audio mastering, and post-production storytelling.',
    subtopics: ['Timeline editing workflows', 'Motion graphics & keyframing', 'Audio mastering & sound design', 'Visual effects & color grading'],
    iconName: 'Film',
    colorAccent: 'purple',
    displayOrder: 4,
    isActive: true,
  },
  {
    id: 'cat-5',
    name: 'Artificial Intelligence, Machine Learning & Automation',
    slug: 'ai-ml-automation',
    description: 'Harness LLMs, build automated agentic pipelines, implement workflow automation, and integrate modern AI APIs.',
    subtopics: ['AI & LLM foundations', 'Prompt engineering & RAG', 'Workflow automation (n8n/Make)', 'AI application development'],
    iconName: 'Cpu',
    colorAccent: 'emerald',
    displayOrder: 5,
    isActive: true,
  },
  {
    id: 'cat-6',
    name: 'E-commerce & Online Business',
    slug: 'ecommerce-business',
    description: 'Launch high-converting online stores, optimize product catalogues, streamline fulfillment, and scale GMV.',
    subtopics: ['Store architecture & Shopify', 'High-converting product pages', 'Fulfillment & inventory ops', 'Unit economics & scaling'],
    iconName: 'ShoppingBag',
    colorAccent: 'amber',
    displayOrder: 6,
    isActive: true,
  },
  {
    id: 'cat-7',
    name: 'Photography & Content Creation',
    slug: 'photography-content',
    description: 'Capture compelling studio and lifestyle photography, mobile cinematography, and viral short-form content.',
    subtopics: ['Camera optics & composition', 'Lighting & photo retouching', 'Short-form vertical video', 'Editorial content calendar'],
    iconName: 'Camera',
    colorAccent: 'rose',
    displayOrder: 7,
    isActive: true,
  },
  {
    id: 'cat-8',
    name: 'Business Development, Sales & Entrepreneurship',
    slug: 'sales-entrepreneurship',
    description: 'Learn B2B lead generation, consultative sales closing, pipeline management, and sustainable startup execution.',
    subtopics: ['Cold outreach & qualification', 'Consultative discovery calls', 'Deal closing & negotiation', 'Lean venture validation'],
    iconName: 'Briefcase',
    colorAccent: 'blue',
    displayOrder: 8,
    isActive: true,
  },
  {
    id: 'cat-9',
    name: 'Copywriting, SEO & Content Marketing',
    slug: 'copywriting-seo',
    description: 'Write compelling persuasive copy, conduct high-intent keyword research, and rank systematically on Google.',
    subtopics: ['Direct-response copywriting', 'Search engine intent & keyword mapping', 'On-page technical SEO', 'Content distribution systems'],
    iconName: 'FileText',
    colorAccent: 'orange',
    displayOrder: 9,
    isActive: true,
  },
  {
    id: 'cat-10',
    name: 'Cloud Computing, IT & Cybersecurity Awareness',
    slug: 'cloud-cybersecurity',
    description: 'Understand cloud architecture, Linux server fundamentals, zero-trust security postures, and defensive hygiene.',
    subtopics: ['Cloud platforms & VPS hosting', 'Networking & DNS fundamentals', 'Vulnerability assessment', 'Secure developer practices'],
    iconName: 'ShieldCheck',
    colorAccent: 'slate',
    displayOrder: 10,
    isActive: true,
  },
  {
    id: 'cat-11',
    name: 'Data Analytics & Business Intelligence',
    slug: 'data-analytics',
    description: 'Transform raw datasets into actionable executive dashboards using spreadsheet modeling, SQL, and PowerBI.',
    subtopics: ['Advanced spreadsheet modeling', 'SQL queries & aggregation', 'Interactive dashboard design', 'Metric KPI formulation'],
    iconName: 'BarChart3',
    colorAccent: 'cyan',
    displayOrder: 11,
    isActive: true,
  },
];

export const INITIAL_COURSES: Course[] = [
  {
    id: 'course-1',
    title: 'Full-Stack Web Development with React & Node.js',
    slug: 'full-stack-web-development-react-nodejs',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    previewVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    format: 'Cohort-Based',
    shortDescription: 'Build scalable modern web applications from scratch using React, TypeScript, Express, and database persistence.',
    fullDescription: 'This comprehensive, project-driven course is engineered for aspiring developers looking to build modern, production-grade web applications. You will learn the exact toolchain and coding conventions used at leading digital agencies: TypeScript, React component architecture, RESTful API design with Express, and structured state management.',
    categoryId: 'cat-2',
    categoryName: 'Web, App & Software Development',
    level: 'Beginner',
    language: 'English',
    durationHours: 36,
    price: 0, // Free course
    currency: 'INR',
    isFeatured: true,
    status: 'published',
    instructor: {
      name: 'Aditya Verma',
      role: 'Principal Engineer',
      agency: 'Belvo Engineering Lab',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      bio: 'Senior software architect with 10+ years directing web and cloud infrastructure for hyper-growth digital startups.'
    },
    learningOutcomes: [
      'Architect robust single-page applications using modern React and TypeScript',
      'Design and deploy RESTful Express backend services with clean validation',
      'Manage database records with schema migrations and indexes',
      'Implement secure authentication flows with role-based access control'
    ],
    prerequisites: [
      'Basic familiarity with computers and code editors like VS Code',
      'No prior programming degree or advanced math required'
    ],
    modules: [
      {
        id: 'mod-1-1',
        title: 'Module 1: Foundations of Modern Web Architecture',
        order: 1,
        lessons: [
          {
            id: 'les-1-1-1',
            title: 'Welcome to Hridayam & Course Orientation',
            durationMinutes: 14,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            isPreview: true,
            description: 'Get oriented with the Belvo engineering workflow, setting up your local workspace, and what you will build.',
            order: 1,
            resources: [
              { id: 'res-1', title: 'Belvo Web Dev Starter Roadmap (PDF)', type: 'pdf', url: 'https://example.com/starter-roadmap.pdf' },
              { id: 'res-2', title: 'VS Code Setup & Extension Pack', type: 'link', url: 'https://code.visualstudio.com' }
            ],
            transcript: [
              { time: 0, text: 'Welcome to Hridayam by Belvo. In this foundational curriculum, we bridge theory and agency execution.' },
              { time: 180, text: 'Our development environment utilizes modern Node.js, TypeScript 5, and Vite build systems.' },
              { time: 420, text: 'We will inspect how real production APIs are structured and why type safety eliminates runtime bugs.' },
              { time: 700, text: 'Before moving to lesson two, verify your local git config and terminal dependencies.' }
            ]
          },
          {
            id: 'les-1-1-2',
            title: 'Modern TypeScript & Component Architecture',
            durationMinutes: 28,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            isPreview: true,
            description: 'Understand props typing, state lifecycles, and avoiding anti-patterns in modern React 19 apps.',
            order: 2,
            resources: [
              { id: 'res-3', title: 'TypeScript Cheat Sheet for React Developers', type: 'pdf', url: 'https://example.com/ts-cheatsheet.pdf' }
            ],
            transcript: [
              { time: 0, text: 'TypeScript gives us compile-time verification before our code ever reaches a browser.' },
              { time: 240, text: 'Let us declare interfaces for user entities and define strongly-typed props.' },
              { time: 600, text: 'Notice how generics allow reusable table and list components without any `any` types.' },
              { time: 1100, text: 'Review the component decomposition pattern before beginning the next hands-on exercise.' }
            ]
          },
          {
            id: 'les-1-1-3',
            title: 'Styling with Tailwind CSS & Design Tokens',
            durationMinutes: 22,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            isPreview: false,
            description: 'Build responsive grids, cohesive spacing scales, and clean dark/light mode interfaces.',
            order: 3,
            resources: []
          }
        ]
      },
      {
        id: 'mod-1-2',
        title: 'Module 2: Server-Side APIs and Persistent Storage',
        order: 2,
        lessons: [
          {
            id: 'les-1-2-1',
            title: 'Building RESTful APIs with Node.js & Express',
            durationMinutes: 35,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
            isPreview: false,
            description: 'Route handling, request validation, middleware security headers, and error formatting.',
            order: 1,
            resources: [
              { id: 'res-4', title: 'API Specification Contract Template', type: 'code', url: '#' }
            ]
          },
          {
            id: 'les-1-2-2',
            title: 'Authentication, Password Hashing & JWT Verification',
            durationMinutes: 40,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
            isPreview: false,
            description: 'End-to-end user registration, password encryption with bcrypt, and protected route handlers.',
            order: 2,
            resources: []
          }
        ]
      }
    ],
    quiz: {
      id: 'quiz-1',
      courseId: 'course-1',
      title: 'Full-Stack Architecture & Security Assessment',
      passingScorePercent: 80,
      timeLimitMinutes: 20,
      questions: [
        {
          id: 'q1-1',
          prompt: 'Which HTTP method should be utilized when you want to update only specific fields of an existing user record?',
          type: 'multiple_choice',
          options: ['GET', 'POST', 'PATCH', 'DELETE'],
          correctOptionIndex: 2,
          explanation: 'PATCH is intended for partial updates to a resource, whereas PUT typically replaces the entire resource.'
        },
        {
          id: 'q1-2',
          prompt: 'Where should sensitive database credentials and payment API secret keys be placed in a production application?',
          type: 'multiple_choice',
          options: [
            'Inside React component state for fast access',
            'Committed to the public Git repository in config.json',
            'Exclusively in server-side environment variables or secret managers',
            'Stored in local browser storage'
          ],
          correctOptionIndex: 2,
          explanation: 'Sensitive credentials must never be committed to source code or exposed to client browsers.'
        },
        {
          id: 'q1-3',
          prompt: 'In React, mutating state directly (e.g. state.count = 5) triggers a reliable UI re-render.',
          type: 'true_false',
          options: ['True', 'False'],
          correctOptionIndex: 1,
          explanation: 'State must be updated immutably using the state setter function so React can detect changes and schedule a re-render.'
        },
        {
          id: 'q1-4',
          prompt: 'What is the primary benefit of TypeScript over plain JavaScript in large-scale applications?',
          type: 'multiple_choice',
          options: [
            'It eliminates the need for unit testing entirely',
            'It provides static type analysis at compile time, reducing runtime bugs',
            'It speeds up database write speeds',
            'It makes CSS files load automatically'
          ],
          correctOptionIndex: 1,
          explanation: 'TypeScript introduces compile-time type verification, catching null/undefined errors and mismatch contracts before runtime.'
        }
      ]
    },
    hasAssignment: true,
    assignmentPrompt: 'Build and submit a working CRUD task planner prototype using React and Express, implementing input validation and error states.',
    certificateEligible: true,
    createdAt: '2026-01-15T09:00:00Z',
    updatedAt: '2026-03-01T12:00:00Z'
  },
  {
    id: 'course-2',
    title: 'Practical AI & Workflow Automation for Modern Teams',
    slug: 'practical-ai-workflow-automation',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    previewVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    format: 'Cohort-Based',
    shortDescription: 'Connect LLMs, build custom automated pipelines with n8n/Make, and automate business processes with zero fluff.',
    fullDescription: 'Move beyond generic chatbot prompts. This course equips professionals and operators to architect autonomous workflow automations that ingest real data, leverage generative AI for classification and synthesis, and sync across CRMs, Slack, and cloud databases.',
    categoryId: 'cat-5',
    categoryName: 'Artificial Intelligence, Machine Learning & Automation',
    level: 'Intermediate',
    language: 'English',
    durationHours: 24,
    price: 4999,
    currency: 'INR',
    discountPercent: 20,
    isFeatured: true,
    status: 'published',
    instructor: {
      name: 'Pooja Nair',
      role: 'Head of Automation Solutions',
      agency: 'Belvo AI Practice',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      bio: 'Automation architect helping enterprise teams deploy production AI pipelines and eliminate 1,000+ manual hours per quarter.'
    },
    learningOutcomes: [
      'Design reliable multi-step workflows using n8n and webhook triggers',
      'Integrate modern LLM APIs with structured JSON output and schema validation',
      'Build automated customer support triage and lead enrichment bots',
      'Handle error fallbacks and rate-limit backoffs in production'
    ],
    prerequisites: [
      'Understanding of basic web concepts like APIs and JSON payloads',
      'A desire to automate repetitive business workflows'
    ],
    modules: [
      {
        id: 'mod-2-1',
        title: 'Module 1: Automation Fundamentals & Webhook Architecture',
        order: 1,
        lessons: [
          {
            id: 'les-2-1-1',
            title: 'Deconstructing Modern Automation Architecture',
            durationMinutes: 18,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
            isPreview: true,
            description: 'Why fragile point-to-point scripts fail and how event-driven webhooks power reliable systems.',
            order: 1,
            resources: [
              { id: 'res-2-1', title: 'Belvo Automation Blueprint Architecture Guide', type: 'pdf', url: '#' }
            ],
            transcript: [
              { time: 0, text: 'In this session, we analyze why brittle manual handoffs cost growing businesses thousands of wasted hours.' },
              { time: 200, text: 'We define the difference between client-side automation and server-side webhook orchestration.' },
              { time: 500, text: 'Next, let us look at idempotent execution and why every workflow trigger requires unique signature checks.' }
            ]
          },
          {
            id: 'les-2-1-2',
            title: 'Setting Up n8n & Connecting Inbound Webhooks',
            durationMinutes: 24,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
            isPreview: false,
            description: 'Step-by-step workflow setup, testing payload reception, and formatting JSON structures.',
            order: 2,
            resources: []
          }
        ]
      },
      {
        id: 'mod-2-2',
        title: 'Module 2: Structured LLM Intelligence & Production Deployment',
        order: 2,
        lessons: [
          {
            id: 'les-2-2-1',
            title: 'Enforcing Structured JSON Output with Gemini & OpenAI',
            durationMinutes: 32,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
            isPreview: false,
            description: 'Using schema validation and function calling so AI responses never break downstream database saves.',
            order: 1,
            resources: []
          }
        ]
      }
    ],
    quiz: {
      id: 'quiz-2',
      courseId: 'course-2',
      title: 'AI Automation & Webhook Integration Quiz',
      passingScorePercent: 75,
      timeLimitMinutes: 15,
      questions: [
        {
          id: 'q2-1',
          prompt: 'What is the primary advantage of receiving events via Webhooks rather than Polling an API every 30 seconds?',
          type: 'multiple_choice',
          options: [
            'Webhooks consume 10x more server memory',
            'Webhooks are real-time and eliminate wasteful empty polling requests',
            'Webhooks do not require internet access',
            'Polling is always faster than webhooks'
          ],
          correctOptionIndex: 1,
          explanation: 'Webhooks are event-driven: the source notifies the receiver immediately upon an event, avoiding constant resource-intensive polling.'
        },
        {
          id: 'q2-2',
          prompt: 'When building an automated AI pipeline that updates a CRM, why is structured output schema mode essential?',
          type: 'multiple_choice',
          options: [
            'It makes the model respond in poetry',
            'It guarantees the AI response conforms strictly to specified JSON keys and types',
            'It removes the need for an API key',
            'It guarantees 100% free API credits'
          ],
          correctOptionIndex: 1,
          explanation: 'Structured schema outputs ensure programmatic predictability, preventing unparseable prose from breaking downstream database pipelines.'
        }
      ]
    },
    certificateEligible: true,
    createdAt: '2026-02-01T10:00:00Z',
    updatedAt: '2026-03-05T14:00:00Z'
  },
  {
    id: 'course-3',
    title: 'Performance Marketing & Meta Ad Campaigns Masterclass',
    slug: 'performance-marketing-meta-ads-masterclass',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    previewVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    format: 'Self-Paced',
    shortDescription: 'Learn agency-tested strategies for media buying, campaign structuring, creative testing, and tracking attribution.',
    fullDescription: 'Stop burning budget on unoptimized boosting. Developed by performance specialists at Belvo, this course breaks down how profitable e-commerce and B2B brands spend with predictable ROAS. Learn creative iteration, high-intent targeting, Meta CBO setups, and pixel/Conversion API configuration.',
    categoryId: 'cat-1',
    categoryName: 'Digital Marketing & Social Media Management',
    level: 'Beginner',
    language: 'English',
    durationHours: 18,
    price: 3499,
    currency: 'INR',
    discountPercent: 15,
    isFeatured: true,
    status: 'published',
    instructor: {
      name: 'Rohan Mehra',
      role: 'Performance Marketing Director',
      agency: 'Belvo Growth Studio',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      bio: 'Managed over ₹12 Crore in performance ad spend across direct-to-consumer and SaaS brands with an average 3.8x blended ROAS.'
    },
    learningOutcomes: [
      'Structure high-converting Meta and Google campaigns from cold traffic to retargeting',
      'Conduct statistical creative testing using scientific naming taxonomies',
      'Configure Meta Conversions API (CAPI) for privacy-first attribution tracking',
      'Calculate customer acquisition costs (CAC) and customer lifetime value (LTV)'
    ],
    prerequisites: [
      'Basic understanding of social media platforms and online business goals'
    ],
    modules: [
      {
        id: 'mod-3-1',
        title: 'Module 1: Media Buying Fundamentals & Unit Economics',
        order: 1,
        lessons: [
          {
            id: 'les-3-1-1',
            title: 'Unit Economics: CAC, AOV, and Contribution Margin',
            durationMinutes: 21,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
            isPreview: true,
            description: 'Why ROAS without margin understanding bankrupts brands, and how to price campaigns profitably.',
            order: 1,
            resources: [
              { id: 'res-3-1', title: 'Belvo ROAS & Margin Planning Spreadsheet', type: 'sheet', url: '#' }
            ],
            transcript: [
              { time: 0, text: 'Welcome to Performance Marketing. In this masterclass, we teach you how media buying works at scale.' },
              { time: 150, text: 'Never evaluate ROAS in isolation without understanding blended contribution margin and product gross margins.' },
              { time: 400, text: 'We walk through how customer lifetime value (LTV) dictates your maximum allowable acquisition cost.' }
            ]
          },
          {
            id: 'les-3-1-2',
            title: 'Meta Ads Manager Hierarchy: Campaigns, Ad Sets, and Ads',
            durationMinutes: 26,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
            isPreview: false,
            description: 'Deep dive into campaign budget optimization (CBO) vs ad set budgets, bid caps, and placements.',
            order: 2,
            resources: []
          }
        ]
      }
    ],
    quiz: {
      id: 'quiz-3',
      courseId: 'course-3',
      title: 'Performance Marketing Metrics & Strategy Quiz',
      passingScorePercent: 80,
      questions: [
        {
          id: 'q3-1',
          prompt: 'If an ad campaign spends ₹10,000 and generates 25 paid orders, what is the Customer Acquisition Cost (CAC)?',
          type: 'multiple_choice',
          options: ['₹250', '₹400', '₹2,500', '₹500'],
          correctOptionIndex: 1,
          explanation: 'CAC = Total Ad Spend / Total Customers Acquired = ₹10,000 / 25 = ₹400.'
        },
        {
          id: 'q3-2',
          prompt: 'What does the Meta Conversions API (CAPI) solve compared to the traditional browser-only Meta Pixel?',
          type: 'multiple_choice',
          options: [
            'It makes ads completely free',
            'It sends conversion data directly from the server, overcoming browser ad-blockers and iOS privacy restrictions',
            'It automatically writes ad headlines with AI',
            'It restricts ads to desktop computers only'
          ],
          correctOptionIndex: 1,
          explanation: 'Server-side CAPI bypasses client-side cookie blocking and ad-blockers, restoring accurate attribution telemetry.'
        }
      ]
    },
    certificateEligible: true,
    createdAt: '2026-02-10T11:00:00Z',
    updatedAt: '2026-03-08T15:00:00Z'
  },
  {
    id: 'course-4',
    title: 'UI/UX Design Systems & Figma Prototyping',
    slug: 'ui-ux-design-systems-figma',
    thumbnail: 'https://images.unsplash.com/photo-1581291518655-9523c932694b?auto=format&fit=crop&w=1200&q=80',
    previewVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    format: 'Cohort-Based',
    shortDescription: 'Master design tokens, auto-layout 5.0, user research methods, and handoff-ready responsive design systems.',
    fullDescription: 'Learn how modern agency product designers think, research, and execute. You will build a complete enterprise design system inside Figma, with auto-layout components, variant properties, design tokens, and interactive micro-prototypes ready for developer handoff.',
    categoryId: 'cat-3',
    categoryName: 'Graphic Design, Branding & UI/UX',
    level: 'Beginner',
    language: 'English',
    durationHours: 28,
    price: 0, // Free course
    currency: 'INR',
    isFeatured: true,
    status: 'published',
    instructor: {
      name: 'Ananya Deshmukh',
      role: 'Design Director',
      agency: 'Belvo Product Design Group',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
      bio: 'Crafted design systems for fintech and consumer apps used by over 4 million monthly active users.'
    },
    learningOutcomes: [
      'Build scalable component libraries with auto-layout and component properties',
      'Establish cohesive typography, color, and elevation token architectures',
      'Conduct user testing and wireframe high-fidelity user journeys',
      'Prepare frictionless developer handoff specifications'
    ],
    prerequisites: [
      'Basic familiarity with a web browser and digital tools; no coding required'
    ],
    modules: [
      {
        id: 'mod-4-1',
        title: 'Module 1: Design Tokens & Layout Foundations',
        order: 1,
        lessons: [
          {
            id: 'les-4-1-1',
            title: 'Typography Scales, Spacing Math & Optical Ratios',
            durationMinutes: 25,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            isPreview: true,
            description: 'Why generic layouts feel unpolished and how mathematical spatial scales solve visual hierarchy.',
            order: 1,
            resources: [
              { id: 'res-4-1', title: 'Belvo 8pt Grid & Typography Ratio Sheet', type: 'pdf', url: '#' }
            ],
            transcript: [
              { time: 0, text: 'Great interface design is built on mathematical discipline rather than random aesthetic guesses.' },
              { time: 180, text: 'We explore modular typography scales: Major Second (1.125), Minor Third (1.200), and Major Third (1.250).' },
              { time: 480, text: 'Here is how to set up an 8pt soft spatial grid and component bounding boxes in Figma.' }
            ]
          }
        ]
      }
    ],
    quiz: {
      id: 'quiz-4',
      courseId: 'course-4',
      title: 'UI/UX System Design Assessment',
      passingScorePercent: 80,
      questions: [
        {
          id: 'q4-1',
          prompt: 'What is the standard inner-to-outer border radius relationship for nested UI containers?',
          type: 'multiple_choice',
          options: [
            'Inner radius must equal outer radius multiplied by two',
            'Inner radius should equal outer radius minus container padding (r_inner = r_outer - padding)',
            'Inner containers should always have zero radius',
            'Radius should be randomly assigned'
          ],
          correctOptionIndex: 1,
          explanation: 'To maintain concentric curvature and avoid awkward visual pinching, the inner radius equals outer radius minus the intervening padding.'
        }
      ]
    },
    certificateEligible: true,
    createdAt: '2026-01-20T14:00:00Z',
    updatedAt: '2026-03-02T16:00:00Z'
  },
  {
    id: 'course-5',
    title: 'SQL, Spreadsheets & Business Intelligence Dashboards',
    slug: 'sql-spreadsheets-bi-dashboards',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    previewVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    format: 'Self-Paced',
    shortDescription: 'From raw relational databases to executive dashboards: write complex SQL queries and build decision-making dashboards.',
    fullDescription: 'Every decision-maker in modern tech needs quantitative literacy. Learn to query production PostgreSQL databases with confidence: joins, group by aggregations, window functions, and transforming query outputs into clean BI charts that leaders trust.',
    categoryId: 'cat-11',
    categoryName: 'Data Analytics & Business Intelligence',
    level: 'Intermediate',
    language: 'English',
    durationHours: 20,
    price: 3999,
    currency: 'INR',
    discountPercent: 10,
    isFeatured: true,
    status: 'published',
    instructor: {
      name: 'Vikram Joshi',
      role: 'Lead Data Analyst',
      agency: 'Belvo Analytics',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      bio: '12+ years building enterprise reporting pipelines and SQL data models for international banking and SaaS firms.'
    },
    learningOutcomes: [
      'Write production SQL queries with complex multi-table joins and subqueries',
      'Utilize window functions (ROW_NUMBER, RANK, LAG/LEAD) for cohort retention analysis',
      'Build executive KPI dashboards that highlight business bottlenecks',
      'Optimize slow database queries using indexes and query plans'
    ],
    prerequisites: ['Basic spreadsheet understanding (VLOOKUP / SUMIF)'],
    modules: [
      {
        id: 'mod-5-1',
        title: 'Module 1: Relational Data Models & Query Structure',
        order: 1,
        lessons: [
          {
            id: 'les-5-1-1',
            title: 'Anatomy of a Production Relational Database',
            durationMinutes: 20,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            isPreview: true,
            description: 'Primary keys, foreign keys, table normalization, and understanding relational schemas.',
            order: 1,
            resources: []
          }
        ]
      }
    ],
    quiz: {
      id: 'quiz-5',
      courseId: 'course-5',
      title: 'SQL & Analytics Query Proficiency Quiz',
      passingScorePercent: 75,
      questions: [
        {
          id: 'q5-1',
          prompt: 'Which SQL clause is used to filter aggregated group records (such as COUNT(*) > 5)?',
          type: 'multiple_choice',
          options: ['WHERE', 'HAVING', 'GROUP BY', 'LIMIT'],
          correctOptionIndex: 1,
          explanation: 'WHERE filters rows before grouping, whereas HAVING filters groups after aggregation.'
        }
      ]
    },
    certificateEligible: true,
    createdAt: '2026-02-15T09:00:00Z',
    updatedAt: '2026-03-10T12:00:00Z'
  },
  {
    id: 'course-6',
    title: 'High-Converting Copywriting & Search Intent SEO',
    slug: 'copywriting-search-intent-seo',
    thumbnail: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80',
    previewVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    format: 'Self-Paced',
    shortDescription: 'Craft persuasive sales copy and execute data-backed SEO strategies that capture qualified organic search traffic.',
    fullDescription: 'Stop writing generic filler articles. Learn the psychological formulas behind direct-response copywriting and how to systematically reverse-engineer Google search intent to produce articles that rank in the top 3 spots and convert readers into paying clients.',
    categoryId: 'cat-9',
    categoryName: 'Copywriting, SEO & Content Marketing',
    level: 'Beginner',
    language: 'English',
    durationHours: 16,
    price: 2999,
    currency: 'INR',
    isFeatured: false,
    status: 'published',
    instructor: {
      name: 'Sneha Kulkarni',
      role: 'Content Strategist',
      agency: 'Belvo Content Studio',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      bio: 'Published author and agency copy director whose content funnels have driven over 2.5 million organic search sessions.'
    },
    learningOutcomes: [
      'Write compelling sales pages using the PAS (Problem-Agitate-Solve) and AIDA frameworks',
      'Conduct keyword intent mapping: informational vs commercial intent',
      'Perform technical on-page audits (title tags, schema markup, Core Web Vitals)',
      'Create linkable agency asset content that earns natural backlinks'
    ],
    prerequisites: ['Strong command of written English'],
    modules: [
      {
        id: 'mod-6-1',
        title: 'Module 1: Direct-Response Copywriting Foundations',
        order: 1,
        lessons: [
          {
            id: 'les-6-1-1',
            title: 'The Psychology of Reader Attention & Headlines',
            durationMinutes: 19,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            isPreview: true,
            description: 'How to write headlines that stop the scroll without resorting to cheap clickbait.',
            order: 1,
            resources: []
          }
        ]
      }
    ],
    certificateEligible: true,
    createdAt: '2026-02-18T10:00:00Z',
    updatedAt: '2026-03-12T11:00:00Z'
  },
  {
    id: 'course-7',
    title: 'Cinematic Video Editing & Motion Graphics in Premiere Pro',
    slug: 'cinematic-video-editing-motion-graphics',
    thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
    previewVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    format: 'Cohort-Based',
    shortDescription: 'Master pacing, visual storytelling, dynamic keyframe animation, color grading with LUTs, and audio mixing.',
    fullDescription: 'From YouTube masterclasses to high-budget brand commercials, video editing is the highest leverage storytelling skill. Learn professional Premiere Pro and After Effects workflows used by Belvo video creators: rhythm cutting, J-cuts and L-cuts, sound design layers, and custom motion graphics.',
    categoryId: 'cat-4',
    categoryName: 'Video Editing, Animation & VFX',
    level: 'Beginner',
    language: 'English',
    durationHours: 30,
    price: 4499,
    currency: 'INR',
    discountPercent: 15,
    isFeatured: true,
    status: 'published',
    instructor: {
      name: 'Kabir Sengupta',
      role: 'Creative Video Director',
      agency: 'Belvo Media Lab',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
      bio: 'Award-winning commercial video editor whose campaigns have garnered over 50M views across YouTube and OTT.'
    },
    learningOutcomes: [
      'Master keyboard shortcuts and speed workflows in Adobe Premiere Pro',
      'Create kinetic typography and lower thirds in After Effects',
      'Execute professional multi-track audio mixing and room tone matching',
      'Color grade RAW and Log footage using Lumetri Scopes and custom LUTs'
    ],
    prerequisites: ['Computer capable of running modern video editing software'],
    modules: [
      {
        id: 'mod-7-1',
        title: 'Module 1: Timeline Assembly & Narrative Pacing',
        order: 1,
        lessons: [
          {
            id: 'les-7-1-1',
            title: 'The Art of the Cut: Pacing, Beat Matching & Transitions',
            durationMinutes: 24,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
            isPreview: true,
            description: 'Why edits feel clunky and how music waveforms guide subconscious viewer emotional resonance.',
            order: 1,
            resources: []
          }
        ]
      }
    ],
    certificateEligible: true,
    createdAt: '2026-02-22T08:00:00Z',
    updatedAt: '2026-03-14T10:00:00Z'
  },
  {
    id: 'course-8',
    title: 'High-Scale E-Commerce Architecture & Shopify Mastery',
    slug: 'high-scale-ecommerce-shopify-mastery',
    thumbnail: 'https://images.unsplash.com/photo-1556742049-0a67e5572293?auto=format&fit=crop&w=1200&q=80',
    previewVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    format: 'Cohort-Based',
    shortDescription: 'Build high-converting D2C stores, customize liquid themes, streamline warehousing, and optimize conversion rate (CRO).',
    fullDescription: 'Learn how to build, launch, and scale a multimillion-rupee e-commerce enterprise. Taught by Belvo commerce architects, this course covers storefront architecture, custom checkout flows, inventory syncing, payment gateway reconciliations, and post-purchase upsell mechanics.',
    categoryId: 'cat-6',
    categoryName: 'E-commerce & Online Business',
    level: 'Intermediate',
    language: 'English',
    durationHours: 26,
    price: 5499,
    currency: 'INR',
    discountPercent: 20,
    isFeatured: true,
    status: 'published',
    instructor: {
      name: 'Neha Singhania',
      role: 'Head of E-Commerce Solutions',
      agency: 'Belvo Commerce',
      avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=200&q=80',
      bio: 'Architected D2C digital stores generating over ₹45 Crore in annual gross merchandise value.'
    },
    learningOutcomes: [
      'Design high-converting mobile product detail pages (PDP) with social proof',
      'Optimize one-page checkout experiences and integrate payment gateways',
      'Implement abandoned cart email flows with proven recovery rates',
      'Manage inventory matrices, supplier fulfillment, and reverse logistics'
    ],
    prerequisites: ['Basic familiarity with online retail and digital shopping'],
    modules: [
      {
        id: 'mod-8-1',
        title: 'Module 1: Storefront Architecture & Conversion Engineering',
        order: 1,
        lessons: [
          {
            id: 'les-8-1-1',
            title: 'Deconstructing 8-Figure D2C Store Architecture',
            durationMinutes: 28,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
            isPreview: true,
            description: 'Why 70% of e-commerce checkouts fail and how to optimize visual trust signals.',
            order: 1,
            resources: []
          }
        ]
      }
    ],
    certificateEligible: true,
    createdAt: '2026-02-25T11:00:00Z',
    updatedAt: '2026-03-15T12:00:00Z'
  },
  {
    id: 'course-9',
    title: 'Commercial Photography & Studio Visual Storytelling',
    slug: 'commercial-photography-visual-storytelling',
    thumbnail: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80',
    previewVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
    format: 'Weekend Intensive',
    shortDescription: 'Master manual camera controls, 3-point studio lighting, product styling, and Lightroom colour grading.',
    fullDescription: 'Transform raw imagery into commercial agency assets. Understand lighting angles, diffuse light ratios, lens focal lengths, and camera sensor physics to create striking product and editorial photography for brand catalogues and advertising.',
    categoryId: 'cat-7',
    categoryName: 'Photography & Content Creation',
    level: 'Beginner',
    language: 'English',
    durationHours: 18,
    price: 3299,
    currency: 'INR',
    isFeatured: false,
    status: 'published',
    instructor: {
      name: 'Aryan Pillai',
      role: 'Senior Visual Producer',
      agency: 'Belvo Creative Studio',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
      bio: 'Fashion and product photographer published in national lifestyle publications and luxury brand campaigns.'
    },
    learningOutcomes: [
      'Master manual exposure triangle (ISO, Aperture, Shutter Speed)',
      'Set up 3-point lighting with key, fill, and rim lights in studio settings',
      'Batch edit and color-match commercial sets in Adobe Lightroom Classic',
      'Curate an editorial portfolio that commands professional client rates'
    ],
    prerequisites: ['DSLR, Mirrorless, or modern smartphone with manual camera controls'],
    modules: [
      {
        id: 'mod-9-1',
        title: 'Module 1: Optics, Focal Lengths & Light Modeling',
        order: 1,
        lessons: [
          {
            id: 'les-9-1-1',
            title: 'Mastering Natural & Artificial Light Modulation',
            durationMinutes: 22,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
            isPreview: true,
            description: 'Hard vs soft light, inverse square law, and how diffusers shape shadow falloff.',
            order: 1,
            resources: []
          }
        ]
      }
    ],
    certificateEligible: true,
    createdAt: '2026-03-01T09:00:00Z',
    updatedAt: '2026-03-16T14:00:00Z'
  },
  {
    id: 'course-10',
    title: 'Consultative B2B Sales & Pipeline Engineering',
    slug: 'consultative-b2b-sales-pipeline-engineering',
    thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80',
    previewVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    format: 'Cohort-Based',
    shortDescription: 'Master enterprise discovery calls, consultative qualification, high-ticket deal closing, and CRM management.',
    fullDescription: 'High-ticket sales is a predictable science, not a gamble. Learn the MEDDPICC qualification framework, outbound multichannel sequencing, running consultative discovery calls that uncover client pain points, and closing 6-figure contracts without aggressive sleazy tactics.',
    categoryId: 'cat-8',
    categoryName: 'Business Development, Sales & Entrepreneurship',
    level: 'Intermediate',
    language: 'English',
    durationHours: 22,
    price: 4999,
    currency: 'INR',
    discountPercent: 10,
    isFeatured: true,
    status: 'published',
    instructor: {
      name: 'Devika Rao',
      role: 'VP of Business Development',
      agency: 'Belvo Enterprise',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      bio: 'Closed over ₹30 Crore in enterprise technology and consulting contracts with multinational organizations.'
    },
    learningOutcomes: [
      'Implement the MEDDPICC enterprise qualification system',
      'Conduct consultative discovery calls that establish clear ROI justification',
      'Handle pricing resistance and negotiate multi-year service contracts',
      'Structure high-velocity outbound email and LinkedIn sequences'
    ],
    prerequisites: ['Interest in business growth, professional services, or SaaS sales'],
    modules: [
      {
        id: 'mod-10-1',
        title: 'Module 1: The Modern Enterprise Buyer Journey',
        order: 1,
        lessons: [
          {
            id: 'les-10-1-1',
            title: 'Deconstructing Consultative Discovery Calls',
            durationMinutes: 26,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
            isPreview: true,
            description: 'Why pitching prematurely ruins deals and how to ask diagnostic questions that create urgency.',
            order: 1,
            resources: []
          }
        ]
      }
    ],
    certificateEligible: true,
    createdAt: '2026-03-03T10:00:00Z',
    updatedAt: '2026-03-18T16:00:00Z'
  },
  {
    id: 'course-11',
    title: 'Cloud Architecture, Linux & Zero-Trust Cybersecurity',
    slug: 'cloud-architecture-linux-cybersecurity',
    thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    previewVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    format: 'Cohort-Based',
    shortDescription: 'Master Linux server administration, AWS/GCP cloud primitives, firewall hardening, and zero-trust security postures.',
    fullDescription: 'In an era of relentless cyber threats, secure infrastructure is essential. This course covers cloud VPS deployment, DNS configuration, reverse proxies with NGINX, SSH key security, OWASP top 10 vulnerabilities, and implementing zero-trust access control protocols.',
    categoryId: 'cat-10',
    categoryName: 'Cloud Computing, IT & Cybersecurity Awareness',
    level: 'Intermediate',
    language: 'English',
    durationHours: 32,
    price: 0, // Free course
    currency: 'INR',
    isFeatured: true,
    status: 'published',
    instructor: {
      name: 'Rajesh Chawla',
      role: 'Cloud Security Architect',
      agency: 'Belvo Infrastructure',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      bio: 'Cybersecurity consultant and cloud architect securing high-compliance enterprise server infrastructure.'
    },
    learningOutcomes: [
      'Deploy and manage production Linux servers (Ubuntu/Debian) via SSH',
      'Configure NGINX reverse proxies with automated SSL/TLS certificates',
      'Implement zero-trust network firewalls and rate-limiting safeguards',
      'Audit applications for OWASP Top 10 vulnerabilities (SQLi, XSS, CSRF)'
    ],
    prerequisites: ['Basic command line familiarity; willingness to learn Linux commands'],
    modules: [
      {
        id: 'mod-11-1',
        title: 'Module 1: Linux Server Hardening & SSH Security',
        order: 1,
        lessons: [
          {
            id: 'les-11-1-1',
            title: 'Server Provisioning & Key-Based SSH Access',
            durationMinutes: 25,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
            isPreview: true,
            description: 'Disabling root password logins, configuring UFW firewalls, and setting up fail2ban defense.',
            order: 1,
            resources: []
          }
        ]
      }
    ],
    quiz: {
      id: 'quiz-11',
      courseId: 'course-11',
      title: 'Cloud Security & Network Defense Quiz',
      passingScorePercent: 80,
      questions: [
        {
          id: 'q11-1',
          prompt: 'What is the most secure method for authenticating remote administrative SSH sessions to a cloud server?',
          type: 'multiple_choice',
          options: [
            'Using a short 4-digit numeric password',
            'Cryptographic public/private key pairs (e.g. Ed25519) with password authentication disabled',
            'Sending passwords over plaintext HTTP',
            'Leaving the server open with no password'
          ],
          correctOptionIndex: 1,
          explanation: 'Asymmetric key pairs (such as Ed25519) combined with disabling password authentication prevent brute-force dictionary attacks.'
        }
      ]
    },
    certificateEligible: true,
    createdAt: '2026-03-05T08:00:00Z',
    updatedAt: '2026-03-19T11:00:00Z'
  }
];

export const INITIAL_LEARNING_PATHS: LearningPath[] = [
  {
    id: 'path-1',
    title: 'Full-Stack Web Developer Career Track',
    slug: 'full-stack-developer-path',
    shortDescription: 'From zero coding experience to deploying production web applications and modern cloud APIs.',
    targetRole: 'Junior to Mid-Level Full Stack Software Engineer',
    totalDurationHours: 68,
    courseIds: ['course-1', 'course-11'],
    outcomes: [
      'Ship full-stack single-page applications with React & Node.js',
      'Integrate cloud databases and write protected REST APIs',
      'Automate deployment pipelines and background task workers'
    ],
    badgeColor: 'teal'
  },
  {
    id: 'path-2',
    title: 'Digital Marketing & Growth Specialist Track',
    slug: 'digital-marketing-specialist-path',
    shortDescription: 'Master performance ad buying, customer acquisition funnels, and organic search engine dominance.',
    targetRole: 'Performance Marketer / Growth Lead',
    totalDurationHours: 34,
    courseIds: ['course-3', 'course-6'],
    outcomes: [
      'Manage profitable Meta & Google ad campaigns with verifiable ROAS',
      'Write high-converting sales copy and conversion landing pages',
      'Track full-funnel attribution and lifetime customer metrics'
    ],
    badgeColor: 'sky'
  },
  {
    id: 'path-3',
    title: 'AI & Workflow Automation Practitioner Track',
    slug: 'ai-automation-practitioner-path',
    shortDescription: 'Architect automated operations, integrate agentic LLMs, and streamline team workflows.',
    targetRole: 'AI Solutions Architect / Automation Consultant',
    totalDurationHours: 42,
    courseIds: ['course-2', 'course-1'],
    outcomes: [
      'Build end-to-end event-driven automated workflows',
      'Implement structured LLM tool calling in production',
      'Connect CRMs, payments, and notifications automatically'
    ],
    badgeColor: 'emerald'
  },
  {
    id: 'path-4',
    title: 'UI/UX Designer & Systems Architect Track',
    slug: 'ui-ux-design-path',
    shortDescription: 'Design intuitive digital experiences, scalable Figma component systems, and polished user journeys.',
    targetRole: 'Product Designer / UI/UX Specialist',
    totalDurationHours: 38,
    courseIds: ['course-4'],
    outcomes: [
      'Build enterprise-ready Figma design systems with tokens',
      'Conduct user testing and synthesize UX research findings',
      'Deliver frictionless developer handoffs and interactive prototypes'
    ],
    badgeColor: 'indigo'
  },
  {
    id: 'path-5',
    title: 'Data Analytics & Business Intelligence Track',
    slug: 'data-analytics-bi-path',
    shortDescription: 'Transform raw datasets into actionable executive dashboards using spreadsheet modeling and SQL.',
    targetRole: 'Data Analyst / Business Intelligence Specialist',
    totalDurationHours: 36,
    courseIds: ['course-5'],
    outcomes: [
      'Write complex SQL queries, aggregations, and window functions',
      'Model business metrics and cohort retention analyses',
      'Build interactive dashboards for executive decision making'
    ],
    badgeColor: 'cyan'
  },
  {
    id: 'path-6',
    title: 'Creative Media & Video Production Track',
    slug: 'creative-media-video-production-path',
    shortDescription: 'From storyboard and studio capture to Premiere Pro timeline mastering and commercial VFX.',
    targetRole: 'Creative Director / Senior Video Producer',
    totalDurationHours: 48,
    courseIds: ['course-7', 'course-9'],
    outcomes: [
      'Shoot and edit commercial video projects with agency polish',
      'Master keyframing, motion graphics, and audio mastering',
      'Produce high-impact brand campaigns and visual assets'
    ],
    badgeColor: 'purple'
  }
];

export const INITIAL_USERS: User[] = [
  {
    id: 'user-student-1',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    bio: 'Aspiring full-stack engineer and digital creator developing real-world portfolio projects.',
    enrolledCourseIds: ['course-1', 'course-4'],
    createdAt: '2026-02-14T08:30:00Z'
  },
  {
    id: 'user-admin-1',
    name: 'Belvo Platform Administrator',
    email: 'admin@belvo.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    bio: 'Lead Administrator at Hridayam by Belvo. Oversees curricula, student certification, and platform governance.',
    enrolledCourseIds: [],
    createdAt: '2026-01-01T00:00:00Z'
  }
];

export const INITIAL_ENROLMENTS: Enrolment[] = [
  {
    id: 'enrol-1',
    userId: 'user-student-1',
    userName: 'Rahul Sharma',
    userEmail: 'rahul.sharma@example.com',
    courseId: 'course-1',
    courseTitle: 'Full-Stack Web Development with React & Node.js',
    enrolledAt: '2026-02-15T10:00:00Z',
    completedLessonIds: ['les-1-1-1', 'les-1-1-2'],
    progressPercent: 40,
    status: 'active',
    quizAttempts: [
      {
        date: '2026-02-20T14:30:00Z',
        scorePercent: 100,
        passed: true
      }
    ],
    notes: [
      {
        id: 'note-1',
        lessonId: 'les-1-1-1',
        lessonTitle: 'Welcome to Hridayam & Course Orientation',
        timestamp: 180,
        text: 'Key insight: Always use strict TypeScript interfaces before writing UI components to prevent silent property mismatches.',
        createdAt: '2026-02-16T11:20:00Z'
      }
    ]
  },
  {
    id: 'enrol-2',
    userId: 'user-student-1',
    userName: 'Rahul Sharma',
    userEmail: 'rahul.sharma@example.com',
    courseId: 'course-4',
    courseTitle: 'UI/UX Design Systems & Figma Prototyping',
    enrolledAt: '2026-02-18T11:00:00Z',
    completedLessonIds: ['les-4-1-1'],
    progressPercent: 100,
    status: 'completed',
    quizAttempts: [
      {
        date: '2026-02-22T09:15:00Z',
        scorePercent: 100,
        passed: true
      }
    ],
    certificateId: 'HRD-2026-4891',
    completedAt: '2026-02-22T09:20:00Z'
  }
];

export const INITIAL_CERTIFICATES: Certificate[] = [
  {
    id: 'HRD-2026-4891',
    userId: 'user-student-1',
    userName: 'Rahul Sharma',
    courseId: 'course-4',
    courseTitle: 'UI/UX Design Systems & Figma Prototyping',
    categoryName: 'Graphic Design, Branding & UI/UX',
    issueDate: '2026-02-22',
    instructorName: 'Ananya Deshmukh',
    verificationCode: 'VERIFIED-HRD-4891-BELVO-AUTH',
    status: 'valid'
  }
];

export const INITIAL_ANNOUNCEMENT: Announcement = {
  id: 'ann-1',
  message: 'New practical masterclasses for Q2 2026 are now live. Explore industry-certified curricula.',
  linkText: 'Explore Courses',
  linkUrl: '/courses',
  isPublished: true,
  updatedAt: '2026-03-15T08:00:00Z'
};

export const INITIAL_SETTINGS: PlatformSettings = {
  organizationName: 'Hridayam by Belvo',
  brandTagline: 'Practical learning. Real-world skills. Career growth.',
  supportEmail: 'learning@belvo.com',
  supportPhone: '+91 (0) 80 4120 7800',
  officeAddress: 'Belvo Learning Lab, 4th Floor, Tech Hub Center, Bengaluru, Karnataka 560038',
  razorpayKeyId: 'rzp_test_belvo_mock9842',
  razorpayKeySecretConfigured: false,
  razorpaySandboxMode: true,
  resendApiKeyConfigured: false,
  resendSenderDomain: 'mail.hridayam.belvo.com',
  videoDeliveryMode: 'direct'
};

export const INITIAL_NOTIFICATIONS: EmailNotification[] = [
  {
    id: 'notif-1',
    userId: 'user-student-1',
    recipientEmail: 'rahul.sharma@example.com',
    recipientName: 'Rahul Sharma',
    subject: '🎉 Enrolment Confirmed: Full-Stack Web Development with React & Node.js',
    category: 'enrolment',
    previewText: 'Welcome to Hridayam by Belvo! Your access to Full-Stack Web Development is now active.',
    sentAt: '2026-02-15T10:00:00Z',
    isRead: true,
    metadata: {
      courseId: 'course-1',
      courseTitle: 'Full-Stack Web Development with React & Node.js',
      amount: 0,
    }
  },
  {
    id: 'notif-2',
    userId: 'user-student-1',
    recipientEmail: 'rahul.sharma@example.com',
    recipientName: 'Rahul Sharma',
    subject: '💳 Payment Receipt & Tax Invoice: Motion Graphics Masterclass',
    category: 'payment',
    previewText: 'Payment of ₹2,999 received successfully. Transaction ID: pay_rzp_demo_88291.',
    sentAt: '2026-03-01T14:15:00Z',
    isRead: false,
    metadata: {
      courseId: 'course-4',
      courseTitle: 'Motion Graphics, VFX & Video Editing Masterclass',
      amount: 2999,
      paymentId: 'pay_rzp_demo_88291',
      orderId: 'order_belvo_9921'
    }
  },
  {
    id: 'notif-3',
    userId: 'user-student-1',
    recipientEmail: 'rahul.sharma@example.com',
    recipientName: 'Rahul Sharma',
    subject: '📜 Official Belvo Certificate Issued: HRD-2026-4891',
    category: 'certificate',
    previewText: 'Congratulations! Your authenticated credential for UI/UX Design Systems is ready for download.',
    sentAt: '2026-03-10T16:45:00Z',
    isRead: false,
    metadata: {
      courseId: 'course-3',
      courseTitle: 'UI/UX Design Systems, Figma & Interaction Design',
      certificateId: 'HRD-2026-4891',
      verificationCode: 'VERIFIED-HRD-4891-BELVO-AUTH'
    }
  },
  {
    id: 'notif-4',
    userId: 'user-admin-1',
    recipientEmail: 'admin@belvo.com',
    recipientName: 'Belvo Platform Administrator',
    subject: '📊 Platform Activity: New student enrolment completed',
    category: 'system',
    previewText: 'Rahul Sharma has enrolled in Motion Graphics, VFX & Video Editing Masterclass.',
    sentAt: '2026-03-01T14:15:00Z',
    isRead: false,
    metadata: {
      courseId: 'course-4',
      courseTitle: 'Motion Graphics, VFX & Video Editing Masterclass',
      amount: 2999
    }
  }
];

