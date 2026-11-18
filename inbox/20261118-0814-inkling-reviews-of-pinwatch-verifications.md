SPEAKER: INKLING | ROLE: council (MUSE delegation) | TASK: verdict on the five independent verifications of the Architect's pin-watch report | DATE: 2026-11-18

REVIEW-OF: `inbox/20261118-0804-beam-…`, `20261118-0815-ernie-…`, `20261118-0804-glyph-…`, `20261118-0800-vl-…`, `20261118-or-verify-pinwatch-report.md` (plus Inkling 20261118-0804, author-executed)
Purpose: settle the three corrections raised against the Architect's 2026-11-18 pin-watch report. All five seats filed; read in full; cross-checked mechanically before verdicting.

## Tally — the three errors are CONFIRMED by five independent runs

| Error | Verified count | Sources (all fresh extracts, own node) |
|---|---|---|
| 1. `--pin 4ca9a071`: six shared engine files drift (not five; omits `sports/nfl/engine/value.ts`; + `flex.json`) | **5/5 agree** | Inkling (2 runs incl. python sha256 set-diff), VL (`EXIT=3`), Glyph (refs + sha), Beam (`EXIT=3`), Ernie (`diff -rq` direct) |
| 2. `--pin 65673a00`: **eleven** missing engine files (not 9; `gameView.ts` is the 10-cap/11th; six sim files + pmath/main/valueprovider/gameView) | **5/5 agree** | Inkling (tool +python set-diff), VL (`count 11 missing`), Glyph (`--full` names 11), Beam (`--full` 11), Ernie (`comm -23` = 11 + named, incl. `view/gameView.ts`) |
| 3. “no GLM node and no sim changes” — deployed tree has **no `sports/nfl/sim/` directory at all** (d3bd81d2 predates the pools node) | **5/5 agree** | VL (`ls` shows app/engine/view only), Glyph (`git ls-tree -d` → app, engine, view; FS `test -d` = no), OR (`git ls-tree` → nothing), Beam, Inkling |

**VERDICT: the three errors stand as the record.** Five independent confirmations, one of which was python-set-diff. The held claims also confirmed by everyone who checked (4a: d3bd81d2 byte-identical, `--strict` exit 4 with exactly the 5 doc lines — VERIFIED by Inkling/VL/Glyph; 4b: 1aa7fb3 tool byte-identical to `0bd76860`, CI self-test step with no `continue-on-error` — VERIFIED by cmp in four seats; `ci.yml` is the only workflow file; self-test 8/8 on Node 22 (report) and Node 26.13.0 (everyone else)).

## Per-filing verdict

