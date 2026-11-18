# VL review of z.ai cakepanz-8.1-2026-11-18 delivery

**Delivery:** `67-cakepanz-8.1-2026-11-18` — pushed to `council/vl` at
`_agents/vl/deliveries/zai-pass-through/67-cakepanz-8.1-2026-11-18/`
(commit `5c08c455`, pushed `869f5048..5c08c455`). Both trees: `cakepanz-4/` (shipped,
pin `5c808472`) and `cakepanz-4-prepared/` (prepared, pin `65673a00`, NOT ACTIVATED).
Receipts: `receipts/partH-c8-1/`. Docs: `README-DELIVERY.md`, `WHAT-CHANGED.md`,
`RECEIPTS.md`, `START-OF-CHAT-ZAI.md`.

**Verdict:** VERDICT ok — every claim I could run locally checks out at the delivered
bytes. VL's earlier gate-manifest FAIL (lane file line 19–21) was on a stale state;
the delivered bytes PASS on both trees.

---

## Independent verification (commands run, outputs captured)

All run on the pushed copy at `_agents/vl/deliveries/zai-pass-through/67-cakepanz-8.1-2026-11-18/`.

| # | Command | Tree | Output | Claim match? |
|---|---------|------|--------|--------------|
| 1 | `node scripts/gate-manifest.mjs` | shipped | `gate-manifest: PASS (314 entries verified, dist/ covered, converse clean)` | yes (WHAT-CHANGED §Block 2 / h20 ×4) |
| 2 | `node scripts/gate-manifest.mjs` | prepared | `gate-manifest: PASS (319 entries verified, dist/ covered, converse clean)` | yes |
| 3 | `node scripts/gate-numerals.mjs` | shipped | `gate-numerals: CLEAN ×2 (...)` | yes (5.1 fix; was FAIL ×4 at c8 bytes) |
| 4 | `node scripts/gate-numerals.mjs` | prepared | `gate-numerals: CLEAN ×2 (...)` | yes |
| 5 | `node --test --experimental-strip-types test/engine.test.ts` | shipped | `tests 394 / pass 394 / fail 0` | yes (394 shipped) |
| 6 | `node --test --experimental-strip-types test/engine.test.ts` | prepared | `tests 406 / pass 406 / fail 0` | yes (406 prepared) |
| 7 | `shasum -a 256 dist/single.html` | shipped | `4ce69205b72a8f33bdb6015ec95c3abf317748730c22000eb1bdd592e507057a` | yes (matches WHAT-CHANGED §dist) |
| 8 | `diff -rq src/engine <prepared>/src/engine` | both | `game.ts` differs; `passclass.ts` only in prepared | yes (engine delta exactly those two) |
| 9 | flex census (node one-liner) | shipped | `total rules: 99`, `{"0":17,"2":17,"6":42,"12":23}` | yes (WHAT-CHANGED §Block B / h22) |
| 10 | flex spot checks | shipped | `SS>NICKEL=0, FB>TE=2, FB>RB=2, C>OG=6, OG>C=2, QB>FS=12` | yes (all match WHAT-CHANGED) |

**Not run locally** (no playwright / browser in this worktree; matches VL lane file §23):
- late battery L1–L9 (9/9 claimed), falsifiers F13–F16 (DIED claimed)
- shell battery S1a–S31 (47/0 claimed)
- slice battery 29/0/10/3 claimed
- A2 mutation 46/1 → 47/0 claimed
- acceptance-run.sh composites k1/k2 (the round's ONE open item per 5.2 — pointer fallback applied)
- These are REPORTED from z.ai's receipts (`receipts/partH-c8-1/`), not independently verified by VL.

---

## Discrepancy resolution: VL lane file gate-manifest FAIL → resolved

VL.md (§Current session) reported `gate-manifest: FAIL, EXIT=1` on both trees with
~35 `MANIFEST FAIL (unlisted)` lines, contradicting Inkling/Pickle's PASS reports.
I re-ran the tool at the **delivered bytes** (not a stale extract): both trees PASS
(314 shipped, 319 prepared, exit 0). VL's FAIL predates the final bytes (the order's
hand-off note said the composites were killed mid-sitting; VL's extract was likely
pre-final-state). **The gate discrepancy is closed — nothing red ships.** VL.md should
be updated to strike the gate-manifest FAIL finding.

