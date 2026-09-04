import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, '../public');

// CRC32 implementation for PNG chunks
const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  crcTable[n] = c >>> 0;
}

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function makeChunk(type, data) {
  const len = data.length;
  const buf = Buffer.alloc(12 + len);
  buf.writeUInt32BE(len, 0);
  buf.write(type, 4);
  data.copy(buf, 8);
  const typeAndData = buf.subarray(4, 8 + len);
  const crc = crc32(typeAndData);
  buf.writeUInt32BE(crc, 8 + len);
  return buf;
}

function createPng(width, height, rgbaBuffer) {
  // PNG signature
  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  // IHDR
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr.writeUInt8(8, 8); // 8-bit depth
  ihdr.writeUInt8(6, 9); // RGBA
  ihdr.writeUInt8(0, 10); // Compression (deflate)
  ihdr.writeUInt8(0, 11); // Filter
  ihdr.writeUInt8(0, 12); // Interlace (none)

  // Scanlines with filter byte 0 (None)
  const rowBytes = width * 4;
  const rawScanlines = Buffer.alloc(height * (rowBytes + 1));
  for (let y = 0; y < height; y++) {
    const rawOffset = y * (rowBytes + 1);
    rawScanlines[rawOffset] = 0; // Filter None
    rgbaBuffer.copy(rawScanlines, rawOffset + 1, y * rowBytes, (y + 1) * rowBytes);
  }

  const idatData = zlib.deflateSync(rawScanlines);

  return Buffer.concat([
    sig,
    makeChunk('IHDR', ihdr),
    makeChunk('IDAT', idatData),
    makeChunk('IEND', Buffer.alloc(0)),
  ]);
}

