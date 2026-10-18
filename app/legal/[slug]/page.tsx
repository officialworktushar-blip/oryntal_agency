import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import { getLegalDoc, legalDocs } from "@/lib/legal";

type Params = { slug: string };

export function generateStaticParams() {
  return legalDocs.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getLegalDoc(slug);
  return { title: doc ? doc.title : "Legal" };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const doc = getLegalDoc(slug);

  if (!doc) {
    notFound();
  }

  return (
    <>
      <PageHeader
        eyebrow={`Legal · Updated ${doc.updated}`}
        title={doc.title}
        description={doc.intro}
      />

      <section className="container-x py-16 lg:py-20">
        <div className="mx-auto max-w-3xl space-y-6">
          {doc.sections.map((section) => (
            <div key={section.heading} className="card p-6 sm:p-8">
              <h2 className="text-lg font-bold text-ink">{section.heading}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                {section.body}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
