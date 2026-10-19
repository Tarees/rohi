"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { LINEUP, bikeHref } from "@/data/bikes";
import BrandLogo from "@/components/BrandLogo";

// Auto-rotation speed in degrees per second
const AUTO_SPEED = 11.7;

const cylinderTransform = (angle: number) => `rotateX(-6deg) rotateY(${angle.toFixed(2)}deg)`;

interface CarouselControls {
  togglePause: () => void;
  snapTo: (angle: number) => void;
  angle: () => number;
  dragStart: () => void;
  dragBy: (deg: number) => void;
  dragEnd: () => void;
}

export default function Product3DCarousel() {
  // One extra slot after the lineup for the "coming soon" teaser card
  const totalItems = LINEUP.length + 1;
  const anglePerItem = 360 / totalItems;

  // React only re-renders when the front card or the paused state changes; the rotation itself
  // is a Web Animation on the cylinder, so the GPU spins it with no per-frame JavaScript.
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [radius, setRadius] = useState(500);

  const sectionRef = useRef<HTMLElement>(null);
  const cylinderRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<CarouselControls | null>(null);
  const draggingRef = useRef(false);
  const startXRef = useRef(0);
  const wasDraggedRef = useRef(false);

  // Responsive radius calculation (compact scale)
  useEffect(() => {
    const updateRadius = () => {
      if (window.innerWidth < 640) {
        setRadius(230);
      } else if (window.innerWidth < 1024) {
        setRadius(310);
      } else {
        setRadius(390);
      }
    };
    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  // Rotation controller
  useEffect(() => {
    const el = cylinderRef.current;
    const section = sectionRef.current;
    if (!el || !section) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let base = 0; // resting angle (the static style) when nothing is animating
    let spin: Animation | null = null; // endless auto-rotation
    let spinFrom = 0;
    let snap: Animation | null = null; // short eased turn to a card
    let paused = false;
    let dragging = false;
    let visible = false;
    let indexTimer = 0;

    const angle = () => {
      if (spin) return spinFrom - (Number(spin.currentTime ?? 0) / 1000) * AUTO_SPEED;
      return base; // during a snap, base already holds the target
    };

    const updateIndex = (a: number) => {
      const normalized = ((-a % 360) + 360) % 360;
      setActiveIndex(Math.round(normalized / anglePerItem) % totalItems);
    };

    const setStatic = (a: number) => {
      base = a;
      el.style.transform = cylinderTransform(a);
    };

    // Freeze wherever the cylinder currently is
    const stop = () => {
      const a = angle();
      spin?.cancel();
      snap?.cancel();
      spin = snap = null;
      setStatic(a);
    };

    const startSpin = () => {
      if (spin || snap || paused || dragging || !visible || reduceMotion) return;
      spinFrom = base;
      spin = el.animate([{ transform: cylinderTransform(base) }, { transform: cylinderTransform(base - 360) }], {
        duration: (360 / AUTO_SPEED) * 1000,
        iterations: Infinity,
      });
    };

    const snapTo = (target: number) => {
      const from = angle();
      spin?.cancel();
      snap?.cancel();
      spin = null;
      setStatic(target);
      updateIndex(target);
      const anim = el.animate([{ transform: cylinderTransform(from) }, { transform: cylinderTransform(target) }], {
        duration: 650,
        easing: "cubic-bezier(0.16, 1, 0.3, 1)",
      });
      snap = anim;
      anim.onfinish = () => {
        if (snap !== anim) return;
        snap = null;
        startSpin();
      };
    };

    controlsRef.current = {
      angle,
      snapTo,
      togglePause: () => {
        paused = !paused;
        setIsPaused(paused);
        if (paused) stop();
        else startSpin();
      },
      dragStart: () => {
        stop();
        dragging = true;
      },
      dragBy: (deg: number) => {
        setStatic(base + deg);
        updateIndex(base);
      },
      dragEnd: () => {
        if (!dragging) return;
        dragging = false;
        startSpin();
      },
    };

    // Run only while on screen; the front-card label is refreshed a few times a second
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      window.clearInterval(indexTimer);
      if (visible) {
        startSpin();
        indexTimer = window.setInterval(() => spin && updateIndex(angle()), 200);
      } else {
        stop();
      }
    });
    observer.observe(section);

    return () => {
      observer.disconnect();
      window.clearInterval(indexTimer);
      spin?.cancel();
      snap?.cancel();
      controlsRef.current = null;
    };
  }, [anglePerItem, totalItems]);

  // Pause from a card click: the controller decides whether it is already paused
  const pause = () => {
    if (!isPaused) controlsRef.current?.togglePause();
  };

  // Drag interaction handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    wasDraggedRef.current = false;
    startXRef.current = e.clientX;
    controlsRef.current?.dragStart();
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    const deltaX = e.clientX - startXRef.current;
    if (Math.abs(deltaX) > 4) {
      wasDraggedRef.current = true;
    }
    startXRef.current = e.clientX;
    controlsRef.current?.dragBy(deltaX * 0.45);
  };

  const handlePointerUp = () => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    controlsRef.current?.dragEnd();
  };

  // Only stops/toggles when clicked
  const handleStageClick = () => {
    // If it was a drag, don't toggle pause
    if (wasDraggedRef.current) return;
    controlsRef.current?.togglePause();
  };

  const rotateTo = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const controls = controlsRef.current;
    if (wasDraggedRef.current || !controls) return;
    // Turn the shortest way round to bring this card to the front
    const current = controls.angle();
    const desired = -index * anglePerItem;
    const delta = ((((desired - current) % 360) + 540) % 360) - 180;
    // Clicking a card pauses the rotation on that product
    pause();
    controls.snapTo(current + delta);
  };

  const handlePrev = () => {
    const controls = controlsRef.current;
    if (controls) controls.snapTo(Math.round(controls.angle() / anglePerItem) * anglePerItem + anglePerItem);
  };

  const handleNext = () => {
    const controls = controlsRef.current;
    if (controls) controls.snapTo(Math.round(controls.angle() / anglePerItem) * anglePerItem - anglePerItem);
  };

  return (
    <section ref={sectionRef} data-choreo="true" className="relative z-20 w-full pt-8 sm:pt-12 pb-16 sm:pb-24 md:pb-28 bg-canvas overflow-hidden select-none">
      {/* ArtCraft-style tactical hairline rule */}
      <div data-draw-rule="true" className="w-full h-px bg-white/10 mb-8 sm:mb-12" />

      {/* Background Ambience & Lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-red-950/20 blur-[140px] rounded-full" />
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[550px] h-[180px] bg-red-600/10 blur-[90px] rounded-full" />
      </div>

      <div className="max-w-[1500px] mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center">
        {/* Tactical Eyebrow & Title */}
        <div className="w-full flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 md:mb-10">
          <div>
            <div data-draw-eyebrow="true" className="flex items-center gap-2 text-zinc-500 font-mono text-[11px] tracking-[0.25em] uppercase mb-1.5">
              <span data-draw-tick="true" className="text-red-500 font-bold">+</span>
              <span>02 · The 2026 lineup</span>
            </div>
            <h2 data-reveal="true" className="font-display text-4xl sm:text-5xl font-bold uppercase leading-[0.95] tracking-[0.005em] text-white">
              Our lineup, <span className="font-serif normal-case italic font-normal text-red-500">more on the way</span>
            </h2>
            <p data-reveal="true" className="mt-3 max-w-md text-sm text-zinc-400">
              Two 100cc, two 70cc and one electric model, all built at our Bahawalpur plant. New models are joining
              the range soon.
            </p>
          </div>
          <div data-reveal="true" className="flex items-center gap-2.5 text-xs font-mono text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            <span className="tracking-[0.18em] uppercase text-[11px]">Drag to rotate · Click a bike</span>
          </div>
        </div>
        {/* 3D CAROUSEL STAGE CONTAINER (Compact refined proportions) */}
        <div
          onClick={handleStageClick}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className="relative w-full h-[360px] sm:h-[420px] md:h-[480px] flex items-center justify-center cursor-grab active:cursor-grabbing touch-none"
          style={{ perspective: "1200px" }}
          title={isPaused ? "Click to resume rotation" : "Click to pause rotation"}
        >
          {/* Circular 3D Neon Stage Ground Plane */}
          <div
            className="absolute bottom-2 sm:bottom-4 md:bottom-6 w-[340px] sm:w-[480px] md:w-[600px] h-[100px] md:h-[140px] rounded-full pointer-events-none"
            style={{
              transform: "rotateX(75deg)",
              background:
                "radial-gradient(circle, rgba(255,30,39,0.25) 0%, rgba(255,30,39,0.08) 50%, transparent 75%)",
              border: "1.5px dashed rgba(255,30,39,0.35)",
              boxShadow: "0 0 40px rgba(255,30,39,0.25)",
            }}
          />

          {/* ROTATING 3D CYLINDER */}
          <div
            ref={cylinderRef}
            className="relative w-0 h-0 will-change-transform"
            style={{ transformStyle: "preserve-3d", transform: "rotateX(-6deg) rotateY(0deg)" }}
          >
            {LINEUP.map((product, idx) => {
              const itemAngle = idx * anglePerItem;
              const isFront = idx === activeIndex;

              return (
                <div
                  key={product.id}
                  onClick={(e) => rotateTo(idx, e)}
                  className="absolute w-[190px] sm:w-[225px] md:w-[250px] h-[250px] sm:h-[285px] md:h-[310px] -left-[95px] sm:-left-[112px] md:-left-[125px] -top-[125px] sm:-top-[142px] md:-top-[155px] transition-all duration-300 cursor-pointer"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                  }}
                >
                  {/* Frosted Glass Card Pedestal */}
                  <div
                    className={`carousel-card relative w-full h-full p-3.5 sm:p-4 flex flex-col justify-between ${
                      isFront
                        ? "!border-red-500/70 !shadow-[0_0_35px_rgba(255,30,39,0.35)] scale-105 !bg-elevated"
                        : "carousel-card-dim"
                    }`}
                  >
                    {/* Top Row: Mini ROHI Logo & Code Badge */}
                    <div className="flex items-center justify-between w-full">
                      <div className="relative h-4 w-12 opacity-80">
                        <BrandLogo sizes="48px" className="object-contain object-left" />
                      </div>
                      <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest px-1.5 py-0.5 rounded-full bg-white/[0.05] border border-white/10">
                        {product.code}
                      </span>
                    </div>

                    {/* Bike Isolated PNG Showcase */}
                    <div className="relative w-full h-32 sm:h-36 md:h-40 my-1 flex items-center justify-center">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 190px, 250px"
                        loading="eager"
                        className="object-contain drop-shadow-[0_14px_25px_rgb(0_0_0/calc(0.9*var(--shade)))]"
                      />
                    </div>

                    {/* Bottom Info: Name & Quick Metric */}
                    <div className="pt-1.5 text-left border-t border-white/10">
                      <span className="text-[10px] font-mono text-red-400 font-semibold uppercase tracking-[0.16em] block">
                        {product.category}
                      </span>
                      <h3 className="font-display text-xl sm:text-2xl font-bold uppercase leading-tight text-white truncate">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between mt-0.5 text-[11px] sm:text-xs">
                        <span className="text-zinc-300">{product.mileage}</span>
                        {isFront ? (
                          <Link
                            href={bikeHref(product)}
                            onClick={(e) => e.stopPropagation()}
                            className="font-semibold text-red-400 hover:text-red-300"
                          >
                            View model →
                          </Link>
                        ) : (
                          <span className="text-zinc-400">{product.engine.split(" ")[0]}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            <div
              onClick={(e) => rotateTo(LINEUP.length, e)}
              className="absolute w-[190px] sm:w-[225px] md:w-[250px] h-[250px] sm:h-[285px] md:h-[310px] -left-[95px] sm:-left-[112px] md:-left-[125px] -top-[125px] sm:-top-[142px] md:-top-[155px] transition-all duration-300 cursor-pointer"
              style={{
                transformStyle: "preserve-3d",
                transform: `rotateY(${LINEUP.length * anglePerItem}deg) translateZ(${radius}px)`,
              }}
            >
              <ComingSoonCard isFront={activeIndex === LINEUP.length} />
            </div>
          </div>
        </div>
      </div>

      {/* Little arrow buttons at bottom-right to rotate carousel */}
      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-8 z-30 flex items-center gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          title="Rotate Left"
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-elevated/90 hover:bg-red-600 border border-white/20 hover:border-red-500 text-zinc-300 hover:text-white flex items-center justify-center backdrop-blur-md transition-all duration-200 shadow-[0_4px_15px_rgb(0_0_0/calc(0.6*var(--shade)))] hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Previous Model"
        >
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          title="Rotate Right"
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-elevated/90 hover:bg-red-600 border border-white/20 hover:border-red-500 text-zinc-300 hover:text-white flex items-center justify-center backdrop-blur-md transition-all duration-200 shadow-[0_4px_15px_rgb(0_0_0/calc(0.6*var(--shade)))] hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Next Model"
        >
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}

function ComingSoonCard({ isFront }: { isFront: boolean }) {
  return (
    <div
      className={`carousel-card relative w-full h-full p-3.5 sm:p-4 flex flex-col justify-between overflow-hidden ${
        isFront
          ? "!border-red-500/70 !shadow-[0_0_35px_rgba(255,30,39,0.35)] scale-105 !bg-elevated"
          : "carousel-card-dim"
      }`}
    >
      <div className="flex items-center justify-between w-full">
        <div className="relative h-4 w-12 opacity-80">
          <BrandLogo sizes="48px" className="object-contain object-left" />
        </div>
        <span className="font-mono text-[9px] text-red-400 uppercase tracking-widest px-1.5 py-0.5 rounded-full bg-red-500/10 border border-red-500/30">
          New
        </span>
      </div>

      <div className="relative flex-1 flex flex-col items-center justify-center text-center">
        <div className="absolute inset-0 m-auto w-32 h-32 rounded-full bg-red-600/20 blur-2xl" aria-hidden="true" />
        <span className="relative font-display text-6xl font-extrabold leading-none text-white/10" aria-hidden="true">
          ?
        </span>
      </div>

      <div className="pt-1.5 text-left border-t border-white/10">
        <span className="text-[10px] font-mono text-red-400 font-semibold uppercase tracking-[0.16em] block">
          Coming soon
        </span>
        <h3 className="font-display text-xl sm:text-2xl font-bold uppercase leading-tight text-white">
          Something big is coming
        </h3>
      </div>
    </div>
  );
}
