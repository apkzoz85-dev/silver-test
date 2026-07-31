// شغّل الأمر ده مرة واحدة عندك (بعد npm install):
//   node scripts/download-images.mjs
// هينزل الصور الرسمية في public/images/ ويحوّل lib/images.ts للمسارات المحلية.

import { writeFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";

const IMAGES = {
  "hero-1.webp": "https://prod-images.nawy.com/processed/compound_image/image/3239/high.webp",
  "hero-2.webp": "https://prod-images.nawy.com/processed/compound_image/image/5251/default.webp",
  "hero-3.webp": "https://prod-images.nawy.com/processed/compound_image/image/5248/default.webp",
  "destination.webp": "https://prod-images.nawy.com/processed/compound_image/image/5254/default.webp",
  "unit-1.webp": "https://prod-images.nawy.com/processed/compound_image/image/5255/default.webp",
  "unit-2.webp": "https://prod-images.nawy.com/processed/compound_image/image/5250/default.webp",
  "unit-3.webp": "https://prod-images.nawy.com/processed/inventory/compounds/2545/cover-images/Silver%20Walk/high.webp",
  "developer.webp": "https://prod-images.nawy.com/processed/compound_image/image/5249/default.webp",
  "form-bg.webp": "https://prod-images.nawy.com/processed/inventory/compounds/2546/cover-images/Silver%20Bay/high.webp",
};

const outDir = path.join(process.cwd(), "public", "images");
await mkdir(outDir, { recursive: true });

let ok = 0;
for (const [name, url] of Object.entries(IMAGES)) {
  try {
    const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    await writeFile(path.join(outDir, name), buf);
    console.log(`✓ ${name} (${(buf.length / 1024).toFixed(0)} KB)`);
    ok++;
  } catch (e) {
    console.error(`✗ ${name}: ${e.message}`);
  }
}

if (ok === Object.keys(IMAGES).length) {
  const imagesTs = path.join(process.cwd(), "lib", "images.ts");
  let src = await readFile(imagesTs, "utf8");
  for (const [name, url] of Object.entries(IMAGES)) {
    src = src.replaceAll(`"${url}"`, `"/images/${name}"`);
  }
  await writeFile(imagesTs, src);
  console.log("\n✓ تم تحويل lib/images.ts للمسارات المحلية — اعمل build تاني");
} else {
  console.log("\n⚠ بعض الصور فشلت — اللينكات الخارجية هتفضل شغالة زي ما هي");
}
