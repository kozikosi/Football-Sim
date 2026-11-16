# REV-8-ERRATA.md — every change from Rev 6 to Rev 8, with file, old → new, command, output

Seat: Z.ai · 2026-11-15 · Rev 8 sitting. Errata 0.1–0.13 from the Rev 8 work order, each verified
against the Rev 6 tree first, then fixed. Parts A–F receipts live in RECEIPT.md (Rev 8 section),
PART-A-CLASS-BRIDGE.md, VERDICT-REV-8.md and receipts/.

## 0.1 — nested manifest stale (12/358) → REGENERATED and verified

- **Verified first:** `shasum -a 256 -c CHECKSUMS.txt` in `REV-5.1-addendum/` → **346 OK / 12 FAILED,
  exit 1**; the 12 = exactly the Rev 5.1 patch targets (AUTHORING-COST.md, CATEGORY-WINNERS.md,
  INNOVATION.md, README.md, SLICE-DONE-PROPOSAL.md, filings/OT-clock-fix-PENDING.txt,
  framework-two-arm/arm-svelte/src/lib/savesService.ts, framework-two-arm/arm-vue/src/lib/savesService.ts,
  framework-two-arm/receipts/bundles-pin-d3bd81d2.txt, framework-two-arm/receipts/two-arm-fourslice.txt,
  framework-two-arm/receipts/two-arm-lines.txt, measurements/AGENTIC-ERGONOMICS-VERDICT.txt).
- **Extra finding:** the stale manifest also OMITTED 3 files — `REV-5.1-ADDENDUM.md` and
  `f1-typecheck-rerun.txt` (which the Rev 5.1 patch step itself created, proving the manifest
  predated the patch run) and `framework-two-arm/arm-vue/tsconfig.tsbuildinfo` (a build cache that
  should never have shipped — **deleted** this sitting, see 0.10-spirit note).
- **Fix:** `CHECKSUMS.txt` regenerated on the patched tree (sha256 per file, addendum scope, node_modules
  excluded, manifest itself excluded). Old: 358 entries, 12 FAILED. **New: 360 entries, 360/360 OK,
  exit 0** (`shasum -a 256 -c CHECKSUMS.txt`; `node scripts/gate-manifest.mjs REV-5.1-addendum` → PASS).
  No pass-through re-cut was possible for Rev 6 (see Part Z) — Rev 8 ships the regenerated tree.

## 0.2 — repair-cycle scope label

- `RECEIPT.md` (Settle-rule section): OLD "repair cycles svelte 10 vs vue 9" → NEW "repair cycles
  (4 slices, a–d) svelte 10 vs vue 9; adding the Part B week-stepper (svelte 1, vue 2) gives 11 vs 11 —
  on the full five-slice count the arms TIE EXACTLY, which supports the WASH rather than weakening it".
  Numbers unchanged; label added.

## 0.3 — workarounds figure

- `DELIVERY-NOTE.md` verdict ¶1: OLD "(fewer workarounds: 4 vs 6; cleaner templates; …)" → NEW
  "(first-try greens 2 vs 0; cleaner templates; $state.raw is a known-once decision — the receipted
  figure is 4 vs 3, which favours VUE, so 'fewer workarounds' is STRUCK as a lean reason)". The lean
  rests on first-try greens and templates.

## 0.4 — manifest coverage + the 3,503 figure

- Root `MANIFEST.txt` OLD: 3,499 lines describing the Rev 6 ZIP (incl. 2,864 node_modules/.git
  entries absent from the published tree; 0 occurrences of "CLAUDE"; 635/641 non-vendored files
  covered) → NEW: regenerated over the Rev 8 tree, covering every delivered file including
  `football-sim-vue/CLAUDE.md` and `football-sim-svelte/CLAUDE.md`. Command: sha256 per file,
  exclusions node_modules/.git/dist; verified by `node scripts/gate-manifest.mjs .` (PASS — count in
  VERIFY.txt). No exclusion rule needs stating: the manifest now covers the whole delivered tree.
- The "3,503 sha256 lines" figure lived in the Rev 6 zip's COVERING NOTE (chat-level, not in the
  tree); this delivery's covering note carries no manifest line count — VERIFY.txt states the actual
  count of the regenerated manifest.

