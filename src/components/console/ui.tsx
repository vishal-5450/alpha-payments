"use client";

import { useFormStatus } from "react-dom";
import { CircleCheck, LoaderCircle, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ComponentProps, ReactNode } from "react";

/* Small, dependable form primitives for the HR console (server-action driven). */

export function Field({
  label,
  name,
  hint,
  error,
  className,
  children,
}: {
  label: string;
  name: string;
  hint?: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("grid gap-1.5", className)}>
      <label htmlFor={name} className="text-sm font-semibold text-ink-800">
        {label}
      </label>
      {children}
      {error ? (
        <p className="text-xs font-medium text-rose-600">{error}</p>
      ) : hint ? (
        <p className="text-xs text-ink-800/50">{hint}</p>
      ) : null}
    </div>
  );
}

const control =
  "w-full rounded-xl border border-ink-800/12 bg-white px-3.5 py-2.5 text-[0.95rem] text-ink-800 shadow-[0_1px_2px_rgb(10_18_36/0.04)] outline-none transition placeholder:text-ink-800/35 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15 aria-[invalid=true]:border-rose-400";

export function Input({ className, error, ...props }: ComponentProps<"input"> & { error?: boolean }) {
  return <input id={props.name} aria-invalid={error || undefined} className={cn(control, className)} {...props} />;
}

export function Textarea({ className, error, ...props }: ComponentProps<"textarea"> & { error?: boolean }) {
  return <textarea id={props.name} aria-invalid={error || undefined} className={cn(control, "min-h-32 resize-y leading-relaxed", className)} {...props} />;
}

export function Toggle({ name, label, defaultChecked }: { name: string; label: string; defaultChecked?: boolean }) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-3 select-none">
      <span className="relative inline-flex h-6 w-11 items-center">
        <input type="checkbox" name={name} defaultChecked={defaultChecked} className="peer sr-only" />
        <span className="absolute inset-0 rounded-full bg-ink-800/15 transition peer-checked:bg-brand-600 peer-focus-visible:ring-4 peer-focus-visible:ring-brand-500/20" />
        <span className="absolute left-0.5 size-5 rounded-full bg-white shadow transition peer-checked:translate-x-5" />
      </span>
      <span className="text-sm font-medium text-ink-800">{label}</span>
    </label>
  );
}

export function SubmitButton({ children, className, variant = "primary" }: { children: ReactNode; className?: string; variant?: "primary" | "danger" | "ghost" }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        "inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition disabled:opacity-60",
        variant === "primary" && "bg-[linear-gradient(120deg,#0b5fc2,#1e88e5_55%,#3fa9f5)] text-white shadow-[0_10px_30px_-12px_rgb(30_136_229/0.7)] hover:shadow-[0_16px_36px_-12px_rgb(30_136_229/0.8)]",
        variant === "danger" && "border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100",
        variant === "ghost" && "border border-ink-800/10 bg-white text-ink-800 hover:border-brand-500/50",
        className,
      )}
    >
      {pending && <LoaderCircle className="size-4 animate-spin" />}
      {children}
    </button>
  );
}

export function Notice({ tone, children }: { tone: "success" | "error"; children: ReactNode }) {
  const Icon = tone === "success" ? CircleCheck : TriangleAlert;
  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={cn(
        "flex items-start gap-2.5 rounded-2xl border px-4 py-3 text-sm",
        tone === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-rose-200 bg-rose-50 text-rose-700",
      )}
    >
      <Icon className="mt-0.5 size-4 shrink-0" />
      <div>{children}</div>
    </div>
  );
}

/** Submit button that asks for confirmation first (used for destructive actions). */
export function ConfirmSubmit({ message, children, className }: { message: string; children: ReactNode; className?: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      onClick={(e) => {
        if (!window.confirm(message)) e.preventDefault();
      }}
      className={cn("inline-flex h-9 items-center gap-1.5 rounded-full border border-rose-200 bg-white px-3 text-xs font-semibold text-rose-700 transition hover:bg-rose-50 disabled:opacity-60", className)}
    >
      {children}
    </button>
  );
}
