import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /** "dark" renders a light wordmark for dark backgrounds */
  tone?: "light" | "dark";
  /** Only render the mark, no wordmark */
  markOnly?: boolean;
  id?: string;
};

export function LogoMark({ className, id = "alpha-mark" }: { className?: string; id?: string }) {
  return (
    <svg
      viewBox="0 0 64 48"
      className={cn("h-9 w-12 shrink-0", className)}
      aria-hidden="true"
      fill="none"
    >
      <defs>
        <linearGradient id={`${id}-g`} x1="8" y1="40" x2="58" y2="8" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#0b5fc2" />
          <stop offset="0.55" stopColor="#1e88e5" />
          <stop offset="1" stopColor="#5cadf7" />
        </linearGradient>
        <linearGradient id={`${id}-h`} x1="8" y1="14" x2="34" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M58 8 C 46 8, 42 24, 32 34 C 24 42, 8 42, 8 28 C 8 14, 24 12, 32 22 C 40 32, 46 42, 58 40"
        stroke={`url(#${id}-g)`}
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M58 8 C 46 8, 42 24, 32 34 C 24 42, 8 42, 8 28"
        stroke={`url(#${id}-h)`}
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.9"
        transform="translate(-1.2 -1.6)"
      />
    </svg>
  );
}

export function Logo({ className, tone = "light", markOnly, id }: LogoProps) {
  const dark = tone === "dark";
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark id={id} />
      {!markOnly && (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "font-display text-[1.15rem] font-extrabold tracking-[0.12em]",
              dark ? "text-white" : "text-ink-800",
            )}
          >
            ALPHA
          </span>
          <span
            className={cn(
              "mt-[3px] text-[0.58rem] font-semibold tracking-[0.42em]",
              dark ? "text-brand-200/80" : "text-ink-800/55",
            )}
          >
            PAYMENTS
          </span>
        </span>
      )}
    </span>
  );
}
