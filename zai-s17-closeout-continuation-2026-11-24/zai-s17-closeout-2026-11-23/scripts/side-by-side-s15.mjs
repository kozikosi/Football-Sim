// side-by-side-s15.mjs — the §4.9 visual-bar captures (the pickle spec 20261121-0250 + the 0305
// calibration): LEFT = live w89 (the reference), RIGHT = the S15 dist/ served locally (the
// candidate). 5 scenes × 2 viewports (1180×950, 390×844) × 2 themes × 2 sides = 40 captures.
// The token assertions are IN CODE (the spec: "assert in code, not by eye"): the glass tokens,
// the 22px panel radius, the pulse scope (every button breathes, the three opt out), Cinzel inline
// (no remote font request), no horizontal scroll at 390, zero console errors. Receipt:
// deliveries/receipts/s15-side-by-side.json + the composite doc deliveries/S15-SIDE-BY-SIDE-2026-11-21.md.
// Run: node scripts/side-by-side-s15.mjs   (the final dist must exist; CP_PORT picks the local port)
//
// 2026-11-24 (the S15 continuation sitting — the ernie F2 / orcads F4 / porca fix): the
// NON-VACUITY precondition is now IN CODE. Every capture asserts its scene marker BEFORE the
// screenshot (s1 the team surface present, s2 the board rows present, s3 a pick has landed, …);
// an unmet marker labels the capture FALLBACK in the receipt AND in the doc cell — a boot-state
// PNG can never again pass as the intended scene. The LEFT s1–s3 scenes are driven through the
// reference's OWN draft-setup UI (#draftSlotSelect + #startDraftBtn): the 2026-11-23 run's
// tr.teamrow click targeted the rankings table (#resultsBody — hidden at boot), so its LEFT
// s1–s3 PNGs were boot-state fallbacks (ernie F2). The Settings instance is named new-only-…
// (orcads F4: the w89 reference has no Settings panel — the S33-proven candidate-only instance).
import fs from 'node:fs';
import path from 'node:path';
import { spawn, execSync } from 'node:child_process';
import { createRequire } from 'node:module';
const _req = createRequire(import.meta.url);
const pw = _req('playwright');

const ROOT = path.resolve(new URL('..', import.meta.url).pathname);
const W89_URL = process.env.W89_URL || 'https://kozikosi.github.io/Football-Sim/Football-Sim-Z-post-blue-w89.html';
const W89_FALLBACK = 'file:///tmp/w89ref/w89.html';
const PORT = Number(process.env.CP_PORT || 4319);
const SHOTS = path.join(ROOT, 'shots', 'side-by-side');
fs.mkdirSync(SHOTS, { recursive: true });
const VIEWPORTS = [[1180, 950], [390, 844]];
const THEMES = ['light', 'dark'];
const receipt = { generated: new Date().toISOString(), left: W89_URL, right: `dist/ via vite preview :${PORT}`, captures: [], assertions: [], verdicts: [], notes: [], nonVacuity: [] };

// ---------- serve the candidate dist ----------
execSync(`lsof -t -i:${PORT} | xargs -r kill -9 2>/dev/null; true`);
const srv = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], { cwd: ROOT, stdio: 'ignore', detached: true });
const killGroup = () => { try { process.kill(-srv.pid, 'SIGKILL'); } catch {} try { srv.kill('SIGKILL'); } catch {} };
let up = false;
for (let i = 0; i < 40 && !up; i++) { await new Promise((r) => setTimeout(r, 500)); try { if (execSync(`curl -s -o /dev/null -w '%{http_code}' http://localhost:${PORT}/`, { stdio: 'pipe' }).toString().includes('200')) up = true; } catch {} }
if (!up) { console.log('FATAL: the preview never came up'); process.exit(1); }

const browser = await pw.chromium.launch({ args: ['--no-sandbox'] });
const watch = (page) => { const e = []; page.on('pageerror', (x) => e.push(String(x))); page.on('console', (m) => { if (m.type() === 'error') e.push(m.text()); }); return e; };

// shot() carries the NON-VACUITY precondition (2026-11-24): vac = { expected, met, detail }.
// met=false labels the capture FALLBACK in the receipt and the doc cell — never silent.
async function shot(page, side, scene, w, h, theme, note, vac) {
  const file = path.join(SHOTS, `${side}-${scene}-${w}x${h}-${theme}.png`);
  await page.screenshot({ path: file });
  const rec = { side, scene, w, h, theme, file: path.relative(ROOT, file), note: note || '' };
  if (vac) { rec.expected = vac.expected; rec.met = vac.met; rec.detail = vac.detail || ''; if (!vac.met) rec.fallback = true; }
  receipt.captures.push(rec);
  receipt.nonVacuity.push(vac ? { side, scene, w, h, theme, expected: vac.expected, met: vac.met, detail: vac.detail || '' } : { side, scene, w, h, theme, expected: 'n/a', met: null, detail: '' });
  console.log(`  ✓ ${side} ${scene} ${w}x${h} ${theme}${vac && !vac.met ? '  (FALLBACK — ' + (vac.detail || vac.expected) + ')' : ''}`);
  if (vac && !vac.met) receipt.notes.push(`${side} ${scene} ${w}x${h} ${theme}: FALLBACK — the scene marker "${vac.expected}" was NOT met (${vac.detail || 'no detail'}) — this capture is NOT the intended scene`);
}

