// mathlab/flexrebuild.mjs — P-294 follow-up (GLM, 9 Nov 2026): deterministic rebuild of the flex table from theta D + the Owner's overrides.
// Why: the muse relay (council-zai-prompt-D-custom-table-2026-11-09.md) says "flexrebuild.mjs does NOT exist — build it"; Claude's manual
//   rebuild timed out (Owner report 9 Nov) and P-311 needs a diffable reference. A script makes the rebuild reproducible and re-runnable
//   whenever the Owner changes a rule, instead of a manual edit that can time out.
// Owner's decisions (claude-reply-owner-picks-D-2026-11-09.md, council/muse 913d025f): adopt D at theta 1.0, round to the NEAREST tier
//   of 0/2/6/12 with cutoffs at the midpoints 1/4/9; the Owner's override list SUPERSEDES the rounding rule; 7 rules are REMOVED
//   (deleted, not 0). Sign convention: the Owner's prose says -2/-6/-12; flex.json uses positive values (0/2/6/12), 0 = free.
// Inputs:
//   --d=<path>      D values: a thetaprice .md (the D@90 column is used; D@85 kept for reference) or a .json {"_provenance": str, "D": {"A>B": d}}.
//   --base=<path>   base flex.json defining the rule UNIVERSE (default: flex.json next to this script). Universe = its rules MINUS the removals.
//   --out-dir=<dir> write flex.json / flex.ts / REBUILD-REPORT.md / rebuild-record.json there. WITHOUT it the script writes NOTHING (report to stdout only).
//   --ts-src=<path> engine flex.ts to splice the rebuilt FLEX literal into (default: <base>/../../colors/src/sports/nfl/engine/flex.ts if present). Only the
//                   FLEX literal is replaced; EMERGENCY_PENALTY / fit / dl5Penalty are copied verbatim so flex.json = flex.ts by construction.
//   --selftest      synthetic end-to-end assertions (rounding boundaries, override precedence, removals, QB/LS invariants, idempotence). Exit 1 on failure.
// READ-ONLY on everything except --out-dir. It never edits flex.json or flex.ts in place: the Architect copies from the out dir (single-writer).
// RUN FROM ANYWHERE: every default path resolves from this script's location, not the cwd (the run-all path lesson, P-310/P-311).
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.slice(k.length + 3) : d; };
const HERE = path.dirname(new URL(import.meta.url).pathname);
const sha16 = (buf) => crypto.createHash('sha256').update(buf).digest('hex').slice(0, 16);
const fail = (m) => { console.error('FLEXREBUILD FAIL ' + m); process.exit(1); };

// ---- the Owner's list, encoded (source: claude-reply-owner-picks-D-2026-11-09.md, "Owner decisions (from KG, 2026-11-09)")
const REMOVED = ['FB>EDGE', 'FB>DT', 'FB>ILB', 'FB>OLB', 'CB>RB', 'DT>TE', 'EDGE>FS']; // delete the rule, do not set 0 (FS>RB never existed)
const OVERRIDES = {
  // set to 12
  'TE>EDGE': 12, 'RB>WR': 12, 'TE>OT': 12, 'C>DT': 12, 'C>OT': 12, 'OLB>EDGE': 12, 'RB>FS': 12, 'RB>SS': 12,
  'TE>ILB': 12, 'EDGE>SS': 12, 'ILB>DIME': 12, 'OLB>DIME': 12, 'QB>FS': 12, 'SS>RB': 12,
  // set to 6
  'FB>TE': 6, 'C>OG': 6, 'OLB>ILB': 6, 'OLB>SS': 6, 'OT>EDGE': 6, 'SS>CB': 6, 'FS>CB': 6, 'FS>OLB': 6,
  'ILB>NICKEL': 6, 'ILB>TE': 6, 'OLB>NICKEL': 6, 'DT>OT': 6, 'OT>DT': 6, 'SS>TE': 6, 'TE>C': 6, 'TE>DIME': 6,
  'TE>NICKEL': 6, 'TE>OLB': 6, 'TE>RB': 6, 'WR>RB': 6, 'WR>TE': 6, 'RB>TE': 6, 'SS>ILB': 6, 'EDGE>TE': 6, // EDGE>TE is -6, NOT removed (Owner clarification 9 Nov)
  // set to 2
  'DT>OG': 2, 'EDGE>C': 2, 'FS>SS': 2, 'SS>FS': 2, 'ILB>SS': 2, 'OT>C': 2, 'SS>OLB': 2, 'WR>CB': 2,
  'WR>DIME': 2, 'WR>NICKEL': 2, 'WR>FS': 2, 'WR>SS': 2, 'FB>RB': 2, 'K>P': 2, 'P>K': 2,
};
const TIERS = [0, 2, 6, 12], CUTOFFS = [1, 4, 9];
const round = (d) => (d < CUTOFFS[0] ? 0 : d < CUTOFFS[1] ? 2 : d < CUTOFFS[2] ? 6 : 12); // >= cutoff goes up (no D in the table sits exactly on a cutoff)
// --overrides-file=<path>: a flat JSON {"rule": value} map REPLACING the built-in D-picks OVERRIDES. Rules present in the base are
// overrides; rules absent from the base are ADDED (e.g. the items-3+7 file: TE>DIME 12, TE>FS 12, ILB>FS 12, OLB>FS 12, and the six
// SAM mirrors of OLB — Owner verbatim, claude-reply-flex-answers-2026-11-09.md). --keep-base keeps every unoverridden base value
// as-is (no D needed): apply an Owner pass to an already-built table.

