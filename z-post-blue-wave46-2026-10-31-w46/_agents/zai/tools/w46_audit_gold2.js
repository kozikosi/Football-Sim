// w46 audit v2: only the ACTIVE view; skip ANCHOR/LEAK chips; walk the whole draft flow
const { chromium } = require('playwright');

const auditFn = () => {
  const out = { gold: [], nogold: [] };
  const activeView = document.querySelector('.view.active');
  const root = activeView || document.body;
  const rootId = activeView ? activeView.id : 'body';
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode: n => {
      if (!n.nodeValue || n.nodeValue.length < 6) return NodeFilter.FILTER_REJECT;
      let p = n.parentNode; while (p && p !== root) {
        if (['SCRIPT','STYLE','SELECT','OPTION','TEXTAREA','INPUT','TITLE'].includes(p.nodeName)) return NodeFilter.FILTER_REJECT;
        if (p.classList && (p.classList.contains('zpb-anch') || p.classList.contains('zpb-leak'))) return NodeFilter.FILTER_REJECT;
        p = p.parentNode;
      }
      return NodeFilter.FILTER_ACCEPT;
    }
  });
  const seen = new Set();
  while (walker.nextNode()) {
    const n = walker.currentNode;
    const txt = n.nodeValue.trim();
    const m = /^(.{3,40}?)\s*\((\d{2})\)$/.exec(txt) || /^(.{3,40}?)\s+(\d{2})$/.exec(txt);
    if (!m) continue;
    const ovr = parseInt(m[2], 10);
    if (ovr < 90) continue;
    const el = n.parentElement; if (!el) continue;
    const hasShm = !!(el.closest('.zpb-shm') || (el.classList && el.classList.contains('zpb-shm')));
    // also treat a pure-gold computed color as gold (all-pro chips etc.)
    const key = txt + '@' + rootId;
    if (seen.has(key)) continue; seen.add(key);
    const rec = { text: txt.slice(0, 46), where: rootId + ' > ' + (el.className || el.nodeName).toString().slice(0, 50) };
    (hasShm ? out.gold : out.nogold).push(rec);
  }
  return out;
};

const report = (label, r) => {
  console.log(`== ${label} == gold:${r.gold.length} MISS:${r.nogold.length}`);
  const uniq = [...new Map(r.nogold.map(x => [x.text, x])).values()];
  uniq.slice(0, 10).forEach(x => console.log('   MISS:', JSON.stringify(x)));
};

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errs = [];
  page.on('pageerror', e => errs.push('PE:' + e.message.slice(0, 100)));
  page.on('console', m => { if (m.type() === 'error') errs.push('CE:' + m.text().slice(0, 100)); });
  await page.goto('file:///home/z/my-project/download/Football-Sim-Z-post-blue-w45.html', { waitUntil: 'load' });
  await page.waitForTimeout(1500);

  await page.click('#tabPlayersBtn'); await page.waitForTimeout(500);
  report('PLAYER BROWSER', await page.evaluate(auditFn));

  await page.click('#tabGroupsBtn'); await page.waitForTimeout(600);
  report('POSITION RANKINGS', await page.evaluate(auditFn));

  await page.click('#tabRankingsBtn'); await page.waitForTimeout(600);
  await page.click('#resultsBody tr.teamrow'); await page.waitForTimeout(400);
  report('MADDEN RANKINGS + DETAIL', await page.evaluate(auditFn));

  await page.click('#tabCompareBtn'); await page.waitForTimeout(600);
  report('HOME COMPARISON', await page.evaluate(auditFn));

  // draft: Chiefs, random pick, run fast
  await page.click('#tabDraftBtn'); await page.waitForTimeout(500);
  await page.evaluate(() => { document.getElementById('draftSlotSelect').value = 'Kansas City Chiefs'; });
  await page.click('#startDraftBtn'); await page.waitForTimeout(800);
  // sim the whole draft fast if a sim button exists
  const simBtn = await page.evaluate(() => {
    const cand = [...document.querySelectorAll('button')].find(b => /sim/i.test(b.textContent) && /draft/i.test(b.textContent));
    return cand ? (cand.id || cand.textContent.trim()) : null;
  });
  console.log('draft sim button:', simBtn);
  if (simBtn) {
    await page.evaluate(id => { const b = [...document.querySelectorAll('button')].find(x => (x.id || x.textContent) === id); if (b) b.click(); }, simBtn);
    await page.waitForTimeout(1500);
  }
  // run remaining picks quickly: loop clicking next best available until review shows
  for (let i = 0; i < 60; i++) {
    const state = await page.evaluate(() => {
      const rev = document.getElementById('draftResultsBody');
      if (rev && rev.children.length) return 'review';
      const nb = [...document.querySelectorAll('button')].find(b => /draft|pick|select|confirm/i.test((b.textContent || '')) && b.offsetParent);
      return nb ? 'btn' : 'none';
    });
    if (state === 'review') break;
    if (state === 'btn') await page.evaluate(() => {
      const nb = [...document.querySelectorAll('button')].find(b => /draft|pick|select|confirm/i.test((b.textContent || '')) && b.offsetParent);
      if (nb) nb.click();
    });
    await page.waitForTimeout(220);
  }
  console.log('draft done, review reached');
  r = await page.evaluate(auditFn);
  report('DRAFT REVIEW (default tab)', r);

  // TEAM COMPARISON tab in review; set B to NFL Raiders so Crosby shows
  await page.evaluate(() => { const b = document.getElementById('resultsCompareBtn'); if (b) b.click(); });
  await page.waitForTimeout(500);
  await page.evaluate(() => {
    const selB = document.getElementById('cmpTeamB');
    if (selB) { selB.value = 'NFL:Las Vegas Raiders'; selB.dispatchEvent(new Event('change')); }
  });
  await page.waitForTimeout(500);
  report('REVIEW TEAM COMPARISON (YOU vs NFL Raiders)', await page.evaluate(auditFn));

  // YOUR ROSTER tab
  await page.evaluate(() => { const b = document.getElementById('resultsMineBtn'); if (b) b.click(); });
  await page.waitForTimeout(500);
  report('YOUR ROSTER', await page.evaluate(auditFn));

  // VS ACTUAL NFL TEAMS
  await page.evaluate(() => { const b = document.getElementById('resultsNflBtn'); if (b) b.click(); });
  await page.waitForTimeout(500);
  report('VS ACTUAL NFL TEAMS', await page.evaluate(auditFn));

  console.log('ERRORS:', errs.length ? errs.slice(0, 5) : 'none');
  await browser.close();
})();
