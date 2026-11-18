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
      <svg className="w-5 h-5 shrink-0" viewBox="0 0 21 21" aria-label="Microsoft Logo">
        <rect x="1" y="1" width="9" height="9" fill="#F25022" />
        <rect x="11" y="1" width="9" height="9" fill="#7FBA00" />
        <rect x="1" y="11" width="9" height="9" fill="#00A4EF" />
        <rect x="11" y="11" width="9" height="9" fill="#FFB900" />
      </svg>
    ),
  },
  {
    name: 'Amazon',
    category: 'Tech Giant',
    svgIcon: (
      <svg className="w-7 h-5 shrink-0" viewBox="0 0 28 20" fill="none" aria-label="Amazon Logo">
        {/* Amazon Smile Arrow in authentic Amazon Orange */}
        <path
          d="M17.8 14.5c-3.2 2-7.5 3-11.4 3-5.4 0-10.2-1.9-13.9-5.2-.3-.3 0-.6.4-.4 4 2.2 9 3.6 14 3.6 3.4 0 7.4-.9 10.6-2.7.5-.3.9.3.3 1.7z"
          transform="translate(11,-1) scale(0.65)"
          fill="#FF9900"
        />
        <path
          d="M19 12.8c-.3-.4-1.9-.2-2.6 0-.2 0-.3-.2-.1-.3 1.2-.8 3.1-.6 3.4-.2.3.4.1 2.3-.9 3.2-.2.2-.3.1-.2-.1.4-.7.7-2.1.4-2.6z"
          fill="#FF9900"
        />
        {/* Amazon A mark in dark slate */}
        <path
          d="M17 10.5V5.8c0-.9-.2-1.7-.8-2.3-.7-.7-1.8-1-3.2-1-2 0-3.8.7-4.8 1.4-.2.1-.1.4.1.4l1.3.9c.1.1.3.1.4 0 .7-.5 1.8-.9 3-.9 1.6 0 2.2.8 2.2 2.2v.3c-5.2.3-6.4 2.8-6.4 4.8 0 2 1.3 3.3 3.3 3.3 1.7 0 2.9-.8 3.5-1.9h.1v1.5c0 .2.1.4.3.4h1.7c.2 0 .4-.2.4-.4v-4.1h-1.1zm-1.8 1.4c-.4.9-1.3 1.6-2.4 1.6-1.1 0-1.8-.7-1.8-1.8 0-1.5 1.1-2.2 4.2-2.4v2.6z"
          fill="#232F3E"
        />
      </svg>
    ),
  },
  {
    name: 'Google',
    category: 'Tech Giant',
    svgIcon: (
      <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" aria-label="Google Logo">
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          fill="#4285F4"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="#34A853"
        />
        <path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          fill="#EA4335"
        />
      </svg>
    ),
  },
  {
    name: 'TCS',
    category: 'IT Services',
    badgeText: 'Tata Group',
    svgIcon: (
      <svg className="w-8 h-5 shrink-0" viewBox="0 0 64 24" fill="none" aria-label="TCS Logo">
        <text
          x="32"
          y="15"
          fill="#005696"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="14"
          letterSpacing="0.8"
          textAnchor="middle"
        >
          tcs
        </text>
        <rect x="10" y="19" width="44" height="2" rx="1" fill="url(#tcs-real-logo-grad)" />
        <defs>
          <linearGradient id="tcs-real-logo-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#EB008B" />
            <stop offset="50%" stopColor="#00AEEF" />
            <stop offset="100%" stopColor="#FFF200" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: 'Infosys',
    category: 'IT Services',
    badgeText: 'INF',
    svgIcon: (
      <svg className="w-8 h-4 shrink-0" viewBox="0 0 68 20" fill="none" aria-label="Infosys Logo">
        <text
          x="34"
          y="15"
          fill="#007CC3"
          fontFamily="Arial, Helvetica, sans-serif"
          fontWeight="bold"
          fontSize="14"
          letterSpacing="-0.5"
          textAnchor="middle"
        >
          Infosys
        </text>
      </svg>
    ),
  },
  {
    name: 'Capgemini',
    category: 'IT Services',
    svgIcon: (
      <svg className="w-6 h-6 shrink-0" viewBox="0 0 32 32" fill="none" aria-label="Capgemini Logo">
        {/* Authentic Capgemini Ace of Spades in Blue */}
        <path
          d="M16 2.5C11.5 7.8 6.5 12.2 6.5 17c0 3.9 3.1 7 7 7 1.1 0 2.2-.3 3.1-.7v3.2h-3v1.8h7.8v-1.8h-3V23.3c.9.4 2 .7 3.1.7 3.9 0 7-3.1 7-7 0-4.8-5-9.2-9.5-14.5z"
          fill="#0070AD"
        />
        <circle cx="16.5" cy="14" r="3.2" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    name: 'Accenture',
    category: 'Consulting',
    badgeText: '>',
    svgIcon: (
      <svg className="w-9 h-5 shrink-0" viewBox="0 0 78 24" fill="none" aria-label="Accenture Logo">
        <text
          x="37"
          y="17"
          fill="#000000"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="bold"
          fontSize="13"
          letterSpacing="-0.4"
          textAnchor="middle"
        >
          accenture
        </text>
        {/* Real Accent Chevron > */}
        <path
          d="M42.5 4.5l3.8 3.5-3.8 3.5"
          stroke="#A100FF"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    ),
  },
  {
    name: 'Wipro',
    category: 'IT Services',
    badgeText: 'WIPRO',
    svgIcon: (
      <svg className="w-6 h-6 shrink-0" viewBox="0 0 32 32" fill="none" aria-label="Wipro Logo">
        {/* Authentic Multi-color Wipro Dots Wheel */}
        <circle cx="16" cy="6" r="2.6" fill="#F44336" />
        <circle cx="23" cy="9" r="2.6" fill="#FF9800" />
        <circle cx="26" cy="16" r="2.6" fill="#4CAF50" />
        <circle cx="23" cy="23" r="2.6" fill="#00BCD4" />
        <circle cx="16" cy="26" r="2.6" fill="#2196F3" />
        <circle cx="9" cy="23" r="2.6" fill="#3F51B5" />
        <circle cx="6" cy="16" r="2.6" fill="#9C27B0" />
        <circle cx="9" cy="9" r="2.6" fill="#E91E63" />
        <circle cx="16" cy="16" r="3.4" fill="#0D47A1" />
      </svg>
    ),
  },
  {
    name: 'Cognizant',
    category: 'IT Services',
    badgeText: 'CTS',
    svgIcon: (
      <svg className="w-6 h-6 shrink-0" viewBox="0 0 32 32" fill="none" aria-label="Cognizant Logo">
        {/* Official Cognizant Circular 'C' & Accent */}
        <path
          d="M16 4C9.4 4 4 9.4 4 16s5.4 12 12 12 12-5.4 12-12h-4.5c0 4.1-3.4 7.5-7.5 7.5S8.5 20.1 8.5 16 11.9 8.5 16 8.5c2.3 0 4.4 1 5.8 2.7l3.2-3.2C22.8 5.7 19.6 4 16 4z"
          fill="#0033A0"
        />
        <circle cx="24.5" cy="8" r="3.2" fill="#00B140" />
      </svg>
    ),
  },
  {
    name: 'IBM',
    category: 'Tech Giant',
    badgeText: 'IBM',
    svgIcon: (
      <svg viewBox="0 0 36 24" className="w-8 h-5 shrink-0" fill="none" aria-label="IBM Logo">
        {/* Authentic 8-Bar IBM Official Stripes */}
        <path
          d="M2 5h7.5M2 8.5h7.5M4 12h3.5M4 15.5h3.5M2 19h7.5M11.5 5h9M11.5 8.5h9M13.5 12h6.5M13.5 15.5h6.5M11.5 19h9M22.5 5h11.5M22.5 8.5h11.5M24.5 12h7.5M24.5 15.5h7.5M22.5 19h11.5"
          stroke="#0F62FE"
          strokeWidth="2.1"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    name: 'Deloitte',
    category: 'Consulting',
    svgIcon: (
      <svg className="w-8 h-5 shrink-0" viewBox="0 0 72 24" fill="none" aria-label="Deloitte Logo">
        <text
          x="3"
          y="17"
          fill="#000000"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="bold"
          fontSize="14"
          letterSpacing="-0.2"
        >
          Deloitte
        </text>
        <circle cx="63.5" cy="15.5" r="2.8" fill="#86BC25" />
      </svg>
    ),
  },
  {
    name: 'Meta',
    category: 'Tech Giant',
    svgIcon: (
      <svg className="w-6 h-5 shrink-0" viewBox="0 0 24 24" fill="none" aria-label="Meta Logo">
        {/* Official Meta Infinity Symbol */}
        <path
          d="M12 7.2c-2.4-2.8-5.3-4-8-2.6C1.6 5.8.5 8.7.5 12.2c0 3.9 1.7 7 4.2 7 2.2 0 4.1-1.7 5.7-4.4 1.6-2.7 2.7-4.8 4.2-4.8 1.4 0 2.5 1.5 2.5 3.8 0 2.8-1.5 5.5-3.5 5.5-.6 0-1.2-.2-1.7-.7l-1.4 2.2c.9.8 2 1.3 3.2 1.3 3.6 0 6.2-3.8 6.2-8.3 0-4.6-2.5-7.4-5.5-7.4-2.8 0-5.3 2.6-6.9 5.7-1.4 2.6-2.7 4.5-4.1 4.5-1.1 0-2-1.6-2-4.4 0-2.6.7-4.4 1.8-5 1.5-.7 3.3 0 4.7 2.1l2.4-1.6z"
          fill="#0668E1"
        />
      </svg>
    ),
  },
  {
    name: 'Apple',
    category: 'Tech Giant',
    svgIcon: (
      <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" aria-label="Apple Logo">
        <path
          d="M15.8 12.6c0-2.1 1.7-3.1 1.8-3.2-1-1.4-2.5-1.6-3-1.7-1.3-.1-2.5.8-3.2.8s-1.7-.8-2.8-.7c-1.4 0-2.7.8-3.4 2.1-1.5 2.6-.4 6.4 1 8.5.7 1 1.5 2.1 2.6 2.1 1 0 1.4-.7 2.7-.7 1.3 0 1.6.7 2.7.7 1.1 0 1.9-1 2.5-2 .8-1.1 1.1-2.2 1.1-2.3 0-.1-2-.8-2-3.6Z"
          fill="#1E293B"
        />
        <path
          d="M14.5 5.7c.6-.8 1-1.9.9-3-.9.1-2 .6-2.6 1.4-.6.7-1.1 1.8-1 2.9 1 .1 2.1-.5 2.7-1.3Z"
          fill="#1E293B"
        />
      </svg>
    ),
  },
  {
    name: 'Salesforce',
    category: 'Cloud CRM',
    svgIcon: (
      <svg className="w-7 h-5 shrink-0" viewBox="0 0 32 24" fill="none" aria-label="Salesforce Logo">
        <path
          d="M13.5 4.5c1.8-2 4.6-2.5 6.9-1.3 1.8-2.2 4.9-2.8 7.3-1.4 2.7 1.6 3.6 4.9 2.1 7.7 1.8.8 2.8 2.7 2.4 4.7-.4 2.2-2.3 3.8-4.5 3.8H5.5C2.5 18 0 15.5 0 12.5c0-2.6 1.8-4.8 4.4-5.3.8-2.5 3-4.3 5.7-4.4 1.3 0 2.5.6 3.4 1.7z"
          fill="#00A1E0"
        />
      </svg>
    ),
  },
  {
    name: 'Adobe',
    category: 'Creative Tech',
    svgIcon: (
      <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" aria-label="Adobe Logo">
        <path
          d="M14.6 2.5H23v19h-5.6l-2.8-7.5zM9.4 2.5H1v19h5.6l2.8-7.5zM12 9.5l3.5 9.5h-2.4l-1.1-3h-2.5l2-6.5z"
          fill="#FA0F00"
        />
      </svg>
    ),
  },
  {
    name: 'JPMorgan Chase',
    category: 'FinTech',
    badgeText: 'JPM',
    svgIcon: (
      <svg className="w-6 h-6 shrink-0" viewBox="0 0 32 32" fill="none" aria-label="Chase Logo">
        {/* Authentic Chase Octagon Symbol */}
        <path d="M13.5 2.5h5v9.5h-5z" fill="#117ACA" transform="rotate(45 16 16)" />
        <path d="M13.5 2.5h5v9.5h-5z" fill="#117ACA" transform="rotate(135 16 16)" />
        <path d="M13.5 2.5h5v9.5h-5z" fill="#117ACA" transform="rotate(225 16 16)" />
        <path d="M13.5 2.5h5v9.5h-5z" fill="#117ACA" transform="rotate(315 16 16)" />
      </svg>
    ),
  },
  {
    name: 'Tech Mahindra',
    category: 'IT Services',
    badgeText: 'TM',
    svgIcon: (
      <svg className="w-7 h-5 shrink-0" viewBox="0 0 42 24" fill="none" aria-label="Tech Mahindra Logo">
        <rect x="2" y="3" width="8" height="18" rx="2" fill="#E31837" />
        <rect x="14" y="8" width="8" height="13" rx="2" fill="#E31837" />
        <rect x="26" y="3" width="8" height="18" rx="2" fill="#4D4D4D" />
      </svg>
    ),
  },
  {
    name: 'LTIMindtree',
    category: 'IT Services',
    badgeText: 'LTI',
    svgIcon: (
      <svg className="w-10 h-5 shrink-0" viewBox="0 0 88 24" fill="none" aria-label="LTIMindtree Logo">
        <text
          x="44"
          y="17"
          fill="#002D62"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="bold"
          fontSize="11"
          textAnchor="middle"
        >
          LTI<tspan fill="#E31837">Mindtree</tspan>
        </text>
      </svg>
    ),
  },
  {
    name: 'Hexaware',
    category: 'IT Services',
    badgeText: 'HEX',
    svgIcon: (
      <svg className="w-9 h-5 shrink-0" viewBox="0 0 82 24" fill="none" aria-label="Hexaware Logo">
        <circle cx="10" cy="12" r="6" fill="#F47920" />
        <path d="M10 8v8M6 12h8" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
        <text
          x="47"
          y="16"
          fill="#1E293B"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="bold"
          fontSize="10.5"
          letterSpacing="0.5"
          textAnchor="middle"
        >
          HEXAWARE
        </text>
      </svg>
    ),
  },
  {
    name: 'HCLTech',
    category: 'IT Services',
    badgeText: 'HCL',
    svgIcon: (
      <svg className="w-9 h-5 shrink-0" viewBox="0 0 74 24" fill="none" aria-label="HCLTech Logo">
        <text
          x="37"
          y="17"
          fill="#001B79"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="13"
          letterSpacing="0.4"
          textAnchor="middle"
        >
          HCL<tspan fill="#5C24FF">Tech</tspan>
        </text>
      </svg>
    ),
  },
  {
    name: 'Persistent',
    category: 'Product & Tech',
    badgeText: 'PSI',
    svgIcon: (
      <svg className="w-9 h-5 shrink-0" viewBox="0 0 82 24" fill="none" aria-label="Persistent Logo">
        <circle cx="10" cy="12" r="5.5" fill="#EE3124" />
        <circle cx="10" cy="12" r="2.2" fill="#FFFFFF" />
        <text
          x="47"
          y="16"
          fill="#1E293B"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="bold"
          fontSize="11"
          textAnchor="middle"
        >
          Persistent
        </text>
      </svg>
    ),
  },
];

export const CompaniesSlidingMarquee: React.FC = () => {
  const duplicatedPartners = [...PLACEMENT_COMPANIES, ...PLACEMENT_COMPANIES];

  return (
    <section className="py-12 sm:py-16 relative overflow-hidden">
      {/* Section Header with Hridayam Palette Badge */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3 mb-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/85 border-2 border-white text-[#1E428E] text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-xs">
          <GoogleIcon name="verified" size={16} className="text-[#3869C3]" filled />
          <span>3,500+ Learners Have Been Placed By Our India's Largest Placement Team</span>
          <DoodleSparkle className="w-4 h-4 text-[#3869C3]" />
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1E428E] font-display tracking-tight">
          3,500+ Learners Have Been Placed By Our{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E428E] via-[#3869C3] to-[#5A87D7]">
            India's Largest Placement Team
          </span>
        </h2>

        <p className="text-xs sm:text-sm text-[#1E428E]/85 max-w-2xl mx-auto leading-relaxed font-medium">
          From global product giants to premier tech consultancies, our students launch their careers across 2,000+ top enterprises.
        </p>
      </div>

      {/* Glassy Sliding Track Wrapper */}
      <div className="marquee-wrapper relative w-full overflow-hidden py-4">
        {/* Soft edge blur gradient masks in matching background light blue */}
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-r from-[#94BCF1] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-l from-[#94BCF1] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee-continuous flex items-center gap-4 sm:gap-6">
          {duplicatedPartners.map((company, index) => (
            <div
              key={`${company.name}-${index}`}
              className="glass-card rounded-[24px] px-5 py-3.5 flex items-center gap-3.5 shrink-0 cursor-default border-2 border-white hover:border-[#3869C3] transition-all shadow-sm hover:shadow-md group backdrop-blur-xl text-[#1E428E]"
            >
              {/* Real Company Logo Plate with Pristine White Backing */}
              <div className="min-w-[48px] h-10 px-2.5 rounded-2xl bg-white border border-[#D3E5FD] flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                {company.svgIcon}
              </div>

              {/* Company Info */}
              <div className="text-left space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-bold text-[#1E428E] group-hover:text-[#3869C3] transition-colors leading-snug">
                    {company.name}
                  </span>
                  {company.badgeText && (
                    <span className="text-[9px] font-mono font-bold bg-[#D3E5FD] text-[#1E428E] px-1.5 py-0.2 rounded border border-white">
                      {company.badgeText}
                    </span>
                  )}
                </div>
                <div className="text-[10px] font-semibold text-[#1E428E] bg-white/70 px-2 py-0.5 rounded-full inline-block border border-[#D3E5FD]">
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
