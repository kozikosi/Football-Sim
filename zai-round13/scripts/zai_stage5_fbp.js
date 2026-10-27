// Stage-5: w24 FB/P math validation (P-141) — slotWins for FB/P vs RB1/K/TE2 in both 4-3 base and 3-4 relabel.
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  const page = await browser.newPage();
  page.on('pageerror', e => console.error('  PAGEERROR:', String(e.message).slice(0, 250)));
  await page.goto('file:///home/z/my-project/boot/w24.html', { waitUntil: 'load' });
  await page.waitForTimeout(1200);
  const res = await page.evaluate(() => {
    const pick = (slot, ovr) => +slotWins(slot, ovr).toFixed(3);
    const out = {
      slots: ROSTER_SLOTS.length,
      fbInOffSpec: true, // verified by grep; here we measure the wins table
      wins: {
        FB90: pick('FB', 90), FB70: pick('FB', 70),
        RB1_90: pick('RB1', 90), RB1_70: pick('RB1', 70),
        P90: pick('P', 90), P80: pick('P', 80), P70: pick('P', 70),
        K90: pick('K', 90), K70: pick('K', 70),
        TE2_90: pick('TE2', 90), QB90: pick('QB', 90), CB1_90: pick('CB1', 90),
        WR2_90: pick('WR2', 90)
      },
      derived: {},
      mode34: null
    };
    out.derived.fbGain90over70 = +(out.wins.FB90 - out.wins.FB70).toFixed(3);
    out.derived.pGain90over80 = +(out.wins.P90 - out.wins.P80).toFixed(3);
    out.derived.pGain90over70 = +(out.wins.P90 - out.wins.P70).toFixed(3);
    out.derived.fbShareOfRB1 = +(out.derived.fbGain90over70 / (out.wins.RB1_90 - out.wins.RB1_70) * 100).toFixed(1);
    out.derived.pVsHalfK = +(out.derived.pGain90over80 / (out.wins.K90 - out.wins.K70) * 100).toFixed(1);
    if (window.ZPB34) { try { ZPB34(); out.mode34 = { DT1: pick('DT1', 90), MIKE: pick('MIKE', 90) }; } catch (e) { out.mode34 = 'err ' + e.message; } }
    return out;
  });
  console.log(JSON.stringify(res, null, 1));
  await browser.close();
})().catch(e => { console.error('FATAL', e && e.message); process.exit(1); });
