/* w67_probe1b.js — hunt the player-browser flashing with real interaction at phone sizes.
   Samples the panel geometry every 100ms through: open → scroll (sentinel appends) → search → filter. */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const FILE = 'file:///home/z/my-project/work/w67/baseline-w66.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  for (const VW of [{ w: 390, h: 844 }, { w: 430, h: 700 }, { w: 500, h: 740 }, { w: 760, h: 640 }]) {
    const page = await browser.newPage({ viewport: { width: VW.w, height: VW.h } });
    await page.goto(FILE); await page.waitForTimeout(400);
    await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
    await page.reload(); await page.waitForTimeout(700);
    await page.evaluate(() => { const b = document.getElementById('tabPlayersBtn'); if (b) b.click(); });
    await page.waitForTimeout(800);
    const events = [];
    let last = null;
    const sample = async (tag) => {
      const s = await page.evaluate(() => {
        const p = document.querySelector('#viewPlayers .panel');
        const t = document.getElementById('playerTable');
        if (!p || !t) return null;
        const r = p.getBoundingClientRect();
        return {
          pw: Math.round(r.width), ph: Math.round(r.height),
          tw: Math.round(t.getBoundingClientRect().width),
          rows: t.querySelectorAll('tbody tr').length,
          stacked: t.classList.contains('mstack'),
          bodyScroll: document.documentElement.scrollHeight - window.innerHeight,
          panelStyleW: getComputedStyle(p).maxWidth
        };
      });
      if (!s) return;
      const key = JSON.stringify([s.pw, s.ph, s.tw, s.rows, s.stacked]);
      if (last && key !== last.key) {
        events.push({ tag, from: last.s, to: s });
      }
      last = { key, s };
    };
    for (let i = 0; i < 20; i++) { await sample('idle'); await page.waitForTimeout(100); }
    // scroll the table to the bottom to trigger the sentinel
    for (let k = 0; k < 6; k++) {
      await page.evaluate(() => { const t = document.getElementById('playerTable'); t.scrollTop = t.scrollHeight; });
      await page.waitForTimeout(350);
      await sample('scroll');
    }
    // type a search
    await page.evaluate(() => { const i = document.getElementById('playerSearch'); i.focus(); i.value = 'a'; i.dispatchEvent(new Event('input', { bubbles: true })); });
    for (let i = 0; i < 10; i++) { await sample('search'); await page.waitForTimeout(100); }
    // clear search, choose a team filter
    await page.evaluate(() => {
      const i = document.getElementById('playerSearch'); i.value = ''; i.dispatchEvent(new Event('input', { bubbles: true }));
      const tf = document.getElementById('teamFilter'); tf.value = 'Jacksonville Jaguars'; tf.dispatchEvent(new Event('change', { bubbles: true }));
    });
    for (let i = 0; i < 12; i++) { await sample('filter'); await page.waitForTimeout(100); }
    // tiny resize wiggle across no boundary and back
    await page.setViewportSize({ width: VW.w + 4, height: VW.h });
    await page.waitForTimeout(300);
    await page.setViewportSize({ width: VW.w, height: VW.h });
    for (let i = 0; i < 15; i++) { await sample('wiggle'); await page.waitForTimeout(100); }
    console.log(`== ${VW.w}x${VW.h} ==  state-changes: ${events.length}`);
    events.slice(0, 12).forEach((e, i) => console.log(`   #${i} [${e.tag}] ${JSON.stringify(e.from)} -> ${JSON.stringify(e.to)}`));
    const end = last.s;
    console.log(`   end state: ${JSON.stringify(end)}`);
    await page.close();
  }
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