// the CANDIDATE token assertions (the spec's five, in code)
async function tokensRight(page, scene, w, h, theme) {
  const t = await page.evaluate(() => {
    const cs = getComputedStyle(document.documentElement);
    const panel = document.querySelector('.cp-panel');
    const pcs = panel ? getComputedStyle(panel) : null;
    const plain = [...document.querySelectorAll('.cp-draftbtn')].find((b) => !b.classList.contains('cp-istop'));
    const top = document.querySelector('.cp-draftbtn.cp-istop');
    const a = (el) => (el ? getComputedStyle(el).animationName : null);
    const sheen = (el) => (el ? getComputedStyle(el, '::after').animationName : null);
    return {
      glass: cs.getPropertyValue('--glass').trim(), glassbd: cs.getPropertyValue('--glassbd').trim(), shadow: cs.getPropertyValue('--shadow').trim(),
      panelPresent: !!panel, panelRadius: pcs ? pcs.borderRadius : null, panelBlur: pcs ? (pcs.backdropFilter || pcs.webkitBackdropFilter || '') : null,
      plainPulse: a(plain), topAnim: a(top), topSheen: sheen(top), topBadge: !!document.querySelector('.cp-toptag'),
      // the continuation's sitting 4 (the cinzelOffline=False finding): the check scanned only
      // inline <style> tags — the BUILT page carries its css in the LINKED /assets/*.css sheet, so
      // the scan read false at offline-true bytes (the byte proof: zero googleapis/gstatic refs in
      // dist css/index/single). The law is unchanged — Cinzel must be served OFFLINE — the measure
      // now reads every same-origin stylesheet rule (inline + linked) via cssRules.
      cinzelInline: [...document.styleSheets].some((ss) => { try { return [...ss.cssRules].some((r) => /Cinzel|cinzel/.test(r.cssText)); } catch { return false; } }) && performance.getEntriesByType('resource').every((r) => !/fonts\.googleapis|fonts\.gstatic/.test(r.name)),
      hscroll: document.documentElement.scrollWidth > window.innerWidth,
    };
  });
  receipt.assertions.push({ side: 'right', scene, w, h, theme, ...t });
  return t;
}

function judgeRight(t, errs, w) {
  const checks = {
    glass: t.glass.length > 0 && t.glassbd.length > 0 && t.shadow.length > 0,
    radius: t.panelPresent ? t.panelRadius === '22px' : true,   // the panel law holds where a panel exists (S33 proves Settings; the Hub carries it when a season is live)
    blur: t.panelPresent ? /blur\(14px\)/.test(t.panelBlur || '') : true,
    pulseScope: t.plainPulse === 'zpbBtnPulse' && (t.topAnim === 'none' || t.topAnim === null) && (t.topSheen === 'zpbsheen' || t.topSheen === null),
    badge: t.topBadge === true,   // the board is on-screen when the s3 tokens are read — the badge must EXIST (the exact placement law is board battery L26); the old `!t.topBadge || true` was vacuous and is gone (2026-11-24)
    cinzelOffline: t.cinzelInline,
    noHScroll: w > 400 ? true : !t.hscroll,
    noErrors: errs.length === 0,
  };
  return checks;
}

