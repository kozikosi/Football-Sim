/* w57_otc.js — the Owner's "name and draft button on the top line" verified ON THE CLOCK,
 * where the button actually renders (canPick = draftSim.awaitingUser). Also the w55 tap
 * floor (40px), FILLS under the button, the GONE label whole, and the card height. */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const FILE = 'file:///home/z/my-project/w57/builds/Football-Sim-Z-post-blue-w57.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
const SHOTS = '/home/z/my-project/w57/shots';

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const errors = [];
  let fails = 0;
  const ok = (name, cond, detail) => { console.log((cond ? 'ok   ' : 'FAIL ') + name + (detail ? '  · ' + detail : '')); if (!cond) fails++; };

  for (const w of [390, 320, 430]) {
    const page = await browser.newPage({ viewport: { width: w, height: 900 } });
    page.on('pageerror', e => errors.push(w + ': ' + String(e).slice(0, 100)));
    await page.goto(FILE); await page.waitForTimeout(700);
    await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
    await page.reload(); await page.waitForTimeout(700);
    await page.evaluate(() => { const b = document.getElementById('tabDraftBtn'); if (b) b.click(); });
    await page.waitForTimeout(350);
    await page.evaluate(() => { const b = document.getElementById('startDraftBtn'); if (b) b.click(); });
    await page.waitForTimeout(1400);
    await page.evaluate(() => { try { if (window._zpbWelCleanup) window._zpbWelCleanup(); document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
    await page.waitForTimeout(300);
    // go ON THE CLOCK through the site's own state + render path
    const otc = await page.evaluate(() => {
      try {
        draftSim.awaitingUser = true;
        renderDraftLive();
        return { ok: true, canPickNow: draftSim.awaitingUser === true };
      } catch (e) { return { err: String(e).slice(0, 120) }; }
    });
    await page.waitForTimeout(450);
    const m = await page.evaluate(() => {
      const tr = document.querySelector('#draftTable2 tbody tr');
      if (!tr) return { norow: true };
      const cell = tr.querySelector('.dc-btn');
      const btn = cell ? cell.querySelector('button') : null;
      const r = el => { if (!el) return null; const b = el.getBoundingClientRect(); return { l: +b.left.toFixed(1), t: +b.top.toFixed(1), r: +b.right.toFixed(1), b: +b.bottom.toFixed(1), h: +b.height.toFixed(1), w: +b.width.toFixed(1) }; };
      const name = tr.querySelector('.dc-name');
      const fills = tr.querySelector('.dc-fills');
      const gone = tr.querySelector('.dc-gone');
      const gcs = gone ? getComputedStyle(gone, '::before') : null;
      const goneClip = (() => { // the label must paint whole inside its cell: scrollWidth of a probe
        if (!gone) return null;
        const probe = document.createElement('span');
        probe.style.cssText = 'position:absolute;visibility:hidden;white-space:nowrap;font:800 ' + gcs.fontSize + ' ' + gcs.fontFamily + ';letter-spacing:' + getComputedStyle(gone).letterSpacing + ';text-transform:uppercase;';
        probe.textContent = 'GONE';
        document.body.appendChild(probe);
        const wpx = probe.getBoundingClientRect().width;
        probe.remove();
        return { labelW: +wpx.toFixed(1), cellW: +gone.getBoundingClientRect().width.toFixed(1) };
      })();
      return {
        btnText: btn ? btn.textContent.trim() : null, btn: r(btn), name: r(name), fills: r(fills),
        btnMinH: btn ? getComputedStyle(btn).minHeight : null,
        rowH: +tr.getBoundingClientRect().height.toFixed(1),
        goneLabel: gcs ? gcs.content : null, goneFit: goneClip,
        trRow1: name ? getComputedStyle(name).gridRowStart : null,
        btnRow1: cell ? getComputedStyle(cell).gridRowStart : null
      };
    });
    if (w === 390) await page.evaluate(() => document.getElementById('draftTable2').scrollIntoView());
    await page.waitForTimeout(250);
    if (w === 390 || w === 320) await page.screenshot({ path: SHOTS + '/w57-' + w + '-draftcard-otc.png' });
    console.log('--- ' + w + 'px ---');
    ok(w + ' OTC state reached', !!otc.ok, JSON.stringify(otc));
    ok(w + ' the Draft button RENDERS', !!m.btnText, 'text=' + m.btnText + ' rect=' + JSON.stringify(m.btn));
    if (m.btn) {
      ok(w + ' button shares row 1 with the name', m.trRow1 === '1' && m.btnRow1 === '1', 'name=row' + m.trRow1 + ' btn=row' + m.btnRow1);
      ok(w + ' button vertically on the top line (center within name band)', m.btn.t >= m.name.t - 14 && m.btn.b <= m.name.b + 30, 'name ' + m.name.t + '-' + m.name.b + ' btn ' + m.btn.t + '-' + m.btn.b);
      ok(w + ' the w55 tap floor holds (min-height 40px)', m.btnMinH === '40px', 'minHeight=' + m.btnMinH);
      const fillsUnder = m.fills && m.btn && Math.abs(m.fills.t - m.btn.b) < 30 && m.fills.r <= m.btn.r + 2;
      ok(w + ' FILLS sits directly under the Draft button', !!fillsUnder, 'btn.b=' + m.btn.b + ' fills.t=' + m.fills.t + ' fills.r=' + m.fills.r + ' btn.r=' + m.btn.r);
      ok(w + ' card compact on the clock (≤ 106px)', m.rowH <= 106, 'rowH=' + m.rowH);
    }
    ok(w + ' the GONE label fits its cell', m.goneFit && m.goneFit.labelW <= m.goneFit.cellW + 0.5, JSON.stringify(m.goneFit));
    await page.close();
  }
  console.log('page errors: ' + (errors.length ? errors.join(' | ') : 'none'));
  console.log(fails === 0 && errors.length === 0 ? 'OTC: ALL GREEN' : 'OTC: ' + fails + ' fails');
  await browser.close();
  process.exit(fails === 0 && errors.length === 0 ? 0 : 1);
})();
