/* distfile.mjs — the w89 single-file discipline: post-build, inline every asset into dist/index.html
 * and strip crossorigin so the page boots from vanilla file:// with zero blocked requests.
 * Output: dist/single.html (the self-contained artifact the file:// battery boots). */
import fs from 'node:fs';
import path from 'node:path';

const TREE = path.resolve(new URL('..', import.meta.url).pathname);   // scripts/ -> <tree>
const distDir = path.join(TREE, 'dist');
const index = path.join(distDir, 'index.html');
let html = fs.readFileSync(index, 'utf8');

// inline every local <script src> and <link href> asset — S15 §4.10: vite base is '/' now, so the
// asset URLs are ROOT-RELATIVE (/assets/…); the legacy ./assets/… form still matches (both inline)
const scriptRe = /<script type="module"[^>]*src="(?:\.|\/)+(assets\/[^"]+)"[^>]*><\/script>/g;
const linkRe = /<link rel="stylesheet"[^>]*href="(?:\.|\/)+(assets\/[^"]+)"[^>]*>/g;

for (const m of [...html.matchAll(scriptRe)]) {
  const js = fs.readFileSync(path.join(distDir, m[1]), 'utf8');
  html = html.replace(m[0], `<script type="module">${js.replace(/<\/script>/g, '<\\/script>')}</script>`);
}
for (const m of [...html.matchAll(linkRe)]) {
  const css = fs.readFileSync(path.join(distDir, m[1]), 'utf8');
  html = html.replace(m[0], `<style>${css}</style>`);
}
// strip crossorigin (file:// needs no CORS and the attribute triggers warnings)
html = html.replace(/ crossorigin(="")?/g, '');

const out = path.join(distDir, 'single.html');
fs.writeFileSync(out, html);
const kb = (fs.statSync(out).size / 1024).toFixed(1);
console.log(`single-file dist written: dist/single.html (${kb} KB) — no external refs: ${!/src="(?:\.|\/)+assets/.test(html) && !/href="(?:\.|\/)+assets/.test(html)}`);
