import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/sections/PageHero";
import { IndustriesGrid } from "@/components/sections/IndustriesGrid";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = buildMetadata({
  title: "Industries We Serve",
  description:
    "Vending, coffee service and micro markets for factories, warehouses, manufacturing plants, distribution centres, office buildings, schools, hospitals and large commercial facilities.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Facility types we know inside and out"
        description="Every industry has its own shift patterns, headcounts, and break-room realities. Here's how we adapt to each one."
      />
      <IndustriesGrid />
      <FinalCTA />
    </>
  );
}
