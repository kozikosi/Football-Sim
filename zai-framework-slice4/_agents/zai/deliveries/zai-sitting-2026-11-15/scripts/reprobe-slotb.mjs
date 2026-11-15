// focused re-probe: why does slot B not show "rev 2 · 1 picks" after BOARD pick + SAVE?
// Prints every intermediate state: picks count after click, the save banner, the raw slot cards.
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
const _req = createRequire(import.meta.url);
let pw; try { pw = _req('playwright'); } catch { pw = _req(process.env.HOME + '/.npm-global/lib/node_modules/playwright'); }

const FLAGS = ['--no-sandbox', '--allow-file-access-from-files'];
const URL_ = pathToFileURL(process.argv[2] || '/home/z/my-project/sitting/_agents/glyph/deliveries/zai-sitting-2026-11-15/framework-two-arm/arm-vue/dist/index.html').href;

const browser = await pw.chromium.launch({ args: FLAGS });
const ctx = await browser.newContext({ viewport: { width: 1180, height: 950 } });
const page = await ctx.newPage();
const errs = [];
page.on('pageerror', (e) => errs.push('pageerror: ' + e.message));
page.on('console', (m) => { if (m.type() === 'error') errs.push('console: ' + m.text()); });

const txt = (loc) => loc.textContent().then((t) => (t || '').trim());
await page.goto(URL_);
await page.waitForSelector('.cp-teambtn', { timeout: 15000 });
await page.waitForTimeout(300);
await page.getByRole('button', { name: 'Buffalo Bills', exact: true }).click();
await page.waitForSelector('.cp-board-row', { timeout: 15000 });
await page.waitForTimeout(400);

console.log('1. board count line:', await txt(page.locator('.cp-board-count')));
await page.locator('.cp-pickbtn').first().click();
await page.waitForTimeout(500);
console.log('2. after pick — mine:', await txt(page.locator('.cp-mine h4')), '| err banner:', await page.locator('.cp-msg').count(), await page.locator('.cp-msg').textContent().catch(() => ''));
console.log('3. board count line:', await txt(page.locator('.cp-board-count')));

await page.getByRole('button', { name: 'SAVES', exact: true }).first().click();
await page.waitForTimeout(300);
console.log('4. on saves; slot cards:');
for (const loc of await page.locator('.cp-save-slot').all()) console.log('   ', (await txt(loc)).replace(/\s+/g, ' ').slice(0, 110));

await page.locator('.cp-save-slot', { hasText: 'SLOT B' }).getByRole('button', { name: 'SAVE' }).click();
await page.waitForTimeout(500);
console.log('5. after SAVE B — banner:', await txt(page.locator('.cp-msg')));
for (const loc of await page.locator('.cp-save-slot').all()) console.log('   ', (await txt(loc)).replace(/\s+/g, ' ').slice(0, 110));

// the raw envelope, node-side truth:
const raw = await page.evaluate(() => localStorage.getItem('sim:nfl:slot:B'));
console.log('6. raw envelope B (first 240 chars):', raw ? raw.slice(0, 240) : String(raw));
if (raw) { const env = JSON.parse(raw); console.log('7. envelope B: schemaVersion', env.schemaVersion, '| rev', env.saveRevision, '| picks', env.payload.picks.length, '| userTeam', env.payload.userTeam); }
console.log('8. errors:', errs.length ? errs : 'none');
await browser.close();
