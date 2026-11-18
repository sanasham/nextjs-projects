"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useI18n } from "@/spa/i18n";
import { recipeVideos, type RecipeVideo } from "@/spa/data/recipes";
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
  ChefHat,
  Utensils,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function RecipesView() {
  const { t, locale } = useI18n();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const videos = recipeVideos;
  const current = videos[currentIndex];

  const playVideo = (index: number) => {
    setCurrentIndex(index);
    setIsPlaying(true);
    setVideoError(false);
  };

  const goPrev = () => {
    setCurrentIndex((i) => (i - 1 + videos.length) % videos.length);
    setIsPlaying(true);
  };

  const goNext = () => {
    setCurrentIndex((i) => (i + 1) % videos.length);
    setIsPlaying(true);
  };

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !current) return;
    v.load();
  }, [current?.id]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !current || !isPlaying) return;
    const playPromise = v.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }
  }, [isPlaying, current?.id]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      const playPromise = v.play();
      if (playPromise !== undefined) {
        playPromise.then(() => setIsPlaying(true)).catch(() => {});
      }
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  const onEnded = () => {
    goNext();
  };

  if (!current) return null;

  const nextVideo = videos[(currentIndex + 1) % videos.length];

  const getSteps = (v: RecipeVideo) =>
    locale === "te" ? v.stepsTe : v.stepsEn;
  const getTitle = (v: RecipeVideo) =>
    locale === "te" ? v.titleTe : v.titleEn;
  const getDesc = (v: RecipeVideo) => (locale === "te" ? v.descTe : v.descEn);

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

      {/* Video player */}
      <div className="mb-6 overflow-hidden rounded-2xl border border-border bg-black shadow-lg">
        <div className="relative aspect-video w-full bg-black">
          {videoError ? (
            <div className="flex size-full flex-col items-center justify-center gap-3 bg-muted p-6 text-center">
              <Play className="size-10 text-brand-green/40" />
              <p className="text-sm font-medium text-foreground/70">
                {locale === "te"
                  ? "వీడియో లోడ్ కాలేదు."
                  : "Video not available."}
              </p>
            </div>
          ) : (
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
              onError={() => setVideoError(true)}
            >
              <source src={current.videoUrl} type="video/mp4" />
            </video>
          )}
        </div>
      </div>

      {/* Video controls bar */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1.5">
          <Button
            variant="outline"
            size="icon"
            onClick={goPrev}
            aria-label="Previous"
            className="h-10 w-10 rounded-full border-brand-green/30 hover:bg-brand-cream"
          >
            <SkipBack className="size-4" />
          </Button>
          <Button
            size="icon"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause" : "Play"}
            className="h-12 w-12 rounded-full bg-brand-green text-brand-cream hover:bg-brand-green-dark"
          >
            {isPlaying ? (
              <Pause className="size-5" />
            ) : (
              <Play className="size-5" />
            )}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={goNext}
            aria-label="Next"
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
          Video {currentIndex + 1} / {videos.length}
        </div>
      </div>

      {/* Video title + description + recipe steps */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Title + description */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h2 className="font-display text-xl font-medium text-brand-ink sm:text-2xl">
            {getTitle(current)}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {getDesc(current)}
          </p>

          {/* Up next */}
          <div className="mt-6 flex items-center justify-between gap-3 rounded-xl border border-brand-green/20 bg-brand-cream/40 p-4">
            <div className="flex min-w-0 items-center gap-3">
              <Picture
                src={nextVideo.poster}
                alt=""
                className="size-12 shrink-0 rounded-lg object-cover"
              />
              <span className="line-clamp-2 text-sm font-medium text-brand-ink">
                {getTitle(nextVideo)}
              </span>
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

        {/* Recipe steps */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h3 className="mb-4 flex items-center gap-2 font-display text-lg font-medium text-brand-green">
            <Utensils className="size-5" />
            {t("recipes.stepsTitle")}
          </h3>
          <ol className="flex flex-col gap-3">
            {getSteps(current).map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-green text-xs font-bold text-brand-cream">
                  {i + 1}
                </span>
                <span className="pt-0.5 text-sm text-foreground/90">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Demo note */}
      {/* <p className="mt-8 text-center text-xs text-muted-foreground">
        {t("recipes.note")}
      </p> */}
    </div>
  );
}
