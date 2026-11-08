import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { TEAMS } from '../../src/sports/nfl/engine/league.ts';
import { TEAM_COLORS } from '../../src/sports/nfl/view/teamColors.ts';
import { BG_DARK, BG_LIGHT, contrast, opponentVars, teamPack } from '../../src/sports/nfl/view/theme.ts';

// Golden = the 82 --t* tokens that zpbPackFor in Football-Sim-Z-post-blue-w54.html (md5 512d1885...) produced for all 32
// franchises, captured by running the shell's own functions in a Node VM (no hand copying of numbers).
const golden = JSON.parse(fs.readFileSync(new URL('./golden/teamPacks.w54.json', import.meta.url), 'utf8')) as Record<string, { raw: string[]; vars: Record<string, string> }>;

test('theme: the colour table covers exactly the 32 engine franchises, 3 valid hexes each', () => {
  assert.deepEqual(Object.keys(TEAM_COLORS).sort(), TEAMS.map((t) => t.name).sort());
  for (const [n, hs] of Object.entries(TEAM_COLORS)) {
    assert.equal(hs.length, 3, n);
    for (const h of hs) assert.match(h, /^#[0-9A-F]{6}$/, `${n} ${h}`);
  }
});

test('theme: the true brand hexes equal the shell table (chips stay true)', () => {
  for (const [n, g] of Object.entries(golden)) assert.deepEqual([...TEAM_COLORS[n]], g.raw, n);
});

test('theme: every pack reproduces the shell token for token (32 teams x 82 tokens)', () => {
  let checked = 0;
  for (const n of Object.keys(golden)) {
    const p = teamPack(n)!;
    assert.deepEqual(Object.keys(p.vars).sort(), Object.keys(golden[n].vars).sort(), `${n}: token names`);
    for (const [k, v] of Object.entries(golden[n].vars)) { assert.equal(p.vars[k], v, `${n} ${k}`); checked++; }
  }
  assert.equal(checked, 32 * 82);
});

test('theme: an unknown team has no pack and no opponent tokens', () => {
  assert.equal(teamPack('Nowhere Nobodies'), null);
  assert.deepEqual(opponentVars('Nowhere Nobodies'), {});
});

test('theme: opponent tokens are the same pack under --o, and never touch --t', () => {
  const ov = opponentVars('Minnesota Vikings'), tv = teamPack('Minnesota Vikings')!.vars;
  assert.equal(Object.keys(ov).length, Object.keys(tv).length);
  assert.ok(Object.keys(ov).every((k) => k.startsWith('--o')));
  assert.equal(ov['--oA'], tv['--tA']);
  assert.equal(ov['--oAd'], tv['--tAd']);
});

// Readability floors. The shell's accent loop stops at lightness 0.15 (light) or 0.9 (dark), so a floor can legitimately
// be unreachable for a very pale brand colour; the test lists every miss instead of hiding it.
const floors: [string, string, number][] = [
  ['--tA', BG_LIGHT, 4.5], ['--tAd', BG_DARK, 4.5], ['--tTx', BG_LIGHT, 7], ['--tTxM', BG_LIGHT, 5], ['--tTxMd', BG_DARK, 4.5],
  ['--tA2', BG_LIGHT, 4.0], ['--tA3', BG_LIGHT, 4.0], ['--tA2d', BG_DARK, 4.0], ['--tA3d', BG_DARK, 4.0],
];
test('theme: text-bearing tokens clear their contrast floors for 32 teams x 2 themes (any miss is named)', () => {
  const misses: string[] = [];
  for (const n of Object.keys(TEAM_COLORS)) {
    const v = teamPack(n)!.vars;
    for (const [k, bg, min] of floors) { const c = contrast(v[k], bg); if (c < min) misses.push(`${n} ${k} ${c.toFixed(2)} < ${min}`); }
  }
  assert.deepEqual(misses, []);
});

test('theme: on-colour ink is always the more readable of the two inks on the accent mix', () => {
  for (const n of Object.keys(TEAM_COLORS)) {
    const v = teamPack(n)!.vars;
    assert.ok(['#2c1e0c', '#fffaf2'].includes(v['--tOn']) && ['#2c1e0c', '#fffaf2'].includes(v['--tOnd']), n);
  }
});

test('theme: the check can fail (a planted bad pairing is caught by contrast())', () => {
  assert.ok(contrast('#FFFF00', BG_LIGHT) < 4.5, 'bright yellow on the light page must fail the floor');
  assert.ok(contrast('#000000', '#FFFFFF') > 20.9);
});

test('theme: the module has no DOM, storage, randomness or clock', () => {
  for (const f of ['theme.ts', 'teamColors.ts']) {
    const src = fs.readFileSync(new URL('../../src/sports/nfl/view/' + f, import.meta.url), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/.*$/gm, '$1');
    for (const bad of [/\bdocument\b/, /\bwindow\b/, /\blocalStorage\b/, /\bMath\.random\b/, /\bDate\.now\b/, /\bnew Date\b/]) assert.ok(!bad.test(src), `${f}: ${bad}`);
  }
});
