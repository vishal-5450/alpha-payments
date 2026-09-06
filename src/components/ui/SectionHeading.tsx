import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
  size?: "md" | "lg";
};

export function Eyebrow({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.18em]",
        tone === "dark"
          ? "glass-dark text-brand-200"
          : "border border-brand-600/15 bg-brand-50 text-brand-700",
        className,
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full",
          tone === "dark" ? "bg-accent shadow-[0_0_12px_2px_rgb(94_234_212/0.7)]" : "bg-brand-500",
        )}
      />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  className,
  size = "md",
}: Props) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <Reveal y={16}>
          <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <Reveal delay={0.08}>
        <h2
          className={cn(
            "font-display font-bold leading-[1.05] tracking-[-0.03em]",
            size === "lg"
              ? "text-4xl sm:text-5xl lg:text-6xl"
              : "text-3xl sm:text-4xl lg:text-[3.1rem]",
            dark ? "text-white" : "text-ink-800",
          )}
        >
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.16}>
          <p
            className={cn(
              "max-w-2xl text-lg leading-relaxed",
              dark ? "text-white/65" : "text-ink-800/65",
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
