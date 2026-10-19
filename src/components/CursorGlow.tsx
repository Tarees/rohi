"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function CursorGlow() {
  const pathname = usePathname();
  const glowRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });

  const isMainPage = pathname === "/";

  useEffect(() => {
    if (isMainPage) return;

    // The follow loop only runs while the glow is catching up with the pointer
    let animId = 0;

    const handlePointerMove = (e: PointerEvent) => {
      posRef.current.targetX = e.clientX;
      posRef.current.targetY = e.clientY;
      // If first movement, jump immediately to position
      if (posRef.current.x < 0) {
        posRef.current.x = e.clientX;
        posRef.current.y = e.clientY;
      }
      if (!animId) animId = requestAnimationFrame(render);
    };

    const handlePointerLeave = () => {
      posRef.current.targetX = -1000;
      posRef.current.targetY = -1000;
      if (!animId) animId = requestAnimationFrame(render);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);

    const render = () => {
      const pos = posRef.current;
      // Snappy and close following interpolation
      pos.x += (pos.targetX - pos.x) * 0.22;
      pos.y += (pos.targetY - pos.y) * 0.22;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      }

      const settled = Math.abs(pos.targetX - pos.x) < 0.5 && Math.abs(pos.targetY - pos.y) < 0.5;
      animId = settled ? 0 : requestAnimationFrame(render);
    };

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      cancelAnimationFrame(animId);
    };
  }, [isMainPage]);

  // Main page should not have this glow effect
  if (isMainPage) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-30 overflow-hidden"
    >
      {/* Tighter, concentrated circular red glow closer to cursor */}
      <div
        ref={glowRef}
        className="absolute -top-[140px] -left-[140px] w-[280px] h-[280px] rounded-full transition-opacity duration-300 will-change-transform pointer-events-none"
        style={{
          background:
            "radial-gradient(circle closest-side, rgba(255, 30, 39, 0.22) 0%, rgba(220, 20, 60, 0.08) 55%, transparent 100%)",
          filter: "blur(25px)",
        }}
      />
    </div>
  );
}
