#!/usr/bin/env node
/* w47_map_check.js — dedicated: (1) the DIME stacks under the NICKEL on the review map,
   (2) the during-game abbreviations wear the dark halfway ink. Deterministic context. */
const { chromium } = require('/home/z/my-project/node_modules/playwright-core');
const FILE = 'file:///home/z/my-project/download/Football-Sim-Z-post-blue-w50.html';
const OUT = '/home/z/my-project/w49work/evidence';
let PASS = 0, FAIL = 0;
const ok = (c, l, d = '') => { console.log(`   ${c ? 'PASS' : 'FAIL'}  ${l}${d ? ' — ' + d : ''}`); c ? PASS++ : FAIL++; };
(async () => {
  const browser = await chromium.launch({ executablePath: '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell', args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1400 } });
  page.on('pageerror', e => console.log('PE:', e.message.slice(0, 200)));
  await page.goto(FILE); await page.waitForTimeout(900);
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(900);
  await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
  await page.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => /start a new draft/i.test(x.textContent || '')); if (b) b.click(); });
  await page.waitForTimeout(400);
  await page.evaluate(() => { const y = document.querySelector('.confirm-ov .resetbtn'); if (y) y.click(); });
  await page.evaluate(() => { document.getElementById('startDraftBtn').click(); });
  await page.waitForTimeout(300);
  await page.evaluate(() => { draftSpeed = 'instant'; for (let g = 0; g < 6000 && draftSim.pos < draftSim.order.length; g++) { const t = draftSim.order[draftSim.pos];
    if (t === draftSim.userIndex) { const roster = draftSim.rosters[t]; if (firstOpenSlotAny(roster) === null) { draftSim.pos++; continue; }
      const nat = p => (NATURAL_SLOT_MAP[p[1]] || []).filter(s => !roster.slots[s]);
      let cands = draftSim.pool.filter(p => nat(p).length); if (!cands.length) cands = draftSim.pool.slice();
      cands.sort((a, b) => b[3] - a[3]); const p = cands[0]; const on = nat(p);
      executePick(draftSim.userIndex, p, on.length ? on[0] : ROSTER_SLOTS.find(s => !roster.slots[s]));
    } else { const pk = cpuPick(t); if (pk && pk.slot) executePick(t, pk.player, pk.slot); else draftSim.pos++; } }
    draftSim.awaitingUser = false; try { if (draftFinalResults.style.display === 'none') finishDraft2(); } catch (e) {} });
  await page.waitForTimeout(700);
  await page.evaluate(() => { document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); try { window.zpbReleaseLookGate(); } catch (e) {} try { document.documentElement.style.setProperty('--dfc-base', '0s'); } catch (e) {} });
  await page.evaluate(() => { try { document.getElementById('resultsMineBtn').click(); } catch (e) {} });
  await page.waitForTimeout(1500);
  const geo = await page.evaluate(() => {
    const scope = document.querySelectorAll('#draftResultsBody .zpb-fm .zpb-fm-ini');
    const find = slot => [...scope].find(e => (e.getAttribute('data-slot') === slot) || (e.querySelector('i') && e.querySelector('i').textContent.trim() === slot));
    const nk = find('NICKEL'), dm = find('DIME');
    if (!nk || !dm) return { miss: true, n: scope.length };
    const rectOf = el => { const r = el.getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width) }; };
    return { nk: rectOf(nk), dm: rectOf(dm), n: scope.length, fmVisible: !!nk.closest('.zpb-fm').offsetParent };
  });
  console.log('map geo:', JSON.stringify(geo));
  if (geo.miss) ok(false, 'the map bubbles mount', JSON.stringify(geo));
  else {
    ok(geo.fmVisible && geo.nk.w > 0, 'the map renders with real layout', JSON.stringify(geo));
    ok(Math.abs(geo.nk.x - geo.dm.x) <= 14 && geo.dm.y > geo.nk.y, 'the DIME stacks right under the NICKEL (the N right above the D)', `nickel x=${geo.nk.x} y=${geo.nk.y} · dime x=${geo.dm.x} y=${geo.dm.y}`);
  }
  await page.evaluate(() => { const m = document.querySelector('#draftResultsBody .zpb-fm'); if (m) m.scrollIntoView({ block: 'center' }); });
  await page.waitForTimeout(2500);
  await page.screenshot({ path: OUT + '/w47-map-dime.png' });

  // (2) the during-game ink
  await page.evaluate(() => { try { const b = document.getElementById('resultsSeasonBtn'); if (b) b.click(); } catch (e) {} });
  await page.waitForTimeout(700);
  await page.evaluate(() => { try { const b = document.getElementById('beginSeasonBtn') || document.getElementById('beginSeasonBtn2'); if (b) b.click(); } catch (e) {} });
  await page.waitForTimeout(900);
  await page.evaluate(() => { window.__zpbSilent = false; try { document.querySelector('.zpb-replay-ov')?.remove(); } catch (e) {} try { if (!seasonState.weekSimulated) simulateCurrentWeek(); } catch (e) {} });
  await page.waitForTimeout(800);
  await page.evaluate(() => { try { document.querySelector('.zpb-replay-ov')?.remove(); const user = seasonUserTeam(); const played = seasonState.schedule.filter(x => x.played && (x.home === user || x.away === user)); const g = played[played.length - 1]; if (g && g.result && g.result.homeEvents) zpbGameReplay(g, user); } catch (e) {} });
  let abbrs = [];
  for (let t = 0; t < 14 && abbrs.length < 2; t++) {
    await page.waitForTimeout(900);
    abbrs = await page.evaluate(() => {
      return [...document.querySelectorAll('.zrl-team')].map(el => {
        const t = el.textContent.trim();
        const name = (typeof TEAM_ABBR !== 'undefined') ? (Object.keys(TEAM_ABBR).find(n => TEAM_ABBR[n] === t) || t) : t;
        const pk = zpbPackFor(name);
        const hex2rgb = h => { h = String(h).replace('#',''); if (h.length===3) h = h.split('').map(c=>c+c).join(''); const n = parseInt(h,16); return `rgb(${(n>>16)&255}, ${(n>>8)&255}, ${n&255})`; };
        return { t, c: getComputedStyle(el).color, txMd: pk ? hex2rgb(pk.txMd) : null };
      }).slice(0, 6);
    });
  }
  const withInk = abbrs.filter(a => a.c === a.txMd);
  ok(abbrs.length > 0, 'the during-game lines render', JSON.stringify(abbrs.slice(0, 2)));
  ok(withInk.length > 0, 'the abbreviations wear their team\'s dark halfway ink', JSON.stringify(abbrs.slice(0, 4)));
  await page.screenshot({ path: OUT + '/w47-during-dark.png' });
  console.log(`\nw47_map_check: ${PASS} pass · ${FAIL} fail`);
  await browser.close();
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error('FATAL', e); process.exit(1); });
