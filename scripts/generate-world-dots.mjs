import { mkdirSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { geoContains } from "d3-geo";
import { feature } from "topojson-client";

const require = createRequire(import.meta.url);
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const world = require("world-atlas/land-110m.json");
const land = feature(world, world.objects.land);

const latStep = 2.2;
const lngStepAtEquator = 2.2;
const maxLngStep = 12;
const dots = [];

for (let lat = -58; lat <= 80; lat += latStep) {
  const lngStep = Math.min(
    lngStepAtEquator / Math.cos((lat * Math.PI) / 180),
    maxLngStep,
  );

  for (let lng = -180; lng <= 180; lng += lngStep) {
    if (geoContains(land, [lng, lat])) {
      dots.push(
        Math.round(lng * 10) / 10,
        Math.round(lat * 10) / 10,
      );
    }
  }
}

const outPath = resolve(root, "lib/data/world-dots.json");
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, JSON.stringify(dots));

console.log(`Wrote ${dots.length / 2} points to ${outPath}`);
