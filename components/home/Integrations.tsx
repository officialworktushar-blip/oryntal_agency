"use client";

import Link from "next/link";
import { m, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { connections } from "@/lib/content/connections";
import IntegrationsArc from "./IntegrationsArc";

function nameSentence() {
  const names = connections.map((item) => item.name);
  if (names.length === 0) return "ORYNTAL integrates your existing business tools.";
  const last = names[names.length - 1];
  const head = names.slice(0, -1).join(", ");
  return `ORYNTAL integrates tools such as ${head}, and ${last}.`;
}

export default function Integrations() {
  const reduced = useReducedMotion() ?? false;

  const group: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } },
  };

  const item: Variants = {
    hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section
      id="integrations"
      aria-labelledby="integrations-title"
      className="integrations-bg integrations-grain relative overflow-hidden scroll-mt-24 py-20 text-white md:py-28"
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <IntegrationsArc />

        <m.div
          variants={group}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15% 0px" }}
          className="mt-12 text-center md:mt-16"
        >
          <m.p
            variants={item}
            className="inline-flex items-center rounded-full border border-white/10 bg-[#2A1F5C]/70 px-4 py-1.5 text-sm text-white"
          >
            Integrations
          </m.p>

          <m.h2
            id="integrations-title"
            variants={item}
            className="mt-5 text-5xl font-medium leading-[1.1] tracking-[-0.03em] text-white md:text-6xl"
          >
            Bring your tools
          </m.h2>

          <m.p
            variants={item}
            className="mx-auto mt-5 max-w-2xl text-base text-white/75 md:text-lg"
          >
            We connect payments, WhatsApp, CRM, AI, and data tools into one
            workflow, for businesses in e-commerce, real estate, B2B, startups,
            and more.
          </m.p>

          <m.div variants={item} className="mt-6">
            <Link
              href="/services/individual-services"
              className="group inline-flex items-center gap-2 text-sm font-medium text-white underline decoration-white/40 underline-offset-4 outline-none transition-colors hover:decoration-white focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#110B2B]"
            >
              <span>See what we integrate</span>
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </m.div>

          <m.p
            variants={item}
            className="mx-auto mt-8 max-w-xl text-xs text-white/50"
          >
            Integrations depend on your agreed scope, compatibility, account
            access, and service availability. Third-party subscriptions and
            transaction fees may be separate. Logos belong to their respective
            owners and do not imply endorsement.
          </m.p>
        </m.div>

        <p className="sr-only">{nameSentence()}</p>
      </div>
    </section>
  );
}
