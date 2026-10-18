"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, m } from "framer-motion";
import { ChevronDown, X } from "lucide-react";
import { domains } from "@/lib/content/navigation";
import { cn } from "@/lib/cn";

type MobileDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export default function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  const [expanded, setExpanded] = useState<string | null>(domains[0].id);

  return (
    <AnimatePresence>
      {open ? (
        <>
          <m.div
            className="fixed inset-0 z-40 bg-ink/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <m.div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-x-0 top-16 z-50 max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-line bg-white shadow-pop"
          >
            <div className="container-x flex flex-col py-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-[0.14em] text-brand">
                  Services
                </span>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close menu"
                  className="rounded-lg p-2 text-muted transition-colors hover:text-ink"
                >
                  <X className="size-5" />
                </button>
              </div>

              {domains.map((domain) => {
                const isOpen = expanded === domain.id;
                return (
                  <div key={domain.id} className="border-b border-line last:border-b-0">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setExpanded(isOpen ? null : domain.id)}
                      className="flex w-full items-center justify-between py-3 text-left"
                    >
                      <span className="text-sm font-semibold text-ink">{domain.label}</span>
                      <ChevronDown
                        className={cn(
                          "size-4 text-muted transition-transform duration-200",
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
                          transition={{ duration: 0.22, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col gap-1 pb-3">
                            {domain.items.map((item) => {
                              const Icon = item.icon;
                              return (
                                <Link
                                  key={item.href}
                                  href={item.href}
                                  onClick={onClose}
                                  className="flex gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-brand-wash"
                                >
                                  <span className="grid size-8 shrink-0 place-items-center rounded-md bg-brand-soft text-brand">
                                    <Icon className="size-4" strokeWidth={1.75} />
                                  </span>
                                  <span>
                                    <span className="block text-sm font-medium text-ink">
                                      {item.label}
                                    </span>
                                    <span className="block text-xs text-muted">
                                      {item.description}
                                    </span>
                                  </span>
                                </Link>
                              );
                            })}
                            <Link
                              href={domain.href}
                              onClick={onClose}
                              className="mt-1 px-2 text-xs font-medium text-brand"
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

              <Link
                href="/packages"
                onClick={onClose}
                className="border-t border-line py-3 text-sm font-medium text-ink"
              >
                Pricing
              </Link>
              <Link
                href="/#how-it-works"
                onClick={onClose}
                className="border-t border-line py-3 text-sm font-medium text-ink"
              >
                How it works
              </Link>
              <Link
                href="/contact"
                onClick={onClose}
                className="border-t border-line py-3 text-sm font-medium text-ink"
              >
                Contact
              </Link>

              <Link
                href="/contact"
                onClick={onClose}
                className="btn-primary mt-4 w-full"
              >
                Book a consultation
              </Link>
            </div>
          </m.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
