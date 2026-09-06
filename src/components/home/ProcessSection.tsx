"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { processSteps } from "@/lib/site";

export function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });
  const scaleX = useTransform(progress, [0, 1], [0, 1]);

  return (
    <section className="relative overflow-hidden bg-white section-y">
      <div className="container-x">
        <SectionHeading
          align="center"
          eyebrow="How we deliver"
          title={
            <>
              A structured path from <span className="text-gradient">design to go-live.</span>
            </>
          }
          description="Every engagement follows the same disciplined lifecycle, so risk is visible early and delivery dates hold."
        />

        <div ref={ref} className="relative mt-20">
          {/* Track */}
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-ink-800/10 lg:block" />
          <motion.div
            className="absolute left-0 right-0 top-7 hidden h-px origin-left bg-[linear-gradient(90deg,#0b5fc2,#3fa9f5,#5eead4)] lg:block"
            style={{ scaleX }}
          />

          <Stagger className="grid gap-10 lg:grid-cols-5 lg:gap-6" stagger={0.1}>
            {processSteps.map((step, i) => (
              <StaggerItem key={step.step} className="relative">
                <div className="relative z-10 grid size-14 place-items-center rounded-full border border-brand-600/15 bg-white font-display text-lg font-bold text-brand-700 shadow-[var(--shadow-card)]">
                  {step.step}
                  <span className="absolute inset-0 rounded-full border border-brand-500/20 animate-pulse-ring [animation-delay:var(--d)]" style={{ ["--d" as string]: `${i * 0.4}s` }} />
                </div>
                <h3 className="mt-6 font-display text-xl font-bold tracking-tight text-ink-800">{step.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-800/65">{step.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
