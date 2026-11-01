// Bundles one entry (TypeScript, optionally with Svelte or React components) into dist/. UNVERIFIED: written without
// esbuild in the sandbox; the first real run on a machine with node_modules is its test.
// usage: node build/build.mjs <entry> [--html] [--svelte]   e.g. node build/build.mjs src/ui/svelte/main.ts --svelte --html
// No network use: everything resolves from ./node_modules (esbuild, esbuild-plugin-svelte, svelte, react, react-dom).
import { build } from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';

const [entry, ...flags] = process.argv.slice(2);
if (!entry || !fs.existsSync(entry)) { console.error('build: entry file not found: ' + entry); process.exit(4); }
const html = flags.includes('--html'), svelte = flags.includes('--svelte');
const plugins = [];
if (svelte) {
  const { default: sveltePlugin } = await import('esbuild-plugin-svelte');
  plugins.push(sveltePlugin({ compilerOptions: { css: 'injected' } }));
}
const outdir = 'dist', name = path.basename(entry).replace(/\.[^.]+$/, '');
fs.mkdirSync(outdir, { recursive: true });
const res = await build({
  entryPoints: [entry], bundle: true, format: 'iife', target: 'es2022', minify: true, sourcemap: false, write: false,
  outfile: path.join(outdir, name + '.js'), plugins, logLevel: 'info', jsx: 'automatic', conditions: ['browser', 'svelte'],
  loader: { '.ts': 'ts', '.tsx': 'tsx', '.csv': 'text' },
});
const js = res.outputFiles.find((f) => f.path.endsWith('.js'));
if (!js) { console.error('build: no JavaScript output'); process.exit(1); }
if (html) {
  const page = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>20-0</title></head><body><div id="app"></div><script>${js.text.replace(/<\/script/gi, '<\\/script')}</script></body></html>`;
  fs.writeFileSync(path.join(outdir, name + '.html'), page);
  console.log(`wrote ${outdir}/${name}.html (${page.length} bytes)`);
} else { fs.writeFileSync(js.path, js.contents); console.log(`wrote ${js.path} (${js.contents.length} bytes)`); }
