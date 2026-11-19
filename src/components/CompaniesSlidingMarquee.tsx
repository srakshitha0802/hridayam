import React from 'react';

export interface CompanyPartner {
  name: string;
  category: string;
  svgIcon: React.ReactNode;
}

export const PLACEMENT_COMPANIES: CompanyPartner[] = [
  {
    name: 'Infosys',
    category: 'IT Services',
    svgIcon: (
      <svg className="h-6 w-auto shrink-0" viewBox="0 0 82 24" fill="none" aria-label="Infosys Logo">
        <text
          x="41"
          y="17"
          fill="#007CC3"
          fontFamily="Plus Jakarta Sans, Arial, sans-serif"
          fontWeight="800"
          fontSize="16"
          letterSpacing="-0.5"
          textAnchor="middle"
        >
          Infosys
        </text>
      </svg>
    ),
  },
  {
    name: 'TCS',
    category: 'Tata Group',
    svgIcon: (
      <svg className="h-6 w-auto shrink-0" viewBox="0 0 64 26" fill="none" aria-label="TCS Logo">
        <text
          x="32"
          y="16"
          fill="#005696"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="15"
          letterSpacing="0.8"
          textAnchor="middle"
        >
          tcs
        </text>
        <rect x="10" y="20" width="44" height="2.4" rx="1.2" fill="url(#tcs-brand-grad)" />
        <defs>
          <linearGradient id="tcs-brand-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#EB008B" />
            <stop offset="50%" stopColor="#00AEEF" />
            <stop offset="100%" stopColor="#F7941D" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: 'Wipro',
    category: 'IT Services',
    svgIcon: (
      <svg className="w-7 h-7 shrink-0" viewBox="0 0 32 32" fill="none" aria-label="Wipro Logo">
        <circle cx="16" cy="5.5" r="2.5" fill="#F44336" />
        <circle cx="23.2" cy="8.8" r="2.5" fill="#FF9800" />
        <circle cx="26.5" cy="16" r="2.5" fill="#4CAF50" />
        <circle cx="23.2" cy="23.2" r="2.5" fill="#00BCD4" />
        <circle cx="16" cy="26.5" r="2.5" fill="#2196F3" />
        <circle cx="8.8" cy="23.2" r="2.5" fill="#3F51B5" />
        <circle cx="5.5" cy="16" r="2.5" fill="#9C27B0" />
        <circle cx="8.8" cy="8.8" r="2.5" fill="#E91E63" />
        <circle cx="16" cy="16" r="3.4" fill="#0D47A1" />
      </svg>
    ),
  },
  {
    name: 'Accenture India',
    category: 'Consulting',
    svgIcon: (
      <svg className="h-6 w-auto shrink-0" viewBox="0 0 88 26" fill="none" aria-label="Accenture Logo">
        <path
          d="M45 3.5l4.5 3.6-4.5 3.6"
          stroke="#A100FF"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text
          x="44"
          y="21"
          fill="#111827"
          fontFamily="Plus Jakarta Sans, system-ui, sans-serif"
          fontWeight="800"
          fontSize="13.5"
          letterSpacing="-0.4"
          textAnchor="middle"
        >
          accenture
        </text>
      </svg>
    ),
  },
  {
    name: 'Capgemini',
    category: 'IT Services',
    svgIcon: (
      <svg className="w-7 h-7 shrink-0" viewBox="0 0 32 32" fill="none" aria-label="Capgemini Logo">
        <path
          d="M16 2.5C11.5 7.8 6.5 12.2 6.5 17c0 3.9 3.1 7 7 7 1.1 0 2.2-.3 3.1-.7v3.2h-3v1.8h7.8v-1.8h-3V23.3c.9.4 2 .7 3.1.7 3.9 0 7-3.1 7-7 0-4.8-5-9.2-9.5-14.5z"
          fill="#0070AD"
        />
        <circle cx="16.4" cy="14.2" r="3" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    name: 'Zoho',
    category: 'SaaS Product',
    svgIcon: (
      <svg className="h-6 w-auto shrink-0" viewBox="0 0 92 26" fill="none" aria-label="Zoho Logo">
        <rect x="2" y="3" width="20" height="20" rx="4" fill="#E42527" />
        <rect x="24" y="3" width="20" height="20" rx="4" fill="#089949" />
        <rect x="46" y="3" width="20" height="20" rx="4" fill="#226DB4" />
        <rect x="68" y="3" width="20" height="20" rx="4" fill="#F9B21D" />
        <text x="12" y="17.5" fill="#FFFFFF" fontWeight="900" fontSize="12" textAnchor="middle">Z</text>
        <text x="34" y="17.5" fill="#FFFFFF" fontWeight="900" fontSize="12" textAnchor="middle">O</text>
        <text x="56" y="17.5" fill="#FFFFFF" fontWeight="900" fontSize="12" textAnchor="middle">H</text>
        <text x="78" y="17.5" fill="#FFFFFF" fontWeight="900" fontSize="12" textAnchor="middle">O</text>
      </svg>
    ),
  },
  {
    name: 'Razorpay',
    category: 'FinTech',
    svgIcon: (
      <svg className="h-6 w-auto shrink-0" viewBox="0 0 108 26" fill="none" aria-label="Razorpay Logo">
        <path d="M11 4L6 20h4.2l5-16H11z" fill="#3395FF" />
        <path d="M16.2 9.5L13 20h4.2l3.2-10.5h-4.2z" fill="#072654" />
        <text
          x="24"
          y="18"
          fill="#072654"
          fontFamily="Plus Jakarta Sans, system-ui, sans-serif"
          fontWeight="800"
          fontSize="14"
          letterSpacing="-0.3"
        >
          Razorpay
        </text>
      </svg>
    ),
  },
  {
    name: 'Flipkart',
    category: 'E-Commerce',
    svgIcon: (
      <svg className="h-6 w-auto shrink-0" viewBox="0 0 98 26" fill="none" aria-label="Flipkart Logo">
        <rect x="2" y="3" width="20" height="20" rx="5" fill="#2874F0" />
        <text x="12" y="18" fill="#FFE500" fontFamily="Georgia, serif" fontWeight="900" fontStyle="italic" fontSize="15" textAnchor="middle">
          f
        </text>
        <text
          x="28"
          y="18"
          fill="#2874F0"
          fontFamily="Plus Jakarta Sans, system-ui, sans-serif"
          fontWeight="800"
          fontStyle="italic"
          fontSize="14.5"
        >
          Flipkart
        </text>
      </svg>
    ),
  },
  {
    name: 'Cognizant',
    category: 'IT Services',
    svgIcon: (
      <svg className="w-7 h-7 shrink-0" viewBox="0 0 32 32" fill="none" aria-label="Cognizant Logo">
        <path
          d="M16 4C9.4 4 4 9.4 4 16s5.4 12 12 12 12-5.4 12-12h-4.5c0 4.1-3.4 7.5-7.5 7.5S8.5 20.1 8.5 16 11.9 8.5 16 8.5c2.3 0 4.4 1 5.8 2.7l3.2-3.2C22.8 5.7 19.6 4 16 4z"
          fill="#0033A0"
        />
        <circle cx="24.5" cy="8" r="3.2" fill="#00B140" />
      </svg>
    ),
  },
  {
    name: 'LTIMindtree',
    category: 'IT Services',
    svgIcon: (
      <svg className="h-6 w-auto shrink-0" viewBox="0 0 100 24" fill="none" aria-label="LTIMindtree Logo">
        <text
          x="50"
          y="17"
          fill="#002D62"
          fontFamily="Plus Jakarta Sans, system-ui, sans-serif"
          fontWeight="800"
          fontSize="13.5"
          textAnchor="middle"
        >
          LTI<tspan fill="#E31837">Mindtree</tspan>
        </text>
      </svg>
    ),
  },
  {
    name: 'Deloitte India',
    category: 'Consulting',
    svgIcon: (
      <svg className="h-6 w-auto shrink-0" viewBox="0 0 84 24" fill="none" aria-label="Deloitte Logo">
        <text
          x="6"
          y="17"
          fill="#111827"
          fontFamily="Plus Jakarta Sans, system-ui, sans-serif"
          fontWeight="900"
          fontSize="15"
          letterSpacing="-0.3"
        >
          Deloitte
        </text>
        <circle cx="74" cy="15.5" r="3" fill="#86BC25" />
      </svg>
    ),
  },
  {
    name: 'Tech Mahindra',
    category: 'IT Services',
    svgIcon: (
      <svg className="h-6 w-auto shrink-0" viewBox="0 0 44 24" fill="none" aria-label="Tech Mahindra Logo">
        <rect x="2" y="3" width="9" height="18" rx="2" fill="#E31837" />
        <rect x="15" y="8" width="9" height="13" rx="2" fill="#E31837" />
        <rect x="28" y="3" width="9" height="18" rx="2" fill="#4D4D4D" />
      </svg>
    ),
  },
  {
    name: 'HCLTech',
    category: 'IT Services',
    svgIcon: (
      <svg className="h-6 w-auto shrink-0" viewBox="0 0 84 24" fill="none" aria-label="HCLTech Logo">
        <text
          x="42"
          y="17"
          fill="#001B79"
          fontFamily="Plus Jakarta Sans, system-ui, sans-serif"
          fontWeight="900"
          fontSize="14.5"
          textAnchor="middle"
        >
          HCL<tspan fill="#5C24FF">Tech</tspan>
        </text>
      </svg>
    ),
  },
  {
    name: 'Persistent Systems',
    category: 'Product Engineering',
    svgIcon: (
      <svg className="h-6 w-auto shrink-0" viewBox="0 0 96 24" fill="none" aria-label="Persistent Logo">
        <circle cx="10" cy="12" r="5.5" fill="#EE3124" />
        <circle cx="10" cy="12" r="2.2" fill="#FFFFFF" />
        <text
          x="21"
          y="16.5"
          fill="#1E293B"
          fontFamily="Plus Jakarta Sans, system-ui, sans-serif"
          fontWeight="800"
          fontSize="13"
        >
          Persistent
        </text>
      </svg>
    ),
  },
  {
    name: 'Microsoft',
    category: 'Tech Giant',
    svgIcon: (
      <svg className="w-6 h-6 shrink-0" viewBox="0 0 21 21" aria-label="Microsoft Logo">
        <rect x="1" y="1" width="9" height="9" fill="#F25022" />
        <rect x="11" y="1" width="9" height="9" fill="#7FBA00" />
        <rect x="1" y="11" width="9" height="9" fill="#00A4EF" />
        <rect x="11" y="11" width="9" height="9" fill="#FFB900" />
      </svg>
    ),
  },
  {
    name: 'Google',
    category: 'Tech Giant',
    svgIcon: (
      <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="none" aria-label="Google Logo">
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
    name: 'Amazon',
    category: 'Cloud & Retail',
    svgIcon: (
      <svg className="h-6 w-auto shrink-0" viewBox="0 0 74 26" fill="none" aria-label="Amazon Logo">
        <text
          x="37"
          y="15"
          fill="#232F3E"
          fontFamily="Plus Jakarta Sans, system-ui, sans-serif"
          fontWeight="800"
          fontSize="14.5"
          textAnchor="middle"
        >
          amazon
        </text>
        <path
          d="M16 19.5c11 4.2 28 4.2 40.5-.5"
          stroke="#FF9900"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M53.5 17.2l4.2 1.2-1.8 3.8"
          stroke="#FF9900"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: 'IBM',
    category: 'Enterprise Tech',
    svgIcon: (
      <svg viewBox="0 0 36 24" className="h-6 w-auto shrink-0" fill="none" aria-label="IBM Logo">
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
    name: 'Salesforce',
    category: 'Cloud CRM',
    svgIcon: (
      <svg className="h-6 w-auto shrink-0" viewBox="0 0 34 24" fill="none" aria-label="Salesforce Logo">
        <path
          d="M13.5 4.5c1.8-2 4.6-2.5 6.9-1.3 1.8-2.2 4.9-2.8 7.3-1.4 2.7 1.6 3.6 4.9 2.1 7.7 1.8.8 2.8 2.7 2.4 4.7-.4 2.2-2.3 3.8-4.5 3.8H5.5C2.5 18 0 15.5 0 12.5c0-2.6 1.8-4.8 4.4-5.3.8-2.5 3-4.3 5.7-4.4 1.3 0 2.5.6 3.4 1.7z"
          fill="#00A1E0"
        />
      </svg>
    ),
  },
  {
    name: 'Adobe',
    category: 'Creative Cloud',
    svgIcon: (
      <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="none" aria-label="Adobe Logo">
        <path
          d="M14.6 2.5H23v19h-5.6l-2.8-7.5zM9.4 2.5H1v19h5.6l2.8-7.5zM12 9.5l3.5 9.5h-2.4l-1.1-3h-2.5l2-6.5z"
          fill="#FA0F00"
        />
      </svg>
    ),
  },
  {
    name: 'JPMorgan Chase',
    category: 'Global Banking',
    svgIcon: (
      <svg className="w-6 h-6 shrink-0" viewBox="0 0 32 32" fill="none" aria-label="Chase Logo">
        <path d="M13.5 2.5h5v9.5h-5z" fill="#117ACA" transform="rotate(45 16 16)" />
        <path d="M13.5 2.5h5v9.5h-5z" fill="#117ACA" transform="rotate(135 16 16)" />
        <path d="M13.5 2.5h5v9.5h-5z" fill="#117ACA" transform="rotate(225 16 16)" />
        <path d="M13.5 2.5h5v9.5h-5z" fill="#117ACA" transform="rotate(315 16 16)" />
      </svg>
    ),
  },
  {
    name: 'Hexaware',
    category: 'IT Services',
    svgIcon: (
      <svg className="h-6 w-auto shrink-0" viewBox="0 0 92 24" fill="none" aria-label="Hexaware Logo">
        <circle cx="10" cy="12" r="6" fill="#F47920" />
        <path d="M10 8v8M6 12h8" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
        <text
          x="21"
          y="16"
          fill="#1E293B"
          fontFamily="Plus Jakarta Sans, system-ui, sans-serif"
          fontWeight="800"
          fontSize="11.5"
          letterSpacing="0.4"
        >
          HEXAWARE
        </text>
      </svg>
    ),
  },
  {
    name: 'Nykaa',
    category: 'Consumer Tech',
    svgIcon: (
      <svg className="h-6 w-auto shrink-0" viewBox="0 0 78 24" fill="none" aria-label="Nykaa Logo">
        <text
          x="39"
          y="17.5"
          fill="#FC2779"
          fontFamily="Plus Jakarta Sans, system-ui, sans-serif"
          fontWeight="900"
          fontSize="15"
          letterSpacing="1.4"
          textAnchor="middle"
        >
          NYKAA
        </text>
      </svg>
    ),
  },
  {
    name: 'Swiggy',
    category: 'Consumer Tech',
    svgIcon: (
      <svg className="h-6 w-auto shrink-0" viewBox="0 0 92 26" fill="none" aria-label="Swiggy Logo">
        <path
          d="M12 3c-4.4 0-8 3.5-8 7.8 0 5.4 6.6 11.4 7.4 12.1a.9.9 0 0 0 1.2 0c.8-.7 7.4-6.7 7.4-12.1C20 6.5 16.4 3 12 3z"
          fill="#FC8019"
        />
        <circle cx="12" cy="10.5" r="2.7" fill="#FFFFFF" />
        <text
          x="26"
          y="18"
          fill="#FC8019"
          fontFamily="Plus Jakarta Sans, system-ui, sans-serif"
          fontWeight="900"
          fontSize="14.5"
        >
          Swiggy
        </text>
      </svg>
    ),
  },
];

export const CompanyLogosInlineStrip: React.FC<{
  transparent?: boolean;
  pastel?: boolean;
}> = ({ transparent = false, pastel = false }) => {
  const duplicated = [...PLACEMENT_COMPANIES, ...PLACEMENT_COMPANIES];

  return (
    <div
      className={`${
        pastel
          ? 'py-3 overflow-hidden marquee-wrapper relative'
          : transparent
            ? 'landing-card-clear rounded-2xl py-4 overflow-hidden marquee-wrapper relative'
            : 'bg-white rounded-2xl border border-[#BFD6F6] py-4 overflow-hidden marquee-wrapper relative shadow-xs'
      }`}
    >
      {!pastel && (
        <>
          <div
            className={`absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r ${
              transparent ? 'from-[#071433]/65' : 'from-white'
            } to-transparent z-10 pointer-events-none`}
          />
          <div
            className={`absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l ${
              transparent ? 'from-[#071433]/65' : 'from-white'
            } to-transparent z-10 pointer-events-none`}
          />
        </>
      )}

      <div className="animate-marquee-continuous flex items-center gap-4 px-4">
        {duplicated.map((company, idx) => (
          <div
            key={`${company.name}-${idx}`}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl shrink-0 transition-transform duration-300 hover:-translate-y-1 ${
              pastel
                ? 'pastel-glass-card metallic-sheen-card min-w-[168px]'
                : transparent
                  ? 'bg-white/12 border border-white/28 backdrop-blur-xs'
                  : 'bg-[#F8FBFF] border border-[#D3E5FD]'
            }`}
          >
            <div
              className={`h-8 min-w-[36px] px-2 rounded-lg flex items-center justify-center shrink-0 ${
                pastel
                  ? 'bg-white/95 border border-[#D3E5FD]'
                  : transparent
                    ? 'bg-white/95 border border-white/80'
                    : 'bg-white border border-slate-200'
              }`}
            >
              {company.svgIcon}
            </div>
            <div className="leading-tight">
              <div
                className={`text-xs font-extrabold whitespace-nowrap ${
                  pastel
                    ? 'text-[#132C63]'
                    : transparent
                      ? 'text-white text-video-crisp'
                      : 'text-[#0B1B3D]'
                }`}
              >
                {company.name}
              </div>
              <div
                className={`text-[10px] font-semibold whitespace-nowrap ${
                  pastel
                    ? 'text-[#5273A8]'
                    : transparent
                      ? 'text-[#CFE3FF]'
                      : 'text-slate-500'
                }`}
              >
                {company.category}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const CompaniesSlidingMarquee: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
      <div className="text-center max-w-2xl mx-auto space-y-1">
        <p className="text-xs font-extrabold uppercase tracking-widest text-[#1E428E]">
          2,000+ Verified Hiring Partners
        </p>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1B3D]">
          Where Hridayam Graduates Get Hired
        </h2>
      </div>
      <CompanyLogosInlineStrip />
    </section>
  );
};
