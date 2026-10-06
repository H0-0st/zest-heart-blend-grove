import { createServerFn } from "@tanstack/react-start";
import {
  formatSalaryRange,
  htmlToText,
  normalizeCategory,
  type JobSource,
  type JobsPayload,
  type RemoteJob,
} from "@/lib/jobs";

const TTL_MS = 8 * 60 * 1000;
const UA =
  "Mozilla/5.0 (compatible; OffsiteBoard/1.0; +https://grok.com)";

type CacheBox = {
  at: number;
  payload: JobsPayload;
};

let cache: CacheBox | null = null;
let inflight: Promise<JobsPayload> | null = null;

async function fetchJson(url: string, timeoutMs = 12000): Promise<unknown> {
  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
      "User-Agent": UA,
    },
    signal: AbortSignal.timeout(timeoutMs),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${url}`);
  return res.json();
}

function clip(text: string, n: number): string {
  if (text.length <= n) return text;
  return `${text.slice(0, n).trimEnd()}…`;
}

function asString(v: unknown): string {
  return typeof v === "string" ? v : v == null ? "" : String(v);
}

function asNum(v: unknown): number | null {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string" && v.trim()) {
    const n = Number(v.replace(/[^0-9.]/g, ""));
    return Number.isFinite(n) ? n : null;
  }
  return null;
}

function tagsOf(v: unknown): string[] {
  if (Array.isArray(v)) {
    return v
      .map((t) => asString(t).trim())
      .filter(Boolean)
      .slice(0, 8);
  }
  if (typeof v === "string" && v.trim()) {
    return v
      .split(/[,|]/)
      .map((t) => t.trim())
      .filter(Boolean)
      .slice(0, 8);
  }
  return [];
}

function fromRemotive(raw: unknown): RemoteJob[] {
  const root = raw as { jobs?: unknown[] };
  const jobs = Array.isArray(root?.jobs) ? root.jobs : [];
  const out: RemoteJob[] = [];
  for (const item of jobs) {
    if (!item || typeof item !== "object") continue;
    const j = item as Record<string, unknown>;
    const title = asString(j.title).trim();
    const company = asString(j.company_name).trim();
    const url = asString(j.url).trim();
    if (!title || !company || !url) continue;
    const tags = tagsOf(j.tags);
    const category = normalizeCategory(asString(j.category), tags, title);
    const description = clip(htmlToText(asString(j.description)), 1600);
    const salary = asString(j.salary).trim();
    const id = asString(j.id) || `${company}-${title}`;
    out.push({
      id: `remotive:${id}`,
      source: "remotive",
      title,
      company,
      logo: asString(j.company_logo_url || j.company_logo) || null,
      category,
      tags,
      salaryLabel: salary || null,
      salaryMin: asNum(salary),
      location: asString(j.candidate_required_location) || "Remote",
      type: asString(j.job_type).replaceAll("_", " ") || null,
      url,
      excerpt: clip(description, 220),
      description,
      publishedAt: asString(j.publication_date) || new Date().toISOString(),
    });
  }
  return out;
}

function fromRemoteok(raw: unknown): RemoteJob[] {
  const list = Array.isArray(raw) ? raw : [];
  const out: RemoteJob[] = [];
  for (const item of list) {
    if (!item || typeof item !== "object") continue;
    const j = item as Record<string, unknown>;
    const title = asString(j.position).trim();
    const company = asString(j.company).trim();
    if (!title || !company) continue;
    const url = asString(j.apply_url || j.url).trim();
    if (!url) continue;
    const tags = tagsOf(j.tags);
    const category = normalizeCategory(tags.join(" "), tags, title);
    const description = clip(htmlToText(asString(j.description)), 1600);
    const min = asNum(j.salary_min);
    const max = asNum(j.salary_max);
    const id = asString(j.id) || `${company}-${title}`;
    out.push({
      id: `remoteok:${id}`,
      source: "remoteok",
      title,
      company,
      logo: asString(j.company_logo || j.logo) || null,
      category,
      tags,
      salaryLabel: formatSalaryRange(min, max),
      salaryMin: min,
      location: asString(j.location) || "Worldwide",
      type: null,
      url,
      excerpt: clip(description, 220),
      description,
      publishedAt: asString(j.date) || new Date().toISOString(),
    });
  }
  return out;
}

function fromJobicy(raw: unknown): RemoteJob[] {
  const root = raw as { jobs?: unknown[] };
  const jobs = Array.isArray(root?.jobs) ? root.jobs : [];
  const out: RemoteJob[] = [];
  for (const item of jobs) {
    if (!item || typeof item !== "object") continue;
    const j = item as Record<string, unknown>;
    const title = asString(j.jobTitle).trim();
    const company = asString(j.companyName).trim();
    const url = asString(j.url).trim();
    if (!title || !company || !url) continue;
    const industry = tagsOf(j.jobIndustry);
    const tags = [...industry, ...tagsOf(j.jobType)].slice(0, 8);
    const category = normalizeCategory(industry.join(" "), tags, title);
    const description = clip(
      htmlToText(asString(j.jobDescription || j.jobExcerpt)),
      1600,
    );
    const min = asNum(j.salaryMin);
    const max = asNum(j.salaryMax);
    const id = asString(j.id) || `${company}-${title}`;
    const types = tagsOf(j.jobType);
    out.push({
      id: `jobicy:${id}`,
      source: "jobicy",
      title,
      company,
      logo: asString(j.companyLogo) || null,
      category,
      tags,
      salaryLabel: formatSalaryRange(
        min,
        max,
        asString(j.salaryCurrency) || "USD",
        asString(j.salaryPeriod),
      ),
      salaryMin: min,
      location: asString(j.jobGeo) || "Remote",
      type: types[0] || asString(j.jobLevel) || null,
      url,
      excerpt: clip(description || asString(j.jobExcerpt), 220),
      description,
      publishedAt: asString(j.pubDate) || new Date().toISOString(),
    });
  }
  return out;
}

function dedupe(jobs: RemoteJob[]): RemoteJob[] {
  const seen = new Set<string>();
  const out: RemoteJob[] = [];
  for (const job of jobs) {
    const key = `${job.company.toLowerCase().trim()}|${job.title.toLowerCase().trim()}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(job);
  }
  return out;
}

