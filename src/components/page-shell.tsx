import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

export function PageShell({
  eyebrow,
  title,
  titleNode,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  /** Optional custom renderer for the h1 (e.g. SplitTextReveal). Replaces `title` visually but keep `title` as the accessible label. */
  titleNode?: ReactNode;
  description?: string;
  children?: ReactNode;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 40, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={reduced ? { opacity: 0 } : { opacity: 0, y: -60, filter: "blur(8px)" }}
      transition={{ duration: 0.7, ease: EASE }}
      className="relative mx-auto w-full max-w-6xl px-6 pb-32 pt-16 lg:pl-28 lg:pr-12 lg:pt-24"
    >
      <motion.div
        className="mb-16 max-w-3xl"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
        }}
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 8 },
            show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
          }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-border/70 bg-surface px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground"
        >
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-accent"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
          {eyebrow}
        </motion.div>
        {titleNode ? (
          <h1
            aria-label={title}
            className="text-5xl leading-[1.02] tracking-tight text-foreground md:text-6xl lg:text-7xl"
          >
            {titleNode}
          </h1>
        ) : (
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 16, filter: "blur(8px)" },
              show: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: { duration: 0.7, ease: EASE },
              },
            }}
            className="text-5xl leading-[1.02] tracking-tight text-foreground md:text-6xl lg:text-7xl"
          >
            {title}
          </motion.h1>
        )}
        {description && (
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 12 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
            }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground"
          >
            {description}
          </motion.p>
        )}
      </motion.div>
      {children}
    </motion.div>
  );
}


export function PlaceholderCard({
  label,
  aspect = "aspect-[4/3]",
}: {
  label?: string;
  aspect?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={`group relative overflow-hidden rounded-2xl border border-border/70 bg-surface ${aspect}`}
      style={{ boxShadow: "var(--shadow-soft)" }}
      whileHover={
        reduced
          ? undefined
          : { y: -6, boxShadow: "var(--shadow-premium)" }
      }
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
    >
      <div
        className="absolute inset-0 grid-bg opacity-60 transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] group-hover:opacity-100"
      />
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 40%, oklch(0.68 0.14 45 / 0.10), transparent 70%)",
        }}
      />
      {/* Corner mark */}
      <div className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center">
        <motion.span
          className="h-1.5 w-1.5 rounded-full bg-accent/70"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <div className="absolute inset-0 flex items-end p-5">
        <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
          {label ?? "Placeholder"}
        </span>
      </div>
    </motion.div>
  );
}

