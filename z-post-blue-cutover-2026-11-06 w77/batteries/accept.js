/* accept.js — the CUTOVER ACCEPTANCE BATTERY for 76 Pancakes (and any build).
 *
 *   node accept.js --file <path-or-url> [--adapter ./adapters/w76.js] [--shots <dir>]
 *
 * WHAT THIS IS
 *   The wave-76 battery (84 assertions, V0–V17), lifted ONE layer: every place the
 *   old battery hardcoded the shell (DOM ids, zpb classes, engine globals, sim-flow
 *   calls) now reads a pluggable ADAPTER. The assertions themselves — the `ok(...)`
 *   lines, their labels, the law strings they grep for — are byte-identical to the
 *   w76 battery. The batteries are the artifact that knows what the product is
 *   supposed to do; this file is that artifact, parameterized.
 *
 * THE CONTRACT
 *   - The runner knows WHAT the product must do (the Owner's laws, verbatim).
 *   - The adapter knows WHERE to look in a given build (hooks + engine snippets).
 *   - Reference adapter: ./adapters/w76.js — the frozen w76 shell, verified 84/84
 *     against Football-Sim-Z-post-blue-w76.html (md5 4f363452…, 1,830,164 B).
 *   - Port adapter: copy ./adapters/pancakes.stub.js, fill every key. A key the
 *     port cannot fill is an ACCEPTANCE CONVERSATION, never a silent skip.
 *
 * RESULTS SEMANTICS
 *   PASS / FAIL as always. SKIP = the adapter lacks the hook/engine snippet the
 *   assertion needs — reported by name, counted, exit code 3. A build is ACCEPTED
 *   only at 84 pass · 0 fail · 0 skip.
 */

const fs = require('fs');
const path = require('path');

// ---------- args ----------
const argv = process.argv.slice(2);
const arg = (k, d) => { const i = argv.indexOf(k); return i >= 0 && argv[i + 1] ? argv[i + 1] : d; };
const FILE_ARG = arg('--file', '');
const ADAPTER = path.resolve(arg('--adapter', path.join(__dirname, 'adapters', 'w76.js')));
const SH = arg('--shots', '/tmp/cutover_shots');
if (!FILE_ARG) { console.error('usage: node accept.js --file <path-or-url> [--adapter ./adapters/w76.js] [--shots <dir>]'); process.exit(2); }
const FILE = /^https?:\/\//.test(FILE_ARG) ? FILE_ARG : 'file://' + path.resolve(FILE_ARG);

// ---------- playwright resolver (works in the Z sandbox AND a normal npm env) ----------
function loadPlaywright() {
  const tries = [];
  try { return { pw: require('playwright'), how: 'local require' }; } catch (e) { tries.push('local: ' + e.message.split('\n')[0]); }
  try { return { pw: require(path.join(process.env.HOME || '/home/z', '.npm-global/lib/node_modules/playwright')), how: 'sandbox global' }; } catch (e) { tries.push('global: ' + e.message.split('\n')[0]); }
  throw new Error('playwright not found — tried:\n  ' + tries.join('\n  '));
}
const { pw } = loadPlaywright();
const exe = process.env.ZPB_CHROME || undefined; // unset = playwright's own managed browser

// ---------- adapter ----------
let A;
try { A = require(ADAPTER); } catch (e) { console.error('ADAPTER LOAD FAILED: ' + e.message); process.exit(2); }
const H = { id: A.id || {}, sel: A.sel || {}, val: A.val || {}, fixtures: A.fixtures || {} };
const MISSING = [];
const need = (k, kind) => { if (!H[kind][k]) MISSING.push(kind + '.' + k); };
const eng = (k) => { if (!A.engine || !A.engine[k]) { MISSING.push('engine.' + k); return null; } return A.engine[k]; };

fs.mkdirSync(SH, { recursive: true });
let pass = 0, fail = 0, skip = 0;
const ok = (c, l, d = '') => { console.log(`   ${c ? 'PASS' : 'FAIL'}  ${l}${d ? ' — ' + d : ''}`); c ? pass++ : fail++; };
const sk = (l, why) => { console.log(`   SKIP  ${l} — UNRUNNABLE (${why})`); skip++; };
const J = v => JSON.stringify([].concat(v).sort());
let page;
const run = (snippet) => page.evaluate(snippet); // adapter engine snippets are self-contained IIFE strings
const closeOv = () => { const s = eng('cleanup'); if (s) return run(s); };

