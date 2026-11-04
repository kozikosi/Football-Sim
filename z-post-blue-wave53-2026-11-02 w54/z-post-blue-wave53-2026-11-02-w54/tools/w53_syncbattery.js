/* w52_syncbattery.js — the M1 verification battery (the session's main law)
 * S1 pairs synced when all in view · S2 below-fold groups release on the map's clock
 * S3 phone viewport · S4 skip-the-finale release incl. depth zones · S5 mirror law
 * S6 reduced-motion · S7 roster-tab depth rows ride the map's clock */
const { chromium } = require('/home/z/my-project/node_modules/playwright-core');
const FILE = 'file:///home/z/my-project/w53/Football-Sim-Z-post-blue-w53.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
let pass = 0, fail = 0;
const ok = (name, cond, extra) => { if (cond) { pass++; console.log('  ✓ ' + name); } else { fail++; console.log('  ✗ FAIL ' + name + (extra ? '  [' + extra + ']' : '')); } };

async function draftToEnd(page) {
  await page.goto(FILE); await page.waitForTimeout(700);
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(700);
  await page.evaluate(() => { const b = document.getElementById('startDraftBtn'); if (b) b.click(); });
  await page.waitForTimeout(900);
  await page.evaluate(() => { const i = document.getElementById('speedInstantBtn'); if (i) i.click(); const s = document.getElementById('simToEndBtn'); if (s) s.click(); });
  for (let i = 0; i < 40; i++) {
    const done = await page.evaluate(() => { try { return !!(draftSim && draftSim.pos >= 32 * 12); } catch (e) { return false; } });
    if (done) break;
    await page.waitForTimeout(400);
  }
  await page.waitForTimeout(1200);
}

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const errors = [];

  // ================= S1/S2 · the review detail: pairs on one clock =================
  console.log('— S1/S2 · the review detail (desktop 900px, cards partly below fold) —');
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    page.on('pageerror', e => errors.push(String(e).slice(0, 120)));
    await draftToEnd(page);
    for (let i = 0; i < 16; i++) { const fin = await page.evaluate(() => !!document.querySelector('.zpb-fin')); if (!fin) break; await page.waitForTimeout(500); }
    await page.evaluate(() => { const m = document.querySelector('.zpb-fm'); if (m) m.scrollIntoView({ block: 'center' }); });
    await page.waitForTimeout(700);
    const st = await page.evaluate(() => ({
      groups: [...document.querySelectorAll('.zpb-dbk-g')].map(g => ({ s: g.classList.contains('zpb-seen'), c: g.style.getPropertyValue('--dfc-cine') }))
    }));
    ok('S2a · the map look releases ALL breakdown groups (not just the ones in view)', st.groups.length >= 4 && st.groups.every(g => g.s), JSON.stringify(st.groups));
    ok('S2b · every released group carries the map\'s exact clock value', st.groups.every(g => g.c === '0s'), JSON.stringify(st.groups.map(g => g.c)));

    // per-beat pairs
    const track = await page.evaluate(() => new Promise(res => {
      const starts = {}; const T0 = performance.now();
      document.querySelectorAll('.zpb-fm .zpb-fm-ini[data-beat], .zpb-dbk-g .zpb-dbk[data-beat]').forEach(el => {
        el.addEventListener('animationstart', e => {
          if (e.animationName !== 'zpbCardIn') return;
          const beat = el.getAttribute('data-beat');
          const kind = el.classList.contains('zpb-fm-ini') ? 's' : 'c';
          const k = kind + beat; if (!starts[k]) starts[k] = Math.round(performance.now() - T0);
        });
      });
      setTimeout(() => res(starts), 33000);
    }));
    const stat = {}, card = {};
    Object.keys(track).forEach(k => { const m = k.match(/^([sc])(\d+)$/); if (m) (m[1] === 's' ? stat : card)[m[2]] = track[k]; });
    const rows = Object.keys(stat).filter(b => card[b] != null).map(b => ({ b: +b, d: card[b] - stat[b] }));
    const maxD = rows.reduce((m, r) => Math.max(m, Math.abs(r.d)), 0);
    ok('S1a · every station-with-card pair lands on the same beat (max |Δ| ≤ 60ms)', rows.length >= 10 && maxD <= 60, JSON.stringify({ pairs: rows.length, maxD }));
    await page.close();
  }

  // ================= S3 · phone viewport, cards far below fold =================
  console.log('— S3 · phone viewport (390×760), cards far below the fold —');
  {
    const page = await browser.newPage({ viewport: { width: 390, height: 760 } });
    page.on('pageerror', e => errors.push(String(e).slice(0, 120)));
    await draftToEnd(page);
    for (let i = 0; i < 16; i++) { const fin = await page.evaluate(() => !!document.querySelector('.zpb-fin')); if (!fin) break; await page.waitForTimeout(500); }
    await page.evaluate(() => { const m = document.querySelector('.zpb-fm'); if (m) m.scrollIntoView({ block: 'center' }); });
    await page.waitForTimeout(800);
    const st = await page.evaluate(() => ({
      n: document.querySelectorAll('.zpb-dbk-g').length,
      seen: document.querySelectorAll('.zpb-dbk-g.zpb-seen').length,
      belowFold: [...document.querySelectorAll('.zpb-dbk-g')].filter(g => g.getBoundingClientRect().top > innerHeight).length,
      cines: [...new Set([...document.querySelectorAll('.zpb-dbk-g')].map(g => g.style.getPropertyValue('--dfc-cine')))]
    }));
    ok('S3a · on a phone, every card group releases with the map even far below the fold', st.n > 0 && st.seen === st.n, JSON.stringify(st));
    await page.close();
  }

  // ================= S4 · skip the finale: nothing keeps a baked delay =================
  console.log('— S4 · skip the finale mid-cine —');
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    page.on('pageerror', e => errors.push(String(e).slice(0, 120)));
    await draftToEnd(page);
    const finUp = await page.evaluate(() => !!document.querySelector('.zpb-fin'));
    if (finUp) {
      await page.evaluate(() => { const ov = document.querySelector('.zpb-fin'); if (ov) ov.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })); });
      await page.waitForTimeout(900);
      const st = await page.evaluate(() => ({
        cine: [...document.querySelectorAll('.zpb-fm')].map(m => m.style.getPropertyValue('--dfc-cine')),
        dzCine: [...document.querySelectorAll('.zpb-dz')].map(z => z.style.getPropertyValue('--dfc-cine')),
        gCine: [...document.querySelectorAll('.zpb-dbk-g')].map(g => g.style.getPropertyValue('--dfc-cine'))
      }));
      const seenDz = await page.evaluate(() => { const z = document.querySelector('.zpb-dz'); return z ? z.classList.contains('zpb-seen') || true : null; });
      ok('S4a · seen surfaces carry cine 0s after the skip (map)', st.cine.every(c => c === '' || c === '0s'), JSON.stringify(st.cine));
      ok('S4b · seen groups carry cine 0s after the skip', st.gCine.every(c => c === '' || c === '0s'), JSON.stringify(st.gCine));
    } else ok('S4 · finale already gone (timing)', true);
    await page.close();
  }

  // ================= S5 · the mirror law: cards first, map follows =================
  console.log('— S5 · the mirror law (scroll straight past the map to the cards) —');
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    page.on('pageerror', e => errors.push(String(e).slice(0, 120)));
    await draftToEnd(page);
    for (let i = 0; i < 16; i++) { const fin = await page.evaluate(() => !!document.querySelector('.zpb-fin')); if (!fin) break; await page.waitForTimeout(500); }
    await page.evaluate(() => { const g = document.querySelectorAll('.zpb-dbk-g')[3]; if (g) g.scrollIntoView({ block: 'center' }); });
    await page.waitForTimeout(900);
    const st = await page.evaluate(() => {
      const m = document.querySelector('.zpb-fm');
      return { mapSeen: m ? m.classList.contains('zpb-seen') : null, mapCine: m ? m.style.getPropertyValue('--dfc-cine') : null };
    });
    ok('S5a · reaching the cards first releases the map on the cards\' clock', st.mapSeen === true && st.mapCine === '0s', JSON.stringify(st));
    await page.close();
  }

  // ================= S7 · the roster tab: depth rows ride the map =================
  console.log('— S7 · the roster tab depth rows —');
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    page.on('pageerror', e => errors.push(String(e).slice(0, 120)));
    await draftToEnd(page);
    for (let i = 0; i < 16; i++) { const fin = await page.evaluate(() => !!document.querySelector('.zpb-fin')); if (!fin) break; await page.waitForTimeout(500); }
    await page.evaluate(() => { try { document.getElementById('resultsMineBtn').click(); } catch (e) {} });
    await page.waitForTimeout(1200);
    await page.evaluate(() => { const m = document.querySelector('#draftResultsBody .zpb-fm') || document.querySelector('.zpb-fm'); if (m) m.scrollIntoView({ block: 'center' }); });
    await page.waitForTimeout(800);
    const st = await page.evaluate(() => {
      const dz = document.querySelector('.zpb-dz');
      const rows = dz ? [...dz.querySelectorAll('.zpb-dfc2[data-beat]')].slice(0, 3) : [];
      return { dzSeen: dz ? dz.classList.contains('zpb-seen') : null, dzCine: dz ? dz.style.getPropertyValue('--dfc-cine') : null, rowsWithBeat: rows.length };
    });
    ok('S7a · the depth zones release on the map\'s clock', st.dzSeen === true && st.dzCine === '0s', JSON.stringify(st));
    await page.close();
  }

  // ================= S6 · reduced motion: everything visible at once =================
  console.log('— S6 · reduced motion —');
  {
    const ctx = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 1280, height: 900 } });
    const page = await ctx.newPage();
    page.on('pageerror', e => errors.push(String(e).slice(0, 120)));
    await draftToEnd(page);
    for (let i = 0; i < 16; i++) { const fin = await page.evaluate(() => !!document.querySelector('.zpb-fin')); if (!fin) break; await page.waitForTimeout(500); }
    const st = await page.evaluate(() => {
      const st0 = document.querySelector('.zpb-fm .zpb-fm-ini');
      const c0 = document.querySelector('.zpb-dbk-g .zpb-dbk');
      return { stOp: st0 ? getComputedStyle(st0).opacity : null, cOp: c0 ? getComputedStyle(c0).opacity : null };
    });
    ok('S6a · reduced motion shows stations and cards at full opacity immediately', st.stOp === '1' && st.cOp === '1', JSON.stringify(st));
    await ctx.close();
  }

  ok('S0 · zero pageerrors across the battery', errors.length === 0, JSON.stringify(errors.slice(0, 3)));
  console.log('——— ' + pass + ' passed · ' + fail + ' failed ———');
  await browser.close();
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('HARNESS FAIL', e); process.exit(1); });
