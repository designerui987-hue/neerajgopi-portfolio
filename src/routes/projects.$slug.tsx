import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { PlaceholderCard } from "@/components/page-shell";
import { Reveal, Stagger, staggerItem } from "@/components/reveal";
import { getProject, projects, type Project } from "@/lib/projects";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Case study not found — Gopi Neeraj Kumar" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const p = loaderData.project;
    return {
      meta: [
        { title: `${p.title} — Case study` },
        { name: "description", content: p.description },
        { property: "og:title", content: `${p.title} — Case study` },
        { property: "og:description", content: p.description },
      ],
    };
  },
  component: CaseStudy,
  notFoundComponent: CaseStudyNotFound,
});

const FLAGSHIP_SLUG = "hrms";

function CaseStudyNotFound() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-32 text-center lg:pl-28">
      <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">404</p>
      <h1 className="mt-4 font-display text-4xl text-foreground">
        Case study not found
      </h1>
      <p className="mt-3 text-muted-foreground">
        The project you're looking for doesn't exist yet.
      </p>
      <Link
        to="/projects"
        className="mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-3 text-sm font-medium text-foreground transition-all hover:-translate-y-0.5 hover:bg-secondary"
      >
        <ArrowLeft className="h-4 w-4" /> Back to projects
      </Link>
    </div>
  );
}

function CaseStudy() {
  const { project } = Route.useLoaderData() as { project: Project };
  const idx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(idx + 1) % projects.length];
  const isFlagship = project.slug === FLAGSHIP_SLUG;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-6xl px-6 pb-32 pt-16 lg:pl-28 lg:pr-12 lg:pt-24"
    >
      {/* Back */}
      <Link
        to="/projects"
        className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> All projects
      </Link>

      {/* Hero — flagship gets the pinned parallax treatment */}
      {isFlagship ? (
        <FlagshipHero project={project} />
      ) : (
        <LightHero project={project} />
      )}

      {/* Problem */}
      <Section index="02" label="Problem" title="What I was actually solving">
        <Prose>{project.problem}</Prose>
      </Section>

      {/* Constraints */}
      <Section index="03" label="Constraints" title="What I had to work within">
        <Stagger className="grid grid-cols-1 gap-3 md:grid-cols-2" stagger={0.05}>
          {project.constraints.map((c, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className="flex gap-4 rounded-2xl border border-border/70 bg-surface p-5"
            >
              <span className="font-display text-sm text-accent">0{i + 1}</span>
              <p className="text-sm leading-relaxed text-foreground">{c}</p>
            </motion.div>
          ))}
        </Stagger>
      </Section>

      {/* Process (key decisions) — flagship gets sticky rail; others stay lightweight */}
      {isFlagship ? (
        <FlagshipProcess project={project} />
      ) : (
        <Section index="04" label="Process" title="The choices that shaped it">
          <Stagger className="grid grid-cols-1 gap-5" stagger={0.06}>
            {project.decisions.map((d, i) => (
              <motion.article
                key={i}
                variants={staggerItem}
                className="rounded-2xl border border-border/70 bg-surface p-6 md:p-8"
                style={{ boxShadow: "var(--shadow-soft)" }}
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-sm text-accent">0{i + 1}</span>
                  <h3 className="font-display text-xl text-foreground md:text-2xl">
                    {d.title}
                  </h3>
                </div>
                <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground">
                  {d.detail}
                </p>
              </motion.article>
            ))}
          </Stagger>
        </Section>
      )}

      {/* Outcome + learnings */}
      <Section index="05" label="Outcome & learnings" title="What happened, what I'd change">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div
            className="rounded-2xl border border-border/70 bg-surface p-6 md:p-8"
            style={{ boxShadow: "var(--shadow-soft)" }}
          >
            <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Outcome
            </div>
            <ul className="mt-4 space-y-3">
              {project.outcomes.map((o, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed text-foreground">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  {o}
                </li>
              ))}
            </ul>
          </div>
          <div
            className="rounded-2xl border border-border/70 bg-surface p-6 md:p-8"
            style={{ boxShadow: "var(--shadow-soft)" }}
          >
            <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              What I learned
            </div>
            <ul className="mt-4 space-y-3">
              {project.learnings.map((l, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed text-foreground">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  {l}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Next */}
      <Reveal className="mt-24 border-t border-border pt-10">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Next case study
            </div>
            <div className="mt-2 font-display text-2xl text-foreground">
              {next.title}
            </div>
          </div>
          <Link
            to="/projects/$slug"
            params={{ slug: next.slug }}
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-premium)]"
            style={{ boxShadow: "var(--shadow-float)" }}
          >
            Continue reading
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </Reveal>
    </motion.div>
  );
}

/* ---------- hero variants ---------- */

