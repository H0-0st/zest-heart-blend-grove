import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Check, Search } from "lucide-react";
import { listJobs } from "@/lib/jobs-api";
import { WEEK_PLAN } from "@/lib/plan";
import { GIGS } from "@/lib/gigs";
import { useOffsite } from "@/lib/store";
import { useHydrated } from "@/lib/use-hydrated";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { JobRow } from "@/components/job-row";
import { JobSheet } from "@/components/job-sheet";
import type { RemoteJob } from "@/lib/jobs";

export const Route = createFileRoute("/")({
  loader: async () => {
    const data = await listJobs();
    return {
      jobs: data.jobs.slice(0, 6),
      count: data.jobs.length,
      error: data.error,
      fetchedAt: data.fetchedAt,
    };
  },
  component: Home,
});

function Home() {
  const data = Route.useLoaderData();
  const navigate = useNavigate();
  const hydrated = useHydrated();
  const planChecks = useOffsite((s) => s.planChecks);
  const togglePlan = useOffsite((s) => s.togglePlan);
  const [open, setOpen] = useState<RemoteJob | null>(null);
  const [hours, setHours] = useState(10);

  const jobs = data.jobs;
  const featured = jobs;
  const done = WEEK_PLAN.filter((p) => planChecks[p.id]).length;
  const low = hours * 8;
  const high = hours * 22;

  return (
    <AppShell>
      <section className="rise-in">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Remote income, this week
        </p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-medium tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Get paid without going into an office.
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Live remote roles, platforms that pay for tests and gigs, and a
          pipeline so applications do not die in a tab. Nothing here is a
          miracle. People who earn do the applications.
        </p>
        <form
          className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault();
            const q = String(new FormData(e.currentTarget).get("q") || "").trim();
            void navigate({
              to: "/jobs",
              search: { q: q || undefined },
            });
          }}
        >
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              name="q"
              placeholder="Role, skill, or company"
              className="pl-10"
              aria-label="Search remote roles"
            />
          </div>
          <Button type="submit" className="h-11 sm:w-auto">
            Search board
          </Button>
        </form>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button asChild>
            <Link to="/gigs">Start earning today</Link>
          </Button>
          <Button asChild variant="outline">
            <a
              href="https://www.prolific.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Prolific
            </a>
          </Button>
          <Button asChild variant="outline">
            <a
              href="https://www.userinterviews.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open User Interviews
            </a>
          </Button>
        </div>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs tabular-nums text-muted-foreground">
          <span>{data.count} live roles</span>
          <span>{GIGS.length} pay platforms</span>
          <span>Saved only on this device</span>
        </div>
      </section>

      <section className="rise-in rise-in-2 mt-14 grid gap-4 md:grid-cols-3">
        {[
          {
            kicker: "Hours to days",
            title: "Tests and studies",
            body: "Prolific, UserTesting, User Interviews. Lower hourly. Almost no portfolio.",
            to: "/gigs",
          },
          {
            kicker: "This week",
            title: "Freelance a craft",
            body: "One gig, five pitches. Upwork and Fiverr pay after you win, not after you sign up.",
            to: "/gigs",
          },
          {
            kicker: "Highest ceiling",
            title: "Hired remote",
            body: "Full-time and contract from Remotive, Remote OK, and Jobicy. Track them here.",
            to: "/jobs",
          },
        ].map((card) => (
          <Link
            key={card.title}
            to={card.to}
            className="group rounded-xl border border-border bg-card p-5 shadow-soft transition-[transform,border-color] duration-200 hover:border-foreground/20"
          >
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
              {card.kicker}
            </p>
            <h2 className="mt-3 font-display text-2xl font-medium tracking-tight">
              {card.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {card.body}
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-pine">
              Open
              <ArrowRight className="size-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </section>

      <section className="rise-in rise-in-3 mt-16 overflow-hidden rounded-xl bg-pine px-5 py-8 text-pine-fg sm:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-pine-fg/70">
              A quiet estimate
            </p>
            <h2 className="mt-2 font-display text-3xl font-medium tracking-tight">
              If you give it {hours} hours
            </h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-pine-fg/80">
              Tests and a small freelance gig commonly land in this band before
              fees. Hired roles sit above it. It is a range, not a promise.
            </p>
          </div>
          <p className="font-display text-4xl font-medium tabular-nums tracking-tight sm:text-5xl">
            ${low.toLocaleString()}–${high.toLocaleString()}
          </p>
        </div>
        <label className="mt-8 block">
          <span className="text-xs uppercase tracking-[0.16em] text-pine-fg/70">
            Hours this week
          </span>
          <input
            type="range"
            min={4}
            max={30}
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
            className="mt-3 w-full accent-cream"
          />
        </label>
      </section>

      <section className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div>
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl font-medium tracking-tight">
                Seven days, then you know
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {hydrated ? `${done} of ${WEEK_PLAN.length} done` : "A week of actual sends"}
              </p>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link to="/gigs">Platforms</Link>
            </Button>
          </div>
          <ol className="mt-6 divide-y divide-border rounded-xl border border-border bg-card">
            {WEEK_PLAN.map((item) => {
              const checked = hydrated && !!planChecks[item.id];
              return (
                <li key={item.id} className="flex gap-3 p-4">
                  <button
                    type="button"
                    onClick={() => togglePlan(item.id)}
                    aria-pressed={checked}
                    className="mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-md border border-border bg-cream"
                  >
                    {checked ? <Check className="size-4 text-pine" /> : null}
                    <span className="sr-only">Toggle day {item.day}</span>
                  </button>
                  <div className="min-w-0 pt-1">
                    <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                      Day {item.day}
                    </p>
                    <h3 className="mt-1 font-medium leading-snug">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{item.detail}</p>
                    {item.href ? (
                      <Link
                        to={item.href}
                        className="mt-2 inline-flex text-sm font-medium text-pine hover:underline"
                      >
                        {item.hrefLabel}
                      </Link>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <aside>
          <div className="flex items-end justify-between">
            <h2 className="font-display text-2xl font-medium tracking-tight">
              On the board
            </h2>
            <Link to="/jobs" className="text-sm font-medium text-pine hover:underline">
              All roles
            </Link>
          </div>
          <div className="mt-4 divide-y divide-border rounded-xl border border-border bg-card">
            {featured.length === 0 ? (
              <p className="p-5 text-sm text-muted-foreground">
                {data.error ?? "Listings are loading."}
              </p>
            ) : (
              featured.map((job) => (
                <JobRow key={job.id} job={job} onOpen={setOpen} compact />
              ))
            )}
          </div>
        </aside>
      </section>
      <JobSheet job={open} onOpenChange={(v) => !v && setOpen(null)} />
    </AppShell>
  );
}
