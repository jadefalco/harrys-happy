import Link from "next/link";
import type { Service } from "@/content/services";
import { Card } from "@/components/ui/Card";
import { ServiceIcon } from "./ServiceIcon";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link href={`/services/${service.slug}`} className="block h-full">
      <Card className="flex h-full flex-col">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-900 text-cream">
          <ServiceIcon icon={service.icon} />
        </span>
        <h3 className="mt-6 font-display text-xl font-bold text-navy-950">{service.name}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-slate">
          {service.shortDescription}
        </p>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent-700 transition-transform duration-300 group-hover:translate-x-1">
          Learn more
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12h14M13 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </Card>
    </Link>
  );
}
