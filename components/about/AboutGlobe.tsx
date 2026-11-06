"use client";

import { useEffect, useRef, useState } from "react";
import { GLOBE_DOTS } from "@/components/about/globeLand";
import type { GlobePoint } from "@/components/about/globeLand";

type Country = {
  name: string;
  lng: number;
  lat: number;
  need: string;
  build: string;
};

type Projected = {
  x: number;
  y: number;
  z: number;
};

type ActivePopup = {
  countryIndex: number;
  born: number;
};

type SegmentTone = "command" | "dim" | "accent" | "value" | "success";

type Segment = {
  text: string;
  tone: SegmentTone;
};

type TerminalLine = {
  segments: Segment[];
};

const DEG = Math.PI / 180;
const TAU = Math.PI * 2;
const TILT = 18 * DEG;
const INITIAL_ROTATION = -30 * DEG;
const ROTATION_SECONDS = 55;
const SPAWN_INTERVAL = 3500;
const POPUP_LIFE = 5200;

const COUNTRIES: Country[] = [
  {
    name: "India",
    lng: 78,
    lat: 22,
    need: "online store + UPI payments",
    build: "site, payments, WhatsApp updates",
  },
  {
    name: "United Arab Emirates",
    lng: 54,
    lat: 24,
    need: "English and Arabic website",
    build: "bookings and online payments",
  },
  {
    name: "United Kingdom",
    lng: -2,
    lat: 54,
    need: "booking system for a clinic",
    build: "online booking, auto reminders",
  },
  {
    name: "United States",
    lng: -98,
    lat: 39,
    need: "replies for website visitors",
    build: "chat tools, orders in one place",
  },
  {
    name: "Germany",
    lng: 10,
    lat: 51,
    need: "store with a delivery partner",
    build: "online store, tracking, invoices",
  },
  {
    name: "Singapore",
    lng: 103.8,
    lat: 1.4,
    need: "enquiries answered at any hour",
    build: "WhatsApp replies, follow-ups",
  },
  {
    name: "Australia",
    lng: 134,
    lat: -25,
    need: "stock and orders in one place",
    build: "dashboard, courier connection",
  },
  {
    name: "Canada",
    lng: -106,
    lat: 56,
    need: "appointments without phone calls",
    build: "booking app, reminders",
  },
  {
    name: "Brazil",
    lng: -52,
    lat: -10,
    need: "online store, local payments",
    build: "site, payments, chat replies",
  },
  {
    name: "South Africa",
    lng: 24,
    lat: -29,
    need: "track orders and suppliers",
    build: "order tracking, sourcing help",
  },
];

const COUNTRY_POINTS: GlobePoint[] = COUNTRIES.map((country) => {
  const lat = country.lat * DEG;
  const lng = country.lng * DEG;
  const cosLat = Math.cos(lat);

  return {
    x: cosLat * Math.sin(lng),
    y: Math.sin(lat),
    z: cosLat * Math.cos(lng),
  };
});

const TONE_CLASS: Record<SegmentTone, string> = {
  command: "text-[#8b7bff]",
  dim: "text-[#8b879c]",
  accent: "text-[#c4b5fd]",
  value: "text-[#d4d4d8]",
  success: "text-[#34d399]",
};

const OUTER_DOTS = [0.24, 1.31, 2.38, 3.45, 4.52, 5.59] as const;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

function getTerminalLines(country: Country): TerminalLine[] {
  return [
    {
      segments: [
        { text: "$", tone: "command" },
        { text: ` example --country "${country.name}"`, tone: "value" },
      ],
    },
    {
      segments: [
        { text: "> ", tone: "dim" },
        { text: "need:", tone: "accent" },
        { text: ` ${country.need}`, tone: "value" },
      ],
    },
    {
      segments: [
        { text: "> ", tone: "dim" },
        { text: "build:", tone: "accent" },
        { text: ` ${country.build}`, tone: "value" },
      ],
    },
    {
      segments: [
        { text: "✓ ", tone: "success" },
        { text: "custom proposal ready", tone: "success" },
      ],
    },
  ];
}

