// DS probe: does a mid-season boot SURVIVE a second reload? (the A1 promise, one level up)
// Leg 1: inject the real mid-season autosave pair, reload -> expect the hub.
// Leg 2: reload again (no state change) -> the season should still be there.
// Also reports which autosave keys exist after each boot.
import fs from 'node:fs';
import { createRequire } from 'node:module';
const _req = createRequire(import.meta.url);
const pw = _req('playwright');

const env = JSON.parse(fs.readFileSync('/private/var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/opencode/ds-c81/envelopes.json', 'utf8'));
const URL_ = process.env.CP_URL || 'http://localhost:4179/?dev=1';

const browser = await pw.chromium.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1180, height: 950 } });
const errs = [];
page.on('pageerror', (e) => errs.push(String(e)));
await page.goto(URL_);
await page.waitForTimeout(2500);

await page.evaluate(({ texts }) => { localStorage.clear(); for (const [k, v] of Object.entries(texts)) localStorage.setItem(k, v); }, { texts: env.texts });

async function snap(label) {
  const s = await page.evaluate(() => ({
    hub: document.querySelectorAll('.cp-hub[data-phase="running"], .cp-hub[data-phase="finished"]').length,
    hubPhase: document.querySelector('.cp-hub')?.getAttribute('data-phase') ?? null,
    complete: document.querySelectorAll('.cp-done').length,
    team: document.querySelectorAll('.cp-ts-team').length,
    h1: (document.querySelector('h1')?.textContent || '').trim().slice(0, 60),
    keys: Object.keys(localStorage).filter((k) => k.startsWith('sim:nfl:autosave')).sort(),
    hash: location.hash,
  }));
  console.log(JSON.stringify({ label, ...s }));
  return s;
}

await page.reload(); await page.waitForTimeout(3000);
const boot1 = await snap('boot1 (the A1 law: both autosaves -> hub)');
await page.reload(); await page.waitForTimeout(3000);
const boot2 = await snap('boot2 (a second reload, nothing changed: the season must still be there)');
await page.reload(); await page.waitForTimeout(3000);
const boot3 = await snap('boot3 (third reload, belt and braces)');

console.log(JSON.stringify({ verdict: {
  leg1_hub: boot1.hub === 1,
  week_key_after_boot1: boot1.keys.includes(env.weekKey),
  leg2_still_hub: boot2.hub === 1,
  leg2_complete: boot2.complete > 0,
  leg3_still_hub: boot3.hub === 1,
  pageErrors: errs.slice(0, 3),
} }));
await browser.close();
