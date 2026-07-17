import type { Metadata } from "next";
import { siteConfig } from "@/content/site-config";

interface BuildMetadataArgs {
  title: string;
  description: string;
  path: string;
  image?: string;
}

export function buildMetadata({
  title,
  description,
  path,
  image = "/images/og-default.jpg",
}: BuildMetadataArgs): Metadata {
  const url = `${siteConfig.url}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      locale: "en_CA",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
