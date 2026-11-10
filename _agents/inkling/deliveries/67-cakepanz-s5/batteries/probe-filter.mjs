import { createRequire } from 'node:module';
const _req = createRequire(import.meta.url);
let pw; try { pw = _req('playwright'); } catch { pw = _req(process.env.HOME + '/.npm-global/lib/node_modules/playwright'); }
const browser = await pw.chromium.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1180, height: 950 } });
await page.goto('http://localhost:4179/?dev=1');
await page.waitForTimeout(2200);
await page.locator('.cp-ts-team', { hasText: 'Chicago Bears' }).click();
await page.locator('.cp-ts-go').click();
await page.waitForTimeout(900);
await page.locator('.cp-need', { hasText: 'WR1' }).first().click();
await page.waitForTimeout(250);
const rows = await page.evaluate(() => {
  const out = [];
  for (const row of document.querySelectorAll('.cp-rows .cp-row')) {
    const lbl = (row.querySelector('.cp-fitlbl')?.textContent || '').trim();
    const chips = Array.from(row.querySelectorAll('.cp-chip')).map((c) => c.textContent.trim());
    out.push({ lbl, chips, name: row.querySelector('.cp-name')?.textContent });
  }
  return out;
});
console.log(JSON.stringify(rows.slice(0, 22), null, 1));
await browser.close();
