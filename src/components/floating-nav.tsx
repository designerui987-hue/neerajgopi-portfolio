import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Home, Layers, Workflow, Palette, Sparkles, User, Mail, FileDown } from "lucide-react";
import { useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useMagnetic } from "@/components/magnetic";

function MagneticSlot({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useMagnetic(ref, { strength: 0.45, radius: 70 });
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

const items = [
  { to: "/", label: "Home", icon: Home },
  { to: "/projects", label: "Projects", icon: Layers },
  { to: "/process", label: "Process", icon: Workflow },
  { to: "/design-system", label: "System", icon: Palette },
  { to: "/playground", label: "Playground", icon: Sparkles },
  { to: "/about", label: "About", icon: User },
  { to: "/contact", label: "Contact", icon: Mail },
] as const;

const RESUME_URL = "/resume.pdf";

export function FloatingNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <>
      {/* Desktop: sticky left rail */}
      <aside className="fixed left-6 top-1/2 z-50 hidden -translate-y-1/2 lg:block">
        <nav
          aria-label="Primary"
          className="flex flex-col gap-1 rounded-2xl border border-border/60 bg-surface/80 p-2 backdrop-blur-xl"
          style={{ boxShadow: "var(--shadow-float)" }}
        >
          {items.map((item) => {
            const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                aria-label={item.label}
                aria-current={active ? "page" : undefined}
                onMouseEnter={() => setHovered(item.to)}
                onMouseLeave={() => setHovered(null)}
                className="group relative flex items-center rounded-xl"
              >
                <MagneticSlot
                  className={cn(
                    "relative flex h-11 w-11 items-center justify-center rounded-xl transition-colors",
                    active
                      ? "text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {active && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-xl bg-primary"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Icon className="relative h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden="true" />
                </MagneticSlot>
                {hovered === item.to && (
                  <motion.span
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-md bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground"
                    aria-hidden="true"
                  >
                    {item.label}
                  </motion.span>
                )}
              </Link>
            );
          })}

          {/* Divider + Resume */}
          <div className="my-1 h-px w-full bg-border/70" />
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download resume (PDF)"
            onMouseEnter={() => setHovered("resume")}
            onMouseLeave={() => setHovered(null)}
            className="group relative flex items-center rounded-xl"
          >
            <MagneticSlot className="relative flex h-11 w-11 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:text-foreground">
              <FileDown className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden="true" />
            </MagneticSlot>
            {hovered === "resume" && (
              <motion.span
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-md bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground"
                aria-hidden="true"
              >
                Resume
              </motion.span>
            )}
          </a>
        </nav>
      </aside>

      {/* Mobile / tablet: bottom floating bar */}
      <nav
        aria-label="Primary"
        className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 lg:hidden"
        style={{ boxShadow: "var(--shadow-float)" }}
      >
        <div className="flex items-center gap-0.5 rounded-full border border-border/60 bg-surface/90 p-1.5 backdrop-blur-xl">
          {items.map((item) => {
            const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                aria-label={item.label}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative flex h-11 w-11 items-center justify-center rounded-full transition-colors",
                  active ? "text-primary-foreground" : "text-muted-foreground",
                )}
              >
                {active && (
                  <motion.div
                    layoutId="nav-active-mobile"
                    className="absolute inset-0 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon className="relative h-[17px] w-[17px]" strokeWidth={1.75} aria-hidden="true" />
              </Link>
            );
          })}
          <span className="mx-0.5 h-6 w-px bg-border/70" aria-hidden="true" />
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download resume (PDF)"
            className="relative flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
          >
            <FileDown className="h-[17px] w-[17px]" strokeWidth={1.75} aria-hidden="true" />
          </a>
        </div>
      </nav>
    </>
  );
}
