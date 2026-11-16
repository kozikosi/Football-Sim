// ERNIE — council probe, 2026-11-16. Which element breaks 390 px on the board (Part 8 / Part 13).
import { createRequire } from 'node:module';
const _req = createRequire(import.meta.url);
let pw; try { pw = _req('playwright'); } catch { pw = _req(process.env.HOME + '/.npm-global/lib/node_modules/playwright'); }
const URL = `http://localhost:${process.env.CP_PORT || '4179'}/`;
const browser = await pw.chromium.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto(URL + '?dev=1');
await page.waitForTimeout(2500);
await page.click('button.cp-ts-team');
await page.waitForTimeout(200);
const start = await page.$('button.cp-ts-go');
if (start) await start.click();
await page.waitForTimeout(2500);

const wide = await page.evaluate(() => {
  const vw = document.documentElement.clientWidth;
  const out = [];
  for (const el of document.querySelectorAll('*')) {
    const r = el.getBoundingClientRect();
    if (r.right > vw + 1 || r.width > vw + 1) {
      out.push({
        tag: el.tagName.toLowerCase(),
        cls: (el.className && typeof el.className === 'string') ? el.className : '',
        w: Math.round(r.width), right: Math.round(r.right),
        text: (el.textContent || '').trim().slice(0, 40),
      });
    }
  }
  return { vw, scrollW: document.documentElement.scrollWidth, offenders: out.slice(0, 12), total: out.length };
});
console.log(JSON.stringify(wide, null, 2));
await browser.close();