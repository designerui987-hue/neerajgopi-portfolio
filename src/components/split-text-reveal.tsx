import { motion, useReducedMotion, type Variants } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export function SplitTextReveal({
  text,
  className,
  delay = 0,
  stagger = 0.028,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "span" | "h1" | "h2";
}) {
  const reduced = useReducedMotion();

  const words = text.split(/(\s+)/); // keep whitespace tokens
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduced ? 0 : stagger, delayChildren: reduced ? 0 : delay } },
  };
  const child: Variants = {
    hidden: {
      y: reduced ? "0%" : "110%",
      opacity: reduced ? 1 : 0,
      filter: reduced ? "blur(0px)" : "blur(6px)"
    },
    show: {
      y: "0%",
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: reduced ? 0 : 0.85, ease: EASE },
    },
  };

  const MotionTag = (motion as any)[Tag];

  return (
    <MotionTag
      className={className}
      initial="hidden"
      animate="show"
      variants={container}
      aria-label={text}
    >
      {words.map((token, wi) => {
        if (/^\s+$/.test(token)) {
          return (
            <span key={`s-${wi}`} aria-hidden="true">
              {"\u00A0"}
            </span>
          );
        }
        const chars = Array.from(token);
        return (
          <span
            key={`w-${wi}`}
            aria-hidden="true"
            className="inline-block whitespace-nowrap align-baseline"
            style={{ overflow: "hidden", paddingBottom: "0.12em", marginBottom: "-0.12em" }}
          >
            {chars.map((ch, ci) => (
              <motion.span
                key={`c-${wi}-${ci}`}
                variants={child}
                className="inline-block will-change-transform"
              >
                {ch}
              </motion.span>
            ))}
          </span>
        );
      })}
    </MotionTag>
  );
}
