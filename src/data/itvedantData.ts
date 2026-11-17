import { BELVO_MAIN_COURSES } from './belvoCoursesData';

export interface ITvedantCourse {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  category: string;
  categoryLabel: string;
  duration: string;
  mode: string;
  level: string;
  certification: string;
  rating: number;
  reviewCount: number;
  projectsCount: number;
  highestPackage: string;
  avgPackage: string;
  badge?: string;
  summary: string;
  description: string;
  toolsCovered: string[];
  keyHighlights: string[];
  careerRoles: string[];
  eligibility: string;
  curriculum: {
    moduleNumber: number;
    title: string;
    duration: string;
    topics: string[];
    skillsGained: string;
  }[];
  capstoneProjects: {
    title: string;
    description: string;
    tools: string[];
  }[];
  emiStartsAt: string;
  fee: number;
  originalFee: number;
  nextBatch: string;
}

export interface PlacedStudent {
  id: string;
  name: string;
  photoUrl: string;
  course: string;
  courseCategory: string;
  role: string;
  company: string;
  companyLogoUrl?: string;
  packageLPA: number;
  previousBackground: string;
  transitionType: 'Non-IT to IT' | 'Fresher' | 'Career Gap' | 'Domain Switch' | 'Upskilling';
  year: number;
  quote?: string;
  linkedinUrl?: string;
}

export interface CenterLocation {
  id: string;
  city: string;
  name: string;
  isHeadOffice?: boolean;
  address: string;
  landmark: string;
  contactNumber: string;
  email: string;
  metroStation: string;
  timing: string;
  features: string[];
  imageUrl: string;
  mapEmbedQuery: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  course: string;
  avatarUrl: string;
  rating: number;
  reviewDate: string;
  reviewText: string;
  platform: 'Google' | 'LinkedIn' | 'MouthShut';
  verified: boolean;
}

export const ITV_STATS = {
  yearsOfExcellence: '14+',
  studentsTrained: '40,000+',
  hiringPartners: '2,000+',
  highestPackage: '₹30 LPA',
  averagePackage: '₹6.8 LPA',
  placementRate: '98.4%',
  googleRating: '4.8',
  googleReviewCount: '5,280+',
  centersCount: '6+',
  practicalRatio: '80% Practical | 20% Theory',
  phone: '+91 89284 66820',
  whatsapp: '+91 89284 66820',
  email: 'mail@itvedant.com',
  headOfficeAddress: 'No. 18, 4th Floor, Kerom Building, MIDC Road, Next to State Bank of India, Near Toyota Showroom, Wagle Industrial Estate, Thane West, Maharashtra 400604',
};

export const HIRING_PARTNERS = [
  { name: 'Microsoft', logoText: 'Microsoft', category: 'Tech Giant' },
  { name: 'Amazon', logoText: 'amazon', category: 'Tech Giant' },
  { name: 'TCS', logoText: 'TATA CONSULTANCY SERVICES', category: 'IT Services' },
  { name: 'Infosys', logoText: 'Infosys', category: 'IT Services' },
  { name: 'Capgemini', logoText: 'Capgemini', category: 'IT Services' },
  { name: 'Accenture', logoText: 'accenture', category: 'Consulting' },
  { name: 'Wipro', logoText: 'wipro', category: 'IT Services' },
  { name: 'Cognizant', logoText: 'cognizant', category: 'IT Services' },
  { name: 'IBM', logoText: 'IBM', category: 'Tech Giant' },
  { name: 'Deloitte', logoText: 'Deloitte', category: 'Consulting' },
  { name: 'Tech Mahindra', logoText: 'Tech Mahindra', category: 'IT Services' },
  { name: 'LTIMindtree', logoText: 'LTIMindtree', category: 'IT Services' },
  { name: 'Hexaware', logoText: 'hexaware', category: 'IT Services' },
  { name: 'HCLTech', logoText: 'HCLTech', category: 'IT Services' },
  { name: 'Persistent', logoText: 'Persistent', category: 'Product & Tech' },
  { name: 'JPMorgan Chase', logoText: 'J.P. Morgan', category: 'FinTech' },
];

