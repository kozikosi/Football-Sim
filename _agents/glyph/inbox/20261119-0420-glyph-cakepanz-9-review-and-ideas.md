SPEAKER: glyph | ROLE: reviewer | TASK: cakepanz-9 thorough review + UI/UX implications/ideas | DATE: 2026-11-19T04:20:27Z
FOR: (Owner request, 2026-11-19) — push Desktop `67-cakepanz-9-2026-11-19` to branch for readability + thorough review, implications, and brainstorm/improve cakepanz UI/UX shell for Claude's engine. Not a queue item.

# Cakepanz-9 delivery review (glyph) — 67-cakepanz-9-2026-11-19

## Scope and method
- **VERIFIED (repo/git):** working tree `/Users/kosi/Desktop/wt/glyph`, branch `council/glyph`, git common dir `/Users/kosi/Desktop/Football Sim/.git`; `git fetch origin && git show origin/council/base:tools/sync-base.sh | sh` → `up to date with council/base (864a6aa1)`; `node tools/preserve.mjs check` run (reports unsaved/dirty state in other worktrees globally; no glyph changes outside this delivery/review). Boot docs read from `origin/architect/engine-and-seats` and `origin/council/muse` as instructed.
- **VERIFIED (source copied):** `/Users/kosi/Desktop/Football Sim/67-cakepanz-9-2026-11-19` copied into `_agents/glyph/deliveries/67-cakepanz-9-2026-11-19/` excluding `node_modules` and `.DS_Store` (`rsync -a --exclude=node_modules --exclude=.DS_Store ...`). Result: 1070 files, ~36M, no `node_modules`, no nested `.git`.
  - Pushed in commit `89d7d15b5204e9db47b8e797e5358c96c3705207` on `origin/council/glyph` (this review pushed separately; see commit trail).
- **VERIFIED (static inspection performed by glyph, no suites re-run):** read `README-DELIVERY.md`, `README-DELIVERY-c8.md`, `RECEIPTS.md`, `WHAT-CHANGED.md`, `ledger/intake-zai-cakepanz-9-2026-11-19.md`, `ledger/build-report-zai-cakepanz-9-2026-11-19.md`, shipped/prepared `VERIFY.txt`, `SHELL-STATUS.md`, `ACCEPTANCE-RECEIPTS.txt` (head/tail), key source `cakepanz-4/src/App.svelte`, `src/lib/components/{DraftBoard,BoardRow,BoardFooter,LineupAdvice}.svelte`, `src/lib/screens/Complete.svelte`, `src/lib/port/{router,settings}.ts`, `batteries/board.battery.mjs`, `scripts/falsify-board.mjs`, and tree diffs/structure. **I did not execute engine/node/shell/board/slice/falsifier/gate/composite commands in this session**; all test/gate/composite outcomes below are REPORTED from packaged receipts/docs unless explicitly marked VERIFIED.

## Delivery contents (VERIFIED)
- Root docs: `README-DELIVERY.md` (+ c7/c8 records), `WHAT-CHANGED.md`, `RECEIPTS.md` (era banner), `START-OF-CHAT-ZAI.md`, `ledger/{intake,build-report}-zai-cakepanz-9-2026-11-19.md`, `receipts/partF-c7..partH-c9`.
- Two trees: `cakepanz-4/` (shipped) and `cakepanz-4-prepared/` (prepared), each with `src/`, `dist/`, `batteries/`, `scripts/`, `test/`, `tools/`, manifests/checksums, `VERIFY.txt`, `SHELL-STATUS.md`, `ACCEPTANCE-RECEIPTS.txt`, delivery snapshots. `cakepanz-4-prepared` additionally carries `data/packs/nfl-passclass-fit{2016-2022,2023-2025}.json` and passclass engine/test deltas (see diff notes).
- **VERIFIED hashes sampled:** `shasum -a 256` of `cakepanz-4/dist/single.html` and `cakepanz-4-prepared/dist/single.html` both `670d4c08f2ab9293ba7b7823eea2ea6b22388d07000fdb638ba35645fb3452d1` (matches README/build report). `START-OF-CHAT-ZAI.md` is byte-identical across root/shipped/prepared at `15f088c71918b1a8a3f46c33d3056bffcb3b155d8cfab97b30fbbc34fd806aec`.
- **REPORTED (from docs):** shipped pin `5c808472` (67 engine files), prepared pin `65673a00` (68 files, NOT ACTIVATED), engine pin `4ca9a071` context elsewhere in project; cakepanz prepared differs by `sim/game.ts` + `sim/passclass.ts` (+ related packs/tests/engine-node stamp) and is additive-default-off per VERIFY; flex census 99 rules `{0:17,2:17,6:42,12:23}`. No gh-pages push claimed.

