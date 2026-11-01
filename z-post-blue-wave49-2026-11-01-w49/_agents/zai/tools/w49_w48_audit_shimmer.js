#!/usr/bin/env node
/* w48_audit_shimmer.js — the w48 law, audited long:
   · every 90+ name on every player-listing surface wears .zpb-shm AND computes the w45 sweep
     (animationName zpbshmsweep, a linear-gradient background clipped to the text) — both themes;
   · the w47 glow (zpbshimglow) exists nowhere — not in the bytes, not on any element;
   · the Madden rankings ANCHOR chip's name reads the chip ink: no shimmer class, no sweep,
     no glow (the w48 exception the Owner demanded with "impossible to read").
   Adapted from the w47 audit's drive (same surfaces, both themes). */
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

  ok(!(await page.evaluate(() => document.documentElement.outerHTML.includes('zpbshimglow'))), 'the glow keyframe exists nowhere in the bytes');

  const audit = (label, skipChip) => page.evaluate(({ label, skipChip }) => {
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
        if (el.closest('.zpb-anch,.zpb-leak')) continue; // the w48 exception — the chip name reads the chip ink
        const shm = el.classList.contains('zpb-shm') ? el : (el.querySelector('.zpb-shm') || el.closest('.zpb-shm'));
        if (!shm) { bad90.push(name + ':no-shm'); continue; }
        const cs = getComputedStyle(shm);
        const sweep = cs.animationName === 'zpbshmsweep'
          && (cs.backgroundImage || '').includes('linear-gradient')
          && cs.webkitBackgroundClip === 'text';
        if (!sweep) bad90.push(name + '?anim=' + cs.animationName + ',clip=' + cs.webkitBackgroundClip);
        if (cs.animationName === 'zpbshimglow') bad90.push(name + ':GLOW');
      } else {
        n85++;
        if (el.closest('.zpb-anch,.zpb-leak')) continue; // the chip carries no tier law since w48
        const vib = el.classList.contains('zpb-vib') || !!el.querySelector('.zpb-vib');
        if (!vib) bad85.push(name);
      }
    }
    return { label, n90, bad90: bad90.slice(0, 4), n85, bad85: bad85.slice(0, 4) };
  }, { label, skipChip });

  const runAudit = async (label, theme, skipChip) => {
    await page.evaluate(t => document.documentElement.setAttribute('data-theme', t), theme);
    await page.waitForTimeout(350);
    const r = await audit(label, skipChip);
    ok(!r.err && r.bad90.length === 0, `${label} · ${theme}: every 90+ name wears the w45 sweep (${r.n90 || 0} checked)`, (r.bad90 || []).join(',') || (r.err || ''));
    ok(!r.err && r.bad85.length === 0, `${label} · ${theme}: every 85+ name reads bold (${r.n85 || 0} checked)`, (r.bad85 || []).join(',') || '');
    return r;
  };

  const chipCheck = async (theme) => page.evaluate(th => {
    const chip = document.querySelector('.zpb-anch'); if (!chip) return { none: true };
    const name = chip.querySelector('.zpb-anchname'); if (!name) return { noName: true };
    const cs = getComputedStyle(name), cc = getComputedStyle(chip);
    return {
      theme: th, cls: name.className,
      color: cs.color, fill: cs.webkitTextFillColor, bg: cs.backgroundImage, anim: cs.animationName,
      chipBg: cc.backgroundColor
    };
  }, theme);

  console.log('A · the Madden rankings chip (the page he could not read)');
  await page.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => /madden rankings/i.test(x.textContent || '')); if (b) b.click(); });
  await page.waitForTimeout(900);
  await page.evaluate(t => document.documentElement.setAttribute('data-theme', t), 'light');
  await page.waitForTimeout(350);
  let cl = await chipCheck('light');
  ok(cl.cls && !/\bzpb-shm\b/.test(cl.cls) && !/\bzpb-vib\b/.test(cl.cls), 'light: the chip name carries no tier class', cl.cls);
  ok(cl.fill === cl.color && cl.bg === 'none' && cl.anim === 'none', 'light: the chip name is plain ink — no sweep, no glow', JSON.stringify({ fill: cl.fill, anim: cl.anim }));
  ok(cl.chipBg === 'rgb(244, 230, 195)', 'light: the chip keeps his gold family', cl.chipBg);
  await page.screenshot({ path: OUT + '/w48-madden-light.png' });
  await page.evaluate(t => document.documentElement.setAttribute('data-theme', t), 'dark');
  await page.waitForTimeout(350);
  let cd = await chipCheck('dark');
  ok(cd.cls && !/\bzpb-shm\b/.test(cd.cls), 'dark: the chip name carries no tier class', cd.cls);
  ok(cd.bg === 'none' && cd.anim === 'none', 'dark: plain ink there too', JSON.stringify({ fill: cd.fill, anim: cd.anim }));
  ok(cd.chipBg === 'rgb(77, 47, 63)', 'dark: the chip untouched', cd.chipBg);
  await page.screenshot({ path: OUT + '/w48-madden-dark.png' });
  await runAudit('Madden rankings', 'light', true);
  await runAudit('Madden rankings', 'dark', true);
  await page.evaluate(() => { const row = document.querySelector('#resultsBody tr'); if (row) row.click(); });
  await page.waitForTimeout(900);
  await runAudit('Madden team detail', 'dark', true);

  console.log('B · the other listing surfaces');
  await page.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => /^your players$/i.test(x.textContent || '')); if (b) b.click(); });
  await page.waitForTimeout(800);
  await runAudit('Player browser', 'dark');
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
  console.log(`\nw48_audit_shimmer: ${PASS} pass · ${FAIL} fail`);
  await browser.close();
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error('FATAL', e); process.exit(1); });
