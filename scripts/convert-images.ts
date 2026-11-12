import sharp from "sharp";
import fs from "fs";
import path from "path";

const SRC = path.resolve(process.cwd(), "public/products");
const files = fs
  .readdirSync(SRC)
  .filter((f) => f.endsWith(".png") && !f.endsWith(".webp") && !f.endsWith(".avif"));

async function convert() {
  for (const file of files) {
    const src = path.join(SRC, file);
    const base = path.basename(file, ".png");

    const webpPath = path.join(SRC, `${base}.webp`);
    const avifPath = path.join(SRC, `${base}.avif`);

    if (!fs.existsSync(webpPath)) {
      await sharp(src).webp({ quality: 85 }).toFile(webpPath);
      console.log(`[webp] ${base}.webp`);
    } else {
      console.log(`[skip webp] ${base}.webp`);
    }

    if (!fs.existsSync(avifPath)) {
      try {
        await sharp(src).avif({ quality: 70 }).toFile(avifPath);
        console.log(`[avif] ${base}.avif`);
      } catch (e) {
        console.log(`[avif fail] ${base}:`, (e as Error).message);
      }
    } else {
      console.log(`[skip avif] ${base}.avif`);
    }
  }
  console.log("done");
}

convert().catch((e) => {
  console.error(e);
  process.exit(1);
});
