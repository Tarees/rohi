// Single source of truth for every ROHI bike shown on the site.
// Hero orbit cards, 3D carousel, Models page, model detail pages, sitemap
// and Footer all read from here, so a spec change only needs to be made once.
//
// 2026 lineup: five models with official cutout photography in
// /public/image/bike images 2026/. The company profile lists model families but not
// per-model figures, so specs below are typical for each class and should be
// confirmed against the factory spec sheet before launch. Prices are deliberately
// not listed: they change often and are quoted by dealers.

export type BikeSeries = "100CC SERIES" | "70CC SERIES" | "ELECTRIC EV";

export interface Bike {
  id: string;
  /** URL segment for /models/[slug] */
  slug: string;
  name: string;
  code: string;
  year: string;
  series: BikeSeries;
  /** Short display category, e.g. "100CC FLAGSHIP" */
  category: string;
  badge: string;
  color: string;
  engine: string;
  power: string;
  mileage: string;
  tank: string;
  transmission: string;
  start: string;
  image: string;
  /** One-line summary for cards and meta descriptions */
  description: string;
  /** Longer copy for the model page */
  overview: string;
  highlights: string[];
}

const IMG = "/image/bike images 2026";

export const BIKE_SERIES: BikeSeries[] = ["100CC SERIES", "70CC SERIES", "ELECTRIC EV"];

