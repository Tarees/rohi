import type { MetadataRoute } from "next";
import { BIKES, bikeHref } from "@/data/bikes";
import { POSTS } from "@/data/posts";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/models"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/about"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/services"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/contact"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/blog"), lastModified: now, changeFrequency: "weekly", priority: 0.6 },
  ];

  const models: MetadataRoute.Sitemap = BIKES.map((bike) => ({
    url: absoluteUrl(bikeHref(bike)),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
    images: [absoluteUrl(encodeURI(bike.image))],
  }));

  const posts: MetadataRoute.Sitemap = POSTS.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(`${post.published}T00:00:00Z`),
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...pages, ...models, ...posts];
}
