// Blog articles. Each one renders at /blog/[slug] with its own metadata and
// BlogPosting structured data, so it can be indexed and ranked individually.
// Advice is kept general and practical; it never replaces the owner's manual.

export interface PostSection {
  heading?: string;
  paragraphs?: string[];
  list?: string[];
}

export interface Post {
  slug: string;
  title: string;
  /** ~150 characters: used as the meta description and card excerpt */
  description: string;
  category: string;
  readTime: string;
  published: string; // ISO date
  image: string;
  imageAlt: string;
  sections: PostSection[];
}

export const POSTS: Post[] = [
  {
    slug: "70cc-vs-100cc-motorcycle-which-to-choose",
    title: "70cc or 100cc: Which Motorcycle Suits Your Daily Ride?",
    description:
      "Choosing between a 70cc and a 100cc motorcycle in Pakistan? Compare fuel economy, power, running costs and comfort to find the right ROHI for your commute.",
    category: "Buying Guide",
    readTime: "5 min read",
    published: "2026-09-15",
    image: "/image/blog_featured_motion.jpg",
    imageAlt: "Rider accelerating on a motorcycle",
    sections: [
      {
        paragraphs: [
          "For most Pakistani riders the choice comes down to two engine sizes: the familiar 70cc and the stronger 100cc. Both are simple, air-cooled four-strokes that any local mechanic can service. The right one depends less on the bike and more on how you ride.",
        ],
      },
      {
        heading: "Choose a 70cc if…",
        list: [
          "You mostly ride alone, inside the city, for short to medium distances.",
          "Fuel economy and low running costs are your top priority.",
          "You want the lightest, easiest bike to handle in traffic and park in tight spaces.",
          "You are a new rider and want something forgiving to learn on.",
        ],
      },
      {
        heading: "Choose a 100cc if…",
        list: [
          "You regularly carry a passenger, children or goods.",
          "Your commute includes highways, bridges or long climbs.",
          "You want more relaxed cruising at steady speeds.",
          "You ride long daily distances and value a larger fuel tank.",
        ],
      },
      {
        heading: "Fuel and running costs",
        paragraphs: [
          "A 70cc will usually return a few more kilometres per litre than a 100cc, and its consumables cost slightly less. The gap is smaller than many riders expect, though: a 100cc carrying two people often works less hard than a 70cc doing the same job, which helps it hold up over time.",
          "Real-world mileage depends heavily on riding style. Smooth throttle use, correct tyre pressure and regular servicing make a bigger difference than engine size alone.",
        ],
      },
      {
        heading: "Comfort and load",
        paragraphs: [
          "100cc models such as the ROHI RL-100 and RF-100 have more torque, so they pull away more easily with a pillion and feel calmer at higher speeds. 70cc models such as the ROHI SR70 and R170 Classic are lighter and more nimble, which many city riders prefer.",
        ],
      },
      {
        heading: "The bottom line",
        paragraphs: [
          "If your rides are short and mostly solo, a 70cc is the economical choice. If you carry people or loads, or travel further, the extra pull of a 100cc is worth it. Visit your nearest ROHI dealer to sit on both and take a short test ride before you decide.",
        ],
      },
    ],
  },
  {
    slug: "motorcycle-maintenance-routine-4-stroke",
    title: "A Simple Maintenance Routine for Your 4-Stroke Motorcycle",
    description:
      "Engine oil, chain, air filter, tyres and brakes: an easy maintenance routine that keeps a 70cc or 100cc motorcycle running smoothly for years.",
    category: "Maintenance",
    readTime: "6 min read",
    published: "2026-08-28",
    image: "/image/gallery/gallery_desert_camp.jpg",
    imageAlt: "Motorcycle parked on a rug in the desert at sunset",
    sections: [
      {
        paragraphs: [
          "Small commuter motorcycles are tough, but they reward a little regular care. This routine covers the basics every owner can check. Always follow the service intervals in your owner's manual and let an authorised ROHI dealer handle anything you are unsure about.",
        ],
      },
      {
        heading: "1. The first service matters most",
        paragraphs: [
          "A new engine sheds tiny metal particles as its parts bed in. Get the first service done on time, including an oil change, and ride gently for the first few hundred kilometres: avoid full throttle and keep speeds moderate.",
        ],
      },
      {
        heading: "2. Engine oil",
        paragraphs: [
          "Oil is the cheapest protection your engine can get. Check the level on the dipstick every couple of weeks with the bike upright, and change it at the interval your dealer recommends, sooner if you ride in heavy traffic, heat or dust. Use the grade specified for your model.",
        ],
      },
      {
        heading: "3. Drive chain",
        list: [
          "Check chain slack regularly: it should move up and down slightly, usually around 2 to 3 cm at the middle.",
          "A chain that is too tight wears the sprockets; one that is too loose can slip or jump.",
          "Clean off dust and grime, then lubricate lightly, especially after rain.",
        ],
      },
      {
        heading: "4. Air filter",
        paragraphs: [
          "Dusty roads clog the air filter quickly, which costs power and fuel. Have it cleaned or replaced at every service, and more often if you ride on unpaved roads.",
        ],
      },
      {
        heading: "5. Tyres and brakes",
        list: [
          "Check tyre pressure weekly when the tyres are cold, using the figures in your manual.",
          "Look for cracks, cuts or worn tread, and replace tyres before they become smooth.",
          "If the brakes feel spongy or need more lever travel than usual, get them adjusted right away.",
        ],
      },
      {
        heading: "6. Lights, horn and battery",
        paragraphs: [
          "Before night rides, check the headlight, indicators, brake light and horn. Keep battery terminals clean and tight. These checks take a minute and prevent most roadside surprises.",
        ],
      },
      {
        paragraphs: [
          "Genuine ROHI spare parts are available through our dealer network across Pakistan. Using genuine parts keeps your bike performing the way it was designed to.",
        ],
      },
    ],
  },
  {
    slug: "riding-in-summer-heat-motorcycle-care",
    title: "Riding Through Pakistani Summers: Heat Care for You and Your Bike",
    description:
      "Practical tips for riding a motorcycle in extreme summer heat in Pakistan: protecting yourself, your engine, your tyres and your battery.",
    category: "Riding Tips",
    readTime: "4 min read",
    published: "2026-06-10",
    image: "/image/gallery/gallery_dune_rider.jpg",
    imageAlt: "Rider crossing sand dunes on a red motorcycle",
    sections: [
      {
        paragraphs: [
          "Summer temperatures across South Punjab and Sindh regularly pass 45°C. Air-cooled motorcycles are built for this, but heat is hard on riders and machines alike. A few habits make summer riding safer and easier.",
        ],
      },
      {
        heading: "Look after yourself first",
        list: [
          "Carry water and drink before you feel thirsty.",
          "Wear a light-coloured, ventilated helmet and cover your arms to avoid sunburn.",
          "Plan longer trips for early morning or evening and take shade breaks.",
          "Watch for signs of heat exhaustion: dizziness, headache or nausea mean stop and cool down.",
        ],
      },
      {
        heading: "Engine",
        paragraphs: [
          "Air-cooled engines rely on moving air. Long idling in traffic jams makes them run hot, so switch off during long waits when it is safe to do so. Keep the oil topped up and changed on time: oil does most of the cooling work inside the engine.",
        ],
      },
      {
        heading: "Tyres",
        paragraphs: [
          "Heat raises tyre pressure and softens rubber. Check pressure in the morning while the tyres are cold, and replace tyres that show cracks or bulges.",
        ],
      },
      {
        heading: "Battery and fuel",
        paragraphs: [
          "Heat shortens battery life, so keep terminals clean and get the battery checked at each service. Park in the shade where possible to reduce fuel evaporation and keep the seat cool.",
        ],
      },
    ],
  },
  {
    slug: "electric-vs-petrol-motorcycle-pakistan",
    title: "Electric or Petrol: Is an Electric Motorcycle Right for Your Commute?",
    description:
      "Thinking about an electric motorcycle in Pakistan? Compare running costs, range, charging and maintenance with a petrol bike before you decide.",
    category: "Electric",
    readTime: "5 min read",
    published: "2026-07-22",
    image: "/image/hero_tunnel_stage.jpg",
    imageAlt: "Illuminated geometric showroom stage",
    sections: [
      {
        paragraphs: [
          "Rising fuel prices have made many riders ask whether an electric motorcycle makes sense. For the right kind of commute the answer is often yes. Here is how electric and petrol compare in daily use.",
        ],
      },
      {
        heading: "Running costs",
        paragraphs: [
          "Charging a battery at home costs far less per kilometre than petrol. Electric bikes also skip engine oil changes, spark plugs, air filters and clutch adjustments, so routine servicing is simpler and cheaper.",
        ],
      },
      {
        heading: "Range and charging",
        paragraphs: [
          "Range is the key question. Electric commuters are ideal when your daily distance comfortably fits within one charge and you can charge overnight at home. If you regularly ride long intercity distances, a petrol bike is still more practical.",
          "Real range depends on load, speed, terrain and temperature, so plan with a margin rather than the maximum figure.",
        ],
      },
      {
        heading: "Riding experience",
        list: [
          "No gears or clutch: twist and go, which suits stop-and-go city traffic.",
          "Quiet and smooth, with instant pull from a standstill.",
          "Petrol bikes refuel in minutes and are easier on long trips.",
        ],
      },
      {
        heading: "Which should you choose?",
        paragraphs: [
          "If you ride mostly within the city and can charge at home, an electric motorcycle like the ROHI Electric Bike can cut your running costs significantly. If you travel long distances or cannot charge regularly, a ROHI 70cc or 100cc remains the dependable choice. Your local ROHI dealer can help you compare both.",
        ],
      },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function formatPostDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