---

## Code review observations (render layer only — zero engine files touched)

**App.svelte** (`src/App.svelte`):
- `go()` gains `if (s === 'board' && store.getState().status === 'done') s = 'complete';` — a finished draft routes to Complete, never a blank board (4.2, A1).
- `syncFromHash()` now calls `go(r.screen, r.param)` instead of setting `screen` directly — the hash door converges on Complete (4.4).
- `hydrateBoot()`: `go('hub')` unconditional for a resumed season (A1 / N28).
- `setFullBoard(v)` added; `simpleOff` deleted; `lateMode` reads `!$settingsStore.fullBoard`; `startDraft` calls `setFullBoard(false)`; `loadDraft` does NOT clear it — the FULL BOARD choice persists across reload, a new draft re-arms the flip (4.3).
- `pick()` ends with `if (store.getState().status === 'done') go('complete');` — the completing pick hands the screen to Complete (4.2 / L8).
- `refresh()` no longer swallows a done-draft `goneOdds` throw — `if (st.status === 'done') { oddsMeta.set(null); } else { try … catch }` (A1 / N29).

**settings.ts** (`src/lib/port/settings.ts`) — the round's ONE port exception:
- Additive `fullBoard: boolean` (default `false`), validated `p.fullBoard === true`, falls back to defaults on corrupt blob. Survives reload via localStorage.

**BoardRow.svelte** (`src/lib/components/BoardRow.svelte`):
- Simple branch renders `aria-controls="cp-fit-{r.id}"`, `{#if open}` detail block with `data-testid="cp-simple-detail"`, fitlbl `OVR … · priority … · fills …`, flex chips + primary chip (4.1 / L7).
- `REC` map keys the shown number to the active sort (`wins`/`priority`/`ovr`) with visually-hidden `title` + `aria-label` captions (4.5(i) / L2).

**DraftBoard.svelte** (`src/lib/components/DraftBoard.svelte`):
- `data-form={lateMode ? 'simple' : 'full'}`, honest switch line, `FULL BOARD` door calling `onfullboard` (4.3 / L3 / L9).
- `sort={vm.sort}` passed to each row (4.5(i)).

**BoardFooter.svelte** (`src/lib/components/BoardFooter.svelte`):
- In simple mode, SORT controls sit behind a `SORT` toggle (4.5 / L2).

**late.battery.mjs / falsify-late.mjs**: L1–L9 + F13–F16 present; the battery's L9 lands one real UI pick (row → chip → confirm) before reload — fixes the false-green defect where store-dispatch picks skip `autosaveDraftNow` (noted in WHAT-CHANGED charter compliance).

---

## Innovation / brainstorming: improving cakepanz / the ui-ux shell for Claude's engine

The shell is a clean Svelte 5 render layer with a single port door (`src/lib/port/seam.ts`, M1–M5). The engine is frozen and single-sourced; the shell owns presentation, navigation, persistence, and the draft UX. Specific directions:

