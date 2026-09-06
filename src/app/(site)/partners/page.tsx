import type { Metadata } from "next";
import { Handshake, Globe, Network, BadgeCheck } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { CTASection } from "@/components/layout/CTASection";
import { Button } from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Marquee } from "@/components/ui/Marquee";
import { PartnerLogoChip } from "@/components/ui/PartnerLogoChip";
import { partnerCategories, trustedBy } from "@/lib/site";

export const metadata: Metadata = {
  title: "Partners — Association for Worldwide Payment Transactions & Growth",
  description:
    "Alpha Payments partners with switch vendors, card schemes, banks and processors to deliver worldwide payment transactions and growth.",
};

const models = [
  {
    icon: Handshake,
    title: "Implementation partner",
    text: "We deliver your platform into banks: configuration, customisation, certification and go-live.",
  },
  {
    icon: Network,
    title: "Technology alliance",
    text: "Integrate Insight, Decipher or API Genie with your product, or co-develop switch components.",
  },
  {
    icon: Globe,
    title: "Regional reseller",
    text: "Take our products and services to new geographies with local sales and first-line support.",
  },
  {
    icon: BadgeCheck,
    title: "Certification services",
    text: "Independent scheme certification and regression for your clients, run on our simulator estate.",
  },
];

export default function PartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="Partners"
        title="Association for worldwide payment transactions and growth."
        description="We work alongside switch vendors, card schemes, banks and processors. Together, we move more money more reliably."
        align="center"
      >
        <Button href="/contact" variant="white" size="lg" arrow>
          Become a partner
        </Button>
      </PageHero>

      {/* Logo wall (placeholders) */}
      <section className="relative border-b border-ink-800/6 bg-surface py-14">
        <div className="container-x">
          <Reveal y={12}>
            <p className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-ink-800/45">
              Ecosystem placeholders. Replace with partner logos.
            </p>
          </Reveal>
        </div>
        <div className="mt-8 space-y-4">
          <Marquee speed={42}>
            {trustedBy.map((item) => (
              <PartnerLogoChip key={item.slug} name={item.name} slug={item.slug} className="h-16 w-56" />
            ))}
          </Marquee>
          <Marquee speed={48} reverse>
            {[...trustedBy].reverse().map((item) => (
              <PartnerLogoChip key={`rev-${item.slug}`} name={item.name} slug={item.slug} className="h-16 w-56" />
            ))}
          </Marquee>
        </div>
      </section>

      {/* Categories */}
      <section className="relative bg-white section-y">
        <div className="container-x">
          <SectionHeading
            eyebrow="Who we work with"
            title={
              <>
                Three kinds of partners, <span className="text-gradient">one shared outcome.</span>
              </>
            }
          />
          <Stagger className="mt-14 grid gap-6 lg:grid-cols-3" stagger={0.1}>
            {partnerCategories.map((c, i) => (
              <StaggerItem key={c.title} className="h-full">
                <GlassCard className="h-full">
                  <span className="font-mono text-xs text-brand-600">0{i + 1}</span>
                  <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink-800">{c.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink-800/65">{c.text}</p>
                  <div className="mt-6 grid grid-cols-2 gap-2">
                    {c.items.map((it) => (
                      <div key={it} className="rounded-xl border border-ink-800/8 bg-surface px-3 py-2.5 text-center text-sm font-medium text-ink-800/75">
                        {it}
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Partnership models */}
      <section className="relative overflow-hidden bg-surface section-y">
        <div className="absolute left-1/2 top-0 h-[40rem] w-[80rem] -translate-x-1/2 rounded-full bg-brand-200/30 blur-[140px]" />
        <div className="container-x relative">
          <SectionHeading
            align="center"
            eyebrow="Ways to partner"
            title={
              <>
                Pick the model <span className="text-gradient">that fits.</span>
              </>
            }
          />
          <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
            {models.map((m) => (
              <StaggerItem key={m.title} className="h-full">
                <GlassCard padding="sm" className="h-full">
                  <div className="grid size-11 place-items-center rounded-xl bg-brand-50 text-brand-700 transition-colors duration-500 group-hover:bg-brand-600 group-hover:text-white">
                    <m.icon className="size-5" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold tracking-tight text-ink-800">{m.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-800/65">{m.text}</p>
                </GlassCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CTASection
        title="Let's grow payments together."
        description="Tell us about your platform, region or client base. We will propose a partnership model within a week."
        primary={{ label: "Start the conversation", href: "/contact" }}
      />
    </>
  );
}
