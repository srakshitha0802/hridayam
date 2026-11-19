import React, { useEffect, useRef } from 'react';

interface SparkleParticle {
  x: number;
  y: number;
  size: number;
  color: string;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  shape: 'star' | 'diamond' | 'orb';
  rotation: number;
  rotationSpeed: number;
}

interface RippleRing {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  life: number;
  maxLife: number;
}

const METALLIC_PASTEL_COLORS = [
  '#FFFFFF', // Pure Crystal White
  '#E8F4FF', // Ice Pearl
  '#BAE6FD', // Pastel Sky
  '#94BCF1', // Soft Metallic Blue
  '#DDD6FE', // Iridescent Lavender-Silver
  '#60A5FA', // Luminous Azure
  '#3869C3', // Royal Sapphire
];

interface MetallicCursorAuraProps {
  enabled?: boolean;
}

export const MetallicCursorAura: React.FC<MetallicCursorAuraProps> = ({ enabled = true }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const haloRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const coreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled) return;
    if (typeof window === 'undefined') return;

    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isCoarsePointer || prefersReduced) return;

    const particles: SparkleParticle[] = [];
    const ripples: RippleRing[] = [];
    let targetX = -200;
    let targetY = -200;
    let auraX = -200;
    let auraY = -200;
    let lastSpawnX = -200;
    let lastSpawnY = -200;
    let visible = false;
    let pressing = false;
    let hoveringInteractive = false;
    let rafId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      targetX = x;
      targetY = y;
      visible = true;

      // Update specular spotlight coordinates on hovered metallic sheen surfaces
      const el = e.target as HTMLElement | null;
      const sheenSurface = el?.closest?.('.metallic-sheen-card') as HTMLElement | null;
      if (sheenSurface) {
        const rect = sheenSurface.getBoundingClientRect();
        sheenSurface.style.setProperty('--mouse-x', `${x - rect.left}px`);
        sheenSurface.style.setProperty('--mouse-y', `${y - rect.top}px`);
      }

      hoveringInteractive = Boolean(
        el?.closest?.('button, a, input, select, textarea, [role="button"]')
      );

      const dist = Math.hypot(x - lastSpawnX, y - lastSpawnY);
      if (dist > 6) {
        const count = Math.min(Math.floor(dist / 14) + 1, 3);
        for (let i = 0; i < count; i++) {
          const color =
            METALLIC_PASTEL_COLORS[Math.floor(Math.random() * METALLIC_PASTEL_COLORS.length)];
          const roll = Math.random();
          const shape: SparkleParticle['shape'] =
            roll > 0.45 ? 'star' : roll > 0.2 ? 'diamond' : 'orb';

          particles.push({
            x: x + (Math.random() - 0.5) * 14,
            y: y + (Math.random() - 0.5) * 14,
            size: 2.5 + Math.random() * 4.5,
            color,
            vx: (Math.random() - 0.5) * 1.15,
            vy: -0.35 - Math.random() * 1.05,
            life: 0,
            maxLife: 24 + Math.random() * 20,
            shape,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 7,
          });
        }
        lastSpawnX = x;
        lastSpawnY = y;
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      pressing = true;
      const x = e.clientX;
      const y = e.clientY;

      ripples.push({
        x,
        y,
        radius: 6,
        maxRadius: 46,
        life: 0,
        maxLife: 24,
      });

      for (let i = 0; i < 14; i++) {
        const angle = (i / 14) * Math.PI * 2 + Math.random() * 0.35;
        const speed = 1.8 + Math.random() * 3.2;
        const color =
          METALLIC_PASTEL_COLORS[Math.floor(Math.random() * METALLIC_PASTEL_COLORS.length)];
        particles.push({
          x,
          y,
          size: 3.5 + Math.random() * 5,
          color,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0,
          maxLife: 28 + Math.random() * 20,
          shape: i % 3 === 0 ? 'diamond' : 'star',
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 12,
        });
      }
    };

    const handleMouseUp = () => {
      pressing = false;
    };

    const handleMouseLeave = () => {
      visible = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      auraX += (targetX - auraX) * 0.16;
      auraY += (targetY - auraY) * 0.16;

      if (haloRef.current) {
        haloRef.current.style.opacity = visible ? '0.45' : '0';
        haloRef.current.style.transform = `translate3d(${auraX - 210}px, ${auraY - 210}px, 0)`;
      }

      if (ringRef.current) {
        const scale = pressing ? 0.78 : hoveringInteractive ? 1.38 : 1;
        ringRef.current.style.opacity = visible ? '0.92' : '0';
        ringRef.current.style.transform = `translate3d(${auraX - 18}px, ${auraY - 18}px, 0) scale(${scale})`;
      }

      if (coreRef.current) {
        const coreScale = pressing ? 1.35 : hoveringInteractive ? 0.8 : 1;
        coreRef.current.style.opacity = visible ? '1' : '0';
        coreRef.current.style.transform = `translate3d(${targetX - 3.5}px, ${targetY - 3.5}px, 0) scale(${coreScale})`;
      }

      const canvas = canvasRef.current;
      if (canvas) {
        if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        }
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // Metallic click ripples
          for (let i = ripples.length - 1; i >= 0; i--) {
            const r = ripples[i];
            r.life++;
            if (r.life >= r.maxLife) {
              ripples.splice(i, 1);
              continue;
            }
            const progress = r.life / r.maxLife;
            const eased = 1 - Math.pow(1 - progress, 3);
            const currentR = r.radius + (r.maxRadius - r.radius) * eased;
            ctx.save();
            ctx.beginPath();
            ctx.arc(r.x, r.y, currentR, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - progress) * 0.8})`;
            ctx.lineWidth = 1.6;
            ctx.shadowColor = '#93C5FD';
            ctx.shadowBlur = 10;
            ctx.stroke();
            ctx.restore();
          }

          // Glitter particles
          for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.life++;
            if (p.life >= p.maxLife) {
              particles.splice(i, 1);
              continue;
            }
            p.x += p.vx;
            p.y += p.vy;
            p.vx *= 0.985;
            p.vy *= 0.985;
            p.rotation += p.rotationSpeed;
            const alpha = Math.max(0, 1 - p.life / p.maxLife);

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rotation * Math.PI) / 180);
            ctx.globalAlpha = alpha;
            ctx.fillStyle = p.color;
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 8;

            if (p.shape === 'star') {
              const s = p.size;
              ctx.beginPath();
              ctx.moveTo(0, -s);
              ctx.quadraticCurveTo(0, 0, s, 0);
              ctx.quadraticCurveTo(0, 0, 0, s);
              ctx.quadraticCurveTo(0, 0, -s, 0);
              ctx.quadraticCurveTo(0, 0, 0, -s);
              ctx.closePath();
              ctx.fill();
            } else if (p.shape === 'diamond') {
              const s = p.size * 0.85;
              ctx.beginPath();
              ctx.moveTo(0, -s * 1.25);
              ctx.lineTo(s * 0.65, 0);
              ctx.lineTo(0, s * 1.25);
              ctx.lineTo(-s * 0.65, 0);
              ctx.closePath();
              ctx.fill();
            } else {
              ctx.beginPath();
              ctx.arc(0, 0, p.size * 0.42, 0, Math.PI * 2);
              ctx.fill();
            }

            ctx.restore();
          }
        }
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      {/* 60fps Metallic Glitter & Click-Ripple Canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-50"
        aria-hidden="true"
      />

      {/* Ambient Ice-Blue-White Specular Spotlight Halo */}
      <div
        ref={haloRef}
        className="pointer-events-none fixed top-0 left-0 w-[420px] h-[420px] rounded-full blur-3xl z-20 transition-opacity duration-300 will-change-transform"
        style={{
          opacity: 0,
          background:
            'radial-gradient(circle, rgba(255, 255, 255, 0.36) 0%, rgba(147, 197, 253, 0.24) 36%, rgba(56, 105, 195, 0.12) 64%, transparent 80%)',
        }}
        aria-hidden="true"
      />

      {/* Magnetic Brushed-Chrome Crystal Ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 w-9 h-9 rounded-full z-50 transition-[opacity] duration-200 will-change-transform"
        style={{
          opacity: 0,
          border: '1.5px solid rgba(255, 255, 255, 0.92)',
          boxShadow:
            '0 0 14px rgba(147, 197, 253, 0.65), inset 0 0 8px rgba(56, 105, 195, 0.22)',
          background:
            'radial-gradient(circle, rgba(255, 255, 255, 0.16) 0%, rgba(147, 197, 253, 0.06) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Diamond Specular Core Point */}
      <div
        ref={coreRef}
        className="pointer-events-none fixed top-0 left-0 w-[7px] h-[7px] rounded-full z-50 will-change-transform"
        style={{
          opacity: 0,
          background: 'linear-gradient(135deg, #FFFFFF 0%, #93C5FD 60%, #2563EB 100%)',
          boxShadow:
            '0 0 8px 2px rgba(255, 255, 255, 0.95), 0 0 16px 4px rgba(96, 165, 250, 0.65)',
        }}
        aria-hidden="true"
      />
    </>
  );
};
