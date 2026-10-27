// Stage-2: full-draft illegal-placement scan (3 runs), own browser.
const { chromium } = require('playwright');
const FILE = 'file:///home/z/my-project/boot/PreColors.html';
(async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push('PAGEERROR: ' + String(e.message).slice(0, 200)));
  await page.goto(FILE, { waitUntil: 'load' });
  await page.waitForTimeout(1200);
  const drafts = await page.evaluate(() => {
    const out = { runs: 0, illegalTotal: 0, byPair: {}, qbIllegal: 0, examples: [], mayeSpots: [], userIllegal: 0, emptySlots: 0, draftedFBPLS: 0 };
    for (let run = 0; run < 3; run++) {
      const sel = document.getElementById('draftSlotSelect');
      if (sel && sel.options.length > 1) sel.value = sel.options[1].value;
      startDraft2();
      simToEnd();
      draftSim.rosters.forEach(r => {
        ROSTER_SLOTS.forEach(sl => {
          const p = r.slots[sl];
          if (!p) { out.emptySlots++; return; }
          if (['FB', 'P', 'LS'].includes(p[1])) out.draftedFBPLS++;
          const legal = (POS_SLOT_MAP[p[1]] || []).includes(sl);
          if (!legal) {
            out.illegalTotal++;
            const k = p[1] + '->' + sl;
            out.byPair[k] = (out.byPair[k] || 0) + 1;
            if (p[1] === 'QB') { out.qbIllegal++; out.examples.push(`run${run+1} ${p[0]} (${p[1]} ${p[3]}) -> ${r.teamName} ${sl}${r.isUser ? ' [USER]' : ''}`); }
            if (r.isUser) out.userIllegal++;
            if (p[0] === 'Drake Maye') out.mayeSpots.push(`run${run+1} ${r.teamName} ${sl}`);
          }
        });
      });
      out.runs++;
    }
    return out;
  });
  console.log(JSON.stringify({ drafts, consoleErrors: errors.slice(0, 8) }, null, 1));
  await browser.close();
})().catch(e => { console.error('FATAL', e && e.message); process.exit(1); });
