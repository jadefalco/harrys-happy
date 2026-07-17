import { Container } from "@/components/ui/Container";
import { GridPattern } from "@/components/ui/GridPattern";
import { Reveal } from "@/components/ui/Reveal";

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-20 sm:py-24">
      <GridPattern className="absolute inset-0 text-cream" />
      <div className="pointer-events-none absolute -top-32 right-[-10%] h-80 w-80 rounded-full bg-accent-400/15 blur-[100px]" />
      <Container className="relative max-w-3xl">
        <Reveal>
          {eyebrow && (
            <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-accent-300">
              {eyebrow}
            </span>
          )}
          <h1 className="font-display text-balance text-4xl font-black leading-[1.05] text-cream sm:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-cream/70">
              {description}
            </p>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
