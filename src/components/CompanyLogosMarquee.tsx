import React from 'react';

interface CompanyItem {
  id: string;
  name: string;
  sector: string;
  mark: React.ReactNode;
}

const TOP_COMPANIES_ROW_1: CompanyItem[] = [
  {
    id: 'google',
    name: 'Google',
    sector: 'Cloud & AI',
    mark: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" aria-hidden="true">
        <path
          d="M21.8 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.5c-.2 1.2-.9 2.3-2 3v2.5h3.2c1.9-1.7 3.1-4.3 3.1-7.3Z"
          fill="#4285F4"
        />
        <path
          d="M12 22c2.7 0 5-.9 6.7-2.5l-3.2-2.5c-.9.6-2.1 1-3.5 1-2.7 0-5-1.8-5.8-4.3H2.9v2.6C4.6 19.7 8 22 12 22Z"
          fill="#34A853"
        />
        <path
          d="M6.2 13.7c-.2-.6-.3-1.1-.3-1.7s.1-1.1.3-1.7V7.7H2.9C2.3 9 2 10.5 2 12s.3 3 .9 4.3l3.3-2.6Z"
          fill="#FBBC05"
        />
        <path
          d="M12 6c1.5 0 2.8.5 3.9 1.5l2.9-2.9C17 2.9 14.7 2 12 2 8 2 4.6 4.3 2.9 7.7l3.3 2.6C7 7.8 9.3 6 12 6Z"
          fill="#EA4335"
        />
      </svg>
    ),
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    sector: 'Enterprise Software',
    mark: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="8.5" height="8.5" fill="#F25022" />
        <rect x="12.5" y="3" width="8.5" height="8.5" fill="#7FBA00" />
        <rect x="3" y="12.5" width="8.5" height="8.5" fill="#00A4EF" />
        <rect x="12.5" y="12.5" width="8.5" height="8.5" fill="#FFB900" />
      </svg>
    ),
  },
  {
    id: 'ibm',
    name: 'IBM',
    sector: 'Systems & Research',
    mark: (
      <svg viewBox="0 0 36 24" className="w-7 h-5" fill="none" aria-hidden="true">
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
    id: 'amazon',
    name: 'Amazon',
    sector: 'Cloud & Commerce',
    mark: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" aria-hidden="true">
        <path
          d="M4 16c4.5 3.2 11.2 3.3 15.8.2"
          stroke="#FF9900"
          strokeWidth="2.1"
          strokeLinecap="round"
        />
        <path
          d="M17.5 14.5l2.6 1.2-1.1 2.6"
          stroke="#FF9900"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.5 12.2V8.2c0-1.6 1.2-2.6 3.2-2.6s3.2 1 3.2 2.6v4M8.5 10h6.4"
          stroke="#111827"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: 'apple',
    name: 'Apple',
    sector: 'Hardware & Design',
    mark: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" aria-hidden="true">
        <path
          d="M15.8 12.6c0-2.1 1.7-3.1 1.8-3.2-1-1.4-2.5-1.6-3-1.7-1.3-.1-2.5.8-3.2.8s-1.7-.8-2.8-.7c-1.4 0-2.7.8-3.4 2.1-1.5 2.6-.4 6.4 1 8.5.7 1 1.5 2.1 2.6 2.1 1 0 1.4-.7 2.7-.7 1.3 0 1.6.7 2.7.7 1.1 0 1.9-1 2.5-2 .8-1.1 1.1-2.2 1.1-2.3 0-.1-2-.8-2-3.6Z"
          fill="#111827"
        />
        <path
          d="M13.8 6.4c.6-.7 1-1.7.9-2.7-.8 0-1.9.6-2.5 1.3-.5.6-1 1.6-.9 2.6 1 .1 1.9-.5 2.5-1.2Z"
          fill="#111827"
        />
      </svg>
    ),
  },
  {
    id: 'meta',
    name: 'Meta',
    sector: 'Social & AI',
    mark: (
      <svg viewBox="0 0 28 24" className="w-6 h-5" fill="none" aria-hidden="true">
        <path
          d="M4.5 15.8c0-3.8 2.4-7.8 4.8-7.8 2.2 0 3.7 2.7 4.7 4.7 1-2 2.5-4.7 4.7-4.7 2.4 0 4.8 4 4.8 7.8 0 2.1-1.3 3.2-2.9 3.2-1.9 0-3.4-1.8-5.1-4.8l-1.5-2.6-1.5 2.6C10.8 17.2 9.3 19 7.4 19c-1.6 0-2.9-1.1-2.9-3.2Z"
          stroke="#0668E1"
          strokeWidth="2.3"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 'nvidia',
    name: 'NVIDIA',
    sector: 'Accelerated Computing',
    mark: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" aria-hidden="true">
        <path
          d="M3.5 12c2.8-4 7.7-5.8 12.2-4.4 2.4.8 4.2 2.4 5 4.4-1.8 3.2-5.4 5.2-9.4 4.8-3-.3-5.2-2-6.1-4.2"
          stroke="#76B900"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <circle cx="13" cy="12" r="2.7" fill="#76B900" />
      </svg>
    ),
  },
  {
    id: 'adobe',
    name: 'Adobe',
    sector: 'Creative Cloud',
    mark: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" aria-hidden="true">
        <path
          d="M14.5 4H21v16L14.5 4ZM9.5 4H3v16L9.5 4ZM12 9.8L16.2 20h-2.8l-1.3-3.2H9.2L12 9.8Z"
          fill="#FF0000"
        />
      </svg>
    ),
  },
  {
    id: 'salesforce',
    name: 'Salesforce',
    sector: 'CRM Platform',
    mark: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" aria-hidden="true">
        <path
          d="M7.2 17.5h9.8a3.5 3.5 0 0 0 .5-7A4.5 4.5 0 0 0 9 9.2a3.8 3.8 0 0 0-5 3.4 3.5 3.5 0 0 0 3.2 4.9Z"
          fill="#00A1E0"
        />
      </svg>
    ),
  },
  {
    id: 'oracle',
    name: 'Oracle',
    sector: 'Enterprise Cloud',
    mark: (
      <svg viewBox="0 0 28 24" className="w-6 h-5" fill="none" aria-hidden="true">
        <rect x="3" y="7" width="22" height="10" rx="5" stroke="#F80000" strokeWidth="2.8" />
      </svg>
    ),
  },
  {
    id: 'sap',
    name: 'SAP',
    sector: 'Enterprise ERP',
    mark: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" aria-hidden="true">
        <path d="M2.5 5h19L13 19H2.5V5Z" fill="#0FAAFF" />
        <path d="M5.5 11.5h5.5" stroke="#FFFFFF" strokeWidth="1.9" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'intel',
    name: 'Intel',
    sector: 'Silicon Engineering',
    mark: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" aria-hidden="true">
        <ellipse
          cx="12"
          cy="12"
          rx="9"
          ry="5.5"
          transform="rotate(-18 12 12)"
          stroke="#0068B5"
          strokeWidth="2"
        />
        <circle cx="12" cy="12" r="2.4" fill="#00C7FD" />
      </svg>
    ),
  },
];

