"use client";

import { useState } from "react";
import { productMocks } from "@/components/products/ProductMocks";
import { cn } from "@/lib/utils";

type ProductSlug = keyof typeof productMocks;

/**
 * Shows a real screenshot from `/public/products/{slug}.(svg|png|webp)` when present.
 * Falls back to the built-in mock UI if the file is missing or fails to load.
 *
 * Drop replacement media (prefer SVG or crisp PNG) at:
 *   public/products/iso-genie.png|.svg
 *   public/products/api-genie.png|.svg
 *   public/products/insight.png|.svg
 *   public/products/decipher.png|.svg
 * Optional product logos:
 *   public/products/logos/{slug}-logo.svg|.png
 */
export function ProductMedia({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  const Mock = productMocks[slug as ProductSlug];
  // Screenshots are usually PNG/WebP; SVG is also accepted for crisp UI captures.
  const candidates = [`/products/${slug}.png`, `/products/${slug}.webp`, `/products/${slug}.svg`];
  const [srcIndex, setSrcIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const failed = srcIndex >= candidates.length;

  if (!Mock) return null;

  if (failed) {
    return <Mock className={className} />;
  }

  return (
    <div className={cn("relative", className)}>
      {!loaded && <Mock className="relative" />}
      {/* eslint-disable-next-line @next/next/no-img-element -- drop-in public screenshots with runtime fallback */}
      <img
        key={candidates[srcIndex]}
        src={candidates[srcIndex]}
        alt=""
        width={1280}
        height={800}
        className={cn(
          "relative w-full rounded-[1.6rem] border border-white/12 object-cover object-top shadow-[0_40px_120px_-40px_rgb(0_0_0/0.9)]",
          loaded ? "block" : "absolute inset-0 h-full opacity-0",
        )}
        onLoad={() => setLoaded(true)}
        onError={() => {
          setLoaded(false);
          setSrcIndex((i) => i + 1);
        }}
      />
    </div>
  );
}