## Shipped vs prepared diff (VERIFIED `diff -rq`, high level)
- Both share the same app/shell source shape for cakepanz-9 UI work; prepared differs in: `ACCEPTANCE-RECEIPTS.txt`, manifests/checksums, receipt/log snapshots, some `shots/`, `dist`-adjacent receipt outputs, and engine/test/packs (`src/engine/sports/nfl/sim/{game.ts,passclass.ts}`, `src/engine-node/...`, `test/engine/nfl/passclass*`, `data/packs/nfl-passclass-*`, `test/engine.test.ts`). This is consistent with a prepared re-pin carrying passclass additions while keeping shell behavior aligned. **INFERRED:** UI/UX shell changes are intended to be tree-consistent; any engine-behavior-dependent UX should be validated per pin.

## Product/UX changes reviewed (VERIFIED by code reading)

### B-bis — late-mode flip removed, one uniform board (Owner ruling honored)
- `src/lib/components/DraftBoard.svelte`: comment states "ONE uniform board for picks 1–32 — the late-mode flip is SUPERSEDED and deleted"; no `data-form`, no simple branch, no FULL BOARD door, no late note. `shown` rows filtered by needs only; `suggestIds` computed from active sort with top-3 + tie extension. **VERIFIED:** grep for `data-form|lateMode|simpleOff|setFullBoard|cp-late-note|cp-fullbtn|cp-simplerow` in shipped/prepared `src/` returns only superseded comments (no runtime artifacts). `src/lib/port/settings.ts` contains no `fullBoard` (pre-8.1 shape, fields: mode/reducedMotion/newestFirst/teamName/draftSlot). `batteries/board.battery.mjs` + `scripts/falsify-board.mjs` present; `late.battery.mjs`/`falsify-late.mjs` absent in both trees.
- **Implication:** removes a mode split and the associated persistence/restore complexity; one mental model for all picks. Caption semantics in `BoardRow` (WINS/PRIO/OVR labels) remain valuable as "what this number means" in a uniform row.

### B1 (C1) — new draft after done draft lands on board
- `App.svelte`: `startDraft()` dispatches `START` before `go('board')` with B1/C1 comment so done-guard reads fresh drafting state; `go()` forces finished board -> `complete`; `pick()` routes to complete when `status === 'done'`; `refresh()` avoids swallowing done-draft `goneOdds` throw path by nulling odds when done. `hydrateBoot()` goes to hub when week autosave resumes (A1 lineage). **VERIFIED in code.**
- **Implication:** fixes a high-severity state-lie/blank/stale-complete class. Centralizing terminal-state normalization in `go()` is a good seam; remaining risk is any future screen write bypassing `go()`.

### B2 (C2) — Complete screen honest in partial state
- `Complete.svelte`: `data-state={complete ? 'complete' : 'partial'}`; `<h1>` only in complete branch; partial copy states `{picks} of 1,024`; PLAY THE SEASON button `disabled={!complete}` with `title={complete ? undefined : 'the season needs a finished draft'}` (existing string); back/hash-door behavior covered by board battery L11 per docs. **VERIFIED.**
- **Implication:** preserves layout, communicates truth, and blocks invalid action without removing affordance.