const LEGACY_ITV_COURSES: ITvedantCourse[] = [
  {
    id: 'itv_data_science_ai',
    slug: 'data-science-analytics-ai',
    title: 'Master in Data Science and Analytics with AI',
    shortTitle: 'Data Science & AI Master',
    category: 'data-science',
    categoryLabel: 'Data Science & AI',
    duration: '8 Months',
    mode: 'Classroom & Online Live',
    level: 'Beginner to Advanced',
    certification: 'Dual Certification (ITvedant + NSDC Skill India)',
    rating: 4.9,
    reviewCount: 1420,
    projectsCount: 35,
    highestPackage: '₹30 LPA',
    avgPackage: '₹7.5 LPA',
    badge: 'Most Popular Flagship',
    summary: 'Master Python, Machine Learning, Deep Learning, Generative AI, Power BI, SQL, Tableau, and Big Data with 35+ real-world industry projects and 100% placement assurance.',
    description: 'The Master in Data Science and Analytics with AI is ITvedant\'s crown-jewel career transformation program. Specially structured for non-programmers, freshers, and experienced professionals, this curriculum takes you from foundation statistics and Python all the way to advanced Deep Learning, LLMs, and Generative AI applications. Every module is paired with practical assignments and end-to-end industry datasets from healthcare, finance, e-commerce, and logistics.',
    toolsCovered: ['Python', 'SQL', 'Power BI', 'Tableau', 'Pandas', 'NumPy', 'Scikit-Learn', 'TensorFlow', 'Keras', 'OpenCV', 'Generative AI', 'ChatGPT API', 'LangChain', 'AWS Cloud', 'Git & GitHub'],
    keyHighlights: [
      '100% Placement Support with Unlimited Interview Calls',
      'Dual Certification from ITvedant & NSDC (Govt of India)',
      '35+ Live Practical Projects & 2 Capstone Industry Deployments',
      'Dedicated 1-on-1 AI Mentorship & Code Reviews',
      '15+ Technical & HR Mock Interviews with Senior Data Scientists',
      'Free Access to Data Science Practice Sandbox & Cloud GPUs',
    ],
    careerRoles: ['Data Scientist', 'Data Analyst', 'Business Intelligence Analyst', 'Machine Learning Engineer', 'AI Specialist', 'Data Engineer'],
    eligibility: 'Any Graduate (BE / B.Tech / B.Sc / BCA / MCA / B.Com / BBA / BA) or Working Professional. No prior coding experience required.',
    curriculum: [
      {
        moduleNumber: 1,
        title: 'Core Python & Object-Oriented Programming',
        duration: '4 Weeks',
        topics: ['Data Structures & Algorithms in Python', 'Functions, Modules & Packages', 'OOPs Concepts', 'Exception Handling & File I/O', 'Web Scraping with BeautifulSoup'],
        skillsGained: 'Clean coding practices, automation scripts, and problem solving.'
      },
      {
        moduleNumber: 2,
        title: 'Relational Databases & Advanced SQL for Analytics',
        duration: '4 Weeks',
        topics: ['PostgreSQL & MySQL Mastery', 'Complex Joins, Subqueries & CTEs', 'Window Functions & Aggregations', 'Database Indexing & Query Optimization', 'Connecting Python to SQL'],
        skillsGained: 'Extracting, transforming, and querying enterprise data warehouses.'
      },
      {
        moduleNumber: 3,
        title: 'Data Analysis, Wrangling & Exploratory Data Analysis (EDA)',
        duration: '5 Weeks',
        topics: ['NumPy Numerical Computing', 'Pandas DataFrame Manipulation', 'Data Cleaning & Handling Missing Values', 'Matplotlib & Seaborn Visualizations', 'Exploratory Data Analysis (EDA) Frameworks'],
        skillsGained: 'Turning messy, complex real-world data into structured analytical insights.'
      },
      {
        moduleNumber: 4,
        title: 'Business Intelligence & Dashboards (Power BI & Tableau)',
        duration: '4 Weeks',
        topics: ['Power BI Desktop & Power Query', 'DAX Formulas & Calculated Columns', 'Interactive KPI Dashboards', 'Tableau Storyboards & Calculations', 'Executive Presentation Techniques'],
        skillsGained: 'Designing high-impact corporate reporting systems and executive cockpits.'
      },
      {
        moduleNumber: 5,
        title: 'Machine Learning & Predictive Modeling',
        duration: '6 Weeks',
        topics: ['Supervised Learning (Regression & Classification)', 'Ensemble Methods (Random Forest, XGBoost)', 'Unsupervised Learning (K-Means, PCA)', 'Model Hyperparameter Tuning & Cross-Validation', 'Scikit-Learn Production Pipelines'],
        skillsGained: 'Building predictive algorithms for churn, fraud detection, and recommendation engines.'
      },
      {
        moduleNumber: 6,
        title: 'Deep Learning, NLP & Generative AI',
        duration: '5 Weeks',
        topics: ['Neural Networks & Backpropagation', 'Computer Vision with CNNs', 'Natural Language Processing (NLP) & Transformers', 'Prompt Engineering & LangChain', 'Building Generative AI Chatbots with OpenAI & Gemini API'],
        skillsGained: 'Deploying state-of-the-art AI systems and LLM workflows.'
      },
      {
        moduleNumber: 7,
        title: 'Industry Capstone Projects & Placement Acceleration',
        duration: '4 Weeks',
        topics: ['Live Cloud Deployment on AWS / Streamlit', 'GitHub Portfolio Polishing', '15+ Mock Technical Interviews', 'Soft Skills & HR Grooming', 'Direct On-Campus Placement Drives'],
        skillsGained: 'Job-ready portfolio and high confidence during MNC technical rounds.'
      },
    ],
    capstoneProjects: [
      {
        title: 'E-Commerce Customer Churn Prediction & Retention Engine',
        description: 'Analyzed 500,000+ consumer transactions, implemented XGBoost classification with 94.2% precision, and built an automated churn alert dashboard in Power BI.',
        tools: ['Python', 'XGBoost', 'Power BI', 'SQL']
      },
      {
        title: 'Generative AI Customer Support Copilot with RAG',
        description: 'Engineered an intelligent Retrieval-Augmented Generation (RAG) assistant using LangChain, Vector Embeddings (Pinecone), and LLM API for an enterprise knowledgebase.',
        tools: ['Python', 'LangChain', 'OpenAI API', 'Vector DB', 'Streamlit']
      },
      {
        title: 'Healthcare Disease Diagnosis using Computer Vision',
        description: 'Trained Convolutional Neural Networks on chest X-ray radiographs with TensorFlow, achieving 96% diagnostic accuracy and integrated into a fast web UI.',
        tools: ['TensorFlow', 'OpenCV', 'Keras', 'Flask']
      }
    ],
    emiStartsAt: '₹5,499/mo',
    fee: 79999,
    originalFee: 110000,
    nextBatch: 'Starting this Monday',
  },
  {
    id: 'itv_fullstack_dev',
    slug: 'full-stack-web-development',
    title: 'Full Stack Web Development Master Program',
    shortTitle: 'Full Stack Web Dev (MERN)',
    category: 'full-stack',
    categoryLabel: 'Full Stack Development',
    duration: '7 Months',
    mode: 'Classroom & Online Live',
    level: 'Beginner to Advanced',
    certification: 'Dual Certification (ITvedant + NSDC Skill India)',
    rating: 4.8,
    reviewCount: 1210,
    projectsCount: 25,
    highestPackage: '₹22 LPA',
    avgPackage: '₹6.5 LPA',
    badge: 'High Hiring Demand',
    summary: 'Become an industry-ready Full Stack Software Engineer with React, Node.js, Express, MongoDB, Next.js, TypeScript, REST APIs, Tailwind CSS, and cloud deployment.',
    description: 'The Full Stack Web Development Master program is engineered to make you a complete software engineer. You master both the front-end user experience and robust back-end server architecture, database modeling, and microservice APIs. Includes intensive daily coding exercises, Git workflows, pair programming, and production application deployment.',
    toolsCovered: ['HTML5 & CSS3', 'JavaScript ES6+', 'TypeScript', 'React.js', 'Next.js', 'Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'Tailwind CSS', 'Redux Toolkit', 'REST APIs', 'Docker', 'AWS EC2', 'Git & GitHub'],
    keyHighlights: [
      '100% Placement Assurance with Top IT & Product Companies',
      'NSDC & Skill India Recognized Government Certificate',
      'Build 25+ Production Applications & Scalable SaaS Platforms',
      'Daily Live Coding Labs & Debugging Workshops',
      'DSA (Data Structures & Algorithms) Training for Coding Rounds',
      'Zero-Cost EMI Financing Available',
    ],
    careerRoles: ['Full Stack Developer', 'Frontend Developer', 'Backend Developer', 'MERN Stack Engineer', 'Software Development Engineer (SDE-1)', 'JavaScript Developer'],
    eligibility: 'Freshers, Final Year Students, or Working Professionals looking to switch to high-paying software development roles.',
    curriculum: [
      {
        moduleNumber: 1,
        title: 'Modern Front-End Foundation (HTML5, Modern CSS & Responsive UI)',
        duration: '3 Weeks',
        topics: ['Semantic HTML5 & Accessibility', 'CSS Grid, Flexbox & Responsive Layouts', 'Tailwind CSS Modern Utility Framework', 'UI/UX Principles & Prototyping'],
        skillsGained: 'Crafting pixel-perfect, mobile-first web user interfaces.'
      },
      {
        moduleNumber: 2,
        title: 'Core & Modern JavaScript (ES6+) with TypeScript',
        duration: '5 Weeks',
        topics: ['Scope, Closures, Hoisting & Event Loop', 'DOM Manipulation & Browser APIs', 'Asynchronous JS, Promises & Async/Await', 'TypeScript Types, Interfaces & Generics'],
        skillsGained: 'Strong programming foundations and type-safe clean code.'
      },
      {
        moduleNumber: 3,
        title: 'Frontend Mastery with React 19 & Next.js',
        duration: '6 Weeks',
        topics: ['Components, Props, State & Hooks', 'Custom Hooks & Context API', 'Global State Management with Redux Toolkit', 'Routing & SSR with Next.js App Router', 'Performance Optimization & Web Vitals'],
        skillsGained: 'Building lightning-fast single page applications and dynamic web apps.'
      },
      {
        moduleNumber: 4,
        title: 'Server-Side Backend Architecture with Node.js & Express',
        duration: '5 Weeks',
        topics: ['Node.js Runtime & Event Driven Architecture', 'RESTful API Design & HTTP Status Codes', 'Authentication with JWT & OAuth 2.0', 'Middleware, Validation & Error Handling', 'File Uploads & Third-Party APIs'],
        skillsGained: 'Scalable backend services and secure microservice endpoints.'
      },
      {
        moduleNumber: 5,
        title: 'Database Engineering (MongoDB & PostgreSQL)',
        duration: '4 Weeks',
        topics: ['NoSQL with MongoDB & Mongoose Schema Design', 'Relational Modeling with PostgreSQL & Prisma ORM', 'Indexing, Aggregations & Query Performance', 'Database Security & ACID Transactions'],
        skillsGained: 'Data architecture for modern high-load applications.'
      },
      {
        moduleNumber: 6,
        title: 'DevOps, Cloud Deployment & Placement Preparation',
        duration: '4 Weeks',
        topics: ['Containerization with Docker', 'Deploying on AWS EC2 & Vercel', 'CI/CD Pipelines with GitHub Actions', '15+ Mock Technical & Coding Interviews', 'Campus Recruitment Drives'],
        skillsGained: 'Deploying live production software and cracking tech screening rounds.'
      },
    ],
    capstoneProjects: [
      {
        title: 'Enterprise Task & Agile Project Management Platform',
        description: 'Built a full-stack SaaS workspace with real-time WebSockets collaboration, kanban boards, role-based access control, and payment gateway.',
        tools: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'Tailwind CSS']
      },
      {
        title: 'FinTech Multi-Vendor Marketplace with Secure Checkout',
        description: 'Complete e-commerce platform with catalog filters, cart synchronization, Stripe/Razorpay checkout, order invoices, and admin analytics dashboard.',
        tools: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Tailwind']
      }
    ],
    emiStartsAt: '₹4,999/mo',
    fee: 74999,
    originalFee: 105000,
    nextBatch: 'Starting this Monday',
  },
  {
    id: 'itv_cloud_devops',
    slug: 'cloud-computing-devops-aws',
    title: 'Cloud Computing & DevOps Master Program with AWS',
    shortTitle: 'AWS Cloud & DevOps Master',
    category: 'cloud-devops',
    categoryLabel: 'Cloud & DevOps',
    duration: '6 Months',
    mode: 'Classroom & Online Live',
    level: 'Beginner to Advanced',
    certification: 'Dual Certification (ITvedant + NSDC Skill India)',
    rating: 4.9,
    reviewCount: 940,
    projectsCount: 20,
    highestPackage: '₹25 LPA',
    avgPackage: '₹7.2 LPA',
    badge: 'Highest Starting Salaries',
    summary: 'Become a certified AWS Solutions Architect and DevOps Engineer. Master Linux, AWS Core Services, Docker, Kubernetes, Terraform, Jenkins, Ansible, CI/CD, and Cloud Security.',
    description: 'Cloud and DevOps professionals are in extreme demand across global enterprises. This hands-on program transforms you into an infrastructure specialist capable of deploying, automating, and maintaining resilient high-availability cloud systems on Amazon Web Services (AWS) and modern container platforms.',
    toolsCovered: ['Linux OS & Bash Scripting', 'AWS Cloud (EC2, S3, RDS, VPC, IAM, Lambda)', 'Docker', 'Kubernetes (K8s)', 'Terraform (IaC)', 'Jenkins CI/CD', 'Ansible', 'Git', 'Prometheus & Grafana', 'SonarQube'],
    keyHighlights: [
      '100% Placement Support with Dedicated Cloud Hiring Drives',
      'AWS Solutions Architect & DevOps Curriculum Alignment',
      '20+ Real-Time Infrastructure Provisioning Projects',
      'Hands-on Multi-Cloud and Kubernetes Orchestration Labs',
      'Live CI/CD Pipeline Automation from Scratch',
      'Official NSDC Skill India Certification',
    ],
    careerRoles: ['DevOps Engineer', 'Cloud Solutions Architect', 'Site Reliability Engineer (SRE)', 'AWS Cloud Engineer', 'Build & Release Engineer', 'Linux System Administrator'],
    eligibility: 'IT Graduates, Non-IT Career Changers, SysAdmins, or Developers eager to master cloud architecture and automation.',
    curriculum: [
      {
        moduleNumber: 1,
        title: 'Linux Administration, Networking & Shell Automation',
        duration: '4 Weeks',
        topics: ['Linux File Hierarchy, Permissions & Process Management', 'TCP/IP, DNS, Subnetting & SSH', 'Bash Shell Scripting & Automated Backups', 'Package Management & Web Server Config (Nginx/Apache)'],
        skillsGained: 'Fluency in terminal, server hardening, and automation scripting.'
      },
      {
        moduleNumber: 2,
        title: 'Amazon Web Services (AWS) Core Architecture',
        duration: '6 Weeks',
        topics: ['Compute: EC2, Auto-scaling Groups & Load Balancers', 'Storage & Databases: S3, EBS, RDS & DynamoDB', 'Networking: Virtual Private Cloud (VPC), Subnets & NAT Gateway', 'Identity & Security: IAM Roles, Policies & AWS KMS', 'Serverless: AWS Lambda & API Gateway'],
        skillsGained: 'Designing highly available, fault-tolerant cloud architecture.'
      },
      {
        moduleNumber: 3,
        title: 'Containerization & Microservices with Docker',
        duration: '4 Weeks',
        topics: ['Docker Engine, Images, Containers & Registries', 'Writing Multi-Stage Dockerfiles', 'Docker Compose for Multi-Container Apps', 'Container Networking, Volumes & Best Security Practices'],
        skillsGained: 'Packaging software into reproducible lightweight containers.'
      },
      {
        moduleNumber: 4,
        title: 'Container Orchestration with Kubernetes (K8s)',
        duration: '5 Weeks',
        topics: ['K8s Architecture, Pods, Deployments & ReplicaSets', 'Services, Ingress Controllers & ConfigMaps', 'Persistent Volumes & State Management', 'Helm Charts for Package Management', 'Managed Kubernetes with AWS EKS'],
        skillsGained: 'Orchestrating enterprise microservices clusters at scale.'
      },
      {
        moduleNumber: 5,
        title: 'Infrastructure as Code (IaC) with Terraform & Ansible',
        duration: '4 Weeks',
        topics: ['Terraform Syntax, Providers & State Management', 'Modular Terraform Infrastructure on AWS', 'Configuration Management with Ansible Playbooks', 'Automating OS Patching and Fleet Provisioning'],
        skillsGained: 'Automating multi-tier cloud infrastructure with code.'
      },
      {
        moduleNumber: 6,
        title: 'Continuous Integration / Continuous Deployment (CI/CD) & Monitoring',
        duration: '4 Weeks',
        topics: ['Jenkins Pipeline as Code (Jenkinsfile)', 'GitHub Actions Workflows', 'Code Quality Scans with SonarQube', 'Metrics & Alerts with Prometheus & Grafana', 'Comprehensive Mock Interviews & Placements'],
        skillsGained: 'End-to-end automated deployment pipelines and production monitoring.'
      },
    ],
    capstoneProjects: [
      {
        title: 'Zero-Downtime Multi-Tier Microservices Deployment on AWS EKS',
        description: 'Architected automated GitOps deployment with Terraform, Docker, and Kubernetes EKS with auto-scaling and Prometheus monitoring.',
        tools: ['AWS', 'Kubernetes', 'Terraform', 'Docker', 'Prometheus']
      },
      {
        title: 'Production CI/CD Automation Pipeline with Jenkins & SonarQube',
        description: 'Built a robust automated testing and container deployment pipeline with automated rollbacks and Slack webhook notifications.',
        tools: ['Jenkins', 'Docker', 'SonarQube', 'Bash', 'AWS EC2']
      }
    ],
    emiStartsAt: '₹4,999/mo',
    fee: 74999,
    originalFee: 105000,
    nextBatch: 'Starting this Monday',
  },
  {
    id: 'itv_java_fullstack',
    slug: 'java-full-stack-developer',
    title: 'Java Full Stack Developer Master Program',
    shortTitle: 'Java Full Stack Master',
    category: 'full-stack',
    categoryLabel: 'Java Development',
    duration: '8 Months',
    mode: 'Classroom & Online Live',
    level: 'Beginner to Advanced',
    certification: 'Dual Certification (ITvedant + NSDC Skill India)',
    rating: 4.8,
    reviewCount: 1105,
    projectsCount: 22,
    highestPackage: '₹20 LPA',
    avgPackage: '₹6.2 LPA',
    badge: 'Enterprise Standard',
    summary: 'Master Core Java, Advanced Java, Spring Boot, Microservices, Hibernate, REST APIs, React Frontend, MySQL, and secure enterprise architecture with 100% placement assurance.',
    description: 'Java powers 90% of Fortune 500 enterprise software, banking backends, and global transaction systems. This comprehensive program prepares you for tier-1 IT firms (TCS, Infosys, Capgemini, Accenture, Wipro) through rigorous Java engineering from ground zero.',
    toolsCovered: ['Core Java', 'Advanced Java', 'Spring Boot', 'Spring MVC & Security', 'Hibernate & JPA', 'Microservices', 'React.js', 'MySQL', 'Postman', 'Maven', 'Git & GitHub', 'Docker'],
    keyHighlights: [
      '100% Placement Assurance with Top MNC Recruitment Drives',
      'Enterprise Banking & Financial Simulation Projects',
      'Dual Certification from ITvedant & NSDC (Govt of India)',
      'Data Structures & Algorithms (DSA) in Java Training',
      'Spring Boot Microservices & JWT Authentication',
      'Unlimited Technical Mock Interviews',
    ],
    careerRoles: ['Java Full Stack Developer', 'Java Backend Engineer', 'Spring Boot Developer', 'Software Engineer', 'Enterprise Application Consultant'],
    eligibility: 'Freshers or graduates seeking rock-solid, high-stability careers in leading IT multinationals.',
    curriculum: [
      {
        moduleNumber: 1,
        title: 'Core Java Fundamentals & OOPs Architecture',
        duration: '5 Weeks',
        topics: ['JVM, JRE & JDK Internal Architecture', 'Classes, Objects, Inheritance & Polymorphism', 'Collections Framework (Lists, Sets, Maps)', 'Exception Handling, Multithreading & Concurrency', 'Java 8+ Features (Lambdas, Streams API)'],
        skillsGained: 'Robust, object-oriented engineering skills.'
      },
      {
        moduleNumber: 2,
        title: 'Database Mastery with MySQL & JDBC',
        duration: '4 Weeks',
        topics: ['Relational Database Design & Normalization', 'Advanced SQL Queries, Triggers & Views', 'JDBC Connectivity & Connection Pooling', 'Transaction Management (ACID)'],
        skillsGained: 'High-performance database connectivity.'
      },
      {
        moduleNumber: 3,
        title: 'Hibernate ORM & Spring Framework Core',
        duration: '5 Weeks',
        topics: ['Hibernate Mapping, HQL & Criteria API', 'Spring Core, Dependency Injection (IoC)', 'Spring AOP & Bean Lifecycle', 'Spring Data JPA Repository Automation'],
        skillsGained: 'Simplified database persistence and modular inversion of control.'
      },
      {
        moduleNumber: 4,
        title: 'Spring Boot, REST APIs & Microservices',
        duration: '6 Weeks',
        topics: ['Spring Boot Starters & Auto-Configuration', 'RESTful Web Services Design & Swagger Documentation', 'Spring Security with JWT Authentication', 'Microservices Architecture with Eureka Discovery & Spring Cloud Gateway'],
        skillsGained: 'Enterprise-grade microservice backends.'
      },
      {
        moduleNumber: 5,
        title: 'Frontend with React & Full Stack Integration',
        duration: '5 Weeks',
        topics: ['React Component Lifecycle & Hooks', 'Axios HTTP Integration with Spring Boot', 'State Management & Form Validation', 'Role-Based Dashboard Creation'],
        skillsGained: 'Seamlessly connected end-to-end full stack software.'
      },
      {
        moduleNumber: 6,
        title: 'Enterprise Capstone & Placement Training',
        duration: '4 Weeks',
        topics: ['Dockerizing Java Microservices', 'MNC Coding Interview Drills & Problem Solving', '15+ Mock Technical & HR Interviews', 'Campus Placement Drives'],
        skillsGained: 'Top performance in MNC recruitment rounds.'
      },
    ],
    capstoneProjects: [
      {
        title: 'Core Banking Internet Transaction & Loan Processing System',
        description: 'Designed secure banking microservices with Spring Boot, JWT auth, loan interest calculator, and transaction ledgers.',
        tools: ['Java', 'Spring Boot', 'Spring Security', 'MySQL', 'React']
      },
      {
        title: 'Hospital Management & Telemedicine Booking Portal',
        description: 'End-to-end medical records system with appointment scheduling, doctor availability matrix, and automated notifications.',
        tools: ['Spring Boot', 'Hibernate', 'React', 'REST APIs', 'PostgreSQL']
      }
    ],
    emiStartsAt: '₹4,999/mo',
    fee: 74999,
    originalFee: 105000,
    nextBatch: 'Starting this Monday',
  },
  {
    id: 'itv_python_fullstack',
    slug: 'python-full-stack-developer',
    title: 'Python Full Stack Developer Master Program',
    shortTitle: 'Python Full Stack Master',
    category: 'full-stack',
    categoryLabel: 'Python Development',
    duration: '7 Months',
    mode: 'Classroom & Online Live',
    level: 'Beginner to Advanced',
    certification: 'Dual Certification (ITvedant + NSDC Skill India)',
    rating: 4.8,
    reviewCount: 980,
    projectsCount: 22,
    highestPackage: '₹21 LPA',
    avgPackage: '₹6.4 LPA',
    badge: 'Fastest Growing Skill',
    summary: 'Master Python, Django, FastAPI, Flask, PostgreSQL, React frontend, REST APIs, and automated cloud deployments with 100% placement support.',
    description: 'Python is known for clean syntax and extreme versatility in web development, automation, and API design. This program trains you from syntax to advanced Django and FastAPI microservice architecture integrated with modern React web interfaces.',
    toolsCovered: ['Python 3', 'Django Web Framework', 'FastAPI', 'Flask', 'PostgreSQL', 'SQLite', 'React.js', 'Tailwind CSS', 'Docker', 'Celery & Redis', 'Git & GitHub'],
    keyHighlights: [
      '100% Placement Support with Unlimited Interview Calls',
      'Dual Certification: ITvedant + NSDC Skill India',
      '22+ Real-World Full Stack Python Projects',
      'FastAPI & Django REST Framework (DRF) Mastery',
      'Asynchronous Programming & Background Queues with Celery',
      'Flexible No-Cost EMI Starting @ ₹4,999/month',
    ],
    careerRoles: ['Python Full Stack Developer', 'Python Backend Developer', 'Django Developer', 'API Engineer', 'Software Developer'],
    eligibility: 'Freshers, graduates, or professionals looking for a beginner-friendly yet highly lucrative coding career path.',
    curriculum: [
      {
        moduleNumber: 1,
        title: 'Python Essentials & Data Structures',
        duration: '4 Weeks',
        topics: ['Python Syntax, Flow Control & Functions', 'Lists, Tuples, Dictionaries & Sets', 'OOPs in Python: Classes, Inheritance & Metaclasses', 'File Handling & JSON Data Manipulation'],
        skillsGained: 'Clean, idiomatic Python code.'
      },
      {
        moduleNumber: 2,
        title: 'Database Architecture with PostgreSQL',
        duration: '4 Weeks',
        topics: ['Database Schema Design & Relationships', 'SQL Queries, Joins & Aggregations', 'Psycopg2 & Python DB-API', 'SQLAlchemy ORM Basics'],
        skillsGained: 'Persistent relational data modeling.'
      },
      {
        moduleNumber: 3,
        title: 'Full-Stack Web Development with Django',
        duration: '6 Weeks',
        topics: ['Django MVT Architecture & Project Setup', 'Django ORM Models & Migrations', 'User Authentication, Sessions & Admin Dashboard', 'Forms, Templates & Static Asset Management'],
        skillsGained: 'Rapid development of production web apps.'
      },
      {
        moduleNumber: 4,
        title: 'High-Performance APIs with Django REST Framework & FastAPI',
        duration: '5 Weeks',
        topics: ['REST API Design Principles & Serializers', 'Token Authentication & Permissions', 'FastAPI Asynchronous Endpoints & Pydantic Validation', 'Background Tasks with Celery & Redis'],
        skillsGained: 'Lightning-fast APIs for web and mobile frontends.'
      },
      {
        moduleNumber: 5,
        title: 'Frontend with React & Modern Web Tech',
        duration: '5 Weeks',
        topics: ['React Components, State & Effects', 'Consuming Python REST APIs with Axios', 'State Management & Form Handling', 'Styling with Tailwind CSS'],
        skillsGained: 'Building modern responsive client interfaces.'
      },
      {
        moduleNumber: 6,
        title: 'Deployment & Campus Placement Drives',
        duration: '4 Weeks',
        topics: ['Deploying Python Apps with Gunicorn & Nginx', 'Containerization with Docker', 'Mock Interviews & Resume Polishing', 'Campus Placement Drives'],
        skillsGained: 'Confidence in MNC and startup technical rounds.'
      },
    ],
    capstoneProjects: [
      {
        title: 'Real-Time Food Delivery & Order Tracking Web Platform',
        description: 'Built a full-stack platform with Django REST backend, React frontend, live order status updates, and customer ratings.',
        tools: ['Python', 'Django', 'React', 'PostgreSQL', 'Tailwind']
      },
      {
        title: 'High-Speed Financial Stock Analytics API with FastAPI',
        description: 'Engineered an asynchronous API processing real-time stock ticker information with Redis caching and automated alerts.',
        tools: ['FastAPI', 'Python', 'Redis', 'Docker', 'PostgreSQL']
      }
    ],
    emiStartsAt: '₹4,999/mo',
    fee: 74999,
    originalFee: 105000,
    nextBatch: 'Starting this Monday',
  },
  {
    id: 'itv_software_testing',
    slug: 'software-testing-ai-automation',
    title: 'Software Testing & QA Automation with AI Master Program',
    shortTitle: 'Software Testing & QA Automation',
    category: 'software-testing',
    categoryLabel: 'Software Testing',
    duration: '6 Months',
    mode: 'Classroom & Online Live',
    level: 'Beginner to Advanced',
    certification: 'Dual Certification (ITvedant + NSDC Skill India)',
    rating: 4.8,
    reviewCount: 890,
    projectsCount: 18,
    highestPackage: '₹18 LPA',
    avgPackage: '₹5.8 LPA',
    badge: 'Easiest IT Entry',
    summary: 'Master Manual Testing, Selenium WebDriver, Cypress, Playwright, API Testing with Postman, SQL for QA, JIRA, and AI-driven automated testing with 100% placement assistance.',
    description: 'Software Testing is one of the smoothest gateways into high-paying IT careers, especially for candidates from Non-IT, Commerce, Arts, or with career gaps. You learn end-to-end quality assurance from manual test case authoring to state-of-the-art automated testing suites and CI/CD integration.',
    toolsCovered: ['Manual Testing', 'SDLC / STLC / Agile Scrum', 'JIRA & Bugzilla', 'Selenium with Java/Python', 'Cypress', 'Playwright', 'Postman API Testing', 'RestAssured', 'SQL for QA', 'Jenkins CI/CD', 'Git & GitHub'],
    keyHighlights: [
      '100% Placement Assurance with Unlimited Interview Drives',
      'Dual Certification: ITvedant + NSDC Skill India',
      'Ideal for Non-IT Backgrounds & Career Switchers',
      '18+ Real Application Testing Projects (Banking, E-Commerce, Healthcare)',
      'API Automation & Cross-Browser Test Framework Building',
      'Daily Lab Practice with Live Mentors',
    ],
    careerRoles: ['QA Automation Engineer', 'SDET (Software Development Engineer in Test)', 'Manual Test Engineer', 'API Test Engineer', 'Quality Assurance Analyst'],
    eligibility: 'Any graduate (Non-IT, B.Com, B.Sc, BA, BE). No prior programming background necessary.',
    curriculum: [
      {
        moduleNumber: 1,
        title: 'Manual Testing, Agile Scrum & Quality Fundamentals',
        duration: '4 Weeks',
        topics: ['SDLC & STLC Phases', 'Test Scenarios & Test Case Design Techniques', 'Defect Life Cycle & Bug Reporting in JIRA', 'Agile & Scrum Ceremonies'],
        skillsGained: 'Writing comprehensive test suites and logging precise defect reports.'
      },
      {
        moduleNumber: 2,
        title: 'Database & SQL for Quality Assurance',
        duration: '3 Weeks',
        topics: ['SQL Queries, Joins & Subqueries for Backend Validation', 'Database Testing Strategies', 'Data Integrity & CRUD Verification'],
        skillsGained: 'Validating backend data consistency against front-end actions.'
      },
      {
        moduleNumber: 3,
        title: 'Automation Testing with Selenium WebDriver',
        duration: '6 Weeks',
        topics: ['Core Java / Python for Automation', 'Locators (XPath, CSS Selectors)', 'Handling Alerts, Frames, Windows & Dynamic Elements', 'TestNG / PyTest Frameworks', 'Page Object Model (POM) Design Pattern'],
        skillsGained: 'Building enterprise automated test frameworks from scratch.'
      },
      {
        moduleNumber: 4,
        title: 'Modern Web Automation with Cypress & Playwright',
        duration: '4 Weeks',
        topics: ['Cypress Architecture & Test Runner', 'Playwright Cross-Browser Testing', 'Headless Execution & Video Recordings', 'Mocking Network Requests'],
        skillsGained: 'Next-generation web application testing.'
      },
      {
        moduleNumber: 5,
        title: 'API Testing & Automation (Postman & RestAssured)',
        duration: '4 Weeks',
        topics: ['REST API Concepts & HTTP Methods', 'Postman Collections & Automated Test Scripts', 'RestAssured Java Library for API Automation', 'JSON Schema Validation & Performance Basics'],
        skillsGained: 'Validating microservices and backend API payloads.'
      },
      {
        moduleNumber: 6,
        title: 'CI/CD Integration & Placement Drives',
        duration: '3 Weeks',
        topics: ['Integrating Test Suites with Jenkins & GitHub Actions', '15+ Mock Technical & HR Interviews', 'Resume Grooming & Placement Drives'],
        skillsGained: 'Cracking QA and SDET interviews with ease.'
      },
    ],
    capstoneProjects: [
      {
        title: 'End-to-End Automation Framework for Banking Portal',
        description: 'Designed a hybrid data-driven and Page Object Model automation framework in Selenium Java with Extent Reports and Jenkins execution.',
        tools: ['Selenium', 'Java', 'TestNG', 'Maven', 'Jenkins']
      },
      {
        title: 'Automated REST API Test Suite for E-Commerce Platform',
        description: 'Built automated test collection in Postman with dynamic pre-request scripts, environment tokens, and Newman command-line reporting.',
        tools: ['Postman', 'Newman', 'JavaScript', 'REST APIs']
      }
    ],
    emiStartsAt: '₹4,499/mo',
    fee: 64999,
    originalFee: 90000,
    nextBatch: 'Starting this Monday',
  },
  {
    id: 'itv_cyber_security',
    slug: 'cyber-security-ethical-hacking',
    title: 'Cyber Security & Ethical Hacking Master Program with AI',
    shortTitle: 'Cyber Security & Ethical Hacking',
    category: 'cyber-security',
    categoryLabel: 'Cyber Security',
    duration: '6 Months',
    mode: 'Classroom & Online Live',
    level: 'Beginner to Advanced',
    certification: 'Dual Certification (ITvedant + NSDC Skill India)',
    rating: 4.9,
    reviewCount: 760,
    projectsCount: 16,
    highestPackage: '₹24 LPA',
    avgPackage: '₹7.0 LPA',
    badge: 'Critical Defense Skill',
    summary: 'Master Network Security, Ethical Hacking, Web App Penetration Testing, SOC Analysis, Kali Linux, Wireshark, Metasploit, and Incident Response with 100% placement support.',
    description: 'With cyber attacks surging worldwide, companies are heavily recruiting security analysts. This course trains you in offensive and defensive security tactics, vulnerability analysis, and SIEM monitoring to protect enterprise IT infrastructure.',
    toolsCovered: ['Kali Linux', 'Wireshark', 'Nmap', 'Burp Suite', 'Metasploit', 'OWASP Top 10', 'Splunk SIEM', 'Snort IDS/IPS', 'Cryptography', 'Python for Security'],
    keyHighlights: [
      '100% Placement Support with Dedicated Security Hiring Drives',
      'Dual Certification: ITvedant + NSDC Skill India',
      'Hands-on Ethical Hacking in Isolated Cyber Lab Ranges',
      'Web Application Penetration Testing (OWASP Top 10)',
      'SOC Analyst Tier-1 Training with Splunk',
      '1-on-1 Mentorship from Certified Ethical Hackers',
    ],
    careerRoles: ['Cyber Security Analyst', 'SOC Analyst (L1/L2)', 'Ethical Hacker / Pen Tester', 'Information Security Officer', 'Network Security Engineer'],
    eligibility: 'Graduates or professionals passionate about computer networks, privacy, and defense.',
    curriculum: [
      {
        moduleNumber: 1,
        title: 'Networking Fundamentals & Linux for Hackers',
        duration: '4 Weeks',
        topics: ['TCP/IP Model, OSI 7 Layers & Routing Protocols', 'DNS, DHCP, Firewalls & VPNs', 'Kali Linux Commands & File System Security', 'Network Traffic Analysis with Wireshark'],
        skillsGained: 'Deep understanding of packets, networks, and operating systems.'
      },
      {
        moduleNumber: 2,
        title: 'Information Gathering, Scanning & Vulnerability Assessment',
        duration: '4 Weeks',
        topics: ['Passive & Active Reconnaissance', 'Network Scanning with Nmap', 'Vulnerability Scanning with Nessus & OpenVAS', 'Social Engineering Vectors'],
        skillsGained: 'Discovering unpatched vulnerabilities in target networks.'
      },
      {
        moduleNumber: 3,
        title: 'Web Application Penetration Testing (OWASP Top 10)',
        duration: '6 Weeks',
        topics: ['SQL Injection (SQLi) & Cross-Site Scripting (XSS)', 'Broken Authentication & Access Controls', 'Burp Suite Pro Techniques & Request Interception', 'API Security Testing'],
        skillsGained: 'Securing web applications against real-world exploits.'
      },
      {
        moduleNumber: 4,
        title: 'System Hacking, Exploitation & Privilege Escalation',
        duration: '4 Weeks',
        topics: ['Exploitation Frameworks (Metasploit)', 'Password Cracking with John the Ripper & Hashcat', 'Privilege Escalation on Windows & Linux', 'Malware Analysis Fundamentals'],
        skillsGained: 'Simulating attacker tactics to build bulletproof defenses.'
      },
      {
        moduleNumber: 5,
        title: 'Security Operations Center (SOC) & SIEM Monitoring',
        duration: '4 Weeks',
        topics: ['SIEM Architecture with Splunk', 'Log Analysis & Threat Hunting', 'Incident Response Playbooks', 'Firewalls & IDS/IPS Configuration with Snort'],
        skillsGained: 'Monitoring enterprise traffic and resolving security incidents.'
      },
      {
        moduleNumber: 6,
        title: 'Compliance, Mock Interviews & Placement Drives',
        duration: '3 Weeks',
        topics: ['ISO 27001, GDPR & PCI-DSS Compliance', 'Technical Security Interview Rounds', 'Resume Optimization & Campus Hiring Drives'],
        skillsGained: 'Landing coveted cybersecurity analyst roles.'
      },
    ],
    capstoneProjects: [
      {
        title: 'Comprehensive Web App Penetration Test & Vulnerability Report',
        description: 'Conducted authorized black-box security audit against enterprise portal, identified 7 critical vulnerabilities, and compiled remediation blueprint.',
        tools: ['Burp Suite', 'Nmap', 'SQLMap', 'OWASP Top 10']
      },
      {
        title: 'Enterprise SOC Incident Detection with Splunk SIEM',
        description: 'Built custom Splunk dashboards to detect brute force attempts, port scans, and suspicious privilege escalations in real time.',
        tools: ['Splunk', 'Wireshark', 'Linux', 'Snort']
      }
    ],
    emiStartsAt: '₹4,999/mo',
    fee: 74999,
    originalFee: 105000,
    nextBatch: 'Starting this Monday',
  },
  {
    id: 'itv_digital_marketing',
    slug: 'digital-marketing-growth-ai',
    title: 'Digital Marketing & Growth Strategy with AI Master Program',
    shortTitle: 'Digital Marketing & AI Growth',
    category: 'digital-marketing',
    categoryLabel: 'Digital Marketing',
    duration: '5 Months',
    mode: 'Classroom & Online Live',
    level: 'Beginner to Advanced',
    certification: 'Dual Certification (ITvedant + NSDC Skill India)',
    rating: 4.8,
    reviewCount: 650,
    projectsCount: 15,
    highestPackage: '₹14 LPA',
    avgPackage: '₹5.2 LPA',
    badge: 'Creative & Analytical',
    summary: 'Master Performance Marketing, SEO, Google Ads, Meta Ads, GA4, Content Marketing, Social Media Strategy, and AI Content Tools with 100% placement support.',
    description: 'Modern digital marketing requires data analytics, performance ad spending, and Generative AI copywriting. This program teaches you to generate real business revenue with Google Ads, Meta Ads Manager, advanced SEO, and conversion rate optimization.',
    toolsCovered: ['Google Ads', 'Meta Ads Manager', 'Google Analytics 4 (GA4)', 'Search Console', 'Ahrefs / SEMrush', 'WordPress & Shopify', 'Canva', 'ChatGPT & Midjourney', 'Email Marketing (Mailchimp)', 'HubSpot CRM'],
    keyHighlights: [
      '100% Placement Support with Top Marketing Agencies & Brands',
      'Dual Certification: ITvedant + NSDC Skill India + Google Certifications',
      'Manage Real Live Ad Budgets during Training',
      'AI-Powered SEO & Copywriting Workflows',
      'Conversion Rate Optimization (CRO) & Funnel Design',
      '1-on-1 Mentor Guidance & Mock Pitch Sessions',
    ],
    careerRoles: ['Performance Marketing Specialist', 'SEO Strategist', 'Digital Marketing Manager', 'Social Media Specialist', 'Growth Marketer', 'Content Strategist'],
    eligibility: 'Any graduate (B.Com, BBA, BA, B.Sc, Engineers) or creative individuals aiming for marketing careers.',
    curriculum: [
      {
        moduleNumber: 1,
        title: 'Digital Marketing Foundations & Website Architecture',
        duration: '3 Weeks',
        topics: ['Inbound vs Outbound Marketing', 'WordPress & Landing Page Design', 'Domain, Hosting, SSL & Tracking Pixels', 'Consumer Psychology & Funnel Strategy'],
        skillsGained: 'Building high-converting digital storefronts and landing pages.'
      },
      {
        moduleNumber: 2,
        title: 'Search Engine Optimization (SEO) & AI Content Strategy',
        duration: '4 Weeks',
        topics: ['Keyword Research with SEMrush & Ahrefs', 'On-Page, Technical & Off-Page SEO', 'Backlink Building Strategies', 'AI-Assisted SEO Content Generation', 'Google Search Console & Algorithm Updates'],
        skillsGained: 'Ranking #1 on Google for high-intent commercial keywords.'
      },
      {
        moduleNumber: 3,
        title: 'Performance Advertising (Google Ads & Search Marketing)',
        duration: '4 Weeks',
        topics: ['Google Search Ads, Display Network & YouTube Video Ads', 'Bidding Strategies & Quality Score Optimization', 'Remarketing Campaigns & Lead Generation', 'Live Ad Budget Execution'],
        skillsGained: 'Generating profitable return on ad spend (ROAS) on Google.'
      },
      {
        moduleNumber: 4,
        title: 'Social Media Marketing (Meta Ads & Growth Strategy)',
        duration: '4 Weeks',
        topics: ['Meta Ads Manager (Facebook & Instagram)', 'Custom Audiences, Lookalikes & Pixel Tracking', 'LinkedIn B2B Advertising', 'Creative Testing & Viral Content Strategy'],
        skillsGained: 'Scaling paid acquisition across Instagram, Facebook, and LinkedIn.'
      },
      {
        moduleNumber: 5,
        title: 'Web Analytics (GA4), CRM & Email Automation',
        duration: '3 Weeks',
        topics: ['Google Analytics 4 (GA4) Custom Events & Funnels', 'Email Marketing Automation with Mailchimp', 'HubSpot Inbound Lead Nurturing', 'Marketing Attribution Modeling'],
        skillsGained: 'Measuring metrics, lifetime value (LTV), and automated sales pipelines.'
      },
      {
        moduleNumber: 6,
        title: 'Agency Pitching, Mock Interviews & Placement Drives',
        duration: '3 Weeks',
        topics: ['Portfolio Presentation of Live Campaigns', 'Technical & Client Pitch Mock Rounds', 'Resume Optimization & Placement Drives'],
        skillsGained: 'Landing roles in agencies, D2C brands, and tech companies.'
      },
    ],
    capstoneProjects: [
      {
        title: 'Live D2C Brand Acquisition Campaign with 4.2x ROAS',
        description: 'Executed end-to-end Meta & Google ad campaigns for an e-commerce brand, generating ₹4.20 in revenue for every ₹1.00 spent.',
        tools: ['Meta Ads', 'Google Ads', 'GA4', 'Shopify']
      },
      {
        title: 'Organic Traffic Scaling Case Study: 0 to 50k Monthly Visitors',
        description: 'Conducted full technical audit, implemented on-page topic clusters, and generated 50k+ monthly organic visitors in 90 days.',
        tools: ['SEMrush', 'Google Search Console', 'Ahrefs', 'WordPress']
      }
    ],
    emiStartsAt: '₹3,999/mo',
    fee: 59999,
    originalFee: 85000,
    nextBatch: 'Starting this Monday',
  },
];

