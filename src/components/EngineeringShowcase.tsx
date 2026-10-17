"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HERO_BIKE_IMAGE } from "@/data/bikes";
import { COMPANY } from "@/lib/site";

interface Hotspot {
  id: string;
  title: string;
  desc: string;
  /** Position as a percentage of the displayed (mirrored) bike image, not the frame */
  x: string;
  y: string;
}

const SIDE_HOTSPOTS: Hotspot[] = [
  {
    id: "handlebar",
    title: "Upright riding position",
    desc: "Wide handlebars and a natural, upright posture keep you comfortable in city traffic and on long daily commutes. Dual mirrors come as standard.",
    x: "71%",
    y: "12%",
  },
  {
    id: "fuel_tank",
    title: "Steel fuel tank",
    desc: "A pressed-steel tank with ROHI badging, painted and finished at our Bahawalpur plant.",
    x: "60%",
    y: "30%",
  },
  {
    id: "seat",
    title: "Long two-up seat",
    desc: "A long, flat seat with room for a passenger, backed by a steel grab rail and rear carrier.",
    x: "28%",
    y: "28%",
  },
  {
    id: "engine",
    title: "Air-cooled four-stroke engine",
    desc: "A simple, proven engine design that any trained mechanic can service, with genuine parts available from ROHI dealers nationwide.",
    x: "50%",
    y: "65%",
  },
];

// Company facts from the Rehman Auto Industry profile
const SPEC_CHIPS = [
  { label: "Engines", value: "70cc · 100cc · Electric", color: "text-white" },
  { label: "Plant capacity", value: `${COMPANY.monthlyCapacity.toLocaleString("en-US")} / month`, color: "text-white" },
  { label: "Dealer network", value: `${COMPANY.dealerCount}+ dealers`, color: "text-red-400" },
  { label: "Warranty", value: `${COMPANY.warrantyMonths} months`, color: "text-emerald-400" },
];

const WHY_POINTS = [
  {
    title: "Made in Pakistan",
    desc: `Built at our own plant on Hasilpur Road, Bahawalpur, with capacity for up to ${COMPANY.monthlyCapacity.toLocaleString("en-US")} motorcycles a month.`,
  },
  {
    title: "EDB & PSQCA certified",
    desc: "Certified by the Engineering Development Board Pakistan and the Pakistan Standards & Quality Control Authority.",
  },
  {
    title: `${COMPANY.dealerCount}+ dealers nationwide`,
    desc: "Sales and service across Punjab, Sindh, Khyber Pakhtunkhwa, Balochistan and Azad Kashmir.",
  },
  {
    title: "Genuine parts & service",
    desc: "After-sales support including spare parts supply, maintenance and technical assistance.",
  },
  {
    title: `${COMPANY.warrantyMonths}-month warranty`,
    desc: "Every ROHI product is covered by our after-sales warranty.",
  },
  {
    title: "A bike for every job",
    desc: "70cc and 100cc commuters, an electric bike, and commercial models including loaders, school vans and cargo boxes.",
  },
];

type AdvantageTab = "local" | "own" | "range";

const ADVANTAGE_TABS: { id: AdvantageTab; label: string }[] = [
  { id: "local", label: "Built locally" },
  { id: "own", label: "Easy to own" },
  { id: "range", label: "For every job" },
];

const ADVANTAGES: Record<AdvantageTab, { num: string; title: string; desc: string }[]> = {
  local: [
    {
      num: "01",
      title: "Assembled in Bahawalpur",
      desc: "Every ROHI comes off our own assembly line in South Punjab, backed by more than 20 years of motorcycle manufacturing.",
    },
    {
      num: "02",
      title: "Checked at every stage",
      desc: "Strict quality control runs through each stage of production so every bike is durable, safe and performs as it should.",
    },
    {
      num: "03",
      title: "Certified standards",
      desc: "ROHI is certified by the Engineering Development Board Pakistan (EDB) and the Pakistan Standards & Quality Control Authority (PSQCA).",
    },
  ],
  own: [
    {
      num: "04",
      title: "Easy on fuel",
      desc: "Simple air-cooled four-stroke engines tuned for everyday economy, so your daily commute costs less.",
    },
    {
      num: "05",
      title: "Parts in every region",
      desc: "More than 300 dealers and distributors keep genuine ROHI spare parts close to home, from Karachi to Azad Kashmir.",
    },
    {
      num: "06",
      title: "Warranty & after-sales",
      desc: "A 6-month warranty on all products, plus maintenance support and technical help from our service department.",
    },
  ],
  range: [
    {
      num: "07",
      title: "70cc & 100cc commuters",
      desc: "Economical 70cc models for city riding and stronger 100cc models for passengers, loads and longer distances.",
    },
    {
      num: "08",
      title: "Commercial models",
      desc: "100cc loaders, school vans, dallas and cargo-box models built for small businesses and daily deliveries.",
    },
    {
      num: "09",
      title: "Accessible & electric",
      desc: "Self-start 70cc models, an adapted model for riders with disabilities, and the ROHI electric bike for zero-petrol commuting.",
    },
  ],
};

