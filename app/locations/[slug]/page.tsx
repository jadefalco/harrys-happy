import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { locationPages, getLocationBySlug } from "@/content/locations";
import { getServiceBySlug } from "@/content/services";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { GridPattern } from "@/components/ui/GridPattern";
import { FinalCTA } from "@/components/sections/FinalCTA";

export function generateStaticParams() {
  return locationPages.map((location) => ({ slug: location.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocationBySlug(slug);
  if (!location) return {};

  return buildMetadata({
    title: location.metaTitle,
    description: location.metaDescription,
    path: `/locations/${location.slug}`,
  });
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const location = getLocationBySlug(slug);
  if (!location) notFound();

  const canonicalService = getServiceBySlug(location.canonicalServiceSlug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Service Areas", path: "/service-areas" },
              { name: location.title, path: `/locations/${location.slug}` },
            ])
          ),
        }}
      />

      <section className="relative overflow-hidden bg-navy-950 py-20 sm:py-24">
        <GridPattern className="absolute inset-0 text-cream" />
        <div className="pointer-events-none absolute -top-32 right-[-10%] h-80 w-80 rounded-full bg-accent-400/15 blur-[100px]" />
        <Container className="relative max-w-3xl">
          <Reveal>
            <nav className="mb-6 text-xs font-medium text-cream/50">
              <Link href="/service-areas" className="hover:text-cream/80">
                Service Areas
              </Link>
              <span className="mx-2">/</span>
              <span className="text-cream/80">{location.city}</span>
            </nav>
            <h1 className="font-display text-balance text-4xl font-black leading-[1.05] text-cream sm:text-5xl">
              {location.title}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-cream/70">
              {location.intro}
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button href="/contact" variant="accent">
                Get a Free Site Assessment
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container className="max-w-3xl">
          {location.body.map((paragraph, index) => (
            <Reveal key={index} delay={index * 0.06}>
              <p className="mb-6 text-lg leading-relaxed text-slate">{paragraph}</p>
            </Reveal>
          ))}

          {canonicalService && (
            <Reveal>
              <div className="mt-10 rounded-3xl border border-hairline bg-paper p-8">
                <h2 className="font-display text-lg font-bold text-navy-950">
                  Learn more about {canonicalService.name}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate">
                  {canonicalService.shortDescription}
                </p>
                <Link
                  href={`/services/${canonicalService.slug}`}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent-700 hover:underline"
                >
                  View full service details
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12h14M13 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            </Reveal>
          )}
        </Container>
      </section>

      <FinalCTA />
    </>
  );
}
