import type { Metadata, Viewport } from "next";
import { Inter, Barlow_Condensed, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import CursorGlow from "@/components/CursorGlow";
import BackgroundLogo from "@/components/BackgroundLogo";
import { THEME_INIT_SCRIPT } from "@/lib/theme";
import { ADDRESS_LINE, COMPANY, SITE_URL, absoluteUrl, jsonLd } from "@/lib/site";

// Type system: Barlow Condensed for display headings, Inter for reading and UI,
// JetBrains Mono for short technical labels, Instrument Serif italic for accents.
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

const barlow = Barlow_Condensed({
  weight: ["500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-barlow",
  display: "swap",
});

const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

const instrument = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const DEFAULT_TITLE = "ROHI Motorcycles | 70cc, 100cc & Electric Bikes Made in Pakistan";
const DEFAULT_DESCRIPTION =
  "ROHI Motorcycles by Rehman Auto Industry, Bahawalpur: fuel-efficient 70cc and 100cc motorcycles and electric bikes, EDB & PSQCA certified, sold through 300+ dealers across Pakistan.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | ROHI Motorcycles",
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: COMPANY.brand,
  keywords: [
    "ROHI Motorcycles",
    "Rohi motorcycle",
    "Rohi bike",
    "Rehman Auto Industry",
    "Bahawalpur motorcycle",
    "Pakistani motorcycles",
    "70cc motorcycle Pakistan",
    "100cc motorcycle Pakistan",
    "electric bike Pakistan",
    "motorcycle manufacturer Pakistan",
  ],
  authors: [{ name: COMPANY.legalName }],
  creator: COMPANY.legalName,
  publisher: COMPANY.legalName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: "/",
    siteName: COMPANY.brand,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: true, email: true, address: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#07070a" },
    { media: "(prefers-color-scheme: light)", color: "#f3f1ec" },
  ],
};

// Site-wide structured data: the manufacturer and the website itself
const organizationLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: COMPANY.legalName,
      alternateName: [COMPANY.brand, "ROHI", "Rohi Motorcycle"],
      url: SITE_URL,
      logo: absoluteUrl("/image/Rohi-black-logo.png"),
      description: COMPANY.shortDescription,
      founder: { "@type": "Person", name: COMPANY.founder },
      telephone: COMPANY.phoneIntl,
      email: COMPANY.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: COMPANY.address.street,
        addressLocality: COMPANY.address.city,
        addressRegion: COMPANY.address.region,
        addressCountry: COMPANY.address.countryCode,
      },
      areaServed: { "@type": "Country", name: "Pakistan" },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: COMPANY.phoneIntl,
        contactType: "customer service",
        areaServed: "PK",
        availableLanguage: ["English", "Urdu"],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: COMPANY.brand,
      description: `Official website of ${COMPANY.brand}, ${ADDRESS_LINE}.`,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en-PK",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-PK"
      data-scroll-behavior="smooth"
      data-theme="dark"
      // The inline script below may change data-theme before React hydrates
      suppressHydrationWarning
      className={`${inter.variable} ${barlow.variable} ${jetbrains.variable} ${instrument.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(organizationLd) }} />
      </head>
      {/* Browser extensions (e.g. Grammarly) inject attributes on <body> before hydration */}
      <body
        suppressHydrationWarning
        className="min-h-full bg-canvas-deep text-fg font-sans overflow-x-clip selection:bg-red-600 selection:text-white relative">
        <CursorGlow />
        <BackgroundLogo />
        {children}
      </body>
    </html>
  );
}
