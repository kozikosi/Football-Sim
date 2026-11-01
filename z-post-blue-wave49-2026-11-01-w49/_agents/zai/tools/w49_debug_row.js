#!/usr/bin/env node
/* w49_debug_row.js — dump one failing player-browser row (Ja'Marr Chase) fully. */
const { chromium } = require('/home/z/my-project/node_modules/playwright-core');
const FILE = 'file:///home/z/my-project/download/Football-Sim-Z-post-blue-w49.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
  await page.goto(FILE); await page.waitForTimeout(900);
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(900);
  await page.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => /^your players$/i.test(x.textContent || '')); if (b) b.click(); });
  await page.waitForTimeout(900);
  const dump = await page.evaluate(() => {
    const find = (nm) => [...document.querySelectorAll('#playerBody tr .zpb-pb-name')].find(e => e.textContent.trim() === nm);
    const grab = (nm) => {
      const el = find(nm); if (!el) return { nm, missing: true };
      const cs = getComputedStyle(el);
      const row = el.closest('tr');
      return { nm, cls: el.className, rowStyle: (row ? row.getAttribute('style') : '').slice(0, 140),
        anim: cs.animationName, animDur: cs.animationDuration, bg: (cs.backgroundImage || 'none').slice(0, 110),
        clip: cs.webkitBackgroundClip, fill: cs.webkitTextFillColor, color: cs.color,
        animCount: el.getAnimations({ subtree: true }).length,
        rect: JSON.stringify(el.getBoundingClientRect()).slice(0, 90) };
    };
    return [grab("Ja'Marr Chase"), grab('Josh Allen'), grab('Patrick Mahomes'), grab('Lamar Jackson')];
  });
  dump.forEach(d => { console.log('\n### ' + d.nm); Object.entries(d).forEach(([k, v]) => { if (k !== 'nm') console.log('  ', k, '=', v); }); });
  await browser.close();
})().catch(e => { console.error('FATAL', e); process.exit(1); });
