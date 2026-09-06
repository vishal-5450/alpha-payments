"use client";

import { AnimatePresence, motion } from "motion/react";
import { CircleCheckBig, LoaderCircle, Send } from "lucide-react";
import { contactSchema, contactTopics } from "@/lib/validation";
import { useFormSubmit } from "./useFormSubmit";
import { SelectField, TextArea, TextField } from "./Field";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const { status, errors, serverError, onSubmit, clearError, reset } = useFormSubmit("/api/contact", contactSchema);

  return (
    <div className="glass relative overflow-hidden rounded-[2rem] p-6 sm:p-8">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="ok"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex min-h-[28rem] flex-col items-center justify-center text-center"
          >
            <span className="grid size-16 place-items-center rounded-full bg-brand-50 text-brand-700">
              <CircleCheckBig className="size-8" />
            </span>
            <h3 className="mt-6 font-display text-2xl font-bold text-ink-800">Message received.</h3>
            <p className="mt-2 max-w-sm text-ink-800/65">
              Thank you. One of our payments specialists will reply within one business day.
            </p>
            <Button variant="secondary" className="mt-8" onClick={reset}>
              Send another message
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={onSubmit}
            noValidate
            className="grid gap-4"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField
                label="First name"
                name="firstName"
                autoComplete="given-name"
                required
                error={errors.firstName}
                onChange={() => clearError("firstName")}
              />
              <TextField
                label="Last name"
                name="lastName"
                autoComplete="family-name"
                required
                error={errors.lastName}
                onChange={() => clearError("lastName")}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField
                label="Work e-mail"
                name="email"
                type="email"
                autoComplete="email"
                required
                error={errors.email}
                onChange={() => clearError("email")}
              />
              <TextField
                label="Phone (optional)"
                name="phone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                error={errors.phone}
                onChange={() => clearError("phone")}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField
                label="Company / institution"
                name="company"
                autoComplete="organization"
                error={errors.company}
                onChange={() => clearError("company")}
              />
              <SelectField
                label="How can we help?"
                name="topic"
                required
                options={contactTopics}
                placeholder="Select a topic"
                defaultValue=""
                error={errors.topic}
                onChange={() => clearError("topic")}
              />
            </div>
            <TextArea
              label="Tell us about your project"
              name="message"
              required
              error={errors.message}
              onChange={() => clearError("message")}
              hint="Platform, timeline, volumes, anything that helps us prepare."
            />
            <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

            {serverError && (
              <p role="alert" className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {serverError}
              </p>
            )}

            <div className="mt-2 flex flex-col-reverse items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-ink-800/50">
                By submitting you agree to be contacted about your enquiry. We never share your details.
              </p>
              <Button type="submit" size="lg" disabled={status === "submitting"} className="w-full sm:w-auto">
                {status === "submitting" ? (
                  <span className="inline-flex items-center gap-2">
                    <LoaderCircle className="size-4 animate-spin" /> Sending…
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2">
                    Send message <Send className="size-4" />
                  </span>
                )}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