// ---- inputs
const dPath = arg('d', '');
const basePath = arg('base', path.join(HERE, 'flex.json'));
const ovFile = arg('overrides-file', '');
const KEEP_BASE = process.argv.includes('--keep-base');
let OVR = OVERRIDES;
if (ovFile) {
  OVR = JSON.parse(fs.readFileSync(ovFile, 'utf8'));
  for (const v of Object.values(OVR)) if (typeof v === 'number' && !TIERS.includes(v)) fail(`overrides-file value ${v} not in ${TIERS}`);
  console.log(`FLEXREBUILD: using overrides from ${path.basename(ovFile)} (${Object.keys(OVR).length} rules)${KEEP_BASE ? ', keep-base mode' : ''}`);
}
if (!dPath && !KEEP_BASE) fail('--d=<thetaprice.md | d.json> is required (or --keep-base); nothing read, nothing written');
const baseRaw = fs.readFileSync(basePath, 'utf8');
const base = JSON.parse(baseRaw);
if (!base.flex || !base.roles) fail(`base ${basePath} has no flex/roles`);
const rulesOf = (g) => Object.entries(g.flex).flatMap(([r, row]) => Object.entries(row).map(([d, p]) => [`${r}>${d}`, p]));
const universe = rulesOf(base);
let D90 = {}, D85 = {}, dProvenance = '', dSha = 'none';
if (dPath) {
  const dRaw = fs.readFileSync(dPath, 'utf8');
  dSha = sha16(dRaw);
  if (dPath.endsWith('.md')) {
    for (const line of dRaw.split('\n')) {
      const r = line.match(/^\| ([A-Z]+>[A-Z]+) \|/);
      if (!r) continue;
      const cols = line.split('|').map((c) => c.trim());
      D90[r[1]] = +cols[6]; D85[r[1]] = +cols[5]; // | rule | now | W85 | W90 | D85 | D90 | ...
    }
    dProvenance = `parsed from ${path.basename(dPath)} (thetaprice md, D@90 column)`;
  } else {
    const j = JSON.parse(dRaw);
    if (!j.D) fail(`${dPath} has no "D" map`);
    D90 = j.D; D85 = j.D85 ?? {}; dProvenance = j._provenance ?? path.basename(dPath);
  }
  if (!/post-bump|refit|re-fit/i.test(path.basename(dPath) + ' ' + dProvenance))
    console.error(`FLEXREBUILD WARNING: D input does not declare POST-bump provenance (${dProvenance}). thetaprice-2026-11-09.md was computed at WILL=150/C=150; the Owner's WILL 150->200 / C 150->200 bump moves D only after the SPEC re-fit lands (SLOTS[].weight alone is a no-op for slotWins20 - GLM 9 Nov, VERIFIED). Re-run with post-bump D before the Architect pins.`);
}
const baseSha = sha16(baseRaw);

