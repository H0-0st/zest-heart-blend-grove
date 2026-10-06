import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { listJobs, matchJobs, writeCover } from "@/lib/jobs-api";
import { jobSearchHaystack, type RemoteJob } from "@/lib/jobs";
import { useOffsite } from "@/lib/store";
import { AppShell } from "@/components/app-shell";
import { JobSheet } from "@/components/job-sheet";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const PROFILE_KEY = "offsite-profile";

type MatchRow = {
  id: string;
  score: number;
  why: string;
  angle: string;
};

export const Route = createFileRoute("/match")({
  loader: () => listJobs(),
  component: MatchPage,
});

function prefilter(jobs: RemoteJob[], profile: string, n = 40): string[] {
  const tokens = profile
    .toLowerCase()
    .split(/\W+/)
    .filter((t) => t.length > 3);
  const scored = jobs.map((job) => {
    const hay = jobSearchHaystack(job);
    const hits = tokens.reduce((acc, t) => acc + (hay.includes(t) ? 1 : 0), 0);
    return { id: job.id, hits, at: Date.parse(job.publishedAt) || 0 };
  });
  scored.sort((a, b) => b.hits - a.hits || b.at - a.at);
  return scored.slice(0, n).map((s) => s.id);
}

function MatchPage() {
  const data = Route.useLoaderData();
  const addFromJob = useOffsite((s) => s.addFromJob);
  const [profile, setProfile] = useState("");
  const [busy, setBusy] = useState(false);
  const [letterBusy, setLetterBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [matches, setMatches] = useState<MatchRow[]>([]);
  const [letter, setLetter] = useState<{
    jobId: string;
    title: string;
    company: string;
    text: string;
  } | null>(null);
  const [open, setOpen] = useState<RemoteJob | null>(null);

  useEffect(() => {
    try {
      setProfile(localStorage.getItem(PROFILE_KEY) ?? "");
    } catch {
      /* ignore */
    }
  }, []);

  const byId = useMemo(() => {
    const map = new Map(data.jobs.map((j) => [j.id, j]));
    return map;
  }, [data.jobs]);

  async function runMatch() {
    setBusy(true);
    setError(null);
    setLetter(null);
    try {
      localStorage.setItem(PROFILE_KEY, profile);
    } catch {
      /* ignore */
    }
    const ids = prefilter(data.jobs, profile);
    const result = await matchJobs({ data: { profile, jobIds: ids } });
    setBusy(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setMatches(result.matches);
    if (result.matches.length === 0) {
      setError("No strong matches in the current board. Broaden the profile.");
    }
  }

  async function cover(jobId: string) {
    setLetterBusy(jobId);
    const result = await writeCover({ data: { profile, jobId } });
    setLetterBusy(null);
    if (!result.ok) {
      toast(result.error);
      return;
    }
    setLetter({
      jobId,
      title: result.jobTitle,
      company: result.company,
      text: result.text,
    });
  }

  return (
    <AppShell>
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
        Against the live board
      </p>
      <h1 className="mt-2 max-w-2xl font-display text-4xl font-medium tracking-tight sm:text-5xl">
        Match your craft to roles that are actually open.
      </h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
        Paste skills, tools, and the kind of work you want. Matching uses the
        listings on the board — not a fantasy catalog.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <form
          className="flex flex-col gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            void runMatch();
          }}
        >
          <Label htmlFor="profile">Profile</Label>
          <Textarea
            id="profile"
            value={profile}
            onChange={(e) => setProfile(e.target.value)}
            placeholder="Example: Product designer, 6 years. Figma, design systems, B2B SaaS. Want a senior IC role, US-friendly timezone. Portfolio at…"
            className="min-h-48"
          />
          <Button type="submit" disabled={busy || profile.trim().length < 20}>
            {busy ? "Matching…" : "Match me"}
          </Button>
          {error ? <p className="text-sm text-warn">{error}</p> : null}
        </form>

        <div>
          {matches.length === 0 && !letter ? (
            <div className="rounded-xl border border-dashed border-border bg-card p-6 text-sm text-muted-foreground">
              Results land here. Save the ones worth applying to, then generate
              a letter only when you will actually send it.
            </div>
          ) : (
            <ul className="space-y-3">
              {matches.map((m) => {
                const job = byId.get(m.id);
                if (!job) return null;
                return (
                  <li
                    key={m.id}
                    className="rounded-xl border border-border bg-card p-4"
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <h2 className="font-display text-xl font-medium tracking-tight">
                        {job.title}
                      </h2>
                      <span className="font-mono text-xs tabular-nums text-pine">
                        {m.score}
                      </span>
                    </div>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {job.company}
                      {job.salaryLabel ? ` · ${job.salaryLabel}` : ""}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed">{m.why}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Angle: {m.angle}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setOpen(job)}
                      >
                        View role
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          addFromJob(job, "saved");
                          toast("Saved to pipeline");
                        }}
                      >
                        Save
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => void cover(job.id)}
                        disabled={letterBusy === job.id || profile.trim().length < 20}
                      >
                        {letterBusy === job.id ? "Writing…" : "Cover letter"}
                      </Button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}

          {letter ? (
            <div className="mt-6 rounded-xl border border-border bg-cream p-5">
              <h2 className="font-display text-2xl font-medium tracking-tight">
                Letter for {letter.title}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">{letter.company}</p>
              <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed">
                {letter.text}
              </p>
              <Button
                className="mt-4"
                variant="outline"
                onClick={async () => {
                  await navigator.clipboard.writeText(letter.text);
                  toast("Copied");
                }}
              >
                Copy letter
              </Button>
            </div>
          ) : null}
        </div>
      </div>
      <JobSheet job={open} onOpenChange={(v) => !v && setOpen(null)} />
    </AppShell>
  );
}