// Draw the Apple iOS squircle icon with document
function renderIcon(size) {
  const buf = Buffer.alloc(size * size * 4);

  // Helper to set pixel with alpha blending
  function setPixel(x, y, r, g, b, a = 255) {
    if (x < 0 || x >= size || y < 0 || y >= size || a <= 0) return;
    const idx = (Math.floor(y) * size + Math.floor(x)) * 4;
    if (a >= 255) {
      buf[idx] = r;
      buf[idx + 1] = g;
      buf[idx + 2] = b;
      buf[idx + 3] = 255;
    } else {
      const srcA = a / 255;
      const dstA = buf[idx + 3] / 255;
      const outA = srcA + dstA * (1 - srcA);
      if (outA > 0) {
        buf[idx] = Math.round((r * srcA + buf[idx] * dstA * (1 - srcA)) / outA);
        buf[idx + 1] = Math.round((g * srcA + buf[idx + 1] * dstA * (1 - srcA)) / outA);
        buf[idx + 2] = Math.round((b * srcA + buf[idx + 2] * dstA * (1 - srcA)) / outA);
        buf[idx + 3] = Math.round(outA * 255);
      }
    }
  }

  // Squircle curvature
  const radius = size * 0.22;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      // Distance from squircle corners
      let cornerDist = 0;
      const nx = Math.min(x, size - 1 - x);
      const ny = Math.min(y, size - 1 - y);

      if (nx < radius && ny < radius) {
        const dx = radius - nx;
        const dy = radius - ny;
        cornerDist = Math.sqrt(dx * dx + dy * dy);
      }

      if (cornerDist <= radius + 0.5) {
        const alpha = cornerDist > radius - 0.5 ? Math.max(0, Math.min(1, radius + 0.5 - cornerDist)) : 1;

        // Gradient from #0A84FF (top) to #0066D6 (bottom)
        const t = y / size;
        let r = Math.round(10 * (1 - t) + 0 * t);
        let g = Math.round(132 * (1 - t) + 102 * t);
        let b = Math.round(255 * (1 - t) + 214 * t);

        // Top specular gloss
        if (y < size * 0.45) {
          const gloss = (1 - y / (size * 0.45)) * 0.28;
          r = Math.round(r + (255 - r) * gloss);
          g = Math.round(g + (255 - g) * gloss);
          b = Math.round(b + (255 - b) * gloss);
        }

        setPixel(x, y, r, g, b, Math.round(alpha * 255));
      }
    }
  }

  // Draw Document inside squircle
  const docLeft = Math.round(size * 0.28);
  const docRight = Math.round(size * 0.72);
  const docTop = Math.round(size * 0.22);
  const docBottom = Math.round(size * 0.80);
  const foldSize = Math.round(size * 0.13);

  for (let y = docTop; y <= docBottom; y++) {
    for (let x = docLeft; x <= docRight; x++) {
      // Corner fold cutout in top-right
      const inCutout = (x > docRight - foldSize) && (y < docTop + foldSize) && ((x - (docRight - foldSize)) + (docTop + foldSize - y) > foldSize);
      if (!inCutout) {
        setPixel(x, y, 255, 255, 255, 255);
      }
    }
  }

  // Fold flap
  for (let dy = 0; dy < foldSize; dy++) {
    for (let dx = 0; dx < foldSize; dx++) {
      if (dx + dy <= foldSize) {
        const fx = (docRight - foldSize) + dx;
        const fy = docTop + dy;
        setPixel(fx, fy, 220, 225, 235, 255);
      }
    }
  }

  // Header blue line
  const linePad = Math.max(1, Math.round(size * 0.05));
  const lineX1 = docLeft + linePad;
  const lineX2 = docRight - linePad;
  const line1Y = Math.round(docTop + (docBottom - docTop) * 0.35);
  const lineThickness = Math.max(1, Math.round(size * 0.04));

  for (let ly = 0; ly < lineThickness; ly++) {
    for (let lx = lineX1; lx <= lineX2; lx++) {
      setPixel(lx, line1Y + ly, 0, 122, 255, 255);
    }
  }

  // Note lines (gray)
  const line2Y = Math.round(docTop + (docBottom - docTop) * 0.52);
  for (let ly = 0; ly < lineThickness; ly++) {
    for (let lx = lineX1; lx <= lineX2; lx++) {
      setPixel(lx, line2Y + ly, 142, 142, 147, 230);
    }
  }

  const line3Y = Math.round(docTop + (docBottom - docTop) * 0.69);
  for (let ly = 0; ly < lineThickness; ly++) {
    for (let lx = lineX1; lx <= Math.round(lineX1 + (lineX2 - lineX1) * 0.6); lx++) {
      setPixel(lx, line3Y + ly, 142, 142, 147, 230);
    }
  }

  // Small green check / badge indicator in bottom-right corner of document
  if (size >= 32) {
    const badgeX = Math.round(docRight - size * 0.05);
    const badgeY = Math.round(docBottom - size * 0.05);
    const badgeR = Math.max(2, Math.round(size * 0.07));
    for (let by = badgeY - badgeR; by <= badgeY + badgeR; by++) {
      for (let bx = badgeX - badgeR; bx <= badgeX + badgeR; bx++) {
        const d = Math.sqrt((bx - badgeX) ** 2 + (by - badgeY) ** 2);
        if (d <= badgeR) {
          setPixel(bx, by, 52, 199, 89, 255);
        }
      }
    }
  }

  return buf;
}

// ICO Builder (wraps PNGs)
function createIco(pngs) {
  const count = pngs.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // ICO format
  header.writeUInt16LE(count, 4); // count

  const dirEntries = [];
  let offset = 6 + count * 16;

  for (const { size, png } of pngs) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // width
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
    entry.writeUInt8(0, 2); // color palette
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(png.length, 8); // size
    entry.writeUInt32LE(offset, 12); // offset
    dirEntries.push(entry);
    offset += png.length;
  }

  return Buffer.concat([header, ...dirEntries, ...pngs.map(p => p.png)]);
}

// Generate all sizes
console.log('Generating favicons...');

const png16 = createPng(16, 16, renderIcon(16));
const png32 = createPng(32, 32, renderIcon(32));
const png180 = createPng(180, 180, renderIcon(180));
const png192 = createPng(192, 192, renderIcon(192));
const png512 = createPng(512, 512, renderIcon(512));

const ico = createIco([
  { size: 16, png: png16 },
  { size: 32, png: png32 },
]);

fs.writeFileSync(path.join(publicDir, 'favicon-16x16.png'), png16);
fs.writeFileSync(path.join(publicDir, 'favicon-32x32.png'), png32);
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), png180);
fs.writeFileSync(path.join(publicDir, 'android-chrome-192x192.png'), png192);
fs.writeFileSync(path.join(publicDir, 'android-chrome-512x512.png'), png512);
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), ico);

console.log('Successfully generated all favicons: SVG, PNG (16, 32, 180, 192, 512), and ICO!');
