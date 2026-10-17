import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { COMPANY, OG_DEFAULTS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services: Spare Parts, Warranty & After-Sales Support",
  description:
    "ROHI after-sales service: genuine spare parts, a 6-month warranty, maintenance and technical support through 300+ dealers across Pakistan, plus commercial models and dealership opportunities.",
  alternates: { canonical: "/services" },
  openGraph: {
    ...OG_DEFAULTS,
    url: "/services",
    title: "ROHI Services & After-Sales Support",
    description: "Genuine parts, warranty and service from 300+ ROHI dealers across Pakistan.",
  },
};

interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  points: string[];
  icon: React.ReactNode;
}

const SERVICES: ServiceItem[] = [
  {
    id: "parts",
    number: "01",
    title: "Genuine spare parts",
    description:
      "Factory parts for every ROHI model, supplied through our dealer and distributor network so the right part is never far away.",
    points: ["Engine & transmission parts", "Body panels & fenders", "Brakes, cables & electricals"],
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.3 4.3c.4-1.8 3-1.8 3.4 0a1.7 1.7 0 0 0 2.6 1c1.5-.9 3.3.8 2.4 2.4a1.7 1.7 0 0 0 1 2.6c1.8.4 1.8 3 0 3.4a1.7 1.7 0 0 0-1 2.6c.9 1.5-.8 3.3-2.4 2.4a1.7 1.7 0 0 0-2.6 1c-.4 1.8-3 1.8-3.4 0a1.7 1.7 0 0 0-2.6-1c-1.5.9-3.3-.8-2.4-2.4a1.7 1.7 0 0 0-1-2.6c-1.8-.4-1.8-3 0-3.4a1.7 1.7 0 0 0 1-2.6c-.9-1.5.8-3.3 2.4-2.4a1.7 1.7 0 0 0 2.6-1zM15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
    ),
  },
  {
    id: "warranty",
    number: "02",
    title: `${COMPANY.warrantyMonths}-month warranty`,
    description:
      "Every ROHI product is covered by our after-sales warranty. Keep your invoice and service record, and visit your dealer for any claim.",
    points: ["Covers all ROHI products", "Handled by your nearest dealer", "Backed by the factory service team"],
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.04A11.96 11.96 0 0 1 3.6 6 12 12 0 0 0 3 9.75c0 5.6 3.82 10.3 9 11.62 5.18-1.33 9-6.03 9-11.62 0-1.31-.21-2.57-.6-3.75A11.96 11.96 0 0 1 12 2.71z" />
    ),
  },
  {
    id: "service",
    number: "03",
    title: "After-sales service",
    description:
      "Maintenance support and technical assistance from our service department, so your ROHI keeps running the way it was built.",
    points: ["Routine maintenance support", "Technical help for dealers & riders", "Service advice by phone & WhatsApp"],
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.65 2.65 0 0 0 21 17.25l-5.88-5.88M11.42 15.17l2.5-3.03c.32-.38.74-.62 1.21-.76.55-.16 1.16-.18 1.73-.13a4.5 4.5 0 0 0 4.49-6.32l-3.28 3.28a3 3 0 0 1-2.25-2.25l3.28-3.28a4.5 4.5 0 0 0-6.32 4.49c.09 1.08-.07 2.27-.9 2.96l-.1.09m-1.36 4.92-4.66 5.66a2.48 2.48 0 1 1-3.5-3.5l5.66-4.66m2.5 2.5-2.5-2.5" />
    ),
  },
  {
    id: "commercial",
    number: "04",
    title: "Commercial models",
    description:
      "ROHI 100cc platforms built for work: loaders, school vans, dallas and cargo-box models for small businesses and daily deliveries.",
    points: ["ROHI 100cc Loader", "ROHI 100cc School Van", "ROHI 100cc Dalla & Cargo Box"],
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.38a1.13 1.13 0 0 1-1.13-1.13V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.13c.62 0 1.13-.5 1.1-1.12a17.9 17.9 0 0 0-3.21-9.42 2.29 2.29 0 0 0-1.87-1H14.25M16.5 18.75h-2.25m0-11.18v-.94c0-.57-.42-1.05-.98-1.12a48.5 48.5 0 0 0-11.04 0c-.56.07-.98.55-.98 1.12v7.62m12.75-6.68v6.68m0 0H2.25" />
    ),
  },
  {
    id: "accessible",
    number: "05",
    title: "Accessible riding",
    description:
      "Self-start 70cc models for easier starting, and an adapted self-start 70cc for riders with disabilities.",
    points: ["ROHI 70cc Self Start", "ROHI 70cc Self Start for riders with disabilities", "Ask your dealer about availability"],
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM9 8.25h6M12 8.25v5.25m0 0-3 6m3-6 3 6" />
    ),
  },
  {
    id: "dealership",
    number: "06",
    title: "Become a dealer",
    description: `Join a network of ${COMPANY.dealerCount}+ dealers and distributors across Punjab, Sindh, Khyber Pakhtunkhwa, Balochistan and Azad Kashmir.`,
    points: ["Factory supply from Bahawalpur", "Genuine parts support", "Talk to our sales team"],
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.35m-16.5 11.65V9.35m0 0a3 3 0 0 0 3.75-.62 3 3 0 0 0 4.5 0 3 3 0 0 0 4.5 0 3 3 0 0 0 3.75.62m-16.5 0a3 3 0 0 1-.62-4.72L4.62 3.44A1.5 1.5 0 0 1 5.68 3h12.64a1.5 1.5 0 0 1 1.06.44l1.19 1.19a3 3 0 0 1-.62 4.72" />
    ),
  },
];

