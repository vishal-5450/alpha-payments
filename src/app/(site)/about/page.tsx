import type { Metadata } from "next";
import { Check, Eye, Target, Layers, Timer, Gauge } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { CTASection } from "@/components/layout/CTASection";
import { Button } from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Aurora } from "@/components/ui/Aurora";
import { capabilities, site, values } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us — Vision, Mission & What We Do",
  description:
    "Alpha Payments LLP is a Mumbai-based fintech firm with a client-centric approach, deep switching expertise and a mission to earn lasting trust through crystal-clear communication and timely delivery.",
};

const components = [
  {
    icon: Layers,
    title: "Product-service systems",
    text: "Cohesive delivery of products and services in a single business model, creating value beyond selling software as isolated functions.",
  },
  {
    icon: Timer,
    title: "Time management",
    text: "Every project is led by a professional project manager who controls the whole process to finish on time and within the allocated budget.",
  },
  {
    icon: Gauge,
    title: "Continuous assessment",
    text: "Technology progresses faster than ever. Our continuous-improvement policy keeps products and delivery processes efficient, effective and flexible.",
  },
];

/* Placeholder leadership. Replace names, titles and add photos to /public/team. */
const leadership = [
  { name: "Leadership Placeholder", role: "Founder & Managing Partner", focus: "Switching strategy, client relationships" },
  { name: "Leadership Placeholder", role: "Head of Engineering", focus: "Base24-eps, NonStop, product development" },
  { name: "Leadership Placeholder", role: "Head of Delivery", focus: "Programme management, certification" },
];

