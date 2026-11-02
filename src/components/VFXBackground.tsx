import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Sliders, Eye, EyeOff } from 'lucide-react';

export type VfxMode = 'constellation' | 'cyberGrid' | 'particles';

interface VFXBackgroundProps {
  initialActive?: boolean;
}

export const VFXBackground: React.FC<VFXBackgroundProps> = ({ initialActive = true }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isActive, setIsActive] = useState<boolean>(initialActive);
  const [mode, setMode] = useState<VfxMode>('constellation');
  const [showControls, setShowControls] = useState<boolean>(false);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Particle definition
    const particleCount = Math.min(Math.floor((width * height) / 18000), 75);
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      alpha: number;
      pulseSpeed: number;
    }> = [];

    const colors = [
      'rgba(56, 189, 248, ', // sky blue
      'rgba(96, 165, 250, ', // royal blue
      'rgba(168, 85, 247, ', // purple
      'rgba(192, 132, 252, ', // light violet
      'rgba(59, 130, 246, '  // deep blue
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.3,
        pulseSpeed: Math.random() * 0.02 + 0.005
      });
    }

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      if (mode === 'cyberGrid') {
        // Subtle cyber perspective grid
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.04)';
        ctx.lineWidth = 1;
        const gridSize = 60;
        for (let x = 0; x < width; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        for (let y = 0; y < height; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
      }

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce from walls
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Mouse interaction: soft attraction
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            const force = (140 - dist) / 140;
            p.x += (dx / dist) * force * 0.8;
            p.y += (dy / dist) * force * 0.8;
          }
        }

        // Draw particle
        const dynamicAlpha = p.alpha + Math.sin(time + i) * 0.15;
        ctx.fillStyle = `${p.color}${Math.max(0.1, dynamicAlpha)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Constellation lines
        if (mode === 'constellation' || mode === 'cyberGrid') {
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 110) {
              const lineAlpha = (1 - dist / 110) * 0.22;
              ctx.strokeStyle = `rgba(139, 92, 246, ${lineAlpha})`;
              ctx.lineWidth = 0.8;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }

          // Connect to mouse if nearby
          if (mouseRef.current.active) {
            const dx = p.x - mouseRef.current.x;
            const dy = p.y - mouseRef.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150) {
              const mouseLineAlpha = (1 - dist / 150) * 0.45;
              ctx.strokeStyle = `rgba(56, 189, 248, ${mouseLineAlpha})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
              ctx.stroke();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isActive, mode]);

  return (
    <>
      {/* Background ambient glowing radial gradient blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-blue-600/15 blur-[120px]" />
        <div className="absolute top-1/3 -right-40 w-[30rem] h-[30rem] rounded-full bg-purple-600/12 blur-[140px]" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 rounded-full bg-indigo-600/15 blur-[130px]" />
      </div>

      {/* VFX Canvas */}
      {isActive && (
        <canvas
          ref={canvasRef}
          data-testid="vfx-canvas"
          className="fixed inset-0 pointer-events-none z-0 opacity-80 transition-opacity duration-700"
          aria-hidden="true"
        />
      )}

      {/* Subtle interactive VFX widget for customization */}
      <aside aria-label="Visual effects controls" className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
        {showControls && (
          <div className="glass-panel px-3 py-2 rounded-xl flex items-center gap-2 text-xs text-slate-300 shadow-xl border border-blue-500/30 animate-in fade-in slide-in-from-right-3">
            <span className="text-slate-400 font-medium">VFX:</span>
            <button
              type="button"
              onClick={() => setMode('constellation')}
              className={`px-2 py-1 rounded-md transition-all ${
                mode === 'constellation'
                  ? 'bg-blue-600/40 text-blue-200 border border-blue-400/40'
                  : 'hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Constellation
            </button>
            <button
              type="button"
              onClick={() => setMode('cyberGrid')}
              className={`px-2 py-1 rounded-md transition-all ${
                mode === 'cyberGrid'
                  ? 'bg-purple-600/40 text-purple-200 border border-purple-400/40'
                  : 'hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Cyber Grid
            </button>
            <button
              type="button"
              onClick={() => setMode('particles')}
              className={`px-2 py-1 rounded-md transition-all ${
                mode === 'particles'
                  ? 'bg-indigo-600/40 text-indigo-200 border border-indigo-400/40'
                  : 'hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Particles
            </button>
            <button
              type="button"
              onClick={() => setIsActive(!isActive)}
              className="ml-1 p-1 hover:text-white rounded"
              title={isActive ? 'Pause VFX' : 'Play VFX'}
              aria-label={isActive ? 'Disable visual effects' : 'Enable visual effects'}
            >
              {isActive ? <Eye className="w-3.5 h-3.5 text-blue-400" /> : <EyeOff className="w-3.5 h-3.5 text-slate-500" />}
            </button>
          </div>
        )}

        <button
          type="button"
          onClick={() => setShowControls(!showControls)}
          className="glass-panel hover:border-blue-400/50 p-2.5 rounded-full text-blue-400 hover:text-blue-300 transition-all shadow-lg hover:scale-105 active:scale-95 group"
          title="Customize VFX Animation"
          aria-label="Toggle visual effects controls"
        >
          <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300 text-purple-400" />
        </button>
      </aside>
    </>
  );
};
