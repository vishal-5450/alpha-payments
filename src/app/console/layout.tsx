import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Master Console — Alpha Payments" },
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export default function ConsoleRootLayout({ children }: LayoutProps<"/console">) {
  return <div className="flex min-h-screen flex-1 flex-col bg-surface text-ink-800">{children}</div>;
}
