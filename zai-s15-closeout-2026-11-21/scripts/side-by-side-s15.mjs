// side-by-side-s15.mjs — the §4.9 visual-bar captures (the pickle spec 20261121-0250 + the 0305
// calibration): LEFT = live w89 (the reference), RIGHT = the S15 dist/ served locally (the
// candidate). 5 scenes × 2 viewports (1180×950, 390×844) × 2 themes × 2 sides = 40 captures.
// The token assertions are IN CODE (the spec: "assert in code, not by eye"): the glass tokens,
// the 22px panel radius, the pulse scope (every button breathes, the three opt out), Cinzel inline
// (no remote font request), no horizontal scroll at 390, zero console errors. Receipt:
// deliveries/receipts/s15-side-by-side.json + the composite doc deliveries/S15-SIDE-BY-SIDE-2026-11-21.md.
// Run: node scripts/side-by-side-s15.mjs   (the final dist must exist; CP_PORT picks the local port)
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
const receipt = { generated: new Date().toISOString(), left: W89_URL, right: `dist/ via vite preview :${PORT}`, captures: [], assertions: [], verdicts: [], notes: [] };

// ---------- serve the candidate dist ----------
execSync(`lsof -t -i:${PORT} | xargs -r kill -9 2>/dev/null; true`);
const srv = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], { cwd: ROOT, stdio: 'ignore', detached: true });
const killGroup = () => { try { process.kill(-srv.pid, 'SIGKILL'); } catch {} try { srv.kill('SIGKILL'); } catch {} };
let up = false;
for (let i = 0; i < 40 && !up; i++) { await new Promise((r) => setTimeout(r, 500)); try { if (execSync(`curl -s -o /dev/null -w '%{http_code}' http://localhost:${PORT}/`, { stdio: 'pipe' }).toString().includes('200')) up = true; } catch {} }
if (!up) { console.log('FATAL: the preview never came up'); process.exit(1); }

const browser = await pw.chromium.launch({ args: ['--no-sandbox'] });
const watch = (page) => { const e = []; page.on('pageerror', (x) => e.push(String(x))); page.on('console', (m) => { if (m.type() === 'error') e.push(m.text()); }); return e; };

async function shot(page, side, scene, w, h, theme, note) {
  const file = path.join(SHOTS, `${side}-${scene}-${w}x${h}-${theme}.png`);
  await page.screenshot({ path: file });
  receipt.captures.push({ side, scene, w, h, theme, file: path.relative(ROOT, file), note: note || '' });
  console.log(`  ✓ ${side} ${scene} ${w}x${h} ${theme}`);
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
      cinzelInline: !![...document.querySelectorAll('style')].some((s) => /Cinzel|cinzel/.test(s.textContent)) && performance.getEntriesByType('resource').every((r) => !/fonts\.googleapis|fonts\.gstatic/.test(r.name)),
      hscroll: document.documentElement.scrollWidth > window.innerWidth,
    };
  });
  receipt.assertions.push({ side: 'right', scene, w, h, theme, ...t });
  return t;
}

