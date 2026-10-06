import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Briefcase, Compass, Kanban, ScanSearch, Wallet } from "lucide-react";
import { OffsiteMark } from "@/components/mark";
import { useOffsite } from "@/lib/store";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Start", icon: Compass, match: "exact" as const },
  { to: "/jobs", label: "Board", icon: Briefcase, match: "prefix" as const },
  { to: "/gigs", label: "Gigs", icon: Wallet, match: "prefix" as const },
  { to: "/pipeline", label: "Pipeline", icon: Kanban, match: "prefix" as const },
  { to: "/match", label: "Match", icon: ScanSearch, match: "prefix" as const },
];

function usePath() {
  return useRouterState({ select: (s) => s.location.pathname });
}

function isActive(pathname: string, to: string, match: "exact" | "prefix") {
  if (match === "exact") return pathname === to;
  return pathname === to || pathname.startsWith(`${to}/`);
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePath();
  const savedCount = useOffsite((s) => s.items.length);

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2.5">
            <OffsiteMark />
            <span className="font-display text-xl font-medium tracking-tight">
              Offsite
            </span>
          </Link>
          <nav className="hidden items-center md:flex">
            {NAV.map((item) => {
              const active = isActive(pathname, item.to, item.match);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "relative flex h-16 items-center px-3 text-sm font-medium transition-colors",
                    active
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.label}
                  {item.to === "/pipeline" && savedCount > 0 ? (
                    <span className="ml-1.5 font-mono text-xs tabular-nums text-pine">
                      {savedCount}
                    </span>
                  ) : null}
                  {active ? (
                    <span className="absolute inset-x-3 bottom-0 h-px bg-foreground" />
                  ) : null}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 pb-24 pt-8 sm:px-6 md:pb-16 md:pt-10">
        {children}
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden">
        <ul className="grid grid-cols-5">
          {NAV.map((item) => {
            const Icon = item.icon;
            const active = isActive(pathname, item.to, item.match);
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={cn(
                    "flex h-14 flex-col items-center justify-center gap-0.5 text-xs font-medium",
                    active ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  <span className="relative">
                    <Icon className="size-5" strokeWidth={1.75} />
                    {item.to === "/pipeline" && savedCount > 0 ? (
                      <span className="absolute -right-2 -top-1 size-1.5 rounded-full bg-pine" />
                    ) : null}
                  </span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
