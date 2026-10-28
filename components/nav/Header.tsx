"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { m } from "framer-motion";
import { Menu, Sparkles, X } from "lucide-react";
import MegaMenu from "@/components/nav/MegaMenu";
import MobileDrawer from "@/components/nav/MobileDrawer";
import { cn } from "@/lib/cn";

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "relative inline-flex items-center text-base font-medium transition-colors",
        active ? "text-white" : "text-white/90 hover:text-white"
      )}
    >
      {label}
      {active ? (
        <m.span
          layoutId="nav-underline"
          className="nav-underline absolute inset-x-0 -bottom-2 h-0.5 rounded-full"
          transition={{ type: "spring", stiffness: 400, damping: 32 }}
        />
      ) : null}
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Pages whose hero starts dark: let the gradient show through at the very top.
  const transparentTopRoutes = [
    "/",
    "/services/business-packages/digital-foundation",
    "/services/business-packages/business-automation",
    "/services/business-packages/premium-custom-system",
    "/services/individual-services/website-and-app-development",
    "/services/individual-services/ai-development-and-automation",
    "/services/individual-services/software-api-and-system-integration",
    "/services/individual-services/business-operations-and-sourcing-support",
  ];
  const transparent =
    transparentTopRoutes.includes(pathname) && !scrolled && !megaOpen;

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 border-b transition-colors duration-300",
          transparent ? "border-transparent" : "border-white/[0.08]"
        )}
        onMouseLeave={() => setMegaOpen(false)}
      >
        <div
          aria-hidden
          className={cn(
            "nav-gradient absolute inset-0 -z-10 transition-opacity duration-300",
            transparent
              ? "opacity-0"
              : "opacity-100 backdrop-blur-md shadow-[0_16px_40px_-24px_rgba(0,0,0,0.75)]"
          )}
        />
        <div className="mx-auto flex h-[72px] w-full max-w-7xl items-center gap-8 px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            aria-label="Oryntal home"
            className="-ml-2 flex shrink-0 items-center gap-2.5 lg:-ml-4"
          >
            <Image
              src="/oryntal-logo.png"
              alt="Oryntal"
              width={40}
              height={40}
              priority
              className="h-9 w-9 object-contain"
            />
            <span className="text-xl font-semibold tracking-tight text-white">
              Oryntal
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
            <NavLink href="/" label="Home" />
            <MegaMenu open={megaOpen} onOpenChange={setMegaOpen} />
            <NavLink href="/services" label="About" />
            <NavLink href="/#how-it-works" label="Case Study" />
            <NavLink href="/contact" label="Contact" />
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <Link
              href="/contact"
              className="nav-cta hidden rounded-full p-[1px] lg:inline-flex"
            >
              <span className="nav-cta-inner inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white">
                <Sparkles className="size-4" strokeWidth={2} />
                Book a consultation
              </span>
            </Link>

            <button
              type="button"
              aria-label={drawerOpen ? "Close menu" : "Open menu"}
              aria-expanded={drawerOpen}
              onClick={() => setDrawerOpen((v) => !v)}
              className="rounded-lg p-2 text-white transition-colors hover:text-white/75 lg:hidden"
            >
              {drawerOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>
      </header>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
