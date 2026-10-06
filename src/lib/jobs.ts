export const JOB_SOURCES = ["remotive", "remoteok", "jobicy"] as const;
export type JobSource = (typeof JOB_SOURCES)[number];

export const JOB_CATEGORIES = [
  "Engineering",
  "Data & AI",
  "Design",
  "Product",
  "Marketing",
  "Sales",
  "Writing",
  "Support",
  "People",
  "Finance",
  "Other",
] as const;
export type JobCategory = (typeof JOB_CATEGORIES)[number];

export type RemoteJob = {
  id: string;
  source: JobSource;
  title: string;
  company: string;
  logo: string | null;
  category: JobCategory;
  tags: string[];
  salaryLabel: string | null;
  salaryMin: number | null;
  location: string;
  type: string | null;
  url: string;
  excerpt: string;
  description: string;
  publishedAt: string;
};

export type JobsPayload = {
  jobs: RemoteJob[];
  fetchedAt: string;
  stats: { source: JobSource; count: number; ok: boolean }[];
  error: string | null;
};

export function sourceLabel(source: JobSource): string {
  switch (source) {
    case "remotive":
      return "Remotive";
    case "remoteok":
      return "Remote OK";
    case "jobicy":
      return "Jobicy";
  }
}

export function htmlToText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<\/(p|div|h[1-6]|li|tr|br)\s*>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<li[^>]*>/gi, "• ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&/g, "&")
    .replace(/</g, "<")
    .replace(/>/g, ">")
    .replace(/"/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&rdquo;/g, '"')
    .replace(/&ldquo;/g, '"')
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/\u00a0/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

export function formatSalaryRange(
  min: number | null | undefined,
  max: number | null | undefined,
  currency = "USD",
  period?: string | null,
): string | null {
  if (!min && !max) return null;
  const fmt = (n: number) => {
    if (n >= 1000) {
      const k = n / 1000;
      return k % 1 === 0 ? `${k}k` : `${k.toFixed(1)}k`;
    }
    return String(n);
  };
  const symbol = currency === "USD" || currency === "$" ? "$" : `${currency} `;
  let label = "";
  if (min && max && min !== max) label = `${symbol}${fmt(min)}–${fmt(max)}`;
  else label = `${symbol}${fmt(min || max || 0)}+`;
  const p = (period || "").toLowerCase();
  if (p.includes("hour")) label += "/hr";
  else if (p.includes("month")) label += "/mo";
  else if (p.includes("year") || p.includes("annual") || (min && min >= 10000)) {
    /* yearly implied */
  }
  return label;
}

export function normalizeCategory(
  raw: string,
  tags: string[] = [],
  title = "",
): JobCategory {
  const hay = `${raw} ${tags.join(" ")} ${title}`.toLowerCase();
  if (
    /software|engineer|developer|frontend|backend|fullstack|full-stack|devops|sre|mobile|ios|android|golang|react|python|java|infra|security|cyber/.test(
      hay,
    )
  ) {
    return "Engineering";
  }
  if (
    /data scientist|machine learning|artificial intelligence|\bai\b|ml ops|analyst|analytics|data engineer/.test(
      hay,
    )
  ) {
    return "Data & AI";
  }
  if (/design|ux|ui|brand|figma|product design|graphic/.test(hay)) return "Design";
  if (/product manager|product owner|\bpm\b|product management/.test(hay)) {
    return "Product";
  }
  if (/market|seo|growth|social media|demand gen|content market/.test(hay)) {
    return "Marketing";
  }
  if (/sales|account exec|bdr|sdr|business development|ae\b/.test(hay)) {
    return "Sales";
  }
  if (/writ|edit|copywriter|journalist|technical writer/.test(hay)) return "Writing";
  if (/support|customer service|success|helpdesk|help desk/.test(hay)) {
    return "Support";
  }
  if (/recruiter|talent|human resources|\bhr\b|people ops/.test(hay)) {
    return "People";
  }
  if (/finance|accountan|bookkeep|controller|fp&a/.test(hay)) return "Finance";
  return "Other";
}

export function relativeTime(iso: string): string {
  const t = Date.parse(iso);
  if (!Number.isFinite(t)) return "";
  const delta = Date.now() - t;
  const min = Math.round(delta / 60000);
  if (min < 1) return "just now";
  if (min < 60) return `${min}m ago`;
  const hr = Math.round(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const day = Math.round(hr / 24);
  if (day < 14) return `${day}d ago`;
  const wk = Math.round(day / 7);
  if (wk < 8) return `${wk}w ago`;
  return new Date(t).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

export function jobSearchHaystack(job: RemoteJob): string {
  return `${job.title} ${job.company} ${job.category} ${job.tags.join(" ")} ${job.location} ${job.excerpt}`.toLowerCase();
}
