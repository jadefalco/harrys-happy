import fs from "node:fs";

export interface ImageDimensions {
  width: number;
  height: number;
}

/**
 * Reads pixel dimensions straight out of the JPEG SOF marker, correcting
 * for EXIF orientation (tag 0x0112) — a photo shot in portrait but stored
 * "sideways" with an orientation tag needs width/height swapped so the
 * reported ratio matches how the browser actually displays it.
 */
function readJpegDimensions(buf: Buffer): ImageDimensions | null {
  if (buf[0] !== 0xff || buf[1] !== 0xd8) return null;

  let offset = 2;
  let orientation = 1;
  let width: number | null = null;
  let height: number | null = null;

  while (offset + 4 <= buf.length) {
    if (buf[offset] !== 0xff) break;
    const marker = buf[offset + 1];

    if (marker === 0xe1) {
      const segmentLength = buf.readUInt16BE(offset + 2);
      const exifStart = offset + 4;
      if (buf.toString("ascii", exifStart, exifStart + 4) === "Exif") {
        const tiffStart = exifStart + 6;
        const little = buf.toString("ascii", tiffStart, tiffStart + 2) === "II";
        const readU16 = little ? (o: number) => buf.readUInt16LE(o) : (o: number) => buf.readUInt16BE(o);
        const readU32 = little ? (o: number) => buf.readUInt32LE(o) : (o: number) => buf.readUInt32BE(o);
        const ifdOffset = tiffStart + readU32(tiffStart + 4);
        const numEntries = readU16(ifdOffset);
        for (let i = 0; i < numEntries; i++) {
          const entryOffset = ifdOffset + 2 + i * 12;
          if (readU16(entryOffset) === 0x0112) {
            orientation = readU16(entryOffset + 8);
          }
        }
      }
      offset += 2 + segmentLength;
      continue;
    }

    // SOFn markers (baseline/progressive) hold the real width/height.
    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      height = buf.readUInt16BE(offset + 5);
      width = buf.readUInt16BE(offset + 7);
      break;
    }

    if (marker === 0xd8 || marker === 0xd9) {
      offset += 2;
      continue;
    }

    const segmentLength = buf.readUInt16BE(offset + 2);
    offset += 2 + segmentLength;
  }

  if (width === null || height === null) return null;
  return orientation >= 5 ? { width: height, height: width } : { width, height };
}

function readPngDimensions(buf: Buffer): ImageDimensions | null {
  if (buf.length < 24 || buf.readUInt32BE(0) !== 0x89504e47) return null;
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

export function getImageDimensions(filePath: string): ImageDimensions | null {
  try {
    const buf = fs.readFileSync(filePath);
    return readJpegDimensions(buf) ?? readPngDimensions(buf);
  } catch {
    return null;
  }
}
