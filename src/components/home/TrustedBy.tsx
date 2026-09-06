import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";
import { trustedBy } from "@/lib/site";

/** Placeholder logo tiles. Swap the text for <Image> logos in /public/partners when available. */
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
          {trustedBy.map((name) => (
            <div
              key={name}
              className="flex h-14 items-center gap-3 rounded-2xl border border-ink-800/8 bg-white px-6 font-display text-base font-bold tracking-tight text-ink-800/55 shadow-[var(--shadow-card)] transition hover:text-ink-800"
            >
              <span className="size-2 rounded-full bg-[linear-gradient(135deg,#0b5fc2,#3fa9f5)]" />
              {name}
            </div>
          ))}
        </Marquee>
      </Reveal>
    </section>
  );
}