### C′1 — top-three suggestion ring (speedrun aid)
- `DraftBoard.svelte` + `BoardRow.svelte`: `suggestIds` includes first 3 by active `vm.sort` value and extends while third value ties; rows receive `suggest={suggestIds.has(r.id)}`; `.cp-suggest .cp-main` gold ring/shimmer, reduced-motion/body-reduced disables animation. `data-id` on rows supports exact-id assertions. **VERIFIED.**
- **Implication:** strong assist for "speedrun the suggestions" without adding text/second control. **RISK/UX note (INFERRED, consistent with intake):** tie extension can highlight many rows in late rounds when values cluster; may dilute "top three" meaning but follows stated rule.

### C′2 — Complete roster print (engine lineup, weakest marked)
- `Complete.svelte` computes `rosterSlots` via `rostersOfRecord(record)` + `lineupFor(...,'4-3')`, maps label/name/effOvr, sets `data-lineup="complete|incomplete"` when <11 fielded, marks three weakest by effOvr via `weakIdx` passed to `LineupAdvice`. **VERIFIED.**
- `LineupAdvice.svelte` accepts optional `weak?: number[]`, adds `.cp-weak` styling additively. **VERIFIED.**
- **Implication:** turns completion into an informative roster/needs checkpoint grounded in engine truth (not UI invention). "incomplete" remains attribute-only per Owner-copy constraint.

### C′3 — wall-slip reveal (cinematic, accessible)
- `Complete.svelte` CSS cascades `.cp-done > *` with staggered delays (h1 0s, stats/sub/prov/note/roster 0.18s, chipline 0.36s), ≤ ~0.86s total; `@media (prefers-reduced-motion: reduce)` and `:global(body.cp-reduced)` disable animation. **VERIFIED.**

### Router/state normalization touch
- `App.svelte` `syncFromHash()` now does `const r = currentRoute(); if (r) go(r.screen, r.param);` (routes through `go()` normalization) rather than directly setting screen. **VERIFIED.** `router.ts` remains a simple hash parse/serialize/navigate helper (no done-draft knowledge). **Implication:** closes third write-path class for done-draft convergence; normalization logic lives in app `go()` (acceptable now, but a pure helper would be easier to unit-test/reuse).

## Batteries, falsifiers, and law discipline (REPORTED from package; structure VERIFIED)
- **VERIFIED present:** `batteries/{node,slice1,shell,board}.battery.mjs`, `scripts/falsify-board.mjs` with F0-board/F0-shell baselines and F15-board,F17-F22 mutation stages mapped to L8,L10-L15,L12/L13 as documented; board battery covers L13 suggestion ids/tie sampling, L8 complete-via-real-UI + hash door, L14 roster sha-exact/weakest/data-lineup, L15 cascade timing+reduced-motion, L10 new-draft-after-done, L11 partial-complete honesty/disabled CTA/back path.
- **REPORTED outcomes (not rerun):** engine 394/394 shipped, 406/406 prepared; node 33/33; shell 48/0 (S1a–S31 + L12); board 6/6; slice 29/0/10/3; receipt falsifier F0–F12 died; shell falsifier FA/FB/FC died; falsify-board exit 0 with all required stages dying; gate-manifest PASS (314/319) and gate-numerals CLEAN ×4 invocations claimed; flex/pin/snake checks receipted.
- **Assessment (INFERRED):** law+falsifier-per-behavior is a strong reliability pattern for UI work on a frozen engine. The explicit "apply-asserted anchors" and "baseline before mutation" discipline directly addresses prior tautology/anchor-drift failure modes.

