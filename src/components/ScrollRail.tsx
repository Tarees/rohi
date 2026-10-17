"use client";

import { useState, useEffect, useRef } from "react";
import { subscribeScroll } from "@/lib/scroll";

interface SectionMarker {
  id: string;
  num: string;
  label: string;
}

const SECTIONS: SectionMarker[] = [
  { id: "hero", num: "01", label: "HOME" },
  { id: "turntable", num: "02", label: "LINEUP" },
  { id: "engineering", num: "03", label: "ENGINEERING" },
  { id: "ownership", num: "04", label: "OWNERSHIP" },
];

export default function ScrollRail() {
  const [activeSection, setActiveSection] = useState("hero");
  const percentRef = useRef<HTMLSpanElement>(null);

  useEffect(
    () =>
      subscribeScroll(({ progress }) => {
        // Percentage is written straight to the DOM; React only re-renders when the active section changes
        if (percentRef.current) {
          percentRef.current.textContent = `${Math.round(progress * 100).toString().padStart(2, "0")}%`;
        }

        for (let i = SECTIONS.length - 1; i >= 0; i--) {
          const sec = document.getElementById(SECTIONS[i].id);
          if (sec && sec.getBoundingClientRect().top <= window.innerHeight * 0.45) {
            setActiveSection(SECTIONS[i].id);
            break;
          }
        }
      }),
    []
  );

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: HTMLElement | string) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(el);
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <aside
      aria-label="HUD Scroll Rail"
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end pointer-events-none select-none"
    >
      <div className="pointer-events-auto flex flex-col items-end gap-3.5 bg-panel/80 backdrop-blur-md px-3 py-4 rounded-xl border border-white/10 shadow-[0_10px_35px_rgb(0_0_0/calc(0.6*var(--shade)))]">
        {/* Monospace Scroll Depth % */}
        <div className="flex items-center gap-2 mb-1 border-b border-white/10 pb-2.5 w-full justify-between">
          <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase">SCROLL</span>
          <span ref={percentRef} className="text-[10px] font-mono font-bold text-red-500 tabular-nums">
            00%
          </span>
        </div>

        {/* Section Markers */}
        <div className="relative flex flex-col gap-2.5 pl-3 border-l border-white/10">
          {SECTIONS.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => scrollTo(sec.id)}
                className="group relative flex items-center gap-2.5 text-right cursor-pointer py-0.5 transition-all"
                title={`Jump to ${sec.label}`}
              >
                {/* Active Indicator dot */}
                <span
                  className={`absolute -left-[17px] w-2 h-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? "bg-red-500 shadow-[0_0_10px_rgba(255,30,39,0.9)] scale-125"
                      : "bg-zinc-700 group-hover:bg-zinc-500 scale-75"
                  }`}
                />

                {/* Section Index */}
                <span
                  className={`font-mono text-[10px] font-bold transition-colors ${
                    isActive ? "text-red-400" : "text-zinc-500 group-hover:text-zinc-300"
                  }`}
                >
                  {sec.num}
                </span>

                {/* Section Label */}
                <span
                  className={`text-[9px] font-mono tracking-wider transition-colors uppercase ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-zinc-500 group-hover:text-zinc-300"
                  }`}
                >
                  {sec.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
