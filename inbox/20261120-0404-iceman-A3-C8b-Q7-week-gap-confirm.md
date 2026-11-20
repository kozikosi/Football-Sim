SPEAKER: iceman | ROLE: advisor (reviewer) | TASK: A3 C8b third-seat confirm — Q7 test week/season gap | DATE: 2026-11-20T04:04:33Z
FOR: A3 (council sitting v4, Track A) — C8b: "The neutral and loaded snapshots share season/week/packHash/engineVersion; a provider that prices by snapshot.week passes while violating Q7. Set loaded week: 6."

## Verdict
**ok (confirm gap).** I independently confirm the week/season/packHash/engineVersion identity gap in the Q7 law test at architect tip `408410477`, and confirm that setting loaded `week` to a different value (e.g. 6) would close this specific adversarial hole. This aligns with v4 §2.6 (ERNIE+Porca) against a "no gap" reading.

## Evidence (VERIFIED)

**Source:** `git show 408410477:colors/test/nfl/valueprovider.test.ts` (commit `408410477` "Multisport engine plan M...", on `origin/architect/engine-and-seats`, fetched this session)
**cwd:** `/Users/kosi/wt/iceman`

**Command:** `git show 408410477:colors/test/nfl/valueprovider.test.ts | sed -n '80,96p'`
**Output:**
```ts
// S1 seam + S3 snapshot (Owner ruling Q7: Wins are evaluated at the neutral snapshot and never move in-season).
import { makeSnapshot, neutralSnapshot } from '../../src/core/snapshot.ts';
import { SLOT_IDS as SEAM_SLOTS } from '../../src/sports/nfl/engine/slots.ts';
import { measuredValues as seamMeasured, tableValues as seamTable } from '../../src/sports/nfl/engine/valueprovider.ts';
import type { ValueProvider as SeamProvider } from '../../src/sports/nfl/engine/valueprovider.ts';
import { test as seamTest } from 'node:test';
import seamAssert from 'node:assert/strict';

seamTest('Q7 law: measured and table providers return the same value for the neutral snapshot and a loaded one, every slot and base', () => {
  const neutral = neutralSnapshot(2026, 5, 'sha256:p', 'e1');
  const loaded = makeSnapshot({ season: 2026, week: 5, packHash: 'sha256:p', engineVersion: 'e1', form: { p1: 5, p2: -5 }, focus: { t1: 'pass' }, flags: { x: true } });
  for (const prov of [seamMeasured(), seamTable()]) for (const base of ['4-3', '3-4'] as const) for (const s of SEAM_SLOTS)
    seamAssert.equal(prov.winsPerOvr(s, base, loaded), prov.winsPerOvr(s, base, neutral), `${prov.name} ${base} ${s}`);
  for (const prov of [seamMeasured(), seamTable()]) seamAssert.equal(prov.winsPerOvr('QB', '4-3', loaded), prov.winsPerOvr('QB', '4-3'));
});
```

**Observation:** `neutral` and `loaded` share identical `season` (2026), `week` (5), `packHash` (`'sha256:p'`), and `engineVersion` (`'e1'`). They differ only in `form`/`focus`/`flags` (loaded has non-empty form/focus/flags; `neutralSnapshot` builds with form/focus/flags cleared per API).

**Snapshot API context (VERIFIED):** `git show 408410477:colors/src/core/snapshot.ts | sed -n '60,69p'`
```ts
/** The snapshot Wins are evaluated at: form 0, no focus, no flags. Season and week are carried only so the value says when it was taken. */
export const neutralSnapshot = (season: number, week: number, packHash: string, engineVersion: string): ContextSnapshot =>
  makeSnapshot({ season, week, packHash, engineVersion });

export const isNeutral = (s: ContextSnapshot): boolean =>
  Object.keys(s.form).length === 0 && Object.keys(s.focus).length === 0 && Object.keys(s.flags).length === 0;

/** The same snapshot with form/focus/flags cleared: what the "Wins" evaluation reads, whatever week it is. */
export const toNeutral = (s: ContextSnapshot): ContextSnapshot => neutralSnapshot(s.season, s.week, s.packHash, s.engineVersion);
```
So week/season are part of snapshot identity (and "carried only so the value says when it was taken"); Q7 neutrality is defined by cleared form/focus/flags, but the test as written does not exercise week-variance.

## Gap analysis (INFERRED from code, consistent with v4 §2.6)
- A context-aware provider that branches on `snapshot.week` (or `season`/`packHash`/`engineVersion`) would compute the same result for `neutral` and `loaded` in this test because those fields are equal, and would therefore **pass** the equality assertions while potentially violating "Wins ... never move in-season" for a different week.
- The second seam test (`"the seam carries the snapshot..."`, lines ~96-103) already proves providers can read arbitrary snapshot fields (`form['p1']`), so week-reading is a realistic adversarial case to guard.

## Proposed fix (confirm v4 suggestion) — PROPOSAL
Change the Q7 law test's loaded snapshot to differ in `week` (e.g. `week: 6`) while keeping other identity fields the same, so a week-dependent provider must still equal the neutral value (and would fail if it doesn't):

```ts
  const neutral = neutralSnapshot(2026, 5, 'sha256:p', 'e1');
  const loaded = makeSnapshot({ season: 2026, week: 6, packHash: 'sha256:p', engineVersion: 'e1', form: { p1: 5, p2: -5 }, focus: { t1: 'pass' }, flags: { x: true } });
```

(Optionally also vary `week` on neutral vs loaded in a way that still represents "neutral evaluation vs in-season context" as the test intends; I do not assert the exact semantic choice beyond closing the stated gap. Minimal change: loaded `week: 6` as v4 states.)

**SAFE ALONE?:** Test-only change in `colors/test/nfl/valueprovider.test.ts` (Architect-owned area per AGENTS.md §8 / do-not-edit rule) — proposal only, not applied.

**HOW TO CHECK (after integration):**
- `git show 408410477:colors/test/nfl/valueprovider.test.ts | grep -n "week: 6"` absent now; expect present in patched test.
- Run the test file against the colors test harness at `408410477` (e.g. `cd colors && npm test --` filtered to valueprovider, or the project's test command) — should still pass for measured/table providers that ignore snapshot (as Q7 requires) and would catch a provider returning `snapshot.week`-dependent values.

## Notes
- I did not run the colors test suite here (not requested/reproducible in this worktree without extracting `408410477` tree + deps); this is a source-level confirmation. Claims about current runtime behavior beyond source are UNKNOWN.
- Beam's "no gap" (v4 §2.6) is weaker than this reading because it would miss a week-keyed provider passing under identical week values.

Labels: source/command outputs VERIFIED; gap consequence and fix sufficiency INFERRED; runtime test result post-fix UNKNOWN (not run).
