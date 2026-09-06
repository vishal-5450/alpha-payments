import { cn } from "@/lib/utils";
import {
  ALPHA_TEXT_PATH,
  LOGO_BANDS,
  LOGO_VIEWBOX,
  MARK_HIGHLIGHT_PATH,
  MARK_PATH,
  PAYMENTS_TEXT_PATH,
} from "./logo-paths";

/**
 * Vector reproduction of the official Alpha Payments logo, traced from public/logo.png.
 * Three layers: the ribbon mark, "ALPHA" and "PAYMENTS" (with its three-bar E), so the
 * lockup can be recoloured for light and dark surfaces and scaled without blur.
 */

type Tone = "light" | "dark";

const { w: W } = LOGO_VIEWBOX;
const markBox = `0 ${LOGO_BANDS.mark[0]} ${W} ${LOGO_BANDS.mark[1] - LOGO_BANDS.mark[0]}`;
const alphaBox = `0 ${LOGO_BANDS.alpha[0]} ${W} ${LOGO_BANDS.alpha[1] - LOGO_BANDS.alpha[0]}`;
const paymentsBox = `0 ${LOGO_BANDS.payments[0]} ${W} ${LOGO_BANDS.payments[1] - LOGO_BANDS.payments[0]}`;

export function LogoMark({ className, id = "mark", flat }: { className?: string; id?: string; flat?: boolean }) {
  return (
    <svg viewBox={markBox} className={cn("h-9 w-auto shrink-0", className)} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#0b5fc2" />
          <stop offset="0.55" stopColor="#1e88e5" />
          <stop offset="1" stopColor="#5cadf7" />
        </linearGradient>
        <linearGradient id={`${id}-h`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#cfe6ff" />
        </linearGradient>
      </defs>
      <path d={MARK_PATH} fill={flat ? "currentColor" : `url(#${id}-g)`} />
      {!flat && <path d={MARK_HIGHLIGHT_PATH} fill={`url(#${id}-h)`} fillOpacity="0.9" />}
    </svg>
  );
}

export function Wordmark({ className, tone = "light" }: { className?: string; tone?: Tone }) {
  const dark = tone === "dark";
  return (
    <span className={cn("flex flex-col", className)} aria-hidden="true">
      <svg viewBox={alphaBox} className="w-full">
        <path d={ALPHA_TEXT_PATH} className={dark ? "fill-white" : "fill-brand-700"} />
      </svg>
      <svg viewBox={paymentsBox} className="mt-[6%] w-full">
        <path d={PAYMENTS_TEXT_PATH} className={dark ? "fill-brand-200" : "fill-ink-800/60"} />
      </svg>
    </span>
  );
}

type LogoProps = {
  className?: string;
  tone?: Tone;
  /** horizontal: mark left, wordmark right (navigation). stacked: mark above wordmark (footer, hero). */
  layout?: "horizontal" | "stacked";
  markOnly?: boolean;
  id?: string;
};

export function Logo({ className, tone = "light", layout = "horizontal", markOnly, id = "logo" }: LogoProps) {
  if (markOnly) return <LogoMark className={className} id={id} />;

  if (layout === "stacked") {
    return (
      <span className={cn("inline-flex w-36 flex-col items-center", className)} role="img" aria-label="Alpha Payments">
        <LogoMark className="h-auto w-[70%]" id={id} />
        <Wordmark tone={tone} className="mt-2 w-full" />
      </span>
    );
  }

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)} role="img" aria-label="Alpha Payments">
      <LogoMark className="h-9" id={id} />
      <Wordmark tone={tone} className="w-[6.4rem]" />
    </span>
  );
}
