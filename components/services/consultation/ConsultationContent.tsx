"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const MONTHS = [
  {
    number: "01",
    label: "Month 1",
    title: "Understand and Plan",
    tagline: "We learn your business before we build anything.",
    points: [
      "Understand how your business works and earns",
      "Meet the key people and their responsibilities",
      "Review your current processes and pain points",
      "Spot repetitive tasks and slow areas",
      "Find where solutions can help",
      "Agree on the solution, priorities and project scope",
    ],
  },
  {
    number: "02",
    label: "Month 2",
    title: "Build and Set Up",
    tagline: "Your agreed solution starts taking shape.",
    points: [
      "Begin building the agreed systems and products",
      "Create your website, application or automated workflows",
      "Connect the required tools and third-party services",
      "Build dashboards, databases, admin panels or user screens as agreed",
      "Review progress with you against the agreed requirements",
    ],
  },
  {
    number: "03",
    label: "Month 3",
    title: "Connect, Test and Refine",
    tagline: "Everything works together, and works well.",
    points: [
      "Bring all the built parts together",
      "Test the full system and its important workflows",
      "Find and fix issues within the agreed scope",
      "Refine based on testing and your feedback",
      "Prepare for launch or handover, as agreed",
    ],
  },
];

export default function ConsultationContent() {
  const prefersReducedMotion = useReducedMotion();

  const shouldAnimate = !prefersReducedMotion;

  const cardVariants = shouldAnimate
    ? {
        initial: { y: 40, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { duration: 0.6, ease: "easeOut" },
      }
    : { initial: {}, animate: {} };

  return (
    <main>
      {/* HERO SECTION */}
      <section
        className="relative overflow-hidden text-white min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: "#0d0f0e" }}
      >
        {/* Purple gradient pillars */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <div
            className="absolute left-0 top-0 bottom-0 w-[15%]"
            style={{
              background:
                "linear-gradient(180deg, #0d0f0e 0%, #1a1636 40%, #4a2c94 70%, #1a1636 100%)",
            }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-[15%]"
            style={{
              background:
                "linear-gradient(180deg, #0d0f0e 0%, #1a1636 40%, #4a2c94 70%, #1a1636 100%)",
            }}
          />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <p
            className="text-sm font-medium tracking-widest uppercase mb-6"
            style={{ color: "#8b7cf6" }}
          >
            Oryntal Consultation
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight leading-[1.1] text-white mb-6">
            Your Business, Made Simpler
            <br />
            in Three Months
          </h1>
          <p className="text-lg sm:text-xl text-white/70 leading-relaxed max-w-2xl mx-auto mb-8">
            We study how your business runs, find where time and effort are being lost, and
            build the right solution for you. No technical knowledge needed.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center bg-white text-[#1D1E20] rounded-full px-8 py-4 text-lg font-medium hover:bg-[#ece6ff] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            Book a Free Consultation
          </Link>
          <p className="mt-4 text-sm text-white/60">
            Udyam / MSME Registered • GST Registered
          </p>
        </div>
      </section>

      {/* TIMELINE SECTION */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-center text-neutral-900 mb-16">
            A clear path from first conversation to finished solution
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {MONTHS.map((month, index) => (
              <motion.div
                key={month.number}
                className="relative bg-neutral-50 rounded-2xl border border-purple-200/30 p-8 hover:border-purple-300/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                {...cardVariants}
                transition={{ delay: index * 0.15 }}
              >
                <div className="text-5xl font-bold mb-2" style={{ color: "#8b7cf6" }}>
                  {month.number}
                </div>
                <p className="text-sm font-semibold text-neutral-500 mb-3">{month.label}</p>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  {month.title}
                </h3>
                <p className="text-base text-neutral-600 mb-6">{month.tagline}</p>
                <ul className="space-y-3">
                  {month.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm text-neutral-700">
                      <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-purple-100 text-purple-600 shrink-0">
                        <Check className="h-3 w-3" aria-hidden="true" />
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NOTE STRIP */}
      <section className="py-6 px-4 sm:px-6 lg:px-8 bg-purple-50 border-y border-purple-100">
        <p className="text-center text-sm text-purple-800 max-w-3xl mx-auto">
          The timeline can be adjusted based on project size, dependencies and your requirements.
        </p>
      </section>

      {/* CLOSING CTA SECTION */}
      <section
        className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden text-white"
        style={{ backgroundColor: "#0d0f0e" }}
      >
        {/* Purple glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <div
            className="absolute right-0 top-0 h-full w-[40%]"
            style={{
              background:
                "radial-gradient(ellipse 70% 70% at 80% 30%, rgba(99,61,230,0.4) 0%, transparent 70%)",
            }}
          />
        </div>

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium mb-6">
            Ready to see what your business could save?
          </h2>
          <p className="text-lg text-white/70 leading-relaxed mb-8">
            Tell us how you work today. We will show you what a better version looks like.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center bg-white text-[#1D1E20] rounded-full px-8 py-4 text-lg font-medium hover:bg-[#ece6ff] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            Book a Free Consultation
          </Link>
        </div>
      </section>
    </main>
  );
}
