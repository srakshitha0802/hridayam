import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  vx: number;
  vy: number;
  opacity: number;
  life: number;
  maxLife: number;
  shape: 'star' | 'circle' | 'sparkle';
  rotation: number;
  rotationSpeed: number;
}

const GLITTER_COLORS = [
  '#BAE6FD', // Pastel sky/ice
  '#E0F2FE', // Lightest pastel azure
  '#38BDF8', // Cyan electric
  '#60A5FA', // Pastel royal
  '#FFFFFF', // Diamond white
  '#93C5FD', // Soft blue
];

export const GlitterCursor: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [auraPos, setAuraPos] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const nextParticleId = useRef(0);
  const mouseRef = useRef({ x: -100, y: -100, lastX: -100, lastY: -100 });
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      mouseRef.current.x = x;
      mouseRef.current.y = y;
      setMousePos({ x, y });
      setIsVisible(true);

      const dx = x - mouseRef.current.lastX;
      const dy = y - mouseRef.current.lastY;
      const dist = Math.hypot(dx, dy);

      // Generate glitter particles on movement
      if (dist > 4 && Math.random() < 0.75) {
        const count = Math.min(Math.floor(dist / 12) + 1, 4);
        for (let i = 0; i < count; i++) {
          const color = GLITTER_COLORS[Math.floor(Math.random() * GLITTER_COLORS.length)];
          const shape: Particle['shape'] =
            Math.random() > 0.4 ? 'star' : Math.random() > 0.5 ? 'sparkle' : 'circle';
          const maxLife = 24 + Math.random() * 20;

          particlesRef.current.push({
            id: nextParticleId.current++,
            x: x + (Math.random() - 0.5) * 16,
            y: y + (Math.random() - 0.5) * 16,
            size: 3 + Math.random() * 5,
            color,
            vx: (Math.random() - 0.5) * 1.5,
            vy: -0.4 - Math.random() * 1.2,
            opacity: 1,
            life: 0,
            maxLife,
            shape,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 8,
          });
        }
        mouseRef.current.lastX = x;
        mouseRef.current.lastY = y;
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      const x = e.clientX;
      const y = e.clientY;

      // Burst of shiny sparkling glitter on click
      for (let i = 0; i < 14; i++) {
        const angle = (i / 14) * Math.PI * 2 + Math.random() * 0.4;
        const speed = 2 + Math.random() * 3.5;
        const color = GLITTER_COLORS[Math.floor(Math.random() * GLITTER_COLORS.length)];
        particlesRef.current.push({
          id: nextParticleId.current++,
          x,
          y,
          size: 4 + Math.random() * 6,
          color,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          opacity: 1,
          life: 0,
          maxLife: 30 + Math.random() * 25,
          shape: Math.random() > 0.3 ? 'star' : 'sparkle',
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 14,
        });
      }
    };

    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Smooth lag interpolation for the outer aura & canvas rendering
    let currentAuraX = -100;
    let currentAuraY = -100;

    const render = () => {
      // Smooth interpolation
      currentAuraX += (mouseRef.current.x - currentAuraX) * 0.16;
      currentAuraY += (mouseRef.current.y - currentAuraY) * 0.16;
      setAuraPos({ x: currentAuraX, y: currentAuraY });

      // Draw canvas particles
      const canvas = canvasRef.current;
      if (canvas) {
        if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        }

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          const surviving: Particle[] = [];
          for (let i = 0; i < particlesRef.current.length; i++) {
            const p = particlesRef.current[i];
            p.life++;
            p.x += p.vx;
            p.y += p.vy;
            p.rotation += p.rotationSpeed;
            p.opacity = 1 - p.life / p.maxLife;

            if (p.life < p.maxLife && p.opacity > 0) {
              surviving.push(p);

              ctx.save();
              ctx.translate(p.x, p.y);
              ctx.rotate((p.rotation * Math.PI) / 180);
              ctx.globalAlpha = Math.max(0, p.opacity);
              ctx.fillStyle = p.color;
              ctx.shadowColor = p.color;
              ctx.shadowBlur = 8;

              if (p.shape === 'star') {
                // Draw 4-point glittering star
                const s = p.size;
                ctx.beginPath();
                ctx.moveTo(0, -s);
                ctx.quadraticCurveTo(0, 0, s, 0);
                ctx.quadraticCurveTo(0, 0, 0, s);
                ctx.quadraticCurveTo(0, 0, -s, 0);
                ctx.quadraticCurveTo(0, 0, 0, -s);
                ctx.closePath();
                ctx.fill();
              } else if (p.shape === 'sparkle') {
                // Draw 8-point tiny diamond
                const s = p.size * 0.7;
                ctx.beginPath();
                ctx.moveTo(0, -s * 1.3);
                ctx.lineTo(s * 0.4, -s * 0.4);
                ctx.lineTo(s * 1.3, 0);
                ctx.lineTo(s * 0.4, s * 0.4);
                ctx.lineTo(0, s * 1.3);
                ctx.lineTo(-s * 0.4, s * 0.4);
                ctx.lineTo(-s * 1.3, 0);
                ctx.lineTo(-s * 0.4, -s * 0.4);
                ctx.closePath();
                ctx.fill();
              } else {
                ctx.beginPath();
                ctx.arc(0, 0, p.size * 0.5, 0, Math.PI * 2);
                ctx.fill();
              }

              ctx.restore();
            }
          }
          particlesRef.current = surviving;
        }
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Glitter Canvas for particle trails */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-40"
        aria-hidden="true"
      />

      {/* Large Ambient Specular Glow Halo (Deep Ice Blue & Electric Azure) */}
      <div
        className="pointer-events-none fixed -translate-x-1/2 -translate-y-1/2 rounded-full w-[460px] h-[460px] blur-3xl z-20 transition-opacity duration-300 ease-out"
        style={{
          left: `${auraPos.x}px`,
          top: `${auraPos.y}px`,
          opacity: isVisible ? 0.45 : 0,
          background:
            'radial-gradient(circle, rgba(56, 189, 248, 0.35) 0%, rgba(37, 99, 235, 0.22) 38%, rgba(10, 22, 51, 0.08) 65%, transparent 80%)',
        }}
        aria-hidden="true"
      />

      {/* Smooth Magnetic Follower Ring (Shiny Metallic Ice-Blue Glass Ring) */}
      <div
        className="pointer-events-none fixed -translate-x-1/2 -translate-y-1/2 rounded-full z-30 transition-all duration-75 ease-out"
        style={{
          left: `${auraPos.x}px`,
          top: `${auraPos.y}px`,
          width: isClicking ? '44px' : '36px',
          height: isClicking ? '44px' : '36px',
          opacity: isVisible ? 0.8 : 0,
          border: '1.5px solid rgba(186, 230, 253, 0.75)',
          boxShadow: '0 0 16px rgba(56, 189, 248, 0.6), inset 0 0 8px rgba(255, 255, 255, 0.4)',
          background: 'rgba(56, 189, 248, 0.06)',
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.85 : 1})`,
        }}
        aria-hidden="true"
      />

      {/* Diamond-Point Shiny Core Specular Glint */}
      <div
        className="pointer-events-none fixed -translate-x-1/2 -translate-y-1/2 rounded-full z-30 transition-transform duration-75"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          width: isClicking ? '10px' : '7px',
          height: isClicking ? '10px' : '7px',
          opacity: isVisible ? 1 : 0,
          background: '#FFFFFF',
          boxShadow:
            '0 0 8px 2px #38BDF8, 0 0 14px 4px rgba(59, 130, 246, 0.8), 0 0 20px 6px rgba(186, 230, 253, 0.5)',
        }}
        aria-hidden="true"
      />
    </>
  );
};
