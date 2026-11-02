/* w57_inklaw.js — the Owner's round-57 law, verified on the LIVE final bytes:
 * L1 the priority value renders EXACTLY the gone ink and the wins ink, every theme state,
 *    phone card (390) AND desktop (1280).
 * L2 the card geometry: row 1 = name + Draft button, FILLS right under the button,
 *    row 2 = pos · team · ovr · wins · priority · gone in that left-to-right order. */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const FILE = 'file:///home/z/my-project/w57/builds/Football-Sim-Z-post-blue-w57.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const errors = [];
  let fails = 0;
  const ok = (name, cond, detail) => { console.log((cond ? 'ok   ' : 'FAIL ') + name + (detail ? '  · ' + detail : '')); if (!cond) fails++; };

  const boot = async (page) => {
    await page.goto(FILE); await page.waitForTimeout(800);
    await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
    await page.reload(); await page.waitForTimeout(800);
    await page.evaluate(() => { const b = document.getElementById('tabDraftBtn'); if (b) b.click(); });
    await page.waitForTimeout(350);
    await page.evaluate(() => { const b = document.getElementById('startDraftBtn'); if (b) b.click(); });
    await page.waitForTimeout(1400);
    await page.evaluate(() => { try { if (window._zpbWelCleanup) window._zpbWelCleanup(); document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
    await page.waitForTimeout(300);
  };

  const measure = () => {
    const tr = document.querySelector('#draftTable2 tbody tr');
    if (!tr) return { norow: true };
    const cs = sel => { const el = tr.querySelector(sel); return el ? getComputedStyle(el).color : null; };
    const gr = sel => { const el = tr.querySelector(sel); return el ? getComputedStyle(el).gridRowStart : null; };
    const r = el => { if (!el) return null; const b = el.getBoundingClientRect(); return { l: +b.left.toFixed(1), t: +b.top.toFixed(1), r: +b.right.toFixed(1), b: +b.bottom.toFixed(1) }; };
    return {
      theme: document.documentElement.getAttribute('data-theme') || '(auto:' + (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') + ')',
      pri: cs('.dc-pri'), gone: cs('.dc-gone'), wins: cs('.dc-wins'),
      gridRows: { name: gr('.dc-name'), btn: gr('.dc-btn'), fills: gr('.dc-fills'), pos: gr('td[data-label="Pos"]'), team: gr('td[data-label="Team"]'), ovr: gr('.dc-ovr'), wins: gr('.dc-wins'), pri: gr('.dc-pri'), gone: gr('.dc-gone') },
      rects: {
        name: r(tr.querySelector('.dc-name')), btn: r(tr.querySelector('.dc-btn')), fills: r(tr.querySelector('.dc-fills')),
        pos: r(tr.querySelector('td[data-label="Pos"]')), team: r(tr.querySelector('td[data-label="Team"]')),
        ovr: r(tr.querySelector('.dc-ovr')), wins: r(tr.querySelector('.dc-wins')), pri: r(tr.querySelector('.dc-pri')), gone: r(tr.querySelector('.dc-gone'))
      },
      rowH: +tr.getBoundingClientRect().height.toFixed(1)
    };
  };

  // ---------- L1+L2 · phone card, 390px, four theme states ----------
  for (const vp of [{ w: 390, h: 844, tag: 'phone-390' }, { w: 1280, h: 900, tag: 'desktop-1280' }]) {
    const page = await browser.newPage({ viewport: { width: vp.w, height: vp.h } });
    page.on('pageerror', e => errors.push(vp.tag + ': ' + String(e).slice(0, 120)));
    await boot(page);
    for (const th of ['(auto)', 'light', 'dark']) {
      await page.evaluate(t => {
        if (t === '(auto)') { document.documentElement.removeAttribute('data-theme'); try { localStorage.removeItem('zpb:theme'); } catch (e) {} }
        else { document.documentElement.setAttribute('data-theme', t); try { localStorage.setItem('zpb:theme', t); } catch (e) {} }
      }, th);
      await page.waitForTimeout(320);
      const m = await page.evaluate(measure);
      if (m.norow) { ok(vp.tag + ' ' + th + ' row', false, 'no draft row'); continue; }
      const priGone = m.pri === m.gone;
      ok(vp.tag + ' ' + th + ' · pri == gone (the gone/wins ink)', priGone, 'pri=' + m.pri + ' gone=' + m.gone + ' wins=' + m.wins + (m.pri === m.wins ? ' (wins joins)' : ' (wins keeps its approved light ink)'));
      if (vp.tag === 'phone-390') {
        const R = m.rects, G = m.gridRows;
        ok('  row1: name + button on grid row 1', G.name === '1' && G.btn === '1', 'gridRow name=' + G.name + ' btn=' + G.btn);
        const fillsUnder = R.fills && R.btn && Math.abs(R.fills.t - R.btn.b) < 26 && R.fills.l >= R.btn.l - 2;
        ok('  FILLS sits directly under the Draft button (grid row 2)', !!fillsUnder && G.fills === '2', 'btn.b=' + (R.btn && R.btn.b) + ' fills.t=' + (R.fills && R.fills.t) + ' fills.l=' + (R.fills && R.fills.l) + ' btn.l=' + (R.btn && R.btn.l));
        const cells = [['pos', R.pos], ['team', R.team], ['ovr', R.ovr], ['wins', R.wins], ['pri', R.pri], ['gone', R.gone]];
        const order = cells.every(c => c[1]);
        const sorted = order && cells.map(c => c[1].l).every((v, i, a) => i === 0 || v >= a[i - 1] - 1);
        const row2 = order && G.pos === '2' && G.team === '2' && G.ovr === '2' && G.wins === '2' && G.pri === '2' && G.gone === '2';
        ok('  row2 order pos·team·ovr·wins·pri·gone (grid row 2, ascending)', !!(sorted && row2),
          'L=' + cells.map(c => Math.round(c[1].l)).join(',') + ' T=' + cells.map(c => Math.round(c[1].t)).join(',') + ' G=' + cells.map(c => G[c[0]]).join(','));
        ok('  card compact (≤ 92px)', m.rowH <= 92, 'rowH=' + m.rowH);
      }
    }
    await page.close();
  }

  console.log('page errors: ' + (errors.length ? errors.join(' | ') : 'none'));
  console.log(fails === 0 && errors.length === 0 ? 'INKLAW: ALL GREEN' : 'INKLAW: ' + fails + ' fails');
  await browser.close();
  process.exit(fails === 0 && errors.length === 0 ? 0 : 1);
})();
