const sharp = require("sharp");

const brand = "#673DE6";

// Wordmark logo: transparent background, brand purple glyphs (primary)
const wordmark = `
<svg xmlns="http://www.w3.org/2000/svg" width="720" height="160" viewBox="0 0 720 160">
  <g>
    <circle cx="76" cy="80" r="52" fill="none" stroke="${brand}" stroke-width="14"/>
    <path d="M76 34 L76 80 L112 104" fill="none" stroke="${brand}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="150" y="112" font-family="Arial, Helvetica, sans-serif" font-size="82" font-weight="700" letter-spacing="4" fill="${brand}">ORYNTAL</text>
  </g>
</svg>`;

// Icon: square, brand background, white compass mark
const icon = `
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="96" fill="${brand}"/>
  <circle cx="256" cy="256" r="132" fill="none" stroke="#ffffff" stroke-width="34"/>
  <path d="M256 138 L256 256 L344 310" fill="none" stroke="#ffffff" stroke-width="34" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

async function main() {
  await sharp(Buffer.from(wordmark))
    .png({ compressionLevel: 9 })
    .toFile("public/logo.png");
  await sharp(Buffer.from(wordmark))
    .resize(1200, 630, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toFile("public/og.png");
  await sharp(Buffer.from(icon)).png({ compressionLevel: 9 }).toFile("app/icon.png");
  await sharp(Buffer.from(icon)).resize(180, 180).png().toFile("app/apple-icon.png");

  const meta = await sharp("public/logo.png").metadata();
  console.log("logo.png", meta.width, "x", meta.height, meta.format);
  console.log("icon/apple/og written");
}

main().catch((e) => {
  console.error("ERR", e.message);
  process.exit(1);
});
