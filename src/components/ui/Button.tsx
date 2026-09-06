"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "white" | "outline-light";
type Size = "sm" | "md" | "lg";

type ButtonProps = {
  href?: string;
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
  children: ReactNode;
  external?: boolean;
} & Omit<ComponentProps<"button">, "children" | "className">;

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-[transform,box-shadow,background-color,color,border-color] duration-300 ease-[var(--ease-out-expo)] select-none whitespace-nowrap disabled:opacity-60 disabled:pointer-events-none";

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-[0.95rem]",
  lg: "h-14 px-8 text-base",
};

const variants: Record<Variant, string> = {
  primary:
    "text-white bg-[linear-gradient(120deg,#0b5fc2,#1e88e5_55%,#3fa9f5)] shadow-[0_10px_30px_-10px_rgb(30_136_229/0.7)] hover:shadow-[0_18px_40px_-12px_rgb(30_136_229/0.8)] before:absolute before:inset-0 before:rounded-full before:bg-[linear-gradient(120deg,rgb(255_255_255/0.28),transparent_50%)] before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
  secondary:
    "text-ink-800 bg-white border border-ink-800/10 shadow-[0_1px_2px_rgb(10_18_36/0.06)] hover:border-brand-500/50 hover:shadow-[0_12px_30px_-14px_rgb(30_136_229/0.5)]",
  ghost: "text-ink-800 hover:bg-ink-800/5",
  white:
    "text-ink-800 bg-white shadow-[0_10px_30px_-12px_rgb(0_0_0/0.5)] hover:bg-brand-50",
  "outline-light":
    "text-white border border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/40",
};

export function Button({
  href,
  variant = "primary",
  size = "md",
  arrow,
  className,
  children,
  external,
  ...rest
}: ButtonProps) {
  const classes = cn(base, sizes[size], variants[variant], className);
  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {arrow && (
        <ArrowRight
          className="relative z-10 size-[1.1em] transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-1"
          strokeWidth={2.25}
        />
      )}
    </>
  );

  const motionProps = {
    whileHover: { y: -2 },
    whileTap: { scale: 0.97 },
    transition: { type: "spring", stiffness: 400, damping: 22 },
  } as const;

  if (href) {
    if (external || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
      return (
        <motion.a
          href={href}
          className={classes}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
          {...motionProps}
        >
          {content}
        </motion.a>
      );
    }
    return (
      <motion.div {...motionProps} className="inline-flex">
        <Link href={href} className={classes}>
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button className={classes} {...motionProps} {...(rest as object)}>
      {content}
    </motion.button>
  );
}
