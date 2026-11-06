"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
} from "react";
import Link from "next/link";
import { AnimatePresence, m } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  ChevronRight,
  MessageCircleQuestion,
} from "lucide-react";
import { menuDomains } from "@/lib/content/nav-menu";
import { cn } from "@/lib/cn";

type MegaMenuProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const CLOSE_DELAY_MS = 150;

export default function MegaMenu({ open, onOpenChange }: MegaMenuProps) {
  const [active, setActive] = useState<number | null>(null);
  const [lastActive, setLastActive] = useState(0);
  const [pinned, setPinned] = useState<number | null>(null);
  const [panelTop, setPanelTop] = useState(0);
  const [hoverCapable, setHoverCapable] = useState(true);
  const baseId = useId();
  const flyoutId = `${baseId}-flyout`;
  const triggerRef = useRef<HTMLButtonElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const categoryRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const focusFirstRef = useRef(false);
  const domain = menuDomains[lastActive];
  const isFlyoutOpen = active !== null;

  function clearCloseTimer() {
    if (closeTimerRef.current !== null) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }

  function getCategoryTop(index: number): number | null {
    const group = groupRef.current;
    const button = categoryRefs.current[index];
    if (!group || !button) return null;

    const groupRect = group.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    return buttonRect.top - groupRect.top;
  }

  function openCategory(index: number) {
    clearCloseTimer();
    const nextTop = getCategoryTop(index);
    if (nextTop !== null) setPanelTop(nextTop);
    setActive(index);
    setLastActive(index);
  }

  function closeCategory() {
    clearCloseTimer();
    setActive(null);
    setPinned(null);
  }

  function focusFirstService() {
    const first = panelRef.current?.querySelector<HTMLAnchorElement>(
      "[data-service-link]"
    );
    first?.focus();
  }

  function openCategoryAndFocus(index: number) {
    openCategory(index);
    focusFirstRef.current = true;
    window.requestAnimationFrame(() => {
      if (!focusFirstRef.current) return;
      focusFirstService();
      focusFirstRef.current = false;
    });
  }

  function scheduleClose() {
    if (!hoverCapable || pinned !== null || active === null) return;
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      setActive(null);
      closeTimerRef.current = null;
    }, CLOSE_DELAY_MS);
  }

  function handleCategoryHover(index: number) {
    if (!hoverCapable) return;
    if (active === index) {
      clearCloseTimer();
      return;
    }
    openCategory(index);
    if (pinned !== null) setPinned(null);
  }

  function handleCategoryFocus(index: number) {
    if (!hoverCapable) return;
    openCategory(index);
    if (pinned !== null && pinned !== index) setPinned(null);
  }

  function handleCategoryClick(
    index: number,
    event: ReactMouseEvent<HTMLButtonElement>
  ) {
    if (event.detail === 0) {
      openCategoryAndFocus(index);
      return;
    }

    if (hoverCapable) {
      openCategory(index);
      setPinned(index);
      return;
    }

    if (active === index) {
      setActive(null);
    } else {
      openCategory(index);
    }
    setPinned(null);
  }

  function handleCategoryKeyDown(
    event: ReactKeyboardEvent<HTMLButtonElement>,
    index: number
  ) {
    if (event.key === "ArrowRight" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openCategoryAndFocus(index);
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      closeCategory();
      return;
    }

    if (event.key === "Escape" && active !== null) {
      event.preventDefault();
      event.stopPropagation();
      closeCategory();
    }
  }

  function handleServiceKeyDown(event: ReactKeyboardEvent<HTMLAnchorElement>) {
    if (event.key !== "ArrowLeft" && event.key !== "Escape") return;

    event.preventDefault();
    event.stopPropagation();
    const returnTo = active;
    closeCategory();
    if (returnTo !== null) categoryRefs.current[returnTo]?.focus();
  }

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setHoverCapable(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    setActive(null);
    setPinned(null);
    if (closeTimerRef.current !== null) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, [open]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current !== null) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
      focusFirstRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!open || active === null) return;

    const update = () => {
      const group = groupRef.current;
      const button = categoryRefs.current[active];
      if (!group || !button) return;

      const groupRect = group.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();
      setPanelTop(buttonRect.top - groupRect.top);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [open, active]);

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
              <div ref={groupRef} className="relative inline-flex">
                <div className="w-[22rem] overflow-hidden rounded-2xl border border-line bg-white shadow-pop">
                  <div
                    className="flex flex-col gap-1 p-4"
                    onMouseLeave={scheduleClose}
                  >
                    {menuDomains.map((d, i) => {
                      const isOpen = active === i;
                      return (
                        <button
                          key={d.id}
                          ref={(element) => {
                            categoryRefs.current[i] = element;
                          }}
                          type="button"
                          aria-haspopup="true"
                          aria-expanded={isOpen}
                          aria-controls={flyoutId}
                          onMouseEnter={() => handleCategoryHover(i)}
                          onFocus={() => handleCategoryFocus(i)}
                          onClick={(event) => handleCategoryClick(i, event)}
                          onKeyDown={(event) => handleCategoryKeyDown(event, i)}
                          className={cn(
                            "flex w-full cursor-default items-center justify-between gap-3 rounded-xl px-4 py-3 text-left transition-colors",
                            isOpen ? "bg-brand-soft" : "hover:bg-brand-wash"
                          )}
                        >
                          <span className="flex min-w-0 flex-1 items-baseline gap-3">
                            <span className="text-xs font-semibold text-brand">
                              {d.number}
                            </span>
                            <span
                              className={cn(
                                "text-sm font-semibold transition-colors",
                                isOpen ? "text-brand" : "text-ink"
                              )}
                            >
                              {d.label}
                            </span>
                          </span>
                          <ChevronRight
                            aria-hidden="true"
                            className={cn(
                              "size-4 shrink-0 transition-colors",
                              isOpen ? "text-brand" : "text-muted"
                            )}
                          />
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex flex-col gap-3 border-t border-line px-4 py-4">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 text-sm font-medium text-brand transition-colors hover:text-brand-hover"
                    >
                      <MessageCircleQuestion className="size-4 shrink-0" />
                      Not sure what you need? Talk to us
                    </Link>
                    <Link
                      href="/services"
                      className="inline-flex items-center gap-1 text-xs font-medium text-muted transition-colors hover:text-brand"
                    >
                      View all services
                      <ArrowRight className="size-3.5" />
                    </Link>
                  </div>
                </div>

                <div
                  ref={panelRef}
                  id={flyoutId}
                  role="region"
                  aria-label={`${domain.label} services`}
                  aria-hidden={!isFlyoutOpen}
                  style={{ top: panelTop }}
                  className={cn(
                    "absolute left-full ml-2 w-[35rem] rounded-2xl border border-line bg-white p-5 shadow-pop motion-safe:transition-[opacity,transform] motion-safe:duration-150 motion-safe:ease-out",
                    isFlyoutOpen
                      ? "pointer-events-auto translate-x-0 opacity-100"
                      : "pointer-events-none -translate-x-1 opacity-0"
                  )}
                  onMouseEnter={clearCloseTimer}
                  onMouseLeave={scheduleClose}
                >
                  <div className="grid gap-2 sm:grid-cols-2">
                    {domain.items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.label}
                          href={item.href}
                          data-service-link
                          tabIndex={isFlyoutOpen ? undefined : -1}
                          onKeyDown={handleServiceKeyDown}
                          className="group flex gap-3 rounded-xl border border-transparent p-3 transition-all duration-200 hover:border-line hover:shadow-card"
                        >
                          <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-brand-soft text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                            <Icon className="size-5" strokeWidth={1.75} />
                          </span>
                          <span className="min-w-0">
                            <span className="block truncate text-sm font-bold text-ink">
                              {item.label}
                            </span>
                            <span className="mt-0.5 block truncate text-xs text-muted">
                              {item.description}
                            </span>
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
