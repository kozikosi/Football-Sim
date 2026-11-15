/* strip-crossorigin.mjs — the offline-boot fix (file:// requirement): vite stamps `crossorigin`
 * on the dist's <script>/<link> tags; on a null origin (file://) the browser CORS-blocks the
 * dist's own assets and the app never mounts (the defect Z.ai filed for the Architect in the
 * Rev 5 sitting, verified by VL). This post-build step strips the attribute from dist/index.html.
 * Runs automatically via the "postbuild" npm script. Same bytes in both repos. */
import { readFileSync, writeFileSync } from 'node:fs';
const p = new URL('../dist/index.html', import.meta.url).pathname;
let html = readFileSync(p, 'utf8');
const before = (html.match(/ crossorigin/g) ?? []).length;
html = html.replace(/ crossorigin(="[^"]*")?/g, '');
writeFileSync(p, html);
console.log(`strip-crossorigin: removed ${before} attribute(s) from dist/index.html`);