## Acceptance/composite and doc-integrity findings
- **REPORTED + partially VERIFIED:** prepared `ACCEPTANCE-RECEIPTS.txt` tail shows cakepanz-9 regenerated composite steps ending `ACCEPTANCE RUN COMPLETE — every step exit 0` (369 lines). Shipped `ACCEPTANCE-RECEIPTS.txt` has cakepanz-9 pointer header then a complete 8.1-era record (354 lines) — consistent with stated "shipped k1 composite re-run is the ONE open item; closure stands on completed 8.1 on-disk record + per-tool re-runs at final bytes; no COMPLETE written over unfinished run" (honest, but easy to misread at a glance).
- **VERIFIED doc-consistency nits:**
  - `START-OF-CHAT-ZAI.md` actual hash is `15f088c7...` (all 3 copies). `README-DELIVERY.md`/`build-report` cite `f31bdf51...` in the final-state table/text in places, while README/WHAT-CHANGED history also references `8ef3b18...` (earlier). This is a citation drift risk even when files are byte-identical to each other.
  - `scripts/falsify-board.mjs` prints `F13→F20 suggestion law` (label maps old/new stage numbering) — minor readability nit; behavior/target (L13) is clear.
- **RECOMMENDATION (INFERRED):** add/run a small "cite-check" pass in delivery closure: re-hash every file claimed identical/sha-stated, verify every `ACCEPTANCE-RECEIPTS` is script-regenerated for the claimed tree/state, and fail if a README/report hash literal disagrees with measured bytes. Also standardize shipped open-item presentation (e.g. explicit `STATUS: PENDING k1 parity rerun` banner above any historical tail).

## Risks / things to watch (INFERRED unless noted)
- **L13 tie-extension breadth:** can exceed 3 highlights in tied-value late rounds (intentional per rule). May confuse "top three" expectation; product may want cap+indicator or clarified copy if Owner revisits.
- **State normalization ownership:** `go()` contains done-board coercion; `router.ts` does not. Future direct `screen = ...`/hash flows must keep routing through `go()` (battery L8 hash-door helps, but contract is implicit).
- **Cross-pin UI assumptions:** prepared introduces passclass engine delta/packs; roster/VM outputs should remain contract-compatible, but any value-sensitive UI (suggestion ordering ties, weakest slots, summaries) depends on engine/VM data — keep tests pin-aware.
- **Composite parity gap (REPORTED):** shipped k1 script regeneration pending; treat as process debt to close before claiming full parity.
- **No runtime re-verification by glyph:** all behavioral confidence beyond static review relies on Z.ai's receipted runs; independent rerun on a clean environment would raise trust (blocked here by environment/time, not attempted).

## Further implications for cakepanz / Claude's engine UI/UX shell

1. **Engine-truth UI is the right axis:** C′2 (lineupFor/effOvr/weakest) and suggestion ordering by active VM sort keep the shell explanatory without inventing semantics. Future surfaces (recaps, awards dashboards, shareables) should stay read-only projections of engine/VM state and carry the same "label travels with numbers / provenance visible" discipline.
2. **Terminal-state machine clarity matters as much as visuals:** C1/C2/4.4 fixes show most user-visible "lies" were state-transition issues. Investing in a tiny, testable screen-state policy (`requested screen × draft status × season/session presence -> resolved screen + disabled affordances`) will prevent regressions as hub/week/restore flows grow.
3. **Cinematics should remain tokenized, short, and law-bound:** C′3 pattern (CSS-only, staged, reduced-motion instant, no strings) scales well to pick-confirm pulse, week advance, and completion/ceremony moments — but every animation needs a falsifiable assertion (present, bounded duration, reduced-motion off) to avoid "feel-only" drift.
4. **Uniform board simplifies accessibility work:** one row anatomy across 32 picks makes focus order, keyboard drafting, and screen-reader announcements tractable. Next leverage: deterministic focus after expand/confirm/CPU advance and an explicit live status region.
5. **Receipt-driven delivery is a product quality feature:** the falsifier/battery culture catches UI regressions the way engine tests catch sim regressions. Extending this to doc/claim integrity (cite-check) closes the last common failure mode: true bytes with mismatched narrative.

