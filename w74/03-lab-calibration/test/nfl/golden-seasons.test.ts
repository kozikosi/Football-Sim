// Golden-file seed test (P-256d) — the CI gate. Re-runs the 5 pinned seasons and compares
// digests against tools/outcomelab/golden-seasons.json. A re-pin needs a written reason
// in the same diff (incidents.md, entry 3's rule).
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { seasonDigest } from '../../tools/outcomelab/golden-seasons.ts';

const golden = JSON.parse(readFileSync(new URL('../../tools/outcomelab/golden-seasons.json', import.meta.url), 'utf8'));

test('golden: 5 seeds x 1 season reproduce the pinned box-score digests byte for byte', () => {
  for (const seed of golden.seeds) {
    const { digest, games } = seasonDigest(seed);
    assert.equal(games, golden.gamesPerSeason, 'game count changed: a schedule or rules change — re-pin with a reason');
    assert.equal(digest, golden.digests[seed], `seed ${seed} diverged from the golden file: engine or data changed — re-pin ONLY with a written reason in this diff`);
  }
});
