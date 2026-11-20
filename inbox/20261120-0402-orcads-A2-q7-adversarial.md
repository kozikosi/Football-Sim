SPEAKER: orcads | ROLE: advisor | TASK: A2 (H2) | DATE: 2026-11-20T04:02Z

# A2 — Q7 law: the week/season gap is REAL (agree with ERNIE + Porca)

VERDICT: **improved.** The gap is real and I reproduced it by running the existing law's body against adversarial providers: **it catches a form-reader and a focus-reader, and lets a week-reader, a season-reader, a pack-reader and an engine-reader through.** The cause is one line — the "loaded" snapshot is at **week 5**, the same week as the neutral one (`valueprovider.test.ts:90`), so every metadata field is equal in both and any provider reading metadata is indistinguishable from a neutral one. I disagree with Beam's C8 ("no concrete gap"). Production is **not** affected today: no call site passes a snapshot at all (`draft.ts:98,151`, `lineup.ts:58` pass two args), so this is a **latent** contract gap that opens the day the context-aware provider lands.

## WHAT I RAN

```bash
git show 408410477:colors/src/core/snapshot.ts
git show 408410477:colors/src/sports/nfl/engine/valueprovider.ts
git show 408410477:colors/test/nfl/valueprovider.test.ts
git grep -n "winsPerOvr(" 408410477 -- colors/src colors/test
git archive 408410477 | tar -x -C <scratch>/arch
node <scratch>/a2/adversarial.mjs        # imports the tree's own .ts modules; Node v26.13.0 strips types natively
```

The probe imports the extracted tree's real modules (`core/snapshot.ts`, `engine/slots.ts`, `engine/valueprovider.ts`) and applies the **exact** body of the shipped law to nine providers. Nothing in the tree was edited.

## WHAT I FOUND

### 1. The shipped law's two snapshots differ only in form/focus/flags (VERIFIED, quoted)

`colors/test/nfl/valueprovider.test.ts:88-90`:

```ts
seamTest('Q7 law: measured and table providers return the same value for the neutral snapshot and a loaded one, every slot and base', () => {
  const neutral = neutralSnapshot(2026, 5, 'sha256:p', 'e1');
  const loaded = makeSnapshot({ season: 2026, week: 5, packHash: 'sha256:p', engineVersion: 'e1', form: { p1: 5, p2: -5 }, focus: { t1: 'pass' }, flags: { x: true } });
```

`neutralSnapshot(2026, 5, …)` builds `makeSnapshot({season: 2026, week: 5, …})` (`snapshot.ts:59-60`). So `season`, `week`, `packHash`, `engineVersion` are **identical** on both sides. The law can only see form, focus and flags.

### 2. Run against nine providers (VERIFIED — raw stdout)

```
neutral old: season 2026 week 5 | loaded old: season 2026 week 5
neutral new: season 2026 week 0 | loaded new: season 2026 week 6

EXISTING law (week 5 vs week 5) — providers it CATCHES: formReader(QB only), focusReader(SS only)
EXISTING law — providers it LETS THROUGH: measured (shipped), table (shipped), weekReader, seasonReader, packReader, engineReader, constant

STRENGTHENED law (week 0 vs week 6) — providers it CATCHES: weekReader, formReader(QB only), focusReader(SS only)
STRENGTHENED law — providers it LETS THROUGH: measured (shipped), table (shipped), seasonReader, packReader, engineReader, constant

VARIANT 3 (same pack+engine; season 2026->2027, week 0->6) — CATCHES: weekReader, seasonReader, formReader(QB only), focusReader(SS only)
VARIANT 3 — LETS THROUGH: measured (shipped), table (shipped), packReader, engineReader, constant
```

So: ERNIE and Porca are right; Beam's "no concrete gap" is wrong — but only in the sense that the *test* does not cover metadata, which is exactly what a Q7 law is supposed to forbid ("Wins are evaluated at the neutral snapshot and **never move in-season**", `valueprovider.ts:22-25`).

### 3. Production does not pass a snapshot today (VERIFIED — grep receipt)

