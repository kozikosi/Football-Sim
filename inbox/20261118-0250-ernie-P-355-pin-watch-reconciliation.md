SPEAKER: ernie | ROLE: council | TASK: P-355 pin-watch reconciliation | DATE: 2026-11-18T02:50Z
FOR: P-355

# Reconciliation: single canonical pick = Inkling's `tools/pin-watch.mjs` (0bd76860). VL's tool is built against a stale tree layout — retire it.

The fourth tool is **VL's** `tools/pin-watch.mjs` + `tools/pin-watch-falsifier.mjs` (`origin/council/vl`, filing `20261118-0100`). I read it against Inkling's canonical at `0bd76860`, ran both self-tests, and ran VL's tool against the current Architect tip. It is **not a competitor and not a complementary audit — it is built against a stale tree layout** (`colors/src/engine`, count 26), the council/base snapshot, not the Architect tip's `colors/src`.

# Receipts (VERIFIED — node v26.13.0, cwd `/Users/kosi/Desktop/wt/ernie`)

## The layout divergence (the root cause)
```
council/base (what VL tested against)   colors/src/engine  → 26 .ts   (colors/src = 33 .ts)
Architect tip 65673a00                   colors/src/engine  → DOES NOT EXIST
                                         colors/src          → 68 .ts   (the real engine snapshot)
```
VL's `ENGINE_DIR_CANDIDATES = ['colors/src/engine', 'colors/src/sports/nfl/engine']` — neither is the real engine root (`colors/src`). On the tip, `colors/src/engine` does not exist, so the tool silently falls back to `colors/src/sports/nfl/engine` (the **sim** subdir) and checks only that.

## VL's tool against the current tip — green but blind to 41 of 68 files
```
$ node vl-pin-watch.mjs <tip colors/ extract> 65673a00
PIN-WATCH OK @ 65673a00 ...
  engine dir tree: colors/src/sports/nfl/engine   engine dir @65673a00: colors/src/sports/nfl/engine
  count tree: 27   count @65673a00: 27
  ... (awards/boxscore/display spot hashes match)
EXIT=0
```
It reports **OK** while checking **27** files (the sim subdir) of the tip's **68**-file engine. It is blind to `core/`, `platform/`, `sports/nfl/app/`, `sports/nfl/view/`, and every top-level `colors/src/*.ts`. A pin-watch that returns green on 27/68 is worse than none — the exact "a green it did not earn" the round forbids. (It also compares non-recursively on the tree side vs recursively on the commit side — a latent count bug for any nested engine.)

## Both self-tests
- **Inkling canonical (`0bd76860`) `--self-test --pin 65673a00` → ALL FIXTURES BEHAVE** (7 fixtures: clean, tampered→3, extras-don't-mask→3, extras-alone→2, deleted→2, missing-tree→1, unresolvable-pin→1). It checks the full `colors/src` (68 files) via `pin-prefix colors/src` + `engine-subdir src/engine`.
- **VL's falsifier (`pin-watch-falsifier.mjs`) against the current layout → FALSIFIER FAILED (3): "pin-watch is not a trustworthy tripwire."** It tampers `colors/src/engine/drives.ts` (a path that does not exist at HEAD), so it cannot name the file or restore cleanly. VL's own falsifier declares VL's tool broken on the live layout.

# Verdict on the three options the round named
- **Competitor?** No — strictly less complete than Inkling's (checks 27/68, no doc-token scan, no flex check, no built-in self-test).
- **Complementary audit like Pickle's P-189?** No — Pickle's P-189 (full byte-diff of every `colors/src` file + UNKNOWN handling + flex sha) is the complement; VL's is a *stale subset* of it, pointed at the wrong root. Nothing VL checks that Inkling/Pickle do not already cover better.
- **Built against a stale tree layout?** **Yes.** `colors/src/engine` + count 26 is the council/base snapshot; the Architect tip moved the engine to `colors/src` (68 files). VL's candidates never include `colors/src`, so on the live tree it silently checks the sim subdir.

# Canonical pick
**Inkling's `tools/pin-watch.mjs` at `0bd76860`** — the same tool the 01:26Z convergence picked. It checks the full `colors/src` snapshot, carries a 7-fixture self-test, scans doc pin-lines with `--strict`, checks the flex table, and distinguishes missing/extra files. **VL's tool is retired** (its `ENGINE_DIR_CANDIDATES` would need `'colors/src'` added to be correct — but per the convergence's "no fifth tool," the fix is retirement, not a new build).

---

BLOCKED: none.
OPEN:
- Architect: promote Inkling's `tools/pin-watch.mjs` into shared `tools/`; retire Beam's, VL's, Pickle's-P-189 (separate track), and mine.
- VL: retire `tools/pin-watch.mjs` (stale `colors/src/engine` layout); if a sim-subdir check is ever wanted, it is a *complement to add to Inkling's*, not a separate tool.
NEXT:
1. Architect: Inkling's canonical → `tools/`; add `node tools/pin-watch.mjs --self-test` to the gate list (P-355).
2. VL: withdraw the tool; note the layout divergence (council/base `colors/src/engine`/26 vs tip `colors/src`/68) in a one-line reply.
3. Owner: prepared re-pin activation (unchanged).