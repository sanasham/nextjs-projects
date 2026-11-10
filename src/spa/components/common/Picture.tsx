"use client";

import type { CSSProperties } from "react";

interface PictureProps {
  /** Base image path relative to /public, e.g. "/products/mango-pickle". Extension is appended automatically. */
  src: string;
  alt: string;
  className?: string;
  /** Whether to load eagerly (above-the-fold). Defaults to lazy. */
  priority?: boolean;
  width?: number | string;
  height?: number | string;
  style?: CSSProperties;
  /** When true, sets fetchPriority="high" (for the hero LCP image). */
  fetchPriorityHigh?: boolean;
}

/**
 * Responsive-format image using <picture> with AVIF → WebP → PNG fallback.
 * Pass a path WITHOUT the extension (e.g. "/products/mango-pickle"); the
 * component resolves .avif, .webp, and .png sources automatically.
 *
 * This keeps the bundle tiny while serving modern formats to capable browsers
 * and a PNG fallback for older ones.
 */
export function Picture({
  src,
  alt,
  className,
  priority = false,
  width,
  height,
  style,
  fetchPriorityHigh = false,
}: PictureProps) {
  const base = src.replace(/\.(png|jpe?g|webp|avif)$/i, "");
  return (
    <picture>
      <source srcSet={`${base}.avif`} type="image/avif" />
      <source srcSet={`${base}.webp`} type="image/webp" />
      <img
        src={`${base}.png`}
        alt={alt}
        className={className}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        width={width}
        height={height}
        style={style}
        // fetchPriority is a valid React img prop; cast for TS strictness.
        {...(fetchPriorityHigh ? { fetchPriority: "high" as const } : {})}
      />
    </picture>
  );
}
