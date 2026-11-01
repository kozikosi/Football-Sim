/* w52_syncprobe2.js — drill into the group release walk: which groups release on the map's clock */
const { chromium } = require('/home/z/my-project/node_modules/playwright-core');
const FILE = 'file:///home/z/my-project/w52/Football-Sim-Z-post-blue-w52.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  page.on('pageerror', e => console.log('PAGEERR', String(e).slice(0, 160)));
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
  for (let i = 0; i < 16; i++) { const fin = await page.evaluate(() => !!document.querySelector('.zpb-fin')); if (!fin) break; await page.waitForTimeout(500); }

  const snap = tag => page.evaluate(t => {
    const m = document.querySelector('.zpb-fm');
    const gs = [...document.querySelectorAll('.zpb-dbk-g')];
    const dzs = [...document.querySelectorAll('.zpb-dz')];
    const vis = el => { const r = el.getBoundingClientRect(); return r.top < innerHeight && r.bottom > 0; };
    return {
      t, mapSeen: m ? m.classList.contains('zpb-seen') : null, mapCine: m ? m.style.getPropertyValue('--dfc-cine') : null,
      mapRectTop: m ? Math.round(m.getBoundingClientRect().top) : null,
      groups: gs.map(g => ({ seen: g.classList.contains('zpb-seen'), cine: g.style.getPropertyValue('--dfc-cine'), top: Math.round(g.getBoundingClientRect().top), inView: vis(g) })),
      dz: dzs.map(g => ({ seen: g.classList.contains('zpb-seen'), cine: g.style.getPropertyValue('--dfc-cine') })),
      ancTest: (() => { // replicate the walk exactly
        if (!m) return null;
        let _anc = m.parentElement, hops = 0, found = null;
        while (_anc && _anc !== document.body && !_anc.querySelector('.zpb-dbk-g')) { _anc = _anc.parentElement; hops++; }
        if (_anc && _anc !== document.body) found = (_anc.id || _anc.className || 'unknown').toString().slice(0, 40);
        else if (_anc === document.body) found = 'BODY';
        return { found, hops };
      })()
    };
  }, tag);

  console.log('pre-look :', JSON.stringify(await snap('pre')));
  await page.evaluate(() => { const m = document.querySelector('.zpb-fm'); if (m) m.scrollIntoView({ block: 'center' }); });
  await page.waitForTimeout(700);
  console.log('look+700 :', JSON.stringify(await snap('look')));
  // scroll the cards into view like a reader
  await page.evaluate(() => { const g = document.querySelectorAll('.zpb-dbk-g')[3]; if (g) g.scrollIntoView({ block: 'center' }); });
  await page.waitForTimeout(700);
  console.log('scroll g4:', JSON.stringify(await snap('g4')));

  // Now the ROSTER tab path (map + depth zones, no dbk-g)
  await page.evaluate(() => { try { document.getElementById('resultsMineBtn').click(); } catch (e) {} });
  await page.waitForTimeout(1200);
  console.log('roster   :', JSON.stringify(await snap('roster')));
  await page.evaluate(() => { const m = document.querySelector('#draftResultsBody .zpb-fm') || document.querySelector('.zpb-fm'); if (m) m.scrollIntoView({ block: 'center' }); });
  await page.waitForTimeout(800);
  console.log('roster lk:', JSON.stringify(await snap('roster+look')));
  await browser.close();
})().catch(e => { console.error('HARNESS FAIL', e); process.exit(1); });