export const ITV_COURSES: ITvedantCourse[] = [...BELVO_MAIN_COURSES, ...LEGACY_ITV_COURSES];

export const PLACED_STUDENTS: PlacedStudent[] = [
  {
    id: 'pl_1',
    name: 'Sakshi Patil',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    course: 'Master in Data Science and Analytics with AI',
    courseCategory: 'Data Science & AI',
    role: 'Data Analyst',
    company: 'Capgemini',
    packageLPA: 7.2,
    previousBackground: 'B.Sc Botany (Non-IT Fresher)',
    transitionType: 'Non-IT to IT',
    year: 2026,
    quote: 'Coming from a pure biology background, I was intimidated by coding. ITvedant mentors taught Python and SQL from absolute basics. Today I am a proud Data Analyst at Capgemini!',
  },
  {
    id: 'pl_2',
    name: 'Rohit Sharma',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    course: 'Full Stack Web Development Master Program',
    courseCategory: 'Full Stack Development',
    role: 'Full Stack Developer',
    company: 'Tech Mahindra',
    packageLPA: 6.8,
    previousBackground: 'BE Mechanical Engineering',
    transitionType: 'Domain Switch',
    year: 2026,
    quote: 'After 2 years in a low-paying mechanical factory, ITvedant helped me pivot to software engineering. The 25+ real projects gave me extreme confidence in technical interviews.',
  },
  {
    id: 'pl_3',
    name: 'Ananya Deshmukh',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    course: 'Cloud Computing & DevOps Master Program with AWS',
    courseCategory: 'Cloud & DevOps',
    role: 'AWS Cloud Engineer',
    company: 'LTIMindtree',
    packageLPA: 8.5,
    previousBackground: 'B.Tech IT (Fresher with 0 Experience)',
    transitionType: 'Fresher',
    year: 2026,
    quote: 'College only taught theory. ITvedant gave me hands-on Linux, Terraform, Docker, and AWS labs. I cleared LTIMindtree in my very first campus placement drive.',
  },
  {
    id: 'pl_4',
    name: 'Vishal Verma',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    course: 'Master in Data Science and Analytics with AI',
    courseCategory: 'Data Science & AI',
    role: 'Data Scientist',
    company: 'Accenture',
    packageLPA: 10.0,
    previousBackground: 'B.Com (Commerce Graduate)',
    transitionType: 'Non-IT to IT',
    year: 2026,
    quote: 'People told me commerce students cannot enter Data Science. ITvedant proved everyone wrong. The Machine Learning and Deep Learning modules made all the difference.',
  },
  {
    id: 'pl_5',
    name: 'Sneha Kulkarni',
    photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    course: 'Software Testing & QA Automation with AI',
    courseCategory: 'Software Testing',
    role: 'SDET Automation Engineer',
    company: 'Cognizant',
    packageLPA: 7.5,
    previousBackground: 'Manual Tester with 3-year gap',
    transitionType: 'Career Gap',
    year: 2026,
    quote: 'I had a 3-year career break after marriage. ITvedant career coaches worked on my confidence, taught Selenium and API automation, and helped me relaunch my career with a 130% hike!',
  },
  {
    id: 'pl_6',
    name: 'Pranav Nair',
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    course: 'Java Full Stack Developer Master Program',
    courseCategory: 'Java Development',
    role: 'Java Software Engineer',
    company: 'Infosys',
    packageLPA: 6.5,
    previousBackground: 'BCA Graduate',
    transitionType: 'Fresher',
    year: 2026,
    quote: 'Spring Boot, Microservices, and DSA training at ITvedant Thane center were top-notch. I received two offer letters within 3 weeks of course completion.',
  },
  {
    id: 'pl_7',
    name: 'Harish Patel',
    photoUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80',
    course: 'Python Full Stack Developer Master Program',
    courseCategory: 'Python Development',
    role: 'Python Developer',
    company: 'Wipro',
    packageLPA: 7.0,
    previousBackground: 'BE Civil Engineering',
    transitionType: 'Non-IT to IT',
    year: 2026,
    quote: 'From construction site supervisor to Wipro software engineer! ITvedant made this transition seamless with personal mentors and daily problem-solving sessions.',
  },
  {
    id: 'pl_8',
    name: 'Pooja Shinde',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    course: 'Cyber Security & Ethical Hacking Master Program',
    courseCategory: 'Cyber Security',
    role: 'Cyber Security SOC Analyst',
    company: 'Deloitte',
    packageLPA: 9.0,
    previousBackground: 'B.Sc Computer Science',
    transitionType: 'Upskilling',
    year: 2026,
    quote: 'The hands-on Kali Linux, Splunk SIEM, and OWASP labs were exactly what Deloitte interviewers asked about. Truly thankful to ITvedant faculty.',
  },
  {
    id: 'pl_9',
    name: 'Aditya Joshi',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    course: 'Master in Data Science and Analytics with AI',
    courseCategory: 'Data Science & AI',
    role: 'BI & Analytics Consultant',
    company: 'TCS',
    packageLPA: 8.0,
    previousBackground: 'BBA Marketing',
    transitionType: 'Domain Switch',
    year: 2026,
    quote: 'Power BI and SQL knowledge from ITvedant allowed me to step directly into an enterprise analytics role at Tata Consultancy Services.',
  },
  {
    id: 'pl_10',
    name: 'Meera Iyer',
    photoUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80',
    course: 'Digital Marketing & Growth Strategy with AI',
    courseCategory: 'Digital Marketing',
    role: 'Growth Marketing Lead',
    company: 'Nykaa',
    packageLPA: 6.8,
    previousBackground: 'BA English Literature',
    transitionType: 'Non-IT to IT',
    year: 2026,
    quote: 'Running live ad budgets during class gave me the exact portfolio Nykaa was hunting for. Best investment in my career!',
  },
  {
    id: 'pl_11',
    name: 'Tanmay Kulkarni',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    course: 'Cloud Computing & DevOps Master Program with AWS',
    courseCategory: 'Cloud & DevOps',
    role: 'DevOps Engineer',
    company: 'Persistent Systems',
    packageLPA: 9.5,
    previousBackground: 'B.Sc Electronics',
    transitionType: 'Domain Switch',
    year: 2026,
    quote: 'The Kubernetes and Terraform projects helped me beat candidates with 3+ years experience. Placement team set up 6 interviews for me!',
  },
  {
    id: 'pl_12',
    name: 'Ritika Sen',
    photoUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
    course: 'Master in Data Science and Analytics with AI',
    courseCategory: 'Data Science & AI',
    role: 'Machine Learning Specialist',
    company: 'Amazon',
    packageLPA: 16.5,
    previousBackground: 'B.E Electronics & Telecommunication',
    transitionType: 'Upskilling',
    year: 2026,
    quote: 'Cracking an Amazon technical interview requires deep intuition in algorithms and data structures. ITvedant mentorship was pivotal.',
  },
];

