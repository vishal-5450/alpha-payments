import { Counter } from "@/components/ui/Counter";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { stats } from "@/lib/site";

export function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-surface py-10">
      <div className="container-x">
        <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-[linear-gradient(120deg,#0b5fc2,#1e88e5_55%,#3fa9f5)] px-6 py-14 text-white sm:px-12">
          <div className="bg-grid-dark absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
          <div className="absolute -right-24 -top-24 size-80 rounded-full bg-white/15 blur-3xl" />
          <div className="absolute -bottom-32 -left-16 size-80 rounded-full bg-accent/30 blur-3xl" />

          <Stagger className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
            {stats.map((s) => (
              <StaggerItem key={s.label}>
                <div className="glass-dark h-full rounded-3xl p-6">
                  <div className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
                    <Counter value={s.value} decimals={s.decimals} suffix={s.suffix} />
                  </div>
                  <p className="mt-2 text-sm text-white/75">{s.label}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
