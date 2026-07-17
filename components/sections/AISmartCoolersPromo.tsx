import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const flow = [
  { title: "Walk Up", description: "No app to open, no card to tap first." },
  { title: "Open the Door", description: "The cooler unlocks and starts watching." },
  { title: "Take Your Item", description: "Grab what you want, nothing else to scan." },
  { title: "Automatically Charged", description: "The door closes and payment happens instantly." },
];

export function AISmartCoolersPromo() {
  return (
    <section className="py-24 sm:py-28">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <Badge>Next-Generation Vending</Badge>
            <SectionHeading
              title="AI Smart Coolers: no checkout, no line, no cash"
              description="Computer-vision technology identifies exactly what's taken the moment the door opens and closes, and charges automatically — the most modern convenience option in workplace vending."
              className="mt-6"
            />
            <div className="mt-8">
              <Button href="/services/ai-smart-coolers" variant="primary">
                Explore Smart Coolers
              </Button>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {flow.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.08}>
                <div className="h-full rounded-3xl border border-hairline bg-white p-7">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-400/15 font-display text-sm font-bold text-accent-700">
                    {index + 1}
                  </span>
                  <h3 className="mt-5 font-display text-base font-bold text-navy-950">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
