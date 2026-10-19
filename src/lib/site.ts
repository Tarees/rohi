// Company facts used across pages, metadata and structured data.
// Source: Rehman Auto Industry company profile (public/data/REHMAN AUTO INDUSTRY Profile.pdf).
// Keep this file factual — anything shown to customers or search engines comes from here.

/**
 * Public URL of the live site, used for canonical URLs, the sitemap and social previews.
 * NEXT_PUBLIC_SITE_URL can override it (e.g. for a staging deployment).
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.rehmanautoindustry.com").replace(/\/$/, "");

export const COMPANY = {
  brand: "ROHI Motorcycles",
  legalName: "Rehman Auto Industry",
  shortDescription:
    "ROHI Motorcycles is the brand of Rehman Auto Industry, a Bahawalpur-based manufacturer of 70cc, 100cc and electric motorcycles sold through 300+ dealers across Pakistan.",
  yearsInBusiness: 20,
  monthlyCapacity: 5000,
  dealerCount: 300,
  warrantyMonths: 6,
  regions: ["Punjab", "Sindh", "Khyber Pakhtunkhwa", "Balochistan", "Azad Kashmir"],
  certifications: [
    { short: "EDB", name: "Engineering Development Board Pakistan" },
    { short: "PSQCA", name: "Pakistan Standards & Quality Control Authority" },
  ],
  address: {
    street: "8-KM, Hasilpur Road",
    city: "Bahawalpur",
    region: "Punjab",
    country: "Pakistan",
    countryCode: "PK",
  },
  phone: "0300-8583091",
  phoneIntl: "+923008583091",
  whatsapp: "923008583091",
  /** Main inbox: used for mailto links, the enquiry form and structured data. */
  email: "info@rehmanautoindustry.com",
  /** Direct team inboxes, listed on the contact page. */
  teamEmails: [
    { name: "Ali Hassan", role: "Chairman", email: "alihassan@rehmanautoindustry.com" },
    { name: "Imran Azhar Bhatti", role: "Director of Finance", email: "imran@rehmanautoindustry.com" },
    {
      name: "Samiullah Hafeez",
      role: "Director Procurement & International Business",
      email: "sami@rehmanautoindustry.com",
    },
    // Placeholder kept on request; to be replaced later
    { name: "Hussain", role: "", email: "hussain@rehmanautoindustry.com" },
  ],
  founder: "Hafeez-ur-Rehman",
  leadership: [
    { name: "Hafeez-ur-Rehman", role: "Founder & CEO", photo: "/image/team and company/Hafeez-ur-Rehman.jpeg" },
    { name: "Ali Hassan", role: "Chairman", photo: "/image/team and company/Ali Hassan Hafeez.jpeg" },
    {
      name: "Imran Azhar Bhatti",
      role: "Director of Finance",
      photo: "/image/team and company/Imran Azhar Bhatti.jpeg",
    },
    {
      name: "Samiullah Hafeez",
      role: "Director Procurement & International Business",
      photo: "/image/team and company/Sami Ullah Hafeez.jpeg",
    },
  ],
} as const;

/**
 * Names people search for the company and brand. Used as alternateName in structured data
 * (so Google links every spelling to one organization) and in the keywords tag.
 */
export const SEARCH_NAMES = [
  "ROHI Motorcycles",
  "ROHI",
  "Rohi Bikes",
  "Rohi Bike",
  "Rohi Motorbike",
  "Rohi Motors",
  "Rohi Auto Industries",
  "Rohi Auto Industry",
  "Rehman Auto Industry",
  "Rehman Auto Industries",
  "Rahman Auto Industry",
] as const;

/** Product and place searches the site should be relevant for. */
export const SEARCH_TOPICS = [
  "Bahawalpur bikes",
  "motorcycles made in Bahawalpur",
  "Pakistani motorcycles",
  "best bikes in Pakistan",
  "70cc motorcycle Pakistan",
  "100cc motorcycle Pakistan",
  "electric bike Pakistan",
  "electric scooter Pakistan",
  "electric motorcycle Pakistan",
  "scooty Pakistan",
  "motorcycle manufacturer Pakistan",
] as const;

export const FACTORY_IMAGE = "/image/team and company/rohi factory.jpeg";

export const ADDRESS_LINE = `${COMPANY.address.street}, ${COMPANY.address.city}, ${COMPANY.address.region}, ${COMPANY.address.country}`;

export const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `Rehman Auto Industry ${ADDRESS_LINE}`
)}`;

/** Full product families from the company profile (beyond the five showcased 2026 models). */
export const PRODUCT_FAMILIES = [
  {
    title: "ROHI 70cc",
    items: ["ROHI 70cc", "ROHI 70cc Self Start", "ROHI 70cc Self Start for riders with disabilities"],
  },
  {
    title: "ROHI 100cc",
    items: ["ROHI 100cc", "ROHI 100cc Plus", "ROHI 100cc Front Portion"],
  },
  {
    title: "Commercial 100cc",
    items: ["ROHI 100cc Loader", "ROHI 100cc School Van", "ROHI 100cc Dalla", "ROHI 100cc Confectionery Cargo Box"],
  },
  {
    title: "Electric & Scooter",
    items: ["ROHI Electric Bike", "ROHI Scooty"],
  },
] as const;

/**
 * Open Graph fields every page should keep. Next.js replaces (not merges) a parent
 * openGraph object, so pages spread these in alongside their own title/description.
 */
export const OG_DEFAULTS = {
  siteName: "ROHI Motorcycles",
  locale: "en_PK",
  type: "website" as const,
  images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "ROHI Motorcycles" }],
};

/** Serialises JSON-LD safely for a <script> tag. */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
