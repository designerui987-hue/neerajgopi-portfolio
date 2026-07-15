import { useEffect, useRef } from "react";

/**
 * Lightweight animated gradient-mesh canvas.
 * Drawn with 2D canvas (blurred radial blobs) — no WebGL, ~1kB runtime.
 * Rendered inside the hero only; caller is responsible for gating on
 * mobile / reduced-motion / low-end devices.
 */
export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let running = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Three drifting blobs — terracotta accent + cool counterpoint
    const blobs = [
      { hue: "244, 154, 96", x: 0.28, y: 0.35, r: 0.55, phase: 0.0, speed: 0.00018 },
      { hue: "230, 120, 80", x: 0.72, y: 0.55, r: 0.5, phase: 1.7, speed: 0.00022 },
      { hue: "120, 150, 200", x: 0.55, y: 0.2, r: 0.42, phase: 3.1, speed: 0.00015 },
    ];

    const draw = (t: number) => {
      if (!running) return;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      const isLight = document.documentElement.classList.contains("light");
      ctx.globalCompositeOperation = isLight ? "source-over" : "lighter";

      for (const b of blobs) {
        const cx = (b.x + Math.sin(t * b.speed + b.phase) * 0.12) * w;
        const cy = (b.y + Math.cos(t * b.speed * 1.3 + b.phase) * 0.1) * h;
        const rad = Math.min(w, h) * b.r;
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
        const opacityMain = isLight ? 0.22 : 0.55;
        const opacityMid = isLight ? 0.08 : 0.18;
        g.addColorStop(0, `rgba(${b.hue}, ${opacityMain})`);
        g.addColorStop(0.5, `rgba(${b.hue}, ${opacityMid})`);
        g.addColorStop(1, `rgba(${b.hue}, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx, cy, rad, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        raf = requestAnimationFrame(draw);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full opacity-70"
      style={{ filter: "blur(48px) saturate(1.1)" }}
    />
  );
}
