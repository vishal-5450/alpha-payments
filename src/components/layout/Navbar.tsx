"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";
import { nav, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation (derived from pathname changes, no effect needed).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    if (open) setOpen(false);
  }

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const light = !scrolled && !open; // over dark hero, use light text

  return (
    <>
      {/* Scroll progress */}
      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-[linear-gradient(90deg,#0b5fc2,#3fa9f5,#5eead4)]"
        style={{ scaleX: progress }}
      />

      <header className="fixed inset-x-0 top-0 z-50 pt-3 sm:pt-4">
        <div className="container-x">
          <motion.nav
            layout
            className={cn(
              "flex items-center justify-between rounded-full px-4 py-2.5 transition-[background-color,box-shadow,border-color,backdrop-filter] duration-500 ease-[var(--ease-out-expo)] sm:px-5",
              scrolled || open
                ? "glass"
                : "border border-transparent bg-transparent",
            )}
            aria-label="Primary"
          >
            <Link href="/" className="rounded-full" aria-label={`${site.name} home`}>
              <Logo tone={light ? "dark" : "light"} id="nav" />
            </Link>

            <ul className="hidden items-center gap-1 lg:flex">
              {nav.map((item) => {
                const active = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "relative rounded-full px-4 py-2 text-[0.92rem] font-medium transition-colors duration-300",
                        light ? "text-white/80 hover:text-white" : "text-ink-800/70 hover:text-ink-800",
                        active && (light ? "text-white" : "text-ink-800"),
                      )}
                    >
                      {active && (
                        <motion.span
                          layoutId="nav-active"
                          className={cn(
                            "absolute inset-0 rounded-full",
                            light ? "bg-white/12" : "bg-brand-600/8",
                          )}
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                      <span className="relative">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-2">
              <Link
                href="/contact"
                className={cn(
                  "group hidden h-10 items-center gap-1.5 rounded-full px-5 text-sm font-semibold transition-all duration-300 sm:inline-flex",
                  light
                    ? "bg-white text-ink-800 hover:bg-brand-50"
                    : "bg-ink-800 text-white hover:bg-brand-700",
                )}
              >
                Let&apos;s talk
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className={cn(
                  "inline-flex size-10 items-center justify-center rounded-full transition-colors lg:hidden",
                  light ? "text-white hover:bg-white/10" : "text-ink-800 hover:bg-ink-800/5",
                )}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
              >
                {open ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>
          </motion.nav>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-surface/90 pt-24 backdrop-blur-2xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.ul
              className="container-x flex flex-col gap-1"
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } } }}
            >
              {[{ label: "Home", href: "/" }, ...nav].map((item) => (
                <motion.li
                  key={item.href}
                  variants={{
                    hidden: { opacity: 0, x: -16 },
                    show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
                  }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center justify-between rounded-2xl px-4 py-4 font-display text-2xl font-bold text-ink-800",
                      pathname === item.href && "bg-brand-600/8 text-brand-700",
                    )}
                  >
                    {item.label}
                    <ArrowUpRight className="size-5 opacity-40" />
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
            <div className="container-x mt-auto pb-10">
              <Link
                href="/contact"
                className="flex h-14 w-full items-center justify-center rounded-full bg-ink-800 font-semibold text-white"
              >
                Let&apos;s talk
              </Link>
              <p className="mt-4 text-center text-sm text-ink-800/50">
                {site.phone} · {site.email}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
