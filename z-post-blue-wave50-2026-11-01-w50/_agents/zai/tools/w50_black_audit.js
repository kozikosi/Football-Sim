/* w50_black_audit.js — walk every page/state, collect rendered text colors, flag black-ish */
const { chromium } = require('/home/z/my-project/node_modules/playwright-core');
const FILE = 'file:///home/z/my-project/w50work/Football-Sim-Z-post-blue-w50.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 1400 } });
  await page.goto(FILE); await page.waitForTimeout(900);
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(900);

  const audit = () => page.evaluate(() => {
    const out = {};
    const push = (k, v) => { (out[k] = out[k] || []); if (out[k].length < 14) out[k].push(v); };
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const seen = new Set();
    while (walker.nextNode()) {
      const t = walker.currentNode;
      const txt = (t.textContent || '').trim();
      if (!txt) continue;
      const el = t.parentElement;
      if (!el) continue;
      const cs = getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden' || +cs.opacity === 0) continue;
      // skip shimmer/gradient text (transparent fill)
      if (cs.color === 'rgba(0, 0, 0, 0)' || cs.webkitTextFillColor === 'rgba(0, 0, 0, 0)') continue;
      const col = cs.color;
      const m = col.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
      if (!m) continue;
      const r = +m[1], g = +m[2], b = +m[3], a = m[4] === undefined ? 1 : +m[4];
      if (a < 0.5) continue;
      const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
      const l = (mx + mn) / 2 / 255;
      if (l < 0.24) {
        const view = document.querySelector('.view.active');
        const key = view ? view.id : 'global';
        // classify location
        const chain = [];
        let n = el;
        while (n && chain.length < 4) { const id = n.id ? '#' + n.id : (n.className && typeof n.className === 'string' ? '.' + n.className.split(' ').slice(0, 2).join('.') : ''); chain.push(n.tagName.toLowerCase() + id); n = n.parentElement; }
        push(key + '  L=' + l.toFixed(2) + '  ' + col, JSON.stringify({ text: txt.slice(0, 42), el: chain.join(' < ') }));
      }
    }
    return out;
  });

  const tabs = [['tabDraftBtn','draft'], ['tabRankingsBtn','rankings'], ['tabPlayersBtn','players'], ['tabGroupsBtn','groups'], ['tabCompareBtn','compare'], ['tabGuideBtn','guide']];
  for (const theme of ['light', 'dark']) {
    for (const [id, name] of tabs) {
      await page.evaluate(tid => { const b = document.getElementById(tid); if (b) b.click(); }, id);
      await page.waitForTimeout(500);
      await page.evaluate(t => document.documentElement.setAttribute('data-theme', t), theme);
      await page.waitForTimeout(350);
      const res = await audit();
      for (const k of Object.keys(res)) console.log(`[${theme}/${name}]`, k, '→', res[k].slice(0, 6).map(x => x.text || x).join(' | '));
    }
  }
  await browser.close();
})().catch(e => { console.error('FATAL', e); process.exit(1); });
