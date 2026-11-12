// Convert AI-generated PNG product images to PNG/WebP/AVIF (resized to 1000px).
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const TMP = "/tmp";
const OUT = "/home/z/my-project/public/products";

const NAMES = ["magaya", "bellam-avakaya"];

async function convert(name) {
  const src = path.join(TMP, `${name}.png`);
  const pngPath = path.join(OUT, `${name}.png`);
  const webpPath = path.join(OUT, `${name}.webp`);
  const avifPath = path.join(OUT, `${name}.avif`);
  const pipeline = sharp(src)
    .resize({ width: 1000, height: 1000, fit: "inside", withoutEnlargement: true })
    .flatten({ background: { r: 255, g: 255, b: 255 } });
  await pipeline.clone().png({ quality: 90 }).toFile(pngPath);
  await pipeline.clone().webp({ quality: 82 }).toFile(webpPath);
  await pipeline.clone().avif({ quality: 70 }).toFile(avifPath);
  console.log(`  -> ${name}.{png,webp,avif}`);
}

async function main() {
  await mkdir(OUT, { recursive: true });
  for (const n of NAMES) await convert(n);
  console.log("Done.");
}
main().catch((e) => { console.error(e); process.exit(1); });
