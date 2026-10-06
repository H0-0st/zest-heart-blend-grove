import { useState } from "react";
import { cn } from "@/lib/utils";

export function CompanyMark({
  name,
  src,
  size = "md",
}: {
  name: string;
  src: string | null;
  size?: "sm" | "md";
}) {
  const [failed, setFailed] = useState(false);
  const dim = size === "sm" ? "size-8 rounded-sm" : "size-11 rounded-md";
  const letter = (name.trim()[0] || "?").toUpperCase();

  if (!src || failed) {
    return (
      <div
        className={cn(
          "flex shrink-0 items-center justify-center bg-pine text-pine-fg font-display text-sm font-medium",
          dim,
        )}
        aria-hidden="true"
      >
        {letter}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt=""
      className={cn("shrink-0 bg-cream object-contain", dim)}
      onError={() => setFailed(true)}
    />
  );
}
