import fs from "node:fs";
import path from "node:path";

export interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
}

const SUPPORTED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];

// Assets that live in public/images but aren't on-site machine photos — the
// site logo, and stock/catalog product shots that are shown elsewhere
// (coffee equipment options on the coffee-service page) instead of being
// presented here as "real equipment currently in service."
const EXCLUDED_FROM_GALLERY = new Set([
  "logo.webp",
  "coffee-machine.jpg",
  "coffee-machine2.jpg",
  "coffee-machine3.webp",
  "coffee-machine4.webp",
  "micro-market.png",
]);

const knownImages: Record<string, { alt: string; caption: string }> = {
  "machine-01.JPG": {
    alt: "Snack vending machine and beverage vending machine installed side by side at a Harry's Happy Vending client facility",
    caption: "Snack & Beverage Combo",
  },
  "machine-02.jpg": {
    alt: "Combination snack and cold drink vending machine serviced by Harry's Happy Vending",
    caption: "Snack & Drink Vending",
  },
  "machine-03.jpg": {
    alt: "Row of snack and Pepsi beverage vending machines installed in a workplace break room by Harry's Happy Vending",
    caption: "Break Room Lineup",
  },
  "machine-04.jpg": {
    alt: "Snack and Pepsi beverage vending machines installed together in a Harry's Happy Vending client break room",
    caption: "Full Break Room Setup",
  },
  "machine-05.jpg": {
    alt: "Frozen meal, Pepsi beverage, and snack vending machines installed together in a Harry's Happy Vending client facility",
    caption: "Multi-Machine Lineup",
  },
  "micro-market-02.jpg": {
    alt: "Open-concept micro market with self-checkout kiosks and refrigerated cases installed by Harry's Happy Vending",
    caption: "Micro Market",
  },
};

function toCaption(filename: string) {
  const base = filename.replace(/\.[^.]+$/, "");
  return base
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function getMachineGallery(): GalleryImage[] {
  const dir = path.join(process.cwd(), "public", "images");
  let files: string[] = [];
  try {
    files = fs.readdirSync(dir);
  } catch {
    return [];
  }

  return files
    .filter((file) => SUPPORTED_EXTENSIONS.includes(path.extname(file).toLowerCase()))
    .filter((file) => !EXCLUDED_FROM_GALLERY.has(file))
    .sort((a, b) => a.localeCompare(b))
    .map((file) => {
      const known = knownImages[file];
      return {
        src: `/images/${file}`,
        alt: known?.alt ?? `Vending machine operated by Harry's Happy Vending — ${toCaption(file)}`,
        caption: known?.caption ?? toCaption(file),
      };
    });
}
