import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Check,
  Search,
  Sparkles,
  Home,
  Layers,
  Workflow,
  Palette,
  User,
  Mail,
  Circle,
} from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/design-system")({
  head: () => ({
    meta: [
      { title: "Design System — Gopi Neeraj Kumar" },
      {
        name: "description",
        content:
          "Foundations, components, and patterns: color, typography, spacing, buttons, inputs, cards, badges, icons, grid, shadows, and radius.",
      },
      { property: "og:title", content: "Design System — Gopi Neeraj Kumar" },
      {
        property: "og:description",
        content:
          "Foundations, components, and patterns: color, typography, spacing, buttons, inputs, cards, badges, icons, grid, shadows, and radius.",
      },
    ],
  }),
  component: DesignSystem,
});

/* ---------------- Section primitive ---------------- */

function Section({
  id,
  index,
  label,
  title,
  description,
  children,
}: {
  id: string;
  index: string;
  label: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mt-20 scroll-mt-24 first:mt-0">
      <div className="mb-6 flex items-baseline gap-4 border-b border-border/70 pb-4">
        <span className="font-display text-sm text-accent">{index}</span>
        <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          {label}
        </span>
      </div>
      <h2 className="max-w-3xl font-display text-3xl leading-tight text-foreground md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
      <div className="mt-8">{children}</div>
    </section>
  );
}

/* ---------------- Color ---------------- */

const colorTokens: Array<{
  name: string;
  varName: string;
  role: string;
  onDark?: boolean;
}> = [
  { name: "Background", varName: "--background", role: "Page canvas" },
  { name: "Surface", varName: "--surface", role: "Cards, panels" },
  { name: "Foreground", varName: "--foreground", role: "Primary text", onDark: true },
  { name: "Muted", varName: "--muted", role: "Subtle fills" },
  {
    name: "Muted foreground",
    varName: "--muted-foreground",
    role: "Secondary text",
    onDark: true,
  },
  { name: "Primary", varName: "--primary", role: "Actions, emphasis", onDark: true },
  { name: "Accent", varName: "--accent", role: "Highlights", onDark: true },
  { name: "Border", varName: "--border", role: "Dividers, outlines" },
];

