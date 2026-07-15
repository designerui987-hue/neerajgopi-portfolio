import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageShell, PlaceholderCard } from "@/components/page-shell";
import { Stagger, staggerItem } from "@/components/reveal";

export const Route = createFileRoute("/playground")({
  head: () => ({
    meta: [
      { title: "Playground — Gopi Neeraj Kumar" },
      {
        name: "description",
        content:
          "Experiments, motion studies, and side quests — a sandbox of interface ideas that don't fit anywhere else.",
      },
      { property: "og:title", content: "Playground — Gopi Neeraj Kumar" },
      {
        property: "og:description",
        content:
          "Experiments, motion studies, and side quests — a sandbox of interface ideas that don't fit anywhere else.",
      },
    ],
  }),
  component: Playground,
});

type Study = {
  n: string;
  title: string;
  tag: "Motion" | "Type" | "Layout" | "Generative" | "Tool";
  aspect: string;
  span?: string;
};

const studies: Study[] = [
  { n: "01", title: "Elastic reveal", tag: "Motion", aspect: "aspect-[16/10]", span: "md:col-span-2 md:row-span-2" },
  { n: "02", title: "Serif variable", tag: "Type", aspect: "aspect-square" },
  { n: "03", title: "Chromatic grid", tag: "Generative", aspect: "aspect-square" },
  { n: "04", title: "Timeline scrub", tag: "Motion", aspect: "aspect-[3/4]" },
  { n: "05", title: "Editorial split", tag: "Layout", aspect: "aspect-[3/4]" },
  { n: "06", title: "Color extractor", tag: "Tool", aspect: "aspect-[16/10]", span: "md:col-span-2" },
  { n: "07", title: "Typographic mark", tag: "Type", aspect: "aspect-square" },
  { n: "08", title: "Soft parallax", tag: "Motion", aspect: "aspect-square" },
];

function Playground() {
  return (
    <PageShell
      eyebrow="Experiments · Ongoing"
      title="Playground."
      description="A quiet sandbox for motion studies, generative bits, and design tools. Not everything ships — some things just have to exist."
    >
      {/* Tag filter (visual only) */}
      <div className="mb-10 flex flex-wrap gap-2">
        {["All", "Motion", "Type", "Layout", "Generative", "Tool"].map((t, i) => (
          <span
            key={t}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all duration-200 ${
              i === 0
                ? "border-foreground/20 bg-primary text-primary-foreground"
                : "border-border bg-surface text-muted-foreground"
            }`}
          >
            {t}
          </span>
        ))}
      </div>

      <Stagger
        className="grid grid-cols-2 gap-4 md:grid-cols-4 md:auto-rows-[minmax(0,1fr)]"
        stagger={0.05}
      >
        {studies.map((s) => (
          <motion.div key={s.n} variants={staggerItem} className={s.span}>
            <div className="relative h-full">
              <PlaceholderCard label={`${s.n} · ${s.title}`} aspect={s.aspect} />
              <span className="pointer-events-none absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-surface/80 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground backdrop-blur">
                <span className="h-1 w-1 rounded-full bg-accent" />
                {s.tag}
              </span>
            </div>
          </motion.div>
        ))}
      </Stagger>

      {/* Empty state / footnote */}
      <div className="mt-16 flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border/70 bg-surface/50 p-12 text-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-accent"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <p className="max-w-sm text-sm text-muted-foreground">
          More experiments in the oven. New studies land every couple of weeks —
          usually on quiet Sunday mornings.
        </p>
      </div>
    </PageShell>
  );
}
