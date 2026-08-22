import type { MetadataRoute } from "next";
import { CALCULATORS } from "@/lib/calculators/registry";
import { SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const calculadoras: MetadataRoute.Sitemap = CALCULATORS.map((c) => ({
    url: `${SITE_URL}/calculadoras/${c.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    ...calculadoras,
  ];
}
