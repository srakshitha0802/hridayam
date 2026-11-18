import React from 'react';

export function BackgroundDoodles() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Ambient Glassy Radial Glow Orbs (Deep Sapphire, Electric Blue, Cyan) */}
      <div
        className="absolute -top-32 -left-32 w-[550px] h-[550px] rounded-full blur-[100px] opacity-40 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #2563EB 0%, #1D4ED8 45%, transparent 70%)',
        }}
      />
      <div
        className="absolute top-1/4 -right-32 w-[600px] h-[600px] rounded-full blur-[110px] opacity-35 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #0284C7 0%, #0369A1 50%, transparent 75%)',
        }}
      />
      <div
        className="absolute top-2/3 -left-40 w-[500px] h-[500px] rounded-full blur-[90px] opacity-30 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #38BDF8 0%, #1E40AF 60%, transparent 75%)',
        }}
      />
      <div
        className="absolute -bottom-40 right-1/4 w-[650px] h-[650px] rounded-full blur-[120px] opacity-35 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #1E3A8A 0%, #0F172A 60%, transparent 70%)',
        }}
      />

      {/* Subtle Blueprint & Math Grid Matrix */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            'radial-gradient(#38BDF8 1px, transparent 1px), linear-gradient(to right, rgba(56, 189, 248, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(56, 189, 248, 0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px, 120px 120px, 120px 120px',
        }}
      />

      {/* Floating Animated Education Doodles across the page */}

      {/* 1. Graduation Cap (Top Left - Floating) */}
      <div className="absolute top-24 left-10 w-28 h-28 text-cyan-400/30 hidden lg:block animate-doodle-float">
        <DoodleGraduationCap className="w-full h-full" />
      </div>

      {/* 2. Open Learning Book (Top Right - Slow sway) */}
      <div className="absolute top-28 right-16 w-24 h-24 text-sky-400/30 hidden lg:block animate-doodle-float-delayed">
        <DoodleOpenBook className="w-full h-full" />
      </div>

      {/* 3. Atom / Science & AI Model (Mid-Top Center-Right - Slow Spin) */}
      <div className="absolute top-96 right-24 w-28 h-28 text-blue-400/25 hidden xl:block animate-doodle-spin">
        <DoodleAtom className="w-full h-full" />
      </div>

      {/* 4. Code Terminal Window & Brackets (Mid Left - Float) */}
      <div className="absolute top-[480px] left-8 w-24 h-24 text-cyan-300/30 hidden xl:block animate-doodle-float">
        <DoodleCodeWindow className="w-full h-full" />
      </div>

      {/* 5. Paper Airplane (Learning Journey) (Mid Right - Delayed Float) */}
      <div className="absolute top-[720px] right-12 w-24 h-24 text-sky-300/30 hidden lg:block animate-doodle-float-delayed -rotate-12">
        <DoodlePaperAirplane className="w-full h-full" />
      </div>

      {/* 6. Lightbulb & Idea Sparks (Mid-Lower Left) */}
      <div className="absolute top-[1050px] left-12 w-24 h-24 text-cyan-400/30 hidden xl:block animate-doodle-pulse">
        <DoodleLightbulb className="w-full h-full" />
      </div>

      {/* 7. Rocket / Career Launch (Mid-Lower Right) */}
      <div className="absolute top-[1380px] right-14 w-24 h-24 text-blue-300/30 hidden lg:block animate-doodle-float">
        <DoodleRocket className="w-full h-full" />
      </div>

      {/* 8. Math & Analytics Formula (Lower Left) */}
      <div className="absolute top-[1700px] left-10 w-28 h-28 text-sky-400/25 hidden xl:block animate-doodle-float-delayed">
        <DoodleMathFormula className="w-full h-full" />
      </div>

      {/* 9. Brain & Neural Synapse / AI (Lower Right) */}
      <div className="absolute top-[2050px] right-16 w-28 h-28 text-cyan-400/30 hidden xl:block animate-doodle-pulse">
        <DoodleBrainSynapse className="w-full h-full" />
      </div>

      {/* 10. Drafting Compass & Ruler (Bottom Left) */}
      <div className="absolute top-[2400px] left-14 w-24 h-24 text-blue-400/30 hidden lg:block animate-doodle-float">
        <DoodleCompass className="w-full h-full" />
      </div>
    </div>
  );
}

export function DoodleSparkle({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`inline-block ${className}`}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
    </svg>
  );
}

export function DoodleGraduationCap({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        d="M10 40L50 20L90 40L50 60L10 40Z"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28 50V72C28 78 38 84 50 84C62 84 72 78 72 72V50"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M82 45V70M82 70L86 76M82 70L78 76"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="50" cy="20" r="3" fill="currentColor" />
    </svg>
  );
}

