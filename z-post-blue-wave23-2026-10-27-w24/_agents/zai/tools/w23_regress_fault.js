// w23 regression C: focused T2/T3 mechanics
const { chromium } = require('playwright');
const path = '/home/z/my-project/download/Football-Sim-Z-post-blue-w23.html';

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text().slice(0, 160)); });
  page.on('pageerror', e => errors.push('PAGEERROR: ' + String(e).slice(0, 200)));
  await page.goto('file://' + encodeURI(path));
  await page.waitForTimeout(900);
  await page.evaluate(() => {
    document.getElementById('speedInstantBtn').click();
    document.getElementById('draftSlotSelect').value = 'Seattle Seahawks';
    document.getElementById('draftPickNumberSelect').value = '32';
    document.getElementById('startDraftBtn').click();
  });
  await page.waitForTimeout(2000);

  const probe = await page.evaluate(() => {
    return new Promise(resolve => {
      const out = {};
      out.cpuPickIsWindowProp = typeof cpuPick === 'function' && window.cpuPick === cpuPick;

      const waitForUser = then => {
        if (draftSim.awaitingUser) return then();
        setTimeout(() => waitForUser(then), 250);
      };

      waitForUser(() => {
        // ---------- T2 corrected: only illegal attempts between snapshots ----------
        const snap = () => JSON.stringify({ pos: draftSim.pos, pool: draftSim.pool.length, log: draftSim.log.length, slots: JSON.stringify(draftSim.rosters[draftSim.userIndex].slots) });
        const s0 = snap();
        const rejects = [];
        try { executePick((draftSim.userIndex + 1) % 32, draftSim.pool[0], 'QB'); rejects.push('WRONG-TEAM-ACCEPTED'); } catch (e) { rejects.push('wrongteam OK'); }
        try { executePick(draftSim.userIndex, ['Ghost Player', 'QB', 'XX', 99], 'QB'); rejects.push('GHOST-ACCEPTED'); } catch (e) { rejects.push('ghost OK'); }
        try { executePick(draftSim.userIndex, draftSim.pool[0], 'ZZ9'); rejects.push('BADSLOT-ACCEPTED'); } catch (e) { rejects.push('badslot OK'); }
        // illegal flex: a K into WR1 (not natural, not flex-listed, roster has other fits so no emergency)
        try {
          const k = draftSim.pool.find(p => p[1] === 'K');
          if (k) { executePick(draftSim.userIndex, k, 'WR1'); rejects.push('K-INTO-WR1-ACCEPTED'); } else rejects.push('no kicker in pool (skip)');
        } catch (e) { rejects.push('k-into-wr1 OK'); }
        const s1 = snap();
        out.T2 = JSON.stringify({ rejects, stateUnchanged: s0 === s1 });

        // ---------- T3 corrected: trap + verify stall, note, retry, no dup ----------
        const origCpu = cpuPick;
        let threw = false;
        cpuPick = function (t, st) { if (!threw) { threw = true; throw new Error('injected test failure'); } return origCpu(t, st); };
        const pos0 = draftSim.pos;
        document.querySelector('#draftBody2 button[data-pick]').click();
        setTimeout(() => {
          out.T3_during = {
            userPickIn: draftSim.pos === pos0 + 1,
            stalled: draftSim.pos === pos0 + 1 && !draftSim.awaitingUser,
            noteShown: (document.getElementById('draftRecentPicks').textContent || '').includes('paused'),
            threw: threw,
          };
          setTimeout(() => {
            cpuPick = origCpu;
            let p = 0, gaps = 0;
            for (const l of draftSim.log) { if (l.overall !== p + 1) gaps++; p = l.overall; }
            const names = draftSim.log.map(l => l.player[0]);
            const dup = names.length !== new Set(names).size;
            out.T3_after = { resumed: draftSim.awaitingUser || draftSim.pos > pos0 + 1, gaps, dupPicks: dup, pos: draftSim.pos };
            resolve(JSON.stringify(out));
          }, 5000);
        }, 700);
      });
    });
  });
  console.log('probe:', probe);
  console.log('console errors:', errors.length ? JSON.stringify(errors.slice(0, 6)) : 'none');
  await browser.close();
})().catch(e => { console.error('HARNESS FAIL', e); process.exit(1); });
