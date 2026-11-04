/* w67_probe1.js — measure items 1 + 2 on the w66 baseline BEFORE fixing.
   A · the two homepage dropdown bubbles: widths at rest and after every team selection.
   B · the player browser at small widths: does the panel oscillate (flash) over time? */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const FILE = 'file:///home/z/my-project/work/w67/baseline-w66.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
let pass = 0, fail = 0;
const ok = (c, l, d = '') => { console.log(`   ${c ? 'PASS' : 'FAIL'}  ${l}${d ? ' — ' + d : ''}`); c ? pass++ : fail++; };

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });

  // ===== A · dropdown bubble sizes =====
  console.log('== A · homepage dropdown bubbles ==');
  const TEAMS_SAMPLE = ['Kansas City Chiefs', 'Tampa Bay Buccaneers', 'Green Bay Packers',
    'Los Angeles Chargers', 'Las Vegas Raiders', 'Washington Commanders', 'New England Patriots', 'Jacksonville Jaguars'];
  for (const W of [1280, 1000, 760]) {
    const page = await browser.newPage({ viewport: { width: W, height: 900 } });
    await page.goto(FILE); await page.waitForTimeout(400);
    await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
    await page.reload(); await page.waitForTimeout(700);
    const read = () => page.evaluate(() => {
      const l = document.querySelector('.zpb-selwrap.zpb-teamwrap .zpb-selbtn');
      const r = document.querySelectorAll('.zpb-selwrap .zpb-selbtn')[1];
      if (!l || !r) return null;
      const lr = l.getBoundingClientRect(), rr = r.getBoundingClientRect();
      return { lw: Math.round(lr.width), rw: Math.round(rr.width), lh: Math.round(lr.height), rh: Math.round(rr.height) };
    });
    const d0 = await read();
    console.log(`  W=${W} default: left=${d0.lw} right=${d0.rw} h=${d0.lh}/${d0.rh} equal=${d0.lw === d0.rw}`);
    let mismatches = [];
    for (const t of TEAMS_SAMPLE) {
      await page.evaluate((team) => {
        const s = document.getElementById('draftSlotSelect');
        s.value = team; s.dispatchEvent(new Event('change', { bubbles: true }));
      }, t);
      await page.waitForTimeout(120);
      const m = await read();
      if (m.lw !== m.rw) mismatches.push(`${t}: L${m.lw} R${m.rw}`);
    }
    ok(mismatches.length === 0, `A W=${W} · equal after every selection`, mismatches.join(' | ') || 'all equal');
    await page.close();
  }

  // ===== B · player browser oscillation =====
  console.log('== B · player browser at small widths ==');
  for (const VW of [{ w: 500, h: 740 }, { w: 620, h: 740 }, { w: 740, h: 740 }, { w: 761, h: 740 }]) {
    const page = await browser.newPage({ viewport: { width: VW.w, height: VW.h } });
    await page.goto(FILE); await page.waitForTimeout(400);
    await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
    await page.reload(); await page.waitForTimeout(700);
    await page.evaluate(() => {
      const b = document.getElementById('tabPlayersBtn'); if (b) b.click();
    });
    await page.waitForTimeout(900);
    // sample the panel + table state 40 times over ~5s WITHOUT any input
    const samples = [];
    for (let i = 0; i < 40; i++) {
      const s = await page.evaluate(() => {
        const p = document.querySelector('#viewPlayers .panel');
        const t = document.getElementById('playerTable');
        if (!p || !t) return null;
        const r = p.getBoundingClientRect();
        return { w: Math.round(r.width), h: Math.round(r.height), stacked: t.classList.contains('mstack') };
      });
      samples.push(s);
      await page.waitForTimeout(125);
    }
    const ws = [...new Set(samples.map(s => s && s.w))];
    const hs = [...new Set(samples.map(s => s && s.h))];
    const st = [...new Set(samples.map(s => s && s.stacked))];
    const flip = samples.some((s, i) => i && s && samples[i - 1] && (s.w !== samples[i - 1].w || s.h !== samples[i - 1].h));
    console.log(`  ${VW.w}x${VW.h}: widths=${ws.join(',')} heights=${hs.join(',')} stacked states=${st.join(',')} flipped=${flip}`);
    ok(!flip, `B ${VW.w}x${VW.h} · the panel holds ONE size (no flashing)`, `widths:${ws.join('/')} heights:${hs.join('/')}`);
    await page.close();
  }

  await browser.close();
  console.log(`\nPROBE1 RESULT: pass=${pass} fail=${fail}`);
})().catch(e => { console.error(e); process.exit(1); });
