import React, { useEffect, useRef } from 'react';

export const BackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
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

    // Particle setup
    const particleCount = Math.min(Math.floor(width / 22), 70);
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      alpha: number;
      maxAlpha: number;
      pulseSpeed: number;
    }> = [];

    const colors = ['#FF5E3A', '#FF2A85', '#9D4EDD', '#00F2FE', '#4EA8DE'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2.2 + 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.6 + 0.1,
        maxAlpha: Math.random() * 0.5 + 0.3,
        pulseSpeed: Math.random() * 0.015 + 0.005
      });
    }

    // Interactive mouse force
    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let time = 0;

    const render = () => {
      time += 0.01;
      ctx.clearRect(0, 0, width, height);

      // Subtle Dynamic Aurora Gradients
      const g1 = ctx.createRadialGradient(
        width * 0.2 + Math.sin(time * 0.5) * 100,
        height * 0.3 + Math.cos(time * 0.3) * 80,
        0,
        width * 0.2,
        height * 0.3,
        width * 0.5
      );
      g1.addColorStop(0, 'rgba(255, 94, 58, 0.08)');
      g1.addColorStop(1, 'rgba(5, 5, 5, 0)');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, width, height);

      const g2 = ctx.createRadialGradient(
        width * 0.8 + Math.cos(time * 0.4) * 120,
        height * 0.7 + Math.sin(time * 0.6) * 100,
        0,
        width * 0.8,
        height * 0.7,
        width * 0.6
      );
      g2.addColorStop(0, 'rgba(0, 242, 254, 0.07)');
      g2.addColorStop(1, 'rgba(5, 5, 5, 0)');
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, width, height);

      // Draw particle connections & points
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Particle physics update
        p.x += p.vx;
        p.y += p.vy;

        // Pulse alpha
        p.alpha += Math.sin(time * 2) * p.pulseSpeed;
        if (p.alpha < 0.1) p.alpha = 0.1;
        if (p.alpha > p.maxAlpha) p.alpha = p.maxAlpha;

        // Bounce borders
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse subtle attraction
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 180) {
          const force = (180 - dist) / 180;
          p.x -= (dx / dist) * force * 0.8;
          p.y -= (dy / dist) * force * 0.8;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 12;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const cdx = p.x - p2.x;
          const cdy = p.y - p2.y;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy);

          if (cdist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (1 - cdist / 110) * 0.15;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
    />
  );
};