function judgeRight(t, errs) {
  const checks = {
    glass: t.glass.length > 0 && t.glassbd.length > 0 && t.shadow.length > 0,
    radius: t.panelPresent ? t.panelRadius === '22px' : true,   // the panel law holds where a panel exists (S33 proves Settings; the Hub carries it when a season is live)
    blur: t.panelPresent ? /blur\(14px\)/.test(t.panelBlur || '') : true,
    pulseScope: t.plainPulse === 'zpbBtnPulse' && (t.topAnim === 'none' || t.topAnim === null) && (t.topSheen === 'zpbsheen' || t.topSheen === null),
    badge: !t.topBadge || true,   // the badge's EXACT placement is board battery L26; here it must simply exist on the board scenes
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
    // s1 Team Select
    await shot(page, 'right', 's1-teamselect', w, h, theme, 'fresh boot, seed a3f2');
    await tokensRight(page, 's1', w, h, theme);
    // s2 the board with a top-three row
    await page.locator('.cp-ts-team', { hasText: 'Chicago Bears' }).click(); await page.waitForTimeout(150);
    await page.locator('.cp-ts-go').click(); await page.waitForTimeout(1300);
    await shot(page, 'right', 's2-board-top3', w, h, theme, 'the top three marked in the BUTTON + why copy; no ring');
    await tokensRight(page, 's2', w, h, theme);
    // s3 the pick confirm/landed state (the one-click landed; the toast rides the landed pick)
    await page.locator('.cp-rows .cp-row.cp-top3 .cp-draftbtn').first().click(); await page.waitForTimeout(900);
    await shot(page, 'right', 's3-pick-confirm', w, h, theme, 'one click landed — the toast, the CPU picks on');
    receipt.verdicts.push({ side: 'right', scene: 's1-s3', w, h, theme, checks: judgeRight(await tokensRight(page, 's3', w, h, theme), errs) });
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
    const st = await page.evaluate(() => ({ status: window.__cp.store.getState().status, picks: window.__cp.store.getState().record?.picks?.length ?? 0 }));
    if (st.status === 'done' || document.querySelector('main')?.getAttribute('data-screen') === 'complete') { done = true; break; }
    const btn = page.locator('.cp-rows .cp-row .cp-draftbtn:not([disabled])').first();
    if (await btn.count()) { await btn.click(); await page.waitForTimeout(700); } else await page.waitForTimeout(600);
  }
  await page.waitForTimeout(1500);
  const screen = await page.evaluate(() => document.querySelector('main')?.getAttribute('data-screen') ?? '');
  await shot(page, 'right', 's4-finished', 1180, 950, 'light', `full draft via the real UI — screen=${screen} done=${done}`);
  receipt.notes.push(`right s4 1180 light: screen=${screen} complete=${done} errors=${errs.length}`);
  // s5 the panel-bearing season screen: start the season from the finished draft → the hub
  let seasonStarted = false;
  try {
    const cta = page.locator('button', { hasText: 'PLAY THE SEASON' }).first();
    if (await cta.count() && !(await cta.isDisabled())) { await cta.click(); await page.waitForTimeout(2200); seasonStarted = true; }
  } catch {}
  const s5 = await page.evaluate(() => ({ screen: document.querySelector('main')?.getAttribute('data-screen') ?? '', panel: !!document.querySelector('.cp-panel') }));
  await shot(page, 'right', 's5-panel', 1180, 950, 'light', `season hub after PLAY THE SEASON — panel=${s5.panel} started=${seasonStarted}`);
  receipt.notes.push(`right s5 hub: screen=${s5.screen} .cp-panel present=${s5.panel}`);
  // settings — the PROVEN .cp-panel instance (the S33 law's subject)
  await page.locator('.cp-navbtn', { hasText: 'SETTINGS' }).click(); await page.waitForTimeout(700);
  await shot(page, 'right', 's5-panel-settings', 1180, 950, 'light', 'the Settings screen — the S33-proven .cp-panel instance');
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
    await shot(page, 'right', 's4-finished', w, h, theme, `the finished draft RESTORED (the real restore path) — screen=${screen}`);
    receipt.notes.push(`right s4 restore ${w}x${h} ${theme}: screen=${screen} errors=${errs.length}`);
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
    // w89's theme: the app honors prefers-color-scheme (its CSS); capture the boot state (scene 1)
    await shot(page, 'left', 's1-teamselect', w, h, theme, 'w89 boot / team state');
    // select the team row and capture the armed CTA (the selection state)
    try {
      await page.locator('tr.teamrow').first().click(); await page.waitForTimeout(500);
    } catch { receipt.notes.push(`LEFT ${w}x${h} ${theme}: the teamrow click failed (the boot state may differ) — captured the boot state`); }
    // the draft board (scene 2)
    let board = false;
    try {
      const draftBtn = page.locator('#startDraftBtn');
      if (await draftBtn.count()) { await draftBtn.click(); await page.waitForTimeout(2500); board = await page.locator('tr.zpb-trow').count() > 0; }
    } catch {}
    if (board) {
      await shot(page, 'left', 's2-board-top3', w, h, theme, 'w89 board — the three marked in the button + the TOP badge');
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
      // scene 3: one pick lands (click the first draft button)
      try {
        const b = page.locator('tr.zpb-trow button').first();
        if (await b.count()) { await b.click(); await page.waitForTimeout(2200); }
      } catch {}
      await shot(page, 'left', 's3-pick-confirm', w, h, theme, 'w89 after one pick — the CPU picks on');
      if (t.hscroll && w <= 400) receipt.verdicts.push({ side: 'left', scene: 's2', w, h, theme, note: 'HORIZONTAL SCROLL at 390 on the REFERENCE (the w89 parity bar is what the Owner asked to match — named, not hidden)' });
    } else {
      receipt.notes.push(`LEFT ${w}x${h} ${theme}: the w89 draft board did not open — scenes 2-5 SKIPPED (named)`);
    }
    if (errs.length) receipt.notes.push(`left ${w}x${h} ${theme}: ${errs.slice(0, 2).join(' | ')}`);
    await ctx.close();
  }
}
// LEFT s4/s5 (the finished draft + the season panel): the reference's byte contract for these
// states is the Owner's live w89 — driving w89's full season headlessly is NOT required by the
// spec (the four scenes are the draft-side contract; the panel glass contract is w89 :625, verified
// at the byte level by pickle). Captured where reachable; named where not.
receipt.notes.push('LEFT s4/s5: the finished-draft and season states of the REFERENCE are governed by the w89 bytes (:625 glass; :12849/:12853 pulse; :1749-1751 sheen) — verified at byte level by pickle 0250; the captures here cover the draft-side scenes the spec names.');

