import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { RemoteJob } from "@/lib/jobs";

export const PIPELINE_STATUSES = [
  "saved",
  "applied",
  "interview",
  "offer",
] as const;
export type PipelineStatus = (typeof PIPELINE_STATUSES)[number];

export const STATUS_LABEL: Record<PipelineStatus, string> = {
  saved: "Saved",
  applied: "Applied",
  interview: "Interview",
  offer: "Offer",
};

export type PipelineItem = {
  id: string;
  jobId?: string;
  title: string;
  company: string;
  url: string;
  source?: string;
  salaryLabel?: string | null;
  status: PipelineStatus;
  notes: string;
  savedAt: string;
  appliedAt?: string;
};

export type IncomeEntry = {
  id: string;
  date: string;
  source: string;
  amount: number;
  note: string;
};

type OffsiteState = {
  items: PipelineItem[];
  income: IncomeEntry[];
  planChecks: Record<string, boolean>;
  addFromJob: (job: RemoteJob, status?: PipelineStatus) => void;
  hasJob: (jobId: string) => boolean;
  setStatus: (id: string, status: PipelineStatus) => void;
  setNotes: (id: string, notes: string) => void;
  removeItem: (id: string) => void;
  addIncome: (entry: Omit<IncomeEntry, "id">) => void;
  removeIncome: (id: string) => void;
  togglePlan: (id: string) => void;
};

function nid(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

export const useOffsite = create<OffsiteState>()(
  persist(
    (set, get) => ({
      items: [],
      income: [],
      planChecks: {},
      addFromJob: (job, status = "saved") => {
        const existing = get().items.find((i) => i.jobId === job.id);
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.id === existing.id
                ? {
                    ...i,
                    status,
                    appliedAt:
                      status === "applied"
                        ? (i.appliedAt ?? new Date().toISOString())
                        : i.appliedAt,
                  }
                : i,
            ),
          });
          return;
        }
        const item: PipelineItem = {
          id: nid("p"),
          jobId: job.id,
          title: job.title,
          company: job.company,
          url: job.url,
          source: job.source,
          salaryLabel: job.salaryLabel,
          status,
          notes: "",
          savedAt: new Date().toISOString(),
          appliedAt: status === "applied" ? new Date().toISOString() : undefined,
        };
        set({ items: [item, ...get().items] });
      },
      hasJob: (jobId) => get().items.some((i) => i.jobId === jobId),
      setStatus: (id, status) =>
        set({
          items: get().items.map((i) =>
            i.id === id
              ? {
                  ...i,
                  status,
                  appliedAt:
                    status === "applied"
                      ? (i.appliedAt ?? new Date().toISOString())
                      : i.appliedAt,
                }
              : i,
          ),
        }),
      setNotes: (id, notes) =>
        set({
          items: get().items.map((i) => (i.id === id ? { ...i, notes } : i)),
        }),
      removeItem: (id) =>
        set({ items: get().items.filter((i) => i.id !== id) }),
      addIncome: (entry) =>
        set({
          income: [{ ...entry, id: nid("i") }, ...get().income].slice(0, 80),
        }),
      removeIncome: (id) =>
        set({ income: get().income.filter((i) => i.id !== id) }),
      togglePlan: (id) =>
        set({
          planChecks: {
            ...get().planChecks,
            [id]: !get().planChecks[id],
          },
        }),
    }),
    { name: "offsite-ledger" },
  ),
);

export function incomeTotal(entries: IncomeEntry[]): number {
  return entries.reduce((sum, e) => sum + (Number.isFinite(e.amount) ? e.amount : 0), 0);
}
