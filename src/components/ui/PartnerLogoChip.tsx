"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/** Logo slot for partner / platform chips. Looks for `/partners/{slug}.png`. */
export function PartnerLogoChip({
  name,
  slug,
  className,
}: {
  name: string;
  slug: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const letter = name.replace(/[^A-Za-z0-9]/g, "").slice(0, 2).toUpperCase();

  return (
    <div
      className={cn(
        "flex h-14 items-center gap-3 rounded-2xl border border-ink-800/8 bg-white px-5 font-display text-base font-bold tracking-tight text-ink-800/70 shadow-[var(--shadow-card)] transition hover:text-ink-800",
        className,
      )}
    >
      <span className="grid size-8 shrink-0 place-items-center overflow-hidden rounded-lg border border-ink-800/8 bg-surface-2">
        {!failed ? (
          // eslint-disable-next-line @next/next/no-img-element -- drop-in public logos with runtime fallback
          <img
            src={`/partners/${slug}.png`}
            alt=""
            width={32}
            height={32}
            className="size-7 object-contain"
            onError={() => setFailed(true)}
          />
        ) : (
          <span className="text-[0.65rem] font-bold tracking-tight text-brand-700" aria-hidden="true">
            {letter}
          </span>
        )}
      </span>
      <span className="truncate">{name}</span>
    </div>
  );
}
