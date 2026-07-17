export interface Industry {
  slug: string;
  name: string;
  description: string;
}

export const industries: Industry[] = [
  {
    slug: "factories",
    name: "Factories",
    description:
      "Production floors run on tight break windows. We install equipment sized to shift changeovers so lines don't fall behind waiting for coffee or snacks.",
  },
  {
    slug: "warehouses",
    name: "Warehouses",
    description:
      "Large footprints and staggered shifts call for higher-capacity machines placed where crews actually take breaks, not just near the front office.",
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    description:
      "24-hour operations need vending that never goes dark on the overnight shift. Our stocking schedules are built around round-the-clock production.",
  },
  {
    slug: "distribution",
    name: "Distribution Centres",
    description:
      "High headcount and fast turnover mean break rooms take real volume. We size equipment and restock frequency to match, not to a generic route.",
  },
  {
    slug: "office-buildings",
    name: "Office Buildings",
    description:
      "Multi-tenant buildings need equipment that serves varied schedules and tastes across floors, with coffee service that holds up to morning rushes.",
  },
  {
    slug: "schools",
    name: "Schools",
    description:
      "Institutional facilities need reliable, well-maintained equipment and product selections appropriate for staff and campus policy.",
  },
  {
    slug: "hospitals",
    name: "Hospitals",
    description:
      "Round-the-clock staff need food and coffee access at 3 a.m. as much as 3 p.m. We build service schedules around clinical shift patterns.",
  },
  {
    slug: "large-commercial-facilities",
    name: "Large Commercial Facilities",
    description:
      "High foot traffic and diverse needs are the right fit for micro markets and AI smart coolers alongside traditional vending.",
  },
];
