import type { Metadata } from "next";
import { OG_DEFAULTS } from "@/lib/site";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { POSTS, formatPostDate } from "@/data/posts";

export const metadata: Metadata = {
  title: "Blog: Motorcycle Buying Guides, Maintenance & Riding Tips",
  description:
    "Practical motorcycle advice for Pakistani riders from ROHI: choosing between 70cc and 100cc, maintenance routines, summer riding tips and electric vs petrol bikes.",
  alternates: { canonical: "/blog" },
  openGraph: {
    ...OG_DEFAULTS,
    url: "/blog",
    title: "The ROHI Blog",
    description: "Buying guides, maintenance routines and riding tips for motorcyclists in Pakistan.",
  },
};

export default function BlogPage() {
  const [featured, ...rest] = POSTS;

  return (
    <div className="relative min-h-screen bg-canvas text-white flex flex-col justify-between selection:bg-red-600 selection:text-white overflow-x-clip">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[500px] bg-gradient-to-b from-red-950/15 via-elevated/40 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[550px] bg-red-900/10 blur-[130px]" />
      </div>

      <Navbar />

      <main className="relative z-10 flex-1 max-w-[1400px] mx-auto w-full px-6 md:px-12 lg:px-16 py-10 md:py-16">
        <header className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/10 font-mono text-xs uppercase tracking-[0.2em] text-zinc-300 mb-5">
            The ROHI Blog
          </span>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold uppercase leading-[0.92] text-white">
            Practical reads to help you{" "}
            <span className="font-serif normal-case italic font-normal text-red-500">ride further</span>
          </h1>
          <p className="mt-5 text-base md:text-lg text-zinc-400 leading-relaxed">
            Buying guides, maintenance routines and riding tips for motorcyclists across Pakistan.
          </p>
        </header>

        {/* Featured article */}
        <Link
          href={`/blog/${featured.slug}`}
          className="glass-card-frosted group block overflow-hidden hover:border-red-500/50 mb-10 md:mb-12"
        >
          <article className="grid grid-cols-1 md:grid-cols-12 items-center">
            <div className="md:col-span-6 relative h-64 sm:h-80 md:h-[400px] w-full overflow-hidden">
              <Image
                src={featured.image}
                alt={featured.imageAlt}
                fill
                preload
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-transparent via-elevated/50 light:via-transparent to-elevated pointer-events-none" />
            </div>

            <div className="md:col-span-6 p-6 sm:p-8 md:p-12">
              <span className="inline-block px-3.5 py-1 rounded-full bg-white/[0.06] border border-white/10 font-mono text-xs uppercase tracking-[0.16em] text-zinc-300 mb-4">
                {featured.category}
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold uppercase leading-[0.95] text-white group-hover:text-red-400 transition-colors">
                {featured.title}
              </h2>
              <p className="text-base text-zinc-300 mt-4 leading-relaxed">{featured.description}</p>
              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-sm text-zinc-400">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  {featured.readTime}
                </span>
                <time dateTime={featured.published}>{formatPostDate(featured.published)}</time>
              </div>
            </div>
          </article>
        </Link>

        {/* More articles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="glass-card-frosted group p-4 sm:p-5 flex flex-col justify-between hover:border-red-500/50"
            >
              <article>
                <div data-theme="dark" className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-5">
                  <Image
                    src={post.image}
                    alt={post.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-200">
                    {post.category}
                  </span>
                </div>

                <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase leading-tight text-white group-hover:text-red-400 transition-colors">
                  {post.title}
                </h2>
                <p className="text-sm text-zinc-400 mt-3 leading-relaxed line-clamp-3">{post.description}</p>
              </article>

              <div className="mt-6 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400">
                <span>{post.readTime}</span>
                <span className="font-semibold text-red-400 group-hover:translate-x-1 transition-transform">
                  Read article →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
