"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { GalleryImage } from "@/content/gallery";
import { cn } from "@/lib/utils";

const ASPECT_CLASSES = ["aspect-[3/4]", "aspect-square", "aspect-[4/5]", "aspect-[5/4]"];

export function GalleryLightbox({ images }: { images: GalleryImage[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const showPrev = useCallback(
    () => setOpenIndex((current) => (current === null ? current : (current - 1 + images.length) % images.length)),
    [images.length]
  );
  const showNext = useCallback(
    () => setOpenIndex((current) => (current === null ? current : (current + 1) % images.length)),
    [images.length]
  );

  useEffect(() => {
    if (openIndex === null) return;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") showPrev();
      if (event.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", handleKeydown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [openIndex, close, showPrev, showNext]);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
        {images.map((image, index) => {
          const isFeatured = image.src.endsWith("machine-03.jpg");
          return (
            <button
              key={image.src}
              type="button"
              onClick={() => setOpenIndex(index)}
              className={cn(
                "group relative overflow-hidden rounded-3xl border border-hairline bg-paper shadow-[0_1px_2px_rgba(20,23,28,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(11,42,99,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2",
                ASPECT_CLASSES[index % ASPECT_CLASSES.length],
                isFeatured && "col-span-2 row-span-2 aspect-square sm:aspect-[4/5]"
              )}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                loading={isFeatured ? undefined : "lazy"}
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/80 via-navy-950/0 to-navy-950/0 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="text-sm font-semibold text-cream">{image.caption}</span>
              </div>
            </button>
          );
        })}
      </div>

      {openIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={images[openIndex].caption}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-navy-950/95 p-4 backdrop-blur-sm sm:p-8"
          onClick={close}
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 text-cream transition-colors hover:bg-cream/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          <button
            type="button"
            aria-label="Previous image"
            onClick={(event) => {
              event.stopPropagation();
              showPrev();
            }}
            className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-cream/20 text-cream transition-colors hover:bg-cream/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 sm:left-6"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            type="button"
            aria-label="Next image"
            onClick={(event) => {
              event.stopPropagation();
              showNext();
            }}
            className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-cream/20 text-cream transition-colors hover:bg-cream/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 sm:right-6"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div
            className="relative flex h-full max-h-[80vh] w-full max-w-4xl flex-col items-center gap-4"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative h-full w-full">
              <Image
                src={images[openIndex].src}
                alt={images[openIndex].alt}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </div>
            <p className="text-center text-sm font-medium text-cream/70">{images[openIndex].caption}</p>
          </div>
        </div>
      )}
    </>
  );
}
