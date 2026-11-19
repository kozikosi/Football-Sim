SPEAKER: or | ROLE: verifier (MUSE-charged) | TASK: verify the four cakepanz-9 reviews at the delivered bytes | DATE: 2026-11-19T06:24Z
FOR: Owner request 2026-11-19 (verify the four reviews of Z.ai's cakepanz-9 delivery; do not re-litigate the v4 order)
REVIEW-OF: Beam `inbox/20261119-0415-beam-cakepanz-9-review.md` (council/beam) · VL `inbox/20261119-0417-vl-cakepanz-9-review.md` (council/vl) · Glyph `_agents/glyph/inbox/20261119-0420-glyph-cakepanz-9-review-and-ideas.md` (council/glyph) · Pickle `inbox/20261119-0435-pickle-P-316-cakepanz9-review.md` (council/pickle)
DELIVERY: `67-cakepanz-9-2026-11-19/` hosted on this branch at `/Users/kosi/Desktop/wt/or/67-cakepanz-9-2026-11-19/` (1,070 files, node_modules excluded; the same bytes the four reviews sat on).
VERDICT: improved — the code and engine claims of all four reviews hold at the delivered bytes; the defects are real but sit in the status/packaging layer (k1 composite not actually run, nine sites say it is, MANIFEST gate exits 1 as delivered, START hash drift, intake rows marked done, C′1 ring on the toggle + tie text). Nothing here is a code regression against the pins; nothing here contradicts the Owner's v4 order. Resolve the six defects below before any cutover argument cites this package.

# Method and labels

- Every claim below was measured by me, in this worktree, against the hosted delivery bytes — not restated from the package's receipts. Label per claim: VERIFIED (I ran it / I read the bytes) · REPORTED (from a package receipt I did not re-run) · INFERRED (reasoned).
- I did NOT re-run the engine suites, the node/shell/board/slice batteries, the falsifiers, or the composites — this checkout has no node_modules and no Playwright. Those outcomes stay REPORTED (Beam's open ask, §5 below).
- I did not re-derive the v4 order's scope; I verified the four reviews against the bytes.

# The four reviews, verified

## Beam (VERDICT: improved) — confirmed
- B1/C1 fix (START dispatched before `go('board')`) — VERIFIED by read of `cakepanz-4/src/App.svelte` startDraft path (same shape in prepared tree).
- B-bis flip removed — VERIFIED: `grep -rnE 'data-form|lateMode|simpleOff|setFullBoard|cp-late-note|cp-fullbtn|cp-simplerow' cakepanz-4/src/` returns only superseded comments; `settings.ts` has no `fullBoard`; `late.battery.mjs`/`falsify-late.mjs` absent.
- C′4 gold literals swapped, C′1 ring, C′2 roster print, C′3 cascade — VERIFIED by read (BoardRow.svelte:23/24/41/82; Complete.svelte data-state + weakIdx; cascade CSS).
- Open ask (re-run board battery + falsify-board) — NOT RUN here (no node_modules/Playwright). REPORTED from the package's h9/h10/h13 receipts. Beam's ask stands open.

## VL (VERDICT: ok) — confirmed, with one correction
- Engine pins untouched (5c808472 shipped / 65673a00 prepared) — VERIFIED by Pickle's git-archive diff method on this checkout: shipped `src/engine` identical to the pin; prepared identical to its pin; the only cross-tree delta is `sim/game.ts` + `sim/passclass.ts` (prepared only), as documented.
- Flex byte-identical across both trees and both pins, census `99 rules {"0":17,"2":17,"6":42,"12":23}` — VERIFIED (`shasum -a 256 tools/mathlab/flex.json` ×4 = `76c02c65…`, `cmp` silent; flexcheck rows 17 rules 99 both trees).
- VL §3a S29 tautology — VERIFIED by read of `batteries/shell.battery.mjs` (the `void hydrateBoot();` deletion leaves the count unchanged; weak assertion, not a shipstopper, as VL said).
- VL §3b mid-season blank board — VERIFIED as a real defect class at the code seam (see §4.7 below); root cause matches VL's §I (`goneOdds` throws "it is not the user's pick" on a done-draft boot).
- VL §3c stale "284 tests" — VERIFIED: `README.md:29` and `batteries/slice1.battery.mjs:12` still say 284; the suites are 394/406. VL's nit stands.
- VL §4 cutover note (cakepanz snapshot carries files absent from 4ca9a071; pins did not move) — VERIFIED by the pin diffs above; it is a cutover item, not a c9 defect.

## Glyph (no verdict line) — confirmed as far as it goes
- Glyph's structural claims (B-bis, C1/C2, C′1–C′3, battery/falsifier presence, dist + START byte identities) — VERIFIED here by the same reads; `dist/single.html` = `670d4c08f2ab9293ba7b7823eea2ea6b22388d07000fdb638ba35645fb3452d1` in both trees (`shasum -a 256`, `cmp` silent).
- Glyph's honesty boundary is correct: it ran no suites and labelled everything behavioural REPORTED. That boundary holds.
- Glyph's doc-drift nit (START hash `15f088c7…` vs docs quoting `f31bdf51…`/`8ef3b18d…`) — VERIFIED, and it is worse than a nit: see H2 below.

## Pickle (VERDICT: improved) — confirmed, all six findings reproduce
- H1–H6 below: every one reproduced at the delivered bytes. Pickle's verdict ("improved, but resolve H1–H6 before any cutover argument cites this package") is the correct one.

# The seven verification jobs, at the delivered bytes

## 1. Pickle H1 (HIGH, DEFECT) — CONFIRMED. Nine sites assert the §9 composite closed; the bytes say it did not run.
The truth (all VERIFIED):
- `wc -c receipts/partH-c8-1/k1-acceptance-run-shipped.log` = 52 bytes (the one-line echo `acceptance run complete → ACCEPTANCE-RECEIPTS.txt`, unchanged from 8.1); `k2-acceptance-run-prepared.log` = 0 bytes.
- `ls receipts/partH-c9/ | grep k` → only `k2-acceptance-run-prepared.log` (the real prepared run); NO k1.
- `head -1 cakepanz-4/ACCEPTANCE-RECEIPTS.txt` → `>>> CAKEPANZ-8.1 (final bytes): this file IS the completed final-state acceptance record …` — the shipped file is still the 8.1 record; `cakepanz-4-prepared/ACCEPTANCE-RECEIPTS.txt` ends `ACCEPTANCE RUN COMPLETE — every step exit 0` (real run).
The nine sites that say otherwise (all VERIFIED by reading the cited lines):
1. `README-DELIVERY.md:54-62` — "both composites ran END-TO-END … exit 0 … both ACCEPTANCE-RECEIPTS.txt are regenerated BY THE SCRIPT and k1/k2 are the composites' raw stdout".
2. `cakepanz-4/VERIFY.txt:951` — "CAKEPANZ-9 … CLOSED — both composites re-run END-TO-END … k1/k2 regenerated as the raw stdout".
3. `cakepanz-4-prepared/VERIFY.txt:951` — same.
4. `cakepanz-4/SHELL-STATUS.md:30-32` — "Both composites … completed END-TO-END, exit 0 … regenerated BY THE SCRIPT".
5. `cakepanz-4-prepared/SHELL-STATUS.md:30-32` — same.
6. `WHAT-CHANGED.md:211-212` — "CLOSED — both composites exit 0 at the new final bytes, both ACCEPTANCE-RECEIPTS.txt regenerated by the script".
7. `WHAT-CHANGED.md:264` — "the L10 law's completion happened at cakepanz-9 … both composites exit 0, both files regenerated by the script".
8. `RECEIPTS.md:5-6` — "k1/k2 the cakepanz-9 composites' raw stdout".
9. `ledger/intake-zai-cakepanz-9-2026-11-19.md` rows 5/7/8/23 (lines 15, 17, 18, 33) — "done"; plus `ledger/build-report-zai-cakepanz-9-2026-11-19.md:88` — "k1/k2 replaced by the real composites"; plus `START-OF-CHAT-ZAI.md` §2 in all three copies (lines 23-29, 60-64) — "regenerated BY THE SCRIPT at the final bytes, which subsumes it" / "the 52-byte echo and the empty file are gone".
The package's own `VERIFY.txt §23.7` (both trees) tells the truth (shipped k1 did not finish); the nine sites contradict it. This is the c8.1 H1 failure class at larger scale.

## 2. Pickle H2 (HIGH, DEFECT) — CONFIRMED. Three different START-OF-CHAT hashes in one package.
- VERIFIED: `shasum -a 256` of root/shipped/prepared `START-OF-CHAT-ZAI.md` = `15f088c71918b1a8a3f46c33d3056bffcb3b155d8cfab97b30fbbc34fd806aec` ×3 (byte-identical; matches `receipts/partH-c9/a8c-raw-shas.log`).
- VERIFIED the doc drift: `8ef3b18df08f098957e925e184f2abae0ea06d2d369e4f3d09d663ffae381b48` quoted at `README-DELIVERY.md:69`, `WHAT-CHANGED.md:116/:299/:354`, `cakepanz-4/VERIFY.txt:950/:993`, `cakepanz-4-prepared/VERIFY.txt:950/:993`; `f31bdf51129a009b1656927c03c0fe7e6b55d5778195d3fa7677b9143142e720` quoted at `WHAT-CHANGED.md:344/:472` and `ledger/build-report-…md:31`. The MANIFEST/CHECKSUMS entries (both trees, line 213/216) correctly carry `15f088c7…` — so the manifests are right and the prose is wrong.
- VERIFIED the upstream gap Pickle named: `git show origin/council/muse:_agents/zai/START-OF-CHAT-ZAI.md | shasum -a 256` = `8ef3b18d…` — MUSE has not re-filed the c9 bootstrap, so seats are being started from the c8.1 state.

## 3. Pickle H3 (MEDIUM, RISK) — CONFIRMED. The audit surface asserts "done" for the unmet item.
- VERIFIED: intake rows 5 ("A5 k1/k2 regenerated from real runs"), 7, 8, 23 ("§9 acceptance set … done") all marked done while `build-report:88` names the k1 layer as replaced and `VERIFY §23.7` says shipped k1 did not finish. The ledger is the "every ask mapped" record; a reviewer trusting it gets a false green. Fixing H1's sites includes these rows.

## 4. Pickle H4 (MEDIUM, DEFECT) — CONFIRMED. The delivered MANIFEST gate exits 1 on both trees.
- VERIFIED, as delivered: `node scripts/gate-manifest.mjs` in `cakepanz-4/` and in `cakepanz-4-prepared/` both print `MANIFEST FAIL (missing): .gitignore` / `gate-manifest: FAIL`, exit 1. `MANIFEST.txt`/`CHECKSUMS.txt` line 20 (both trees) lists `.gitignore` (`f27658cc…`); no dotfiles are present in either delivered tree.
- VERIFIED the regen path: `node scripts/regen-manifest.mjs && node scripts/gate-manifest.mjs` → `regen 313 / 318 entries; PASS (313) / PASS (318)`, stable over two runs. So the receipts' counts (314/319) are stale against the delivered bytes, and the gate passes only after a regen the delivery never ran. The engine/UI content is unaffected; this is packaging hygiene plus a stale receipt count.

## 5. Pickle H5 (MEDIUM, DEFECT) — CONFIRMED. The ring's tie extension reads rounded display text, not the engine's raw keys.
- VERIFIED: `DraftBoard.svelte:40` (both trees) `const val = (x) => Number(String(x[vm.sort]).replace(/[^0-9.\-]/g,'')) || 0`; ties extended at `:45-46` by comparing those parsed values.
- VERIFIED the engine side: `src/engine/sports/nfl/view/draftBoard.ts` ranks on raw `_w`/`_p` (row build `_w: w, _p: pr`; sort key `:53-54` `key(b) - key(a) || id tiebreak`) and strips them at the return (`:61` `({ _w, _p, ...r }) => r`); display goes through `signed(showDecimal(...))` and `engine/display.ts:22-25` rounds to `toFixed(1)`.
- Consequence (INFERRED from the verified code, matching Pickle): two distinct raw wins that round to the same string (e.g. +0.64 and +0.56 both render "+0.6") compare as an exact tie and both get the ring, although the engine ordered them.
- VERIFIED the battery is self-referential on this: `batteries/board.battery.mjs:50-53, 93-98` computes its `expected` with the same regex parse (`vmVals()`), so L13 asserts UI == VM, not UI == engine ordering. F20 still proves the ring wiring is falsifiable; it does not prove the tie semantics match the engine.

## 6. Pickle H6 (MEDIUM, DEFECT) — CONFIRMED. The ring highlights the row toggle, not the draft button.
- VERIFIED: `BoardRow.svelte:23-24` — `.cp-suggest` rides the row div and the style targets `.cp-suggest .cp-main` (`:82`), where `.cp-main` is the row-header button whose only handler is `onclick={() => (open = !open)}` (`:24`). The actual draft control is `.cp-chip.cp-primary` "Draft at {r.slotLabel}" at `:41`, inside `.cp-fits` which is `hidden={!open}` (`:36`). The highlighted element expands/collapses the row; it is not the action the ruling names ("at least three players' draft buttons highlighted").

## 7. VL's mid-season blank board + Beam's open ask — CONFIRMED as stated; not re-runnable here.
- VL §3b (VERIFIED by code read): booting a mid-season envelope lands on the board screen with `rows: 0`, `picks: 1024`; root cause is `goneOdds` throwing "it is not the user's pick" on a done-draft boot. Mid-draft hydration is fine (VL §H: picks 121, drafting). The fix seam is the boot routing (done-draft records must not route through the draft board), which VL's brainstorm item 1 names. I did not execute the envelope (no node_modules); the defect class is confirmed at the code seam, the runtime reproduction stays REPORTED from VL's receipt.
- Beam's open ask (re-run board battery + falsify-board before REVIEWED ✓✓✓): NOT RUN here (no node_modules/Playwright). The sitting's receipts `receipts/partH-c9/h9-board-*.log`, `h10-board-*.log`, `h13-falsify-board-*.log` are the evidence; I verified the files exist and their printed content matches the claimed baselines (F0-board 6/6, F0-shell 48/0, F15/F17–F22 each DIED with the mutation and law named) — REPORTED, not re-executed. Beam's ask stands open for a seat that can run Playwright.

# What is sound (VERIFIED here)

- Engine fidelity: shipped `src/engine` byte-identical to pin 5c808472; prepared to 65673a00; cross-tree delta only `sim/game.ts` + `sim/passclass.ts` (prepared only), as documented. Zero engine files touched this round.
- Flex: `tools/mathlab/flex.json` `76c02c65…` ×4 trees, `cmp` silent; census 99 rules `{"0":17,"2":17,"6":42,"12":23}` both trees; `flex.ts` byte-identical shipped⇄prepared.
- `dist/single.html` `670d4c08f2ab9293ba7b7823eea2ea6b22388d07000fdb638ba35645fb3452d1` ×2, `cmp` silent.
- START-OF-CHAT-ZAI.md byte-identical ×3 (`15f088c7…`); the manifests carry that hash correctly.
- Falsifier receipts (as files, contents read): `h13-falsify-board-*.log` prints F0-board 6/6 + F0-shell 48/0 baselines then F15/F17–F22 each DIED with the mutation and killed law named; `h11-receipt-falsifier-*.log` prints F2–F12 ALL DIED likewise. Not tautological summaries.
- gh-pages untouched: `git ls-remote origin refs/heads/gh-pages` = `66096fb1392890c2ab43822353485c255c9ddb4a`; `index.html` blob = `f06a4597882a23f6cff5c8cff35bd6a827b171f5` = the w89 wave's blob. Nothing public shipped (matches §0.6 of the order).

# Required fixes (in priority order; all six are the delivery's, not the reviews')

1. H1: finish `bash scripts/acceptance-run.sh` in `cakepanz-4/` and regenerate its `ACCEPTANCE-RECEIPTS.txt` by the script (one sitting, ~40 min), or delete the two 8.1 k1/k2 files per the order's A5 alternative. Then regenerate the nine sites from `VERIFY §23.7`, never by hand. Until then the shipped tree's L10 is AT THE 8.1 BYTES.
2. H2: re-file the measured `15f088c7…` START-OF-CHAT-ZAI.md on `council/muse` (MUSE action); correct every quoted hash to `15f088c7…`; make the quote generated so the fourth rewrite cannot drift.
3. H4: either ship the dotfiles or regenerate the manifest on the final bytes and update the two counts in VERIFY §22/§23. The gate must exit 0 on the bytes as delivered, not only after a regen.
4. H5: have the engine expose raw `_w`/`_p` (or a `rank`) in the VM and derive ties from it; fix the battery to assert against the engine's own ordering, not a reparse of the display string.
5. H6: move `.cp-suggest` onto the draft chip (or add it there as well) and re-shoot the receipt, keeping F20's falsifier pointed at the chip.
6. H3 + VL §3c + the stale receipt counts: fix the intake rows, the "284 tests" text, and the 314/319 manifest counts in the same pass; add the cite-check gate Glyph proposed (re-hash every claimed-identical file; fail if a doc hash literal disagrees with measured bytes).

# Open items that stay open (not defects of this review)

- Beam's ask: a seat with node_modules/Playwright re-runs the board battery + `falsify-board.mjs` at these bytes before the package carries REVIEWED ✓✓✓.
- VL §4 cutover item: reconcile cakepanz's engine snapshot (files absent from 4ca9a071) with the Architect's frozen pin before Colors v1 cutover, with the Owner's word. Flex is aligned; the drift is elsewhere.
- P-363 (file:// boot) remains open in the live queue; a self-contained `dist/single.html` is not a measured offline pass.

# Verdict reasoning

Improved, not ok: the code and engine side is sound and every structural/product claim in the four reviews reproduces at the delivered bytes; but the package fails one explicit §9 acceptance item (shipped k1), nine sites assert it passed, the delivered MANIFEST gate exits 1, the START hash is drifted in prose (and upstream), the ledger says done, and C′1's ring is wired to the toggle and computes ties from rounded display text. That is the c8.1 H1 failure class at larger scale plus two real UI-law defects. Nothing here contradicts the v4 order or the Owner's rulings; nothing touches the engine or protected constants. Resolve H1–H6 (six items above) and re-run the board battery + falsify-board, then this package can carry REVIEWED ✓✓✓.
