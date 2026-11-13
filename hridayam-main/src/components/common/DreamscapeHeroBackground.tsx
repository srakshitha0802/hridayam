import React from 'react';

/**
 * DreamscapeSparkle: Lightweight SVG 4-point star for subtle Gen Z twinkling ambient particles.
 */
interface SparkleProps {
  className?: string;
  size?: number;
  color?: string;
}

export const DreamscapeSparkle: React.FC<SparkleProps> = ({
  className = '',
  size = 14,
  color = '#A81752'
}) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={`pointer-events-none drop-shadow-[0_0_6px_rgba(168,23,82,0.35)] ${className}`}
    fill={color}
    aria-hidden="true"
  >
    <path d="M12 0 L14.8 9.2 L24 12 L14.8 14.8 L12 24 L9.2 14.8 L0 12 L9.2 9.2 Z" />
  </svg>
);

/**
 * DreamscapeGlassOrb: Translucent glass-like floating orb with optical refraction highlights.
 */
interface GlassOrbProps {
  className?: string;
  sizeClasses: string;
  animationClass: string;
}

export const DreamscapeGlassOrb: React.FC<GlassOrbProps> = ({
  className = '',
  sizeClasses,
  animationClass
}) => (
  <div
    className={`absolute rounded-full pointer-events-none dreamscape-glass-orb ${sizeClasses} ${animationClass} ${className}`}
    aria-hidden="true"
  >
    {/* Primary specular curved crescent reflection */}
    <span className="absolute top-[14%] left-[16%] w-2/5 h-1/5 rounded-full bg-white/80 -rotate-30 blur-[0.6px] pointer-events-none" />
    {/* Micro pinpoint glint */}
    <span className="absolute top-[26%] left-[45%] w-1.5 h-1.5 rounded-full bg-white/90 blur-[0.4px] pointer-events-none" />
    {/* Internal subtle dark-pink ambient refractive core */}
    <span className="absolute inset-2 rounded-full bg-radial from-transparent via-[#FCE7F3]/20 to-[#A81752]/15 pointer-events-none" />
  </div>
);

/**
 * DreamscapeHeroBackground:
 * Redesigns the Hridayam Hero background with a premium Gen Z Dark Rose Dreamscape aesthetic.
 * - Soft blush base gradient (#FFF7FA)
 * - Large blurred dusty-rose and dark-magenta gradient blobs around edges
 * - 4-5 translucent glass-like floating orbs with subtle organic floating animations
 * - Tiny subtle sparkle particles with gentle twinkling
 * - Edge-focused lighting that preserves extreme readability for the central heading and enquiry form
 * - Respects prefers-reduced-motion
 */
