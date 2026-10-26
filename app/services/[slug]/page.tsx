import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/motion/Reveal";
import { domains } from "@/lib/content/navigation";

export function generateStaticParams() {
  return domains.map((d) => ({ slug: d.id }));
}

export default async function DomainPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const domain = domains.find((d) => d.id === slug);
  if (!domain) notFound();

  return (
    <>
      <PageHeader eyebrow={`Domain ${domain.number}`} title={domain.label} description={domain.summary}>
        <Link href="/contact" className="btn-primary">
          Book a consultation
        </Link>
        <Link href="/packages" className="btn-secondary">
          See packages
        </Link>
      </PageHeader>

      <section className="bg-white py-16 md:py-24">
        <div className="container-x grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {domain.items.map((item, i) => {
            const Icon = item.icon;
            const detailHref = item.href.includes("#") ? null : item.href;
            return (
              <Reveal key={item.href} delay={i * 0.05}>
                <div id={item.href.split("#")[1]} className="card card-hover h-full p-6">
                  <span className="grid size-11 place-items-center rounded-lg bg-brand-soft text-brand">
                    <Icon className="size-5" strokeWidth={1.75} />
                  </span>
                  <h2 className="mt-4 text-lg font-bold text-ink">
                    {detailHref ? (
                      <Link
                        href={detailHref}
                        className="rounded transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      item.label
                    )}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
                  <Link href="/contact" className="link-arrow mt-4">
                    Discuss this service <ArrowRight className="size-4" />
                  </Link>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
