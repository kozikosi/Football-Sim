/* w52_syncprobe4.js — manual row open: does the NEW map cascade without a second click? */
const { chromium } = require('/home/z/my-project/node_modules/playwright-core');
const FILE = 'file:///home/z/my-project/w52/Football-Sim-Z-post-blue-w52.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
const visMap = () => [...document.querySelectorAll('.zpb-fm')].find(m => m.offsetParent !== null);

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  page.on('pageerror', e => console.log('PAGEERR', String(e).slice(0, 160)));
  await page.goto(FILE); await page.waitForTimeout(700);
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(700);
  await page.evaluate(() => { const b = document.getElementById('startDraftBtn'); if (b) b.click(); });
  await page.waitForTimeout(900);
  await page.evaluate(() => { const i = document.getElementById('speedInstantBtn'); if (i) i.click(); const s = document.getElementById('simToEndBtn'); if (s) s.click(); });
  for (let i = 0; i < 40; i++) {
    const done = await page.evaluate(() => { try { return !!(draftSim && draftSim.pos >= 32 * 12); } catch (e) { return false; } });
    if (done) break;
    await page.waitForTimeout(400);
  }
  await page.waitForTimeout(1200);
  for (let i = 0; i < 16; i++) { const fin = await page.evaluate(() => !!document.querySelector('.zpb-fin')); if (!fin) break; await page.waitForTimeout(500); }

  // close the auto-opened user detail
  await page.evaluate(() => {
    const open = document.querySelector('.detailrow[style*="table"]');
    if (open) { const idx = open.id.replace('detailrow-', ''); const tr = document.querySelector('tr.teamrow[data-idx="' + idx + '"]'); if (tr) tr.click(); }
  });
  await page.waitForTimeout(300);
  await page.evaluate(() => { const rows = [...document.querySelectorAll('tr.teamrow')]; rows[rows.length - 1].click(); });
  await page.waitForTimeout(400);
  const s0 = await page.evaluate(() => {
    const m = window.visMap ? null : null;
    const vm = [...document.querySelectorAll('.zpb-fm')].find(x => x.offsetParent !== null);
    return { maps: document.querySelectorAll('.zpb-fm').length, vmSeen: vm ? vm.classList.contains('zpb-seen') : null, vmZseen: vm ? vm.getAttribute('data-zseen') : null, top: vm ? Math.round(vm.getBoundingClientRect().top) : null };
  });
  console.log('manual open, visible map:', JSON.stringify(s0));
  // user motion: scroll to it
  await page.evaluate(() => { const vm = [...document.querySelectorAll('.zpb-fm')].find(x => x.offsetParent !== null); if (vm) vm.scrollIntoView({ block: 'center' }); });
  await page.waitForTimeout(1200);
  const s1 = await page.evaluate(() => {
    const vm = [...document.querySelectorAll('.zpb-fm')].find(x => x.offsetParent !== null);
    const st = vm && vm.querySelector('.zpb-fm-ini[data-beat]');
    return { seen: vm ? vm.classList.contains('zpb-seen') : null, zseen: vm ? vm.getAttribute('data-zseen') : null, anim: st ? getComputedStyle(st).animationName : null, op: st ? getComputedStyle(st).opacity : null };
  });
  console.log('after scroll (no 2nd click):', JSON.stringify(s1));
  // NOW a second click anywhere (arm re-arms on capture)
  await page.evaluate(() => document.body.click());
  await page.waitForTimeout(1200);
  const s2 = await page.evaluate(() => {
    const vm = [...document.querySelectorAll('.zpb-fm')].find(x => x.offsetParent !== null);
    const st = vm && vm.querySelector('.zpb-fm-ini[data-beat]');
    return { seen: vm ? vm.classList.contains('zpb-seen') : null, anim: st ? getComputedStyle(st).animationName : null, op: st ? getComputedStyle(st).opacity : null };
  });
  console.log('after a 2nd click:', JSON.stringify(s2));
  await browser.close();
})().catch(e => { console.error('HARNESS FAIL', e); process.exit(1); });