export default function ServicesPage() {
  return (
    <div className="relative min-h-screen bg-canvas text-white flex flex-col justify-between selection:bg-red-600 selection:text-white overflow-x-clip">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[500px] bg-gradient-to-b from-red-950/15 via-elevated/40 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[550px] bg-red-900/10 blur-[130px]" />
      </div>

      <Navbar />

      <main className="relative z-10 flex-1 max-w-[1550px] mx-auto w-full px-6 md:px-12 lg:px-16 py-10 md:py-16">
        <div className="border-t border-white/10 pt-8 md:pt-12 mb-10 md:mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <span className="font-mono text-xs text-zinc-500 uppercase tracking-[0.3em] mb-4 block">
                Services · After-sales
              </span>
              <h1 className="font-display text-6xl sm:text-7xl md:text-8xl font-bold uppercase leading-[0.88] text-white">
                Support that rides
                <br />
                <span className="font-serif normal-case italic font-normal text-red-500">with you</span>
              </h1>
            </div>
            <div className="lg:col-span-4 text-left lg:text-right">
              <p className="text-base text-zinc-400 leading-relaxed max-w-sm lg:ml-auto">
                From genuine parts to warranty and technical help, ROHI looks after your motorcycle long after you
                ride it home.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {SERVICES.map((srv) => (
            <section
              key={srv.id}
              id={srv.id}
              className="glass-card-frosted group scroll-mt-28 p-8 md:p-10 flex flex-col justify-between min-h-[400px] hover:border-red-500/50"
            >
              <div className="flex items-center justify-between w-full">
                <span className="font-mono text-xs text-zinc-500 group-hover:text-red-400 transition-colors">
                  {srv.number}
                </span>
                <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-[0_0_20px_rgba(255,30,39,0.35)] group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24" aria-hidden="true">
                    {srv.icon}
                  </svg>
                </div>
              </div>

              <div className="pt-14">
                <h2 className="font-display text-4xl font-bold uppercase leading-[0.95] text-white group-hover:text-red-400 transition-colors">
                  {srv.title}
                </h2>
                <p className="text-sm sm:text-base text-zinc-400 mt-4 leading-relaxed">{srv.description}</p>
                <ul className="mt-6 space-y-2 text-sm text-zinc-300">
                  {srv.points.map((point) => (
                    <li key={point} className="flex gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ))}
        </div>

        <div className="pt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-base text-zinc-400">
            Need parts, service or a dealership enquiry? Our team in Bahawalpur is a call away.
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 text-base font-semibold text-white hover:text-red-400 transition-colors border-b border-white hover:border-red-400 pb-1 w-fit"
          >
            <span>Contact us</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
