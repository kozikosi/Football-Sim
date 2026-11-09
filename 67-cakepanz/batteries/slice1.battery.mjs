/* slice1.battery.mjs — the w77 acceptance battery mapped onto Slice 1 (the Draft Board), HONESTLY.
 *
 * The w77 battery's 84 assertions were written against the w76+ SHELL (its DOM ids, its zpb classes,
 * its global engine). A Svelte component tree cannot run them verbatim. Per the standing rule, an
 * assertion that cannot apply is a loud SKIP with the reason — never a silent drop, and the battery
 * is never weakened. This runner therefore reports THREE counts:
 *   APPLY   — the assertion's LAW (not its selector) is checkable on Slice 1, and was run here;
 *   SKIP    — the law targets a shell surface Slice 1 does not contain yet (later slices), or a
 *             shell-only constant (the zpb classes);
 *   DEFER   — the law belongs to the cutover battery and needs both trees (the Architect runs it).
 * Every APPLY line runs for real (Playwright against the built slice, or node against the engine).
 * The engine itself is verified by the Architect's own 284 tests, re-run in this tree (284/284).
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const _req = createRequire(import.meta.url);
let pw; try { pw = _req('playwright'); } catch { pw = _req(process.env.HOME + '/.npm-global/lib/node_modules/playwright'); }

const ROOT = path.resolve(new URL('..', import.meta.url).pathname);
const PORT = process.env.CP_PORT || 4179;
const results = [];
const ok = (law, pass, detail = '') => { results.push({ law, verdict: pass ? 'PASS' : 'FAIL', detail }); console.log(`   ${pass ? 'PASS' : 'FAIL'}  ${law}${detail ? ' — ' + detail : ''}`); };
const skip = (law, why) => { results.push({ law, verdict: 'SKIP', detail: why }); console.log(`   SKIP  ${law} — ${why}`); };

const browser = await pw.chromium.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1180, height: 950 } });
const errs = [];
page.on('pageerror', (e) => errs.push(String(e)));
await page.goto(`http://localhost:${PORT}/?dev=1`);
await page.waitForTimeout(3500);

console.log('== the laws the Draft Board carries (APPLY — run for real) ==');
ok('the board renders from the view model (engine state in, plain JSON out)', (await page.locator('.cp-row').count()) === 60, '60 rows');
ok('the default sort is wins/priority, never raw OVR', (await page.locator('.cp-sort.cp-on').textContent()) === 'Wins');
ok('the on-clock indicator names the round, the pick and the overall', /Round \d+, Pick \d+ \(overall \d+ of \d+\)/.test(await page.locator('.cp-onclock').textContent()));
{
  // P-286 fix (the muse review): the law says EVERY row — check every row's every field, not just the first row's gone%.
  const fields = await page.evaluate(() => {
    const rows = Array.from(document.querySelectorAll('.cp-row'));
    const bad = [];
    for (const row of rows) {
      const get = (sel) => (row.querySelector(sel)?.textContent || '').trim();
      const nums = Array.from(row.querySelectorAll('.cp-main .cp-num')).map((e) => (e.textContent || '').trim());
      const rec = { name: get('.cp-name'), pos: get('.cp-pos'), team: get('.cp-nflteam'), ovr: nums[0], wins: nums[1], pri: nums[2], gone: nums[3] };
      if (!rec.name || !rec.pos || !rec.team || !/^\d+$/.test(rec.ovr) || !/^[+-]/.test(rec.wins) || !/^[+-]/.test(rec.pri) || !/^\d+%$/.test(rec.gone)) bad.push(rec);
    }
    return { n: rows.length, bad };
  });
  ok('every row reads name · pos · team · OVR · wins · priority · gone% (EVERY row, EVERY field)', fields.n === 60 && fields.bad.length === 0, fields.bad.length ? JSON.stringify(fields.bad.slice(0, 2)) : fields.n + ' rows, 0 bad');
}
ok('the gone-odds display is present on every row', (await page.locator('.cp-row .cp-gone').count()) === 60);
ok('the sort controls offer wins / OVR / priority', JSON.stringify(await page.locator('.cp-sort').allTextContents()) === JSON.stringify(['Wins', 'Priority', 'OVR']));
await page.locator('.cp-sort', { hasText: 'OVR' }).click(); await page.waitForTimeout(400);
const firstOvr = await page.locator('.cp-row .cp-ovr').first().textContent();
const ovrs = await page.locator('.cp-row .cp-ovr').allTextContents();
ok('the OVR sort actually sorts', JSON.stringify(ovrs) === JSON.stringify([...ovrs].sort((a, b) => Number(b) - Number(a))), 'first ' + firstOvr);
await page.locator('.cp-sort', { hasText: 'Wins' }).click(); await page.waitForTimeout(300);
// P-286 fix (the muse review): the flex-chip check must OBSERVE the chips while a picker is open —
// never pass vacuously through a count === 0 escape. Probe the first 14 rows' pickers for real chips.
{
  const probe = await page.evaluate(async () => {
    const rows = Array.from(document.querySelectorAll('.cp-row')).slice(0, 14);
    const flexChips = []; const bad = []; let opened = 0;
    for (const row of rows) {
      const main = row.querySelector('.cp-main');
      if (!main) continue;
      main.click(); opened++;
      await new Promise((r2) => setTimeout(r2, 60));
      const fit = row.querySelector('.cp-fits');
      if (fit) for (const i of fit.querySelectorAll('.cp-chip i')) {
        const t = (i.textContent || '').trim();
        if (/^-\d+ flex$/.test(t)) flexChips.push(t); else bad.push(t);
      }
      main.click();
      await new Promise((r2) => setTimeout(r2, 40));
    }
    return { opened, flexChips, bad };
  });
  ok('the flex chips read the flex cost (the "-N" form, no "flex tax" wording) — OBSERVED open', probe.opened > 0 && probe.flexChips.length > 0 && probe.bad.length === 0, probe.opened + ' pickers probed · ' + probe.flexChips.length + ' flex chips · sample ' + JSON.stringify(probe.flexChips.slice(0, 3)) + (probe.bad.length ? ' · BAD ' + JSON.stringify(probe.bad.slice(0, 2)) : ''));
}
// the pick flow: open a row, take the primary chip, confirm
await page.locator('.cp-row .cp-main').first().click(); await page.waitForTimeout(150);
const chipLbl = await page.locator('.cp-chip.cp-primary').first().textContent();
ok('the slot picker offers the natural slot first', /Draft at /.test(chipLbl || ''), (chipLbl || '').trim());
await page.locator('.cp-chip.cp-primary').first().click(); await page.waitForTimeout(150);
ok('the pick confirms before it lands', await page.locator('.cp-confirm').isVisible(), (await page.locator('.cp-confirm').textContent() || '').trim().slice(0, 60));
await page.locator('.cp-go').click(); await page.waitForTimeout(700);
ok('the pick lands and the footer counts it', (await page.locator('.cp-count').textContent()) === '1 of 32 starters');
ok("the CPU teams pick on after the user's pick (the clock advances)", /Round 2/.test(await page.locator('.cp-onclock').textContent()));
await page.locator('.cp-undo').click(); await page.waitForTimeout(700);
ok('undo cuts the log back and the count returns', (await page.locator('.cp-count').textContent()) === '0 of 32 starters');
// the valuation modes
ok('the measured mode is the DEFAULT ("Model Value" on)', (await page.locator('.cp-mode.cp-on').textContent()) === 'Model Value');
ok('the Owner preset is one click away', (await page.locator('.cp-mode', { hasText: 'Owner preset' }).count()) === 1);
ok('the mode switch is DISABLED mid-draft', await page.locator('.cp-mode').first().isDisabled());
ok('the mode label travels with the numbers (the subtitle carries it)', /Model Value/.test(await page.locator('.cp-prov').textContent()));
ok('zero page errors across the whole battery', errs.length === 0, errs.slice(0, 2).join(' | '));

console.log('== the laws that live on later slices or shell surfaces (SKIP — loudly) ==');
skip('V0 the median trio (the drafted-pool median, superseded 76, cached once)', 'the scale explainer lives on the season screen (a later slice); the engine median itself is verified by the engine tests');
skip('V2/V3 the chip law (all off = the full board)', 'the position chips belong to the shell board chrome — slice 1 renders the full board; the chip bar arrives with the board chrome slice');
skip('V5 the phone laws at 390 (the footer nav, the pan laws)', 'the footer nav is shell chrome; the slice screens are mobile-flexible but the shell laws name shell elements');
skip('V6 the playoff round cinematics', 'playoffs are a later slice');
skip('V8a/V8b/V8c/V13/V14/V16 the stage bars, the preseason page, the guide ladder', 'shell pages outside slice 1 (team select, season, standings, guide arrive in slices 2-3)');
skip('V9/V10/V11/V12 the SIM SEASON ghost, the pregame cards, the linescore frame, the award inks', 'season-surface laws — later slices');
skip('V15 the fills column and V17 the picker chips in shell form', 'slice 1 renders the same data as the also-fits chips + the slot picker; the shell FORM is not the law, the DATA is (verified above)');
skip('V7 the display scale centers on the median', 'the display scale drives the season surfaces; the draft numbers ride the same display.ts strings (verified by the engine tests)');
skip('V4 the command center / cutdown day', 'the season review screen — a later slice');
skip('V1 the dropdown order + the OG casing', 'the shell dropdown is a filter on the board chrome; the depth-chart order lives in the engine slots (verified by the engine tests)');

console.log('== DEFER to the cutover battery (needs both trees; the Architect runs it) ==');
for (const law of ['the gone-odds METHOD equality (30 sims, the real CPU logic) vs the shell numbers', 'the 84-assertion DOM battery byte-parity', 'the witness export parity']) results.push({ law, verdict: 'DEFER', detail: 'the cutover battery' });

const pass = results.filter((r) => r.verdict === 'PASS').length;
const fail = results.filter((r) => r.verdict === 'FAIL').length;
const sk = results.filter((r) => r.verdict === 'SKIP').length;
const def = results.filter((r) => r.verdict === 'DEFER').length;
console.log(`\n== SLICE 1 BATTERY · ${pass} pass · ${fail} fail · ${sk} skip (loud, with reasons) · ${def} deferred to cutover ==`);
fs.writeFileSync(path.join(ROOT, 'batteries', 'slice1-battery.json'), JSON.stringify({ pass, fail, skip: sk, defer: def, results }, null, 1));
await browser.close();
process.exit(fail ? 1 : 0);
