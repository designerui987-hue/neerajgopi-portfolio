export type Project = {
  slug: string;
  title: string;
  category: "SaaS Dashboard" | "Landing Page" | "Mobile App" | "UI Exploration" | "Fintech / Dashboard";
  description: string;
  role: string;
  tools: string[];
  year: string;
  cover: string;
  coverImage?: string;
  problem: string;
  constraints: string[];
  decisions: { title: string; detail: string; image?: string; caption?: string }[];
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
    coverImage: "/images/hrms/cover.png",
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
          "Designed a clean, visual leave request dashboard that centers around a team calendar, allowing employees to see who is out before requesting, and managers to approve requests directly from their daily schedule.",
        image: "/images/hrms/leaves.png",
        caption: "The Leaves module calendar view allows team members to check availability before requesting time off."
      },
      {
        title: "Attendance Module: Simplified daily check-ins",
        detail:
          "Created a low-friction clock-in/out widget for the main dashboard, reducing the tracking process to a single tap, while providing detailed visual logs for monthly verification.",
        image: "/images/hrms/attendance.png",
        caption: "The daily attendance clock-in widget simplifies check-ins to a single tap, with active visual verification logs."
      },
      {
        title: "Pre-onboarding Flow: Step-by-step checklist",
        detail:
          "Replaced long, intimidating PDF forms with a step-by-step pre-onboarding wizard for new hires, allowing them to upload documents and complete tasks at their own pace before their first day.",
        image: "/images/hrms/preonboarding.png",
        caption: "The digital pre-onboarding checklist enables new hires to complete tasks and securely upload documentation before day one."
      },
      {
        title: "Payroll Views: Clean salary breakdown",
        detail:
          "Designed a secure and clear salary breakdown layout, transforming complex tax and deduction lists into clean, readable cards with downloadable payslips.",
        image: "/images/hrms/payroll.png",
        caption: "The payroll view presents clear salary breakdowns, deductions, and quick access to downloadable payslips."
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
    slug: "nova",
    title: "Nova — AI Stock Analysis Dashboard",
    category: "Fintech / Dashboard",
    description:
      "An AI-powered stock analysis platform that gives beginners clear Buy/Hold/Sell recommendations instead of raw market data. Designed an interactive dashboard combining candlestick charts, company overview, technical indicators, and AI insight cards, with a premium dark theme suited to fintech products.",
    role: "Designer & Developer (solo, full-stack)",
    tools: ["Next.js", "TypeScript", "Tailwind", "shadcn/ui", "Framer Motion", "FastAPI", "Python", "Figma"],
    year: "2026",
    cover: "Nova Dashboard",
    coverImage: "/images/nova/cover.png",
    problem:
      "Most stock analysis tools are designed for professional day traders — they overwhelm beginner investors with raw candlestick charts, technical indicators, and order books. Non-expert investors struggle to answer the simple question: 'Is this stock a good buy right now, and why?'",
    constraints: [
      "Solo project requiring ownership of the entire lifecycle — from visual design and typography choices in Figma to full-stack React and FastAPI development",
      "Designing for trust and clarity in fintech, ensuring that AI-generated buy/sell recommendations are presented with clear confidence scores and explainable risk levels rather than black-box suggestions",
      "Simplifying complex financial data (moving averages, volume charts, company profiles) into a cohesive dashboard structure that works seamlessly across desktop and mobile screens"
    ],
    decisions: [
      {
        title: "AI Recommendation Cards",
        detail:
          "Designed plain-language Buy/Hold/Sell recommendation blocks at the top of the interface. Each card displays a confidence score, a risk level rating, and a clear bulleted breakdown of the key factors driving the AI's recommendation.",
        image: "/images/nova/insight-cards.png",
        caption: "Plain-language AI recommendation cards displaying confidence levels, risk ratings, and underlying analysis."
      },
      {
        title: "Interactive Charts & Technical Indicators",
        detail:
          "Simplified candlestick charting for beginners by overlaying simple moving averages and technical indicators as toggleable layers, allowing users to switch between simplified views and detailed historical data.",
        image: "/images/nova/chart-view.png",
        caption: "Interactive candlestick charts with toggleable technical indicators and simple moving averages."
      },
      {
        title: "Unified Stock Dashboard Layout",
        detail:
          "Arranged stock search, real-time price charts, company financial overviews, and AI-powered insights into a responsive grid that prioritizes the most actionable recommendations first, adapting beautifully to phones and tablets.",
        image: "/images/nova/dashboard.png",
        caption: "The unified stock dashboard layout presenting charts, company overview, and AI recommendation side-by-side."
      }
    ],
    outcomes: [
      "Successfully designed and built the complete stock analysis platform end-to-end (Next.js, FastAPI, Python)",
      "Reduced cognitive load for non-expert investors by replacing complex spreadsheets with clean, plain-language cards",
      "Tested the interface with beginner investors, who reported high confidence in understanding the Buy/Hold/Sell recommendations"
    ],
    learnings: [
      "Designing for trust and clarity in fintech is critical — users need to understand the 'why' behind AI-generated recommendations before risking capital",
      "Simplifying complex financial data into a clean, minimalist UI requires aggressive prioritization and cutting out unnecessary data density",
      "Owning a project end-to-end (design + frontend + backend) taught me how to budget my time and make pragmatic design compromises for engineering speed"
    ]
  }
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
