import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { BookOpen, PencilRuler, MessageSquare, Repeat } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Stagger, staggerItem, Reveal } from "@/components/reveal";

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: "How I Work — Gopi Neeraj Kumar" },
      {
        name: "description",
        content:
          "How I actually approach a design project as a junior UI/UX designer — understand, sketch, feedback, refine.",
      },
      { property: "og:title", content: "How I Work — Gopi Neeraj Kumar" },
      {
        property: "og:description",
        content:
          "How I actually approach a design project as a junior UI/UX designer — understand, sketch, feedback, refine.",
      },
    ],
  }),
  component: Process,
});

const steps = [
  {
    n: "01",
    t: "Understand the brief",
    Icon: BookOpen,
    d: "I re-read the brief, write the problem back in one sentence, and list what I don't know yet. If I can, I talk to whoever wrote it, or to one or two people who'd actually use the thing. Nothing polished — just notes in FigJam or a Notion doc.",
    outputs: ["Problem in one sentence", "Open questions", "3–5 short user notes"],
  },
  {
    n: "02",
    t: "Sketch cheap and often",
    Icon: PencilRuler,
    d: "Before Figma, I sketch on paper or in FigJam — two or three rough directions, ugly on purpose. It stops me from falling in love with the first idea and makes it easier to throw things away.",
    outputs: ["Paper sketches", "Rough user flows", "Low-fi wireframes"],
  },
  {
    n: "03",
    t: "Show it early, on purpose",
    Icon: MessageSquare,
    d: "I share work while it's still rough — with mentors, classmates, and (whenever I can) real users. I try to ask specific questions instead of \"what do you think?\", and I take notes I'll actually re-read the next day.",
    outputs: ["Mentor / peer review", "Small user checks", "Written feedback log"],
  },
  {
    n: "04",
    t: "Refine in small loops",
    Icon: Repeat,
    d: "Then I move into Figma properly — components, states, responsive checks. I iterate in small, defensible steps, keep a short changelog, and try to write down why I made each decision, not just what I changed.",
    outputs: ["Hi-fi screens", "Component variants", "Design decisions log"],
  },
];

const principles = [
  ["Ship something small, weekly", "Even a rough Figma frame is a decision I can defend or throw away."],
  ["Feedback beats opinion — including mine", "If I can't explain why, it's an opinion. Time to ask someone."],
  ["Reuse before you invent", "First check the kit. If a pattern exists, use it. If not, note why."],
  ["Write it down", "Short notes on decisions save future-me a lot of second-guessing."],
];

function Process() {
  return (
    <PageShell
      eyebrow="How I work"
      title="A junior designer's honest loop."
      description="I'm early in my career, so my process is deliberately simple: understand the brief, sketch cheaply, get feedback from mentors and users, refine in small steps. Below is how that actually plays out on a project."
    >
      {/* Steps */}
      <Stagger className="grid grid-cols-1 gap-5 md:grid-cols-2" stagger={0.08}>
        {steps.map((s) => (
          <motion.article
            key={s.n}
            variants={staggerItem}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="group relative overflow-hidden rounded-3xl border border-border/70 bg-surface p-8 md:p-10"
            style={{ boxShadow: "var(--shadow-soft)" }}
          >
            <div className="flex items-start justify-between">
              <div className="font-display text-sm text-accent">{s.n}</div>
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-background text-muted-foreground transition-colors group-hover:text-foreground">
                <s.Icon className="h-4 w-4" strokeWidth={1.75} />
              </div>
            </div>
            <h2 className="mt-5 font-display text-3xl text-foreground">{s.t}</h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              {s.d}
            </p>
            <div className="mt-6 border-t border-border/60 pt-5">
              <div className="mb-3 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                What I usually end up with
              </div>
              <ul className="flex flex-wrap gap-2">
                {s.outputs.map((o) => (
                  <li
                    key={o}
                    className="rounded-full border border-border/70 bg-background px-3 py-1 text-xs text-foreground"
                  >
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>
        ))}
      </Stagger>

      {/* Principles */}
      <Reveal className="mt-24">
        <div className="mb-8 flex items-baseline gap-4 border-b border-border/60 pb-4">
          <span className="font-display text-sm text-accent">05</span>
          <span className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
            Working notes
          </span>
        </div>
        <h2 className="max-w-2xl font-display text-3xl leading-tight text-foreground md:text-4xl">
          Small rules I try to actually follow.
        </h2>
        <Stagger className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2" stagger={0.06}>
          {principles.map(([t, d]) => (
            <motion.div
              key={t}
              variants={staggerItem}
              className="bg-surface p-8 md:p-10"
            >
              <div className="font-display text-xl text-foreground">{t}</div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {d}
              </p>
            </motion.div>
          ))}
        </Stagger>
      </Reveal>

      {/* Quote */}
      <Reveal className="mt-24">
        <blockquote className="max-w-3xl border-l-2 border-accent pl-6 font-display text-2xl leading-snug text-foreground md:text-3xl">
          "I'm not trying to be clever yet — I'm trying to be honest about the
          problem and clear on the page."
        </blockquote>
      </Reveal>
    </PageShell>
  );
}
