import Link from "next/link";
import { LINEUP, bikeHref } from "@/data/bikes";
import { COMPANY, MAPS_URL } from "@/lib/site";

interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Models",
    links: LINEUP.map((bike) => ({
      label: bike.name.replace(" CLASSIC", " Classic").replace("E-BIKE", "Electric Bike"),
      href: bikeHref(bike),
    })),
  },
  {
    title: "Ownership",
    links: [
      { label: "Spare parts", href: "/services#parts" },
      { label: "Warranty", href: "/services#warranty" },
      { label: "After-sales service", href: "/services#service" },
      { label: "Commercial models", href: "/services#commercial" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About ROHI", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Gallery", href: "/gallery" },
      { label: "Become a dealer", href: "/services#dealership" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "Find a dealer", href: "/contact" },
      { label: COMPANY.phone, href: `tel:${COMPANY.phoneIntl}` },
      { label: "WhatsApp", href: `https://wa.me/${COMPANY.whatsapp}` },
      { label: "Get directions", href: MAPS_URL },
    ],
  },
];

export default function Footer() {
  return (
    // Footer is a dark band in both themes
    <footer data-theme="dark" className="relative z-10 w-full bg-canvas-deep border-t border-white/[0.08] overflow-hidden select-none">
      {/* CONTENT SECTION (Matching clean column layout) */}
      <div className="max-w-[1550px] mx-auto px-6 md:px-12 lg:px-16 pt-12 pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* LEFT COLUMN: ADDRESS, OPERATIONAL STATUS, SOCIAL ICONS */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div>
              {/* Address */}
              <address className="not-italic space-y-1 text-sm text-zinc-400 leading-relaxed">
                <p className="font-display text-2xl font-bold uppercase text-white mb-2">
                  {COMPANY.legalName}
                </p>
                <p>{COMPANY.address.street}</p>
                <p>
                  {COMPANY.address.city}, {COMPANY.address.region}, {COMPANY.address.country}
                </p>
              </address>

              <p className="mt-4 max-w-sm text-sm text-zinc-400 leading-relaxed">
                Makers of ROHI 70cc, 100cc and electric motorcycles for more than 20 years.
              </p>

              {/* Certifications */}
              <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-300">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>EDB &amp; PSQCA certified</span>
              </div>
            </div>

            {/* Social & Contact Icons */}
            <div className="flex items-center gap-3">
              {/* WhatsApp */}
              <a
                href={`https://wa.me/${COMPANY.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 hover:border-red-500/40 flex items-center justify-center text-zinc-400 hover:text-white transition-all cursor-pointer"
                aria-label="WhatsApp"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.149.929 3.182 0 5.767-2.587 5.768-5.766 0-3.187-2.58-5.771-5.768-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.299.144.347.491 1.2.534 1.288.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.087-.179.182-.077.357.101.174.451.744.968 1.205.666.594 1.228.777 1.401.864.173.087.275.072.376-.043.101-.116.433-.506.549-.68.116-.173.231-.144.39-.087s1.011.477 1.184.564c.173.087.289.13.332.202.043.073.043.419-.101.824z" />
                </svg>
              </a>

              {/* Phone */}
              <a
                href={`tel:${COMPANY.phoneIntl}`}
                className="w-9 h-9 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 hover:border-red-500/40 flex items-center justify-center text-zinc-400 hover:text-white transition-all cursor-pointer"
                aria-label="Phone"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </a>

              {/* Email */}
              <a
                href={`mailto:${COMPANY.email}`}
                className="w-9 h-9 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 hover:border-red-500/40 flex items-center justify-center text-zinc-400 hover:text-white transition-all cursor-pointer"
                aria-label="Email"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>

              {/* Location */}
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 hover:border-red-500/40 flex items-center justify-center text-zinc-400 hover:text-white transition-all cursor-pointer"
                aria-label="Directions to the ROHI plant on Google Maps"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
              </a>
            </div>
          </div>

          {/* RIGHT COLUMNS: 4 NAVIGATION LINK GROUPS */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title} className="space-y-3.5">
                <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-white font-semibold">
                  {col.title}
                </h2>
                <ul className="space-y-2.5 text-sm text-zinc-400">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      {link.href.startsWith("/") ? (
                        <Link href={link.href} className="hover:text-white transition-colors">
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          className="hover:text-white transition-colors"
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM COPYRIGHT ROW */}
        <div className="mt-12 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-zinc-400">
          <p>© {new Date().getFullYear()} {COMPANY.legalName} · ROHI Motorcycles · Bahawalpur, Pakistan</p>
          <p>All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