async function loadFresh(): Promise<JobsPayload> {
  const targets: { source: JobSource; url: string; parse: (raw: unknown) => RemoteJob[] }[] =
    [
      {
        source: "remotive",
        url: "https://remotive.com/api/remote-jobs",
        parse: fromRemotive,
      },
      {
        source: "remoteok",
        url: "https://remoteok.com/api",
        parse: fromRemoteok,
      },
      {
        source: "jobicy",
        url: "https://jobicy.com/api/v2/remote-jobs?count=100",
        parse: fromJobicy,
      },
    ];

  const settled = await Promise.allSettled(
    targets.map(async (t) => ({ t, raw: await fetchJson(t.url) })),
  );

  const stats: JobsPayload["stats"] = [];
  const collected: RemoteJob[] = [];
  const errors: string[] = [];

  settled.forEach((result, i) => {
    const source = targets[i].source;
    if (result.status === "fulfilled") {
      const jobs = result.value.t.parse(result.value.raw);
      collected.push(...jobs);
      stats.push({ source, count: jobs.length, ok: true });
    } else {
      stats.push({ source, count: 0, ok: false });
      errors.push(source);
    }
  });

  const jobs = dedupe(collected).sort(
    (a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt),
  );

  return {
    jobs,
    fetchedAt: new Date().toISOString(),
    stats,
    error:
      jobs.length === 0
        ? "Live listings could not be reached. Try again in a moment."
        : errors.length
          ? `Some sources missed: ${errors.join(", ")}.`
          : null,
  };
}

async function getPayload(): Promise<JobsPayload> {
  if (cache && Date.now() - cache.at < TTL_MS) return cache.payload;
  if (inflight) return inflight;
  inflight = loadFresh()
    .then((payload) => {
      cache = { at: Date.now(), payload };
      return payload;
    })
    .finally(() => {
      inflight = null;
    });
  return inflight;
}

