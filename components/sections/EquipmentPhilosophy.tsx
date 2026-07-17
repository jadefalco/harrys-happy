import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

const comparison = [
  {
    heading: "Most vending companies",
    tone: "muted" as const,
    points: [
      "Install whatever equipment is already sitting in their warehouse",
      "Size machines to what's available, not what the location needs",
      "Treat every break room the same, regardless of headcount or shift pattern",
    ],
  },
  {
    heading: "Harry's Happy Vending",
    tone: "accent" as const,
    points: [
      "Evaluate your workplace before recommending anything",
      "Purchase and configure equipment sized to your headcount and traffic",
      "Design every installation around how your team actually takes a break",
    ],
  },
];

export function EquipmentPhilosophy() {
  return (
    <section className="bg-navy-950 py-24 sm:py-28">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Our Equipment Philosophy"
              title="No square pegs in round holes."
              description="This is the single biggest difference between us and the rest of the industry — and it shapes every installation we do."
              dark
            />
            <p className="mt-6 max-w-md text-cream/70 leading-relaxed">
              A break room with 300 people on three shifts and a 12-person satellite office
              have nothing in common. We don&rsquo;t believe they should get the same machine.
              Every installation starts with a site assessment, not a warehouse pull sheet.
            </p>
            <div className="mt-8">
              <Button href="/services" variant="accent">
                See Our Equipment Options
              </Button>
            </div>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2">
            {comparison.map((column, index) => (
              <Reveal key={column.heading} delay={index * 0.1}>
                <div
                  className={
                    column.tone === "accent"
                      ? "h-full rounded-3xl border border-accent-400/30 bg-accent-400/[0.08] p-8"
                      : "h-full rounded-3xl border border-cream/10 bg-cream/[0.03] p-8"
                  }
                >
                  <h3
                    className={
                      column.tone === "accent"
                        ? "font-display text-lg font-bold text-accent-300"
                        : "font-display text-lg font-bold text-cream/50"
                    }
                  >
                    {column.heading}
                  </h3>
                  <ul className="mt-6 space-y-4">
                    {column.points.map((point) => (
                      <li key={point} className="flex gap-3 text-sm leading-relaxed">
                        <span
                          className={
                            column.tone === "accent"
                              ? "mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent-400 text-navy-950"
                              : "mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-cream/20 text-cream/30"
                          }
                        >
                          <svg width="9" height="9" viewBox="0 0 24 24" fill="none">
                            {column.tone === "accent" ? (
                              <path
                                d="M4 12l5 5L20 6"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            ) : (
                              <path
                                d="M6 6l12 12M18 6L6 18"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                              />
                            )}
                          </svg>
                        </span>
                        <span className={column.tone === "accent" ? "text-cream/90" : "text-cream/50"}>
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