const milestones = [
  { year: "2019", text: "Alpha Payments LLP founded in Mumbai by veteran switch engineers." },
  { year: "2020", text: "First Base24-eps implementation delivered; 24×7 support desk established." },
  { year: "2022", text: "Insight and Decipher launched for BASE24-eps monitoring and reporting." },
  { year: "2024", text: "API Genie released; automation practice expands with simulator expertise." },
  { year: "Today", text: "Serving banks and processors across India and the Middle East." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="A spirit with a vision is a dream with a mission."
        description={`${site.legalName} believes advanced technology and exceptional talent alone cannot guarantee success. What makes the difference is a strong, client-centric approach: understanding the exact business need before writing a line of code.`}
      >
        <Button href="/contact" variant="white" size="lg" arrow>
          Work with us
        </Button>
        <Button href="/careers" variant="outline-light" size="lg">
          Join the team
        </Button>
      </PageHero>

      {/* Vision & Mission */}
      <section className="relative bg-surface section-y">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_60%)]" />
        <div className="container-x relative grid gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard padding="lg" className="h-full">
              <div className="grid size-12 place-items-center rounded-2xl bg-brand-50 text-brand-700">
                <Eye className="size-5" />
              </div>
              <Eyebrow className="mt-8">Our vision</Eyebrow>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink-800">
                To be recognised as a global fintech firm that is the epitome of customer service.
              </h2>
              <p className="mt-5 leading-relaxed text-ink-800/65">
                Standing on a solid foundation of outstanding technology and an expert talent pool, we aim to set the
                benchmark for how payments technology partners serve their clients.
              </p>
              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {["Quality service", "Exponential growth", "Customer satisfaction", "Timely delivery", "24×7 support"].map((v) => (
                  <li key={v} className="flex items-center gap-2 text-sm text-ink-800/80">
                    <Check className="size-4 text-brand-600" strokeWidth={3} /> {v}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="noise relative isolate h-full overflow-hidden rounded-3xl bg-ink-900 p-8 text-white sm:p-10">
              <Aurora />
              <div className="relative">
                <div className="grid size-12 place-items-center rounded-2xl bg-white/10 text-brand-200">
                  <Target className="size-5" />
                </div>
                <Eyebrow tone="dark" className="mt-8">Our mission</Eyebrow>
                <h2 className="mt-4 font-display text-3xl font-bold tracking-tight">
                  Earn the trust and confidence of our clients.
                </h2>
                <p className="mt-5 leading-relaxed text-white/70">
                  Through crystal-clear communication, reasonable and objective guidance, and a genuine, palpable concern
                  for their long-term and comprehensive financial growth.
                </p>
                <blockquote className="mt-8 border-l-2 border-accent pl-5 font-display text-lg font-semibold leading-snug text-white/85">
                  “Quality is never an accident; it is always the result of intelligent effort.”
                </blockquote>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What we do */}
      <section className="relative bg-white section-y">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="What we do"
              title={
                <>
                  The perfect mix of technology <span className="text-gradient">and industry expertise.</span>
                </>
              }
              description="Our experts deploy banking solutions quickly and effectively, relying on a structured approach from design through testing. Client-centric support is delivered through deep technical expertise, helping our clients grow their businesses."
            />
          </div>
          <Stagger className="grid gap-3 sm:grid-cols-2 lg:col-span-7" stagger={0.05}>
            {capabilities.map((c, i) => (
              <StaggerItem key={c}>
                <div className="flex items-start gap-3 rounded-2xl border border-ink-800/8 bg-surface p-4 text-[0.95rem] text-ink-800/80 transition hover:border-brand-500/40 hover:bg-white">
                  <span className="font-mono text-xs text-brand-600 pt-0.5">{String(i + 1).padStart(2, "0")}</span>
                  {c}
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Key components */}
      <section className="relative overflow-hidden bg-surface section-y">
        <div className="absolute left-1/2 top-0 h-[40rem] w-[80rem] -translate-x-1/2 rounded-full bg-brand-200/30 blur-[140px]" />
        <div className="container-x relative">
          <SectionHeading
            align="center"
            eyebrow="Our key components"
            title={
              <>
                How we <span className="text-gradient">operate.</span>
              </>
            }
          />
          <Stagger className="mt-14 grid gap-6 md:grid-cols-3" stagger={0.1}>
            {components.map((c) => (
              <StaggerItem key={c.title} className="h-full">
                <GlassCard className="h-full">
                  <div className="grid size-12 place-items-center rounded-2xl bg-[linear-gradient(135deg,#0b5fc2,#3fa9f5)] text-white shadow-[0_12px_30px_-10px_rgb(30_136_229/0.7)]">
                    <c.icon className="size-5" />
                  </div>
                  <h3 className="mt-6 font-display text-xl font-bold tracking-tight text-ink-800">{c.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink-800/65">{c.text}</p>
                </GlassCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Values */}
      <section className="relative bg-white section-y">
        <div className="container-x">
          <SectionHeading
            eyebrow="Values"
            title={
              <>
                What we <span className="text-gradient">stand for.</span>
              </>
            }
          />
          <Stagger className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
            {values.map((v, i) => (
              <StaggerItem key={v.title}>
                <div className="border-t border-ink-800/10 pt-5">
                  <span className="font-mono text-xs text-brand-600">0{i + 1}</span>
                  <h3 className="mt-2 font-display text-xl font-bold tracking-tight text-ink-800">{v.title}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-800/65">{v.text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Timeline + Leadership */}
      <section className="noise relative isolate overflow-hidden bg-ink-900 text-white section-y">
        <Aurora />
        <div className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
        <div className="container-x relative grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              tone="dark"
              eyebrow="Our journey"
              title={<>Built by switch engineers, <span className="text-gradient-light">since {site.founded}.</span></>}
            />
            <ol className="relative mt-10 space-y-8 border-l border-white/15 pl-8">
              {milestones.map((m, i) => (
                <Reveal key={m.year} delay={i * 0.06} as="li" className="relative">
                  <span className="absolute -left-[2.45rem] top-1 grid size-5 place-items-center rounded-full border border-brand-300/50 bg-ink-900">
                    <span className="size-2 rounded-full bg-brand-300" />
                  </span>
                  <div className="font-mono text-xs text-brand-300">{m.year}</div>
                  <p className="mt-1 text-white/80">{m.text}</p>
                </Reveal>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-7">
            <SectionHeading
              tone="dark"
              eyebrow="Leadership"
              title={<>People who have shipped <span className="text-gradient-light">tier-1 switches.</span></>}
              description="Placeholder profiles. Replace with names, titles and photographs."
            />
            <Stagger className="mt-10 grid gap-5 sm:grid-cols-3" stagger={0.1}>
              {leadership.map((l, i) => (
                <StaggerItem key={i} className="h-full">
                  <div className="glass-dark h-full rounded-3xl p-5">
                    <div className="aspect-[4/5] w-full rounded-2xl bg-[linear-gradient(160deg,rgb(30_136_229/0.55),rgb(94_234_212/0.25))]" />
                    <div className="mt-4 font-display text-lg font-bold">{l.name}</div>
                    <div className="text-sm text-brand-200">{l.role}</div>
                    <p className="mt-2 text-xs text-white/55">{l.focus}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