// ---------- RIGHT side: the S15 candidate ----------
console.log('== RIGHT side — the S15 candidate ==');
for (const [w, h] of VIEWPORTS) {
  for (const theme of THEMES) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: theme });
    const page = await ctx.newPage();
    const errs = watch(page);
    await page.goto(`http://localhost:${PORT}/?dev=1&seed=a3f2`);
    await page.waitForTimeout(2400);
    await page.evaluate(() => { localStorage.removeItem('sim:nfl:autosave:draft'); localStorage.removeItem('sim:nfl:autosave:week'); });
    await page.reload(); await page.waitForTimeout(1800);
    // s1 Team Select (the non-vacuity marker: the team surface is really present)
    const s1met = await page.locator('.cp-ts-team').count();
    await shot(page, 'right', 's1-teamselect', w, h, theme, 'fresh boot, seed a3f2', { expected: 'the Team Select rows (.cp-ts-team) are present', met: s1met > 0, detail: `${s1met} team row(s)` });
    await tokensRight(page, 's1', w, h, theme);
    // s2 the board with a top-three row
    await page.locator('.cp-ts-team', { hasText: 'Chicago Bears' }).click(); await page.waitForTimeout(150);
    await page.locator('.cp-ts-go').click(); await page.waitForTimeout(1300);
    const s2met = await page.locator('.cp-rows .cp-row').count();
    await shot(page, 'right', 's2-board-top3', w, h, theme, 'the top three marked in the BUTTON + why copy; no ring', { expected: 'the board rows (.cp-rows .cp-row) are present', met: s2met > 0, detail: `${s2met} row(s)` });
    await tokensRight(page, 's2', w, h, theme);
    // s3 the pick confirm/landed state (the one-click landed; the toast rides the landed pick)
    await page.locator('.cp-rows .cp-row.cp-top3 .cp-draftbtn').first().click(); await page.waitForTimeout(900);
    const s3met = await page.evaluate(() => (window.__cp && window.__cp.store && window.__cp.store.getState().record?.picks?.length) || 0);
    await shot(page, 'right', 's3-pick-confirm', w, h, theme, 'one click landed — the toast, the CPU picks on', { expected: 'a pick has landed (store picks >= 1)', met: s3met >= 1, detail: `picks=${s3met}` });
    receipt.verdicts.push({ side: 'right', scene: 's1-s3', w, h, theme, checks: judgeRight(await tokensRight(page, 's3', w, h, theme), errs, w) });
    if (errs.length) receipt.notes.push(`right s1-s3 ${w}x${h} ${theme}: ${errs.slice(0, 2).join(' | ')}`);
    await ctx.close();
  }
}
// s4 + s5: one full seeded draft at 1180×light, then the finished state restored into the other
// contexts (the REAL restore path — S29/W12) so every viewport/theme captures the same run's end.
console.log('RIGHT s4: playing a full seeded draft (a3f2, Chicago Bears)…');
{
  const ctx = await browser.newContext({ viewport: { width: 1180, height: 950 }, colorScheme: 'light' });
  const page = await ctx.newPage();
  const errs = watch(page);
  await page.goto(`http://localhost:${PORT}/?dev=1&seed=a3f2`);
  await page.waitForTimeout(2400);
  await page.evaluate(() => { localStorage.removeItem('sim:nfl:autosave:draft'); localStorage.removeItem('sim:nfl:autosave:week'); });
  await page.reload(); await page.waitForTimeout(1800);
  await page.locator('.cp-ts-team', { hasText: 'Chicago Bears' }).click(); await page.waitForTimeout(150);
  await page.locator('.cp-ts-go').click(); await page.waitForTimeout(1300);
  // drive the full draft through the REAL one-click UI (the L8 path), bounded
  const deadline = Date.now() + 9 * 60 * 1000;
  let done = false;
  while (Date.now() < deadline) {
    const st = await page.evaluate(() => ({ status: window.__cp.store.getState().status, picks: window.__cp.store.getState().record?.picks?.length ?? 0, screen: document.querySelector('main')?.getAttribute('data-screen') ?? '' }));
    if (st.status === 'done' || st.screen === 'complete') { done = true; break; }
    const btn = page.locator('.cp-rows .cp-row .cp-draftbtn:not([disabled])').first();
    if (await btn.count()) { await btn.click(); await page.waitForTimeout(700); } else await page.waitForTimeout(600);
  }
  await page.waitForTimeout(1500);
  const screen = await page.evaluate(() => document.querySelector('main')?.getAttribute('data-screen') ?? '');
  await shot(page, 'right', 's4-finished', 1180, 950, 'light', `full draft via the real UI — screen=${screen} done=${done}`, { expected: 'the draft reached screen=complete through the real one-click UI', met: done === true && screen === 'complete', detail: `screen=${screen} done=${done}` });
  receipt.notes.push(`right s4 1180 light: screen=${screen} complete=${done} errors=${errs.length}`);
  // s5 the panel-bearing season screen: start the season from the finished draft → the hub
  let seasonStarted = false;
  try {
    const cta = page.locator('button', { hasText: 'PLAY THE SEASON' }).first();
    if (await cta.count() && !(await cta.isDisabled())) { await cta.click(); await page.waitForTimeout(2200); seasonStarted = true; }
  } catch {}
  const s5 = await page.evaluate(() => ({ screen: document.querySelector('main')?.getAttribute('data-screen') ?? '', panel: !!document.querySelector('.cp-panel') }));
  await shot(page, 'right', 's5-panel', 1180, 950, 'light', `season hub after PLAY THE SEASON — panel=${s5.panel} started=${seasonStarted}`, { expected: 'the season hub with a .cp-panel present', met: s5.screen === 'hub' && s5.panel, detail: `screen=${s5.screen} panel=${s5.panel}` });
  receipt.notes.push(`right s5 hub: screen=${s5.screen} .cp-panel present=${s5.panel}`);
  // settings — the PROVEN .cp-panel instance (the S33 law's subject); named new-only-… (orcads F4:
  // the w89 reference has NO settings panel — this capture has no LEFT pair by design, and the
  // name now says so instead of reading as a missing capture)
  await page.locator('.cp-navbtn', { hasText: 'SETTINGS' }).click(); await page.waitForTimeout(700);
  const setOk = await page.evaluate(() => !!document.querySelector('.cp-panel'));
  await shot(page, 'new-only', 's5-panel-settings', 1180, 950, 'light', 'the Settings screen — the S33-proven .cp-panel instance; NO LEFT pair (the w89 reference has no Settings panel)', { expected: 'the Settings .cp-panel present', met: setOk, detail: `panel=${setOk}` });
  // save the finished state for the other viewport/theme captures (the real restore path)
  const blob = await page.evaluate(() => ({ ...localStorage }));
  fs.writeFileSync('/tmp/s15-finished-state.json', JSON.stringify(blob));
  await ctx.close();
}
for (const [w, h] of VIEWPORTS) {
  for (const theme of THEMES) {
    if (w === 1180 && theme === 'light') continue;   // captured live above
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: theme });
    await ctx.addInitScript((blob) => { for (const [k, v] of Object.entries(blob)) { try { localStorage.setItem(k, v); } catch {} } }, JSON.parse(fs.readFileSync('/tmp/s15-finished-state.json', 'utf8')));
    const page = await ctx.newPage();
    const errs = watch(page);
    await page.goto(`http://localhost:${PORT}/?dev=1&seed=a3f2`);
    await page.waitForTimeout(3200);
    const screen = await page.evaluate(() => document.querySelector('main')?.getAttribute('data-screen') ?? '');
    await shot(page, 'right', 's4-finished', w, h, theme, `the finished draft RESTORED (the real restore path) — screen=${screen}`, { expected: 'the restored state lands on a real screen (complete or the hub)', met: screen === 'complete' || screen === 'hub', detail: `screen=${screen}` });
    receipt.notes.push(`right s4 restore ${w}x${h} ${theme}: screen=${screen} errors=${errs.length}`);
    // the v3 order's Step F: five scenes × both sides — s5 (the panel-bearing season screen) rides
    // the same restored state: the saved blob is post-season-start, so the restore LANDS on the hub
    // (screen=hub); if it lands on complete instead, PLAY THE SEASON drives there. Either way s5
    // is captured per combo — never a named skip when the state is already on the hub.
    let hubScreen = await page.evaluate(() => document.querySelector('main')?.getAttribute('data-screen') ?? '');
    try {
      if (hubScreen !== 'hub') {
        const cta = page.locator('button', { hasText: 'PLAY THE SEASON' }).first();
        if (await cta.count() && !(await cta.isDisabled())) { await cta.click(); await page.waitForTimeout(2200); hubScreen = await page.evaluate(() => document.querySelector('main')?.getAttribute('data-screen') ?? ''); }
      }
      if (hubScreen === 'hub') {
        const hubPanel = await page.locator('.cp-panel').count() > 0;
        await shot(page, 'right', 's5-panel', w, h, theme, `the panel-bearing season hub (the restored state) — screen=${hubScreen} panel=${hubPanel}`, { expected: 'the season hub with a .cp-panel present', met: hubScreen === 'hub' && hubPanel, detail: `screen=${hubScreen} panel=${hubPanel}` });
        receipt.notes.push(`right s5 hub ${w}x${h} ${theme}: screen=${hubScreen} errors=${errs.length}`);
      } else receipt.notes.push(`right s5 hub ${w}x${h} ${theme}: screen=${hubScreen} — neither the hub nor an enabled PLAY THE SEASON; named`);
    } catch (e) { receipt.notes.push(`right s5 hub ${w}x${h} ${theme}: the season path failed — ${String(e).split('\n')[0].slice(0, 80)}`); }
    await ctx.close();
  }
}

