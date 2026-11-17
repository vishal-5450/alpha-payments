"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Logo slot for partner / platform chips.
 *
 * Looks for files in this order:
 *   /partners/{slug}.svg
 *   /partners/{slug}.png
 *   /partners/{slug}.webp
 *
 * Drop official brand assets into `public/partners/` using the slug filename.
 * Until a file exists (or if it fails to load), a lettermark is shown — never a broken image icon.
 */
export function PartnerLogoChip({
  name,
  slug,
  className,
}: {
  name: string;
  slug: string;
  className?: string;
}) {
  const candidates = [`/partners/${slug}.svg`, `/partners/${slug}.png`, `/partners/${slug}.webp`];
  const [srcIndex, setSrcIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const failed = srcIndex >= candidates.length;
  const letter = name.replace(/[^A-Za-z0-9]/g, "").slice(0, 2).toUpperCase();
  const showLetter = failed || !loaded;

  return (
    <div
      className={cn(
        "flex h-14 items-center gap-3 rounded-2xl border border-ink-800/8 bg-white px-5 font-display text-base font-bold tracking-tight text-ink-800/70 shadow-[var(--shadow-card)] transition hover:text-ink-800",
        className,
      )}
    >
      <span className="relative grid size-8 shrink-0 place-items-center overflow-hidden rounded-lg border border-ink-800/8 bg-surface-2">
        {!failed && (
          // eslint-disable-next-line @next/next/no-img-element -- drop-in public logos with runtime fallback
          <img
            key={candidates[srcIndex]}
            src={candidates[srcIndex]}
            alt=""
            width={32}
            height={32}
            className={cn("size-7 object-contain transition-opacity", loaded ? "opacity-100" : "opacity-0")}
            onLoad={() => setLoaded(true)}
            onError={() => {
              setLoaded(false);
              setSrcIndex((i) => i + 1);
            }}
          />
        )}
        {showLetter && (
          <span
            className={cn(
              "text-[0.65rem] font-bold tracking-tight text-brand-700",
              !failed && "absolute inset-0 grid place-items-center",
            )}
            aria-hidden="true"
          >
            {letter}
          </span>
        )}
      </span>
      <span className="truncate">{name}</span>
    </div>
  );
}
