export interface Service {
  slug: string;
  name: string;
  shortDescription: string;
  heroImage: string;
  icon: "snack" | "drink" | "food" | "coffee" | "market" | "cooler";
  intro: string;
  benefits: string[];
  philosophyTieIn: string;
  idealFor: string[];
  metaTitle: string;
  metaDescription: string;
}

export const services: Service[] = [
  {
    slug: "snack-vending",
    name: "Snack Vending",
    shortDescription:
      "Full-size snack machines stocked with the brands your team already reaches for.",
    heroImage: "/images/service-snack.jpg",
    icon: "snack",
    intro:
      "A snack machine that sits half-empty or jams on the same coil twice a week isn't a break-room amenity — it's a daily source of friction for your staff. Our snack vending programs are built around your shift patterns, your headcount, and what your specific crew actually buys, backed by a stocking schedule we hold ourselves to.",
    benefits: [
      "Machines sized to your break room and headcount, not a one-size-fits-all install",
      "Rotating mix of national brands, protein snacks, and healthier options based on real sales data",
      "Cashless payment terminals (tap, debit, Apple Pay/Google Pay) on every machine",
      "Stocking frequency set to your actual consumption, not a fixed generic route",
    ],
    philosophyTieIn:
      "Most vending companies roll out whatever snack machine is sitting in their warehouse. We evaluate your break room's traffic, shift schedule, and space before selecting equipment — so a 40-person office and a 300-person distribution centre never get the same machine.",
    idealFor: ["Factories", "Warehouses", "Distribution Centres", "Office Buildings"],
    metaTitle: "Snack Vending Machines for Ontario Workplaces",
    metaDescription:
      "Reliable snack vending for factories, warehouses and offices across the Golden Horseshoe. Customized equipment, cashless payment, and stocking schedules built around your shift patterns.",
  },
  {
    slug: "drink-vending",
    name: "Drink Vending",
    shortDescription:
      "Cold beverage vending built for high-traffic breakrooms and shift-based facilities.",
    heroImage: "/images/service-drink.jpg",
    icon: "drink",
    intro:
      "Cold drink demand spikes hard around shift changes and summer months — a machine that can't keep up leaves your crew without water, sports drinks, or their morning energy drink exactly when they need it most. We spec drink machines by capacity and refrigeration output specific to your facility, not by what happened to be available.",
    benefits: [
      "High-capacity coolers for shift-based facilities with concentrated break periods",
      "Water, sports drinks, energy drinks, and soft drinks in a mix tuned to your workforce",
      "Reliable refrigeration monitored as part of our service visits, not left to chance",
      "Cashless and coin/bill acceptance on every unit",
    ],
    philosophyTieIn:
      "A drink machine that can't refill fast enough for a 24-hour shift schedule is the wrong equipment for that building. We match cooling capacity and machine size to your actual peak demand before anything gets installed.",
    idealFor: ["Manufacturing Plants", "Warehouses", "Distribution Centres", "Large Commercial Facilities"],
    metaTitle: "Commercial Drink Vending Machines | Golden Horseshoe",
    metaDescription:
      "High-capacity cold drink vending for factories, warehouses and industrial facilities. Machines sized to your shift patterns and peak demand, serviced across the Golden Horseshoe.",
  },
  {
    slug: "fresh-food-vending",
    name: "Fresh Food",
    shortDescription:
      "Refrigerated fresh food vending with real meals, not just wrapped snacks.",
    heroImage: "/images/service-food.jpg",
    icon: "food",
    intro:
      "When a facility doesn't have a cafeteria or a nearby lunch option, fresh food vending becomes the difference between a proper meal and a bag of chips at a workstation. Our fresh food programs bring in sandwiches, salads, and hot-ready meals from regional suppliers, delivered and rotated on a schedule that respects shelf life.",
    benefits: [
      "Rotating menu of sandwiches, salads, wraps and hot-ready meals",
      "Refrigerated cabinets with strict rotation to guarantee freshness",
      "Menu built around your shift times, including overnight and weekend crews",
      "Cashless payment with visible pricing on every item",
    ],
    philosophyTieIn:
      "Fresh food vending only works with the right refrigeration and delivery cadence for your facility's shift pattern — a plan built for a daytime office doesn't hold up on a 24/7 production floor, so we design each program around when your people actually eat.",
    idealFor: ["Manufacturing Plants", "Hospitals", "Office Buildings", "Large Commercial Facilities"],
    metaTitle: "Fresh Food Vending Machines | Sandwiches, Salads & Meals",
    metaDescription:
      "Refrigerated fresh food vending with sandwiches, salads and hot-ready meals, delivered and rotated on a schedule built around your facility's shift pattern across the Golden Horseshoe.",
  },
  {
    slug: "coffee-service",
    name: "Coffee Service",
    shortDescription:
      "Commercial-grade coffee equipment and supply programs for busy break rooms.",
    heroImage: "/images/service-coffee.jpg",
    icon: "coffee",
    intro:
      "Coffee is the first thing most employees interact with on shift, and a weak or broken coffee program shows up in morale fast. We supply and maintain commercial single-serve and bean-to-cup equipment, matched to your break room's traffic, along with the ongoing supply of coffee, creamers, teas, and hot chocolate to keep it running.",
    benefits: [
      "Single-serve and bean-to-cup equipment options based on your break room's volume",
      "Ongoing supply of coffee, tea, creamers, sugar and cups included in your service plan",
      "Equipment maintenance and descaling handled on our schedule, not yours",
      "Options ranging from a small office kitchenette to a full multi-machine break room",
    ],
    philosophyTieIn:
      "A single-serve pod machine works fine for a 15-person office and falls apart under a 200-person shift changeover. We size coffee equipment to your actual headcount and peak-hour traffic before we install anything.",
    idealFor: ["Office Buildings", "Factories", "Distribution Centres", "Hospitals"],
    metaTitle: "Commercial Coffee Service for Ontario Businesses",
    metaDescription:
      "Commercial-grade coffee equipment and ongoing supply programs for offices, factories and warehouses. Machines sized to your break room's traffic, serviced across the Golden Horseshoe.",
  },
  {
    slug: "micro-markets",
    name: "Micro Markets",
    shortDescription:
      "Open-concept self-checkout markets bringing grocery-style variety to your break room.",
    heroImage: "/images/service-market.jpg",
    icon: "market",
    intro:
      "A micro market replaces a wall of vending machines with an open, walk-in space stocked like a small grocery store — fresh food, snacks, drinks, and grab-and-go items on real shelving, with self-checkout kiosks handling payment. For larger facilities with the floor space to support it, it's the single biggest upgrade to break room experience we offer.",
    benefits: [
      "Open shelving and refrigerated cases with far more product variety than standalone machines",
      "Self-checkout kiosks with cashless payment and loss-prevention built in",
      "Custom layout designed around your break room's footprint",
      "Higher-margin fresh and healthy options alongside traditional snacks and drinks",
    ],
    philosophyTieIn:
      "Micro markets only make sense with the right footprint and headcount to support them. We assess your space before recommending one — this isn't equipment we push regardless of fit.",
    idealFor: ["Large Commercial Facilities", "Manufacturing Plants", "Distribution Centres", "Office Buildings"],
    metaTitle: "Micro Markets for Workplaces | Self-Checkout Break Rooms",
    metaDescription:
      "Open-concept micro markets with self-checkout kiosks, fresh food and grocery-style variety for larger Ontario facilities. Custom-designed layouts across the Golden Horseshoe.",
  },
  {
    slug: "ai-smart-coolers",
    name: "AI Smart Coolers",
    shortDescription:
      "Walk up, open the door, take what you need — no checkout, no line, no cash.",
    heroImage: "/images/service-cooler.jpg",
    icon: "cooler",
    intro:
      "AI smart coolers use computer-vision technology to identify exactly what's taken the moment the door opens and closes, and charge the customer's card automatically — no scanning, no cashier, no waiting in line. For fast-paced facilities where every minute of a break matters, it's the most modern convenience option we offer.",
    benefits: [
      "Walk up, open the door, take your item — the cooler handles the rest",
      "Computer-vision tracking automatically detects and charges for what's taken",
      "No checkout line, no cash handling, no attendant required",
      "Real-time inventory tracking keeps popular items in stock",
    ],
    philosophyTieIn:
      "Smart coolers are the clearest example of our equipment philosophy in action: this technology fits a specific kind of high-traffic, time-pressured break room — not every location. We recommend it where it will actually get used, not because it's the newest thing available.",
    idealFor: ["Large Commercial Facilities", "Distribution Centres", "Manufacturing Plants", "Office Buildings"],
    metaTitle: "AI Smart Coolers | Cashierless Workplace Vending",
    metaDescription:
      "AI-powered smart coolers bring walk-up, no-checkout convenience to Ontario workplaces. Computer-vision technology automatically charges for what's taken — no cashier, no line.",
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
