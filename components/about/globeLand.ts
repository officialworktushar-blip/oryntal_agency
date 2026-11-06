import worldDots from "@/lib/data/world-dots.json";

export type LonLat = [number, number];

export type GlobePoint = {
  x: number;
  y: number;
  z: number;
};

const DEG = Math.PI / 180;

export const GLOBE_DOTS: GlobePoint[] = [];

for (let index = 0; index < worldDots.length; index += 2) {
  const lng = worldDots[index] * DEG;
  const lat = worldDots[index + 1] * DEG;
  const cosLat = Math.cos(lat);

  GLOBE_DOTS.push({
    x: cosLat * Math.sin(lng),
    y: Math.sin(lat),
    z: cosLat * Math.cos(lng),
  });
}
