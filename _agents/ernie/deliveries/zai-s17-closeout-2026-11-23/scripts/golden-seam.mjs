/* golden-seam.mjs — the seam golden test (S13, P-319's "fix the data export" — Ernie's S2 proposal,
 * adopted): the shell consumes the FROZEN engine snapshot through src/lib/port/seam.ts. This tool
 * computes the canonical VM outputs for a FIXED seed and a FIXED deterministic draft, canonicalises
 * them to plain JSON (THE VM→JSON MAP), and compares against batteries/seam-golden.json.
 *
 * Why: boardVM/goneOdds/lineupFor outputs are the "data export" every screen and every law reads.
 * A re-pin that silently changes engine output must fail HERE, at build time — not at the Owner's
 * first draft. The golden is regenerated ONLY on a deliberate re-pin:
 *     node --import ./scripts/node-port-register.mjs scripts/golden-seam.mjs --write
 * (the re-pin commit updates the golden; the diff rides the re-pin's receipt).
 *
 * Determinism contract: makeRng(seed) is the engine's own RNG — a fixed seed runs the same draft,
 * so the VM outputs are byte-stable across runs and machines. The engine version stamp + the pool
 * data sha ride INSIDE the golden, so a re-pin or a data change cannot pass silently either.
 *
 * Run (as a law): node battery N34 imports computeGolden() and deep-compares the file.
 * Run (standalone): node --import ./scripts/node-port-register.mjs scripts/golden-seam.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const P = (rel) => path.join(ROOT, rel);
const GOLDEN = P('batteries/seam-golden.json');

const CSV = (p) => fs.readFileSync(P(p), 'utf8');

export async function computeGolden() {
  const port = await import(P('src/lib/port/seam.ts'));
  const { buildPool, newDraft, DEFAULT_CONFIG, snakeOrder, cpuChoose, applyPick, boardVM, goneOdds, makeRng,
          lineupFor, engineVersion, sha256Hex, freezePool } = port;
  const pool = buildPool(CSV('data/nfl/madden27-ratings.csv'), CSV('data/nfl/free-agents-old-ratings.csv'), CSV('data/nfl/player-ids.csv'));
  const seed = 2026;                                   // the fixed seed (the batteries' record seed)
  // a MID-DRAFT state at overall 2 (the user ON the clock — goneOdds refuses a finished draft, and
  // the hot-board context is the one the laws reason about): step the CPU to overall 1 with the
  // seeded RNG (the same replay recipe node battery N19 uses), then compute the seam outputs.
  const st = newDraft(pool, makeRng(seed).fork('draft'), DEFAULT_CONFIG, snakeOrder());
  const cpu = makeRng(seed).fork('cpu');
  while (st.pos < 1) {
    const t = st.order[st.pos];
    const c = cpuChoose(st, t, cpu);
    applyPick(st, t, c.player, c.slot);
  }
  const userTeam = st.order[st.pos];                   // the team on the clock at overall 2
  const odds = goneOdds(st, userTeam, makeRng(seed * 7 + 13), 30);
  const vm = boardVM(st, userTeam, odds, { sort: 'wins' });
  const mine = Object.values(st.rosters[userTeam]).filter(Boolean);
  const best = lineupFor(mine, '4-3');
  const poolSha = await sha256Hex(JSON.stringify(freezePool(pool)));
  return {
    goldenVersion: 1,                                  // bumped ONLY with a re-pin or a contract change
    seed,
    userTeam,
    engine: engineVersion(),
    poolSha256: poolSha,
    board: {
      sort: vm.sort,
      header: vm.header,
      rowCount: vm.rows.length,
      first3: vm.rows.slice(0, 3).map((r) => ({ id: r.id, name: r.name, pos: r.pos, ovr: r.ovr, wins: r.wins, priority: r.priority, gone: r.gone, slotId: r.slotId, tone: r.tone })),
      footer: vm.footer,
    },
    oddsMeta: { picksBetween: odds.picksBetween, sims: odds.sims },
    lineup: {
      placements: (best.placements).map((pl) => ({ slot: pl.slot?.label ?? pl.slot?.slot ?? '?', name: pl.player?.name ?? null, effOvr: pl.effOvr ?? null })),
    },
  };
}

export function canonicalJson(g) {
  return JSON.stringify(g, null, 1);
}

export function goldenSha(g) {
  return createHash('sha256').update(canonicalJson(g)).digest('hex');
}

// ---------- the CLI ----------
const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const g = await computeGolden();
  const write = process.argv.includes('--write');
  if (write || !fs.existsSync(GOLDEN)) {
    fs.writeFileSync(GOLDEN, canonicalJson(g) + '\n');
    console.log('golden-seam: WRITTEN ' + path.relative(ROOT, GOLDEN) + ' — sha256 ' + goldenSha(g));
    console.log('golden-seam: engine ' + g.engine + ' · poolSha ' + g.poolSha256.slice(0, 16) + '… · rows ' + g.board.rowCount);
    process.exit(0);
  }
  const onFile = JSON.parse(fs.readFileSync(GOLDEN, 'utf8'));
  const a = canonicalJson(g), b = canonicalJson(onFile);
  if (a === b) {
    console.log('golden-seam: MATCH — the seam output equals the committed golden (sha256 ' + goldenSha(g) + ')');
    process.exit(0);
  }
  console.error('golden-seam: MISMATCH — the seam output differs from batteries/seam-golden.json');
  console.error('  expected sha256 ' + goldenSha(onFile));
  console.error('  actual   sha256 ' + goldenSha(g));
  console.error('  If this is a DELIBERATE re-pin or contract change, regenerate with --write and receipt the diff.');
  process.exit(1);
}