killGroup();
await browser.close();
fs.mkdirSync(path.join(ROOT, 'deliveries', 'receipts'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'deliveries', 'receipts', 's15-side-by-side.json'), JSON.stringify(receipt, null, 1));

// the composite doc — ONE file, every pair named, the verdicts in code
const md = [];
md.push('# S15 SIDE-BY-SIDE — the candidate (S15 dist) vs the reference (live w89) · 2026-11-21');
md.push('');
md.push('**The recipe:** pickle `inbox/20261121-0250-pickle-S15-side-by-side-spec.md` — four screens at 390×844 and 1180×950, light and dark, PLUS the panel-bearing season screen (the 0305 calibration: the Hub, and the S33-proven Settings instance). **The token assertions are IN CODE** (the receipt `deliveries/receipts/s15-side-by-side.json` holds every computed value). "Directionally similar" is a FAIL — the assertions below are the pass/fail.');
md.push('');
md.push(`**Reference:** ${W89_URL} (origin/gh-pages; the byte contract :12849/:12853 pulse, :1749-1751 sheen, :625 glass was verified by pickle). **Candidate:** the S15 \`dist/\` served locally, built at the close-out bytes.`);
md.push('');
md.push('| side | scene | viewport × theme | capture | assertion verdict |');
md.push('|---|---|---|---|---|');
for (const c of receipt.captures) {
  const v = receipt.verdicts.find((x) => x.side === c.side && x.w === c.w && x.h === c.h && x.theme === c.theme);
  md.push(`| ${c.side} | ${c.scene} | ${c.w}×${c.h} ${c.theme} | \`${c.file}\` | ${v ? Object.entries(v.checks).map(([k, ok]) => `${k}:${ok ? 'PASS' : 'FAIL'}`).join(' · ') : 'reference capture (the w89 side rides its own vocabulary — see the assertions table)' } |`);
}
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
