import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-cream";

const variants = {
  primary:
    "bg-navy-900 text-cream shadow-lg shadow-navy-900/20 hover:bg-navy-800 hover:shadow-xl hover:shadow-navy-900/25 hover:-translate-y-0.5",
  secondary:
    "bg-cream text-navy-900 border border-hairline hover:border-navy-900/30 hover:-translate-y-0.5",
  outlineLight:
    "border border-cream/40 text-cream hover:bg-cream/10 hover:-translate-y-0.5",
  accent:
    "bg-accent-400 text-navy-950 hover:bg-accent-300 hover:-translate-y-0.5",
};

type Variant = keyof typeof variants;

interface CommonProps {
  variant?: Variant;
  className?: string;
}

type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "primary", className, ...rest } = props;

  if ("href" in rest && rest.href) {
    const { href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & {
      href: string;
    };
    return (
      <Link href={href} className={cn(base, variants[variant], className)} {...anchorRest}>
        {rest.children}
      </Link>
    );
  }

  const buttonRest = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={cn(base, variants[variant], className)} {...buttonRest}>
      {buttonRest.children}
    </button>
  );
}
