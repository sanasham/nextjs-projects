/**
 * Convert product images for the Devi Pickles store.
 *
 * Reads JPEG/PNG sources from the `upload/` directory (or any folder),
 * resizes to max 1000px, flattens onto white, and writes PNG + WebP + AVIF
 * variants to `public/products/` so they work with the <Picture> component.
 *
 * Usage:
 *   node scripts/convert-products.mjs                        # convert all files in upload/
 *   node scripts/convert-products.mjs upload/photo.jpeg      # convert one file
 *   node scripts/convert-products.mjs upload/a.jpeg out-name # convert one file with custom name
 *
 * To generate AI images instead, use the z-ai CLI:
 *   z-ai image -p "..." -o /tmp/name.png -s 1024x1024
 *   node scripts/convert-products.mjs /tmp/name.png name
 */
import sharp from "sharp";
import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";

const DEFAULT_INPUT = "/home/z/my-project/upload";
const OUTPUT_DIR = "/home/z/my-project/public/products";
const MAX_DIMENSION = 1000;

async function convert(srcPath, outBase) {
  const png = path.join(OUTPUT_DIR, `${outBase}.png`);
  const webp = path.join(OUTPUT_DIR, `${outBase}.webp`);
  const avif = path.join(OUTPUT_DIR, `${outBase}.avif`);

  const pipeline = sharp(srcPath)
    .rotate() // honor EXIF orientation from phone photos
    .resize({
      width: MAX_DIMENSION,
      height: MAX_DIMENSION,
      fit: "inside",
      withoutEnlargement: true,
    })
    .flatten({ background: { r: 255, g: 255, b: 255 } });

  await pipeline.clone().png({ quality: 90 }).toFile(png);
  await pipeline.clone().webp({ quality: 82 }).toFile(webp);
  await pipeline.clone().avif({ quality: 70 }).toFile(avif);
  console.log(`  ${outBase}.png / .webp / .avif`);
}

function slugify(filename) {
  return filename
    .replace(/\.(jpe?g|png|webp|avif)$/i, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });
  const args = process.argv.slice(2);

  // Single file: node script.mjs <src> [outName]
  if (args.length >= 1 && (args[0].endsWith(".jpeg") || args[0].endsWith(".jpg") || args[0].endsWith(".png"))) {
    const src = path.resolve(args[0]);
    const outBase = args[1] || slugify(path.basename(src));
    await convert(src, outBase);
    console.log("Done.");
    return;
  }

  // Batch: convert all images in the input directory
  const inputDir = args[0] || DEFAULT_INPUT;
  const files = (await readdir(inputDir)).filter((f) =>
    /\.(jpe?g|png)$/i.test(f)
  );

  if (files.length === 0) {
    console.log(`No images found in ${inputDir}`);
    return;
  }

  console.log(`Converting ${files.length} images from ${inputDir}…`);
  for (const file of files) {
    const outBase = slugify(file);
    await convert(path.join(inputDir, file), outBase);
  }
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
