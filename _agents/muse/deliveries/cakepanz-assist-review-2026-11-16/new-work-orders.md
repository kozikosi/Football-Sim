# Cakepanz assist round — new work orders

**Source:** the v4 council round, reviewed in full in `review-synthesis.md` (same directory). Every item below states what it IS, the evidence that motivates it (seat + receipt), what acceptance looks like, and which queue ID it belongs under.

**Rules that govern these items:** work comes from the queue — these are proposed items, not assignments. No item is assigned to a named seat. Only the Architect builds the product/engine. Z.ai builds inside 67 Cakepanz only. The council reviews and verifies.

**Labels:** VERIFIED / REPORTED / INFERRED / UNKNOWN, as in the synthesis.

---

## A. For the Architect (Claude — engine / product)

### A1. Re-pin the carried test expectations with the snapshot and `flex.json`, in one green commit
**What it is:** the deployed gh-pages tree's engine suite fails 9 of 286 laws because the re-pin moved `src/engine/**` and `tools/mathlab/flex.json` to the 99-rule table while the carried test expectations still assert REV 4. Move the snapshot, `flex.json`, **and** the carried expectations together, and ship the suite green in the same commit. The E5 stamp re-pin is the Architect's alone — Z.ai must never edit that number.
**Evidence:** Pickle, Part 10 filing — `node --test --experimental-strip-types test/engine.test.ts` on the gh-pages tree: "tests 286 · pass 277 · fail 9", the nine listed verbatim (flex REV-4 table equality QB→FS 12 vs −10; penalties 0/2/4/6; REV 3/REV 4 rulings; NICKEL/DIME free; DL5 natural; no-arbitrage TE>FB>RB 2<6, TE>OG>OT 8<12; base totals; 3-4 lineup; E5 pins `nfl1.14a4e9333e888a` vs `nfl1.0e237387b2647f`). Cause VERIFIED: `test/engine/nfl/lineup.test.ts:16` reads `tools/mathlab/flex.json`. Corroborated by Ernie (same 9 failures, named) and Inkling (Swap A: 277/9).
**Acceptance:** the tree's engine suite runs green (286/0) at `d3bd81d2`; a future re-pin that moves the flex table moves the expectations in the same commit. Council verifies by re-running the suite on the re-pinned tree.
**Queue ID:** NEW — proposed title: "Re-pin carried engine-test expectations with every engine re-pin". (Related: P-211 queue hygiene does not cover this; it is a standing re-pin rule, not a queue item.)

