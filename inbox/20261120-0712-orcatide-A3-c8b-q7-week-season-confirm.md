SPEAKER: orcatide | ROLE: council advisor | TASK: A3 — the C8b third-seat confirm on the Q7 week/season gap | DATE: 2026-11-20T07:12Z

THE GAP (the sitting v4 §2.6 correction, confirmed by reading the test): "The neutral and loaded snapshots share `season`/`week`/`packHash`/`engineVersion`; a provider that prices by `snapshot.week` passes while violating Q7. Set loaded `week: 6`."

CONFIRMED (VERIFIED — read — `origin/architect/engine-and-seats:colors/test/nfl/valueprovider.test.ts` — 99 lines):
- The Q7 law (line 84-90): `measured and table providers return the same value for the neutral snapshot and a loaded one, every slot and base`:
  ```ts
  const neutral = neutralSnapshot(2026, 5, 'sha256:p', 'e1');
  const loaded = makeSnapshot({ season: 2026, week: 5, packHash: 'sha256:p', engineVersion: 'e1', form: { p1: 5, p2: -5 }, focus: { t1: 'pass' }, flags: { x: true } });
  ```
  Line 85: `neutralSnapshot(2026, 5, 'sha256:p', 'e1')` — season 2026, week 5, packHash 'sha256:p', engineVersion 'e1'. Line 86: `loaded = makeSnapshot({ season: 2026, week: 5, packHash: 'sha256:p', engineVersion: 'e1', ... })` — the same season/week/packHash/engineVersion as the neutral — the gap: a provider that prices by `snapshot.week` returns the same value for both → the law passes while the provider is week-sensitive.
- The law's intent (line 82): "S1 seam + S3 snapshot (Owner ruling Q7: Wins are evaluated at the neutral snapshot and never move in-season)."
- The law itself is sound: "the same value for the neutral and the loaded" — the gap is the constructed loaded snapshot (week 5 = the neutral's week).

THE FIX (the sitting's): set the loaded `week: 6`:
- With `loaded.week = 6` and `neutral.week = 5`: a provider that prices by `snapshot.week` (or any week-sensitive input) returns different values for the neutral and loaded snapshots → the law FAILS → the gap is caught.
- The law's core ("the same value for the neutral and the loaded") still holds for the non-week dimensions — the fix adds the week dimension to the tested difference.

VERDICT: CONFIRMED — the gap is real (the snapshots share week 5 — the law as written passes a week-pricing provider); the fix (loaded `week: 6`) is correct — set it.

Note: the two agreeing seats the sitting mentions ("Two seats already agree") — the sitting doesn't name them — UNKNOWN — I confirm independently from the test bytes.

WHAT I RAN (receipts):
- `git show origin/architect/engine-and-seats:colors/test/nfl/valueprovider.test.ts > /private/var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/opencode/valueprovider.test.ts && wc -l` — VERIFIED (99 lines — read lines 1-99).
- Relevant receipts: :82 (the Owner-ruling comment), :84-90 (the Q7 law test — the two `makeSnapshot`/`neutralSnapshot` lines — quoted above), :92-99 (the 'aware' provider — the seam — unrelated to the gap).
- The sitting v4 message (the standing correction §2.6 + the A3 item).

WHAT I DID NOT CHECK:
- Running the Q7 law test (`npm test` in the architect tree) — not run here — the Architect's gates — the standing (Pickle's four gates — VERIFIED, not re-run).
