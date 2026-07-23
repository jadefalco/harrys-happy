import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/images/logo.webp"
      alt="Harry's Happy Vending"
      width={278}
      height={177}
      priority
      className={cn("h-20 w-auto shrink-0 lg:h-24", className)}
    />
  );
}
