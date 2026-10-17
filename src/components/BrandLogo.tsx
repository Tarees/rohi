import Image from "next/image";

interface BrandLogoProps {
  className?: string;
  sizes: string;
}

/**
 * ROHI logo that follows the active theme: white artwork on dark surfaces,
 * black artwork on light ones. Both images render and CSS shows the right one,
 * so there is no flash or hydration mismatch. Must sit inside a positioned
 * parent with a size (images use `fill`). Both images are decorative — give the
 * surrounding link or container its own accessible name. Never preload it: only
 * one of the two variants is visible, so a preload would waste the other request.
 */
export default function BrandLogo({ className = "", sizes }: BrandLogoProps) {
  return (
    <>
      <Image
        src="/image/rohi_white_clean.png"
        alt=""
        aria-hidden="true"
        fill
        sizes={sizes}
        className={`on-dark-only ${className}`}
      />
      <Image
        src="/image/Rohi-black-logo.png"
        alt=""
        aria-hidden="true"
        fill
        sizes={sizes}
        className={`on-light-only ${className}`}
      />
    </>
  );
}
