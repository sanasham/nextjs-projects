/**
 * Official WhatsApp logo as an inline SVG.
 *
 * Renders the complete branded mark — the WhatsApp green rounded-square with
 * the white phone-in-speech-bubble glyph — so it always looks like the real
 * WhatsApp logo regardless of the surrounding button/background colour.
 *
 * `className` controls the rendered size (width/height). The logo keeps its
 * official WhatsApp green (#25D366) and white palette internally.
 *
 * Use `monochrome` prop when you need a single-colour glyph (e.g. on a
 * coloured button where the icon should match the text colour).
 */
interface WhatsAppIconProps {
  className?: string;
  /** Render as a single-colour glyph using currentColor (for coloured buttons). */
  monochrome?: boolean;
}

export function WhatsAppIcon({ className, monochrome = false }: WhatsAppIconProps) {
  if (monochrome) {
    // Single-colour glyph (uses currentColor) — for buttons that already
    // provide their own background colour.
    return (
      <svg
        viewBox="0 0 32 32"
        fill="currentColor"
        className={className}
        aria-hidden="true"
        focusable="false"
        shapeRendering="geometricPrecision"
      >
        <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.128 6.744 3.046 9.378L1.05 31.282l6.114-1.952A15.9 15.9 0 0 0 16.004 32C24.826 32 32 24.824 32 16S24.826 0 16.004 0zm9.32 22.6c-.386 1.09-1.918 1.994-3.14 2.258-.836.178-1.928.32-5.604-1.204-4.704-1.948-7.73-6.726-7.962-7.032-.222-.306-1.9-2.526-1.9-4.818 0-2.292 1.206-3.42 1.672-3.898.386-.396.834-.6 1.116-.9.282-.3.426-.55.6-.9.182-.36.092-.676-.046-.952-.134-.276-1.206-2.91-1.652-3.982-.434-1.042-.876-.9-1.206-.916l-1.026-.018c-.356 0-.934.134-1.422.636-.488.502-1.862 1.818-1.862 4.426 0 2.608 1.9 5.126 2.166 5.482.266.356 3.762 5.748 9.112 8.066 3.392 1.47 4.726 1.596 6.418 1.34 1.028-.154 3.14-1.284 3.582-2.526.442-1.242.442-2.304.31-2.526-.13-.222-.488-.356-1.026-.624z" />
      </svg>
    );
  }

  // Full branded logo — green rounded square with white phone-in-bubble.
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      aria-hidden="true"
      focusable="false"
      shapeRendering="geometricPrecision"
    >
      {/* Green rounded square background */}
      <rect width="48" height="48" rx="11" fill="#25D366" />
      {/* White phone-in-speech-bubble glyph, centered with padding */}
      <g transform="translate(9.5 9.5) scale(0.96)">
        <path
          fill="#FFFFFF"
          d="M14.05 0C6.29 0 0 6.29 0 14.05c0 2.47.65 4.85 1.88 6.95L0 29l8.2-1.85a13.97 13.97 0 0 0 5.85 1.28h.01c7.76 0 14.05-6.29 14.05-14.05C29.11 6.29 22.81 0 14.05 0zm8.2 19.86c-.34.96-1.99 1.84-2.78 1.96-.71.1-1.61.14-2.6-.16-.6-.19-1.37-.44-2.36-.87-4.15-1.79-6.85-5.96-7.06-6.24-.2-.27-1.68-2.23-1.68-4.25 0-2.02 1.06-3.02 1.44-3.43.38-.41.82-.51 1.09-.51.27 0 .55 0 .79.01.25.01.6-.1.93.71.34.82 1.16 2.84 1.27 3.04.1.2.17.43.03.7-.14.27-.21.44-.41.68-.21.24-.44.53-.63.71-.21.21-.42.43-.18.85.24.41 1.06 1.74 2.28 2.82 1.57 1.4 2.89 1.83 3.31 2.04.41.21.65.17.89-.1.24-.27 1.02-1.19 1.29-1.6.27-.41.54-.34.89-.2.35.14 2.23 1.05 2.61 1.24.38.19.63.28.73.44.1.17.1.96-.24 1.92z"
        />
      </g>
    </svg>
  );
}
