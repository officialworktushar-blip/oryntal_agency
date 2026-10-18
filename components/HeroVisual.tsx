"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, BarChart3, Search } from "lucide-react";

function BrowserChrome({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-brand-100 bg-white/80 px-3 py-2 backdrop-blur">
      <span className="flex gap-1.5">
        <span className="h-2 w-2 rounded-full bg-brand-200" />
        <span className="h-2 w-2 rounded-full bg-brand-200" />
        <span className="h-2 w-2 rounded-full bg-brand-200" />
      </span>
      <span className="ml-2 truncate text-[10px] font-medium text-slate-400">
        {title}
      </span>
    </div>
  );
}

export default function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-lg">
      {/* Back mockup: blurred CRM / dashboard */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="absolute left-0 top-4 w-72 origin-top-left -rotate-6 overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-card sm:w-80"
        style={{ filter: "blur(1.2px)" }}
      >
        <BrowserChrome title="CRM · Dashboard" />
        <div className="space-y-2.5 bg-surface p-4">
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-12 rounded-lg bg-gradient-to-br from-brand-100 to-brand-50"
              />
            ))}
          </div>
          <div className="h-24 rounded-lg bg-gradient-to-br from-brand-100 to-brand-50" />
        </div>
      </motion.div>

      {/* Middle mockup: clean landing page */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="absolute right-0 top-16 w-72 overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-card sm:w-80"
      >
        <BrowserChrome title="Landing Page" />
        <div className="space-y-2.5 p-4">
          <div className="h-2.5 w-3/4 rounded-full bg-brand-200" />
          <div className="h-2 w-1/2 rounded-full bg-brand-100" />
          <div className="h-2 w-2/3 rounded-full bg-brand-100" />
          <div className="h-16 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600" />
          <div className="flex gap-2">
            <div className="h-6 w-20 rounded-full bg-brand-500" />
            <div className="h-6 w-16 rounded-full bg-brand-50" />
          </div>
        </div>
      </motion.div>

      {/* Front mockup: AI prompt bar */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="absolute bottom-2 left-6 w-72 overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-card sm:w-80"
      >
        <BrowserChrome title="AI Assistant" />
        <div className="space-y-3 p-4">
          <div className="flex items-center gap-2 rounded-xl border border-brand-200 bg-white px-3 py-2.5 shadow-sm">
            <Search className="h-4 w-4 shrink-0 text-slate-400" />
            <span className="flex-1 truncate text-xs text-slate-400">
              Ask AI to automate your workflow...
            </span>
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-600 text-white">
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-brand-50 p-2.5">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-white text-brand-600">
              <BarChart3 className="h-4 w-4" />
            </span>
            <div className="flex-1 space-y-1.5">
              <div className="h-1.5 w-3/4 rounded-full bg-brand-200" />
              <div className="h-1.5 w-1/2 rounded-full bg-brand-100" />
            </div>
          </div>
        </div>
      </motion.div>

      {/*
        Optional: replace the three CSS mockups above with a single 3D layered
        asset (blurred CRM behind, clean landing page in the middle, AI prompt
        bar in front). Place it at /public/hero-3d-mockup.png (transparent PNG)
        and swap this block for <Image />.
      */}
    </div>
  );
}
