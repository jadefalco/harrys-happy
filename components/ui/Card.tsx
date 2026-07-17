import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
  dark = false,
}: {
  children: ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={cn(
        "group rounded-3xl border p-8 transition-all duration-300",
        dark
          ? "border-cream/10 bg-cream/[0.04] hover:border-cream/20 hover:bg-cream/[0.07]"
          : "border-hairline bg-white shadow-[0_1px_2px_rgba(20,23,28,0.04)] hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(11,42,99,0.15)]",
        className
      )}
    >
      {children}
    </div>
  );
}
