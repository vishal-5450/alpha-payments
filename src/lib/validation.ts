import { z } from "zod";

const namePart = z
  .string()
  .trim()
  .min(2, "Enter at least 2 characters")
  .max(60, "Keep this under 60 characters")
  .regex(/^[A-Za-z][A-Za-z\s'.-]*$/, "Use letters only (spaces, hyphens and apostrophes allowed)");

const optionalPhone = z
  .string()
  .trim()
  .max(40)
  .refine((v) => v === "" || /^[+]?[\d\s()-]{7,22}$/.test(v), {
    message: "Enter a valid phone number",
  });

const optionalUrl = z.url("Enter a full URL starting with https://").max(300).optional().or(z.literal(""));

export const contactTopics = [
  "EFT Switching",
  "Banking Automation",
  "Advisory",
  "Products / Demo",
  "Partnership",
  "Other",
] as const;

export const contactSchema = z.object({
  firstName: namePart,
  lastName: namePart,
  email: z.email("Please enter a valid e-mail address").max(200),
  company: z
    .string()
    .trim()
    .max(160)
    .refine((v) => v === "" || v.length >= 2, { message: "Enter at least 2 characters" }),
  phone: optionalPhone,
  topic: z.enum(contactTopics, { message: "Please select a topic" }),
  message: z.string().trim().min(10, "Tell us a little more (at least 10 characters)").max(4000),
  /** Honeypot: must stay empty */
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const careerSchema = z.object({
  firstName: namePart,
  lastName: namePart,
  email: z.email("Please enter a valid e-mail address").max(200),
  phone: optionalPhone,
  role: z.string().trim().min(1, "Please select a role").max(160),
  experience: z.preprocess((val) => {
    if (val === "" || val === null || val === undefined) return undefined;
    if (typeof val === "string") {
      const t = val.trim();
      if (!t) return undefined;
      return Number(t);
    }
    return val;
  }, z.number({ error: "Enter years of experience as a number" }).int("Use a whole number").min(0, "Cannot be negative").max(50, "Enter a realistic number (0–50)")),
  linkedin: optionalUrl,
  cvLink: z.url("Enter a valid CV / resume link (https://...)").max(500),
  message: z.string().trim().max(4000).optional().or(z.literal("")),
  website: z.string().max(0).optional().or(z.literal("")),
});

export type CareerInput = z.infer<typeof careerSchema>;

/* ------------------------------ HR console ------------------------------ */

export const contactInfoSchema = z.object({
  email: z.email("Enter a valid e-mail").max(200),
  hrEmail: z.email("Enter a valid e-mail").max(200),
  phone: z.string().trim().min(6, "Enter a phone number").max(40),
  line1: z.string().trim().min(2, "Address line 1 is required").max(160),
  line2: z.string().trim().max(160).optional().or(z.literal("")),
  line3: z.string().trim().max(160).optional().or(z.literal("")),
  mapsQuery: z.string().trim().min(3, "Enter the address as you would search it on Google Maps").max(300),
  hours: z.string().trim().min(3, "Enter office hours").max(160),
  linkedin: optionalUrl,
  x: optionalUrl,
});

export const jobSchema = z.object({
  id: z.string().trim().max(80).optional().or(z.literal("")),
  title: z.string().trim().min(2, "Title is required").max(160),
  type: z.string().trim().min(2, "Employment type is required").max(60),
  location: z.string().trim().min(2, "Location is required").max(120),
  team: z.string().trim().min(2, "Team is required").max(120),
  description: z.string().trim().min(20, "Describe the role in at least 20 characters").max(8000),
  requirements: z.string().trim().max(4000).optional().or(z.literal("")),
  active: z.enum(["on"]).optional(),
});

export const careersIntroSchema = z.object({
  intro: z.string().trim().min(10, "Write at least 10 characters").max(600),
});

/** Collapses zod issues to { field: firstMessage }. */
export function fieldErrorsOf(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const k = String(issue.path[0] ?? "form");
    if (!out[k]) out[k] = issue.message;
  }
  return out;
}
