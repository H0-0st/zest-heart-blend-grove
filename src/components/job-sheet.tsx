import { ExternalLink } from "lucide-react";
import type { RemoteJob } from "@/lib/jobs";
import { relativeTime, sourceLabel } from "@/lib/jobs";
import { useOffsite } from "@/lib/store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CompanyMark } from "@/components/company-mark";
import { toast } from "sonner";

export function JobSheet({
  job,
  onOpenChange,
}: {
  job: RemoteJob | null;
  onOpenChange: (open: boolean) => void;
}) {
  const addFromJob = useOffsite((s) => s.addFromJob);
  const saved = useOffsite((s) =>
    job ? s.items.some((i) => i.jobId === job.id) : false,
  );

  return (
    <Sheet open={!!job} onOpenChange={onOpenChange}>
      <SheetContent>
        {job ? (
          <>
            <SheetHeader>
              <div className="mb-3 flex items-center gap-3">
                <CompanyMark name={job.company} src={job.logo} />
                <div className="min-w-0">
                  <p className="truncate text-sm text-muted-foreground">
                    {job.company}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {sourceLabel(job.source)} · {relativeTime(job.publishedAt)}
                  </p>
                </div>
              </div>
              <SheetTitle>{job.title}</SheetTitle>
              <SheetDescription>
                {job.location}
                {job.type ? ` · ${job.type}` : ""}
                {job.salaryLabel ? ` · ${job.salaryLabel}` : ""}
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-wrap gap-1.5">
              <Badge variant="pine">{job.category}</Badge>
              {job.tags.slice(0, 6).map((t) => (
                <Badge key={t} variant="outline">
                  {t}
                </Badge>
              ))}
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto pr-1">
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
                {job.description || job.excerpt}
              </p>
            </div>
            <div className="flex flex-col gap-2 border-t border-border pt-3 sm:flex-row">
              <Button asChild className="flex-1">
                <a href={job.url} target="_blank" rel="noopener noreferrer">
                  Apply
                  <ExternalLink />
                </a>
              </Button>
              <Button
                variant={saved ? "secondary" : "outline"}
                className="flex-1"
                onClick={() => {
                  addFromJob(job, "saved");
                  toast("Saved to pipeline");
                }}
              >
                {saved ? "In pipeline" : "Save"}
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  addFromJob(job, "applied");
                  toast("Marked applied");
                }}
              >
                Mark applied
              </Button>
            </div>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
