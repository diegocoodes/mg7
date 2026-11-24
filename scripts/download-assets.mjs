import { mkdir, writeFile } from "node:fs/promises";
const assets = new URL("../public/assets/", import.meta.url);
await mkdir(assets, { recursive: true });
const images = {
  "hero.webp":
    "https://images.unsplash.com/photo-1657963081505-005f190018b3?auto=format&fit=crop&w=1920&q=85&fm=webp",
  "hero-mobile.webp":
    "https://images.unsplash.com/photo-1657963081505-005f190018b3?auto=format&fit=crop&w=960&q=80&fm=webp",
  "detailing.webp":
    "https://images.pexels.com/photos/14908957/pexels-photo-14908957.jpeg?auto=compress&cs=tinysrgb&w=1000&fm=webp",
  "coating.webp":
    "https://images.pexels.com/photos/6026083/pexels-photo-6026083.jpeg?auto=compress&cs=tinysrgb&w=900&fm=webp",
  "ppf.webp":
    "https://images.pexels.com/photos/20051468/pexels-photo-20051468.jpeg?auto=compress&cs=tinysrgb&w=800&fm=webp",
  "finish.webp":
    "https://images.unsplash.com/photo-1715733965711-32ff04dd6594?auto=format&fit=crop&w=1000&q=80&fm=webp",
  "rear.webp":
    "https://images.unsplash.com/photo-1715733965804-88ae4496f29a?auto=format&fit=crop&w=1000&q=80&fm=webp",
};
await Promise.all(
  Object.entries(images).map(async ([file, url]) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`${file}: HTTP ${response.status}`);
    const data = new Uint8Array(await response.arrayBuffer());
    await writeFile(new URL(file, assets), data);
    console.log(`${file}: ${Math.round(data.length / 1024)} KB`);
  }),
);
const fontCss = await (
  await fetch(
    "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&family=Manrope:wght@400;500;600;700;800&family=Permanent+Marker&display=swap",
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
      },
    },
  )
).text();
let css = fontCss.match(/\/\* latin \*\/[\s\S]*?\}/g).join("\n");
let index = 0;
const urls = [
  ...new Set([...css.matchAll(/url\((https:[^)]+)\)/g)].map((m) => m[1])),
];
for (const url of urls) {
  const filename = `latin-${index++}.woff2`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Font download failed");
  await writeFile(
    new URL(filename, assets),
    new Uint8Array(await response.arrayBuffer()),
  );
  css = css.replaceAll(url, filename);
}
await writeFile(new URL("fonts.css", assets), css);
const licenseUrls = [
  "https://raw.githubusercontent.com/google/fonts/main/ofl/barlowcondensed/OFL.txt",
  "https://raw.githubusercontent.com/google/fonts/main/ofl/manrope/OFL.txt",
];
const licenses = await Promise.all(
  licenseUrls.map(async (url) => {
    const response = await fetch(url);
    if (!response.ok)
      throw new Error(`License download failed: ${response.status}`);
    return response.text();
  }),
);
await writeFile(new URL("OFL.txt", assets), licenses.join("\n\n---\n\n"));
const markerLicense = await fetch(
  "https://raw.githubusercontent.com/google/fonts/main/apache/permanentmarker/LICENSE.txt",
);
if (!markerLicense.ok) throw new Error("Marker font license download failed");
await writeFile(
  new URL("PermanentMarker-LICENSE.txt", assets),
  await markerLicense.text(),
);
