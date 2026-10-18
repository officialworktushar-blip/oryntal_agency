"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { AnimatePresence, m } from "framer-motion";
import { ChevronDown, ArrowRight, MessageCircleQuestion } from "lucide-react";
import { domains } from "@/lib/content/navigation";
import { cn } from "@/lib/cn";

type MegaMenuProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function MegaMenu({ open, onOpenChange }: MegaMenuProps) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const domain = domains[active];

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onOpenChange(false);
    }
    if (open) document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenChange]);

  return (
    <div
      className="relative"
      onMouseEnter={() => onOpenChange(true)}
      onMouseLeave={() => onOpenChange(false)}
      onFocus={() => onOpenChange(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          onOpenChange(false);
        }
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={`${baseId}-panel`}
        className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-ink transition-colors hover:text-brand"
        onClick={() => onOpenChange(!open)}
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
            className="fixed inset-x-0 top-[64px] z-40 border-y border-line bg-white shadow-pop"
          >
            <div className="container-x grid grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-8 py-8">
              <div className="flex flex-col gap-1 border-r border-line pr-8">
                {domains.map((d, i) => (
                  <Link
                    key={d.id}
                    href={d.href}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className={cn(
                      "group rounded-xl px-4 py-3 transition-colors",
                      i === active ? "bg-brand-wash" : "hover:bg-brand-wash/60"
                    )}
                  >
                    <span className="flex items-baseline gap-3">
                      <span className="text-xs font-medium text-brand">{d.number}</span>
                      <span className="text-sm font-semibold text-ink group-hover:text-brand">
                        {d.label}
                      </span>
                    </span>
                    <span className="mt-1 block pl-7 text-xs leading-relaxed text-muted">
                      {d.summary}
                    </span>
                  </Link>
                ))}
              </div>

              <div>
                <AnimatePresence mode="wait">
                  <m.div
                    key={domain.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="grid grid-cols-2 gap-3"
                  >
                    {domain.items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="group flex gap-3 rounded-xl border border-transparent p-3 transition-all duration-200 hover:border-line hover:shadow-card"
                        >
                          <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-brand-soft text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                            <Icon className="size-5" strokeWidth={1.75} />
                          </span>
                          <span className="min-w-0">
                            <span className="block truncate text-sm font-semibold text-ink group-hover:text-brand">
                              {item.label}
                            </span>
                            <span className="mt-0.5 block text-xs leading-relaxed text-muted">
                              {item.description}
                            </span>
                          </span>
                        </Link>
                      );
                    })}
                  </m.div>
                </AnimatePresence>

                <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-xs font-medium text-brand transition-colors hover:text-brand-hover"
                  >
                    <MessageCircleQuestion className="size-4" />
                    Not sure what you need? Talk to us
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