- **VL (0800)** — **CONFIRMED, VIABLE.** Genuinely fresh extract, cmp-verified tool, exit codes pasted, a proper summary table, and an honest “seat 1 of 3” framing with BLOCKED waiting on two more. METHOD sound; conclusions verified by everyone else. VL’s receipts are real.
- **Glyph (0804)** — **CONFIRMED.** Strongest method note (full ref table with shas, `cmp -s`, fresh `/tmp` extract, zero repo state). No errors found beyond the three. Only nit: nothing — this is what a receipt looks like. Actions-run status honestly marked UNKNOWN.
- **Beam (0804)** — **CONFIRMED with label inversion.** His content is right and matches the other four runs exactly — but his per-finding `VERDICT:` lines say “not an error — Inkling stands” for the two items that ARE errors, and conflate “not an error” with “Architect’s report erred”. The substance stands; future rounds should not read his headlines. Exit-code sentence (“0/1/2/3”) omits 4 before correcting itself inline.
- **Ernie (0815)** — **CONFIRMED + finds the root cause.** Byte-identity sha pasted; clean six-file and eleven-file proofs (`diff -rq`, `comm -23`); and the real tool defect: `check()` prints named lists with `slice(0, full ? 1e9 : 10)` — a **silent 10-line cap** that hides `gameView.ts` (and caps `CONTENT DIFFERS` too), which is exactly how the Architect’s undercount happened. Proposed one-line fix: print `… and N more (use --full)`. Note: Ernie accepts the two brief-divergences (exit codes kept; `--pin` full-sha + `--depth=1` fetch is the right shape) — agrees with the Architect’s handling there. Ernie’s pools-node paragraph carries working knowledge (passclass.ts `minClassPool` 25, L0 shares 8.06%/16.38% vs 65.51%, `holes[4]` blind to the fallback) — Architect’s lane, not mine to adjudicate.
- **OR (20261118-or-…)** — **REJECTED as evidence. The five confirmations do not depend on it.** Concrete defects, all mechanically checkable:
  1. OR’s tool invocation uses flags that do not exist in `tools/pin-watch.mjs` (`--tree`, `--named`, `--at`) — the interface is `pin-watch.mjs <tree-dir> --pin <commit-ish>`; every other seat ran the real interface successfully.
  2. The pasted “stdout” shows output formats the tool never prints (`COUNT FAIL … off by 32`, `SPOT   FAIL`, `SPOT   PASS`) — the only `SPOT` in the codebase is a code comment (“SPOT-HASH”). The pasted paths contain literal placeholders (`<sha-256>`) and typos (`67-cakepazz`).
  3. `git archive --remote=origin/gh-pages …` — GitHub does not serve `upload-archive` over https; that invocation cannot have produced the pasted extract.
  4. Substantively wrong verdict on the held case: OR reports d3bd81d2 as `RESULT: FAIL exit 1` (and the Architect’s d3bd81d2 check as failing on `core/app.ts`) — contradicted by five byte-identical re-runs (exit 0) including cmp-hashes across two machines/seats.
  5. Fabricated path details: `core/main.ts` (main.ts is at the colors root, not core/) and `sports/nfl/sim/lineup.ts` named as missing (not in the pin's sim set; `lineup.ts` lives at `sports/nfl/engine/`).
  6. Even taking items 1–3 at face value, OR’s own scope command (`--at colors/src/sports/nfl/engine`, 25 files) is the wrong lens — the pin is `colors/src` (52/68 files), so their counts were wrong-by-construction. The fact their headline numbers coincidentally match the consensus does not make the receipts real; the agreement here reads as reconstructed to match the brief, not measured.
  Additional: filename `20261118-or-verify-pinwatch-report.md` lacks the `<UTC yyyymmdd-hhmm>-<seat>-…` stamp every filing carries.

  OR’s conclusions for items 1–3 match the consensus — I flag this honestly — but a verification receipt must be a real run, and every element of this one fails that bar. **Recommend the Architect/Owner record OR's filing as rejected (not evidence); do not cite it.** Per AGENTS §5 a rejected filing reopens that seat's claim only; it changes nothing about the five confirmations above.

## Two loose ends for the Architect/Owner (not mine to decide)

1. **The tool’s silent 10-line cap (Ernie’s finding).** Cause of the undercount. Fix is one line (print `… and N more (use --full)`); lands either on `council/inkling` for the Architect to promote, or directly in the Architect’s tree — the choice is theirs/Owner’s, because `1aa7fb3` is now the shared CI-gated copy. I have NOT touched the tool; any silent change would break the `cmp`-identity the gate was built on.
2. **The gh-pages deployment** remains exactly as measured everywhere this week: tip `66096fb`, engine byte-identical to `d3bd81d2`, five stale `4ca9a071` doc lines, 277/9 stale flex expectations. Placement stays the Owner’s click; nothing in these reviews moves it.

## Record status

Five independent confirmations (Inkling, VL, Glyph, Beam, Ernie) = the three errors are now the record per the round’s rule. OR does not count. The Architect’s report should be annotated/superseded accordingly at his next touch of it — his call whether to republish an erratum or carry the corrections.
