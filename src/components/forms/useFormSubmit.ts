"use client";

import { useState, type FormEvent } from "react";
import type { ZodType } from "zod";

type Status = "idle" | "submitting" | "success" | "error";

export function useFormSubmit<T extends Record<string, unknown>>(endpoint: string, schema: ZodType<T>) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError(null);
    const form = e.currentTarget;
    const raw = Object.fromEntries(new FormData(form).entries());

    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      const fe: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const k = String(issue.path[0] ?? "form");
        if (!fe[k]) fe[k] = issue.message;
      }
      setErrors(fe);
      const first = form.querySelector<HTMLElement>(`[name="${Object.keys(fe)[0]}"]`);
      first?.focus();
      return;
    }

    setErrors({});
    setStatus("submitting");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; fieldErrors?: Record<string, string> };
      if (!res.ok || !json.ok) {
        if (json.fieldErrors) setErrors(json.fieldErrors);
        setServerError(json.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setServerError("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }

  function clearError(name: string) {
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  }

  return { status, errors, serverError, onSubmit, clearError, reset: () => setStatus("idle") };
}
