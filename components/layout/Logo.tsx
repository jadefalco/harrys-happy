import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/images/logo.webp"
      alt="Harry's Happy Vending"
      width={282}
      height={182}
      priority
      className={cn("h-16 w-auto shrink-0 lg:h-20", className)}
    />
  );
}