// ---------- LEFT side: live w89 (the reference) ----------
console.log('== LEFT side — live w89 ==');
let leftUrl = W89_URL;
for (const [w, h] of VIEWPORTS) {
  for (const theme of THEMES) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: theme });
    const page = await ctx.newPage();
    const errs = watch(page);
    let reachable = true;
    try { await page.goto(leftUrl, { timeout: 45000, waitUntil: 'domcontentloaded' }); } catch { reachable = false; }
    if (!reachable && leftUrl !== W89_FALLBACK) { leftUrl = W89_FALLBACK; receipt.notes.push('the live w89 URL was unreachable — the local byte-copy rode as the reference (same bytes, gh-pages origin)'); try { await page.goto(leftUrl, { waitUntil: 'domcontentloaded' }); reachable = true; } catch {}
    }
    if (!reachable) { receipt.notes.push(`LEFT ${w}x${h} ${theme}: w89 unreachable — capture SKIPPED (named)`); await ctx.close(); continue; }
    await page.waitForTimeout(2500);
    // 2026-11-24 (the ernie F2 fix): the LEFT s1 scene is the reference's OWN draft-SETUP panel
    // (#draftSetup: #draftSlotSelect "Draft as team" + #startDraftBtn). The 2026-11-23 run clicked
    // tr.teamrow — the rankings table's rows (#resultsBody, hidden at boot) — so its LEFT s1–s3
    // PNGs were boot-state fallbacks. The non-vacuity markers below make that class of miss LOUD.
    const setup = await page.evaluate(() => { const sel = document.querySelector('#draftSlotSelect'); return { visible: !!sel && sel.offsetParent !== null, options: sel ? sel.options.length : 0, hasBears: sel ? [...sel.options].some((o) => /Bears/i.test(o.textContent)) : false, label: sel && sel.selectedOptions[0] ? sel.selectedOptions[0].textContent.trim() : '' }; });
    if (setup.visible && setup.options > 1) {
      try { if (setup.hasBears) await page.selectOption('#draftSlotSelect', { label: (await page.locator('#draftSlotSelect option', { hasText: 'Bears' }).first().textContent()) }); await page.waitForTimeout(400); } catch {}
      // pick #1: the user is on the clock FIRST — scene 3 (one pick lands) becomes deterministic
      // instead of waiting a random number of Slow-speed CPU picks for the user's turn
      try { const opts = page.locator('#draftPickNumberSelect option[value="1"]'); if (await opts.count()) await page.selectOption('#draftPickNumberSelect', '1'); await page.waitForTimeout(250); } catch {}
      const chosen = await page.evaluate(() => document.querySelector('#draftSlotSelect')?.selectedOptions[0]?.textContent.trim() ?? '');
      const pickNo = await page.evaluate(() => document.querySelector('#draftPickNumberSelect')?.value ?? '');
      await shot(page, 'left', 's1-teamselect', w, h, theme, `w89 draft setup — draft-as-team selected: ${chosen || setup.label} · pick ${pickNo}`, { expected: 'the draft SETUP panel (#draftSetup) with the team select populated', met: setup.options > 1, detail: `options=${setup.options} chosen=${chosen || setup.label} pick=${pickNo}` });
    } else {
      await shot(page, 'left', 's1-teamselect', w, h, theme, 'w89 boot state (the setup panel was not reachable)', { expected: 'the draft SETUP panel (#draftSetup) with the team select populated', met: false, detail: `visible=${setup.visible} options=${setup.options} — captured the boot state, NOT the intended scene` });
    }
    // the draft board (scene 2) — DRAFT opens #draftLive with the board rows
    let board = false;
    try {
      const draftBtn = page.locator('#startDraftBtn');
      if (await draftBtn.count()) { await draftBtn.click(); await page.waitForTimeout(2500); board = await page.locator('#draftBody2 tr.zpb-trow').count() > 0; }
    } catch {}
    if (board) {
      const rows = await page.locator('#draftBody2 tr.zpb-trow').count();
      const top3 = await page.locator('#draftBody2 tr.zpb-top3').count();
      await shot(page, 'left', 's2-board-top3', w, h, theme, 'w89 board — the three marked in the button + the TOP badge', { expected: 'the w89 board rows (#draftBody2 tr.zpb-trow) are present after DRAFT', met: rows > 0, detail: `rows=${rows} top3rows=${top3}` });
      // the w89 token read (its own vocabulary): pulse on resetbtn[data-pick], sheen on top3 slotdraft, the badge
      const t = await page.evaluate(() => {
        const btns = [...document.querySelectorAll('button')];
        const pickBtn = btns.find((b) => b.matches('button.resetbtn[data-pick]'));
        const topBtn = document.querySelector('tr.zpb-top3 button.slotdraft');
        const a = (el) => (el ? getComputedStyle(el).animationName : null);
        const sheen = (el) => (el ? getComputedStyle(el, '::after').animationName : null);
        const cs = getComputedStyle(document.documentElement);
        return { pulse: a(pickBtn), topSheen: sheen(topBtn), topBadge: !!document.querySelector('.zpb-top3 .zpb-toptag, tr.zpb-top3 .zpb-toptag, tr.zpb-top3 [class*="toptag"]'),
                 glass: cs.getPropertyValue('--glass').trim(), glassbd: cs.getPropertyValue('--glassbd').trim(), shadow: cs.getPropertyValue('--shadow').trim(),
                 hscroll: document.documentElement.scrollWidth > window.innerWidth,
                 remoteFonts: performance.getEntriesByType('resource').map((r) => r.name).filter((n) => /fonts\.googleapis|fonts\.gstatic/.test(n)).length };
      });
      receipt.assertions.push({ side: 'left', scene: 's2', w, h, theme, ...t });
      // scene 3: one USER pick lands — the marker is draftSim.log's own isUser entry (the draft
      // engine's record, not a DOM side effect; the 2026-11-24 run learned that #draftRecentPicks
      // carries a filler div and Undo only shows on the user's NEXT turn — neither is a marker)
      let picked = false;
      const pickDeadline = Date.now() + 20000;
      while (Date.now() < pickDeadline && !picked) {
        try {
          const b = page.locator('#draftBody2 tr.zpb-trow button[data-pick]').first();
          if (await b.count()) await b.click({ timeout: 2500 }).catch(() => {});
        } catch {}
        await page.waitForTimeout(800);
        picked = await page.evaluate(() => { try { return !!(typeof draftSim !== 'undefined' && draftSim && draftSim.log && draftSim.log.some((e) => e.isUser)); } catch { return false; } });
      }
      await shot(page, 'left', 's3-pick-confirm', w, h, theme, 'w89 after one pick — the CPU picks on', { expected: 'a USER pick landed (draftSim.log carries an isUser entry)', met: picked, detail: `picked=${picked}` });
      if (t.hscroll && w <= 400) receipt.verdicts.push({ side: 'left', scene: 's2', w, h, theme, note: 'HORIZONTAL SCROLL at 390 on the REFERENCE (the w89 parity bar is what the Owner asked to match — named, not hidden)' });
    } else {
      await shot(page, 'left', 's2-board-top3', w, h, theme, 'w89 boot state (the board did not open)', { expected: 'the w89 board rows (#draftBody2 tr.zpb-trow) are present after DRAFT', met: false, detail: 'the board did not open — NOT the intended scene; s3 skipped' });
      receipt.notes.push(`LEFT ${w}x${h} ${theme}: the w89 draft board did not open — scene 3 SKIPPED (named)`);
    }
    if (errs.length) receipt.notes.push(`left ${w}x${h} ${theme}: ${errs.slice(0, 2).join(' | ')}`);
    await ctx.close();
  }
}
// LEFT s4/s5 (the finished draft + the season panel): DRIVEN through the w89 reference's own UI —
// boot → DRAFT → Sim to End → the finished state → the season screen (the v3 order's Step F:
// five scenes × both sides). The 2026-11-22 sitting skipped these with a note; this continuation
// drives them for real. A step that cannot complete is named in the notes, never silent.
console.log('LEFT s4/s5: driving the w89 reference (DRAFT → Sim to End → finished → season)…');
for (const [w, h] of VIEWPORTS) {
  for (const theme of THEMES) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: theme });
    const page = await ctx.newPage();
    const errs = watch(page);
    try {
      await page.goto(leftUrl, { timeout: 45000, waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1800);
      if (theme === 'dark') { const dk = page.locator('button', { hasText: 'DARK' }).first(); if (await dk.count()) await dk.click().catch(() => {}); await page.waitForTimeout(600); }
      const draftBtn = page.locator('button', { hasText: 'DRAFT' }).first();
      if (await draftBtn.count()) { await draftBtn.click(); await page.waitForTimeout(1500); }
      const simEnd = page.locator('button', { hasText: 'Sim to End' }).first();
      if (await simEnd.count()) { await simEnd.click(); }
      // the finished marker (measured by scripts/probe-w89-finished.mjs, 2026-11-24): the
      // draft-results surface #draftResultsBody is VISIBLE with the record hero ("Can you go
      // 20-0?") + the draft rankings — there is no rest overlay in this flow (the overlay's
      // restbox stays visibility:hidden headless) and DRAFT PICK GRADES is a later summary
      const fin = await page.waitForSelector('#draftResultsBody', { state: 'visible', timeout: 90000 }).catch(() => null);
      await page.waitForTimeout(1500);
      const finState = await page.evaluate(() => { const d = document.querySelector('#draftResultsBody'); return { exists: !!d, visible: !!d && d.offsetParent !== null, children: d ? d.childElementCount : 0, text: d ? (d.textContent || '').trim() : '' }; });
      const finishedHead = await page.evaluate(() => (document.querySelector('h1,h2,#suppHead')?.textContent || '').trim().slice(0, 50));
      const finMet = finState.visible && finState.children > 0 && /Can you go 20-0|20-0/.test(finState.text);
      await shot(page, 'left', 's4-finished', w, h, theme, `w89 finished draft (DRAFT → Sim to End) — head="${finishedHead}"`, { expected: 'the draft-results surface (#draftResultsBody) visible with the record hero + the rankings', met: finMet, detail: `visible=${finState.visible} children=${finState.children} record=${/Can you go 20-0|20-0/.test(finState.text)}` });
      receipt.notes.push(`left s4 ${w}x${h} ${theme}: head="${finishedHead}" errors=${errs.length}`);
      // s5: the season screen — the results body's own START PRESEASON → (measured: it renders
      // the season-config surface INSIDE #draftResultsBody — the LINEUP / coaching-philosophy /
      // Begin-the-season panels; the seasonHost element is only created later in the season flow)
      let seasonNote = 'no season entry found';
      const preBtn = page.locator('#draftResultsBody button', { hasText: 'START PRESEASON' }).first();
      if (await preBtn.count() && await preBtn.isVisible().catch(() => false)) {
        const beforeChildren = finState.children;
        await preBtn.click(); await page.waitForTimeout(3000);
        const seasonState = await page.evaluate(() => { const d = document.querySelector('#draftResultsBody'); const t = d ? (d.textContent || '') : ''; return { children: d ? d.childElementCount : 0, text: t }; });
        const seasonUp = seasonState.children > beforeChildren && /LINEUP|Coaching philosophy|Begin the season/.test(seasonState.text);
        const head = await page.evaluate(() => (document.querySelector('h1,h2,#suppHead')?.textContent || '').trim().slice(0, 50));
        await shot(page, 'left', 's5-panel', w, h, theme, `w89 season screen (via START PRESEASON) — head="${head}"`, { expected: 'the season-config surface rendered (the LINEUP / coaching / Begin-the-season panels, more children than the results view)', met: seasonUp, detail: `children=${seasonState.children} (was ${beforeChildren}) panels=${/LINEUP|Coaching philosophy|Begin the season/.test(seasonState.text)}` });
        seasonNote = `via START PRESEASON — head="${head}" seasonUp=${seasonUp}`;
      } else {
        for (const label of ['CONTINUE', 'BACK TO SEASON', 'SIM SEASON', 'START PRESEASON']) {
          const b = page.locator('button', { hasText: label }).first();
          if (await b.count() && await b.isVisible().catch(() => false)) {
            await b.click(); await page.waitForTimeout(2000);
            const head = await page.evaluate(() => (document.querySelector('h1,h2,#suppHead')?.textContent || '').trim().slice(0, 50));
            const seasonUp = await page.evaluate(() => { const d = document.querySelector('#draftResultsBody'); const h = document.querySelector('#seasonHost'); return (d && d.childElementCount > 0) || (!!h && h.childElementCount > 0); });
            await shot(page, 'left', 's5-panel', w, h, theme, `w89 season screen (via ${label}) — head="${head}"`, { expected: `a season surface rendered after ${label}`, met: seasonUp, detail: `head="${head}"` });
            seasonNote = `via ${label} — head="${head}" seasonUp=${seasonUp}`;
            break;
          }
        }
      }
      if (seasonNote === 'no season entry found') receipt.notes.push(`left s5 ${w}x${h} ${theme}: NO s5 capture — no season entry found on the finished state (named; the matrix check below flags the cell)`);
      else receipt.notes.push(`left s5 ${w}x${h} ${theme}: ${seasonNote} errors=${errs.length}`);
    } catch (e) {
      receipt.notes.push(`left s4/s5 ${w}x${h} ${theme}: the drive failed — ${String(e).split('\n')[0].slice(0, 100)}`);
    }
    await ctx.close();
  }
}

