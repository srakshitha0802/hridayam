import React, { useState, useRef } from 'react';
import { GoogleIcon } from './GoogleIcon';
import {
  DoodleSparkle,
  DoodleCurvedArrow,
  DoodleRocket,
  DoodleLightbulb,
  DoodleBadgeCheck,
} from './ThemeDoodles';

interface IndustryAlignedProgramsSectionProps {
  onSelectCourse: (courseId: string) => void;
  onRequestCallback: (courseInterest?: string) => void;
  onDownloadBrochure: (courseTitle?: string) => void;
}

export interface MasterProgramItem {
  id: string;
  category: string;
  badge: string;
  title: string;
  durationAndMax: string;
  duration: string;
  highestPackage: string;
  imageUrl: string;
  description: string;
  tools: string[];
  projectsCount: number;
  certification: string;
  isBelvo: boolean;
}

export const MASTER_PROGRAMS_LIST: MasterProgramItem[] = [
  {
    id: 'course_digital_marketing_growth',
    category: 'Marketing & Social Media',
    badge: 'High Demand',
    title: 'Digital Marketing and Social Media Management',
    durationAndMax: '6 Months • Max ₹18 LPA',
    duration: '6 Months',
    highestPackage: '₹18 LPA',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    description:
      'Developed directly from Belvo growth marketing playbooks, this program equips students with real-world agency skills. From organic community building to million-dollar performance marketing campaigns, you learn paid social attribution, viral reel production, and automated retention funnels.',
    tools: ['Meta Ads Manager', 'Google Ads', 'GA4', 'Looker Studio', 'HubSpot', 'SEMrush', 'Canva Pro', 'TikTok/Reels Algo', 'Klaviyo', 'Buffer'],
    projectsCount: 28,
    certification: 'Dual (ITvedant + NSDC)',
    isBelvo: true,
  },
  {
    id: 'course_fullstack_typescript',
    category: 'Software & Mobile Dev',
    badge: 'Most Popular',
    title: 'Web, App, and Software Development',
    durationAndMax: '8 Months • Max ₹28 LPA',
    duration: '8 Months',
    highestPackage: '₹28 LPA',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
    description:
      'Co-engineered with top SaaS startups to build scalable cloud-native architectures. Master modern React 19, TypeScript, Next.js 15, Node.js microservices, React Native cross-platform apps, and automated Docker CI/CD pipelines.',
    tools: ['React 19', 'TypeScript', 'Next.js 15', 'Node.js', 'React Native', 'PostgreSQL', 'Docker', 'AWS ECS', 'GraphQL', 'Tailwind CSS'],
    projectsCount: 32,
    certification: 'Dual (ITvedant + NSDC)',
    isBelvo: true,
  },
  {
    id: 'course_uiux_brand_systems',
    category: 'UI/UX & Brand Design',
    badge: 'Top Creative Track',
    title: 'Graphic Design, Branding, and UI/UX',
    durationAndMax: '6 Months • Max ₹22 LPA',
    duration: '6 Months',
    highestPackage: '₹22 LPA',
    imageUrl: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80',
    description:
      'Design conversion-focused digital products and cohesive brand identities. Learn advanced Figma design tokens, WCAG 2.2 accessibility standards, interactive mobile wireframing, UX user research protocols, and production design systems.',
    tools: ['Figma Tokens', 'Adobe Illustrator', 'Photoshop', 'WCAG 2.2 Standards', 'Protopie', 'Maze UX Testing', 'Notion Specs', 'Design Systems'],
    projectsCount: 24,
    certification: 'Dual (ITvedant + NSDC)',
    isBelvo: true,
  },
  {
    id: 'course_motion_vfx_story',
    category: 'Video Editing & VFX',
    badge: 'Studio Grade',
    title: 'Video Editing, Animation, and VFX',
    durationAndMax: '7 Months • Max ₹20 LPA',
    duration: '7 Months',
    highestPackage: '₹20 LPA',
    imageUrl: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80',
    description:
      'Craft cinematic narratives and viral motion design for OTT platforms, agencies, and high-growth brands. Train in DaVinci Resolve Rec.709 color science, After Effects motion graphics, 3D camera tracking, and sound staging.',
    tools: ['DaVinci Resolve Studio', 'After Effects 2026', 'Premiere Pro', 'Cinema 4D Lite', 'Blender 3D', 'Mocha Pro', 'Rec.709 Color Science'],
    projectsCount: 26,
    certification: 'Dual (ITvedant + NSDC)',
    isBelvo: true,
  },
  {
    id: 'course_ai_automation_workflows',
    category: 'AI & Automation',
    badge: 'Industry Flagship #1',
    title: 'Artificial Intelligence, Machine Learning, and Automation',
    durationAndMax: '8 Months • Max ₹32 LPA',
    duration: '8 Months',
    highestPackage: '₹32 LPA',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
    description:
      'Engineer autonomous AI agents and intelligent production workflows. Build end-to-end Retrieval-Augmented Generation (RAG) copilots, fine-tune open-source LLMs, and automate complex enterprise workflows using the Gemini API and LangChain.',
    tools: ['Gemini API', 'LangChain', 'CrewAI', 'LlamaIndex', 'Python', 'FastAPI', 'Pinecone Vector DB', 'Make.com', 'Zapier Automation'],
    projectsCount: 35,
    certification: 'Dual (ITvedant + NSDC)',
    isBelvo: true,
  },
  {
    id: 'course_ecommerce_scale',
    category: 'E-commerce & D2C',
    badge: 'Entrepreneur Focus',
    title: 'E-commerce and Online Business',
    durationAndMax: '5 Months • Max ₹19 LPA',
    duration: '5 Months',
    highestPackage: '₹19 LPA',
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0a67e5572293?auto=format&fit=crop&w=800&q=80',
    description:
      'Launch, manage, and scale high-volume online storefronts from scratch. Master Shopify Plus headless architecture, Amazon Seller Central optimization, conversion rate optimization (CRO), and global dropshipping logistics.',
    tools: ['Shopify Plus', 'Amazon Seller Central', 'Klaviyo', 'Triple Whale', 'Shiprocket', 'Google Shopping Ads', 'Razorpay Gateway'],
    projectsCount: 22,
    certification: 'Dual (ITvedant + NSDC)',
    isBelvo: true,
  },
  {
    id: 'course_photography_content',
    category: 'Photography & Content',
    badge: 'Hands-on Studio',
    title: 'Photography and Content Creation',
    durationAndMax: '5 Months • Max ₹16 LPA',
    duration: '5 Months',
    highestPackage: '₹16 LPA',
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    description:
      'Hands-on training inside physical studio bays with commercial strobe setups, multi-cam video podcasts, product shoot composition, editorial lighting, and color-calibrated Lightroom & Capture One workflows.',
    tools: ['Sony Alpha Pro Cameras', 'Godox Studio Strobes', 'Capture One Pro', 'Lightroom Classic', 'CapCut Studio', 'DJI Ronin Gimbals'],
    projectsCount: 30,
    certification: 'Dual (ITvedant + NSDC)',
    isBelvo: true,
  },
  {
    id: 'course_b2b_sales_ventures',
    category: 'Sales & Entrepreneurship',
    badge: 'High Earning Potential',
    title: 'Business Development, Sales, and Entrepreneurship',
    durationAndMax: '6 Months • Max ₹24 LPA',
    duration: '6 Months',
    highestPackage: '₹24 LPA',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80',
    description:
      'Drive high-ticket enterprise contracts and scale venture operations. Learn MEDDICC sales qualification frameworks, consultative outbound prospecting, CRM pipeline automation, and startup fundraising pitch mechanics.',
    tools: ['HubSpot Enterprise CRM', 'Apollo.io', 'LinkedIn Sales Navigator', 'ZoomInfo', 'Notion Pitch Decks', 'Stripe Invoicing'],
    projectsCount: 20,
    certification: 'Dual (ITvedant + NSDC)',
    isBelvo: true,
  },
  {
    id: 'course_seo_copywriting',
    category: 'Copywriting & Content SEO',
    badge: 'Creative & Technical',
    title: 'Copywriting, SEO, and Content Marketing',
    durationAndMax: '5 Months • Max ₹17 LPA',
    duration: '5 Months',
    highestPackage: '₹17 LPA',
    imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80',
    description:
      'Master the dual craft of psychological direct-response copywriting and search engine dominance. Rank on Google Page 1 with technical SEO audits, topic clusters, AI-assisted research, and automated high-converting email nurture sequences.',
    tools: ['Ahrefs', 'SEMrush', 'SurferSEO', 'Grammarly Business', 'WordPress Gutenberg', 'Google Search Console', 'Jasper AI'],
    projectsCount: 25,
    certification: 'Dual (ITvedant + NSDC)',
    isBelvo: true,
  },
  {
    id: 'course_cloud_cybersecurity',
    category: 'Cloud & Cyber Defense',
    badge: 'High Security Track',
    title: 'Cloud Computing, IT, and Cybersecurity Awareness',
    durationAndMax: '7 Months • Max ₹26 LPA',
    duration: '7 Months',
    highestPackage: '₹26 LPA',
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    description:
      'Protect enterprise cloud infrastructure against modern cyber vectors. Practice live penetration testing in sandbox networks, configure AWS VPC security, write Terraform guardrails, and audit compliance against ISO 27001.',
    tools: ['AWS Security', 'Kali Linux', 'Wireshark', 'Burp Suite', 'Terraform', 'Nmap', 'Docker Sentinel', 'Metasploit'],
    projectsCount: 28,
    certification: 'Dual (ITvedant + NSDC)',
    isBelvo: true,
  },
  {
    id: 'course_data_analytics_bi',
    category: 'Data Analytics & BI',
    badge: 'Top Placement Record',
    title: 'Data Analytics and Business Intelligence',
    durationAndMax: '7 Months • Max ₹25 LPA',
    duration: '7 Months',
    highestPackage: '₹25 LPA',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    description:
      'Convert raw corporate records into high-impact executive dashboards. Build automated ETL pipelines in Snowflake, model complex DAX financial analytics, and deliver interactive board-level Power BI & Tableau dashboards.',
    tools: ['Power BI Desktop & Service', 'Tableau', 'Advanced SQL', 'Snowflake', 'Excel VBA', 'Python Pandas', 'DAX Measures'],
    projectsCount: 30,
    certification: 'Dual (ITvedant + NSDC)',
    isBelvo: true,
  },
  {
    id: 'itv_digital_marketing',
    category: 'Digital Marketing',
    badge: 'Creative & Analytical',
    title: 'Digital Marketing & Growth Strategy with AI Master Program',
    durationAndMax: '6 Months • Max ₹18 LPA',
    duration: '6 Months',
    highestPackage: '₹18 LPA',
    imageUrl: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=800&q=80',
    description:
      'Omnichannel performance marketing powered by predictive AI. Master high-converting paid social ad funnels, programmatic search buying, generative ad copy, and multi-touch attribution across Meta, Google, and LinkedIn.',
    tools: ['Meta Ads Manager', 'Google Ads', 'GA4', 'HubSpot CRM', 'SEMrush', 'ChatGPT Marketing', 'Canva Pro', 'Klaviyo'],
    projectsCount: 28,
    certification: 'Dual (ITvedant + NSDC)',
    isBelvo: false,
  },
  {
    id: 'itv_data_science_ai',
    category: 'Data Science & AI',
    badge: 'Crown Jewel',
    title: 'Master in Data Science and Analytics with AI',
    durationAndMax: '8 Months • Max ₹30 LPA',
    duration: '8 Months',
    highestPackage: '₹30 LPA',
    imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80',
    description:
      'ITvedant flagship transformation program. Transition from statistics and Python all the way to deep learning, computer vision, natural language processing, LLMs, and production Generative AI deployments.',
    tools: ['Python', 'SQL', 'Power BI', 'Scikit-Learn', 'TensorFlow', 'Keras', 'OpenCV', 'LangChain', 'AWS Cloud'],
    projectsCount: 35,
    certification: 'Dual (ITvedant + NSDC)',
    isBelvo: false,
  },
  {
    id: 'itv_fullstack_dev',
    category: 'Full Stack Engineering',
    badge: 'High Placement',
    title: 'Full Stack Web Development Master Program',
    durationAndMax: '8 Months • Max ₹28 LPA',
    duration: '8 Months',
    highestPackage: '₹28 LPA',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    description:
      'Become a high-velocity full-stack software engineer. Build robust microservices with Node.js, Express, MongoDB, PostgreSQL, React 19, TypeScript, and automated Docker deployments with 100% placement calls.',
    tools: ['React 19', 'Next.js', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'TypeScript', 'Docker', 'AWS'],
    projectsCount: 30,
    certification: 'Dual (ITvedant + NSDC)',
    isBelvo: false,
  },
  {
    id: 'itv_cloud_devops',
    category: 'Cloud & DevOps',
    badge: 'AWS Partner',
    title: 'Cloud Computing & DevOps Master Program with AWS',
    durationAndMax: '7 Months • Max ₹26 LPA',
    duration: '7 Months',
    highestPackage: '₹26 LPA',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    description:
      'Master the AWS cloud ecosystem, Docker containers, Kubernetes cluster orchestration, Terraform Infrastructure as Code (IaC), and Jenkins zero-downtime CI/CD deployment pipelines.',
    tools: ['AWS Cloud', 'Docker', 'Kubernetes (K8s)', 'Terraform', 'Ansible', 'Jenkins CI/CD', 'Linux Shell', 'Git'],
    projectsCount: 26,
    certification: 'Dual (ITvedant + NSDC)',
    isBelvo: false,
  },
  {
    id: 'itv_java_fullstack',
    category: 'Enterprise Java',
    badge: 'Core Tech',
    title: 'Java Full Stack Developer Master Program',
    durationAndMax: '7 Months • Max ₹24 LPA',
    duration: '7 Months',
    highestPackage: '₹24 LPA',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    description:
      'Build enterprise banking and e-commerce backends with Core & Advanced Java, Spring Boot microservices, Hibernate ORM, RESTful APIs, MySQL, and React frontend integration.',
    tools: ['Core Java', 'Spring Boot', 'Hibernate', 'Microservices', 'React.js', 'MySQL', 'Docker', 'Maven'],
    projectsCount: 25,
    certification: 'Dual (ITvedant + NSDC)',
    isBelvo: false,
  },
  {
    id: 'itv_python_fullstack',
    category: 'Python Development',
    badge: 'Rapid Code',
    title: 'Python Full Stack Developer Master Program',
    durationAndMax: '7 Months • Max ₹24 LPA',
    duration: '7 Months',
    highestPackage: '₹24 LPA',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    description:
      'Develop scalable web platforms and APIs with Python 3.12, Django, FastAPI, React, PostgreSQL, Celery asynchronous background workers, and Redis caching layers.',
    tools: ['Python 3.12', 'Django', 'FastAPI', 'React', 'PostgreSQL', 'Celery', 'Redis', 'Docker', 'Git'],
    projectsCount: 28,
    certification: 'Dual (ITvedant + NSDC)',
    isBelvo: false,
  },
  {
    id: 'itv_software_testing',
    category: 'QA & Automation',
    badge: 'AI Testing',
    title: 'Software Testing & QA Automation with AI Master Program',
    durationAndMax: '6 Months • Max ₹18 LPA',
    duration: '6 Months',
    highestPackage: '₹18 LPA',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    description:
      'Automate web, API, and mobile quality assurance with Selenium WebDriver, Playwright, Cypress, Postman API testing, Jira Agile, and AI test case generation frameworks.',
    tools: ['Selenium WebDriver', 'Java', 'Playwright', 'Postman API', 'Jira Agile', 'TestNG', 'Cypress', 'Git'],
    projectsCount: 22,
    certification: 'Dual (ITvedant + NSDC)',
    isBelvo: false,
  },
  {
    id: 'itv_cyber_security',
    category: 'Cyber Defense',
    badge: 'Ethical Hacking',
    title: 'Cyber Security & Ethical Hacking Master Program with AI',
    durationAndMax: '7 Months • Max ₹26 LPA',
    duration: '7 Months',
    highestPackage: '₹26 LPA',
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    description:
      'Master vulnerability assessment, web app penetration testing, threat hunting with Splunk SIEM, network defense with Wireshark and Kali Linux, and ethical hacking CEH lab scenarios.',
    tools: ['Kali Linux', 'Wireshark', 'Burp Suite Pro', 'Metasploit', 'Nmap', 'SIEM Splunk', 'CEH Labs', 'Python'],
    projectsCount: 26,
    certification: 'Dual (ITvedant + NSDC)',
    isBelvo: false,
  },
];

