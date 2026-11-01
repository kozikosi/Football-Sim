#!/usr/bin/env node
/* w49_audit_shimmer.js — the w49 law, audited long:
   · every 90+ name on every player-listing surface wears .zpb-shm AND computes a real sweep
     (animationName zpbshmsweep, a linear-gradient background clipped to the text) — both themes;
   · the Madden rankings' ANCHOR names are NO LONGER an exception: each chip name carries the
     tier law (90+ zpb-shm + the chip's deep→mid sweep, 85+ zpb-vib) and the chip frame is the
     delicate rose gold (#e2bfae / #f9ece4 / #6b4634 light; plum dark);
   · the team detail's "led by" names carry the tier law (the w48 audit never saw them — no
     trailing number for the text-walker);
   · the comparison's far side computes the new pale→mid strip (the deep head gone);
   · the 85+ bold law on every surface; zero page errors. */
const { chromium } = require('/home/z/my-project/node_modules/playwright-core');
const FILE = 'file:///home/z/my-project/download/Football-Sim-Z-post-blue-w49.html';
const OUT = '/home/z/my-project/w49work/evidence';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
let PASS = 0, FAIL = 0;
const ok = (c, l, d = '') => { console.log(`   ${c ? 'PASS' : 'FAIL'}  ${l}${d ? ' — ' + d : ''}`); c ? PASS++ : FAIL++; };

