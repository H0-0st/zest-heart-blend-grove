import { cn } from "@/lib/utils";

export function OffsiteMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("size-8", className)}
      aria-hidden="true"
    >
      <rect
        x="2.5"
        y="2.5"
        width="27"
        height="27"
        rx="7"
        fill="currentColor"
        className="text-primary"
      />
      <path
        d="M8 19.5c3.2-4.4 5.4-6.6 8-6.6s4.8 2.2 8 6.6"
        fill="none"
        stroke="var(--color-primary-foreground)"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <circle cx="16" cy="14.2" r="1.5" fill="var(--color-primary-foreground)" />
    </svg>
  );
}
