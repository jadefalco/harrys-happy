import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/content/site-config";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { EquipmentPhilosophy } from "@/components/sections/EquipmentPhilosophy";
import { OurMachines } from "@/components/sections/OurMachines";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { AISmartCoolersPromo } from "@/components/sections/AISmartCoolersPromo";
import { IndustriesGrid } from "@/components/sections/IndustriesGrid";
import { ServiceAreasPreview } from "@/components/sections/ServiceAreasPreview";
import { ProductsStrip } from "@/components/sections/ProductsStrip";
import { FAQSection } from "@/components/sections/FAQSection";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = buildMetadata({
  title: `${siteConfig.name} | Vending Services for the Golden Horseshoe`,
  description: siteConfig.description,
  path: "/",
});

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <WhyChooseUs />
      <EquipmentPhilosophy />
      <OurMachines />
      <ServicesGrid />
      <ProcessSteps />
      <AISmartCoolersPromo />
      <IndustriesGrid />
      <ServiceAreasPreview />
      <ProductsStrip />
      <FAQSection />
      <FinalCTA />
    </>
  );
}
