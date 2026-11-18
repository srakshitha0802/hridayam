import { ITvedantCourse } from './itvedantData';
import { BELVO_CATEGORIES } from '../types';

export const BELVO_MAIN_COURSES: ITvedantCourse[] = [
  {
    id: 'course_digital_marketing_growth',
    slug: 'digital-marketing-social-media',
    title: 'Digital Marketing and Social Media Management',
    shortTitle: 'Digital Marketing & Social Media',
    category: 'Digital Marketing and Social Media Management',
    categoryLabel: 'Marketing & Social Media',
    duration: '6 Months',
    mode: 'Classroom & Online Live',
    level: 'Beginner to Advanced',
    certification: 'Dual Certification (Hridayam by Belvo + Meta & Google Certified)',
    rating: 4.9,
    reviewCount: 1240,
    projectsCount: 28,
    highestPackage: '₹18 LPA',
    avgPackage: '₹6.5 LPA',
    badge: 'High Demand',
    summary: 'Master full-funnel digital acquisition, Meta & Google Ads, viral short-form social strategy, influencer marketing, and ROI optimization with live ad budgets.',
    description: 'Developed directly from Belvo growth marketing playbooks, this program equips students with real-world agency skills. From organic community building to million-dollar performance marketing campaigns, you learn paid social attribution, viral reel production, and automated retention funnels.',
    toolsCovered: ['Meta Ads Manager', 'Google Ads', 'GA4', 'Looker Studio', 'HubSpot', 'SEMrush', 'Canva Pro', 'TikTok/Reels Algo', 'Klaviyo', 'Buffer'],
    keyHighlights: [
      '100% Placement Support with Belvo & 2,000+ Corporate Partners',
      'Real ₹50,000 Practice Ad Budget Provided in Class',
      'Live Case Studies from Top D2C & SaaS Brands',
      'Meta Certified Media Buying Professional Prep',
      'Weekly 1-on-1 Portfolio Reviews with Agency Heads',
    ],
    careerRoles: ['Performance Marketer', 'Social Media Strategist', 'Growth Lead', 'Digital Marketing Manager', 'Media Buyer'],
    eligibility: 'Open to freshers, college graduates, and professionals from any background. No coding required.',
    curriculum: [
      {
        moduleNumber: 1,
        title: 'Brand Strategy, Audience Psychology & Creative Hooks',
        duration: '3 Weeks',
        topics: ['Consumer Psychology', 'Creative Hooks', 'Organic Social Funnels', 'Brand Voice Guidelines'],
        skillsGained: 'Brand positioning, content scheduling, and organic reach optimization.'
      },
      {
        moduleNumber: 2,
        title: 'Meta & Instagram Ads Mastery (Traffic to Purchase)',
        duration: '4 Weeks',
        topics: ['Pixel Setup', 'Lookalike Audiences', 'A/B Creative Testing', 'ROAS Optimization'],
        skillsGained: 'Paid social media buying and dynamic catalogue ad management.'
      },
      {
        moduleNumber: 3,
        title: 'Google Search, Performance Max & YouTube Ads',
        duration: '4 Weeks',
        topics: ['Keyword Match Types', 'Smart Bidding', 'YouTube Video Campaigns', 'GA4 Conversion Tracking'],
        skillsGained: 'High-intent search advertising and full-funnel measurement.'
      },
      {
        moduleNumber: 4,
        title: 'Retention Marketing, Email Automations & Capstone',
        duration: '3 Weeks',
        topics: ['Klaviyo Flows', 'WhatsApp Marketing Automation', 'Attribution Modeling', 'Live Campaign Presentation'],
        skillsGained: 'Customer lifetime value expansion and multi-channel attribution.'
      }
    ],
    capstoneProjects: [
      {
        title: '90-Day D2C Brand Scalability Playbook',
        description: 'Launch real ad campaigns across Meta and Google with a simulated ₹100,000 ad spend and present audited ROAS returns.',
        tools: ['Meta Ads', 'Google Ads', 'Looker Studio', 'GA4']
      },
      {
        title: 'Omnichannel Viral Reel Growth Engine',
        description: 'Design a 30-day viral short-form video sprint generating over 500,000 organic views for an enterprise client.',
        tools: ['CapCut', 'Notion', 'Buffer', 'Instagram Insights']
      }
    ],
    emiStartsAt: '₹3,499/mo',
    fee: 45000,
    originalFee: 65000,
    nextBatch: 'Next Monday'
  },
  {
    id: 'course_fullstack_typescript',
    slug: 'web-app-software-development',
    title: 'Web, App, and Software Development',
    shortTitle: 'Web & Software Engineering',
    category: 'Web, App, and Software Development',
    categoryLabel: 'Software & Mobile Dev',
    duration: '8 Months',
    mode: 'Classroom & Online Live',
    level: 'Beginner to Advanced',
    certification: 'Dual Certification (Hridayam by Belvo + NSDC Skill India)',
    rating: 4.9,
    reviewCount: 2180,
    projectsCount: 36,
    highestPackage: '₹28 LPA',
    avgPackage: '₹8.2 LPA',
    badge: 'Most Popular',
    summary: 'Build high-performance web applications, iOS/Android mobile apps, and scalable cloud microservices using React, Next.js, Node.js, and TypeScript.',
    description: 'Engineered for modern production environments. Learn front-end architecture, state management, REST & GraphQL APIs, relational & NoSQL databases, containerization with Docker, and mobile app deployment with React Native.',
    toolsCovered: ['React 19', 'Next.js 15', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'React Native', 'Docker', 'Git', 'Tailwind CSS'],
    keyHighlights: [
      '100% Placement Assurance with Unlimited Tech Interviews',
      'Deploy 36 Real Production Apps to Vercel and AWS',
      'Daily 4-Hour Hands-on Coding Lab with Senior Engineers',
      'Comprehensive DSA & System Design Interview Preparation',
      'Git Contribution Tracking on Public Portfolios',
    ],
    careerRoles: ['Full Stack Developer', 'Frontend Engineer', 'Backend Engineer', 'React Native Mobile Developer', 'Software Architect'],
    eligibility: 'Graduates, Diploma holders, or career changers. Introductory coding bridge course included.',
    curriculum: [
      {
        moduleNumber: 1,
        title: 'Modern TypeScript, React 19 & Component Architecture',
        duration: '4 Weeks',
        topics: ['TypeScript Types & Generics', 'Hooks & State Machines', 'Tailwind CSS', 'Server Components'],
        skillsGained: 'Production-ready responsive frontend architecture.'
      },
      {
        moduleNumber: 2,
        title: 'Backend Systems, REST/GraphQL & Database Engineering',
        duration: '5 Weeks',
        topics: ['Node.js Event Loop', 'Express.js', 'PostgreSQL Schema Design', 'Prisma ORM', 'JWT Auth'],
        skillsGained: 'Secure, scalable API design and database administration.'
      },
      {
        moduleNumber: 3,
        title: 'Cross-Platform Mobile Apps with React Native',
        duration: '4 Weeks',
        topics: ['Expo', 'Native Device APIs', 'Push Notifications', 'App Store / Play Store Build Pipelines'],
        skillsGained: 'Native iOS and Android mobile app development.'
      },
      {
        moduleNumber: 4,
        title: 'DevOps, Cloud Deployment & Capstone Architecture',
        duration: '3 Weeks',
        topics: ['Docker Containers', 'AWS ECS/S3', 'CI/CD with GitHub Actions', 'Microservices'],
        skillsGained: 'Cloud infrastructure provisioning and continuous deployment.'
      }
    ],
    capstoneProjects: [
      {
        title: 'Multi-Tenant SaaS Collaboration Suite',
        description: 'End-to-end cloud platform with real-time WebSockets, workspace permissions, billing checkout, and analytics.',
        tools: ['Next.js', 'PostgreSQL', 'TypeScript', 'Stripe', 'Docker']
      },
      {
        title: 'Cross-Platform Food Delivery Mobile Application',
        description: 'React Native mobile app with live GPS courier tracking, interactive menus, push notifications, and payment processing.',
        tools: ['React Native', 'Expo', 'Node.js', 'Socket.io', 'Mapbox']
      }
    ],
    emiStartsAt: '₹4,499/mo',
    fee: 58000,
    originalFee: 85000,
    nextBatch: 'This Thursday'
  },
  {
    id: 'course_uiux_brand_systems',
    slug: 'graphic-design-branding-uiux',
    title: 'Graphic Design, Branding, and UI/UX',
    shortTitle: 'Graphic Design & UI/UX',
    category: 'Graphic Design, Branding, and UI/UX',
    categoryLabel: 'UI/UX & Brand Design',
    duration: '6 Months',
    mode: 'Classroom & Online Live',
    level: 'Beginner to Advanced',
    certification: 'Professional Portfolio Accreditation by Belvo Creative Studios',
    rating: 4.8,
    reviewCount: 1650,
    projectsCount: 24,
    highestPackage: '₹22 LPA',
    avgPackage: '₹7.0 LPA',
    badge: 'Top Creative Track',
    summary: 'Design intuitive digital experiences, complete brand identity kits, multi-platform UI design systems in Figma, and human-centric mobile interfaces.',
    description: 'Transform your creative instincts into high-paying design careers. Master typography, color theory, iconography, interactive wireframing, WCAG accessibility, and multi-brand Figma design systems that engineering teams love.',
    toolsCovered: ['Figma', 'Adobe Photoshop', 'Adobe Illustrator', 'Design Tokens', 'Storybook', 'Miro', 'Lottie Animation', 'ProtoPie', 'WCAG 2.2'],
    keyHighlights: [
      'Graduate with 4 Audited Case Studies in Your Figma Portfolio',
      'Direct Mentorship from Belvo Agency Art Directors',
      'Real Client Design Sprints & Live Critique Sessions',
      'Complete Training on Design System Architecture and Variables',
      '100% Placement Guarantee with Global Creative Agencies',
    ],
    careerRoles: ['UI/UX Designer', 'Product Designer', 'Brand Identity Designer', 'Visual Designer', 'Design Systems Specialist'],
    eligibility: 'Anyone with an eye for visual design and digital products. No coding experience needed.',
    curriculum: [
      {
        moduleNumber: 1,
        title: 'Design Foundations, Typography & Visual Branding',
        duration: '3 Weeks',
        topics: ['Grid Systems', 'Color Theory & Harmonization', 'Typography Hierarchies', 'Vector Logo Design'],
        skillsGained: 'Brand guidelines and digital graphic assets.'
      },
      {
        moduleNumber: 2,
        title: 'User Experience Research, Wireframing & Usability',
        duration: '4 Weeks',
        topics: ['User Personas', 'Information Architecture', 'Low-Fi Wireframing', 'User Testing & Heuristics'],
        skillsGained: 'Human-centered problem solving and UX research documentation.'
      },
      {
        moduleNumber: 3,
        title: 'Figma Mastery: Components, Auto-Layout & Variables',
        duration: '4 Weeks',
        topics: ['Auto-Layout 5.0', 'Component Properties', 'Light/Dark Theme Tokens', 'Interactive Prototyping'],
        skillsGained: 'Enterprise design system architecture and rapid UI prototyping.'
      },
      {
        moduleNumber: 4,
        title: 'Micro-Interactions, Developer Handoff & Portfolio',
        duration: '3 Weeks',
        topics: ['ProtoPie Interactions', 'Figma Inspect & Handoff', 'Behance/Dribbble Curation', 'Design Interview Prep'],
        skillsGained: 'Industry-standard presentation and cross-functional team collaboration.'
      }
    ],
    capstoneProjects: [
      {
        title: 'Enterprise FinTech Neobank Mobile Experience',
        description: 'Complete end-to-end banking application with onboarding, biometric authorization, spending analytics, and accessible dark mode.',
        tools: ['Figma', 'Design Tokens', 'ProtoPie', 'FigJam']
      },
      {
        title: 'Luxury Brand Identity & E-Commerce Flagship System',
        description: 'Holistic visual identity, packaging guidelines, 3D product showcase, and responsive web design system.',
        tools: ['Adobe Illustrator', 'Photoshop', 'Figma', 'Miro']
      }
    ],
    emiStartsAt: '₹3,799/mo',
    fee: 48000,
    originalFee: 70000,
    nextBatch: 'Next Wednesday'
  },
  {
    id: 'course_motion_vfx_story',
    slug: 'video-editing-animation-vfx',
    title: 'Video Editing, Animation, and VFX',
    shortTitle: 'Video Editing & VFX Suite',
    category: 'Video Editing, Animation, and VFX',
    categoryLabel: 'Video Editing & VFX',
    duration: '7 Months',
    mode: 'Classroom & Online Live',
    level: 'Beginner to Advanced',
    certification: 'Belvo Motion & Post-Production Guild Certification',
    rating: 4.8,
    reviewCount: 980,
    projectsCount: 22,
    highestPackage: '₹20 LPA',
    avgPackage: '₹6.8 LPA',
    badge: 'Studio Grade',
    summary: 'Master narrative storytelling, timeline pacing, cinematic color grading in DaVinci Resolve, dynamic 2D/3D motion graphics, and Hollywood-level VFX.',
    description: 'Learn the craft of high-end post-production from seasoned editors. Master Premiere Pro, DaVinci Resolve color science, After Effects motion graphics, green screen compositing, sound design, and 3D camera tracking for commercial advertisements, YouTube, and films.',
    toolsCovered: ['DaVinci Resolve Studio', 'Adobe Premiere Pro', 'After Effects', 'Cinema 4D Basics', 'Blender', 'Mocha Pro', 'Audition', 'Topaz Video AI'],
    keyHighlights: [
      'Access to 4K Studio Edit Suites with Dual Monitors & Color Control Surfaces',
      'Build a High-Impact Showreel with Commercial Brands',
      'Master Hollywood Rec.709 & HDR Color Grading Pipelines',
      'Real Client Commercial Dailies & Director Feedback',
      'Placement with Leading Production Houses, Agencies & Studios',
    ],
    careerRoles: ['Video Editor', 'Motion Graphics Artist', 'Colorist', 'VFX Compositor', 'Post-Production Supervisor'],
    eligibility: 'Passionate creators, aspiring filmmakers, and digital artists. No prior technical training required.',
    curriculum: [
      {
        moduleNumber: 1,
        title: 'Cinematic Editing Foundations & Narrative Pacing',
        duration: '4 Weeks',
        topics: ['Timeline Workflows', 'J-Cuts & L-Cuts', 'Story Rhythms', 'B-Roll Integration', 'Dialogue Assembly'],
        skillsGained: 'Professional non-linear video editing workflows.'
      },
      {
        moduleNumber: 2,
        title: 'DaVinci Resolve Color Science & Grading',
        duration: '4 Weeks',
        topics: ['Color Wheels & Curves', 'Scopes & Exposure', 'Skin Tone Isolation', 'Film Emulations & LUTs'],
        skillsGained: 'Broadcast-quality color correction and stylized grading.'
      },
      {
        moduleNumber: 3,
        title: 'After Effects Motion Graphics & Kinetic Typography',
        duration: '4 Weeks',
        topics: ['Shape Layers', 'Speed Graph & Easing', 'Camera Rigs', '3D Titles', 'Logo Reveals'],
        skillsGained: 'High-energy commercial animation and broadcast graphics.'
      },
      {
        moduleNumber: 4,
        title: 'VFX Compositing, Green Screen & 3D Tracking',
        duration: '4 Weeks',
        topics: ['Chroma Keying', 'Planar Tracking with Mocha', 'Rotoscoping', 'Screen Replacements', 'Showreel Assembly'],
        skillsGained: 'Seamless visual effects integration and commercial showreel mastering.'
      }
    ],
    capstoneProjects: [
      {
        title: '60-Second Graded Commercial Film with 3D Compositing',
        description: 'Assemble raw multicam footage into a premium broadcast ad with custom sound design, motion graphics, and node-based color grading.',
        tools: ['DaVinci Resolve', 'After Effects', 'Premiere Pro', 'Mocha']
      },
      {
        title: 'High-Retention YouTube / Reel Motion Graphics Package',
        description: 'Create an engaging brand kit with kinetic titles, animated lower thirds, sound sync, and 3D visual metaphors.',
        tools: ['After Effects', 'Cinema 4D', 'Audition']
      }
    ],
    emiStartsAt: '₹3,999/mo',
    fee: 52000,
    originalFee: 75000,
    nextBatch: 'Every Monday'
  },
  {
    id: 'course_ai_automation_workflows',
    slug: 'ai-machine-learning-automation',
    title: 'Artificial Intelligence, Machine Learning, and Automation',
    shortTitle: 'AI, ML & Autonomous Workflows',
    category: 'Artificial Intelligence, Machine Learning, and Automation',
    categoryLabel: 'AI & Automation',
    duration: '8 Months',
    mode: 'Classroom & Online Live',
    level: 'Beginner to Advanced',
    certification: 'Dual Certification (Hridayam by Belvo + Google Cloud & NSDC)',
    rating: 4.9,
    reviewCount: 2450,
    projectsCount: 38,
    highestPackage: '₹32 LPA',
    avgPackage: '₹9.4 LPA',
    badge: 'Industry Flagship #1',
    summary: 'Build production Generative AI apps, autonomous multi-agent pipelines, fine-tuned LLMs, computer vision models, and enterprise workflow automations.',
    description: 'The definitive program for the AI era. Move beyond simple prompt engineering to build scalable AI agents, Retrieval-Augmented Generation (RAG) architectures with vector databases, fine-tuned open-source models, and self-healing business automations using Python and Gemini.',
    toolsCovered: ['Python', 'Gemini API', 'LangChain', 'LlamaIndex', 'PyTorch', 'Vector DBs (Pinecone, Chroma)', 'Hugging Face', 'n8n', 'FastAPI', 'Docker'],
    keyHighlights: [
      'Guaranteed Placement with Top AI Labs, FinTech & Fortune 500s',
      'Free Cloud GPU Compute for Fine-Tuning Open Source LLMs',
      'Deploy 10+ Autonomous Multi-Agent Systems to Production',
      'Direct Mentorship from Lead AI Researchers at Belvo Labs',
      'Master RAG, Vector Search, and Grounded Decision Workflows',
    ],
    careerRoles: ['AI Engineer', 'Machine Learning Engineer', 'Generative AI Specialist', 'Automation Architect', 'LLM Developer'],
    eligibility: 'Graduates from Engineering, Science, Commerce or IT. Bridge course in math and Python included.',
    curriculum: [
      {
        moduleNumber: 1,
        title: 'Advanced Python, Math for ML & Vector Calculus',
        duration: '4 Weeks',
        topics: ['NumPy & Matrix Operations', 'Linear Algebra & Probability', 'Pandas for Big Data', 'Object-Oriented AI Pipelines'],
        skillsGained: 'Mathematical foundations and high-performance data processing.'
      },
      {
        moduleNumber: 2,
        title: 'Machine Learning Algorithms & Deep Learning (PyTorch)',
        duration: '4 Weeks',
        topics: ['Supervised & Unsupervised Learning', 'Neural Networks', 'Backpropagation', 'CNNs & Vision Transformers'],
        skillsGained: 'Predictive modeling and computer vision architecture.'
      },
      {
        moduleNumber: 3,
        title: 'Generative AI, Large Language Models & Vector RAG',
        duration: '5 Weeks',
        topics: ['Transformer Architecture', 'Gemini API & Function Calling', 'LangChain & LlamaIndex', 'Hybrid Vector Search'],
        skillsGained: 'Enterprise RAG systems and context-aware conversational agents.'
      },
      {
        moduleNumber: 4,
        title: 'Autonomous Multi-Agent Systems & Enterprise Workflows',
        duration: '3 Weeks',
        topics: ['CrewAI & AutoGen', 'n8n Workflow Automation', 'Model Evals & Guardrails', 'FastAPI Microservice Deployment'],
        skillsGained: 'Autonomous agent orchestration and production AI DevOps.'
      }
    ],
    capstoneProjects: [
      {
        title: 'Autonomous Customer Service & ERP Multi-Agent Squad',
        description: 'Deploy 4 collaborating AI agents that read customer emails, query inventory databases, generate invoices, and handle refunds.',
        tools: ['Gemini API', 'LangChain', 'FastAPI', 'Pinecone', 'n8n']
      },
      {
        title: 'Private Enterprise Document RAG with Security Guardrails',
        description: 'Index 10,000 internal corporate PDF contracts with semantic citation, vector chunking, and privacy redaction.',
        tools: ['PyTorch', 'Hugging Face', 'ChromaDB', 'Docker']
      }
    ],
    emiStartsAt: '₹4,999/mo',
    fee: 62000,
    originalFee: 92000,
    nextBatch: 'This Friday'
  },
  {
    id: 'course_ecommerce_scale',
    slug: 'ecommerce-online-business',
    title: 'E-commerce and Online Business',
    shortTitle: 'E-commerce & Digital Commerce',
    category: 'E-commerce and Online Business',
    categoryLabel: 'E-commerce & D2C',
    duration: '5 Months',
    mode: 'Classroom & Online Live',
    level: 'Beginner to Advanced',
    certification: 'E-Commerce Growth Master Certification by Belvo Commerce',
    rating: 4.8,
    reviewCount: 1120,
    projectsCount: 20,
    highestPackage: '₹19 LPA',
    avgPackage: '₹7.1 LPA',
    badge: 'Entrepreneur Focus',
    summary: 'Launch, scale, and automate high-margin e-commerce stores on Shopify, Amazon, and quick-commerce channels with proven CRO and logistics playbooks.',
    description: 'Whether you want to lead e-commerce for global brands or build your own direct-to-consumer empire, this course covers supplier sourcing, Shopify store design, product listing optimization, margin math, and retention flows.',
    toolsCovered: ['Shopify Plus', 'Amazon Seller Central', 'Klaviyo', 'Google Merchant Center', 'Triple Whale', 'Hotjar', 'Canva', 'Shiprocket', 'Meta Ads'],
    keyHighlights: [
      'Build and Launch a Live Shopify Store in Week 2',
      'Learn Direct Sourcing from Indian Manufacturers & Global Suppliers',
      'Master Amazon Buy-Box Algorithms and Sponsored Ads',
      'Automated Order Tracking, RTO Reduction & COD Management',
      '100% Placement with Leading Brands & D2C Accelerators',
    ],
    careerRoles: ['E-Commerce Manager', 'Shopify Growth Specialist', 'Amazon Marketplace Strategist', 'D2C Brand Lead', 'Founder / Store Owner'],
    eligibility: 'Open to freshers, marketers, and entrepreneurs. Zero coding background required.',
    curriculum: [
      {
        moduleNumber: 1,
        title: 'Niche Selection, Supplier Sourcing & Margin Modeling',
        duration: '3 Weeks',
        topics: ['Product Validation', 'COGS & Profit Margins', 'Supplier Negotiation', 'Packaging & Compliance'],
        skillsGained: 'Financial modeling and high-margin product selection.'
      },
      {
        moduleNumber: 2,
        title: 'Shopify Store Architecture & High-Converting UX',
        duration: '4 Weeks',
        topics: ['Shopify Theme Customization', 'Frictionless Checkout', 'Upsell & Cross-sell Apps', 'Mobile Optimization'],
        skillsGained: 'Building world-class conversion-optimized online storefronts.'
      },
      {
        moduleNumber: 3,
        title: 'Amazon Marketplace Domination & Multi-Channel Sync',
        duration: '3 Weeks',
        topics: ['A+ Content & SEO', 'FBA Logistics', 'Amazon PPC Campaigns', 'Blinkit/Zepto Quick-Commerce'],
        skillsGained: 'Multi-channel marketplace sales and automated fulfillment.'
      },
      {
        moduleNumber: 4,
        title: 'Retention Email Flows, RTO Reduction & Scale',
        duration: '3 Weeks',
        topics: ['Klaviyo Post-Purchase Flows', 'NDR & RTO Recovery', 'Unit Economics at Scale', 'Investor Pitch Deck'],
        skillsGained: 'Scaling direct-to-consumer revenues while safeguarding profits.'
      }
    ],
    capstoneProjects: [
      {
        title: 'Turnkey D2C Brand Launch from Zero to First 100 Orders',
        description: 'Source a trending product, build the Shopify storefront, configure automated logistics, and acquire the first 100 real customers.',
        tools: ['Shopify', 'Shiprocket', 'Klaviyo', 'Meta Ads']
      },
      {
        title: 'Amazon Marketplace Scaling & PPC Optimization Audit',
        description: 'Optimize product listings, keyword indexation, A+ brand story, and launch automated PPC campaigns with target ACOS under 20%.',
        tools: ['Amazon Seller Central', 'Helium 10', 'Excel']
      }
    ],
    emiStartsAt: '₹3,299/mo',
    fee: 42000,
    originalFee: 60000,
    nextBatch: 'Next Tuesday'
  },
  {
    id: 'course_photography_content',
    slug: 'photography-content-creation',
    title: 'Photography and Content Creation',
    shortTitle: 'Commercial Photography & Content',
    category: 'Photography and Content Creation',
    categoryLabel: 'Photography & Content',
    duration: '5 Months',
    mode: 'Classroom (Studio Practice)',
    level: 'Beginner to Advanced',
    certification: 'Professional Visual Creator Certification by Belvo Studios',
    rating: 4.8,
    reviewCount: 890,
    projectsCount: 20,
    highestPackage: '₹16 LPA',
    avgPackage: '₹6.2 LPA',
    badge: 'Hands-on Studio',
    summary: 'Master commercial studio lighting, product photography, editorial portraits, color grading in Lightroom, and viral vertical video production.',
    description: 'Transform camera enthusiasm into professional commercial production. Learn in professional studio bays with continuous lighting, strobes, motorized sliders, and camera rigs. Cover commercial product shoots, food styling, fashion editorials, and social media reels.',
    toolsCovered: ['Sony Alpha / Cinema Line', 'Adobe Lightroom Classic', 'Capture One', 'Godox Studio Strobe Lighting', 'Photoshop Retouching', 'CapCut Pro', 'Gimbals'],
    keyHighlights: [
      'Unlimited Access to Belvo Commercial Photography Studios',
      'Work with Professional Models, Props, and Commercial Products',
      'Taught by Active Fashion & Commercial Campaign Photographers',
      'Curate an Agency-Ready Digital Portfolio & Pitch Deck',
      'Placements with Media Houses, Ad Agencies & E-Commerce Studios',
    ],
    careerRoles: ['Commercial Photographer', 'Content Creator', 'Product Photographer', 'Creative Director', 'Studio Lighting Technician'],
    eligibility: 'Anyone with an eye for photography and visual content. Studio cameras and lighting provided.',
    curriculum: [
      {
        moduleNumber: 1,
        title: 'Camera Mechanics, Exposure Triangle & Composition',
        duration: '3 Weeks',
        topics: ['Shutter, Aperture & ISO', 'Lens Focal Lengths', 'Rule of Thirds & Leading Lines', 'Color Balance'],
        skillsGained: 'Manual camera control and intentional visual storytelling.'
      },
      {
        moduleNumber: 2,
        title: 'Studio Lighting: Continuous, Strobes & Modifiers',
        duration: '4 Weeks',
        topics: ['1-Light, 2-Light & 3-Light Setups', 'Softboxes vs Hard Light', 'High-Key & Low-Key Lighting', 'Rim Lights'],
        skillsGained: 'Mastery of commercial studio light shaping and mood creation.'
      },
      {
        moduleNumber: 3,
        title: 'Commercial Product, Food & Fashion Editorial Shoots',
        duration: '4 Weeks',
        topics: ['Bottle & Glass Reflections', 'Food Styling & Props', 'Directing Models', 'Lookbook Shooting'],
        skillsGained: 'Professional commercial staging and multi-angle shooting.'
      },
      {
        moduleNumber: 4,
        title: 'Lightroom Color Science, Retouching & Vertical Content',
        duration: '3 Weeks',
        topics: ['Frequency Separation Retouching', 'Color Grading Profiles', 'Reels / Shorts Scripting & Pacing', 'Client Delivery'],
        skillsGained: 'High-end post-production retouching and rapid short-form video creation.'
      }
    ],
    capstoneProjects: [
      {
        title: 'Commercial E-Commerce Product Campaign Portfolio',
        description: 'Photograph a complete 12-item luxury cosmetic line with hero shots, texture close-ups, styled laydowns, and retouching.',
        tools: ['Sony Alpha', 'Capture One', 'Photoshop', 'Lightroom']
      },
      {
        title: '30-Day High-Engagement Short-Form Video Campaign',
        description: 'Script, shoot, light, and edit 15 viral vertical videos for an apparel brand, achieving broadcast-quality cinematography.',
        tools: ['Gimbal', 'Wireless Mics', 'CapCut Pro', 'Lightroom']
      }
    ],
    emiStartsAt: '₹3,499/mo',
    fee: 44000,
    originalFee: 62000,
    nextBatch: 'Every Saturday'
  },
  {
    id: 'course_b2b_sales_ventures',
    slug: 'business-development-sales-entrepreneurship',
    title: 'Business Development, Sales, and Entrepreneurship',
    shortTitle: 'B2B Sales & Venture Growth',
    category: 'Business Development, Sales, and Entrepreneurship',
    categoryLabel: 'Sales & Entrepreneurship',
    duration: '6 Months',
    mode: 'Classroom & Online Live',
    level: 'Beginner to Advanced',
    certification: 'Executive Business Leadership Certification by Belvo Ventures',
    rating: 4.9,
    reviewCount: 1380,
    projectsCount: 25,
    highestPackage: '₹24 LPA',
    avgPackage: '₹7.8 LPA',
    badge: 'High Earning Potential',
    summary: 'Master enterprise B2B sales pipelines, outbound prospecting, negotiation frameworks, fundraising pitch decks, and startup operational scaling.',
    description: 'Learn the exact frameworks used by top venture-backed companies to close six-figure enterprise deals. From cold outreach psychology to multi-stakeholder contract negotiations and VC pitch decks, this course develops elite business leaders.',
    toolsCovered: ['Salesforce', 'Apollo.io', 'LinkedIn Sales Navigator', 'HubSpot CRM', 'Notion', 'Excel Financial Modeling', 'DocuSign', 'Pitch.com'],
    keyHighlights: [
      'Practice Real Cold Calls & Live Enterprise Pitch Simulations',
      'Build a Working Financial Model & 15-Slide Investor Pitch Deck',
      'Master MEDDICC & Solution-Selling Methodologies',
      '1-on-1 Pitch Coaching with Venture Capital Partners & Founders',
      '100% Placement with High-Growth SaaS Startups & Global Consultancies',
    ],
    careerRoles: ['Business Development Manager', 'Enterprise Account Executive', 'Sales Lead', 'Growth Director', 'Startup Co-Founder'],
    eligibility: 'Graduates with strong communication skills and ambition for leadership and sales roles.',
    curriculum: [
      {
        moduleNumber: 1,
        title: 'Prospecting, Cold Outreach & Lead Qualification',
        duration: '3 Weeks',
        topics: ['Ideal Customer Profile (ICP)', 'Cold Email Copywriting', 'LinkedIn Social Selling', 'Apollo.io Data Extraction'],
        skillsGained: 'Building predictable outbound lead generation pipelines.'
      },
      {
        moduleNumber: 2,
        title: 'Discovery Calls & MEDDICC Deal Qualification',
        duration: '4 Weeks',
        topics: ['Active Listening & Pain Identification', 'Economic Buyer Identification', 'Decision Criteria', 'Objection Handling'],
        skillsGained: 'Uncovering enterprise pain points and building urgency.'
      },
      {
        moduleNumber: 3,
        title: 'Proposal Design, Commercial Negotiation & Closing',
        duration: '4 Weeks',
        topics: ['Value-Based Pricing', 'Master Service Agreements (MSA)', 'Procurement Negotiation', 'Closing Tactics'],
        skillsGained: 'Protecting deal margins and accelerating contract execution.'
      },
      {
        moduleNumber: 4,
        title: 'Venture Capital Fundraising & Financial Modeling',
        duration: '3 Weeks',
        topics: ['Cap Tables & Equity Dilution', '3-Statement Financial Models', 'The 10-Slide Pitch Deck', 'Live Demo Day'],
        skillsGained: 'Fundraising readiness and boardroom presentation.'
      }
    ],
    capstoneProjects: [
      {
        title: 'Complete Enterprise B2B SaaS Sales Engine',
        description: 'Prospect 500 decision-makers, execute automated cold sequences, run live recorded discovery calls, and present a signed proposal.',
        tools: ['Apollo.io', 'Salesforce', 'LinkedIn Sales Navigator', 'Notion']
      },
      {
        title: 'Seed-Stage Venture Business Plan & Pitch Deck',
        description: 'Build the financial model, unit economics, market sizing (TAM/SAM/SOM), and pitch live before our investor panel.',
        tools: ['Excel', 'Pitch.com', 'Notion']
      }
    ],
    emiStartsAt: '₹3,699/mo',
    fee: 46000,
    originalFee: 66000,
    nextBatch: 'Next Monday'
  },
  {
    id: 'course_seo_copywriting',
    slug: 'copywriting-seo-content-marketing',
    title: 'Copywriting, SEO, and Content Marketing',
    shortTitle: 'Copywriting & Search Marketing',
    category: 'Copywriting, SEO, and Content Marketing',
    categoryLabel: 'Copywriting & Content SEO',
    duration: '5 Months',
    mode: 'Classroom & Online Live',
    level: 'Beginner to Advanced',
    certification: 'Dual Certification (Hridayam by Belvo + Content Marketing Institute)',
    rating: 4.8,
    reviewCount: 1490,
    projectsCount: 22,
    highestPackage: '₹17 LPA',
    avgPackage: '₹6.4 LPA',
    badge: 'Creative & Technical',
    summary: 'Write high-converting sales letters, landing pages, and email sequences while dominating search engines with programmatic and technical SEO.',
    description: 'Words that convert, paired with rankings that compound. Master direct-response copywriting psychology, SEO keyword clusters, programmatic content architecture, AI-assisted research, and authority backlink acquisition.',
    toolsCovered: ['Ahrefs', 'Semrush', 'Google Search Console', 'SurferSEO', 'WordPress', 'Jasper AI / Claude', 'Hemingway', 'Clearscope', 'Substack'],
    keyHighlights: [
      'Rank Live Articles on Page 1 of Google During the Course',
      'Build a Published Portfolio of 15 High-Converting Marketing Assets',
      'Master the PAS, AIDA, and StoryBrand Copywriting Frameworks',
      'Learn Generative AI Workflows for 10x Content Velocity',
      '100% Placement with Global Tech Companies and Digital Publications',
    ],
    careerRoles: ['Direct-Response Copywriter', 'SEO Specialist', 'Content Strategist', 'Technical Writer', 'Inbound Marketing Manager'],
    eligibility: 'Anyone who loves writing and wants to monetize words. No coding needed.',
    curriculum: [
      {
        moduleNumber: 1,
        title: 'Direct-Response Copywriting Psychology & Formulas',
        duration: '3 Weeks',
        topics: ['AIDA & PAS Frameworks', 'Headline Writing', 'Emotional Triggers', 'Call-to-Action Crafting'],
        skillsGained: 'Writing high-converting landing pages, ads, and product descriptions.'
      },
      {
        moduleNumber: 2,
        title: 'Keyword Strategy, Search Intent & Technical SEO',
        duration: '4 Weeks',
        topics: ['Keyword Difficulty & Search Intent', 'Topic Clustering', 'On-Page Optimization', 'Core Web Vitals & Indexing'],
        skillsGained: 'Dominating search engine results pages with organic rankings.'
      },
      {
        moduleNumber: 3,
        title: 'Content Funnels, Email Sequences & Newsletters',
        duration: '4 Weeks',
        topics: ['Welcome Email Drip Campaigns', 'Sales Launch Sequences', 'Substack Newsletter Monetization', 'Lead Magnets'],
        skillsGained: 'Building long-term audience trust and email revenue engines.'
      },
      {
        moduleNumber: 4,
        title: 'AI-Assisted Content Velocity, Link Building & Capstone',
        duration: '3 Weeks',
        topics: ['Claude & ChatGPT Workflows', 'Digital PR & Guest Posting', 'Content Audits', 'Portfolio Showcase'],
        skillsGained: 'High-velocity content scaling and authoritative brand building.'
      }
    ],
    capstoneProjects: [
      {
        title: 'Page 1 Organic Search Domination Sprint',
        description: 'Conduct keyword gap analysis, write a 3,000-word comprehensive guide, build internal links, and secure page-1 rankings.',
        tools: ['Ahrefs', 'SurferSEO', 'WordPress', 'Google Search Console']
      },
      {
        title: 'High-Ticket B2B Sales Funnel & 7-Day Email Sequence',
        description: 'Write the complete landing page, video sales letter (VSL) script, and 7-part automated nurture sequence for an enterprise offer.',
        tools: ['Substack', 'Figma', 'Grammarly', 'Google Docs']
      }
    ],
    emiStartsAt: '₹3,199/mo',
    fee: 40000,
    originalFee: 58000,
    nextBatch: 'This Tuesday'
  },
  {
    id: 'course_cloud_cybersecurity',
    slug: 'cloud-computing-cybersecurity',
    title: 'Cloud Computing, IT, and Cybersecurity Awareness',
    shortTitle: 'Cloud & Cybersecurity Defense',
    category: 'Cloud Computing, IT, and Cybersecurity Awareness',
    categoryLabel: 'Cloud & Cyber Defense',
    duration: '7 Months',
    mode: 'Classroom & Online Live',
    level: 'Beginner to Advanced',
    certification: 'Dual Certification (Hridayam by Belvo + AWS & CompTIA Security+ Prep)',
    rating: 4.9,
    reviewCount: 1870,
    projectsCount: 30,
    highestPackage: '₹26 LPA',
    avgPackage: '₹8.0 LPA',
    badge: 'High Security Track',
    summary: 'Architect secure AWS cloud systems, automate multi-region infrastructure with Terraform, and defend against modern cyber threats with ethical hacking labs.',
    description: 'Protect modern enterprise systems from downtime and security breaches. Learn AWS and Azure cloud deployment, Linux administration, Docker microservices, zero-trust network design, penetration testing tools, and SOC monitoring.',
    toolsCovered: ['AWS Cloud', 'Microsoft Azure', 'Terraform', 'Linux Bash', 'Docker', 'Wireshark', 'Burp Suite', 'Nmap', 'Metasploit', 'Splunk SIEM'],
    keyHighlights: [
      'Access to Sandboxed Hands-on Ethical Hacking & Cloud Labs',
      'Prepare for AWS Certified Solutions Architect & CompTIA Security+',
      'Simulate Real Cyber Attacks and Incident Response Protocols',
      'Master Infrastructure as Code (IaC) with Terraform & GitOps',
      '100% Placement with Global IT Giants, Banks & Cybersecurity Firms',
    ],
    careerRoles: ['Cloud Solutions Architect', 'Cybersecurity Analyst', 'DevOps & Security Engineer', 'SOC Analyst', 'Network Administrator'],
    eligibility: 'Graduates from Engineering, Science, BCA/MCA, or working IT professionals.',
    curriculum: [
      {
        moduleNumber: 1,
        title: 'Linux Systems Administration & Computer Networking',
        duration: '4 Weeks',
        topics: ['Linux CLI & Permissions', 'TCP/IP, DNS & Subnetting', 'Firewalls & SSH', 'Bash Scripting Automations'],
        skillsGained: 'System administration and fundamental network security.'
      },
      {
        moduleNumber: 2,
        title: 'AWS Cloud Architecture & Infrastructure as Code',
        duration: '4 Weeks',
        topics: ['EC2, VPC, S3 & RDS', 'IAM Security Policies', 'Terraform Automations', 'High Availability & Auto-scaling'],
        skillsGained: 'Enterprise cloud provisioning and automated infrastructure.'
      },
      {
        moduleNumber: 3,
        title: 'Ethical Hacking, Penetration Testing & Vulnerability Labs',
        duration: '4 Weeks',
        topics: ['OWASP Top 10 Web Exploits', 'Burp Suite & Nmap Scanning', 'SQL Injection & XSS Defense', 'Kali Linux Labs'],
        skillsGained: 'Security vulnerability assessment and penetration testing.'
      },
      {
        moduleNumber: 4,
        title: 'SOC Monitoring, SIEM (Splunk) & Incident Response',
        duration: '3 Weeks',
        topics: ['Log Ingestion in Splunk', 'Threat Detection Rules', 'Zero-Trust Architecture', 'Incident Forensics'],
        skillsGained: 'Enterprise threat hunting and defense monitoring.'
      }
    ],
    capstoneProjects: [
      {
        title: 'Multi-Region Highly Available Cloud Infrastructure',
        description: 'Deploy an automated, fault-tolerant e-commerce backend across multiple AWS availability zones using Terraform with zero downtime.',
        tools: ['AWS', 'Terraform', 'Docker', 'GitHub Actions']
      },
      {
        title: 'Enterprise Vulnerability Assessment & SOC Dashboard',
        description: 'Execute authorized penetration tests against simulated banking targets, patch identified CVEs, and configure Splunk threat alerts.',
        tools: ['Kali Linux', 'Burp Suite', 'Splunk', 'Wireshark']
      }
    ],
    emiStartsAt: '₹4,299/mo',
    fee: 55000,
    originalFee: 80000,
    nextBatch: 'This Saturday'
  },
  {
    id: 'course_data_analytics_bi',
    slug: 'data-analytics-business-intelligence',
    title: 'Data Analytics and Business Intelligence',
    shortTitle: 'Data Analytics & Business Intelligence',
    category: 'Data Analytics and Business Intelligence',
    categoryLabel: 'Data Analytics & BI',
    duration: '7 Months',
    mode: 'Classroom & Online Live',
    level: 'Beginner to Advanced',
    certification: 'Dual Certification (Hridayam by Belvo + NSDC Skill India)',
    rating: 4.9,
    reviewCount: 2310,
    projectsCount: 34,
    highestPackage: '₹25 LPA',
    avgPackage: '₹7.6 LPA',
    badge: 'Top Placement Record',
    summary: 'Transform raw enterprise databases into automated Power BI and Tableau dashboards, advanced SQL queries, Python analytics, and executive business insights.',
    description: 'Data is the lifeblood of modern enterprise. Learn how to extract, clean, model, and visualize data from relational databases, cloud warehouses like Snowflake, and big datasets. Master DAX, predictive analytics, and executive board presentations.',
    toolsCovered: ['SQL (PostgreSQL, MySQL)', 'Power BI', 'Tableau Desktop', 'Python (Pandas, NumPy, Seaborn)', 'Advanced Excel', 'Snowflake', 'dbt', 'Git'],
    keyHighlights: [
      '100% Placement Support with Over 2,000+ Hiring Partners',
      'Dual Certification from Hridayam by Belvo & NSDC (Govt of India)',
      '34+ Real-World Datasets from Banking, Healthcare & E-Commerce',
      'Daily Practical Lab Sessions with Senior Business Intelligence Leads',
      '10+ Mock Technical Interviews Covering Advanced SQL & DAX',
    ],
    careerRoles: ['Data Analyst', 'Business Intelligence Analyst', 'Power BI Developer', 'Tableau Specialist', 'Product Data Analyst'],
    eligibility: 'Any graduate (B.E, B.Tech, B.Com, B.Sc, BCA, BBA, BA). No prior programming knowledge required.',
    curriculum: [
      {
        moduleNumber: 1,
        title: 'Advanced Excel & Business Statistics Foundations',
        duration: '3 Weeks',
        topics: ['XLOOKUP, INDEX-MATCH', 'Pivot Tables & Power Query', 'Descriptive & Inferential Statistics', 'Hypothesis Testing'],
        skillsGained: 'Statistical reasoning and rapid financial data modeling.'
      },
      {
        moduleNumber: 2,
        title: 'Enterprise SQL: Complex Queries, Joins & Window Functions',
        duration: '4 Weeks',
        topics: ['Aggregations & GROUP BY', 'Multi-Table JOINs', 'Window Functions (RANK, LEAD, LAG)', 'Subqueries & CTEs'],
        skillsGained: 'Advanced relational database querying and data wrangling.'
      },
      {
        moduleNumber: 3,
        title: 'Power BI & Tableau: Data Modeling, DAX & Storytelling',
        duration: '5 Weeks',
        topics: ['Star Schema Modeling', 'DAX Measures & Time Intelligence', 'Tableau Visual Calculations', 'Executive KPI Design'],
        skillsGained: 'Interactive business intelligence dashboard engineering.'
      },
      {
        moduleNumber: 4,
        title: 'Python for Analytics, Cloud Warehousing & Capstone',
        duration: '3 Weeks',
        topics: ['Pandas & NumPy Cleaning', 'Exploratory Data Analysis (EDA)', 'Snowflake Warehousing', 'Live Board Presentation'],
        skillsGained: 'Automated data pipelines and strategic business communication.'
      }
    ],
    capstoneProjects: [
      {
        title: '360° Omnichannel Retail Financial & Sales BI Cockpit',
        description: 'Build an executive dashboard connecting SQL sales data, customer churn trends, and inventory forecasting in Power BI.',
        tools: ['Power BI', 'SQL', 'DAX', 'Excel']
      },
      {
        title: 'Healthcare Patient Recovery Analytics & Risk Scoring',
        description: 'Clean 200,000 anonymized hospital admission records in Python, build predictive risk models, and visualize survival cohorts.',
        tools: ['Python', 'Tableau', 'Pandas', 'Seaborn']
      }
    ],
    emiStartsAt: '₹4,199/mo',
    fee: 54000,
    originalFee: 78000,
    nextBatch: 'Every Monday'
  },
  {
    id: 'course_interior_design',
    slug: 'interior-design-spatial-architecture',
    title: 'Interior Design and Spatial Architecture',
    shortTitle: 'Interior & Spatial Design',
    category: 'Interior Design and Spatial Architecture',
    categoryLabel: 'Interior & Architecture',
    duration: '6 Months',
    mode: 'Classroom & Studio Labs',
    level: 'Beginner to Advanced',
    certification: 'Dual Certification (Hridayam by Belvo + Autodesk & NSDC Partner)',
    rating: 4.9,
    reviewCount: 920,
    projectsCount: 24,
    highestPackage: '₹16 LPA',
    avgPackage: '₹6.8 LPA',
    badge: 'Studio Practical',
    summary: 'Master residential & commercial interior planning, 3D photorealistic rendering, AutoCAD technical drafting, SketchUp modeling, V-Ray lighting, and material sourcing with physical studio visits.',
    description: 'Learn from practicing interior architects and spatial designers. From concept mood boards and anthropometric space planning to full photorealistic 3D architectural walk-throughs, you will design luxury residential villas, co-working studios, and retail boutiques.',
    toolsCovered: ['AutoCAD', 'SketchUp Pro', '3ds Max', 'V-Ray', 'Revit Architecture', 'Photoshop', 'Lumion', 'Enscape'],
    keyHighlights: [
      '100% Placement Assurance with Top Architectural & Interior Design Firms',
      'Hands-on Material Library & Site Visits in Mumbai and Pune',
      'Autodesk Certified Professional Curriculum Integration',
      'Live Commercial & Residential Client Briefs',
      'Portfolio Mentorship by Senior Interior Architects'
    ],
    careerRoles: ['Interior Designer', '3D Visualizer & Spatial Artist', 'BIM Interior Drafter', 'Residential Stylist', 'Commercial Space Planner'],
    eligibility: 'Open to freshers, civil/architectural diploma holders, and creative enthusiasts. No prior drafting knowledge needed.',
    curriculum: [
      {
        moduleNumber: 1,
        title: 'Design Fundamentals, Anthropometrics & Space Planning',
        duration: '4 Weeks',
        topics: ['History of Spatial Styles', 'Ergonomics & Circulation', 'Color Psychology', 'Concept Mood Boards & Material Boards'],
        skillsGained: 'Spatial organization, client brief synthesis, and layout planning.'
      },
      {
        moduleNumber: 2,
        title: 'Technical Drafting with AutoCAD (2D Floor Plans & Elevations)',
        duration: '5 Weeks',
        topics: ['Architectural Symbols', 'Dimensioning Standards', 'Electrical & Plumbing Layouts', 'Custom Joinery Details'],
        skillsGained: 'Working drawings and construction documentation.'
      },
      {
        moduleNumber: 3,
        title: '3D Spatial Modeling & Photorealistic V-Ray Rendering',
        duration: '6 Weeks',
        topics: ['SketchUp Pro Modeling', '3ds Max Polygonal Modeling', 'V-Ray & Lumion Global Illumination', 'PBR Realistic Textures'],
        skillsGained: 'Cinema-grade interior rendering and architectural camera staging.'
      },
      {
        moduleNumber: 4,
        title: 'BIM with Revit, BOQ Estimation & Professional Portfolio',
        duration: '5 Weeks',
        topics: ['Revit Interior Components', 'Bill of Quantities (BOQ)', 'Vendor Negotiation', 'Final Portfolio Presentation'],
        skillsGained: 'Cost estimation, project site management, and placement readiness.'
      }
    ],
    capstoneProjects: [
      {
        title: 'Luxury 3BHK Penthouse Turnkey Interior Project',
        description: 'Complete interior design package with CAD execution drawings, V-Ray renders, material specifications, and ₹45 Lakh BOQ estimate.',
        tools: ['AutoCAD', 'SketchUp', 'V-Ray', 'Photoshop']
      },
      {
        title: 'Flagship Sustainable Coffee Bar & Co-Working Hub',
        description: 'Commercial interior scheme with acoustic zoning, ergonomic seating layouts, ambient architectural lighting, and VR walkthrough.',
        tools: ['3ds Max', 'Lumion', 'AutoCAD', 'Revit']
      }
    ],
    emiStartsAt: '₹4,499/mo',
    fee: 58000,
    originalFee: 82000,
    nextBatch: 'Starting this Monday'
  },
  {
    id: 'course_product_marketing_management',
    slug: 'product-marketing-management',
    title: 'Product Marketing Management (PMM)',
    shortTitle: 'Product Marketing (PMM)',
    category: 'Product Marketing Management',
    categoryLabel: 'Product & GTM Strategy',
    duration: '5 Months',
    mode: 'Classroom & Online Live',
    level: 'Intermediate to Advanced',
    certification: 'Executive Dual Certification (Hridayam by Belvo + Product Marketing Alliance Certified)',
    rating: 4.9,
    reviewCount: 780,
    projectsCount: 22,
    highestPackage: '₹24 LPA',
    avgPackage: '₹9.5 LPA',
    badge: 'Executive Leadership',
    summary: 'Lead Go-To-Market (GTM) launches, customer persona research, competitive battlecards, product pricing matrices, feature positioning, and cross-functional product-led growth (PLG).',
    description: 'Product Marketing Managers are the bridge between product engineering, sales teams, and customers. Co-designed with senior PMMs from high-growth tech unicorns, this program teaches positioning frameworks, user telemetry, customer advisory boards, and tiered feature rollouts.',
    toolsCovered: ['Notion GTM', 'Mixpanel', 'Amplitude', 'Crayon Compete', 'HubSpot PMM', 'Figma', 'Gong.io', 'Hotjar'],
    keyHighlights: [
      '100% Placement Support with Tech Unicorns & SaaS Platforms',
      'Real Product GTM Launch Simulation with Tiered Pricing',
      'Competitive Intelligence Battlecard Construction',
      '1-on-1 Mentorship from Senior Product Leaders',
      'Product-Led Growth (PLG) and Retention Metrics Mastery'
    ],
    careerRoles: ['Product Marketing Manager (PMM)', 'GTM Strategy Lead', 'Product Growth Specialist', 'Portfolio Marketing Director', 'Tech Evangelist'],
    eligibility: 'Ideal for marketing professionals, business analysts, product managers, or tech graduates seeking strategic leadership roles.',
    curriculum: [
      {
        moduleNumber: 1,
        title: 'Customer Discovery, Segmentation & Persona Archetypes',
        duration: '4 Weeks',
        topics: ['Jobs-To-Be-Done (JTBD)', 'B2B vs B2C User Interviews', 'Persona Archetyping', 'Willingness-to-Pay Analysis'],
        skillsGained: 'Market validation and customer insight extraction.'
      },
      {
        moduleNumber: 2,
        title: 'Positioning, Messaging Frameworks & Competitive Battlecards',
        duration: '4 Weeks',
        topics: ['April Dunford Positioning Canvas', 'Value Propositions', 'Competitive Intelligence with Crayon', 'Objection Handling Playbooks'],
        skillsGained: 'Distinctive brand positioning and enterprise sales enablement.'
      },
      {
        moduleNumber: 3,
        title: 'Go-To-Market (GTM) Orchestration & Pricing Strategies',
        duration: '5 Weeks',
        topics: ['Alpha/Beta Feature Rollouts', 'Freemium vs Usage-Based Pricing', 'Product Hunt & PR Launch Kits', 'Sales Enablement Collateral'],
        skillsGained: 'Coordinated cross-functional product releases and monetization modeling.'
      },
      {
        moduleNumber: 4,
        title: 'Product-Led Growth (PLG), Telemetry & Adoption Metrics',
        duration: '4 Weeks',
        topics: ['Onboarding Time-To-Value (TTV)', 'Mixpanel & Amplitude Funnels', 'Product Churn Analysis', 'Executive Capstone Defense'],
        skillsGained: 'User adoption analytics and customer expansion loops.'
      }
    ],
    capstoneProjects: [
      {
        title: 'Global GTM Launch Plan for AI Workflow Platform',
        description: 'Design complete launch strategy including positioning statement, competitive battlecards, tier pricing model, and customer adoption funnel.',
        tools: ['Notion GTM', 'Mixpanel', 'Figma', 'HubSpot']
      },
      {
        title: 'SaaS Churn Reduction & Activation Overhaul',
        description: 'Audit 50,000 user behavioral telemetry sessions, identify onboarding drop-offs, and implement in-app product tour redesign.',
        tools: ['Amplitude', 'Hotjar', 'Mixpanel']
      }
    ],
    emiStartsAt: '₹4,999/mo',
    fee: 64000,
    originalFee: 92000,
    nextBatch: 'Every Alternate Monday'
  },
  {
    id: 'course_marketing_design',
    slug: 'marketing-design-visual-communication',
    title: 'Marketing Design and Visual Communication',
    shortTitle: 'Marketing Design & Ad Creatives',
    category: 'Marketing Design and Visual Communication',
    categoryLabel: 'Design & Growth Creatives',
    duration: '5 Months',
    mode: 'Classroom & Studio Labs',
    level: 'Beginner to Advanced',
    certification: 'Dual Certification (Hridayam by Belvo + Creative Agency Council)',
    rating: 4.8,
    reviewCount: 860,
    projectsCount: 26,
    highestPackage: '₹18 LPA',
    avgPackage: '₹7.2 LPA',
    badge: 'High Conversion',
    summary: 'Design high-converting performance ad creatives, landing pages, motion graphics for social ads, email newsletter visual systems, and brand pitch decks tailored for measurable business ROI.',
    description: 'Marketing designers are among the highest-paid creative specialists today because their visuals directly generate sales. This program trains you to craft high-CTR social ads, responsive landing pages, typography hierarchies, kinetic typography reels, and omnichannel creative variations for Meta, Google, and LinkedIn.',
    toolsCovered: ['Figma', 'Adobe Illustrator', 'Photoshop', 'After Effects', 'Webflow', 'Midjourney Pro', 'Canva Enterprise', 'Unbounce'],
    keyHighlights: [
      '100% Placement Support with Performance Marketing Agencies & Top Brands',
      'Over 200+ Live Creative Variations Produced in Class',
      'Data-Driven Design: Translating CTR & ROAS into Better Creatives',
      'Motion Design for TikTok, Reels & YouTube Shorts',
      'Portfolio Website Development on Webflow'
    ],
    careerRoles: ['Performance Creative Designer', 'Marketing Art Director', 'Visual Communications Lead', 'Conversion Rate Optimization (CRO) Designer', 'Brand Campaign Stylist'],
    eligibility: 'Open to freshers, graphic designers, marketers, and visual storytellers. No prior coding required.',
    curriculum: [
      {
        moduleNumber: 1,
        title: 'Visual Hierarchy, Typography Psychology & Conversion Design',
        duration: '4 Weeks',
        topics: ['F-Pattern & Z-Pattern Eye Tracking', 'Color Harmonies for Action', 'Microcopy Staging', 'Ad Spec Guidelines'],
        skillsGained: 'Visual persuasion and conversion-focused graphic layouts.'
      },
      {
        moduleNumber: 2,
        title: 'Static & Carousel Performance Ad Creatives (Meta & Google)',
        duration: '4 Weeks',
        topics: ['Figma Modular Component Systems', 'Hook Variations (3-Second Rule)', 'UGC Creative Framing', 'Vector Iconography'],
        skillsGained: 'Rapid creative testing matrices and automated brand asset scaling.'
      },
      {
        moduleNumber: 3,
        title: 'Motion Design for Performance Ads & Kinetic Typography',
        duration: '5 Weeks',
        topics: ['After Effects Motion Graphics', 'Dynamic Product Transitions', 'Sound Design & Audio Cues', 'Vertical Video Packaging'],
        skillsGained: 'High-impact short-form ad video production.'
      },
      {
        moduleNumber: 4,
        title: 'Responsive High-Converting Landing Pages & Webflow Portfolio',
        duration: '4 Weeks',
        topics: ['Hero Section Wireframes', 'Social Proof Sections', 'Webflow Visual Development', 'Personal Agency Portfolio Launch'],
        skillsGained: 'Complete marketing funnels and responsive digital presentation.'
      }
    ],
    capstoneProjects: [
      {
        title: 'Complete 30-Day Multi-Variant Ad Campaign System for D2C Brand',
        description: 'Produce 40 static ad creatives, 10 motion reels, and 3 high-converting landing page variants with audited 3.8x CTR improvements.',
        tools: ['Figma', 'After Effects', 'Photoshop', 'Webflow']
      },
      {
        title: 'B2B Enterprise Brand Visual Identity & Pitch Deck Overhaul',
        description: 'Create a 25-slide executive investor pitch deck, brand guidelines document, and LinkedIn organic thought-leadership carousel series.',
        tools: ['Figma', 'Illustrator', 'Photoshop']
      }
    ],
    emiStartsAt: '₹4,299/mo',
    fee: 55000,
    originalFee: 79000,
    nextBatch: 'Starting this Monday'
  }
];
