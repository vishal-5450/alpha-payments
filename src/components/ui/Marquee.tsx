import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  /** seconds for a full loop */
  speed?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
};

export function Marquee({ children, className, speed = 40, reverse, pauseOnHover = true }: Props) {
  return (
    <div className={cn("mask-fade-x w-full overflow-hidden", pauseOnHover && "pause-on-hover", className)}>
      <div
        className="flex w-max animate-marquee items-center gap-10 pr-10"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        <div className="flex shrink-0 items-center gap-10">{children}</div>
        <div className="flex shrink-0 items-center gap-10" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
