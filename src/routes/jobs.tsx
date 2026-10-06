import { useEffect, useMemo, useState, type ReactNode } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Search, SlidersHorizontal } from "lucide-react";
import { listJobs } from "@/lib/jobs-api";
import {
  JOB_CATEGORIES,
  JOB_SOURCES,
  jobSearchHaystack,
  sourceLabel,
  type JobSource,
  type RemoteJob,
} from "@/lib/jobs";
import { AppShell } from "@/components/app-shell";
import { JobRow } from "@/components/job-row";
import { JobSheet } from "@/components/job-sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type JobsSearch = {
  q?: string;
  category?: string;
  source?: string;
  paid?: boolean;
  id?: string;
};

export const Route = createFileRoute("/jobs")({
  validateSearch: (search: Record<string, unknown>): JobsSearch => ({
    q: typeof search.q === "string" && search.q ? search.q : undefined,
    category:
      typeof search.category === "string" && search.category
        ? search.category
        : undefined,
    source:
      typeof search.source === "string" && search.source
        ? search.source
        : undefined,
    paid: search.paid === true || search.paid === "true" ? true : undefined,
    id: typeof search.id === "string" && search.id ? search.id : undefined,
  }),
  loader: () => listJobs(),
  component: JobsPage,
});

function JobsPage() {
  const data = Route.useLoaderData();
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/jobs" });
  const [draft, setDraft] = useState(search.q ?? "");

  const filtered = useMemo(() => {
    const q = (search.q ?? "").trim().toLowerCase();
    let list = data.jobs;
    if (q) {
      const tokens = q.split(/\s+/).filter(Boolean);
      list = list.filter((job) => {
        const hay = jobSearchHaystack(job);
        return tokens.every((t) => hay.includes(t));
      });
    }
    if (search.category) {
      list = list.filter((j) => j.category === search.category);
    }
    if (search.source && JOB_SOURCES.includes(search.source as JobSource)) {
      list = list.filter((j) => j.source === search.source);
    }
    if (search.paid) {
      list = list.filter((j) => !!j.salaryLabel);
    }
    return list;
  }, [data.jobs, search.q, search.category, search.source, search.paid]);

  const openJob: RemoteJob | null =
    data.jobs.find((j) => j.id === search.id) ?? null;

  const patch = (next: Partial<JobsSearch>) => {
    void navigate({
      search: (prev) => {
        const merged = { ...prev, ...next };
        for (const key of Object.keys(merged) as (keyof JobsSearch)[]) {
          if (!merged[key]) delete merged[key];
        }
        return merged;
      },
      replace: true,
    });
  };

  const presentCategories = JOB_CATEGORIES.filter((c) =>
    data.jobs.some((j) => j.category === c),
  );
  const [visible, setVisible] = useState(40);
  const shown = filtered.slice(0, visible);

  useEffect(() => {
    setVisible(40);
  }, [search.q, search.category, search.source, search.paid]);

  return (
    <AppShell>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Live board
          </p>
          <h1 className="mt-2 font-display text-4xl font-medium tracking-tight">
            Remote roles
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Pulled from Remotive, Remote OK, and Jobicy. Apply on the company
            site, then mark it in your pipeline.
          </p>
        </div>
        <p className="font-mono text-xs tabular-nums text-muted-foreground">
          {filtered.length} shown
          {data.fetchedAt
            ? ` · updated ${new Date(data.fetchedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
            : null}
        </p>
      </div>

      <form
        className="mt-8 flex flex-col gap-3 sm:flex-row"
        onSubmit={(e) => {
          e.preventDefault();
          patch({ q: draft.trim() || undefined, id: undefined });
        }}
      >
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Search title, company, skill"
            className="pl-10"
            aria-label="Filter roles"
          />
        </div>
        <Button type="submit">
          <SlidersHorizontal />
          Filter
        </Button>
      </form>

      <div className="mt-5 flex flex-wrap gap-2">
        <FilterChip
          active={!search.category}
          onClick={() => patch({ category: undefined, id: undefined })}
        >
          All crafts
        </FilterChip>
        {presentCategories.map((c) => (
          <FilterChip
            key={c}
            active={search.category === c}
            onClick={() =>
              patch({
                category: search.category === c ? undefined : c,
                id: undefined,
              })
            }
          >
            {c}
          </FilterChip>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {JOB_SOURCES.map((s) => (
          <FilterChip
            key={s}
            active={search.source === s}
            onClick={() =>
              patch({
                source: search.source === s ? undefined : s,
                id: undefined,
              })
            }
          >
            {sourceLabel(s)}
          </FilterChip>
        ))}
        <FilterChip
          active={!!search.paid}
          onClick={() =>
            patch({ paid: search.paid ? undefined : true, id: undefined })
          }
        >
          Has pay listed
        </FilterChip>
      </div>

      {data.error ? (
        <p className="mt-4 text-sm text-warn">{data.error}</p>
      ) : null}

      <div className="mt-6 divide-y divide-border rounded-xl border border-border bg-card">
        {filtered.length === 0 ? (
          <p className="p-8 text-sm text-muted-foreground">
            No roles match that filter. Clear a chip or try a broader skill.
          </p>
        ) : (
          shown.map((job) => (
            <JobRow
              key={job.id}
              job={job}
              onOpen={(j) => patch({ id: j.id })}
            />
          ))
        )}
      </div>
      {filtered.length > visible ? (
        <div className="mt-4 flex justify-center">
          <Button
            variant="outline"
            onClick={() => setVisible((n) => n + 40)}
          >
            Show more ({filtered.length - visible} left)
          </Button>
        </div>
      ) : null}

      <JobSheet
        job={openJob}
        onOpenChange={(v) => {
          if (!v) patch({ id: undefined });
        }}
      />
    </AppShell>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-11 rounded-full border px-3.5 text-sm transition-colors",
        active
          ? "border-pine bg-pine text-pine-fg"
          : "border-border bg-card text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}
