// Vite config for the OFFLINE (tent-test) build — used via `vite build -c <this file>` from the arm dir.
// MERGES the arm's own vite.config.ts (framework plugin kept) with the tent-test overrides.
// Produces ONE self-contained index.html: relative base, dynamic imports inlined, CSS+JS inlined,
// no crossorigin attribute. Rationale (receipted in BENCH-2 Phase C):
//   1. ES modules do not load from file:// in Chromium (origin "null" CORS) — the JS must be INLINE.
//   2. Dynamic-import chunks would still fetch — inlineDynamicImports removes them.
//   3. Vite's default crossorigin attribute breaks file:// stylesheet loads.
// Shell-lane file (BENCH-2); the engine and the scaffold's own configs are untouched.
import fs from 'node:fs';
import path from 'node:path';
// resolve the ARM's own config by cwd (the -c config file lives outside the arm dir)
const own = (await import(path.resolve(process.cwd(), 'vite.config.ts'))).default;

export default {
  ...own,
  base: './',
  build: {
    ...(own.build ?? {}),
    outDir: 'dist-file',
    emptyOutDir: true,
    rollupOptions: { ...(own.build?.rollupOptions ?? {}), output: { ...(own.build?.rollupOptions?.output ?? {}), inlineDynamicImports: true } },
  },
  plugins: [
    ...(own.plugins ?? []),
    {
      name: 'tent-test-single-file',
      closeBundle() {
        const dir = path.resolve('dist-file');
        const idx = path.join(dir, 'index.html');
        let html = fs.readFileSync(idx, 'utf8').replaceAll(' crossorigin', '');
        html = html.replace(/<script type="module"[^>]*src="([^"]+)"[^>]*><\/script>/g, (_m, src) => {
          const js = fs.readFileSync(path.join(dir, src), 'utf8');
          return '<script type="module">\n' + js + '\n</script>';
        });
        html = html.replace(/<link rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/g, (_m, href) => {
          const css = fs.readFileSync(path.join(dir, href), 'utf8');
          return '<style>\n' + css + '\n</style>';
        });
        html = html.replace(/<link rel="icon"[^>]*>/g, '');
        fs.writeFileSync(idx, html);
        const assets = fs.readdirSync(path.join(dir, 'assets'));
        console.log('[tent-test] inlined; leftover asset files (should be none):', assets.join(', ') || '(none)');
      },
    },
  ],
};
