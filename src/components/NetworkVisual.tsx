import React, { useRef, useEffect, useState } from 'react';

export function NetworkVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const animationRef = useRef<number>();
  const particlesRef = useRef<
    Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      connections: number[];
    }>
  >([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    window.addEventListener('resize', resize);

    // Initialize particles
    const particleCount = 50;
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        connections: [],
      });
    }
    particlesRef.current = particles;

    const animate = () => {
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      if (!isPaused) {
        // Update particle positions
        particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0 || p.x > canvas.offsetWidth) p.vx *= -1;
          if (p.y < 0 || p.y > canvas.offsetHeight) p.vy *= -1;

          p.x = Math.max(0, Math.min(canvas.offsetWidth, p.x));
          p.y = Math.max(0, Math.min(canvas.offsetHeight, p.y));
        });
      }

      // Draw connections
      const isDark = document.documentElement.classList.contains('dark');
      ctx.strokeStyle = isDark ? 'rgba(250, 245, 240, 0.1)' : 'rgba(15, 23, 42, 0.1)';
      ctx.lineWidth = 1;

      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.globalAlpha = 1 - distance / 120;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        });
      });

      // Draw particles
      ctx.fillStyle = 'rgb(255, 107, 107)';
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused]);

  return (
    <div
      className="w-full h-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
