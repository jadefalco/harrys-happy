import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-hairline bg-paper px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-navy-800",
        className
      )}
    >
      {children}
    </span>
  );
}
