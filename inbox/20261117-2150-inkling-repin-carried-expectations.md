SPEAKER: inkling | ROLE: council | TASK: Part 4b of the superseding council prompt — measure the deployed gh-pages tree's 9 suite failures; confirm each is a carried expectation asserting REV 4, not an engine regression | DATE: 2026-11-17T21:50Z
FOR: the re-pin-of-carried-expectations item

# gh-pages 67-cakepanz: the 9 failures — VERIFIED, every one a carried expectation; zero engine regressions

**Machine:** macOS arm64 · `npx node@24 --experimental-transform-types --test test/engine.test.ts` (Node v24.22.3) · fresh `git archive origin/gh-pages:67-cakepanz` extract under `/private/var/folders/…/T/opencode/ghp-67cakepanz` (read-only; the shared tree was never touched). Note the invocation differs from the tree's own `npm run test:engine` (`--experimental-strip-types`), which **dies on Node 26 with `ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX` (parameter property at `platform/localstorage.ts:31`, exit 1) and `node: bad option` on the falsifier's flag — §4-portability as usual; the 24-run is the delivered truth this tree can produce.**

**Result: tests 286 · pass 277 · fail 9 · exit 1** — exactly the prompt's numbers. Receipts: `/tmp/ghp-suite.log`.

## What the deployed tree actually is (finding 1)

`src/engine/sports/nfl/` = `app` + `engine` + `view` — **no `sim/` directory, and `src/engine` is byte-identical to `colors/src` at `d3bd81d2`** (`diff -qr` exit 0, VERIFIED). The tree's own README and the two CHECKSUMS files still name the pin **`4ca9a071`** ("Pinned engine commit: 4ca9a071"; CHECKSUMS-slice1/2.txt line 2) — **the stale-pin failure mode AGENTS.md names, live on the deployed branch**: the snapshot was moved to `d3bd81d2` (the 99-rule 11-10 table) without moving the pin line or the checksums list. `flex.json` inside the tree is the 99-rule table **as of 2026-11-10** (counts 23/43/10/23 — the `_source` header itself says so) — i.e. the tree does NOT carry the 16 Nov amendments (six rules 0→2; FB>TE 6→2 — those live on the Architect's branch at `7a0706df` and later, and on the tip `65673a00` as 23/42/17/17). So the "re-pin moved the engine to the 99-rule table" story is accurate **for the 11-10 table**; if the carried expectations are re-pinned, decide which table is the target — the deployed tree is two doc-generations behind the Architect's tip, not one.

**diff evidence:** `flex.ts` vs tip `65673a00` differs (the six 0→2 rules + FB>TE 2 + header line; VERIFIED via `diff`). The snapshot is d3bd81d2 exactly — nothing between `4ca9a071` and `d3bd81d2` leaked in either.

## The 9 failures, classified one by one (all VERIFIED from the log; labels = mine)

| # | Test (file:line) | Assertion diff | Class |
|---|---|---|---|
| 1 | `flex: the typed table equals tools/mathlab/flex.json (REV 4) rule by rule` (lineup.test.ts:36→39) | **99 !== 107** | carried expectation — the name says REV 4; live table is 99 rules |
| 2 | `flex: every penalty is 0, 2, 4 or 6 and every role in the data has a row` (:45→43) | **"QB->FS 12"** | carried expectation — REV 4 tiers {0,2,4,6}; live tables use {0,2,6,12} |
| 3 | `flex: Owner rulings of 28 and 29 Oct (REV 3, REV 4)` (:63→47) | **6 !== 4** | carried expectation — REV 4-era Owner values |
| 4 | `flex: NICKEL and DIME are free for CB, SS and FS; WR pays 4` (lineup.test.ts) | strictEqual (REV 4 values; live: the 11-10 table, WR pays 6) | carried expectation |
| 5 | `flex: DL5 is natural for DT and EDGE and costs the cheaper of role->DT, role->EDGE for the rest` (:67) | **TE 12 !== 6** | carried expectation — REV 4 values |
| 6 | `flex: no arbitrage; going A → B → C …` (:78) | **"unexpected arbitrage: 14: TE>FB>RB 2 < 6; …"** | carried expectation — the REV 4 table satisfied the triangle inequality; the live 99-rule table does NOT (14 counterexamples) — **this law cannot be re-pinned to green; it must be deleted or restated non-metrically — the Architect's call, flagged not hidden** |
| 7 | `base: totals are not comparable. A roster of 4-3 natives is worth MIKE x 2 + SAM x 4 less in 3-4…` (:225) | **2700 !== 1000** | carried expectation — arithmetic derived from REV 4 flex values |
| 8 | `base: with a second natural ILB the 3-4 lineup has no flex at all…` (:234) | deep-equal mismatch | carried expectation — same class |
| 9 | `E5 pins: the engine and data stamps are what the last deliberate change left them` (versions.test.ts:17) | **'nfl1.14a4e9333e888a' vs 'nfl1.0e237387b2647f'** ("rules changed: update PIN_ENGINE") | carried expectation — the pre-re-pin engine stamp; the live stamp moved with d3bd81d2 by design |

**Not one of the nine is an engine regression.** The engine files are the pin's bytes (diff exit 0). Seven of nine fail on REV 4 *numbers* (rule counts / tier sets / Owner values / stamp); two fail on REV 4-derived *arithmetic* (the 4-3/3-4 base comparisons). Two findings for the Architect beyond "re-pin the expectations": (i) the no-arbitrage law (#6) is unsalvageable as written — it fails *by construction* on any non-metric table; deleting or restating it is a design act, not a re-pin; (ii) the deployed tree's README/CHECKSUMS pin lines are stale to a pin that no longer matches its own bytes — fix with the re-pin, not beside it.

## Caveats (labelled)

- The "277 pass / 9 fail" receipt is Node 24 (v24.22.3); on Node 26 the suite cannot run at all until the parameter property is precompiled away (the same D-1-class blocker, unfixed in this tree — REPORTED via my Part 3d run). **MUSE's "the tree is red on its own suite" is VERIFIED exactly as stated.**
- The re-pin fix itself (carried expectations) is the Architect's per the prompt; this filing is the measurement, nothing more.
- I did not verify the `test/engine.test.ts` import closure — it ran as delivered, which is what was asked.

**BLOCKED:** nothing for the measurement. **OPEN (Architect/Owner):** target table decision (d3bd81d2-era 99 rules vs the 16 Nov tip); the no-arbitrage law's disposition; the stale README/CHECKSUMS pin lines. **NEXT:** (1) Architect re-pins the carried expectations against the target table and re-runs this exact extract's suite expecting 286/286; (2) the pin line and checksums move in the same change; (3) re-take under Node 26 when the precompile lands.

Commands (verbatim): `git archive origin/gh-pages:67-cakepanz | tar -x` · `npx node@24 --experimental-transform-types --test test/engine.test.ts` · `diff -qr <extract>/src/engine <git archive d3bd81d2 colors/src>/colors/src` · grep receipts: `lineup.test.ts:39` (99 vs 107), `:43` (QB→FS 12), `:47` (6 vs 4), `:67` (TE 12 vs 6), `:78` (14 arbitrage), `:225`/`:234` (base arithmetic), `versions.test.ts:17` (stamp) — all in `/tmp/ghp-suite.log`.
