"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { getBikes, HERO_BIKE_IMAGE, type Bike } from "@/data/bikes";
import { subscribeScroll } from "@/lib/scroll";

// Orbit layout: each ring carries the full 2026 lineup, in a different order so the
// same model never travels side by side on both rings
const INNER_ORBIT_CARDS = getBikes(["rl100", "sr70", "ebike", "rf100", "r170"]);
const OUTER_ORBIT_CARDS = getBikes(["r170", "rf100", "rl100", "sr70", "ebike"]);

// Seconds per full lap (inner clockwise, outer counter-clockwise; see .orbit-card-* in globals.css)
const ORBIT_DURATION = { inner: 65, outer: 85 };

// Red beams sweeping around the orbit rings (glow gradients are defined in the rings SVG)
const BEAMS = [
  { id: "redTrail1", r: 330, width: 2.5, dash: "280 1790", className: "hero-beam-1" },
  { id: "redTrail2", r: 490, width: 3, dash: "380 2690", className: "hero-beam-2" },
  { id: "redTrail3", r: 630, width: 2.5, dash: "420 3530", className: "hero-beam-3" },
];

// Each card rides a CSS orbit animation (rotate → translate → counter-rotate keeps it upright),
// so the motion runs on the compositor with no per-frame JavaScript. A negative delay sets its
// starting position on the ring; a second, slower animation adds a gentle drift.
function OrbitCard({
  bike,
  ring,
  index,
  count,
  onHover,
}: {
  bike: Bike;
  ring: "inner" | "outer";
  index: number;
  count: number;
  onHover: (bike: Bike | null) => void;
}) {
  return (
    <div
      className={`orbit-card orbit-card-${ring} absolute top-1/2 left-1/2 pointer-events-auto`}
      style={{ animationDelay: `${(-index / count) * ORBIT_DURATION[ring]}s` }}
    >
      <div className="orbit-drift" style={{ animationDelay: `${-index * 1.3}s` }}>
        {/* Always-upright card with jelly hover */}
        <div
          className="jelly-card relative w-[112px] h-[70px] sm:w-[126px] sm:h-[78px] md:w-[138px] md:h-[86px] rounded-xl p-2 bg-card/95 hover:bg-card-hover border border-white/15 flex flex-col justify-between shadow-[0_12px_28px_rgb(0_0_0/calc(0.85*var(--shade)))] group cursor-pointer"
          onMouseEnter={() => onHover(bike)}
          onMouseLeave={() => onHover(null)}
        >
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-t-xl" />

          <div className="flex items-center justify-between w-full pointer-events-none">
            <span className="text-[9px] font-mono text-zinc-400 tracking-wider">{bike.year}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_6px_#ff1e27]" />
          </div>

          <div className="relative w-full h-8 sm:h-10 md:h-12 flex items-center justify-center">
            <Image
              src={bike.image}
              alt={bike.name}
              fill
              sizes="140px"
              className="object-contain drop-shadow-[0_8px_14px_rgb(0_0_0/calc(0.95*var(--shade)))] group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="flex items-center justify-between w-full border-t border-white/10 pt-0.5">
            <span className="text-[9px] font-mono font-semibold text-zinc-200 tracking-wide truncate">
              {bike.code}
            </span>
            <span className="text-[9px] font-mono text-red-400 font-medium">
              {bike.category.split(" ")[0]}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Visual typewriter line: the first part in the display face, the rest as a serif accent
const TAGLINE_LEAD = "Built in Bahawalpur, ";
const fullTagline = `${TAGLINE_LEAD}ridden across Pakistan.`;

// Own component so each typed character re-renders only this line, not the whole hero
function Typewriter({ start }: { start: boolean }) {
  const [typedChars, setTypedChars] = useState(0);

  useEffect(() => {
    if (!start || typedChars >= fullTagline.length) return;
    const charTimer = setTimeout(() => setTypedChars((prev) => prev + 1), 35);
    return () => clearTimeout(charTimer);
  }, [start, typedChars]);

  return (
    <>
      <div aria-hidden="true" className="min-h-[34px] sm:min-h-[40px] flex items-center justify-center">
        <p className="text-2xl sm:text-3xl md:text-[2.1rem] leading-none text-white">
          <span className="font-display font-bold uppercase tracking-[0.01em]">
            {fullTagline.slice(0, Math.min(typedChars, TAGLINE_LEAD.length))}
          </span>
          <span className="font-serif italic text-red-500">
            {typedChars > TAGLINE_LEAD.length ? fullTagline.slice(TAGLINE_LEAD.length, typedChars) : ""}
          </span>
          {typedChars < fullTagline.length && (
            <span className="inline-block w-1.5 h-5 sm:h-6 ml-1 bg-red-500 typewriter-cursor align-middle shadow-[0_0_8px_#ff1e27]" />
          )}
        </p>
      </div>

      <p
        className={`text-sm text-zinc-400 mt-2 max-w-md transition-opacity duration-700 delay-300 ${
          typedChars >= 15 ? "opacity-100" : "opacity-0"
        }`}
      >
        70cc, 100cc and electric motorcycles by Rehman Auto Industry
      </p>
    </>
  );
}

export default function HeroSection() {
  // Entrance animation states
  const [bikeEntered, setBikeEntered] = useState(false);
  const [textRevealed, setTextRevealed] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<Bike | null>(null);

  const heroRef = useRef<HTMLElement | null>(null);
  // Refs for ArtCraft-style scroll parallax camera pull-back
  const centerStageRef = useRef<HTMLDivElement | null>(null);
  // Giant "ROHI" word lives in its own layer *below* the orbit cards, mirroring the
  // center stage's box and scroll transforms so it stays locked behind the bike
  const wordStageRef = useRef<HTMLDivElement | null>(null);
  const wordRef = useRef<HTMLDivElement | null>(null);
  const bikeStageRef = useRef<HTMLDivElement | null>(null);
  const orbitsRef = useRef<HTMLDivElement | null>(null);
  const cardsOrbitRef = useRef<HTMLDivElement | null>(null);
  const ambientGlowRef = useRef<HTMLDivElement | null>(null);
  const bottomHintRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // 1. Entrance sequence
    const bikeTimer = setTimeout(() => {
      setBikeEntered(true);
    }, 120);

    const textTimer = setTimeout(() => {
      setTextRevealed(true);
    }, 650);

    // Keep the word layer covering the same box as the center stage, word centred on the bike
    const syncWordLayer = () => {
      const stage = centerStageRef.current;
      const bikeStage = bikeStageRef.current;
      const wordStage = wordStageRef.current;
      const word = wordRef.current;
      if (!stage || !bikeStage || !wordStage || !word) return;
      wordStage.style.top = `${stage.offsetTop}px`;
      wordStage.style.height = `${stage.offsetHeight}px`;
      word.style.top = `${bikeStage.offsetTop + bikeStage.offsetHeight / 2}px`;
    };
    syncWordLayer();
    const layoutObserver = new ResizeObserver(syncWordLayer);
    if (centerStageRef.current) layoutObserver.observe(centerStageRef.current);
    if (bikeStageRef.current) layoutObserver.observe(bikeStageRef.current);

    // 2. Pause the orbit and beam animations while the hero is off screen
    const hero = heroRef.current;
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      hero?.classList.toggle("hero-paused", !entry.isIntersecting);
    });
    if (hero) visibilityObserver.observe(hero);

    // 3. Scroll parallax (camera pull-back): transform and opacity only, written only when the
    //    scroll position changes, so the compositor does the work
    let lastProgress = -1;
    const unsubscribeScroll = subscribeScroll(({ y }) => {
      const heroThreshold = Math.max(window.innerHeight * 0.85, 400);
      const progress = Math.min(Math.max(y / heroThreshold, 0), 1);
      if (progress === lastProgress) return;
      lastProgress = progress;

      // A. Center stage and word layer: scale down, drift down, fade out
      const stageTransform = `translate3d(0, ${(progress * 65).toFixed(1)}px, 0) scale(${(1 - progress * 0.16).toFixed(3)})`;
      const stageOpacity = Math.max(0, 1 - progress * 1.3).toFixed(3);
      for (const el of [centerStageRef.current, wordStageRef.current]) {
        if (!el) continue;
        el.style.transform = stageTransform;
        el.style.opacity = stageOpacity;
      }

      // B. Orbit rings and cards: expand outward and dissolve
      const expansion = `scale(${(1 + progress * 0.28).toFixed(3)})`;
      if (orbitsRef.current) {
        orbitsRef.current.style.transform = expansion;
        orbitsRef.current.style.opacity = Math.max(0, 1 - progress * 1.25).toFixed(3);
      }
      if (cardsOrbitRef.current) {
        cardsOrbitRef.current.style.transform = expansion;
        cardsOrbitRef.current.style.opacity = Math.max(0, 1 - progress * 1.3).toFixed(3);
      }

      // C. Ambient glow and scroll hint fade out
      if (ambientGlowRef.current) {
        ambientGlowRef.current.style.opacity = Math.max(0, 1 - progress * 1.15).toFixed(3);
      }
      if (bottomHintRef.current) {
        bottomHintRef.current.style.opacity = Math.max(0, 1 - progress * 3.5).toFixed(3);
      }
    });

    return () => {
      clearTimeout(bikeTimer);
      clearTimeout(textTimer);
      unsubscribeScroll();
      layoutObserver.disconnect();
      visibilityObserver.disconnect();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative w-full h-[calc(100vh-76px)] min-h-[580px] max-h-[960px] flex flex-col justify-between items-center overflow-hidden bg-canvas select-none pt-2 pb-6 sm:pb-8"
    >
      {/* 1. BACKGROUND AMBIENT RED GLOW & VIGNETTE */}
      <div ref={ambientGlowRef} className="absolute inset-0 pointer-events-none overflow-hidden z-0 will-change-[opacity]">
        {/* Soft glows as radial gradients: the look of big blur() blobs at a fraction of the paint cost */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1150px] h-[800px] max-w-[160vw]"
          style={{ background: "radial-gradient(closest-side, rgb(130 24 26 / 0.22), transparent)" }}
        />
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[480px] max-w-[140vw]"
          style={{ background: "radial-gradient(closest-side, rgb(231 0 11 / 0.1), transparent)" }}
        />
        <div className="absolute inset-0 bg-radial from-transparent via-canvas/40 to-canvas pointer-events-none" />
        {/* Overhead studio spotlight (light theme only; --spotlight is none in dark) */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "var(--spotlight)" }} />
      </div>

      {/* 2. CONCENTRIC ORBIT RINGS WITH MOVING RED BEAMS THAT FADE AWAY */}
      <div ref={orbitsRef} className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 will-change-[transform,opacity]">
        <div className="relative shrink-0 w-[1300px] h-[1300px] flex items-center justify-center scale-[0.6] sm:scale-[0.75] md:scale-[0.88] lg:scale-100">
          <svg className="w-full h-full" viewBox="0 0 1300 1300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="redTrail1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff1e27" stopOpacity="1" />
                <stop offset="40%" stopColor="#ff1e27" stopOpacity="0.75" />
                <stop offset="75%" stopColor="#ff1e27" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#ff1e27" stopOpacity="0" />
              </linearGradient>

              <linearGradient id="redTrail2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ff2e38" stopOpacity="1" />
                <stop offset="45%" stopColor="#ff1e27" stopOpacity="0.6" />
                <stop offset="85%" stopColor="#ff1e27" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#ff1e27" stopOpacity="0" />
              </linearGradient>

              <linearGradient id="redTrail3" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ff1e27" stopOpacity="1" />
                <stop offset="50%" stopColor="#ff1e27" stopOpacity="0.5" />
                <stop offset="90%" stopColor="#ff1e27" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#ff1e27" stopOpacity="0" />
              </linearGradient>

              <filter id="neonRedGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="6" result="blur1" />
                <feGaussianBlur stdDeviation="2" result="blur2" />
                <feMerge>
                  <feMergeNode in="blur1" />
                  <feMergeNode in="blur2" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Faint Concentric Orbit Guides */}
            <circle cx="650" cy="650" r="190" className="stroke-white/[0.06]" strokeWidth="1" strokeDasharray="3 6" />
            <circle cx="650" cy="650" r="330" className="stroke-white/[0.08]" strokeWidth="1.2" />
            <circle cx="650" cy="650" r="490" className="stroke-white/[0.07]" strokeWidth="1.2" strokeDasharray="4 8" />
            <circle cx="650" cy="650" r="630" className="stroke-white/[0.04]" strokeWidth="1" />

            {/* Radar Coordinates & Lines */}
            <line x1="650" y1="30" x2="650" y2="1270" className="stroke-white/[0.02]" strokeWidth="1" />
            <line x1="30" y1="650" x2="1270" y2="650" className="stroke-white/[0.02]" strokeWidth="1" />
          </svg>

          {/* Each beam's glow is drawn once on its own layer and the layer is rotated,
              so the blur filter is never repainted while the beam travels */}
          {BEAMS.map((beam) => (
            <div key={beam.id} className={`hero-beam ${beam.className}`}>
              <svg className="w-full h-full" viewBox="0 0 1300 1300" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle
                  cx="650"
                  cy="650"
                  r={beam.r}
                  stroke={`url(#${beam.id})`}
                  strokeWidth={beam.width}
                  strokeLinecap="round"
                  strokeDasharray={beam.dash}
                  filter="url(#neonRedGlow)"
                />
              </svg>
            </div>
          ))}
        </div>
      </div>

      {/* 2b. GIANT "ROHI" WORD LAYER: above the orbit rings, below the cards and the bike.
          Its box and scroll transforms mirror the center stage (set in the effect above).
          Font size follows the bike container width per breakpoint (≈0.76× → capital height ≈
          visible bike height), capped at 48vw so it never runs off-screen; the 0.065em lift
          centres the capitals rather than the em box. */}
      <div ref={wordStageRef} aria-hidden="true" className="absolute inset-x-0 top-0 z-[5] pointer-events-none will-change-[transform,opacity]">
        <div
          ref={wordRef}
          className={`absolute inset-x-0 -translate-y-1/2 flex items-center justify-center transition-[opacity,scale] duration-1000 ${
            textRevealed ? "opacity-95 scale-100" : "opacity-0 scale-90"
          }`}
          style={{ filter: "var(--hero-word-glow)" }}
        >
          <span
            className="font-display font-extrabold uppercase text-center leading-none select-none tracking-[0.02em] whitespace-nowrap block -translate-y-[0.065em] text-[min(221px,48vw)] sm:text-[min(313px,48vw)] md:text-[min(397px,48vw)] lg:text-[min(473px,48vw)] xl:text-[min(519px,48vw)]"
            style={{
              backgroundImage: "var(--hero-word-fill)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            ROHI
          </span>
        </div>
      </div>

      {/* 3. ORBITING ROHI CARDS: ALWAYS UPRIGHT */}
      <div ref={cardsOrbitRef} className="hero-orbits absolute inset-0 pointer-events-none z-10 overflow-hidden will-change-[transform,opacity]">
        {INNER_ORBIT_CARDS.map((bike, idx) => (
          <OrbitCard
            key={bike.id}
            bike={bike}
            ring="inner"
            index={idx}
            count={INNER_ORBIT_CARDS.length}
            onHover={setHoveredCard}
          />
        ))}
        {OUTER_ORBIT_CARDS.map((bike, idx) => (
          <OrbitCard
            key={bike.id}
            bike={bike}
            ring="outer"
            index={idx}
            count={OUTER_ORBIT_CARDS.length}
            onHover={setHoveredCard}
          />
        ))}
      </div>

      {/* 4. CENTER STAGE: BIKE, THEN HEADLINE */}
      <div ref={centerStageRef} className="relative z-20 flex-1 w-full flex flex-col items-center justify-center px-4 my-auto will-change-[transform,opacity]">
        {/* Bike stage: measured by the word layer (see syncWordLayer) so "ROHI" centres on the bike */}
        <div ref={bikeStageRef} className="relative w-full flex flex-col items-center justify-center">
          {/* MAIN HERO BIKE */}
          <div
            className={`relative z-20 w-full flex flex-col items-center justify-center transition-all duration-1100 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              bikeEntered
                ? "translate-y-0 opacity-100 scale-100"
                : "translate-y-48 sm:translate-y-64 opacity-0 scale-95"
            }`}
          >
            {/* Proportional bike container */}
            <div className="relative w-[290px] sm:w-[410px] md:w-[520px] lg:w-[620px] xl:w-[680px] h-[180px] sm:h-[256px] md:h-[325px] lg:h-[388px] xl:h-[425px] aspect-[16/10] float-bike-anim flex items-center justify-center">
              {/* Red ground reflection & contact shadow under the wheels (gradients, no blur filters) */}
              <div
                className="absolute -bottom-3 sm:-bottom-4 left-1/2 -translate-x-1/2 w-[80%] h-9 sm:h-11 rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(255,30,39,0.34) 0%, rgba(255,30,39,0.1) 55%, transparent 100%)",
                }}
              />
              <div
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[88%] h-6 sm:h-7 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(closest-side, var(--contact-shadow), transparent)" }}
              />

              {/* CUTOUT TRANSPARENT PNG BIKE */}
              <Image
                src={HERO_BIKE_IMAGE}
                alt="ROHI 100CC Motorcycle"
                fill
                preload
                sizes="(max-width: 640px) 290px, (max-width: 1024px) 520px, 680px"
                className="object-contain drop-shadow-[0_18px_30px_rgb(0_0_0/calc(0.95*var(--shade)))]"
              />
            </div>
          </div>
        </div>

        {/* EDITORIAL TYPEWRITTEN HEADLINE */}
        <div
          className={`relative z-30 flex flex-col items-center text-center mt-3 sm:mt-4 px-4 transition-all duration-700 ${
            textRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          {/* Real page heading for search engines and screen readers; the typewriter below is visual only */}
          <h1 className="sr-only">
            ROHI Motorcycles: 70cc, 100cc and electric motorcycles built in Bahawalpur, ridden across Pakistan
          </h1>

          <Typewriter start={textRevealed} />
        </div>
      </div>

      {/* 5. FLOATING HOVER CARD POPUP WHEN A CARD IS HOVERED */}
      {hoveredCard && (
        <div className="fixed bottom-6 right-6 z-50 pointer-events-none">
          <div className="glass-panel-glow p-3.5 rounded-2xl flex items-center gap-3.5 shadow-2xl border border-red-500/40 bg-card/95 max-w-xs">
            <div className="relative w-16 h-12 bg-white/[0.03] rounded-lg p-1 border border-white/10 flex items-center justify-center">
              <Image src={hoveredCard.image} alt={hoveredCard.name} fill sizes="64px" className="object-contain" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[10px] font-mono text-red-400 uppercase tracking-[0.18em] font-semibold">
                {hoveredCard.category}
              </span>
              <span className="font-display text-lg font-bold uppercase leading-tight text-white">
                {hoveredCard.name}
              </span>
              <span className="text-xs text-zinc-300">
                {hoveredCard.engine} · {hoveredCard.mileage}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 6. BOTTOM SPACING & NAVIGATION LINKS */}
      <div
        ref={bottomHintRef}
        className="relative z-20 w-full px-6 md:px-12 pt-2 flex items-center justify-between text-zinc-500 text-[11px] font-mono tracking-[0.2em] uppercase will-change-[opacity]"
      >
        <div className="hidden sm:flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            2026 Lineup
          </span>
        </div>

        <a
          href="#turntable"
          className="mx-auto flex flex-col items-center gap-1 text-zinc-400 hover:text-white transition-colors cursor-pointer group"
        >
          <span className="text-[10px] tracking-[0.25em] uppercase">Explore</span>
          <svg
            className="w-4 h-4 text-red-500 group-hover:translate-y-1 transition-transform animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>

        <div className="hidden md:flex items-center gap-5 text-zinc-400">
          <Link href="/models" className="hover:text-red-400 transition-colors">
            Models
          </Link>
          <Link href="/contact" className="hover:text-red-400 transition-colors">
            Find a dealer
          </Link>
          <Link href="/about" className="hover:text-red-400 transition-colors">
            About
          </Link>
        </div>
      </div>
    </section>
  );
}