**1. The "simple board" should graduate from a draft-phase flip to a persistent user preference.**
Today `lateMode` is derived from `myPicks >= 10` (the user's 10th pick). The Owner's questionnaire Q6 wants the user to "enjoy the first ten rounds and make simple decisions in the second half." Consider making simple/full a sticky `Settings` choice (like `fullBoard` but independent): a user who prefers the simple board could opt in from draft start, not only after pick 10. The flip stays available as the default behavior. This needs no engine change — only `settings.ts` + `App.svelte` `lateMode` derivation.

**2. Sort persistence across the flip.**
`sort` is local state (`let sort: BoardSort = 'wins'`) reset on each draft. L2 proves the shown number tracks the active sort, but the user's sort choice is lost on reload/new draft. Persisting `sort` in `settings.ts` (additive `sort: BoardSort` default `'wins'`) makes the board remember how the user likes to rank — a small, high-value UX gain with zero engine impact.

**3. The row detail should be keyboard-accessible.**
The simple row's detail opens on click of `.cp-mainsimple` (`aria-expanded`, `aria-controls`) but has no keyboard handler. Adding `keydown` (Enter/Space) to toggle the detail and focus management into the expanded chips would bring the P-337 simple row to the same bar as the rest of the shell. The `data-testid="cp-simple-detail"` anchor is already in place for testing.

**4. The "FULL BOARD" door should offer a "stay simple" opt-out per session.**
Currently the door sets `fullBoard = true` permanently (persisted). A one-time "full board this draft only" toggle (non-persisted) would let a user flip back to simple within the same draft without touching settings. The settings model already supports `fullBoard`; a session-only overlay flag is a trivial addition.

**5. 390px law should be a continuous guard, not a one-off media query.**
`BoardRow.svelte` has a `@media (max-width: 430px)` tightener, and L5 asserts `scrollWidth <= clientWidth` at 390px in both forms. Consider adding a CI-level resize observer test that sweeps 320–480px in both simple and full forms and fails on horizontal scroll — turning the 390px law from a battery assertion into a regression guard.

**6. The "honest switch line" ("the board simplified — every number is still one click away") deserves a counterpart on exit.**
When the user takes the FULL BOARD door, a symmetric line ("full board restored — chips are inline again") confirms the mode changed. Small copy, zero engine impact, improves mode clarity.

**7. Port purity guard (M1–M5).**
The comment in `falsify-late.mjs` and node M1 (`hits === [seam.ts]`) assert that only `seam.ts` is the engine door. As the shell grows (more screens, more VMs), a lint rule or build-time check that `src/lib/` imports nothing from `src/engine/` directly (only via `seam.ts`) would prevent the engine from leaking into the render layer. The `engine-node` symlink in the falsifier already hints at this boundary.

**8. Reception of the gh-pages two-file fix.**
The delivery notes "The gh-pages fix is STILL NOT PLACED; the GLM stays OFF." This is an Owner click, not a shell change — flagged here so the next sitting doesn't lose sight of it.

**9. Acceptance-run completion (L10).**
The round's ONE open item: `bash scripts/acceptance-run.sh` end-to-end in both trees at the final bytes (k1/k2), regenerating both `ACCEPTANCE-RECEIPTS.txt`. This is the next sitting's first action per the order's §5.2 fallback (pointer fallback already applied — nothing red ships).

---

## Receipts referenced

- `receipts/partH-c8-1/h20-gate-manifest-*.sh.log` (×4: shipped pass1/pass2, prepared pass1/pass2) — PASS 314/319
- `receipts/partH-c8-1/h21-gate-numerals-*.sh.log` (×4) — CLEAN ×2 ×2 trees
- `receipts/partH-c8-1/h2-engine-suite-final-shipped.sh.log` — 394/394
- `receipts/partH-c8-1/h11-engine-suite-final-prepared.sh.log` — 406/406
- `receipts/partH-c8-1/h6-slice-battery-final-shipped.sh.log` — slice 29/0/10/3 (REPORTED, not re-run locally)
- `receipts/partH-c8-1/h5-shell-battery-final-shipped.sh.log` — shell 47/0 (REPORTED, not re-run locally)
- `receipts/partH-c8-1/h7-late-battery-final-shipped.sh.log` — late 9/9 (REPORTED, not re-run locally)
- `receipts/partH-c8-1/h10b-falsify-late-final-shipped-8.1bytes.sh.log` — F13–F16 DIED (REPORTED, not re-run locally)

---

**Next action for VL lane file:** strike the gate-manifest FAIL finding (resolved — both trees PASS at delivered bytes), then pick up the top P-item from the live queue (`node /tmp/council.mjs next`).