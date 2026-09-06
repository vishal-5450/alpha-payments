import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

const inputBase =
  "peer w-full rounded-2xl border bg-white/70 px-4 pt-6 pb-2 text-[0.95rem] text-ink-800 shadow-[inset_0_1px_0_rgb(255_255_255/0.8)] outline-none transition-[border-color,box-shadow,background-color] duration-300 placeholder:text-transparent focus:bg-white focus:shadow-[0_0_0_4px_rgb(63_169_245/0.18)] disabled:opacity-60";

type Common = {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  className?: string;
};

export function TextField({ label, name, error, hint, className, ...rest }: Common & ComponentProps<"input">) {
  const id = `f-${name}`;
  return (
    <div className={cn("relative", className)}>
      <input
        id={id}
        name={name}
        placeholder={label}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : hint ? `${id}-hint` : undefined}
        className={cn(inputBase, error ? "border-rose-400 focus:border-rose-500" : "border-ink-800/10 focus:border-brand-500")}
        {...rest}
      />
      <FloatingLabel htmlFor={id}>{label}</FloatingLabel>
      <Msg id={id} error={error} hint={hint} />
    </div>
  );
}

export function TextArea({ label, name, error, hint, className, ...rest }: Common & ComponentProps<"textarea">) {
  const id = `f-${name}`;
  return (
    <div className={cn("relative", className)}>
      <textarea
        id={id}
        name={name}
        placeholder={label}
        rows={5}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : hint ? `${id}-hint` : undefined}
        className={cn(inputBase, "min-h-36 resize-y", error ? "border-rose-400 focus:border-rose-500" : "border-ink-800/10 focus:border-brand-500")}
        {...rest}
      />
      <FloatingLabel htmlFor={id}>{label}</FloatingLabel>
      <Msg id={id} error={error} hint={hint} />
    </div>
  );
}

export function SelectField({
  label,
  name,
  error,
  hint,
  className,
  options,
  placeholder = "Select…",
  ...rest
}: Common & ComponentProps<"select"> & { options: readonly string[]; placeholder?: string }) {
  const id = `f-${name}`;
  return (
    <div className={cn("relative", className)}>
      <select
        id={id}
        name={name}
        aria-invalid={!!error}
        className={cn(
          inputBase,
          "appearance-none pr-10",
          error ? "border-rose-400 focus:border-rose-500" : "border-ink-800/10 focus:border-brand-500",
        )}
        {...rest}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <label htmlFor={id} className="pointer-events-none absolute left-4 top-2 text-[0.7rem] font-medium uppercase tracking-[0.12em] text-ink-800/50">
        {label}
      </label>
      <svg aria-hidden="true" viewBox="0 0 20 20" className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-ink-800/50" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="m5 8 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <Msg id={id} error={error} hint={hint} />
    </div>
  );
}

function FloatingLabel({ htmlFor, children }: { htmlFor: string; children: ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="pointer-events-none absolute left-4 top-2 text-[0.7rem] font-medium uppercase tracking-[0.12em] text-ink-800/50 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-[0.95rem] peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-placeholder-shown:text-ink-800/45 peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:uppercase peer-focus:tracking-[0.12em] peer-focus:text-brand-700"
    >
      {children}
    </label>
  );
}

function Msg({ id, error, hint }: { id: string; error?: string; hint?: string }) {
  if (error) {
    return (
      <p id={`${id}-err`} role="alert" className="mt-1.5 pl-1 text-xs font-medium text-rose-600">
        {error}
      </p>
    );
  }
  if (hint) {
    return (
      <p id={`${id}-hint`} className="mt-1.5 pl-1 text-xs text-ink-800/50">
        {hint}
      </p>
    );
  }
  return null;
}
