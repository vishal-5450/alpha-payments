import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { testimonials } from "@/lib/site";

export function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-white section-y">
      <div className="container-x">
        <SectionHeading
          align="center"
          eyebrow="What clients say"
          title={
            <>
              Trusted where <span className="text-gradient">downtime is not an option.</span>
            </>
          }
        />
        <Stagger className="mt-14 grid gap-6 md:grid-cols-3" stagger={0.12}>
          {testimonials.map((t, i) => (
            <StaggerItem key={i} className="h-full">
              <figure className="ring-gradient relative flex h-full flex-col rounded-[1.75rem] border border-ink-800/8 bg-surface p-8 transition-[transform,box-shadow] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]">
                <Quote className="size-8 text-brand-500/40" />
                <blockquote className="mt-5 flex-1 text-[1.02rem] leading-relaxed text-ink-800/80">“{t.quote}”</blockquote>
                <figcaption className="mt-8 flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-full bg-[linear-gradient(135deg,#0b5fc2,#3fa9f5)] font-display text-sm font-bold text-white">
                    {t.name
                      .split(" ")
                      .slice(0, 2)
                      .map((w) => w[0])
                      .join("")}
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-ink-800">{t.name}</div>
                    <div className="text-xs text-ink-800/55">{t.org}</div>
                  </div>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