const TOP_COMPANIES_ROW_2: CompanyItem[] = [
  {
    id: 'cisco',
    name: 'Cisco',
    sector: 'Networking & Security',
    mark: (
      <svg viewBox="0 0 28 24" className="w-6 h-5" fill="none" aria-hidden="true">
        <path
          d="M4 13v3M8 10v6M12 7v9M16 10v6M20 7v9M24 13v3"
          stroke="#049FD9"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: 'stripe',
    name: 'Stripe',
    sector: 'Financial Infrastructure',
    mark: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" aria-hidden="true">
        <rect x="3.5" y="3.5" width="17" height="17" rx="4" fill="#635BFF" />
        <path
          d="M9.5 14.5c0 1 1 1.5 2.5 1.5 1.8 0 2.8-.7 2.8-1.9 0-2.5-5-1.5-5-4 0-1.1 1-1.9 2.6-1.9 1.3 0 2.1.4 2.4.7"
          stroke="#FFFFFF"
          strokeWidth="1.9"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: 'shopify',
    name: 'Shopify',
    sector: 'Global Commerce',
    mark: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" aria-hidden="true">
        <path d="M6 7.5L18 6l1.5 13.5L4.5 20 6 7.5Z" fill="#95BF47" />
        <path d="M9.5 7.2a2.5 2.5 0 0 1 5 0" stroke="#5E8E3E" strokeWidth="1.9" strokeLinecap="round" />
        <path d="M10.5 14.5c0 .9.8 1.3 1.7 1.3 1 0 1.6-.5 1.6-1.3 0-1.5-3.2-.9-3.2-2.4 0-.7.7-1.2 1.6-1.2.8 0 1.3.2 1.5.4" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'figma',
    name: 'Figma',
    sector: 'Product Design',
    mark: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" aria-hidden="true">
        <circle cx="9.5" cy="6.5" r="2.8" fill="#F24E1E" />
        <circle cx="14.5" cy="6.5" r="2.8" fill="#FF7262" />
        <circle cx="9.5" cy="12" r="2.8" fill="#A259FF" />
        <circle cx="14.5" cy="12" r="2.8" fill="#1ABCFE" />
        <circle cx="9.5" cy="17.5" r="2.8" fill="#0ACF83" />
      </svg>
    ),
  },
  {
    id: 'atlassian',
    name: 'Atlassian',
    sector: 'Engineering Teams',
    mark: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" aria-hidden="true">
        <path
          d="M8.5 11.5c-.7-1-1.8-.8-2.3.3L3.2 19a1 1 0 0 0 .9 1.4h5.6a1 1 0 0 0 .9-.7c.8-2.8.1-6-2.1-8.2Z"
          fill="#2684FF"
        />
        <path
          d="M12.5 4.2c-1.8 3.2-2.1 7.2-.4 10.7l2.5 4.9a1 1 0 0 0 .9.6h5.4a1 1 0 0 0 .9-1.4L14.3 4.2a1 1 0 0 0-1.8 0Z"
          fill="#0052CC"
        />
      </svg>
    ),
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    sector: 'Growth & Marketing',
    mark: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" aria-hidden="true">
        <circle cx="14" cy="12" r="4" stroke="#FF7A59" strokeWidth="2.2" />
        <circle cx="14" cy="5" r="1.9" fill="#FF7A59" />
        <circle cx="6.5" cy="12" r="2.1" fill="#FF7A59" />
        <path d="M14 7v1M10 12H8.5M16.8 14.8l2 2" stroke="#FF7A59" strokeWidth="1.9" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'netflix',
    name: 'Netflix',
    sector: 'Streaming & Media',
    mark: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" aria-hidden="true">
        <path d="M6.5 4v16h3V10.5L14.5 20h3V4h-3v9.5L9.5 4h-3Z" fill="#E50914" />
      </svg>
    ),
  },
  {
    id: 'uber',
    name: 'Uber',
    sector: 'Mobility Tech',
    mark: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="4" fill="#111827" />
        <rect x="9.5" y="9.5" width="5" height="5" rx="0.8" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    id: 'accenture',
    name: 'Accenture',
    sector: 'Digital Consulting',
    mark: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" aria-hidden="true">
        <path
          d="M6 6l12 6-12 6"
          stroke="#A100FF"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 'infosys',
    name: 'Infosys',
    sector: 'IT & Automation',
    mark: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="8" stroke="#007CC3" strokeWidth="2" />
        <path
          d="M8 15l4-7 4 7"
          stroke="#007CC3"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 'tcs',
    name: 'TCS',
    sector: 'Enterprise Tech',
    mark: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" aria-hidden="true">
        <polygon points="12,4 20,9 20,15 12,20 4,15 4,9" stroke="#005696" strokeWidth="2" />
        <circle cx="12" cy="12" r="2.7" fill="#E31837" />
      </svg>
    ),
  },
  {
    id: 'deloitte',
    name: 'Deloitte',
    sector: 'Strategy & BI',
    mark: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" aria-hidden="true">
        <path d="M5.5 6h4.5a5.5 5.5 0 0 1 0 11H5.5V6Z" stroke="#111827" strokeWidth="2.2" />
        <circle cx="18.5" cy="16.5" r="2.4" fill="#86BC25" />
      </svg>
    ),
  },
];

