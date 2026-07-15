import { Link, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Home,
  Layers,
  Workflow,
  Palette,
  User,
  Mail,
  FileDown,
  Sun,
  Moon,
  Menu,
  X,
} from "lucide-react";
import { useRef, useState, useEffect, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useMagnetic } from "@/components/magnetic";
import { useScrollSpy } from "@/hooks/use-scrollspy";

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
  { to: "/about", label: "About", icon: User },
  { to: "/contact", label: "Contact", icon: Mail },
] as const;

const RESUME_URL = "/resume.pdf";

export function FloatingNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [hovered, setHovered] = useState<string | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [mobileOpen, setMobileOpen] = useState(false);
  const reduced = useReducedMotion();

  // Scrollspy lists
  const isDesignSystem = pathname === "/design-system";
  const isCaseStudy = pathname.startsWith("/projects/") && pathname !== "/projects";

  const designSystemSections = [
    "color",
    "type",
    "spacing",
    "buttons",
    "inputs",
    "cards",
    "badges",
    "icons",
    "grid",
    "shadows",
    "radius",
  ];
  const caseStudySections = ["01", "02", "03", "04", "05"];

  const activeDSSection = useScrollSpy(isDesignSystem ? designSystemSections : []);
  const activeCSSection = useScrollSpy(isCaseStudy ? caseStudySections : []);

  const dsLabels: Record<string, string> = {
    color: "Color",
    type: "Typography",
    spacing: "Spacing",
    buttons: "Buttons",
    inputs: "Inputs",
    cards: "Cards",
    badges: "Badges",
    icons: "Icons",
    grid: "Grid",
    shadows: "Shadows",
    radius: "Radius",
  };

  const csLabels: Record<string, string> = {
    "01": "Overview",
    "02": "Problem",
    "03": "Constraints",
    "04": "Process",
    "05": "Outcomes",
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const activeTheme = document.documentElement.classList.contains("light") ? "light" : "dark";
      setTheme(activeTheme);
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    if (nextTheme === "light") {
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    }
  };

  // Keyboard navigation helpers
  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      action();
    }
  };

  return (
    <>
      {/* 1. Desktop Expanded Panel (lg) */}
      <aside className="fixed left-0 top-0 bottom-0 z-50 hidden w-64 border-r border-border/60 bg-surface/85 backdrop-blur-xl lg:flex flex-col justify-between p-6">
        <div>
          {/* Logo / Title */}
          <div className="flex flex-col mb-8 select-none">
            <span className="font-display text-base font-semibold tracking-tight text-foreground leading-tight">
              Gopi Neeraj Kumar
            </span>
            <span className="text-[9px] uppercase tracking-wider text-muted-foreground mt-0.5 leading-none">
              Junior UI/UX Designer
            </span>
          </div>

          {/* Nav Items */}
          <nav aria-label="Desktop primary" className="flex flex-col gap-1.5">
            {items.map((item) => {
              const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
              const Icon = item.icon;
              return (
                <div key={item.to} className="flex flex-col">
                  <Link
                    to={item.to}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-3.5 px-3 py-2 text-sm font-medium rounded-xl transition-all duration-300 relative group cursor-pointer focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2",
                      active
                        ? "text-primary-foreground bg-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/40",
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" strokeWidth={active ? 2 : 1.75} />
                    <span className="relative z-10">{item.label}</span>
                  </Link>

                  {/* Sub-nav design system scrollspy */}
                  {item.to === "/design-system" && isDesignSystem && (
                    <AnimatePresence>
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="ml-7 mt-2 border-l border-border/40 pl-4 space-y-1.5"
                      >
                        {designSystemSections.map((sect) => {
                          const subActive = activeDSSection === sect;
                          return (
                            <a
                              key={sect}
                              href={`#${sect}`}
                              className={cn(
                                "block text-xs transition-colors hover:text-foreground py-0.5",
                                subActive
                                  ? "text-accent font-medium pl-1 border-l border-accent -ml-[17px]"
                                  : "text-muted-foreground",
                              )}
                            >
                              {dsLabels[sect]}
                            </a>
                          );
                        })}
                      </motion.div>
                    </AnimatePresence>
                  )}

                  {/* Sub-nav case studies scrollspy */}
                  {item.to === "/projects" && isCaseStudy && (
                    <AnimatePresence>
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="ml-7 mt-2 border-l border-border/40 pl-4 space-y-1.5"
                      >
                        {caseStudySections.map((sect) => {
                          const subActive = activeCSSection === sect;
                          return (
                            <a
                              key={sect}
                              href={`#${sect}`}
                              className={cn(
                                "block text-xs transition-colors hover:text-foreground py-0.5",
                                subActive
                                  ? "text-accent font-medium pl-1 border-l border-accent -ml-[17px]"
                                  : "text-muted-foreground",
                              )}
                            >
                              {csLabels[sect]}
                            </a>
                          );
                        })}
                      </motion.div>
                    </AnimatePresence>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Desktop Footer Actions */}
        <div className="flex flex-col gap-2.5">
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium border border-border rounded-xl text-foreground bg-surface hover:bg-secondary transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-ring"
          >
            <FileDown className="h-4 w-4" strokeWidth={1.75} />
            <span>Download Resume</span>
          </a>

          <button
            onClick={toggleTheme}
            onKeyDown={(e) => handleKeyDown(e, toggleTheme)}
            className="flex items-center justify-between px-4 py-2.5 text-xs font-medium border border-border/60 bg-secondary/20 hover:bg-secondary/40 text-muted-foreground hover:text-foreground rounded-xl transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-ring"
            aria-label="Toggle theme"
          >
            <span className="capitalize">{theme} Theme</span>
            <div className="relative h-4 w-4 flex items-center justify-center">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ opacity: 0, rotate: -30, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 30, scale: 0.8 }}
                  transition={reduced ? { duration: 0 } : { duration: 0.2, ease: "easeInOut" }}
                >
                  {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </motion.div>
              </AnimatePresence>
            </div>
          </button>
        </div>
      </aside>

      {/* 2. Tablet Collapsed Panel (md:flex lg:hidden) */}
      <aside className="fixed left-0 top-0 bottom-0 z-50 hidden md:flex lg:hidden w-20 border-r border-border/60 bg-surface/85 backdrop-blur-xl flex-col items-center justify-between py-6 px-3">
        <div className="flex flex-col items-center w-full">
          {/* Collapsed Logo */}
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary font-display font-semibold text-lg mb-8 select-none">
            G
          </div>

          {/* Icons Nav */}
          <nav aria-label="Tablet primary" className="flex flex-col gap-2">
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
                  className="group relative flex items-center rounded-xl focus-visible:outline-2 focus-visible:outline-ring"
                >
                  <MagneticSlot
                    className={cn(
                      "relative flex h-11 w-11 items-center justify-center rounded-xl transition-colors",
                      active
                        ? "text-primary-foreground bg-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/40",
                    )}
                  >
                    <Icon className="relative h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden="true" />
                  </MagneticSlot>
                  {hovered === item.to && (
                    <motion.span
                      initial={{ opacity: 0, x: -4 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="pointer-events-none absolute left-full ml-3 z-50 whitespace-nowrap rounded-md bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground shadow-[var(--shadow-float)]"
                      aria-hidden="true"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Collapsed Footer Actions */}
        <div className="flex flex-col gap-2 items-center w-full">
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download Resume"
            onMouseEnter={() => setHovered("resume")}
            onMouseLeave={() => setHovered(null)}
            className="group relative flex h-11 w-11 items-center justify-center border border-border rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-ring"
          >
            <FileDown className="h-[18px] w-[18px]" strokeWidth={1.75} />
            {hovered === "resume" && (
              <motion.span
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                className="pointer-events-none absolute left-full ml-3 z-50 whitespace-nowrap rounded-md bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground shadow-[var(--shadow-float)]"
                aria-hidden="true"
              >
                Download Resume
              </motion.span>
            )}
          </a>

          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            onMouseEnter={() => setHovered("theme")}
            onMouseLeave={() => setHovered(null)}
            className="group relative flex h-11 w-11 items-center justify-center border border-border/60 bg-secondary/15 hover:bg-secondary/35 text-muted-foreground hover:text-foreground rounded-xl transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-ring"
          >
            <div className="relative h-4 w-4 flex items-center justify-center">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ opacity: 0, rotate: -30, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 30, scale: 0.8 }}
                  transition={reduced ? { duration: 0 } : { duration: 0.2, ease: "easeInOut" }}
                >
                  {theme === "dark" ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
                </motion.div>
              </AnimatePresence>
            </div>
            {hovered === "theme" && (
              <motion.span
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                className="pointer-events-none absolute left-full ml-3 z-50 whitespace-nowrap rounded-md bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground shadow-[var(--shadow-float)]"
                aria-hidden="true"
              >
                Toggle Theme ({theme === "dark" ? "Light" : "Dark"})
              </motion.span>
            )}
          </button>
        </div>
      </aside>

      {/* 3. Mobile Floating Hamburger Menu Button (md:hidden) */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-border/80 bg-surface/90 shadow-[var(--shadow-float)] backdrop-blur-xl md:hidden text-foreground hover:bg-secondary cursor-pointer focus-visible:outline-2 focus-visible:outline-ring"
        aria-label="Open Navigation Menu"
      >
        <Menu className="h-5 w-5" strokeWidth={1.75} />
      </button>

      {/* Mobile Sidebar Overlay Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-[60] bg-background/60 backdrop-blur-sm md:hidden"
            />

            {/* Sidebar drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 bottom-0 z-[70] flex w-72 flex-col justify-between border-r border-border bg-surface p-6 shadow-[var(--shadow-premium)] md:hidden"
            >
              <div>
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                  <div className="flex flex-col">
                    <span className="font-display text-base font-semibold tracking-tight text-foreground leading-tight">
                      Gopi Neeraj Kumar
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-muted-foreground mt-0.5 leading-none">
                      Junior UI/UX Designer
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="h-9 w-9 flex items-center justify-center rounded-full border border-border hover:bg-secondary cursor-pointer text-foreground focus-visible:outline-2 focus-visible:outline-ring"
                    aria-label="Close menu"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Navigation links */}
                <nav aria-label="Mobile primary" className="flex flex-col gap-2">
                  {items.map((item) => {
                    const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "flex items-center gap-3.5 px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-ring",
                          active
                            ? "text-primary-foreground bg-primary"
                            : "text-muted-foreground hover:text-foreground hover:bg-secondary/40",
                        )}
                      >
                        <Icon className="h-4.5 w-4.5" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Footer Actions */}
              <div className="flex flex-col gap-3">
                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-medium border border-border rounded-xl text-foreground bg-surface hover:bg-secondary transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-ring"
                >
                  <FileDown className="h-4.5 w-4.5" />
                  <span>Download Resume</span>
                </a>

                <button
                  onClick={toggleTheme}
                  onKeyDown={(e) => handleKeyDown(e, toggleTheme)}
                  className="flex items-center justify-between px-4 py-3 text-xs font-medium border border-border/60 bg-secondary/15 hover:bg-secondary/35 text-muted-foreground hover:text-foreground rounded-xl transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-ring"
                  aria-label="Toggle theme"
                >
                  <span className="capitalize">{theme} Theme</span>
                  <div className="relative h-4.5 w-4.5 flex items-center justify-center">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={theme}
                        initial={{ opacity: 0, rotate: -30, scale: 0.8 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{ opacity: 0, rotate: 30, scale: 0.8 }}
                        transition={reduced ? { duration: 0 } : { duration: 0.2, ease: "easeInOut" }}
                      >
                        {theme === "dark" ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
