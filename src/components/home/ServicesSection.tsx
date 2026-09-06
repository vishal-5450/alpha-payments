import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { services } from "@/lib/site";

export function ServicesSection() {
  return (
    <section className="relative overflow-hidden bg-surface section-y">
      <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="container-x relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="What we do"
            title={
              <>
                Three disciplines. <span className="text-gradient">One standard of quality.</span>
              </>
            }
            description="From switch implementation to automation and advisory, our services rely on a structured approach from design to testing, so you get the best outcome from your software quickly."
          />
          <Link
            href="/services"
            className="group inline-flex shrink-0 items-center gap-2 font-semibold text-brand-700 transition hover:text-brand-800"
          >
            All services
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <Stagger className="mt-14 grid gap-6 md:grid-cols-3" stagger={0.12}>
          {services.map((s, i) => (
            <StaggerItem key={s.slug} className="h-full">
              <TiltCard className="group h-full rounded-[1.75rem]" intensity={5}>
                <Link
                  href={`/services#${s.slug}`}
                  className="glass ring-gradient relative flex h-full flex-col rounded-[1.75rem] p-8 transition-[transform,box-shadow] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
                >
                  <span className="pointer-events-none absolute right-6 top-5 font-display text-6xl font-extrabold text-ink-800/[0.04]">
                    0{i + 1}
                  </span>
                  <div className="grid size-14 place-items-center rounded-2xl bg-[linear-gradient(135deg,#0b5fc2,#3fa9f5)] text-white shadow-[0_12px_30px_-10px_rgb(30_136_229/0.7)]">
                    <ServiceIcon name={s.icon} className="size-6" />
                  </div>
                  <h3 className="mt-7 font-display text-2xl font-bold tracking-tight text-ink-800">{s.title}</h3>
                  <p className="mt-3 text-[0.98rem] leading-relaxed text-ink-800/65">{s.short}</p>
                  <ul className="mt-6 space-y-2.5">
                    {s.highlights.slice(0, 3).map((h) => (
                      <li key={h} className="flex items-start gap-2.5 text-sm text-ink-800/75">
                        <span className="mt-0.5 grid size-4.5 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-700">
                          <Check className="size-3" strokeWidth={3} />
                        </span>
                        {h}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-8 text-sm font-semibold text-brand-700">
                    Learn more
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
