import type { Metadata } from "next";
import { OG_DEFAULTS } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Rehman Auto Industry",
  description:
    "Rehman Auto Industry has built ROHI motorcycles in Bahawalpur for 20+ years: a plant with capacity for 5,000 bikes a month, EDB & PSQCA certification and 300+ dealers across Pakistan.",
  alternates: { canonical: "/about" },
  openGraph: {
    ...OG_DEFAULTS,
    url: "/about",
    title: "About ROHI Motorcycles",
    description: "20+ years of motorcycle manufacturing in Bahawalpur, Pakistan.",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
