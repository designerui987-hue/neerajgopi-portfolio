import { createFileRoute } from "@tanstack/react-router";
import { FileDown, Linkedin } from "lucide-react";
import { PageShell, PlaceholderCard } from "@/components/page-shell";

const LINKEDIN_URL = "https://www.linkedin.com/in/neeraj-kumar-gopi-b09391331";
const RESUME_URL = "/resume.pdf";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Gopi Neeraj Kumar" },
      {
        name: "description",
        content:
          "About Gopi Neeraj Kumar — a junior UI/UX designer with one year of full-time experience designing production digital systems like HRMS.",
      },
      { property: "og:title", content: "About — Gopi Neeraj Kumar" },
      {
        property: "og:description",
        content:
          "About Gopi Neeraj Kumar — a junior UI/UX designer with one year of full-time experience designing production digital systems like HRMS.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <PageShell
      eyebrow="About"
      title="Junior UI/UX designer, learning by shipping."
      description="One year into designing digital products. I care about clarity, clean interface structures, and translating complex business requirements into simple user experiences."
    >
      <div className="grid grid-cols-1 gap-10 md:grid-cols-5">
        <div className="md:col-span-2">
          <PlaceholderCard label="Portrait" aspect="aspect-[4/5]" />
        </div>
        <div className="space-y-6 text-base leading-relaxed text-muted-foreground md:col-span-3">
          <p>
            I'm Gopi Neeraj Kumar — a UI/UX designer with one year of full-time
            experience designing live systems. I recently designed four core modules
            for a production HRMS (Human Resource Management System) as part of a
            cross-functional product team.
          </p>
          <p>
            I try to translate complex business logic into clear, usable interface flows.
            During my work on the HRMS, I designed the Leaves, Attendance, Pre-onboarding,
            and Payroll modules, ensuring that both employee-facing interfaces and admin
            dashboards remained clean, simple, and intuitive.
          </p>
          <p>
            Outside of design, I focus on building and maintaining a clean Figma component kit,
            leveraging AI-assisted design tools (Lovable) to create rapid functional prototypes,
            and keeping up with modern developer handoff processes.
          </p>

          <div className="grid grid-cols-2 gap-6 border-t border-border pt-6">
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Experience</div>
              <div className="mt-1 text-foreground">1 year · UI/UX</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Availability</div>
              <div className="mt-1 text-foreground">Available now</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Primary tools</div>
              <div className="mt-1 text-foreground">Figma, Lovable</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Also using</div>
              <div className="mt-1 text-foreground">FigJam, Notion, basic HTML/CSS</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-4">
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2.5 text-sm font-medium text-foreground transition-all hover:-translate-y-0.5 hover:bg-secondary"
            >
              <Linkedin className="h-4 w-4" strokeWidth={1.75} />
              LinkedIn
            </a>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-premium)]"
              style={{ boxShadow: "var(--shadow-float)" }}
            >
              <FileDown className="h-4 w-4" strokeWidth={1.75} />
              Download resume
            </a>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
