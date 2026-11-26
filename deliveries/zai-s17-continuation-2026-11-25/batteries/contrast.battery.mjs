/* contrast.battery.mjs — the T6/W5 contrast GUARDRAIL (node-side, zero deps): every team colour
 * pair the shell can render as body text is MEASURED against WCAG 2.1 AA (4.5:1), per mode, and
 * every failing pair is NAMED — the audit cannot silently rot the way the c10 sitting's two AA
 * holes (1.51/1.65 light gold2, 3.17 dark rose-ink) did.
 *
 *   C1  the 32 team inks × 2 modes: the rendered TEXT colour (ink.ts's pale form, with its
 *       color-mix resolved to hex here) reads ≥ 4.5:1 on the mode's panel — failing teams NAMED.
 *   C2  the shell token pairs (the audit the Owner asked for): light gold2 on its two light
 *       panels, the rose-ink on plum, the dark body inks — ≥ 4.5:1. The two KNOWN holes stay
 *       named on the record (KNOWN-HOLE: the fix is the Owner's ruling, never shipped here);
 *       a NEW hole is a FAIL (exit 1) — that is the guardrail's teeth.
 *
 * Run: node --import ./scripts/node-port-register.mjs batteries/contrast.battery.mjs
 * Exit 0 = green (known holes may be present, named); exit 1 = a NEW hole or a law died.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const P = (rel) => path.join(ROOT, rel);
const results = [];
const ok = (law, pass, detail = '') => { results.push({ law, verdict: pass ? 'PASS' : 'FAIL', detail }); console.log(`   ${pass ? 'PASS' : 'FAIL'}  ${law}${detail ? ' — ' + detail : ''}`); };

const { TEAM_COLORS } = await import(P('src/lib/port/seam.ts'));
const { inkOf } = await import(P('src/lib/port/ink.ts'));
const { PANEL_HEX_DARK, PANEL_HEX_LIGHT, TEAM_FALLBACK } = await import(P('src/lib/port/tokens.ts'));

// ---------- WCAG 2.1, same math as probe-contrast.mjs / ink.ts ----------
const lum = (hex) => {
  const n = hex.replace('#', '');
  const c = [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const ratio = (a, b) => { const l1 = lum(a), l2 = lum(b); return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05); };
// resolve ink.ts's pale form: color-mix(in srgb, X 55%, BASE) — 55% of X over the base, per channel
const resolvePale = (pale) => {
  const m = /color-mix\(in srgb, (#[0-9a-fA-F]{6}) 55%, (#[0-9a-fA-F]{6})\)/.exec(pale);
  if (!m) return pale;   // a plain hex (the ink reads as-is)
  const mix = (x, y) => {
    const a = parseInt(x.slice(1), 16), b = parseInt(y.slice(1), 16);
    const ch = (s) => Math.round(0.55 * ((a >> s) & 255) + 0.45 * ((b >> s) & 255));
    return '#' + [16, 8, 0].map((s) => ch(s).toString(16).padStart(2, '0')).join('');
  };
  return mix(m[1], m[2]);
};

// ---------- C1: the 32 team inks × 2 modes ----------
const teams = Object.keys(TEAM_COLORS);
const AA = 4.5;
// the PRE-EXISTING team holes at the delivered c10 bytes (the same ink.ts algorithm over the same
// Owner table — teamColors.ts is byte-identical across the re-pin and ink.ts carries no delta this
// sitting): named on the record, the Owner's to fix. A NEW team hole below FAILS the battery.
const KNOWN_TEAM_HOLES = new Set([
  'dark Baltimore Ravens', 'light Los Angeles Chargers', 'light Miami Dolphins',
]);
const holes = [];
const newTeamHoles = [];
for (const mode of [true, false]) {
  const panel = mode ? PANEL_HEX_DARK : PANEL_HEX_LIGHT;
  const modeName = mode ? 'dark' : 'light';
  for (const t of teams) {
    const { pale } = inkOf(t, mode);
    const eff = resolvePale(pale);
    const r = ratio(eff, panel);
    if (r < AA) { const hole = `${modeName} ${t}: ${eff} on ${panel} = ${r.toFixed(2)}:1`; holes.push(hole); if (!KNOWN_TEAM_HOLES.has(`${modeName} ${t}`)) newTeamHoles.push(hole); }
  }
}
const fallbackDark = resolvePale(inkOf('(no such team)', true).pale);
const fallbackLight = resolvePale(inkOf('(no such team)', false).pale);
for (const [modeName, eff, panel] of [['dark fallback', fallbackDark, PANEL_HEX_DARK], ['light fallback', fallbackLight, PANEL_HEX_LIGHT]]) {
  const r = ratio(eff, panel);
  if (r < AA) { const hole = `${modeName} (the no-team fallback): ${eff} on ${panel} = ${r.toFixed(2)}:1`; holes.push(hole); newTeamHoles.push(hole); }
}
for (const h of holes) console.log(`   ${newTeamHoles.includes(h) ? 'NEW-HOLE' : 'KNOWN-HOLE'}  team ink  ${h}${newTeamHoles.includes(h) ? '' : ' · pre-existing at the c10 bytes, the Owner to fix'}`);
ok('C1 the 32 team inks × 2 modes read ≥ 4.5:1 as body text (every failing team NAMED; the three pre-existing holes stay on the record, a NEW hole FAILS)', newTeamHoles.length === 0,
  `${teams.length} teams × 2 modes measured · ${holes.length} AA hole(s) named, ${newTeamHoles.length} NEW · ${holes.join(' | ') || 'all clear'}`);
fs.mkdirSync(P('deliveries/receipts'), { recursive: true });
fs.writeFileSync(P('deliveries/receipts/contrast-audit-latest.json'), JSON.stringify({ aa: 4.5, holes, results }, null, 2));

// ---------- C2: the shell token pairs (the Owner's audit; the two KNOWN holes stay named) ----------
const tokenPairs = [
  ['light gold2 #e6c67d on pale rose #fdf2f6', '#e6c67d', '#fdf2f6'],
  ['light gold2 #e6c67d on white panel #ffffff', '#e6c67d', '#ffffff'],
  ['light text #8e5566 on pale rose #fdf2f6', '#8e5566', '#fdf2f6'],
  ['dark rose ink #8e5566 on plum #1e1119', '#8e5566', '#1e1119'],
  ['dark zcream #f2e7d5 on plum #1e1119', '#f2e7d5', '#1e1119'],
  ['dark gold2 #e8c87e on plum #1e1119', '#e8c87e', '#1e1119'],
];
// the c10 sitting's recorded AA holes — named on the record; the FIX is the Owner's ruling
const KNOWN = new Set(['light gold2 #e6c67d on pale rose #fdf2f6', 'light gold2 #e6c67d on white panel #ffffff', 'dark rose ink #8e5566 on plum #1e1119']);
const measured = tokenPairs.map(([name, a, b]) => ({ name, r: ratio(a, b) }));
const newHoles = measured.filter((x) => x.r < AA && !KNOWN.has(x.name));
const knownOnRecord = measured.filter((x) => x.r < AA && KNOWN.has(x.name));
for (const x of knownOnRecord) console.log(`   KNOWN-HOLE  ${x.r.toFixed(2)}:1 (AA 4.5:1) — ${x.name} · the Owner's to fix, named on the record`);
for (const x of measured.filter((x) => x.r >= AA)) console.log(`   measured    ${x.r.toFixed(2)}:1 PASS — ${x.name}`);
ok('C2 the shell token audit: every token pair measured; the two c10 holes stay NAMED; a NEW hole FAILS',
  newHoles.length === 0,
  newHoles.length === 0
    ? `${measured.length} pairs measured · ${knownOnRecord.length} KNOWN hole(s) on record (${knownOnRecord.map((x) => `${x.name} ${x.r.toFixed(2)}:1`).join(' | ') || 'none'})`
    : `NEW hole(s): ${newHoles.map((x) => `${x.name} ${x.r.toFixed(2)}:1`).join(' | ')}`);

const pass = results.filter((r) => r.verdict === 'PASS').length;
const fail = results.filter((r) => r.verdict === 'FAIL').length;
console.log(`\n== CONTRAST GUARDRAIL · ${pass} pass · ${fail} fail · AA 4.5:1 · ${holes.length} team hole(s), ${newHoles.length} new token hole(s) ==`);
if (fail > 0) { console.log('   FAILED LAWS: ' + results.filter((r) => r.verdict === 'FAIL').map((r) => r.law).join(' | ')); process.exit(1); }
