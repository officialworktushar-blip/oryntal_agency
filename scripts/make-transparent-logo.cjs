const sharp = require("sharp");

// Remove the connected off-white background of the logo, keep only the largest
// opaque component (drops stray noise specks), trim and downscale.
(async () => {
  const src = "public/real_logo.png";
  const { data, info } = await sharp(src)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = info;
  const N = width * height;

  const isBg = (p) => {
    const i = p * 4;
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    return min >= 200 && max - min <= 18;
  };

  // 1) Flood fill the border-connected background -> alpha 0
  const bgVisited = new Uint8Array(N);
  const stack = [];
  const pushBg = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const p = y * width + x;
    if (bgVisited[p] || !isBg(p)) return;
    bgVisited[p] = 1;
    stack.push(p);
  };

  for (let x = 0; x < width; x++) {
    pushBg(x, 0);
    pushBg(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    pushBg(0, y);
    pushBg(width - 1, y);
  }

  while (stack.length) {
    const p = stack.pop();
    const x = p % width;
    const y = (p - x) / width;
    pushBg(x + 1, y);
    pushBg(x - 1, y);
    pushBg(x, y + 1);
    pushBg(x, y - 1);
  }

  let removed = 0;
  for (let p = 0; p < N; p++) {
    if (bgVisited[p]) {
      data[p * 4 + 3] = 0;
      removed++;
    }
  }

  // 2) Keep only the largest connected opaque component
  const label = new Int32Array(N).fill(0);
  let bestLabel = 0;
  let bestSize = 0;
  let current = 0;

  for (let start = 0; start < N; start++) {
    if (label[start] || data[start * 4 + 3] === 0) continue;
    current++;
    let size = 0;
    const q = [start];
    label[start] = current;
    while (q.length) {
      const p = q.pop();
      size++;
      const x = p % width;
      const y = (p - x) / width;
      const neighbours = [];
      if (x > 0) neighbours.push(p - 1);
      if (x < width - 1) neighbours.push(p + 1);
      if (y > 0) neighbours.push(p - width);
      if (y < height - 1) neighbours.push(p + width);
      for (const n of neighbours) {
        if (!label[n] && data[n * 4 + 3] !== 0) {
          label[n] = current;
          q.push(n);
        }
      }
    }
    if (size > bestSize) {
      bestSize = size;
      bestLabel = current;
    }
  }

  let dropped = 0;
  for (let p = 0; p < N; p++) {
    if (label[p] !== bestLabel && data[p * 4 + 3] !== 0) {
      data[p * 4 + 3] = 0;
      dropped++;
    }
  }

  console.log(
    `removed bg ${removed} (${((removed / N) * 100).toFixed(1)}%), dropped specks ${bestLabel}->${bestSize}px, removed ${removed - bestSize + (current > 0 ? 0 : 0)}`
  );

  const out = "public/oryntal-logo.png";
  await sharp(data, { raw: { width, height, channels: 4 } })
    .trim({ threshold: 1 })
    .resize({ width: 512, withoutEnlargement: true })
    .png({ compressionLevel: 9 })
    .toFile(out);

  const meta = await sharp(out).metadata();
  console.log("wrote", out, meta.width, "x", meta.height, meta.format);
})();