export function DoodleOpenBook({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M16 28C26 24 38 25 50 30C62 25 74 24 84 28V76C74 72 62 73 50 78C38 73 26 72 16 76V28Z" />
      <path d="M50 30V78" />
      <path d="M24 40C32 37 40 38 44 40" strokeWidth="2" strokeDasharray="2 3" />
      <path d="M24 50C32 47 40 48 44 50" strokeWidth="2" strokeDasharray="2 3" />
      <path d="M56 40C64 38 72 37 80 40" strokeWidth="2" strokeDasharray="2 3" />
      <path d="M56 50C64 48 72 47 80 50" strokeWidth="2" strokeDasharray="2 3" />
    </svg>
  );
}

export function DoodleAtom({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="7" fill="currentColor" />
      <ellipse cx="50" cy="50" rx="38" ry="14" transform="rotate(0 50 50)" />
      <ellipse cx="50" cy="50" rx="38" ry="14" transform="rotate(60 50 50)" />
      <ellipse cx="50" cy="50" rx="38" ry="14" transform="rotate(120 50 50)" />
      <circle cx="85" cy="50" r="3" fill="currentColor" />
      <circle cx="32" cy="20" r="3" fill="currentColor" />
      <circle cx="32" cy="80" r="3" fill="currentColor" />
    </svg>
  );
}

export function DoodleCodeWindow({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="15" y="20" width="70" height="60" rx="8" />
      <path d="M15 36H85" />
      <circle cx="25" cy="28" r="2.5" fill="currentColor" />
      <circle cx="33" cy="28" r="2.5" fill="currentColor" />
      <circle cx="41" cy="28" r="2.5" fill="currentColor" />
      <path d="M34 48L25 56L34 64" />
      <path d="M66 48L75 56L66 64" />
      <path d="M54 44L46 68" />
    </svg>
  );
}

export function DoodlePaperAirplane({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M15 48L85 20L60 85L45 56L15 48Z" />
      <path d="M85 20L45 56" />
      <path d="M12 75C24 74 32 64 36 54" strokeDasharray="3 4" strokeWidth="2" />
    </svg>
  );
}

export function DoodleRocket({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4.5c1.62-1.63 5-2 5-2" />
      <path d="M15 12v5s3.03-.55 4.5-2c1.63-1.62 2-5 2-5" />
    </svg>
  );
}

export function DoodleLightbulb({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5.76.76 1.23 1.52 1.41 2.5h6.18z" />
      <path d="M12 2v2M4.93 4.93l1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

export function DoodleMathFormula({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Summation Sigma */}
      <path d="M20 28H42L30 42L42 56H20" />
      {/* Square root of x */}
      <path d="M52 46L56 56L62 30H82" />
      <path d="M68 42L76 52M76 42L68 52" strokeWidth="2" />
      {/* Infinity symbol */}
      <path d="M30 76C24 76 20 72 20 68C20 64 24 60 30 60C38 60 42 76 50 76C56 76 60 72 60 68C60 64 56 60 50 60C42 60 38 76 30 76Z" />
    </svg>
  );
}

export function DoodleBrainSynapse({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="50" cy="30" r="5" fill="currentColor" />
      <circle cx="30" cy="50" r="4" fill="currentColor" />
      <circle cx="70" cy="50" r="4" fill="currentColor" />
      <circle cx="40" cy="70" r="4" fill="currentColor" />
      <circle cx="60" cy="70" r="4" fill="currentColor" />
      <circle cx="50" cy="50" r="6" fill="currentColor" />
      <path d="M50 35V44M34 50H44M56 50H66M44 54L42 66M56 54L58 66M33 47L47 33M67 47L53 33" strokeDasharray="2 3" />
    </svg>
  );
}

export function DoodleCompass({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="50" cy="24" r="6" />
      <path d="M47 30L26 82" />
      <path d="M53 30L74 82" />
      <path d="M34 58H66" strokeWidth="2" />
      <path d="M22 84C38 90 62 90 78 84" strokeDasharray="3 4" strokeWidth="2" />
    </svg>
  );
}

export function DoodleCurvedArrow({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="64"
      height="40"
      viewBox="0 0 64 40"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 34C18 10 44 4 58 14M58 14L46 12M58 14L54 26"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DoodleHandDrawnArrow({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="48"
      height="24"
      viewBox="0 0 64 32"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 16C16 12 36 10 56 16M56 16L46 8M56 16L48 24"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DoodleBadgeCheck({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2l3.09 3.26 4.41.64 1.3 4.27 3.2 3.09-1.57 4.18.25 4.45-4.27 1.3L15.32 26 12 24.36 8.68 26l-3.09-2.81-4.27-1.3.25-4.45L0 13.26l3.2-3.09 1.3-4.27 4.41-.64L12 2z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}
