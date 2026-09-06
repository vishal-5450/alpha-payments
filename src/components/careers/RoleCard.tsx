"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Briefcase, ChevronDown, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export type RoleView = {
  id: string;
  title: string;
  type: string;
  location: string;
  team: string;
  description: string;
  requirements: string;
};

export function RoleCard({ role }: { role: RoleView }) {
  const [open, setOpen] = useState(false);
  const paragraphs = role.description.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  const requirements = role.requirements.split("\n").map((r) => r.replace(/^[-•*]\s*/, "").trim()).filter(Boolean);
  const applyHref = `/careers?role=${encodeURIComponent(role.title)}#apply`;

  return (
    <div
      id={role.id}
      className={cn(
        "ring-gradient group scroll-mt-32 rounded-2xl border border-ink-800/8 bg-surface transition-[transform,box-shadow,background-color] duration-500 ease-[var(--ease-out-expo)] hover:bg-white hover:shadow-[var(--shadow-card-hover)]",
        open && "bg-white shadow-[var(--shadow-card-hover)]",
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={`${role.id}-details`}
        className="flex w-full flex-col gap-3 p-5 text-left sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <div className="font-display text-lg font-bold tracking-tight text-ink-800">{role.title}</div>
          <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink-800/60">
            <span className="inline-flex items-center gap-1.5">
              <Briefcase className="size-3.5" /> {role.team}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-3.5" /> {role.location}
            </span>
            <span>{role.type}</span>
          </div>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand-700">
          {open ? "Hide details" : "View details"}
          <ChevronDown className={cn("size-4 transition-transform duration-300", open && "rotate-180")} />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`${role.id}-details`}
            key="details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-ink-800/8 px-5 pb-5 pt-4">
              <div className="space-y-3 text-[0.95rem] leading-relaxed text-ink-800/75">
                {paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              {requirements.length > 0 && (
                <>
                  <h4 className="mt-5 text-xs font-semibold uppercase tracking-[0.15em] text-ink-800/50">What we look for</h4>
                  <ul className="mt-2 space-y-1.5 text-[0.95rem] text-ink-800/75">
                    {requirements.map((r, i) => (
                      <li key={i} className="flex gap-2.5">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-500" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </>
              )}
              <Link
                href={applyHref}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink-800 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
              >
                Apply for this role
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
