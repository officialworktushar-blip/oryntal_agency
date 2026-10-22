"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { geoOrthographic } from "d3-geo";
import { AE, AU, BR, DE, GB, IN, SG, US } from "country-flag-icons/react/3x2";
import type { GlobalReachPin } from "@/lib/content/packages/digitalFoundation";

type GlobeCanvasProps = {
  pins: GlobalReachPin[];
  caption: string;
};

const DEG = Math.PI / 180;
const TAU = Math.PI * 2;
const INITIAL_LAMBDA = -35;
const INITIAL_PHI = -16;
const FLAGS = { IN, AE, GB, DE, US, SG, AU, BR } as const;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export default function GlobeCanvas({ pins, caption }: GlobeCanvasProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pinRefs = useRef<(HTMLDivElement | null)[]>([]);
  const inView = useInView(wrapRef, { amount: 0.15 });
  const reduced = useReducedMotion() ?? false;

  const [dots, setDots] = useState<Float32Array | null>(null);
  const [pageVisible, setPageVisible] = useState(true);
  const [revealed, setRevealed] = useState(false);

  const rotation = useRef({ lambda: INITIAL_LAMBDA, phi: INITIAL_PHI });
  const pointer = useRef({
    active: false,
    lastX: 0,
    lastY: 0,
    lastMs: 0,
    vLng: 0,
    vPhi: 0,
  });
  const size = useRef({ w: 0, h: 0, dpr: 1, desktop: false });
  const renderRef = useRef<() => void>(() => {});

  useEffect(() => {
    let cancelled = false;

    import("@/lib/data/world-dots.json").then((mod) => {
      if (!cancelled) {
        setDots(new Float32Array(mod.default as number[]));
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const update = () => setPageVisible(document.visibilityState === "visible");
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  useEffect(() => {
    if (inView && dots) setRevealed(true);
  }, [inView, dots]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas || !dots) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let last = 0;

    const render = () => {
      const { w, h, dpr, desktop } = size.current;
      if (!w || !h) return;

      const radius = desktop ? h * 0.92 : w * 0.62;
      const cx = w * 0.62;
      const cy = h * 0.56;
      const projection = geoOrthographic()
        .translate([cx, cy])
        .scale(radius)
        .clipAngle(90)
        .rotate([
          rotation.current.lambda,
          rotation.current.phi,
          0,
        ]);

      const centreLng = -rotation.current.lambda;
      const centreLat = -rotation.current.phi;
      const sinCentreLat = Math.sin(centreLat * DEG);
      const cosCentreLat = Math.cos(centreLat * DEG);

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const rim = ctx.createRadialGradient(
        cx * dpr,
        cy * dpr,
        radius * 0.93 * dpr,
        cx * dpr,
        cy * dpr,
        radius * 1.04 * dpr,
      );
      rim.addColorStop(0, "rgba(120,100,255,0.10)");
      rim.addColorStop(1, "rgba(120,100,255,0)");
      ctx.fillStyle = rim;
      ctx.beginPath();
      ctx.arc(cx * dpr, cy * dpr, radius * 1.04 * dpr, 0, TAU);
      ctx.fill();

      const buckets = [
        new Path2D(),
        new Path2D(),
        new Path2D(),
        new Path2D(),
      ];

      for (let i = 0; i < dots.length; i += 2) {
        const lng = dots[i];
        const lat = dots[i + 1];
        const sinLat = Math.sin(lat * DEG);
        const cosLat = Math.cos(lat * DEG);
        const cosd =
          sinLat * sinCentreLat +
          cosLat * cosCentreLat * Math.cos((lng - centreLng) * DEG);

        if (cosd <= 0.02) continue;

        const point = projection([lng, lat]);
        if (!point) continue;

        const t = clamp((cosd - 0.02) / 0.98, 0, 0.9999);
        const bucket = Math.min(3, Math.floor(t * 4));
        const x = point[0] * dpr;
        const y = point[1] * dpr;
        const r = (0.9 + 1.15 * cosd) * dpr;
        const path = buckets[bucket];

        path.moveTo(x + r, y);
        path.arc(x, y, r, 0, TAU);
      }

      const alphas = [0.1375, 0.2125, 0.2875, 0.3625];
      buckets.forEach((path, index) => {
        ctx.fillStyle = `rgba(255,255,255,${alphas[index]})`;
        ctx.fill(path);
      });

      pins.forEach((pin, index) => {
        const element = pinRefs.current[index];
        if (!element) return;

        if (!desktop && index >= 5) {
          element.style.display = "none";
          return;
        }
        element.style.display = "";

        const sinLat = Math.sin(pin.lat * DEG);
        const cosLat = Math.cos(pin.lat * DEG);
        const cosd =
          sinLat * sinCentreLat +
          cosLat * cosCentreLat * Math.cos((pin.lng - centreLng) * DEG);
        const opacity = clamp((cosd - 0.12) / 0.2, 0, 1);
        const point = projection([pin.lng, pin.lat]);

        if (!point) {
          element.style.opacity = "0";
          element.style.pointerEvents = "none";
          return;
        }

        element.style.transform = `translate3d(${point[0]}px, ${point[1]}px, 0)`;
        element.style.opacity = String(opacity);
        element.style.zIndex = String(Math.round(cosd * 100));
        element.style.pointerEvents = opacity < 0.5 ? "none" : "auto";
      });
    };

    renderRef.current = render;

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, rect.width);
      const h = Math.max(1, rect.height);

      size.current = {
        w,
        h,
        dpr,
        desktop: window.innerWidth >= 1024,
      };
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      render();
    };

    const observer = new ResizeObserver(resize);
    observer.observe(wrap);
    resize();

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);

      const delta = now - last;
      if (delta < 22) return;
      last = now;

      const dt = Math.min(delta, 100) / 1000;
      const rot = rotation.current;
      const drag = pointer.current;

      if (!drag.active) {
        rot.lambda += 3.2 * dt;

        if (!reduced && (drag.vLng || drag.vPhi)) {
          rot.lambda += drag.vLng * dt;
          rot.phi = clamp(rot.phi + drag.vPhi * dt, -35, 5);
          const decay = Math.exp(-4 * dt);
          drag.vLng *= decay;
          drag.vPhi *= decay;
          if (Math.abs(drag.vLng) < 0.02) drag.vLng = 0;
          if (Math.abs(drag.vPhi) < 0.02) drag.vPhi = 0;
        }
      }

      render();
    };

    if (inView && pageVisible && !reduced) {
      last = performance.now();
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [dots, inView, pageVisible, reduced, pins]);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    pointer.current.active = true;
    pointer.current.lastX = event.clientX;
    pointer.current.lastY = event.clientY;
    pointer.current.lastMs = performance.now();
    pointer.current.vLng = 0;
    pointer.current.vPhi = 0;
    event.currentTarget.style.cursor = "grabbing";
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = pointer.current;
    if (!drag.active) return;

    const now = performance.now();
    const elapsed = Math.max(1, now - drag.lastMs);
    const dx = event.clientX - drag.lastX;
    const dy = event.clientY - drag.lastY;
    const dLng = dx * 0.28;
    const dPhi = -dy * 0.14;

    rotation.current.lambda += dLng;
    rotation.current.phi = clamp(rotation.current.phi + dPhi, -35, 5);
    drag.vLng = dLng / (elapsed / 1000);
    drag.vPhi = dPhi / (elapsed / 1000);
    drag.lastX = event.clientX;
    drag.lastY = event.clientY;
    drag.lastMs = now;
    renderRef.current();
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    pointer.current.active = false;
    event.currentTarget.style.cursor = "grab";
    if (reduced) {
      pointer.current.vLng = 0;
      pointer.current.vPhi = 0;
    }
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <div
      ref={wrapRef}
      className="relative h-[300px] w-full touch-pan-y select-none sm:h-[360px] lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[62%]"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={{ cursor: "grab" }}
    >
      <div
        role="img"
        aria-label="Dotted globe with country flags showing markets ORYNTAL can serve remotely"
        className="absolute inset-0"
      >
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className={`pointer-events-none block h-full w-full transition-[opacity,transform] duration-700 ease-out ${
            revealed ? "scale-100 opacity-100" : "scale-[0.97] opacity-0"
          }`}
        />

        <div
          aria-hidden="true"
          className={`absolute inset-0 ${inView && !reduced ? "gr-pulses" : ""}`}
        >
          {pins.map((pin, index) => {
            const Flag = FLAGS[pin.flag];

            return (
              <div
                key={pin.id}
                ref={(element) => {
                  pinRefs.current[index] = element;
                }}
                className={`gr-pin group/pin absolute left-0 top-0 ${
                  index >= 5 ? "hidden lg:block" : ""
                } ${revealed ? "gr-pin-in" : ""}`}
                style={{ "--pin-i": index } as CSSProperties}
              >
                <div className="gr-pin-tile">
                  <span className="gr-pin-flag">
                    <Flag
                      aria-hidden="true"
                      className="block h-full w-full rounded-[3px]"
                    />
                    <span className="gr-pin-shine" />
                  </span>
                  <span className="gr-pin-anchor">
                    <span className="gr-pin-ring" />
                  </span>
                  <span className="gr-pin-label hidden lg:inline-flex">
                    {pin.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <p className="sr-only">{caption}</p>
    </div>
  );
}
