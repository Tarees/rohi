"use client";

import { usePathname } from "next/navigation";
import BrandLogo from "@/components/BrandLogo";

export default function BackgroundLogo() {
  const pathname = usePathname();

  // Do NOT render on the main landing page ("/")
  if (pathname === "/") return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden select-none"
    >
      <div className="relative w-[85vw] max-w-[1100px] aspect-[16/7] opacity-[0.06] filter blur-[3px] scale-110">
        {/* Faint, blurred watermark: a small rendition is enough, and it should never compete for page-load priority */}
        <BrandLogo sizes="640px" className="object-contain" />
      </div>
    </div>
  );
}
