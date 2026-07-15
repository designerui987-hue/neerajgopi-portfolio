import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export function GeometricBackground() {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();

  const y1 = useTransform(scrollY, [0, 1200], [0, reduced ? 0 : -160]);
  const y2 = useTransform(scrollY, [0, 1200], [0, reduced ? 0 : 120]);
  const y3 = useTransform(scrollY, [0, 1200], [0, reduced ? 0 : -80]);
  const rotate = useTransform(scrollY, [0, 1600], [0, reduced ? 0 : 30]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 grid-bg grid-bg-fade" />
      {/* Soft radial glows */}
      <motion.div
        style={{
          y: y1,
          background:
            "radial-gradient(circle, oklch(0.68 0.14 45 / 0.18), transparent 70%)",
        }}
        className="absolute -top-40 left-1/3 h-[520px] w-[520px] rounded-full opacity-40 blur-3xl"
      />
      <motion.div
        style={{
          y: y2,
          background:
            "radial-gradient(circle, oklch(0.6 0.08 240 / 0.15), transparent 70%)",
        }}
        className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full opacity-30 blur-3xl"
      />
      {/* Abstract geometric marks */}
      <motion.svg
        style={{ y: y3, rotate }}
        className="absolute right-16 top-24 hidden opacity-[0.08] lg:block"
        width="180"
        height="180"
        viewBox="0 0 180 180"
        fill="none"
      >
        <circle cx="90" cy="90" r="89" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="90" cy="90" r="60" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="90" cy="90" r="30" stroke="currentColor" strokeWidth="0.5" />
        <line x1="0" y1="90" x2="180" y2="90" stroke="currentColor" strokeWidth="0.5" />
        <line x1="90" y1="0" x2="90" y2="180" stroke="currentColor" strokeWidth="0.5" />
      </motion.svg>
    </div>
  );
}
