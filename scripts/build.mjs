import { build, loadEnv } from "vite";
import { readFile, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

const localEnv = loadEnv('production', process.cwd(), 'SITE_');
const configuredUrl = process.env.SITE_URL || localEnv.SITE_URL;
const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
const siteUrl = new URL(configuredUrl || (vercelHost ? `https://${vercelHost}` : 'http://localhost:4173'));
if (!['https:', 'http:'].includes(siteUrl.protocol) || siteUrl.username || siteUrl.password) {
  throw new Error('SITE_URL deve ser uma URL pública HTTP ou HTTPS, sem credenciais.');
}
const origin = siteUrl.origin;

await build();
await build({
  build: {
    ssr: "src/entry-server.jsx",
    outDir: ".prerender",
    emptyOutDir: true,
  },
});
const { render } = await import(
  pathToFileURL(resolve(".prerender/entry-server.js"))
);
const html = await readFile("dist/index.html", "utf8");
const prerendered = html.replace('<div id="root"></div>', `<div id="root">${render()}</div>`);
await writeFile('dist/index.html', prerendered.replaceAll('__SITE_ORIGIN__', origin));
for (const path of ['dist/robots.txt', 'dist/sitemap.xml']) {
  const source = await readFile(path, 'utf8');
  await writeFile(path, source.replaceAll('__SITE_ORIGIN__', origin));
}
console.log("React: HTML pré-renderizado para carregamento inicial e SEO.");