export const CLASSROOM_CENTERS: CenterLocation[] = [
  {
    id: 'center_thane',
    city: 'Mumbai / Thane',
    name: 'Thane Head Office & Main Campus',
    isHeadOffice: true,
    address: 'No. 18, 4th Floor, Kerom Building, MIDC Road, Next to State Bank of India, Near Toyota Showroom, Wagle Industrial Estate, Thane West, Maharashtra 400604',
    landmark: 'Opposite State Bank of India, Wagle Estate',
    contactNumber: '+91 89284 66820',
    email: 'thane@itvedant.com',
    metroStation: 'Thane Railway Station (10 mins) / Mulund Check Naka',
    timing: 'Monday to Sunday: 8:00 AM – 8:30 PM',
    features: ['Headquarters & Placement Hub', '4 Dedicated High-Speed Computer Labs', '1-on-1 Mentor Counseling Rooms', 'Air-Conditioned Smart Classrooms', 'Cafeteria & Discussion Lounge'],
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
    mapEmbedQuery: 'Wagle+Industrial+Estate+Thane+Kerom+Building',
  },
  {
    id: 'center_andheri',
    city: 'Mumbai',
    name: 'Andheri West & East Hub',
    address: '3rd Floor, Vertex Vikas Building, Above Metro Station Exit 2, Andheri-Kurla Road, Andheri East, Mumbai, Maharashtra 400069',
    landmark: 'Directly Connected to Andheri Metro & Railway Station',
    contactNumber: '+91 89284 66820',
    email: 'andheri@itvedant.com',
    metroStation: 'Andheri Metro Station (2 mins walking)',
    timing: 'Monday to Sunday: 8:00 AM – 8:30 PM',
    features: ['Prime Western Suburbs Location', '3 Modern Lab Studios', 'Direct Metro Connectivity', 'Weekend Working Professional Batches', 'Student Study Zone'],
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    mapEmbedQuery: 'Andheri+Kurla+Road+Metro+Mumbai',
  },
  {
    id: 'center_navi_mumbai',
    city: 'Navi Mumbai',
    name: 'Navi Mumbai (Vashi Campus)',
    address: '5th Floor, Real Tech Park, Sector 30A, Near Vashi Railway Station, Vashi, Navi Mumbai, Maharashtra 400703',
    landmark: 'Behind Inorbit Mall, Vashi',
    contactNumber: '+91 89284 66820',
    email: 'vashi@itvedant.com',
    metroStation: 'Vashi Railway Station (3 mins walking)',
    timing: 'Monday to Sunday: 8:00 AM – 8:30 PM',
    features: ['Dedicated Harbor Line Hub', 'Corporate Tech Park Campus', 'High-Speed Fiber Network', 'Interview Grooming Suite', 'Free Parking Available'],
    imageUrl: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80',
    mapEmbedQuery: 'Real+Tech+Park+Vashi+Navi+Mumbai',
  },
  {
    id: 'center_pune_fc',
    city: 'Pune',
    name: 'Pune Campus (FC Road / Shivajinagar)',
    address: 'Office No. 401, 4th Floor, Deccan Heights, Opposite Fergusson College Gate No. 3, FC Road, Shivajinagar, Pune, Maharashtra 411005',
    landmark: 'Opposite FC College Main Gate',
    contactNumber: '+91 89284 66820',
    email: 'pune@itvedant.com',
    metroStation: 'Shivajinagar Metro Station (5 mins)',
    timing: 'Monday to Sunday: 8:00 AM – 8:30 PM',
    features: ['Pune Education Hub Landmark', '3 Computer Labs with Dual Screens', 'Hackathon & Project Showcase Hall', 'Daily Doubt Clearance Desk', 'Central Pune Transit Access'],
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
    mapEmbedQuery: 'Fergusson+College+Road+Shivajinagar+Pune',
  },
  {
    id: 'center_pune_pimpri',
    city: 'Pune',
    name: 'Pune Campus (Pimpri Chinchwad)',
    address: '2nd Floor, Premier Plaza Mall, Old Mumbai-Pune Highway, Chinchwad, Pune, Maharashtra 411019',
    landmark: 'Premier Plaza, Above Croma Store',
    contactNumber: '+91 89284 66820',
    email: 'pimpri@itvedant.com',
    metroStation: 'Pimpri Metro Station (walking distance)',
    timing: 'Monday to Sunday: 8:00 AM – 8:30 PM',
    features: ['Serving PCMC & Talawade IT Park', 'Equipped Cloud & AI Lab', 'Industry Mentor Masterclasses', 'Air Conditioned Classrooms'],
    imageUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80',
    mapEmbedQuery: 'Premier+Plaza+Chinchwad+Pune',
  },
  {
    id: 'center_nagpur',
    city: 'Nagpur',
    name: 'Nagpur Campus (Dharampeth)',
    address: '3rd Floor, Prime Arcade, West High Court Road, Dharampeth, Nagpur, Maharashtra 440010',
    landmark: 'Opposite Coffee House, Dharampeth',
    contactNumber: '+91 89284 66820',
    email: 'nagpur@itvedant.com',
    metroStation: 'Dharampeth Metro Station',
    timing: 'Monday to Sunday: 8:30 AM – 8:00 PM',
    features: ['Vidarbha Regional Training Hub', 'State-of-the-Art Coding Desks', 'Local Corporate Tie-ups', 'Full Placement Assistance'],
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    mapEmbedQuery: 'Dharampeth+West+High+Court+Road+Nagpur',
  },
];

