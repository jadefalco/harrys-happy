import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { GalleryLightbox } from "@/components/domain/GalleryLightbox";
import { getMachineGallery } from "@/content/gallery";

export function OurMachines() {
  const images = getMachineGallery();
  if (images.length === 0) return null;

  return (
    <section className="bg-paper py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Our Machines"
          title="Real equipment, currently in service"
          description="These are actual machines Harry's Happy Vending has installed and maintains at client facilities across the Greater Hamilton Area — not stock photography."
        />

        <Reveal delay={0.1} className="mt-14">
          <GalleryLightbox images={images} />
        </Reveal>
      </Container>
    </section>
  );
}
