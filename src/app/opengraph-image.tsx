import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Default social-share card (WhatsApp, Facebook, X, LinkedIn) for every page
// that doesn't set its own image.
export const alt = "ROHI Motorcycles: 70cc, 100cc and electric motorcycles made in Pakistan";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const publicDir = join(process.cwd(), "public", "image");
  const [logo, bike] = await Promise.all([
    // Small pre-sized copies (og-logo.png, og-bike.png): the full-size PNGs make the renderer unreliable
    readFile(join(publicDir, "og-logo.png"), "base64"),
    readFile(join(publicDir, "og-bike.png"), "base64"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "radial-gradient(ellipse 70% 80% at 72% 60%, #3a0a0d 0%, #07070a 70%)",
          color: "#ffffff",
          padding: "56px 64px",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 500 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`data:image/png;base64,${logo}`} width={130} height={100} alt="" style={{ objectFit: "contain" }} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 0.95, letterSpacing: -1 }}>ROHI Motorcycles</div>
            <div style={{ marginTop: 20, fontSize: 30, color: "#d4d4d8", lineHeight: 1.3 }}>
              70cc, 100cc &amp; electric motorcycles, made in Bahawalpur, Pakistan
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 20, color: "#a1a1aa", letterSpacing: 2 }}>
            REHMAN AUTO INDUSTRY · 300+ DEALERS
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/png;base64,${bike}`}
          alt=""
          width={600}
          height={450}
          style={{ position: "absolute", right: 28, bottom: 70, objectFit: "contain" }}
        />
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 10, background: "#e7000b" }} />
      </div>
    ),
    size
  );
}
