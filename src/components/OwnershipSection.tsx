import Link from "next/link";
import { COMPANY } from "@/lib/site";

// "Owning a ROHI": the after-sales promise, built only from facts in the company
// profile. Replaces the earlier placeholder rider reviews; real customer stories
// can be added once collected (see the WhatsApp call to action below).

const PILLARS = [
  {
    title: `${COMPANY.dealerCount}+ dealers`,
    desc: "Buy, service and find parts close to home, with dealers and distributors in every province.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657 13.414 20.9a2 2 0 0 1-2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0zM15 11a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
    ),
  },
  {
    title: "Genuine spare parts",
    desc: "Factory parts supplied through the dealer network keep your ROHI running the way it was built.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.3 4.3c.4-1.8 3-1.8 3.4 0a1.7 1.7 0 0 0 2.6 1c1.5-.9 3.3.8 2.4 2.4a1.7 1.7 0 0 0 1 2.6c1.8.4 1.8 3 0 3.4a1.7 1.7 0 0 0-1 2.6c.9 1.5-.8 3.3-2.4 2.4a1.7 1.7 0 0 0-2.6 1c-.4 1.8-3 1.8-3.4 0a1.7 1.7 0 0 0-2.6-1c-1.5.9-3.3-.8-2.4-2.4a1.7 1.7 0 0 0-1-2.6c-1.8-.4-1.8-3 0-3.4a1.7 1.7 0 0 0 1-2.6c-.9-1.5.8-3.3 2.4-2.4a1.7 1.7 0 0 0 2.6-1zM15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
    ),
  },
  {
    title: `${COMPANY.warrantyMonths}-month warranty`,
    desc: "Every ROHI product is covered by our after-sales warranty from the day you buy it.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.04A11.96 11.96 0 0 1 3.6 6 12 12 0 0 0 3 9.75c0 5.6 3.82 10.3 9 11.62 5.18-1.33 9-6.03 9-11.62 0-1.31-.21-2.57-.6-3.75A11.96 11.96 0 0 1 12 2.71z" />
    ),
  },
  {
    title: "After-sales support",
    desc: "Maintenance support and technical assistance from our service department in Bahawalpur.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.28 6.72 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.37c0-.52-.35-.97-.85-1.09l-4.42-1.1c-.44-.11-.9.05-1.17.41l-.97 1.29a1.13 1.13 0 0 1-1.21.38 12.04 12.04 0 0 1-7.14-7.14 1.13 1.13 0 0 1 .38-1.21l1.29-.97c.36-.27.52-.73.41-1.17l-1.1-4.42A1.13 1.13 0 0 0 6.87 2.25H5.5A2.25 2.25 0 0 0 3.25 4.5v2.25z" />
    ),
  },
];

const SHARE_STORY_URL = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(
  "Assalam-o-Alaikum! I ride a ROHI motorcycle and would like to share my experience."
)}`;

export default function OwnershipSection() {
  return (
    <section id="ownership" data-choreo="true" className="relative w-full py-16 sm:py-24 bg-canvas text-white overflow-hidden">
      <div data-draw-rule="true" className="w-full h-px bg-white/10 mb-12 sm:mb-16" />

      {/* Background ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-red-950/20 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-[1500px] mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <div data-draw-eyebrow="true" className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/10 border border-red-500/20 mb-4">
            <span data-draw-tick="true" className="text-red-500 font-bold font-mono text-xs">+</span>
            <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-red-400 font-semibold">
              04 · Owning a ROHI
            </span>
          </div>

          <h2 data-reveal="true" className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold uppercase leading-[0.92] text-white">
            Ride more,{" "}
            <span className="font-serif normal-case italic font-normal text-red-500">worry less</span>
          </h2>

          <p data-reveal="true" className="mt-4 text-base sm:text-lg text-zinc-400 max-w-2xl">
            Buying a motorcycle is the start of a long relationship. Wherever you ride in Pakistan, a ROHI dealer,
            genuine parts and our service team are never far away.
          </p>

          {/* Coverage strip */}
          <ul className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {COMPANY.regions.map((region) => (
              <li
                key={region}
                className="px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-medium text-zinc-300"
              >
                {region}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.title}
              className="relative rounded-2xl p-6 sm:p-7 bg-card/80 hover:bg-card-hover/95 border border-white/10 hover:border-red-500/50 backdrop-blur-xl flex flex-col transition-all duration-300 hover:-translate-y-1.5 shadow-[0_15px_35px_rgb(0_0_0/calc(0.6*var(--shade)))] group"
            >
              <div className="w-11 h-11 rounded-xl bg-red-600/15 text-red-400 flex items-center justify-center mb-5">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24" aria-hidden="true">
                  {pillar.icon}
                </svg>
              </div>
              <h3 className="font-display text-2xl font-bold uppercase leading-tight text-white group-hover:text-red-400 transition-colors">
                {pillar.title}
              </h3>
              <p className="mt-2 text-sm text-zinc-300 leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="mt-14 sm:mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-red-950/20 via-card/90 to-red-950/20 border border-red-500/25 backdrop-blur-xl">
          <div className="text-center sm:text-left">
            <h3 className="font-display text-3xl font-bold uppercase leading-none text-white">
              Already riding a ROHI?
            </h3>
            <p className="text-sm text-zinc-400 mt-2">
              We would love to hear about your bike: your daily route, your mileage, your stories.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={SHARE_STORY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-semibold text-sm tracking-wide shadow-[0_0_20px_rgba(255,30,39,0.5)] transition-all hover:scale-105 active:scale-95"
            >
              Share your story
            </a>
            <Link
              href="/contact"
              className="px-6 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-200 hover:text-white font-semibold text-sm tracking-wide border border-white/15 transition-all"
            >
              Find a dealer
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