export const REFER_EARN_PROGRAMS = [
  {
    courseName: 'Master in Data Science and Analytics with AI',
    category: 'Data Science & AI',
    voucherAmount: 5000,
    voucherLabel: '₹5,000 Amazon Voucher',
    courseDuration: '8 Months',
    badge: 'Highest Reward',
  },
  {
    courseName: 'Full Stack Web Development Master Program (MERN & Python)',
    category: 'Full Stack Development',
    voucherAmount: 4000,
    voucherLabel: '₹4,000 Amazon Voucher',
    courseDuration: '7 Months',
    badge: 'Popular Referral',
  },
  {
    courseName: 'Cloud Computing & DevOps Master Program with AWS',
    category: 'Cloud & DevOps',
    voucherAmount: 3500,
    voucherLabel: '₹3,500 Amazon Voucher',
    courseDuration: '6 Months',
    badge: 'In High Demand',
  },
  {
    courseName: 'Java Full Stack Developer Master Program',
    category: 'Java Development',
    voucherAmount: 3000,
    voucherLabel: '₹3,000 Amazon Voucher',
    courseDuration: '8 Months',
    badge: 'Enterprise Choice',
  },
  {
    courseName: 'Python Full Stack Developer Master Program',
    category: 'Python Development',
    voucherAmount: 3000,
    voucherLabel: '₹3,000 Amazon Voucher',
    courseDuration: '7 Months',
    badge: 'Trending',
  },
  {
    courseName: 'Cyber Security & Ethical Hacking Master Program with AI',
    category: 'Cyber Security',
    voucherAmount: 3000,
    voucherLabel: '₹3,000 Amazon Voucher',
    courseDuration: '6 Months',
    badge: 'Trending',
  },
  {
    courseName: 'Software Testing & QA Automation with AI',
    category: 'Software Testing',
    voucherAmount: 2500,
    voucherLabel: '₹2,500 Amazon Voucher',
    courseDuration: '6 Months',
    badge: 'Fast Transition',
  },
  {
    courseName: 'Digital Marketing & Growth Strategy with AI',
    category: 'Digital Marketing',
    voucherAmount: 2500,
    voucherLabel: '₹2,500 Amazon Voucher',
    courseDuration: '5 Months',
    badge: 'High Referral Rate',
  },
];

