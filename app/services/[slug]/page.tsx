import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { services, getServiceBySlug } from "@/content/services";
import { buildMetadata } from "@/lib/metadata";
import { serviceSchema, breadcrumbSchema } from "@/lib/schema";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GridPattern } from "@/components/ui/GridPattern";
import { ServiceIcon } from "@/components/domain/ServiceIcon";
import { FinalCTA } from "@/components/sections/FinalCTA";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return buildMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const related = services.filter((item) => item.slug !== service.slug).slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceSchema({
              name: service.name,
              description: service.metaDescription,
              slug: service.slug,
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
              { name: service.name, path: `/services/${service.slug}` },
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
              <Link href="/services" className="hover:text-cream/80">
                Services
              </Link>
              <span className="mx-2">/</span>
              <span className="text-cream/80">{service.name}</span>
            </nav>
            <span className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-cream/10 text-cream">
              <ServiceIcon icon={service.icon} className="h-7 w-7" />
            </span>
            <h1 className="font-display text-balance text-4xl font-black leading-[1.05] text-cream sm:text-5xl">
              {service.name}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-cream/70">
              {service.intro}
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
        <Container className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          {service.featuredPhoto && (
            <Reveal delay={0.05} className="order-1 lg:order-none lg:col-start-2 lg:row-start-1">
              <div className="relative z-10 mb-8 aspect-[4/5] overflow-hidden rounded-[2rem] border border-hairline bg-white shadow-[0_20px_45px_-20px_rgba(11,42,99,0.2)] lg:-mb-19">
                <Image
                  src={service.featuredPhoto.src}
                  alt={service.featuredPhoto.alt}
                  fill
                  loading="lazy"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-contain p-6"
                />
              </div>
            </Reveal>
          )}

          <Reveal className="order-2 lg:order-none lg:col-start-1 lg:row-start-1 lg:row-span-2">
            <h2 className="font-display text-2xl font-bold text-navy-950">What&rsquo;s included</h2>
            <ul className="mt-6 space-y-4">
              {service.benefits.map((benefit) => (
                <li key={benefit} className="flex gap-3 text-slate leading-relaxed">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-navy-900/8 text-navy-900">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M4 12l5 5L20 6"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-3xl border border-hairline bg-paper p-8">
              <Badge>Equipment Philosophy</Badge>
              <p className="mt-4 leading-relaxed text-navy-950">{service.philosophyTieIn}</p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="order-3 lg:order-none lg:col-start-2 lg:row-start-2">
            <div className="rounded-3xl border border-hairline bg-white p-8">
              <h3 className="font-display text-lg font-bold text-navy-950">Ideal for</h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {service.idealFor.map((item) => (
                  <Badge key={item}>{item}</Badge>
                ))}
              </div>

              <h3 className="mt-8 font-display text-lg font-bold text-navy-950">
                Other services
              </h3>
              <ul className="mt-5 space-y-3">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/services/${item.slug}`}
                      className="flex items-center justify-between text-sm font-semibold text-navy-900 hover:text-accent-700"
                    >
                      {item.name}
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
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </section>

      {service.equipmentPhotos && service.equipmentPhotos.length > 0 && (
        <section className="border-t border-hairline bg-paper py-20 sm:py-24">
          <Container>
            <SectionHeading
              eyebrow="Equipment Options"
              title={`${service.name} equipment we install`}
              description="A look at the type of equipment we spec for this service — the exact model comes down to your break room's traffic and footprint."
            />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {service.equipmentPhotos.map((photo) => (
                <Reveal key={photo.src}>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-hairline bg-white shadow-[0_1px_2px_rgba(20,23,28,0.04)] transition-shadow duration-300 hover:shadow-[0_20px_40px_-15px_rgba(11,42,99,0.15)]">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      loading="lazy"
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-contain p-6"
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      <FinalCTA />
    </>
  );
}
