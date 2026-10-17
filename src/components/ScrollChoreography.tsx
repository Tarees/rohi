"use client";

import { useEffect } from "react";

export default function ScrollChoreography() {
  useEffect(() => {
    // 1. Setup IntersectionObserver for [data-choreo] section containers
    const choreoSections = document.querySelectorAll<HTMLElement>("[data-choreo='true']");

    const choreoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.classList.add("choreo-active");

            // Animate draw-rule hairlines
            const rules = target.querySelectorAll<HTMLElement>("[data-draw-rule]");
            rules.forEach((rule) => {
              rule.classList.add("rule-drawn");
            });

            // Animate draw-tick corner markers
            const ticks = target.querySelectorAll<HTMLElement>("[data-draw-tick]");
            ticks.forEach((tick, idx) => {
              setTimeout(() => {
                tick.classList.add("tick-popped");
              }, idx * 60 + 100);
            });

            // Animate draw-eyebrow badges
            const eyebrows = target.querySelectorAll<HTMLElement>("[data-draw-eyebrow]");
            eyebrows.forEach((eyebrow) => {
              eyebrow.classList.add("eyebrow-revealed");
            });

            // Once triggered, unobserve to keep it crisp
            choreoObserver.unobserve(target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    choreoSections.forEach((sec) => choreoObserver.observe(sec));

    // 2. Setup IntersectionObserver for independent [data-reveal] elements
    const revealElements = document.querySelectorAll<HTMLElement>("[data-reveal='true']");

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.classList.add("reveal-active");
            revealObserver.unobserve(el);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));

    return () => {
      choreoObserver.disconnect();
      revealObserver.disconnect();
    };
  }, []);

  return null;
}
