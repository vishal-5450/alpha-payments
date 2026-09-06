import "server-only";
import { openRoles, site } from "./site";
import { query } from "./db";

/**
 * Editable site content, managed from the hidden HR console (/console).
 *
 * Storage: a single-row Postgres table `site_content` (JSONB), via DATABASE_URL.
 * When the row is missing, defaults from lib/site.ts are seeded so the site always renders.
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

let cache: { updatedAt: string; data: SiteContent } | null = null;

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

export async function getContent(): Promise<SiteContent> {
  try {
    const { rows } = await query<{ data: SiteContent; updated_at: Date }>(
      "SELECT data, updated_at FROM site_content WHERE id = 1",
    );
    if (rows.length === 0) {
      const seeded = defaultContent();
      await saveContent(seeded);
      return seeded;
    }
    const updatedAt = rows[0].updated_at.toISOString();
    if (cache && cache.updatedAt === updatedAt) return cache.data;
    const data = normalise(rows[0].data);
    cache = { updatedAt, data };
    return data;
  } catch (err) {
    console.error("[content] postgres read failed, using defaults", err);
    return defaultContent();
  }
}

export async function saveContent(next: SiteContent): Promise<void> {
  const data: SiteContent = { ...next, version: 1, updatedAt: new Date().toISOString() };
  await query(
    `INSERT INTO site_content (id, data, updated_at)
     VALUES (1, $1::jsonb, now())
     ON CONFLICT (id) DO UPDATE
       SET data = EXCLUDED.data,
           updated_at = now()`,
    [JSON.stringify(data)],
  );
  cache = null;
}

/** Fill in any keys missing from an older document so the UI never sees undefined. */
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
