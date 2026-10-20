import React from 'react';
import { storageService } from '../services/storage';
import { navigateTo } from '../utils/navigation';
import { Users, ArrowRight, Award, BookOpen } from 'lucide-react';

export const InstructorsPage: React.FC = () => {
  const courses = storageService.getCourses();

  const instructors = [
    {
      name: 'Aditya Verma',
      role: 'Principal Engineer',
      agency: 'Belvo Engineering Lab',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      bio: 'Senior software architect with 10+ years directing web and cloud infrastructure for hyper-growth digital startups. Specializes in TypeScript, React, and resilient microservice architectures.',
      coursesTaught: courses.filter((c) => c.instructor.name === 'Aditya Verma')
    },
    {
      name: 'Pooja Nair',
      role: 'Head of Automation Solutions',
      agency: 'Belvo AI Practice',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      bio: 'Automation architect helping enterprise teams deploy production AI pipelines and eliminate 1,000+ manual hours per quarter through n8n, Make, and LLM tool calling.',
      coursesTaught: courses.filter((c) => c.instructor.name === 'Pooja Nair')
    },
    {
      name: 'Rohan Mehra',
      role: 'Performance Marketing Director',
      agency: 'Belvo Growth Studio',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      bio: 'Managed over ₹12 Crore in performance ad spend across direct-to-consumer and SaaS brands with an average 3.8x blended ROAS and rigorous attribution telemetry.',
      coursesTaught: courses.filter((c) => c.instructor.name === 'Rohan Mehra')
    },
    {
      name: 'Ananya Deshmukh',
      role: 'Design Director',
      agency: 'Belvo Product Design Group',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
      bio: 'Crafted design systems for fintech and consumer apps used by over 4 million monthly active users. Advocates for zero-slop typographic discipline and auto-layout precision.',
      coursesTaught: courses.filter((c) => c.instructor.name === 'Ananya Deshmukh')
    },
    {
      name: 'Vikram Joshi',
      role: 'Lead Data Analyst',
      agency: 'Belvo Analytics',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      bio: '12+ years building enterprise reporting pipelines and SQL data models for international banking and SaaS firms.',
      coursesTaught: courses.filter((c) => c.instructor.name === 'Vikram Joshi')
    },
    {
      name: 'Sneha Kulkarni',
      role: 'Content Strategist',
      agency: 'Belvo Content Studio',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      bio: 'Published author and agency copy director whose content funnels have driven over 2.5 million organic search sessions through intent-focused SEO.',
      coursesTaught: courses.filter((c) => c.instructor.name === 'Sneha Kulkarni')
    },
    {
      name: 'Kabir Sengupta',
      role: 'Creative Video Director',
      agency: 'Belvo Media Lab',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
      bio: 'Award-winning commercial video editor whose campaigns have garnered over 50M views across YouTube, commercials, and OTT.',
      coursesTaught: courses.filter((c) => c.instructor.name === 'Kabir Sengupta')
    },
    {
      name: 'Neha Singhania',
      role: 'Head of E-Commerce Solutions',
      agency: 'Belvo Commerce',
      avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=200&q=80',
      bio: 'Architected D2C digital stores generating over ₹45 Crore in annual gross merchandise value with high-velocity CRO.',
      coursesTaught: courses.filter((c) => c.instructor.name === 'Neha Singhania')
    },
    {
      name: 'Aryan Pillai',
      role: 'Senior Visual Producer',
      agency: 'Belvo Creative Studio',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
      bio: 'Fashion and product photographer published in national lifestyle publications and luxury brand campaigns.',
      coursesTaught: courses.filter((c) => c.instructor.name === 'Aryan Pillai')
    },
    {
      name: 'Devika Rao',
      role: 'VP of Business Development',
      agency: 'Belvo Enterprise',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      bio: 'Closed over ₹30 Crore in enterprise technology and consulting contracts with multinational organizations.',
      coursesTaught: courses.filter((c) => c.instructor.name === 'Devika Rao')
    },
    {
      name: 'Rajesh Chawla',
      role: 'Cloud Security Architect',
      agency: 'Belvo Infrastructure',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      bio: 'Cybersecurity consultant and cloud architect securing high-compliance enterprise server infrastructure.',
      coursesTaught: courses.filter((c) => c.instructor.name === 'Rajesh Chawla')
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      <div className="border-b border-slate-200 pb-8 space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-800">
          <Users className="w-3.5 h-3.5" />
          <span>Faculty Directory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
          Mentors & Faculty
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
          Learn from active digital agency practitioners who build, design, and market real software products every day.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {instructors.map((inst, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-xs space-y-4">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src={inst.avatar}
                  alt={inst.name}
                  referrerPolicy="no-referrer"
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-teal-500/20"
                />
                <div>
                  <h3 className="text-base font-bold text-slate-900">{inst.name}</h3>
                  <p className="text-xs text-teal-700 font-semibold">{inst.role}</p>
                  <p className="text-[11px] text-slate-400">{inst.agency}</p>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {inst.bio}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide mb-2">
                Curriculums Authored:
              </p>
              {inst.coursesTaught.length > 0 ? (
                <div className="space-y-1.5">
                  {inst.coursesTaught.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => navigateTo(`/course/${c.id}`)}
                      className="w-full text-left text-xs font-medium text-slate-800 hover:text-teal-700 truncate flex items-center justify-between group cursor-pointer"
                    >
                      <span className="truncate">{c.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">Advanced masterclasses in development.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
