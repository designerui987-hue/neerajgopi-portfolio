import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, FileDown, Linkedin } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Reveal } from "@/components/reveal";

const LINKEDIN_URL = "https://www.linkedin.com/in/neeraj-kumar-gopi-b09391331";
const RESUME_URL = "/resume.pdf";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Gopi Neeraj Kumar" },
      {
        name: "description",
        content:
          "Get in touch with Gopi Neeraj Kumar — available now for junior UI/UX roles, internships, and small freelance briefs.",
      },
      { property: "og:title", content: "Contact — Gopi Neeraj Kumar" },
      {
        property: "og:description",
        content:
          "Get in touch with Gopi Neeraj Kumar — available now for junior UI/UX roles, internships, and small freelance briefs.",
      },
    ],
  }),
  component: Contact,
});

const scopes = ["Junior role", "Internship", "Freelance brief", "Just saying hi"];

function Contact() {
  return (
    <PageShell
      eyebrow="Get in touch"
      title="Let's talk."
      description="I'm available now for junior UI/UX roles, internships, and small freelance briefs. Drop a note below or reach me on LinkedIn."
    >
      <div className="grid grid-cols-1 gap-10 md:grid-cols-5">
        {/* Form */}
        <Reveal className="md:col-span-3">
          <form
            className="overflow-hidden rounded-3xl border border-border bg-surface"
            style={{ boxShadow: "var(--shadow-premium)" }}
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid grid-cols-1 gap-6 p-8 md:grid-cols-2 md:p-10">
              <div>
                <label
                  htmlFor="c-name"
                  className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
                >
                  Name
                </label>
                <input
                  id="c-name"
                  type="text"
                  placeholder="Your name"
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors hover:border-foreground/30"
                />
              </div>
              <div>
                <label
                  htmlFor="c-email"
                  className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
                >
                  Email
                </label>
                <input
                  id="c-email"
                  type="email"
                  placeholder="you@company.com"
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors hover:border-foreground/30"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  What's this about?
                </label>
                <div className="flex flex-wrap gap-2">
                  {scopes.map((s) => (
                    <label
                      key={s}
                      className="cursor-pointer rounded-full border border-border bg-background px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-foreground/30 hover:text-foreground has-[:checked]:border-foreground/30 has-[:checked]:bg-primary has-[:checked]:text-primary-foreground"
                    >
                      <input type="radio" name="scope" className="sr-only" />
                      {s}
                    </label>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="c-msg"
                  className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
                >
                  Message
                </label>
                <textarea
                  id="c-msg"
                  rows={5}
                  placeholder="A few sentences about what you're working on and how I can help."
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground transition-colors hover:border-foreground/30"
                />
              </div>
            </div>

            <div className="flex flex-col-reverse items-stretch justify-between gap-4 border-t border-border bg-surface-elevated p-6 md:flex-row md:items-center md:p-8">
              <span className="text-xs text-muted-foreground">
                I usually reply within a day or two.
              </span>
              <button
                type="submit"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-premium)]"
                style={{ boxShadow: "var(--shadow-float)" }}
              >
                Send message
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </form>
        </Reveal>

        {/* Sidebar */}
        <Reveal className="md:col-span-2">
          <div className="space-y-4">
            <div
              className="rounded-3xl border border-border bg-surface p-6"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                Availability
              </div>
              <div className="mt-3 font-display text-2xl text-foreground">
                Available now
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Open to junior UI/UX roles, internships, and small freelance briefs.
              </p>
            </div>

            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-3xl border border-border bg-surface p-5 transition-colors hover:bg-secondary/60"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <div className="flex items-center gap-3">
                <Linkedin className="h-5 w-5 text-muted-foreground" strokeWidth={1.75} />
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    LinkedIn
                  </span>
                  <span className="mt-1 font-display text-lg text-foreground">
                    /in/neeraj-kumar-gopi
                  </span>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
            </a>

            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-3xl border border-border bg-surface p-5 transition-colors hover:bg-secondary/60"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <div className="flex items-center gap-3">
                <FileDown className="h-5 w-5 text-muted-foreground" strokeWidth={1.75} />
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    Resume
                  </span>
                  <span className="mt-1 font-display text-lg text-foreground">
                    Download PDF
                  </span>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
            </a>
          </div>
        </Reveal>
      </div>
    </PageShell>
  );
}