export const DreamscapeHeroBackground: React.FC = () => {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0"
      aria-hidden="true"
    >
      {/* 1. Base Soft Blush Foundation Gradient (#FFF7FA) */}
      <div className="absolute inset-0 bg-[#FFF7FA] bg-gradient-to-br from-[#FFF7FA] via-[#FFF1F6] to-[#FFF7FA]" />

      {/* 2. Large Blurred Dusty-Rose & Dark-Magenta Gradient Blobs around the edges */}
      {/* Top-Left Edge: Dusty-Rose & Dark-Magenta Blob */}
      <div
        className="absolute -top-32 -left-32 sm:-top-40 sm:-left-40 w-80 h-80 sm:w-[32rem] sm:h-[32rem] lg:w-[42rem] lg:h-[42rem] rounded-full blur-3xl opacity-80 animate-blob-slow"
        style={{
          background:
            'radial-gradient(circle, rgba(228, 161, 184, 0.48) 0%, rgba(200, 110, 145, 0.28) 42%, rgba(168, 23, 82, 0.16) 65%, transparent 75%)'
        }}
      />

      {/* Top-Right Edge: Brand Dark-Magenta (#A81752) Aura framing the form */}
      <div
        className="absolute -top-32 -right-32 sm:-top-44 sm:-right-40 w-88 h-88 sm:w-[36rem] sm:h-[36rem] lg:w-[46rem] lg:h-[46rem] rounded-full blur-3xl opacity-85 animate-blob-slow-reverse"
        style={{
          background:
            'radial-gradient(circle, rgba(168, 23, 82, 0.32) 0%, rgba(138, 16, 65, 0.20) 48%, rgba(118, 13, 59, 0.12) 68%, transparent 78%)'
        }}
      />

      {/* Bottom-Left Edge: Dusty-Rose & Rich Berry Aura */}
      <div
        className="absolute -bottom-36 -left-28 sm:-bottom-48 sm:-left-36 w-80 h-80 sm:w-[30rem] sm:h-[30rem] lg:w-[38rem] lg:h-[38rem] rounded-full blur-3xl opacity-75 animate-blob-slow"
        style={{
          background:
            'radial-gradient(circle, rgba(212, 128, 158, 0.40) 0%, rgba(168, 23, 82, 0.18) 52%, transparent 75%)'
        }}
      />

      {/* Bottom-Right Edge: Soft Magenta-Blush Glow */}
      <div
        className="absolute -bottom-32 -right-24 sm:-bottom-40 sm:-right-32 w-80 h-80 sm:w-[28rem] sm:h-[28rem] lg:w-[36rem] lg:h-[36rem] rounded-full blur-3xl opacity-80 animate-blob-slow-reverse"
        style={{
          background:
            'radial-gradient(circle, rgba(168, 23, 82, 0.24) 0%, rgba(244, 114, 182, 0.22) 50%, rgba(252, 231, 243, 0.5) 70%, transparent 78%)'
        }}
      />

      {/* Center High-Key Clarity Pool: Guarantees central heading and form remain 100% readable */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-5xl h-[85%] rounded-full blur-3xl opacity-90"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.85) 0%, rgba(255, 247, 250, 0.5) 60%, transparent 85%)'
        }}
      />

      {/* 3. Translucent Glass-Like Floating Orbs (3-5 Orbs positioned strategically around edges) */}
      {/* Orb 1: Upper-Left near the badge */}
      <DreamscapeGlassOrb
        sizeClasses="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20"
        animationClass="animate-float-slow-1"
        className="top-10 left-3 sm:left-10 lg:left-14"
      />

      {/* Orb 2: Top-Center drift in the open upper channel */}
      <DreamscapeGlassOrb
        sizeClasses="w-9 h-9 sm:w-11 sm:h-11 lg:w-12 lg:h-12"
        animationClass="animate-float-slow-2"
        className="top-5 left-[48%] sm:left-[52%]"
      />

      {/* Orb 3: Lower-Left beneath the value badges */}
      <DreamscapeGlassOrb
        sizeClasses="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24"
        animationClass="animate-float-slow-3"
        className="bottom-12 left-4 sm:left-16"
      />

      {/* Orb 4: Middle-Right framing the enquiry form's right edge */}
      <DreamscapeGlassOrb
        sizeClasses="w-11 h-11 sm:w-13 sm:h-13 lg:w-15 lg:h-15"
        animationClass="animate-float-slow-1"
        className="top-1/3 -right-2 sm:right-4 lg:-right-3"
      />

      {/* Orb 5: Bottom-Right delicate floating orb */}
      <DreamscapeGlassOrb
        sizeClasses="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12"
        animationClass="animate-float-slow-2"
        className="bottom-8 right-8 sm:right-20 lg:right-28"
      />

      {/* 4. Tiny Subtle Sparkle Particles */}
      <div className="absolute top-12 left-[20%]">
        <DreamscapeSparkle size={15} color="#A81752" className="animate-sparkle-1" />
      </div>

      <div className="absolute top-24 left-[44%] hidden sm:block">
        <DreamscapeSparkle size={12} color="#D4809E" className="animate-sparkle-2" />
      </div>

      <div className="absolute top-10 right-[28%]">
        <DreamscapeSparkle size={14} color="#A81752" className="animate-sparkle-3" />
      </div>

      <div className="absolute bottom-24 left-[34%]">
        <DreamscapeSparkle size={11} color="#E83E8C" className="animate-sparkle-4" />
      </div>

      <div className="absolute bottom-16 right-[10%] hidden sm:block">
        <DreamscapeSparkle size={16} color="#A81752" className="animate-sparkle-1" />
      </div>

      <div className="absolute top-1/2 left-[4%]">
        <DreamscapeSparkle size={12} color="#A81752" className="animate-sparkle-2" />
      </div>

      <div className="absolute bottom-1/3 right-[32%] hidden md:block">
        <DreamscapeSparkle size={10} color="#D4809E" className="animate-sparkle-3" />
      </div>
    </div>
  );
};
