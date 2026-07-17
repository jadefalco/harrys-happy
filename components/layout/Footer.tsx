import Link from "next/link";
import { mainNav } from "@/content/nav";
import { siteConfig } from "@/content/site-config";
import { services } from "@/content/services";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-navy-950 text-cream">
      <Container className="grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-8">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/60">
            {siteConfig.description}
          </p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/60">
            Navigate
          </h3>
          <ul className="mt-5 space-y-3">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-block py-1.5 text-sm text-cream/75 hover:text-cream">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/60">
            Services
          </h3>
          <ul className="mt-5 space-y-3">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-block py-1.5 text-sm text-cream/75 hover:text-cream"
                >
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/60">
            Contact
          </h3>
          <ul className="mt-5 space-y-1 text-sm text-cream/75">
            <li>
              <a href={siteConfig.phoneHref} className="inline-block py-1.5 hover:text-cream">
                {siteConfig.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-block py-1.5 hover:text-cream"
              >
                {siteConfig.email}
              </a>
            </li>
            <li className="pt-2 text-cream/65">{siteConfig.hours}</li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-cream/10">
        <Container className="flex flex-col items-center justify-between gap-4 py-6 text-xs text-cream/60 sm:flex-row">
          <span>
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </span>
          <span>Serving {siteConfig.locationsServed} locations across {siteConfig.region}.</span>
        </Container>
      </div>
    </footer>
  );
}
