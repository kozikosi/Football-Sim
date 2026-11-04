#!/usr/bin/env node
/* w53_mobile_probe.js — Z.ai's own wide mobile probe (beyond the shipped w52_mobile.js).
   Visits EVERY view at 320/360/390/430 px and measures:
   - horizontal overflow (documentElement)
   - tap targets < 40px (interactive elements visible in viewport)
   - font sizes < 12px (readability floor)
   - elements clipped off the right edge
   - boot time
   Usage: node w53_mobile_probe.js [fileURL] [tag]
*/
const { chromium } = require('/home/z/my-project/node_modules/playwright-core');
const FILE = process.argv[2] || 'file:///home/z/my-project/w52/Football-Sim-Z-post-blue-w52.html';
const TAG = process.argv[3] || 'w52';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
let PASS = 0, FAIL = 0;
const ok = (c, l, d = '') => { console.log(`   ${c ? 'PASS' : 'FAIL'}  ${l}${d ? ' — ' + d : ''}`); c ? PASS++ : FAIL++; };
const issues = [];
const note = (width, view, kind, detail) => issues.push({ width, view, kind, detail });

const VIEWS = [
  { name: 'home', goto: async (p) => {} },
  { name: 'draft', goto: async (p) => { await p.evaluate(() => { const b = document.getElementById('startDraftBtn'); if (b) b.click(); }); } },
  { name: 'players', goto: async (p) => { await p.evaluate(() => { const b = document.getElementById('tabPlayersBtn'); if (b) b.click(); }); } },
  { name: 'rankings', goto: async (p) => { await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => /madden rankings/i.test(x.textContent || '')); if (b) b.click(); }); } },
  { name: 'groups', goto: async (p) => { await p.evaluate(() => { const b = document.getElementById('tabGroupsBtn'); if (b) b.click(); }); } },
  { name: 'compare', goto: async (p) => { await p.evaluate(() => { const b = document.getElementById('tabCompareBtn'); if (b) b.click(); }); } },
  { name: 'guide', goto: async (p) => { await p.evaluate(() => { const b = document.getElementById('tabGuideBtn'); if (b) b.click(); }); } },
];

async function measure(page) {
  return page.evaluate(() => {
    const de = document.documentElement;
    const overflowX = de.scrollWidth - de.clientWidth;
    const small = [];
    for (const el of document.querySelectorAll('button, select, [role="button"], input[type="submit"], a.zpb-tab, .zpb-chip, summary')) {
      const r = el.getBoundingClientRect();
      if (r.width <= 0 || r.height <= 0) continue;
      if (r.bottom < 0 || r.top > innerHeight) continue;
      if (r.right < 0 || r.left > innerWidth) continue;
      const s = getComputedStyle(el);
      if (s.visibility === 'hidden' || s.display === 'none') continue;
      const minDim = Math.min(r.width, r.height);
      if (minDim > 0 && minDim < 40) small.push({ tag: el.tagName + (el.id ? '#' + el.id : ''), cls: (el.className || '').toString().slice(0, 40), w: Math.round(r.width), h: Math.round(r.height) });
    }
    const tiny = [];
    for (const el of document.querySelectorAll('body *')) {
      const r = el.getBoundingClientRect();
      if (r.width <= 0 || r.bottom < 0 || r.top > innerHeight) continue;
      const s = getComputedStyle(el);
      if (s.display === 'none' || s.visibility === 'hidden') continue;
      if (el.children.length) continue;
      const txt = (el.textContent || '').trim();
      if (!txt) continue;
      const fs = parseFloat(s.fontSize);
      if (fs < 12) tiny.push({ tag: el.tagName + (el.id ? '#' + el.id : ''), cls: (el.className || '').toString().slice(0, 40), fs: Math.round(fs * 10) / 10, txt: txt.slice(0, 24) });
    }
    const clipped = [];
    for (const el of document.querySelectorAll('body *')) {
      const r = el.getBoundingClientRect();
      if (r.width <= 0) continue;
      const s = getComputedStyle(el);
      if (s.display === 'none' || s.visibility === 'hidden') continue;
      if (r.right > de.clientWidth + 2 && r.left < de.clientWidth) {
        const par = el.parentElement;
        const ps = par ? getComputedStyle(par) : null;
        const parScrolls = ps && (ps.overflowX === 'auto' || ps.overflowX === 'scroll');
        if (!parScrolls) clipped.push({ tag: el.tagName + (el.id ? '#' + el.id : ''), cls: (el.className || '').toString().slice(0, 40), over: Math.round(r.right - de.clientWidth) });
      }
    }
    return { overflowX, small: small.slice(0, 12), smallN: small.length, tiny: tiny.slice(0, 10), tinyN: tiny.length, clipped: clipped.slice(0, 10), clippedN: clipped.length };
  });
}

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const widths = [320, 360, 390, 430];
  for (const width of widths) {
    const page = await browser.newPage({ viewport: { width, height: Math.round(width * 2.16) } });
    const errors = [];
    page.on('pageerror', e => errors.push(e.message.slice(0, 120)));
    const t0 = Date.now();
    await page.goto(FILE); await page.waitForTimeout(900);
    await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
    await page.reload(); await page.waitForTimeout(900);
    const bootMs = Date.now() - t0;
    await page.evaluate(() => { try { window.zpbReleaseLookGate && window.zpbReleaseLookGate(); document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
    for (const v of VIEWS) {
      try { await v.goto(page); } catch (e) { note(width, v.name, 'nav', String(e).slice(0, 80)); continue; }
      await page.waitForTimeout(700);
      await page.evaluate(() => { try { window.zpbReleaseLookGate && window.zpbReleaseLookGate(); document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
      await page.waitForTimeout(400);
      const m = await measure(page);
      const label = `${width}px · ${v.name}`;
      ok(m.overflowX <= 0, `${label}: no document overflowX`, `ox=${m.overflowX}`);
      if (m.overflowX > 0) note(width, v.name, 'overflowX', `ox=${m.overflowX}`);
      if (m.smallN > 0) note(width, v.name, 'tap<40', JSON.stringify(m.small.slice(0, 6)));
      if (m.tinyN > 0) note(width, v.name, 'font<12', JSON.stringify(m.tiny.slice(0, 6)));
      if (m.clippedN > 0) note(width, v.name, 'clipped', JSON.stringify(m.clipped.slice(0, 6)));
    }
    ok(errors.length === 0, `${width}px: zero pageerrors`, errors.slice(0, 2).join('|'));
    console.log(`   (${width}px boot≈${bootMs}ms)`);
    await page.close();
  }
  await browser.close();
  console.log(`\n=== ISSUE LOG (${issues.length}) ===`);
  for (const it of issues) console.log(`[${it.width}px ${it.view}] ${it.kind}: ${it.detail}`);
  console.log(`\nw53_mobile_probe[${TAG}]: ${PASS} pass · ${FAIL} fail · ${issues.length} notes`);
  process.exit(0);
})().catch(e => { console.error('FATAL', e); process.exit(1); });
