"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useI18n } from "@/spa/i18n";
import { Link } from "@/spa/router";
import { recipeVideos } from "@/spa/data/recipes";
import { categories } from "@/spa/data/categories";
import { Picture } from "@/spa/components/common/Picture";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronRight,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Clock,
  ListVideo,
  ChefHat,
  Utensils,
  ShoppingCart,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { CategoryId } from "@/spa/types";

export function RecipesView() {
  const { t, locale } = useI18n();
  const [activeCat, setActiveCat] = useState<CategoryId | "all">("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Filter videos by category
  const filtered = useMemo(() => {
    if (activeCat === "all") return recipeVideos;
    return recipeVideos.filter((r) => r.categoryId === activeCat);
  }, [activeCat]);

  // Clamp index if filtered list shrinks
  const safeIndex = Math.min(currentIndex, filtered.length - 1);
  const current = filtered[safeIndex];

  const selectCategory = (cat: CategoryId | "all") => {
    setActiveCat(cat);
    setCurrentIndex(0);
  };

  const playVideo = (index: number) => {
    setCurrentIndex(index);
    setIsPlaying(true);
  };

  const goPrev = () => {
    if (filtered.length === 0) return;
    setCurrentIndex((i) => (i - 1 + filtered.length) % filtered.length);
    setIsPlaying(true);
  };

  const goNext = () => {
    if (filtered.length === 0) return;
    setCurrentIndex((i) => (i + 1) % filtered.length);
    setIsPlaying(true);
  };

  // When the active video changes, load and auto-play if requested
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !current) return;
    v.load();
    if (isPlaying) {
      v.play().catch(() => {
        /* autoplay may be blocked; user can press play */
      });
    }
  }, [current?.id]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  const onEnded = () => {
    // Auto-advance to next video ("one by one")
    goNext();
  };

  const catTabs: { id: CategoryId | "all"; label: string }[] = [
    { id: "all", label: t("recipes.allCategories") },
    ...categories.map((c) => ({
      id: c.id,
      label: locale === "te" ? c.nameTe : c.nameEn,
    })),
  ];

  if (!current) return null;

  const nextVideo = filtered[(safeIndex + 1) % filtered.length];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 animate-fade-in">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-3">
        <Badge className="w-fit gap-1.5 rounded-full bg-brand-cream px-3 py-1.5 text-xs font-semibold text-brand-terracotta">
          <ChefHat className="size-3.5" />
          {t("recipes.badge")}
        </Badge>
        <h1 className="font-display text-3xl font-medium text-brand-green sm:text-4xl">
          {t("recipes.title")}
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
          {t("recipes.subtitle")}
        </p>
      </div>

      {/* Category tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {catTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => selectCategory(tab.id)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors",
              activeCat === tab.id
                ? "bg-brand-green text-brand-cream"
                : "border border-border bg-background text-foreground hover:bg-brand-cream"
            )}
            aria-pressed={activeCat === tab.id}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main grid: video player + playlist */}
      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        {/* LEFT: Video player + details */}
        <div className="flex flex-col gap-4">
          {/* Video player */}
          <div className="overflow-hidden rounded-2xl border border-border bg-black shadow-lg">
            <div className="relative aspect-video w-full bg-black">
              <video
                ref={videoRef}
                key={current.id}
                className="size-full object-contain"
                poster={current.poster}
                controls
                playsInline
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={onEnded}
              >
                <source src={current.videoUrl} type="video/mp4" />
              </video>
            </div>
          </div>

          {/* Video controls bar */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5">
              <Button
                variant="outline"
                size="icon"
                onClick={goPrev}
                aria-label={t("recipes.previous")}
                className="h-10 w-10 rounded-full border-brand-green/30 hover:bg-brand-cream"
              >
                <SkipBack className="size-4" />
              </Button>
              <Button
                size="icon"
                onClick={togglePlay}
                aria-label={isPlaying ? t("recipes.pause") : t("recipes.play")}
                className="h-12 w-12 rounded-full bg-brand-green text-brand-cream hover:bg-brand-green-dark"
              >
                {isPlaying ? <Pause className="size-5" /> : <Play className="size-5" />}
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={goNext}
                aria-label={t("recipes.next")}
                className="h-10 w-10 rounded-full border-brand-green/30 hover:bg-brand-cream"
              >
                <SkipForward className="size-4" />
              </Button>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="size-3.5" />
              <span>{current.durationLabel}</span>
            </div>
            <div className="ml-auto text-xs text-muted-foreground">
              {t("recipes.videoOf")} {safeIndex + 1} / {filtered.length}
            </div>
          </div>

          {/* Title + description */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <h2 className="font-display text-xl font-medium text-brand-ink sm:text-2xl">
              {locale === "te" ? current.titleTe : current.titleEn}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {locale === "te" ? current.descTe : current.descEn}
            </p>
            <div className="mt-4">
              <Link to={`#/product/${current.productSlug}`}>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-brand-green text-brand-green hover:bg-brand-cream"
                >
                  <ShoppingCart className="size-4" />
                  {t("recipes.buyProduct")}
                </Button>
              </Link>
            </div>
          </div>

          {/* Recipe steps */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <h3 className="mb-4 flex items-center gap-2 font-display text-lg font-medium text-brand-green">
              <Utensils className="size-5" />
              {t("recipes.stepsTitle")}
            </h3>
            <ol className="flex flex-col gap-3">
              {(locale === "te" ? current.stepsTe : current.stepsEn).map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-green text-xs font-bold text-brand-cream">
                    {i + 1}
                  </span>
                  <span className="pt-0.5 text-sm text-foreground/90">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Up next */}
          <div className="flex items-center justify-between gap-3 rounded-2xl border border-brand-green/20 bg-brand-cream/40 p-4">
            <div className="flex min-w-0 items-center gap-3">
              <span className="hidden shrink-0 text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:inline">
                {t("recipes.upNext")}
              </span>
              <div className="flex min-w-0 items-center gap-2">
                <Picture
                  src={nextVideo.poster}
                  alt=""
                  className="size-12 shrink-0 rounded-lg object-cover"
                />
                <span className="line-clamp-2 text-sm font-medium text-brand-ink">
                  {locale === "te" ? nextVideo.titleTe : nextVideo.titleEn}
                </span>
              </div>
            </div>
            <Button
              onClick={goNext}
              size="sm"
              className="shrink-0 bg-brand-green text-brand-cream hover:bg-brand-green-dark"
            >
              {t("recipes.next")}
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>

        {/* RIGHT: Playlist */}
        <div className="flex flex-col rounded-2xl border border-border bg-card shadow-sm">
          <div className="flex items-center gap-2 border-b border-border px-4 py-3">
            <ListVideo className="size-5 text-brand-green" />
            <h3 className="font-display text-base font-medium text-brand-ink">
              {t("recipes.playlist")}
            </h3>
            <span className="ml-auto text-xs text-muted-foreground">
              {filtered.length} {t("recipes.videos")}
            </span>
          </div>
          {/* Scrollable video list */}
          <div className="max-h-[600px] overflow-y-auto p-2 lg:max-h-[700px]">
            {filtered.map((v, i) => {
              const isActive = i === safeIndex;
              return (
                <button
                  key={v.id}
                  onClick={() => playVideo(i)}
                  className={cn(
                    "mb-1.5 flex w-full items-start gap-3 rounded-xl p-2.5 text-left transition-colors",
                    isActive
                      ? "bg-brand-cream ring-1 ring-brand-green/30"
                      : "hover:bg-muted/60"
                  )}
                  aria-current={isActive ? "true" : undefined}
                >
                  {/* Thumbnail with play icon */}
                  <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                    <Picture
                      src={v.poster}
                      alt=""
                      className="size-full object-cover"
                    />
                    <span className="absolute inset-0 flex items-center justify-center bg-black/30">
                      {isActive && isPlaying ? (
                        <Pause className="size-5 text-white" />
                      ) : (
                        <Play className="size-5 text-white" fill="currentColor" />
                      )}
                    </span>
                    <span className="absolute bottom-0.5 right-0.5 rounded bg-black/80 px-1 text-[9px] font-medium text-white">
                      {v.durationLabel}
                    </span>
                  </div>
                  {/* Title */}
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5 pt-0.5">
                    <span
                      className={cn(
                        "line-clamp-2 text-xs font-medium leading-snug sm:text-sm",
                        isActive ? "text-brand-green" : "text-foreground"
                      )}
                    >
                      {locale === "te" ? v.titleTe : v.titleEn}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {i + 1} / {filtered.length}
                    </span>
                  </div>
                  {/* Active indicator */}
                  {isActive && (
                    <ChevronRight className="mt-1 size-4 shrink-0 text-brand-green" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Demo note */}
      <p className="mt-8 text-center text-xs text-muted-foreground">
        {t("recipes.note")}
      </p>
    </div>
  );
}
