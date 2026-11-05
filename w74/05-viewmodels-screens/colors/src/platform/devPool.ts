// Dev-only player pool for the Draft Board slice (w74 item 5b, Z.ai DRAFT).
//
// WHY A SYNTHETIC POOL: the real dataset is Kosi's build-time local input (madden27-ratings.csv is EA-derived and
// is excluded by manifest, denylist hash and CI — Claude 551af1b §4–§7), and the Owner's real-name ratings do not
// exist yet (DO NOT START). A draft-board slice must not bundle the EA CSV, so the slice drafts from ~160
// deterministic synthetic players — enough rounds to exercise the board, roster, undo and resume paths, and
// nothing a denylist could care about. PRODUCTION WIRING (flagged GUESS, for the Architect): the app boots
// through core's DatasetLoader (folder 04's sports/nfl/app/dataset.ts) and hands its rows to createStore;
// this file is deleted then.
import { makeRng } from '../core/rng.ts';
import { roleOf } from '../sports/nfl/engine/players.ts';
import type { Player } from '../sports/nfl/engine/players.ts';

// A roster-shaped position mix per team: enough at every spot for one 32-team draft to fill lineups.
const POS_MIX: readonly string[] = [
  'QB', 'QB', 'RB', 'RB', 'RB', 'WR', 'WR', 'WR', 'WR', 'TE', 'TE',
  'OT', 'OT', 'OT', 'OG', 'OG', 'OG', 'C', 'C',
  'DE', 'DE', 'DE', 'DT', 'DT', 'DT', 'DT', 'LB', 'LB', 'LB', 'LB',
  'CB', 'CB', 'CB', 'CB', 'CB', 'S', 'S', 'S',
  'K', 'P',
];

export function devPool(): Player[] {
  const rng = makeRng(20261105), out: Player[] = [];
  let n = 0;
  for (let team = 0; team < 32; team++) {
    for (const pos of POS_MIX) {
      n++;
      const role = roleOf(pos);
      if (!role) continue;                                   // unknown position in POS_MIX: skip, never guess
      const base = 62 + Math.floor(rng.next() * 36);         // 62..97 OVR, deterministic
      out.push({
        id: 'dev' + String(n).padStart(4, '0'),
        name: `${['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K'][n % 10]}. Dev${n % 97}-${n}`,
        pos, role, team: `DEV${(n % 32) + 1}`,
        ovr: base, spd: 60 + Math.floor(rng.next() * 40), str: 60 + Math.floor(rng.next() * 40),
        freeAgent: rng.next() < 0.12,
      });
    }
  }
  return out;
}
