"use client";

import { useActionState } from "react";
import { login, saveCareersIntro, saveContactInfo, saveJob, type ActionState } from "@/app/console/actions";
import type { ContactInfo, Job } from "@/lib/content";
import { Field, Input, Notice, SubmitButton, Textarea, Toggle } from "./ui";

/**
 * React resets a form after its server action settles, so every field takes its
 * defaultValue from the echoed submission first, then from stored content.
 */
function useValues(state: ActionState) {
  return (name: string, fallback = "") => state?.values?.[name] ?? fallback;
}

/* ---------------------------------- Login ---------------------------------- */

export function LoginForm({ next }: { next?: string }) {
  const [state, action] = useActionState<ActionState, FormData>(login, undefined);
  const v = useValues(state);
  return (
    <form action={action} className="grid gap-4">
      {next && <input type="hidden" name="next" value={next} />}
      <Field label="Username" name="user">
        <Input name="user" autoComplete="username" required autoFocus defaultValue={v("user")} />
      </Field>
      <Field label="Password" name="password">
        <Input name="password" type="password" autoComplete="current-password" required />
      </Field>
      {state?.error && <Notice tone="error">{state.error}</Notice>}
      <SubmitButton className="mt-2 w-full">Sign in</SubmitButton>
    </form>
  );
}

/* ------------------------------ Contact info ------------------------------ */

export function ContactInfoForm({ contact }: { contact: ContactInfo }) {
  const [state, action] = useActionState<ActionState, FormData>(saveContactInfo, undefined);
  const e = state?.fieldErrors ?? {};
  const v = useValues(state);
  return (
    <form action={action} className="grid gap-6">
      <Section title="E-mail & phone" text="Shown in the navigation, footer and Contact page. Form notifications are delivered to the HR e-mail.">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="General e-mail" name="email" error={e.email}>
            <Input name="email" type="email" defaultValue={v("email", contact.email)} error={!!e.email} />
          </Field>
          <Field label="HR e-mail (receives all form submissions)" name="hrEmail" error={e.hrEmail}>
            <Input name="hrEmail" type="email" defaultValue={v("hrEmail", contact.hrEmail)} error={!!e.hrEmail} />
          </Field>
          <Field label="Phone" name="phone" error={e.phone} hint="Displayed as typed; the call link is derived automatically.">
            <Input name="phone" defaultValue={v("phone", contact.phone)} error={!!e.phone} />
          </Field>
          <Field label="Office hours" name="hours" error={e.hours}>
            <Input name="hours" defaultValue={v("hours", contact.hours)} error={!!e.hours} />
          </Field>
        </div>
      </Section>

      <Section title="Office address" text="Three display lines plus the query used for the Google Maps embed.">
        <div className="grid gap-4">
          <Field label="Address line 1" name="line1" error={e.line1}>
            <Input name="line1" defaultValue={v("line1", contact.address.line1)} error={!!e.line1} />
          </Field>
          <Field label="Address line 2" name="line2" error={e.line2}>
            <Input name="line2" defaultValue={v("line2", contact.address.line2)} error={!!e.line2} />
          </Field>
          <Field label="Address line 3" name="line3" error={e.line3}>
            <Input name="line3" defaultValue={v("line3", contact.address.line3)} error={!!e.line3} />
          </Field>
          <Field label="Google Maps search text" name="mapsQuery" error={e.mapsQuery} hint="Exactly what you would type into Google Maps to find the office.">
            <Input name="mapsQuery" defaultValue={v("mapsQuery", contact.address.mapsQuery)} error={!!e.mapsQuery} />
          </Field>
        </div>
      </Section>

      <Section title="Social links" text="Leave blank to hide the icon in the footer.">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="LinkedIn URL" name="linkedin" error={e.linkedin}>
            <Input name="linkedin" type="url" defaultValue={v("linkedin", contact.social.linkedin)} error={!!e.linkedin} placeholder="https://www.linkedin.com/company/…" />
          </Field>
          <Field label="X (Twitter) URL" name="x" error={e.x}>
            <Input name="x" type="url" defaultValue={v("x", contact.social.x)} error={!!e.x} placeholder="https://x.com/…" />
          </Field>
        </div>
      </Section>

      {state?.error && <Notice tone="error">{state.error}</Notice>}
      {state?.ok && <Notice tone="success">Saved. The website now shows the updated contact details.</Notice>}
      <div className="flex justify-end">
        <SubmitButton>Save contact info</SubmitButton>
      </div>
    </form>
  );
}

