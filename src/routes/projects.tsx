import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Stagger, staggerItem } from "@/components/reveal";
import { projects } from "@/lib/projects";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Gopi Neeraj Kumar" },
      {
        name: "description",
        content:
          "Early UI/UX case studies by Gopi Neeraj Kumar — SaaS dashboards, landing pages, mobile app concepts, and weekly UI studies.",
      },
      { property: "og:title", content: "Projects — Gopi Neeraj Kumar" },
      {
        property: "og:description",
        content:
          "Early UI/UX case studies by Gopi Neeraj Kumar — SaaS dashboards, landing pages, mobile app concepts, and weekly UI studies.",
      },
    ],
  }),
  component: Projects,
});

/**
 * Asymmetric grid layout — 12-column grid with intentional variance in
 * span, offset, and aspect ratio. Flagship (Orbit) gets the widest slot;
 * the rest cascade in a staggered rhythm.
 */
const LAYOUT = [
  // hrms — flagship, wide
  {
    col: "md:col-span-8 md:col-start-1",
    aspect: "aspect-[16/10]",
    tone: "flagship" as const,
  },
  // nova — default, right
  {
    col: "md:col-span-4 md:col-start-9 md:mt-16",
    aspect: "aspect-[3/4]",
    tone: "default" as const,
  },
];

function Projects() {
  const reduced = useReducedMotion();

  return (
    <PageShell
      eyebrow="Selected work · 2025 — 2026"
      title="Projects"
      description="Selected case studies detailing my work on production systems, design systems, and solo product builds."
    >
      <Stagger className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-x-6 md:gap-y-16" stagger={0.09}>
        {projects.map((p, i) => {
          const layout = LAYOUT[i] ?? LAYOUT[LAYOUT.length - 1];
          const isFlagship = layout.tone === "flagship";

          return (
            <motion.article
              key={p.slug}
              variants={staggerItem}
              whileHover={reduced ? undefined : { y: -8 }}
              transition={{ type: "spring", stiffness: 220, damping: 26 }}
              className={`group relative ${layout.col}`}
            >
              <Link
                to="/projects/$slug"
                params={{ slug: p.slug }}
                className="block outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background rounded-3xl"
              >
                {/* Cover */}
                <div
                  className={`relative overflow-hidden rounded-3xl border border-border/70 bg-surface ${layout.aspect}`}
                  style={{ boxShadow: "var(--shadow-soft)" }}
                >
                  {p.coverImage ? (
                    <img
                      src={p.coverImage}
                      alt={p.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                    />
                  ) : (
                    <motion.div
                      className="absolute inset-0 grid-bg opacity-60"
                      initial={false}
                      whileHover={
                        reduced
                          ? undefined
                          : { scale: 1.08, skewX: "-1.5deg", skewY: "0.5deg", opacity: 1 }
                      }
                      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
                  {/* Warm accent glow */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                    style={{
                      background: isFlagship
                        ? "radial-gradient(ellipse 70% 55% at 50% 45%, oklch(0.74 0.15 45 / 0.16), transparent 72%)"
                        : "radial-gradient(ellipse 60% 50% at 50% 40%, oklch(0.74 0.15 45 / 0.10), transparent 70%)",
                    }}
                  />
                  {/* Flagship badge */}
                  {isFlagship && (
                    <div className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-background/60 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-accent backdrop-blur">
                      <span className="h-1 w-1 rounded-full bg-accent" />
                      Flagship
                    </div>
                  )}

                  {/* Category chip — solid surface so label stays fully legible on hover */}
                  <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-border bg-background/85 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-foreground backdrop-blur-md">
                    <span className="h-1 w-1 rounded-full bg-accent" />
                    {p.category}
                  </div>

                  {/* Cover label + year */}
                  <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                    <span className="font-display text-xl text-foreground/85 md:text-2xl">
                      {p.cover}
                    </span>
                    <span className="rounded-full border border-border bg-background/85 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-foreground backdrop-blur-md">
                      {p.year}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="mt-6 flex flex-col gap-4">
                  {/* Title with per-word stagger on hover */}
                  <h2
                    className={`font-display leading-[1.08] tracking-tight text-foreground ${
                      isFlagship
                        ? "text-3xl md:text-[40px]"
                        : "text-2xl md:text-[26px]"
                    }`}
                  >
                    {p.title.split(" ").map((word, wi) => (
                      <motion.span
                        key={wi}
                        className="inline-block will-change-transform"
                        initial={false}
                        whileHover={undefined}
                        animate={{ y: 0 }}
                        variants={{
                          rest: { y: 0 },
                          hover: { y: -3 },
                        }}
                        transition={{
                          duration: 0.45,
                          delay: reduced ? 0 : wi * 0.03,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        {word}
                        {wi < p.title.split(" ").length - 1 && "\u00A0"}
                      </motion.span>
                    ))}
                  </h2>

                  <p
                    className={`text-sm leading-relaxed text-muted-foreground ${
                      isFlagship ? "md:text-base max-w-xl" : "max-w-md"
                    }`}
                  >
                    {p.description}
                  </p>

                  <div className="mt-1 flex items-center justify-between gap-6 border-t border-border/60 pt-4 text-xs">
                    {/* Role — kept fully legible, no hover fade */}
                    <span className="text-foreground/85">{p.role}</span>
                    <span className="inline-flex items-center gap-1.5 font-medium uppercase tracking-[0.16em] text-muted-foreground transition-colors group-hover:text-accent">
                      Case study
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          );
        })}
      </Stagger>
    </PageShell>
  );
}
