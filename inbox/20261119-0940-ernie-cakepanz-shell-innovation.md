SPEAKER: ERNIE | ROLE: advisor (MUSE co-delegate) | TASK: innovation notes on the cakepanz shell after the 67-cakepanz-10 review | DATE: 2026-11-19T09:40Z

FOR: P-316 (the cakepanz shell) · the cutover track
BASIS: the review at `inbox/20261119-0930-ernie-cakepanz-10-review.md`. Everything below is grounded in code I read this session (`cakepanz-4/src/**`, `src/engine/sports/nfl/app/saves.ts`, `boardVM`, `goneOdds`, `lineupFor`) and in what I re-ran. Nothing here needs new engine semantics; where it does, I say so and name whose call it is.

---

## The one idea that reframes the rest: **the save record is a replay script, not a snapshot**

`src/engine/sports/nfl/app/saves.ts:24-31` (VERIFIED, read this session):

```ts
export interface DraftPick { overall: number; team: number; pid: string; slot: string }
export interface DraftPayload {
  seed: number; userTeam: number;
  picks: DraftPick[];            // every pick made so far, CPU and user, in order
  pool: FrozenPoolRow[];         // the whole board as it was when the draft began
}
```

A draft save is therefore **sufficient to reconstruct the entire draft**: the frozen pool is the board at pick 0, the seed drives every CPU decision, and `picks` is the ordered log. Nothing is lost. The shell currently treats the record as a *result* (render the Complete screen, show a brag). It is actually a *program*, and the UI should behave like the player of that program.

Four things fall out of that one observation, in descending value:

