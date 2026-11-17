# Cakepanz assist round — review synthesis

**Round:** council prompt v4, sent by the Owner on 2026-11-16 (v1–v3 superseded; v4 is the version that was sent).
**Reviewer:** MUSE seat, as review coordinator.
**Date:** 2026-11-16.

## Method and scope

Every filing in the round was read in full — 57 files across 7 seats:

| Seat | Files | Parts covered |
|---|---|---|
| Ernie | 5 inbox + 11 delivery files (receipts) | 1, 2, 3, 4, 8, 9, 10, 11, 12, 13 |
| Inkling | 13 filings | 2, 3, 4, 7, 8, 9, 10, 11, 12, 13 (contrast only), 14, 15 (seam-gate), D3 |
| GLM | 6 filings | 2 (seam-checker), 6 (D3), 9, 10, 11, peer review of Inkling Part 10 + Ernie D1–D6 |
| Pickle | 4 filings | 2, 3, 6 (D3), 10 |
| VL | 7 filings | 1, 2, 3, 4, 5, 6 (scope), 10 |
| DS | 3 filings | 2, 3, 10 |
| MUSE | 19 draft files | 1–17 + D3 (LABELED DRAFTS — MUSE authored the prompt; these are **not** independent verification and do **not** count toward the review chain) |

Four worker subagents read the filings in full; the coordinator re-ran the three decisive checks itself on fresh extracts (pin byte-identity, the one-door grep, the battery JSON) and verified the load-bearing numbers against the sources.

**Labels used throughout:** VERIFIED = the coordinator ran it, or the receipt is in the filing text and was read. REPORTED = another seat's number, named, not re-run. INFERRED = reasoned, not run. UNKNOWN = no evidence in the round.

**The three trees under review (terms used throughout this document):**

- **s5 delivery** — Z.ai's Slice 5 delivery tree, the shell under review. Engine snapshot = `4ca9a071` (52 files), slices 1–5 + shareables. This is the tree the v4 prompt's Part 1 asked seats to review.
- **gh-pages deployment** — the live deployed tree at the repo's gh-pages branch. Engine snapshot = `d3bd81d2` (57 files), slices 1–2 only. Re-pinned in commit `66096fb1` (2026-11-15).
- **rev2 app tree** — the earlier app tree on the council/ernie branch (slices 1–4), engine `4ca9a071`. This is the tree Ernie measured on.

**The two engine pins:** `4ca9a071` (older, pre-99-rule flex) and `d3bd81d2` (the current pin, 99-rule flex table, QB→FS at −12). The pins differ by 11 files: 6 updated (`core/app.ts`, `sports/nfl/app/dataset.ts`, `sports/nfl/engine/draft.ts`, `sports/nfl/engine/flex.ts`, `sports/nfl/engine/slots.ts`, `sports/nfl/engine/value.ts`) + 5 added (`core/events.ts`, `core/fold.ts`, `core/keyedrng.ts`, `core/pack.ts`, `sports/nfl/engine/legacyprovider.ts`).

**The battery:** the shell's acceptance test suite (`batteries/slice1-battery.json` in the s5 delivery), which records pass / fail / skip / defer counts. It is run by the Playwright browser harness. It is **not** the engine's own test suite (`colors/test/`), which is a separate suite with its own counts (363 laws at `86f22d10`, 378 at the engine tip `a062597f`).

---

## Coverage map

| Part | Ernie | Inkling | GLM | Pickle | VL | DS | MUSE (draft) |
|---|---|---|---|---|---|---|---|
| 1 shell review | ✓ | — | (peer review of Ernie) | — | ✓ | — | ✓ |
| 2 seam | ✓ | ✓ | ✓ (seam-checker) | ✓ | ✓ | ✓ | ✓ |
| 3 neutrality | ✓ | ✓ | — | ✓ | ✓ | ✓ | ✓ |
| 4 blockers / P-317 | ✓ | ✓ | — | — | ✓ | — | ✓ |
| 5 ideas / P-070 | — | — | — | — | ✓ | — | ✓ |
| 6 battery mutation | — | (D3 filing) | ✓ (D3) | ✓ (D3) | ✓ (scope) | — | ✓ |
| 7 battery gaps | — | ✓ | — | — | — | — | ✓ |
| 8 non-functional | ✓ | ✓ | (playwright-env note) | — | — | — | ✓ |
| 9 data integrity | ✓ | ✓ | ✓ | — | — | — | ✓ |
| 10 pin | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 11 style laws | ✓ | ✓ | ✓ | — | — | — | ✓ |
| 12 weight | ✓ | ✓ | — | — | — | — | ✓ |
| 13 a11y / palette | ✓ (theme) | ✓ (contrast only) | — | — | — | — | ✓ |
| 14 cutover checklist | — | ✓ | — | — | — | — | ✓ |
| 15 TS assets | — | ✓ (seam-gate) | ✓ (seam-checker) | — | — | — | ✓ |
| 16 specs | — | — | — | — | — | — | ✓ only |
| 17 label hygiene | — | — | — | — | — | — | ✓ only |

**Thin or missing across the round:** Part 13 non-contrast arms (tab order, tooltip focus, fixtures, docs, w88 diffs — Inkling explicitly not done; no other seat did them); Part 5 (VL + MUSE only); Part 7 (Inkling + MUSE only); Parts 15–17 beyond MUSE's drafts and the two seam-gate/checker tools; Part 16 and Part 17 have **no independent filing at all** — MUSE's drafts are the only coverage, so nothing there is REVIEWED.

---

## Part 1 — shell review

**SETTLED**

- The s5 delivery builds (exit 0, in a scratch copy) and the engine inside it is byte-identical to `4ca9a071` (52 files, `diff -rq` exit 0; `sha256sum -c CHECKSUMS-slice5.txt` 21/21 OK) — MUSE, VERIFIED by the coordinator's own re-run.
- The engine suite inside the s5 tree passes 284/0 (MUSE re-run, 179 s; VL re-run, same result). VERIFIED.
- The battery count on the s5 delivery is **75 pass / 0 fail / 10 skip / 3 defer** (88 results) — MUSE VERIFIED from the shipped `slice1-battery.json` (73 `ok('...')` calls); VL VERIFIED by reading the JSON; Inkling reproduces it in his Swap A. See the battery discrepancy resolution below for why Ernie's 61/0/10/3 is also correct on his tree.
- Five screens exist (`Screen = 'team' | 'board' | 'saves' | 'feed' | 'share'`) — VL VERIFIED. No season surfaces (week view, standings, bracket, season book, awards, review, Guide, player cards, stats table, settings) — consistent with the battery's 10 SKIPs being exactly those surfaces.
- Light mode is **not built** — VL VERIFIED (grep finds no pale-rose; `color-scheme: dark`). The shell is dark-only.
- SlotPicker is **unwired** (grep) — MUSE, VERIFIED.

