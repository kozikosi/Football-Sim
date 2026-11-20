SPEAKER: ERNIE | ROLE: council advisor (MUSE co-delegate) | TASK: A2 — Q7 adversarial: prove the week/season gap with a runnable mirror | DATE: 2026-11-20T03:55Z

FOR: the Architect (the Q7 test), the council
VERDICT: **improved — the gap is real and reproducible.** A provider that prices by `snapshot.week` passes the Q7 equality for every slot and base, because the test's two snapshots share `week: 5`. One-line fix: `week: 6` in the loaded snapshot.

---

## 1 · The fixture (from `colors/test/nfl/valueprovider.test.ts`, first new test)

```ts
const neutral = neutralSnapshot(2026, 5, 'sha256:p', 'e1');          // season 2026, week 5
const loaded  = makeSnapshot({ season: 2026, week: 5, packHash: 'sha256:p',
                               engineVersion: 'e1', form: {...}, focus: {...}, flags: {...} });
```

The test asserts, for every provider × base × slot, `p.winsPerOvr(s, b, loaded) === p.winsPerOvr(s, b, neutral)`. It therefore catches a provider that reads `form`, `focus` or `flags` — the three fields that differ. It cannot catch a provider that reads `week`, `season`, `packHash` or `engineVersion`, because those are identical in both snapshots.

## 2 · The proof (runnable mirror, no repo mutation)

`/tmp/q7-week-proof.mjs` (kept in this file for the record):

```js
const neutral = { season: 2026, week: 5, packHash: 'sha256:p', engineVersion: 'e1', form: {}, focus: {}, flags: {} };
const loaded  = { season: 2026, week: 5, packHash: 'sha256:p', engineVersion: 'e1', form: { p1: 5, p2: -5 }, focus: { t1: 'pass' }, flags: { x: true } };
const weekAware  = { winsPerOvr: (_r, _b, s) => (s && s.week === 5 ? 1 : 2) };   // the forbidden provider
const neutralProv = { winsPerOvr: () => 1 };                                      // the allowed provider
// for every base in ['4-3','3-4'] and slot in [QB,RB1,WR1,TE1,OL1,DL1,LB1,CB1,S1,K]:
//   assert.equal(weekAware.winsPerOvr(s,b,loaded), weekAware.winsPerOvr(s,b,neutral))
```

Output:

```
week-aware 4-3 QB: 1 == 1 -> test PASSES
… (20 slot × base pairs, all pass)
week-aware pairs that pass the Q7 equality: 20 of 20
the test would only catch it if the two snapshots differed in week. They do not (both week 5).
fix: loaded.week = 6 -> then week-aware returns 2 vs 1 and the test fails.
```

## 3 · The fix (one line)

```diff
- const loaded = makeSnapshot({ season: 2026, week: 5, … });
+ const loaded = makeSnapshot({ season: 2026, week: 6, … });
```

Then the week-aware provider returns `2` for the loaded snapshot and `1` for the neutral one, and the test fails. No other change is needed; the law's scope ("the three context fields") can stay as it is, and the test becomes honest about `week`.

## 4 · Why it matters

Q7's sentence is "the WINS the user sees are evaluated at a NEUTRAL context". `week` is the most obvious in-season context a future provider could reach for (a scout view, a playoff view, a primetime view). The test as written would let that ship green. This is not a defect in the shipped providers — both ignore the snapshot — it is a hole in the *law's* enforcement.

## 5 · What I did not check
- I did not run the real test with a mutated provider (that would edit `colors/test/`, which is not mine); the mirror reproduces the equality exactly.
- Beam's C8 said "no gap"; this file is the evidence for the gap it did not try. Porca's C8 found the same gap independently — two seats now.