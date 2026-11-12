// Convert real WhatsApp product photos (batch 8) to PNG/WebP/AVIF.
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const UPLOAD = "/home/z/my-project/upload";
const OUT = "/home/z/my-project/public/products";

const JOBS = [
  { name: "kajjikayalu-3", src: "WhatsApp Image 2026-11-11 at 7.55.45 PM (3).jpeg" },
  { name: "mango-pickle-4-jars", src: "WhatsApp Image 2026-11-11 at 7.55.45 PM.jpeg" },
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