export const IndustryAlignedProgramsSection: React.FC<IndustryAlignedProgramsSectionProps> = ({
  onSelectCourse,
  onRequestCallback,
  onDownloadBrochure,
}) => {
  const [activeCourseId, setActiveCourseId] = useState<string>('course_digital_marketing_growth');
  const [activeCategoryTab, setActiveCategoryTab] = useState<'all' | 'belvo' | 'tech'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const transformationsSliderRef = useRef<HTMLDivElement>(null);

  // Filter courses based on Category Tab and Search Query
  const filteredCourses = MASTER_PROGRAMS_LIST.filter((course) => {
    const matchesCategory =
      activeCategoryTab === 'all' ||
      (activeCategoryTab === 'belvo' && course.isBelvo) ||
      (activeCategoryTab === 'tech' && !course.isBelvo);
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.tools.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Selected course details for the interactive Spotlight card
  const selectedCourse =
    MASTER_PROGRAMS_LIST.find((c) => c.id === activeCourseId) || MASTER_PROGRAMS_LIST[0];

  const scrollTransformations = (direction: 'left' | 'right') => {
    if (transformationsSliderRef.current) {
      const offset = direction === 'left' ? -360 : 360;
      transformationsSliderRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section className="space-y-16 relative z-10 text-[#1E428E]">
      {/* ========================================================================= */}
      {/* 1. SECTION HEADER WITH METALLIC GLASS BADGES & DOODLES                    */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 relative max-w-4xl mx-auto">
          {/* Decorative Sparkle Doodles */}
          <div className="absolute -top-6 left-4 text-[#3869C3] animate-doodle-float hidden sm:block">
            <DoodleSparkle className="w-8 h-8 text-[#3869C3]" />
          </div>
          <div className="absolute -top-4 right-6 text-[#5A87D7] animate-doodle-float-delayed hidden sm:block">
            <DoodleSparkle className="w-6 h-6 text-[#5A87D7]" />
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border-2 border-[#D3E5FD] text-[#1E428E] text-xs font-bold uppercase tracking-widest backdrop-blur-md shadow-xs">
            <GoogleIcon name="workspace_premium" size={16} className="text-[#3869C3]" filled />
            <span>Industry Aligned Programs</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E428E] font-display tracking-tight leading-tight">
            Accelerate Your Career with Our{' '}
            <span className="bg-gradient-to-r from-[#1E428E] via-[#3869C3] to-[#5A87D7] bg-clip-text text-transparent">
              Industry-Aligned Courses
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#1E428E]/80 max-w-2xl mx-auto leading-relaxed font-medium">
            Curriculum co-designed with top hiring partners to bridge real-world engineering and analytics skill gaps.
          </p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. FLAGSHIP MASTER PROGRAMS CONSOLE (EXACT USER CONTENT & REAL IMAGES)     */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contrast Blue Console Frame with Ambient Glowing Studio Background */}
        <div className="glass-blue-contrast rounded-[36px] p-5 sm:p-8 lg:p-10 shadow-2xl space-y-6 relative overflow-hidden border-2 border-white/80 text-white">
          {/* Ambient Studio Background Image Frame */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            <img
              src="/neon-studio-bg.jpg"
              alt="Belvo Studio"
              className="w-full h-full object-cover opacity-20 filter contrast-125 mix-blend-luminosity scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1E428E]/95 via-[#142B5C]/95 to-[#1E428E]/95 backdrop-blur-[2px]" />
          </div>

          {/* Top Toolbar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-5 border-b border-white/25 relative z-10">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#1E428E] via-[#3869C3] to-[#5A87D7] text-white flex items-center justify-center shrink-0 shadow-md border border-white/40">
                <GoogleIcon name="school" size={24} />
              </div>
              <div>
                <h3 className="font-display font-extrabold text-white text-xl sm:text-2xl">
                  Flagship Master Programs
                </h3>
                <p className="text-xs sm:text-sm text-[#D3E5FD] mt-0.5">
                  Select any program below to inspect duration, tools, live budgets, and syllabus.
                </p>
              </div>
            </div>

            {/* Filter Tabs: All (19), Belvo Tracks (11), Tech Masters (8) */}
            <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-black/25 border border-white/40 backdrop-blur-md self-start sm:self-center">
              <button
                type="button"
                onClick={() => setActiveCategoryTab('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeCategoryTab === 'all'
                    ? 'bg-gradient-to-r from-[#3869C3] to-[#5A87D7] text-white shadow-md'
                    : 'text-[#D3E5FD] hover:text-white hover:bg-white/10'
                }`}
              >
                All (19)
              </button>
              <button
                type="button"
                onClick={() => setActiveCategoryTab('belvo')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeCategoryTab === 'belvo'
                    ? 'bg-gradient-to-r from-[#3869C3] to-[#5A87D7] text-white shadow-md'
                    : 'text-[#D3E5FD] hover:text-white hover:bg-white/10'
                }`}
              >
                Belvo Tracks (11)
              </button>
              <button
                type="button"
                onClick={() => setActiveCategoryTab('tech')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeCategoryTab === 'tech'
                    ? 'bg-gradient-to-r from-[#3869C3] to-[#5A87D7] text-white shadow-md'
                    : 'text-[#D3E5FD] hover:text-white hover:bg-white/10'
                }`}
              >
                Tech Masters (8)
              </button>
            </div>
          </div>

          {/* Split Screen Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start relative z-10">
            {/* Left Column: 19 Master Programs List */}
            <div className="lg:col-span-5 bg-black/25 rounded-3xl p-3.5 border border-white/20 space-y-3 backdrop-blur-md">
              {/* Search Bar */}
              <div className="relative">
                <GoogleIcon
                  name="search"
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#D3E5FD]"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search 19 flagship courses or tools..."
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white/10 text-white placeholder-[#D3E5FD]/70 text-xs border border-white/30 focus:outline-none focus:border-white font-medium"
                />
              </div>

              {/* Scrollable Course Cards Deck with Real Images & Content Visible */}
              <div className="max-h-[580px] overflow-y-auto space-y-2 pr-1.5 scrollbar-thin scrollbar-thumb-[#3869C3]/60">
                {filteredCourses.map((course) => {
                  const isActive = course.id === activeCourseId;
                  return (
                    <button
                      key={course.id}
                      type="button"
                      onClick={() => setActiveCourseId(course.id)}
                      className={`w-full text-left p-3.5 rounded-2xl transition-all cursor-pointer flex items-center gap-3.5 group relative overflow-hidden ${
                        isActive
                          ? 'bg-gradient-to-r from-[#3869C3] via-[#1E428E] to-[#142B5C] text-white shadow-xl border-2 border-white translate-x-1'
                          : 'bg-white/10 hover:bg-white/20 text-[#D3E5FD] border border-white/15 hover:border-white/40'
                      }`}
                    >
                      {/* Course Thumbnail Image */}
                      <div className="w-13 h-13 rounded-xl overflow-hidden shrink-0 border border-white/30 shadow-xs relative">
                        <img
                          src={course.imageUrl}
                          alt={course.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      </div>

                      {/* Course Content Details */}
                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex items-center justify-between gap-1.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D3E5FD] truncate">
                            {course.category}
                          </span>
                          <span
                            className={`text-[9px] px-2 py-0.5 rounded-full font-bold whitespace-nowrap shadow-xs ${
                              isActive
                                ? 'bg-white text-[#1E428E] font-extrabold'
                                : 'bg-white/20 text-white border border-white/30'
                            }`}
                          >
                            {course.badge}
                          </span>
                        </div>

                        <h4 className="font-bold text-xs sm:text-sm text-white line-clamp-1 leading-snug group-hover:text-[#D3E5FD] transition-colors">
                          {course.title}
                        </h4>

                        <div className="flex items-center justify-between text-[11px] text-[#D3E5FD]/90 font-medium">
                          <span>{course.durationAndMax}</span>
                        </div>
                      </div>

                      {/* Active Indicator Chevron */}
                      <GoogleIcon
                        name="chevron_right"
                        size={18}
                        className={`shrink-0 transition-transform ${
                          isActive ? 'translate-x-1 text-white' : 'text-[#D3E5FD]/60 group-hover:text-white'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Active Program Spotlight Card with Image & Full Content */}
            <div className="lg:col-span-7 bg-[#142B5C]/85 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border-2 border-white/60 space-y-6 shadow-2xl relative overflow-hidden text-white">
              {/* Top Hero Image Banner */}
              <div className="h-44 sm:h-52 rounded-2xl overflow-hidden relative shadow-lg border border-white/30">
                <img
                  src={selectedCourse.imageUrl}
                  alt={selectedCourse.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Floating Tags on Image */}
                <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between gap-2">
                  <div>
                    <span className="bg-[#3869C3]/90 text-white text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md shadow-xs border border-white/40">
                      {selectedCourse.category}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-white font-display mt-1 drop-shadow-md">
                      {selectedCourse.title}
                    </h3>
                  </div>
                  <span className="bg-white/95 text-[#1E428E] text-xs font-mono font-extrabold px-2.5 py-1 rounded-lg shrink-0 shadow-md">
                    {selectedCourse.highestPackage}
                  </span>
                </div>
              </div>

              {/* Duration & Mode Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/20">
                <div>
                  <span className="text-[10px] text-[#D3E5FD] font-semibold uppercase block">
                    Duration &amp; Mode
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-white">
                    {selectedCourse.duration} • Classroom &amp; Online Live
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-[#D3E5FD] font-semibold uppercase block">
                    Track Level
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-[#D3E5FD] flex items-center gap-1">
                    <GoogleIcon name="verified" size={14} className="text-[#84ADEB]" />
                    <span>Dual (ITvedant + NSDC)</span>
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#D3E5FD] leading-relaxed font-normal">
                {selectedCourse.description}
              </p>

              {/* Tools & Technologies */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <GoogleIcon name="build" size={14} className="text-[#84ADEB]" />
                    <span>Tools &amp; Technologies:</span>
                  </span>
                  <span className="text-[11px] text-[#D3E5FD]">
                    {selectedCourse.tools.length} Stacks
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {selectedCourse.tools.map((tool, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-white/15 hover:bg-white/25 border border-white/30 text-white rounded-xl text-xs font-semibold backdrop-blur-md transition-all shadow-xs"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Metric Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-[#0D1D3D]/60 p-4 rounded-2xl border border-white/20">
                <div className="space-y-1">
                  <span className="text-[#D3E5FD] block text-[11px] font-semibold">Projects:</span>
                  <span className="font-bold text-sm sm:text-base text-white flex items-center gap-1.5">
                    <GoogleIcon name="assignment" size={16} className="text-[#84ADEB]" />
                    <span>{selectedCourse.projectsCount}+ Real-World</span>
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[#D3E5FD] block text-[11px] font-semibold">Max Package:</span>
                  <span className="font-bold text-sm sm:text-base text-[#D3E5FD] flex items-center gap-1.5">
                    <GoogleIcon name="payments" size={16} className="text-[#84ADEB]" />
                    <span>{selectedCourse.highestPackage}</span>
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[#D3E5FD] block text-[11px] font-semibold">Certification:</span>
                  <span className="font-bold text-xs sm:text-sm text-white flex items-center gap-1">
                    <GoogleIcon name="verified" size={15} className="text-[#84ADEB]" />
                    <span>Dual (ITvedant + NSDC)</span>
                  </span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => onSelectCourse(selectedCourse.id)}
                  className="w-full sm:w-auto flex-1 py-3 px-6 rounded-xl btn-blue-primary font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all border border-white"
                >
                  <span>View Full Syllabus</span>
                  <GoogleIcon name="arrow_forward" size={16} />
                </button>

                <button
                  type="button"
                  onClick={() => onRequestCallback(selectedCourse.title)}
                  className="w-full sm:w-auto py-3 px-6 rounded-xl btn-blue-glass font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <GoogleIcon name="calendar_month" size={16} />
                  <span>Book Free Demo Class</span>
                </button>

                <button
                  type="button"
                  onClick={() => onDownloadBrochure(selectedCourse.title)}
                  title="Download Program Curriculum PDF"
                  className="p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/30 text-white cursor-pointer shrink-0 transition-all"
                >
                  <GoogleIcon name="download" size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. CAREER TRANSFORMATIONS SHOWCASE (USER REQUESTED SECTION)               */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border-2 border-[#D3E5FD] text-[#1E428E] text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-xs">
              <DoodleBadgeCheck className="w-4 h-4 text-[#3869C3]" />
              <span>Real Outcomes &amp; Proof</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1E428E] tracking-tight">
              Career Transformations
            </h3>
            <p className="text-xs sm:text-sm text-[#1E428E]/80 max-w-2xl leading-relaxed font-medium">
              Real journeys of freshers and working professionals who shifted into high-growth product companies and performance agencies.
            </p>
          </div>

          {/* Transformation Slider Controls */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => scrollTransformations('left')}
              className="w-10 h-10 rounded-full bg-white border-2 border-[#D3E5FD] shadow-sm hover:border-[#3869C3] text-[#3869C3] flex items-center justify-center cursor-pointer transition-all"
              aria-label="Previous story"
            >
              <GoogleIcon name="arrow_back" size={18} />
            </button>
            <button
              type="button"
              onClick={() => scrollTransformations('right')}
              className="w-10 h-10 rounded-full bg-white border-2 border-[#D3E5FD] shadow-sm hover:border-[#3869C3] text-[#3869C3] flex items-center justify-center cursor-pointer transition-all"
              aria-label="Next story"
            >
              <GoogleIcon name="arrow_forward" size={18} />
            </button>
          </div>
        </div>

        {/* Horizontal Sliding Cards of Career Transformations */}
        <div
          ref={transformationsSliderRef}
          className="flex gap-5 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-[#3869C3]/50 scroll-smooth snap-x snap-mandatory"
        >
          {[
            {
              id: 'story-1',
              name: 'Sneha Kulkarni',
              photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
              previousRole: 'B.Com Fresher / Non-Tech',
              newRole: 'Performance Marketing Lead',
              hiringPartner: 'Nykaa E-Commerce',
              previousSalary: 'Fresher (₹0)',
              newSalary: '₹18 LPA',
              salaryHike: '+414% Package',
              courseCompleted: 'Digital Marketing and Social Media Management',
              quote: 'Running live campaigns with the Belvo ₹50,000 ad budget during class gave me the exact portfolio that unlocked my Nykaa offer letter.',
              verifiedYear: '2026 Batch',
            },
            {
              id: 'story-2',
              name: 'Rahul Verma',
              photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
              previousRole: 'Customer Support Executive',
              newRole: 'Full Stack Engineer',
              hiringPartner: 'Amazon Web Services',
              previousSalary: '₹3.6 LPA',
              newSalary: '₹24 LPA',
              salaryHike: '6.6x Salary Jump',
              courseCompleted: 'Full Stack Web Development Master Program',
              quote: 'I transitioned from night-shift voice support to building microservices. The daily 1-on-1 code clinics transformed my algorithmic thinking.',
              verifiedYear: '2026 Batch',
            },
            {
              id: 'story-3',
              name: 'Ananya Mukherjee',
              photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
              previousRole: 'Junior Graphic Designer',
              newRole: 'Senior Product UI/UX Designer',
              hiringPartner: 'Swiggy Studio',
              previousSalary: '₹3.2 LPA',
              newSalary: '₹16.5 LPA',
              salaryHike: '+415% Increment',
              courseCompleted: 'Graphic Design, Branding, and UI/UX',
              quote: 'Belvo design tokens, WCAG accessibility benchmarks, and Figma interactive prototypes directly impressed Swiggy hiring directors.',
              verifiedYear: '2026 Batch',
            },
            {
              id: 'story-4',
              name: 'Vikram Samant',
              photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
              previousRole: 'Mechanical Engineering Grad',
              newRole: 'AI Automation & RAG Engineer',
              hiringPartner: 'Capgemini Tech',
              previousSalary: 'Fresher (₹0)',
              newSalary: '₹19 LPA',
              salaryHike: 'Dream Tech Offer',
              courseCompleted: 'Artificial Intelligence, Machine Learning, and Automation',
              quote: 'Deploying LangChain autonomous multi-agent pipelines as my capstone proved I could ship production AI on day one.',
              verifiedYear: '2026 Batch',
            },
            {
              id: 'story-5',
              name: 'Pooja Deshmukh',
              photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
              previousRole: 'MIS Data Entry Clerk',
              newRole: 'Lead BI & Analytics Consultant',
              hiringPartner: 'Deloitte Consulting',
              previousSalary: '₹2.8 LPA',
              newSalary: '₹17.2 LPA',
              salaryHike: '6.1x Growth',
              courseCompleted: 'Data Analytics and Business Intelligence',
              quote: 'Learning Snowflake ETL and executive Power BI dashboards helped me clear 3 rounds of technical case interviews at Deloitte.',
              verifiedYear: '2026 Batch',
            },
          ].map((story) => (
            <div
              key={story.id}
              className="w-[340px] sm:w-[380px] shrink-0 snap-start bg-white/95 rounded-3xl p-6 border-2 border-white/90 hover:border-[#3869C3] shadow-md hover:shadow-xl transition-all flex flex-col justify-between relative overflow-hidden group text-[#1E428E]"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3.5">
                  <img
                    src={story.photoUrl}
                    alt={story.name}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-[#D3E5FD] shadow-xs shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="font-bold text-[#1E428E] text-base leading-snug">{story.name}</h4>
                    <p className="text-xs font-semibold text-[#3869C3] truncate">{story.newRole}</p>
                    <span className="text-[11px] text-[#1E428E]/70 font-medium block">
                      Hired by: <strong className="text-[#1E428E]">{story.hiringPartner}</strong>
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-[#D3E5FD]/50 border border-[#84ADEB]/30 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#1E428E]/70 block uppercase font-semibold">Trajectory</span>
                    <span className="text-xs font-bold text-[#1E428E]">
                      {story.previousSalary} ➔ <span className="text-[#3869C3] font-extrabold">{story.newSalary}</span>
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-[#1E428E] via-[#3869C3] to-[#5A87D7] text-white font-mono font-bold text-xs shadow-xs">
                    {story.salaryHike}
                  </span>
                </div>

                <p className="text-xs text-[#1E428E]/85 italic leading-relaxed">
                  "{story.quote}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#D3E5FD] flex items-center justify-between text-[11px]">
                <span className="text-[#1E428E]/70 font-medium truncate max-w-[200px]">
                  {story.courseCompleted}
                </span>
                <span className="font-bold text-[#1E428E] bg-[#D3E5FD] px-2 py-0.5 rounded-full border border-white">
                  {story.verifiedYear}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Global Placement Metric Counters */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {[
            { label: 'Learners Placed', value: '3,500+', desc: 'Across India & Remote' },
            { label: 'Highest Package', value: '₹32 LPA', desc: 'AI, Web & Tech Tracks' },
            { label: 'Hiring Partners', value: '2,000+', desc: 'MNCs, Startups & Agencies' },
            { label: 'Hiring Frequency', value: 'Every 12 Hrs', desc: 'Direct Placement Drives' },
          ].map((metric, idx) => (
            <div
              key={idx}
              className="bg-white/95 rounded-2xl p-4 text-center border-2 border-white/90 hover:border-[#3869C3] shadow-sm hover:shadow-md transition-all text-[#1E428E]"
            >
              <div className="text-xl sm:text-2xl font-extrabold text-[#3869C3] font-display">
                {metric.value}
              </div>
              <div className="text-xs font-bold text-[#1E428E] mt-0.5">{metric.label}</div>
              <div className="text-[11px] text-[#1E428E]/70 mt-0.5">{metric.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
