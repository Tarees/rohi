import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BIKES, bikeHref, getBikeBySlug } from "@/data/bikes";
import { COMPANY, OG_DEFAULTS, SITE_URL, absoluteUrl, jsonLd } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return BIKES.map((bike) => ({ slug: bike.slug }));
}

/** "ROHI R170 CLASSIC" → "ROHI R170 Classic" for running text and titles */
function displayName(name: string): string {
  return name.replace("CLASSIC", "Classic").replace("E-BIKE", "Electric Bike");
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const bike = getBikeBySlug(slug);
  if (!bike) return {};

  const name = displayName(bike.name);
  const title = `${name} ${bike.year}: Specs & Features`;
  const description = `${bike.description} ${bike.engine}, ${bike.mileage}. Made in Pakistan by Rehman Auto Industry, Bahawalpur.`;

  return {
    title,
    description,
    alternates: { canonical: bikeHref(bike) },
    openGraph: {
      ...OG_DEFAULTS,
      url: bikeHref(bike),
      title: `${name} | ROHI Motorcycles`,
      description,
      images: [{ url: bike.image, alt: `${name} motorcycle` }],
    },
  };
}

export default async function ModelPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const bike = getBikeBySlug(slug);
  if (!bike) notFound();

  const name = displayName(bike.name);
  const isElectric = bike.series === "ELECTRIC EV";
  const others = BIKES.filter((b) => b.id !== bike.id);

  const specs: [string, string][] = [
    [isElectric ? "Motor" : "Engine", bike.engine],
    ["Power", bike.power],
    [isElectric ? "Range" : "Fuel economy", bike.mileage],
    [isElectric ? "Battery" : "Fuel tank", bike.tank],
    ["Transmission", bike.transmission],
    ["Starting", bike.start],
    ["Colour", bike.color],
    ["Model year", bike.year],
  ];

  const enquiryUrl = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(
    `Assalam-o-Alaikum! I'm interested in the ${name}. Please share the price and my nearest dealer.`
  )}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        name,
        model: bike.code,
        description: bike.overview,
        image: absoluteUrl(encodeURI(bike.image)),
        category: isElectric ? "Electric motorcycle" : `${bike.series.replace(" SERIES", "").toLowerCase()} motorcycle`,
        color: bike.color,
        brand: { "@type": "Brand", name: "ROHI" },
        manufacturer: { "@id": `${SITE_URL}/#organization` },
        countryOfOrigin: "PK",
        url: absoluteUrl(bikeHref(bike)),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Models", item: absoluteUrl("/models") },
          { "@type": "ListItem", position: 3, name, item: absoluteUrl(bikeHref(bike)) },
        ],
      },
    ],
  };

  return (
    <div className="relative min-h-screen bg-canvas text-white flex flex-col selection:bg-red-600 selection:text-white overflow-x-clip">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }} />

      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[650px] bg-gradient-to-b from-red-950/15 via-elevated/30 to-transparent blur-[140px]" />
      </div>

      <Navbar />

      <main className="relative z-10 flex-1 max-w-[1400px] mx-auto w-full px-6 md:px-12 py-8 md:py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-sm text-zinc-500">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-white">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/models" className="hover:text-white">Models</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-zinc-300" aria-current="page">{name}</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 relative aspect-[4/3] w-full">
            <div className="absolute inset-[8%] rounded-full bg-red-600/10 blur-[80px]" aria-hidden="true" />
            <Image
              src={bike.image}
              alt={`${name} motorcycle, side view`}
              fill
              preload
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-contain drop-shadow-[0_30px_40px_rgb(0_0_0/calc(0.85*var(--shade)))]"
            />
          </div>

          <div className="lg:col-span-5">
            <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-red-400">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              {bike.badge}
            </span>
            <h1 className="mt-3 font-display text-6xl md:text-7xl font-bold uppercase leading-[0.9] text-white">
              {name}
            </h1>
            <p className="mt-2 font-serif italic text-2xl text-zinc-400">{bike.category.toLowerCase()} · {bike.year}</p>
            <p className="mt-5 text-base md:text-lg leading-relaxed text-zinc-300">{bike.overview}</p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={enquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-red-600 hover:bg-red-500 text-white text-sm font-semibold tracking-wide shadow-[0_0_20px_rgba(255,30,39,0.5)] transition-all"
              >
                Ask for price on WhatsApp
              </a>
              <Link
                href="/contact"
                className="px-6 py-3 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-zinc-200 hover:text-white text-sm font-semibold tracking-wide transition-all"
              >
                Find a dealer
              </Link>
            </div>
          </div>
        </section>

        {/* Specs & highlights */}
        <section className="mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <h2 className="font-display text-4xl font-bold uppercase text-white">Specifications</h2>
            <dl className="mt-6 divide-y divide-white/10 border-y border-white/10">
              {specs.map(([label, value]) => (
                <div key={label} className="grid grid-cols-2 gap-4 py-3.5">
                  <dt className="font-mono text-xs uppercase tracking-[0.16em] text-zinc-500 self-center">{label}</dt>
                  <dd className="text-sm md:text-base text-zinc-100 font-medium">{value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-xs text-zinc-500">
              {isElectric
                ? "*Range depends on load, speed, terrain and temperature. "
                : "Fuel economy depends on riding style, load and maintenance. "}
              Specifications may change; please confirm with your dealer.
            </p>
          </div>

          <div className="lg:col-span-5">
            <h2 className="font-display text-4xl font-bold uppercase text-white">Highlights</h2>
            <ul className="mt-6 space-y-4">
              {bike.highlights.map((item) => (
                <li key={item} className="flex gap-3 text-base text-zinc-300 leading-relaxed">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl p-6 bg-white/[0.03] border border-white/10">
              <h3 className="font-display text-2xl font-bold uppercase text-white">Every ROHI includes</h3>
              <ul className="mt-3 space-y-1.5 text-sm text-zinc-400">
                <li>{COMPANY.warrantyMonths}-month warranty</li>
                <li>Genuine spare parts from {COMPANY.dealerCount}+ dealers nationwide</li>
                <li>After-sales service and technical support</li>
                <li>EDB &amp; PSQCA certified manufacturing</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Other models */}
        <section className="mt-20 md:mt-28 border-t border-white/10 pt-12">
          <h2 className="font-display text-4xl font-bold uppercase text-white">Other ROHI models</h2>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {others.map((other) => (
              <Link
                key={other.id}
                href={bikeHref(other)}
                className="group rounded-2xl p-4 bg-white/[0.03] border border-white/10 hover:border-red-500/50 transition-colors"
              >
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={other.image}
                    alt={`${displayName(other.name)} motorcycle`}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="mt-3 font-display text-xl font-bold uppercase text-white group-hover:text-red-400 transition-colors">
                  {displayName(other.name)}
                </h3>
                <p className="text-xs font-mono uppercase tracking-[0.14em] text-zinc-500">{other.category}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
