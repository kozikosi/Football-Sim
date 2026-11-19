SPEAKER: ERNIE | ROLE: council advisor (MUSE co-delegate) | TASK: innovation notes on the cakepanz shell and its UX, after the item-6 sitting review — what the framework decision (Svelte 5 + Vite 8) changes, and what to build next | DATE: 2026-11-19T20:55Z

FOR: R-13 (now RESOLVED — Svelte 5 + Vite 8, Owner 2026-11-19) · P-316 (the shell) · the cutover track
BASIS: the review at `inbox/20261119-2039-ernie-item6-sitting-review.md`, and code I read this session at the c10 bytes (`cakepanz-4/src/**`, `src/engine/sports/nfl/app/saves.ts`, `draftBoard.ts`, `goneOdds`, `lineupFor`, `feedVM.ts`). Everything below is grounded in a file I read or a command I ran. Where an idea needs new engine semantics I say so and name whose call it is. This replaces my earlier `20261119-0940-…-shell-innovation.md` as the current set — the I1–I4 replay spine still stands; what follows is what is *new* since the framework landed.

---

## 0 · What the framework decision changes (and what it does not)

**Decided: Svelte 5 + Vite 8** (Owner, 2026-11-19, final). This retires the bake-off, not the engineering. Three consequences that matter for the shell:

1. **The TS-neutral seam (`src/lib/port/`) is no longer a hedge — it is the product's architecture.** It was built so either arm could render it. Now one arm wins, and the seam becomes the thing that keeps the engine testable without a browser and lets the *view* layer be replaced without touching a single number. That raises the value of keeping it clean: it is now load-bearing, not optional.
2. **Vite 8 raises the floor, not the ceiling.** Verified: `vite@8.3.8` requires Node `^20.19.0 || >=22.12.0`; `@sveltejs/vite-plugin-svelte@7.3.1` peer-requires `vite ^8.0.0`. So the reconciliation is a **pair** (`vite ^8` + `plugin-svelte ^7`), and the real constraint for anyone building this on a phone-adjacent machine is Node ≥ 22.12. A seat that bumps vite alone lands on plugin-svelte 6 (which peer-requires vite ^7) and the build breaks in a way that looks like a plugin bug.
3. **The visual surface is now stable enough to design against.** For three sittings every UI idea carried "which arm?" as a caveat. It no longer does. That unblocks the backlog below — most of which was already correct and merely waiting on this.

---

## 1 · The five ideas I would build next, in order

### I5′ · Rank the suggestion ring on the raw value (fixes F5) — **one line, do first**

Re-measured at the c10 bytes with an independent probe:

```
pick 1 (early): rows=60 ringed=3   distinctDisplay=18
pick 13 (mid):  rows=60 ringed=46  distinctDisplay=18
pick 27 (late): rows=60 ringed=60  distinctDisplay=23   pageErrors=0
```

At pick 27 **every row on a 60-row board is ringed**, and the battery reports `PASS … ids exact`. The root cause is precise: the component (`DraftBoard.svelte:38-47`) parses the **display string** — `Number(String(x[vm.sort]).replace(/[^0-9.\-]/g, ''))` — which `display.ts:22` rounds to one decimal, while the engine sorts on the **raw** `_w`/`_p` on a 1e-9 grid (`draft.ts:98`). With 23 distinct printed values on 60 rows, the third row's printed value ties the other 57, so the "tie extension" swallows the board.

The VM already carries the raw value; it is stripped at export (`draftBoard.ts:61`, the `({ _w, _p, ...r }) => r` destructure). Two ways out, both small:

- **Cheapest:** keep the raw value in the VM (`raw: number`) and rank on it in the component. One field + one line.
- **Cleanest:** have the engine return the ring's ids (`vm.suggest: string[]`) so the component renders a fact instead of re-deriving one. This also kills the tautology (below).

The Owner's ruling was "at least three players' draft buttons highlighted." Sixty is not three. **This is a product bug, not a taste call** — I5 (exactly 3) vs I7 (tiers) is still the Owner's call, but the current state is neither.

### I5″ · Make the law independent of the code it tests — **the generalizable fix**

L13 cannot catch the bug above because it rebuilds its expectation with the **same rounded parse** the component uses:

```
batteries/board.battery.mjs:90-98
  const third = vals[2];
  const expected = vm.ids.slice(0, 3);
  for (let i = 3; i < vm.ids.length && vals[i] === third; i++) expected.push(vm.ids[i]);
```

