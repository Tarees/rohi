"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";

interface SmoothScrollProps {
  children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    // Initialize Lenis for ArtCraft-style momentum scrolling
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
      infinite: false,
      anchors: true,
    });

    // Drive Lenis only while it is animating a scroll. A permanent rAF loop would force a
    // full main-thread frame 60+ times a second even when the page is still.
    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = lenis.isScrolling ? requestAnimationFrame(raf) : 0;
    };
    const wake = () => {
      if (rafId) return;
      lenis.time = 0; // first frame after a pause advances by 0 ms instead of the whole idle gap
      rafId = requestAnimationFrame(raf);
    };

    // Lenis only smooths the mouse wheel (touch, keys and the scrollbar stay native). Its wheel
    // handler is registered first, so by the time this runs it already has a scroll target.
    window.addEventListener("wheel", wake, { passive: true });

    // Programmatic scrolls (scroll rail, anchor links) also need the loop running
    const scrollTo = lenis.scrollTo.bind(lenis);
    lenis.scrollTo = (...args: Parameters<Lenis["scrollTo"]>) => {
      scrollTo(...args);
      wake();
    };

    // Provide lenis instance globally for smooth anchor navigation
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    return () => {
      window.removeEventListener("wheel", wake);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  return <>{children}</>;
}
