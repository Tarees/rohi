"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { COMPANY, FACTORY_IMAGE, PRODUCT_FAMILIES } from "@/lib/site";

// Counts up when scrolled into view. Server HTML carries the final number,
// so search engines and no-JS visitors still see the real figure.
function AnimatedNumber({
  end,
  duration = 1800,
  suffix = "",
}: {
  end: number;
  duration?: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(end);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    let animationFrameId = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            hasAnimatedRef.current = true;
            let startTime: number | null = null;

            const animateCount = (timestamp: number) => {
              if (!startTime) startTime = timestamp;
              const progress = Math.min((timestamp - startTime) / duration, 1);
              // Exponential ease-out for a decelerating ticker feel
              const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
              setCount(Math.floor(eased * end));
              if (progress < 1) animationFrameId = requestAnimationFrame(animateCount);
            };

            animationFrameId = requestAnimationFrame(animateCount);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) observer.observe(elementRef.current);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [end, duration]);

  return (
    <span ref={elementRef} className="tabular-nums">
      {count.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}

const STATS = [
  { value: COMPANY.yearsInBusiness, suffix: "+", label: "Years building motorcycles" },
  { value: COMPANY.dealerCount, suffix: "+", label: "Dealers & distributors" },
  { value: COMPANY.monthlyCapacity, suffix: "", label: "Motorcycles a month (capacity)" },
  { value: COMPANY.warrantyMonths, suffix: " mo", label: "Warranty on all products" },
];

const PILLARS = [
  {
    title: "Production facility",
    body: "Our plant on Hasilpur Road, Bahawalpur runs a modern assembly line with the machinery to build up to 5,000 motorcycles a month, keeping supply steady for dealers across the country.",
  },
  {
    title: "Quality control",
    body: "Strict quality checks run through every stage of production, from incoming parts to the finished motorcycle, so each ROHI is durable, safe and performs the way it should.",
  },
  {
    title: "Research & development",
    body: "We keep investing in better performance, fuel efficiency and design, and continue to launch new models that bring modern technology to everyday motorcycles, including our electric bike.",
  },
  {
    title: "After-sales support",
    body: "Spare parts supply, maintenance support and technical assistance continue long after the sale, with a 6-month warranty on all of our products.",
  },
];

export default function AboutPage() {
  useEffect(() => {
    // Scroll reveal for elements as the user scrolls down
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("revealed");
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    document
      .querySelectorAll(".reveal-init, .reveal-left-init, .reveal-right-init")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen bg-canvas text-white flex flex-col justify-between selection:bg-red-600 selection:text-white overflow-x-clip">
      {/* Background ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-gradient-to-b from-red-950/15 via-elevated/40 to-transparent blur-3xl" />
        <div className="absolute top-[40%] right-0 w-[550px] h-[550px] bg-red-900/10 blur-[130px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-red-950/15 blur-[140px]" />
      </div>

      <Navbar />

      <main className="relative z-10 flex-1 max-w-[1600px] mx-auto w-full px-6 md:px-12 lg:px-16 py-10 md:py-14 space-y-24 md:space-y-32">
        {/* SECTION 1: INTRO */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start pt-2">
          <div className="lg:col-span-5 flex flex-col justify-start anim-slide-left">
            <h1 className="font-display uppercase leading-[0.85] text-white">
              <span className="block text-8xl sm:text-9xl md:text-[10rem] font-bold">About</span>
              <span className="block text-8xl sm:text-9xl md:text-[10rem] font-bold text-red-500 drop-shadow-[0_0_35px_rgba(255,30,39,0.5)]">
                ROHI
              </span>
            </h1>

            <div className="mt-6 flex items-center gap-3">
              <span className="w-8 h-[2px] bg-red-600 shadow-[0_0_10px_#ff1e27]" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-red-400 font-semibold">
                Rehman Auto Industry · Bahawalpur
              </span>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-8 anim-slide-right">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              <div className="md:col-span-6 space-y-4 text-base md:text-lg text-zinc-300 leading-relaxed">
                <p>
                  ROHI Motorcycles is the brand of <strong className="text-white font-semibold">Rehman Auto Industry</strong>,
                  a motorcycle manufacturer based in Bahawalpur, Pakistan. We build reliable, affordable motorcycles
                  for the everyday transport needs of riders across the country.
                </p>
                <p>
                  Over more than twenty years we have grown our production capability and our range, from the
                  classic 70cc to 100cc commuters, commercial models and an electric bike, and ROHI has become a
                  trusted name in the Pakistani motorcycle market.
                </p>
              </div>

              <div className="md:col-span-6">
                <div data-theme="dark" className="group relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-white/15 bg-elevated/70 shadow-[0_15px_35px_rgb(0_0_0/calc(0.7*var(--shade)))]">
                  <Image
                    src={FACTORY_IMAGE}
                    alt="ROHI factory of Rehman Auto Industry on Hasilpur Road, Bahawalpur"
                    fill
                    preload
                    sizes="(max-width: 768px) 100vw, 30vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono">
                    <span className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-zinc-200">
                      8-KM, Hasilpur Road
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-red-600/90 text-white font-semibold tracking-wider">
                      PLANT
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mission statement */}
            <blockquote className="glass-card-frosted p-6 md:p-8 border-red-500/30 relative overflow-hidden">
              <span className="absolute -right-2 -bottom-10 font-serif text-[9rem] leading-none text-white/[0.04] select-none pointer-events-none" aria-hidden="true">
                &rdquo;
              </span>
              <p className="font-serif italic text-2xl md:text-3xl leading-snug text-zinc-100">
                Reliable, affordable and high-performing motorcycles, built in Pakistan for the people who ride them
                every day.
              </p>
              <footer className="mt-4 flex items-center gap-2">
                <span className="w-5 h-[2px] bg-red-600" />
                <span className="font-mono text-xs text-red-400 font-semibold uppercase tracking-[0.16em]">
                  Our mission
                </span>
              </footer>
            </blockquote>
          </div>
        </section>

        {/* SECTION 2: STATS */}
        <section className="space-y-12" aria-labelledby="about-numbers">
          <div className="max-w-3xl ml-auto text-left lg:text-right reveal-right-init">
            <h2 id="about-numbers" className="font-display text-4xl sm:text-5xl md:text-6xl font-bold uppercase leading-[0.95] text-zinc-100">
              Built in Bahawalpur,{" "}
              <span className="font-serif normal-case italic font-normal text-red-500">trusted nationwide</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={`glass-card-frosted group p-7 flex flex-col justify-between min-h-[210px] reveal-init ${
                  i === 1 ? "!bg-white/[0.08] !border-white/20 hover:!border-red-500/50" : ""
                }`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <span className="font-mono text-xs text-zinc-500 group-hover:text-red-400 transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="mt-6">
                  <span
                    className={`font-display text-6xl md:text-7xl font-bold block leading-none ${
                      i === 2 ? "text-red-500 drop-shadow-[0_0_15px_rgba(255,30,39,0.5)]" : "text-white"
                    }`}
                  >
                    <AnimatedNumber end={stat.value} suffix={stat.suffix} duration={1600 + i * 150} />
                  </span>
                  <span className="text-sm text-zinc-400 block mt-3">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: HOW WE WORK */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10" aria-labelledby="about-how">
          <div className="lg:col-span-4 reveal-left-init">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-red-400">How we work</span>
            <h2 id="about-how" className="mt-2 font-display text-5xl font-bold uppercase leading-[0.95] text-white">
              From our line to your street
            </h2>
          </div>
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {PILLARS.map((pillar, i) => (
              <div key={pillar.title} className="reveal-init border-t border-white/10 pt-5" style={{ transitionDelay: `${i * 100}ms` }}>
                <h3 className="font-display text-2xl font-bold uppercase text-white">{pillar.title}</h3>
                <p className="mt-2 text-base text-zinc-400 leading-relaxed">{pillar.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: CERTIFICATIONS & NETWORK */}
        <section className="space-y-8" aria-labelledby="about-trust">
          <div className="text-center max-w-2xl mx-auto reveal-init">
            <span className="font-mono text-xs text-red-400 uppercase tracking-[0.2em] block mb-2">
              Certifications &amp; network
            </span>
            <h2 id="about-trust" className="font-display text-4xl md:text-5xl font-bold uppercase leading-none text-white">
              Certified quality, nationwide reach
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {COMPANY.certifications.map((cert, i) => (
              <div
                key={cert.short}
                className="p-7 rounded-2xl bg-elevated/40 border border-white/10 flex flex-col items-center justify-center text-center hover:border-red-500/30 transition-all reveal-init"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <span className="font-display text-4xl font-bold text-white tracking-wide">{cert.short}</span>
                <span className="text-sm text-zinc-400 mt-1">{cert.name}</span>
              </div>
            ))}
            <div
              className="p-7 rounded-2xl bg-gradient-to-r from-red-950/40 via-red-900/30 to-red-950/40 border border-red-500/40 flex flex-col items-center justify-center text-center shadow-[0_0_25px_rgba(255,30,39,0.2)] reveal-init"
              style={{ transitionDelay: "160ms" }}
            >
              <span className="font-display text-4xl font-bold text-white">{COMPANY.dealerCount}+ dealers</span>
              <span className="text-sm text-zinc-300 mt-1">{COMPANY.regions.join(" · ")}</span>
            </div>
          </div>
        </section>

        {/* SECTION 5: PRODUCT RANGE */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start border-t border-white/10 pt-16" aria-labelledby="about-range">
          <div className="lg:col-span-4 reveal-left-init">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-red-400 block mb-2">What we make</span>
            <h2 id="about-range" className="font-display text-5xl font-bold uppercase leading-[0.95] text-white">
              70cc, 100cc &amp; beyond
            </h2>
            <p className="mt-4 text-base text-zinc-400 leading-relaxed">
              Every type of motorcycle in the 70cc and 100cc classes, from family commuters to work bikes, plus our
              electric bike and scooty.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/models"
                className="px-6 py-3 rounded-full bg-red-600 hover:bg-red-500 text-white text-sm font-semibold tracking-wide transition-all shadow-[0_0_20px_rgba(255,30,39,0.5)]"
              >
                View the 2026 lineup
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-zinc-200 hover:text-white text-sm font-semibold tracking-wide transition-all"
              >
                Contact us
              </Link>
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5 reveal-right-init">
            {PRODUCT_FAMILIES.map((family) => (
              <div key={family.title} className="rounded-2xl p-6 bg-white/[0.03] border border-white/10">
                <h3 className="font-display text-2xl font-bold uppercase text-white">{family.title}</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-zinc-300">
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
        </section>

        {/* SECTION 6: LEADERSHIP */}
        <section className="border-t border-white/10 pt-16" aria-labelledby="about-leadership">
          <div className="max-w-2xl reveal-init">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-red-400 block mb-2">Leadership</span>
            <h2 id="about-leadership" className="font-display text-5xl font-bold uppercase leading-none text-white">
              The people behind ROHI
            </h2>
          </div>
          <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {COMPANY.leadership.map((person, i) => (
              <li
                key={person.name}
                className="reveal-init group rounded-2xl overflow-hidden bg-white/[0.03] border border-white/10"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div data-theme="dark" className="relative aspect-[4/5] overflow-hidden bg-elevated">
                  <Image
                    src={person.photo}
                    alt={`Mr. ${person.name}, ${person.role} of ROHI Motorcycles`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-700"
                  />
                </div>
                <div className="p-5">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-red-400 leading-snug block">
                    {person.role}
                  </span>
                  <p className="mt-1.5 font-display text-2xl font-bold uppercase leading-tight text-white">
                    Mr. {person.name}
                  </p>
                  {(() => {
                    const email = COMPANY.teamEmails.find((t) => person.name.startsWith(t.name))?.email;
                    return email ? (
                      <a
                        href={`mailto:${email}`}
                        className="mt-2 inline-block text-sm text-zinc-400 hover:text-red-400 transition-colors break-all"
                      >
                        {email}
                      </a>
                    ) : null;
                  })()}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
}
