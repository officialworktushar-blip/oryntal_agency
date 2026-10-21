"use client";

import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import Marquee from "@/components/motion/Marquee";
import { clientLogos, testimonials, type ClientLogo } from "@/lib/clients";

/**
 * Bare client logo — no tile, no background, no border.
 * Greyed out by default, full colour on hover.
 */
function LogoTile({ item }: { item: ClientLogo }) {
  return (
    <div className="group flex h-14 w-36 items-center justify-center sm:w-40">
      <Image
        src={item.logo}
        alt={item.name}
        width={item.width}
        height={item.height}
        sizes="160px"
        className="max-h-10 w-auto max-w-[150px] object-contain opacity-60 grayscale transition-[opacity,filter,transform] duration-300 ease-out group-hover:opacity-100 group-hover:grayscale-0 motion-safe:group-hover:scale-105"
      />
    </div>
  );
}

export default function SocialProof() {
  return (
    <section aria-label="Social proof" className="border-y border-line bg-white py-14">
      <div className="container-x">
        <Marquee
          items={clientLogos}
          renderItem={(item) => <LogoTile item={item} />}
        />

        {testimonials.length > 0 ? (
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="card p-6">
                <blockquote className="text-sm leading-relaxed text-ink">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-4 flex items-center gap-2 text-xs text-muted">
                  <BadgeCheck className="size-4 text-brand" />
                  <span>
                    <span className="font-semibold text-ink">{t.name}</span> · {t.role},{" "}
                    {t.company}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
