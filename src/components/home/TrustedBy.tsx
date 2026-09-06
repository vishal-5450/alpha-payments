"use client";

import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";
import { PartnerLogoChip } from "@/components/ui/PartnerLogoChip";
import { trustedBy } from "@/lib/site";

/**
 * Partner / platform strip on the home page.
 *
 * Drop logo files into `public/partners/` using the slug filename, e.g.:
 *   public/partners/rupay.png
 * Prefer PNG, transparent background, ~120–200px wide.
 * Until a file exists, a lettermark placeholder is shown in the logo slot.
 */
export function TrustedBy() {
  return (
    <section id="trusted" className="relative border-b border-ink-800/6 bg-surface py-14">
      <div className="container-x">
        <Reveal y={12}>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-ink-800/45">
            Expertise across the platforms and networks that move money
          </p>
        </Reveal>
      </div>
      <Reveal delay={0.1} className="mt-8">
        <Marquee speed={45}>
          {trustedBy.map((item) => (
            <PartnerLogoChip key={item.slug} name={item.name} slug={item.slug} />
          ))}
        </Marquee>
      </Reveal>
    </section>
  );
}
