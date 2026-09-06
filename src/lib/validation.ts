import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(120),
  email: z.email("Please enter a valid e-mail address").max(200),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  topic: z.enum(["EFT Switching", "Banking Automation", "Advisory", "Products / Demo", "Partnership", "Other"]),
  message: z.string().trim().min(10, "Tell us a little more (at least 10 characters)").max(4000),
  /** Honeypot: must stay empty */
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const careerSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(120),
  email: z.email("Please enter a valid e-mail address").max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  role: z.string().trim().min(2, "Please choose or type a role").max(160),
  experience: z.string().trim().max(40).optional().or(z.literal("")),
  linkedin: z.url("Please enter a valid URL").max(300).optional().or(z.literal("")),
  cvLink: z.url("Please enter a valid URL").max(500).optional().or(z.literal("")),
  message: z.string().trim().max(4000).optional().or(z.literal("")),
  website: z.string().max(0).optional().or(z.literal("")),
});

export type CareerInput = z.infer<typeof careerSchema>;

export const contactTopics = contactSchema.shape.topic.options;

/* ------------------------------ HR console ------------------------------ */

const optionalUrl = z.url("Enter a full URL starting with https://").max(300).optional().or(z.literal(""));

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