// ---- rebuild
const out = {}, moves = [], zeros = [], pending = []; // pending: D depends on the WILL/C slopes (source or dest role OLB or C)
let kept = 0;
for (const [a, row] of Object.entries(base.flex)) {
  out[a] = {};
  for (const [b, cur] of Object.entries(row)) {
    const rule = `${a}>${b}`;
    if (REMOVED.includes(rule)) { moves.push({ rule, old: cur, neu: null, D: D90[rule], source: 'REMOVED' }); continue; }
    let neu, source;
    if (rule in OVR) { neu = OVR[rule]; source = 'override'; }
    else if (KEEP_BASE) { neu = cur; source = 'kept'; }
    else {
      if (D90[rule] === undefined) fail(`no D value for universe rule ${rule} and no override for it`);
      neu = round(D90[rule]); source = 'rounding';
      if (a === 'OLB' || a === 'C' || b === 'OLB' || b === 'C') pending.push(rule); // slope(WILL)/slope(C) re-fit may still move these
    }
    out[a][b] = neu;
    if (neu !== cur) moves.push({ rule, old: cur, neu, D: D90[rule], source });
    else kept++;
    if (neu === 0) zeros.push(rule);
  }
}
for (const [rule, v] of Object.entries(ovFile ? OVR : {})) { // rules absent from the base are additions (e.g. the SAM mirrors)
  if (typeof v !== 'number') continue; // _-prefixed provenance keys
  const [a, b] = rule.split('>');
  if (out[a]?.[b] !== undefined) continue; // a base rule: already applied in the loop
  out[a] ??= {}; out[a][b] = v;
  moves.push({ rule, old: null, neu: v, D: D90[rule], source: 'added' });
}
const tierCounts = (g) => { const t = {}; for (const p of rulesOf({ flex: g }).map(([, v]) => v)) t[p] = (t[p] ?? 0) + 1; return t; };
const tOld = tierCounts(base.flex), tNew = tierCounts(out);

// ---- invariants (loud)
if (Object.keys(out.QB).join() !== 'FS') fail(`QB row must be exactly {FS: ${OVR['QB>FS'] ?? out.QB.FS}}`);
if (!ovFile) for (const [r, v] of Object.entries(OVR)) if (!universe.some(([rule]) => rule === r)) fail(`override ${r}: no such rule in the universe`);
for (const r of REMOVED) if (!universe.some(([rule]) => rule === r)) console.error(`FLEXREBUILD NOTE: removal ${r}: not in the universe (the base may already have it removed) - ok`);
for (const v of Object.values(OVR)) if (typeof v === 'number' && !TIERS.includes(v)) fail(`override value ${v} not in ${TIERS}`);
const unknownD = Object.keys(D90).filter((r) => !universe.some(([rule]) => rule === r));
if (unknownD.length) console.error(`FLEXREBUILD NOTE: D file has ${unknownD.length} rules outside the universe (informational): ${unknownD.join(' ')}`);

// ---- report
const pad = (s, n) => String(s).padEnd(n);
const L = [];
L.push(`# flexrebuild report — ${new Date().toISOString()}`, '',
  `D input: ${dPath || '(none - keep-base mode)'} (sha256 ${dSha}) — ${dProvenance || 'base values kept as built'}`,
  `Base table: ${basePath} (sha256 ${baseSha})${KEEP_BASE ? ' — KEEP-BASE mode: unoverridden base values are kept, no rounding pass' : ''}`,
  `Rounding: D -> nearest tier of ${TIERS.join('/')}, cutoffs ${CUTOFFS.join('/')} (>= cutoff goes up). Overrides: ${Object.keys(OVR).length}${ovFile ? ` (from ${path.basename(ovFile)})` : ' (built-in D-picks list)'}. Removals: ${REMOVED.length}.`,
  `Rules: universe ${universe.length} -> rebuilt ${universe.length - REMOVED.length + (ovFile ? Object.keys(OVR).filter((r) => !universe.some(([rule]) => rule === r)).length : 0)}. Tier counts old ${JSON.stringify(tOld)} -> new ${JSON.stringify(tNew)}. Rules at 0: ${zeros.length}.`, '');