function CompanyPillTile({ company }: { company: CompanyItem }) {
  return (
    <div className="edu-card rounded-xl px-4 py-3 flex items-center gap-3.5 shrink-0 min-w-[215px]">
      <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
        {company.mark}
      </div>
      <div className="min-w-0">
        <p className="font-display text-sm font-semibold text-[#0F172A] tracking-tight truncate">
          {company.name}
        </p>
        <p className="text-[11px] text-[#64748B] truncate">{company.sector}</p>
      </div>
    </div>
  );
}

export function CompanyLogosMarquee() {
  const row1 = [...TOP_COMPANIES_ROW_1, ...TOP_COMPANIES_ROW_1];
  const row2 = [...TOP_COMPANIES_ROW_2, ...TOP_COMPANIES_ROW_2];

  return (
    <section
      aria-label="Global technology and enterprise companies"
      className="py-12 overflow-hidden bg-[#F8FAFC] border-y border-slate-200/80"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 mb-6">
        <div className="edu-panel rounded-2xl p-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-[#1D4ED8] tracking-wide">
              Industry Benchmark &amp; Hiring Ecosystem · 24 Global Leaders
            </p>
            <h2 className="font-display text-xl sm:text-2xl font-semibold text-[#0F172A] mt-1">
              Skills mapped to workflows used across leading engineering &amp; media teams
            </h2>
          </div>
          <p className="font-mono-tabular text-xs font-semibold text-[#475569] shrink-0">
            24 Featured Organizations
          </p>
        </div>
      </div>

      <div className="marquee-container space-y-4">
        <div className="overflow-hidden">
          <div className="animate-marquee-glide flex items-center gap-4 px-4">
            {row1.map((company, idx) => (
              <CompanyPillTile key={`${company.id}-r1-${idx}`} company={company} />
            ))}
          </div>
        </div>

        <div className="overflow-hidden">
          <div className="animate-marquee-glide-reverse flex items-center gap-4 px-4">
            {row2.map((company, idx) => (
              <CompanyPillTile key={`${company.id}-r2-${idx}`} company={company} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
