"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LINEUP } from "@/data/bikes";
import { ADDRESS_LINE, COMPANY, MAPS_URL } from "@/lib/site";

const INTERESTS = [
  "Buying a motorcycle",
  ...LINEUP.map((b) => b.name.replace("CLASSIC", "Classic").replace("E-BIKE", "Electric Bike")),
  "Commercial models (loader, school van, cargo)",
  "Spare parts",
  "Service or warranty",
  "Becoming a dealer",
];

const inputClass =
  "w-full bg-card/70 hover:bg-card-hover/80 focus:bg-card-hover border border-white/10 focus:border-red-500/70 rounded-2xl px-5 py-4 text-base text-white placeholder:text-zinc-500 focus:outline-none transition-all";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", city: "", interest: INTERESTS[0], message: "" });

  const composeMessage = () => {
    const details = [`Name: ${form.name}`, ...(form.city ? [`City: ${form.city}`] : []), `Enquiry: ${form.interest}`];
    return ["Assalam-o-Alaikum ROHI team,", "", ...details, "", form.message].join("\n");
  };

  // No server-side mail yet: the form hands the message to WhatsApp or the visitor's email app.
  const sendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(composeMessage())}`, "_blank", "noopener");
  };

  const sendEmail = () => {
    const subject = `Website enquiry: ${form.interest}`;
    window.location.href = `mailto:${COMPANY.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(composeMessage())}`;
  };

  const canSend = form.name.trim() !== "" && form.message.trim() !== "";

  return (
    <div className="relative min-h-screen w-full bg-canvas text-white flex flex-col justify-between overflow-clip selection:bg-red-600 selection:text-white">
      {/* Background layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-elevated/40 via-red-950/10 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-red-900/10 blur-[120px]" />
        <div className="absolute top-24 md:top-20 left-1/2 -translate-x-1/2 select-none w-full text-center" aria-hidden="true">
          <span className="font-display font-extrabold uppercase tracking-wide text-[20vw] md:text-[16vw] text-white/[0.04] leading-none block">
            Contact
          </span>
        </div>
      </div>

      <Navbar />

      <main className="relative z-10 flex-1 w-full px-6 md:px-12 lg:px-16 py-10 md:py-16">
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left: details */}
          <div className="lg:col-span-5">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/10 font-mono text-xs uppercase tracking-[0.2em] text-zinc-300 mb-5">
              Contact
            </span>

            <h1 className="font-display text-6xl md:text-7xl font-bold uppercase leading-[0.9] text-white">
              Get in touch
            </h1>

            <p className="mt-4 text-base md:text-lg text-zinc-400 leading-relaxed max-w-md">
              Questions about a model, price, spare parts or your nearest dealer? Our team in Bahawalpur will help
              you.
            </p>

            <ul className="mt-8 space-y-3.5">
              <ContactCard
                href={`tel:${COMPANY.phoneIntl}`}
                label="Call us"
                value={COMPANY.phone}
                icon="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
              <ContactCard
                href={`https://wa.me/${COMPANY.whatsapp}`}
                external
                label="WhatsApp"
                value={COMPANY.phone}
                icon="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
              <ContactCard
                href={`mailto:${COMPANY.email}`}
                label="Email us"
                value={<EmailAddress email={COMPANY.email} />}
                icon="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
              <ContactCard
                href={MAPS_URL}
                external
                label="Factory & head office"
                value={ADDRESS_LINE}
                icon="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </ul>

            <div className="mt-8">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500">Email our team directly</h2>
              <ul className="mt-3 space-y-2.5">
                {COMPANY.teamEmails.map(({ name, email }) => (
                  <li key={email}>
                    <a
                      href={`mailto:${email}`}
                      className="glass-card-frosted group block px-5 py-3.5 hover:border-red-500/40 transition-colors"
                    >
                      <span className="block text-sm font-semibold text-zinc-100">{name}</span>
                      <span className="block text-sm text-zinc-400 group-hover:text-white transition-colors">
                        <EmailAddress email={email} />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-6 text-sm text-zinc-500 leading-relaxed">
              Looking for a dealer? ROHI has {COMPANY.dealerCount}+ dealers across {COMPANY.regions.join(", ")}.
              Send us your city and we&apos;ll point you to the nearest one.
            </p>
          </div>

          {/* Right: enquiry form */}
          <div className="lg:col-span-7">
            <form onSubmit={sendWhatsApp} className="glass-card-frosted relative p-6 sm:p-8 md:p-10 space-y-4">
              <h2 className="font-display text-3xl font-bold uppercase text-white">Send an enquiry</h2>
              <p className="text-sm text-zinc-400 -mt-1">
                Fill in your details and send them straight to our team on WhatsApp or by email.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <label className="block">
                  <span className="sr-only">Your name</span>
                  <input
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={inputClass}
                  />
                </label>
                <label className="block">
                  <span className="sr-only">Your city</span>
                  <input
                    type="text"
                    autoComplete="address-level2"
                    placeholder="City"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className={inputClass}
                  />
                </label>
              </div>

              <label className="block">
                <span className="sr-only">What is your enquiry about?</span>
                <select
                  value={form.interest}
                  onChange={(e) => setForm({ ...form, interest: e.target.value })}
                  className={`${inputClass} appearance-none cursor-pointer`}
                >
                  {INTERESTS.map((option) => (
                    <option key={option} value={option} className="bg-card text-white">
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="sr-only">Your message</span>
                <textarea
                  rows={5}
                  required
                  placeholder="Your message"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`${inputClass} resize-none`}
                />
              </label>

              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-semibold text-base tracking-wide transition-all shadow-[0_0_25px_rgba(255,30,39,0.35)] cursor-pointer active:scale-[0.99]"
                >
                  Send on WhatsApp
                </button>
                <button
                  type="button"
                  onClick={sendEmail}
                  disabled={!canSend}
                  className="w-full py-4 rounded-2xl bg-white hover:bg-zinc-200 text-canvas font-semibold text-base tracking-wide transition-all cursor-pointer active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Send by email
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function ContactCard({
  href,
  label,
  value,
  icon,
  external,
}: {
  href: string;
  label: string;
  value: React.ReactNode;
  icon: string;
  external?: boolean;
}) {
  return (
    <li>
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="glass-card-frosted group p-4 md:p-5 flex items-center justify-between gap-4 hover:border-red-500/40"
      >
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-12 h-12 shrink-0 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-zinc-300 group-hover:text-red-400 group-hover:border-red-500/30 transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={icon} />
            </svg>
          </div>
          <div className="text-left min-w-0">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500 block">{label}</span>
            <span className="text-base lg:text-sm xl:text-base text-zinc-100 font-semibold group-hover:text-white transition-colors break-words">
              {value}
            </span>
          </div>
        </div>
        <span className="w-9 h-9 shrink-0 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:bg-red-600 group-hover:border-red-500 transition-all">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H9M17 7V15" />
          </svg>
        </span>
      </a>
    </li>
  );
}

/** Lets a long address wrap after the "@" instead of mid-word on narrow screens. */
function EmailAddress({ email }: { email: string }) {
  const [user, domain] = email.split("@");
  return (
    <>
      {user}@<wbr />
      {domain}
    </>
  );
}