export const REFER_EARN_FAQS = [
  {
    question: 'Do I need to be an ITvedant learner to avail the benefits of reference?',
    answer: 'Yes, you can be an active learner, alumni, or an invited advocate to refer candidates. You must submit your registered contact details in our Refer & Earn form so our rewards team can verify and credit your Amazon Gift Voucher directly.',
  },
  {
    question: 'How can I refer ITvedant to my friends or others?',
    answer: 'It takes just 2 simple steps: 1) Fill out our Refer & Earn form with your details and your friend’s details (Name, Contact No, and Interested Course). 2) Once your friend enrolls and completes their initial 20% course fee confirmation, you will automatically receive your Amazon Gift Voucher via email/WhatsApp!',
  },
  {
    question: 'When will I be eligible for the referral benefit?',
    answer: 'You will receive your referral reward/voucher once your referee completes admission registration and pays the first 20% of their course fees. The voucher is typically dispatched within 7 business days of payment verification.',
  },
  {
    question: 'How will I receive my Amazon Gift Voucher?',
    answer: 'Your e-voucher code with claim instructions will be sent securely to your registered email address and WhatsApp number. It can be added to your Amazon balance instantly with 1-click redemption.',
  },
  {
    question: 'Is there any upper limit on how many friends I can refer?',
    answer: 'No! There is absolutely no limit. You can refer 5, 10, or even 20 friends and earn rewards for each successful enrollment. Many ITvedant learners have earned over ₹50,000 through our referral program.',
  },
  {
    question: 'What if my friend decides to enroll in an online batch instead of classroom?',
    answer: 'Referral rewards apply equally whether your friend chooses classroom training at any of our Mumbai, Pune, or Nagpur centers, or enrolls in our PAN-India Live Online batches.',
  },
];

