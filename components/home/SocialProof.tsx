"use client";

import { BadgeCheck } from "lucide-react";
import Marquee from "@/components/motion/Marquee";
import { clientLogos, testimonials, type ClientLogo } from "@/lib/clients";

function LogoTile({ item }: { item: ClientLogo }) {
  return (
    <div className="flex h-12 w-40 items-center justify-center rounded-lg border border-line bg-white grayscale opacity-60 transition-all duration-300 hover:grayscale-0 hover:opacity-100">
      {/* TODO: swap for <Image src={item.logo} ...> once real client SVGs/PNGs are supplied. */}
      <span className="text-sm font-semibold tracking-wide text-muted">{item.name}</span>
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
