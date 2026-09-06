import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Props = ComponentProps<"div"> & {
  tone?: "light" | "dark";
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
};

const paddings = {
  none: "",
  sm: "p-5",
  md: "p-6 sm:p-8",
  lg: "p-8 sm:p-10",
};

export function GlassCard({ className, tone = "light", hover = true, padding = "md", children, ...rest }: Props) {
  return (
    <div
      className={cn(
        "group relative rounded-3xl transition-[transform,box-shadow] duration-500 ease-[var(--ease-out-expo)]",
        tone === "dark" ? "glass-dark" : "glass",
        hover && "ring-gradient hover:-translate-y-1",
        hover && tone === "light" && "hover:shadow-[var(--shadow-card-hover)]",
        paddings[padding],
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
