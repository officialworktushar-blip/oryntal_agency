"use client";

import { useEffect, useState } from "react";
import { m, useSpring, useReducedMotion } from "framer-motion";
import { Bot, PackageCheck, Sparkles } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { useScaledCanvas } from "../hooks/useScaledCanvas";

type ChatDiagramProps = {
  animateIn?: boolean;
  running?: boolean;
  reduced?: boolean;
  highlight?: boolean;
};

const TOASTS = ["New message received", "Question answered instantly", "Order confirmed"];

const CURSOR_TARGETS = [
  { x: 144, y: 190 },
  { x: 264, y: 190 },
  { x: 384, y: 190 },
];

export default function ChatDiagram({
  animateIn = false,
  running = false,
  reduced = false,
  highlight = false,
}: ChatDiagramProps) {
  const { wrapperRef, scale } = useScaledCanvas();
  const systemReduced = useReducedMotion() ?? false;
  const still = reduced || systemReduced;

  const [target, setTarget] = useState(0);
  const [toastText, setToastText] = useState("Order confirmed");
  const [visible, setVisible] = useState(true);
  const [toastNonce, setToastNonce] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [clickNonce, setClickNonce] = useState(0);

  const cursorX = useSpring(CURSOR_TARGETS[0].x, { stiffness: 120, damping: 20 });
  const cursorY = useSpring(CURSOR_TARGETS[0].y, { stiffness: 120, damping: 20 });

  useEffect(() => {
    cursorX.set(CURSOR_TARGETS[target].x);
    cursorY.set(CURSOR_TARGETS[target].y);
  }, [target, cursorX, cursorY]);

  useEffect(() => {
    if (still) {
      setToastText("Order confirmed");
      setVisible(true);
      setClicked(false);
      return;
    }
    if (!running) return;

    const timers: number[] = [];

    timers.push(
      window.setTimeout(() => {
        setToastText(TOASTS[target]);
        setToastNonce((value) => value + 1);
        setVisible(true);
        setClicked(true);
        setClickNonce((value) => value + 1);
      }, 560),
    );
    timers.push(window.setTimeout(() => setClicked(false), 750));
    timers.push(window.setTimeout(() => setVisible(false), 1760));

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      setClicked(false);
    };
  }, [running, still, target]);

  useEffect(() => {
    if (!running || still) return;
    const interval = window.setInterval(() => {
      setTarget((value) => (value + 1) % 3);
    }, 1900);
    return () => window.clearInterval(interval);
  }, [running, still]);

  return (
    <div
      ref={wrapperRef}
      role="img"
      aria-label="Diagram: WhatsApp messages, an AI assistant and order updates working together"
      className="relative aspect-[480/280] w-full min-w-0 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 origin-center"
        style={{
          width: 480,
          height: 280,
          transform: `translate(-50%, -50%) scale(${scale})`,
        }}
      >
        <div
          className={`absolute ${animateIn ? "ba-box-in" : ""}`}
          style={{
            left: 40,
            top: 108,
            width: 400,
            height: 112,
            borderRadius: 22,
            border: `1.5px solid rgba(111, 91, 232, ${highlight ? 0.95 : 0.75})`,
            background: "rgba(20, 16, 50, 0.55)",
            transition: "border-color 200ms ease",
          }}
        />

        {[
          { x: 120, key: "whatsapp" },
          { x: 240, key: "ai" },
          { x: 360, key: "orders" },
        ].map((tile, i) => {
          const isClicked = clicked && target === i;
          const commonStyle = {
            left: tile.x - 36,
            top: 128,
            width: 72,
            height: 72,
            animationDelay: animateIn ? `${i * 80}ms` : undefined,
          };

          return (
            <div
              key={tile.key}
              className={`absolute flex items-center justify-center ${animateIn ? "ba-scale-pop" : ""}`}
              style={commonStyle}
            >
              {isClicked ? (
                <span
                  key={`ripple-${clickNonce}`}
                  className="ba-chat-ripple pointer-events-none absolute inset-0"
                  style={{
                    borderRadius: tile.key === "whatsapp" ? 999 : 20,
                    border: "1.5px solid rgba(155, 149, 255, 0.7)",
                  }}
                />
              ) : null}

              {tile.key === "whatsapp" ? (
                <span
                  className={`grid place-items-center rounded-full ${isClicked ? "ba-tile-click" : ""}`}
                  style={{
                    width: 64,
                    height: 64,
                    background: "#25D366",
                    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.35)",
                  }}
                >
                  <SiWhatsapp size={34} style={{ color: "#ffffff" }} />
                </span>
              ) : tile.key === "ai" ? (
                <span
                  className={`relative grid place-items-center rounded-2xl ${isClicked ? "ba-tile-click" : ""}`}
                  style={{
                    width: 64,
                    height: 64,
                    background: "linear-gradient(150deg, #8576FF, #5B3BE0)",
                    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.35)",
                  }}
                >
                  <Bot size={34} style={{ color: "#ffffff" }} />
                  <span
                    className="absolute grid place-items-center rounded-full"
                    style={{
                      right: -4,
                      top: -4,
                      width: 18,
                      height: 18,
                      background: "#1A1540",
                      border: "1px solid rgba(255, 255, 255, 0.22)",
                    }}
                  >
                    <Sparkles size={10} style={{ color: "#C9BFFF" }} />
                  </span>
                </span>
              ) : (
                <span
                  className={`grid place-items-center rounded-2xl ${isClicked ? "ba-tile-click" : ""}`}
                  style={{
                    width: 64,
                    height: 64,
                    background: "linear-gradient(150deg, #34C77B, #1E8A4C)",
                    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.35)",
                  }}
                >
                  <PackageCheck size={34} style={{ color: "#ffffff" }} />
                </span>
              )}
            </div>
          );
        })}

        <div
          className="absolute z-10"
          style={{ left: 240, top: 40, transform: "translateX(-50%)" }}
        >
          <m.div
            key={toastNonce}
            className="ba-toast-pop flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 text-[13px] text-white"
            style={{
              background: "rgba(255, 255, 255, 0.10)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0) scale(1)" : "translateY(4px) scale(0.98)",
              transition: "opacity 220ms ease, transform 220ms ease",
            }}
          >
            <span
              className="inline-block rounded-full"
              style={{ width: 6, height: 6, background: "#34C77B" }}
            />
            {toastText}
          </m.div>
        </div>

        <m.div
          className={`pointer-events-none absolute left-0 top-0 z-30 ${animateIn ? "ba-cursor-in" : ""}`}
          style={{
            x: cursorX,
            y: cursorY,
            filter: "drop-shadow(0 6px 10px rgba(0, 0, 0, 0.45))",
          }}
          animate={{ scale: clicked ? [1, 0.88, 1] : 1 }}
          transition={{ duration: 0.18, ease: "easeInOut" }}
        >
          <svg width="38" height="41" viewBox="0 0 32 34" fill="none">
            <defs>
              <linearGradient
                id="ba-cursor-fill"
                x1="4"
                y1="2"
                x2="24"
                y2="30"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#7B4DFF" />
                <stop offset="1" stopColor="#2A1478" />
              </linearGradient>
            </defs>
            <path
              d="M3 2 L3 27 L9.5 20.5 L14 30.5 L18.5 28.5 L14 18.5 L23 18.5 Z"
              fill="url(#ba-cursor-fill)"
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
          </svg>
        </m.div>
      </div>
    </div>
  );
}
