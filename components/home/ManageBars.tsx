"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { m, useInView, useReducedMotion, type Transition, type Variants } from "framer-motion";
import { ArrowRight, ChevronDown, Pause, Play, User } from "lucide-react";
import type { ManageAccordionTab, ManageCard } from "@/lib/content/howItWorks";
import StageHeader from "./StageHeader";
import { cn } from "@/lib/cn";

/* Uneven bar heights (percent) when the cursor is outside the row. */
const COLLAPSED_HEIGHTS = [100, 52, 100, 76, 100];

/* After a click every non-active bar sits at this same suppressed height. */
const SUPPRESSED_HEIGHT = 52;

/* Literal mirrors of --manage-card-* (framer can only interpolate real colours). */
const CARD_COLOURS = ["#22114F", "#1B0E42", "#271363", "#160B38", "#20104A"];

const ACTIVE_COLOUR = "#7B68FF";

const SHEEN =
  "linear-gradient(115deg, rgba(255,255,255,0) 40%, rgba(255,255,255,0.10) 55%, rgba(255,255,255,0) 70%)";

const SPRING: Transition = { type: "spring", stiffness: 210, damping: 30 };

const LIST_VARIANTS: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11 } },
};

const LIST_ITEM: Variants = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" } },
};

type ChatPhase = "idle" | "user" | "typing" | "assistant";

type ManageChatProps = {
  card: ManageCard;
  isOpen: boolean;
  reduced: boolean;
  /** "bars" pins the chat to the bottom of the card, "accordion" flows inline. */
  layout: "bars" | "accordion";
};

