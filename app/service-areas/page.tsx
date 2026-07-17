import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MapAreas } from "@/components/domain/MapAreas";
import { CityList } from "@/components/domain/CityList";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = buildMetadata({
  title: "Service Areas | Golden Horseshoe Vending",
  description:
    "Harry's Happy Vending serves Hamilton, Burlington, Milton, Oakville, Stoney Creek and surrounding Golden Horseshoe cities with vending, coffee service and micro markets.",
  path: "/service-areas",
});

export default function ServiceAreasPage() {
  return (
    <>
      <PageHero
        eyebrow="Service Areas"
        title="Serving the Golden Horseshoe"
        description="We prioritize fast response over wide coverage — Hamilton, Burlington, Milton, Oakville and Stoney Creek are our core service radius, with routes extending across the wider Golden Horseshoe."
      />

      <section className="py-20 sm:py-24">
        <Container className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="rounded-3xl border border-hairline bg-paper p-8 sm:p-12">
            <MapAreas />
          </div>

          <div>
            <SectionHeading
              eyebrow="Coverage"
              title="Cities we serve"
              description="Priority areas get our fastest response times. Don't see your city listed? Reach out — we're expanding routes across the region."
            />
            <div className="mt-8">
              <CityList />
            </div>
          </div>
        </Container>
      </section>

      <FinalCTA />
    </>
  );
}