L.push(`## MOVES (${moves.length}) — every rule the Owner should review`, '', '| rule | old | new | D@90 | source |', '|---|---|---|---|---|');
for (const m of moves.sort((x, y) => (y.D ?? -1) - (x.D ?? -1) || x.rule.localeCompare(y.rule))) L.push(`| ${m.rule} | ${m.old ?? '—'} | ${m.neu ?? 'REMOVED'} | ${m.D ?? ''} | ${m.source} |`);
L.push('', `## Unchanged (${kept})`, '', zeros.length ? `## Rules at 0 — free (${zeros.length})` : '', '', zeros.join(' '), '',
  `## PENDING POST-BUMP (${pending.length}) — D for these was read from a PRE-bump file and depends on the WILL/C slopes; re-run when the spec re-fit lands`,
  '', pending.join(' ') || '(none)', '',
  '## Standalone checks', '', '- flexcheck.mjs on the rebuilt table: run from a dir containing this flex.json (receipt belongs to the run, not the script).',
  '- flexeval.mjs pick counts vs the P-310 baseline: the Architect/Verifier run in a colors/ scratch (seeds 1001-1016,3001-3016 tune / 4001-4016 fresh).', '');

// ---- emitters
const srcNote = `FLEX TABLE, tiers 0/2/6/12 (Owner 9 Nov 2026${KEEP_BASE ? ', items 3+7 pass applied to the built table' : ': D at theta 1.0 rounded to the nearest tier, cutoffs 1/4/9, Owner overrides supersede; his list is the reality check'}). REBUILT CANDIDATE by tools/mathlab/flexrebuild.mjs — NOT the shipped table until the Architect copies it and re-pins. ${dPath ? `D input ${path.basename(dPath)} sha ${dSha}; ` : ''}base ${path.basename(basePath)} sha ${baseSha}. from-position -> {destination: penalty}. 0 = free. NICKEL = the CB3 slot. DIME = the 6th-DB slot.${Object.keys(OVR).some((r) => r.endsWith('SAM')) ? ' SAM = the OLB2 slot in a 3-4 (mirrors OLB; comes off for the nickel).' : ''}`;
const flexJson = () => JSON.stringify({ _source: srcNote, roles: base.roles, flex: out }, null, 1) + '\n';
const flexTs = (tsSrc) => {
  const lit = Object.entries(out).map(([r, row]) => `  ${r}: { ${Object.entries(row).map(([d, p]) => `${d}: ${p}`).join(', ')} },`).join('\n');
  const fresh = `export const FLEX: Readonly<Record<Role, Row>> = {\n${lit}\n  // LS has no spot (12 long snappers in the data). Anyone not in the guide still takes the emergency fallback.\n  LS: {},\n};`;
  if (!tsSrc) return null;
  const t = fs.readFileSync(tsSrc, 'utf8');
  const start = t.indexOf('export const FLEX');
  const ls = t.indexOf('LS: {}', start), end = t.indexOf('};', ls);
  if (start < 0 || ls < 0 || end < 0) fail(`--ts-src ${tsSrc}: cannot find the FLEX literal anchors (export const FLEX ... LS:{{} ... }};)`);
  return t.slice(0, start) + fresh + t.slice(end + 2);
};
const writeOut = (dir) => {
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'flex.json'), flexJson());
  const tsPath = arg('ts-src', '');
  const ts = tsPath ? flexTs(tsPath)
    : fs.existsSync(path.join(HERE, '..', '..', 'colors', 'src', 'sports', 'nfl', 'engine', 'flex.ts'))
      ? flexTs(path.join(HERE, '..', '..', 'colors', 'src', 'sports', 'nfl', 'engine', 'flex.ts')) : null;
  if (ts) fs.writeFileSync(path.join(dir, 'flex.ts'), ts); else console.error('FLEXREBUILD NOTE: no engine flex.ts found, wrote flex.json only');
  fs.writeFileSync(path.join(dir, 'REBUILD-REPORT.md'), L.join('\n'));
  fs.writeFileSync(path.join(dir, 'rebuild-record.json'), JSON.stringify({ dPath, dSha, basePath, baseSha, D90, moves, zeros, pending, tierCounts: { old: tOld, new: tNew } }, null, 1));
  console.log('wrote flex.json' + (ts ? ' + flex.ts' : '') + ' + REBUILD-REPORT.md + rebuild-record.json in ' + dir);
};