**DISPUTED / CAVEATED**

- VL's seed-4275 replay "PROVED" has no command or output in the filing text — REPORTED / UNVERIFIED.
- VL's feed OT clock quirk is honestly labeled REPORTED (taken from the slice 4 README; code not re-read). Note: the engine's OT clock fix has since landed at `fe611cbd`, but the s5 snapshot at `4ca9a071` predates it, so the quirk still applies to the tree under review.
- VL read the files but did **not** run the shell, the battery, or the probes (against the prompt's "do not trust the receipt" instruction). His Part 1 is read-verified, not run-verified.
- MUSE did not run the Playwright battery (Playwright not installed on the coordinator VM) — the battery numbers in MUSE's draft are REPORTED from the shipped JSON, not a fresh run. GLM's reproduction attempt on s5 **failed for a real reason**: the battery imports a globally installed Playwright (`Cannot find module '~/.npm-global/lib/node_modules/playwright'` on a bare checkout after `npm install`) — the battery is not runnable without a browser-driver install. That is a Part 8 environment finding: the battery's runtime assumptions belong in SNAPSHOT.md.

**MISSING:** no seat ran the battery fresh on a clean checkout and pasted a full green run against `d3bd81d2`. (Inkling's Swap A claims 75/0/10/3 at `d3bd81d2` but the filing asserts the counts without pasting the battery-output appendix it cites — downgraded to REPORTED.)

## Part 2 — seam

**SETTLED (unanimous, strongest coverage in the round — 6 of 7 seats)**

- **M1 (one door) FAILS.** There is no single seam and no adapter module. The coordinator's own grep on a fresh s5 extract confirms **15 shell files import the engine directly, 65 import lines** (29 type-only, 36 value; 10 files hold value imports; 32 distinct engine module paths). Breakdown, DS's numbers confirmed exactly by the coordinator's reader re-run: `App.svelte` 10 lines; 8 `.svelte` files under `src/lib` 15 lines (SlotPicker 4, NeedsRow 3, TeamSelect 2, DraftBoard 2, SortControls/BoardRow/BoardHeader/Saves 1 each); 6 TS modules 40 lines (`feedVM.ts` 22, `savesApp.ts` 11, `draftStore.ts` 3, `shareVM.ts` 2, `abbr.ts` 1, `ink.ts` 1). `find src -iname '*adapter*' -o -iname '*seam*'` returns 0. MUSE's stronger claim — **no adapter exists at all** — is confirmed by the coordinator's own `find` and by DS's.
- **M2 (re-pin is a drop-in) FAILS narrowly.** A re-pin is three directories (`src/engine/` + `tools/mathlab/flex.json` + `test/`), not one; the swap diff outside the engine is empty (0 lines) but the carried test expectations move with it — see the new Pickle finding below.
- **M3 (swap) PASSES for the runtime path, with a pin-coupled failure.** Ernie, Inkling, and MUSE all swapped `4ca9a071` → `d3bd81d2` with **zero source edits outside `src/engine/`** and a green build. The shell's battery stays green. But the tree's **engine suite fails 9 of 286** at `d3bd81d2` because the carried test expectations still assert the old pin (see below). Swap B (`4ca9a071` → `86f22d10`): build PASS, battery **74/1** — the one failure is the battery's own TOKEN-casing tautology (see Part 6/7).
- **M4 (handoff docs) FAILS.** No SNAPSHOT.md, no `VM → engine file → sha256 → callers` table. Per-slice CHECKSUMS files exist but are delivery file hashes, not a seam table. DS: "there is no handoff seam table and no SNAPSHOT.md in the s5 delivery." No handoff note exists on disk anywhere, so the seam-inventory audit had nothing to check.
- **M5 (thin seam) VERIFIED exactly:** 76 lines across 13 files (6.2% of 1,220 app lines) touch engine types — Ernie, VERIFIED by the coordinator's reader re-run. The seam is thin already; the problem is distribution, not size.

**NEW FINDING (Pickle, corroborated by Ernie and Inkling — not in MUSE's draft): the deployed gh-pages tree is red on its own engine suite.** `node --test --experimental-strip-types test/engine.test.ts` on the gh-pages tree: **277 pass / 9 fail of 286**. The nine, named verbatim: flex REV-4 table equality (QB→FS 12 vs −10), penalties 0/2/4/6, REV 3/REV 4 rulings, NICKEL/DIME free, DL5 natural, no-arbitrage (TE>FB>RB 2<6, TE>OG>OT 8<12), base totals, 3-4 lineup, E5 pins (stamp `nfl1.14a4e9333e888a` vs `nfl1.0e237387b2647f`). Cause VERIFIED: `test/engine/nfl/lineup.test.ts:16` reads `tools/mathlab/flex.json` (old pin's table). Diagnosis (INFERRED, well-grounded): "the re-pin moved `src/engine/**` and `tools/mathlab/flex.json` to the 99-rule table, but the tree's *carried test expectations* still assert REV 4… Eight of the nine are the Owner's flex/formation rulings landing — a **law moved and the laws that assert it were not moved with it** — plus the E5 stamp pin, which… can only be re-pinned by the Architect, never by Z.ai editing the number." Control: s5 same command → 284 pass / 0 fail. Inkling's Swap A reports the same 277/9. Pickle's prescription: "a shell whose *tests* still assert the previous pin cannot *verify* a re-pin either. The safe re-pin is one commit that moves the snapshot, `tools/mathlab/flex.json`, **and** the carried expectations, and ships the suite green in that same commit." Pickle's sign-off order: the green suite on `d3bd81d2` (including the nine laws) comes **before** the seam modules — "a seam wrapped around a red tree is documentation of a defect."

**DISPUTED (shape of the fix, not the facts)**

- Two competing INFERRED seam proposals, both reducing the same 65 imports: **DS** — one `src/lib/engine.ts` facade that re-exports exactly the union of symbols the 15 files import, with a typed `EnginePort` (`newDraft(order)`, board state, `goneOdds`, `lineupFor`/`fit`/`SLOTS`, week step, season simulation, save/load). **Pickle** — six domain seam modules (`seam/board|roster|league|season|saves|core.ts`, ~65 re-exports, zero logic moved) with M1's grep re-scoped to "outside `src/seam/`", plus moving `draftStore.ts` to `bindings/` and folding `ink.ts` into `seam/league.ts`. **Ernie / Inkling** — one `src/lib/enginePort.ts` (Ernie: single `EnginePort` interface, six commands + SNAPSHOT.md + three-path re-pin runbook; Inkling: sketched interface + a grep-M1 battery law). All three shapes are compatible with GLM's and Inkling's seam-checkers. This needs an Architect/Z.ai choice, not a council vote. MUSE's draft proposed five §5 items to the Architect on the same question.
- Ernie's own verdict corrected itself in the round: his 21:06 filing calls the shell "mergeable as a *port*, not a drop-in"; his 21:26 swap test withdraws that for the runtime path (build + battery pass on `d3bd81d2` with zero edits outside `src/engine/`). What does NOT travel: the verification apparatus (`test/`, `tools/mathlab/flex.json`) and the documentation. M1 stays FAIL, reclassified as maintainability, not a merge blocker.
- Ernie's unfalsified falsifier, named by himself: he only swapped `4ca9a071` → `d3bd81d2`; a swap to a newer engine commit with a signature change could still break at the 14 direct importers.

**MISSING:** no seat ran a full merge rehearsal (bytes, not semantics); the seam-inventory audit could not run because no handoff table exists. Inkling's seam-gate and GLM's seam-checker (Part 15) are the tools for it, once Z.ai ships a real inventory.

## Part 3 — neutrality

**SETTLED**

- ~95% portable; the non-engine TypeScript core is framework-free. Inkling: 730 of 750 non-engine TS lines framework-free; zero `.svelte.ts` rune modules; exactly one framework import in `.ts` (`draftStore.ts` → `svelte/store`, 20-line adapter). Ernie: no runes in `src/lib/*.ts`; one blocking file (`draftStore.ts:3`). Pickle: `$state` 8 files / 21 hits, `$derived` 4/7, `$effect` 2/2, `$props` 12/12 — all in `.svelte` files; `grep -rn '$state|$derived|$effect|$props|$bindable' src --include='*.ts'` → none; `grep -rn '$lib' src` → none; `svelte/transition|animate|motion` imports 0; `{#snippet}` 0.
- The Svelte surface is 14 `.svelte` files (1,039 lines) + `src/main.ts` + `App.svelte`; build deps `svelte ^5.57.3`, `@sveltejs/vite-plugin-svelte ^6.2.1` — expected, Svelte-locked by construction.
- The single core leak: `draftStore.ts:3` imports `svelte/store`. Fix: ~15-line own `createStore`, or move the file to `src/lib/bindings/` (Pickle, DS, Ernie agree on the substance; the destination differs).
- D4: `App.svelte:44` `userTeam` is not `$state` — one-word fix `$state(0)` (Ernie).

**DISPUTED (emphasis, not facts)**

- **DS:** "The *engine* claim is true… The *shell* claim is false: the delivered 67 Cakepanz tree is a Svelte 5 app." He pushes back on the v4 prompt's "framing, not evidence" line: the fresh-start house rules are real, arm-specific, and consistent with the delivered shell (Svelte arm: runes-only bridge; Vue arm: Pinia Setup Store). The prompt's premise — that the shell is plain TypeScript — is false as written; reviewers should not certify "neutrality" by reading a sentence instead of the tree.
- **Pickle:** "NEUTRAL CORE, THIN BINDING — the claim holds, with two specific defects and one portability break." Same facts; his conclusion is that the claim holds because the binding is thin.
- **Pickle's new defect (DS and GLM did not catch):** `src/lib/bragCard.ts:155` — `const c = document.createElement('canvas');` — a shareable renderer reaching for `document` from `src/lib`, breaking the "render from a node-side fixture so CI can render the whole shell without launching the browser" rule. Split into a pure formatter + thin paint step.
- Port cost if Vue were picked: ~1,060 lines (Inkling, INFERRED, not measured). The framework question is the smaller number — Pickle: "65 import statements… That coupling… is **4× the size of the whole Svelte surface**. If the round spends its energy on the framework question and not on the engine seam, it will have optimized the smaller number."

**MISSING:** no Vue port or build run — the portability statement is structural (files and imports), not a build receipt.

## Part 4 — blockers / P-317 (Team Select must let the user pick team AND draft position, slot 1–32)

**SETTLED (unanimous — Ernie, Inkling, VL, MUSE)**

- **The blocker is real and verified at both pins.** The engine side is READY: `newDraft(players, rng, cfg, order = snakeOrder())` (`draft.ts:44,52`) takes an `order` parameter. The store side is BLOCKED: `startDraft(teamIndex)` takes no slot; store START accepts only `{seed, userTeam}` (`store.ts:30`); `DraftPayload {seed, userTeam, picks, pool}` (`saves.ts:27-31`) has no slot/order field; `restoreDraft` calls `newDraft` with no order (`store.ts:66`), always default snake, and a mismatch throws `'save: pick N is out of order'` (`store.ts:69`). VL verified the same chain independently (reading `TeamSelect.svelte` and `App.svelte:75-84`; does not cite Ernie). Team Select screen itself is clean at 390px (Ernie, Inkling).
- **Z.ai can build now:** the slot picker UI as pure UI state (default = natural slot) + a plain-TS `makeDraftOrder(userTeamIndex, slot)` (Inkling) / typed contract + fixture (Ernie) + an honest shell-side bridge (`localStorage['cakepanz:draftSlot']`, DISPLAY only, labeled UI-ONLY — Inkling). Guard, both seats: do NOT dispatch START with a slot (silently dropped) and do NOT smuggle `order` into frozen pool tuples or meta keys. Ernie: start button disabled with "draft position lands with the next engine pin", or pass the slot through a new contract with a STAND-IN label.
- **The palette ruling blocks P-317 acceptance.** Inkling: "nothing in P-317 can be accepted against the current shell look until the ruling lands or the Owner amends it." (See Part 11/13.)

**DISPUTED (design choice for the Architect)**

- What the store persists: **Ernie** — `DraftPayload.slot?` (validated like userTeam, 0..31), one order builder `orderFor(userTeam, slot)` (take `snakeOrder()`, remove userTeam, splice in at slot), restore uses the stored order, `toRecord` persists it, plus a slot-17 round-trip law (`st.order[17] === userTeam`, pick log replays). **Inkling** — `DraftPayload` gains optional `order?: number[]` storing the **RESOLVED 352-pick array, not the slot**: "the robust choice: future changes to how the custom order is built can't silently remap old saves." The Architect decides; Inkling's shape is more robust, Ernie's is smaller.
- **Naming caution (Ernie, flagged by the reader):** `DraftPick` already has a `slot: string` field (the per-pick roster slot). A proposed `DraftPayload.slot` would collide — rename (`draftSlot` / `position`) or document loudly.
- VL splits the work differently: Z.ai builds the picker UI + save format now; the Architect builds the store slot support.

**MISSING:** no seat filed the actual store change (none could — only the Architect builds the product). The slot-17 round-trip law is proposed, not written.

## Part 5 — ideas / P-070 (multisport end goal)

**SETTLED (VL, MUSE only)**

- The platform readiness case is real but narrow: the save envelope is already sport-tagged (`kind: draft/week/season`) through the StorageModule seam, so a server store is a swap behind one interface. No basketball now — correctly deferred.
- Two frictions, INFERRED by VL: (1) `saveRevision` has no device dimension — no `deviceId` in the envelope meta, so two devices revising one saveId collide; (2) `savedAt` is client clock — the sync layer wants server-authoritative time.

**MISSING:** no other seat filed Part 5. No basketball design work is in scope for this round.

## Part 6 — battery mutation

**SETTLED**

- **13 laws proven killable by run** — MUSE (battery mutation filing). Survivors VERIFIED: shared-module recompute laws (48, 62 and kin) cannot catch a bug in the module they recompute through — the battery passed a **0–21 loss labelled VICTORY** and a board whose **every gone% was 0%**; gone% *values* have no law at all. Defense in depth: corrupt-save refusal survives any single-layer break (`parsePayload` and `hydrateWeek` each independently refuse).
- **Second battery tautology (Inkling):** the season-brag TOKEN law is conditionally dead — the TOKEN table expects uppercase, `shareVM` renders mixed case; all four non-champion TOKEN branches can never match. At `86f22d10` it dies (74/1). Fix: one line, case-insensitive TOKEN match.
- GLM's playwright-environment finding (battery not runnable on a bare checkout) belongs here as well as Part 1/8.

**DISPUTED:** none on the battery's weakness. See D3 for the box-score mutation question, which the v4 prompt routed to Part 6 and which is settled there.

**MISSING:** no seat ran the full battery-mutation set on the s5 delivery itself (MUSE's mutations were on the battery's shared modules; Inkling/Pickle/GLM ran the engine's suite, not the shell battery).

## Part 7 — battery gaps

**SETTLED (Inkling, MUSE only)**

- Coverage map from `slice1-battery.json` (75 PASS · 10 SKIP · 3 DEFER, 88 entries) — Inkling. All SKIPs are loud with reasons; the spec for what those laws become is unwritten.
- Four concrete survivors this round: file://, 390-board, grep-M1 law, dead TOKEN law.
- Missing laws, enumerated: no slot/390/keyboard laws on Team Select; no board-at-390, reduced-motion, all-32-picked laws; no BIG-penalty laws; no clutch-narration law; no file://, 390-board, grep-M1, or manifest/checksum self-check laws.
- Inkling proposes concrete assertions for every missing state (season hub, week view, standings/bracket, season book, awards, review, Guide, player cards, stats table, settings, shareables per stage, everywhere-matrix).

**MISSING:** no other seat filed Part 7. The new-surface laws cannot be written until the surfaces exist.

## Part 8 — non-functional

**SETTLED**

- **file:// boot FAILS** — Inkling VERIFIED (Chromium capture over file://: CSS+JS blocked by CORS, 4 error messages, body empty, 9 DOM nodes, app never mounts; `vite.config.js` has no single-file postbuild; `dist/index.html` loads `./assets` with `crossorigin` + `type=module`). MUSE: file:// FAIL (INFERRED for stock-browser boot); single-file output FAIL (VERIFIED — no single-file plugin, dist is index.html + assets/*). Ernie: file:// NOT re-run (REPORTED from Z.ai). The w89 pattern (strip-crossorigin + singlefile postbuild) exists and is buildable now.
- **390px: Team Select PASS, Draft Board FAIL** — Ernie VERIFIED (board scrollW 444, 120 offenders all `.cp-gone-wrap` / `.cp-num.cp-gone`, right edge 439–443); Inkling VERIFIED the same 444/54px overflow. Root cause pinned by Ernie: `BoardRow.svelte:38` grid — 336px fixed + 48px gaps + 12px padding = 396px minimum. Only two `@media` rules in the shell, both `prefers-reduced-motion`. §5 P1: `@media (max-width: 560px)` collapsing to 4 columns.
- **Zero console errors over http PASS** — Inkling, Ernie (caveat: Ernie's probe never completed a draft; feed error-freedom rests on the battery receipt).
- **Offline holds as a static property of the artifact** — MUSE. Zero-network at runtime: no fetches observed.

**MISSING:** Feed/share/saves node counts not measured (Inkling). No seat re-ran file:// after any fix (no fix exists yet).

## Part 9 — data integrity

**SETTLED (clean bill — Inkling, GLM, Ernie, MUSE)**

- No shell-side flex/slot table: `grep -rni flex src/lib` → only CSS `display:flex`, one comment, and `BoardRow.svelte:29` rendering `{f.flex}` composed by engine `view/draftBoard.ts:46` (GLM).
- CSVs read only by engine modules; zero app-code readers; no rating arithmetic anywhere in `src/lib` (GLM). Ratings CSVs byte-identical across trees.
- `BoardRowVM` emits `wins: signed(showDecimal('wins', w))` (`view/draftBoard.ts:50`); `showDecimal` lives in the engine's `display.ts:22`; `grep toFixed src/lib` → zero stat hits (only `Math.round` is brag-card color blending, `bragCard.ts:21`) (GLM).
- `valuation.ts` is pure mode state — no numbers; `MODE_LABEL` travels with the numbers; the switch locks mid-draft (GLM). Inkling's caveat: the valuation label travels only on the board + Team Select.
- **Two hard-coded values:** `savesApp.ts:59` hard-codes season length (`nextWeek <= 22`) — Ernie D5, GLM confirms double-sided (the engine's own `weekmap.ts:73` uses the same literal); fix direction sharpened by GLM: the constant should be exported by the engine (`season.ts`) and consumed by both sides — a §5 proposal to the Architect, one line. `feedVM.ts:37` `FEED_YEAR = 2027` — label only, but it seeds the demo schedule year via `feedVM.ts:91` (Ernie D6; **no second seat reviewed D6** — UNKNOWN whether it stands).
- **`madden27-ratings.csv` provenance UNKNOWN in-repo** (Inkling) — Owner ruling needed; do not assert "Official Madden 27". 1,953 = 1,941 ratings + 12 free agents; vintages mixed, no authoritative statement.

## Part 10 — pin

**SETTLED (all seven seats; the strongest consensus in the round)**

- s5 snapshot = `4ca9a071`, 52 files, byte-identical (coordinator's own `diff -rq` exit 0; VL: 52/52 hashes; GLM: 0 diff lines vs pin A, 11 vs pin B; Pickle: blob-hash compare identical=52/differs=0; DS: `diff -rq` exit 0).
- gh-pages snapshot = `d3bd81d2`, 57 files, byte-identical (coordinator's own `diff -rq` exit 0; Pickle: identical=57/missing=0/differs=0; DS: exit 0).
- The two pins differ by exactly 11 files: 6 updated + 5 added (listed in the header).
- The re-pin commit `66096fb1` (2026-11-15) moved engine files + `tools/mathlab/flex.json` only — **it never touched the gh-pages README**.
- The **gh-pages README is the stale document**: line 4 says "Pinned engine commit: `4ca9a071`"; line 9 says "`colors/src/**` at `4ca9a071` — 52 TypeScript files". One-line fix: `4ca9a071` → `d3bd81d2`, "52 files" → "57 files". Inkling, Pickle, DS, GLM (after amendment), MUSE all agree. AGENTS.md §2 ("Engine pin `d3bd81d2`") is **true for the gh-pages deployment** — Pickle: "right about the deployment and wrong about the shell being built — so it is not simply 'stale'."
- The s5 README says `4ca9a071` — **correct for its own snapshot**. VL refuted the s5 README's "snapshot bug" claim: `draftBoard.ts` is clean at `4ca9a071` (hash `fbf59939…`); no stand-in `boardVM.ts` exists.
- **The sharper finding (MUSE, confirmed by all seats): the s5 delivery — the thing under review as "the latest Cakepanz state" — still ships the pre-99-rule engine** (QB→FS 10, not 12). The fix is twofold: (a) update the gh-pages README pin line; (b) decide whether s5 is re-pinned or stays at `4ca9a071` deliberately, and say so in its README.
- gh-pages `tools/mathlab/flex.json` = the 99-rule table (counts 23 at 12, 43 at 6, 10 at 2, 23 at 0 — matches AGENTS.md's live-table numbers exactly) — GLM peer review, VERIFIED.
- DS-only detail: gh-pages is the slice-2 tree (no `Feed.svelte`, `Share.svelte`, `Saves.svelte`); its `package.json` `"version": "0.1.0-slice1"` is itself stale.

**DISPUTED (framing only — resolved)**

- VL said **AGENTS.md** is stale as to Cakepanz (its "Cakepanz now consumes it too" claim does not hold for the s5 delivery). GLM originally said the same (R-G), then **amended his own filing in place (21:50)** after re-checking: "The gh-pages deployment is a SECOND tree… `diff -rq src/engine` vs a `git archive d3bd81d2 colors/src` extract → **0 diff lines**… So the stale document is the gh-pages README — not AGENTS.md. My R-G wrongly generalized the s5 finding to AGENTS.md; Inkling's audit is correct." The amendment is the record to keep. VL's framing is the only dissenting one, and it rests on reading AGENTS.md's claim as being about the s5 delivery rather than the gh-pages deployment. **Coordinator's call: the gh-pages README is stale; AGENTS.md is true-for-gh-pages.** The deeper question — which tree is the shell of record — is not a framing dispute; it is an Owner decision (see below).

## Part 11 — style laws

**SETTLED**

- Banned strings clean: zero hits for "expected scoring", "before kickoff", "sudden death", "injur*" (Ernie, GLM). Feed labels terse (`XP`, `XP MISS`, `NO TRY`).
- **Violation 1 — the feed prints "touchdown": VERIFIED, 5 of 22 lines** (`receipt-feed-copy.txt`; engine string `feed.ts:88` `TD: 'ends in a touchdown'`, rendered verbatim via `feedVM.ts:133` and `Feed.svelte:54`) — Ernie; GLM confirms the fact on both trees. Fix direction: (a) the Architect changes the engine string ('scores a touchdown' is NOT a fix — the word itself is banned; suggests 'finishes a drive' / 'punches it in'), or (b) Z.ai adds a summary transform in `feedVM.ts` (lines 106–115). **Flag (GLM): the LAW's source is UNKNOWN** — zero hits for "touchdown" across `origin/council/muse`. The FACT is verified; the LAW needs a citation (Owner or Ernie) before it drives a fix.
- **Violation 2 — "2PT" / "2PT FAIL" badges vs the "2-Pt Conv" law:** `feedVM.ts:114` → `two: { label: '2PT' }`, `:115` → `two_fail: { label: '2PT FAIL' }` — Ernie (F8), GLM (F-11a), MUSE (F8). Owner rules: "2PT" chips in, or "2-Pt Conv" everywhere. The fixed style is "2-Pt Conv" except in the Guide.
- **Violation 3 — the user's team is NOT blue:** uses `.cp-me` gold border+glow (`Feed.svelte:108`); no `.ub` selector exists anywhere — Inkling VERIFIED; GLM confirms `.ub` absent shell-wide (F-9b/F-11b); Ernie ubCount 0. The "user's team in blue" law is not wired in slices 1–5.
- **Violation 4 — Cinzel absent:** no Cinzel font-family or base64 font anywhere in either tree; shell renders Georgia/serif and ui-monospace — Inkling VERIFIED; Ernie: `bodyFont: "Times"`, no Cinzel, no `data-zpbteam`, no `zcream`, no `--tc`. The shipped shell implements the **dark-gold look** (`#181114` ink, `#e8c87e`/`#d9a94c` golds), **not** the w89 pale-rose law. Owner ruling needed: re-cut the skin or amend the ruling.
- **Naming dispute — "Model Value" vs "Engine Value":** `valuation.ts:11` labels the measured default **"Model Value"**; the v4-1 ground truth calls it **"Engine Value"**. One-string rename — Owner rules which word ships (GLM F-9a).
- Not-yet-applicable, stated honestly by GLM: no stats table (HOT/cold), no season/playoff surfaces (OT-block rules), no Guide screen in s5.

## Part 12 — weight

**SETTLED**

- Board 832 nodes at 1180px and 390px; Team Select 78; saves panel 40 (Ernie, Inkling — agree). Board 832 vs Svelte fresh-start arm 871 = within 5%.
- Arms measured 871/457/470/125/247/39 (Inkling). Team Select 78 vs the Svelte arm's 457 is austerity, not free — the arms carried richer detail.
- Bundle: 316 KB JS + 19 KB CSS, gzip ~111 KB (MUSE).

**DISPUTED**

- The v4 prompt's figure **221 is UNKNOWN-origin.** Inkling's sealed-bench measurement was 247 (Feed), not 221. No filing sources 221.

**MISSING:** Feed/share/saves node counts NOT measured by Inkling (UNKNOWN).

## Part 13 — a11y / palette

**SETTLED**

- **Contrast (Inkling only):** all 36 CONTRAST-TABLE cells recompute exactly (his WCAG 2.x implementation); **14 AA-failing cells confirmed**; no fix applied (Owner holds it). **Caveat:** his recompute script `contrast-check.mjs` is NOT on `council/inkling` — numbers verified as read, tool not landed.
- **Theme (Ernie, GLM peer review):** dark-only gold skin, not the w89 law — VERIFIED (`bodyFont: "Times"`, no Cinzel, no `data-zpbteam`, ubCount 0, `colorScheme: dark`, `appBg rgb(24,17,20)`). No `fdf2f6` / `1e1119` / `Cinzel` / `data-zpbteam` / `zcream` / `--tc`. The largest gap vs the Owner's visual law; needs an Owner ruling.

**MISSING:** all non-contrast arms — tab order, tooltip focus, fixtures, docs, w88 diffs. Inkling explicitly did not do them; no other seat did.

## Part 14 — cutover checklist

**SETTLED (Inkling, MUSE only)**

- **Would NOT sign — "NO, not today."** Inkling: 15 numbered checks with commands; six red now (#1 pin moved, #3 66 engine-reaching lines, #6 file:// CORS fail, #7–8 battery unproven on file:// + engine tests pin-coupled, #11 dead TOKEN branch, #12 390 board overflow); #13 and #15 blocked on Owner and Z.ai. What he WOULD sign today: pin hygiene of live gh-pages, swap-with-zero-edits at `d3bd81d2`, and the merge-day gate itself. MUSE's checklist carries the same red items (pin, seam, file://).
- The checklist is a gate, not a declaration — it does not produce a done-ness certificate.

**MISSING:** no other seat filed a cutover checklist.

## Part 15 — TS assets

**SETTLED (Inkling, GLM, MUSE only)**

- **Inkling's seam-gate (2230 filing):** `seam-check.mjs` + `seam-inventory.example.json` (10 VMs pinned at `d3bd81d2`), plain node ESM, exit 0/1/2. Receipts: A. live gh-pages 10 pass / 0 FAIL exit 0; B. s5 delivery 7 pass / 3 FAIL exit 1 (`draft.ts`, `flex.ts`, `slots.ts` mismatch); C. one-byte falsifier in `goneodds.ts` → FAIL naming goneOdds, exit 1. Ready to hand to the Owner as the merge-day gate once Z.ai ships a real inventory; until then it gates the example inventory only. Not a full merge rehearsal (bytes, not semantics). Tested on macOS/node 26 only.
- **GLM's seam-checker (2125 filing):** `seam-check.mjs` + example inventory JSON with real sha256s from s5. Receipts: happy path 6/6 PASS exit 0; one-byte falsifier in `flex.ts` → `FAIL fit … expected 8267d79e6acf889e… got a7d70dd5576e3f7f…`, 1 FAIL of 6, exit 1; zip input proven (honest note: the first zip run's exit code was swallowed by a `| tail` pipe; re-measured without the pipe before claiming it). The checker format is ready to consume Z.ai's handoff inventory.
- **MUSE's seam-checker:** built and falsified (passes clean s5 17/0 exit 0, fails one-byte mutation 16/2 exit 1) — draft filing.
- GLM's seam-width baseline: 14 files · 55 import sites in `src/lib` — totals confirmed by the coordinator's reader re-run; two sub-claims fail the re-run (`feedVM.ts` has 22 engine-import lines, not "10 sites"; distinct engine modules in `src/lib` recount to 26, not 24). Minor errors; they don't touch the totals or the checker.

**MISSING:** no real handoff inventory exists yet, so both gates currently gate example inventories only.

## Part 16 — specs

**MISSING:** MUSE's draft is the only coverage. No independent filing. Nothing here is REVIEWED.

## Part 17 — label hygiene

**MISSING (as an independent finding):** MUSE's draft is the only coverage. The substance: the 8 Inkling + 2 Ernie files mislabeled `FOR: P-345` should be `R-13`; corrections live in MUSE's filing. No other seat covered it. **CORRECTION (2026-11-16, P-373 round): the count is 8 Inkling + 2 Ernie = 10, not 12 — MUSE originally wrote 4 Ernie; Ernie's 2 are already corrected and Inkling's 8 stand per her audit of all 24 of her P-345 files.** Separately, VL flags that **R-13 does not appear in the live QUEUE.md table on council/muse** (reader spot-check corroborated) — queue-custodian work, not an Owner item.

## D3 — box-score mutation scope

**SETTLED (Ernie's ask HOLDS — confirmed by four seats, two of them by running the mutations)**

- **The survivors are real at `86f22d10`.** MUSE ran all four mutations at `86f22d10`: M1 puntYards, M2 touchdowns, M3 firstDowns (all in `box.ts`), M4 interception spot (`drive.ts:136`) — **all survive**, 12/12 on the 1b suite and 363/363 on the full suite. M4 liveness probe: the mutated spot differs from the correct spot in 198/200 turnovers. Pickle ran the same four mutations at **two** commits (`86f22d10`: 363/363 pass before and after; engine tip `a062597f`: 378/378 pass before and after) — four survivors, zero failures, at both. Inkling ran the mutation set at `86f22d10` and found **SIX survivors** (Ernie's three — puntYards, touchdowns, firstDowns — plus three extra probes: sacksTaken, rushYards, passYards; all survive 5/0 in `boxscore.test.ts`). GLM ran doubling mutations (`+= 2`) at `86f22d10`: firstDowns, touchdowns, puntYards all survive the full suite 363/363 — and his control (interceptions/giveaways `+= 2`) was **killed** (363 pass, 362 pass, 1 fail, by the 500-drive cross-check), proving the harness works and the three survivors are real holes, not harness weakness.
- **Structural reason (Inkling):** "team total = Σ players" law compares a team accumulator to player lines built from the same source — no independent source of truth.
- **Pin scope (Inkling/VL) is true as far as it goes, and does not answer the question.** Verified: `colors/src/sports/nfl/sim` is empty at both `4ca9a071` and `d3bd81d2`; `box.ts` exists at `86f22d10` (91 insertions, 0 deletions in the diff from `d3bd81d2`). The shell's pin could not have caught them — but the survivors live on the Architect's engine line, where they should be fixed. **Inkling concedes this himself:** "Ernie's survivors are real at 86f22d10 (reproduced VERIFIED). Inkling's pin-scope position is also correct as far as it goes (box.ts does not exist at the shell's pin). Both hold; neither was a complete answer." GLM and Pickle reach the same verdict ("both seats are right, on different halves").
- **The interception spot — refined, not just confirmed.** GLM wrote that the spot "is not even computed" — **half-true** (Pickle's refinement, VERIFIED and correct): there is **no spot field in the box score** (`Box`/`TeamLine`, `box.ts:13-14`) — correct. But the turnover spot **is computed** at `drive.ts:136`: `next = { team: opp, ydl: min(touchbackYdl, max(1, 100 - ydlAfter)) }`. It is the next drive's starting field position, and it is **unasserted** — Pickle's mutation 4 hands every turnover over at the 25 and the suite stays green. Consequence: the fix is **not** "add a spot field to the box score" (a modelling question for the Architect). It is **"assert the spot that already exists on `drive_end.next.ydl`" — a test-only change.** Inkling did NOT mutation-test the spot himself (UNKNOWN by his hand — MUSE and Pickle did).
- **Fix shape (mild divergence, same facts):** Pickle's Part D — four assertions as **event-log identities in `sim-slice.test.ts`**, "not as constants, or they become the tautology this exercise exists to find": firstDowns = plays with `firstDown`; puntYards = sum of `kickYards` over punt plays (and `netYards` must still exclude them); touchdowns = drives ending `td`, independent of the score (why mutation 3 survived); turnover spot = `d.end.next.ydl` per `drive_end` with `result === 'to'`. MUSE proposes four assertions for `sim-slice.test.ts` (puntYards sum, touchdowns count + points cross-check, firstDowns count, exact interception spot). Inkling proposes three independent-source assertions in `colors/test/nfl/boxscore.test.ts` @ `86f22d10` over ≥120 games. GLM proposes DriveRow fields for firstDowns/puntYards and a spot-carrying/range-check design (INFERRED, modelling-adjacent). **Pickle's test-only shape should win unless the Architect wants the box-score field.** Ownership: the **Architect** — test-only, in the engine's suite, at or after the next pin commit. UNKNOWN: whether the Architect has a fix in flight after `a062597f`.
- **Scope corollary (Pickle):** the pin is an ancestor of `86f22d10` (`git merge-base --is-ancestor d3bd81d2 86f22d10 -> YES`); the next re-pin pulls `sim/` into the shell's `src/engine/`. From that commit forward the shell's battery **does** become responsible for these laws.

---

## The four named discrepancies — final reconciliation

### (a) M1 one-door count — SETTLED at 15 files / 65 import lines (s5 delivery)

MUSE (15), Pickle (15), Inkling (15 files / 66 engine-reaching lines, 65 import statements, 33 value-importing lines), DS (15), and the coordinator's own grep all agree. **Ernie's 14 is not an error — it is a different tree and a different grep:** the rev2 tree (slices 1–4) with a mention-grep (`grep -rln "engine/" src/lib src/App.svelte` → 14). s5 adds slice 5, whose `shareVM.ts` is the 15th file. **VL's 16 is the only unreconciled number** — his headline (16 files / 66 import lines) does not reconcile with his own itemized breakdown (13 files / 50 sites). **Pickle's per-file table sums to 58, not 65** (feedVM 15 vs true 22; App 11 vs true 10; shareVM 1 vs true 2) — use DS's breakdown, which sums correctly and was confirmed by re-run. GLM's "feedVM 10 sites" is wrong (22 lines) and his "24 distinct modules" recounts to 26 in `src/lib` (Pickle's 32 src-wide confirmed by re-run). **The "earlier 12" cited in the coordinator's brief cannot be sourced** — no "12 files" claim appears in any of the 13 GLM/Pickle/DS filings or in Ernie's two filings; the nearest numbers are Ernie's 13 (M5 files) and 14 (M1 files). Provenance UNKNOWN — possibly from Z.ai's handoff or an earlier round outside the reading list. **Do not cite it without a source.** The verdict (FAIL, no adapter) is unanimous; MUSE's stronger claim (no adapter exists at all) is confirmed.

### (b) Battery count — RESOLVED: different trees, both numbers correct

**75/0/10/3 = the s5 delivery** (shipped `slice1-battery.json`: pass 75, fail 0, skip 10, defer 3; 88 results; 73 `ok('...')` calls — MUSE VERIFIED; VL VERIFIED by reading the JSON; Inkling reproduces it in Swap A). **61/0/10/3 = Ernie's run against the s3-s4-rev2 tree** (no Slice 5; 61 + 14 = 75, Slice 5's 14 laws). **The round's number is 75/0/10/3** — the s5 delivery is the shell under review. At `86f22d10` the battery runs 74/1 (the TOKEN tautology fires — see Part 6/7).

### (c) Pin — SETTLED on the facts; the stale-document framing is resolved

Facts unanimous (see Part 10). Framing: **the gh-pages README is the stale document** (Inkling, Pickle, DS, GLM after his in-place amendment, MUSE). VL's AGENTS.md-stale framing is the only dissent and rests on reading AGENTS.md's claim as being about the s5 delivery; AGENTS.md's claim is about the gh-pages deployment, where it is true. **MUSE's three-way framing is the precise one:** the real defect is three diverged trees (gh-pages `d3bd81d2` slices 1–2; rev2 `4ca9a071` slices 1–4; s5 `4ca9a071` slices 1–5) with **no named shell of record**. The one-line fix both framings imply: update the gh-pages README pin line to `d3bd81d2` (52 → 57 files). The deeper question — is s5 re-pinned or deliberately left at `4ca9a071`? — is open and needs the Owner/Architect.

### (d) D3 — SETTLED: Ernie's ask HOLDS

See D3 above. MUSE ran all four mutations at `86f22d10` (all survive, 12/12 and 363/363). Inkling reproduced six survivors and conceded both positions hold. Pickle ran all four at two commits (all survive, 363/363 and 378/378). GLM ran doubling mutations plus a killing control. VL sided with Inkling by scope argument and did not run mutations. The remaining question is ownership (settled: the Architect, test-only assertions) — not whether the survivors are real.

---

## The seven Owner-ruling items from MUSE's draft — confirmed, refuted, or refined

| # | Item (MUSE's draft) | Verdict against the other seats |
|---|---|---|
| 1 | The pin mess | **CONFIRMED and sharpened.** All seven seats agree on the facts; the stale document is the gh-pages README; the real defect is three diverged trees with no named shell of record. Fix: one-line README fix + Owner names the shell of record (GLM's INFERRED recommendation: s5 + 11-file re-pin + rev2 fixes folded in — a product call, the Owner's). |
| 2 | The blue law vs w88 look | **CONFIRMED and sharpened.** Inkling (Part 11) + Ernie (Part 13) + GLM (F-9b/F-11b) + VL (Part 1, light mode absent): the shell implements the dark-gold look, not the w89 pale-rose law; `.ub`/blue absent; Cinzel absent; light mode not built. Owner ruling needed: re-cut the skin or amend the ruling. Also still unruled: light gold2 AA failure, w89 one-line dark `--text` fix, Bodoni Moda. |
| 3 | The label-only valuation-mode switch | **CONFIRMED, narrowed to a one-word ruling.** GLM F-9a: `valuation.ts:11` labels the measured default "Model Value"; the v4-1 ground truth calls it "Engine Value". Inkling/Ernie confirm the label travels (board + Team Select) and the switch locks mid-draft. Owner rules which word ships. |
| 4 | Single-file / file:// discipline | **CONFIRMED by three seats.** Inkling (file:// FAIL, VERIFIED, Chromium capture), MUSE (single-file FAIL, VERIFIED; file:// FAIL, INFERRED), Ernie (file:// REPORTED from Z.ai, not re-run). The w89 pattern exists and is buildable now. |
| 5 | Cutover would-not-sign | **CONFIRMED.** Inkling: "NO, not today" — 6 red checks of 15; MUSE's checklist carries the same red items. The checklist is a gate, not a declaration. |
| 6 | D3 ownership | **SETTLED — Architect.** Four test-only assertions (Pickle's Part D shape preferred; MUSE's and Inkling's shapes are compatible). See D3 above. |
| 7 | 390px board overflow | **CONFIRMED by three seats with the same root cause.** Ernie (scrollW 444, 120 offenders, root cause `BoardRow.svelte:38` grid = 396px minimum), Inkling (same 444/54px), GLM peer review (D1 CONFIRMED, same CSS applies to s5). Team Select clean at 390. |

---

## Cross-cutting findings the round surfaced

1. **The deployed tree is red on its own engine suite (Pickle, new).** gh-pages: 277 pass / 9 fail of 286 — the re-pin moved the engine and `flex.json` but not the carried test expectations. A re-pin must move the snapshot, `flex.json`, **and** the carried expectations in one green commit. The E5 stamp can only be re-pinned by the Architect.
2. **Two battery tautologies.** The season-brag TOKEN law (uppercase table vs mixed-case render — Inkling) and the shared-module recompute laws (battery passed a 0–21 loss labelled VICTORY and a board with every gone% at 0% — MUSE). Gone% values have no law at all.
3. **Two working merge-day gates exist.** Inkling's seam-gate (10 VMs, falsified three ways) and GLM's seam-checker (6 entries, falsified, zip input proven) are both ready once Z.ai ships a real handoff inventory. MUSE's seam-checker is a third, draft-filed.
4. **The shell of record is unnamed.** Three trees, two pins, no document names which is the shell. Until it is named, no seat's measurements are commensurable (GLM: "my seam baseline ran on s5, Ernie's D1–D6 ran on rev2, Inkling's audit ran on gh-pages + s5 — all correct, none commensurable").
5. **The "never print the words Touchdown" law has no cited source.** GLM found zero hits for it across `origin/council/muse`. The fact (feed prints "touchdown") is verified; the law needs a citation before it drives a fix.
6. **The battery is not runnable on a bare checkout** (global-Playwright dependency — GLM). Its runtime assumptions belong in SNAPSHOT.md.
7. **R-13 is not in QUEUE.md** (VL, spot-check corroborated) — queue-custodian work, not an Owner item.

---

## What needs the Owner's ruling (consolidated)

1. **Shell of record:** gh-pages (`d3bd81d2`, slices 1–2) vs rev2 (`4ca9a071`, slices 1–4) vs s5 (`4ca9a071`, slices 1–5). GLM's INFERRED recommendation: s5 + the 11-file re-pin + rev2's post-s5 fixes folded in.
2. **Whether s5 is re-pinned to `d3bd81d2` or stays at `4ca9a071` deliberately** (and say so in its README).
3. **The visual law:** re-cut the shell to the w89 pale-rose / Cinzel law, or amend the ruling. (Blocks P-317 acceptance — Inkling.)
4. **"Model Value" vs "Engine Value"** for the measured default (one string, `valuation.ts:11`).
5. **"2PT" / "2PT FAIL" chips vs "2-Pt Conv" everywhere** (GLM F-11a).
6. **The `.ub` / user's-team-in-blue law** — required in the shell, or redundant under the team-palette remap? (GLM F-9b/F-11b; Ernie D3.)
7. **The "never print the words Touchdown" law** — cite where it is written, or it does not drive a fix (GLM).
8. **`madden27-ratings.csv` provenance** — name the source; do not assert "Official Madden 27" (Inkling).
9. **Still unruled from earlier rounds:** light gold2 AA failure; w89 one-line dark `--text` fix; Bodoni Moda.
10. **The propose-first gate for Z.ai** (Inkling's gate vs KG's standing autonomy grant) — carried forward, unruled.
11. **Glyph's FOR: CAKEPANZ-SHELL tag** — kept as a filename slug, not a FOR: value; KG to rule if he wants it as a FOR: value.
