"use client";

import { BadgeCheck } from "lucide-react";
import Marquee from "@/components/motion/Marquee";
import CountUp from "@/components/motion/CountUp";
import Reveal from "@/components/motion/Reveal";
import { clientLogos, testimonials, type ClientLogo } from "@/lib/clients";
import { socialProof } from "@/lib/content/home";

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
        <p className="text-center text-xs font-medium uppercase tracking-[0.14em] text-muted">
          {socialProof.eyebrow}
        </p>

        <Marquee
          className="mt-8"
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

        <Reveal className="mt-12">
          <dl className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {socialProof.stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center rounded-2xl border border-line bg-brand-wash px-6 py-8 text-center"
              >
                <dd className="text-4xl font-bold tracking-tight text-brand">
                  <CountUp
                    to={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    separator={stat.separator}
                  />
                </dd>
                <dt className="mt-2 text-sm text-muted">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