/* ---------------------------------- Jobs ---------------------------------- */

export function CareersIntroForm({ intro }: { intro: string }) {
  const [state, action] = useActionState<ActionState, FormData>(saveCareersIntro, undefined);
  const e = state?.fieldErrors ?? {};
  const v = useValues(state);
  return (
    <form action={action} className="grid gap-4">
      <Field label="Text shown above the roles list on the Careers page" name="intro" error={e.intro}>
        <Textarea name="intro" defaultValue={v("intro", intro)} className="min-h-24" error={!!e.intro} />
      </Field>
      {state?.error && <Notice tone="error">{state.error}</Notice>}
      {state?.ok && <Notice tone="success">Saved.</Notice>}
      <div className="flex justify-end">
        <SubmitButton variant="ghost">Save text</SubmitButton>
      </div>
    </form>
  );
}

export function JobForm({ job }: { job?: Job }) {
  const [state, action] = useActionState<ActionState, FormData>(saveJob, undefined);
  const e = state?.fieldErrors ?? {};
  const v = useValues(state);
  const activeDefault = state?.values ? state.values.active === "on" : job ? job.active : true;
  return (
    <form action={action} className="grid gap-6">
      {job && <input type="hidden" name="id" value={job.id} />}
      <Section title="Role" text="These details appear on the job card.">
        <div className="grid gap-4">
          <Field label="Job title" name="title" error={e.title}>
            <Input name="title" defaultValue={v("title", job?.title)} error={!!e.title} placeholder="e.g. Base24-eps Developer" />
          </Field>
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Employment type" name="type" error={e.type}>
              <Input name="type" defaultValue={v("type", job?.type ?? "Full-time")} error={!!e.type} list="job-types" />
              <datalist id="job-types">
                <option value="Full-time" />
                <option value="Contract" />
                <option value="Internship" />
                <option value="Part-time" />
              </datalist>
            </Field>
            <Field label="Location" name="location" error={e.location}>
              <Input name="location" defaultValue={v("location", job?.location ?? "Mumbai")} error={!!e.location} placeholder="Mumbai / Hybrid" />
            </Field>
            <Field label="Team" name="team" error={e.team}>
              <Input name="team" defaultValue={v("team", job?.team)} error={!!e.team} placeholder="Switch Engineering" />
            </Field>
          </div>
        </div>
      </Section>

      <Section title="Description" text="Shown when a candidate expands the role. Separate paragraphs with a blank line.">
        <div className="grid gap-4">
          <Field label="Job description" name="description" error={e.description}>
            <Textarea name="description" defaultValue={v("description", job?.description)} className="min-h-48" error={!!e.description} />
          </Field>
          <Field label="Requirements (one per line)" name="requirements" error={e.requirements}>
            <Textarea
              name="requirements"
              defaultValue={v("requirements", job?.requirements)}
              className="min-h-32"
              error={!!e.requirements}
              placeholder={"3+ years on Base24-eps\nISO 8583 and EMV experience"}
            />
          </Field>
        </div>
      </Section>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <Toggle key={String(activeDefault)} name="active" label="Published on the Careers page" defaultChecked={activeDefault} />
        <SubmitButton>{job ? "Save changes" : "Create job"}</SubmitButton>
      </div>
      {state?.error && <Notice tone="error">{state.error}</Notice>}
    </form>
  );
}

/* --------------------------------- Layout --------------------------------- */

function Section({ title, text, children }: { title: string; text?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-ink-800/8 bg-white p-6 shadow-[var(--shadow-card)]">
      <h2 className="font-display text-lg font-bold tracking-tight">{title}</h2>
      {text && <p className="mt-1 text-sm text-ink-800/55">{text}</p>}
      <div className="mt-5">{children}</div>
    </section>
  );
}
