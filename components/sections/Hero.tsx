import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/content/site-config";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-950 pb-20 pt-16 sm:pb-28 sm:pt-20 lg:pt-24">
      <Image
        src="/images/machine-01.JPG"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-navy-950/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/50 to-transparent" />
      <div className="pointer-events-none absolute -top-40 right-[-10%] h-[32rem] w-[32rem] rounded-full bg-accent-400/20 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[-20%] left-[-10%] h-[28rem] w-[28rem] rounded-full bg-navy-700/40 blur-[120px]" />

      <Container className="relative grid items-center gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-cream/15 bg-cream/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-cream/70">
              Serving {siteConfig.region} since {siteConfig.foundedYear}
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-7 font-display text-balance text-4xl font-black leading-[1.05] text-cream sm:text-5xl lg:text-6xl">
              {siteConfig.tagline}
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/70">
              {siteConfig.description}
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button href="/contact" variant="accent">
                Get a Free Site Assessment
              </Button>
              <Button href={siteConfig.phoneHref} variant="outlineLight">
                Call Now — {siteConfig.phone}
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="hidden lg:block">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-cream/10 shadow-2xl">
            <Image
              src="/images/machine-04.jpg"
              alt="Snack and Pepsi beverage vending machines installed together in a Harry's Happy Vending client break room"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
