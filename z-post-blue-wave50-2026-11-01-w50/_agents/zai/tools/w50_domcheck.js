#!/usr/bin/env node
/* w49_domcheck.js — tier-law check for surfaces whose name and OVR live in separate elements
   (invisible to the text-walker): the Player Browser rows and the Position Rankings rows
   (including a Series view). Every 90+ name must carry .zpb-shm + sweep; 85+ .zpb-vib. */
const { chromium } = require('/home/z/my-project/node_modules/playwright-core');
const FILE = 'file:///home/z/my-project/download/Football-Sim-Z-post-blue-w50.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
let PASS = 0, FAIL = 0;
const ok = (c, l, d = '') => { console.log(`   ${c ? 'PASS' : 'FAIL'}  ${l}${d ? ' — ' + d : ''}`); c ? PASS++ : FAIL++; };

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message.slice(0, 120)));
  await page.goto(FILE); await page.waitForTimeout(900);
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(900);

  const rowCheck = () => page.evaluate(() => {
    // player browser: name cell + score cell in one row
    const rows = [...document.querySelectorAll('#playerBody tr')].filter(r => r.querySelector('.zpb-pb-name'));
    const res = { n: 0, bad90: [], bad85: [] };
    rows.forEach(r => {
      const nameEl = r.querySelector('.zpb-pb-name');
      const scoreEl = r.querySelector('.score');
      if (!nameEl || !scoreEl) return;
      const ovr = parseInt(scoreEl.textContent, 10);
      if (!(ovr >= 85)) return;
      res.n++;
      if (ovr >= 90) {
        const shm = nameEl.classList.contains('zpb-shm');
        const cs = getComputedStyle(nameEl);
        const sweep = (cs.animationName === 'zpbshmsweep' || cs.animationName === 'fxshine')
          && (cs.backgroundImage || '').includes('linear-gradient') && cs.webkitBackgroundClip === 'text';
        if (!shm || !sweep) res.bad90.push(nameEl.textContent.trim() + ':' + (shm ? 'no-sweep(' + cs.animationName + ')' : 'no-shm'));
      } else if (!nameEl.classList.contains('zpb-vib')) {
        res.bad85.push(nameEl.textContent.trim());
      }
    });
    return res;
  });

  const groupCheck = () => page.evaluate(() => {
    // position rankings: .zpb-gplayer with .zpb-gname + .zpb-gnum siblings
    const els = [...document.querySelectorAll('.zpb-gplayer')];
    const res = { n: 0, bad90: [], bad85: [] };
    els.forEach(g => {
      const nameEl = g.querySelector('.zpb-gname');
      const numEl = g.querySelector('.zpb-gnum');
      if (!nameEl || !numEl) return;
      const ovr = parseInt(numEl.textContent, 10);
      if (!(ovr >= 85)) return;
      res.n++;
      if (ovr >= 90) {
        const shm = nameEl.classList.contains('zpb-shm');
        const cs = getComputedStyle(nameEl);
        const sweep = (cs.animationName === 'zpbshmsweep' || cs.animationName === 'fxshine')
          && (cs.backgroundImage || '').includes('linear-gradient') && cs.webkitBackgroundClip === 'text';
        if (!shm || !sweep) res.bad90.push(nameEl.textContent.trim() + ':' + (shm ? 'no-sweep(' + cs.animationName + ')' : 'no-shm'));
      } else if (!nameEl.classList.contains('zpb-vib')) {
        res.bad85.push(nameEl.textContent.trim());
      }
    });
    return res;
  });

  console.log('A · Player browser (DOM tier law, 1200+ rows)');
  await page.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => /^your players$/i.test(x.textContent || '')); if (b) b.click(); });
  await page.waitForTimeout(900);
  for (const theme of ['dark', 'light']) {
    await page.evaluate(t => document.documentElement.setAttribute('data-theme', t), theme);
    await page.waitForTimeout(350);
    const r = await rowCheck();
    ok(r.bad90.length === 0, `player browser · ${theme}: every 90+ name sweeps (${r.n} tiered rows)`, (r.bad90 || []).slice(0, 3).join(','));
    ok(r.bad85.length === 0, `player browser · ${theme}: every 85+ name reads bold`, (r.bad85 || []).slice(0, 3).join(','));
  }

  console.log('B · Position rankings (DOM tier law)');
  await page.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => /position rankings/i.test(x.textContent || '')); if (b) b.click(); });
  await page.waitForTimeout(900);
  for (const theme of ['dark', 'light']) {
    await page.evaluate(t => document.documentElement.setAttribute('data-theme', t), theme);
    await page.waitForTimeout(350);
    const g = await groupCheck();
    ok(g.bad90.length === 0, `position rankings · ${theme}: every 90+ name sweeps (${g.n} tiered players)`, (g.bad90 || []).slice(0, 3).join(','));
    ok(g.bad85.length === 0, `position rankings · ${theme}: every 85+ name reads bold`, (g.bad85 || []).slice(0, 3).join(','));
  }
  // a Series view too
  await page.evaluate(() => {
    const sel = document.getElementById('groupSelect');
    const opt = [...sel.options].find(o => o.value.startsWith('zpbS:'));
    if (opt) { sel.value = opt.value; sel.dispatchEvent(new Event('change', { bubbles: true })); }
  });
  await page.waitForTimeout(800);
  const gs = await groupCheck();
  ok(gs.n === 0 || gs.bad90.length === 0, 'position rankings · The Series: every 90+ name sweeps', (gs.bad90 || []).slice(0, 3).join(','));

  ok(errors.length === 0, 'zero page errors', errors.slice(0, 3).join(' | '));
  console.log(`\nw49_domcheck: ${PASS} pass · ${FAIL} fail`);
  await browser.close();
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error('FATAL', e); process.exit(1); });
