"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { mainNav } from "@/content/nav";
import { siteConfig } from "@/content/site-config";
import { Button } from "@/components/ui/Button";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { cn } from "@/lib/utils";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-all duration-300",
        scrolled
          ? "border-b border-hairline bg-cream/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link href="/">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex items-center py-2 text-sm font-semibold text-navy-900/80 transition-colors hover:text-navy-950"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={siteConfig.phoneHref}
            className="inline-flex items-center py-2 text-sm font-semibold text-navy-900/80 hover:text-navy-950"
          >
            {siteConfig.phone}
          </a>
          <Button href="/contact" variant="primary">
            Get a Free Site Assessment
          </Button>
        </div>

        <MobileMenu />
      </div>
    </header>
  );
}