killGroup();
await browser.close();

// the MATRIX COMPLETENESS check (the capture contract — ernie's brainstorm #8, now law-shaped):
// every (side, scene, viewport, theme) cell must carry a capture. The one named exception is the
// Settings instance (side new-only — the w89 reference has no Settings panel, no LEFT pair by design).
const want = [];
for (const side of ['left', 'right']) for (const scene of ['s1-teamselect', 's2-board-top3', 's3-pick-confirm', 's4-finished', 's5-panel']) for (const [w, h] of VIEWPORTS) for (const theme of THEMES) want.push(`${side}-${scene}-${w}x${h}-${theme}`);
const have = new Set(receipt.captures.map((c) => `${c.side}-${c.scene}-${c.w}x${c.h}-${c.theme}`));
const missing = want.filter((k) => !have.has(k));
receipt.matrix = { wanted: want.length, captured: receipt.captures.length, missing, complete: missing.length === 0 };
if (missing.length) receipt.notes.push(`MATRIX INCOMPLETE — missing cell(s): ${missing.join(', ')}`);

fs.mkdirSync(path.join(ROOT, 'deliveries', 'receipts'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'deliveries', 'receipts', 's15-side-by-side.json'), JSON.stringify(receipt, null, 1));

// the composite doc — ONE file, every pair named, the verdicts in code
const md = [];
md.push('# S15 SIDE-BY-SIDE — the candidate (S15 dist) vs the reference (live w89) · 2026-11-21');
md.push('');
md.push('**The recipe:** pickle `inbox/20261121-0250-pickle-S15-side-by-side-spec.md` — four screens at 390×844 and 1180×950, light and dark, PLUS the panel-bearing season screen (the 0305 calibration: the Hub, and the S33-proven Settings instance). **The token assertions are IN CODE** (the receipt `deliveries/receipts/s15-side-by-side.json` holds every computed value). "Directionally similar" is a FAIL — the assertions below are the pass/fail.');
md.push('');
md.push('**2026-11-24 (the S15 continuation sitting — REGENERATED by the fixed capture script):** every capture now carries a NON-VACUITY marker in code — the scene must be REACHED before the screenshot (s1 the team/setup surface present, s2 the board rows present, s3 a pick landed, s4 the finished screen, s5 the hub+panel); an unmet marker labels the cell **FALLBACK — NOT the intended scene**, never a silent boot-state PNG (the ernie F2 / orcads F4 / porca fix). The LEFT s1–s3 scenes are driven through the reference\'s OWN draft-setup UI (`#draftSlotSelect` + `#startDraftBtn`) — the 2026-11-23 run\'s `tr.teamrow` click targeted the rankings table (`#resultsBody`, hidden at boot), so its LEFT s1–s3 captures were boot-state fallbacks; that run\'s receipt + doc are archived at `deliveries/receipts/partH-s15/s15-side-by-side-run4-archive.json` / `-archive.md`. The Settings instance is named `new-only-…` — the w89 reference has no Settings panel, so no LEFT pair exists by design.');
md.push('');
md.push(`**Reference:** ${W89_URL} (origin/gh-pages; the byte contract :12849/:12853 pulse, :1749-1751 sheen, :625 glass was verified by pickle). **Candidate:** the S15 \`dist/\` served locally, built at the close-out bytes.`);
md.push('');
md.push('| side | scene | viewport × theme | capture | scene marker / verdict |');
md.push('|---|---|---|---|---|');
for (const c of receipt.captures) {
  const v = receipt.verdicts.find((x) => x.side === c.side && x.w === c.w && x.h === c.h && x.theme === c.theme);
  let cell;
  if (c.fallback) cell = `**FALLBACK — NOT the intended scene** (${c.detail || c.note})`;
  else if (c.met === true) cell = `driven — marker met: ${c.expected}${c.detail ? ` (${c.detail})` : ''}`;
  else if (v) cell = Object.entries(v.checks).map(([k, ok]) => `${k}:${ok ? 'PASS' : 'FAIL'}`).join(' · ');
  else cell = 'capture (no marker — see notes)';
  md.push(`| ${c.side} | ${c.scene} | ${c.w}×${c.h} ${c.theme} | \`${c.file}\` | ${cell} |`);
}
md.push('');
md.push(`**Non-vacuity summary (in code):** ${receipt.nonVacuity.filter((x) => x.met === true).length} marker(s) met · ${receipt.nonVacuity.filter((x) => x.met === false).length} FALLBACK (each named in the table and the notes) · ${receipt.nonVacuity.filter((x) => x.met === null).length} markerless (right-side token-verdict rows carry their checks instead).`);
md.push('');
md.push('## The candidate\'s token assertions (in code, per capture)');
md.push('');
md.push('| side | scene | viewport × theme | glass/--glassbd/--shadow | panel | pulse scope | Cinzel offline | h-scroll 390 | errors |');
md.push('|---|---|---|---|---|---|---|---|---|');
for (const a of receipt.assertions.filter((x) => x.side === 'right')) {
  md.push(`| ${a.side} | ${a.scene} | ${a.w}×${a.h} ${a.theme} | ${a.glass || '∅'} / ${a.glassbd || '∅'} / ${a.shadow || '∅'} | ${a.panelPresent ? `22px=${a.panelRadius === '22px'} blur14=${/blur\\(14px\\)/.test(a.panelBlur || '')}` : 'n/a (no panel on this screen)'} | plain=${a.plainPulse} top=${a.topAnim} sheen=${a.topSheen} | ${a.cinzelInline} | ${a.hscroll} | (see verdicts) |`);
}
md.push('');
md.push('## Notes (the honest gaps)');
for (const n of receipt.notes) md.push(`- ${n}`);
md.push('');
fs.writeFileSync(path.join(ROOT, 'deliveries', 'S15-SIDE-BY-SIDE-2026-11-21.md'), md.join('\n') + '\n');
console.log(`DONE — ${receipt.captures.length} captures; the receipt + the composite doc written`);