`vals` comes from `vmVals()` — same `.replace(/[^0-9.\-]/g,'')` on the same display strings. So the law asserts "the component matches the component." This is the same defect class as P-365's gone% tautology (MUSE, Part 6): a law that recomputes through the code under test inherits every bug in it.

**The fix that generalizes:** a law must derive its expectation from a **different** source than the code it tests. Concretely — the engine's own `boardVM` sorts on raw keys; assert that the ring equals the first-3 **of the engine's raw sort**, recomputed by re-running `boardVM` in the probe (not by parsing the DOM's printed strings). The node battery already has this shape (the N25 "board VM sha identical at a frozen state" pattern). The shell battery should inherit it. This single change would have caught F5, and it is the highest-leverage testing investment in the shell — higher than any individual law.

### I6′ · "Why this one" — turn the ring from a ranking into advice

The ring says *which*; a user needs *why*. All three inputs are already computed and none needs new semantics:

- `boardVM` → the order (the ranking)
- `goneOdds` → `goneChance(odds, id)` = the probability the CPU takes him before your next pick
- `lineupFor` / `effOvr` → the positional need

A single clause on the highlighted row — "last QB above +2.0 wins" / "the next QB is 11 picks away" / "fills your weakest slot" — assembles from **existing labels**, so no new user-facing sentence is required (the Owner's one-word list carries any connective). This is the cheapest legibility win in the whole track and it is the natural home for the gone% number the engine already computes and the shell already displays.

### I10′ · One `?debug=1` state dump — **do this before I4/I1, it pays for them**

Every battery today asserts on rendered text and DOM shape, which is why laws go brittle and tautological (F5, and the "different player name / different flex count" receipt drift in my review F4). A single JSON dump — `{ screen, record, vm: { rows, sort, suggest }, settings, season, pageErrors }` — would:

- make every law cheaper and non-tautological (assert against the dump, not the DOM),
- let the node battery and the shell battery share **one** expectation source,
- make I1 (draft code) and I4 (seeded fixtures) trivial to test.

~40 lines, dev-gated, **zero product bytes**. It also happens to be the precondition for the seeded fixtures (I4), because it gives the fixture loader a schema to write against.

### I11′ · Contrast as a gate, not a note

A zero-dependency script that builds the 64 team × mode combinations and fails on any pair below 4.5:1, naming the team and the token. The two known failures (light gold2 at 1.51, dark rose-ink at 3.17) stay Owner-gated, but the guardrail stops *new* ones. Test-time only, zero product bytes, and it retires a class of finding that has recurred across cakepanz-8, 8.1 and 10. With the framework decided this is cheap to write once against the theme tokens rather than per-arm.

---

## 2 · The product ideas, sharpened now that the surface is stable

### I2′ · The post-draft trace — the feature that makes the engine legible

The record is a program (`seed + pool + picks` reconstructs the whole draft — `saves.ts:27-31`). After the draft, one screen: for each of the user's picks, the board's own top available at that moment vs the player taken, in the board's existing currency (wins / priority), plus the three largest reaches and steals. All derivable by replaying `picks[0..k-1]` over `pool` with the same CPU functions the live draft uses. **No engine semantics.** This is the Owner's model-first doctrine shown rather than asserted, and it is the single best answer to "why did the sim do that."

### I7′ · Tiers when the spread is below display resolution — the honest presentation

The honest rendering of a 1e-9 grid printed at one decimal is clusters: "a 12-player tier at 8.4". When adjacent rows are indistinguishable at display precision, show the tier boundary instead of 60 ranked rows. This is the *design* answer to the same root cause as I5; I5 is the bug fix, I7 is the conversation. My recommendation stands: ship I5 now, design I7 with the Owner's Q1–Q6.

### I8′ · Positional value before the pick — model-first as an act-on-able number

The engine already answers "what does this pick do to my lineup": `optimalLineup`, `effOvr`, `adviseLineup`. Show, on the pick confirmation, the *Wins delta* of this pick vs the best available alternative at the next need. This is the natural bridge between the board and the season (the same `slotWinsPerOvr` weights), and it is the number that would have made the C′1 ring's arbitrariness obvious to a user. Needs an Architect spec for the VM shape, not new semantics.

### I9′ · The late draft is a different game — the uniform board is right, the affordances are not

After ~pick 10 the board's job changes from *rank* to *choose among near-equal*. The cakepanz-9 uniform board (one anatomy) is the correct call, but the affordances should still shift: the gone% column is the only one that discriminates late; priority/OVR could collapse into the "why" line (I6); and the ring (I5) should be joined by a "needs" filter that survives the late rounds. This is a UX proposal for the Owner's Q1–Q6 sitting, not a code change.

### I15′ · Offline, proven rather than assumed — now with a Vite 8 tail

The Owner's "tent in the woods" requirement is a hard one. S26–S28 boot `dist/single.html` from `file://` and check console errors and blocked requests. What is unproven is a **network-free** boot: `context.setOffline(true)` before the `file://` goto, then walk the five screens. One law turns the assumption into a receipt.

Vite 8 adds a wrinkle worth checking at cutover: the build target and its default module preload polyfill. Vite 7 already inlined to a single file here (`distfile.mjs` — "no external refs: true"), and 8 keeps that path, but the *first* cutover build should re-run the offline law against the **Vite 8** output, not the 7 output. Same law, new bytes.

---

## 3 · The engineering ideas that survive the framework change

### I12′ · Cutover choreography as a script — rehearse before, not after

The report's own risk read says the cutover risk is "re-pointing every battery + receipt from `cakepanz-4/` to the merged tree." That is a script, not a risk: `tools/retarget.sh <tree>` that rewrites the paths, re-runs the five suites and the three falsifiers, and prints one table. Rehearse it on a throwaway copy **before** the cutover so the cutover is a known-good command. With Vite 8 in the mix this now also asserts the *pair* (`vite ^8` + `plugin-svelte ^7`) rather than trusting a single version bump.

### I13′ · A defect→law registry — and the row that keeps recurring

The class of finding that keeps recurring (F1, F3, F6 in my review; P-365's gone% tautology; F5's L13) is **"the proof moved forward, the guard did not."** One table in VERIFY — filed defect → the law that kills it → the falsifier that proves the law can die — makes that visible at a glance. DS's D1–D5.3 are the first four rows: D1 → S29b (needs promoting to a battery), D2 → L7b (same), D3 → N26 (source-level only), D5.3 → N26's header asserts. **The fifth row is F5 → L13, and its note is "tautological — recompute from the engine, not the DOM."**

### I14′ · a11y completion for D3 — one attribute, and the keyboard half

`aria-describedby` appears **zero** times in `src/` (VERIFIED). The row's method text is reachable only by expanding the row. One attribute on `.cp-main` (`aria-describedby="cp-fit-{r.id}"`) completes the fix for the users it was meant to protect, and a `focus-visible` pass on the row + chips closes the keyboard half. With the framework decided this is a five-minute change against a stable DOM.

### I16′ · The seed-visible "receipt drift" as a *feature*, not a bug

My review's F4 found three committed copies of `slice1-battery.json` with identical outcomes (`pass: 29, fail: 0`) and different *content* (different player names in the confirm line, 71 vs 72 flex chips, 11 vs 10 filtered rows). That is the unseeded seam leaving fingerprints — and it is *evidence for* building I4 (seeded fixtures) rather than an embarrassment to hide.

**The idea:** make the seed a visible, copyable part of every result surface — the board footer, the Complete screen, the share card. "Draft #A3F2-7" under the board. Then the drift becomes a *feature*: a user who reports a weird draft hands over a code, and the trace (I2) replays it exactly. A draft that can be replayed from a code is a draft nobody can accuse of being staged. This is the cheapest shareable in slice 5 and it is infrastructure for trust.

---

## 4 · What I would NOT do, and why

- **Do not re-open the framework.** It is decided. If a doc still says "50/50" or "NOT a lock," it is a historical record (leave it) or a stale copy (report it) — not an invitation to re-argue.
- **Do not add a field to the record that is not derivable from `seed + pool + picks`.** It would break I2 (trace) and I1 (code) and the replay property that makes the whole record trustworthy. This is a *design constraint now*, not a feature later.
- **Do not build a stats/dashboard framework (TanStack or otherwise) before the four dashboards are specified.** The measurement says hand-rolled wins at this scale; a framework chosen before the spec is chosen by default.
- **Do not touch `src/engine/`** — it is the Architect's, frozen at the pin, and the shell consumes it through the seam. Every idea above is a `src/lib/` or `batteries/` change.
- **Do not "fix the vite major" alone.** It is a pair; see §0.

## 5 · The one-line version for the Architect

*The framework is decided, so the seam is now architecture rather than a hedge — and the highest-value work is making the tests independent of the code they test: rank the ring on the raw value (one line, fixes a live 60/60 bug), assert against an engine-derived dump rather than the DOM (fixes the whole tautology class), then build the trace and the draft code on the replay property the record already has.*