// Seed card (w74 item 5e, Z.ai DRAFT — Pickle's idea): a demo and bug-report shorthand.
//
// ONE card = seed + action log + resulting state digest. A tester pastes the card into a bug report; CI (item
// 7g's replay harness) replays {seed, action log} and asserts the digest — a bug report becomes a regression
// test in seconds. The card is DELIBERATE sharing of the world seed (it does not architect against replay; the
// no-replay-URL ruling is about brag shareables, not bug reports).
//
// Pure functions; the digest is hash53 over the stable JSON of the state (deterministic across builds of the
// same engine — engineVersion pins the ruleset separately in the envelope).
import { hash53 } from '../../../core/hash.ts';

export interface SeedCard {
  v: 1;
  seed: number;
  userTeam?: number;                       // draft-stage cards carry it; season-stage cards live in the payload
  actions: string[];                       // compact action log: 'PICK dev0001:WR1' / 'PLAY_WEEK' / 'UNDO'
  digest: string;                          // 'h53:<10 hex>' over the state this log produced
  card: string;                            // the ONE-CARD text a bug report carries
}

export type SeedAction = { type: 'PICK'; playerId: string; slot: string }
  | { type: 'UNDO' }
  | { type: 'PLAY_WEEK' }
  | { type: 'SET_PLAN'; offense: string | null; defense: string | null };

/** Compact, order-preserving action line; the replay harness parses exactly this. */
export function actionLine(a: SeedAction): string {
  switch (a.type) {
    case 'PICK': return `PICK ${a.playerId}:${a.slot}`;
    case 'UNDO': return 'UNDO';
    case 'PLAY_WEEK': return 'PLAY_WEEK';
    case 'SET_PLAN': return `PLAN ${a.offense ?? '-'}|${a.defense ?? '-'}`;
  }
}

export function seedCard(seed: number, actions: SeedAction[], resultingState: unknown, userTeam?: number): SeedCard {
  const lines = actions.map(actionLine);
  const h = String(hash53(JSON.stringify({ seed, actions: lines, state: resultingState })));
  const digest = 'h53:' + h.slice(0, 10);
  const head = `seed ${seed}${userTeam !== undefined ? ` team ${userTeam}` : ''} → ${digest}`;
  return {
    v: 1, seed, userTeam, actions: lines, digest,
    card: [head, ...lines.map((l) => '  ' + l)].join('\n'),
  };
}

/** Parse a card back into the replay input (item 7g). Accepts the card text or its first line alone. */
export function parseSeedCard(text: string): { seed: number; userTeam?: number; digest: string; actions: string[] } | null {
  const lines = text.trim().split('\n');
  const m = /^seed (-?\d+)(?: team (\d+))? → (h53:[0-9a-f]+)/.exec(lines[0] ?? '');
  if (!m) return null;
  return {
    seed: Number(m[1]),
    userTeam: m[2] !== undefined ? Number(m[2]) : undefined,
    digest: m[3]!,
    actions: lines.slice(1).map((l) => l.trim()).filter(Boolean),
  };
}
