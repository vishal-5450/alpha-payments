import type { Metadata } from "next";
import { Check, MonitorCheck } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { CTASection } from "@/components/layout/CTASection";
import { Button } from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { ProductMedia } from "@/components/products/ProductMedia";
import { products } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Products — ISO Genie, API Genie, INSIGHT & Decipher",
  description:
    "ISO Genie ISO 8583 simulation, API Genie JSON API testing, INSIGHT real-time monitoring, and Decipher TLF/PTLF extraction. Built by Alpha Payments.",
};

const comparison = [
  { feature: "ISO 8583 client / host simulation", values: [true, false, false, false] },
  { feature: "JSON API simulation & validation", values: [false, true, false, false] },
  { feature: "Real-time transaction monitoring", values: [false, false, true, false] },
  { feature: "Proactive threshold-based alerts", values: [false, false, true, false] },
  { feature: "TLF / PTLF extract generation", values: [false, false, false, true] },
  { feature: "Testing logs & report analysis", values: [true, true, true, true] },
  { feature: "Multi-scheme / multi-formatter support", values: [true, true, false, false] },
  { feature: "Guardian (NonStop) support", values: [false, false, true, true] },
  { feature: "Linux / Unix / Windows", values: [true, true, true, true] },
];

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Products"
        title="Four tools for simulation, monitoring and extraction."
        description="ISO Genie, API Genie, INSIGHT and Decipher give payments teams certification power, live visibility and audit-ready extracts."
      >
        <Button href="/contact" variant="white" size="lg" arrow>
          Request a demo
        </Button>
      </PageHero>

      <section className="relative bg-surface section-y">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_60%)]" />
        <div className="container-x relative flex flex-col gap-32">
          {products.map((p, i) => (
            <article key={p.slug} id={p.slug} className="scroll-mt-32">
              <div className="grid items-center gap-12 lg:grid-cols-12">
                <div className={cn("lg:col-span-5", i % 2 === 1 && "lg:order-2")}>
                  <Reveal>
                    <Eyebrow>{p.kicker}</Eyebrow>
                  </Reveal>
                  <Reveal delay={0.08}>
                    <h2 className="mt-5 font-display text-4xl font-bold tracking-tight text-ink-800 sm:text-6xl">{p.name}</h2>
                  </Reveal>
                  <Reveal delay={0.14}>
                    <p className="mt-4 text-xl font-medium leading-snug text-ink-800/85">{p.tagline}</p>
                  </Reveal>
                  <Reveal delay={0.2}>
                    <p className="mt-5 text-[1.05rem] leading-relaxed text-ink-800/65">{p.description}</p>
                  </Reveal>
                  <Reveal delay={0.26}>
                    <div className="mt-7 flex flex-wrap gap-2">
                      {p.platforms.map((pl) => (
                        <span key={pl} className="inline-flex items-center gap-1.5 rounded-full border border-ink-800/10 bg-white px-3 py-1.5 text-xs font-medium text-ink-800/75">
                          <MonitorCheck className="size-3.5 text-brand-600" />
                          {pl}
                        </span>
                      ))}
                    </div>
                  </Reveal>
                </div>
                <div className={cn("lg:col-span-7", i % 2 === 1 && "lg:order-1")}>
                  <Reveal delay={0.15}>
                    <div className="relative">
                      <div className="absolute -inset-8 rounded-[3rem] bg-[radial-gradient(ellipse_at_center,rgb(63_169_245/0.22),transparent_70%)] blur-2xl" />
                      <ProductMedia slug={p.slug} className="relative" />
                    </div>
                  </Reveal>
                </div>
              </div>

              <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.07}>
                {p.features.map((f) => (
                  <StaggerItem key={f.title} className="h-full">
                    <GlassCard padding="sm" className="h-full">
                      <h3 className="font-display text-base font-bold text-ink-800">{f.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-800/62">{f.text}</p>
                    </GlassCard>
                  </StaggerItem>
                ))}
              </Stagger>
            </article>
          ))}
        </div>
      </section>

      <section className="relative bg-white section-y">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow="At a glance"
            title={
              <>
                Which tool <span className="text-gradient">does what.</span>
              </>
            }
          />
          <Reveal className="mt-14">
            <div className="overflow-hidden rounded-[1.75rem] border border-ink-800/8 bg-surface shadow-[var(--shadow-card)]">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[48rem] text-left text-sm">
                  <thead>
                    <tr className="border-b border-ink-800/8 text-xs font-semibold uppercase tracking-[0.15em] text-ink-800/50">
                      <th className="px-6 py-5">Capability</th>
                      {products.map((p) => (
                        <th key={p.slug} className="px-5 py-5 text-center font-display text-sm normal-case tracking-tight text-ink-800">
                          {p.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {comparison.map((row, i) => (
                      <tr key={row.feature} className={cn("border-b border-ink-800/6 last:border-0", i % 2 === 1 && "bg-white/60")}>
                        <td className="px-6 py-4 font-medium text-ink-800/85">{row.feature}</td>
                        {row.values.map((v, j) => (
                          <td key={j} className="px-5 py-4 text-center">
                            {v ? (
                              <span className="inline-grid size-6 place-items-center rounded-full bg-brand-600 text-white">
                                <Check className="size-3.5" strokeWidth={3} />
                              </span>
                            ) : (
                              <span className="inline-block h-px w-4 bg-ink-800/20" />
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection
        title="See ISO Genie, API Genie, INSIGHT and Decipher on your own data."
        description="We run a guided demo against a sandbox that mirrors your switch topology, and leave you with a clear evaluation plan."
        primary={{ label: "Request a demo", href: "/contact" }}
      />
    </>
  );
}
