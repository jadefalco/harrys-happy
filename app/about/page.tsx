import type { Metadata } from "next";
import Image from "next/image";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/content/site-config";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Card } from "@/components/ui/Card";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description:
    "Family-owned since 2006, Harry's Happy Vending has grown to serve 300+ locations across the Golden Horseshoe through long-term relationships, not one-off installs.",
  path: "/about",
});

const values = [
  {
    title: "Relationships over routes",
    description:
      "We measure success by how long a client stays with us, not how many stops are on a driver's list for the day.",
  },
  {
    title: "Long-term reliability",
    description:
      "Equipment and stocking plans are built to hold up for years of changing headcounts and shift patterns, not just the first install.",
  },
  {
    title: "Consistent service",
    description:
      "The same standard of stocking accuracy and repair speed, whether it's your first month with us or your fifteenth year.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="A family-owned vending partner, not a vending contract"
        description={`Founded in ${siteConfig.foundedYear}, Harry's Happy Vending has grown to serve ${siteConfig.locationsServed} locations across ${siteConfig.region} — one relationship at a time.`}
      />

      <section className="py-20 sm:py-24">
        <Container className="grid gap-14 lg:grid-cols-2">
          <Reveal>
            <h2 className="font-display text-3xl font-black text-navy-950">Our story</h2>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-slate">
              <p>
                Harry&rsquo;s Happy Vending started in {siteConfig.foundedYear} with a simple
                position: most vending companies treat every location the same, and most
                facility managers know it. We built our business around doing the opposite —
                assessing each workplace individually and installing equipment that actually
                fits.
              </p>
              <p>
                That approach has taken us from a handful of local accounts to {siteConfig.locationsServed}{" "}
                locations across {siteConfig.region}, spanning factories, warehouses,
                distribution centres, offices, schools, and hospitals. The facilities have
                gotten bigger and more varied, but the process hasn&rsquo;t changed: visit the
                site, understand the shift pattern, and build a break room program around it.
              </p>
              <p>
                We&rsquo;re still family-owned and hands-on in day-to-day operations, which
                means the people who assess your site are the same people accountable for
                keeping your equipment stocked and running for as long as you&rsquo;re a
                client.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative mb-8 aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-lg">
              <Image
                src="/images/machine-03.jpg"
                alt="Snack and beverage vending machines installed by Harry's Happy Vending in a client break room"
                fill
                loading="lazy"
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="grid gap-5">
              {values.map((value) => (
                <Card key={value.title}>
                  <h3 className="font-display text-lg font-bold text-navy-950">{value.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate">{value.description}</p>
                </Card>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <FinalCTA />
    </>
  );
}
