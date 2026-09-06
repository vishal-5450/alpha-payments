"use client";

import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { Aurora } from "@/components/ui/Aurora";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { SplitText } from "@/components/ui/Reveal";
import { TransactionFlow } from "./TransactionFlow";

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 24, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] as const },
});

export function Hero() {
  return (
    <section className="noise relative isolate overflow-hidden bg-ink-900 text-white">
      <Aurora />
      <div className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]" />
      {/* Horizon glow */}
      <div className="absolute inset-x-0 bottom-0 h-[40vh] bg-[radial-gradient(ellipse_at_bottom,rgb(30_136_229/0.35),transparent_65%)]" />

      <div className="container-x relative grid min-h-svh items-center gap-14 pt-32 pb-24 lg:grid-cols-12 lg:gap-10 lg:pt-36">
        <div className="lg:col-span-6">
          <motion.div {...fade(0.1)}>
            <Eyebrow tone="dark">Payments technology · Mumbai</Eyebrow>
          </motion.div>

          <SplitText
            text="Delivering unmatched quality in every transaction."
            className="mt-7 font-display text-[2.75rem] font-bold leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-[4.6rem]"
            delay={0.2}
          />

          <motion.p {...fade(0.75)} className="mt-7 max-w-xl text-lg leading-relaxed text-white/68 sm:text-xl">
            Alpha Payments deploys banking and switching solutions quickly and effectively. From
            <span className="text-white"> Base24 and Postilion </span>
            implementations to real-time monitoring and automation, we take you from design to production with a
            structured, comprehensive approach.
          </motion.p>

          <motion.div {...fade(0.9)} className="mt-10 flex flex-wrap items-center gap-3">
            <Button href="/contact" variant="white" size="lg" arrow>
              Talk to an expert
            </Button>
            <Button href="/products" variant="outline-light" size="lg">
              Explore products
            </Button>
          </motion.div>

          <motion.dl {...fade(1.05)} className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-8">
            {[
              { k: "24×7", v: "Production support" },
              { k: "Base24", v: "Certified switch experts" },
              { k: "Since 2019", v: "Trusted by banks" },
            ].map((s) => (
              <div key={s.k}>
                <dt className="font-display text-xl font-bold text-white sm:text-2xl">{s.k}</dt>
                <dd className="mt-1 text-xs text-white/50 sm:text-sm">{s.v}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <div className="relative lg:col-span-6">
          <TransactionFlow />
        </div>
      </div>

      <motion.a
        href="#trusted"
        aria-label="Scroll to content"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-[0.65rem] uppercase tracking-[0.25em] text-white/40 transition hover:text-white/80 lg:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        Scroll
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}>
          <ChevronDown className="size-4" />
        </motion.span>
      </motion.a>
    </section>
  );
}
