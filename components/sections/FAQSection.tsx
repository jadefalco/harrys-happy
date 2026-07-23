import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { faqItems } from "@/content/faq";
import { faqSchema } from "@/lib/schema";

export function FAQSection({ withSchema = false }: { withSchema?: boolean }) {
  return (
    <section className="bg-paper py-24 sm:py-28">
      {withSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqItems)) }}
        />
      )}
      <Container className="max-w-3xl">
        <SectionHeading
          eyebrow="FAQ"
          title="Common questions from facility managers"
          align="center"
          className="mx-auto"
        />
        <Reveal className="mx-auto mt-12 max-w-3xl">
          <Accordion items={faqItems} />
        </Reveal>
      </Container>
    </section>
  );
}