### A2. Add the four box-score assertions (D3 — test-only)
**What it is:** four assertions as event-log identities in `sim-slice.test.ts` (Pickle's Part D shape, preferred; MUSE's and Inkling's shapes are compatible), at or after the next pin commit: (1) firstDowns = plays with `firstDown`; (2) puntYards = sum of `kickYards` over punt plays, and `netYards` must still exclude them; (3) touchdowns = drives ending `td`, independent of the score; (4) turnover spot = `d.end.next.ydl` per `drive_end` with `result === 'to'`. Not as constants — constants become the tautology this exercise exists to find. No box-score field is added; the spot already exists as `drive_end.next.ydl`.
**Evidence:** the D3 settlement in `review-synthesis.md`. MUSE ran all four mutations at `86f22d10` (all survive, 12/12 on the 1b suite, 363/363 full suite; M4 liveness 198/200). Pickle ran all four at two commits (`86f22d10`: 363/363; tip `a062597f`: 378/378 — all survive). Inkling reproduced six survivors at `86f22d10` (Ernie's three + sacksTaken, rushYards, passYards). GLM ran doubling mutations plus a killing control (interceptions/giveaways `+= 2` killed, 362/363, proving the harness works). Pickle's refinement: the spot IS computed at `drive.ts:136` (`next = { team: opp, ydl: min(touchbackYdl, max(1, 100 - ydlAfter)) }`) but is unasserted — so the fix is test-only, not a modelling change.
**Acceptance:** each of the four mutations, applied to the engine, is killed by the suite (at least one failing law naming the mutation). Council verifies by re-running the mutation set. NOTE: this is the Architect's test file, not the shell battery — the shell battery becomes responsible for these laws only from the next re-pin that pulls `sim/` into the shell's `src/engine/` (Pickle's scope corollary).
**Queue ID:** NEW — proposed title: "Box-score assertions: firstDowns, puntYards, touchdowns, turnover spot (D3)". (Related: P-333 flex derivation does not cover this; it is a test-gap item.)

### A3. P-317 store change: persist the draft position in the save
**What it is:** the store change that unblocks Team Select picking team AND draft position (slot 1–32). The engine side is ready (`newDraft` takes `order`). The store must: accept a slot in START (validated like `userTeam`, 0..31); persist it in `DraftPayload`; build the order from it; have `restoreDraft` rebuild with the stored order (today it always rebuilds default snake and throws `'save: pick N is out of order'` on mismatch); and ship a slot-17 round-trip law (`st.order[17] === userTeam`, pick log replays).
**Evidence:** Ernie (Part 4 filing) — `store.ts:30` START only `{seed, userTeam}`; `saves.ts:27-31` `DraftPayload {seed, userTeam, picks, pool}` with no slot/order; `store.ts:66` `restoreDraft` calls `newDraft` with no order; `store.ts:69` the throw. Inkling (Part 4 filing) — engine `draft.ts:44,52` `newDraft(players, rng, cfg, order = snakeOrder())`; save has no order/slot field; restore always default snake. VL (Part 4 filing) — verified the same chain independently.
**Design choice for the Architect (the two filings differ):** Ernie proposes `DraftPayload.slot?` + an `orderFor(userTeam, slot)` builder (take `snakeOrder()`, remove userTeam, splice in at slot) — smaller. Inkling proposes `DraftPayload.order?: number[]` storing the **resolved 352-pick array, not the slot** — "the robust choice: future changes to how the custom order is built can't silently remap old saves." Inkling's shape is more robust; Ernie's is smaller. **Naming caution (Ernie, flagged by the reader):** `DraftPick` already has a `slot: string` field (the per-pick roster slot) — a `DraftPayload.slot` would collide; rename (`draftSlot` / `position`) or document loudly.
**Acceptance:** a save made at slot 17 restores to the same draft order (the round-trip law passes); a save made under the old format still restores (default snake). Council verifies by running the round-trip law and a restore of an old-format save.
**Queue ID:** P-317 (Team Select must let the user pick team AND draft position, slot 1–32).

### A4. Export the season-length constant from the engine
**What it is:** one line — export the season length from engine `season.ts` and have both sides consume it, so the shell and the engine stop duplicating the literal `<= 22`.
**Evidence:** Ernie D5 — `savesApp.ts:59` `nextWeek <= 22` (shell). GLM peer review — CONFIRMED double-sided: the engine's own `weekmap.ts:73` uses the same literal; sharpened the fix direction to an engine export consumed by both sides.
**Acceptance:** no `22` literal remains as a season length in either tree; the shell reads the engine's constant. Council verifies by grep.
**Queue ID:** NEW — proposed title: "Export season length from the engine; stop duplicating `<= 22`". (Small; could ride with A1 or A3.)

### A5. Decide the feed "touchdown" string
**What it is:** the engine's feed string `feed.ts:88` `TD: 'ends in a touchdown'` is rendered verbatim by the shell, and the word "touchdown" is banned by the style law (see the Owner-ruling flag below — the law's source needs a citation first). If the law stands, the Architect changes the engine string. 'Scores a touchdown' is NOT a fix — the word itself is banned. Suggested replacements: 'finishes a drive' / 'punches it in'. Alternative: Z.ai adds a summary transform in `feedVM.ts` (lines 106–115) — see B5.
**Evidence:** Ernie (Part 11 filing) — VERIFIED, 5 of 22 feed lines (`receipt-feed-copy.txt`); GLM peer review — CONFIRMED the fact on both trees. GLM's flag: zero hits for the law's source across `origin/council/muse` — the LAW is UNKNOWN until the Owner or Ernie cites where it is written.
**Acceptance:** after the Owner cites the law (or rules it out), either the engine string no longer contains "touchdown", or the shell transform is in place (B5) — not both, and not neither. Council verifies by grep on the feed output.
**Queue ID:** NEW — proposed title: "Feed copy: remove 'touchdown' from the engine string (or shell transform)". Blocked on the Owner-ruling item 7 in the synthesis.

### A6. Choose the seam shape (Architect's call, with Z.ai)
**What it is:** the 65 engine imports in 15 shell files need one door. Two INFERRED shapes compete (both reduce the same 65 imports; GLM's and Inkling's seam-checkers fit either): DS's one `src/lib/engine.ts` facade + typed `EnginePort`, vs Pickle's six domain seam modules (`seam/board|roster|league|season|saves|core.ts`) with M1's grep re-scoped to "outside `src/seam/`". Ernie/Inkling propose one `src/lib/enginePort.ts` (six commands + SNAPSHOT.md). This is a design choice for the Architect (with Z.ai, who builds it) — not a council vote.
**Evidence:** Part 2 settlement in `review-synthesis.md` (M1 FAIL unanimous; 15 files / 65 lines, coordinator-verified; no adapter exists).
**Acceptance:** the seam exists as a module (or modules) that the 15 files import through; M1's grep passes ("no engine import outside the seam"); a re-pin is a one-directory swap + inventory update. Council verifies by re-running the grep and the seam-checker.
**Queue ID:** NEW — proposed title: "Build the one-door engine seam (65 imports → one door)". Note Pickle's sign-off order: the green suite on `d3bd81d2` (A1) comes **before** the seam modules — "a seam wrapped around a red tree is documentation of a defect."

---

## B. For Z.ai (67 Cakepanz shell)

### B1. Fix the gh-pages README pin line (one line)
**What it is:** update the gh-pages README lines 4 and 9: `4ca9a071` → `d3bd81d2`, "52 TypeScript files" → "57 files". The re-pin commit `66096fb1` moved the engine but never touched the README.
**Evidence:** Inkling (Part 10 filing) — gh-pages README lines 4 and 9 still say `4ca9a071` / 52 files; re-pin `66096fb1` never touched the README. Confirmed by Pickle (blob-hash compare), DS (README stale; s5 README correct for itself), GLM (amended filing), MUSE (three-way framing), and the coordinator's own diffs.
**Acceptance:** the README names `d3bd81d2` and 57 files; a reader comparing README to tree finds no discrepancy. Council verifies by reading the README against `diff -rq`.
**Queue ID:** NEW — proposed title: "Fix the gh-pages README pin line (4ca9a071 → d3bd81d2, 52 → 57 files)". Trivial; do it with the next shell delivery.

### B2. Re-pin the shell of record to `d3bd81d2` and re-run the battery
**What it is:** move the 11 engine files (6 replaced + 5 new — GLM's R-H list: `core/app.ts`, `sports/nfl/app/dataset.ts`, `sports/nfl/engine/draft.ts`, `sports/nfl/engine/flex.ts`, `sports/nfl/engine/slots.ts`, `sports/nfl/engine/value.ts` replaced; `core/events.ts`, `core/fold.ts`, `core/keyedrng.ts`, `core/pack.ts`, `sports/nfl/engine/legacyprovider.ts` added), plus the carried test expectations (see A1 — the expectations move with the snapshot, and the E5 stamp is the Architect's), then re-run the battery and re-receipt the flex values. The s5 delivery still ships the pre-99-rule engine (QB→FS 10, not 12).
**Evidence:** GLM (Part 10 filing) — the 11-file re-pin gap; the shell's flex prices, slots, draft and value math all come from `flex.ts`/`slots.ts`/`draft.ts`/`value.ts` at `4ca9a071`, which predate the 99-rule flex table and the QB→FS −12 ruling. DS (Part 10 filing) — re-pin = "moving 11 engine files (6 replaced + 5 new)… an engine update, not a doc edit." MUSE (Part 10 draft) — the s5 delivery ships the pre-99-rule engine. Inkling Swap A: battery 75/0/10/3 at `d3bd81d2` (REPORTED — counts asserted, appendix not pasted); Ernie Swap: battery 61/0/10/3 on his tree.
**Acceptance:** the shell-of-record tree is byte-identical to `d3bd81d2` in `src/engine/`; the battery runs green at `d3bd81d2` with the full output pasted in the delivery; the flex-chip law values are re-receipted (they change with the pin — Ernie's swap: OVR sort 99→98, flex chips 35→1, needs filter 60→18→16). Council verifies by `diff -rq` and by re-running the battery.
**Queue ID:** NEW — proposed title: "Re-pin the Cakepanz shell of record to d3bd81d2 (11 engine files + expectations + battery re-run)". **Blocked on the Owner naming the shell of record** (synthesis, Owner-ruling item 1). GLM's INFERRED recommendation: s5 + the 11-file re-pin + rev2's post-s5 fixes folded in.

### B3. Build the one-door seam (65 imports → one door)
**What it is:** the shell-side build of A6, in whichever shape the Architect picks (DS's single facade, Pickle's six domain modules, or Ernie/Inkling's `enginePort.ts`). Also: move `draftStore.ts` to `bindings/` (it is a deliberate Svelte binding living beside neutral modules — Pickle, DS, Ernie agree); fold `ink.ts` into the seam (Pickle); split `bragCard.ts` so `document` leaves `src/lib` (`bragCard.ts:155` `document.createElement('canvas')` breaks node-side fixture rendering — Pickle, new defect); write the M4 handoff docs — SNAPSHOT.md with per-file hashes in GLM's/Inkling's checker format (the checker is ready to consume it); document the battery's global-Playwright assumption in SNAPSHOT.md (GLM).
**Evidence:** Part 2 settlement (15 files / 65 import lines, coordinator-verified; no adapter; no SNAPSHOT.md). DS (Part 3 filing) — `draftStore.ts:3` is the only `svelte` import under `src/lib` besides render files. Pickle (Part 3 filing) — `bragCard.ts:155` `document` defect; draftStore belongs in `bindings/`. GLM (Part 2/15 filing) — seam-checker delivered, ready for the handoff inventory; battery's global-Playwright import (`Cannot find module '~/.npm-global/lib/node_modules/playwright'` on a bare checkout).
**Acceptance:** M1's grep passes (no engine import outside the seam); the seam-checker (Inkling's or GLM's) passes against Z.ai's real inventory (exit 0); a one-byte falsifier in any engine file fails loudly naming the file (exit 1). Council verifies by re-running the grep and the checker, including the falsifier.
**Queue ID:** NEW — proposed title: "Build the one-door engine seam + SNAPSHOT.md handoff inventory". Sequencing: after A1 (green suite first — Pickle's sign-off order).

### B4. Single-file / file:// build fix
**What it is:** make the built shell boot from `file://` (offline is a hard requirement). Strip `crossorigin` from the asset tags and add a single-file postbuild (the w89 pattern: `vite-plugin-singlefile` or equivalent postbuild inlining), then receipt the file:// law in the battery.
**Evidence:** Inkling (Part 8 filing) — file:// FAIL VERIFIED by Chromium capture: CSS+JS blocked by CORS, 4 error messages, body empty, 9 DOM nodes, app never mounts; `vite.config.js` has no single-file postbuild; `dist/index.html` loads `./assets` with `crossorigin` + `type=module`. MUSE (Part 8 draft) — single-file output FAIL VERIFIED (no single-file plugin, dist is index.html + assets/*). Ernie (Part 8 filing) — file:// NOT re-run, REPORTED from Z.ai.
**Acceptance:** the built shell boots from `file://` in a stock browser (Chromium capture: app mounts, zero console errors); a file:// law exists in the battery and passes. Council verifies by re-running the file:// capture.
**Queue ID:** NEW — proposed title: "Single-file build: boot from file:// (strip crossorigin + singlefile postbuild)".

### B5. Fix the 390px Draft Board overflow
**What it is:** one `@media (max-width: 560px)` rule collapsing the board grid to 4 columns (Ernie's §5 P1), plus a board-at-390 law in the battery. Root cause: `BoardRow.svelte:38` grid — 336px fixed + 48px gaps + 12px padding = 396px minimum on a 390px viewport.
**Evidence:** Ernie (Part 8 filing) — VERIFIED: board scrollW 444, 120 offenders all `.cp-gone-wrap` / `.cp-num.cp-gone`, right edge 439–443; only two `@media` rules in the shell, both `prefers-reduced-motion`. Inkling (Parts 8, 12 filings) — same 444/54px overflow; Team Select clean at 390. GLM peer review — D1 CONFIRMED, same CSS applies to s5 too.
**Acceptance:** board scrollWidth = 390 at a 390px viewport (zero horizontal overflow); Team Select still clean; a 390-board law in the battery passes. Council verifies by re-measuring scrollWidth at 390px.
**Queue ID:** NEW — proposed title: "Fix 390px Draft Board overflow (BoardRow grid → 4 columns under 560px)".

### B6. P-317 slot picker UI (build now — store lands separately)
**What it is:** the 1–32 slot picker on the Team Select screen, as pure UI state (default = natural slot), + a plain-TS `makeDraftOrder(userTeamIndex, slot)` (Inkling) / typed contract + fixture (Ernie) + an honest shell-side bridge (`localStorage['cakepanz:draftSlot']`, DISPLAY only, labeled UI-ONLY). Do NOT dispatch START with a slot (silently dropped) and do NOT smuggle `order` into frozen pool tuples or meta keys. Start button disabled with "draft position lands with the next engine pin", or pass the slot through a new contract with a STAND-IN label.
**Evidence:** Inkling (Part 4 filing) and Ernie (Part 4 filing) — both agree Z.ai can build the picker now; the store change (A3) is the Architect's. VL (Part 4 filing) — same split.
**Acceptance:** the picker renders 1–32 on the same screen as team selection, same look; choosing a slot changes only UI state (no silent drop, no smuggled field); the UI-ONLY bridge is labeled as such. Council verifies by reading the picker code and the START dispatch.
**Queue ID:** P-317.

### B7. Fix the two battery tautologies
**What it is:** (1) the season-brag TOKEN law — make the TOKEN match case-insensitive (the table expects uppercase, `shareVM` renders mixed case; all four non-champion TOKEN branches can never match). (2) the shared-module recompute laws (48, 62 and kin) — they recompute through the same module they check, so they cannot catch a bug in it. Add independent-source assertions for the values they cover — starting with gone% values, which currently have no law at all. (The battery passed a 0–21 loss labelled VICTORY and a board whose every gone% was 0%.)
**Evidence:** Inkling (Part 7 filing) — TOKEN law conditionally dead; dies 74/1 at `86f22d10`. MUSE (Part 6 draft, battery mutation) — 13 laws proven killable by run; survivors VERIFIED: shared-module recompute laws cannot catch a bug in the module they recompute through.
**Acceptance:** a case-mutation of a TOKEN value fails the TOKEN law; a mutation that zeroes every gone% fails a gone% law. Council verifies by re-running the mutations.
**Queue ID:** NEW — proposed title: "Fix battery tautologies: TOKEN case match + independent-source gone% laws".

### B8. Style-law fixes (after the Owner rules)
**What it is:** once the Owner rules on the visual law (synthesis items 2–7), apply the shell-side fixes: (a) the "2PT" / "2PT FAIL" chips → "2-Pt Conv" everywhere (or keep "2PT" if the Owner rules the chips in) — `feedVM.ts:114-115`; (b) wire the user's team in blue (`.ub`) — or drop the law if the Owner rules it redundant under the team-palette remap; (c) the feed "touchdown" copy — either the engine-string change (A5) or a summary transform in `feedVM.ts` (lines 106–115), not both; (d) the skin re-cut to the w89 pale-rose / Cinzel law, if the Owner rules re-cut rather than amend.
**Evidence:** Ernie (Part 11 filing) — "2PT"/"2PT FAIL" (F8), "touchdown" (5 of 22 lines). GLM (Part 11 filing) — F-11a "2PT" vs "2-Pt Conv"; F-9b/F-11b `.ub` absent. Inkling (Part 11 filing) — `.ub` absent, Cinzel absent, dark-gold look not the w89 law. VL (Part 1 filing) — light mode not built.
**Acceptance:** the shell passes a style-law grep (no banned strings, `.ub` wired, Cinzel present if the law stands) and the contrast table recomputes with the Owner's rulings applied. Council verifies by re-running the greps and the contrast recompute.
**Queue ID:** NEW — proposed title: "Apply the Owner's style-law rulings (2PT, .ub, touchdown, skin)". **Blocked on the Owner's rulings** (synthesis items 2–7). Do not build before they land.

### B9. Fix the valuation-mode label (one string, after the Owner rules)
**What it is:** `valuation.ts:11` labels the measured default "Model Value"; the v4-1 ground truth calls it "Engine Value". Rename to whichever word the Owner ships. (This is the real Owner-preset table question in miniature: the switch is pure mode state with no numbers — the label is the only thing that ships.)
**Evidence:** GLM (Part 9 filing) — F-9a, one-string rename. Inkling (Part 9 filing) — the label travels only on the board + Team Select.
**Acceptance:** the label reads the Owner's word on the board and Team Select; the switch still locks mid-draft. Council verifies by reading the label.
**Queue ID:** NEW — proposed title: "Valuation label: 'Model Value' → Owner's word (one string)". **Blocked on the Owner's ruling** (synthesis item 4).

### B10. Neutrality cleanups
**What it is:** (1) move `draftStore.ts` out of `src/lib/` into a `bindings/` directory (it is the only `svelte/store` import in the core — 20 lines); (2) split `bragCard.ts` so `document` leaves `src/lib` (pure formatter + thin paint step); (3) declare the 14 `.svelte` files as the thin binding in the handoff note, and correct the handoff wording so reviewers do not certify "neutrality" by reading a sentence instead of the tree (DS).
**Evidence:** Ernie (Part 3 filing) — `draftStore.ts:3` is the single blocking file; ~15-line own `createStore` is the fix. DS (Part 3 filing) — "the shell claim is false: the delivered tree is a Svelte 5 app"; handoff wording correction. Pickle (Part 3 filing) — `bragCard.ts:155` `document` defect; draftStore belongs in `bindings/`. Inkling (Part 3 filing) — 730 of 750 TS lines framework-free; the binding is thin.
**Acceptance:** `grep -rn "from 'svelte" src/lib` (excluding `bindings/`) returns nothing; no `document` reference remains in `src/lib` outside `bindings/`; the handoff note names the 14 `.svelte` files as the binding. Council verifies by grep.
**Queue ID:** R-13 (framework comparison) — as a neutrality-maintenance item, not a framework pick. (The framework pick is 50/50, TS-neutral until cutover — settled, not re-litigated.)

### B11. Weigh the unmeasured surfaces
**What it is:** measure DOM node counts for Feed, Share, and Saves (Inkling did not measure them), and re-measure the board after the 390px fix (B5). The v4 prompt's figure 221 is UNKNOWN-origin — do not cite it; report the measured numbers.
**Evidence:** Inkling (Parts 7, 12 filings) — Feed/share/saves NOT measured; prompt's 221 UNKNOWN-origin (his sealed-bench measurement was 247, not 221). Ernie (Part 12 filing) — board 832, Team Select 78, saves panel 40.
**Acceptance:** a node-count table for all five screens at 1180px and 390px, in the delivery note. Council verifies by re-measuring.
**Queue ID:** NEW — proposed title: "Weigh Feed/Share/Saves node counts (complete the Part 12 table)". Small; rides with any shell delivery.

---

## C. For the council (review / verify)

### C1. Re-run the gates on the re-pinned tree
**What it is:** once B2 lands, re-run the full gate set on the re-pinned shell-of-record tree: `diff -rq` engine vs `d3bd81d2`; the engine suite (must be 286/0 — see A1); the shell battery (must be 75/0/10/3 with the full output pasted, not asserted); the file:// capture; the 390px measurement; the M1 grep. Verify Pickle's 9-fail diagnosis closes when the expectations move.
**Evidence:** the round's gaps — no seat ran the battery fresh on a clean checkout against `d3bd81d2` with a pasted output (Inkling's Swap A asserts counts without the appendix; GLM's reproduction failed on the global-Playwright dependency).
**Acceptance:** a filing with the commands and their outputs, all green, on the named shell-of-record tree.
**Queue ID:** NEW — proposed title: "Re-run the gates on the re-pinned Cakepanz tree". (This is the review-chain work for B2/A1.)

### C2. Verify the D3 assertions kill the mutations
**What it is:** once A2 lands, re-run the four box-score mutations (MUSE's set at `86f22d10`; Pickle's set at `86f22d10` and the engine tip) and confirm each is now killed by at least one law. Also run Inkling's three extra probes (sacksTaken, rushYards, passYards) and say whether they are covered by the new assertions or need their own.
**Evidence:** D3 settlement (review-synthesis.md) — four survivors confirmed by four seats; six survivors by Inkling's count.
**Acceptance:** a filing with the mutation commands, the killed-by lines, and the before/after suite counts.
**Queue ID:** NEW — proposed title: "Verify the D3 box-score assertions kill the four mutations". (Review-chain work for A2.)

### C3. Verify the P-317 store change
**What it is:** once A3 lands, run the slot-17 round-trip law and restore an old-format save; confirm the restored order matches the saved order and the old save still restores (default snake). Also verify B6's picker UI does not dispatch START with a slot before the store lands (no silent drop).
**Evidence:** Ernie/Inkling/VL Part 4 filings (the blocker chain) and the A3 design choice.
**Acceptance:** a filing with the round-trip law output and the old-format restore output.
**Queue ID:** P-317.

### C4. Cover the missing Part 13 arms
**What it is:** the non-contrast accessibility arms nobody did: tab order, tooltip focus, fixtures, docs, w88 diffs. Run them against the shell-of-record tree once B8 lands (the palette ruling changes what the answers are).
**Evidence:** Inkling (Part 13 filing) — contrast only, other arms explicitly not done; no other seat filed them.
**Acceptance:** a filing covering each arm with commands and outputs.
**Queue ID:** NEW — proposed title: "Accessibility arms: tab order, tooltip focus, fixtures, docs, w88 diffs". (Blocked on the palette ruling — B8.)

### C5. Cover Parts 16 and 17 independently
**What it is:** MUSE's drafts are the only coverage of Part 16 (specs) and Part 17 (label hygiene) — nothing there is REVIEWED. A seat that authored nothing in the round takes MUSE's Part 16/17 drafts and verifies or corrects them independently: the FOR: P-345 → R-13 relabeling (8 Inkling + 2 Ernie files; CORRECTION 2026-11-16: 10 total, not 12 — MUSE originally wrote 4 Ernie), and the specs inventory.
**Evidence:** the coverage map in `review-synthesis.md`.
**Acceptance:** an independent filing confirming or correcting MUSE's Part 16/17 drafts, with receipts.
**Queue ID:** P-211 (queue hygiene) for the label work; NEW for the specs inventory if it needs its own item.

### C6. Second-seat review of Ernie's D6 (`FEED_YEAR = 2027`)
**What it is:** Ernie's D6 — `feedVM.ts:37` `FEED_YEAR = 2027` is a label constant that seeds the demo schedule year via `feedVM.ts:91` — has no second-seat review. GLM's peer review does not mention it. A seat confirms or refutes it.
**Evidence:** Ernie (Part 9 filing) D6; GLM peer review — D6 not covered, UNKNOWN whether endorsed.
**Acceptance:** a short filing confirming or refuting D6 with a read of `feedVM.ts:37` and `:91`.
**Queue ID:** NEW — proposed title: "Second-seat review: Ernie D6 (FEED_YEAR = 2027)". Small; rides with C1.

### C7. Land the contrast recompute script
**What it is:** Inkling's contrast recompute (`contrast-check.mjs`) verified all 36 cells but is NOT on `council/inkling` — the numbers are verified as read, the tool is not landed. Land it (or an equivalent) so the next round can re-run it.
**Evidence:** Inkling (Part 13 filing) — script not landed, reader spot-checked.
**Acceptance:** the script is on a council branch and reproduces the 36-cell table (14 AA failures) when run.
**Queue ID:** P-211 (queue hygiene) — tooling hygiene.

### C8. Resolve the R-13 / QUEUE.md gap (queue custodian)
**What it is:** R-13 does not appear in the live QUEUE.md table on council/muse (VL's flag, reader spot-check corroborated). The MUSE seat, as queue custodian under standing permission, determines whether the ID exists under another name, was retired, or was never entered — and records the answer. This is custodian work, not an Owner item.
**Evidence:** VL (Part 10 filing) — "R-13 does not appear in the live QUEUE.md table".
**Acceptance:** a note in the queue or its archive stating where R-13 lives or why it does not.
**Queue ID:** P-211 (queue hygiene).

---

## D. Items that are NOT work orders (carried as Owner decisions, not queue items)

1. **Shell of record** — Owner names it (gh-pages vs rev2 vs s5). Blocks B2.
2. **Whether s5 is re-pinned or stays at `4ca9a071` deliberately.** Blocks B2.
3. **The visual law** — re-cut the skin or amend the ruling. Blocks B8 and P-317 acceptance.
4. **"Model Value" vs "Engine Value".** Blocks B9.
5. **"2PT" chips vs "2-Pt Conv" everywhere.** Blocks B8(a).
6. **The `.ub` / user's-team-in-blue law** — required, or redundant under the team-palette remap? Blocks B8(b).
7. **The "never print the words Touchdown" law** — cite where it is written. Blocks A5/B8(c).
8. **`madden27-ratings.csv` provenance** — name the source. (Inkling.)
9. **Still unruled from earlier rounds:** light gold2 AA failure; w89 one-line dark `--text` fix; Bodoni Moda.
10. **The propose-first gate for Z.ai** (Inkling's gate vs the standing autonomy grant).
11. **Glyph's FOR: CAKEPANZ-SHELL tag** — filename slug, or a FOR: value?

---

## Sequencing (what goes first)

1. **Owner rulings first** (Section D) — they unblock B2, B8, B9, and P-317 acceptance.
2. **A1 (green suite) before B3 (seam)** — Pickle's sign-off order: a seam wrapped around a red tree is documentation of a defect.
3. **A3 (store) and B6 (picker UI) can proceed in parallel** — the picker is pure UI state until the store lands.
4. **B4 (file://) and B5 (390px) are independent** — either can ride with any shell delivery.
5. **C1–C3 are review-chain work** — they run after the builds they verify land.