| # | What it buys | Cost | New engine work |
|---|---|---|---|
| I1 | A **draft code** (`seed · team · pool-sha8`) → shareable, replayable, verifiable by a third party | ~30 lines + a share-card field | none (`draftBrag` already takes `seed`) |
| I2 | A **post-draft trace** (biggest reaches and steals: pick value vs the board's own order at that pick) | one screen, render-only | none — replay the log over the frozen pool |
| I3 | **"What if"**: re-run the same draft from pick *k* with a different user pick | replay + diff | none |
| I4 | Every battery becomes **seeded from a fixture** instead of `Math.random()` | test infra | none |

### I1–I4 in detail

**I1 · Draft code + visible seed.** The shareable card already carries `seed` (`shareable.ts:64`). Put it on screen: a small "Draft #A3F2-7 · 76 Pancakes" line in the board footer and on the Complete screen. The user can then hand a code to a friend who loads the same draft and sees the same board. This is the cheapest shareable slice in the whole track (slice 5) and it is *infrastructure for trust*: a draft that can be replayed from a code is a draft nobody can accuse of being staged. Law: same code → same board VM sha (the N25 sha pattern already exists in the node battery and can be reused verbatim at the UI level).

**I2 · The trace.** After the draft, one screen: for each of the user's picks, the board's own top available at that moment vs the player taken, expressed in the board's existing currency (wins / priority), plus the three largest "reaches" and "steals" of the draft. All of it is derivable by replaying `picks[0..k-1]` over `pool` with the same CPU functions the live draft uses. This is the feature that makes the engine legible to a user — the Owner's model-first doctrine, shown rather than asserted — and it costs no engine semantics. Falsifier: a trace that disagrees with a recomputation from the record must fail the law.

**I3 · What-if.** Because the record is a program, "what if I had taken player X at pick 14" is a re-run, not a new feature. This is a strong retention feature (one more draft) and a strong debugging one (a user can bring a code + a deviation). It is Tier 3 (behind the cutover), but it should be designed for *now*, because it constrains the record format: **do not add a field that is not derivable**, or I3 dies.

**I4 · Seeded fixtures.** `?seed=` is the precondition Z.ai named for deterministic goldens and axe runs. Add to it: a **fixture loader** (`?fixture=<id>`) that seeds the store from a checked-in record instead of `Math.random()`, so the shell battery can assert exact rows instead of sampling. The node battery already has the N25 "board VM sha identical at a frozen state" pattern; the shell battery should inherit it. This is the single highest-leverage testing investment in the shell, and it also makes every future visual-regression baseline possible.

---

## The product ideas

**I5 · Rank the suggestion ring on the raw value, not the printed one (fixes F5).** `DraftBoard.svelte` walks the tie extension while the *displayed* (1-decimal) value ties; wins sit on a 1e-9 grid, so late rounds highlight 60 of 60 rows (my L13 run: "pick 27 (late): 60 highlighted (expected 60)"). The VM already carries the unrounded value. Rank on `raw`, round only for the label, and the ring means "three players" again. One line, no new data, and the falsifier F20 still kills it.

**I6 · "Why this one" in engine terms.** The suggestion ring is a *ranking*; what a user needs is a *reason*. Both are already computed: `boardVM` gives the order, `goneOdds` gives the probability the CPU takes him before your next pick, `lineupFor`/`effOvr` give the positional need. A single clause on the highlighted row — "last QB above +2.0 wins" / "the next QB is 11 picks away" / "fills your weakest slot" — turns the ring from decoration into advice. Zero new sentences if the clause is assembled from existing labels; the Owner's one-word list would carry any new connective.

**I7 · Tiers, not ranks, when the spread is below the display resolution.** The honest presentation of a 1e-9 grid printed at one decimal is clusters: "a 12-player tier at 8.4". When adjacent rows are indistinguishable at display precision, show the tier boundary instead of 60 ranked rows. This is the same root cause as I5 but a different product answer, and it is the Owner's call which one ships. My recommendation: I5 now (it is strictly a bug fix), I7 as the design conversation.

**I8 · Positional value before the pick (model-first, made visible).** The engine can already answer "what does this pick do to my lineup": `optimalLineup`, `effOvr`, `adviseLineup`. Show, on the pick confirmation, the *Wins delta* of this pick vs the best available alternative at the next need. This is the Owner's model-first doctrine rendered as a number the user can act on, and it is the natural bridge between the draft board and the season (the same `slotWinsPerOvr` weights). Tier 2/3 — it needs an Architect spec for the VM shape, not new engine semantics.

**I9 · The late draft is a different game — design for it.** After ~pick 10 the board's job changes from "rank" to "choose among near-equal". The cakepanz-9 uniform board is the right call (one anatomy), but the *affordances* should still change: the gone% column is the only one that discriminates late, priority/OVR could collapse into the "why" line (I6), and the ring (I5) should be joined by a "needs" filter that survives the late rounds. This is a UX proposal, not a code change, and it belongs with the Owner's Q1–Q6 sitting.

---

## The engineering ideas

**I10 · One `?debug=1` state dump, so probes stop scraping DOM.** Every battery today asserts on rendered text and DOM shape. A single JSON dump (`screen`, `record`, `vm` rows, `settings`, `season`, `pageErrors`) would (a) make laws cheaper and less brittle, (b) let the node battery and the shell battery share one expectation source, (c) make I1–I3 trivial to test. ~40 lines, dev-gated, zero product bytes.

**I11 · Contrast as a gate, not a note.** A zero-dependency script that builds the 64 team × mode combinations and fails on any pair below 4.5:1 (naming the team and token). The two known failures (light gold2 at 1.51, dark rose-ink at 3.17) stay Owner-gated, but the guardrail stops new ones. This is test-time only, zero product bytes, and it retires a recurring class of finding.

**I12 · Cutover choreography as a script.** The report's own risk read says the cutover risk is "re-pointing every battery + receipt from `cakepanz-4/` to the merged tree". That is a script, not a risk: `tools/retarget.sh <tree>` that rewrites the paths, re-runs the five suites and the three falsifiers, and prints one table. Rehearse it on a throwaway copy *before* the cutover so the cutover is a known-good command.

**I13 · A defect→law registry.** The class of finding that keeps recurring (F1, F3, F6 in my review) is "the proof moved forward, the guard did not". One table in VERIFY — filed defect → the law that kills it → the falsifier that proves the law can die — would make that visible at a glance. DS's D1–D5.3 are the first four rows: D1 → S29b (needs promoting to a battery, F6), D2 → L7b (same), D3 → N26 (source-level only), D5.3 → N26's header asserts.

**I14 · a11y completion for D3.** `aria-describedby` appears zero times in `src/` (VERIFIED). The row's method text is reachable only by expanding the row. One attribute on `.cp-main` (`aria-describedby="cp-fit-{r.id}"`) completes the fix for the users it was meant to protect, and a focus-visible pass on the row/chips would close the keyboard half.

**I15 · Offline, proven rather than assumed.** S26–S28 boot `dist/single.html` from `file://` and check for console errors and blocked requests. What is not yet proven is a **network-free** boot (pickle's P-363 caveat: the inline module script carries no `crossorigin`). One law — `context.setOffline(true)` before the `file://` goto, then walk the five screens — turns an assumption into a receipt, and it is the Owner's "tent in the woods" requirement made testable.

---

## What I would build next, in order

1. **I5** (one line, fixes a live product defect) + **I14** (one attribute, completes D3).
2. **I4 + I1** (`?seed=` + the draft code): the testing precondition and the cheapest shareable.
3. **I10** (the state dump) — it makes 2 and every future law cheaper.
4. **I13 + I11** (the registry and the contrast gate) — process guards, zero product risk.
5. **I2 → I6 → I8** (legibility: trace, why, value) — the product story, in that order.
6. **I12** (retarget script) before the cutover, not after.

## What I would NOT do

- **I3 (what-if)** before the record format is frozen: it constrains the save shape, so it is a design constraint now and a feature later.
- **A stats/dashboard framework** (TanStack or otherwise) before the four dashboards are specified: the measurement in the report says hand-rolled wins at this scale, and a framework chosen before the spec is a framework chosen by default.
- **Anything that adds a field to the record that is not derivable from `seed + pool + picks`** — it would break I2/I3 and the replay property that makes the whole record trustworthy.

## The one-line version for the Architect

*The cakepanz shell should stop treating a draft as a result and start treating it as a replayable program: seed + frozen pool + pick log is the whole draft, so build the code, the trace and the seeded tests on that property before adding any new surface.*