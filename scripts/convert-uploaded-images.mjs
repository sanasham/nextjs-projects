// Convert the 6 uploaded WhatsApp product photos to PNG/WebP/AVIF
// and place them in public/products/ with clean, semantic names.
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const UPLOAD = "/home/z/my-project/upload";
const OUT = "/home/z/my-project/public/products";

// Map: [sourceFile(s)] -> outputBaseName
// Each output base produces .png (fallback) + .webp + .avif
const JOBS = [
  {
    name: "karapusa",
    sources: [
      "WhatsApp Image 2026-11-11 at 7.52.40 PM.jpeg",
      "WhatsApp Image 2026-11-11 at 7.52.40 PM (1).jpeg",
    ],
    // single primary image, both angles -> karapusa + karapusa-2
    splitAngles: true,
  },
  {
    name: "palli-bellam-undalu",
    sources: [
      "WhatsApp Image 2026-11-11 at 7.53.02 PM.jpeg",
      "WhatsApp Image 2026-11-11 at 7.53.02 PM (1).jpeg",
    ],
    splitAngles: true,
  },
  {
    name: "curry-leaf-powder-real",
    sources: [
      "WhatsApp Image 2026-11-11 at 7.53.03 PM.jpeg",
      "WhatsApp Image 2026-11-11 at 7.53.03 PM (1).jpeg",
    ],
    splitAngles: true,
  },
];

async function ensureOut() {
  await mkdir(OUT, { recursive: true });
}

async function convertOne(srcPath, outBase) {
  const pngPath = path.join(OUT, `${outBase}.png`);
  const webpPath = path.join(OUT, `${outBase}.webp`);
  const avifPath = path.join(OUT, `${outBase}.avif`);

  // Resize to a max dimension of 1000px (keep aspect), flatten onto white
  // background so transparent edges don't show black in jpg-derived pngs.
  const pipeline = sharp(srcPath)
    .rotate() // honor EXIF orientation
    .resize({ width: 1000, height: 1000, fit: "inside", withoutEnlargement: true })
    .flatten({ background: { r: 255, g: 255, b: 255 } });

  await pipeline.clone().png({ quality: 90 }).toFile(pngPath);
  await pipeline.clone().webp({ quality: 82 }).toFile(webpPath);
  await pipeline.clone().avif({ quality: 70 }).toFile(avifPath);

  console.log(`  -> ${outBase}.{png,webp,avif}`);
}

async function main() {
  await ensureOut();
  for (const job of JOBS) {
    console.log(`Processing ${job.name}...`);
    if (job.splitAngles) {
      // First source -> base name, second source -> base name + "-2"
      await convertOne(path.join(UPLOAD, job.sources[0]), job.name);
      if (job.sources[1]) {
        await convertOne(path.join(UPLOAD, job.sources[1]), `${job.name}-2`);
      }
    } else {
      for (const s of job.sources) {
        await convertOne(path.join(UPLOAD, s), job.name);
      }
    }
  }
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
