import { chromium } from 'playwright';
import { statSync } from 'node:fs';
const url = 'file://' + process.cwd() + '/dist/index.html';
const errors = [], blocked = [];
const browser = await chromium.launch({ args: process.env.FLAG ? ['--allow-file-access-from-files'] : [] });
const ctx = await browser.newContext({ viewport: { width: 390, height: 800 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', e => errors.push('pageerror: ' + e.message));
page.on('request', r => { if (!r.url().startsWith('file://')) blocked.push(r.url()); });
const t0 = Date.now();
let mounted = null, mountErr = null;
try { await page.goto(url, { waitUntil: 'load' }); } catch (e) { mountErr = e.message; }
try { await page.waitForSelector('.pcard', { timeout: 8000 }); mounted = Date.now() - t0; } catch { mounted = null; }
const dims = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, vw: window.innerWidth,
  cards: document.querySelectorAll('.pcard').length,
  first: document.querySelector('.pcard')?.innerText.replace(/\n+/g,' | ') }));
await page.screenshot({ path: 'shot-390.png', fullPage: true });
console.log(JSON.stringify({ flag: !!process.env.FLAG, url, mountedMs: mounted, mountErr, errors, blocked, dims,
  jsBytes: statSync('dist/assets/' + process.env.JS).size }, null, 1));
await browser.close();
