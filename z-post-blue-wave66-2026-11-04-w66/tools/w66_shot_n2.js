/* w66_shot_n2.js — evidence shot for N2: the roster summary as two team-tinted Cinzel
   badges (zpb-rbadge) in the draft room's YOUR ROSTER panel — shot LIVE, mid-draft,
   after three hand-made picks at 1.01. */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const FILE = 'file:///home/z/my-project/work/w66/Football-Sim-Z-post-blue-w66.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  page.on('pageerror', e => console.log('PAGEERROR:', e.message.slice(0, 200)));
  await page.goto(FILE); await page.waitForTimeout(400);
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(600);
  await page.evaluate(() => {
    const s = document.getElementById('draftSlotSelect');
    if (s) { s.value = 'Detroit Lions'; s.dispatchEvent(new Event('change', { bubbles: true })); }
    const pk = document.getElementById('draftPickNumberSelect'); if (pk) { pk.value = '1'; pk.dispatchEvent(new Event('change', { bubbles: true })); }
    document.getElementById('startDraftBtn').click();
  });
  await page.waitForTimeout(9000); // the welcome cinematic fires the CPU kickoff on its own

  const myTurn = () => page.evaluate(() => {
    try { if (!(draftSim && draftSim.pos % 32 === 0 && draftSim.pos < 32 * 12)) return false;
      return [...document.querySelectorAll('#draftBody2 .dc-btn button')].some(x => !x.disabled); } catch (e) { return false; }
  });
  const makePick = () => page.evaluate(() => { const b = [...document.querySelectorAll('#draftBody2 .dc-btn button')].find(x => !x.disabled); if (b) { b.click(); return true; } return false; });

  // one hand-made pick at 1.01 — the roster panel re-renders with the two badges (dbg-verified)
  let picked = false;
  for (let i = 0; i < 60 && !picked; i++) {
    if (await myTurn()) { picked = await makePick(); }
    if (!picked) await page.waitForTimeout(150);
  }
  if (!picked) { console.log('N2 SHOT FAIL — the 1.01 pick never landed'); process.exit(1); }
  await page.waitForTimeout(800);
  const info = await page.evaluate(() => {
    const el = document.getElementById('draftRosterTotal');
    if (!el) return { ok: false, why: 'no el' };
    el.scrollIntoView({ block: 'center' });
    const badges = el.querySelectorAll('.zpb-rbadge');
    const r = el.getBoundingClientRect();
    return { ok: badges.length === 2 && r.height > 10 && r.width > 100, n: badges.length,
             h: Math.round(r.height), w: Math.round(r.width), pos: draftSim ? draftSim.pos : -1,
             text: el.textContent.replace(/\s+/g, ' ').trim().slice(0, 120) };
  });
  console.log('N2 probe:', JSON.stringify(info));
  if (!info.ok) { console.log('N2 SHOT FAIL — badges not visible'); process.exit(1); }
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/home/z/my-project/work/w66/shots/w66-roster-badges.png' });
  console.log('N2 SHOT OK');
  await browser.close();
})().catch(e => { console.error('N2 SHOT FAIL', e.message); process.exit(1); });
