import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { CTASection } from "@/components/layout/CTASection";
import { Button } from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeading, Eyebrow } from "@/components/ui/SectionHeading";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { GlassCard } from "@/components/ui/GlassCard";
import { services } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services — EFT Switching, Banking Automation & Advisory",
  description:
    "EFT switching on Base24 Classic, Base24-eps and Postilion; banking test automation with FinSim, Visa and Mastercard simulators; and payments advisory from Alpha Payments.",
};

const platforms = [
  { name: "ACI Base24 Classic", note: "Legacy switch modernisation & support" },
  { name: "ACI Base24-eps", note: "Implementation, upgrades, custom components" },
  { name: "Postilion", note: "Acquiring & issuing configuration" },
  { name: "HPE NonStop / Guardian", note: "TAL, TACL, Pathway, Enscribe" },
  { name: "EMV & Tokenisation", note: "Chip, contactless, token service" },
];

const simulators = ["FinSim", "Visa VTS", "Mastercard MDS", "Mastercard MAS", "RuPay / NPCI", "ISO 8583 harness"];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Payments engineering, delivered end to end."
        description="We help banks and financial institutions deploy, automate and evolve their switching platforms, with a structured, comprehensive approach from design phase to testing phase."
      >
        <Button href="/contact" variant="white" size="lg" arrow>
          Discuss a project
        </Button>
        <Button href="/products" variant="outline-light" size="lg">
          See our products
        </Button>
      </PageHero>

      {/* Service deep-dives */}
      <section className="relative bg-surface section-y">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_60%)]" />
        <div className="container-x relative flex flex-col gap-28">
          {services.map((s, i) => (
            <article key={s.slug} id={s.slug} className="scroll-mt-32 grid items-center gap-12 lg:grid-cols-12">
              <div className={cn("lg:col-span-6", i % 2 === 1 && "lg:order-2")}>
                <Reveal>
                  <Eyebrow>Service 0{i + 1}</Eyebrow>
                </Reveal>
                <Reveal delay={0.08}>
                  <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-ink-800 sm:text-5xl">{s.title}</h2>
                </Reveal>
                <Reveal delay={0.16}>
                  <p className="mt-6 text-lg leading-relaxed text-ink-800/70">{s.description}</p>
                </Reveal>
                <Stagger className="mt-8 grid gap-3 sm:grid-cols-2" stagger={0.06}>
                  {s.highlights.map((h) => (
                    <StaggerItem key={h}>
                      <div className="flex items-start gap-3 rounded-2xl border border-ink-800/8 bg-white p-4 text-[0.95rem] text-ink-800/80 shadow-[var(--shadow-card)]">
                        <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-600 text-white">
                          <Check className="size-3" strokeWidth={3} />
                        </span>
                        {h}
                      </div>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>

              <div className={cn("lg:col-span-6", i % 2 === 1 && "lg:order-1")}>
                <Reveal delay={0.1}>
                  <ServiceVisual index={i} />
                </Reveal>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Platforms & simulators */}
      <section className="relative overflow-hidden bg-white section-y">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow="Technology coverage"
            title={
              <>
                Deep on the platforms <span className="text-gradient">that matter.</span>
              </>
            }
            description="Certified switch engineers and test specialists across the products banks actually run."
          />
          <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
            {platforms.map((p) => (
              <StaggerItem key={p.name} className="h-full">
                <GlassCard padding="sm" className="h-full">
                  <div className="font-display text-lg font-bold text-ink-800">{p.name}</div>
                  <p className="mt-1.5 text-sm text-ink-800/60">{p.note}</p>
                </GlassCard>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal delay={0.2} className="mt-10">
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              <span className="mr-2 text-sm font-semibold text-ink-800/60">Simulators:</span>
              {simulators.map((s) => (
                <span key={s} className="rounded-full border border-brand-600/15 bg-brand-50 px-3.5 py-1.5 text-sm font-medium text-brand-800">
                  {s}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Need a switch team that has done it before?"
        description="Tell us about your platform, timeline and constraints. We will come back with a clear approach and an honest estimate."
      />
    </>
  );
}

/* Abstract, code-drawn visuals per service (no stock imagery) */
function ServiceVisual({ index }: { index: number }) {
  const Icon = (["switch", "automation", "advisory"] as const)[index];
  return (
    <div className="noise relative isolate overflow-hidden rounded-[2rem] bg-ink-900 p-8 text-white shadow-[0_40px_100px_-40px_rgb(7_12_26/0.8)]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgb(30_136_229/0.5),transparent_60%)]" />
      <div className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="relative">
        <div className="grid size-16 place-items-center rounded-2xl bg-[linear-gradient(135deg,#0b5fc2,#3fa9f5)] shadow-[0_0_50px_-10px_rgb(63_169_245/0.9)]">
          <ServiceIcon name={Icon} className="size-7" />
        </div>

        {index === 0 && (
          <div className="mt-8 grid grid-cols-3 gap-3 font-mono text-[0.68rem]">
            {["ATM", "POS", "E-COM", "SWITCH", "HOST", "VISA", "MC", "RUPAY", "NPCI"].map((n, i) => (
              <div
                key={n}
                className={cn(
                  "rounded-xl border border-white/10 px-3 py-4 text-center",
                  i === 3 ? "bg-brand-500/25 text-white ring-1 ring-brand-300/50" : "bg-white/[0.04] text-white/65",
                )}
              >
                {n}
              </div>
            ))}
          </div>
        )}

        {index === 1 && (
          <div className="mt-8 space-y-2 font-mono text-[0.7rem]">
            {[
              ["PASS", "emv_purchase_online_pin", "31 ms"],
              ["PASS", "reversal_timeout_0420", "44 ms"],
              ["PASS", "balance_inquiry_atm", "22 ms"],
              ["WARN", "partial_approval_0210", "88 ms"],
              ["PASS", "refund_ecom_3ds", "37 ms"],
            ].map(([s, n, t]) => (
              <div key={n} className="flex items-center gap-3 rounded-lg bg-white/[0.05] px-3 py-2">
                <span className={cn("w-10 font-semibold", s === "PASS" ? "text-accent" : "text-amber-300")}>{s}</span>
                <span className="flex-1 text-white/80">{n}</span>
                <span className="text-white/40">{t}</span>
              </div>
            ))}
            <div className="pt-2 text-white/45">
              1,240 scenarios · 99.2% pass · nightly <span className="animate-blink">▍</span>
            </div>
          </div>
        )}

        {index === 2 && (
          <div className="mt-8 grid gap-3">
            {[
              ["Assess", "Current-state platform & cost review", 100],
              ["Design", "Target architecture & roadmap", 78],
              ["Plan", "Estimates, RFP, vendor selection", 56],
              ["Govern", "PMO & scheme compliance", 34],
            ].map(([t, d, w]) => (
              <div key={t as string} className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold">{t}</span>
                  <span className="text-xs text-white/45">{d}</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-[linear-gradient(90deg,#1e88e5,#5eead4)]" style={{ width: `${w}%` }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