function ColorSwatch({ token }: { token: (typeof colorTokens)[number] }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    let colorVal = "";
    if (typeof window !== "undefined") {
      colorVal = getComputedStyle(document.documentElement).getPropertyValue(token.varName).trim();
    }
    const textToCopy = `${token.varName}: ${colorVal}`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      // fallback
    }
  };

  return (
    <div
      onClick={handleCopy}
      className="group overflow-hidden rounded-2xl border border-border/70 bg-surface transition-shadow duration-300 hover:shadow-[var(--shadow-float)] cursor-pointer select-none relative"
      style={{ boxShadow: "var(--shadow-soft)" }}
    >
      <div
        className="relative h-24 w-full"
        style={{ background: `var(${token.varName})` }}
      >
        <span
          className={`absolute bottom-2 right-3 text-[10px] font-medium uppercase tracking-widest ${
            token.onDark ? "text-white/70" : "text-foreground/40"
          }`}
        >
          {token.varName}
        </span>
      </div>
      <div className="flex items-center justify-between p-4">
        <div>
          <div className="text-sm font-medium text-foreground">{token.name}</div>
          <div className="text-xs text-muted-foreground">{token.role}</div>
        </div>
        <AnimatePresence>
          {copied && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-[10px] font-semibold text-accent uppercase tracking-wider"
            >
              Copied!
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ---------------- Typography ---------------- */

const typeScale = [
  {
    label: "Display / 7xl",
    cls: "font-display text-7xl leading-[1.02] tracking-tight",
    meta: "72 / -2%",
    specs: "Font: Fraunces | Size: 72px (4.5rem) | Line-height: 1.02 | Tracking: -0.045em",
  },
  {
    label: "H1 / 5xl",
    cls: "font-display text-5xl leading-[1.05] tracking-tight",
    meta: "48 / -2%",
    specs: "Font: Fraunces | Size: 48px (3rem) | Line-height: 1.02 | Tracking: -0.038em",
  },
  {
    label: "H2 / 3xl",
    cls: "font-display text-3xl leading-snug",
    meta: "30 / -1%",
    specs: "Font: Fraunces | Size: 30px (1.875rem) | Line-height: 1.3 | Tracking: -0.03em",
  },
  {
    label: "H3 / xl",
    cls: "font-display text-xl leading-snug",
    meta: "20",
    specs: "Font: Fraunces | Size: 20px (1.25rem) | Line-height: 1.3",
  },
  {
    label: "Body / base",
    cls: "text-base leading-relaxed",
    meta: "16 / 1.6",
    specs: "Font: Inter | Size: 16px (1rem) | Line-height: 1.6",
  },
  {
    label: "Small / sm",
    cls: "text-sm leading-relaxed text-muted-foreground",
    meta: "14",
    specs: "Font: Inter | Size: 14px (0.875rem) | Line-height: 1.5",
  },
  {
    label: "Caption / xs",
    cls: "text-xs uppercase tracking-[0.2em] text-muted-foreground",
    meta: "12 / 200%",
    specs: "Font: Inter | Size: 12px (0.75rem) | Line-height: 2.0 | Tracking: 0.2em",
  },
];

/* ---------------- Spacing ---------------- */

const spacing = [1, 2, 3, 4, 6, 8, 12, 16, 24];

/* ---------------- Shadows ---------------- */

const shadows = [
  { name: "Soft", varName: "--shadow-soft", use: "Resting cards" },
  { name: "Float", varName: "--shadow-float", use: "Interactive elements" },
  { name: "Premium", varName: "--shadow-premium", use: "Elevated surfaces" },
];

/* ---------------- Radius ---------------- */

const radii = [
  { name: "sm", cls: "rounded-sm", px: "4px" },
  { name: "md", cls: "rounded-md", px: "6px" },
  { name: "lg", cls: "rounded-lg", px: "8px" },
  { name: "xl", cls: "rounded-xl", px: "12px" },
  { name: "2xl", cls: "rounded-2xl", px: "16px" },
  { name: "3xl", cls: "rounded-3xl", px: "20px" },
  { name: "full", cls: "rounded-full", px: "∞" },
];

/* ---------------- Icons ---------------- */

const iconSet = [
  { name: "Home", C: Home },
  { name: "Layers", C: Layers },
  { name: "Workflow", C: Workflow },
  { name: "Palette", C: Palette },
  { name: "Sparkles", C: Sparkles },
  { name: "User", C: User },
  { name: "Mail", C: Mail },
  { name: "Arrow", C: ArrowUpRight },
];

/* ---------------- Page ---------------- */

function DesignSystem() {
  const [showGrid, setShowGrid] = useState(false);

  return (
    <PageShell
      eyebrow="Foundations · v1.0"
      title="Design system."
      description="The primitives — color, type, spacing, elevation — that keep every surface coherent. Built on an 8-pixel grid, tuned for WCAG-friendly contrast."
    >
      {/* 8px Spacing Grid Toggle */}
      <div className="mb-6 flex justify-end">
        <button
          onClick={() => setShowGrid(!showGrid)}
          className={cn(
            "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition-all hover:-translate-y-0.5 cursor-pointer shadow-[var(--shadow-soft)]",
            showGrid
              ? "bg-accent border-accent-soft text-accent-foreground"
              : "bg-surface border-border text-foreground hover:bg-secondary"
          )}
        >
          <Sparkles className="h-3.5 w-3.5" />
          {showGrid ? "Hide Grid Overlay" : "Show 8px Grid Overlay"}
        </button>
      </div>

      {showGrid && (
        <div
          className="pointer-events-none fixed inset-0 z-40 bg-[linear-gradient(to_bottom,rgba(196,80,45,0.06)_1px,transparent_1px)] bg-[size:100%_8px]"
          style={{ mixBlendMode: "multiply" }}
        />
      )}

      {/* Table of contents */}
      <nav
        aria-label="Design system sections"
        className="mb-14 flex flex-wrap gap-2"
      >
        {[
          ["color", "Color"],
          ["type", "Typography"],
          ["spacing", "Spacing"],
          ["buttons", "Buttons"],
          ["inputs", "Inputs"],
          ["cards", "Cards"],
          ["badges", "Badges"],
          ["icons", "Icons"],
          ["grid", "Grid"],
          ["shadows", "Shadows"],
          ["radius", "Radius"],
        ].map(([id, label]) => (
          <a
            key={id}
            href={`#${id}`}
            className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/30 hover:bg-secondary hover:text-foreground"
          >
            {label}
          </a>
        ))}
      </nav>

      {/* 01 · Color */}
      <Section
        id="color"
        index="01"
        label="Color"
        title="A quiet, warm neutral palette"
        description="Off-white surfaces, deep charcoal ink, and a single terracotta accent tuned to pass AA contrast when used for text."
      >
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {colorTokens.map((t) => (
            <ColorSwatch key={t.varName} token={t} />
          ))}
        </div>
      </Section>

      {/* 02 · Typography */}
      <Section
        id="type"
        index="02"
        label="Typography"
        title="Fraunces for voice, Inter for clarity"
        description="A serif display paired with a neutral sans. Sizes ladder in a modular scale; line-heights loosen as size grows."
      >
        <div
          className="divide-y divide-border/70 overflow-hidden rounded-2xl border border-border bg-surface"
          style={{ boxShadow: "var(--shadow-soft)" }}
        >
          {typeScale.map((t) => (
            <div
              key={t.label}
              className="group relative flex flex-col gap-2 p-6 md:flex-row md:items-baseline md:justify-between md:gap-8 md:p-8 hover:bg-secondary/40 transition-colors cursor-help"
            >
              <div className={`${t.cls} text-foreground`}>The quiet detail</div>
              <div className="flex shrink-0 items-center gap-4 text-xs text-muted-foreground md:min-w-[180px] md:justify-end">
                <span className="uppercase tracking-[0.18em]">{t.label}</span>
                <span>{t.meta}</span>
              </div>
              <div className="pointer-events-none absolute bottom-full left-6 z-30 mb-2 hidden rounded-lg border border-border bg-surface px-3 py-2 text-[10px] font-medium tracking-wide text-foreground shadow-[var(--shadow-float)] group-hover:block backdrop-blur-md">
                {t.specs}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 03 · Spacing */}
      <Section
        id="spacing"
        index="03"
        label="Spacing"
        title="An 8-pixel rhythm"
        description="Every gap, padding, and offset is a multiple of 4 (mostly 8). Consistent rhythm reduces visual noise."
      >
        <div
          className="rounded-2xl border border-border bg-surface p-6 md:p-8"
          style={{ boxShadow: "var(--shadow-soft)" }}
        >
          <div className="space-y-3">
            {spacing.map((n) => (
              <div key={n} className="flex items-center gap-4">
                <div className="w-16 shrink-0 text-xs uppercase tracking-widest text-muted-foreground">
                  {n * 4}px
                </div>
                <div
                  className="h-2 rounded-full bg-primary/85 transition-all"
                  style={{ width: `${n * 4 * 2}px` }}
                />
                <div className="text-xs text-muted-foreground">space-{n}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 04 · Buttons */}
      <Section
        id="buttons"
        index="04"
        label="Buttons"
        title="Actions with intent"
        description="Three variants — primary, secondary, ghost — with clear hover, focus, and disabled states."
      >
        <div
          className="rounded-2xl border border-border bg-surface p-8"
          style={{ boxShadow: "var(--shadow-soft)" }}
        >
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-premium)]"
              style={{ boxShadow: "var(--shadow-float)" }}
            >
              Primary action
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-3 text-sm font-medium text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-secondary hover:shadow-[var(--shadow-float)]"
            >
              Secondary
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              Ghost
            </button>
            <button
              type="button"
              aria-label="Sparkles"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-secondary hover:shadow-[var(--shadow-float)]"
            >
              <Sparkles className="h-4 w-4" />
            </button>
            <button
              type="button"
              disabled
              className="inline-flex items-center gap-2 rounded-full bg-primary/40 px-5 py-3 text-sm font-medium text-primary-foreground/70"
            >
              Disabled
            </button>
          </div>
        </div>
      </Section>

      {/* 05 · Inputs */}
      <Section
        id="inputs"
        index="05"
        label="Inputs"
        title="Form primitives"
        description="Rounded controls with clear labels, hover, and focus-visible rings that meet contrast requirements."
      >
        <div
          className="grid grid-cols-1 gap-6 rounded-2xl border border-border bg-surface p-8 md:grid-cols-2"
          style={{ boxShadow: "var(--shadow-soft)" }}
        >
          <div>
            <label htmlFor="ds-name" className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">
              Name
            </label>
            <input
              id="ds-name"
              type="text"
              placeholder="Ada Lovelace"
              className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 transition-colors hover:border-foreground/30"
            />
          </div>
          <div>
            <label htmlFor="ds-search" className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">
              Search
            </label>
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <input
                id="ds-search"
                type="search"
                placeholder="Type to search…"
                className="w-full rounded-xl border border-input bg-background py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground/70 transition-colors hover:border-foreground/30"
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <label htmlFor="ds-msg" className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">
              Message
            </label>
            <textarea
              id="ds-msg"
              rows={3}
              placeholder="Tell me about the project…"
              className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 transition-colors hover:border-foreground/30"
            />
          </div>
        </div>
      </Section>

      {/* 06 · Cards */}
      <Section
        id="cards"
        index="06"
        label="Cards"
        title="Surfaces with soft elevation"
        description="Three densities — flat, floating, and premium — sharing the same radius, border, and hover behavior."
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {[
            { label: "Flat", shadow: "var(--shadow-soft)" },
            { label: "Floating", shadow: "var(--shadow-float)" },
            { label: "Premium", shadow: "var(--shadow-premium)" },
          ].map((c) => (
            <div
              key={c.label}
              className="group rounded-2xl border border-border/70 bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-premium)]"
              style={{ boxShadow: c.shadow }}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {c.label}
                </span>
                <Circle className="h-2 w-2 fill-accent text-accent" />
              </div>
              <div className="mt-8 font-display text-2xl text-foreground">
                Considered card
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                A calm container for content, actions, and metadata.
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* 07 · Badges */}
      <Section
        id="badges"
        index="07"
        label="Badges"
        title="Compact labels & statuses"
      >
        <div
          className="flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-surface p-8"
          style={{ boxShadow: "var(--shadow-soft)" }}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-foreground">
            Default
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
            Primary
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
            <Sparkles className="h-3 w-3" /> Accent
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-surface px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Available
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-foreground">
            <Check className="h-3 w-3 text-accent" /> Shipped
          </span>
        </div>
      </Section>

      {/* 08 · Icons */}
      <Section
        id="icons"
        index="08"
        label="Icons"
        title="Lucide, 1.75 stroke, 18px"
        description="One family, one weight. Rendered on a consistent grid to keep visual density even across the app."
      >
        <div
          className="grid grid-cols-2 gap-3 rounded-2xl border border-border bg-surface p-6 sm:grid-cols-4 md:grid-cols-8"
          style={{ boxShadow: "var(--shadow-soft)" }}
        >
          {iconSet.map(({ name, C }) => (
            <div
              key={name}
              className="flex flex-col items-center gap-2 rounded-xl border border-border/60 bg-background p-4 text-muted-foreground transition-colors hover:text-foreground"
            >
              <C className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
              <span className="text-[10px] uppercase tracking-widest">{name}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* 09 · Grid */}
      <Section
        id="grid"
        index="09"
        label="Grid"
        title="12 columns, 8px gutters"
        description="A responsive grid that collapses gracefully from desktop to mobile."
      >
        <div
          className="overflow-hidden rounded-2xl border border-border bg-surface p-4"
          style={{ boxShadow: "var(--shadow-soft)" }}
        >
          <div className="grid grid-cols-12 gap-2">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="flex h-16 items-center justify-center rounded-md bg-secondary text-[10px] font-medium uppercase tracking-widest text-muted-foreground"
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 10 · Shadows */}
      <Section
        id="shadows"
        index="10"
        label="Shadows"
        title="Three levels of elevation"
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {shadows.map((s) => (
            <div
              key={s.name}
              className="rounded-2xl border border-border/70 bg-surface p-8"
              style={{ boxShadow: `var(${s.varName})` }}
            >
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {s.name}
              </div>
              <div className="mt-4 font-display text-2xl text-foreground">
                {s.varName}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{s.use}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 11 · Radius */}
      <Section
        id="radius"
        index="11"
        label="Radius"
        title="Softness on a curve"
      >
        <div
          className="grid grid-cols-2 gap-4 rounded-2xl border border-border bg-surface p-6 sm:grid-cols-4 md:grid-cols-7"
          style={{ boxShadow: "var(--shadow-soft)" }}
        >
          {radii.map((r) => (
            <div key={r.name} className="flex flex-col items-center gap-2">
              <div
                className={`h-16 w-16 border border-border bg-secondary ${r.cls}`}
              />
              <div className="text-xs font-medium text-foreground">{r.name}</div>
              <div className="text-[10px] text-muted-foreground">{r.px}</div>
            </div>
          ))}
        </div>
      </Section>
    </PageShell>
  );
}
