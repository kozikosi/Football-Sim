// spec-diff.mts — Q2 parameter side (VERACITY-SYNTHESIS Q2): which engine knobs the 6 Nov
// salary refit actually moved. Snapshots specs.ts inside withLegacyCoefficients (pre-6-Nov,
// frozen in colors/test/nfl/golden/legacy-coefficients.ts) vs outside (today), diffs them.
// Read-only; prints a layer-audit-style parameter table (parameter · layer · before · after · delta).
// usage: node --experimental-strip-types _agents/mimo/tools/spec-diff.mts <colors-dir>
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const colorsDir = process.argv[2];
if (!colorsDir) { console.error('usage: spec-diff.mts <colors-dir>'); process.exit(4); }
const eng = (p: string) => pathToFileURL(path.join(colorsDir, p)).href;
const specs = await import(eng('src/sports/nfl/engine/specs.ts'));
const legacyMod = await import(eng('test/nfl/golden/legacy-coefficients.ts'));

const snap = () => JSON.parse(JSON.stringify({
  RATING_SPECS: specs.RATING_SPECS,
  DEF_SPECS: specs.DEF_SPECS,
  PERS_REC: specs.PERS_REC,
  RB_HEAVY: specs.RB_HEAVY,
  MC: specs.MC,
})) as Record<string, Record<string, unknown>>;

const current = snap();
const legacy = legacyMod.withLegacyCoefficients(() => snap()) as Record<string, Record<string, unknown>>;
const after = snap();

// safety: the swap must be undone
if (JSON.stringify(current) !== JSON.stringify(after)) {
  console.error('FATAL: withLegacyCoefficients did not restore specs — aborting');
  process.exit(3);
}

type Row = { layer: string; param: string; before: string; after: string; delta: string };
const rows: Row[] = [];
for (const layer of Object.keys(current)) {
  const b = legacy[layer] ?? {}, a = current[layer] ?? {};
  const keys = [...new Set([...Object.keys(b), ...Object.keys(a)])].sort();
  for (const k of keys) {
    const bv = JSON.stringify(b[k]), av = JSON.stringify(a[k]);
    if (bv === av) continue;
    const bn = typeof b[k] === 'number' ? b[k] : NaN;
    const an = typeof a[k] === 'number' ? a[k] : NaN;
    const delta = Number.isFinite(bn) && Number.isFinite(an) ? (an - bn).toFixed(4) : 'structural';
    rows.push({ layer, param: k, before: bv ?? '—', after: av ?? '—', delta });
  }
}
console.log(`parameter diff: pre-6-Nov (legacy, frozen) → current (6 Nov salary refit)`);
console.log(`layer                 parameter        before        after        delta`);
for (const r of rows) {
  console.log(
    r.layer.padEnd(22) + r.param.padEnd(17) +
    String(r.before).padEnd(14) + String(r.after).padEnd(13) + r.delta
  );
}
console.log(`\nchanged parameters: ${rows.length}`);
const byLayer: Record<string, number> = {};
for (const r of rows) byLayer[r.layer] = (byLayer[r.layer] ?? 0) + 1;
console.log('by layer: ' + Object.entries(byLayer).map(([l, n]) => `${l}=${n}`).join(', '));
const unchangedLayers = Object.keys(current).filter((l) => !byLayer[l]);
if (unchangedLayers.length) console.log('layers untouched by the refit: ' + unchangedLayers.join(', '));