export const HOME_FAQS = [
  {
    question: 'What makes ITvedant different from other training institutes?',
    answer: 'ITvedant is recognized for 14+ years of trust, 100% placement assurance, 80% practical hands-on methodology, and dual certification with NSDC (National Skill Development Corporation, Govt of India). We provide unlimited interview opportunities with 2,000+ corporate hiring partners until you get placed.',
  },
  {
    question: 'Can someone with a Non-IT or Non-Technical background join these courses?',
    answer: 'Absolutely! More than 65% of our successful alumni come from non-technical backgrounds—including Commerce (B.Com/BBA), Arts (BA), Mechanical, Civil, Chemical Engineering, and B.Sc graduates. Our pedagogy starts from absolute ground zero and builds up step-by-step.',
  },
  {
    question: 'How does the 100% Placement Assurance work?',
    answer: 'Once you complete 75% of your course curriculum and project submissions, our dedicated Placement Cell activates. You go through resume building, 15+ technical mock interviews, and soft-skill grooming. We then arrange scheduled campus and virtual interview drives with top MNCs and tech startups until you secure your offer letter.',
  },
  {
    question: 'What are the batch timings? Can working professionals attend?',
    answer: 'Yes! We offer flexible learning modes: Weekday Morning batches (9 AM - 1 PM), Weekday Evening batches (5 PM - 9 PM), and dedicated Weekend batches (Saturday & Sunday 10 AM - 6 PM) for working professionals. You can choose classroom attendance or live interactive online streaming.',
  },
  {
    question: 'Are there EMI or financial assistance options available?',
    answer: 'Yes! We believe financial constraints should never stop career ambitions. We offer 0% interest No-Cost EMI options starting at just ₹3,999 to ₹5,499 per month through our authorized education finance partners.',
  },
  {
    question: 'What certification will I receive after course completion?',
    answer: 'You receive an industry-recognized Master Certificate from ITvedant along with an official government-accredited certification from NSDC (National Skill Development Corporation) and Skill India Mission, verifiable on official portals.',
  },
  {
    question: 'What happens if I miss a lecture or have doubts?',
    answer: 'Every classroom session is backed up by high-definition recorded lectures accessible 24/7 on our student LMS portal. Additionally, our centers have full-time lab mentors available for daily 1-on-1 doubt clearance.',
  },
];

