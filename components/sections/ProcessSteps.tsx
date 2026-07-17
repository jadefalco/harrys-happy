import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const steps = [
  {
    number: "01",
    title: "Book a Site Visit",
    description: "We walk your facility, review headcount, shift patterns, and current setup.",
  },
  {
    number: "02",
    title: "We Design Your Break Room",
    description: "Equipment is selected and configured specifically for your space and traffic.",
  },
  {
    number: "03",
    title: "We Install Equipment",
    description: "Delivery and setup handled at no installation cost, on a schedule that fits your operation.",
  },
  {
    number: "04",
    title: "We Keep Everything Stocked",
    description: "Ongoing stocking and service on a schedule built around your real consumption.",
  },
];

export function ProcessSteps() {
  return (
    <section className="bg-paper py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="How It Works"
          title="From site visit to fully stocked, in four steps"
          align="center"
          className="mx-auto"
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Reveal key={step.number} delay={index * 0.1}>
              <div className="relative h-full rounded-3xl border border-hairline bg-white p-8">
                <span className="font-display text-4xl font-black text-navy-900/10">
                  {step.number}
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-navy-950">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate">{step.description}</p>
                {index < steps.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute right-[-14px] top-1/2 hidden h-px w-7 -translate-y-1/2 bg-hairline lg:block"
                  />
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
