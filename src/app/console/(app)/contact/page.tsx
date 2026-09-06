import { ContactInfoForm } from "@/components/console/forms";
import { getContent } from "@/lib/content";

export default async function ConsoleContactPage() {
  const { contact } = await getContent();
  return (
    <div className="mx-auto grid max-w-3xl gap-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Contact info</p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight">Contact details & office address</h1>
        <p className="mt-2 text-ink-800/60">Used across the navigation, footer, Contact page and e-mail notifications.</p>
      </div>
      <ContactInfoForm contact={contact} />
    </div>
  );
}