export const BIKES: Bike[] = [
  {
    id: "rl100",
    slug: "rohi-rl-100",
    name: "ROHI RL-100",
    code: "RL-100",
    year: "2026",
    series: "100CC SERIES",
    category: "100CC FLAGSHIP",
    badge: "2026 FLAGSHIP",
    color: "Crimson Red",
    engine: "97cc air-cooled 4-stroke",
    power: "7.5 HP @ 8,000 RPM",
    mileage: "50+ km/l",
    tank: "10 litres",
    transmission: "4-speed",
    start: "Kick start",
    image: `${IMG}/Red Rohi RL-100 Motorcycle 2026.png`,
    description:
      "ROHI's 100cc flagship in crimson red: extra pull for two-up riding and highway stretches, with the running costs of a commuter.",
    overview:
      "The RL-100 is built for riders who carry a passenger, a load or a long daily distance. Its 97cc four-stroke engine gives noticeably more pulling power than a 70cc while staying simple to maintain, and the red-and-chrome finish makes it the most eye-catching bike in the 2026 lineup.",
    highlights: [
      "97cc four-stroke engine with more torque for pillion and highway riding",
      "Large 10-litre tank for fewer fuel stops",
      "Dual rear shock absorbers and telescopic front forks",
      "Sturdy rear carrier and grab rail",
    ],
  },
  {
    id: "rf100",
    slug: "rohi-rf-100",
    name: "ROHI RF-100",
    code: "RF-100",
    year: "2026",
    series: "100CC SERIES",
    category: "100CC STREET",
    badge: "GLOSS BLACK",
    color: "Gloss Black",
    engine: "97cc air-cooled 4-stroke",
    power: "7.5 HP @ 8,000 RPM",
    mileage: "50+ km/l",
    tank: "10 litres",
    transmission: "4-speed",
    start: "Kick start",
    image: `${IMG}/ROHI RF-100 Motorcycle 2026.png`,
    description:
      "The same dependable 100cc platform as the RL-100, finished in gloss black with blue-and-gold graphics.",
    overview:
      "The RF-100 pairs ROHI's 97cc engine with an understated gloss-black finish. It suits daily commuters who want 100cc power for city traffic, family trips and occasional loads, in a colour that stays smart after years on the road.",
    highlights: [
      "97cc four-stroke engine shared with the RL-100",
      "Gloss black paint with blue and gold graphics",
      "Comfortable long seat for rider and pillion",
      "Spare parts stocked across the ROHI dealer network",
    ],
  },
  {
    id: "sr70",
    slug: "rohi-sr70",
    name: "ROHI SR70",
    code: "SR70",
    year: "2026",
    series: "70CC SERIES",
    category: "70CC CHROME",
    badge: "BLACK & CHROME",
    color: "Black & Chrome",
    engine: "72cc air-cooled 4-stroke",
    power: "5.5 HP @ 7,500 RPM",
    mileage: "55+ km/l",
    tank: "8.5 litres",
    transmission: "4-speed",
    start: "Kick start (self-start variant available)",
    image: `${IMG}/Black-and-Chrome RoHI SR70 Motorcycle 2026.png`,
    description:
      "A 70cc commuter in gloss black with full chrome fenders and gold-wing badging: light, economical and easy to ride.",
    overview:
      "The SR70 is ROHI's premium-finish 70cc. Chrome fenders and the gold-wing tank badge give it a classic look, while the light 72cc engine keeps fuel and servicing costs low for everyday trips to work, school and the market.",
    highlights: [
      "Economical 72cc four-stroke engine",
      "Full chrome front and rear fenders",
      "Light and easy to handle in city traffic",
      "Self-start version available",
    ],
  },
  {
    id: "r170",
    slug: "rohi-r170-classic",
    name: "ROHI R170 CLASSIC",
    code: "R170",
    year: "2026",
    series: "70CC SERIES",
    category: "70CC CLASSIC",
    badge: "CLASSIC RED",
    color: "Classic Red",
    engine: "72cc air-cooled 4-stroke",
    power: "5.5 HP @ 7,500 RPM",
    mileage: "55+ km/l",
    tank: "8.5 litres",
    transmission: "4-speed",
    start: "Kick start (self-start variant available)",
    image: `${IMG}/Red ROHI R170 Classic 2026.png`,
    description:
      "The familiar red 70cc that Pakistani families rely on, with chrome fenders and ROHI's gold-wing badge.",
    overview:
      "The R170 Classic keeps the proven 70cc formula: a simple, fuel-efficient engine, an upright riding position and parts that any mechanic knows. It is ROHI's everyday workhorse for riders who want low running costs above all.",
    highlights: [
      "Proven 72cc four-stroke engine",
      "Classic red finish with chrome fenders",
      "Low running and maintenance costs",
      "Also offered as a self-start model and an adapted model for riders with disabilities",
    ],
  },
  {
    id: "ebike",
    slug: "rohi-electric-bike",
    name: "ROHI E-BIKE",
    code: "E-BIKE",
    year: "2026",
    series: "ELECTRIC EV",
    category: "ELECTRIC",
    badge: "ZERO PETROL",
    color: "Red & Green",
    engine: "Rear hub motor",
    power: "Electric hub drive",
    mileage: "Up to 70 km per charge*",
    tank: "Lithium-ion battery",
    transmission: "Automatic (no gears)",
    start: "Push-button",
    image: `${IMG}/ROHI Retro Electric Motorcycle 2026.png`,
    description:
      "ROHI's electric motorcycle: classic styling, a rear hub motor and no petrol bills, charged from a normal home socket.",
    overview:
      "The ROHI Electric Bike keeps the familiar shape of a Pakistani commuter but replaces the engine with a battery pack and rear hub motor. There is no clutch, no gears and no engine oil to change, which makes it simple for city riders and short daily commutes.",
    highlights: [
      "Rear hub motor: no clutch, no gears, no engine oil",
      "Charges from a standard home socket",
      "Classic commuter styling with chrome fenders",
      "Quiet, smooth city riding",
    ],
  },
];

/** Black RI-100 studio cutout used as the hero centrepiece and the Engineering side profile */
export const HERO_BIKE_IMAGE = "/image/hero images/Classic Black ROHI RI-100 Motorcycle Cutout (1).png";

/** The official lineup (Models page, carousel, footer). */
export const LINEUP = BIKES;

export function getBike(id: string): Bike {
  const bike = BIKES.find((b) => b.id === id);
  if (!bike) throw new Error(`Unknown bike id: ${id}`);
  return bike;
}

export function getBikes(ids: string[]): Bike[] {
  return ids.map(getBike);
}

export function getBikeBySlug(slug: string): Bike | undefined {
  return BIKES.find((b) => b.slug === slug);
}

export function bikeHref(bike: Bike): string {
  return `/models/${bike.slug}`;
}
