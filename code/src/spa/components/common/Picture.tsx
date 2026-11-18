"use client";

import { useState, type CSSProperties } from "react";

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

// Colors for placeholder backgrounds (cycled per image src)
const PLACEHOLDER_COLORS = [
  "#3d6b35", "#8b6914", "#a0522d", "#5a2d10", "#6b8e23",
  "#cd853f", "#d2691e", "#556b2f", "#8b4513", "#708090",
];

function getPlaceholderColor(src: string): string {
  let hash = 0;
  for (let i = 0; i < src.length; i++) {
    hash = ((hash << 5) - hash + src.charCodeAt(i)) | 0;
  }
  return PLACEHOLDER_COLORS[Math.abs(hash) % PLACEHOLDER_COLORS.length];
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
  const [hasError, setHasError] = useState(false);

  // If the src has no file extension, append .png
  const hasExtension = /\.(png|jpe?g|svg|webp|avif|gif)$/i.test(src);
  const imgSrc = hasExtension ? src : `${src}.png`;

  // If image fails to load (file missing), show a colored placeholder
  if (hasError) {
    const color = getPlaceholderColor(src);
    return (
      <div
        className={className}
        style={{
          backgroundColor: color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "rgba(255,255,255,0.7)",
          fontSize: "0.75rem",
          fontWeight: 500,
          textAlign: "center",
          padding: "0.5rem",
          ...(style as object),
        }}
        role="img"
        aria-label={alt}
      >
        {alt}
      </div>
    );
  }

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      width={width}
      height={height}
      style={style}
      onError={() => setHasError(true)}
      {...(fetchPriorityHigh ? { fetchPriority: "high" as const } : {})}
    />
  );
}
