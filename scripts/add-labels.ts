import sharp from "sharp";
import fs from "fs";
import path from "path";

const PRODUCTS_DIR = path.resolve(process.cwd(), "public/products");
const LABEL_SVG = path.resolve(process.cwd(), "public/brand/devi-pickles-label.svg");

const SKIP = new Set([
  "cat-pickles",
  "cat-snacks",
  "cat-sweets",
  "cat-spices",
  "hero",
  "about-story",
  "spice-powder",
]);

async function compositeLabel(name: string) {
  const base = path.join(PRODUCTS_DIR, name);
  const pngPath = `${base}.png`;
  if (!fs.existsSync(pngPath)) return;

  const src = sharp(pngPath);
  const meta = await src.metadata();
  const w = meta.width ?? 1024;
  const h = meta.height ?? 1024;

  // Compact corner badge — ~30% of image width, placed bottom-left.
  const labelW = Math.round(w * 0.32);
  const labelH = Math.round(labelW * (80 / 320));
  const margin = Math.round(w * 0.03);
  const x = margin;
  const y = h - labelH - margin;

  // Soft shadow.
  const shadowSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${labelW + 16}" height="${labelH + 16}"><rect x="8" y="8" width="${labelW}" height="${labelH}" rx="8" fill="black" opacity="0.3"/></svg>`;
  const shadowBuf = await sharp(Buffer.from(shadowSvg)).png().toBuffer();

  const labelBuf = await sharp(LABEL_SVG)
    .resize(labelW, labelH)
    .png()
    .toBuffer();

  await src
    .composite([
      { input: shadowBuf, left: x - 8, top: y - 8, blend: "over" },
      { input: labelBuf, left: x, top: y, blend: "over" },
    ])
    .png()
    .toFile(`${base}.labeled.png`);

  fs.renameSync(`${base}.labeled.png`, pngPath);

  await sharp(pngPath).webp({ quality: 85 }).toFile(`${base}.webp`);
  await sharp(pngPath).avif({ quality: 70 }).toFile(`${base}.avif`);

  console.log(`[labeled] ${name}`);
}

async function main() {
  const files = fs
    .readdirSync(PRODUCTS_DIR)
    .filter((f) => f.endsWith(".png"))
    .map((f) => path.basename(f, ".png"));

  for (const name of files) {
    if (SKIP.has(name)) {
      console.log(`[skip] ${name}`);
      continue;
    }
    try {
      await compositeLabel(name);
    } catch (e) {
      console.error(`[fail] ${name}:`, (e as Error).message);
    }
  }
  console.log("DONE");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
