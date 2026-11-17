import React from 'react';

export function BackgroundDoodles() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none bg-gradient-to-b from-[#FFF5F8] via-[#FDF2F8] to-[#FCE7F3]/40"
      aria-hidden="true"
    >
      {/* Ambient Glassy Radial Glow Orbs */}
      <div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-40 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #F472B6 0%, #DB2777 50%, transparent 70%)',
        }}
      />
      <div
        className="absolute top-1/3 -right-32 w-[500px] h-[500px] rounded-full blur-3xl opacity-30 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #FDA4AF 0%, #BE185D 60%, transparent 75%)',
        }}
      />
      <div
        className="absolute -bottom-40 left-1/4 w-[600px] h-[600px] rounded-full blur-3xl opacity-25 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #FBCFE8 0%, #9D174D 50%, transparent 70%)',
        }}
      />

      {/* Subtle Pastel Pink Dot Grid Matrix */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(#DB2777 0.85px, transparent 0.85px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Doodle 1: Floating Graduation Cap & Heart Motif (Top Left) */}
      <svg
        className="absolute top-28 left-8 w-28 h-28 text-pink-400/20 -rotate-12 hidden lg:block animate-pulse duration-700"
        viewBox="0 0 100 100"
        fill="none"
      >
        <path
          d="M10 40L50 20L90 40L50 60L10 40Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M30 50V70C30 76 40 82 50 82C60 82 70 76 70 70V50"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M80 45V68M80 68L84 74M80 68L76 74"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>

      {/* Doodle 2: Code Brackets & Spark (Top Right) */}
      <svg
        className="absolute top-36 right-10 w-24 h-24 text-pink-500/20 rotate-6 hidden lg:block"
        viewBox="0 0 100 100"
        fill="none"
      >
        <path
          d="M32 32L16 50L32 68"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M68 32L84 50L68 68"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M58 24L42 76"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      {/* Doodle 3: Connected Learning Nodes (Mid Left) */}
      <svg
        className="absolute top-1/2 left-6 w-28 h-28 text-pink-600/15 hidden xl:block"
        viewBox="0 0 100 100"
        fill="none"
      >
        <circle cx="25" cy="30" r="7" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="75" cy="35" r="7" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="50" cy="75" r="8" stroke="currentColor" strokeWidth="1.6" />
        <path d="M31 32L69 34M28 36L46 70M72 40L54 70" stroke="currentColor" strokeWidth="1.4" strokeDasharray="3 3" />
      </svg>

      {/* Doodle 4: Target & Arrow (Career Success) (Mid Right) */}
      <svg
        className="absolute top-2/3 right-8 w-24 h-24 text-pink-400/20 hidden xl:block -rotate-12"
        viewBox="0 0 100 100"
        fill="none"
      >
        <circle cx="50" cy="50" r="32" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="50" cy="50" r="8" fill="currentColor" />
        <path d="M72 28L88 12M88 12H76M88 12V24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
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
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DoodleRocket({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
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
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
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

export function DoodleBadgeCheck({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
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
