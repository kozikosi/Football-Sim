// Stage-1 probe: boot + pool + effOvr only.
const { chromium } = require('playwright');
const FILE = 'file:///home/z/my-project/boot/PreColors.html';
(async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  const errors = [];
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text().slice(0, 200)); });
  page.on('pageerror', e => errors.push('PAGEERROR: ' + String(e.message).slice(0, 200)));
  await page.goto(FILE, { waitUntil: 'load' });
  await page.waitForTimeout(1500);
  const boot = await page.evaluate(() => ({
    title: document.title,
    buttons: document.querySelectorAll('button').length,
    players: typeof PLAYERS !== 'undefined' ? PLAYERS.length : null,
    rosterSlots: typeof ROSTER_SLOTS !== 'undefined' ? ROSTER_SLOTS.length : null,
    hasDraftSelect: !!document.getElementById('draftSlotSelect'),
    selectOptions: (function(){ const s=document.getElementById('draftSlotSelect'); return s? s.options.length : 0; })()
  }));
  const pool = await page.evaluate(() => {
    const byPos = {};
    PLAYERS.forEach(p => { byPos[p[1]] = (byPos[p[1]] || 0) + 1; });
    return { n: PLAYERS.length, byPos,
      maye: PLAYERS.filter(p => p[0] === 'Drake Maye').map(p => ({ pos: p[1], team: p[2], ovr: p[3] })),
      top10: PLAYERS.slice(0, 10).map(p => `${p[0]}|${p[1]}|${p[3]}`) };
  });
  const eff = await page.evaluate(() => ({
    qbAtQB: effOvr(['T', 'QB', 'NE', 95], 'QB'),
    qbAtWR1: effOvr(['T', 'QB', 'NE', 95], 'WR1'),
    qbLegalSlots: POS_SLOT_MAP['QB'],
    hbLegalSlots: POS_SLOT_MAP['HB']
  }));
  console.log(JSON.stringify({ boot, pool, eff, consoleErrors: errors.slice(0, 8) }, null, 1));
  await browser.close();
})().catch(e => { console.error('FATAL', e && e.message); process.exit(1); });
