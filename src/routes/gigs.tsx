import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { GIGS, LANES, type Gig } from "@/lib/gigs";
import { AppShell } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/gigs")({
  component: GigsPage,
});

function GigsPage() {
  return (
    <AppShell>
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
        First dollar
      </p>
      <h1 className="mt-2 max-w-2xl font-display text-4xl font-medium tracking-tight sm:text-5xl">
        Platforms that actually pay people.
      </h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
        Ranked by how fast money can move, not how loud the ads are. Survey
        mills and mystery “$500/day” pages are omitted on purpose.
      </p>

      <div className="mt-10 space-y-14">
        {LANES.map((lane) => {
          const items = GIGS.filter((g) => g.lane === lane.id);
          return (
            <section key={lane.id}>
              <div className="max-w-2xl">
                <h2 className="font-display text-3xl font-medium tracking-tight">
                  {lane.title}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">{lane.lede}</p>
              </div>
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {items.map((gig) => (
                  <GigCard key={gig.id} gig={gig} />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <p className="mt-14 text-sm text-muted-foreground">
        Ready for salary work?{" "}
        <Link to="/jobs" className="font-medium text-pine hover:underline">
          Open the live board
        </Link>
        .
      </p>
    </AppShell>
  );
}

function GigCard({ gig }: { gig: Gig }) {
  return (
    <article className="flex flex-col rounded-xl border border-border bg-card p-5 shadow-soft">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-xl font-medium tracking-tight">
            {gig.name}
          </h3>
          <p className="mt-1 font-mono text-xs tabular-nums text-pine">
            {gig.pay}
            <span className="mx-1.5 text-border">·</span>
            {gig.timeToPay}
          </p>
        </div>
        <Badge variant="outline">{gig.effort} effort</Badge>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">
        Best for {gig.bestFor.toLowerCase()}.
      </p>
      <p className="mt-2 text-sm leading-relaxed">{gig.how}</p>
      <p className="mt-2 text-sm text-muted-foreground">{gig.catch}</p>
      <div className="mt-4 flex-1" />
      <Button asChild variant="outline" className="mt-2 w-full sm:w-auto">
        <a href={gig.url} target="_blank" rel="noopener noreferrer">
          Open {gig.name}
          <ArrowUpRight />
        </a>
      </Button>
    </article>
  );
}