export const listJobs = createServerFn({ method: "GET" }).handler(async () => {
  const payload = await getPayload();
  return {
    ...payload,
    jobs: payload.jobs.map((j) => ({
      ...j,
      description: j.description.slice(0, 900),
    })),
  };
});

export const matchJobs = createServerFn({ method: "POST" })
  .validator((input: { profile: string; jobIds?: string[] }) => input)
  .handler(async ({ data }) => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      return { ok: false as const, error: "Matching is unavailable right now." };
    }
    const profile = data.profile.trim().slice(0, 4000);
    if (profile.length < 20) {
      return {
        ok: false as const,
        error: "Add a bit more — skills, tools, and the kind of work you want.",
      };
    }
    const payload = await getPayload();
    const wanted = new Set(data.jobIds ?? []);
    const pool =
      wanted.size > 0
        ? payload.jobs.filter((j) => wanted.has(j.id))
        : payload.jobs;
    const compact = pool.slice(0, 45).map((j) => ({
      id: j.id,
      title: j.title,
      company: j.company,
      category: j.category,
      tags: j.tags.slice(0, 6),
      salary: j.salaryLabel,
      location: j.location,
      excerpt: j.excerpt,
    }));

    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        temperature: 0.3,
        max_tokens: 1200,
        messages: [
          {
            role: "system",
            content:
              "You match people to remote jobs. Be practical. Only use job ids from the provided list. Return strict JSON.",
          },
          {
            role: "user",
            content: `Candidate profile:\n${profile}\n\nJobs:\n${JSON.stringify(compact)}\n\nPick up to 8 best matches. JSON shape: {"matches":[{"id":"...","score":0-100,"why":"one sentence","angle":"what to emphasize in the application"}]}`,
          },
        ],
      }),
    });
    if (!res.ok) {
      return { ok: false as const, error: `Match failed (${res.status}).` };
    }
    const body = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const text = body.choices?.[0]?.message?.content ?? "";
    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}");
    if (jsonStart < 0 || jsonEnd <= jsonStart) {
      return { ok: false as const, error: "Could not read the match result." };
    }
    try {
      const parsed = JSON.parse(text.slice(jsonStart, jsonEnd + 1)) as {
        matches?: { id: string; score: number; why: string; angle: string }[];
      };
      const allowed = new Set(compact.map((j) => j.id));
      const matches = (parsed.matches ?? [])
        .filter((m) => m && allowed.has(m.id))
        .slice(0, 8)
        .map((m) => ({
          id: m.id,
          score: Math.max(0, Math.min(100, Number(m.score) || 0)),
          why: asString(m.why).slice(0, 280),
          angle: asString(m.angle).slice(0, 280),
        }));
      return { ok: true as const, matches };
    } catch {
      return { ok: false as const, error: "Could not parse the match result." };
    }
  });

export const writeCover = createServerFn({ method: "POST" })
  .validator((input: { profile: string; jobId: string }) => input)
  .handler(async ({ data }) => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      return { ok: false as const, error: "Cover letters are unavailable right now." };
    }
    const payload = await getPayload();
    const job = payload.jobs.find((j) => j.id === data.jobId);
    if (!job) return { ok: false as const, error: "That role is no longer on the board." };
    const profile = data.profile.trim().slice(0, 4000);
    if (profile.length < 20) {
      return { ok: false as const, error: "Paste a short profile so the letter can be specific." };
    }
    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        temperature: 0.5,
        max_tokens: 700,
        messages: [
          {
            role: "system",
            content:
              "Write cover letters that sound like a competent adult. No 'I am writing to apply'. No buzzword stacks. 180–220 words. Plain prose.",
          },
          {
            role: "user",
            content: `Profile:\n${profile}\n\nRole: ${job.title} at ${job.company}\nLocation: ${job.location}\nTags: ${job.tags.join(", ")}\nAbout the role:\n${job.description}`,
          },
        ],
      }),
    });
    if (!res.ok) {
      return { ok: false as const, error: `Letter failed (${res.status}).` };
    }
    const body = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const text = (body.choices?.[0]?.message?.content ?? "").trim();
    if (!text) return { ok: false as const, error: "Empty letter." };
    return { ok: true as const, text, jobTitle: job.title, company: job.company };
  });
