"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { subscribeScroll } from "@/lib/scroll";
import BrandLogo from "@/components/BrandLogo";
import ThemeToggle from "@/components/ThemeToggle";

interface NavLink {
  href: string;
  label: string;
}

// Desktop order: three links, centered logo, three links
const LEFT_LINKS: NavLink[] = [
  { href: "/contact", label: "Contact Us" },
  { href: "/models", label: "Models" },
  { href: "/blog", label: "Blog" },
];

const RIGHT_LINKS: NavLink[] = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
];

const MOBILE_LINKS: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/models", label: "Models" },
  { href: "/blog", label: "Blog" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  // Section links stay active on their sub-pages (e.g. /models/rohi-rl-100)
  const isActive = (link: NavLink) =>
    pathname === link.href || (link.href !== "/" && pathname.startsWith(`${link.href}/`));

  useEffect(
    () =>
      subscribeScroll(({ y, progress }) => {
        // Only re-renders when crossing the threshold, not on every scroll frame
        setIsScrolled(y > 20);
        if (progressRef.current) {
          progressRef.current.style.transform = `scaleX(${progress})`;
        }
      }),
    []
  );

  const renderDesktopLink = (link: NavLink) => {
    const active = isActive(link);
    return (
      <Link
        key={link.href}
        href={link.href}
        className={`text-[12px] xl:text-[13px] font-semibold tracking-[0.28em] uppercase transition-all duration-200 relative group py-1.5 ${
          active ? "text-white" : "text-zinc-300 hover:text-white"
        }`}
      >
        <span>{link.label}</span>
        <span
          className={`absolute bottom-0 left-0 h-[1.5px] bg-red-500 transition-all duration-300 ${
            active ? "w-full shadow-[0_0_8px_#ff1e27]" : "w-0 group-hover:w-full"
          }`}
        />
      </Link>
    );
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full px-6 md:px-12 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-canvas/85 backdrop-blur-2xl border-b border-white/10 shadow-[0_15px_35px_rgb(0_0_0/calc(0.7*var(--shade)))]"
          : "py-4 md:py-5 bg-canvas/60 backdrop-blur-xl border-b border-white/[0.05]"
      }`}
    >
      {/* Hairline Scroll Progress Indicator */}
      <div
        ref={progressRef}
        className="absolute bottom-0 left-0 w-full h-[1.5px] origin-left bg-gradient-to-r from-red-600 via-red-500 to-amber-500 shadow-[0_0_8px_#ff1e27] pointer-events-none"
        style={{ transform: "scaleX(0)" }}
      />

      <div className="relative max-w-[1550px] mx-auto flex items-center justify-center">
        {/* DESKTOP NAVBAR */}
        <nav className="hidden lg:flex items-center justify-center gap-8 md:gap-11 lg:gap-14 xl:gap-20 w-full">
          {LEFT_LINKS.map(renderDesktopLink)}

          <Link
            href="/"
            aria-label="ROHI home"
            className="group cursor-pointer relative flex items-center justify-center px-2 py-1 transition-transform duration-300 hover:scale-105"
          >
            <div className="relative h-10 md:h-11 w-16 md:w-20 flex items-center justify-center">
              <BrandLogo
                sizes="80px"
                className="object-contain filter drop-shadow-[0_0_12px_var(--logo-glow)] group-hover:drop-shadow-[0_0_20px_var(--logo-glow-strong)] transition-all"
              />
            </div>
          </Link>

          {RIGHT_LINKS.map(renderDesktopLink)}
        </nav>

        {/* Desktop theme switch, pinned to the right edge */}
        <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2">
          <ThemeToggle />
        </div>

        {/* MOBILE HEADER BAR (< lg screens) */}
        <div className="lg:hidden w-full flex items-center justify-between">
          <Link href="/" aria-label="ROHI home" className="relative h-9 w-16">
            <BrandLogo sizes="64px" className="object-contain" />
          </Link>

          <div className="flex items-center gap-2.5">
            <ThemeToggle />
            <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-300 hover:text-white cursor-pointer"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE NAVIGATION DROPDOWN */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 p-5 rounded-2xl bg-panel/95 backdrop-blur-2xl border border-red-500/30 flex flex-col space-y-4">
          {MOBILE_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-left text-sm font-semibold tracking-widest uppercase text-zinc-200 hover:text-red-400 py-1"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="text-left text-sm font-semibold tracking-widest uppercase text-red-400 hover:text-red-300 py-1 border-t border-white/10 pt-3"
          >
            Contact Us
          </Link>
        </div>
      )}
    </header>
  );
}
