import React from 'react';
import { GoogleIcon } from './GoogleIcon';
import { DoodleSparkle } from './ThemeDoodles';

export interface CompanyPartner {
  name: string;
  category: string;
  badgeText?: string;
  svgIcon: React.ReactNode;
}

export const PLACEMENT_COMPANIES: CompanyPartner[] = [
  {
    name: 'Microsoft',
    category: 'Tech Giant',
    svgIcon: (
      <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="9.5" height="9.5" fill="#1E40AF" rx="1" />
        <rect x="12.5" y="2" width="9.5" height="9.5" fill="#38BDF8" rx="1" />
        <rect x="2" y="12.5" width="9.5" height="9.5" fill="#2563EB" rx="1" />
        <rect x="12.5" y="12.5" width="9.5" height="9.5" fill="#93C5FD" rx="1" />
      </svg>
    ),
  },
  {
    name: 'Amazon',
    category: 'Tech Giant',
    svgIcon: (
      <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="none">
        <path
          d="M13.9 14.8c-2.4 1.8-5.9 2.7-8.9 2.7-4.2 0-8-1.5-10.9-4.1-.2-.2 0-.5.3-.3 3.1 1.8 7 2.9 10.9 2.9 2.7 0 5.8-.7 8.3-2.1.4-.3.7.2.3.9zm.9-1.2c-.3-.4-1.9-.2-2.6 0-.2 0-.3-.2-.1-.3 1.2-.8 3.1-.6 3.4-.2.3.4.1 2.3-.9 3.2-.2.2-.3.1-.2-.1.4-.7.7-2.1.4-2.6z"
          fill="#38BDF8"
        />
        <path
          d="M13.2 10.5V5.8c0-.9-.2-1.7-.8-2.3-.7-.7-1.8-1-3.2-1-2 0-3.8.7-4.8 1.4-.2.1-.1.4.1.4l1.3.9c.1.1.3.1.4 0 .7-.5 1.8-.9 3-.9 1.6 0 2.2.8 2.2 2.2v.3c-5.2.3-6.4 2.8-6.4 4.8 0 2 1.3 3.3 3.3 3.3 1.7 0 2.9-.8 3.5-1.9h.1v1.5c0 .2.1.4.3.4h1.7c.2 0 .4-.2.4-.4v-4.1h-1.1zm-1.8 1.4c-.4.9-1.3 1.6-2.4 1.6-1.1 0-1.8-.7-1.8-1.8 0-1.5 1.1-2.2 4.2-2.4v2.6z"
          fill="#93C5FD"
        />
      </svg>
    ),
  },
  {
    name: 'TCS',
    category: 'IT Services',
    badgeText: 'TCS',
    svgIcon: (
      <div className="w-7 h-7 rounded-lg bg-[#1E40AF] text-sky-100 flex items-center justify-center font-bold text-[10px] tracking-tight border border-sky-300/40 shadow-xs">
        TCS
      </div>
    ),
  },
  {
    name: 'Infosys',
    category: 'IT Services',
    badgeText: 'INF',
    svgIcon: (
      <div className="w-7 h-7 rounded-lg bg-[#2563EB] text-sky-100 flex items-center justify-center font-bold text-[9px] tracking-tight border border-sky-300/40 shadow-xs">
        INF
      </div>
    ),
  },
  {
    name: 'Capgemini',
    category: 'IT Services',
    svgIcon: (
      <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#0284C7" />
        <path
          d="M12 6c-3.3 0-6 2.7-6 6 0 2.4 1.4 4.5 3.5 5.5.3.1.5-.1.5-.4v-1.2c-1.3-.8-1.8-1.7-1.8-3.9 0-2.2 1.7-3.8 3.8-3.8 2.1 0 3.8 1.6 3.8 3.8 0 2.2-.5 3.1-1.8 3.9v1.2c0 .3.2.5.5.4 2.1-1 3.5-3.1 3.5-5.5 0-3.3-2.7-6-6-6z"
          fill="#F0F9FF"
        />
      </svg>
    ),
  },
  {
    name: 'Accenture',
    category: 'Consulting',
    badgeText: '>',
    svgIcon: (
      <div className="w-7 h-7 rounded-lg bg-[#0A1633] text-[#38BDF8] border border-sky-400/50 flex items-center justify-center font-extrabold text-sm shadow-xs">
        &gt;
      </div>
    ),
  },
  {
    name: 'Wipro',
    category: 'IT Services',
    badgeText: 'WIPRO',
    svgIcon: (
      <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#1E40AF] to-[#38BDF8] text-white flex items-center justify-center font-extrabold text-[8px] tracking-tighter shadow-xs border border-sky-300/40">
        WIPRO
      </div>
    ),
  },
  {
    name: 'Cognizant',
    category: 'IT Services',
    badgeText: 'CTS',
    svgIcon: (
      <div className="w-7 h-7 rounded-lg bg-[#0284C7] text-white flex items-center justify-center font-bold text-[9px] border border-sky-300/40 shadow-xs">
        CTS
      </div>
    ),
  },
  {
    name: 'IBM',
    category: 'Tech Giant',
    badgeText: 'IBM',
    svgIcon: (
      <div className="w-7 h-7 rounded-lg bg-[#1E3A8A] text-sky-100 flex items-center justify-center font-mono font-bold text-[9px] tracking-wider border border-sky-300/40 shadow-xs">
        IBM
      </div>
    ),
  },
  {
    name: 'Deloitte',
    category: 'Consulting',
    svgIcon: (
      <div className="w-7 h-7 rounded-lg bg-[#0A1633] text-white flex items-center justify-center font-bold text-xs relative border border-sky-400/40 shadow-xs">
        D<span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] absolute bottom-1 right-1" />
      </div>
    ),
  },
  {
    name: 'Tech Mahindra',
    category: 'IT Services',
    badgeText: 'TM',
    svgIcon: (
      <div className="w-7 h-7 rounded-lg bg-[#2563EB] text-white flex items-center justify-center font-bold text-[8px] tracking-tight shadow-xs border border-sky-300/40">
        TM
      </div>
    ),
  },
  {
    name: 'LTIMindtree',
    category: 'IT Services',
    badgeText: 'LTI',
    svgIcon: (
      <div className="w-7 h-7 rounded-lg bg-[#1E40AF] text-white flex items-center justify-center font-bold text-[8px] tracking-tight border border-sky-300/40 shadow-xs">
        LTI
      </div>
    ),
  },
  {
    name: 'Hexaware',
    category: 'IT Services',
    badgeText: 'HEX',
    svgIcon: (
      <div className="w-7 h-7 rounded-lg bg-[#0284C7] text-white flex items-center justify-center font-bold text-[8px] shadow-xs border border-sky-300/40">
        HEX
      </div>
    ),
  },
  {
    name: 'HCLTech',
    category: 'IT Services',
    badgeText: 'HCL',
    svgIcon: (
      <div className="w-7 h-7 rounded-lg bg-[#38BDF8] text-[#060D1E] flex items-center justify-center font-bold text-[8px] shadow-xs border border-sky-300/40">
        HCL
      </div>
    ),
  },
  {
    name: 'Persistent',
    category: 'Product & Tech',
    badgeText: 'PSI',
    svgIcon: (
      <div className="w-7 h-7 rounded-lg bg-[#2563EB] text-white flex items-center justify-center font-bold text-[8px] shadow-xs border border-sky-300/40">
        PSI
      </div>
    ),
  },
  {
    name: 'JPMorgan Chase',
    category: 'FinTech',
    badgeText: 'JPM',
    svgIcon: (
      <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="none">
        <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" fill="#1E40AF" />
        <text
          x="12"
          y="15"
          fill="#F0F9FF"
          fontSize="7"
          fontWeight="bold"
          textAnchor="middle"
          fontFamily="sans-serif"
        >
          JPM
        </text>
      </svg>
    ),
  },
];

