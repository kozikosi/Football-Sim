// Stage-3: w24 (28-slot) draft legality + emergency/flex audit, own browser.
const { chromium } = require('playwright');
(async (FILE, TAG) => {
  const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push('PAGEERROR: ' + String(e.message).slice(0, 200)));
  await page.goto(FILE, { waitUntil: 'load' });
  await page.waitForTimeout(1200);
  const res = await page.evaluate(() => {
    const out = { runs: 0, illegal: 0, illegalPairs: {}, qbIllegal: [], emergency: 0, emergencyPairs: {}, flexLegal: 0, maye: [], examples: [], userRows: [] };
    for (let run = 0; run < 3; run++) {
      const sel = document.getElementById('draftSlotSelect');
      if (sel && sel.options.length > 1) sel.value = sel.options[1].value;
      startDraft2();
      simToEnd();
      draftSim.rosters.forEach(r => {
        ROSTER_SLOTS.forEach(sl => {
          const p = r.slots[sl]; if (!p) return;
          const legal = (POS_SLOT_MAP[p[1]] || []).includes(sl);
          if (!legal) {
            out.illegal++;
            out.illegalPairs[p[1] + '->' + sl] = (out.illegalPairs[p[1] + '->' + sl] || 0) + 1;
            if (p[1] === 'QB') out.qbIllegal.push(`run${run+1} ${p[0]} (${p[3]}) -> ${r.teamName} ${sl}${r.isUser ? ' [USER]' : ''}`);
            if (p[0] === 'Drake Maye') out.maye.push(`run${run+1} ${r.teamName} ${sl}`);
            if (out.examples.length < 10) out.examples.push(`run${run+1} ${p[0]} (${p[1]} ${p[3]}) -> ${r.teamName} ${sl}`);
          } else {
            const pen = flexPenaltyFor(p[1], sl);
            if (pen >= 8) { out.emergency++; out.emergencyPairs[p[1] + '->' + sl] = (out.emergencyPairs[p[1] + '->' + sl] || 0) + 1; if (r.isUser) out.userRows.push(`run${run+1} ${p[0]} (${p[1]}) -> ${sl} pen${pen}`); }
            else if (pen > 0) out.flexLegal++;
            if (p[0] === 'Drake Maye') out.maye.push(`run${run+1} ${r.teamName} ${sl} pen${pen}`);
          }
        });
      });
      out.runs++;
    }
    return out;
  });
  console.log(JSON.stringify({ tag: TAG, res, consoleErrors: errors.slice(0, 6) }, null, 1));
  await browser.close();
})('file:///home/z/my-project/boot/w24.html', 'w24').catch(e => { console.error('FATAL', e && e.message); process.exit(1); });
