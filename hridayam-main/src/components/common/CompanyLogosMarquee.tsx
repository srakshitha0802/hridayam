import React from 'react';

/**
 * Companies the team has worked with.
 * To use real logos: put the image files in /public/company-logos/
 * and update `src` + `name` below. Add or remove entries freely.
 */
const COMPANY_LOGOS: { name: string; src: string }[] = [
  { name: 'Company 1', src: 'company-logos/company-1.svg' },
  { name: 'Company 2', src: 'company-logos/company-2.svg' },
  { name: 'Company 3', src: 'company-logos/company-3.svg' },
  { name: 'Company 4', src: 'company-logos/company-4.svg' },
  { name: 'Company 5', src: 'company-logos/company-5.svg' },
  { name: 'Company 6', src: 'company-logos/company-6.svg' },
  { name: 'Company 7', src: 'company-logos/company-7.svg' },
  { name: 'Company 8', src: 'company-logos/company-8.svg' },
];

export const CompanyLogosMarquee: React.FC = () => {
  const base = import.meta.env.BASE_URL;

  const renderSet = (keyPrefix: string, hidden = false) => (
    <div className="logo-marquee-set" aria-hidden={hidden || undefined}>
      {COMPANY_LOGOS.map((logo) => (
        <img
          key={`${keyPrefix}-${logo.name}`}
          src={`${base}${logo.src}`}
          alt={hidden ? '' : logo.name}
          loading="lazy"
          draggable={false}
          className="h-10 sm:h-12 w-auto object-contain shrink-0"
        />
      ))}
    </div>
  );

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6" aria-label="Companies we have worked with">
      <div className="text-center space-y-2 mb-8">
        <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-[#A81752] bg-[#FCE7F3] px-3 py-1 rounded-md">
          Trusted By
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#21131B] tracking-tight">
          Companies We&apos;ve Worked With
        </h2>
      </div>

      <div className="logo-marquee-viewport">
        <div className="logo-marquee-track">
          {renderSet('a')}
          {renderSet('b', true)}
        </div>
      </div>
    </section>
  );
};
