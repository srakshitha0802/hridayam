import React from 'react';
import { PARTNER_UNIVERSITIES } from '../data/catalogSeed';

function UniversityCrest({ index }: { index: number }) {
  const variant = index % 4;
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className="shrink-0 text-[#0F172A]"
    >
      <rect x="2" y="2" width="28" height="28" rx="6" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1.4" />
      {variant === 0 && (
        <>
          <path d="M9 22V11L16 8L23 11V22" stroke="currentColor" strokeWidth="1.4" />
          <path d="M16 8V22" stroke="#1D4ED8" strokeWidth="1.5" />
          <path d="M7 22H25" stroke="currentColor" strokeWidth="1.4" />
        </>
      )}
      {variant === 1 && (
        <>
          <circle cx="16" cy="16" r="7" stroke="currentColor" strokeWidth="1.4" />
          <path d="M16 9V23M9 16H23" stroke="#1D4ED8" strokeWidth="1.5" />
        </>
      )}
      {variant === 2 && (
        <>
          <polygon points="16,7 24,21 8,21" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="16" cy="16.5" r="2.2" fill="#1D4ED8" />
        </>
      )}
      {variant === 3 && (
        <>
          <path d="M10 10H22V17C22 20.5 16 23.5 16 23.5C16 23.5 10 20.5 10 17V10Z" stroke="currentColor" strokeWidth="1.4" />
          <path d="M13 14.5H19" stroke="#1D4ED8" strokeWidth="1.5" />
        </>
      )}
    </svg>
  );
}

export function PartnerUniversities({ onPartnerEnquire }: { onPartnerEnquire: () => void }) {
  const repeated = [...PARTNER_UNIVERSITIES, ...PARTNER_UNIVERSITIES];

  return (
    <section
      aria-label="Academic and university partners"
      className="py-10 overflow-hidden bg-white border-b border-slate-200/80"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-[#1D4ED8] tracking-wide">
              Academic &amp; University Alliance Network
            </p>
            <h2 className="font-display text-lg sm:text-xl font-semibold text-[#0F172A] mt-1">
              Curriculum co-reviewed with partner universities and research centers
            </h2>
          </div>
          <button
            type="button"
            onClick={onPartnerEnquire}
            className="text-xs font-semibold text-[#1D4ED8] hover:text-[#1E40AF] underline underline-offset-4 whitespace-nowrap shrink-0 self-start sm:self-auto"
          >
            Apply for University Partnership
          </button>
        </div>
      </div>

      <div className="marquee-container relative w-full overflow-hidden">
        <div className="animate-marquee-glide flex items-stretch gap-5 px-4">
          {repeated.map((uni, idx) => (
            <div
              key={`${uni.id}-${idx}`}
              className="edu-card flex items-center gap-3.5 px-5 py-3.5 rounded-xl shrink-0 min-w-[290px]"
            >
              <UniversityCrest index={idx} />
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-[11px] font-mono-tabular font-semibold text-[#1D4ED8]">
                  <span>{uni.shortCode}</span>
                  <span aria-hidden="true">·</span>
                  <span>{uni.location}</span>
                </div>
                <p className="font-display text-sm font-semibold text-[#0F172A] truncate mt-0.5">
                  {uni.name}
                </p>
                <p className="text-xs text-[#475569] truncate">{uni.allianceRole}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
