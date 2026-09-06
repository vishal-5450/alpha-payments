import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import { openRoles, site } from "./site";

/**
 * Editable site content, managed from the hidden HR console (/console).
 *
 * Storage: a single JSON document at $CONTENT_DIR/content.json (default ./data).
 * When the file does not exist, the defaults from lib/site.ts are used, so the site
 * always renders. Writes are atomic (tmp file + rename).
 *
 * On hosts with an ephemeral filesystem (Render without a disk, Vercel, …) set
 * CONTENT_DIR to a persistent mount, otherwise edits are lost on redeploy.
 */

export type ContactInfo = {
  email: string;
  hrEmail: string;
  phone: string;
  address: { line1: string; line2: string; line3: string; mapsQuery: string };
  hours: string;
  social: { linkedin: string; x: string };
};

export type Job = {
  id: string;
  title: string;
  type: string;
  location: string;
  team: string;
  /** Plain text. Blank lines separate paragraphs. */
  description: string;
  /** One requirement per line. */
  requirements: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

export type SiteContent = {
  version: 1;
  contact: ContactInfo;
  careers: {
    /** Shown above the roles list on /careers. */
    intro: string;
    jobs: Job[];
  };
  updatedAt: string;
};

const CONTENT_DIR = process.env.CONTENT_DIR ?? path.join(process.cwd(), "data");
const FILE = path.join(CONTENT_DIR, "content.json");

export function defaultContent(): SiteContent {
  const now = new Date().toISOString();
  return {
    version: 1,
    contact: {
      email: site.email,
      hrEmail: site.hrEmail,
      phone: site.phone,
      address: { ...site.address },
      hours: site.hours,
      social: { ...site.social },
    },
    careers: {
      intro: "Do not see a fit? Send an open application and tell us what you would love to build.",
      jobs: openRoles.map((r, i) => ({
        id: `role-${i + 1}`,
        title: r.title,
        type: r.type,
        location: r.location,
        team: r.team,
        description: r.description,
        requirements: r.requirements.join("\n"),
        active: true,
        createdAt: now,
        updatedAt: now,
      })),
    },
    updatedAt: now,
  };
}

let cache: { mtimeMs: number; data: SiteContent } | null = null;

export async function getContent(): Promise<SiteContent> {
  try {
    const stat = await fs.stat(FILE);
    if (cache && cache.mtimeMs === stat.mtimeMs) return cache.data;
    const raw = await fs.readFile(FILE, "utf8");
    const parsed = JSON.parse(raw) as SiteContent;
    const data = normalise(parsed);
    cache = { mtimeMs: stat.mtimeMs, data };
    return data;
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code !== "ENOENT") console.error("[content] read failed, using defaults", err);
    return defaultContent();
  }
}

export async function saveContent(next: SiteContent): Promise<void> {
  const data: SiteContent = { ...next, version: 1, updatedAt: new Date().toISOString() };
  await fs.mkdir(CONTENT_DIR, { recursive: true });
  const tmp = `${FILE}.${process.pid}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(data, null, 2), "utf8");
  await fs.rename(tmp, FILE);
  cache = null;
}

/** Fill in any keys missing from an older file so the UI never sees undefined. */
function normalise(c: Partial<SiteContent>): SiteContent {
  const d = defaultContent();
  return {
    version: 1,
    contact: {
      ...d.contact,
      ...c.contact,
      address: { ...d.contact.address, ...c.contact?.address },
      social: { ...d.contact.social, ...c.contact?.social },
    },
    careers: {
      intro: c.careers?.intro ?? d.careers.intro,
      jobs: (c.careers?.jobs ?? d.careers.jobs).map((j) => ({ ...j, active: j.active ?? true })),
    },
    updatedAt: c.updatedAt ?? d.updatedAt,
  };
}

/* ------------------------------ Derived helpers ----------------------------- */

export function phoneHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function activeJobs(jobs: Job[]) {
  return jobs.filter((j) => j.active);
}

export function newJobId() {
  return `job-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}
