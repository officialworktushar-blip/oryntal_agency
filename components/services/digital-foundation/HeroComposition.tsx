"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { m, useInView, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import {
  Globe,
  Link2,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  UserPlus,
  type LucideIcon,
} from "lucide-react";
import {
  SiFacebook,
  SiGoogle,
  SiInstagram,
  SiWhatsapp,
} from "react-icons/si";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";
import { cn } from "@/lib/cn";
import {
  digitalFoundation,
  type SetupStatusIcon,
} from "@/lib/content/packages/digitalFoundation";

const W = 1000;
const H = 620;
const CARD_W = 760;

const STATUS_ICONS: Record<SetupStatusIcon, LucideIcon> = {
  globe: Globe,
  userPlus: UserPlus,
  messageCircle: MessageCircle,
};

const TILE_ICONS: Record<string, LucideIcon | typeof SiWhatsapp> = {
  whatsapp: SiWhatsapp,
  instagram: SiInstagram,
  facebook: SiFacebook,
  google: SiGoogle,
  links: Link2,
};

/** Straight orthogonal path with rounded corners between the segment points. */
function roundedPath(points: Array<[number, number]>, radius = 18): string {
  if (points.length < 2) return "";
  let d = `M ${points[0][0]} ${points[0][1]}`;
  for (let i = 1; i < points.length - 1; i += 1) {
    const [px, py] = points[i - 1];
    const [cx, cy] = points[i];
    const [nx, ny] = points[i + 1];
    const inLen = Math.hypot(cx - px, cy - py) || 1;
    const outLen = Math.hypot(nx - cx, ny - cy) || 1;
    const rIn = Math.min(radius, inLen / 2);
    const rOut = Math.min(radius, outLen / 2);
    const a: [number, number] = [
      cx + ((px - cx) / inLen) * rIn,
      cy + ((py - cy) / inLen) * rIn,
    ];
    const b: [number, number] = [
      cx + ((nx - cx) / outLen) * rOut,
      cy + ((ny - cy) / outLen) * rOut,
    ];
    d += ` L ${a[0].toFixed(1)} ${a[1].toFixed(1)}`;
    d += ` Q ${cx} ${cy} ${b[0].toFixed(1)} ${b[1].toFixed(1)}`;
  }
  const [lx, ly] = points[points.length - 1];
  d += ` L ${lx} ${ly}`;
  return d;
}

