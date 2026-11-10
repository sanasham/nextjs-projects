# Devi Pickles — Source Download

This folder contains clean, validated archives of the project source code.

## Why the full-project download fails

The full project is ~1.5 GB because of `node_modules/` (1.3 GB) and `.next/` (build cache). When the platform zips the entire project, the archive stream is truncated, producing a corrupted/incomplete file that throws:

```
gzip: stdin: unexpected end of file
tar: Unexpected EOF in archive
```

## Use these validated archives instead

Both archives below contain the complete source code (182 files, 6 MB) **excluding** `node_modules`, `.next`, logs, and uploads — they are tested and verified valid.

| File | Size | Verify command |
|---|---|---|
| `devi-pickles-source.tar.gz` | 6.0 MB | `gzip -t devi-pickles-source.tar.gz` → `OK` |
| `devi-pickles-source.zip` | 6.0 MB | `unzip -t devi-pickles-source.zip` → `No errors detected` |

## How to extract & run

```bash
# Option A: tar.gz
tar -xzf devi-pickles-source.tar.gz -C devi-pickles
cd devi-pickles

# Option B: zip
unzip devi-pickles-source.zip -d devi-pickles
cd devi-pickles

# Then install & run
bun install        # or npm install
bun run dev        # starts on http://localhost:3000
```

## What's included

- `src/` — full storefront SPA (app shell, features, components, data, i18n, store, utils, config, types)
- `public/` — favicon + all product/category/hero images (PNG + WebP + AVIF)
- `scripts/` — image generation & WebP/AVIF conversion scripts
- `prisma/` — schema
- `README.md`, `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `postcss.config.mjs`, `components.json`, `eslint.config.mjs`, `vitest.config.ts`

## What's excluded (regeneratable)

- `node_modules/` — reinstall with `bun install`
- `.next/` — build cache, regenerated on `bun run dev` / `bun run build`
- `dev.log`, `server.log`, `db/`, `upload/`, `tests/`, `skills/`
