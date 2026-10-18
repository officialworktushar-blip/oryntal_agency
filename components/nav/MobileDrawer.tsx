"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "framer-motion";
import { ChevronDown, X } from "lucide-react";
import { menuDomains } from "@/lib/content/nav-menu";
import { cn } from "@/lib/cn";

type MobileDrawerProps = {
  open: boolean;
  onClose: () => void;
};

const links = [
  { href: "/", label: "Home" },
  { href: "/services/business-packages", label: "Pricing" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/contact", label: "Contact" },
];

export default function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  const pathname = usePathname();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    onCloseRef.current();
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onCloseRef.current();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <>
          <m.div
            key="overlay"
            className="fixed inset-0 z-[55] bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden
          />
          <m.aside
            key="drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
            className="nav-gradient fixed inset-y-0 right-0 z-[60] flex w-full max-w-sm flex-col shadow-pop"
          >
            <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-white/10 px-4">
              <Link href="/" aria-label="Oryntal home" onClick={onClose} className="flex items-center gap-2.5">
                <Image
                  src="/oryntal-logo.png"
                  alt="Oryntal"
                  width={32}
                  height={32}
                  className="h-8 w-8 object-contain"
                />
                <span className="text-lg font-semibold tracking-tight text-white">
                  Oryntal
                </span>
              </Link>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="rounded-lg p-2 text-white transition-colors hover:text-white/75"
              >
                <X className="size-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4">
              <Link
                href="/"
                onClick={onClose}
                className={cn(
                  "block rounded-lg px-3 py-3 text-base font-medium transition-colors hover:bg-white/10",
                  pathname === "/" ? "text-white" : "text-white/90"
                )}
              >
                Home
              </Link>

              <div>
                <button
                  type="button"
                  aria-expanded={servicesOpen}
                  onClick={() => setServicesOpen((v) => !v)}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-base font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white"
                >
                  Services
                  <ChevronDown
                    className={cn(
                      "size-4 transition-transform duration-200",
                      servicesOpen && "rotate-180"
                    )}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {servicesOpen ? (
                    <m.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pb-2">
                        {menuDomains.map((domain) => {
                          const isOpen = expanded === domain.id;
                          return (
                            <div key={domain.id}>
                              <button
                                type="button"
                                aria-expanded={isOpen}
                                onClick={() =>
                                  setExpanded(isOpen ? null : domain.id)
                                }
                                className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-white/75 transition-colors hover:text-white"
                              >
                                {domain.label}
                                <ChevronDown
                                  className={cn(
                                    "size-4 shrink-0 transition-transform duration-200",
                                    isOpen && "rotate-180"
                                  )}
                                />
                              </button>

                              <AnimatePresence initial={false}>
                                {isOpen ? (
                                  <m.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{
                                      duration: 0.22,
                                      ease: "easeOut",
                                    }}
                                    className="overflow-hidden"
                                  >
                                    <div className="flex flex-col gap-1 pb-2 pl-3">
                                      {domain.items.map((item) => {
                                        const Icon = item.icon;
                                        return (
                                          <Link
                                            key={item.label}
                                            href={item.href}
                                            onClick={onClose}
                                            className="flex gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-white/10"
                                          >
                                            <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-md bg-white/10 text-white">
                                              <Icon
                                                className="size-3.5"
                                                strokeWidth={1.75}
                                              />
                                            </span>
                                            <span className="min-w-0">
                                              <span className="block text-sm font-medium text-white">
                                                {item.label}
                                              </span>
                                              <span className="block truncate text-xs text-white/60">
                                                {item.description}
                                              </span>
                                            </span>
                                          </Link>
                                        );
                                      })}
                                      <Link
                                        href={domain.href}
                                        onClick={onClose}
                                        className="mt-1 px-3 text-xs font-semibold text-white/75 transition-colors hover:text-white"
                                      >
                                        View all {domain.label.toLowerCase()} →
                                      </Link>
                                    </div>
                                  </m.div>
                                ) : null}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>
                    </m.div>
                  ) : null}
                </AnimatePresence>
              </div>

              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className={cn(
                    "block rounded-lg px-3 py-3 text-base font-medium transition-colors hover:bg-white/10",
                    pathname === link.href ? "text-white" : "text-white/90"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="shrink-0 border-t border-white/10 px-4 py-4">
              <Link
                href="/contact"
                onClick={onClose}
                className="nav-cta block w-full rounded-full p-[1px]"
              >
                <span className="nav-cta-inner block w-full rounded-full px-5 py-3 text-center text-sm font-medium text-white">
                  Book a consultation
                </span>
              </Link>
            </div>
          </m.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
