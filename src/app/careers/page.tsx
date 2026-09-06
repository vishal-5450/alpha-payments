import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Briefcase, MapPin, Rocket, GraduationCap, Heart, Sparkles } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { CareerForm } from "@/components/forms/CareerForm";
import { openRoles, perks, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Careers — Join Alpha Payments",
  description:
    "Join Alpha Payments, where your ideas matter. Work on tier-1 switching platforms with the autonomy to explore and implement your ideas. Send your CV to hr@alphapay.co.in.",
};

const perkIcons = [Sparkles, GraduationCap, Rocket, Heart];

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers · We are hiring"
        title="Join Alpha Payments, where your ideas matter."
        description="We believe in the power of innovation and the value of individual contributions. You get the autonomy to explore and implement your ideas while working on projects that ignite your passion."
      >
        <Button href="#roles" variant="white" size="lg" arrow>
          See open roles
        </Button>
        <Button href={`mailto:${site.hrEmail}`} variant="outline-light" size="lg">
          {site.hrEmail}
        </Button>
      </PageHero>

      {/* Perks */}
      <section className="relative bg-surface section-y">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_60%)]" />
        <div className="container-x relative">
          <SectionHeading
            eyebrow="Why join"
            title={
              <>
                Ready for an exciting <span className="text-gradient">new opportunity?</span>
              </>
            }
            description="If you are eager to make a difference and contribute to a forward-thinking company, we would love to hear from you."
          />
          <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
            {perks.map((p, i) => {
              const Icon = perkIcons[i % perkIcons.length];
              return (
                <StaggerItem key={p.title} className="h-full">
                  <GlassCard padding="sm" className="h-full">
                    <div className="grid size-11 place-items-center rounded-xl bg-brand-50 text-brand-700 transition-colors duration-500 group-hover:bg-brand-600 group-hover:text-white">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="mt-5 font-display text-lg font-bold tracking-tight text-ink-800">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-800/65">{p.text}</p>
                  </GlassCard>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* Roles */}
      <section id="roles" className="relative scroll-mt-24 bg-white section-y">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Open roles"
              title={
                <>
                  Current <span className="text-gradient">openings.</span>
                </>
              }
              description="Placeholder roles shown for layout. Do not see a fit? Send an open application and tell us what you would love to build."
            />
            <Reveal delay={0.2}>
              <Link href="#apply" className="group mt-8 inline-flex items-center gap-2 font-semibold text-brand-700">
                Open application
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </Reveal>
          </div>
          <Stagger className="grid gap-3 lg:col-span-7" stagger={0.06}>
            {openRoles.map((r) => (
              <StaggerItem key={r.title}>
                <Link
                  href="#apply"
                  className="ring-gradient group flex flex-col gap-3 rounded-2xl border border-ink-800/8 bg-surface p-5 transition-[transform,box-shadow,background-color] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:bg-white hover:shadow-[var(--shadow-card-hover)] sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <div className="font-display text-lg font-bold tracking-tight text-ink-800">{r.title}</div>
                    <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink-800/60">
                      <span className="inline-flex items-center gap-1.5">
                        <Briefcase className="size-3.5" /> {r.team}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="size-3.5" /> {r.location}
                      </span>
                      <span>{r.type}</span>
                    </div>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand-700">
                    Apply
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Apply */}
      <section className="relative overflow-hidden bg-surface section-y">
        <div className="absolute left-1/2 top-0 h-[40rem] w-[80rem] -translate-x-1/2 rounded-full bg-brand-200/30 blur-[140px]" />
        <div className="container-x relative grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Apply"
              title={
                <>
                  Let&apos;s explore how you can be <span className="text-gradient">part of the team.</span>
                </>
              }
              description={
                <>
                  Fill in the form or send your CV directly to{" "}
                  <a href={`mailto:${site.hrEmail}`} className="font-semibold text-brand-700 underline-offset-4 hover:underline">
                    {site.hrEmail}
                  </a>
                  .
                </>
              }
            />
          </div>
          <div className="lg:col-span-8">
            <Reveal delay={0.1}>
              <CareerForm />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
