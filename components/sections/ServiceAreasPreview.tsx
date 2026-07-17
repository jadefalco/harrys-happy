import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { cities } from "@/content/cities";
import { cn } from "@/lib/utils";

export function ServiceAreasPreview() {
  const sorted = [...cities].sort((a, b) => Number(b.priority) - Number(a.priority));

  return (
    <section className="py-24 sm:py-28">
      <Container>
        <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between">
          <Reveal className="max-w-lg">
            <SectionHeading
              eyebrow="Service Areas"
              title="Serving the Golden Horseshoe"
              description="From Hamilton to Brampton, our routes are built around fast response, not wide coverage for its own sake."
            />
            <div className="mt-8">
              <Button href="/service-areas" variant="secondary">
                View Service Area Map
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-wrap gap-3 lg:max-w-md lg:justify-end">
            {sorted.map((city) => (
              <span
                key={city.slug}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-semibold",
                  city.priority
                    ? "border-navy-900/15 bg-navy-900 text-cream"
                    : "border-hairline bg-white text-navy-900/70"
                )}
              >
                {city.name}
              </span>
            ))}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
