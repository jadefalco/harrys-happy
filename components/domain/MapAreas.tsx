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

  const activeCity = active
    ? cities.find((city) => city.slug === active)
    : undefined;

  return (
    <div>
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

          {cities.map((city) => {
            const isActive = active === city.slug;
            return (
              <g key={city.slug} className="pointer-events-none">
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
                    isActive && "fill-accent-400"
                  )}
                />
                <text
                  x={city.x}
                  y={city.y - (city.priority ? 16 : 13)}
                  textAnchor="middle"
                  className={cn(
                    "font-sans transition-all duration-200",
                    city.priority ? "text-[13px] font-bold" : "text-[11px] font-semibold",
                    isActive ? "fill-accent-700" : "fill-navy-900/70"
                  )}
                >
                  {city.name}
                </text>
              </g>
            );
          })}
        </svg>

        {cities.map((city) => {
          const location = locationPages.find((item) => item.city === city.name);
          const href = location ? `/locations/${location.slug}` : "/contact";

          return (
            <Link
              key={`link-${city.slug}`}
              href={href}
              aria-label={`View vending services in ${city.name}`}
              onMouseEnter={() => setActive(city.slug)}
              onMouseLeave={() =>
                setActive((current) => (current === city.slug ? null : current))
              }
              onFocus={() => setActive(city.slug)}
              onBlur={() =>
                setActive((current) => (current === city.slug ? null : current))
              }
              className="absolute h-11 w-11 -translate-x-1/2 -translate-y-1/2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2"
              style={{
                left: `${(city.x / 460) * 100}%`,
                top: `${(city.y / 380) * 100}%`,
              }}
            />
          );
        })}
      </div>

      <div className="mt-6 flex min-h-10 items-center justify-center text-center">
        {activeCity ? (
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-navy-900">
              {activeCity.name}
            </span>
            {activeCity.priority && (
              <span className="rounded-full bg-accent-400/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent-700">
                Priority Area
              </span>
            )}
          </div>
        ) : (
          <span className="text-sm text-slate">
            Click or tap a city to learn more
          </span>
        )}
      </div>
    </div>
  );
}
