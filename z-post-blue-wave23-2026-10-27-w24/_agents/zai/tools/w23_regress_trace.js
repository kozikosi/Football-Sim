// w23 regression E: instrument the fault path live
const { chromium } = require('playwright');
const path = '/home/z/my-project/download/Football-Sim-Z-post-blue-w23.html';

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await ctx.newPage();
  const logs = [];
  page.on('console', m => logs.push(m.type() + ': ' + m.text().slice(0, 150)));
  page.on('pageerror', e => logs.push('PAGEERROR: ' + String(e).slice(0, 200)));
  await page.goto('file://' + encodeURI(path));
  await page.waitForTimeout(900);
  await page.evaluate(() => {
    document.getElementById('speedInstantBtn').click();
    document.getElementById('draftSlotSelect').value = 'Seattle Seahawks';
    document.getElementById('draftPickNumberSelect').value = '5';
    document.getElementById('startDraftBtn').click();
  });
  await page.waitForTimeout(2200);

  const res = await page.evaluate(() => {
    return new Promise(resolve => {
      const seq = [];
      const waitForUser = then => {
        if (draftSim.awaitingUser) return then();
        setTimeout(() => waitForUser(then), 250);
      };
      waitForUser(() => {
        seq.push(['start pos', draftSim.pos, 'awaiting', draftSim.awaitingUser]);
        const origCpu = cpuPick;
        let threw = false;
        cpuPick = function (t, st) {
          if (!threw && (!st || st === draftSim)) { threw = true; seq.push(['TRAP-THROW team', t, 'pos', draftSim.pos]); throw new Error('injected test failure'); }
          return origCpu(t, st);
        };
        // also watch the fault reporter
        const origFault = zpbDraftFault;
        zpbDraftFault = function (sub, t, err) { seq.push(['FAULT', sub, 'team', t, 'pos', draftSim.pos, err && err.message]); return origFault(sub, t, err); };

        const btn = document.querySelector('#draftBody2 button[data-pick]');
        seq.push(['btn found', !!btn, 'btnName', btn ? btn.dataset.pick : null]);
        btn.click();
        seq.push(['after click pos', draftSim.pos, 'awaiting', draftSim.awaitingUser, 'threw', threw]);
        setTimeout(() => {
          seq.push(['t+700 pos', draftSim.pos, 'awaiting', draftSim.awaitingUser, 'threw', threw]);
          setTimeout(() => {
            cpuPick = origCpu; zpbDraftFault = origFault;
            seq.push(['t+5700 pos', draftSim.pos, 'awaiting', draftSim.awaitingUser]);
            resolve(JSON.stringify(seq));
          }, 5000);
        }, 700);
      });
    });
  });
  console.log('SEQ:', res);
  console.log('console:', JSON.stringify(logs.slice(0, 10), null, 1));
  await browser.close();
})().catch(e => { console.error('HARNESS FAIL', e); process.exit(1); });
