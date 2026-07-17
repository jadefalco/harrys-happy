import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/content/site-config";

const reasons = [
  {
    title: "Reliable Service",
    description:
      "Consistent stocking schedules built around your facility's real consumption, not a generic route through the city.",
    icon: (
      <path
        d="M4 12l5 5L20 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Customized Solutions",
    description:
      "Every location receives equipment chosen specifically for its needs — not whatever happens to be sitting in inventory.",
    icon: (
      <path
        d="M12 3l1.9 4.6L18 9l-4.1 1.4L12 15l-1.9-4.6L6 9l4.1-1.4L12 3z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Family Owned",
    description: `Serving Ontario businesses since ${siteConfig.foundedYear} with hands-on ownership and long-term relationships.`,
    icon: (
      <path
        d="M4 21V9l8-5 8 5v12M9 21v-6h6v6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Fast Repairs",
    description: "Most service calls are completed within 24 hours, so downtime never lingers.",
    icon: (
      <path
        d="M12 7v5l3 3M21 12a9 9 0 11-9-9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Why Harry's Happy"
          title="The reliable choice for Ontario facilities"
          description="Facility managers choose us because we treat every location as a unique installation, not a stop on a route."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, index) => (
            <Reveal key={reason.title} delay={index * 0.08}>
              <Card className="h-full">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-900/5 text-navy-900">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    {reason.icon}
                  </svg>
                </span>
                <h3 className="mt-6 font-display text-xl font-bold text-navy-950">
                  {reason.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate">{reason.description}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
