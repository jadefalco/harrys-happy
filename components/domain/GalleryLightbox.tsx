"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { GalleryImage } from "@/content/gallery";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const FEATURED_COUNT = 2;
const ROW_COUNT = 3;
const REST_CAP = 3;

// A photo counts as landscape/portrait once it clears this threshold —
// used only to nudge tied pairs toward whichever shape reads best in a
// wide, side-by-side featured row.
const LANDSCAPE_RATIO = 1.15;
const PORTRAIT_RATIO = 0.9;

interface LayoutEntry {
  image: GalleryImage;
  index: number;
  ratio: number;
  area: number;
}

function toEntries(images: GalleryImage[]): LayoutEntry[] {
  return images.map((image, index) => ({
    image,
    index,
    ratio: image.width / image.height,
    area: image.width * image.height,
  }));
}

function byOriginalOrder(a: LayoutEntry, b: LayoutEntry) {
  return a.index - b.index;
}

function median(values: number[]) {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

function orientationBonus(ratio: number) {
  if (ratio >= LANDSCAPE_RATIO) return 4_000_000;
  if (ratio <= PORTRAIT_RATIO) return 0;
  return 2_000_000;
}

/**
 * Picks two photos to lead as equally-sized featured images, three to fill
 * the row below, and leaves the rest to be centered underneath — driven by
 * each photo's real resolution and aspect ratio, not file order, so a
 * repeat client won't get an oddly-cropped or low-quality shot up top.
 *
 * The featured pair is chosen for combined resolution first, with a
 * penalty for mismatched aspect ratios (since both share one box at equal
 * width and height) and a small bonus toward landscape shapes, which read
 * better in a wide, side-by-side row than a very tall portrait pair would.
 */
function selectGridLayout(images: GalleryImage[]) {
  const entries = toEntries(images);
  if (entries.length === 0) {
    return { featured: [] as LayoutEntry[], row: [] as LayoutEntry[], rest: [] as LayoutEntry[], overflow: [] as LayoutEntry[] };
  }

  let featured: LayoutEntry[];
  if (entries.length <= FEATURED_COUNT) {
    featured = entries;
  } else {
    let best: { pair: [LayoutEntry, LayoutEntry]; score: number } | null = null;
    for (let i = 0; i < entries.length; i++) {
      for (let j = i + 1; j < entries.length; j++) {
        const a = entries[i];
        const b = entries[j];
        const ratioDiff = Math.abs(a.ratio - b.ratio);
        const score = a.area + b.area - ratioDiff * 20_000_000 + orientationBonus(a.ratio) + orientationBonus(b.ratio);
        if (!best || score > best.score) best = { pair: [a, b], score };
      }
    }
    featured = best!.pair;
  }

  const featuredIndexes = new Set(featured.map((entry) => entry.index));
  const remaining = entries.filter((entry) => !featuredIndexes.has(entry.index));

  let row: LayoutEntry[];
  if (remaining.length <= ROW_COUNT) {
    row = remaining;
  } else {
    const med = median(remaining.map((entry) => entry.ratio));
    row = [...remaining]
      .sort((a, b) => Math.abs(a.ratio - med) - Math.abs(b.ratio - med) || b.area - a.area)
      .slice(0, ROW_COUNT);
  }

  const rowIndexes = new Set(row.map((entry) => entry.index));
  const leftover = remaining.filter((entry) => !rowIndexes.has(entry.index));

  return {
    featured: [...featured].sort(byOriginalOrder),
    row: [...row].sort(byOriginalOrder),
    rest: leftover.slice(0, REST_CAP).sort(byOriginalOrder),
    overflow: leftover.slice(REST_CAP).sort(byOriginalOrder),
  };
}

const TILE_CLASSES =
  "group relative block w-full overflow-hidden rounded-[2rem] bg-paper shadow-[0_8px_24px_-14px_rgba(11,42,99,0.14)] transition-shadow duration-500 ease-out hover:shadow-[0_20px_44px_-18px_rgba(11,42,99,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2";

function GalleryTile({
  image,
  index,
  style,
  aspectClassName,
  sizes,
  onOpen,
  wrapperClassName,
}: {
  image: GalleryImage;
  index: number;
  style?: CSSProperties;
  aspectClassName?: string;
  sizes: string;
  onOpen: (index: number) => void;
  wrapperClassName?: string;
}) {
  return (
    <Reveal delay={index * 0.05} className={wrapperClassName}>
      <figure>
        <button
          type="button"
          onClick={() => onOpen(index)}
          style={style}
          className={cn(TILE_CLASSES, aspectClassName)}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            loading="lazy"
            sizes={sizes}
            className="object-contain transition-transform duration-500 ease-out group-hover:scale-[1.02]"
          />
        </button>
        {image.caption && (
          <figcaption className="mt-2.5 text-xs font-normal text-slate-light/80">
            {image.caption}
          </figcaption>
        )}
      </figure>
    </Reveal>
  );
}

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

  const { featured, row, rest, overflow } = selectGridLayout(images);
  const featuredRatio = featured.length > 0 ? featured.reduce((sum, e) => sum + e.ratio, 0) / featured.length : 4 / 3;
  const rowRatio = row.length > 0 ? row.reduce((sum, e) => sum + e.ratio, 0) / row.length : 4 / 3;
  const secondary = [...row, ...rest];

  return (
    <>
      {/* Desktop / tablet: symmetrical grid — two equal featured images, a
          row of three, then any remainder centered beneath. */}
      <div className="hidden lg:block">
        {featured.length > 0 && (
          <div
            className={cn(
              "grid gap-8",
              featured.length === 2 ? "grid-cols-2" : "grid-cols-1 justify-items-center"
            )}
          >
            {featured.map((entry) => (
              <GalleryTile
                key={entry.image.src}
                image={entry.image}
                index={entry.index}
                style={{ aspectRatio: featuredRatio }}
                sizes="45vw"
                onOpen={setOpenIndex}
                wrapperClassName={featured.length === 1 ? "w-full max-w-2xl" : undefined}
              />
            ))}
          </div>
        )}

        {row.length > 0 && (
          <div className="mt-8 grid grid-cols-3 gap-8">
            {row.map((entry) => (
              <GalleryTile
                key={entry.image.src}
                image={entry.image}
                index={entry.index}
                style={{ aspectRatio: rowRatio }}
                sizes="30vw"
                onOpen={setOpenIndex}
              />
            ))}
          </div>
        )}

        {rest.length > 0 && (
          <div className="mt-8 flex flex-wrap justify-center gap-8">
            {rest.map((entry) => (
              <GalleryTile
                key={entry.image.src}
                image={entry.image}
                index={entry.index}
                style={{ aspectRatio: entry.ratio }}
                sizes="30vw"
                onOpen={setOpenIndex}
                wrapperClassName="w-full max-w-md"
              />
            ))}
          </div>
        )}
      </div>

      {/* Mobile / small tablet: featured images stacked, then a simple 2-up grid. */}
      <div className="lg:hidden">
        {featured.length > 0 && (
          <div className="grid grid-cols-1 gap-6">
            {featured.map((entry) => (
              <GalleryTile
                key={entry.image.src}
                image={entry.image}
                index={entry.index}
                aspectClassName="aspect-[4/3]"
                sizes="100vw"
                onOpen={setOpenIndex}
              />
            ))}
          </div>
        )}
        {secondary.length > 0 && (
          <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-5">
            {secondary.map((entry) => (
              <GalleryTile
                key={entry.image.src}
                image={entry.image}
                index={entry.index}
                aspectClassName="aspect-square"
                sizes="50vw"
                onOpen={setOpenIndex}
              />
            ))}
          </div>
        )}
      </div>

      {overflow.length > 0 && (
        <div className="mt-10 flex justify-center lg:mt-12">
          <Button type="button" variant="secondary" onClick={() => setOpenIndex(0)}>
            View All Photos ({images.length})
          </Button>
        </div>
      )}

      {openIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={images[openIndex].caption}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-navy-950/92 p-4 backdrop-blur-md sm:p-8"
          onClick={close}
        >
          <span className="absolute left-5 top-5 rounded-full border border-cream/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-cream/80 sm:left-6 sm:top-6">
            {openIndex + 1} of {images.length}
          </span>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 text-cream transition-colors hover:bg-cream/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 sm:right-6 sm:top-6"
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
            key={openIndex}
            className="animate-fade-in relative flex h-full max-h-[80vh] w-full max-w-4xl flex-col items-center gap-4"
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
