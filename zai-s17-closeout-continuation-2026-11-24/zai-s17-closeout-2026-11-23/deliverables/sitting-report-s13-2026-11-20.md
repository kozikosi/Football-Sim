# SITTING REPORT — Z.ai · 67 Cakepanz S13 · 2026-11-20 (the UI slices + the cutover handoff)

**Seat:** Z.ai · chat-only (no push credentials — this zip rides the Owner's relay).
**Base:** the reconstructed c12-state tree at engine pin `408410477` — validated by reproducing
EVERY c12 gate before any change: engine 430/430 · node 33/33 · board 15/0 · slot 28/0 ·
visual 15/0 · shell 48/0 · slice 29/0/10/3 · contrast 2/0.

## 1 · What I did

1. **Phase A (before any building — the S13 order's rule)** — `deliverables/SLICE-STATUS-2026-11-20.md`:
   one row per slice (1–5 + the season shell s6–s12), each BUILT with the exact file and the named
   laws that prove it, all re-run green this sitting. The honest findings: the c12 "complete shell"
   claim is TRUE, but slice 4 and slice 5 had no per-slice acceptance ROW (their proofs rode the
   node/shell batteries) — the audit supplies both rows; slice 3's c7 acceptance was still PENDING —
   CLOSED this sitting (`deliverables/ACCEPTANCE-p316-slice3-2026-11-20.md`). P-319 audited as
   ARCHITECTURAL: the display formats live in the engine's own `display.ts`
   (`ONE_DECIMAL_KINDS = ['qbr','wins','priority']` — integers except Wins/Priority at one decimal),
   the Wins column is the engine's `slotWins20` quantised by `valueprovider.ts`, every screen
   consumes the port VMs, and the "data export" fix is the new SEAM GOLDEN (below) — no display
   cases were added to `val()`.
2. **The reconstruction defect (found and fixed — the sitting's first real catch).** The c11
   delivery's `diffs/` set is a BYTE-IDENTICAL re-host of the c10 diff set (all 17 files, same
   baseline timestamps). My first reconstruction applied c10 then c11 — GNU patch detected the
   second application as "previously applied" and auto-REVERSED the first (batch mode), silently
   stripping the seed-code display from BoardFooter and reverting the other diff-chain files. The
   visual battery caught it: 11/4, W6/W8 failing with `code=` EMPTY (the footer had no
   `.cp-seedcode`). The corrected recipe (c9 + the diff set ONCE + the c11 whole files + the c12
   whole files + the re-pin) restored ALL gates. The recipe is written into START-OF-CHAT §2 so the
   next reconstruction cannot repeat it.
3. **Phase B — the slices:** slice 2 verified end-to-end by the slot battery (28/0: team + slot
   1–32 → START → the board drafts as that team in that slot; reload restores; pickSlot exercised
   in START) + shell S1–S4. Slice 3 closed (the acceptance receipt above). Slice 4 verified:
   N17 (the w88 anatomy), the shell season flow opens/closes the feed every played week, the
   chronology/OT/no-invented-data points audited against the engine's own `feed.ts` (regulation
   shows time LEFT, OT shows time INTO overtime, the `ot` summary block — the shell renders the
   mapper's shape). Slice 5 verified: N14 (five self-contained brags, no CDN, provenance inside),
   the draft card stamps `seed N (code b36:…) · engine …` via the product's own `seedToCode`.
4. **Phase B — the optional hardening (the c12 review's named item, now a law):** the staged
   Confirm button (`DraftBoard.svelte` `.cp-go`) had NO double-click guard and — worse — an
   unguarded `picked.id` dereference (a double-click after the banner disarmed THREW a page
   error). New `confirmPick()` (null-check + the same 380 ms guard window) → law **L22** in the
   board battery (a fast double click lands EXACTLY ONE pick, the banner disarms, zero page
   errors). The row chips only stage (idempotent), so they needed no change — the mapping is in
   the receipt.
5. **Phase B — P-319's data export:** `scripts/golden-seam.mjs` + `batteries/seam-golden.json`
   (the VM→JSON map): boardVM/goneOdds/lineupFor at seed 2026 through the product's own seam,
   canonical JSON, **N34** pins it (a re-pin that silently changes engine output fails at build;
   `--write` regenerates ONLY on a deliberate re-pin). Receipt: `golden-seam: WRITTEN … sha256
   e8fed8ab…` then `MATCH` on re-run.
6. **Phase D — the review items, each with its law:** **D2** `loadDraft` now calls
   `writeSeedToUrl` (a restored draft is shareable) → law **W12** (after a reload-restore the URL
   seed === the store seed; PASS: `url=b36:a3f2 store=470990`). **R2** the Team Select
   "New draft · new seed" affordance clears `?seed=` (visible whenever the tab is pinned; explicit
   replay untouched) → law **W13** (PASS: `pinned=1 cleared=true seed 470990→9112605 url=b36:5fbbx`).
   **b36 anchor** `seedCode.ts` rejects `b36:12abc###`/`b36:1.5`/`b36:12 34`/`b36:` instead of
   silently parsing a different seed → law **N35** (PASS; every valid form still parses).
7. **Phase D — the packaging class:** the verifier grew its **converse check** (hy4's finding —
   an unlisted extra file passed 36 OK/0 FAILED exit 0): the tree walk subtracts the manifest plus
   the two self-referential companions and names any EXTRA, exit 1. Proven with the planted-extra
   fixture (`scripts/verify-converse-proof.sh`: control exit 0 → `EXTRA (not in CHECKSUMS.txt):
   NOT-IN-MANIFEST.txt` exit 1 → clean exit 0). The README's four doc defects fixed (13b GUARDED
   wording; the verify path names the tree root; the stale "GNU md5sum is absent on a stock Mac"
   line corrected — Darwin md5sum exists, the node-crypto verifier stays THE method; the stale
   `5c808472/67` line corrected to "was → now 408410477/69"). The receipt script's sandbox path
   line now reads `node scripts/seed-roundtrip-receipt.mjs` from the tree root.
8b. **The closing composite:** the composite was PARTIAL at packaging time — steps 1–12 `EXIT_CODE=0`, step 13 begun, no steps 13b–17. The 13b verdict is the standalone `deliveries/receipts/partH-s13/falsify-board-13b-final.log` (ALL NINE CASES DIED, `FALSIFIER EXIT: 0`). File the finished tail into VERIFY §26 when it exists.
   (S14 correction, the order §4.3 — the earlier "ran END-TO-END at the final bytes" claim here
   overclaimed: `ACCEPTANCE-RECEIPTS.txt` (md5 `50f338e6…`) carries 15 `EXIT_CODE=0` steps —
   npm ci → engine 430/430 → precompile → node 35/35 → contrast → build → distfile → preview
   → slice 29/0/10/3 → shell 48/0 → board 16/0 → slot 28/0 → visual 17/0 → probes → the receipt
   falsifiers (steps 1–12) — and ends inside step 13 (`$ node scripts/shell-falsifier.mjs`, no
   output); steps 13b–17 are absent. The 13b verdict does NOT ride the composite: the standalone
   run-2 receipt above closes it. The S14 sitting files the finished composite tail into VERIFY
   §26.)

8. **Phase D — 13b (the c12 OPEN item):** the full 9-case hardened falsifier ran to completion
   for the first time. RUN 1: F0-board 16/0 + F0-shell 48/0 green; F15/F17/F18/F19/F21/F22 ALL
   DIED — FAIL L8/L10/L11/L12/L14/L15 named; **F20 = RED ELSEWHERE (exit 1 — a FAILURE, never a
   green), and the child log exposed a REAL DEFECT**: the L19–L22 staged-path legs used unguarded
   `.cp-suggest` locators, so the dead-ring mutant CRASHED the battery (TimeoutError at the staged
   expand) before L13 could evaluate — the same crash-before-L13 class the c12 hardening closed
   for L16/L17, reintroduced by this sitting's own L22 (and present in L19 all along). FIXED
   battery-side (no product change): the L18/L19/L22 legs are wrapped in the ring-present guard
   and SKIP LOUD on a dead ring, so L13 still evaluates. The fixed battery re-ran green on the
   clean bytes (16/0). RUN 2 (the fixed bytes, the final receipt): **ALL NINE CASES DIED, exit 0** — F0-board 16/0 +
   F0-shell 48/0 green; F15/F17/F18/F19/F21/F22 DIED — FAIL L8/L10/L11/L12/L14/L15 named; **F20
   DIED with the failing law NAMED — the strict form the order required**: the classification line
   `F13→F20 suggestion law · mutation: suggest={false} (the top-three highlight killed) · DIED —
   FAIL L16 the ring is PRESENT (3+ rows, C′1's minimum)…` (the first fail printed; the planted
   law is IN the named set), the mutant's own battery line
   `FAIL  L13 the top THREE available draft controls are highlighted by the board's active order —
   sampled early/mid/late; ids exact against the VM…` (the child log, port 4523), and the
   falsifier's closing summary `…L13 dies without the suggestion wiring…` —
   `FALSIFIER EXIT: 0`. **Stage 13b is therefore CLOSED on the named-law DIED** (the README line
   updated; the receipt is `deliveries/receipts/partH-s13/falsify-board-13b-final.log`).
9. **Phase D — T8 READY:** the four host notes' BLOCKED is superseded by
   `inbox/20261120-1814-zai-T8-c10-hosts-READY.md` (the two source paths, the md5, the relay
   procedure, the STOP rule, and the named-search-scope discipline the order demanded).
10. **Phase D — gh-pages re-point re-verified end-to-end:** fresh gh-pages extract → BEFORE
    `tests 286 / pass 277 / fail 9` → the Architect's patch (17e79b1, tests-only: lineup.test.ts +
    versions.test.ts) dry-run CLEAN (`patch -p1` from the archive root) → applied → AFTER
    `tests 286 / pass 286 / fail 0`. The relay lands it (the Owner's push).
11. **Phase D — the 390/768/1280 matrix** (the order's checklist addition):
    `scripts/viewport-matrix.mjs` — 3 widths × 15 surfaces = 45 checks, **0 overflow, 0 console
    errors, 0 page errors** (receipt `deliveries/receipts/viewport-matrix-latest.json`). The
    matrix counts console.error AND pageerror as failures.
12. **Phase C — the handoff package:** the six files in `deliverables/` (HANDOFF-SNAPSHOT with
    the per-file sha256 table of the five fence paths at the pin — 69 engine files byte-compared
    this sitting, zero mismatches; DISPATCHASYNC-WIRING naming the four call sites App.svelte
    :148/:178/:184/:208 with the reasons and the pending-contract flag; MERGE-MANIFEST with the
    exact paths into colors/, the single-source plan and the duplicate-engine deletion;
    CUTOVER-CHECKLIST with the gates and the matrix; CUTOVER-ONE-PAGER; ROLLBACK with the w89
    restore points). SNAPSHOT.md gained the S13 addendum; SHELL-STATUS.md regenerated by the tool
    at the final bytes (node 35/35 live, visual 17/17, the prefixed footer code `b36:a3f2`).
13. **Docs:** VERIFY gained this §25 append; START-OF-CHAT-ZAI §2 is rewritten for the next
    sitting; the bulletin entry is written; README carries the S13 banner with the new counts.

## 2 · Verified with raw output (receipts)

- The eight gates at the final bytes (node 35/35 · board 16/0 · visual 17/0 · slot 28/0 · shell
  48/0 · slice 29/0/10/3 · contrast 2/0 · engine 430/430) — each battery's own summary line, this
  sitting's prints.
- The falsifier run 1 log (all 9 cases + the crash diagnosis) and the run 2 final log —
  `receipts/partH-s13/`.
- The golden write + MATCH; the converse fixture (extra named, exit 1); the gh-pages BEFORE/AFTER
  (277/286 → 286/286); the viewport matrix JSON.
- W12/W13/L22/N34/N35's own PASS lines (quoted in VERIFY §25).

## 3 · Built, file-by-file (whole files ride the delivery)

| file | change |
|---|---|
| `src/lib/port/seedCode.ts` | the b36 payload anchor (N35) |
| `src/App.svelte` | D2: `writeSeedToUrl` in `loadDraft` (W12); R2: `seedPinned`/`syncSeedPinned`/`clearSeedParam` + the affordance wiring (W13); `syncSeedPinned` at boot and after every URL write |
| `src/lib/screens/TeamSelect.svelte` | the `seedPinned`/`onnewseed` props + the "New draft · new seed" affordance + CSS |
| `src/lib/components/DraftBoard.svelte` | the staged-Confirm guard `confirmPick` (L22) |
| `batteries/board.battery.mjs` | +L22; the L18/L19/L22 ring-present guard (skip loud on a dead ring — the F20 crash class fixed) |
| `batteries/node.battery.mjs` | +N34 (the seam golden), +N35 (the b36 anchor) |
| `batteries/visual.battery.mjs` | +W12 (the restore-shareability law), +W13 (the new-seed affordance law) |
| `batteries/seam-golden.json` | NEW — the VM→JSON map (the committed golden) |
| `scripts/golden-seam.mjs` | NEW — the golden generator/checker |
| `scripts/viewport-matrix.mjs` | NEW — the 390/768/1280 matrix probe |
| `tools/verify-package.mjs` | the converse check (the tree walk; EXTRA named, exit 1) |
| `scripts/seed-roundtrip-receipt.mjs` | the run line de-sandboxed |
| `README.md` | the S13 banner; the 13b GUARDED wording; the verify path; the md5sum wording; the pin-line correction; the new counts |
| `SNAPSHOT.md` | the S13 addendum (the re-verification, the gates, the golden, the handoff pointers) |
| `SHELL-STATUS.md` | regenerated by the tool at the final bytes |
| `VERIFY-§25-append.txt` | NEW — this sitting's verify section |
| `deliverables/SLICE-STATUS-2026-11-20.md` | NEW — the Phase A audit |
| `deliverables/ACCEPTANCE-p316-slice3-2026-11-20.md` | NEW — the slice 3 acceptance receipt |
| `deliverables/HANDOFF-SNAPSHOT-2026-11-20.md` | NEW — the engine-side cutover contract (the hash table) |
| `deliverables/DISPATCHASYNC-WIRING.md` | NEW — the four call sites for the merge |
| `deliverables/MERGE-MANIFEST.md` | NEW — what moves into colors/ |
| `deliverables/CUTOVER-CHECKLIST.md` | NEW — the gates + the matrix |
| `deliverables/CUTOVER-ONE-PAGER.md` | NEW — what Claude merges |
| `deliverables/ROLLBACK.md` | NEW — the w89 restore points |
| `deliveries/receipts/viewport-matrix-latest.json` | the matrix receipt |
| `inbox/20261120-1814-zai-T8-c10-hosts-READY.md` | NEW — the T8 READY note |

## 4 · Did NOT do, and why

- **No push** — no credentials; the zip is the delivery.
- **No engine edits, no pin moves, no ratings** — the snapshot is byte-identical to `408410477`
  (69/69 files proven); the engine diff vs Claude's head is empty.
- **No ring work, no multisport, no Contract B** — the Owner's words stand.
- **No make-live** — the w89 retirement note is prepared; the Owner executes.
- **No governance-file edits** — the only governance-adjacent writes are my own inbox note.

## 5 · Found that changes the plan

1. **The c11 diff set is a byte-identical re-host of the c10 diff set** — the reconstruction
   recipe "c10 diffs + c11 diffs" is WRONG and silently reverses the first application. Corrected
   and documented (START-OF-CHAT §2 + the sitting report). Any tree reconstructed the old way has
   a BoardFooter without the seed code — the visual battery's W6 catches it (11/4 → 15/0).
2. **The staged-path legs crashed the dead-ring mutant before L13** — the c12 hardening closed
   the crash class for L16/L17 but LEFT L19+ unguarded, and this sitting's L22 extended the crash
   surface. Fixed with the same skip-loud guard; the strict `F20 … DIED — FAIL L13` form can now
   manifest. RUN 2 (the fixed bytes, the final receipt): **ALL NINE CASES DIED, exit 0** — F0-board 16/0 +
   F0-shell 48/0 green; F15/F17/F18/F19/F21/F22 DIED — FAIL L8/L10/L11/L12/L14/L15 named; **F20
   DIED with the failing law NAMED — the strict form the order required**: the classification line
   `F13→F20 suggestion law · mutation: suggest={false} (the top-three highlight killed) · DIED —
   FAIL L16 the ring is PRESENT (3+ rows, C′1's minimum)…` (the first fail printed; the planted
   law is IN the named set), the mutant's own battery line
   `FAIL  L13 the top THREE available draft controls are highlighted by the board's active order —
   sampled early/mid/late; ids exact against the VM…` (the child log, port 4523), and the
   falsifier's closing summary `…L13 dies without the suggestion wiring…` —
   `FALSIFIER EXIT: 0`. **Stage 13b is therefore CLOSED on the named-law DIED** (the README line
   updated; the receipt is `deliveries/receipts/partH-s13/falsify-board-13b-final.log`).
3. **The dispatchAsync migration is 4 lines** — published in DISPATCHASYNC-WIRING.md; Claude's
   written contract is still pending and the merge should diff against this list.

## 6 · The Owner must do (the relay — numbered)

1. **T8 (four hosts):** md5-check `slice1-battery.json` (`0a2869538a706e7e6ea864664b7e5c9f`) from
   `~/Desktop/Football Sim/67-cakepanz-10-2026-11-19/_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/deliveries/receipts/slice1-battery.json`
   → `sh _agents/ernie/deliveries/tools/land-c10-repair.sh <host-pkg> <repair>` per host (beam,
   glyph, inkling, orcaink) → expect 49 OK / 0 FAILED / 0 missing, exit 0 → **STOP on any miss**.
2. **gh-pages test re-point:** apply `claude/patches/cakepanz-test-repoint-2026-11-20.patch` to
   `67-cakepanz/` (`patch -p1` at the branch root, or `-p5` from the subtree root — Beam's C31
   errata) → expect 286/286 (re-verified on a fresh extract this sitting).
3. **Land the S13 tree** (this zip's `cakepanz-4/`) as the deployed `67-cakepanz/` — the 69-file
   engine deploys with it (the c12 re-sync closes here). First command on the hosted bytes:
   `node tools/verify-package.mjs .` → expect every entry OK / converse clean, exit 0.
4. **make-live stays the Owner's call** — the w89 note is in ROLLBACK.md; do not execute early.

## 7 · The Architect must do

1. Merge against the handoff package (the golden must MATCH through the colors/ paths).
2. Publish the WRITTEN dispatchAsync shell contract (still pending — diff it against
   DISPATCHASYNC-WIRING.md).
3. Run the cutover battery (the slice battery's 3 DEFER items need both trees).

## 8 · Could not verify (UNKNOWN), and why

- The live gh-pages index.html's sha over the wire (no live-site fetch from this sandbox) — the
  `dbb8c27a…` identity is c12's measurement (REPORTED here) + this sitting's tip-level check.
- The T8 landing on the real hosts (no write access) — the relay executes it; the refusal path
  was verified at c12.
- The acceptance composite (§25/§1.8): the composite was PARTIAL at packaging time — steps 1–12 `EXIT_CODE=0`, step 13 begun, no steps 13b–17. The 13b verdict is the standalone `deliveries/receipts/partH-s13/falsify-board-13b-final.log` (ALL NINE CASES DIED, `FALSIFIER EXIT: 0`). File the finished tail into VERIFY §26 when it exists.

## 9 · Next sitting's first three items

1. Read the falsifier run 2 verdict (`receipts/partH-s13/falsify-board-13b-final.log`): record steps 13b–17 from the finished composite into §26 when the tail exists; 13b is already CLOSED on the named-law DIED (§1.3).
2. The relay's after-state (T8 49/49 ×4, gh-pages 286/286, the S13 landing verify) — receipts
   back into VERIFY §26.
3. The merge: Claude against the handoff package; the golden MATCH is the first gate.

## 10 · The zip's own checksums

`CHECKSUMS.txt` at the package root: md5 + path, no self-entry, verified by
`node tools/verify-package.mjs .` (the converse clean line included); `unzip -t` clean; the zip's
sha256 is printed in the chat reply for the relay record.
