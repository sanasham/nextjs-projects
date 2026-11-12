// Convert real WhatsApp product photos (batch 2) to PNG/WebP/AVIF.
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const UPLOAD = "/home/z/my-project/upload";
const OUT = "/home/z/my-project/public/products";

// Each entry: outputBaseName -> source file(s). First file is primary.
const JOBS = [
  {
    name: "mango-pickle-real",
    sources: [
      "WhatsApp Image 2026-11-11 at 7.54.09 PM (2).jpeg",
      "WhatsApp Image 2026-11-11 at 7.54.10 PM.jpeg",
    ],
  },
  {
    name: "amla-pickle-real",
    sources: ["WhatsApp Image 2026-11-11 at 7.54.09 PM (1).jpeg"],
  },
  {
    name: "nuvvula-undalu",
    sources: ["WhatsApp Image 2026-11-11 at 7.54.08 PM.jpeg"],
  },
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
    console.log(`Processing ${job.name}...`);
    for (let i = 0; i < job.sources.length; i++) {
      const outBase = i === 0 ? job.name : `${job.name}-${2}`;
      await convertOne(path.join(UPLOAD, job.sources[i]), outBase);
    }
  }
  console.log("Done.");
}

main().catch((e) => { console.error(e); process.exit(1); });
