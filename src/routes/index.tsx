import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, Workflow, Palette, User, Mail, FileDown, Linkedin } from "lucide-react";
import { PageShell, PlaceholderCard } from "@/components/page-shell";
import { SectionHeader } from "@/components/section-header";
import { Stagger, staggerItem, Reveal } from "@/components/reveal";
import { SplitTextReveal } from "@/components/split-text-reveal";
import { HeroScene } from "@/components/hero-scene";
import { StatsScrollReveal } from "@/components/stats-scroll-reveal";
import { Magnetic } from "@/components/magnetic";
import { projects } from "@/lib/projects";

const LINKEDIN_URL = "https://www.linkedin.com/in/neeraj-kumar-gopi-b09391331";
const RESUME_URL = "/resume.pdf";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gopi Neeraj Kumar — UI/UX Designer" },
      {
        name: "description",
        content:
          "Junior UI/UX designer with 1 year of experience — building calm, considered interfaces and learning in public. Currently available for new work.",
      },
      { property: "og:title", content: "Gopi Neeraj Kumar — UI/UX Designer" },
      {
        property: "og:description",
        content:
          "Junior UI/UX designer with 1 year of experience — building calm, considered interfaces and learning in public. Currently available for new work.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = projects.slice(0, 3);

  return (
    <HeroScene>
    <PageShell
      eyebrow="Portfolio · 2026"
      title="Hi, I'm Gopi — a UI/UX designer learning by shipping."
      titleNode={
        <SplitTextReveal
          text="Hi, I'm Gopi — a UI/UX designer learning by shipping."
          className="block"
        />
      }
      description="One year into designing digital products. I focus on clarity, honest research, and interfaces that get out of the way. Currently open to junior design roles, internships, and freelance briefs."
    >
      {/* Single primary CTA */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-wrap items-center gap-3"
      >
        <Magnetic strength={0.4}>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-premium)]"
            style={{ boxShadow: "var(--shadow-float)" }}
          >
            Let's talk
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </Magnetic>
        <Magnetic strength={0.25}>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <Linkedin className="h-4 w-4" strokeWidth={1.75} />
            LinkedIn
          </a>
        </Magnetic>
      </motion.div>

      {/* Honest early-career stats */}
      <StatsScrollReveal className="mt-20 grid grid-cols-2 gap-8 border-t border-border pt-10 md:grid-cols-4">
        {[
          ["1 yr", "designing full-time"],
          ["1", "major product shipped (HRMS)"],
          ["4", "modules designed end-to-end"],
          ["Figma + Lovable", "primary toolset"],
        ].map(([k, v]) => (
          <div key={v} data-stat>
            <div className="font-display text-3xl text-foreground md:text-4xl">
              {k}
            </div>
            <div className="mt-1 text-sm text-muted-foreground">{v}</div>
          </div>
        ))}
      </StatsScrollReveal>


      {/* 02 · Featured work */}
      <div className="mt-32">
        <SectionHeader
          index="02"
          eyebrow="Selected work"
          title="A small, honest portfolio."
          description="Case studies detailing my work on production systems and learning in public. Each one is written up around the problem, constraints, and what I learned."
          linkTo="/projects"
          linkLabel="All projects"
        />
        <Stagger className="grid grid-cols-1 gap-6 md:grid-cols-6" stagger={0.09}>
          {featured.map((p, i) => (
            <motion.article
              key={p.slug}
              variants={staggerItem}
              className={`group relative overflow-hidden rounded-3xl border border-border/70 bg-surface transition-shadow duration-500 hover:shadow-[var(--shadow-premium)] ${
                i === 0 ? "md:col-span-4" : "md:col-span-2"
              }`}
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <Link
                to="/projects/$slug"
                params={{ slug: p.slug }}
                className="block"
              >
                <div className="relative aspect-[16/10] overflow-hidden border-b border-border/70">
                  <div className="absolute inset-0 grid-bg opacity-60 transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] group-hover:opacity-100" />
                  <div
                    className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(ellipse 60% 50% at 50% 40%, oklch(0.68 0.14 45 / 0.10), transparent 70%)",
                    }}
                  />
                  <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-border/70 bg-surface/80 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground backdrop-blur">
                    <span className="h-1 w-1 rounded-full bg-accent" />
                    {p.category}
                  </div>
                  <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                    <span className="font-display text-lg text-foreground/70">
                      {p.cover}
                    </span>
                    <span className="text-xs text-muted-foreground">{p.year}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-4 p-6 md:p-7">
                  <h3 className="font-display text-xl leading-snug text-foreground md:text-2xl">
                    {p.title}
                  </h3>
                  <div className="flex items-center justify-between border-t border-border/60 pt-4 text-xs text-muted-foreground">
                    <span className="uppercase tracking-[0.16em]">{p.role}</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </Stagger>
      </div>

      {/* 03 · Process teaser */}
      <div className="mt-32">
        <SectionHeader
          index="03"
          eyebrow="How I work"
          title="Small loops over big leaps."
          description="A junior designer's practical loop — understand, sketch, get feedback, refine. Nothing fancy; it just keeps me honest."
          linkTo="/process"
          linkLabel="See the process"
        />
        <Stagger className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4" stagger={0.06}>
          {[
            ["01", "Understand", "Read the brief twice. Ask the boring questions."],
            ["02", "Sketch", "Cheap wireframes before pretty pixels."],
            ["03", "Feedback", "Show early. Mentors, peers, users — in that order."],
            ["04", "Refine", "Iterate in small, defensible steps."],
          ].map(([n, t, d]) => (
            <motion.div
              key={n}
              variants={staggerItem}
              className="group bg-surface p-6 transition-colors hover:bg-surface-elevated md:p-8"
            >
              <div className="font-display text-sm text-accent">{n}</div>
              <div className="mt-3 font-display text-lg text-foreground">{t}</div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {d}
              </p>
            </motion.div>
          ))}
        </Stagger>
      </div>

      {/* 04 · System teaser */}
      <div className="mt-32">
        <SectionHeader
          index="04"
          eyebrow="Design system"
          title="One small kit, every screen."
          description="Color, type, spacing, and elevation tuned together — so every surface feels part of the same conversation."
          linkTo="/design-system"
          linkLabel="Open the system"
        />
        <Stagger className="grid grid-cols-1 gap-5 md:grid-cols-3" stagger={0.08}>
          <motion.div variants={staggerItem}>
            <div
              className="rounded-2xl border border-border/70 bg-surface p-6"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                Palette
              </div>
              <div className="mt-5 grid grid-cols-5 gap-2">
                {[
                  "var(--background)",
                  "var(--secondary)",
                  "var(--muted-foreground)",
                  "var(--primary)",
                  "var(--accent)",
                ].map((c) => (
                  <div
                    key={c}
                    className="aspect-square rounded-lg border border-border/60"
                    style={{ background: c }}
                  />
                ))}
              </div>
              <div className="mt-6 text-sm text-foreground">Warm neutrals · one accent</div>
            </div>
          </motion.div>

          <motion.div variants={staggerItem}>
            <div
              className="rounded-2xl border border-border/70 bg-surface p-6"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                Typography
              </div>
              <div className="mt-5 font-display text-4xl leading-none tracking-tight text-foreground">
                Fraunces
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                Inter · 400 / 500 / 600
              </div>
              <div className="mt-6 text-sm text-foreground">Serif voice · sans clarity</div>
            </div>
          </motion.div>

          <motion.div variants={staggerItem}>
            <div
              className="rounded-2xl border border-border/70 bg-surface p-6"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                Rhythm
              </div>
              <div className="mt-5 space-y-2">
                {[16, 40, 72, 96].map((w) => (
                  <div
                    key={w}
                    className="h-1.5 rounded-full bg-primary/85"
                    style={{ width: `${w}%` }}
                  />
                ))}
              </div>
              <div className="mt-6 text-sm text-foreground">8-pixel grid · modular scale</div>
            </div>
          </motion.div>
        </Stagger>
      </div>

      {/* 05 · About teaser */}
      <div className="mt-32">
        <SectionHeader
          index="05"
          eyebrow="About"
          title="Junior designer, quietly curious."
          linkTo="/about"
          linkLabel="More about me"
        />
        <Reveal className="grid grid-cols-1 gap-8 md:grid-cols-5">
          <div className="md:col-span-2">
            <PlaceholderCard label="Portrait" aspect="aspect-[4/5]" />
          </div>
          <div className="space-y-6 md:col-span-3">
            <p className="text-lg leading-relaxed text-foreground">
              I'm one year into my UI/UX career, spent designing live digital products,
              collaborating with development teams, and optimizing interface flows.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              I recently worked on a live, complex HRMS product where I designed four core modules
              end-to-end. I focus on cross-functional collaboration and leveraging AI-assisted
              design tools to build faster, high-fidelity prototypes.
            </p>
            <div className="grid grid-cols-2 gap-6 border-t border-border pt-6">
              <div>
                <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  Primary tools
                </div>
                <div className="mt-2 font-display text-lg text-foreground">Figma · Lovable</div>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  Availability
                </div>
                <div className="mt-2 font-display text-lg text-foreground">Open to roles</div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* 06 · Contact CTA */}
      <div className="mt-32">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-3xl border border-border bg-primary p-10 text-primary-foreground md:p-16"
            style={{ boxShadow: "var(--shadow-premium)" }}
          >
            <div
              className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full opacity-40 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, oklch(0.68 0.14 45 / 0.55), transparent 70%)",
              }}
            />
            <div className="relative flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div className="max-w-xl">
                <div className="text-[11px] uppercase tracking-[0.24em] text-primary-foreground/70">
                  06 · Get in touch
                </div>
                <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">
                  Have a project in mind?
                </h2>
                <p className="mt-4 text-base leading-relaxed text-primary-foreground/80">
                  Available now for junior roles, internships, and small freelance
                  briefs. I reply within a day or two.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-accent-foreground transition-all duration-300 hover:-translate-y-0.5"
                >
                  Let's talk
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/10"
                >
                  <Linkedin className="h-4 w-4" strokeWidth={1.75} />
                  LinkedIn
                </a>
                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/10"
                >
                  <FileDown className="h-4 w-4" strokeWidth={1.75} />
                  Resume
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Explore map */}
        <Stagger className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4" stagger={0.05}>
          {[
            { to: "/process" as const, label: "Process", Icon: Workflow },
            { to: "/design-system" as const, label: "System", Icon: Palette },
            { to: "/about" as const, label: "About", Icon: User },
            { to: "/contact" as const, label: "Contact", Icon: Mail },
          ].map(({ to, label, Icon }) => (
            <motion.div key={to} variants={staggerItem}>
              <Link
                to={to}
                className="group flex items-center justify-between rounded-2xl border border-border bg-surface px-5 py-4 text-sm text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-secondary hover:text-foreground hover:shadow-[var(--shadow-float)]"
              >
                <span className="inline-flex items-center gap-3">
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                  {label}
                </span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </motion.div>
          ))}
        </Stagger>

        {/* Footer with resume + linkedin */}
        <footer className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground md:flex-row md:items-center">
          <div>
            © {new Date().getFullYear()} Gopi Neeraj Kumar · Designed &amp; built with care.
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <Linkedin className="h-3.5 w-3.5" strokeWidth={1.75} />
              LinkedIn
            </a>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <FileDown className="h-3.5 w-3.5" strokeWidth={1.75} />
              Download resume
            </a>
          </div>
        </footer>
      </div>
    </PageShell>
    </HeroScene>
  );
}
