#!/usr/bin/env node
/* w45_see5.js — the Team Comparison tab: dropdown open + lineup cells (light + dark). */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright/node_modules/playwright-core');
const FILE = 'file://' + process.cwd() + '/Football-Sim-Z-post-blue-w45.html';
const OUT = process.cwd() + '/evidence';
const fs = require('fs'); fs.mkdirSync(OUT, { recursive: true });
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
const shot = async (page, path) => { try { await page.screenshot({ path, timeout: 15000 }); } catch (e) { console.log('   (shot skipped)'); } };
(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: exe, args: ['--disable-dev-shm-usage','--no-sandbox','--disable-gpu'] });
  for (const theme of ['light','dark']) {
    const ctx = await browser.newContext({ viewport: { width: 1180, height: 1400 } });
    const page = await ctx.newPage();
    await page.goto(FILE, { waitUntil: 'domcontentloaded', timeout: 90000 });
    await page.waitForTimeout(1400);
    await page.evaluate(t => document.documentElement.setAttribute('data-theme', t), theme);
    await page.evaluate(() => { try{ zpbApplyTeamTheme('Kansas City Chiefs'); }catch(e){} });
    await page.waitForTimeout(300);
    // switch to the home Team Comparison tab
    const clicked = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button, .tabbtn, [role=tab]'));
      const b = btns.find(x=>/^TEAM COMPARISON$/i.test((x.textContent||'').trim()));
      if(b){ b.click(); return b.textContent.trim(); }
      return null;
    });
    console.log(theme, 'tab:', clicked);
    await page.waitForTimeout(800);
    // open dropdown B
    await page.evaluate(() => {
      const sel = document.getElementById('homeCmpB');
      const wrap = sel && sel.closest('.zpb-selwrap');
      const btn = wrap && wrap.querySelector('.zpb-selbtn');
      if(btn) btn.click();
    });
    await page.waitForTimeout(600);
    await shot(page, `${OUT}/cmp-tab-open-${theme}-w45.png`);
    await page.evaluate(() => { document.querySelectorAll('.zpb-selwrap.open').forEach(w=>w.classList.remove('open')); });
    await page.waitForTimeout(300);
    // select Chiefs vs Raiders so the lineup table shows the once-faded cells
    await page.evaluate(() => {
      const a = document.getElementById('homeCmpA'), b = document.getElementById('homeCmpB');
      if(a && b){ a.value = 'Kansas City Chiefs'; b.value = 'Las Vegas Raiders';
        a.dispatchEvent(new Event('change', {bubbles:true})); b.dispatchEvent(new Event('change', {bubbles:true})); }
    });
    await page.waitForTimeout(900);
    await shot(page, `${OUT}/cmp-tab-lineup-${theme}-w45.png`);
    await ctx.close();
  }
  await browser.close();
  console.log('done');
})().catch(e => { console.error('HARNESS ERROR', e.message); process.exit(1); });