/** Decorative mini area chart (no axes, no numbers). */
function MiniChart({ points }: { points: number[] }) {
  const width = 100;
  const height = 30;
  const step = width / (points.length - 1);
  const coords = points.map((p, i) => [i * step, height - p * height] as const);
  const line = coords
    .map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`)
    .join(" ");
  const area = `${line} L ${width} ${height} L 0 ${height} Z`;

  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className="mt-2 h-7 w-full"
    >
      <defs>
        <linearGradient id="df-chart-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2EC27E" stopOpacity="0.35" />
          <stop offset="1" stopColor="#2EC27E" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#df-chart-fill)" />
      <m.path
        d={line}
        fill="none"
        stroke="#2EC27E"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      />
    </svg>
  );
}

const logo = "/oryntal-logo.png";

export default function HeroComposition() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;
  const inView = useInView(wrapperRef, { amount: 0.25, once: true });
  const [scale, setScale] = useState(1);
  const [pointerFine, setPointerFine] = useState(false);

  const { dashboard, productCard, tiles, rocks, tilesLabel } =
    digitalFoundation;

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover)");
    setPointerFine(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setPointerFine(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const node = measureRef.current;
    if (!node) return;
    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width;
      if (width) setScale(width / CARD_W);
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const parallaxOn = pointerFine && !reduced;
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 90, damping: 20, mass: 0.5 });
  const sy = useSpring(py, { stiffness: 90, damping: 20, mass: 0.5 });

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!parallaxOn) return;
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handlePointerLeave() {
    px.set(0);
    py.set(0);
  }

  const pop = (index: number) => ({
    initial: { scale: reduced ? 1 : 0.7, opacity: reduced ? 0 : 0 },
    animate: inView ? { scale: 1, opacity: 1 } : {},
    transition: reduced
      ? { duration: 0.3, delay: index * 0.04 }
      : {
          type: "spring" as const,
          stiffness: 260,
          damping: 18,
          delay: 0.6 + index * 0.08,
        },
  });

  const colATiles = tiles.filter((t) => t.columnX < 90);
  const colBTiles = tiles.filter((t) => t.columnX >= 90);
  const colALow = colATiles.reduce((a, b) => (b.top > a.top ? b : a));
  const colBLow = colBTiles.reduce((a, b) => (b.top > a.top ? b : a));

  const lineA = roundedPath([
    [800, 270],
    [colALow.columnX, 270],
    [colALow.columnX, colALow.top + 4.5],
  ]);
  const lineB = roundedPath([
    [800, 250],
    [colBLow.columnX, 250],
    [colBLow.columnX, colBLow.top + 4.5],
  ]);

  return (
    <div
      ref={wrapperRef}
      role="img"
      aria-label="Illustration of an ORYNTAL-built website dashboard with lead capture, WhatsApp and social connections"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={cn(
        "relative w-full max-w-[820px] lg:max-w-none",
        "aspect-[1000/700] md:aspect-[1000/620]",
      )}
    >
      {/* Connector lines — SVG overlay on the whole composition (md+) */}
      <svg
        aria-hidden="true"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        fill="none"
        className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
      >
        <m.path
          d={lineA}
          stroke="rgba(220,230,240,0.6)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: inView ? 1 : 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.9 }}
        />
        <m.path
          d={lineB}
          stroke="rgba(220,230,240,0.6)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: inView ? 1 : 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 1 }}
        />
        {!reduced
          ? [lineA, lineB].map((d, i) => (
              <circle key={i} r="3" fill="#9B95FF" opacity="0.9">
                <animateMotion
                  dur="4s"
                  begin={`${1.4 + i * 0.6}s`}
                  repeatCount="indefinite"
                  path={d}
                />
              </circle>
            ))
          : null}
      </svg>

      {/* A) Dashboard window */}
      <m.div
        initial={{ opacity: 0, y: reduced ? 0 : 40, scale: reduced ? 1 : 0.97 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" }}
        style={{ x: parallaxOn ? sx : undefined }}
        className="absolute left-[3%] top-[12%] h-[66%] w-[68%]"
      >
        <m.div
          style={{ x: sx, y: sy }}
          className="h-full w-full"
          transformTemplate={({ x, y }) =>
            `translate3d(calc(${x ?? 0} * 6px), calc(${y ?? 0} * 6px), 0)`
          }
        >
          <div className="h-full w-full overflow-hidden rounded-xl border border-white/40 bg-[#F2F4F7] shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
            <div ref={measureRef} className="h-full w-full">
              <div
                style={{ width: CARD_W, height: "100%", transformOrigin: "top left", transform: `scale(${scale})` }}
                className="flex flex-col"
              >
                {/* Top bar */}
                <div className="flex h-11 shrink-0 items-center gap-3 border-b border-[#E3E4E8] bg-white pl-3 pr-2">
                  <Image src={logo} alt="" width={16} height={16} className="h-4 w-4 object-contain" />
                  <span className="h-4 w-px bg-[#E3E4E8]" />
                  <span className="text-[11px] font-medium text-[#1D1E20]">
                    {dashboard.brand}
                  </span>
                  <span
                    className="ml-auto inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] text-[#1D1E20]"
                    style={{
                      background:
                        "linear-gradient(#fff,#fff) padding-box, linear-gradient(90deg,#7B4DFF,#C13BE0) border-box",
                      border: "1.5px solid transparent",
                    }}
                  >
                    <Sparkles className="size-3 text-[#7B4DFF]" strokeWidth={2} />
                    Ask ORYNTAL
                  </span>
                  <span className="grid size-6 place-items-center rounded-full bg-[#E8EBF0] text-[10px] font-semibold text-[#3B4F66]">
                    O
                  </span>
                </div>

                {/* Body */}
                <div className="flex min-h-0 flex-1">
                  {/* Sidebar (hidden below md via parent) */}
                  <aside className="df-sidebar w-[22%] shrink-0 space-y-1 bg-[#F2F4F7] p-3">
                    {dashboard.sidebar.map((item, i) => {
                      const Icon = item.icon;
                      const divider = i === 6;
                      return (
                        <div key={item.label}>
                          {divider ? <span className="my-1 block h-px bg-[#E3E4E8]" /> : null}
                          <span
                            className={cn(
                              "flex items-center gap-2 rounded-md px-2 py-1.5 text-[11px]",
                              item.active
                                ? "bg-white font-medium text-[#1D1E20] shadow-sm"
                                : "text-[#5A6072]",
                            )}
                          >
                            <Icon className="size-3.5" strokeWidth={1.75} />
                            {item.label}
                          </span>
                        </div>
                      );
                    })}
                  </aside>

                  {/* Main area */}
                  <div className="min-w-0 flex-1 bg-[#F7F8FA] p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[15px] font-semibold text-[#1D1E20]">
                          {dashboard.greeting}
                        </p>
                        <p className="text-[11px] text-[#6D7081]">
                          {dashboard.greetingSub}
                        </p>
                      </div>
                      <div className="rounded-lg border border-[#E3E4E8] bg-white px-3 py-1.5 text-right">
                        <p className="text-[9px] uppercase tracking-wide text-[#6D7081]">
                          {dashboard.websiteLabel}
                        </p>
                        <p className="text-[11px] font-medium text-[#1D1E20] underline">
                          {dashboard.websiteValue}
                        </p>
                      </div>
                    </div>

                    {/* Setup overview card */}
                    <div className="mt-4 rounded-xl border border-[#E3E4E8] bg-white p-4">
                      <div className="flex items-center justify-between">
                        <p className="text-[12px] font-semibold text-[#1D1E20]">
                          {dashboard.overviewTitle}
                        </p>
                        <span className="text-[10px] font-medium text-[#673DE6]">
                          {dashboard.overviewLink}
                        </span>
                      </div>
                      <div className="mt-3 grid grid-cols-3 gap-3">
                        {dashboard.statuses.map((status) => {
                          const Icon = STATUS_ICONS[status.icon];
                          return (
                            <div
                              key={status.label}
                              className="rounded-lg border border-[#E3E4E8] p-3"
                            >
                              <span className="flex items-center gap-1.5 text-[10px] text-[#6D7081]">
                                <Icon className="size-3" strokeWidth={1.75} />
                                {status.label}
                              </span>
                              <p className="mt-1 text-[13px] font-semibold text-[#1D1E20]">
                                {status.value}
                              </p>
                              <span className="mt-1 inline-block rounded-full bg-[#E6F7EE] px-2 py-0.5 text-[9px] font-medium text-[#12805C]">
                                {status.status}
                              </span>
                              <MiniChart points={status.chart} />
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Recent enquiries table (bottom crops) */}
                    <div className="mt-4 rounded-xl border border-[#E3E4E8] bg-white">
                      <div className="flex items-center gap-3 border-b border-[#E3E4E8] px-4 py-2.5 text-[10px] uppercase tracking-wide text-[#6D7081]">
                        <span className="flex-[2]">{dashboard.tableColumns[0]}</span>
                        <span className="flex-[2]">{dashboard.tableColumns[1]}</span>
                        <span className="flex-1">{dashboard.tableColumns[2]}</span>
                      </div>
                      {dashboard.rows.map((row) => (
                        <div
                          key={`${row.source}-${row.type}`}
                          className="flex items-center gap-3 border-b border-[#EEF0F3] px-4 py-2.5 text-[11px] text-[#1D1E20]"
                        >
                          <span className="flex-[2]">{row.source}</span>
                          <span className="flex-[2] text-[#6D7081]">{row.type}</span>
                          <span className="flex-1">
                            <span
                              className={cn(
                                "inline-block rounded-full px-2 py-0.5 text-[9px] font-medium",
                                row.status === "Replied"
                                  ? "bg-[#E6F7EE] text-[#12805C]"
                                  : "bg-[#EBE4FF] text-[#5025D1]",
                              )}
                            >
                              {row.status}
                            </span>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </m.div>
      </m.div>

      {/* B) Floating product card */}
      <m.div
        initial={{ opacity: 0, y: reduced ? 0 : 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        className="absolute left-[54%] top-[46%] z-30 w-[40%] md:left-[55%] md:top-[40%] md:w-[25%]"
      >
        <m.div
          style={{ x: sx, y: sy }}
          transformTemplate={({ x, y }) =>
            `translate3d(calc(${x ?? 0} * -10px), calc(${y ?? 0} * -10px), 0)`
          }
        >
          <m.div
            animate={reduced ? {} : { y: [0, -6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="rounded-2xl border border-white bg-white/95 p-2.5 shadow-[0_24px_60px_rgba(10,20,40,0.35)] backdrop-blur"
          >
            <MediaPlaceholder
              type="image"
              aspect={productCard.media.aspect}
              label={productCard.media.label}
              hint={productCard.media.hint}
              className="rounded-xl border-dashed border-[#C9CFDA] bg-[#F4F6F9] p-3 text-[#3B4F66] [&_span:first-child]:bg-white [&_span:first-child_svg]:text-[#673DE6] [&>span:nth-child(2)]:text-[10px] [&>span:nth-child(3)]:text-[9px]"
            />
            <div className="mt-2.5 flex items-center justify-between gap-2 px-0.5">
              <div className="min-w-0">
                <p className="truncate text-[clamp(10px,1.3vw,17px)] font-semibold text-[#1D1E20]">
                  {productCard.title}
                </p>
                <p className="flex items-center gap-1 text-[10px] text-[#12805C]">
                  <span className="inline-block size-1.5 rounded-full bg-[#2EC27E]" />
                  <ShieldCheck className="size-3" strokeWidth={1.75} />
                  {productCard.sub}
                </p>
              </div>
              <span
                aria-hidden="true"
                className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#EEF1F5] text-[#1D1E20]"
              >
                <MessageCircle className="size-4" strokeWidth={1.75} />
              </span>
            </div>
          </m.div>
        </m.div>
      </m.div>

      {/* C) Social / integration tiles (md+ columns; mobile = single row) */}
      <div
        aria-label={tilesLabel}
        className="pointer-events-none absolute inset-x-0 bottom-0 md:hidden"
      >
        <div className="flex items-center justify-center gap-[4%] px-[3%] pb-[2%]">
          {tiles.map((tile, i) => {
            const Icon = TILE_ICONS[tile.kind];
            return (
              <m.span
                key={tile.kind}
                aria-hidden="true"
                {...pop(i)}
                className="grid aspect-square w-[15%] place-items-center rounded-[22%] border border-white/60 bg-[#E3EBF3] text-[#1D1E20] shadow-md"
              >
                <Icon className="h-1/2 w-1/2" />
              </m.span>
            );
          })}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 hidden md:block">
        {tiles.map((tile, i) => {
          const Icon = TILE_ICONS[tile.kind];
          const tileSize = 9;
          return (
            <m.span
              key={tile.kind}
              aria-hidden="true"
              style={{
                left: `${tile.columnX}%`,
                top: `${tile.top}%`,
                width: `${tileSize}%`,
              }}
              className="absolute aspect-square"
            >
              <m.span
                style={{ x: sx, y: sy }}
                transformTemplate={({ x, y }) =>
                  `translate3d(calc(${x ?? 0} * 6px), calc(${y ?? 0} * 6px), 0)`
                }
                className="block h-full w-full -translate-x-1/2 -translate-y-1/2"
              >
                <m.span
                  initial={pop(i).initial}
                  animate={
                    inView
                      ? reduced
                        ? { scale: 1, opacity: 1 }
                        : { scale: 1, opacity: 1, y: [0, -3, 0] }
                      : pop(i).initial
                  }
                  transition={
                    reduced
                      ? { duration: 0.3, delay: i * 0.04 }
                      : {
                          scale: pop(i).transition,
                          opacity: pop(i).transition,
                          y: {
                            duration: 3.4 + i * 0.4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: tile.phase * 0.4,
                          },
                        }
                  }
                  className="block h-full w-full"
                >
                  <span className="grid h-full w-full place-items-center rounded-[22%] border border-white/60 bg-[#E3EBF3] text-[#1D1E20] shadow-md">
                    <Icon className="h-1/2 w-1/2" />
                  </span>
                </m.span>
              </m.span>
            </m.span>
          );
        })}
      </div>

      {/* D) rocks */}
      {rocks.map((rock, i) => (
        <m.div
          key={i}
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 1 + i * 0.15 }}
          style={{ left: `${rock.left}%`, top: `${rock.top}%`, width: `${rock.width}%` }}
          className={cn("pointer-events-none absolute hidden md:block", rock.z)}
        >
          <m.div
            style={{ x: sx, y: sy }}
            transformTemplate={({ x, y }) =>
              `translate3d(calc(${x ?? 0} * -14px), calc(${y ?? 0} * -14px), 0)`
            }
          >
            <m.div
              animate={reduced ? {} : { y: [0, -10, 0], rotate: [-3, 3, -3] }}
              transition={{
                duration: 9 + i * 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {rock.src ? (
                <Image src={rock.src} alt="" width={400} height={400} className="h-auto w-full" />
              ) : (
                <MediaPlaceholder
                  type="image"
                  aspect="1/1"
                  label="Add (optional): transparent PNG/WebP of a dark rock or crystal, 3D render (800x800)"
                  hint="Decorative. Leave empty to hide."
                  className="border-dashed border-white/30 bg-transparent p-2 text-white/70 [&>span]:hidden [&>span:last-child]:block [&>span:nth-child(2)]:text-[10px] [&>span:nth-child(3)]:text-[10px]"
                />
              )}
            </m.div>
          </m.div>
        </m.div>
      ))}

      {/* Caption (real text, not decorative) */}
      <p
        aria-hidden="false"
        className="absolute left-[3%] top-[88%] max-w-[60%] text-xs text-[#3B4F66] md:top-[83%]"
      >
        {dashboard.caption}
      </p>
    </div>
  );
}
