import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink, Trash2 } from "lucide-react";
import {
  incomeTotal,
  PIPELINE_STATUSES,
  STATUS_LABEL,
  useOffsite,
  type PipelineStatus,
} from "@/lib/store";
import { useHydrated } from "@/lib/use-hydrated";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/pipeline")({
  component: PipelinePage,
});

function PipelinePage() {
  const hydrated = useHydrated();
  const items = useOffsite((s) => s.items);
  const income = useOffsite((s) => s.income);
  const setStatus = useOffsite((s) => s.setStatus);
  const setNotes = useOffsite((s) => s.setNotes);
  const removeItem = useOffsite((s) => s.removeItem);
  const addIncome = useOffsite((s) => s.addIncome);
  const removeIncome = useOffsite((s) => s.removeIncome);
  const [mobileStatus, setMobileStatus] = useState<PipelineStatus>("saved");

  const total = incomeTotal(income);

  if (!hydrated) {
    return (
      <AppShell>
        <h1 className="font-display text-4xl font-medium tracking-tight">Pipeline</h1>
        <p className="mt-3 text-sm text-muted-foreground">Loading your board…</p>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            This device
          </p>
          <h1 className="mt-2 font-display text-4xl font-medium tracking-tight">
            Pipeline
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Saved roles stay in this browser. Apply, then move the card. Log
            what actually cleared so next week is not a guess.
          </p>
        </div>
        <p className="font-mono text-sm tabular-nums text-pine">
          ${total.toLocaleString()} logged
        </p>
      </div>

      <div className="mt-8 md:hidden">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {PIPELINE_STATUSES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setMobileStatus(s)}
              className={cn(
                "h-9 shrink-0 rounded-full border px-3 text-sm",
                mobileStatus === s
                  ? "border-pine bg-pine text-pine-fg"
                  : "border-border bg-card text-muted-foreground",
              )}
            >
              {STATUS_LABEL[s]}
              <span className="ml-1.5 font-mono text-xs tabular-nums">
                {items.filter((i) => i.status === s).length}
              </span>
            </button>
          ))}
        </div>
        <Column
          status={mobileStatus}
          items={items.filter((i) => i.status === mobileStatus)}
          setStatus={setStatus}
          setNotes={setNotes}
          removeItem={removeItem}
        />
      </div>

      <div className="mt-8 hidden gap-3 md:grid md:grid-cols-4">
        {PIPELINE_STATUSES.map((s) => (
          <Column
            key={s}
            status={s}
            items={items.filter((i) => i.status === s)}
            setStatus={setStatus}
            setNotes={setNotes}
            removeItem={removeItem}
          />
        ))}
      </div>

      <section className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div>
          <h2 className="font-display text-2xl font-medium tracking-tight">
            Income log
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Tests, gigs, invoices. If it hit the account, write it down.
          </p>
          <IncomeForm
            onAdd={(entry) => addIncome(entry)}
          />
          <ul className="mt-4 divide-y divide-border rounded-xl border border-border bg-card">
            {income.length === 0 ? (
              <li className="p-5 text-sm text-muted-foreground">
                Nothing logged yet. First session counts.
              </li>
            ) : (
              income.map((row) => (
                <li
                  key={row.id}
                  className="flex items-center justify-between gap-3 px-4 py-3"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{row.source}</p>
                    <p className="text-xs text-muted-foreground">
                      {row.date}
                      {row.note ? ` · ${row.note}` : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm tabular-nums text-pine">
                      ${row.amount.toLocaleString()}
                    </span>
                    <button
                      type="button"
                      className="flex size-11 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
                      onClick={() => removeIncome(row.id)}
                      aria-label="Remove entry"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
        <aside className="rounded-xl border border-border bg-card p-5">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
            Why this exists
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Remote income dies in open tabs. Save the role, apply, follow up,
            log the money. That loop is the whole product.
          </p>
          <Button asChild variant="outline" className="mt-5 w-full">
            <Link to="/jobs">Find another role</Link>
          </Button>
        </aside>
      </section>
    </AppShell>
  );
}

function Column({
  status,
  items,
  setStatus,
  setNotes,
  removeItem,
}: {
  status: PipelineStatus;
  items: ReturnType<typeof useOffsite.getState>["items"];
  setStatus: (id: string, status: PipelineStatus) => void;
  setNotes: (id: string, notes: string) => void;
  removeItem: (id: string) => void;
}) {
  return (
    <section className="rounded-xl border border-border bg-card p-3">
      <header className="flex items-baseline justify-between px-1 pb-3 pt-1">
        <h2 className="text-sm font-medium">{STATUS_LABEL[status]}</h2>
        <span className="font-mono text-xs tabular-nums text-muted-foreground">
          {items.length}
        </span>
      </header>
      <div className="flex flex-col gap-2">
        {items.length === 0 ? (
          <p className="px-1 py-6 text-sm text-muted-foreground">Empty.</p>
        ) : (
          items.map((item) => (
            <article
              key={item.id}
              className="rounded-lg border border-border bg-cream p-3"
            >
              <h3 className="font-medium leading-snug">{item.title}</h3>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {item.company}
                {item.salaryLabel ? ` · ${item.salaryLabel}` : ""}
              </p>
              <label className="mt-2 block">
                <span className="sr-only">Move {item.title}</span>
                <select
                  value={item.status}
                  onChange={(e) =>
                    setStatus(item.id, e.target.value as PipelineStatus)
                  }
                  className="h-10 w-full rounded-md border border-input bg-card px-2 text-sm"
                >
                  {PIPELINE_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {STATUS_LABEL[s]}
                    </option>
                  ))}
                </select>
              </label>
              <textarea
                value={item.notes}
                onChange={(e) => setNotes(item.id, e.target.value)}
                placeholder="Note, recruiter, date"
                className="mt-2 min-h-16 w-full rounded-md border border-input bg-card px-2 py-2 text-sm"
              />
              <div className="mt-2 flex items-center justify-between">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center gap-1 text-sm font-medium text-pine hover:underline"
                >
                  Open listing
                  <ExternalLink className="size-3.5" />
                </a>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="flex size-11 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
                  aria-label="Remove"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}

function IncomeForm({
  onAdd,
}: {
  onAdd: (entry: {
    date: string;
    source: string;
    amount: number;
    note: string;
  }) => void;
}) {
  const [source, setSource] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [note, setNote] = useState("");

  const canSubmit = useMemo(() => {
    const n = Number(amount);
    return source.trim().length > 0 && Number.isFinite(n) && n > 0;
  }, [source, amount]);

  return (
    <form
      className="mt-5 grid gap-3 rounded-xl border border-border bg-card p-4 sm:grid-cols-2"
      onSubmit={(e) => {
        e.preventDefault();
        const n = Number(amount);
        if (!canSubmit) return;
        onAdd({
          date,
          source: source.trim(),
          amount: n,
          note: note.trim(),
        });
        setSource("");
        setAmount("");
        setNote("");
      }}
    >
      <div className="sm:col-span-1">
        <Label htmlFor="inc-source">Source</Label>
        <Input
          id="inc-source"
          className="mt-1.5"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          placeholder="Prolific, Fiverr, salary"
        />
      </div>
      <div>
        <Label htmlFor="inc-amount">Amount (USD)</Label>
        <Input
          id="inc-amount"
          className="mt-1.5"
          inputMode="decimal"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="42"
        />
      </div>
      <div>
        <Label htmlFor="inc-date">Date</Label>
        <Input
          id="inc-date"
          className="mt-1.5"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="inc-note">Note</Label>
        <Input
          id="inc-note"
          className="mt-1.5"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Optional"
        />
      </div>
      <div className="sm:col-span-2">
        <Button type="submit" disabled={!canSubmit}>
          Log payout
        </Button>
      </div>
    </form>
  );
}
