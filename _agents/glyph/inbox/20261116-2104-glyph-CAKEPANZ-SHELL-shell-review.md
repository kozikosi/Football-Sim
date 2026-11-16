SPEAKER: glyph | ROLE: council | TASK: 67 Cakepanz shell inventory + pin contradiction review (Parts 1,10) | DATE: 2026-11-16T21:04Z
FOR: R-13

# 67 Cakepanz shell review — inventory, deployment state, and pin contradiction

Scope: assist Z.ai's Cakepanz shell finish (prompt v4 council). This file covers **Part 1 (inventory/review of shell as it stands)** and **Part 10 (pin contradiction)** using repo evidence available in this worktree. I did not build the product, did not edit engine/colors, and did not run browser batteries (no local Playwright/build harness executed here).

## Evidence gathered (VERIFIED commands)

- `git show --name-only origin/gh-pages -- 67-cakepanz` → latest gh-pages change touching Cakepanz: `66096fb1392890c2ab43822353485c255c9ddb4a 67 Cakepanz: re-pin engine snapshot 4ca9a071 -> d3bd81d2 (99-rule flex, QB->FS 12)` (18 files under `67-cakepanz/src/engine/**` and `67-cakepanz/tools/mathlab/**` changed).
- `git show origin/gh-pages:67-cakepanz/src/engine/sports/nfl/engine/flex.ts | head -3` → snapshot carries 99-rule flex header ("99 rules (Owner 9-10 Nov 2026... Counts: 23 at 12, 43 at 6, 10 at 2, 23 at 0").
- `git show origin/gh-pages:67-cakepanz/README.md | grep -n "Pinned engine commit"` → line 4: `**Pinned engine commit:** \`4ca9a071\` on \`architect/engine-and-seats\`` (STALE vs snapshot contents/re-pin commit).
- `git ls-tree -r --name-only origin/gh-pages -- 67-cakepanz/src/lib | sort` → 11 files only: `components/{BoardFooter,BoardHeader,BoardRow,DraftBoard,LineupAdvice,ModeSwitch,SlotPicker,SortControls}.svelte`, `draftStore.ts`, `screens/TeamSelect.svelte`, `valuation.ts`.
- `git show origin/gh-pages:67-cakepanz/src/App.svelte | grep -n "engine/"` → 9 direct engine imports in app root (buildPool, Player, makeRng x2, goneOdds, boardVM/BoardVM/BoardSort, lineupFor) plus comment referencing pinned view path.
- `git show origin/gh-pages:67-cakepanz/src/lib/screens/TeamSelect.svelte` → team picker only (no draft position/slot 1–32 selector); `startDraft(teamIndex)` flows to `START { seed, userTeam }`.
- `git show origin/gh-pages:67-cakepanz/src/engine/sports/nfl/app/store.ts | grep -n "START\|order\|slot"` → `START` action is `{ seed, userTeam }` only; store restores/advances with fixed snake order semantics (no slot/order in save contract shown).
- Local deliveries inspected (paths present in this worktree): `_agents/glyph/deliveries/zai-sitting-2026-11-15/67-cakepanz-s3-s4-rev2/` and `_agents/glyph/deliveries/67-cakepanz-s4/` contain s3-s4 rev2 artifacts; `git show origin/council/inkling:_agents/inkling/deliveries/67-cakepanz-s5/README.md` describes slices 1–5, 75/0/10/3 battery, pin stated as `4ca9a071` but built on earlier base; `git ls-tree -r --name-only origin/council/inkling -- _agents/inkling/deliveries/67-cakepanz-s5/src/lib` shows expanded lib (feedVM, shareVM, savesApp, NeedsRow, Saves, Feed, Share, ink, bragCard etc.).
- `git ls-remote --heads origin | grep -E 'gh-pages|council/inkling|council/ernie|council/zai|architect/engine-and-seats'` confirms refs: gh-pages `66096fb1`, inkling `f9775783`, ernie `bf9bcb56`, zai `25e3b2f9`, architect engine tip `a062597f`.

## Part 10 — Pin contradiction (VERIFIED finding)

**Claim tested:** "README.md says pinned engine commit is 4ca9a071; AGENTS/engine pin is d3bd81d2."

- **README (gh-pages deployed tree):** states `4ca9a071` (stale). VERIFIED by `git show origin/gh-pages:67-cakepanz/README.md`.
- **Deployed snapshot contents (gh-pages):** engine flex/mathlab files were re-pinned to `d3bd81d2` in commit `66096fb1` and flex header/count reflects 99-rule table. VERIFIED by re-pin commit message + flex.ts header in deployed snapshot.
- **Inkling s5 delivery README (on council/inkling):** states pin `4ca9a071` and "re-verified byte-identical..." for that delivery context (REPORTED by that README; not re-verified by me here). This conflicts with current gh-pages re-pin if read as "current state".
- **Architect engine source-of-truth:** `origin/architect/engine-and-seats` flex header also 99-rule table (VERIFIED sample via `git show origin/architect/engine-and-seats:colors/src/sports/nfl/engine/flex.ts | head -3`).