```
colors/src/sports/nfl/engine/draft.ts:98:   ... values.winsPerOvr(s, DRAFT_BASE) ...
colors/src/sports/nfl/engine/draft.ts:151:  const w = (s: SlotId): number => values.winsPerOvr(s, DRAFT_BASE);
colors/src/sports/nfl/engine/lineup.ts:58:  ... slots.map((f) => values.winsPerOvr(f.row, base) / WINS_PER_UNIT);
```

Every production call site passes **two** arguments. The third is only exercised by the two seam tests. So the law is currently enforced **by construction** (nobody can read a snapshot they are not given), not by the test — and the test will be the only guard when the context-aware provider arrives.

### 4. The second seam test is sound and does not need changing (VERIFIED)

`valueprovider.test.ts:96-102` proves the snapshot is *passed* and readable by a context-aware provider (`aware.winsPerOvr('QB','4-3', loaded) === 2`). That is the opposite property from Q7 — it must keep passing.

## WHAT I WOULD CHANGE

**One test, two lines** — make the loaded snapshot differ in the two metadata fields that may not move a value (season, week), keeping pack and engine equal (a new pack is a different measurement; reading it is legitimate, so the law should not forbid it):

- WHERE: `colors/test/nfl/valueprovider.test.ts:89-90` (the Q7 seam test).
- old:
  ```ts
  const neutral = neutralSnapshot(2026, 5, 'sha256:p', 'e1');
  const loaded = makeSnapshot({ season: 2026, week: 5, packHash: 'sha256:p', engineVersion: 'e1', form: { p1: 5, p2: -5 }, focus: { t1: 'pass' }, flags: { x: true } });
  ```
- new:
  ```ts
  const neutral = neutralSnapshot(2026, 0, 'sha256:p', 'e1');   // week 0: the snapshot the displayed value is taken at
  const loaded = makeSnapshot({ season: 2027, week: 6, packHash: 'sha256:p', engineVersion: 'e1', form: { p1: 5, p2: -5 }, focus: { t1: 'pass' }, flags: { x: true } });   // Q7: same pack+engine, later season+week, form/focus/flags on
  ```
- WHY: with week 5 on both sides, a provider that reads `week` (or `season`) returns the same number and the law passes — the exact gap two seats found. Variant 3 above is that edit, run: it catches `weekReader` and `seasonReader` and still passes both shipped providers.
- SAFE ALONE? Yes — test-only; no engine byte, no product byte, no weight pinned. The two shipped providers ignore the snapshot entirely (`valueprovider.ts:50-56`), so their assertions cannot change.
- HOW TO CHECK: `cd colors && npm test` → the Q7 test still passes (both shipped providers are neutral by construction). Then paste the adversarial provider `{ name: 'week', winsPerOvr: (r, b, s) => (s ? s.week : 0) + 1 }` into a scratch copy of the test: the **old** body passes it, the **new** body fails it. (My probe is exactly that, run from outside the tree.)

**One sentence for the provider's doc comment** (optional, `valueprovider.ts:22-25`): "a provider may read `packHash`/`engineVersion` (a different pack is a different measurement) but never `season`/`week`/`form`/`focus`/`flags` for the displayed Wins." That turns the line I drew above into the contract rather than my preference — the Architect may overrule it, in which case the test should assert whatever he rules.

## WHAT I DID NOT CHECK

- **Plan v3 §3.3's context-aware provider.** I did not read it, so whether it is *intended* to read `week` is UNKNOWN. If it is, then the Q7 law and the plan disagree and the Architect must resolve which one bends — my test change assumes the law wins, because Q7 is an Owner ruling and the plan is a proposal.
- **`A8b`.** A2 says "A2 must state whether it agrees with A8b", but there is no A8b in this order (A8 is the contrast audit). I could not resolve the reference; my agreement is with **ERNIE's C8 and Porca's C8**, and my disagreement is with **Beam's C8**. If "A8b" meant one of those, this is the answer.
- **The other S1–S4 seam tests** (envelope, pack, keyedrng). Not in scope; untouched.
- **Whether `season` should be part of the law at all.** I included it (variant 3) because `snapshot.ts:58` says season and week "are carried only so the value says when it was taken" — a provider reading season is reading a timestamp. If the Architect prefers a week-only law, the variant-2 result above is the receipt for that narrower version.
