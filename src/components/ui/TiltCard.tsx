"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import type { MouseEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees */
  intensity?: number;
  glow?: boolean;
  glowColor?: string;
};

/**
 * 3D tilt card with a cursor-following spotlight. Degrades gracefully on touch.
 */
export function TiltCard({ children, className, intensity = 7, glow = true, glowColor = "rgb(63 169 245 / 0.28)" }: Props) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);

  const srx = useSpring(rx, { stiffness: 220, damping: 22 });
  const sry = useSpring(ry, { stiffness: 220, damping: 22 });

  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${mx}% ${my}%, ${glowColor}, transparent 60%)`;

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    mx.set(px * 100);
    my.set(py * 100);
    ry.set((px - 0.5) * intensity * 2);
    rx.set(-(py - 0.5) * intensity * 2);
  }

  function onLeave() {
    rx.set(0);
    ry.set(0);
  }

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d", perspective: 1000 }}
      className={cn("relative will-change-transform", className)}
    >
      {glow && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ backgroundImage: spotlight }}
        />
      )}
      {children}
    </motion.div>
  );
}
