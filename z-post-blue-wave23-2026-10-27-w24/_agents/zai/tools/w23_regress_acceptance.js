// w23 regression B: GPT acceptance tests + tabs + dropdown + full draft + undo + slow mode
const { chromium } = require('playwright');
const path = '/home/z/my-project/download/Football-Sim-Z-post-blue-w23.html';

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 } });

  // ================= PART 1: tabs after load (T15) + dropdown sort =================
  {
    const page = await ctx.newPage();
    const errors = [];
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text().slice(0, 200)); });
    page.on('pageerror', e => errors.push('PAGEERROR: ' + String(e).slice(0, 300)));
    await page.goto('file://' + encodeURI(path));
    await page.waitForTimeout(1000);

    const tabProbe = async (btnId, viewId) => {
      const r1 = await page.evaluate(([b, v]) => {
        document.getElementById(b).click();
        const view = document.getElementById(v);
        const fades = view.querySelectorAll('.zpb-fade:not(.zpb-fade-in)').length;
        const first = view.querySelector('.panel, table, .narr');
        return { active: view.classList.contains('active'), innerLen: view.innerHTML.length, hiddenFades: fades, op: first ? getComputedStyle(first).opacity : '?' };
      }, [btnId, viewId]);
      await page.waitForTimeout(900);
      const r2 = await page.evaluate((v) => {
        const view = document.getElementById(v);
        const first = view.querySelector('.panel, table, .narr');
        return { hiddenFades: view.querySelectorAll('.zpb-fade:not(.zpb-fade-in)').length, op: first ? getComputedStyle(first).opacity : '?' };
      }, viewId);
      return { ...r1, later: r2 };
    };
    console.log('T15 rankings :', JSON.stringify(await tabProbe('tabRankingsBtn', 'viewRankings')));
    console.log('T15 groups   :', JSON.stringify(await tabProbe('tabGroupsBtn', 'viewGroups')));
    console.log('T15 guide    :', JSON.stringify(await tabProbe('tabGuideBtn', 'viewGuide')));
    console.log('T15 players  :', JSON.stringify(await tabProbe('tabPlayersBtn', 'viewPlayers')));
    console.log('T15 compare  :', JSON.stringify(await tabProbe('tabCompareBtn', 'viewCompare')));
    console.log('T15 draftTab :', JSON.stringify(await tabProbe('tabDraftBtn', 'viewDraft')));

    // homepage dropdown order (the visible custom popup)
    const dd = await page.evaluate(() => {
      const sel = document.getElementById('draftSlotSelect');
      const wrap = sel.closest('.zpb-selwrap');
      const btn = wrap.querySelector('.zpb-selbtn');
      btn.click();
      const opts = [...wrap.querySelectorAll('.zpb-selopt')].map(o => o.dataset.v).filter(v => v !== '__random');
      return { first6: opts.slice(0, 6), sorted: JSON.stringify(opts) === JSON.stringify([...opts].sort((a, b) => a.localeCompare(b))), n: opts.length };
    });
    console.log('P1 dropdown  :', JSON.stringify(dd));
    console.log('errors part1 :', errors.length ? JSON.stringify(errors.slice(0, 4)) : 'none');
    await page.close();
  }

  // ================= PART 2: GPT acceptance tests =================
  {
    const page = await ctx.newPage();
    const errors = [];
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text().slice(0, 200)); });
    page.on('pageerror', e => errors.push('PAGEERROR: ' + String(e).slice(0, 300)));
    await page.goto('file://' + encodeURI(path));
    await page.waitForTimeout(900);
    await page.evaluate(() => {
      document.getElementById('speedInstantBtn').click();
      document.getElementById('draftSlotSelect').value = 'Seattle Seahawks';
      document.getElementById('draftPickNumberSelect').value = '32';
      document.getElementById('startDraftBtn').click();
    });
    await page.waitForTimeout(2000);

    // ---- T1: makeUserPick2 rejected when not the user's turn / no state change ----
    const t1 = await page.evaluate(async () => {
      // CPU is picking right now (not awaiting) OR awaiting; force the not-your-turn path by simulating a call at pos of a CPU team
      const before = { pos: draftSim.pos, pool: draftSim.pool.length, log: draftSim.log.length, slots: Object.keys(draftSim.rosters[draftSim.userIndex].slots).length };
      // while CPU owns the board, awaitingUser is false (or we already arrived; wait for a CPU moment)
      for (let i = 0; i < 50 && draftSim.awaitingUser; i++) await new Promise(r => setTimeout(r, 100));
      const during = { awaiting: draftSim.awaitingUser, pos: draftSim.pos };
      const snap = { pos: draftSim.pos, pool: draftSim.pool.length, log: draftSim.log.length, slots: Object.keys(draftSim.rosters[draftSim.userIndex].slots).length };
      makeUserPick2(draftSim.pool[0][0], null); // attempted pick while not on the clock (if awaiting, this is valid — check flag)
      await new Promise(r => setTimeout(r, 400));
      const after = { pos: draftSim.pos, pool: draftSim.pool.length, log: draftSim.log.length, slots: Object.keys(draftSim.rosters[draftSim.userIndex].slots).length };
      const rejected = !during.awaiting && JSON.stringify(snap) !== JSON.stringify(after) ? 'MUTATED-WHILE-CPU' : (!during.awaiting && JSON.stringify(snap) === JSON.stringify(after) ? 'ignored-correctly' : 'was-awaiting-valid-pick');
      return JSON.stringify({ during, rejected });
    });
    console.log('T1 turn ownership:', t1);

    // wait for user turn
    await page.waitForTimeout(1500);
    const atUser = await page.evaluate(() => draftSim.awaitingUser);

    // ---- T5: forecasts never mutate live prefs ----
    const t5 = await page.evaluate(() => {
      if (!draftSim.awaitingUser) return 'skip (not awaiting)';
      const snap = () => JSON.stringify({ b: draftSim.bias, n: draftSim.noiseSd, m: draftSim.missP });
      const s0 = snap();
      for (let i = 0; i < 3; i++) { draftUI.sim = null; simRecs(); }
      const s1 = snap();
      return s0 === s1 ? 'prefs-unchanged' : 'PREFS-MUTATED';
    });
    console.log('T5 pref isolation:', t5);

    // ---- T6: cache invalidation on roster change / undo ----
    const t6 = await page.evaluate(() => {
      if (!draftSim.awaitingUser) return 'skip';
      draftUI.sim = null; simRecs();
      const sig0 = draftUI.sim.sig;
      // make a real user pick then undo it
      const btn = document.querySelector('#draftBody2 button[data-pick]');
      if (!btn) return 'no-btn';
      btn.click();
      return new Promise(r => setTimeout(() => {
        const midSig = draftUI.sim ? draftUI.sim.sig : 'null';
        const posMid = draftSim.pos;
        undoUserPick();
        setTimeout(() => {
          draftUI.sim = null; simRecs();
          const backSig = draftUI.sim.sig;
          const restored = draftSim.pool.length;
          r(JSON.stringify({ sig0, midSig, backSig, changedAfterPick: midSig !== sig0, backToOldShape: backSig === sig0, awaitingAfterUndo: draftSim.awaitingUser }));
        }, 400);
      }, 1800));
    });
    console.log('T6 cache invalid :', t6);

    // ---- T3: injected cpuPick exception → team not skipped, error visible, retry clean ----
    const t3 = await page.evaluate(() => {
      return new Promise(resolve => {
        if (!draftSim.awaitingUser) { resolve('skip (not awaiting)'); return; }
        // pick to hand control to CPU, with cpuPick booby-trapped to throw exactly once
        const origCpu = cpuPick;
        let threw = false;
        window.__origCpuPick = origCpu;
        cpuPick = function (t, st) { if (!threw) { threw = true; throw new Error('injected test failure'); } return origCpu(t, st); };
        const posBefore = draftSim.pos;
        const btn = document.querySelector('#draftBody2 button[data-pick]');
        if (!btn) { resolve('no-btn'); return; }
        btn.click();
        setTimeout(() => {
          const duringFault = {
            posStalled: draftSim.pos === posBefore + 1, // user's own pick advanced exactly 1
            faultNoteShown: (document.getElementById('draftRecentPicks').textContent || '').includes('paused'),
            logLen: draftSim.log.length,
          };
          // wait for the controlled retry (1.2 s) to chew through the round
          setTimeout(() => {
            cpuPick = origCpu;
            const after = {
              resumed: draftSim.awaitingUser || draftSim.pos > posBefore + 1,
              noGaps: (() => { let p = 0; for (const l of draftSim.log) { if (l.overall !== p + 1) return false; p = l.overall; } return true; })(),
              pos: draftSim.pos, awaiting: draftSim.awaitingUser,
            };
            resolve(JSON.stringify({ duringFault, after }));
          }, 4000);
        }, 600);
      });
    });
    console.log('T3 fault control :', t3);

    // ---- T2: executePick rejects illegal mutations ----
    const t2 = await page.evaluate(() => {
      if (!draftSim.awaitingUser) return 'skip (not awaiting)';
      const snap = () => JSON.stringify({ pos: draftSim.pos, pool: draftSim.pool.length, log: draftSim.log.length, slots: JSON.stringify(draftSim.rosters[draftSim.userIndex].slots) });
      const s0 = snap();
      let out = [];
      // 1. wrong team
      try { executePick((draftSim.userIndex + 1) % 32, draftSim.pool[0], 'QB'); } catch (e) { out.push('wrongteam:' + e.message.slice(0, 24)); }
      // 2. player not in pool (fabricated object)
      try { executePick(draftSim.userIndex, ['Ghost Player', 'QB', 'XX', 99], 'QB'); } catch (e) { out.push('notinpooled:' + e.message.slice(0, 24)); }
      // 3. already-filled slot (fill QB twice)
      try {
        const p = draftSim.pool.find(x => (POS_SLOT_MAP[x[1]] || []).includes('QB'));
        if (p) { executePick(draftSim.userIndex, p, 'QB'); executePick(draftSim.userIndex, draftSim.pool.find(x => (POS_SLOT_MAP[x[1]] || []).includes('QB')), 'QB'); }
      } catch (e) { out.push('filledslot:' + e.message.slice(0, 24)); }
      const s1 = snap();
      return JSON.stringify({ rejections: out, stateUnchanged: s0 === s1 });
    });
    console.log('T2 transactional :', t2);

    console.log('errors part2 :', errors.length ? JSON.stringify(errors.slice(0, 4)) : 'none');
    await page.close();
  }

  // ================= PART 3: full draft to completion + finish + slow mode =================
  {
    const page = await ctx.newPage();
    const errors = [];
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text().slice(0, 200)); });
    page.on('pageerror', e => errors.push('PAGEERROR: ' + String(e).slice(0, 300)));
    await page.goto('file://' + encodeURI(path));
    await page.waitForTimeout(900);
    await page.evaluate(() => {
      document.getElementById('speedInstantBtn').click();
      document.getElementById('draftSlotSelect').value = 'Chicago Bears';
      document.getElementById('draftPickNumberSelect').value = '16';
      document.getElementById('startDraftBtn').click();
    });
    await page.waitForTimeout(1500);
    // user makes one pick then sim to end
    const full = await page.evaluate(() => {
      return new Promise(resolve => {
        const waitUser = () => {
          if (draftSim.awaitingUser) {
            const btn = document.querySelector('#draftBody2 button[data-pick]');
            btn.click();
            setTimeout(() => {
              try { simToEnd(); } catch (e) { resolve('simToEnd threw: ' + e.message); return; }
              setTimeout(() => {
                const counts = {};
                draftSim.log.forEach(l => { counts[l.teamIndex] = (counts[l.teamIndex] || 0) + 1; });
                const uneven = Object.values(counts).filter(c => c !== 28).length;
                let p = 0, gaps = 0;
                for (const l of draftSim.log) { if (l.overall !== p + 1) gaps++; p = l.overall; }
                const resultsVisible = document.getElementById('draftFinalResults').style.display !== 'none';
                resolve(JSON.stringify({ total: draftSim.log.length, uneven, gaps, resultsVisible, pos: draftSim.pos }));
              }, 1200);
            }, 1500);
          } else setTimeout(waitUser, 300);
        };
        waitUser();
      });
    });
    console.log('full draft   :', full);

    // slow mode sanity (stepSlow with guards)
    await page.evaluate(() => { document.getElementById('startDraftBtn').click(); }); // restart via setup? setup hidden; reload instead
    await page.close();

    const page2 = await ctx.newPage();
    await page2.goto('file://' + encodeURI(path));
    await page2.waitForTimeout(900);
    await page2.evaluate(() => {
      document.getElementById('speedSlowBtn').click();
      document.getElementById('draftSlotSelect').value = 'Green Bay Packers';
      document.getElementById('draftPickNumberSelect').value = '32';
      document.getElementById('startDraftBtn').click();
    });
    await page2.waitForTimeout(6000);
    const slow = await page2.evaluate(() => ({
      pos: draftSim.pos, log: draftSim.log.length, slowTicksAlive: !!slowTimer,
      integrity: (() => { let p = 0; for (const l of draftSim.log) { if (l.overall !== p + 1) return false; p = l.overall; } return true; })(),
    }));
    console.log('slow mode    :', JSON.stringify(slow), '| errors:', errors.length ? JSON.stringify(errors.slice(0, 3)) : 'none');
    await page2.close();
  }

  await browser.close();
})().catch(e => { console.error('HARNESS FAIL', e); process.exit(1); });