function projectPoint(
  point: GlobePoint,
  cosRotation: number,
  sinRotation: number,
  cosTilt: number,
  sinTilt: number,
  centerX: number,
  centerY: number,
  radius: number,
): Projected {
  const x = point.x * cosRotation - point.z * sinRotation;
  const z = point.x * sinRotation + point.z * cosRotation;
  const y = point.y * cosTilt - z * sinTilt;
  const depth = point.y * sinTilt + z * cosTilt;

  return {
    x: centerX + x * radius,
    y: centerY - y * radius,
    z: depth,
  };
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  const r = Math.min(radius, width / 2, height / 2);

  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + width - r, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + r);
  ctx.lineTo(x + width, y + height - r);
  ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  ctx.lineTo(x + r, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function renderSegments(
  segments: Segment[],
  visibleCharacters: number,
  keyPrefix: string,
) {
  let remaining = visibleCharacters;
  const parts = [];

  for (let index = 0; index < segments.length; index += 1) {
    if (remaining <= 0) break;

    const segment = segments[index];
    const text = segment.text.slice(0, remaining);

    if (text.length > 0) {
      parts.push(
        <span key={`${keyPrefix}-${index}`} className={TONE_CLASS[segment.tone]}>
          {text}
        </span>,
      );
    }

    remaining -= segment.text.length;
  }

  return parts;
}

export default function AboutGlobe() {
  const sectionRef = useRef<HTMLElement>(null);
  const globeRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  const rotationRef = useRef(INITIAL_ROTATION);
  const popupsRef = useRef<ActivePopup[]>([]);
  const lastSpawnRef = useRef(Number.NEGATIVE_INFINITY);
  const lastShownRef = useRef<number[]>(
    COUNTRIES.map(() => Number.NEGATIVE_INFINITY),
  );
  const pausedAtRef = useRef<number | null>(null);
  const typingRef = useRef({ line: 0, character: 0 });
  const typingDoneRef = useRef(false);

  const [activeCountry, setActiveCountry] = useState(0);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [displayedLines, setDisplayedLines] = useState<string[]>([""]);

  const country = COUNTRIES[activeCountry];
  const terminalLines = getTerminalLines(country);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setInView(entry?.isIntersecting ?? false);
      },
      { threshold: 0.15 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);

    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const update = () => setPageVisible(document.visibilityState === "visible");

    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  useEffect(() => {
    if (!reduced) return;
    setActiveCountry(0);
  }, [reduced]);

  useEffect(() => {
    typingRef.current = { line: 0, character: 0 };
    typingDoneRef.current = false;
    setDisplayedLines([""]);
  }, [activeCountry]);

  useEffect(() => {
    const lines = getTerminalLines(COUNTRIES[activeCountry]);

    if (reduced) {
      typingRef.current = {
        line: lines.length,
        character: 0,
      };
      typingDoneRef.current = true;
      setDisplayedLines(lines.map((line) => line.segments.map((part) => part.text).join("")));
      return;
    }

    if (!inView || !pageVisible) return;

    let timer = 0;

    const typeNext = () => {
      const state = typingRef.current;

      if (state.line >= lines.length) {
        typingDoneRef.current = true;
        return;
      }

      const line = lines[state.line];
      const fullText = line.segments.map((part) => part.text).join("");

      if (state.character < fullText.length) {
        state.character += 1;
        const nextText = fullText.slice(0, state.character);

        setDisplayedLines((current) => {
          const next = current.slice();
          next[state.line] = nextText;
          return next;
        });

        timer = window.setTimeout(typeNext, 24);
        return;
      }

      if (state.line < lines.length - 1) {
        timer = window.setTimeout(() => {
          state.line += 1;
          state.character = 0;
          setDisplayedLines((current) => [...current, ""]);
          typeNext();
        }, 320);
        return;
      }

      typingDoneRef.current = true;
    };

    timer = window.setTimeout(typeNext, 240);
    return () => window.clearTimeout(timer);
  }, [activeCountry, inView, pageVisible, reduced]);

  useEffect(() => {
    const body = terminalBodyRef.current;
    if (!body) return;

    body.scrollTo({
      top: body.scrollHeight,
      behavior: reduced ? "auto" : "smooth",
    });
  }, [displayedLines, reduced]);

  useEffect(() => {
    const wrap = globeRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const startedAt = performance.now();

    if (pausedAtRef.current !== null) {
      const pausedFor = startedAt - pausedAtRef.current;
      popupsRef.current = popupsRef.current.map((popup) => ({
        ...popup,
        born: popup.born + pausedFor,
      }));
      lastSpawnRef.current += pausedFor;
      pausedAtRef.current = null;
    }

    if (reduced) {
      popupsRef.current = [0, 1, 2].map((countryIndex, index) => ({
        countryIndex,
        born: startedAt - 1800 + index * 120,
      }));
    }

    const size = { width: 0, height: 0, dpr: 1 };
    let frame = 0;
    let lastFrame = startedAt;

    const ensurePopups = (
      now: number,
      projectedCountries: Projected[],
    ) => {
      popupsRef.current = popupsRef.current.filter(
        (popup) => now - popup.born < POPUP_LIFE,
      );

      if (now - lastSpawnRef.current < SPAWN_INTERVAL) return;

      const active = new Set(
        popupsRef.current.map((popup) => popup.countryIndex),
      );
      let nextCountry = -1;
      let oldestShown = Number.POSITIVE_INFINITY;

      projectedCountries.forEach((point, index) => {
        if (point.z <= 0.45 || active.has(index)) return;
        if (lastShownRef.current[index] < oldestShown) {
          oldestShown = lastShownRef.current[index];
          nextCountry = index;
        }
      });

      if (nextCountry < 0) {
        lastSpawnRef.current = now - SPAWN_INTERVAL + 500;
        return;
      }

      popupsRef.current = [
        ...popupsRef.current,
        { countryIndex: nextCountry, born: now },
      ];
      lastShownRef.current[nextCountry] = now;
      lastSpawnRef.current = now;
      setActiveCountry(nextCountry);
    };

    const drawPopup = (
      now: number,
      popup: ActivePopup,
      point: Projected,
    ) => {
      if (point.z <= 0.12) return;

      const age = now - popup.born;
      if (age < 0 || age >= POPUP_LIFE) return;

      const fadeIn = clamp(age / 420, 0, 1);
      const fadeOut =
        age > POPUP_LIFE - 650
          ? clamp((POPUP_LIFE - age) / 650, 0, 1)
          : 1;
      const depth = clamp((point.z - 0.12) / 0.33, 0, 1);
      const alpha = fadeIn * fadeOut * depth;

      if (alpha <= 0.01) return;

      const { x, y } = point;
      const pulse = (age % 1300) / 1300;

      ctx.globalAlpha = alpha * (1 - pulse) * 0.55;
      ctx.strokeStyle = "#8b7bff";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(x, y, 5 + pulse * 11, 0, TAU);
      ctx.stroke();

      const glow = ctx.createRadialGradient(x, y, 0, x, y, 12);
      glow.addColorStop(0, "rgba(139,123,255,0.75)");
      glow.addColorStop(1, "rgba(139,123,255,0)");
      ctx.globalAlpha = alpha * 0.9;
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(x, y, 12, 0, TAU);
      ctx.fill();

      ctx.fillStyle = "#8b7bff";
      ctx.beginPath();
      ctx.arc(x, y, 3.2, 0, TAU);
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(x, y, 1.2, 0, TAU);
      ctx.fill();

      ctx.font =
        '600 11px ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif';
      const labelWidth = Math.min(
        160,
        ctx.measureText(COUNTRIES[popup.countryIndex].name).width + 24,
      );
      const labelHeight = 24;
      const labelX = clamp(x - labelWidth / 2, 4, size.width - labelWidth - 4);
      const labelY = clamp(y - 47, 4, size.height - labelHeight - 4);
      const stemX = labelX + labelWidth / 2;

      ctx.globalAlpha = alpha * 0.75;
      ctx.strokeStyle = "rgba(139,123,255,0.8)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, y - 8);
      ctx.lineTo(stemX, labelY + labelHeight);
      ctx.stroke();

      ctx.globalAlpha = alpha;
      ctx.shadowColor = "rgba(91,61,224,0.55)";
      ctx.shadowBlur = 14;
      ctx.shadowOffsetY = 4;
      ctx.fillStyle = "#6a3fe0";
      drawRoundedRect(ctx, labelX, labelY, labelWidth, labelHeight, 7);
      ctx.fill();

      ctx.shadowBlur = 0;
      ctx.shadowOffsetY = 0;
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font =
        '600 11px ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif';
      ctx.fillText(
        COUNTRIES[popup.countryIndex].name,
        stemX,
        labelY + labelHeight / 2,
      );

      ctx.globalAlpha = 1;
      ctx.textAlign = "start";
      ctx.textBaseline = "alphabetic";
    };

    const render = (
      now: number,
      theta: number,
      centerX: number,
      centerY: number,
      radius: number,
      canSpawn: boolean,
    ) => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.setTransform(size.dpr, 0, 0, size.dpr, 0, 0);

      const cosRotation = Math.cos(theta);
      const sinRotation = Math.sin(theta);
      const cosTilt = Math.cos(TILT);
      const sinTilt = Math.sin(TILT);

      const halo = ctx.createRadialGradient(
        centerX,
        centerY,
        radius * 0.84,
        centerX,
        centerY,
        radius * 1.07,
      );
      halo.addColorStop(0, "rgba(106,63,224,0.18)");
      halo.addColorStop(0.52, "rgba(106,63,224,0.08)");
      halo.addColorStop(1, "rgba(106,63,224,0)");
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.07, 0, TAU);
      ctx.fill();

      const sphere = ctx.createRadialGradient(
        centerX - radius * 0.36,
        centerY - radius * 0.42,
        radius * 0.08,
        centerX,
        centerY,
        radius,
      );
      sphere.addColorStop(0, "#1a1a21");
      sphere.addColorStop(0.48, "#111116");
      sphere.addColorStop(0.76, "#0a0a0e");
      sphere.addColorStop(1, "#040406");
      ctx.fillStyle = sphere;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, TAU);
      ctx.fill();

      const buckets = [new Path2D(), new Path2D(), new Path2D(), new Path2D()];

      GLOBE_DOTS.forEach((point) => {
        const x = point.x * cosRotation - point.z * sinRotation;
        const z = point.x * sinRotation + point.z * cosRotation;
        const y = point.y * cosTilt - z * sinTilt;
        const depth = point.y * sinTilt + z * cosTilt;

        if (depth <= 0.015) return;

        const screenX = centerX + x * radius;
        const screenY = centerY - y * radius;
        const bucket = Math.min(3, Math.floor(depth * 4));
        const dotRadius = 0.85 + depth * 1.4;

        buckets[bucket].moveTo(screenX + dotRadius, screenY);
        buckets[bucket].arc(screenX, screenY, dotRadius, 0, TAU);
      });

      const alphas = [0.15, 0.25, 0.36, 0.5];

      buckets.forEach((path, index) => {
        ctx.fillStyle = `rgba(255,255,255,${alphas[index]})`;
        ctx.fill(path);
      });

      ctx.strokeStyle = "rgba(255,255,255,0.28)";
      ctx.lineWidth = 1;
      ctx.shadowColor = "rgba(139,123,255,0.5)";
      ctx.shadowBlur = 18;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, TAU);
      ctx.stroke();
      ctx.shadowBlur = 0;

      OUTER_DOTS.forEach((angle, index) => {
        const orbit = radius * (1.032 + (index % 2) * 0.012);
        const x = centerX + Math.cos(angle) * orbit;
        const y = centerY + Math.sin(angle) * orbit;
        const dotRadius = index % 2 === 0 ? 2.1 : 2.7;

        ctx.fillStyle = `rgba(106,79,224,${0.3 + (index % 3) * 0.08})`;
        ctx.beginPath();
        ctx.arc(x, y, dotRadius, 0, TAU);
        ctx.fill();
      });

      const projectedCountries = COUNTRY_POINTS.map((point) =>
        projectPoint(
          point,
          cosRotation,
          sinRotation,
          cosTilt,
          sinTilt,
          centerX,
          centerY,
          radius,
        ),
      );

      if (canSpawn) ensurePopups(now, projectedCountries);

      const visiblePopups = popupsRef.current.filter(
        (popup) =>
          now - popup.born < POPUP_LIFE &&
          projectedCountries[popup.countryIndex]?.z > 0.25,
      );

      if (visiblePopups.length >= 2) {
        const first = projectedCountries[visiblePopups[0].countryIndex];
        const second = projectedCountries[visiblePopups[1].countryIndex];

        if (first && second) {
          const middleX = (first.x + second.x) / 2;
          const middleY = (first.y + second.y) / 2;
          const deltaX = second.x - first.x;
          const deltaY = second.y - first.y;
          const distance = Math.hypot(deltaX, deltaY) || 1;
          const controlX = middleX - (deltaY / distance) * 16;
          const controlY = middleY + (deltaX / distance) * 16;

          ctx.globalAlpha = 0.42;
          ctx.strokeStyle = "#8b7bff";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(first.x, first.y);
          ctx.quadraticCurveTo(controlX, controlY, second.x, second.y);
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }

      popupsRef.current.forEach((popup) => {
        const point = projectedCountries[popup.countryIndex];
        if (point) drawPopup(now, popup, point);
      });
    };

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const width = Math.max(1, rect.width);
      const height = Math.max(1, rect.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const radius = Math.max(1, Math.min(width, height) / 2 - 16);

      size.width = width;
      size.height = height;
      size.dpr = dpr;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = "100%";
      canvas.style.height = "100%";

      render(
        performance.now(),
        reduced ? 0 : rotationRef.current,
        width / 2,
        height / 2,
        radius,
        false,
      );
    };

    const observer = new ResizeObserver(resize);
    observer.observe(wrap);
    resize();

    if (!reduced && inView && pageVisible) {
      lastFrame = performance.now();

      const loop = (now: number) => {
        frame = window.requestAnimationFrame(loop);

        const delta = Math.min(now - lastFrame, 80);
        lastFrame = now;
        rotationRef.current =
          (rotationRef.current + (TAU / ROTATION_SECONDS) * (delta / 1000)) %
          TAU;

        render(
          now,
          rotationRef.current,
          size.width / 2,
          size.height / 2,
          Math.max(1, Math.min(size.width, size.height) / 2 - 16),
          true,
        );
      };

      frame = window.requestAnimationFrame(loop);
    }

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      pausedAtRef.current = performance.now();
    };
  }, [inView, pageVisible, reduced]);

  return (
    <section
      ref={sectionRef}
      id="globe-strip"
      aria-label="Globe showing example setups ORYNTAL can build for businesses in different countries."
      className="relative isolate overflow-hidden border-y border-white/5 bg-black px-5 py-14 sm:px-6 md:h-[400px] md:py-0 lg:h-[430px] lg:px-8"
    >
      <style>{`
        @keyframes ab-globe-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }

        .ab-globe-cursor {
          display: inline-block;
          width: 7px;
          height: 13px;
          margin-left: 3px;
          vertical-align: -2px;
          background: #8b7bff;
          animation: ab-globe-blink 1.1s steps(1, end) infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .ab-globe-cursor {
            animation: none;
            opacity: 1;
          }
        }
      `}</style>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 62% 54% at 50% 108%, rgba(106,63,224,0.27) 0%, rgba(106,63,224,0) 70%), radial-gradient(ellipse 54% 42% at 50% -12%, rgba(59,42,158,0.22) 0%, rgba(59,42,158,0) 72%), #000000",
        }}
      />

      <p className="sr-only">
        Animated globe showing example setups ORYNTAL can build for businesses
        in different countries.
      </p>

      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center md:h-full md:block">
        <div
          ref={globeRef}
          aria-hidden="true"
          className="relative h-[280px] w-[280px] shrink-0 min-[380px]:h-[300px] min-[380px]:w-[300px] md:absolute md:left-1/2 md:top-1/2 md:h-[400px] md:w-[400px] md:-translate-x-1/2 md:-translate-y-1/2 lg:h-[430px] lg:w-[430px]"
        >
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="block h-full w-full"
          />
        </div>

        <div
          aria-hidden="true"
          className="relative z-20 mt-4 flex h-[150px] w-full max-w-[360px] flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0b0b0f]/95 shadow-[0_24px_70px_rgba(0,0,0,0.55)] backdrop-blur md:absolute md:left-0 md:top-1/2 md:mt-0 md:h-[150px] md:w-[min(300px,22vw)] md:max-w-none md:-translate-y-1/2 lg:w-[min(300px,26vw)]"
        >
          <div className="flex h-[30px] shrink-0 items-center gap-1.5 border-b border-white/10 px-3">
            <span className="size-1.5 rounded-full bg-[#ff5f57]" />
            <span className="size-1.5 rounded-full bg-[#febc2e]" />
            <span className="size-1.5 rounded-full bg-[#28c840]" />
            <span className="ml-auto font-mono text-[9px] uppercase tracking-[0.16em] text-white/35">
              proposal
            </span>
          </div>

          <div
            ref={terminalBodyRef}
            className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-3.5 py-3 font-mono text-[11.5px] leading-[1.7] text-[#d4d4d8] sm:text-[12.5px]"
          >
            {displayedLines.map((line, index) => {
              const terminalLine = terminalLines[index];
              const isCurrent =
                index === typingRef.current.line && !typingDoneRef.current;

              return (
                <div
                  key={index}
                  className="whitespace-pre-wrap break-words"
                >
                  {terminalLine
                    ? renderSegments(
                        terminalLine.segments,
                        line.length,
                        `line-${index}`,
                      )
                    : line}
                  {isCurrent ? (
                    <span className="ab-globe-cursor" />
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
