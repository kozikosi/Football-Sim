// Stage-6: w24 full 28-slot value hierarchy (70->90 and 80->90 wins per spot), sorted.
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  const page = await browser.newPage();
  await page.goto('file:///home/z/my-project/boot/w24.html', { waitUntil: 'load' });
  await page.waitForTimeout(1200);
  const res = await page.evaluate(() => {
    const rows = ROSTER_SLOTS.map(s => ({
      slot: s, w70: +slotWins(s, 70).toFixed(3), w80: +slotWins(s, 80).toFixed(3), w90: +slotWins(s, 90).toFixed(3),
      gain70to90: +(slotWins(s, 90) - slotWins(s, 70)).toFixed(3), gain80to90: +(slotWins(s, 90) - slotWins(s, 80)).toFixed(3)
    }));
    rows.sort((a, b) => b.gain70to90 - a.gain70to90);
    return rows;
  });
  console.log('slot  w70     w80     w90    gain70->90');
  res.forEach(r => console.log(String(r.slot).padEnd(5), String(r.w70).padEnd(7), String(r.w80).padEnd(7), String(r.w90).padEnd(7), r.gain70to90));
  await browser.close();
})().catch(e => { console.error('FATAL', e && e.message); process.exit(1); });
