import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Search } from 'lucide-react';
import { navigateTo } from '../utils/navigation';

export const FAQPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({ 0: true, 1: true });

  const toggleItem = (idx: number) => {
    setOpenItems((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const faqList = [
    {
      category: 'General & Admissions',
      q: 'What is Hridayam by Belvo?',
      a: 'Hridayam is Belvo’s digital learning platform, designed to teach practical, industry-grade skills across software engineering, artificial intelligence, digital marketing, UI/UX design, and business data analytics.'
    },
    {
      category: 'General & Admissions',
      q: 'Do I need prior technical background or an engineering degree?',
      a: 'No. Beginner tracks (such as Full-Stack Web Development Foundations and UI/UX Design Systems) start from zero and build up incrementally. Intermediate and advanced masterclasses clearly specify any recommended prerequisites.'
    },
    {
      category: 'Pricing & Payments',
      q: 'How does payment processing work?',
      a: 'We support free foundational courses as well as paid masterclasses. In our development environment, payments are processed securely via the Razorpay Sandbox gateway. Production payments use 256-bit SSL encrypted order creation.'
    },
    {
      category: 'Pricing & Payments',
      q: 'What is your refund policy?',
      a: 'We maintain a 7-day refund guarantee for paid courses provided you have accessed less than 30% of the curriculum content and have not attempted the final certification assessment.'
    },
    {
      category: 'Assessments & Certification',
      q: 'How are certificates earned?',
      a: 'A certificate is granted automatically only when 100% of the course lesson units are completed and the student achieves the designated passing grade (typically 80%) on the course assessment.'
    },
    {
      category: 'Assessments & Certification',
      q: 'How do employers verify my certificate?',
      a: 'Every issued certificate bears a unique Certificate Record ID (e.g. HRD-2026-4891). Anyone can enter this ID into our public Certificate Verification page to confirm the student’s identity, course title, and authentic issuance date.'
    },
    {
      category: 'Learning Interface',
      q: 'Are the lessons live or on-demand?',
      a: 'All lessons are on-demand with persistent progress tracking, allowing you to learn according to your schedule across desktop and mobile devices.'
    }
  ];

  const filteredFaqs = faqList.filter((f) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q) || f.category.toLowerCase().includes(q);
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-10">
      <div className="border-b border-slate-200 pb-8 space-y-2 text-center">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#760D3B] bg-[#FCE7F3]/70 border border-[#F0D6E3] px-3 py-1 rounded-md">
          <HelpCircle className="w-4 h-4 text-[#C2185B]" />
          <span>Support & Clarifications</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
          Clear answers regarding course enrolment, syllabus access, graded quizzes, and credential verification.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md mx-auto">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by topic or keyword..."
          className="w-full pl-10 pr-4 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#C2185B] shadow-xs"
        />
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openItems[idx] ?? false;
          return (
            <div key={idx} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
              <button
                onClick={() => toggleItem(idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors cursor-pointer"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#C2185B] font-semibold tracking-wider">
                    {faq.category}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 mt-0.5">{faq.q}</h3>
                </div>
                {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Still need help CTA */}
      <div className="p-6 bg-[#FFFBFD] rounded-2xl border border-[#F0D6E3] text-center space-y-2">
        <h4 className="text-sm font-bold text-slate-900">Have a specific question not covered here?</h4>
        <p className="text-xs text-slate-500">Our faculty advisory desk is available to assist you.</p>
        <div className="pt-2">
          <button
            onClick={() => navigateTo('/contact')}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#C2185B] hover:bg-[#760D3B] rounded-lg cursor-pointer shadow-md shadow-[#C2185B]/20"
          >
            Contact Academy Desk
          </button>
        </div>
      </div>
    </div>
  );
};