export const GOOGLE_REVIEWS_LIST = [
  {
    id: 'rev_1',
    author: 'Priyanka Meshram',
    rating: 5,
    date: '2 weeks ago',
    branch: 'Thane Campus',
    course: 'Master in Data Science & AI',
    text: 'Best institute in Mumbai for Data Science. Mentors like Sachin Sir explain Python and Machine Learning with real-world clarity. The placement team arranged 4 interviews within a month of completion. Got placed in Capgemini!',
  },
  {
    id: 'rev_2',
    author: 'Akash Salunke',
    rating: 5,
    date: '1 month ago',
    branch: 'FC Road, Pune Campus',
    course: 'AWS Cloud & DevOps Master',
    text: 'Hands-on practical training is 100% real here. We built full Kubernetes clusters, Terraform scripts, and Jenkins pipelines. The infrastructure at FC road campus is fantastic.',
  },
  {
    id: 'rev_3',
    author: 'Divya Nair',
    rating: 5,
    date: '3 weeks ago',
    branch: 'Andheri West Campus',
    course: 'Full Stack Web Development',
    text: 'I switched from a B.Com degree to MERN stack developer. ITvedant gave me the exact portfolio that recruiters in Bangalore and Mumbai wanted. 5 stars all the way!',
  },
  {
    id: 'rev_4',
    author: 'Saurabh Gaikwad',
    rating: 5,
    date: '2 months ago',
    branch: 'Vashi, Navi Mumbai Campus',
    course: 'Software Testing with AI',
    text: 'Career coaches here conducted 10 mock interviews with me before sending me to Cognizant. I had zero stage fright during the actual drive. Highly recommended for freshers!',
  },
];
