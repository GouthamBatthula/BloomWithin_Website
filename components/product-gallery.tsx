
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  {
    src: "/products/bloom-diary/cover.png",
    alt: "Bloom Diary front cover",
  },
  {
    src: "/products/bloom-diary/style1.png",
    alt: "Bloom Diary lifestyle",
  },
  {
    src: "/products/bloom-diary/style2.png",
    alt: "Bloom Diary product photography",
  },
  {
    src: "/products/bloom-diary/detail.png",
    alt: "Bloom Diary close-up details",
  },
];

export default function ProductGallery() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const goToSlide = useCallback((index: number) => {
    const slider = sliderRef.current;
    if (!slider) return;

    const nextIndex = (index + images.length) % images.length;

    slider.scrollTo({
      left: nextIndex * slider.clientWidth,
      behavior: "smooth",
    });

    indexRef.current = nextIndex;
    setCurrentIndex(nextIndex);
  }, []);

  const handleScroll = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    const index = Math.round(
      slider.scrollLeft / slider.clientWidth
    );

    indexRef.current = index;
    setCurrentIndex(index);
  };

  // Automatic image sliding
  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      goToSlide(indexRef.current + 1);
    }, 3500);

    return () => clearInterval(interval);
  }, [paused, goToSlide]);

  return (
    <div
      className="w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setPaused(false);
        }
      }}
    >
      {/* IMAGE SLIDER */}
      <div className="relative overflow-hidden rounded-2xl bg-[var(--soft-pink)]">

        <div
          ref={sliderRef}
          onScroll={handleScroll}
          className="flex aspect-[4/5] w-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none" }}
        >
          {images.map((image) => (
            <div
              key={image.src}
              className="h-full w-full flex-none snap-center"
            >
              <img
                src={image.src}
                alt={image.alt}
                draggable={false}
                className="h-full w-full select-none object-cover"
              />
            </div>
          ))}
        </div>

        {/* PREVIOUS BUTTON */}
        <button
          type="button"
          onClick={() => goToSlide(currentIndex - 1)}
          aria-label="Previous image"
          className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[var(--ink)] shadow-md transition hover:bg-white"
        >
          <ChevronLeft size={22} />
        </button>

        {/* NEXT BUTTON */}
        <button
          type="button"
          onClick={() => goToSlide(currentIndex + 1)}
          aria-label="Next image"
          className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[var(--ink)] shadow-md transition hover:bg-white"
        >
          <ChevronRight size={22} />
        </button>

        {/* IMAGE COUNTER */}
        <div className="absolute bottom-4 right-4 rounded-full bg-black/55 px-3 py-1.5 text-xs text-white">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* SLIDE INDICATORS */}
      <div className="mt-5 flex items-center justify-center gap-2">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => goToSlide(index)}
            aria-label={`Go to image ${index + 1}`}
            aria-current={currentIndex === index ? "true" : undefined}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentIndex === index
                ? "w-8 bg-[var(--pink)]"
                : "w-2 bg-[var(--border)] hover:bg-[var(--orange)]"
            }`}
          />
        ))}
      </div>

      <p className="mt-3 text-center text-xs text-[var(--muted)]">
        Swipe to explore the Bloom Diary
      </p>
    </div>
  );
}
