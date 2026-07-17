import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { GridPattern } from "@/components/ui/GridPattern";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/content/site-config";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-24 sm:py-28">
      <GridPattern className="absolute inset-0 text-cream" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-accent-400/20 blur-[120px]" />

      <Container className="relative text-center">
        <Reveal>
          <h2 className="font-display text-balance text-3xl font-black leading-tight text-cream sm:text-4xl lg:text-5xl">
            Ready to upgrade your break room?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-cream/70">
            Schedule a free, no-obligation site assessment and we&rsquo;ll tell you exactly what
            equipment fits your facility.
          </p>
          <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button href="/contact" variant="accent">
              Get a Free Site Assessment
            </Button>
            <Button href={siteConfig.phoneHref} variant="outlineLight">
              Call {siteConfig.phone}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