## 0.5 — r51_patch.py citation

- `REV-5.1-ADDENDUM.md` intro: OLD "(`scripts/r51_patch.py`, applied 17/17)" → NEW an explicit
  UNVERIFIABLE note: the applier did not ship and is not recoverable (checked: not in the Rev 6 tree,
  not in the authoring delivery on council/glyph); the 17/17 count is unverifiable from the delivery;
  the patched files themselves ship and are spot-checkable against the fix table.

## 0.6 — 867 → 871

- `DELIVERY-NOTE.md` (cards 867/867 → **871/871**), `RECEIPT.md` fidelity-pin row (867/457/… →
  **871**/457/…), `verified-as-of.json` fidelityPin.values.cards (**867 → 871**). Source of truth: the
  battery JSONs (`football-sim-{vue,svelte}/probes/battery-*.json`, screens.cards.nodeCount = 871 both);
  re-confirmed by this sitting's battery re-runs (24/24 both, exit 0).

## 0.7 — wrapper variant build-verified

- OLD: "compiled and checked only" (0 imports; the bundler never compiled it). NEW: imported by both
  the DEV-only QA hook in `football-sim-svelte/src/main.ts` (`window.__PART_A__`) and the Part A live
  probe; **`npm run build` exit 0** with the file in the graph. Proof by falsification (run and
  immediately reverted): appending `export { slot };` → build exit 1,
  `RolldownError: …/weekStore-wrappers.svelte.ts:44:9 Cannot export state from a module if it is
  reassigned…`, while **svelte-check on the same tree: 0 errors, 0 warnings** — the direct
  experimental proof behind gate 5's build-green clause. A second probe (`export const _rawSlot =
  slot;`) showed the value-copy pattern is NOT invalid_export (it raises the
  state_referenced_locally warning, exit 0) — the invalid pattern is exporting the reassigned
  BINDING. Runtime proof: the wrapper variant boots under the real DEV server through the app entry
  (receipts/e3-part-a-live-svelte.json: weekGo(2) → slot 2, label WEEK 2).

## 0.8 — Vue line count method

- OLD: "985 (wc -l, in-tree)" with no method. NEW (stated method, both arms, same rule):
  `find src -type f \( -name '*.ts' -o -name '*.vue' -o -name '*.svelte' -o -name '*.css' \)
  ! -path '*engine*' ! -path '*shared*' | xargs wc -l | tail -1` (includes tests/entry/chrome css).
  Reproducible numbers: **Rev 8 tree 991 (vue) vs 1,079 (svelte)**; Rev 6 baseline (Rev 8 files
  subtracted) **878 vs 883 — a 5-line tie, not 985 vs 880**. The receipted 985 is not reproducible
  under any natural rule (the two receipted figures were measured in different scopes); "lines favour
  Svelte" is STRUCK as a lean reason (RECEIPT.md E0a + settle-rule row updated). Checkable against
  Ernie's 1,608: Ernie's scope was also unstated; excluding src/engine only gives 1,614 incl. css /
  1,378 excl. css on the Rev 6 baseline — close in order of magnitude but not equal, which is exactly
  why the method must be stated.

## 0.9 — facade comparison restated as a wash

- `RECEIPT.md` Part B: NEW paragraph after F5 — the two files measured different things (facade holds
  5 getters AND 4 methods, 37 L; wrappers hold 5 getters + 3 free functions outside, 29 L); honest
  statement: **one facade object costs ~12 lines including its methods; five separate wrappers plus
  three free functions cost ~12 lines.**

## 0.10 — dead base.css

- `football-sim-vue/src/assets/base.css` DELETED (7 hexes, imported by nothing). Also deleted:
  `main.css` — base.css's ONLY importer, itself imported by nothing (leaving it would ship a broken
  `@import`). Palette gate re-verified on the whole framework-owned tree: 0 hex outside the token
  layer (tokens.css + shared/tokens.ts; the only 7 hexes outside tokens.css live in the token layer's
  TS twin; engine files excluded as pinned).

## 0.11 — verified-as-of.json

- OLD `"file": "REV-5.1/f1-typecheck-rerun.txt"` (wrong path) → NEW `"file":
  "REV-5.1-addendum/f1-typecheck-rerun.txt"` **with command + exit 0** quoted in the entry. The
  fidelity claim switched to command+result form with **871**. NEW `"manifest"` entry (regenerated
  manifest + count + gate PASS + date). NEW `"e3"` entry (Part D receipts). `notCompleted` replaced:
  the E3 session RAN; the one item now owed is the sealed-recipe bench (by design).

## 0.12 — checkers re-run from a clean extract

- Both fresh-start arms AND both addendum arms: fresh `cp -R` (no node_modules), fresh `npm install`
  from committed lockfiles, checkers re-run. Results: vue `vue-tsc --build` exit 0; svelte
  `svelte-check` 0 errors AND 0 warnings exit 0; arm-vue `--build` and `--noEmit` exit 0; arm-svelte
  0/0 exit 0. Receipts: `receipts/clean-extract-*.txt`; `REV-5.1-addendum/f1-typecheck-rerun.txt`
  RE-ISSUED — **in-tree relative paths only** (the Rev 6 issue cited `/home/z/...` absolute paths).

## 0.13 — a11y warnings fixed (not waived)

- `REV-5.1-addendum/framework-two-arm/arm-svelte/src/lib/screens/Cards.svelte:57`: the featured-card
  backdrop got `role="button" tabindex="-1" aria-label="Close featured card"` + an Escape
  `onkeydown` (it is de-facto a close button). `FeedPanel.svelte:49`: `tabindex="0"` REMOVED from the
  noninteractive feed-line articles (a noninteractive element must not be a tab stop — the correct
  fix, and nothing in probes/tests/CSS depended on it; the `:focus-visible` rule remains harmless).
- Result: `svelte-check` **0 errors AND 0 warnings** (arm-svelte, working tree and clean extract);
  `vue-tsc` exit 0 on both vue arms (vue-tsc never saw them — the svelte checker's better a11y scope
  reconfirmed). No suppression comments anywhere.

## Parts A–F (the builds, not errata — receipted elsewhere)

- **A:** 5-row class-bridge table (`PART-A-CLASS-BRIDGE.md`); 3 new store files + 2 test files; all
  cells 0-diagnostics/build-green/build-graph-proven by reverted falsification probes; Pinia@11
  first-try green; Ernie's −11 did NOT reproduce (+1 L, ratio 1.020, method-labelled).
- **B:** SEALED-RECIPE.md (sha 7fcc3fc0432e29fae4c0d0d384f813da67cd05a0f591f5bb6746f85458e14f07),
  OWED/unrun by design; SECOND-AGENT-HANDOFF.md with the falsifier (flip ≥2.0× vs confirm <1.0×);
  Flip Bench extended (`flip-bench/flip-bench-sealed.mjs`) + run receipt (OPEN); E1 protocol §8.
- **C:** gate 5 amended (SLICE-DONE-PROPOSAL.md — build-green clause, strictest tsconfig named);
  `scripts/gate-manifest.mjs` + `scripts/gate-numerals.mjs`; before/after receipts
  (`receipts/gate-c2-rev6-fail.txt`, `receipts/gate-c2-rev8-pass.txt`, `receipts/gate-c3-rev6-hits.txt`,
  `receipts/gate-c3-rev8-clean.txt`).
- **D:** E3 sessions RAN in both arms; the Rev 6 "hang" root-caused (script killed npm, vite child
  survived) and fixed (process-group kill) — `scripts/e3-devtools-session.mjs` patched in both repos;
  receipts `receipts/e3-devtools-{vue,svelte}.json` + the Part A live probes.
- **E:** tokens.css header labelled (both arms byte-identical); --tc justified in place; RECEIPT.md
  C1 fidelity claim struck.
- **F:** VERDICT-REV-8.md (the restatement; lean quoted with no number).

## Honest notes (things this sitting got wrong first)

1. The nested-manifest regeneration was first run from a reset cwd and covered the whole sandbox
   tree — caught immediately, the real manifest was untouched, the stray file deleted, redone
   correctly (the lesson: pin cwd with absolute paths in every command).
2. The gate scripts took 2 repair cycles (node:crypto import; non-global regex in matchAll) —
   recorded in JOURNAL.md.
3. The negative-probe design needed two iterations: `export const x = slot;` is a value copy (warning,
   not error); `export { slot };` is the invalid-export trigger the gate targets.