(async () => {
  const browser = await pw.chromium.launch(exe ? { executablePath: exe, args: ['--no-sandbox'] } : { args: ['--no-sandbox'] });
  page = await browser.newPage({ viewport: { width: 1280, height: 940 } });
  let pageErrs = [];
  page.on('pageerror', e => pageErrs.push(e.message));
  await page.goto(FILE); await page.waitForTimeout(500);
  await page.evaluate(() => { try { localStorage.clear(); sessionStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(800);
  await page.evaluate(h => { window.__ZPB_A = h; }, H); // the adapter's hooks, page-side

  // ============ V0 · the veto (c) median + no bars before the simulator starts ============
  console.log('== V0 · boot state ==');
  const medSnip = eng('medianProbe');
  const med = medSnip ? await run(medSnip) : { err: 'adapter lacks engine.medianProbe' };
  if (medSnip) {
    ok(!med.err && med.med === med.indep, 'V0 the median computes live = the independently recomputed drafted-pool median', JSON.stringify(med));
    ok(!med.err && med.allMed === 76 && med.med > med.allMed, 'V0 the old all-database median (76) is superseded by the drafted pool — the 50s are out', med.allMed + ' -> ' + med.med);
    ok(!med.err && med.cached === med.med, 'V0 the value is produced once and stored (window.__zpbMedOvr)', String(med.cached));
  } else sk('V0 the median trio (live = independent · supersedes 76 · cached once)', 'engine.medianProbe');
  const bars0 = await page.evaluate(sel => document.querySelectorAll(sel).length, H.sel.backbar);
  ok(bars0 === 0, 'V0 no BACK TO bars while the simulator has not started', bars0 + ' bars');

  // boot the draft as the Steelers, live (on the clock) for the board probes
  const bootSnip = eng('bootDraft');
  if (bootSnip) { await run(bootSnip); } else sk('V0 boot the draft (fixture for the board probes)', 'engine.bootDraft');
  await page.waitForTimeout(1500); await closeOv();
  if (bootSnip && medSnip) {
    const medAfterBoot = await page.evaluate(() => window.__zpbMedOvr);
    ok(medAfterBoot === med.med, 'V0 the stored median survives the draft boot — never recalculated per draft', medAfterBoot + ' vs ' + med.med);
  } else sk('V0 the stored median survives the draft boot — never recalculated per draft', 'engine.bootDraft/medianProbe');

  // ============ V1 · the dropdown + Offensive Guard ============
  console.log('== V1 · the dropdown reads the depth chart ==');
  const v1 = await page.evaluate(sel => Array.from(document.querySelectorAll(sel + ' option')).map(o => ({ v: o.value, t: o.textContent })), H.sel.posFilter);
  const WANT = ['all', 'QB', 'RB', 'WR', 'TE', 'OT', 'OG', 'C', 'EDGE', 'DT', 'LB', 'CB', 'FS', 'SS', 'K'];
  ok(JSON.stringify(v1.map(o => o.v)) === JSON.stringify(WANT), 'V1 dropdown order = depth chart, TE once', v1.map(o => o.v).join(' '));
  const og = v1.find(o => o.v === 'OG');
  ok(og && og.t === 'Offensive Guard', 'V1 the OG option reads Offensive Guard', og ? og.t : '(none)');

  // ============ V2 · the new chip law ============
  console.log('== V2 · the chip law (off = off, on = on, all off = full board) ==');
  await page.evaluate((s) => { const dv = document.querySelector(s.viewSwitch); dv.value = s.viewCards; dv.dispatchEvent(new Event('change', { bubbles: true })); }, { viewSwitch: H.sel.viewSwitch, viewCards: H.val.viewCards });
  await page.waitForTimeout(250);
  const onList = async () => (await page.evaluate(sel => Array.from(document.querySelectorAll(sel)).filter(b => b.classList.contains('on')).map(b => b.dataset.tog), H.sel.chipBtn));
  const boardMix = async () => (await page.evaluate(A => {
    const dv = document.querySelector(A.sel.viewSwitch); const was = dv.value; dv.value = A.val.viewTable; dv.dispatchEvent(new Event('change', { bubbles: true }));
    const t = document.querySelector(A.sel.boardTable); const pos = t ? Array.from(t.querySelectorAll('tbody tr')).map(r => (r.cells[1] ? r.cells[1].textContent.trim() : '?')) : [];
    dv.value = was; dv.dispatchEvent(new Event('change', { bubbles: true })); return pos;
  }, H));
  const clickChip = g => page.evaluate(s => { document.querySelector(s.chipBtn + '[data-tog="' + s.g + '"]').click(); }, { chipBtn: H.sel.chipBtn, g });
  const clickBtn = sel => page.evaluate(sel => { document.querySelector(sel).click(); }, sel);

  const full = await boardMix();
  ok((await onList()).length === 0, 'V2 the buttons start all OFF', (await onList()).length + ' on');
  ok(new Set(full).size > 3, 'V2 the board is still FULL at boot — the top of the board mixes every group', full.slice(0, 8).join(' '));
  await clickChip('QB');
  const qMix = await boardMix();
  ok(J(await onList()) === J(['QB']), 'V2 click QB → only QB lit', JSON.stringify(await onList()));
  ok(qMix.length > 0 && qMix.every(p => p === 'QB'), 'V2 only the QBs remain on the board', qMix.slice(0, 6).join(' '));
  await clickBtn(H.sel.chipAll);
  const fullMix = await boardMix();
  ok((await onList()).length === 14 && new Set(fullMix).size > 3, 'V2 ALL lights all 14 — the board is equally full', (await onList()).length + ' on · ' + fullMix.slice(0, 6).join(' '));
  await clickChip('QB');
  const noQb = await boardMix();
  ok(J(await onList()) === J(['RB','WR','TE','OT','OG','C','EDGE','DT','LB','CB','FS','SS','K']), 'V2 click QB while all on → QB goes dark', (await onList()).length + ' on');
  ok(noQb.length > 0 && noQb.every(p => p !== 'QB'), 'V2 the QBs disappear from the board', noQb.slice(0, 6).join(' '));
  await clickChip('QB');
  const backMix = await boardMix();
  ok(backMix.indexOf('QB') >= 0, 'V2 re-click QB → his players return', backMix.slice(0, 6).join(' '));
  await clickBtn(H.sel.chipNone);
  const clearMix = await boardMix();
  ok((await onList()).length === 0 && new Set(clearMix).size > 3, 'V2 CLEAR → every button off, the full board (the default)', (await onList()).length + ' on · ' + clearMix.slice(0, 6).join(' '));
  const lbl = await page.evaluate(s => ({ all: (document.querySelector(s.chipAll + ' i') || {}).textContent, none: (document.querySelector(s.chipNone + ' i') || {}).textContent }), H.sel);
  ok(lbl.all === 'all on' && lbl.none === 'all off', 'V2 ALL and CLEAR tell the truth', JSON.stringify(lbl));

  // ============ V3 · the selected chip is FILLED ============
  console.log('== V3 · the selected chip is a filled button ==');
  const v3 = await page.evaluate(s => {
    const first = document.querySelector(s.chipBtn);
    first.click();
    const on = document.querySelector(s.chipOn);
    const off = document.querySelector(s.chipOff);
    const cso = getComputedStyle(on), csf = getComputedStyle(off);
    const out = { onBg: cso.backgroundColor, offBg: csf.backgroundColor, onInk: cso.color, onBorder: cso.borderColor, offBorder: csf.borderColor };
    first.click(); // leave the board full for the next probes
    return out;
  }, H.sel);
  const accCol = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--accent').trim());
  ok(v3.onBg !== 'rgba(0, 0, 0, 0)' && v3.onBg === v3.onBorder && v3.offBg !== v3.onBg, 'V3 the on-chip is filled with the accent, the off-chip is not', v3.onBg + ' vs ' + v3.offBg);

  // ============ V15 · the fills chip carries no FLEX word ============
  console.log('== V15 · the fills read x (-y) ==');
  const v15 = await page.evaluate(s => {
    const dv = document.querySelector(s.viewSwitch); dv.value = s.viewTable; dv.dispatchEvent(new Event('change', { bubbles: true }));
    const cells = Array.from(document.querySelectorAll(s.fillsCell)).map(td => td.textContent.trim());
    return { cells: cells.length, flexWord: cells.some(t => /FLEX/.test(t)), sample: cells.filter(t => t && t !== 'Full').slice(0, 6) };
  }, { viewSwitch: H.sel.viewSwitch, viewTable: H.val.viewTable, fillsCell: H.sel.fillsCell });
  ok(v15.cells >= 1, 'V15 the fills column is on the board (the harness reads the real cells)', v15.cells + ' cells');
  ok(!v15.flexWord, 'V15 no FLEX word in any fills cell', JSON.stringify(v15.sample));

  // ============ V17 · the veto (a) chip — the slot-picker reads just -x ============
  console.log('== V17 · the lineup slot-picker chip ==');
  const v17snip = eng('pickerProbe');
  const v17 = v17snip ? await run(v17snip) : { err: 'adapter lacks engine.pickerProbe' };
  if (v17snip) {
    ok(v17.n > 0 && v17.sawFlex, 'V17 the picker opens with a flex chip on the board (the fixture exists)', v17.n + ' pickers · ' + JSON.stringify(v17.sample));
    ok(v17.bad.length === 0, 'V17 no FLEX word on any picker chip — just -x (NATURAL keeps its word)', JSON.stringify(v17.bad));
  } else sk('V17 the picker chip pair (fixture exists · no FLEX word, NATURAL keeps its word)', 'engine.pickerProbe');
  const pan1280 = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  ok(pan1280 <= 0, 'V15 the draft board does not pan the page at 1280', pan1280 + 'px');

  // ============ V5 · the phone laws at 390 ============
  console.log('== V5 · the phone laws at 390 ==');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(700);
  const chipPan = await page.evaluate(sel => { document.querySelector(sel).scrollIntoView({ block: 'center' }); return document.documentElement.scrollWidth - document.documentElement.clientWidth; }, H.sel.chips);
  ok(chipPan <= 0, 'V5 the chip row holds the no-pan law at 390', chipPan + 'px');
  const tablePan = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  ok(tablePan <= 0, 'V5 the draft table view does not pan the page at 390', tablePan + 'px');
  await page.evaluate(sel => { const c = document.querySelector(sel); if (c) c.scrollIntoView({ block: 'center' }); }, H.sel.chips);
  await page.waitForTimeout(300);
  await page.screenshot({ path: SH + '/chips_390.png' });
  await page.setViewportSize({ width: 1280, height: 940 }); await page.waitForTimeout(400);
  await page.evaluate((s) => { const dv = document.querySelector(s.viewSwitch); dv.value = s.viewCards; dv.dispatchEvent(new Event('change', { bubbles: true })); }, { viewSwitch: H.sel.viewSwitch, viewCards: H.val.viewCards });
  await page.evaluate(sel => document.querySelector(sel).scrollIntoView({ block: 'center' }), H.sel.chips);
  await page.waitForTimeout(300);
  await page.screenshot({ path: SH + '/chips_desktop.png' });

  // ============ V8a · BACK TO DRAFT on the footer pages ============
  console.log('== V8 · BACK TO <STAGE> on the footer pages ==');
  const v8a = await page.evaluate(s => {
    document.querySelector(s.tabBtnGuide).click();
    const view = document.querySelector(s.viewGuide);
    const bars = Array.from(view.querySelectorAll(s.backbar));
    return {
      n: bars.length,
      first: bars[0] === view.firstElementChild, last: bars[bars.length - 1] === view.lastElementChild,
      label: bars[0] ? bars[0].querySelector('button').textContent : ''
    };
  }, H.sel);
  ok(v8a.n === 2 && v8a.first && v8a.last, 'V8a the Guide carries a bar at the top AND the bottom', v8a.n + ' bars');
  ok(v8a.label === 'BACK TO DRAFT', 'V8a the label reads the live stage (draft)', v8a.label);
  const v8b = await page.evaluate(s => {
    document.querySelector(s.viewGuideBarBtn).click();
    return document.querySelector(s.viewDraft).classList.contains('active');
  }, H.sel);
  ok(v8b, 'V8a the bar returns the user to the simulator', '');
  const v8all = await page.evaluate(s => {
    const out = {};
    [[s.tabBtnRankings, s.viewRankings], [s.tabBtnPlayers, s.viewPlayers], [s.tabBtnGroups, s.viewGroups], [s.tabBtnCompare, s.viewCompare]].forEach(([b, v]) => {
      document.querySelector(b).click();
      const el = document.querySelector(v);
      out[v] = el.querySelectorAll(s.backbar).length;
    });
    document.querySelector(s.tabBtnDraft).click();
    return out;
  }, H.sel);
  ok(Object.values(v8all).every(n => n === 2), 'V8a all five footer pages carry two bars', JSON.stringify(v8all));

  // ============ V13a · the preseason page: plain dropdowns + 2 Point Conversion ============
  console.log('== V13 · the preseason page ==');
  const simSnip = eng('seasonBoot');
  let v13sim = { err: 'adapter lacks engine.seasonBoot' };
  if (simSnip) { await page.evaluate(() => { window.__zpbQuietSim = true; }); v13sim = await run(simSnip); }
  await page.waitForTimeout(1000); await closeOv();
  if (simSnip) ok(v13sim.phase === 'regular' && v13sim.preseason, 'V13 the season boots into the preseason', JSON.stringify(v13sim));
  else sk('V13 the season boots into the preseason', 'engine.seasonBoot');
  const v13 = await page.evaluate(s => {
    const host = document.querySelector(s.seasonHost) || document.querySelector(s.seasonHostAlt);
    return {
      boxed: document.querySelectorAll(s.boxedDd).length,
      twoPt: /HOW A 2 POINT CONVERSION WORKS/.test(host.textContent),
      noTeamsRun: !/teams run it/.test(host.textContent),
      bars: Array.from((document.querySelector(s.viewDraft) || document.body).querySelectorAll(s.backbar)).length,
      label: (() => { const b = (document.querySelector(s.viewDraft) || document.body).querySelector(s.backbar + ' button'); return b ? b.textContent : ''; })()
    };
  }, H.sel);
  ok(v13.boxed === 0, 'V13 no boxed dropdown remains on the preseason flow', v13.boxed + ' left');
  ok(v13.twoPt, 'V13 the header says HOW A 2 POINT CONVERSION WORKS', '');
  ok(v13.noTeamsRun, 'V13 the offense dropdown lost (x teams run it)', '');
  const v13c = await page.evaluate(s => {
    document.querySelector(s.tabBtnGuide).click();
    const b = document.querySelector(s.viewGuideBarBtn);
    const out = b ? b.textContent : '';
    document.querySelector(s.tabBtnDraft).click();
    return out;
  }, H.sel);
  ok(v13c === 'BACK TO PRESEASON', 'V13 the bars read BACK TO PRESEASON at the preseason stage', v13c);
  const v13b = await page.evaluate(s => {
    const sums = Array.from(document.querySelectorAll(s.seasonSummaries));
    const ref = sums.find(el => /WHAT DO THESE TERMS MEAN/.test(el.textContent));
    const off = sums.find(el => /EVERY STYLE WITH YOUR ROSTER/.test(el.textContent));
    if (!ref || !off) return { err: 'summaries not found' };
    const dr = ref.closest('details'), dco = off.closest('details');
    return { refBorder: getComputedStyle(dr).borderTopWidth + ' ' + getComputedStyle(dr).borderTopColor, offBorder: getComputedStyle(dco).borderTopWidth + ' ' + getComputedStyle(dco).borderTopColor,
             refBg: getComputedStyle(dr).backgroundColor, offBg: getComputedStyle(dco).backgroundColor, sameSize: getComputedStyle(ref).fontSize === getComputedStyle(off).fontSize };
  }, H.sel);
  ok(v13b.offBorder === v13b.refBorder && v13b.offBg === v13b.refBg, 'V13 the four headers wear the reference style (no box, no glass)', JSON.stringify(v13b));
  await page.evaluate(s => { document.querySelector(s.tabBtnDraft).click(); if (document.querySelector(s.seasonHost)) document.querySelector(s.seasonHost).scrollIntoView({ block: 'start' }); }, H.sel);
  await page.waitForTimeout(300);
  await page.screenshot({ path: SH + '/preseason_plain_headers.png' });

  // ============ V9 · SIM SEASON = SIM GAME ============
  console.log('== V9 · the sim buttons read as one family ==');
  const v9 = await page.evaluate(s => {
    const ss = document.querySelector(s.simSeasonBtn);
    if (!ss) return { err: 'no sim season button' };
    const sg = document.querySelector(s.simgame);
    const sib = sg || document.querySelector(s.tabSibling);
    const a = getComputedStyle(ss);
    const b = sib ? getComputedStyle(sib) : null;
    return { bg: a.backgroundColor, border: a.borderColor, sibCls: sib ? (sib.id || sib.className) : null, sibBg: b ? b.backgroundColor : null, sibBorder: b ? b.borderColor : null };
  }, H.sel);
  ok(v9.bg === 'rgba(0, 0, 0, 0)', 'V9 SIM SEASON is transparent at rest (never a white panel)', v9.bg);
  ok(v9.sibBg !== null && v9.bg === v9.sibBg && v9.border === v9.sibBorder, 'V9 SIM SEASON wears the family fill and border', JSON.stringify(v9));

  // ============ V11 · the box score border = the score border ============
  console.log('== V11 · the box score wears the score border ==');
  const v11snip = eng('linescoreProbe');
  const v11 = v11snip ? await run(v11snip) : { err: 'adapter lacks engine.linescoreProbe' };
  ok(!v11.err && v11.ls === v11.score, 'V11 the linescore border color equals the score border color', JSON.stringify(v11));

  // ============ V7 + V4 · the review: the scale, the command center ============
  console.log('== V7/V4 · the season review ==');
  const scaleSnip = eng('scaleProbe');
  const v7 = scaleSnip ? await run(scaleSnip) : { err: 'adapter lacks engine.scaleProbe' };
  if (scaleSnip) {
    ok(!v7.err && v7.allInt && Math.abs(v7.meanDisp - v7.med) < 3, 'V7 the displayed ratings center on the drafted-pool median OVR (the veto c anchor)', JSON.stringify(v7));
    ok(!v7.err && v7.min >= 0 && v7.max <= 99, 'V7 the display scale stays in bounds', v7.min + '·' + v7.max);
  } else sk('V7 the display scale pair (centers on the median · in bounds)', 'engine.scaleProbe');
  const mountSnip = eng('mountReview');
  let v4sim = { err: 'adapter lacks engine.mountReview' };
  if (mountSnip) v4sim = await run(mountSnip);
  await page.waitForTimeout(1200); await closeOv();
  const v4 = await page.evaluate(s => {
    const host = document.querySelector(s.seasonHost) || document.querySelector(s.seasonHostAlt);
    const board = host && host.querySelector(s.fxBoard);
    if (!board) return { board: false };
    const minis = Array.from(board.querySelectorAll(s.fxMini)).map(m => ({
      label: m.querySelector(s.fxMiniLabel).textContent,
      grade: m.querySelector(s.gradeChip).textContent,
      nums: m.querySelector(s.fxMiniNums).textContent,
      noGauge: !m.querySelector(s.fxTrack)
    }));
    const cuts = Array.from(board.querySelectorAll(s.fxCutcard)).map(c => {
      const badges = Array.from(c.querySelectorAll(s.fxPos));
      const csB = badges.length ? getComputedStyle(badges[0]) : null;
      const csO = badges.length > 1 ? getComputedStyle(badges[1]) : null;
      const num = c.querySelector(s.fxNum);
      const csN = num ? getComputedStyle(num) : null;
      return {
        name: c.querySelector(s.fxCardName).textContent,
        num: num ? num.textContent : '',
        lbl: (c.querySelector(s.fxRatingLbl) || {}).textContent || '',
        nBadges: badges.length, ovrBadge: badges[1] ? badges[1].textContent : '',
        badgeFs: csB ? csB.fontSize : '', ovrFs: csO ? csO.fontSize : '', numFs: csN ? csN.fontSize : '',
        delta: (c.querySelector(s.fxGapnum) || {}).textContent || null,
        cut: !!c.querySelector(s.fxCut)
      };
    });
    const cutAnim = board.querySelector(s.fxCut) ? getComputedStyle(board.querySelector(s.fxCut)).animationName : '';
    const cd = board.querySelector(s.fxCdtitle);
    const cdCs = cd ? getComputedStyle(cd) : null;
    const go = board.querySelector(s.fxGoshine);
    const goCs = go ? getComputedStyle(go) : null;
    const secs = Array.from(board.querySelectorAll(s.fxSec)).map(el => el.textContent);
    return {
      board: true, title: (board.querySelector(s.rcTitle) || {}).textContent || '',
      sub: (board.querySelector(s.fxSub) || {}).textContent || null,
      secs, cdText: cd ? cd.textContent : null,
      cdAlign: cdCs ? cdCs.textAlign : '', cdFont: cdCs ? cdCs.fontFamily : '', cdFs: cdCs ? parseFloat(cdCs.fontSize) : 0,
      goText: go ? go.textContent : null, goAnim: goCs ? goCs.animationName : '', goClip: goCs ? (goCs.webkitBackgroundClip || goCs.backgroundClip) : '', goImg: goCs ? goCs.backgroundImage.slice(0, 60) : '',
      minis, cuts, cutAnim,
      noOldCards: board.querySelectorAll(s.fxCard).length === 0,
      boardText: board.textContent,
      foot: (board.querySelector(s.fxFoot) || {}).textContent || ''
    };
  }, H.sel);
  ok(v4.board, 'V4 the command center renders on the shared review', '');
  ok(v4.title === 'DRAFT COMMAND CENTER', 'V4 the panel is renamed', v4.title);
  ok(v4.sub === null || v4.sub === '', 'V4 the old subtitle line is gone', JSON.stringify(v4.sub));
  ok(v4.secs.length === 0 && v4.boardText.indexOf('EVERY ROOM BELOW A B') < 0, 'V4 (U1) the section-A header text is gone — the cards speak for themselves', JSON.stringify(v4.secs));
  ok(v4.boardText.indexOf('THE LINE IS THE AVERAGE SEASON') < 0 && v4.boardText.indexOf('KICKER OR HIGHER') < 0, 'V4 (U2) the line text is gone — the cut math keeps running unseen', '');
  ok(v4.cdText === 'Cutdown Day', 'V4 (U3) the subtitle reads Cutdown Day', JSON.stringify(v4.cdText));
  ok(v4.cdAlign === 'center' && /Cinzel Decorative/.test(v4.cdFont), 'V4 (U3) the subtitle is centered Cinzel Decorative', v4.cdAlign + ' · ' + v4.cdFont.slice(0, 40));
  const sizes = await page.evaluate(s => {
    const probe = document.createElement('div'); probe.className = s.secProbe; probe.textContent = 'probe'; probe.style.cssText = 'position:absolute;left:-9999px;';
    const board = (document.querySelector(s.seasonHost) || document.querySelector(s.seasonHostAlt)).querySelector(s.fxBoard);
    board.appendChild(probe);
    const sec = parseFloat(getComputedStyle(probe).fontSize); probe.remove();
    const title = parseFloat(getComputedStyle(board.querySelector(s.rcTitle)).fontSize);
    const cd = parseFloat(getComputedStyle(board.querySelector(s.fxCdtitle)).fontSize);
    return { sec, title, cd };
  }, H.sel);
  ok(sizes.cd > sizes.sec && sizes.cd < sizes.title, 'V4 (U3) the subtitle is the LARGER size — above the retired section line, under the panel title', 'sec ' + sizes.sec + ' < cd ' + sizes.cd + ' < title ' + sizes.title);
  ok(v4.minis.length >= 1 && v4.minis.every(m => m.noGauge && m.grade && m.nums.indexOf('OVR') > 0), 'V4 the rooms wear the small report cards, no bar graph', v4.minis.map(m => m.label + ' ' + m.grade).join(' · '));
  const grades = v4.minis.map(m => m.grade);
  const ORDER = ['A+','A','A-','B+','B','B-','C+','C','C-','D','F'];
  const sortedOk = grades.every((g, i) => i === 0 || ORDER.indexOf(grades[i - 1]) <= ORDER.indexOf(g));
  ok(sortedOk && grades.every(g => ORDER.indexOf(g) > ORDER.indexOf('B')), 'V4 best to worst, and every one is below a B', grades.join(' '));
  ok(v4.cuts.length >= 1 && v4.cuts.every(c => c.cut && c.num && !c.delta), 'V4 (U5) every cutdown card carries its number and CUT — the delta span is gone', v4.cuts.map(c => c.name + ' ' + c.num).join(' · '));
  ok(v4.boardText.indexOf('vs his') < 0, 'V4 (U5) no “vs his N OVR” text anywhere on the board', '');
  ok(v4.cuts.every(c => c.lbl === 'SEASON RATING'), 'V4 (U6) the season rating is labeled SEASON RATING', JSON.stringify(v4.cuts.map(c => c.lbl)));
  ok(v4.cuts.every(c => c.nBadges === 2 && / OVR$/.test(c.ovrBadge)), 'V4 (U6) every card wears the position badge AND the OVR badge', v4.cuts.map(c => c.name + '·' + c.ovrBadge).join(' · '));
  ok(v4.cuts.every(c => c.badgeFs === c.ovrFs), 'V4 (U6) the OVR badge is the position badge size (same class, measured equal)', JSON.stringify(v4.cuts.map(c => c.badgeFs)));
  ok(v4.cuts.every(c => Math.abs(parseFloat(c.numFs) - parseFloat(c.badgeFs)) <= 3), 'V4 (U6) the season rating reads about the badge size', JSON.stringify(v4.cuts.map(c => c.numFs)));
  ok(v4.cutAnim === 'zpbCutFade', 'V4 the CUT badge fades in and out (zpbCutFade)', v4.cutAnim);
  ok(v4.noOldCards, 'V4 the old two-bar cards retired', '');
  ok(v4.foot === 'PRIORITIZE THESE POSITIONS NEXT DRAFT TO GO 20-0', 'V4 (U4) the footer asks for the 20-0', v4.foot);
  ok(v4.goText === '20-0' && v4.goAnim === 'fxshine' && v4.goClip === 'text', 'V4 (U4) the 20-0 shimmers (the fxshine sweep, background-clip text)', v4.goAnim + ' · ' + v4.goClip);
  ok(v4.goImg.indexOf('linear-gradient') === 0, 'V4 (U4) the shimmer rides a team-color gradient', v4.goImg);
  const colons = await page.evaluate(s => {
    const host = document.querySelector(s.seasonHost) || document.querySelector(s.seasonHostAlt);
    const t = (host.querySelector(s.fxBoard) || { textContent: '' }).textContent;
    return (t.match(/[;:]/g) || []).length;
  }, H.sel);
  ok(colons === 0, 'V4 the dot law — no colon or semicolon displayed on the board', colons + ' hits');
  await page.evaluate(s => {
    const host = document.querySelector(s.seasonHost) || document.querySelector(s.seasonHostAlt);
    const board = host.querySelector(s.fxBoard); if (board) board.scrollIntoView({ block: 'start' });
  }, H.sel);
  await page.waitForTimeout(1100);
  const panDesk = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  ok(panDesk <= 0, 'V4 no side scroll at 1280', panDesk + 'px');
  await page.screenshot({ path: SH + '/command_center.png' });

  // V0c · the scale explainer stays truthful (V-c + U5)
  const expSnip = eng('explainerProbe');
  const v0c = (expSnip && medSnip) ? await run(expSnip) : { err: 'adapter lacks engine.explainerProbe' };
  if (expSnip && medSnip) {
    ok(v0c.genHas && v0c.genDrafted && v0c.genNoShort, 'V0c the scale explainer reads the drafted pool and no longer mentions the shortfall', JSON.stringify(v0c));
    ok(v0c.liveNoShort, 'V0c no live surface carries the retired wording', '');
    ok(v0c.genReads === String(med.med), 'V0c the explainer prints the stored median (77, the veto c anchor)', v0c.genReads + ' vs ' + med.med);
  } else sk('V0c the scale explainer trio (drafted pool · no retired wording · prints the stored median)', 'engine.explainerProbe');

  // V8b · the stage label after the regular season
  const v8c = await page.evaluate(s => {
    document.querySelector(s.tabBtnCompare).click();
    const b = document.querySelector(s.viewCompareBarBtn);
    const out = b ? b.textContent : '';
    document.querySelector(s.tabBtnDraft).click();
    return out;
  }, H.sel);
  ok(v8c === 'BACK TO WEEK 17', 'V8b the label tracks the stage after the season (regularReview → WEEK 17)', v8c);

  // ============ V12 · the award names ride nm60 in light ============
  console.log('== V12 · the 0.60 preset ==');
  const v12 = await page.evaluate(f => {
    document.documentElement.setAttribute('data-theme', 'light');
    const probe = document.createElement('div');
    probe.className = f.awcard.classes.join(' ');
    probe.style.cssText = f.awcard.style;
    probe.innerHTML = f.awcard.inner;
    document.body.appendChild(probe);
    const light = getComputedStyle(probe.querySelector(f.awcard.target)).color;
    document.documentElement.setAttribute('data-theme', 'dark');
    const dark = getComputedStyle(probe.querySelector(f.awcard.target)).color;
    probe.remove();
    document.documentElement.removeAttribute('data-theme');
    return { light, dark };
  }, H.fixtures);
  ok(v12.light === 'rgb(122, 31, 43)', 'V12 light reads the 0.60 preset (--nm60)', v12.light);
  ok(v12.dark !== 'rgb(122, 31, 43)', 'V12 dark keeps the 0.50 law (never nm60)', v12.dark);

  // ============ V6 · SIM PLAYOFFS: a cinematic page per round ============
  console.log('== V6 · the playoff round cinematics ==');
  const poSnip = eng('playoffsRun');
  const v6 = poSnip ? await run(poSnip) : { err: 'adapter lacks engine.playoffsRun' };
  await page.waitForTimeout(600);
  if (poSnip) {
    ok(v6.phase === 'complete' && v6.champion, 'V6 the door sims the whole bracket', JSON.stringify({ phase: v6.phase, champion: v6.champion }));
    ok(v6.cine && v6.go, 'V6 the round cinematic is up and waits for Continue', (v6.kicker || '') + ' · ' + (v6.big || ''));
    ok(v6.kicker === 'WILD CARD ROUND', 'V6 the first card is the round the user plays', v6.kicker || '(none)');
    ok(!v6.stormEarly, 'V6 the Super Bowl storm does NOT jump early', '');
  } else sk('V6 the playoff cinematics quartet (bracket complete · cinematic waits · WILD CARD first · no early storm)', 'engine.playoffsRun');
  await page.screenshot({ path: SH + '/porun_round.png' });
  const v6b = await page.evaluate(s => {
    let clicks = 0;
    while (document.querySelector(s.porunGo) && clicks < 5) { document.querySelector(s.porunGo).click(); clicks++; }
    return { clicks };
  }, H.sel);
  await page.waitForTimeout(1500);
  const v6c = await page.evaluate(s => ({ porun: !!document.querySelector(s.porun), sb: !!document.querySelector(s.sbfin) }), H.sel);
  ok(v6c.sb && !v6c.porun, 'V6 after the last Continue the Super Bowl page mounts', JSON.stringify({ clicks: v6b.clicks, sb: v6c.sb }));
  await closeOv();

  // ============ V16 · the guide ladder shows every slot ============
  console.log('== V16 · the guide ladder ==');
  const v16 = await page.evaluate(s => {
    document.querySelector(s.tabBtnGuide).click();
    const names = Array.from(document.querySelectorAll(s.viewGuide + ' ' + s.prname)).map(e => e.textContent.trim());
    return { n: names.length, names, bars: document.querySelectorAll(s.viewGuide + ' ' + s.backbar).length };
  }, H.sel);
  ok(v16.n === 32, 'V16 all 32 depth-chart slots on the ladder', v16.n + ' rows');
  ok(['TE3', 'DIME', 'WR4', 'DL5'].every(x => v16.names.indexOf(x) >= 0), 'V16 TE3 and DIME are on the map (and WR4, DL5)', v16.names.join(' '));
  ok(v16.bars === 2, 'V16 the guide bars are still in place (complete season → BACK TO SUPER BOWL)', (() => '')());
  await page.evaluate(s => { const g = document.querySelector(s.viewGuide + ' ' + s.prname); if (g) g.scrollIntoView({ block: 'center' }); }, H.sel);
  await page.waitForTimeout(300);
  await page.screenshot({ path: SH + '/guide_ladder_32.png' });

  // ============ V10 · the prematch player cards, both themes ============
  console.log('== V10 · the pregame player cards ==');
  const v10 = await page.evaluate(f => {
    const probe = () => {
      const stage = document.createElement('div');
      stage.className = f.pregame.stageClass;
      const el = document.createElement('span');
      el.className = f.pregame.starClass;
      el.innerHTML = f.pregame.inner;
      el.style.cssText = f.pregame.style;
      stage.appendChild(el); stage.style.cssText = 'position:absolute;left:-9999px;top:0;';
      document.body.appendChild(stage);
      const cs = getComputedStyle(el);
      const out = { bg: cs.backgroundColor, img: cs.backgroundImage, name: getComputedStyle(el.querySelector('b')).color };
      stage.remove();
      return out;
    };
    document.documentElement.setAttribute('data-theme', 'light');
    const light = probe();
    document.documentElement.setAttribute('data-theme', 'dark');
    const dark = probe();
    document.documentElement.removeAttribute('data-theme');
    return { light, dark };
  }, H.fixtures);
  ok(v10.light.img.indexOf('linear-gradient') === 0 && v10.light.img.indexOf('rgba(16, 9, 4') < 0 && v10.light.img.indexOf('rgba(16,9,4') < 0, 'V10 light mode: no dark base in the card wash', v10.light.img.slice(0, 90));
  ok(v10.light.bg === 'rgba(0, 0, 0, 0)', 'V10 light mode: the card fill is the gradient wash (no dark color layer)', v10.light.bg);
  ok(v10.dark.img.indexOf('linear-gradient') === 0 && v10.dark.img !== v10.light.img, 'V10 dark mode keeps its own (darker) stage gradient', v10.dark.img.slice(0, 90));
  ok(v10.light.name === 'rgb(142, 85, 102)', 'V10 light mode: the name rides the halfway ink (--tn)', v10.light.name);

  // ============ V14 · the season keeps its 2-Pt labels ============
  console.log('== V14 · the in-season format stands ==');
  const v14 = await page.evaluate(s => {
    const host = document.querySelector(s.seasonHost) || document.querySelector(s.seasonHostAlt);
    const t = host.textContent || '';
    return { seasonLabel: t.indexOf('2-Pt Conversions') >= 0, newPre: (host.innerHTML || '').indexOf('2 Point Conversions') >= 0 };
  }, H.sel);
  ok(v14.seasonLabel, 'V14 the season review still says 2-Pt Conversions (current format kept)', '');

  // ============ V8c · the complete-season label ============
  const stageSnip = eng('stageLabel');
  const v8d = stageSnip ? await run(stageSnip) : { err: 'adapter lacks engine.stageLabel' };
  if (stageSnip) ok(v8d.label === 'SUPER BOWL', 'V8c the stage reads SUPER BOWL when the season is complete', v8d.label);
  else sk('V8c the stage reads SUPER BOWL when the season is complete', 'engine.stageLabel');

  ok(pageErrs.length === 0, 'zero page errors across the whole battery', pageErrs.slice(0, 3).join(' | '));
  console.log(`\n== RESULT · ${pass} pass · ${fail} fail` + (skip ? ` · ${skip} skip ==` : ' =='));
  if (MISSING.length) console.log('   adapter gaps: ' + MISSING.join(' · '));
  await browser.close();
  process.exit(fail ? 1 : (skip || MISSING.length ? 3 : 0));
})().catch(e => { console.error('BATTERY CRASH', e); process.exit(2); });
