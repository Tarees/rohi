import Link from "next/link";
import { COMPANY, jsonLd } from "@/lib/site";

// Questions people actually search for ("rohi bikes", "rohi auto industries", "electric scooter
// pakistan", "best bike in pakistan"...), answered from the company profile. The same text is
// published as FAQPage structured data, so the visible answers and the data always match.

interface Faq {
  question: string;
  answer: string;
  link?: { href: string; label: string };
}

const FAQS: Faq[] = [
  {
    question: "What are ROHI bikes?",
    answer: `ROHI bikes (ROHI Motorcycles) are motorcycles made by ${COMPANY.legalName}, a Pakistani manufacturer based in Bahawalpur. The company is also searched for as Rohi Auto Industries or Rehman Auto Industries. For about ${COMPANY.yearsInBusiness} years it has built 70cc and 100cc motorcycles, commercial models, an electric bike and a scooty for everyday riders across Pakistan.`,
    link: { href: "/about", label: "About Rehman Auto Industry" },
  },
  {
    question: "Where are ROHI motorcycles made?",
    answer: `Every ROHI motorcycle is built at the ${COMPANY.legalName} plant on ${COMPANY.address.street}, ${COMPANY.address.city}, Punjab. The plant can produce up to ${COMPANY.monthlyCapacity.toLocaleString("en-US")} motorcycles a month, and ROHI is certified by the Engineering Development Board (EDB) and the Pakistan Standards & Quality Control Authority (PSQCA).`,
  },
  {
    question: "Does ROHI make electric bikes and electric scooters?",
    answer:
      "Yes. The ROHI Electric Bike has a rear hub motor, no gears and no engine oil, charges from a normal home socket and covers up to about 70 km per charge depending on load and riding. ROHI also makes the ROHI Scooty for easy city riding. Ask your nearest dealer about current availability.",
    link: { href: "/models/rohi-electric-bike", label: "See the ROHI Electric Bike" },
  },
  {
    question: "Which is the best ROHI bike for me?",
    answer:
      "It depends on how you ride. A 70cc such as the ROHI SR70 or R170 Classic is light and very economical for city commuting. A 100cc such as the ROHI RL-100 or RF-100 has more pulling power for a passenger, goods or highway riding. The electric bike suits short daily city trips with no petrol cost.",
    link: { href: "/blog/70cc-vs-100cc-motorcycle-which-to-choose", label: "Read: 70cc or 100cc?" },
  },
  {
    question: "Where can I buy a ROHI motorcycle, and what is the price?",
    answer: `ROHI motorcycles are sold through ${COMPANY.dealerCount}+ dealers in Punjab, Sindh, Khyber Pakhtunkhwa, Balochistan and Azad Kashmir. Prices vary by model and city, so contact us on ${COMPANY.phone} (call or WhatsApp) or email ${COMPANY.email} for the latest price and your nearest dealer.`,
    link: { href: "/contact", label: "Find a dealer" },
  },
  {
    question: "Do ROHI bikes come with a warranty?",
    answer: `Yes. Every ROHI product comes with a ${COMPANY.warrantyMonths}-month after-sales warranty, and genuine spare parts and service are available through the dealer network.`,
    link: { href: "/services", label: "Warranty and service" },
  },
];

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function FaqSection() {
  return (
    <section
      id="faq"
      data-choreo="true"
      aria-labelledby="faq-heading"
      className="relative w-full pb-16 sm:pb-24 bg-canvas text-white"
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqLd) }} />

      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="text-center mb-10">
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-red-400 font-semibold">
            Questions
          </span>
          <h2
            id="faq-heading"
            data-reveal="true"
            className="mt-3 font-display text-5xl sm:text-6xl font-bold uppercase leading-[0.92] text-white"
          >
            About ROHI{" "}
            <span className="font-serif normal-case italic font-normal text-red-500">bikes</span>
          </h2>
        </div>

        <div className="divide-y divide-white/10 border-y border-white/10">
          {FAQS.map((faq) => (
            <details key={faq.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 [&::-webkit-details-marker]:hidden">
                <h3 className="font-sans text-lg sm:text-xl font-semibold text-white group-hover:text-red-400 transition-colors">
                  {faq.question}
                </h3>
                <span
                  aria-hidden="true"
                  className="shrink-0 w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-zinc-400 transition-transform duration-300 group-open:rotate-45"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeWidth={2} d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </summary>
              <p className="mt-3 text-base text-zinc-300 leading-relaxed max-w-3xl">{faq.answer}</p>
              {faq.link && (
                <Link
                  href={faq.link.href}
                  className="mt-3 inline-block text-sm font-semibold text-red-400 hover:text-red-300"
                >
                  {faq.link.label} →
                </Link>
              )}
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
