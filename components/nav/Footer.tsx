import Link from "next/link";
import Image from "next/image";
import { domains } from "@/lib/content/navigation";
import { site } from "@/lib/site";
import { legalDocs } from "@/lib/legal";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="container-x grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Link href="/" aria-label="Oryntal home" className="inline-block">
            <Image
              src="/oryntal-logo.png"
              alt="Oryntal"
              width={48}
              height={48}
              className="h-12 w-12 object-contain"
            />
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
            ORYNTAL builds websites, AI systems, and business automation for
            growing businesses. Fixed-scope packages, or custom development when
            your process is complex.
          </p>
          <div className="mt-5 flex flex-col gap-1 text-sm text-muted">
            <a href={`mailto:${site.email}`} className="transition-colors hover:text-brand">
              {site.email}
            </a>
            {site.phone ? (
              <a
                href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}
                className="transition-colors hover:text-brand"
              >
                {site.phone}
              </a>
            ) : null}
            <span>{site.location}</span>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-ink">Services</h3>
          <ul className="mt-4 flex flex-col gap-2.5">
            {domains.map((d) => (
              <li key={d.id}>
                <Link href={d.href} className="link-muted">
                  {d.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/packages" className="link-muted">
                Packages
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-ink">Company</h3>
          <ul className="mt-4 flex flex-col gap-2.5">
            <li>
              <Link href="/#how-it-works" className="link-muted">
                How it works
              </Link>
            </li>
            <li>
              <Link href="/process" className="link-muted">
                Our process
              </Link>
            </li>
            <li>
              <Link href="/products" className="link-muted">
                Products
              </Link>
            </li>
            <li>
              <Link href="/contact" className="link-muted">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-ink">Legal</h3>
          <ul className="mt-4 flex flex-col gap-2.5">
            {legalDocs.map((doc) => (
              <li key={doc.slug}>
                <Link href={`/legal/${doc.slug}`} className="link-muted">
                  {doc.title}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs leading-relaxed text-muted">
            Payment gateway, third-party SaaS, and hosting charges are billed
            separately at actuals and are not included in package prices.
          </p>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-muted sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>{site.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