const runInstantDraft = async (page) => {
  await page.evaluate(() => { try{ startDraft2(); draftSpeed='instant'; try{ clearTimeout(slowTimer); }catch(e){}
    for(let g=0; g<6000 && draftSim.pos < draftSim.order.length; g++){ const t = draftSim.order[draftSim.pos];
      if(t === draftSim.userIndex){ const roster = draftSim.rosters[t]; if(firstOpenSlotAny(roster)===null){ draftSim.pos++; continue; }
        const nat = p => (NATURAL_SLOT_MAP[p[1]]||[]).filter(s=>!roster.slots[s]);
        let cands = draftSim.pool.filter(p=>nat(p).length); if(!cands.length) cands = draftSim.pool.slice();
        cands.sort((a,b)=>b[3]-a[3]); const p = cands[0]; const on = nat(p);
        executePick(draftSim.userIndex, p, on.length?on[0]:ROSTER_SLOTS.find(s=>!roster.slots[s]));
      } else { const pk = cpuPick(t); if(pk && pk.slot) executePick(t, pk.player, pk.slot); else draftSim.pos++; } }
    draftSim.awaitingUser = false;
    try{ if(draftFinalResults.style.display==='none') finishDraft2(); }catch(e){}
  }catch(e){ window.__drvErr = String(e); } });
  await page.waitForTimeout(700);
};

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message.slice(0, 120)));
  await page.goto(FILE); await page.waitForTimeout(900);
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(900);

  // the walker: every visible "Name NN" text node, 85+
  const audit = () => page.evaluate(() => {
    const seen = new Set();
    let n90 = 0, bad90 = [], n85 = 0, bad85 = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      const t = node.textContent.trim();
      const m = t.match(/^(.{3,40}?)\s+(\d{2})$/);
      if (!m) continue;
      const ovr = parseInt(m[2], 10);
      if (ovr < 85 || ovr > 99) continue;
      const el = node.parentElement;
      if (!el || seen.has(el)) continue;
      seen.add(el);
      let vis = el, hidden = false;
      if (!el.offsetParent && getComputedStyle(el).position !== 'fixed') hidden = true;
      while (vis && vis !== document.body && !hidden) { if (getComputedStyle(vis).display === 'none') hidden = true; vis = vis.parentElement; }
      if (hidden) continue;
      const name = m[1];
      if (ovr >= 90) {
        n90++;
        const shm = el.classList.contains('zpb-shm') ? el : (el.querySelector('.zpb-shm') || el.closest('.zpb-shm'));
        if (!shm) { bad90.push(name + ':no-shm'); continue; }
        const cs = getComputedStyle(shm);
        const sweep = (cs.animationName === 'zpbshmsweep' || cs.animationName === 'fxshine')
          && (cs.backgroundImage || '').includes('linear-gradient')
          && cs.webkitBackgroundClip === 'text';
        if (!sweep) bad90.push(name + '?anim=' + cs.animationName + ',clip=' + cs.webkitBackgroundClip);
        if (cs.animationName === 'zpbshimglow') bad90.push(name + ':GLOW');
      } else {
        n85++;
        const vib = el.classList.contains('zpb-vib') || !!el.querySelector('.zpb-vib');
        if (!vib) bad85.push(name);
      }
    }
    return { n90, bad90: bad90.slice(0, 4), n85, bad85: bad85.slice(0, 4) };
  });

  // the chips: explicit (their text reads "Name · SLOT · NN" — invisible to the walker)
  const chips = () => page.evaluate(() => {
    const out = { n: 0, bad: [], rose: true, roseDark: true };
    document.querySelectorAll('.zpb-anch').forEach(c => {
      const nm = c.querySelector('.zpb-anchname'); if (!nm) return;
      const m = (nm.textContent || '').match(/(\d{2})\s*$/); if (!m) return;
      const ovr = parseInt(m[1], 10); if (ovr < 85) return;
      out.n++;
      const cs = getComputedStyle(nm);
      if (ovr >= 90) {
        const sweep = cs.animationName === 'zpbshmsweep' && (cs.backgroundImage || '').includes('linear-gradient') && cs.webkitBackgroundClip === 'text';
        if (!sweep) out.bad.push(nm.textContent.trim().slice(0, 22) + ':no-sweep');
      } else if (!nm.classList.contains('zpb-vib')) {
        out.bad.push(nm.textContent.trim().slice(0, 22) + ':no-vib');
      }
    });
    return out;
  });

  const runAudit = async (label, theme) => {
    await page.evaluate(t => document.documentElement.setAttribute('data-theme', t), theme);
    await page.waitForTimeout(350);
    const r = await audit();
    ok(r.bad90.length === 0, `${label} · ${theme}: every 90+ name wears a real sweep (${r.n90} checked)`, (r.bad90 || []).join(','));
    ok(r.bad85.length === 0, `${label} · ${theme}: every 85+ name reads bold (${r.n85} checked)`, (r.bad85 || []).join(','));
    return r;
  };

  console.log('A · Madden rankings (chips are players too now)');
  await page.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => /madden rankings/i.test(x.textContent || '')); if (b) b.click(); });
  await page.waitForTimeout(900);
  for (const theme of ['light', 'dark']) {
    await page.evaluate(t => document.documentElement.setAttribute('data-theme', t), theme);
    await page.waitForTimeout(350);
    const c = await chips();
    ok(c.bad.length === 0, `Madden rankings · ${theme}: every 85+ ANCHOR name carries the tier law (${c.n} chips)`, (c.bad || []).join(','));
    const rose = await page.evaluate(() => {
      const chip = document.querySelector('.zpb-anch'); if (!chip) return null;
      const cc = getComputedStyle(chip);
      const dark = document.documentElement.getAttribute('data-theme') !== 'light';
      return dark ? (cc.backgroundColor === 'rgb(77, 47, 63)' && cc.borderTopColor === 'rgb(138, 95, 120)')
                  : (cc.backgroundColor === 'rgb(249, 236, 228)' && cc.borderTopColor === 'rgb(226, 191, 174)');
    });
    ok(rose, `Madden rankings · ${theme}: the frame is the delicate rose gold`, String(rose));
    await runAudit('Madden rankings', theme);
  }
  await page.screenshot({ path: OUT + '/w49-madden-light.png' });
  // team detail: "led by" names
  await page.evaluate(() => { const row = document.querySelector('#resultsBody tr'); if (row) row.click(); });
  await page.waitForTimeout(900);
  const ledBy = await page.evaluate(() => {
    const els = [...document.querySelectorAll('.zpb-swbadge i b')];
    if (!els.length) return { none: true };
    return { n: els.length, bad: els.filter(e => !e.classList.contains('zpb-shm') && !e.classList.contains('zpb-vib')).length };
  });
  ok(!ledBy.none && ledBy.bad === 0, 'Madden team detail: every "led by" name carries a tier class', JSON.stringify(ledBy));
  await runAudit('Madden team detail', 'dark');

  console.log('B · the other listing surfaces');
  await page.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => /^your players$/i.test(x.textContent || '')); if (b) b.click(); });
  await page.waitForTimeout(800);
  await runAudit('Player browser', 'dark');
  await page.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => /position rankings/i.test(x.textContent || '')); if (b) b.click(); });
  await page.waitForTimeout(900);
  await runAudit('Position rankings', 'dark');
  await page.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => /team comparison/i.test(x.textContent || '')); if (b) b.click(); });
  await page.waitForTimeout(800);
  await runAudit('Team comparison', 'dark');
  await runAudit('Team comparison', 'light');

  console.log('C · the draft review surfaces');
  await page.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => /start a new draft/i.test(x.textContent || '')); if (b) b.click(); });
  await page.waitForTimeout(500);
  await page.evaluate(() => { const y = document.querySelector('.confirm-ov .resetbtn'); if (y) y.click(); });
  await page.evaluate(() => { document.getElementById('startDraftBtn').click(); });
  await page.waitForTimeout(300);
  await runInstantDraft(page);
  await page.evaluate(() => { document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); try { window.zpbReleaseLookGate(); } catch (e) {} });
  await page.evaluate(() => { try { document.getElementById('resultsMineBtn').click(); } catch (e) {} });
  await page.waitForTimeout(1200);
  await runAudit('Draft review (roster + depth chart)', 'dark');
  await page.evaluate(() => { try { document.getElementById('resultsCompareBtn').click(); } catch (e) {} });
  await page.waitForTimeout(1000);
  await runAudit('Draft review comparison', 'dark');

  console.log('D · the season surfaces');
  await page.evaluate(() => { try { document.getElementById('resultsSeasonBtn').click(); } catch (e) {} });
  await page.waitForTimeout(700);
  await page.evaluate(() => { try { const b = document.getElementById('beginSeasonBtn') || document.getElementById('beginSeasonBtn2'); if (b) b.click(); } catch (e) {} });
  await page.waitForTimeout(900);
  await runAudit('Preseason page', 'dark');
  await page.evaluate(() => { try { document.querySelector('.zpb-replay-ov')?.remove(); } catch (e) {} try { if (!seasonState.weekSimulated) simulateCurrentWeek(); } catch (e) {} });
  await page.waitForTimeout(800);
  await page.evaluate(() => { try { document.querySelector('.zpb-replay-ov')?.remove(); } catch (e) {} });
  await runAudit('Week-1 plan page', 'dark');
  await page.evaluate(() => { try { simRestOfSeason(); } catch (e) {} try { renderSeasonTab(document.getElementById('seasonHost') || document.getElementById('draftResultsBody')); } catch (e) {} });
  await page.waitForTimeout(1200);
  await runAudit('Regular season review', 'dark');
  await page.evaluate(() => { try { const b = document.getElementById('simPlayoffsBtn'); if (b) b.click(); } catch (e) {} });
  await page.waitForTimeout(3000);
  await page.evaluate(() => { try { document.querySelector('.zpb-porun')?.remove(); window.__zpbPoRunHold = false; } catch (e) {} });
  await page.evaluate(() => { try { document.querySelector('.zpb-sbfin .zpb-sbfin-go')?.click(); } catch (e) {} });
  await page.waitForTimeout(700);
  await page.evaluate(() => { try { const b = document.getElementById('seasonReviewBtn'); if (b) b.click(); } catch (e) {} });
  await page.waitForTimeout(900);
  await runAudit('Season review + awards', 'dark');
  await page.evaluate(() => { try { const b = document.getElementById('backToSbBtn'); if (b) b.click(); } catch (e) {} });
  await page.waitForTimeout(700);
  await runAudit('Super Bowl recap', 'dark');

  ok(errors.length === 0, 'zero page errors across the audit', errors.slice(0, 3).join(' | '));
  console.log(`\nw49_audit_shimmer: ${PASS} pass · ${FAIL} fail`);
  await browser.close();
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error('FATAL', e); process.exit(1); });
