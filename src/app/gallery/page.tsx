import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function GalleryPage() {
  return (
    <div className="relative min-h-screen bg-canvas text-white flex flex-col justify-between selection:bg-red-600 selection:text-white overflow-x-clip">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] max-w-full h-[500px] bg-red-900/15 blur-[140px] rounded-full" />
      </div>

      <Navbar />

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 py-24">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-red-400 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/30">
          Gallery
        </span>
        <h1 className="mt-8 font-display text-6xl sm:text-8xl md:text-9xl font-extrabold uppercase leading-[0.88] text-white">
          Something big
          <span className="block font-serif normal-case italic font-normal text-red-500">is coming soon</span>
        </h1>
      </main>

      <Footer />
    </div>
  );
}
