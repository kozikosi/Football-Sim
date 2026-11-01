#!/usr/bin/env node
/* w48_live.js — the w48 directive suite (live, Chromium, both themes):
   1) the glow is gone (no keyframe, no element animates zpbshimglow);
   2) the w45 sweep is THE shimmer on the team comparison — the exact KC 90+ look:
      animationName zpbshmsweep, a linear-gradient clipped to the text, identical on
      both sides of the matchup at the same instant;
   3) the Madden rankings chip name reads the chip ink in both themes (readable again),
      the chip keeps his w47 gold family in light mode;
   4) the draft board shimmers with the same sweep;
   5) zero console errors; screenshots to evidence. */
const { chromium } = require('/home/z/my-project/node_modules/playwright-core');
const FILE = 'file:///home/z/my-project/download/Football-Sim-Z-post-blue-w50.html';
const OUT = '/home/z/my-project/w49work/evidence';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
let PASS = 0, FAIL = 0;
const ok = (c, l, d = '') => { console.log(`   ${c ? 'PASS' : 'FAIL'}  ${l}${d ? ' — ' + d : ''}`); c ? PASS++ : FAIL++; };
const shot = (page, name) => page.screenshot({ path: `${OUT}/${name}` });

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
  await page.goto(FILE); await page.waitForTimeout(1100);
  const setTheme = t => page.evaluate(th => document.documentElement.setAttribute('data-theme', th), t);
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(900);

  console.log('A · the glow is gone');
  ok(!(await page.evaluate(() => document.documentElement.outerHTML.includes('zpbshimglow'))), 'no zpbshimglow anywhere in the bytes');
  ok(!(await page.evaluate(() => document.documentElement.outerHTML.includes('background-clip:border-box'))), 'the static-fill override is gone');

  console.log('B · the Madden rankings chip reads again');
  await setTheme('light'); await page.waitForTimeout(400);
  await page.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => /madden rankings/i.test(x.textContent || '')); if (b) b.click(); });
  await page.waitForTimeout(900);
  const chipL = await page.evaluate(() => {
    const chip = document.querySelector('.zpb-anch'); if (!chip) return null;
    const name = chip.querySelector('.zpb-anchname'); if (!name) return null;
    const cs = getComputedStyle(name), cc = getComputedStyle(chip);
    return { cls: name.className, color: cs.color, fill: cs.webkitTextFillColor, bg: cs.backgroundImage, anim: cs.animationName, chipBg: cc.backgroundColor, txt: name.textContent.trim().slice(0, 26) };
  });
  ok(!!chipL, 'an ANCHOR chip is present', chipL && chipL.txt);
  ok(chipL && chipL.color === 'rgb(74, 52, 16)' && chipL.fill === chipL.color, 'light: the name reads the chip ink #4a3410', chipL && chipL.fill);
  ok(chipL && chipL.bg === 'none' && chipL.anim === 'none', 'light: no sweep, no glow on the name', chipL && (chipL.anim + '/' + String(chipL.bg).slice(0, 30)));
  ok(chipL && chipL.chipBg === 'rgb(244, 230, 195)', 'light: the chip keeps the gold family', chipL && chipL.chipBg);
  await shot(page, 'w48-madden-light.png');
  await setTheme('dark'); await page.waitForTimeout(400);
  const chipD = await page.evaluate(() => {
    const chip = document.querySelector('.zpb-anch'); if (!chip) return null;
    const name = chip.querySelector('.zpb-anchname'); if (!name) return null;
    const cs = getComputedStyle(name), cc = getComputedStyle(chip);
    return { color: cs.color, fill: cs.webkitTextFillColor, anim: cs.animationName, chipBg: cc.backgroundColor };
  });
  ok(chipD && chipD.color === 'rgb(242, 215, 228)' && chipD.fill === chipD.color, 'dark: the name reads the chip ink #f2d7e4', chipD && chipD.fill);
  ok(chipD && chipD.anim === 'none', 'dark: no shimmer on the name', chipD && chipD.anim);
  ok(chipD && chipD.chipBg === 'rgb(77, 47, 63)', 'dark: the chip untouched', chipD && chipD.chipBg);
  await shot(page, 'w48-madden-dark.png');

  console.log('C · the w45 sweep IS the shimmer (team comparison, the KC law)');
  await page.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => /team comparison/i.test(x.textContent || '')); if (b) b.click(); });
  await page.waitForTimeout(800);
  const sweep = () => page.evaluate(() => {
    const cells = [...document.querySelectorAll('.zpb-lu-cell.zpb-shm')];
    const left = cells.find(c => c.classList.contains('zpb-lu-l'));
    const right = cells.find(c => c.classList.contains('zpb-lu-r'));
    const csL = left ? getComputedStyle(left) : null, csR = right ? getComputedStyle(right) : null;
    return {
      n: cells.length,
      lAnim: csL && csL.animationName, rAnim: csR && csR.animationName,
      lBg: csL && csL.backgroundImage, rBg: csR && csR.backgroundImage,
      lClip: csL && csL.webkitBackgroundClip, rClip: csR && csR.webkitBackgroundClip,
      lFill: csL && csL.webkitTextFillColor, rFill: csR && csR.webkitTextFillColor,
      glow: cells.some(c => getComputedStyle(c).animationName === 'zpbshimglow')
    };
  });
  await setTheme('dark'); await page.waitForTimeout(500);
  const sd = await sweep();
  ok(sd.n > 4, '90+ cells present on both sides', 'n=' + sd.n);
  ok(sd.lAnim === 'zpbshmsweep' && sd.rAnim === 'zpbshmsweep', 'the shimmer is the w45 sweep', sd.lAnim + '/' + sd.rAnim);
  ok(sd.lClip === 'text' && sd.rClip === 'text', 'the gradient is clipped to the text', sd.lClip + '/' + sd.rClip);
  ok(sd.lFill === 'rgba(0, 0, 0, 0)' && sd.rFill === 'rgba(0, 0, 0, 0)', 'the glyphs ride the gradient (transparent fill)', sd.lFill);
  ok(sd.lBg === sd.rBg, 'Chiefs and Raiders wear the SAME gradient at the same instant', String(sd.lBg).slice(0, 80));
  ok((sd.lBg || '').includes('linear-gradient(100deg'), 'the sweep gradient is the w45 one', String(sd.lBg).slice(0, 110));
  ok(!sd.glow, 'no glow on any 90+ cell');
  await shot(page, 'w48-cmp-dark.png');
  await setTheme('light'); await page.waitForTimeout(400);
  const sl = await sweep();
  ok(sl.lAnim === 'zpbshmsweep' && sl.lBg === sl.rBg, 'light: the same law', sl.lAnim);
  await shot(page, 'w48-cmp-light.png');

  console.log('D · the draft board shimmers with the same sweep');
  await page.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => /start a new draft/i.test(x.textContent || '')); if (b) b.click(); });
  await page.waitForTimeout(500);
  await page.evaluate(() => { const y = document.querySelector('.confirm-ov .resetbtn'); if (y) y.click(); });
  await page.waitForTimeout(300);
  await page.evaluate(() => { const b = document.getElementById('startDraftBtn'); if (b) b.click(); });
  await page.waitForTimeout(300);
  await runInstantDraft(page);
  ok(!(await page.evaluate(() => window.__drvErr)), 'the instant draft drives clean', await page.evaluate(() => window.__drvErr || ''));
  await page.evaluate(() => { const f = document.querySelector('.zpb-fin'); if (f) f.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })); });
  await page.waitForTimeout(600);
  await page.evaluate(() => { document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); try{ window.zpbReleaseLookGate(); }catch(e){} try{ document.documentElement.style.setProperty('--dfc-base','0s'); }catch(e){} });
  await setTheme('dark'); await page.waitForTimeout(400);
  const board = await page.evaluate(() => {
    const els = [...document.querySelectorAll('.zpb-shm')].filter(e => e.offsetParent);
    const sweepN = els.filter(e => getComputedStyle(e).animationName === 'zpbshmsweep');
    const glowN = els.filter(e => getComputedStyle(e).animationName === 'zpbshimglow');
    return { n: els.length, sweepN: sweepN.length, glowN: glowN.length };
  });
  ok(board.n > 0 && board.sweepN === board.n && board.glowN === 0, 'every visible shimmer on the review board sweeps', JSON.stringify(board));
  await shot(page, 'w48-board-dark.png');

  ok(errors.length === 0, 'zero console errors through the whole drive', errors.slice(0, 3).join(' | '));
  console.log(`\nw48_live: ${PASS} pass · ${FAIL} fail`);
  await browser.close();
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error('FATAL', e); process.exit(1); });
