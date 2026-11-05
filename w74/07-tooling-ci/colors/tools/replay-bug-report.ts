// The determinism bug-report harness (w74 item 7g, Z.ai draft — DS's idea).
//
// A user bug report IS the regression test: a seed card (item 5e) carries {seed, userTeam, action log, digest};
// the harness replays the log through the draft store on the same pool and asserts the digest. In CI this runs
// in seconds — a bug report folder (docs/seedcards/) full of checked-in cards is a living regression suite.
//
// SCOPE v1 (stated): DRAFT-stage cards only — the actions the draft store accepts (PICK/UNDO). PLAY_WEEK /
// SET_PLAN cards need the season reducer (the pending whole-app piece); the format is identical, so season cards
// already parse and replay the moment that reducer lands.
//
// CLI (a user's card straight from a bug report):
//   node tools/replay-bug-report.mjs docs/seedcards/<card>.txt
import fs from 'node:fs';
import { hash53 } from '../src/core/hash.ts';
import { createStore } from '../src/sports/nfl/app/store.ts';
import { parseSeedCard } from '../src/sports/nfl/app/seedcard.ts';
import { devPool } from '../src/platform/devPool.ts';

export interface ReplayResult { ok: boolean; digest: string; expected: string; note?: string }

/** Replay one parsed card; the digest must reproduce. */
export function replayCard(card: ReturnType<typeof parseSeedCard>): ReplayResult {
  if (!card) return { ok: false, digest: '', expected: '', note: 'unparseable card' };
  if (card.userTeam === undefined) return { ok: false, digest: '', expected: card.digest, note: 'card has no userTeam' };
  const store = createStore(devPool());
  store.dispatch({ type: 'START', seed: card.seed, userTeam: card.userTeam });
  for (const line of card.actions) {
    if (line === 'UNDO') { store.dispatch({ type: 'UNDO' }); continue; }
    if (line.startsWith('PLAY_WEEK') || line.startsWith('PLAN')) return { ok: false, digest: '', expected: card.digest, note: 'season-stage card: needs the whole-app reducer (v2)' };
    const m = /^PICK (\S+):(\S+)$/.exec(line);
    if (!m) return { ok: false, digest: '', expected: card.digest, note: 'unknown action line: ' + line };
    store.dispatch({ type: 'PICK', playerId: m[1]!, slot: m[2]! as never });
  }
  const digest = 'h53:' + String(hash53(JSON.stringify({ seed: card.seed, actions: card.actions, state: store.getState().record }))).slice(0, 10);
  return { ok: digest === card.digest, digest, expected: card.digest, note: digest === card.digest ? undefined : 'digest mismatch — engine behaviour changed since the card was cut' };
}

const cardPath = process.argv[2];
if (cardPath) {
  const text = fs.readFileSync(cardPath, 'utf8');
  const r = replayCard(parseSeedCard(text));
  console.log(JSON.stringify(r, null, 2));
  process.exit(r.ok ? 0 : 1);
}