## Brainstorm / innovation ideas (prioritized; proposals only, INFERRED)

### P1 — ship-confidence & correctness multipliers
- **Screen-state policy module (pure TS):** extract `resolveScreen(requested, {draftStatus, hasDraft, seasonReady,...})` from `App.svelte` logic; cover with node laws (done->complete, partial complete deep-link, restore-to-hub, new-draft-after-done). Prevents route/write-path regressions.
- **Cite-check gate for deliveries:** script that verifies claimed sha256/count literals in README/VERIFY/build report against measured files and flags open/pending composite states prominently. Low effort, high trust.
- **Focus & live announcements:** after pick confirm, move focus to next actionable element or board status; `aria-live="polite"` for "pick recorded / CPU picking / your pick / draft complete" so non-visual and speedrun flows get feedback without animation.
- **Keyboard endgame draft path (W1-compatible):** arrows to move selection, Enter/`D` to open/confirm primary suggestion, respecting existing DRAFT/confirm semantics and batteries. Aligns with Owner speedrun instinct and accessibility.

### P2 — draft/season UX depth on existing VM data
- **Suggestion clarity under ties:** keep tie-extension rule but add a subtle, non-text indicator/count logic or cap visual emphasis to first 3 while preserving deterministic "next best" set in data attrs for tests (needs Owner/Architect call). Avoid diluting the highlight.
- **Pick/turn heartbeat:** small reduced-motion-safe pulse or haptic (`navigator.vibrate?.(12)` where available) on confirmed pick / turn-ready (W2-style), lawed like C′3.
- **Complete/recap enrichment (no new engine data):** compact "draft recap strip" (picks by position, biggest reaches/values if derivable from existing board metrics) and a shareable summary card generated from record — all VM-derived, testable by value equality.
- **Needs-aware board affordances:** current needs filter is strong; consider persisting filter intent per session view and showing "fills open need" cue only when true (must remain engine/slot-truthful).

### P3 — information surfaces and polish (when data/contracts exist)
- **Headless sortable tables for Awards/Season/Standings/Book views:** adopt only when a concrete table surface is specced (TanStack-style headless) so sorting/column state is not reimplemented per screen; law: displayed value == source ordering.
- **Team/theme contrast guardrail battery:** automated 32-team × mode contrast checks for key text/token pairs (W5-style), failing with named team/token — protects readability as palette/tokens evolve.
- **Visual regression + a11y (test-time):** small pinned screenshot set for critical states (team select, board early/late, complete partial/done, hub/week) and axe checks in Playwright batteries; no product/runtime deps.
- **Charts only on existing series:** PF/PA/scoring/award-leader visuals are viable where VM provides stable series; avoid per-drive/win-prob charts until engine exposes them (per brief discipline).

### Guardrails to preserve (do not regress)
- Engine is frozen truth per pin; shell never edits `src/engine/**` or protected semantics. Offline/local-first and readable receipts remain core. Reduced motion always honored. No invented copy/labels outside Owner-approved inventory. Prefer falsifiable laws for every new interaction.

## Verdict
- **VERIFIED:** cakepanz-9 folder (excluding `node_modules`) is copied and committed for branch readability (`89d7d15b5204e9db47b8e797e5358c96c3705207`); key structural/product claims for B-bis, C1/C2, C′1–C′3, uniform-board battery/falsifier presence, and dist/START byte identities sampled hold in the delivered files.
- **REPORTED (high confidence, receipted in-package, not rerun by glyph):** the claimed engine/node/shell/board/slice/falsifier/gate runs and prepared composite completion; shipped k1 composite parity rerun remains the documented open process item.
- **INFERRED:** the main remaining quality levers are (a) closing shipped composite parity + cite-checking doc hashes/claims, (b) formalizing screen-state normalization/focus behavior, and (c) extending the same law+falsifier discipline to the next UX layer (keyboard/accessibility, recap/ceremony, sortable surfaces) without touching engine semantics.

