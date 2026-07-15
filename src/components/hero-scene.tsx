import { lazy, Suspense, useEffect, useState, type ReactNode } from "react";

const HeroBackground = lazy(() => import("./hero-background"));

/**
 * Wraps the hero and lazy-mounts an animated gradient-mesh background.
 * Skips the background on mobile, low-end devices, and reduced-motion users.
 */
export function HeroScene({ children }: { children: ReactNode }) {
  const [showBg, setShowBg] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqSmall = window.matchMedia("(max-width: 767px)");
    const nav = navigator as Navigator & { deviceMemory?: number };
    const cores = nav.hardwareConcurrency ?? 8;
    const mem = nav.deviceMemory ?? 8;
    const lowEnd = cores <= 4 || mem <= 4;

    const evaluate = () => {
      setShowBg(!(mqReduce.matches || mqSmall.matches || lowEnd));
    };
    evaluate();
    mqReduce.addEventListener?.("change", evaluate);
    mqSmall.addEventListener?.("change", evaluate);
    return () => {
      mqReduce.removeEventListener?.("change", evaluate);
      mqSmall.removeEventListener?.("change", evaluate);
    };
  }, []);

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-24 -z-10 h-[720px] overflow-hidden"
        style={{
          maskImage:
            "radial-gradient(ellipse 70% 60% at 40% 40%, black 40%, transparent 85%)",
        }}
      >
        {showBg && (
          <Suspense fallback={null}>
            <HeroBackground />
          </Suspense>
        )}
      </div>
      {children}
    </div>
  );
}
