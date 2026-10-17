"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BrandLogo from "@/components/BrandLogo";
import { BIKE_SERIES, LINEUP, bikeHref } from "@/data/bikes";
import { PRODUCT_FAMILIES } from "@/lib/site";

const VEHICLE_CATEGORIES = ["ALL", ...BIKE_SERIES];

export default function ModelsPage() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const filteredModels =
    selectedCategory === "ALL" ? LINEUP : LINEUP.filter((m) => m.series === selectedCategory);

  return (
    <div className="relative min-h-screen bg-canvas text-white flex flex-col justify-between selection:bg-red-600 selection:text-white overflow-x-clip">
      {/* Background ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[650px] bg-gradient-to-b from-red-950/10 via-elevated/30 to-transparent blur-[140px]" />
        <div className="absolute bottom-0 left-0 w-[750px] h-[750px] bg-red-950/[0.08] blur-[160px]" />
      </div>

      <Navbar />

      <main className="relative z-10 flex-1 max-w-[1600px] mx-auto w-full px-6 md:px-12 lg:px-16 py-10 md:py-14">
        {/* Page header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 mb-10 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3 font-mono text-xs text-red-400 uppercase tracking-[0.2em]">
              <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_#ff1e27]" />
              <span>2026 lineup</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold uppercase leading-[0.92] text-white">
              ROHI motorcycles
            </h1>
            <p className="text-zinc-400 text-base md:text-lg mt-4 max-w-2xl leading-relaxed">
              70cc and 100cc commuters and an electric bike, built by Rehman Auto Industry in Bahawalpur and sold
              through 300+ dealers across Pakistan.
            </p>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            {VEHICLE_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                aria-pressed={selectedCategory === cat}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-[0.12em] transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-red-600 text-white shadow-[0_0_15px_rgba(255,30,39,0.5)]"
                    : "bg-white/[0.05] border border-white/10 text-zinc-400 hover:text-white hover:border-white/20"
                }`}
              >
                {cat === "ALL" ? "All models" : cat.replace(" SERIES", "").replace("ELECTRIC EV", "Electric")}
              </button>
            ))}
          </div>
        </div>

        {/* Model cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
          {filteredModels.map((model) => (
            <Link
              key={model.id}
              href={bikeHref(model)}
              className="glass-card-frosted group relative p-6 flex flex-col justify-between hover:border-red-500/50"
            >
              <div className="flex items-center justify-between w-full mb-2">
                <div className="relative h-6 w-16 opacity-85 group-hover:opacity-100 transition-opacity">
                  <BrandLogo sizes="64px" className="object-contain object-left filter drop-shadow-[0_0_6px_var(--logo-glow)]" />
                </div>
                <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-[0.16em] px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/10">
                  {model.category}
                </span>
              </div>

              <div className="relative w-full h-52 sm:h-56 md:h-60 my-4 flex items-center justify-center">
                <Image
                  src={model.image}
                  alt={`${model.name} motorcycle`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-contain p-1 group-hover:scale-105 transition-transform duration-700 ease-out drop-shadow-[0_15px_25px_rgb(0_0_0/calc(0.85*var(--shade)))]"
                />
              </div>

              <div className="mt-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-1 h-6 bg-red-600 rounded-full shadow-[0_0_8px_#ff1e27]" />
                  <h2 className="font-display text-3xl font-bold uppercase leading-none text-white group-hover:text-red-400 transition-colors">
                    {model.name}
                  </h2>
                </div>
                <p className="mt-3 text-sm text-zinc-400 leading-relaxed line-clamp-2">{model.description}</p>

                <dl className="mt-4 grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <dt className="font-mono uppercase tracking-[0.14em] text-zinc-500">Engine</dt>
                    <dd className="mt-0.5 text-zinc-200 font-medium">{model.engine}</dd>
                  </div>
                  <div>
                    <dt className="font-mono uppercase tracking-[0.14em] text-zinc-500">
                      {model.series === "ELECTRIC EV" ? "Range" : "Mileage"}
                    </dt>
                    <dd className="mt-0.5 text-zinc-200 font-medium">{model.mileage}</dd>
                  </div>
                </dl>

                <span className="mt-5 inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-red-600 group-hover:bg-red-500 text-white text-xs font-semibold uppercase tracking-[0.14em] shadow-[0_0_15px_rgba(255,30,39,0.5)] transition-all">
                  View model
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}

          {selectedCategory === "ALL" && (
            <div className="glass-card-frosted relative p-6 flex flex-col items-center justify-center text-center min-h-[420px] overflow-hidden border-dashed !border-red-500/40">
              <div className="absolute inset-0 m-auto w-64 h-64 rounded-full bg-red-600/15 blur-3xl pointer-events-none" aria-hidden="true" />
              <span className="relative font-mono text-[11px] uppercase tracking-[0.2em] text-red-400 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30">
                Coming soon
              </span>
              <h2 className="relative mt-6 font-display text-5xl md:text-6xl font-extrabold uppercase leading-[0.9] text-white">
                Something big
                <span className="block font-serif normal-case italic font-normal text-red-500">is coming soon</span>
              </h2>
              <p className="relative mt-5 max-w-xs text-sm text-zinc-400 leading-relaxed">
                New ROHI models are on the way. Follow us or ask your dealer to be the first to know.
              </p>
            </div>
          )}
        </div>

        {/* Full product range from the company profile */}
        <section className="mt-20 md:mt-28 border-t border-white/10 pt-12">
          <div className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-red-400">Full range</span>
            <h2 className="mt-2 font-display text-4xl md:text-5xl font-bold uppercase leading-none text-white">
              The complete ROHI range
            </h2>
            <p className="mt-4 text-base text-zinc-400 leading-relaxed">
              Beyond the 2026 showcase models, ROHI builds variants for every kind of rider and business. Ask your
              nearest dealer about availability.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PRODUCT_FAMILIES.map((family) => (
              <div key={family.title} className="rounded-2xl p-6 bg-white/[0.03] border border-white/10">
                <h3 className="font-display text-2xl font-bold uppercase text-white">{family.title}</h3>
                <ul className="mt-4 space-y-2 text-sm text-zinc-300">
                  {family.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-red-950/20 via-card/90 to-red-950/20 border border-red-500/25">
            <div>
              <h3 className="font-display text-3xl font-bold uppercase leading-none text-white">Prices &amp; availability</h3>
              <p className="mt-2 text-sm text-zinc-400">
                Prices vary by city and change from time to time. Your nearest ROHI dealer will give you the latest
                price.
              </p>
            </div>
            <Link
              href="/contact"
              className="shrink-0 px-6 py-3 rounded-full bg-red-600 hover:bg-red-500 text-white text-sm font-semibold tracking-wide shadow-[0_0_20px_rgba(255,30,39,0.5)] transition-all"
            >
              Contact a dealer
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
