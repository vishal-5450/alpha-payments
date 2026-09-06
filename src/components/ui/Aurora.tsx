import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  /** dark: vivid blue/teal orbs for ink backgrounds; light: soft pastel orbs */
  tone?: "dark" | "light";
};

/**
 * Animated gradient-mesh background. Pure CSS, GPU-friendly (transform-only animations).
 */
export function Aurora({ className, tone = "dark" }: Props) {
  const dark = tone === "dark";
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div
        className={cn(
          "absolute -left-[10%] top-[-20%] h-[70vh] w-[70vw] rounded-full blur-[110px] animate-aurora",
          dark ? "bg-brand-700/60" : "bg-brand-300/50",
        )}
      />
      <div
        className={cn(
          "absolute right-[-15%] top-[10%] h-[60vh] w-[55vw] rounded-full blur-[120px] animate-aurora [animation-delay:-6s] [animation-duration:22s]",
          dark ? "bg-brand-500/45" : "bg-brand-200/70",
        )}
      />
      <div
        className={cn(
          "absolute bottom-[-30%] left-[20%] h-[60vh] w-[60vw] rounded-full blur-[130px] animate-aurora [animation-delay:-12s] [animation-duration:26s]",
          dark ? "bg-accent/25" : "bg-accent/25",
        )}
      />
      <div
        className={cn(
          "absolute bottom-[0%] right-[10%] h-[40vh] w-[35vw] rounded-full blur-[110px] animate-aurora [animation-delay:-3s] [animation-duration:20s]",
          dark ? "bg-accent-2/25" : "bg-accent-2/20",
        )}
      />
    </div>
  );
}
