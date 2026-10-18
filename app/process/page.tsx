import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { processSteps } from "@/lib/data";

export const metadata: Metadata = {
  title: "Process",
  description:
    "How ORYNTAL works: discover, orient, create, and optimize — a clear path from strategy to results.",
};

export default function ProcessPage() {
  return (
    <>
      <PageHeader
        eyebrow="Process"
        title="A process built for momentum"
        description="No mystery, no endless meetings. Four focused phases that move your business forward at a steady pace."
      >
        <Link href="/contact" className="btn-primary">
          Start with Discover
          <ArrowRight className="h-4 w-4" />
        </Link>
      </PageHeader>

      <section className="container-x py-16 lg:py-20">
        <ol className="relative mx-auto max-w-3xl">
          <span
            aria-hidden
            className="absolute left-[27px] top-4 hidden h-[calc(100%-2rem)] w-px bg-brand-soft sm:block"
          />
          {processSteps.map((step, i) => (
            <Reveal key={step.step} delay={i * 0.06}>
              <li className="relative flex gap-6 pb-10 last:pb-0">
                <span className="z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full border border-brand-soft bg-white text-sm font-extrabold text-brand-dark shadow-card">
                  {step.step}
                </span>
                <div className="card flex-1 p-6">
                  <h2 className="text-lg font-bold text-ink">{step.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {step.description}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-12">
          <div className="rounded-3xl bg-gradient-to-br from-brand to-brand-hover px-6 py-12 text-center sm:px-12">
            <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Kick off in as little as 14 days
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-brand-soft">
              Book a consultation and we&apos;ll map your first phase together.
            </p>
            <Link
              href="/contact"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-dark transition-colors hover:bg-brand-wash"
            >
              Book Consultation
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
