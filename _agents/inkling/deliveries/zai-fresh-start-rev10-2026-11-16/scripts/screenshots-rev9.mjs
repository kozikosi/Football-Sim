#!/usr/bin/env node
/* screenshots-rev9.mjs — Part B: the dual-screenshot set for Variant L (tokens-w89.css).
 * A screenshot tool of the two DOMs is enough (no pull of the whole w89 file; reference only the
 * lines cited in the premises). Per repo: one harness page loading THAT REPO'S OWN tokens-w89.css
 * (file://, offline, fonts inline — never a CDN), rendering a representative slice of the arms'
 * DOM shape (headline in the Cinzel display class, panel, text/sub samples, gold rule, buttons).
 * Shots: 430x780 and 1280x800, light + dark (data-theme) — 8 PNGs total.
 * Run: node screenshots-rev9.mjs   (exit 0; hashes printed) */
import { chromium } from 'playwright';
import { createHash } from 'node:crypto';
import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

// Rev 10 portability fixes (were proven broken on a fresh extract):
// 1. ROOT was hard-coded to the authoring sandbox (/home/z/work/rev9) — now derived from THIS
//    script's location (the delivery root), so the receipt is reproducible on any tree.
// 2. The harness pages were written INTO the repos (shots-variantL.html at each repo root,
//    dirtying the verified tree — the A5 class). They now land in a temp build dir, and the
//    stylesheet href is absolute so the page still loads the repo's own tokens-w89.css bytes.
const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const OUT = `${ROOT}/receipts/screens-rev9`;              // delivered PNGs + hashes (as in Rev 9)
const BUILD = `${process.env.TMPDIR || '/tmp'}/screens-rev9-build`; // harness pages: temp, never the tree
mkdirSync(OUT, { recursive: true });
mkdirSync(BUILD, { recursive: true });

const HARNESS = (relCss) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="${relCss}">
<style>
  .wrap { max-width: 720px; margin: 0 auto; padding: var(--sp-4); display: grid; gap: var(--sp-3); }
  .row { display: flex; gap: var(--sp-2); align-items: baseline; flex-wrap: wrap; }
  .btn { border: 1px solid var(--hairline); background: var(--panel2); color: var(--text);
         border-radius: var(--r-sm); padding: var(--sp-1) var(--sp-3); font-family: var(--font-ui); }
  .btn-gold { background: var(--goldm); color: var(--on-gold); border-color: var(--gold3); }
  .zcream { color: var(--zcream); }
  .card { background: var(--panel); border: 1px solid var(--hairline); border-radius: var(--r-md);
          padding: var(--sp-3); }
  .sub { color: var(--sub); }
</style>
</head>
<body>
  <div class="wrap" data-testid="app-shell">
    <h1 class="champ" data-testid="week-label">WEEK 12</h1>
    <div class="gold-rule"></div>
    <div class="card">
      <div class="row"><strong>J'MARR CHASE</strong> <span class="sub">WR · Cincinnati Bengals · 99 OVR</span></div>
      <div class="row sub">The halfway ink rides the selection; the neutral cream never takes the team's tint.</div>
      <div class="row"><span class="zcream zcream-demo">NEUTRAL WORDS STAY ZCREAM</span></div>
      <div class="row">
        <button class="btn">STEP BACK</button>
        <button class="btn btn-gold">STEP FORWARD</button>
        <span class="sub sub-demo">STANDINGS THROUGH WEEK 12</span>
      </div>
    </div>
  </div>
</body>
</html>`;

const REPOS = [
  { arm: 'vue', page: `${BUILD}/shots-variantL-vue.html`, css: `${ROOT}/football-sim-vue/src/assets/tokens-w89.css` },
  { arm: 'svelte', page: `${BUILD}/shots-variantL-svelte.html`, css: `${ROOT}/football-sim-svelte/src/lib/assets/tokens-w89.css` },
];
for (const r of REPOS) writeFileSync(r.page, HARNESS(r.css));

const browser = await chromium.launch();
const hashes = [];
for (const r of REPOS) {
  for (const [w, h, tag] of [[430, 780, '430x780'], [1280, 800, '1280x800']]) {
    for (const theme of ['light', 'dark']) {
      const ctx = await browser.newContext({ viewport: { width: w, height: h } });
      const page = await ctx.newPage();
      const errors = [];
      page.on('pageerror', (e) => errors.push(String(e)));
      page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
      await page.emulateMedia({ colorScheme: theme });
      await page.goto('file://' + r.page);
      await page.addStyleTag({ content: `:root { ${theme === 'dark' ? '' : 'color-scheme: light;'} }` });
      if (theme === 'dark') await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
      else await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'));
      await page.waitForTimeout(250);
      const file = `${OUT}/variantL-${r.arm}-${tag}-${theme}.png`;
      await page.screenshot({ path: file, fullPage: false });
      const fontLoaded = await page.evaluate(() => document.fonts.check('16px "Cinzel"') && document.fonts.check('16px "Cinzel Decorative"'));
      const buf = (await import('node:fs')).readFileSync(file);
      const sha = createHash('sha256').update(buf).digest('hex');
      hashes.push({ file: `receipts/screens-rev9/${r.arm === 'vue' ? '' : ''}${file.split('/').pop()}`, sha256: sha, bytes: buf.length, fontLoadedInline: fontLoaded, consoleErrors: errors });
      await ctx.close();
    }
  }
}
await browser.close();
writeFileSync(`${OUT}/screens-sha256.json`, JSON.stringify(hashes, null, 1));
for (const h of hashes) console.log(`${h.file}  ${h.sha256.slice(0, 16)}…  ${h.bytes}B  fonts-inline=${h.fontLoadedInline}  errors=${h.consoleErrors.length}`);
console.log(`8 shots, exit 0`);
// Rev 10 (A5 hygiene): the harness pages are build state — remove the temp dir, keep only receipts.
rmSync(BUILD, { recursive: true, force: true });