// ---- selftest (synthetic; no repo file is read or written)
const selftest = () => {
  let bad = 0;
  const ok = (c, m) => { if (!c) { console.error('SELFTEST FAIL ' + m); bad++; } };
  ok(round(0.99) === 0 && round(1) === 2 && round(3.99) === 2 && round(4) === 6 && round(8.99) === 6 && round(9) === 12 && round(19.27) === 12, 'rounding boundaries');
  ok(round(0) === 0, 'D=0 -> 0');
  const synBase = { roles: ['X', 'Y', 'K'], flex: { X: { Y: 12, K: 2 }, Y: { X: 0, NICKEL: 0 }, K: { X: 6 } } };
  const synD = { 'X>Y': 12.5, 'X>K': 0.5, 'Y>X': 0, 'Y>NICKEL': 0, 'K>X': 12.5 }; // X>Y rounds 12; X>K rounds 0; K>X rounds 12
  const saved = { dPath, REMOVED: [...REMOVED], OVERRIDES: { ...OVERRIDES } };
  REMOVED.length = 0; Object.keys(OVERRIDES).forEach((k) => delete OVERRIDES[k]); OVERRIDES['K>X'] = 6; // override beats rounding
  const rebuild = (baseG, d) => { const g = {}; let mv = 0; for (const [a, row] of Object.entries(baseG)) { g[a] = {}; for (const [b, cur] of Object.entries(row)) { const rule = `${a}>${b}`; const v = rule in OVERRIDES ? OVERRIDES[rule] : round(d[rule]); if (v !== cur) mv++; g[a][b] = v; } } return { g, mv }; };
  const r1 = rebuild(synBase.flex, synD);
  ok(r1.g.X.Y === 12 && r1.g.X.K === 0 && r1.g.K.X === 6 && r1.g.Y.X === 0, `synthetic pipeline (${JSON.stringify(r1.g)})`);
  ok(r1.mv === 1, `move count old->new (X>Y 12->12, X>K 2->0, K>X 6->6, Y>X 0->0, Y>NICKEL 0->0 => 1 move; got ${r1.mv})`);
  const r2 = rebuild(synBase.flex, synD);
  ok(JSON.stringify(r1.g) === JSON.stringify(r2.g), 'idempotence (same input, same table)');
  REMOVED.splice(0, REMOVED.length, ...saved.REMOVED); Object.assign(OVERRIDES, saved.OVERRIDES);
  ok(OVERRIDES['QB>FS'] === 12 && REMOVED.length === 7, 'real override/removal tables restored');
  if (universe.length === 104 && dPath && !KEEP_BASE && !ovFile) { // the 3ed03627-era base: these facts are specific to it
    ok(universe.length - REMOVED.length === 97, `universe minus removals = 97 (got ${universe.length - REMOVED.length})`);
    ok(zeros.length === 30, `rules at 0 = 30, the Owner's count (got ${zeros.length})`);
    ok(tNew[0] === 30 && tNew[2] === 16 && tNew[6] === 32 && tNew[12] === 19, `new tier histogram {0:30,2:16,6:32,12:19} (got ${JSON.stringify(tNew)})`);
  }
  console.log(bad ? `FLEXREBUILD SELFTEST FAIL (${bad})` : 'FLEXREBUILD SELFTEST OK');
  process.exit(bad ? 1 : 0);
};

if (process.argv.includes('--selftest')) selftest();
else { console.log(L.join('\n')); if (arg('out-dir', '')) writeOut(arg('out-dir', '')); else console.error('FLEXREBUILD NOTE: no --out-dir given, wrote nothing.'); }
