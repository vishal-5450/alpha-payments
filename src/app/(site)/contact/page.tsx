import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/forms/ContactForm";
import { getContent, phoneHref } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const { contact } = await getContent();
  return {
    title: "Contact Us — Mumbai Office",
    description: `Contact Alpha Payments LLP: ${contact.address.line1}, ${contact.address.line3}. Phone ${contact.phone}, e-mail ${contact.email}. ${contact.hours}.`,
  };
}

export default async function ContactPage() {
  const { contact } = await getContent();
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(contact.address.mapsQuery)}&output=embed`;

  const cards = [
    {
      icon: MapPin,
      title: "Office address",
      lines: [contact.address.line1, contact.address.line2, contact.address.line3].filter(Boolean),
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address.mapsQuery)}`,
      cta: "Open in Google Maps",
    },
    { icon: Phone, title: "Phone", lines: [contact.phone], href: phoneHref(contact.phone), cta: "Call us" },
    { icon: Mail, title: "E-mail", lines: [contact.email], href: `mailto:${contact.email}`, cta: "Write to us" },
    { icon: Clock, title: "Office hours", lines: [contact.hours] },
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title="Let's talk about your payments platform."
        description="Whether you are planning a switch upgrade, evaluating monitoring tools or need a second opinion on architecture, our team replies within one business day."
      />

      <section className="relative bg-surface section-y">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_60%)]" />
        <div className="container-x relative grid gap-10 lg:grid-cols-12">
          {/* Info */}
          <div className="lg:col-span-5">
            <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1" stagger={0.08}>
              {cards.map((c) => (
                <StaggerItem key={c.title}>
                  <div className="glass rounded-3xl p-5">
                    <div className="flex items-start gap-4">
                      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[linear-gradient(135deg,#0b5fc2,#3fa9f5)] text-white shadow-[0_10px_24px_-10px_rgb(30_136_229/0.7)]">
                        <c.icon className="size-5" />
                      </span>
                      <div className="min-w-0">
                        <div className="text-xs font-semibold uppercase tracking-[0.15em] text-ink-800/50">{c.title}</div>
                        <div className="mt-1.5 space-y-0.5 text-[0.95rem] text-ink-800/85">
                          {c.lines.map((l) => (
                            <div key={l}>{l}</div>
                          ))}
                        </div>
                        {c.href && (
                          <a
                            href={c.href}
                            target={c.href.startsWith("http") ? "_blank" : undefined}
                            rel={c.href.startsWith("http") ? "noreferrer noopener" : undefined}
                            className="mt-2 inline-block text-sm font-semibold text-brand-700 underline-offset-4 hover:underline"
                          >
                            {c.cta}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal delay={0.2} className="mt-6">
              <div className="bg-grid relative overflow-hidden rounded-3xl border border-ink-800/8 bg-surface-2 shadow-[var(--shadow-card)]">
                {/* Fallback shown until the map loads */}
                <div aria-hidden="true" className="absolute inset-0 grid place-items-center">
                  <span className="relative grid size-12 place-items-center rounded-full bg-brand-600 text-white shadow-[0_10px_30px_-10px_rgb(30_136_229/0.8)]">
                    <span className="absolute inset-0 animate-pulse-ring rounded-full bg-brand-400/50" />
                    <MapPin className="relative size-5" />
                  </span>
                </div>
                <iframe
                  title="Alpha Payments office location"
                  src={mapSrc}
                  className="relative h-64 w-full grayscale-[35%] contrast-[1.05] lg:h-72"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
