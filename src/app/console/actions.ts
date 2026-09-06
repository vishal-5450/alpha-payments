"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { checkCredentials, clearAttempts, recordFailedAttempt, tooManyAttempts } from "@/lib/auth";
import { clientIp, endSession, requireSession, startSession } from "@/lib/session";
import { getContent, newJobId, saveContent, type Job } from "@/lib/content";
import { careersIntroSchema, contactInfoSchema, fieldErrorsOf, jobSchema } from "@/lib/validation";

export type ActionState =
  | { ok?: boolean; error?: string; fieldErrors?: Record<string, string>; values?: Record<string, string> }
  | undefined;

/** Echo submitted (non-secret) values so React does not wipe the form when the action returns an error. */
function valuesOf(formData: FormData): Record<string, string> {
  const out: Record<string, string> = {};
  formData.forEach((v, k) => {
    if (typeof v === "string" && !k.startsWith("$") && k !== "password") out[k] = v;
  });
  return out;
}

/* --------------------------------- Auth --------------------------------- */

export async function login(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const ip = await clientIp();
  if (tooManyAttempts(ip)) return { error: "Too many failed attempts. Please wait 15 minutes and try again.", values: valuesOf(formData) };

  const user = String(formData.get("user") ?? "");
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "");

  if (!(await checkCredentials(user, password))) {
    recordFailedAttempt(ip);
    return { error: "Incorrect username or password.", values: valuesOf(formData) };
  }

  clearAttempts(ip);
  await startSession(user.trim().toLowerCase());
  redirect(next.startsWith("/console") ? next : "/console");
}

export async function logout() {
  await endSession();
  redirect("/console/login");
}

/* ------------------------------ Contact info ------------------------------ */

export async function saveContactInfo(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireSession();
  const parsed = contactInfoSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: "Please fix the highlighted fields.", fieldErrors: fieldErrorsOf(parsed.error), values: valuesOf(formData) };

  const d = parsed.data;
  const content = await getContent();
  await saveContent({
    ...content,
    contact: {
      email: d.email,
      hrEmail: d.hrEmail,
      phone: d.phone,
      address: { line1: d.line1, line2: d.line2 ?? "", line3: d.line3 ?? "", mapsQuery: d.mapsQuery },
      hours: d.hours,
      social: { linkedin: d.linkedin ?? "", x: d.x ?? "" },
    },
  });
  revalidatePath("/", "layout");
  return { ok: true };
}

/* ---------------------------------- Jobs ---------------------------------- */

export async function saveCareersIntro(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireSession();
  const parsed = careersIntroSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: "Please fix the highlighted fields.", fieldErrors: fieldErrorsOf(parsed.error), values: valuesOf(formData) };

  const content = await getContent();
  await saveContent({ ...content, careers: { ...content.careers, intro: parsed.data.intro } });
  revalidatePath("/careers");
  return { ok: true };
}

export async function saveJob(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireSession();
  const parsed = jobSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: "Please fix the highlighted fields.", fieldErrors: fieldErrorsOf(parsed.error), values: valuesOf(formData) };

  const d = parsed.data;
  const now = new Date().toISOString();
  const content = await getContent();
  const jobs = [...content.careers.jobs];
  const idx = d.id ? jobs.findIndex((j) => j.id === d.id) : -1;

  const base: Omit<Job, "id" | "createdAt"> = {
    title: d.title,
    type: d.type,
    location: d.location,
    team: d.team,
    description: d.description,
    requirements: d.requirements ?? "",
    active: d.active === "on",
    updatedAt: now,
  };

  if (idx >= 0) jobs[idx] = { ...jobs[idx], ...base };
  else jobs.unshift({ id: newJobId(), createdAt: now, ...base });

  await saveContent({ ...content, careers: { ...content.careers, jobs } });
  revalidatePath("/careers");
  redirect("/console/jobs?saved=1");
}

export async function toggleJob(formData: FormData) {
  await requireSession();
  const id = String(formData.get("id") ?? "");
  const content = await getContent();
  const jobs = content.careers.jobs.map((j) => (j.id === id ? { ...j, active: !j.active, updatedAt: new Date().toISOString() } : j));
  await saveContent({ ...content, careers: { ...content.careers, jobs } });
  revalidatePath("/careers");
  revalidatePath("/console/jobs");
}

export async function deleteJob(formData: FormData) {
  await requireSession();
  const id = String(formData.get("id") ?? "");
  const content = await getContent();
  const jobs = content.careers.jobs.filter((j) => j.id !== id);
  await saveContent({ ...content, careers: { ...content.careers, jobs } });
  revalidatePath("/careers");
  redirect("/console/jobs?deleted=1");
}
