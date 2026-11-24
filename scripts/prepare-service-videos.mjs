import { spawnSync } from "node:child_process";
import { access } from "node:fs/promises";
import { resolve } from "node:path";

const ffmpeg = process.env.MG7_FFMPEG || "ffmpeg";
const assets = resolve("public/assets");
const videos = [
  ["ppf.mp4", "ppf-poster.webp"],
  ["vitrificação.mp4", "vitrificacao-poster.webp"],
  ["pelicula.mp4", "peliculas-poster.webp"],
];
for (const [input, output] of videos) {
  await access(resolve(assets, input));
  const result = spawnSync(
    ffmpeg,
    [
      "-hide_banner",
      "-loglevel",
      "error",
      "-y",
      "-ss",
      "1",
      "-i",
      resolve(assets, input),
      "-frames:v",
      "1",
      "-vf",
      "scale=720:-2",
      "-quality",
      "80",
      resolve(assets, output),
    ],
    { stdio: "inherit", windowsHide: true },
  );
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`Falha ao gerar a capa de ${input}`);
  console.log(`Capa gerada: ${output}`);
}
