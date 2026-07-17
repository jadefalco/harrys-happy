export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: "Is there a minimum number of employees required?",
    answer:
      "We work with facilities of nearly any size, but the right equipment depends on headcount and traffic. During your free site assessment, we'll tell you honestly whether vending, a micro market, or another option makes sense for your location — and if your facility is too small to support equipment cost-effectively, we'll say so.",
  },
  {
    question: "How often are machines stocked?",
    answer:
      "Stocking frequency is set per location based on actual consumption and shift patterns, not a fixed generic route. High-traffic facilities may be serviced multiple times per week; smaller offices may need weekly or biweekly visits. We monitor sales data and adjust the schedule as your needs change.",
  },
  {
    question: "Is installation free?",
    answer:
      "Yes. There is no installation cost to your business for standard vending equipment, coffee service, or micro markets. We handle delivery, setup, and placement as part of onboarding your location.",
  },
  {
    question: "Can we customize the products offered?",
    answer:
      "Yes — this is central to how we operate. We build your product mix around what your specific workforce buys, including requests for healthier options, protein snacks, regional favourites, or dietary-specific items, and adjust it over time based on real sales data.",
  },
  {
    question: "Do you service existing machines, or only install new ones?",
    answer:
      "We service existing machines as well as new installations. If your current equipment is unreliable or the wrong fit for your space, we'll assess it during a site visit and recommend whether to service it, replace it, or reconfigure your break room entirely.",
  },
  {
    question: "Do your machines accept debit and Apple Pay?",
    answer:
      "Yes. All of our machines are equipped with cashless payment terminals accepting tap, debit, credit, Apple Pay, and Google Pay, in addition to cash where applicable.",
  },
  {
    question: "What happens if a machine breaks down?",
    answer:
      "Contact us and we'll dispatch a technician — most service calls are completed within 24 hours. Every location is set up with a direct line to report issues, and we track repair history per machine so recurring problems get addressed at the source, not just patched.",
  },
];