export const CompaniesSlidingMarquee: React.FC = () => {
  const duplicatedPartners = [...PLACEMENT_COMPANIES, ...PLACEMENT_COMPANIES];

  return (
    <section className="py-12 sm:py-16 relative overflow-hidden">
      {/* Section Header with Curved Metallic Blue Badge */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3 mb-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-950/80 border border-sky-400/40 text-sky-200 text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-md">
          <GoogleIcon name="verified" size={16} className="text-sky-400" filled />
          <span>3,500+ Learners Have Been Placed By Our India's Largest Placement Team</span>
          <DoodleSparkle className="w-4 h-4 text-sky-300" />
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-display tracking-tight">
          3,500+ Learners Have Been Placed By Our{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-blue-200 to-white">
            India's Largest Placement Team
          </span>
        </h2>

        <p className="text-xs sm:text-sm text-sky-200 max-w-2xl mx-auto leading-relaxed">
          From global product giants to premier tech consultancies, our students launch their careers across 2,000+ top enterprises.
        </p>
      </div>

      {/* Glassy Metallic Sliding Track Wrapper */}
      <div className="marquee-wrapper relative w-full overflow-hidden py-4">
        {/* Soft edge blur gradient masks in deep midnight navy */}
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-r from-[#060D1E] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-l from-[#060D1E] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee-continuous flex items-center gap-4 sm:gap-6">
          {duplicatedPartners.map((company, index) => (
            <div
              key={`${company.name}-${index}`}
              className="glass-dark rounded-[24px] px-5 py-3.5 flex items-center gap-3.5 shrink-0 cursor-default border-2 border-sky-400/40 hover:border-cyan-300 transition-all shadow-xl group backdrop-blur-xl"
            >
              {/* Company Logo Icon in Metallic Blue */}
              <div className="w-10 h-10 rounded-2xl bg-black/40 border border-sky-400/35 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-110 transition-transform">
                {company.svgIcon}
              </div>

              {/* Company Info */}
              <div className="text-left space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-bold text-white group-hover:text-sky-200 transition-colors leading-snug">
                    {company.name}
                  </span>
                  {company.badgeText && (
                    <span className="text-[9px] font-mono font-bold bg-blue-900/80 text-sky-200 px-1.5 py-0.2 rounded border border-sky-400/40">
                      {company.badgeText}
                    </span>
                  )}
                </div>
                <div className="text-[10px] font-semibold text-sky-200 bg-blue-950/70 px-2 py-0.5 rounded-full inline-block border border-sky-400/40">
                  {company.category}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
