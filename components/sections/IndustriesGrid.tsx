import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { IndustryCard } from "@/components/domain/IndustryCard";
import { industries } from "@/content/industries";

export function IndustriesGrid() {
  return (
    <section className="bg-paper py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Industries"
          title="Built for facilities that don't run on a nine-to-five"
          description="From 24-hour production floors to multi-tenant office towers, we've serviced the full range of Ontario workplaces."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((industry, index) => (
            <Reveal key={industry.slug} delay={(index % 4) * 0.06}>
              <IndustryCard industry={industry} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
