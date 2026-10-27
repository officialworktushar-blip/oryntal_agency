"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useInView, useReducedMotion, useSpring } from "framer-motion";
import { ArrowLeftRight, Check } from "lucide-react";
import { useScaledCanvas } from "@/hooks/useScaledCanvas";
import { websiteApp } from "@/lib/content/services/websiteApp";
import Cursor from "@/components/ui/Cursor";
import { cn } from "@/lib/cn";

type HeroVisualProps = {
  activeId: string;
  onCycle: () => void;
  paused: boolean;
  onUserInteract: () => void;
};

const CYCLE_DURATION = 3600;

export default function HeroVisual({ activeId, onCycle, paused, onUserInteract }: HeroVisualProps) {
  const reduced = useReducedMotion() ?? false;
  const { build, visual } = websiteApp;
  const activeIndex = build.findIndex((item) => item.id === activeId);
  const activeItem = build[activeIndex >= 0 ? activeIndex : 0];
  const Icon = activeItem.icon;

  const { wrapperRef, scale } = useScaledCanvas(580);
  const cardRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  const inView = useInView(visualRef, { amount: 0.3, once: false });

  const [phase, setPhase] = useState<"idle" | "gliding" | "press" | "done">("idle");
  const [entrance, setEntrance] = useState(false);
  const [ripple, setRipple] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  const mouseX = useSpring(0, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 150, damping: 20 });

  const contactHref = `/contact?interest=website-and-app-development&topic=${activeItem.topic}`;

  useEffect(() => {
    if (reduced) {
      setPhase("done");
      return;
    }
    setEntrance(true);
    const t = setTimeout(() => setEntrance(false), 1200);
    return () => clearTimeout(t);
  }, [reduced]);

  useEffect(() => {
    if (reduced) return;
    if (!inView) return;
    if (typeof document !== "undefined" && document.visibilityState !== "visible") return;
    if (paused) return;
    if (hasInteracted) return;

    setPhase("idle");
    const glide = setTimeout(() => setPhase("gliding"), 500);
    const press = setTimeout(() => {
      setPhase("press");
      setRipple((r) => r + 1);
    }, 1500);
    const done = setTimeout(() => setPhase("done"), 1600);
    const next = setTimeout(() => {
      onCycle();
    }, 3400);

    return () => {
      clearTimeout(glide);
      clearTimeout(press);
      clearTimeout(done);
      clearTimeout(next);
    };
  }, [reduced, inView, paused, activeId, hasInteracted, onCycle]);

  useEffect(() => {
    if (reduced) return;
    if (!visualRef.current) return;
    if (typeof window !== "undefined" && !window.matchMedia("(hover: hover)").matches) return;

    const node = visualRef.current;
    const onMove = (e: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5);
      const y = ((e.clientY - rect.top) / rect.height - 0.5);
      mouseX.set(x * -8);
      mouseY.set(y * -6);
    };
    const onLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    node.addEventListener("pointermove", onMove);
    node.addEventListener("pointerleave", onLeave);
    return () => {
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced, mouseX, mouseY]);

  useEffect(() => {
    setPhase("idle");
    setHasInteracted(true);
    onUserInteract();
    if (reduced) {
      setPhase("done");
      return;
    }
    const glide = setTimeout(() => setPhase("gliding"), 200);
    const press = setTimeout(() => {
      setPhase("press");
      setRipple((r) => r + 1);
    }, 900);
    const done = setTimeout(() => setPhase("done"), 1100);
    return () => {
      clearTimeout(glide);
      clearTimeout(press);
      clearTimeout(done);
    };
  }, [activeId, reduced, onUserInteract]);

  const cursorStart = { x: 142 + 295 + 40, y: 59 + 292 - 10 };
  const cursorEnd = { x: 142 + 232, y: 59 + 252 };
  const cursorPos = phase === "idle" ? cursorStart : cursorEnd;

  return (
    <div
      ref={visualRef}
      id="ws-visual"
      role="tabpanel"
      className="relative w-full max-w-[580px] aspect-[580/410] lg:justify-self-end"
      onPointerEnter={() => setHasInteracted(true)}
      onFocusCapture={() => setHasInteracted(true)}
    >
      <div ref={wrapperRef} className="relative h-full w-full">
        <motion.div
          className="absolute left-0 top-0 h-[410px] w-[580px] origin-top-left"
          style={{ scale, x: mouseX, y: mouseY }}
          initial={entrance && !reduced ? { opacity: 0 } : { opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0" aria-hidden="true">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(255,255,255,.085) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.085) 1px, transparent 1px)",
                backgroundSize: "43px 43px",
                backgroundPosition: "-1px -1px",
                WebkitMaskImage: "radial-gradient(ellipse 70% 72% at 50% 52%, #000 45%, transparent 100%)",
                maskImage: "radial-gradient(ellipse 70% 72% at 50% 52%, #000 45%, transparent 100%)",
              }}
            />
          </div>

          <motion.div
            ref={cardRef}
            className="absolute rounded-[14px] border border-white/10"
            style={{
              left: 142,
              top: 59,
              width: 295,
              height: 292,
              background: "linear-gradient(180deg, #626266 0%, #444448 55%, #2F2F33 100%)",
              boxShadow: "0 24px 60px rgba(0,0,0,.55), inset 0 1px 0 rgba(255,255,255,.10)",
            }}
            initial={entrance && !reduced ? { y: 30, scale: 0.97, opacity: 0 } : { y: 0, scale: 1, opacity: 1 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="relative h-full w-full">
              <motion.div
                className="absolute flex h-[60px] w-[60px] items-center justify-center rounded-[12px] bg-[#262629]"
                style={{ left: 67, top: 44, boxShadow: "inset 0 1px 0 rgba(255,255,255,.08)" }}
                initial={entrance && !reduced ? { scale: 0.8, opacity: 0 } : { scale: 1, opacity: 1 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: entrance && !reduced ? 0.08 : 0 }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeItem.id}
                    initial={reduced ? false : { scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={reduced ? { opacity: 1 } : { scale: 0.9, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                  >
                    <Icon className="h-[30px] w-[30px] text-white" aria-hidden="true" />
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              <ArrowLeftRight
                className="absolute h-[28px] w-[28px] text-white/45"
                style={{ left: 133, top: 66, strokeWidth: 1.4 }}
                aria-hidden="true"
              />

              <div
                className="absolute flex h-[60px] w-[60px] items-center justify-center rounded-[12px] bg-[#6D45EE]"
                style={{ left: 169, top: 44, boxShadow: "0 8px 20px rgba(80,40,200,.5)" }}
              >
                <Image
                  src="/logo.png"
                  alt="ORYNTAL"
                  width={36}
                  height={36}
                  className="h-9 w-9 object-contain brightness-0 invert"
                />
              </div>

              <div
                className={cn(
                  "absolute rounded-[10px] border bg-[#1B1B1E]",
                  phase === "done" ? "border-[rgba(52,199,123,.35)]" : "border-[rgba(255,255,255,.06)]"
                )}
                style={{ left: 21, top: 165, width: 254, height: 60 }}
              >
                <div className="relative h-full w-full px-4">
                  <div className="absolute flex items-center gap-2" style={{ top: 14 }}>
                    <span
                      className={cn(
                        "h-[7px] w-[7px] rounded-full",
                        phase === "done" ? "bg-[#34C77B]" : "bg-[#55555B]"
                      )}
                      style={phase === "done" ? { boxShadow: "0 0 0 0 rgba(52,199,123,0.6)", animation: "ws-pulse 1.8s ease-out infinite" } : undefined}
                    />
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={`status-${activeItem.id}-${phase}`}
                        initial={reduced ? false : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={reduced ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.18 }}
                        className="text-[13px] font-semibold text-white"
                      >
                        {phase === "done" ? visual.doneStatus : visual.idleStatus}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                  <div className="absolute" style={{ top: 36 }}>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={`sub-${activeItem.id}-${phase}`}
                        initial={reduced ? false : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={reduced ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.18 }}
                        className="text-[11px] text-white/55"
                      >
                        {phase === "done" ? visual.doneSub(activeItem.title) : visual.idleSub(activeItem.title)}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              <Link
                ref={buttonRef}
                href={contactHref}
                className={cn(
                  "absolute flex items-center justify-center gap-2 rounded-[8px] bg-[#6B43E8] text-[12px] font-semibold text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#2F2F33]",
                  reduced ? "" : "hover:brightness-110"
                )}
                style={{ left: 21, top: 236, width: 254, height: 36 }}
                onClick={() => setHasInteracted(true)}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={`btn-${activeItem.id}-${phase}`}
                    initial={reduced ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reduced ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="flex items-center gap-1.5"
                  >
                    {phase === "done" && <Check className="h-[14px] w-[14px]" aria-hidden="true" />}
                    {phase === "done" ? visual.buttonDone : visual.button}
                  </motion.span>
                </AnimatePresence>
                {ripple > 0 && !reduced && (
                  <motion.span
                    key={ripple}
                    className="pointer-events-none absolute inset-0 rounded-[8px] border-[1.5px]"
                    style={{ borderColor: "rgba(155,149,255,.7)" }}
                    initial={{ scale: 1, opacity: 0.7 }}
                    animate={{ scale: 1.8, opacity: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                  />
                )}
              </Link>
            </div>
          </motion.div>

          {!reduced && (
            <motion.div
              className="pointer-events-none absolute z-20"
              style={{ x: cursorPos.x, y: cursorPos.y }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, x: cursorPos.x, y: cursorPos.y }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            >
              <motion.div
                animate={phase === "press" ? { scale: [1, 0.88, 1] } : { scale: 1 }}
                transition={{ duration: 0.18 }}
                style={{ transformOrigin: "2px 2px" }}
              >
                <Cursor clickKey={ripple} reduced={reduced} className="h-[52px] w-[52px]" />
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </div>
      <p className="sr-only">{visual.caption}</p>
    </div>
  );
}
