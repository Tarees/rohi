import type { Metadata } from "next";
import { OG_DEFAULTS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gallery: Coming Soon",
  description: "The ROHI Motorcycles gallery is coming soon.",
  alternates: { canonical: "/gallery" },
  // Placeholder page: keep it out of search results until the gallery launches
  robots: { index: false, follow: true },
  openGraph: {
    ...OG_DEFAULTS,
    url: "/gallery",
    title: "ROHI Motorcycles Gallery: Coming Soon",
    description: "Something big is coming soon.",
  },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
