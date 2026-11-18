"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  children?: ReactNode;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
  children,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow ? (
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-terracotta">
          <span className="h-px w-6 bg-brand-terracotta/40" aria-hidden />
          {eyebrow}
        </span>
      ) : null}
      <h2 className="font-display text-2xl font-medium text-brand-green sm:text-3xl md:text-4xl text-balance">
        {title}
      </h2>
      {subtitle ? (
        <p className="max-w-2xl text-sm text-muted-foreground sm:text-base text-balance">
          {subtitle}
        </p>
      ) : null}
      {children}
    </div>
  );
}
