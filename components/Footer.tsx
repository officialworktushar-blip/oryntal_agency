import Link from "next/link";
import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";
import Logo from "@/components/Logo";
import { site } from "@/lib/site";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/packages", label: "Packages" },
  { href: "/services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/process", label: "Our Process" },
  { href: "/contact", label: "Book Consultation" },
];

const legalLinks = [
  { href: "/legal/terms", label: "Terms of Service" },
  { href: "/legal/privacy", label: "Privacy Policy" },
  { href: "/legal/third-party-fees", label: "Third-Party Fees & Disclaimers" },
  { href: "/legal/refunds", label: "Refund Policy" },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-brand-100 bg-white">
      <div className="container-x grid grid-cols-2 gap-x-8 gap-y-10 py-14 md:grid-cols-4 lg:py-16">
        <div className="col-span-2 md:col-span-1">
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500">
            {site.description}
          </p>
          <p className="mt-4 text-sm font-semibold text-brand-900">
            {site.name} — {site.tagline}
          </p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-3">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="link-muted">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <h3 className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            Domains
          </h3>
          <ul className="mt-4 space-y-3">
            <li>
              <Link href="/services#domains" className="link-muted">
                Register a Domain
              </Link>
            </li>
            <li>
              <Link href="/services#domains" className="link-muted">
                Transfer a Domain
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            Legal
          </h3>
          <ul className="mt-4 space-y-3">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="link-muted">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-xs text-xs leading-relaxed text-slate-400">
            Third-party fees are separate: domain registrars, hosting, payment
            processors, and ad platforms charge their own fees and are billed
            directly by those providers. ORYNTAL does not control or retain
            these charges.
          </p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            Contact
          </h3>
          <ul className="mt-4 space-y-4 text-sm text-slate-500">
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
              <a
                href={`mailto:${site.email}`}
                className="transition-colors hover:text-brand-800"
              >
                {site.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
              <a
                href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}
                className="transition-colors hover:text-brand-800"
              >
                {site.phone}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
              <span>{site.location}</span>
            </li>
          </ul>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-900 transition-colors hover:text-brand-700"
          >
            Book a consultation
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="border-t border-brand-100">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-slate-400 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name} — {site.tagline} All rights
            reserved.
          </p>
          <p>Built with care. Orient Your Business.</p>
        </div>
      </div>
    </footer>
  );
}
