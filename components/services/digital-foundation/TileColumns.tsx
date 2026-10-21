"use client";

import Image from "next/image";
import { m, useTransform, type MotionValue } from "framer-motion";
import type { ShowcaseTile } from "@/lib/content/packages/digitalFoundation";

type TileProps = {
  tile: ShowcaseTile;
  index: number;
  parallaxX: MotionValue<number>;
  parallaxY: MotionValue<number>;
  reduced: boolean;
  visible: boolean;
  pulsing: boolean;
};

const FLOAT_DURATIONS = [4, 5, 6, 4.5, 5.5];

function Tile({
  tile,
  index,
  parallaxX,
  parallaxY,
  reduced,
  visible,
  pulsing,
}: TileProps) {
  const x = useTransform(parallaxX, (v) => -v * 5);
  const y = useTransform(parallaxY, (v) => -v * 5);
  const Icon = tile.icon;
  const duration = FLOAT_DURATIONS[index % FLOAT_DURATIONS.length];

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute"
      style={{ left: tile.x, top: tile.y, width: 50, height: 50, zIndex: 20 }}
    >
      <m.div
        style={reduced ? undefined : { x, y }}
        initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.7 }}
        animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
        transition={
          reduced
            ? { duration: 0.3 }
            : { type: "spring", stiffness: 260, damping: 18, delay: 0.55 + index * 0.08 }
        }
      >
        <m.div
          animate={
            reduced ? undefined : { y: [0, -3, 0] }
          }
          transition={{
            duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.6,
          }}
          className="grid size-[50px] place-items-center rounded-[10px] border border-[rgba(255,255,255,0.6)] bg-[#E9EFF6] shadow-[0_6px_16px_rgba(0,0,0,0.25)]"
          style={
            pulsing
              ? {
                  boxShadow:
                    "0 0 0 5px rgba(155,149,255,0.35), 0 6px 16px rgba(0,0,0,0.25)",
                }
              : undefined
          }
        >
          {tile.src ? (
            <Image
              src={tile.src}
              alt=""
              width={24}
              height={24}
              className="size-[24px] object-contain"
            />
          ) : Icon ? (
            <Icon className="size-[26px] text-[#1E2530]" />
          ) : null}
        </m.div>
      </m.div>
    </div>
  );
}

type TileColumnsProps = {
  tiles: ShowcaseTile[];
  parallaxX: MotionValue<number>;
  parallaxY: MotionValue<number>;
  reduced: boolean;
  visible: boolean;
  pulsing: boolean;
};

export default function TileColumns({
  tiles,
  parallaxX,
  parallaxY,
  reduced,
  visible,
  pulsing,
}: TileColumnsProps) {
  return (
    <>
      {tiles.map((tile, index) => (
        <Tile
          key={tile.id}
          tile={tile}
          index={index}
          parallaxX={parallaxX}
          parallaxY={parallaxY}
          reduced={reduced}
          visible={visible}
          pulsing={pulsing}
        />
      ))}
    </>
  );
}
