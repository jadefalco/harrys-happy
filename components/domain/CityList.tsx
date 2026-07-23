import Link from "next/link";
import { cities } from "@/content/cities";
import { locationPages } from "@/content/locations";
import { cn } from "@/lib/utils";

export function CityList() {
  const sorted = [...cities].sort((a, b) => Number(b.priority) - Number(a.priority));

  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {sorted.map((city) => {
        const location = locationPages.find((item) => item.city === city.name);
        const content = (
          <>
            <span className="font-display font-bold text-navy-950">{city.name}</span>
            {city.priority && (
              <span className="rounded-full bg-accent-400/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent-700">
                Priority Area
              </span>
            )}
          </>
        );

        return (
          <li key={city.slug}>
            <Link
              href={location ? `/locations/${location.slug}` : "/contact"}
              className={cn(
                "flex items-center justify-between gap-3 rounded-2xl border border-hairline bg-white px-5 py-4 transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_30px_-15px_rgba(11,42,99,0.15)]"
              )}
            >
              {content}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
