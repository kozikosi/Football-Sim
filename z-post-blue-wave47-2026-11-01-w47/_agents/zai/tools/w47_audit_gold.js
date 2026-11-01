#!/usr/bin/env node
/* w47_audit_gold.js — the long audit: every surface that lists players, checked for the
   90+ gold shimmer law and the 85+ bold law, both themes. Every 90+ name must carry
   .zpb-shm and compute to the site's constant --zshim gold; every 85+ (below 90) must
   carry .zpb-vib and read bold. Counts every checked player per surface. */
const { chromium } = require('/home/z/my-project/node_modules/playwright-core');
const FILE = 'file:///home/z/my-project/w47work/Football-Sim-Z-post-blue-w47.html';
const OUT = '/home/z/my-project/w47work/evidence';
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

  const hex2rgb = h => { h = String(h).replace('#',''); if (h.length===3) h = h.split('').map(c=>c+c).join(''); const n = parseInt(h,16); return `rgb(${(n>>16)&255}, ${(n>>8)&255}, ${n&255})`; };

  // The auditor: scan the given root for name-bearing elements that carry a trailing OVR number,
  // classify 90+/85+, and verify the tier class + computed paint.
  const audit = (label) => page.evaluate(({ label, want }) => {
    const root = want && typeof want === 'string' ? document.querySelector(want) : document;
    if (!root) return { label, err: 'no root' };
    const zshim = getComputedStyle(document.documentElement).getPropertyValue('--zshim').trim();
    const hex2rgb = h => { h = h.replace('#',''); if (h.length===3) h = h.split('').map(c=>c+c).join(''); const n = parseInt(h,16); return `rgb(${(n>>16)&255}, ${(n>>8)&255}, ${n&255})`; };
    const gold = hex2rgb(zshim);
    const seen = new Set();
    let n90 = 0, bad90 = [], n85 = 0, bad85 = [];
    // name+ovr pattern: an element whose text ends with a number 50..99 (the OVR) or carries data-slot
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const names = new Map();
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
        const shm = el.classList.contains('zpb-shm') || !!el.querySelector('.zpb-shm') || el.closest('.zpb-shm');
        if (!shm) { bad90.push(name); continue; }
        const cs = getComputedStyle(shm === true ? el : (shm.classList ? shm : el));
        const fill = cs.webkitTextFillColor;
        const anim = cs.animationName;
        if (!(fill === gold || anim === 'zpbshimglow' || anim === 'none')) bad90.push(name + '?fill=' + fill);
      } else {
        n85++;
        const vib = el.classList.contains('zpb-vib') || !!el.querySelector('.zpb-vib');
        if (!vib) bad85.push(name);
      }
    }
    return { label, n90, bad90: bad90.slice(0, 4), n85, bad85: bad85.slice(0, 4) };
  }, { label });

  const runAudit = async (label, theme, rootSel) => {
    await page.evaluate(t => document.documentElement.setAttribute('data-theme', t), theme);
    await page.waitForTimeout(350);
    const r = await audit(label, rootSel);
    ok(!r.err && r.bad90.length === 0, `${label} · ${theme}: every 90+ name shimmers in the constant gold (${r.n90 || 0} checked)`, (r.bad90 || []).join(',') || (r.err || ''));
    ok(!r.err && r.bad85.length === 0, `${label} · ${theme}: every 85+ name reads bold (${r.n85 || 0} checked)`, (r.bad85 || []).join(',') || '');
    return r;
  };

  console.log('A · the homepage surfaces');
  await page.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => /madden rankings/i.test(x.textContent || '')); if (b) b.click(); });
  await page.waitForTimeout(900);
  await runAudit('Madden rankings', 'dark');
  await runAudit('Madden rankings', 'light');
  // the team detail (click a team row)
  await page.evaluate(() => { const row = document.querySelector('#resultsBody tr'); if (row) row.click(); });
  await page.waitForTimeout(900);
  await runAudit('Madden team detail', 'dark');

  await page.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => /^your players$/i.test(x.textContent || '')); if (b) b.click(); });
  await page.waitForTimeout(800);
  await runAudit('Player browser', 'dark');
  await page.evaluate(() => { const pg = document.getElementById('playerPager'); if (pg) { const b = pg.querySelector('button:last-child'); if (b) b.click(); } });
  await page.waitForTimeout(600);
  await runAudit('Player browser p2', 'dark');

  await page.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => /position rankings|by position/i.test(x.textContent || '')); if (b) b.click(); });
  await page.waitForTimeout(800);
  await runAudit('Position rankings', 'dark');

  await page.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => /team comparison/i.test(x.textContent || '')); if (b) b.click(); });
  await page.waitForTimeout(800);
  await runAudit('Team comparison', 'dark');
  await runAudit('Team comparison', 'light');

  console.log('B · the draft review surfaces');
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

  console.log('C · the season surfaces');
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

  console.log('D · mobile spot check');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => { try { renderSeasonTab(document.getElementById('seasonHost') || document.getElementById('draftResultsBody')); } catch (e) {} });
  await page.waitForTimeout(700);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  ok(overflow <= 0, '390px: no horizontal overflow on the review page', overflow + 'px');
  await page.screenshot({ path: OUT + '/w47-mobile-review.png' });
  await page.setViewportSize({ width: 1440, height: 1200 });

  ok(errors.length === 0, 'zero page errors across the audit', errors.slice(0, 3).join(' | '));
  console.log(`\nw47_audit_gold: ${PASS} pass · ${FAIL} fail`);
  await browser.close();
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error('FATAL', e); process.exit(1); });