function ManageChat({ card, isOpen, reduced, layout }: ManageChatProps) {
  const [phase, setPhase] = useState<ChatPhase>("idle");
  const isBars = layout === "bars";

  useEffect(() => {
    if (!isOpen) {
      setPhase("idle");
      return;
    }
    if (reduced) {
      setPhase("assistant");
      return;
    }
    setPhase("user");
    const typing = setTimeout(() => setPhase("typing"), 500);
    const answer = setTimeout(() => setPhase("assistant"), 1100);
    return () => {
      clearTimeout(typing);
      clearTimeout(answer);
    };
  }, [isOpen, reduced, card.id]);

  const userVisible = phase !== "idle";
  const assistantVisible = phase === "typing" || phase === "assistant";
  const showDots = phase === "typing";
  const showText = phase === "assistant";

  const bubbleText = isBars ? "text-sm lg:text-[13px] xl:text-sm" : "text-sm";

  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        isBars &&
          "absolute bottom-8 left-8 right-8 lg:bottom-6 lg:left-6 lg:right-6 xl:bottom-10 xl:left-10 xl:right-10",
        !isBars && "mt-4",
      )}
    >
      {card.badge && (
        <div className="flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs text-white">
          <span className="size-1.5 rounded-full bg-white" />
          <span>{card.badge}</span>
        </div>
      )}

      {/* User prompt */}
      <m.div
        animate={{ opacity: userVisible ? 1 : 0, y: userVisible ? 0 : 12 }}
        transition={
          reduced ? { duration: 0.15 } : { duration: 0.35, delay: 0.15 }
        }
        className={cn(
          "ml-auto flex max-w-[88%] items-start gap-2 rounded-2xl bg-[#E6E1FF] px-4 py-3 text-[#1D1E20]",
          bubbleText,
        )}
      >
        <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-white">
          <User
            className="size-4 text-[#673DE6]"
            strokeWidth={2.25}
            aria-hidden="true"
          />
        </span>
        <p className="min-w-0">{card.user}</p>
      </m.div>

      {/* Assistant answer */}
      <m.div
        animate={{
          opacity: assistantVisible ? 1 : 0,
          y: assistantVisible ? 0 : 12,
        }}
        transition={reduced ? { duration: 0.15 } : { duration: 0.35 }}
        className={cn(
          "mr-auto flex max-w-[92%] items-start gap-2 rounded-2xl bg-white px-4 py-3 text-[#1D1E20]",
          bubbleText,
        )}
      >
        <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#673DE6]">
          <Image
            src="/oryntal-logo.png"
            alt=""
            width={18}
            height={18}
            className="h-[18px] w-[18px] object-contain brightness-0 invert"
          />
        </span>
        <div className="min-w-0">
          <p>{card.assistantIntro}</p>
          <div className="relative">
            <m.ol
              variants={LIST_VARIANTS}
              initial="hidden"
              animate={showText ? "show" : "hidden"}
              className={cn(
                "mt-2 list-decimal space-y-0.5 pl-4",
                !showText && "invisible",
              )}
            >
              {card.assistantItems.map((item) => (
                <m.li key={item} variants={LIST_ITEM}>
                  {item}
                </m.li>
              ))}
            </m.ol>

            {showDots && (
              <span
                aria-hidden="true"
                className="absolute left-0 top-3 flex gap-1"
              >
                {[0, 1, 2].map((dot) => (
                  <m.span
                    key={dot}
                    className="size-1.5 rounded-full bg-[#673DE6]/60"
                    animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: dot * 0.15,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </span>
            )}
          </div>
        </div>
      </m.div>
    </div>
  );
}

type ManageBarsProps = {
  tab: ManageAccordionTab;
  headingId: string;
};

export default function ManageBars({ tab, headingId }: ManageBarsProps) {
  const cards = tab.cards;
  const count = cards.length;

  const [active, setActive] = useState(0);
  const [engaged, setEngaged] = useState(false);
  /* Set by a click: only `active` is full size, the rest stay suppressed
     (all at the same height) until the cursor leaves the row. */
  const [pinned, setPinned] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);

  const reduced = useReducedMotion() ?? false;
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.35 });
  const revealed = useInView(rootRef, { once: true, margin: "-15% 0px" });
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  /* Server renders the mobile accordion; upgrade to bars on mount. */
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const onVisibility = () =>
      setPageVisible(document.visibilityState === "visible");
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  /* Autoplay only while idle: in view, desktop, not paused. */
  useEffect(() => {
    if (
      reduced ||
      isPaused ||
      engaged ||
      pinned ||
      !isDesktop ||
      !inView ||
      !pageVisible ||
      count === 0
    ) {
      return;
    }
    const timer = setInterval(
      () => setActive((prev) => (prev + 1) % count),
      7000,
    );
    return () => clearInterval(timer);
  }, [
    reduced,
    isPaused,
    engaged,
    pinned,
    isDesktop,
    inView,
    pageVisible,
    count,
  ]);

  const cancelHover = useCallback(() => {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
  }, []);

  useEffect(() => cancelHover, [cancelHover]);

  /* 80ms hover intent so sweeping across the row does not flicker. */
  const scheduleHover = useCallback(
    (index: number) => {
      cancelHover();
      hoverTimer.current = setTimeout(() => setActive(index), 80);
    },
    [cancelHover],
  );

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setEngaged(false);
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (count === 0) return;
    let next = index;
    switch (event.key) {
      case "ArrowRight":
        next = (index + 1) % count;
        break;
      case "ArrowLeft":
        next = (index - 1 + count) % count;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = count - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    setActive(next);
    buttonRefs.current[next]?.focus();
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Business dashboards, admin panels and system integration",
    serviceType: "Business systems and integration",
    description: tab.description,
    provider: {
      "@type": "Organization",
      name: "ORYNTAL",
      url: siteUrl && siteUrl.length > 0 ? siteUrl : undefined,
    },
  };

  const sheen = (isOpen: boolean) => (
    <m.div
      aria-hidden="true"
      initial={false}
      animate={{ opacity: isOpen ? 1 : 0 }}
      transition={reduced ? { duration: 0.15 } : SPRING}
      className="pointer-events-none absolute inset-0"
      style={{ backgroundImage: SHEEN }}
    />
  );

  const cardContent = (card: ManageCard, isOpen: boolean, index: number) => (
    <div
      id={`manage-card-content-${card.id}`}
      aria-hidden={!isOpen}
      inert={!isOpen}
      className={cn(
        "transition-opacity",
        reduced ? "duration-150" : "duration-300",
        isOpen ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <m.p
        initial={false}
        animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 8 }}
        transition={
          reduced ? { duration: 0.15 } : { duration: 0.3, ease: "easeOut" }
        }
        className={cn(
          "text-white/80",
          isDesktop ? "mt-4 max-w-md text-base lg:text-lg" : "text-base",
        )}
      >
        {card.sub}
      </m.p>
      <ManageChat
        card={card}
        isOpen={isOpen}
        reduced={reduced}
        layout={isDesktop ? "bars" : "accordion"}
      />
      <span className="sr-only">{`Example ${index + 1} of ${count}`}</span>
    </div>
  );

  const cardTitle = (card: ManageCard, isOpen: boolean) =>
    isDesktop ? (
      <h4
        id={`manage-card-title-${card.id}`}
        className={cn(
          "text-2xl font-medium tracking-tight text-white lg:text-[28px]",
          !isOpen && "line-clamp-2",
        )}
      >
        {card.title}
      </h4>
    ) : (
      <h4
        id={`manage-card-title-${card.id}`}
        className="text-xl font-medium tracking-tight text-white"
      >
        {card.title}
      </h4>
    );

  const renderBars = () => (
    <div
      className="relative mt-10 flex h-[540px] items-end gap-2.5"
      onPointerEnter={() => setEngaged(true)}
      onPointerLeave={() => {
        setEngaged(false);
        setPinned(false);
      }}
      onFocus={() => setEngaged(true)}
      onBlur={handleBlur}
    >
      {cards.map((card, index) => {
        const isOpen = index === active;
        const collapsed = COLLAPSED_HEIGHTS[index] ?? 100;
        /* While pinned, hovering may switch the open card but the row keeps
           its suppressed heights until the cursor leaves and comes back. */
        const allLevel = engaged && !pinned;

        return (
          <m.div
            key={card.id}
            initial={false}
            animate={{
              flexGrow: isOpen ? 2.3 : 1,
              height:
                isOpen || allLevel
                  ? "100%"
                  : `${pinned ? SUPPRESSED_HEIGHT : collapsed}%`,
              backgroundColor: isOpen ? ACTIVE_COLOUR : CARD_COLOURS[index],
              opacity: revealed ? 1 : 0,
              y: revealed || reduced ? 0 : 24,
            }}
            transition={
              reduced
                ? {
                    flexGrow: { duration: 0 },
                    height: { duration: 0 },
                    backgroundColor: { duration: 0.15 },
                    opacity: { duration: 0.3, delay: index * 0.08 },
                    y: { duration: 0 },
                  }
                : {
                    ...SPRING,
                    opacity: {
                      duration: 0.6,
                      ease: "easeOut",
                      delay: index * 0.08,
                    },
                    y: { duration: 0.6, ease: "easeOut", delay: index * 0.08 },
                  }
            }
            style={{ flexBasis: 0 }}
            onPointerEnter={() => scheduleHover(index)}
            onPointerLeave={cancelHover}
            className="relative min-w-0 overflow-hidden rounded-[28px] border border-white/5"
          >
            {sheen(isOpen)}

            <button
              type="button"
              ref={(node) => {
                buttonRefs.current[index] = node;
              }}
              aria-expanded={isOpen}
              aria-controls={`manage-card-content-${card.id}`}
              aria-labelledby={`manage-card-title-${card.id}`}
              onClick={() => {
                cancelHover();
                setActive(index);
                setPinned(true);
              }}
              onKeyDown={(event) => handleKeyDown(event, index)}
              onFocus={() => {
                setPinned(false);
                setEngaged(true);
                setActive(index);
              }}
              className="absolute inset-0 z-20 rounded-[28px] outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/70"
            />

            <div className="relative flex h-full flex-col p-8 lg:p-6 xl:p-10">
              {cardTitle(card, isOpen)}
              {cardContent(card, isOpen, index)}
            </div>
          </m.div>
        );
      })}

      <button
        type="button"
        aria-label={isPaused ? "Play animation" : "Pause animation"}
        aria-pressed={isPaused}
        onClick={() => setIsPaused((value) => !value)}
        className="absolute bottom-4 right-4 z-30 grid size-10 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/25 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/70"
      >
        {isPaused ? <Play className="size-4" /> : <Pause className="size-4" />}
      </button>
    </div>
  );

  const renderAccordion = () => (
    <div className="mt-10 flex flex-col gap-3">
      {cards.map((card, index) => {
        const isOpen = index === active;

        return (
          <m.div
            key={card.id}
            initial={false}
            animate={{
              height: isOpen ? "auto" : 72,
              backgroundColor: isOpen ? ACTIVE_COLOUR : CARD_COLOURS[index],
              opacity: revealed ? 1 : 0,
              y: revealed || reduced ? 0 : 24,
            }}
            transition={
              reduced
                ? {
                    height: { duration: 0 },
                    backgroundColor: { duration: 0.15 },
                    opacity: { duration: 0.3, delay: index * 0.08 },
                    y: { duration: 0 },
                  }
                : {
                    ...SPRING,
                    opacity: {
                      duration: 0.6,
                      ease: "easeOut",
                      delay: index * 0.08,
                    },
                    y: { duration: 0.6, ease: "easeOut", delay: index * 0.08 },
                  }
            }
            className="relative overflow-hidden rounded-3xl border border-white/5"
          >
            {sheen(isOpen)}

            <button
              type="button"
              ref={(node) => {
                buttonRefs.current[index] = node;
              }}
              aria-expanded={isOpen}
              aria-controls={`manage-card-content-${card.id}`}
              aria-labelledby={`manage-card-title-${card.id}`}
              onClick={() => setActive(index)}
              onFocus={() => {
                setEngaged(true);
                setActive(index);
              }}
              className="absolute inset-0 z-20 rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/70"
            />

            <div className="relative px-5 pb-5">
              <div className="flex min-h-[72px] items-center justify-between gap-3">
                {cardTitle(card, isOpen)}
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    "size-5 shrink-0 text-white/70 transition-transform duration-300",
                    isOpen && "rotate-180",
                  )}
                />
              </div>
              {cardContent(card, isOpen, index)}
            </div>
          </m.div>
        );
      })}
    </div>
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div
        ref={rootRef}
        className="manage-gradient manage-grain relative overflow-hidden rounded-[32px] p-6 text-white md:p-10 lg:p-12"
      >
        <div className="relative z-10">
          <m.div
            initial={false}
            animate={{
              opacity: revealed ? 1 : 0,
              y: revealed || reduced ? 0 : 24,
            }}
            transition={
              reduced
                ? { duration: 0.3 }
                : { duration: 0.6, ease: "easeOut" }
            }
            className="max-w-2xl"
          >
            <StageHeader
              label={tab.label}
              title={tab.title}
              headingId={headingId}
              tone="dark"
            />
            <p className="mt-5 text-lg text-white/75">{tab.description}</p>
          </m.div>

          {isDesktop ? renderBars() : renderAccordion()}

          <m.div
            initial={false}
            animate={{
              opacity: revealed ? 1 : 0,
              y: revealed || reduced ? 0 : 24,
            }}
            transition={
              reduced
                ? { duration: 0.3 }
                : { duration: 0.6, ease: "easeOut", delay: 0.2 }
            }
            className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
          >
            <Link
              href={tab.cta.href}
              className="group inline-flex w-fit items-center gap-2 text-lg text-white underline decoration-white/50 underline-offset-[6px] outline-none transition-colors hover:decoration-white focus-visible:ring-2 focus-visible:ring-white/70"
            >
              <span>{tab.cta.label}</span>
              <ArrowRight className="size-5 shrink-0 transition-transform duration-200 group-hover:translate-x-1.5" />
            </Link>
            <p className="max-w-md text-sm text-white/60 lg:text-right">
              {tab.keywordLine}
            </p>
          </m.div>

          <p className="mt-3 text-xs text-white/50">{tab.disclaimer}</p>
        </div>
      </div>
    </>
  );
}
