import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site-config";
import { services } from "@/content/services";
import { locationPages } from "@/content/locations";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/services",
    "/industries",
    "/service-areas",
    "/about",
    "/contact",
    "/faq",
  ].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
  }));

  const serviceRoutes = services.map((service) => ({
    url: `${siteConfig.url}/services/${service.slug}`,
    lastModified: new Date(),
  }));

  const locationRoutes = locationPages.map((location) => ({
    url: `${siteConfig.url}/locations/${location.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...serviceRoutes, ...locationRoutes];
}
