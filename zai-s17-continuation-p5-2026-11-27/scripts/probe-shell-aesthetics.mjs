/* probe-shell-aesthetics.mjs — Part D (cakepanz-6) receipts: the strays are gone, in the real UI.
   Asserts computed styles (body = system sans, wordmark = w89's 600/.22em with the shimmer, the
   slogan line present and animating), that the inlined 700/900 faces actually LOAD
   (document.fonts.check), and that the title/meta carry the slogan. Screenshots: the Guide at
   1180 + 390, both modes (Team Select's shots ride the takeover probe). Exit 1 = any law red. */
import fs from 'node:fs'; import path from 'node:path'; import crypto from 'node:crypto';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
const _req = createRequire(import.meta.url);
let pw; try { pw = _req('playwright'); } catch (e) { throw new Error("playwright is not installed — it is a devDependency: run npm ci (then npx playwright install chromium for the browser). D-1: no HOME-global fallback. Original: " + e.message); }

const ROOT = process.cwd();
const PORT = process.env.CP_PORT || 4181;
const OUT = path.join(ROOT, 'shots', 'aesthetics');
fs.mkdirSync(OUT, { recursive: true });
const browser = await pw.chromium.launch({ args: ['--no-sandbox'] });
const receipt = { shots: [], laws: [] };

async function shot(page, name) {
  const file = path.join(OUT, name + '.png');
  await page.screenshot({ path: file, fullPage: false });
  receipt.shots.push([name, crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex')]);
}
const law = (name, ok, detail) => receipt.laws.push({ name, ok, detail });

for (const mode of ['light', 'dark']) {
  for (const [vp, w, h] of [['1180', 1180, 900], ['390', 390, 844]]) {
    const page = await browser.newPage({ viewport: { width: w, height: h } });
    await page.emulateMedia({ colorScheme: mode });
    await page.goto(`http://localhost:${PORT}/?dev=1`);
    await page.waitForTimeout(1600);
    await page.waitForTimeout(600); // fonts settle
    const probe = await page.evaluate(async () => {
      const cs = (sel, prop) => { const el = document.querySelector(sel); return el ? getComputedStyle(el)[prop] : null; };
      const slog = document.querySelector('.cp-cygline');
      const shine = document.querySelector('.cp-shine');
      return {
        bodyFont: cs('body', 'fontFamily'),
        brandFamily: cs('.cp-brand', 'fontFamily'),
        brandWeight: cs('.cp-brand', 'fontWeight'),
        brandSpacing: cs('.cp-brand', 'letterSpacing'),
        brandAnim: cs('.cp-brand', 'animationName'),
        sloganFont: slog ? cs('.cp-cygline', 'fontFamily') : null,
        sloganVisible: slog ? slog.offsetHeight > 0 : false,
        shineAnim: shine ? cs('.cp-shine', 'animationName') : null,
        cinzel700: document.fonts.check('700 16px Cinzel'),
        cinzel900: document.fonts.check('900 16px Cinzel'),
        dec900: document.fonts.check('900 16px "Cinzel Decorative"'),
        title: document.title,
        meta: document.querySelector('meta[name="description"]')?.content || null,
        hOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      };
    });
    law(`body-is-system-sans ${mode}/${vp}`, /-apple-system|BlinkMacSystemFont|Segoe UI/.test(probe.bodyFont) && !/Cinzel/.test(probe.bodyFont),
      probe.bodyFont.slice(0, 60));
    law(`brand-aligned ${mode}/${vp}`, probe.brandWeight === '600' && probe.brandSpacing === '5.28px' && /Cinzel|Bodoni/.test(probe.brandFamily),
      `family=${probe.brandFamily.split(',')[0]} weight=${probe.brandWeight} spacing=${probe.brandSpacing} (0.22em at 1.5rem)`);
    law(`brand-shimmer ${mode}/${vp}`, probe.brandAnim === 'cpshine', probe.brandAnim);
    law(`slogan-present ${mode}/${vp}`, probe.sloganVisible && /Cinzel|Bodoni/.test(probe.sloganFont || ''),
      `visible=${probe.sloganVisible} font=${(probe.sloganFont || '').split(',')[0]}`);
    law(`shine-animates ${mode}/${vp}`, probe.shineAnim === 'cpshine', probe.shineAnim);
    law(`faces-load ${mode}/${vp}`, probe.cinzel700 && probe.cinzel900 && probe.dec900,
      `cinzel700=${probe.cinzel700} cinzel900=${probe.cinzel900} dec900=${probe.dec900}`);
    law(`title-slogan ${mode}/${vp}`, /Can you go 20-0\?/.test(probe.title) && /Can you go 20-0\?/.test(probe.meta || ''),
      `title="${probe.title}"`);
    law(`no-overflow ${mode}/${vp}`, !probe.hOverflow, `scrollWidth<=clientWidth: ${!probe.hOverflow}`);
    if (vp === '1180') { await page.evaluate(() => { location.hash = '#/guide'; }); await page.waitForTimeout(500); }
    await shot(page, `${mode}-${vp}-${vp === '1180' ? 'guide' : 'team'}`);
    await page.close();
  }
}
await browser.close();
let bad = 0;
for (const l of receipt.laws) { if (!l.ok) bad++; console.log(`${l.ok ? 'PASS' : 'FAIL'} ${l.name} — ${l.detail}`); }
fs.writeFileSync(path.join(OUT, 'aesthetics-receipt.json'), JSON.stringify(receipt, null, 2));
console.log(receipt.shots.map(([n, h]) => `${n} ${h.slice(0, 12)}`).join('\n'));
if (bad) { console.log(`${bad} LAWS RED`); process.exit(1); }
console.log('AESTHETICS PROBE: all laws green');
