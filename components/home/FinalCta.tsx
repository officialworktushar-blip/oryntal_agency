import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";
import { finalCta } from "@/lib/content/home";

export default function FinalCta() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container-x">
        <div className="glow-brand relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand to-brand-hover px-6 py-14 text-center text-white sm:px-12 md:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-white/10 blur-2xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-20 -left-10 size-56 rounded-full bg-white/10 blur-2xl"
          />

          <Reveal className="relative">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl md:text-[2.75rem] md:leading-[1.15]">
              {finalCta.heading}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              {finalCta.description}
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href={finalCta.primary.href}
                className="btn-white px-6 py-3.5 text-base"
              >
                {finalCta.primary.label}
              </Link>
              <Link
                href={finalCta.secondary.href}
                className="btn-outline-white px-6 py-3.5 text-base"
              >
                {finalCta.secondary.label}
              </Link>
            </div>
          </Reveal>

          <div className="mx-auto mt-12 hidden max-w-md md:block">
            <MediaPlaceholder
              type="image"
              aspect="16/9"
              label={finalCta.image.label}
              hint={finalCta.image.hint}
              dark
            />
          </div>
        </div>
      </div>
    </section>
  );
}
