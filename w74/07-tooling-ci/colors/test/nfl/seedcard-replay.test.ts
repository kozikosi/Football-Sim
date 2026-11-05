// CI wrapper for the bug-report harness (item 7g): every checked-in card in docs/seedcards/ replays and must
// reproduce its digest. A new bug report lands as a card file in that folder; this test turns it into a
// regression test the moment the PR merges.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseSeedCard } from '../../src/sports/nfl/app/seedcard.ts';
import { devPool } from '../../src/platform/devPool.ts';
import { createStore } from '../../src/sports/nfl/app/store.ts';
import { hash53 } from '../../src/core/hash.ts';

const dir = new URL('../../docs/seedcards/', import.meta.url);
const cards = fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith('.txt')) : [];

test('the seed-card folder exists and holds at least one regression card', () => {
  assert.ok(cards.length >= 1, 'docs/seedcards/ is empty — cut one with seedcard.ts (see the example in the folder README)');
});

for (const f of cards) {
  test(`replay reproduces ${f}`, () => {
    const card = parseSeedCard(fs.readFileSync(new URL(f, dir), 'utf8'));
    assert.ok(card, 'unparseable card: ' + f);
    if (card.userTeam === undefined) return;                       // season-stage cards skip until the reducer lands
    const store = createStore(devPool());
    store.dispatch({ type: 'START', seed: card.seed, userTeam: card.userTeam });
    for (const line of card.actions) {
      if (line === 'UNDO') { store.dispatch({ type: 'UNDO' }); continue; }
      const m = /^PICK (\S+):(\S+)$/.exec(line);
      assert.ok(m, 'unknown action line in ' + f + ': ' + line);
      store.dispatch({ type: 'PICK', playerId: m[1]!, slot: m[2]! as never });
    }
    const digest = 'h53:' + String(hash53(JSON.stringify({ seed: card.seed, actions: card.actions, state: store.getState().record }))).slice(0, 10);
    assert.equal(digest, card.digest, 'engine behaviour drifted from the card in ' + f);
  });
}
