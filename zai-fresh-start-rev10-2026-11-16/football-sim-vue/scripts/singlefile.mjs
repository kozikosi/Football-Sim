/* singlefile.mjs — the w89 single-file discipline for the fresh-start repos (the offline boot).
 * Chromium ≥ ~159 blocks ALL module scripts on file:// (opaque origin, CORS-mode fetch — the
 * crossorigin attribute is irrelevant; Z.ai measured this sitting: strip-crossorigin alone does
 * NOT boot, and --allow-file-access-from-files no longer helps on Chromium 159). The product's own
 * answer (Z-post-blue, w89) is ONE file with everything inline. This post-build step inlines:
 *   - every <script type="module" src> → an inline module
 *   - every <link rel="stylesheet" href> → an inline <style>
 *   - font url(...) references inside the CSS → base64 data URIs
 * Result: dist/index.html boots vanilla file:// with zero external requests, zero console errors.
 * Runs via the "postbuild" npm script (after strip-crossorigin). Same bytes in both repos. */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
const dir = new URL('../dist/', import.meta.url).pathname;
const htmlPath = dir + 'index.html';
let html = readFileSync(htmlPath, 'utf8');

const dataUri = (file) => 'data:' + mime(file) + ';base64,' + readFileSync(dir + file).toString('base64');
function mime(file) {
  if (file.endsWith('.woff2')) return 'font/woff2';
  if (file.endsWith('.woff')) return 'font/woff';
  if (file.endsWith('.svg')) return 'image/svg+xml';
  return 'application/octet-stream';
}

// 1. inline stylesheets (and rewrite their relative font urls to data URIs)
html = html.replace(/<link rel="stylesheet"( crossorigin)? href="\.\/([^"]+)">/g, (_m, _x, file) => {
  let css = readFileSync(dir + file, 'utf8');
  css = css.replace(/url\((\.\/[^)]+)\)/g, (_m2, rel) => 'url(' + dataUri(file.slice(0, file.lastIndexOf('/') + 1) + rel.slice(2)) + ')');
  return '<style>' + css + '</style>';
});

// 2. inline module scripts
html = html.replace(/<script type="module"( crossorigin)? src="\.\/([^"]+)"><\/script>/g, (_m, _x, file) =>
  '<script type="module">' + readFileSync(dir + file, 'utf8').replace(/<\/script>/g, '<\\/script>') + '</script>');

// 2b. drop the favicon link too (zero external anything)
html = html.replace(/<link rel="icon"[^>]*>/g, '');

// 3. any remaining asset references (modulepreload etc.) get dropped — nothing external may remain
html = html.replace(/<link rel="modulepreload"( crossorigin)? href="\.\/[^"]+">/g, '');

const ext = [...html.matchAll(/(?:src|href)="(\.\/[^"]+)"/g)].map((m) => m[1]);
writeFileSync(htmlPath, html);
console.log('singlefile: inlined · remaining external refs:', ext.length, ext.slice(0, 3).join(','), '· bytes:', html.length);
