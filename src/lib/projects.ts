export type Project = {
  slug: string;
  title: string;
  category: "SaaS Dashboard" | "Landing Page" | "Mobile App" | "UI Exploration";
  description: string;
  role: string;
  tools: string[];
  year: string;
  cover: string;
  problem: string;
  constraints: string[];
  decisions: { title: string; detail: string }[];
  outcomes: string[];
  learnings: string[];
};

export const projects: Project[] = [
  {
    slug: "hrms",
    title: "HRMS — Core module design and team collaboration",
    category: "SaaS Dashboard",
    description:
      "Designed core modules for an internal HRMS product used by an internal company team. Covered leave requests and approvals, attendance tracking, employee pre-onboarding flows, and payroll views.",
    role: "UI/UX Designer (team project)",
    tools: ["Figma", "Lovable"],
    year: "2025 – 2026",
    cover: "HRMS Dashboard",
    problem:
      "The company's internal HR processes (leaves, attendance, onboarding, and payroll) were scattered across separate third-party tools, spreadsheets, and manual emails. This caused high friction for employees and significant administrative overhead for HR managers.",
    constraints: [
      "Collaborating with developers and stakeholders as part of a team, requiring direct handoffs and feedback loops rather than solo work",
      "Translating complex multi-step HR business logic into clear, usable interface flows for both desktop and mobile views",
      "Working with a rapid turnaround timeline to transition from initial wireframes to high-fidelity functional prototypes using AI-assisted tooling (Lovable)"
    ],
    decisions: [
      {
        title: "Leaves Module: Calendar-first requesting",
        detail:
          "Designed a clean, visual leave request dashboard that centers around a team calendar, allowing employees to see who is out before requesting, and managers to approve requests directly from their daily schedule."
      },
      {
        title: "Attendance Module: Simplified daily check-ins",
        detail:
          "Created a low-friction clock-in/out widget for the main dashboard, reducing the tracking process to a single tap, while providing detailed visual logs for monthly verification."
      },
      {
        title: "Pre-onboarding Flow: Step-by-step checklist",
        detail:
          "Replaced long, intimidating PDF forms with a step-by-step pre-onboarding wizard for new hires, allowing them to upload documents and complete tasks at their own pace before their first day."
      },
      {
        title: "Payroll Views: Clean salary breakdown",
        detail:
          "Designed a secure and clear salary breakdown layout, transforming complex tax and deduction lists into clean, readable cards with downloadable payslips."
      }
    ],
    outcomes: [
      "Successfully designed and shipped all 4 core modules (Leaves, Attendance, Pre-onboarding, Payroll) to staging and production environments",
      "Significantly reduced new hire onboarding time by migrating from manual PDF forms to the digital checklist flow",
      "Established a unified design-to-code workflow that allowed the engineering team to reference Figma components directly in their React code"
    ],
    learnings: [
      "Collaborated with developers and stakeholders as part of a team (not solo work) to align on scope and technical feasibility",
      "Used AI-assisted tools (Lovable) to go from design to working prototypes faster",
      "Prompted AI tools effectively to iterate on UI layouts, states, and copy variations faster",
      "Translated complex HR business logic into clear, usable interface flows that reduce user cognitive load"
    ]
  },
  {
    slug: "prism-explorations",
    title: "Prism — Weekly UI explorations",
    category: "UI Exploration",
    description:
      "An ongoing set of small weekly studies — components, transitions, and layout experiments — used mostly to learn and get feedback.",
    role: "Designer",
    tools: ["Figma", "Framer"],
    year: "2024 – 2026",
    cover: "Prism Studies",
    problem:
      "As a junior designer, I don't get enough shipped projects to grow quickly. I needed a low-stakes way to practice specific skills (motion, forms, data density) and get feedback on them regularly.",
    constraints: [
      "One small study per week, timeboxed to a few hours",
      "Has to work as a screenshot for social feedback, not a full case study",
      "No client, no brief — I set my own tiny problem each time"
    ],
    decisions: [
      {
        title: "Timebox over polish",
        detail:
          "Each study is capped at a few hours. If it isn't done, it ships rough — the point is the reps, not the pixels."
      },
      {
        title: "Pick one skill per week",
        detail:
          "Each study focuses on a single thing — a form pattern, an empty state, a motion detail — so feedback stays specific."
      },
      {
        title: "Post + write two sentences",
        detail:
          "I try to always share the study with two sentences of intent, so people can react to the idea, not just the visuals."
      }
    ],
    outcomes: [
      "Roughly 20+ small studies published, several reused directly in client and coursework projects",
      "Consistently getting more specific, actionable feedback than on 'finished' work",
      "Slowly built a personal component kit from the reusable parts"
    ],
    learnings: [
      "Small, frequent work beat occasional 'big' portfolio pieces for learning speed.",
      "Writing intent alongside the visual made feedback 10x more useful.",
      "Not every study needs to be good — most of the value is in the ones I threw away."
    ]
  }
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
