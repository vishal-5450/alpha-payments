import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getContent } from "@/lib/content";

export default async function SiteLayout({ children }: LayoutProps<"/">) {
  const { contact } = await getContent();
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-ink-800"
      >
        Skip to content
      </a>
      <Navbar phone={contact.phone} email={contact.email} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer contact={contact} />
    </>
  );
}
