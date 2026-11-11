"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Image as ImageIcon, ArrowRight } from "lucide-react";
import { team } from "@/lib/content/team";

const placeholderGradients = [
  "linear-gradient(160deg, #A8785A, #6E4A3A)",
  "linear-gradient(160deg, #D8B991, #A27E5C)",
  "linear-gradient(160deg, #5B4B40, #2F2621)",
];

export default function Team() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="team"
      aria-labelledby="team-title"
      className="relative overflow-hidden scroll-mt-24 py-20 text-white md:py-28"
      style={{
        background:
          "radial-gradient(60% 45% at 50% 0%, rgba(32,120,150,0.30) 0%, rgba(32,120,150,0) 70%), linear-gradient(180deg, #06384C 0%, #043246 100%)",
      }}
    >
      <div className="mx-auto max-w-[1250px] px-4 sm:px-6 lg:px-8">
        <p className="sr-only">
          ORYNTAL is led by Tushar Srivastav (CEO), Dipesh Mayla (CBO) and
          Parth Srivastav (CMO).
        </p>

        <div className="text-center">
          <motion.p
            className="inline-flex items-center gap-2.5 text-[13px] font-medium uppercase tracking-[0.2em] text-[#7FD3E8]"
            initial={reduceMotion ? false : { opacity: 0.6, y: 16 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={
              reduceMotion ? undefined : { duration: 0.5, ease: "easeOut" }
            }
          >
            <span
              aria-hidden="true"
              className="inline-block h-[9px] w-[9px] rounded-[1px] bg-[#7FD3E8]"
            />
            {team.eyebrow}
          </motion.p>

          <motion.h2
            id="team-title"
            className="mt-4 text-balance text-4xl font-normal leading-[1.1] tracking-[-0.03em] text-white md:text-5xl"
            initial={reduceMotion ? false : { opacity: 0.6, y: 16 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={
              reduceMotion
                ? undefined
                : { duration: 0.5, delay: 0.08, ease: "easeOut" }
            }
          >
            {team.heading}
          </motion.h2>

          <motion.p
            className="mx-auto mt-4 max-w-2xl text-base text-white/75 md:text-lg"
            initial={reduceMotion ? false : { opacity: 0.6, y: 16 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={
              reduceMotion
                ? undefined
                : { duration: 0.5, delay: 0.16, ease: "easeOut" }
            }
          >
            {team.sub}
          </motion.p>
        </div>

        <div className="mt-12 grid gap-6 md:mt-14 md:grid-cols-3">
          {team.members.map((member, index) => (
            <motion.div
              key={member.id}
              className="mx-auto w-full max-w-[420px] md:max-w-none"
              initial={reduceMotion ? false : { opacity: 0.6, y: 30 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={
                reduceMotion
                  ? undefined
                  : { duration: 0.6, delay: index * 0.1, ease: "easeOut" }
              }
            >
              <article className="group relative isolate aspect-[3/4.35] overflow-hidden rounded-[18px] shadow-[0_24px_60px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:-translate-y-1.5 md:min-h-[560px]">
                <div className="absolute inset-0">
                  {member.hasPhoto ? (
                    <Image
                      src={member.photo}
                      alt={member.alt}
                      fill
                      sizes="(min-width:768px) 400px, 90vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          placeholderGradients[
                            index % placeholderGradients.length
                          ],
                      }}
                    >
                      <div
                        aria-hidden="true"
                        className="absolute inset-0"
                        style={{
                          backgroundImage:
                            "radial-gradient(rgba(255,255,255,0.10) 1px, transparent 1px)",
                          backgroundSize: "18px 18px",
                        }}
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-4 rounded-[12px] border-[1.5px] border-dashed"
                        style={{
                          borderColor: "rgba(255,255,255,0.35)",
                        }}
                      />
                      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
                        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/85">
                          <ImageIcon
                            className="h-7 w-7"
                            style={{ color: "#0B5A73" }}
                            aria-hidden="true"
                          />
                        </span>
                        <p
                          className="mt-4 max-w-[15rem] text-[13px] font-semibold text-white"
                          style={{
                            textShadow: "0 1px 8px rgba(0,0,0,0.5)",
                          }}
                        >
                          {member.shotLabel}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(8,20,28,0.55) 55%, rgba(8,20,28,0.92) 100%)",
                  }}
                />

                <div className="absolute left-9 top-9 z-10 flex h-12 w-12 items-center justify-center rounded-xl bg-white/95 p-2 shadow-sm">
                  <Image
                    src="/logo.png"
                    alt="ORYNTAL"
                    width={150}
                    height={40}
                    className="h-8 w-auto max-w-full object-contain"
                  />
                </div>

                <div className="absolute inset-x-0 bottom-0 z-10 px-[30px] pb-[30px] pt-[28px]">
                  <span className="inline-flex rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur">
                    {member.role}
                  </span>
                  <h3
                    className="mt-3 break-words text-[28px] font-medium leading-tight tracking-[-0.01em] text-white md:text-[30px]"
                    style={{ textShadow: "0 2px 18px rgba(0,0,0,0.45)" }}
                  >
                    {member.name}
                  </h3>
                  <p className="mt-1 text-[15px] text-white/80">
                    {member.roleTitle}
                  </p>
                  <p className="mt-3 break-words text-[15px] leading-relaxed text-white/75">
                    {member.bio}
                  </p>
                </div>
              </article>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center">
          <Link
            href={team.cta.href}
            className="group inline-flex items-center gap-2 rounded-xl border border-white/30 px-8 py-3.5 text-lg font-medium text-white transition-colors duration-150 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#06384C]"
          >
            {team.cta.label}
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
          {team.note ? (
            <p className="mt-5 text-xs text-white/55">{team.note}</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
