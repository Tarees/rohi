import type { Metadata } from "next";
import { OG_DEFAULTS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact ROHI Motorcycles & Find a Dealer",
  description:
    "Contact Rehman Auto Industry, makers of ROHI Motorcycles: call or WhatsApp 0300-8583091, email info@rehmanautoindustry.com, or visit our plant at 8-KM Hasilpur Road, Bahawalpur. 300+ dealers across Pakistan.",
  alternates: { canonical: "/contact" },
  openGraph: {
    ...OG_DEFAULTS,
    url: "/contact",
    title: "Contact ROHI Motorcycles",
    description: "Prices, dealers, spare parts and service: get in touch with the ROHI team in Bahawalpur.",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
