import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
const root = new URL("../dist/", import.meta.url);
const html = await readFile(new URL("index.html", root), "utf8");
for (const match of html.matchAll(/\bposter="([^"]+)"/g)) {
  await access(new URL(match[1].replace(/^\//, ""), root));
}
for (const filename of ["ppf.mp4", "vitrificação.mp4", "pelicula.mp4", "hero-video.mp4", "hero-video-mobile.mp4"]) {
  await access(new URL(`assets/${filename}`, root));
}
assert.match(html, /<html lang="pt-BR">/, "Idioma em português");
assert.equal([...html.matchAll(/<h1\b/g)].length, 1, "Um título principal");
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
assert.equal(ids.length, new Set(ids).size, "IDs únicos");
for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
  const target = match[1];
  if (target.startsWith("#"))
    assert.ok(ids.includes(target.slice(1)), `Âncora existente: ${target}`);
  else if (!/^(https?:|mailto:|tel:)/.test(target))
    await access(new URL(target.replace(/^\//, ""), root));
}
for (const img of html.matchAll(/<img\b[^>]+>/g)) {
  assert.match(img[0], /alt="[^"]*"/, "Descrição da imagem");
  assert.match(img[0], /width="\d+"/, "Largura reservada da imagem");
  assert.match(img[0], /height="\d+"/, "Altura reservada da imagem");
}
const schema = JSON.parse(
  html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1],
);
assert.equal(schema.telephone, "+5527997806961");
assert.equal(schema.address.addressLocality, "Vila Velha");
assert.equal(schema.address.postalCode, "29100-350");
assert.ok(!schema.aggregateRating, "Sem avaliações inventadas");
const canonical = html.match(/rel="canonical"\s+href="([^"]+)"/)[1];
assert.equal(schema.url, canonical, "Canonical e JSON-LD usam o mesmo domínio");
assert.doesNotMatch(html, /__SITE_ORIGIN__/, "Domínio resolvido no build");
const robots = await readFile(new URL('robots.txt', root), 'utf8');
const sitemap = await readFile(new URL('sitemap.xml', root), 'utf8');
assert.ok(robots.includes(`${canonical}sitemap.xml`), "Robots aponta para o sitemap do domínio");
assert.ok(sitemap.includes(`<loc>${canonical}</loc>`), "Sitemap usa o domínio configurado");
assert.equal(
  (html.match(/<option\b/g) || []).length,
  (html.match(/<\/option>/g) || []).length,
  "Opções de serviço válidas",
);
console.log(
  "OK: assets, âncoras, imagens, estrutura do formulário e SEO local.",
);
