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
