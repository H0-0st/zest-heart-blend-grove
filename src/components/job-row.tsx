import { Bookmark, BookmarkCheck } from "lucide-react";
import type { RemoteJob } from "@/lib/jobs";
import { relativeTime, sourceLabel } from "@/lib/jobs";
import { cn } from "@/lib/utils";
import { useOffsite } from "@/lib/store";
import { CompanyMark } from "@/components/company-mark";

export function JobRow({
  job,
  onOpen,
  compact = false,
}: {
  job: RemoteJob;
  onOpen: (job: RemoteJob) => void;
  compact?: boolean;
}) {
  const saved = useOffsite((s) => s.items.some((i) => i.jobId === job.id));
  const addFromJob = useOffsite((s) => s.addFromJob);

  return (
    <div
      className={cn(
        "group grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-lg border border-transparent px-3 py-3 transition-[background-color,border-color] duration-150",
        "hover:border-border hover:bg-cream",
        compact ? "py-2.5" : "py-3.5",
      )}
    >
      <button
        type="button"
        onClick={() => onOpen(job)}
        className="col-span-2 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 text-left"
      >
        <CompanyMark name={job.company} src={job.logo} />
        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <h3 className="truncate font-display text-base font-medium tracking-tight text-foreground md:text-lg">
              {job.title}
            </h3>
            {job.salaryLabel ? (
              <span className="font-mono text-xs tabular-nums text-pine">
                {job.salaryLabel}
              </span>
            ) : null}
          </div>
          <p className="mt-0.5 truncate text-sm text-muted-foreground">
            {job.company}
            <span className="mx-1.5 text-border">·</span>
            {job.category}
            <span className="mx-1.5 hidden text-border sm:inline">·</span>
            <span className="hidden sm:inline">{job.location}</span>
          </p>
          {!compact ? (
            <p className="mt-1 hidden truncate text-xs text-muted-foreground md:block">
              {relativeTime(job.publishedAt)}
              <span className="mx-1.5">·</span>
              {sourceLabel(job.source)}
              {job.tags[0] ? (
                <>
                  <span className="mx-1.5">·</span>
                  {job.tags.slice(0, 3).join(" · ")}
                </>
              ) : null}
            </p>
          ) : null}
        </div>
      </button>
      <button
        type="button"
        aria-label={saved ? "Saved" : "Save role"}
        onClick={(e) => {
          e.stopPropagation();
          addFromJob(job, "saved");
        }}
        className={cn(
          "flex size-11 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
          saved && "text-pine",
        )}
      >
        {saved ? (
          <BookmarkCheck className="size-4" />
        ) : (
          <Bookmark className="size-4" />
        )}
      </button>
    </div>
  );
}
