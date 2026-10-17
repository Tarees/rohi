import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { POSTS, formatPostDate, getPost } from "@/data/posts";
import { COMPANY, OG_DEFAULTS, SITE_URL, absoluteUrl, jsonLd } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      ...OG_DEFAULTS,
      type: "article",
      url: `/blog/${post.slug}`,
      title: post.title,
      description: post.description,
      publishedTime: post.published,
      authors: [COMPANY.brand],
      images: [{ url: post.image, alt: post.imageAlt }],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const others = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description,
        image: absoluteUrl(post.image),
        datePublished: post.published,
        dateModified: post.published,
        author: { "@type": "Organization", name: COMPANY.brand, url: SITE_URL },
        publisher: { "@id": `${SITE_URL}/#organization` },
        mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
        articleSection: post.category,
        inLanguage: "en-PK",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
          { "@type": "ListItem", position: 3, name: post.title, item: absoluteUrl(`/blog/${post.slug}`) },
        ],
      },
    ],
  };

  return (
    <div className="relative min-h-screen bg-canvas text-white flex flex-col selection:bg-red-600 selection:text-white overflow-x-clip">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }} />

      <Navbar />

      <main className="relative z-10 flex-1 w-full px-6 md:px-12 py-8 md:py-12">
        <article className="max-w-3xl mx-auto">
          <nav aria-label="Breadcrumb" className="text-sm text-zinc-500">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-white">Home</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/blog" className="hover:text-white">Blog</Link>
              </li>
            </ol>
          </nav>

          <header className="mt-6">
            <span className="inline-block px-3 py-1 rounded-full bg-red-600/15 border border-red-500/30 font-mono text-[11px] uppercase tracking-[0.16em] text-red-400">
              {post.category}
            </span>
            <h1 className="mt-4 font-display text-5xl md:text-6xl font-bold uppercase leading-[0.95] text-white">
              {post.title}
            </h1>
            <p className="mt-5 text-lg md:text-xl leading-relaxed text-zinc-300">{post.description}</p>
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-zinc-500">
              <span>By {COMPANY.brand}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={post.published}>{formatPostDate(post.published)}</time>
              <span aria-hidden="true">·</span>
              <span>{post.readTime}</span>
            </div>
          </header>

          <div className="relative mt-8 w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/10">
            <Image src={post.image} alt={post.imageAlt} fill preload sizes="(max-width: 768px) 100vw, 768px" className="object-cover" />
          </div>

          {/* Article body: comfortable measure and rhythm for long-form reading */}
          <div className="mt-10 text-[17px] leading-[1.75] text-zinc-300">
            {post.sections.map((section, i) => (
              <section key={i} className="mt-8 first:mt-0">
                {section.heading && (
                  <h2 className="font-display text-3xl font-bold uppercase leading-tight text-white mb-3">
                    {section.heading}
                  </h2>
                )}
                {section.paragraphs?.map((para, j) => (
                  <p key={j} className="mt-4 first:mt-0">
                    {para}
                  </p>
                ))}
                {section.list && (
                  <ul className="mt-4 space-y-2.5">
                    {section.list.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          {/* Call to action */}
          <div className="mt-14 rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-red-950/20 via-card/90 to-red-950/20 border border-red-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl font-bold uppercase leading-none text-white">Visit a ROHI dealer</h2>
              <p className="mt-2 text-sm text-zinc-400">Test ride a 70cc, 100cc or electric ROHI near you.</p>
            </div>
            <Link
              href="/models"
              className="shrink-0 px-6 py-3 rounded-full bg-red-600 hover:bg-red-500 text-white text-sm font-semibold tracking-wide shadow-[0_0_20px_rgba(255,30,39,0.5)] transition-all"
            >
              See the lineup
            </Link>
          </div>
        </article>

        {/* More articles */}
        <section className="max-w-5xl mx-auto mt-20 border-t border-white/10 pt-12">
          <h2 className="font-display text-4xl font-bold uppercase text-white">More from the blog</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {others.map((other) => (
              <Link key={other.slug} href={`/blog/${other.slug}`} className="group block">
                <div data-theme="dark" className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10">
                  <Image
                    src={other.image}
                    alt={other.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-red-400">{other.category}</p>
                <h3 className="mt-1 font-display text-2xl font-bold uppercase leading-tight text-white group-hover:text-red-400 transition-colors">
                  {other.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