function LightHero({ project }: { project: Project }) {
  return (
    <Section index="01" label="Case study">
      <div className="mt-4 max-w-4xl">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border/70 bg-surface px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {project.category} · {project.year}
        </div>
        <h1 className="font-display text-5xl leading-[1.02] tracking-tight text-foreground md:text-6xl lg:text-7xl">
          {project.title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {project.description}
        </p>
      </div>
      <div className="mt-12">
        <PlaceholderCard label={`${project.cover} — Hero`} aspect="aspect-[16/9]" />
      </div>
      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-4">
        <Meta k="Role" v={project.role} />
        <Meta k="Tools" v={project.tools.join(", ")} />
        <Meta k="Year" v={project.year} />
        <Meta k="Type" v={project.category} />
      </div>
    </Section>
  );
}

/**
 * Flagship hero — scroll-pinned cover with parallax scale/opacity while the
 * headline copy scrolls past it. Falls back to a static hero when reduced
 * motion is preferred.
 */
function FlagshipHero({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 1.08]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "-12%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, reduced ? 1 : 0.35]);

  return (
    <Section index="01" label="Flagship case study">
      <div ref={ref} className="relative mt-4">
        <div className="max-w-4xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-background/60 px-3 py-1 text-xs font-medium tracking-wide text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {project.category} · {project.year} · Flagship
          </div>
          <h1 className="font-display text-5xl leading-[1.02] tracking-tight text-foreground md:text-7xl lg:text-[88px]">
            {project.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {project.description}
          </p>
        </div>

        {/* Pinned cover */}
        <div className="mt-14 h-[70vh] min-h-[420px] md:h-[85vh]">
          <div className="sticky top-24 h-[60vh] min-h-[380px] md:h-[70vh]">
            <motion.div
              style={{ scale, y, opacity }}
              className="relative h-full w-full overflow-hidden rounded-3xl border border-border/70 bg-surface"
            >
              <div className="absolute inset-0 grid-bg opacity-70" />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 65% 55% at 50% 45%, oklch(0.74 0.15 45 / 0.18), transparent 72%)",
                }}
              />
              <div className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-background/60 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-accent backdrop-blur">
                <span className="h-1 w-1 rounded-full bg-accent" />
                Flagship
              </div>
              <div className="absolute inset-0 flex items-end p-8">
                <span className="font-display text-2xl text-foreground/85 md:text-3xl">
                  {project.cover}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-4">
        <Meta k="Role" v={project.role} />
        <Meta k="Tools" v={project.tools.join(", ")} />
        <Meta k="Year" v={project.year} />
        <Meta k="Type" v={project.category} />
      </div>
    </Section>
  );
}

/**
 * Flagship process — sticky index rail on the left, decisions stack on the
 * right. Preserves the exact same content as the lightweight version.
 */
function FlagshipProcess({ project }: { project: Project }) {
  return (
    <Section index="04" label="Process" title="The choices that shaped it">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
        <aside className="md:col-span-3">
          <div className="sticky top-28 rounded-2xl border border-border/70 bg-surface p-5">
            <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Decisions
            </div>
            <ol className="mt-4 space-y-3">
              {project.decisions.map((d, i) => (
                <li key={i} className="flex gap-3 text-sm text-foreground/85">
                  <span className="font-display text-accent">0{i + 1}</span>
                  <span className="leading-snug">{d.title}</span>
                </li>
              ))}
            </ol>
          </div>
        </aside>
        <div className="md:col-span-9">
          <Stagger className="grid grid-cols-1 gap-5" stagger={0.06}>
            {project.decisions.map((d, i) => (
              <motion.article
                key={i}
                variants={staggerItem}
                className="rounded-2xl border border-border/70 bg-surface p-6 md:p-8"
                style={{ boxShadow: "var(--shadow-soft)" }}
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-sm text-accent">0{i + 1}</span>
                  <h3 className="font-display text-xl text-foreground md:text-2xl">
                    {d.title}
                  </h3>
                </div>
                <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground">
                  {d.detail}
                </p>
              </motion.article>
            ))}
          </Stagger>
        </div>
      </div>
    </Section>
  );
}

/* ---------- primitives ---------- */

function Section({
  index,
  label,
  title,
  children,
}: {
  index: string;
  label: string;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal as="section" className="mt-24 md:mt-32">
      <div className="mb-8 flex items-baseline gap-4 border-b border-border/70 pb-4">
        <span className="font-display text-sm text-accent">{index}</span>
        <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
          {label}
        </span>
      </div>
      {title && (
        <h2 className="mb-8 max-w-3xl font-display text-3xl leading-tight text-foreground md:text-4xl">
          {title}
        </h2>
      )}
      {children}
    </Reveal>
  );
}

function Meta({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-2xl border border-border/70 bg-surface p-5">
      <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        {k}
      </div>
      <div className="mt-2 text-sm text-foreground">{v}</div>
    </div>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <p className="max-w-3xl text-base leading-relaxed text-foreground md:text-lg">
      {children}
    </p>
  );
}
