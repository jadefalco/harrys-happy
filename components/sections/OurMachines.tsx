import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { GalleryLightbox } from "@/components/domain/GalleryLightbox";
import { getMachineGallery } from "@/content/gallery";
import { siteConfig } from "@/content/site-config";

export function OurMachines() {
  const images = getMachineGallery();
  if (images.length === 0) return null;

  return (
    <section className="bg-paper py-24 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Installed Across Southern Ontario"
            title={
              <>
                Real Equipment.
                <br />
                Real Workplaces.
              </>
            }
            description={`These are actual vending and micro market installations currently serving workplaces throughout ${siteConfig.region}.`}
          />
        </Reveal>

        <div className="mt-12 lg:mt-14">
          <GalleryLightbox images={images} />
        </div>
      </Container>
    </section>
  );
}
