"use client";

import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { m, useTransform, type MotionValue } from "framer-motion";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";
import type { ShowcaseContent } from "@/lib/content/packages/digitalFoundation";

type ProductCardProps = {
  showcase: ShowcaseContent;
  parallaxX: MotionValue<number>;
  parallaxY: MotionValue<number>;
  reduced: boolean;
  visible: boolean;
  /** The card glows softly while the "WhatsApp and business links" item is active. */
  pulsing: boolean;
};

export default function ProductCard({
  showcase,
  parallaxX,
  parallaxY,
  reduced,
  visible,
  pulsing,
}: ProductCardProps) {
  const x = useTransform(parallaxX, (v) => -v * 8);
  const y = useTransform(parallaxY, (v) => -v * 8);
  const { card, copy } = showcase;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute"
      style={{ left: 633, top: 203, width: 195, height: 210, zIndex: 20 }}
    >
      <m.div
        style={reduced ? undefined : { x, y }}
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 40 }}
        animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{
          duration: reduced ? 0.3 : 0.6,
          delay: reduced ? 0 : 0.85,
          ease: "easeOut",
        }}
      >
        <m.div
          animate={reduced ? undefined : { y: [0, -5, 0] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.2,
          }}
          className="relative h-[210px] w-[195px] rounded-[14px] bg-[rgba(255,255,255,0.97)] p-[7px] shadow-[0_18px_40px_rgba(8,16,30,0.38)]"
          style={
            pulsing
              ? {
                  boxShadow:
                    "0 0 0 5px rgba(155,149,255,0.35), 0 18px 40px rgba(8,16,30,0.38)",
                }
              : undefined
          }
        >
          {/* Website preview */}
          <div className="relative h-[142px] w-[181px] overflow-hidden rounded-[9px] bg-[linear-gradient(160deg,#C9DBEE,#E6EEF7)]">
            {card.src ? (
              <Image
                src={card.src}
                alt=""
                fill
                sizes="200px"
                className="object-cover"
              />
            ) : (
              <MediaPlaceholder
                type="image"
                aspect="4/3"
                variant="compact"
                label={copy.cardImageLabel}
                className="h-full w-full"
              />
            )}
          </div>

          {/* Card title */}
          <p className="mt-[9px] text-center text-[11.5px] font-medium leading-none text-[#1B1F27]">
            {card.title}
          </p>

          {/* Status + chat button */}
          <div className="relative mt-[9px] flex items-center justify-center">
            <span className="flex items-center gap-[6px] text-[15px] font-bold leading-none text-[#1B1F27]">
              <span className="size-[6px] rounded-full bg-[#34C77B]" />
              {card.status}
            </span>

            <span className="absolute right-0 top-1/2 grid size-[26px] -translate-y-1/2 place-items-center rounded-full bg-[#EEF0F3]">
              <MessageCircle className="size-[12px] text-[#1B1F27]" strokeWidth={1.9} />
            </span>
          </div>
        </m.div>
      </m.div>
    </div>
  );
}
