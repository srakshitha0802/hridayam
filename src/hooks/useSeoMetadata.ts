import { useEffect } from 'react';
import { AppView } from '../types';
import { ITV_COURSES } from '../data/itvedantData';

interface SeoConfig {
  title: string;
  description: string;
  robots?: string;
}

const VIEW_SEO: Record<AppView, SeoConfig> = {
  home: {
    title: 'Hridayam by Belvo – GenZ Career EdTech & IT Placement Hub',
    description:
      'Master AI, Data Science, Full Stack & Cloud with 100% placement support, live labs, and NSDC certification at Hridayam by Belvo.',
  },
  catalogue: {
    title: 'Career Programs & IT Courses – Hridayam by Belvo',
    description:
      'Explore 11 industry-aligned career tracks in AI, Data Science, Full Stack, Cloud DevOps, UI/UX, and Digital Marketing with 0% EMI.',
  },
  course: {
    title: 'Program Curriculum & Syllabus – Hridayam by Belvo',
    description:
      'Inspect module-by-module curriculum, capstone deliverables, career outcomes, and placement support at Hridayam by Belvo.',
  },
  placements: {
    title: 'IT Placements & Alumni Outcomes – Hridayam by Belvo',
    description:
      'Discover verified student placement stories, recruiter hiring partners, salary benchmarks, and career outcomes across India.',
  },
  centers: {
    title: 'Indian Classroom Campuses & Labs – Hridayam by Belvo',
    description:
      'Visit Hridayam by Belvo campuses in Pune, Mumbai, Thane, Bengaluru, Hyderabad, and Chennai for live labs and free career counseling.',
  },
  reviews: {
    title: 'Verified Student Reviews (4.9/5) – Hridayam by Belvo',
    description:
      'Read 5,280+ verified learner testimonials, cohort ratings, and career transition stories from Hridayam by Belvo alumni.',
  },
  contact: {
    title: 'Contact & Free Career Counseling – Hridayam by Belvo',
    description:
      'Book a free 1-on-1 career counseling call, request a curriculum brochure, or connect with admissions at Hridayam by Belvo.',
  },
  'hire-from-us': {
    title: 'Hire Pre-Vetted Tech Talent – Hridayam by Belvo',
    description:
      'Partner with Hridayam by Belvo to recruit job-ready AI, Data Science, Full Stack, and Cloud engineers with zero hiring fees.',
  },
  'refer-earn': {
    title: 'Refer & Earn ₹5,000 Vouchers – Hridayam by Belvo',
    description:
      'Refer friends to Hridayam by Belvo career programs and earn up to ₹5,000 in Amazon gift vouchers on every confirmed enrollment.',
  },
  student: {
    title: 'Student LMS Portal – Hridayam by Belvo',
    description:
      'Access studio modules, coding sandbox, capstone audits, ATS resume builder, live hiring drives, and NSDC certificates.',
    robots: 'noindex, nofollow',
  },
  'mentor-portal': {
    title: 'Faculty & Mentor Hub – Hridayam by Belvo',
    description:
      'Audit student capstones, author coding challenges, resolve doubt tickets, track attendance, and grade mock interviews.',
    robots: 'noindex, nofollow',
  },
  'recruiter-portal': {
    title: 'Recruiter & Hiring Desk – Hridayam by Belvo',
    description:
      'Shortlist pre-vetted Indian engineering graduates, build screening assessments, manage ATS pipelines, and book campus drives.',
    robots: 'noindex, nofollow',
  },
  instructor: {
    title: 'Institute Admin Console – Hridayam by Belvo',
    description:
      'Manage career programs, INR tuition pricing, campus batch capacity, scholarship grants, admissions CRM, and GST ledgers.',
    robots: 'noindex, nofollow',
  },
  'portal-login': {
    title: 'Unified Portal Login – Hridayam by Belvo',
    description:
      'Authenticate into the Student LMS, Faculty & Mentor Hub, Recruiter Desk, or Institute Admin Console at Hridayam by Belvo.',
    robots: 'noindex, nofollow',
  },
  'student-login': {
    title: 'Student LMS Sign In – Hridayam by Belvo',
    description: 'Sign in with authorized student credentials to open the Hridayam Student LMS Portal.',
    robots: 'noindex, nofollow',
  },
  'mentor-login': {
    title: 'Faculty & Mentor Sign In – Hridayam by Belvo',
    description: 'Sign in with authorized faculty credentials to open the Hridayam Mentor Hub.',
    robots: 'noindex, nofollow',
  },
  'recruiter-login': {
    title: 'Recruiter Desk Sign In – Hridayam by Belvo',
    description: 'Sign in with authorized hiring partner credentials to access the Hridayam Recruiter Desk.',
    robots: 'noindex, nofollow',
  },
  'admin-login': {
    title: 'Institute Admin Sign In – Hridayam by Belvo',
    description: 'Sign in with authorized administrator credentials to access the Institute Admin Console.',
    robots: 'noindex, nofollow',
  },
};

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonical(href: string) {
  let link = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

export function useSeoMetadata(view: AppView, selectedCourseId?: string) {
  useEffect(() => {
    const base = VIEW_SEO[view] || VIEW_SEO.home;
    let title = base.title;
    let description = base.description;

    const course =
      view === 'course' && selectedCourseId
        ? ITV_COURSES.find((c) => c.id === selectedCourseId)
        : undefined;

    if (course) {
      title = `${course.shortTitle} Course – Hridayam by Belvo`;
      description = `${course.summary.slice(0, 130).trim()} · ${course.duration} · Highest CTC ${course.highestPackage}.`;
    }

    const canonicalUrl = `${window.location.origin}${window.location.pathname}`;

    document.title = title;
    upsertMeta('name', 'description', description);
    upsertMeta('name', 'robots', base.robots || 'index, follow, max-image-preview:large, max-snippet:-1');
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', canonicalUrl);
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertCanonical(canonicalUrl);

    // Inject dynamic Course JSON-LD when viewing a specific course
    const dynamicScriptId = 'hridayam-dynamic-course-jsonld';
    const existingScript = document.getElementById(dynamicScriptId);
    if (existingScript) {
      existingScript.remove();
    }

    if (course) {
      const script = document.createElement('script');
      script.id = dynamicScriptId;
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: course.title,
        description: course.summary,
        provider: {
          '@type': 'EducationalOrganization',
          name: 'Hridayam by Belvo',
          sameAs: window.location.origin,
        },
        educationalCredentialAwarded: course.certification,
        timeRequired: course.duration,
        offers: {
          '@type': 'Offer',
          price: String(course.fee || 0),
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
        },
      });
      document.head.appendChild(script);
    }
  }, [view, selectedCourseId]);
}
