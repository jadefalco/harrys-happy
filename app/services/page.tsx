import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/sections/PageHero";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { EquipmentPhilosophy } from "@/components/sections/EquipmentPhilosophy";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = buildMetadata({
  title: "Vending & Break Room Services",
  description:
    "Snack vending, drink vending, fresh food, coffee service, micro markets, and AI smart coolers — customized equipment for every Ontario workplace.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Every break room service, sized to your facility"
        description="We don't sell a fixed catalogue of machines. Each service below is configured around your headcount, shift pattern, and space."
      />
      <ServicesGrid />
      <EquipmentPhilosophy />
      <FinalCTA />
    </>
  );
}
