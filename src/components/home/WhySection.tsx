import { Award, Clock, HeartHandshake, RefreshCw, ShieldCheck, TrendingUp } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { values } from "@/lib/site";

const icons = [Award, HeartHandshake, Clock, RefreshCw, ShieldCheck, TrendingUp];

export function WhySection() {
  return (
    <section className="relative overflow-hidden bg-surface section-y">
      <div className="absolute left-1/2 top-0 h-[40rem] w-[80rem] -translate-x-1/2 rounded-full bg-brand-200/30 blur-[140px]" />
      <div className="container-x relative">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Why Alpha Payments"
              title={
                <>
                  Technology and talent, <span className="text-gradient">with a client-centric core.</span>
                </>
              }
              description="Advanced technology and exceptional talent alone cannot guarantee success. In a demanding business environment, understanding the client's exact needs is what makes the difference."
            />
            <blockquote className="mt-10 border-l-2 border-brand-500 pl-5 font-display text-xl font-semibold leading-snug text-ink-800/80">
              “To accomplish great things, we must not only act, but also dream; not only plan, but also believe.”
            </blockquote>
          </div>

          <Stagger className="grid gap-5 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-3" stagger={0.08}>
            {values.map((v, i) => {
              const Icon = icons[i % icons.length];
              return (
                <StaggerItem key={v.title} className="h-full">
                  <GlassCard className="h-full" padding="sm">
                    <div className="grid size-11 place-items-center rounded-xl bg-brand-50 text-brand-700 transition-colors duration-500 group-hover:bg-brand-600 group-hover:text-white">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="mt-5 font-display text-lg font-bold tracking-tight text-ink-800">{v.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-800/65">{v.text}</p>
                  </GlassCard>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
