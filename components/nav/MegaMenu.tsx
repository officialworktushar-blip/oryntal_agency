"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, m } from "framer-motion";
import { ArrowRight, ChevronDown, MessageCircleQuestion } from "lucide-react";
import { domains } from "@/lib/content/navigation";
import { cn } from "@/lib/cn";

type MegaMenuProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function MegaMenu({ open, onOpenChange }: MegaMenuProps) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const domain = domains[active];

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onOpenChange(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenChange]);

  return (
    <div
      className="flex"
      onMouseEnter={() => onOpenChange(true)}
      onFocus={() => onOpenChange(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          onOpenChange(false);
        }
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={`${baseId}-panel`}
        onClick={() => onOpenChange(!open)}
        className={cn(
          "inline-flex items-center gap-1 text-base font-medium transition-colors",
          open ? "text-white" : "text-white/90 hover:text-white"
        )}
      >
        Services
        <ChevronDown
          className={cn(
            "size-4 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence>
        {open ? (
          <m.div
            id={`${baseId}-panel`}
            role="region"
            aria-label="Services"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute inset-x-0 top-full z-40 pt-2"
          >
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-pop">
                <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
                  <div className="flex flex-col gap-1 border-b border-line p-4 lg:border-b-0 lg:border-r">
                    {domains.map((d, i) => (
                      <Link
                        key={d.id}
                        href={d.href}
                        onMouseEnter={() => setActive(i)}
                        onFocus={() => setActive(i)}
                        className={cn(
                          "rounded-xl px-4 py-3 transition-colors",
                          i === active
                            ? "bg-brand-soft"
                            : "hover:bg-brand-wash"
                        )}
                      >
                        <span className="flex items-baseline gap-3">
                          <span className="text-xs font-semibold text-brand">
                            {d.number}
                          </span>
                          <span
                            className={cn(
                              "text-sm font-semibold transition-colors",
                              i === active ? "text-brand" : "text-ink"
                            )}
                          >
                            {d.label}
                          </span>
                        </span>
                      </Link>
                    ))}
                  </div>

                  <div className="p-5 lg:p-6">
                    <AnimatePresence mode="wait">
                      <m.div
                        key={domain.id}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.15 }}
                        className="grid gap-2 sm:grid-cols-2"
                      >
                        {domain.items.map((item) => (
                          <div
                            key={item.href}
                            className="text-xs text-white/60 px-3 py-1"
                          >
                            {item.label}
                          </div>
                        ))}
                      </m.div>
                    </AnimatePresence>
                  </div>
                </div>

                <div className="flex flex-col items-start justify-between gap-2 border-t border-line px-6 py-4 sm:flex-row sm:items-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-sm font-medium text-brand transition-colors hover:text-brand-hover"
                  >
                    <MessageCircleQuestion className="size-4" />
                    Not sure what you need? Talk to us
                    <ArrowRight className="size-4" />
                  </Link>
                  <Link
                    href={domain.href}
                    className="inline-flex items-center gap-1 text-xs font-medium text-muted transition-colors hover:text-brand"
                  >
                    View all {domain.label.toLowerCase()}
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
