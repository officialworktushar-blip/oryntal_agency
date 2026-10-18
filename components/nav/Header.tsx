"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import MegaMenu from "@/components/nav/MegaMenu";
import MobileDrawer from "@/components/nav/MobileDrawer";
import { cn } from "@/lib/cn";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-white/90 backdrop-blur-md transition-all duration-200",
        scrolled || megaOpen
          ? "border-b border-line shadow-[0_1px_0_rgba(0,0,0,0.02)]"
          : "border-b border-transparent"
      )}
      onMouseLeave={() => setMegaOpen(false)}
    >
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Link href="/" aria-label="ORYNTAL home" className="shrink-0">
          <Image src="/logo.png" alt="ORYNTAL" width={140} height={36} priority />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          <MegaMenu open={megaOpen} onOpenChange={setMegaOpen} />
          <Link
            href="/packages"
            className="rounded-lg px-3 py-2 text-sm font-medium text-ink transition-colors hover:text-brand"
          >
            Pricing
          </Link>
          <Link
            href="/#how-it-works"
            className="rounded-lg px-3 py-2 text-sm font-medium text-ink transition-colors hover:text-brand"
          >
            How it works
          </Link>
          <Link
            href="/contact"
            className="rounded-lg px-3 py-2 text-sm font-medium text-ink transition-colors hover:text-brand"
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/contact" className="btn-primary hidden sm:inline-flex">
            Book a consultation
          </Link>
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={drawerOpen}
            onClick={() => setDrawerOpen((v) => !v)}
            className="rounded-lg p-2 text-ink transition-colors hover:text-brand lg:hidden"
          >
            <Menu className="size-6" />
          </button>
        </div>
      </div>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </header>
  );
}
