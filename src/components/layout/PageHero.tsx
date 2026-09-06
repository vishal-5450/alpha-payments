import type { ReactNode } from "react";
import { Aurora } from "@/components/ui/Aurora";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Reveal, SplitText } from "@/components/ui/Reveal";
import { LogoMark } from "@/components/layout/Logo";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  children?: ReactNode;
  className?: string;
  align?: "left" | "center";
};

/** Dark hero used on every inner page for a consistent, premium first impression. */
export function PageHero({ eyebrow, title, description, children, className, align = "left" }: Props) {
  return (
    <section className={cn("noise relative isolate overflow-hidden bg-ink-900 pt-36 pb-24 text-white sm:pt-44 sm:pb-28", className)}>
      <Aurora />
      <div className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
      {/* Brand watermark */}
      {align === "left" && (
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-1/2 hidden -translate-y-1/2 opacity-[0.16] mask-fade-b lg:block xl:-right-10">
          <div className="animate-float-slow">
            <LogoMark className="h-[26rem] w-[36rem]" id="hero-wm" />
          </div>
        </div>
      )}
      <div className={cn("container-x relative", align === "center" && "text-center")}>
        <Reveal y={12}>
          <Eyebrow tone="dark">{eyebrow}</Eyebrow>
        </Reveal>
        <SplitText
          text={title}
          className={cn(
            "mt-6 max-w-4xl font-display text-4xl font-bold leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-7xl",
            align === "center" && "mx-auto",
          )}
          delay={0.1}
        />
        {description && (
          <Reveal delay={0.45}>
            <p className={cn("mt-7 max-w-2xl text-lg leading-relaxed text-white/65 sm:text-xl", align === "center" && "mx-auto")}>
              {description}
            </p>
          </Reveal>
        )}
        {children && (
          <Reveal delay={0.6}>
            <div className={cn("mt-10 flex flex-wrap items-center gap-3", align === "center" && "justify-center")}>{children}</div>
          </Reveal>
        )}
      </div>
      {/* Soft curve into the light section below */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(to_bottom,transparent,rgb(7_12_26/0.6))]" />
    </section>
  );
}
