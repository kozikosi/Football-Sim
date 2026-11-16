// ERNIE — council probe, 2026-11-16. Read-only against the Cakepanz shell (67-cakepanz-s3-s4-rev2, pin 4ca9a071).
// Measures what the battery does NOT: per-screen DOM node counts (Part 12), 390 px horizontal overflow,
// console errors, and the light-mode / team-palette / font question (Part 13).
// Usage: node probe-dom.mjs [port]   (expects `vite preview` running)
import { createRequire } from 'node:module';
const _req = createRequire(import.meta.url);
let pw; try { pw = _req('playwright'); } catch { pw = _req(process.env.HOME + '/.npm-global/lib/node_modules/playwright'); }
const PORT = process.env.CP_PORT || '4179';
const URL = `http://localhost:${PORT}/`;

const browser = await pw.chromium.launch({ args: ['--no-sandbox'] });
const out = {};
const nodes = (page) => page.evaluate(() => document.querySelectorAll('*').length);

// ---------- desktop walk -----------------------------------------------------
{
  const page = await browser.newPage({ viewport: { width: 1180, height: 950 } });
  const errs = [];
  page.on('pageerror', (e) => errs.push(String(e)));
  page.on('console', (m) => { if (m.type() === 'error') errs.push('console: ' + m.text()); });
  await page.goto(URL + '?dev=1');
  await page.waitForTimeout(3000);
  out.teamSelect = await nodes(page);

  // pick the first team chip, then START
  await page.click('button.cp-ts-team');
  await page.waitForTimeout(300);
  out.teamSelectChosen = await nodes(page);
  const start = await page.$('button.cp-ts-go');
  if (start) { await start.click(); await page.waitForTimeout(3000); } else out.startMissing = true;
  out.board = await nodes(page);

  // open the first slot picker
  const slotBtn = await page.$('button.cp-slot, button:has-text("Fills")');
  if (slotBtn) { await slotBtn.click(); await page.waitForTimeout(600); }
  out.boardPickerOpen = await nodes(page);

  // the saves / load panel
  const saveBtn = await page.$('button:has-text("LOAD"), button:has-text("Saves"), button:has-text("SAVE")');
  if (saveBtn) { await saveBtn.click(); await page.waitForTimeout(600); }
  out.panelAfterLoad = await nodes(page);

  out.pageErrorsDesktop = errs;
  await page.close();
}

// ---------- the feed (complete the draft through the store, then PLAY WEEK 1)
{
  const page = await browser.newPage({ viewport: { width: 1180, height: 950 } });
  const errs = [];
  page.on('pageerror', (e) => errs.push(String(e)));
  page.on('console', (m) => { if (m.type() === 'error') errs.push('console: ' + m.text()); });
  await page.goto(URL + '?dev=1');
  await page.waitForTimeout(2500);
  await page.click('button.cp-ts-team');
  const start = await page.$('button.cp-ts-go');
  if (start) { await start.click(); await page.waitForTimeout(2000); }

  // 32 PICK actions through the real reducer (the battery's own path)
  const done = await page.evaluate(async () => {
    const w = window;
    const store = w.__cp && w.__cp.store;
    if (!store) return 'no __cp.store';
    const picks = () => (store.getState().record ? store.getState().record.picks : []);
    let guard = 0;
    while (store.getState().status !== 'done' && guard++ < 400) {
      const st = store.getState();
      const onClock = st.draft && st.draft.onClock;
      if (!onClock) break;
      const best = st.draft.board[0];
      if (!best) break;
      store.dispatch({ type: 'PICK', playerId: best.id, slot: onClock.slotId });
    }
    return 'status ' + store.getState().status + ' picks ' + picks().length;
  });
  out.draftCompletion = done;
  await page.waitForTimeout(500);

  const play = await page.$('button:has-text("PLAY WEEK")');
  if (play) { await play.click(); await page.waitForTimeout(3500); } else out.playMissing = true;
  out.feed = await nodes(page);
  out.feedText = await page.evaluate(() => {
    const lines = [...document.querySelectorAll('.cp-feed-line')];
    return {
      lines: lines.length,
      first: lines[0] ? lines[0].innerText.replace(/\s+/g, ' ').slice(0, 200) : null,
      // style-law audit: does any rendered line print the words Touchdown / Turnover?
      touchdownLines: lines.filter((l) => /touchdown/i.test(l.innerText)).length,
      turnoverLines: lines.filter((l) => /turnover/i.test(l.innerText)).length,
    };
  });
  out.pageErrorsFeed = errs;
  await page.close();
}

// ---------- mobile 390 ------------------------------------------------------
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const errs = [];
  page.on('pageerror', (e) => errs.push(String(e)));
  await page.goto(URL + '?dev=1');
  await page.waitForTimeout(3000);
  const m = async () => page.evaluate(() => ({
    nodes: document.querySelectorAll('*').length,
    scrollW: document.documentElement.scrollWidth,
    clientW: document.documentElement.clientWidth,
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
  }));
  out.mobile = { teamSelect: await m() };
  await page.click('button.cp-ts-team');
  const start = await page.$('button.cp-ts-go');
  if (start) { await start.click(); await page.waitForTimeout(2500); }
  out.mobile.board = await m();
  out.pageErrorsMobile = errs;
  await page.close();
}

// ---------- theme / palette / font -----------------------------------------
{
  const page = await browser.newPage({ viewport: { width: 1180, height: 950 } });
  await page.goto(URL + '?dev=1');
  await page.waitForTimeout(2500);
  out.theme = await page.evaluate(() => {
    const body = getComputedStyle(document.body);
    const app = document.querySelector('main, .cp-app, #app > *');
    return {
      bodyBg: body.backgroundColor,
      bodyColor: body.color,
      bodyFont: body.fontFamily,
      appBg: app ? getComputedStyle(app).backgroundColor : null,
      dataZpbteam: document.documentElement.getAttribute('data-zpbteam'),
      ubCount: document.querySelectorAll('.ub').length,
      prefersLight: matchMedia('(prefers-color-scheme: light)').matches,
      colorScheme: getComputedStyle(document.documentElement).colorScheme,
      cinzel: [...document.fonts].map((f) => f.family).filter((f) => /cinzel/i.test(f)),
      fontFaces: [...document.fonts].map((f) => f.family + ' ' + f.weight),
    };
  });
  await page.close();
}

console.log(JSON.stringify(out, null, 2));
await browser.close();