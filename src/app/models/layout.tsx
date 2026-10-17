import type { Metadata } from "next";
import { OG_DEFAULTS } from "@/lib/site";

export const metadata: Metadata = {
  // default for /models; the template keeps the brand suffix on /models/[slug]
  title: { default: "Models: 70cc, 100cc & Electric Motorcycles", template: "%s | ROHI Motorcycles" },
  description:
    "Explore the 2026 ROHI lineup: RL-100 and RF-100 (100cc), SR70 and R170 Classic (70cc) and the ROHI Electric Bike. Made in Bahawalpur, sold by 300+ dealers across Pakistan.",
  alternates: { canonical: "/models" },
  openGraph: {
    ...OG_DEFAULTS,
    url: "/models",
    title: "ROHI Motorcycles 2026 lineup",
    description:
      "70cc, 100cc and electric motorcycles made in Pakistan by Rehman Auto Industry, Bahawalpur.",
  },
};

export default function ModelsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
