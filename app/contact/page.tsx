import type { Metadata } from "next";
import Image from "next/image";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/content/site-config";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us | Free Site Assessment",
  description:
    "Schedule a free, no-obligation site assessment with Harry's Happy Vending. Serving factories, warehouses and offices across the Golden Horseshoe.",
  path: "/contact",
});

const contactDetails = [
  { label: "Phone", value: siteConfig.phone, href: siteConfig.phoneHref },
  { label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { label: "Business Hours", value: siteConfig.hours },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Ready to upgrade your break room?"
        description="Tell us about your facility and we'll schedule a free, no-obligation site assessment."
      />

      <section className="py-20 sm:py-24">
        <Container className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <h2 className="font-display text-2xl font-bold text-navy-950">Get in touch</h2>
            <ul className="mt-6 space-y-6">
              {contactDetails.map((detail) => (
                <li key={detail.label}>
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate">
                    {detail.label}
                  </span>
                  {detail.href ? (
                    <a
                      href={detail.href}
                      className="mt-1 block font-display text-lg font-bold text-navy-950 hover:text-accent-700"
                    >
                      {detail.value}
                    </a>
                  ) : (
                    <p className="mt-1 font-display text-lg font-bold text-navy-950">
                      {detail.value}
                    </p>
                  )}
                </li>
              ))}
            </ul>
            <p className="mt-10 text-sm leading-relaxed text-slate">
              Prefer to talk it through first? Call us directly and we&rsquo;ll walk you through
              how a site assessment works before you commit to anything.
            </p>
            <div className="relative mt-8 aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-lg">
              <Image
                src="/images/machine-02.jpg"
                alt="Combination snack and drink vending machine installed by Harry's Happy Vending"
                fill
                loading="lazy"
                sizes="(min-width: 1024px) 35vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
