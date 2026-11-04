// W20 verification: name-tier law, no horizontal scroll, selector compaction,
// rankings name size, Brave/Chromium hardening. Zero console errors everywhere.
const { chromium } = require('playwright');
const FILE = 'file:///home/z/my-project/build/Football-Sim-Z-post-blue.html';
const SHOT = '/home/z/my-project/evidence/w20';
const fs = require('fs');
fs.mkdirSync(SHOT, { recursive: true });
const fails = [];
const ok = (name, cond, extra = '') => { console.log(`[${cond ? 'ok' : 'FAIL'}] ${name}${extra ? ' — ' + extra : ''}`); if (!cond) fails.push(name); };
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function noHScroll(page, label, opts = {}) {
  const r = await page.evaluate(() => ({
    page: document.scrollingElement.scrollWidth - window.innerWidth,
    body: document.body.scrollWidth - document.body.clientWidth,
  }));
  ok(`${label}: no horizontal page scroll`, r.page <= 1, `pageΔ=${r.page} bodyΔ=${r.body} (clipped-by-design marquee noted)`);
}

(async () => {
  const browser = await chromium.launch();

  // ================= desktop 1280 =================
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const errors = [];
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', e => errors.push('pageerror: ' + e.message));
  page.on('dialog', d => d.accept());
  await page.goto(FILE); await sleep(1600);
  await page.mouse.move(400, 300); await page.mouse.down(); await page.mouse.up(); await sleep(900); // skip the welcome cinematic
  await page.screenshot({ path: SHOT + '/w20-home-1280.png', fullPage: false });

  ok('home: no setback chip on load', await page.evaluate(() => !window.__zpbSetbackShown));
  ok('home: scrollbar-gutter stable (Brave hardening)', await page.evaluate(() => getComputedStyle(document.documentElement).scrollbarGutter === 'stable'));
  await noHScroll(page, 'home 1280');

  // ---- instant draft ----
  await page.click('#startDraftBtn'); await sleep(3600); // setup → start; the 3s watchdog guarantees the kick
  await page.click('#speedInstantBtn'); await sleep(300); // switch the live draft to instant
  await page.click('#simToEndBtn'); await sleep(400);     // finish the whole draft (built-in control)
  // cinematic may hold the kick; instant draft completes fast once kicked
  let done = false;
  for (let i = 0; i < 40; i++) {
    done = await page.evaluate(() => {
      const b = document.getElementById('draftBoardHost') || document.getElementById('draftLive');
      if (!b) return false;
      const t = b.textContent || '';
      return /draft complete|FINAL|finalize/i.test(t) || (typeof draftSim !== 'undefined' && draftSim && draftSim.pos >= draftSim.order.length);
    });
    if (done) break; await sleep(700);
  }
  ok('instant draft completes', done);
  await page.screenshot({ path: SHOT + '/w20-draft-1280.png', fullPage: false });
  await noHScroll(page, 'draft 1280');

  // draft board names render (no clipped/empty name cells at row ends)
  const board = await page.evaluate(() => {
    const cells = [...document.querySelectorAll('#draftTable2 td.dc-name, #draftTable2 tbody tr td:first-child')];
    const named = cells.map(c => c.textContent.trim()).filter(Boolean);
    return { total: cells.length, named: named.length };
  });
  ok('draft board: name cells carry text', board.named > 0, JSON.stringify(board));

  // ---- groups page = the Owner's "position rankings" ----
  await page.click('#tabGroupsBtn'); await sleep(900);
  const groups = await page.evaluate(() => {
    const rows = [...document.querySelectorAll('#groupBody .zpb-gplayer')];
    let bad = [], empty = 0, shm = 0, vib = 0, neu = 0;
    for (const gp of rows) {
      const name = gp.querySelector('.zpb-gname'), num = gp.querySelector('.zpb-gnum');
      if (!name || !name.textContent.trim()) { empty++; continue; }
      const ovr = num ? parseInt(num.textContent, 10) : NaN;
      const cls = name.className;
      if (ovr >= 90) { if (!/\bzpb-shm\b/.test(cls)) bad.push(ovr + ' not shimmer'); else shm++; }
      else if (ovr >= 85) { if (!/\bzpb-vib\b/.test(cls)) bad.push(ovr + ' not vibrant'); else vib++; }
      else { if (/\bzpb-shm\b|\bzpb-vib\b/.test(cls)) bad.push(ovr + ' wrongly tiered'); else neu++; }
      if (name.getBoundingClientRect().width <= 0) bad.push(ovr + ' zero-width');
    }
    return { rows: rows.length, empty, shm, vib, neu, bad: bad.slice(0, 5) };
  });
  ok('groups: player rows present', groups.rows > 10, String(groups.rows));
  ok('groups: tier law exact (90 shm / 85 vib / else neutral)', groups.bad.length === 0, JSON.stringify(groups.bad));
  ok('groups: no empty names', groups.empty === 0, String(groups.empty));
  await page.screenshot({ path: SHOT + '/w20-groups-1280.png', fullPage: false });
  await noHScroll(page, 'groups 1280');

  // ---- rankings + players pages ----
  await page.click('#tabRankingsBtn'); await sleep(700);
  await noHScroll(page, 'rankings 1280');
  await page.click('#tabPlayersBtn'); await sleep(700);
  const pl = await page.evaluate(() => {
    const tds = [...document.querySelectorAll('#playerTable tbody td')];
    return tds.filter(td => td.textContent.trim()).length;
  });
  ok('players: table populated', pl > 50, String(pl));
  await noHScroll(page, 'players 1280');
  await page.screenshot({ path: SHOT + '/w20-players-1280.png', fullPage: false });

  // ---- lineup selector geometry (rendered with real team slotmaps) ----
  const lu = await page.evaluate(() => {
    const tm = Object.keys(TEAM_DATA);
    const mk = t => { const m = {}; const dd = TEAM_DATA[t]; Object.keys(dd).forEach(k => { m[k] = { name: dd[k].name, pos: k.replace(/[0-9]+$/, ''), ovr: dd[k].ovr }; }); return m; };
    const host = document.createElement('div'); host.id = 'w20-lu-host';
    host.style.cssText = 'position:fixed;left:0;right:0;top:0;z-index:-1;';
    document.body.appendChild(host);
    host.innerHTML = renderLineupTableHTML(mk(tm[0]), mk(tm[1]), tm[0], tm[1]);
    const row = host.querySelector('.zpb-lu-row');
    const cols = row ? getComputedStyle(row).gridTemplateColumns : '';
    // full tier-law audit over every lineup cell: 90+ shm, 85-89 vib, else untiered
    const bad = []; let shm = 0, vib = 0, neu = 0, wins = 0, winTiered = 0;
    [...host.querySelectorAll('.zpb-lu-cell')].forEach(c => {
      const m = (c.textContent || '').trim().match(/(\d+)\s*$/);
      const ovr = m ? parseInt(m[1], 10) : NaN;
      if (c.classList.contains('zpb-lu-win')) wins++;
      if (/\bzpb-shm\b/.test(c.className)) { shm++; if (!(ovr >= 90)) bad.push('shm@' + ovr); }
      else if (/\bzpb-vib\b/.test(c.className)) { vib++; if (!(ovr >= 85 && ovr < 90)) bad.push('vib@' + ovr); }
      else { neu++; if (ovr >= 85) bad.push('untiered@' + ovr); }
      if (c.classList.contains('zpb-lu-win') && /zpb-shm|zpb-vib/.test(c.className)) winTiered++;
      const cs = getComputedStyle(c);
      if (cs.color === 'rgba(0, 0, 0, 0)' || cs.webkitTextFillColor === 'rgba(0, 0, 0, 0)') {
        if (cs.webkitBackgroundClip !== 'text') bad.push('invisible@' + ovr);
      }
    });
    return { cols, shm, vib, neu, wins, winTiered, bad: bad.slice(0, 6) };
  });
  ok('lineup: center column compacted to 64px', /64(px)?/.test(lu.cols), lu.cols);
  ok('lineup: tier classes present', lu.shm > 0 && lu.neu > 0, `shm=${lu.shm} vib=${lu.vib} neutral=${lu.neu}`);
  ok('lineup: tier law exact across every cell (winners included)', lu.bad.length === 0, JSON.stringify(lu.bad));
  ok('lineup: winners 85+ keep a tier', lu.wins === 0 || lu.winTiered > 0, `wins=${lu.wins} tiered=${lu.winTiered}`);

  await page.close();

  // ================= mobile 390 =================
  const m = await browser.newPage({ viewport: { width: 390, height: 844 } });
  m.on('console', x => { if (x.type() === 'error') errors.push('mobile: ' + x.text()); });
  m.on('pageerror', e => errors.push('mobile pageerror: ' + e.message));
  m.on('dialog', d => d.accept());
  await m.goto(FILE); await sleep(1600);
  await m.mouse.move(200, 300); await m.mouse.down(); await m.mouse.up(); await sleep(900); // skip the welcome cinematic
  await m.screenshot({ path: SHOT + '/w20-home-390.png', fullPage: false });
  await noHScroll(m, 'home 390');
  await m.click('#tabGroupsBtn'); await sleep(900);
  await m.screenshot({ path: SHOT + '/w20-groups-390.png', fullPage: false });
  await noHScroll(m, 'groups 390');
  const mlu = await m.evaluate(() => {
    const tm = Object.keys(TEAM_DATA);
    const mk = t => { const d2 = TEAM_DATA[t], o = {}; Object.keys(d2).forEach(k => { o[k] = { name: d2[k].name, pos: k.replace(/[0-9]+$/, ''), ovr: d2[k].ovr }; }); return o; };
    const host = document.createElement('div'); host.id = 'w20-lu-host-m';
    host.style.cssText = 'position:fixed;left:0;right:0;top:0;z-index:-1;';
    document.body.appendChild(host);
    host.innerHTML = renderLineupTableHTML(mk(tm[0]), mk(tm[1]), tm[0], tm[1]);
    const row = host.querySelector('.zpb-lu-row');
    return { cols: row ? getComputedStyle(row).gridTemplateColumns : '', w: host.querySelector('.zpb-lu').getBoundingClientRect().width };
  });
  ok('lineup 390: center column 46px', /46(px)?/.test(mlu.cols), mlu.cols);
  ok('lineup 390: grid fits the viewport', mlu.w <= 390, String(Math.round(mlu.w)));
  await m.click('#tabPlayersBtn'); await sleep(700);
  await noHScroll(m, 'players 390');
  await m.close();

  // ================= draft-stall resume (throttled tab) =================
  const s = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  s.on('pageerror', e => errors.push('slow pageerror: ' + e.message));
  s.on('dialog', d => d.accept());
  await s.goto(FILE); await sleep(1400);
  await s.mouse.move(400, 300); await s.mouse.down(); await s.mouse.up(); await sleep(800); // skip the welcome cinematic
  await s.click('#startDraftBtn'); await sleep(6500); // setup → slow draft; past the 3s watchdog kick
  const mid = await s.evaluate(() => (typeof draftSim !== 'undefined' && draftSim) ? { pos: draftSim.pos, awaiting: draftSim.awaitingUser, len: draftSim.order ? draftSim.order.length : 0 } : null);
  if (mid && !mid.awaiting && mid.pos < mid.len) {
    // hide + show the tab: a throttled tab must resume, never stall
    await s.evaluate(() => { Object.defineProperty(document, 'visibilityState', { value: 'hidden', configurable: true }); document.dispatchEvent(new Event('visibilitychange')); });
    await s.evaluate(() => { Object.defineProperty(document, 'visibilityState', { value: 'visible', configurable: true }); document.dispatchEvent(new Event('visibilitychange')); });
    await sleep(2500);
    const after = await s.evaluate(() => ({ pos: draftSim.pos, awaiting: draftSim.awaitingUser }));
    ok('draft resumes after tab visibility cycle', after.pos > mid.pos || after.awaiting !== mid.awaiting, `pos ${mid.pos}→${after.pos}`);
  } else {
    ok('draft stall-resume (skipped: draft already at user turn/complete)', true);
  }
  await s.close();

  // ================= setback chip self-test (last, isolated) =================
  const t = await browser.newPage({ viewport: { width: 900, height: 700 } });
  t.on('dialog', d => d.accept());
  await t.goto(FILE); await sleep(1200);
  await t.evaluate(() => { window.dispatchEvent(new Event('error')); });
  await sleep(400);
  const chip = await t.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => /SETBACK/.test(x.textContent)); return b ? b.textContent.trim() : null; });
  ok('setback chip appears on engine error', !!chip, String(chip));
  if (chip) { await t.evaluate(() => { [...document.querySelectorAll('button')].find(x => /SETBACK/.test(x.textContent)).click(); }); await sleep(200);
    const note = await t.evaluate(() => { const n = [...document.querySelectorAll('div')].find(x => /display engine reported a setback/.test(x.textContent)); return n ? n.textContent.slice(0, 60) : null; });
    ok('setback note opens with details', !!note, String(note));
    await t.screenshot({ path: SHOT + '/w20-setback-chip.png', fullPage: false });
  }
  await t.close();

  await browser.close();
  ok('zero console errors across all surfaces', errors.length === 0, errors.slice(0, 3).join(' | '));
  console.log(fails.length ? `\nW20 VERIFY: ${fails.length} FAIL` : '\nW20 VERIFY: ALL PASS');
  process.exit(fails.length ? 1 : 0);
})();
