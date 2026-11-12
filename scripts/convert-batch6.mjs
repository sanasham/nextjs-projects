// Convert real WhatsApp product photos (batch 6) to PNG/WebP/AVIF.
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const UPLOAD = "/home/z/my-project/upload";
const OUT = "/home/z/my-project/public/products";

const JOBS = [
  { name: "amla-fresh", src: "WhatsApp Image 2026-11-11 at 7.54.23 PM.jpeg" },
  { name: "atta-laddu-2", src: "WhatsApp Image 2026-11-11 at 7.54.23 PM (2).jpeg" },
  { name: "kobbari-mithai", src: "WhatsApp Image 2026-11-11 at 7.54.24 PM.jpeg" },
  { name: "tomato-pickle-real", src: "WhatsApp Image 2026-11-11 at 7.54.24 PM (1).jpeg" },
  { name: "kalakand", src: "WhatsApp Image 2026-11-11 at 7.54.26 PM (1).jpeg" },
  { name: "karapusa-3", src: "WhatsApp Image 2026-11-11 at 7.54.28 PM (1).jpeg" },
];

async function convertOne(srcPath, outBase) {
  const pngPath = path.join(OUT, `${outBase}.png`);
  const webpPath = path.join(OUT, `${outBase}.webp`);
  const avifPath = path.join(OUT, `${outBase}.avif`);
  const pipeline = sharp(srcPath)
    .rotate()
    .resize({ width: 1000, height: 1000, fit: "inside", withoutEnlargement: true })
    .flatten({ background: { r: 255, g: 255, b: 255 } });
  await pipeline.clone().png({ quality: 90 }).toFile(pngPath);
  await pipeline.clone().webp({ quality: 82 }).toFile(webpPath);
  await pipeline.clone().avif({ quality: 70 }).toFile(avifPath);
  console.log(`  -> ${outBase}.{png,webp,avif}`);
}

async function main() {
  await mkdir(OUT, { recursive: true });
  for (const job of JOBS) {
    await convertOne(path.join(UPLOAD, job.src), job.name);
  }
  console.log("Done.");
}
main().catch((e) => { console.error(e); process.exit(1); });
