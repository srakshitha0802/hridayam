# Hridayam by Belvo — Digital Learning Platform

> **Practical learning. Real-world skills. Career growth.**  
> Built and maintained by digital agency practitioners at **Belvo**.  
> 🌐 **Live Demo**: [https://srakshitha0802.github.io/hridayam/](https://srakshitha0802.github.io/hridayam/)

Hridayam is Belvo's flagship digital learning platform, designed to bridge the gap between academic theory and high-standard digital agency execution. It equips students, professionals, creators, and entrepreneurs with production-grade skills through structured curricula, real-world portfolio deliverables, rigorous assessments, and verifiable digital credentials.

---

## 🔑 Login Credentials & Demo Access

For testing, review, and presentation purposes, Hridayam includes pre-seeded demo accounts with full data (enrolments, progress, notes, certificates, and admin metrics).

| Role | Email Address | Password | Pre-seeded Data & Capabilities |
| :--- | :--- | :--- | :--- |
| **Student** (Rahul Sharma) | `rahul.sharma@example.com` | `Password@123` *(or any)* | Enrolled in 2 courses, 40% progress on Full-Stack Web Dev, completed UI/UX track with verifiable Certificate `HRD-2026-4891`, notes, and quizzes. |
| **Administrator** (Belvo Lead) | `admin@belvo.com` | `Admin@123` *(or any)* | Full access to Admin Portal (`/admin`), curriculum studio, lesson uploads, student management, pricing updates, and email/service health hub. |
| **Guest / Public** | *N/A (unauthenticated)* | *N/A* | Browse 11 categories, course search & 5-way filters, 30s skill matcher, video tour, public certificate verification. |

> 💡 **Instant Role Switcher**: A quick switcher pill is embedded directly in the top announcement header (`[Guest] [Student: Rahul] [Admin: Belvo]`) to let reviewers jump between perspectives in a single click without manually logging in or out.
>
> ⚡ **1-Click Quick Login**: On the `/login` page, you can also click **"Sign In as Student"** or **"Sign In as Admin"** for zero-friction access.

---

## 🎯 Test Coupons & Payment Gateway Details

Hridayam integrates a realistic **Razorpay** checkout experience supporting Indian payment methods (UPI, Cards, Netbanking):

- **Supported Test Payment Methods**:
  - **UPI**: Google Pay, PhonePe, Paytm, BHIM, CRED (Enter any handle like `student@okhdfcbank`)
  - **Cards**: Visa, Mastercard, RuPay (Click **"Auto-fill Test Card"** in modal for 1-click card details)
  - **Netbanking**: HDFC, ICICI, SBI, Axis, Kotak
  - **OTP**: Enter any 6-digit code (e.g., `123456`)
- **Active Promotional Coupons**:
  - `BELVO2026` — **₹1,500 Instant Discount**
  - `LAUNCH50` — **50% Flat Off Masterclasses**
- **Tax Invoices**: Generates official GST tax invoices with 18% GST breakdown, downloadable and printable right after payment.

---

## 🚀 Core Platform Modules

### 1. Website & Branding
- **Landing Page (`/`)**:
  - **Hero Section**: Architectural layout with value badges (*Project-Driven*, *Agency Standard*, *Verifiable*), direct CTA to Explore Courses, and interactive platform video walkthrough modal.
  - **Interactive 30-Second Skill Matcher**: Dynamic widget recommending the optimal course based on goal (Web Dev, AI, Marketing, Design) and proficiency level with confidence scores.
  - **Agency Rigor vs. Traditional Academies**: Direct comparative matrix contrasting 2026 production toolchains, real client briefs, and direct code reviews against legacy textbook bootcamps.
  - **Demonstration Deliverables Showcase**: Interactive portfolio deliverables (SaaS Task Engine, Performance Ad Matrix, AI Ticket Bot, Figma Token System) with modal inspection of production features and tech stacks.
  - **Verified Alumni Testimonials**: Authentic student ratings, avatars, and verified company roles (FinFlow, Zeta, CraftBloom).
  - **Interactive FAQ Accordion**: Expandable Q&A covering accreditation, free courses, certificates, and payment support.
- **Top Bar Contract**: Strict 3-zone header layout (Zone 1: Brand Wordmark · Zone 2: Navigation Links · Zone 3: Live Notification Bell, Role Switcher, and Profile Action).
- **Responsive Design**: Flawless experience across mobile smartphones, tablets, laptops, and ultra-wide displays.

### 2. 11 Core Learning Disciplines
All 11 disciplines reflecting Belvo's digital agency services are deeply integrated:
1. **Digital Marketing and Social Media Management**
2. **Web, App, and Software Development**
3. **Graphic Design, Branding, and UI/UX**
4. **Video Editing, Animation, and VFX**
5. **Artificial Intelligence, Machine Learning, and Automation**
6. **E-commerce and Online Business**
7. **Photography and Content Creation**
8. **Business Development, Sales, and Entrepreneurship**
9. **Copywriting, SEO, and Content Marketing**
10. **Cloud Computing, IT, and Cybersecurity Awareness**
11. **Data Analytics and Business Intelligence**

### 3. Course Catalogue & Course Detail Pages
- **Catalogue (`/courses`)**: Real-time keyword search with 5-way filtering across Categories, Levels (Beginner, Intermediate, Advanced), Pricing (Free vs. Paid), and Formats (Self-Paced, Cohort, Weekend Intensive), plus multiple sort modes.
- **Course Detail Pages (`/course/:id`)**: Comprehensive syllabi breakdown, instructor bios, prerequisites, target roles, module lesson plans with durations, and pricing breakdowns with GST.

### 4. Student Dashboard & Classroom
- **Student Dashboard (`/dashboard`)**:
  - **Enrolled Courses Tab**: Progress bars, completion percentages, last-viewed lesson indicator, and 1-click "Resume Learning".
  - **Learning Materials Hub**: Consolidated download center for PDF workbooks, GitHub starter repositories, Figma UI component token kits, and raw datasets.
  - **Assessments & Quizzes Tab**: Review scores, passed/failed statuses (70%+ passing threshold), and retake options.
  - **Certificates Tab**: Downloadable credentials with unique verification IDs and direct validation links.
- **Classroom Interface (`/learn/:courseId/:lessonId`)**:
  - Custom HTML5 video player with playback speed selector (1x, 1.25x, 1.5x, 2x) and seek controls.
  - **Clickable Timestamped Transcripts**: Jump immediately to video moments by clicking transcript lines.
  - **Persistent In-Session Notes**: Add timestamped notes saved directly to student local storage.
  - **Interactive Quiz Runner**: Multiple-choice module assessments with instant score calculation, feedback, and certificate unlocking upon passing.

### 5. Admin Dashboard (`/admin`)
- **Executive Metrics & KPIs**: Real-time calculated counters for Active Students, Published Courses, Enrolments, Course Completion Rates, and Platform Gross Revenue.
- **Course Manager**: Create, edit, publish, or archive courses with custom thumbnails and metadata.
- **Curriculum & Materials Studio Modal**: Per-course studio allowing administrators to:
  - Add syllabus modules and reorder content.
  - Upload video lessons with stream URL presets (Cloudflare Stream, YouTube, HLS, MP4).
  - Attach downloadable materials (PDFs, ZIP starter code, Figma links).
  - Quick-edit course pricing with instant platform-wide sync.
- **Student Directory & Enrolment Management**: View student profiles, enrolment histories, and certificate status.
- **Emails & Integrations Hub**:
  - Live status cards for **Razorpay Sandbox**, **Resend API (`mail.hridayam.belvo.com`)**, and **Cloudflare Video CDN**.
  - One-click test email dispatchers for Enrolment Confirmation, Tax Invoices, and Certificate Awards.
  - Complete dispatched transactional email audit log.

### 6. Payments & Integrations
- **Free vs. Paid Course Handling**: Free foundational courses enrol immediately with 1 click; paid masterclasses open the Razorpay checkout.
- **Transactional Email Engine**:
  - Live **Notification Bell** in the navbar with unread counts and a dropdown popover.
  - **Email Preview Modal**: Pixel-perfect transactional email viewer rendering realistic Resend HTML emails for:
    - 🎟️ *Enrolment Confirmation & Classroom Access*
    - 🧾 *Official Tax Invoice & Payment Receipt*
    - 🎓 *Certificate of Completion Award*
    - 📝 *Assessment Quiz Results*
- **Tamper-Evident Public Certificate Verification (`/verify` / `/#/verify-certificate`)**:
  - Search any certificate ID (e.g., `HRD-2026-4891`) to verify student identity, course, grade, issuance date, and cryptographic verification hash.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework & Language** | React 19, TypeScript, Vite 8.3 |
| **Styling & Design System** | Tailwind CSS v4 (`@theme`), Plus Jakarta Sans typography, Lucide Icons |
| **State & Persistence** | Typed local-first storage service (`storageService`) with subscriber pattern |
| **Payment Integration** | Razorpay Checkout SDK abstraction with UPI, Card, Netbanking & Coupon engine |
| **Email Integration** | Resend Transactional Email Engine simulation with styled HTML templates |
| **Media Player** | Custom HTML5 Cinema Player with playback speeds and timestamped transcript seeking |

---

## 📂 Project Structure

```
hridayam-by-belvo/
├── public/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── CategoryCard.tsx         # Category card component
│   │   │   ├── CourseCard.tsx           # Course card with badges and pricing
│   │   │   ├── EmailPreviewModal.tsx    # Resend email template viewer modal
│   │   │   ├── Footer.tsx               # Site footer with discipline links
│   │   │   ├── Navbar.tsx               # 3-Zone navigation bar & role switcher
│   │   │   ├── NotificationBell.tsx     # Live bell popover with unread counter
│   │   │   ├── RazorpayCheckoutModal.tsx# Razorpay payment flow & tax invoice
│   │   │   └── VideoModal.tsx           # Video tour preview modal
│   │   └── ...
│   ├── context/
│   │   └── AuthContext.tsx              # Auth state, login/register, role switcher
│   ├── data/
│   │   └── initialData.ts               # Seed data for 11 disciplines, courses & users
│   ├── pages/
│   │   ├── admin/
│   │   │   └── AdminDashboard.tsx       # Admin metrics, curriculum studio, emails
│   │   ├── student/
│   │   │   ├── LearningInterface.tsx    # Video player, transcript & quiz runner
│   │   │   └── StudentDashboard.tsx     # Courses, materials, quizzes, certificates
│   │   ├── AuthPages.tsx                # Login, Register, Forgot Password
│   │   ├── CategoryDetailsPage.tsx      # Category-specific course listing
│   │   ├── CategoryDirectoryPage.tsx    # 11 Core disciplines grid
│   │   ├── CertificateVerificationPage.tsx # Public certificate verification registry
│   │   ├── CourseDetailsPage.tsx        # Syllabus, outcomes, enrollment CTA
│   │   ├── CoursesPage.tsx              # Filterable course discovery engine
│   │   ├── FAQPage.tsx                  # Help & FAQ center
│   │   ├── HomePage.tsx                 # Hero, skill matcher, comparison matrix, FAQs
│   │   ├── InstructorsPage.tsx          # Agency practitioner profiles
│   │   ├── LearningPathsPage.tsx        # Career trajectories & sequences
│   │   └── LegalPages.tsx               # Terms, Privacy, and Refund Policies
│   ├── services/
│   │   └── storage.ts                   # Storage service for courses, notifications, etc.
│   ├── types/
│   │   └── index.ts                     # TypeScript data contracts & interfaces
│   ├── utils/
│   │   └── navigation.ts                # Client-side hash router utility
│   ├── App.tsx                          # App root and view router
│   ├── index.css                        # Design system tokens and global styles
│   └── main.tsx                         # React 19 entry point
├── .env.example                         # Environment configuration template
├── package.json
├── README.md                            # Complete documentation (this file)
└── vite.config.ts
```

---

## 💻 Local Development Setup

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Steps

```bash
# 1. Clone or open the repository
cd hridayam-by-belvo

# 2. Install dependencies
npm install

# 3. Start the Vite development server
npm run dev
```

The application will be running locally at **`http://localhost:3000/`**.

### Other Useful Commands

```bash
# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## ⚙️ Environment Configuration (`.env`)

See [.env.example](file:///Users/srakshitha/Downloads/hridayam-by-belvo/.env.example) for the complete reference:

```env
# Platform Environment
VITE_APP_NAME="Hridayam by Belvo"
VITE_APP_URL="http://localhost:3000"

# Razorpay Payment Gateway (Test Sandbox / Production)
RAZORPAY_KEY_ID="rzp_test_belvo_mock9842"
RAZORPAY_KEY_SECRET="mock_secret_test_key"

# Resend Transactional Email API
RESEND_API_KEY="re_mock_test_key_belvo_2026"
RESEND_SENDER_DOMAIN="mail.hridayam.belvo.com"

# Video Delivery / Streaming CDN
STREAMING_CDN_URL="https://cdn.hridayam.belvo.com"
```

---

## 📜 Certification Verification Example

To test the public certificate verification engine:
1. Navigate to **`/#/verify-certificate`** (or click "Verify Certificate" in the footer).
2. Enter the verified ID: **`HRD-2026-4891`**.
3. View the authenticated record for **Rahul Sharma** for *UI/UX Design Systems & Figma Prototyping*, with issue date and cryptographic hash.

---

© 2026 **Hridayam by Belvo**. All rights reserved.  
Curated and built by **Belvo** digital agency practitioners.
