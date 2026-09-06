"use client";

import { AnimatePresence, motion } from "motion/react";
import { CircleCheckBig, LoaderCircle, Send } from "lucide-react";
import { careerSchema } from "@/lib/validation";
import { useFormSubmit } from "./useFormSubmit";
import { SelectField, TextArea, TextField } from "./Field";
import { Button } from "@/components/ui/Button";

type Props = { defaultRole?: string; roles: string[]; hrEmail: string };

export function CareerForm({ defaultRole, roles, hrEmail }: Props) {
  const { status, errors, serverError, onSubmit, clearError, reset } = useFormSubmit("/api/careers", careerSchema);
  const roleOptions = [...roles.filter(Boolean), "Open application"].filter(
    (r, i, arr) => arr.indexOf(r) === i,
  );

  return (
    <div id="apply" className="glass relative scroll-mt-32 overflow-hidden rounded-[2rem] p-6 sm:p-8">
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
            <h3 className="mt-6 font-display text-2xl font-bold text-ink-800">Application received.</h3>
            <p className="mt-2 max-w-sm text-ink-800/65">
              Thank you for your interest in Alpha Payments. Our HR team will be in touch if there is a match.
            </p>
            <Button variant="secondary" className="mt-8" onClick={reset}>
              Submit another application
            </Button>
          </motion.div>
        ) : (
          <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={onSubmit} noValidate className="grid gap-4">
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
                label="E-mail"
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
              <SelectField
                label="Role you are applying for"
                name="role"
                required
                options={roleOptions}
                placeholder="Select a role"
                defaultValue={defaultRole && roleOptions.includes(defaultRole) ? defaultRole : ""}
                error={errors.role}
                onChange={() => clearError("role")}
              />
              <TextField
                label="Years of experience"
                name="experience"
                type="number"
                inputMode="numeric"
                min={0}
                max={50}
                step={1}
                required
                error={errors.experience}
                onChange={() => clearError("experience")}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField
                label="CV / resume link"
                name="cvLink"
                type="url"
                inputMode="url"
                required
                error={errors.cvLink}
                onChange={() => clearError("cvLink")}
                hint={`Google Drive, Dropbox or similar. Or e-mail ${hrEmail}`}
              />
              <TextField
                label="LinkedIn (optional)"
                name="linkedin"
                type="url"
                inputMode="url"
                error={errors.linkedin}
                onChange={() => clearError("linkedin")}
              />
            </div>
            <TextArea label="Anything you would like us to know (optional)" name="message" error={errors.message} onChange={() => clearError("message")} />
            <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

            {serverError && (
              <p role="alert" className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {serverError}
              </p>
            )}

            <div className="mt-2 flex justify-end">
              <Button type="submit" size="lg" disabled={status === "submitting"} className="w-full sm:w-auto">
                {status === "submitting" ? (
                  <span className="inline-flex items-center gap-2">
                    <LoaderCircle className="size-4 animate-spin" /> Sending…
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2">
                    Submit application <Send className="size-4" />
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
