// shots.mjs — the w79 evidence screenshots (Z.ai, 7 Nov 2026)
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const _req = createRequire(import.meta.url);
let pw; try { pw = _req('playwright'); } catch { pw = _req(process.env.HOME + '/.npm-global/lib/node_modules/playwright'); }
const FILE = 'file://' + path.resolve('/home/z/my-project/work/build/Football-Sim-Z-post-blue-w79.html');
const OUT = '/home/z/my-project/work/shots';
fs.mkdirSync(OUT, { recursive: true });
const browser = await pw.chromium.launch({ executablePath: process.env.ZPB_CHROME || undefined });

// desktop
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const errs = [];
page.on('pageerror', e => errs.push(String(e)));
await page.goto(FILE, { waitUntil: 'load', timeout: 90000 });
await page.waitForTimeout(1400);
await page.screenshot({ path: path.join(OUT, 'w79-draft-boot.png') });
// rankings with the weights dropdown open (the chips row + the Owner's badges)
await page.evaluate(() => document.getElementById('tabRankingsBtn').click());
await page.waitForTimeout(500);
await page.evaluate(() => { const d = document.getElementById('weightsDrop'); if (d) d.open = true; });
await page.waitForTimeout(500);
await page.screenshot({ path: path.join(OUT, 'w79-rankings-chips.png') });
await page.evaluate(() => { const d = document.getElementById('weightsDrop'); if (d) d.open = false; });
// position rankings (TE3 present, depth-chart order)
await page.evaluate(() => document.getElementById('tabGroupsBtn').click());
await page.waitForTimeout(600);
await page.screenshot({ path: path.join(OUT, 'w79-position-rankings.png') });
// the flex chart (generated)
await page.evaluate(() => document.getElementById('tabGuideBtn').click());
await page.waitForTimeout(600);
await page.evaluate(() => { const g = document.getElementById('guideBody'); if (g) { const s = Array.from(g.querySelectorAll('summary')).find(x => /flex/i.test(x.textContent)); if (s) s.click(); const s2 = Array.from(g.querySelectorAll('summary')).find(x => /What is a flex/i.test(x.textContent)); if (s2) s2.click(); } });
await page.waitForTimeout(400);
await page.screenshot({ path: path.join(OUT, 'w79-guide-flex.png'), fullPage: false });
// you can flex page via the season? The standalone flex page needs a draft; the guide view carries the same chart.
console.log('desktop errors:', errs.length);

// phone 390 · the footer law
const m = await browser.newPage({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
const merrs = [];
m.on('pageerror', e => merrs.push(String(e)));
await m.goto(FILE, { waitUntil: 'load', timeout: 90000 });
await m.waitForTimeout(1400);
await m.evaluate(() => { document.getElementById('tabRankingsBtn').click(); });
await m.waitForTimeout(600);
const y = await m.evaluate(() => window.scrollY);
await m.screenshot({ path: path.join(OUT, 'w79-phone-rankings-top.png') });
console.log('phone scrollY after footer click:', y, '· errors:', merrs.length);
// the weights dropdown on the phone
await m.evaluate(() => { const d = document.getElementById('weightsDrop'); if (d) d.open = true; });
await m.waitForTimeout(500);
await m.screenshot({ path: path.join(OUT, 'w79-phone-chips.png') });
await browser.close();
console.log('SHOTS DONE');