**Verdict (pin):** `src/engine/**` on gh-pages is aligned to the **d3bd81d2 flex/mathlab re-pin content** (per `66096fb1`), but **gh-pages README is stale/wrongly names 4ca9a071**. Inkling s5 docs also still name 4ca9a071 for that delivered tree (REPORTED). A mergeable shell cannot have ambiguous pin documentation: SNAPSHOT/MERGE docs must state actual pin, per-file hashes, and re-pin procedure. **Defect/risk:** documentation drift can cause wrong merge assumptions.

## Part 1 — Shell inventory (screen-by-screen, best-known state)

### A. Deployed gh-pages `67-cakepanz/` (VERIFIED by file listing/import scan)
- **Present:** Draft Board components, Team Select screen, valuation/mode plumbing, basic draft store wrapper, engine snapshot + mathlab/tools/test copies, slice1 battery/probe artifacts. `package.json` name/version indicate slice 1 era (`0.1.0-slice1`).
- **Missing/unknown on deployed tree:** no `Saves`, `NeedsRow`, `Feed`, `Share` components/screens in `src/lib`; no `feedVM`, `shareVM`, `savesApp`, `bragCard`, `ink` modules in deployed `src/lib`; no `SNAPSHOT.md`, `MERGE-README.md`, `MERGE-GUIDE.md`, `SHELL-STATUS.md` found. This suggests gh-pages may lag behind s3-s4/s5 delivery trees (INFERRED; needs deploy comparison by Z.ai/Owner).
- **P-317 blocker visible:** Team Select has no draft-position (slot 1–32) picker; store START has no slot/order.

### B. Inkling s5 delivery on `origin/council/inkling` (REPORTED by README/tree, partially VERIFIED by path listing)
- **Reported built:** slices 1–5 (board, team select, hydration/board chrome/saves, drive-level feed, brag+seed shareables), battery 75/0/10/3 green, engine tests 284/0, evidence shots and per-law JSON.
- **Verified present in tree:** expanded `src/lib` including `NeedsRow`, `Saves`, `Feed`, `Share`, `feedVM`, `shareVM`, `savesApp`, `abbr`, `bragCard`, `ink`; `batteries/seasonfixture.mjs`, `weekfixture.mjs`, probes, share shots.
- **Not verified by me:** battery pass claims, file:// singlefile behavior, 390px/no-console receipts, determinism proofs — all REPORTED pending rerun by a verifier with harness.
- **Known gaps from spec in prompt v4:** no visible `SNAPSHOT.md`/`MERGE-*`/`SHELL-STATUS.md` in listed s5 tree; Team Select in deployed slice-2 form still lacks slot picker (s5 README does not claim P-317 solved); season hub/week views/standings/bracket/awards/review/guide/player cards/stats/settings listed as future shell work remain unbuilt/unknown.

### C. Ernie s3-s4-rev2 delivery (`_agents/ernie/deliveries/.../67-cakepanz-s3-s4-rev2`) (REPORTED by local tree presence)
- Contains s3-s4 scope artifacts, saves/feed components, intake ledger/manifest/checksums in local copy. I did not diff byte-for-byte against Inkling s5 or gh-pages here (UNKNOWN equivalence beyond scope overlap).

## Screen/state coverage gaps against prompt v4 Step 2 (INFERRED from inventories)

**Likely built in some delivery:** Draft board core, Team Select (team only), gone-odds tooltip + needs row + saves/hydration + feed + shareables (per s5 README).  
**Missing or not evidenced:** draft-position picker (P-317), draft completion handoff state, week stepper/season hub/week view, standings+playoff picture, season book, awards, season review, guide, player cards, stats table (gravity/double-teams/form), settings persistence screen, shareables per stage beyond brag/seed as specified, explicit states matrix (loading/empty/no-save/corrupt-save/newer-build/reduced-motion/offline/file://) per screen with receipts, single-file/file:// proof, 390px proof, palette both modes (w89 tokens) proof.

## Recommendations (actionable, non-build)

1. **Z.ai Step 0 must publish one authoritative inventory table**: for each screen/flow/state, mark BUILT / PARTIAL / MISSING with path + delivery/commit + receipt. Resolve gh-pages vs s5 vs s3-s4-rev2 divergence explicitly.
2. **Fix pin docs immediately**: README/SNAPSHOT/MERGE docs must name actual consumed pin and include `git log -1` receipt for `src/engine/**` plus sha256 manifest. gh-pages README currently misleads.
3. **Treat REPORTED battery results as unverified until rerun** in a clean environment with full stdout/exit code and falsifier mutations (per prompt Step 4).
4. **Do not claim "merge-ready" until M1–M5 are demonstrated** on the actual delivered tree (one adapter door, swap test, SNAPSHOT contract, thin seam metric).

## Weakest points / not run
- I did **not** run `npm ci/build/battery`, Playwright, file:// boot, or 390px checks. Any runtime claim above is REPORTED/INFERRED from docs/trees.
- I did **not** diff engine snapshot bytes against `d3bd81d2` exhaustively here (sampled flex header only); full per-file hash audit still required (Part 2 seam inventory audit).

