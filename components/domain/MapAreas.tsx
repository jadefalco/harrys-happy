"use client";

import { useState } from "react";
import Link from "next/link";
import { cities } from "@/content/cities";
import { locationPages } from "@/content/locations";
import { cn } from "@/lib/utils";

const shorelinePath =
  "M60 300 C 120 340, 170 340, 195 312 C 215 288, 175 250, 195 232 C 215 210, 245 205, 262 188 C 280 172, 310 150, 340 138 C 372 124, 400 150, 402 208 C 404 250, 380 260, 342 228";

export function MapAreas() {
  const [active, setActive] = useState<string | null>(null);

  const activeCity = cities.find((city) => city.slug === active);
  const activeLocation = activeCity
    ? locationPages.find((location) => location.city === activeCity.name)
    : undefined;

  return (
    <div className="relative">
      <svg
        viewBox="0 0 460 380"
        className="w-full"
        role="img"
        aria-label="Map of Golden Horseshoe service area cities"
      >
        <path
          d={shorelinePath}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="1 10"
          strokeLinecap="round"
          className="text-navy-900/25"
        />

        {cities.map((city) => (
          <g
            key={city.slug}
            onMouseEnter={() => setActive(city.slug)}
            onFocus={() => setActive(city.slug)}
            onMouseLeave={() => setActive((current) => (current === city.slug ? null : current))}
            onBlur={() => setActive((current) => (current === city.slug ? null : current))}
            tabIndex={0}
            role="button"
            aria-label={city.name}
            className="cursor-pointer outline-none"
          >
            {city.priority && (
              <circle
                cx={city.x}
                cy={city.y}
                r={9}
                className="animate-pulse-ring fill-accent-400/20"
              />
            )}
            <circle
              cx={city.x}
              cy={city.y}
              r={city.priority ? 7 : 5.5}
              className={cn(
                "transition-all duration-200",
                city.priority ? "fill-navy-900" : "fill-navy-900/50",
                active === city.slug && "fill-accent-400"
              )}
            />
            <text
              x={city.x}
              y={city.y - (city.priority ? 16 : 13)}
              textAnchor="middle"
              className={cn(
                "font-sans transition-all duration-200",
                city.priority ? "text-[13px] font-bold" : "text-[11px] font-semibold",
                active === city.slug ? "fill-accent-700" : "fill-navy-900/70"
              )}
            >
              {city.name}
            </text>
          </g>
        ))}
      </svg>

      <div className="mt-6 flex min-h-[2.5rem] items-center justify-center text-center">
        {activeLocation ? (
          <Link
            href={`/locations/${activeLocation.slug}`}
            className="text-sm font-semibold text-accent-700 hover:underline"
          >
            View {activeCity?.name} vending services &rarr;
          </Link>
        ) : activeCity ? (
          <span className="text-sm text-slate">
            Now serving {activeCity.name} &mdash;{" "}
            <Link href="/contact" className="font-semibold text-accent-700 hover:underline">
              get a free assessment
            </Link>
          </span>
        ) : (
          <span className="text-sm text-slate">Hover or tap a city to learn more</span>
        )}
      </div>
    </div>
  );
}