export default function EngineeringShowcase() {
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [showWhyModal, setShowWhyModal] = useState(false);
  const [activeTab, setActiveTab] = useState<AdvantageTab>("local");

  return (
    <section id="engineering" data-choreo="true" className="relative w-full overflow-hidden select-none bg-canvas-deep">
      {/* =========================================================================
          PART 1: STUDIO PHOTO BAND — side profile with interactive feature points
         ========================================================================= */}
      {/* ArtCraft-style tactical hairline rule */}
      <div data-draw-rule="true" className="w-full h-px bg-white/10" />

      {/* Studio photo band: stays dark in both themes */}
      <div data-theme="dark" className="relative w-full bg-canvas-deep text-white pt-16 pb-16 md:pt-24 md:pb-24">
        {/* Top Header Bar / Brand Cues */}
        <div data-draw-eyebrow="true" className="max-w-[1500px] mx-auto px-6 md:px-12 mb-8 flex items-center justify-between text-zinc-400 font-mono text-xs">
          <div className="flex items-center gap-3">
            <span data-draw-tick="true" className="text-red-500 font-bold font-mono text-sm">+</span>
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            <span className="tracking-[0.25em] uppercase text-zinc-300">03 · Engineering</span>
          </div>
          <div className="hidden sm:flex items-center gap-6 tracking-[0.2em] uppercase">
            <span>Bahawalpur, Pakistan</span>
            <span className="text-zinc-600">/</span>
            <span>20+ years</span>
          </div>
        </div>

        {/* Editorial Title (Serif Luxury Style from Reference) */}
        <div data-reveal="true" className="max-w-5xl mx-auto px-6 text-center mb-8 md:mb-14">
          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold uppercase leading-[0.92] tracking-[0.005em] text-zinc-100">
            Motorcycles made
            <br />
            in Pakistan
          </h2>
          <p className="mt-4 font-serif italic text-xl sm:text-2xl text-zinc-400">
            Designed, assembled and checked at our Bahawalpur plant
          </p>
        </div>

        {/* Authentic ROHI Horizontal Side Profile Shot with Interactive Hotspots */}
        <div className="relative max-w-[1500px] mx-auto px-4 md:px-12 flex justify-center items-center">
          <div className="relative w-full aspect-[16/9] max-h-[720px] rounded-2xl overflow-hidden border border-white/[0.08] shadow-[0_25px_60px_rgb(0_0_0/calc(0.95*var(--shade)))] bg-black">
            {/* Studio floor glow behind the bike */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_55%_45%_at_50%_62%,rgba(255,30,39,0.16),transparent_70%)]" />

            {/* Ambient Shadow Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-canvas-deep via-transparent to-transparent pointer-events-none opacity-80" />

            <div className="absolute left-1/2 top-[7%] h-[82%] -translate-x-1/2 aspect-[1604/981] transition-transform duration-700 ease-out hover:scale-[1.03]">
              <Image
                src={HERO_BIKE_IMAGE}
                alt="ROHI RI-100 side profile"
                fill
                sizes="(max-width: 1500px) 80vw, 1100px"
                className="object-contain -scale-x-100 drop-shadow-[0_30px_40px_rgb(0_0_0/calc(0.9*var(--shade)))]"
              />

              {/* Interactive Engineering Hotspots */}
              {SIDE_HOTSPOTS.map((spot) => {
                const isOpen = activeHotspot?.id === spot.id;
                return (
                  <div
                    key={spot.id}
                    className="absolute z-20"
                    style={{ left: spot.x, top: spot.y }}
                  >
                    <button
                      onClick={() => setActiveHotspot(isOpen ? null : spot)}
                      aria-label={spot.title}
                      className={`relative -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group cursor-pointer ${
                        isOpen
                          ? "bg-red-600 text-white ring-4 ring-red-500/40 scale-125 shadow-[0_0_20px_#ff1e27]"
                          : "bg-black/80 hover:bg-red-600/90 text-white border border-white/30 backdrop-blur-md"
                      }`}
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-white shadow-sm" />
                      <span className="absolute -inset-1 rounded-full border border-red-500/40 animate-ping pointer-events-none" />
                    </button>

                    {/* Hotspot Popover Tooltip */}
                    {isOpen && (
                      <div className="absolute left-1/2 -translate-x-1/2 bottom-10 w-64 sm:w-72 p-4 rounded-xl bg-elevated/95 border border-red-500/50 backdrop-blur-xl shadow-[0_15px_40px_rgb(0_0_0/calc(0.95*var(--shade)))] z-30">
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
                          <span className="font-mono text-[10px] tracking-widest text-red-400 font-bold uppercase">
                            Feature
                          </span>
                          <button
                            onClick={() => setActiveHotspot(null)}
                            className="text-zinc-400 hover:text-white text-xs cursor-pointer"
                          >
                            ✕
                          </button>
                        </div>
                        <h4 className="font-display text-xl font-bold uppercase leading-tight text-white">
                          {spot.title}
                        </h4>
                        <p className="mt-1.5 text-sm text-zinc-300 leading-relaxed">
                          {spot.desc}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Caption Pill */}
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-none text-zinc-400 font-mono text-[11px]">
              <div className="hidden sm:flex items-center gap-2 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                <span className="uppercase tracking-[0.16em]">Tap the points to explore</span>
              </div>
              <span className="ml-auto bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 tracking-widest uppercase">
                Side profile · ROHI RI-100
              </span>
            </div>
          </div>
        </div>

        {/* Technical Specification Chips Bar */}
        <div className="max-w-[1500px] mx-auto px-6 md:px-12 mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {SPEC_CHIPS.map((chip) => (
            <div key={chip.label} className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] text-center">
              <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-[0.18em] block">
                {chip.label}
              </span>
              <span className={`font-display text-xl md:text-2xl font-bold uppercase mt-1 block ${chip.color}`}>
                {chip.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* =========================================================================
          PART 2: "BUILT FOR PAKISTANI ROADS" — ruler tick lines, display title,
          front-facing pose, and the Why ROHI cards
         ========================================================================= */}
      <div className="relative w-full bg-canvas-alt text-white pt-20 pb-28 md:pt-28 md:pb-36 overflow-hidden border-t border-white/[0.08]">
        {/* Subtle Ambient Radial Lighting */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-red-950/15 blur-[160px] rounded-full" />
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-[900px] h-[300px] bg-zinc-900/40 blur-[130px] rounded-full" />
        </div>

        {/* Left Side Architectural Tick Lines (From Reference Design, styled in dark mode) */}
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 pointer-events-none flex flex-col justify-between py-12 z-10">
          {[...Array(12)].map((_, i) => (
            <div key={`left-tick-${i}`} className="w-full flex items-center">
              <span className="h-[1px] w-6 md:w-10 bg-white/20" />
              <span className="text-[8px] font-mono text-zinc-500 ml-1 select-none">
                {String(i * 10).padStart(2, "0")}
              </span>
            </div>
          ))}
        </div>

        {/* Right Side Architectural Tick Lines (From Reference Design, styled in dark mode) */}
        <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 pointer-events-none flex flex-col justify-between py-12 z-10 items-end">
          {[...Array(12)].map((_, i) => (
            <div key={`right-tick-${i}`} className="w-full flex items-center justify-end">
              <span className="text-[8px] font-mono text-zinc-500 mr-1 select-none">
                {String(110 - i * 10).padStart(2, "0")}
              </span>
              <span className="h-[1px] w-6 md:w-10 bg-white/20" />
            </div>
          ))}
        </div>

        {/* Bottom-left location badge */}
        <div className="absolute bottom-8 left-6 md:left-12 z-20 flex items-center gap-2 pointer-events-none">
          <div className="w-6 h-6 rounded-full border border-white/25 flex items-center justify-center text-xs font-serif font-bold text-white/80">
            R
          </div>
          <span className="font-mono text-[10px] text-zinc-400 tracking-wider uppercase">
            Bahawalpur · 29.39° N, 71.68° E
          </span>
        </div>

        {/* Centered Editorial Header Block */}
        <div className="max-w-4xl mx-auto px-6 text-center relative z-20">
          <h2 className="font-display text-5xl sm:text-7xl md:text-8xl font-bold uppercase leading-[0.9] tracking-[0.005em] text-white">
            Built for
            <br />
            <span className="font-serif normal-case italic font-normal text-red-500">Pakistani roads</span>
          </h2>

          <p className="mt-6 max-w-xl mx-auto text-base sm:text-lg leading-relaxed text-zinc-300">
            More than twenty years of building motorcycles in Bahawalpur have taught us what riders here need:
            an engine that starts every morning, a frame that handles broken roads, and parts you can find in your
            own city.
          </p>

          {/* Actions */}
          <div className="mt-7 sm:mt-9 flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/models"
              className="px-8 py-3.5 rounded-full bg-red-600 hover:bg-red-500 text-white text-sm font-semibold tracking-[0.12em] uppercase transition-all duration-300 shadow-[0_0_30px_rgba(255,30,39,0.5)] hover:shadow-[0_0_40px_rgba(255,30,39,0.7)] hover:-translate-y-0.5 cursor-pointer"
            >
              Explore the lineup
            </Link>

            <button
              onClick={() => setShowWhyModal(true)}
              className="px-7 py-3.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/20 text-sm font-semibold tracking-[0.12em] uppercase transition-all duration-300 shadow-sm hover:shadow cursor-pointer"
            >
              Why ROHI →
            </button>
          </div>
        </div>

        {/* Head-on front pose of the ROHI motorcycle */}
        <div className="relative max-w-2xl mx-auto mt-10 sm:mt-14 px-4 flex justify-center z-20">
          <div className="relative w-full max-w-[540px] aspect-[3/4] flex items-center justify-center">
            <Image
              src="/image/hero images/Centered Black ROHI Motorcycle Front View (1).png"
              alt="ROHI motorcycle head-on front pose"
              fill
              sizes="(max-width: 640px) 100vw, 540px"
              className="object-contain object-bottom hover:scale-105 transition-transform duration-700 ease-out drop-shadow-[0_25px_35px_rgb(0_0_0/calc(0.95*var(--shade)))]"
            />
          </div>
        </div>

        {/* WHY ROHI FEATURE CARDS */}
        <div className="max-w-[1300px] mx-auto px-6 md:px-12 mt-16 sm:mt-24 relative z-20">
          <div className="text-center mb-10">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-red-500 font-semibold block mb-2">
              Why ROHI
            </span>
            <h3 className="font-display text-4xl sm:text-5xl font-bold uppercase leading-none text-white">
              What comes with every ROHI
            </h3>
            <p className="mt-3 text-sm sm:text-base text-zinc-400 max-w-xl mx-auto">
              Local manufacturing, certified quality and a dealer network that reaches every province.
            </p>
          </div>

          {/* Interactive Advantage Tabs */}
          <div className="flex justify-center mb-8 gap-2">
            {ADVANTAGE_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2 rounded-full text-xs font-semibold tracking-[0.12em] uppercase transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-red-600 text-white shadow-[0_0_15px_rgba(255,30,39,0.4)] font-bold"
                    : "bg-white/[0.05] text-zinc-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ADVANTAGES[activeTab].map((card) => (
              <div
                key={card.num}
                className="glass-card-frosted p-6 flex flex-col justify-between hover:border-red-500/50"
              >
                <div className="w-10 h-10 rounded-full bg-red-600/15 text-red-400 flex items-center justify-center font-mono font-bold mb-4">
                  {card.num}
                </div>
                <h4 className="font-display text-2xl font-bold uppercase leading-tight text-white">{card.title}</h4>
                <p className="mt-2 text-sm text-zinc-300 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* =========================================================================
          WHY ROHI MODAL (OPENS ON CLICK)
         ========================================================================= */}
      {showWhyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-scrim backdrop-blur-xl">
          <div className="glass-card-frosted relative w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 text-white shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <span className="font-mono text-[11px] tracking-[0.2em] text-red-500 font-semibold uppercase">
                  Why ROHI
                </span>
                <h3 className="font-display text-3xl sm:text-4xl font-bold uppercase leading-none mt-1">
                  Why riders choose ROHI
                </h3>
              </div>
              <button
                onClick={() => setShowWhyModal(false)}
                aria-label="Close"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-zinc-300 hover:text-white transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
              {WHY_POINTS.map((point) => (
                <li key={point.title} className="flex gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-red-500" />
                  <div>
                    <h4 className="font-display text-xl font-bold uppercase leading-tight text-white">{point.title}</h4>
                    <p className="mt-1 text-sm text-zinc-300 leading-relaxed">{point.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-end flex-wrap gap-3">
              <button
                onClick={() => setShowWhyModal(false)}
                className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-sm font-medium cursor-pointer"
              >
                Close
              </button>
              <Link
                href="/models"
                className="px-6 py-2 rounded-full bg-red-600 hover:bg-red-500 text-white text-sm font-semibold shadow-[0_0_20px_rgba(255,30,39,0.5)] cursor-pointer"
              >
                Explore the lineup →
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
