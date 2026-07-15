import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useEffect, useRef, type ReactNode, type RefObject } from "react";

export function Magnetic({
  children,
  strength = 0.35,
  radius = 120,
  className,
}: {
  children: ReactNode;
  strength?: number;
  radius?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 22, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 260, damping: 22, mass: 0.4 });

  if (reduced) {
    return <span className={className}>{children}</span>;
  }

  const handleMove = (e: React.PointerEvent<HTMLSpanElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    const scale = Math.max(0, 1 - dist / (radius + Math.max(rect.width, rect.height)));
    x.set(dx * strength * scale);
    y.set(dy * strength * scale);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <span
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      className={`inline-block ${className ?? ""}`}
    >
      <motion.span style={{ x: sx, y: sy, display: "inline-block" }}>
        {children}
      </motion.span>
    </span>
  );
}

/**
 * Attach a magnetic hover effect to any element via ref.
 * Directly mutates transform (no wrapper) — safe for flex/grid items.
 */
export function useMagnetic<T extends HTMLElement>(
  ref: RefObject<T | null>,
  { strength = 0.3, radius = 90 }: { strength?: number; radius?: number } = {},
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let tx = 0;
    let ty = 0;
    let raf = 0;
    const apply = () => {
      el.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0)`;
      raf = 0;
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      const falloff = Math.max(0, 1 - dist / (radius + Math.max(r.width, r.height)));
      tx = dx * strength * falloff;
      ty = dy * strength * falloff;
      schedule();
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
      schedule();
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    el.style.transition = "transform 400ms cubic-bezier(0.22, 1, 0.36, 1)";
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
      el.style.transform = "";
      el.style.transition = "";
    };
  }, [ref, strength, radius]);
}

