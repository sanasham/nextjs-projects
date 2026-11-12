"use client";

import type { CSSProperties } from "react";

interface PictureProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  width?: number | string;
  height?: number | string;
  style?: CSSProperties;
  fetchPriorityHigh?: boolean;
}

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
        {...(fetchPriorityHigh ? { fetchPriority: "high" as const } : {})}
      />
    </picture>
  );
}
