#!/usr/bin/env node
// Dev2 Determinism replay harness. Pure Node/TS, no protected paths.
// Given {seed, action log} → replays through store.dispatch, compares to expected output,
// emits a regression test if mismatch.
//
// Run: node _agents/or/tools/replay-determinism.ts <bug-report.json> [--emit]
// Exit 0 = deterministic / 1 = mismatch / 2 = usage / 3 = internal error.
import * as fs from 'node:fs';
import * as path from 'node:path';

interface BugReport {
  seed: number;
  userTeam: number;
  actions: unknown[];
  expectedState?: { record: unknown; draft: unknown; status: string; error: string | null };
  enginePlayers?: string; // path to players CSV; defaults to test fixture
}

interface Action {
  type: 'START' | 'PICK' | 'UNDO' | 'LOAD';
  seed?: number;
  userTeam?: number;
  playerId?: string;
  slot?: string;
  record?: unknown;
}

function loadPlayers(csvPath: string) {
  const raw = fs.readFileSync(csvPath, 'utf8');
  const lines = raw.split(/\r?\n/).filter((l) => l.trim());
  if (lines[0].trim() !== 'name,pos,team,ovr,spd,str') throw new Error('bad header');
  const players: any[] = [];
  for (let i = 1; i < lines.length; i++) {
    const m = /^(.*),([A-Z]+),([^,]+),(\d+),(\d+),(\d+)$/.exec(lines[i]);
    if (!m) throw new Error(`line ${i+1}: bad format`);
    const [, name, pos, team, ovr, spd, str] = m;
    const id = `${name}|${pos}|${team}`;
    players.push({ id, name, pos, role: mapRole(pos), team, ovr: +ovr, spd: +spd, str: +str, freeAgent: false });
  }
  return players;
}

function mapRole(pos: string): string {
  const map: Record<string, string> = {
    QB: 'QB', HB: 'RB', FB: 'FB', WR: 'WR', TE: 'TE', LT: 'OT', RT: 'OT', LG: 'OG', RG: 'OG', C: 'C',
    DT: 'DT', LEDG: 'EDGE', REDG: 'EDGE', MIKE: 'ILB', WILL: 'OLB', SAM: 'OLB', CB: 'CB', SS: 'SS', FS: 'FS', K: 'K', P: 'P', LS: 'LS',
  };
  const r = map[pos];
  if (!r) throw new Error(`unknown pos ${pos}`);
  return r;
}

const TS_HEADER = `// Auto-generated regression test by replay-determinism.ts
// DO NOT EDIT — generated from bug report
import { test, assert, beforeEach, afterEach } from 'node:test';
import { createStore, parseRecord, SAVE_VERSION, type SaveRecord } from '../../src/app/store.ts';
import { loadPlayers, mapRole } from './replay-determinism.ts'; // adjust if moved
`;

function emitTest(report: BugReport, actualState: any, testPath: string): void {
  const testCode = `${TS_HEADER}
const PLAYERS_CSV = \`name,pos,team,ovr,spd,str
${fs.readFileSync(report.enginePlayers || '/tmp/valid-ratings.csv', 'utf8').split('\n').slice(1).join('\n')}
\`;

function loadPlayersLocal(csv: string) {
  const lines = csv.split(/\\r?\\n/).filter((l) => l.trim());
  if (lines[0].trim() !== 'name,pos,team,ovr,spd,str') throw new Error('bad header');
  const out: any[] = [];
  for (let i = 1; i < lines.length; i++) {
    const m = /^(.*),([A-Z]+),([^,]+),(\\d+),(\\d+),(\\d+)$/.exec(lines[i]);
    if (!m) throw new Error(\`line \${i+1}: bad format\`);
    const [, name, pos, team, ovr, spd, str] = m;
    const id = \`\${name}|\${pos}|\${team}\`;
    out.push({ id, name, pos, role: mapRole(pos), team, ovr: +ovr, spd: +spd, str: +str, freeAgent: false });
  }
  return out;
}

let players: ReturnType<typeof loadPlayersLocal>;
let store: ReturnType<typeof createStore>;

beforeEach(() => {
  players = loadPlayersLocal(PLAYERS_CSV);
  store = createStore(players);
});

test('regression: determinism replay ${report.seed}', () => {
  store.dispatch({ type: 'START', seed: ${report.seed}, userTeam: ${report.userTeam} });
${report.actions.map((a, i) => `  store.dispatch(${JSON.stringify(a)}); // step ${i + 1}`).join('\n')}
  const state = store.getState();
  assert.deepStrictEqual(state.record, ${JSON.stringify(report.expectedState?.record ?? null)});
  assert.deepStrictEqual(state.draft, ${JSON.stringify(report.expectedState?.draft ?? null)});
  assert.strictEqual(state.status, '${report.expectedState?.status ?? 'unknown'}');
  assert.strictEqual(state.error, ${JSON.stringify(report.expectedState?.error ?? null)});
});
`;
  fs.writeFileSync(testPath, testCode);
  console.log(`Emitted regression test: ${testPath}`);
}

function main() {
  const args = process.argv.slice(2);
  const emit = args.includes('--emit');
  const files = args.filter((a) => !a.startsWith('--'));
  if (files.length !== 1) {
    console.error('usage: node _agents/or/tools/replay-determinism.ts <bug-report.json> [--emit]');
    console.error('  --emit: write regression test to test/regression/ on mismatch');
    process.exit(2);
  }
  const reportPath = files[0];
  if (!fs.existsSync(reportPath)) {
    console.error(`not found: ${reportPath}`);
    process.exit(2);
  }
  const report = JSON.parse(fs.readFileSync(reportPath, 'utf8')) as BugReport;
  const playersPath = report.enginePlayers || '/tmp/valid-ratings.csv';
  if (!fs.existsSync(playersPath)) {
    console.error(`players CSV not found: ${playersPath}`);
    process.exit(3);
  }
  const players = loadPlayers(playersPath);
  const { createStore } = require('/Users/kosi/Desktop/wt/or/colors/src/app/store.ts');
  const store = createStore(players);
  try {
    store.dispatch({ type: 'START', seed: report.seed, userTeam: report.userTeam });
    for (const a of report.actions) store.dispatch(a as any);
  } catch (e) {
    console.error('dispatch error:', (e as Error).message);
    process.exit(3);
  }
  const state = store.getState();
  if (!report.expectedState) {
    console.log('Replay complete. Final state:');
    console.log(JSON.stringify(state, null, 2));
    process.exit(0);
  }
  const expected = report.expectedState;
  const mismatch =
    JSON.stringify(state.record) !== JSON.stringify(expected.record) ||
    JSON.stringify(state.draft) !== JSON.stringify(expected.draft) ||
    state.status !== expected.status ||
    state.error !== expected.error;
  if (mismatch) {
    console.error('MISMATCH — deterministic replay diverged');
    console.error('Expected:', JSON.stringify(expected, null, 2));
    console.error('Actual:  ', JSON.stringify(state, null, 2));
    if (emit) {
      const testDir = path.join('/Users/kosi/Desktop/wt/or/colors/test/regression');
      fs.mkdirSync(testDir, { recursive: true });
      const testPath = path.join(testDir, `regression-${report.seed}-${Date.now()}.test.ts`);
      emitTest(report, state, testPath);
    }
    process.exit(1);
  }
  console.log('OK — deterministic replay matched expected state');
  process.exit(0);
}

main();