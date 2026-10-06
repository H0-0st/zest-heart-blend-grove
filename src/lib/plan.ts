export type PlanHref = "/jobs" | "/gigs" | "/pipeline";

export type PlanItem = {
  id: string;
  day: number;
  title: string;
  detail: string;
  href?: PlanHref;
  hrefLabel?: string;
};

export const WEEK_PLAN: PlanItem[] = [
  {
    id: "d1",
    day: 1,
    title: "Open two fast-pay accounts",
    detail:
      "Prolific plus User Interviews (or UserTesting). Finish verification today so studies can land tomorrow.",
    href: "/gigs",
    hrefLabel: "Open platforms",
  },
  {
    id: "d2",
    day: 2,
    title: "Collect the first session",
    detail:
      "Do one test or study. The point is a payout on the way, not a perfect rate.",
    href: "/gigs",
    hrefLabel: "Pay-this-week list",
  },
  {
    id: "d3",
    day: 3,
    title: "Apply to eight live roles",
    detail:
      "Filter the board to your craft. Save each one, then apply on the company site. Move the card to Applied.",
    href: "/jobs",
    hrefLabel: "Open the board",
  },
  {
    id: "d4",
    day: 4,
    title: "Ship one freelance offer",
    detail:
      "A single Fiverr gig or an Upwork profile with three samples. Niche the title to what people search.",
    href: "/gigs",
    hrefLabel: "Freelance platforms",
  },
  {
    id: "d5",
    day: 5,
    title: "Send five tailored pitches",
    detail:
      "No templates. Name the client’s brief in sentence one. Price the first job to buy a review.",
  },
  {
    id: "d6",
    day: 6,
    title: "Follow up yesterday’s applications",
    detail:
      "Short note, 4–6 sentences. If a role went cold, apply to three more from the board.",
    href: "/pipeline",
    hrefLabel: "Open pipeline",
  },
  {
    id: "d7",
    day: 7,
    title: "Count hours that paid, then double down",
    detail:
      "Log what actually cleared. Drop the channel that wasted the week. Repeat the one that paid.",
    href: "/pipeline",
    hrefLabel: "Log income",
  },
];
