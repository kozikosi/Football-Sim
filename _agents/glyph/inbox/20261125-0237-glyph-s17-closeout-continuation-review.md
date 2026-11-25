SPEAKER: glyph | ROLE: advisor | TASK: S17 closeout continuation package review + Cakepanz UI/UX innovation | DATE: 2026-11-25T02:37Z

FOR: S15/S17-closeout-continuation (user-requested review of Desktop drop `zai-s17-closeout-continuation-2026-11-24`; no queue ID claimed)
REVIEW-OF: `/Users/kosi/Desktop/Football Sim/zai-s17-closeout-continuation-2026-11-24/` (published as `zai-s17-closeout-continuation-2026-11-24/` at `f68b58200` on `origin/council/glyph`)

## 0 · Scope / method (VERIFIED where command shown)

- **VERIFIED:** package copied from Desktop to glyph worktree excluding `node_modules` and `.git`, committed, and pushed to `origin/council/glyph` at `f68b582001901c4bb7ebb4d40964a5b9385f7918` (`git push` output; `git ls-remote origin council/glyph` matches).
- **VERIFIED:** package shape: 114M source on Desktop, 2798 files; published copy 26M / 781 files (node_modules excluded). Top-level contains `UPDATE-README.md`, `CHECKSUMS.txt`, `_agents/zai/{ZAI,START,END}-OF-CHAT-ZAI.md`, and `zai-s17-closeout-2026-11-23/` artifact tree.
- **VERIFIED:** I read the package control files: `UPDATE-README.md`, `ZAI.md`, `README-S17-PACKAGE-NOTE.md`, `claims.json`, `scripts/check-claims.mjs`, `scripts/side-by-side-s15.mjs`, `tools/shell-status.mjs`, handover `deliveries/zai-s15-closeout-handover-2026-11-21.md`, side-by-side doc+receipt, `ACCEPTANCE-RECEIPTS.txt` tail, and sampled screens/components (`App.svelte`, `TeamSelect.svelte`, `Hub.svelte`, `DraftBoard.svelte`, `shell.css`).
- **NOT RUN:** full Playwright acceptance composite, browser batteries, engine suite in this seat (time/weight). I did run lightweight verification commands below.

## 1 · Receipt checks I ran (VERIFIED)

| Check | Command | Result |
|---|---|---:|
| Package seal/converse | `cd zai-s17-closeout-continuation-2026-11-24/zai-s17-closeout-2026-11-23 && node tools/verify-package.mjs .` | `374 OK / 0 FAILED / 0 missing`, converse clean |
| Claims (packaging phase) | `node scripts/check-claims.mjs --phase packaging` | `20 OK · 0 RED · 5 skipped` |
| Claims (full phase) | `node scripts/check-claims.mjs` | `23 OK · 2 RED · 0 skipped` |
| Node battery (live, this seat) | `node --import ./scripts/node-port-register.mjs batteries/node.battery.mjs` | `ℹ tests 37 · ℹ pass 37 · ℹ fail 0` |
| Side-by-side receipt sanity | Python parse of `deliveries/receipts/s15-side-by-side.json` | `captures 41`, `verdicts 4 fails 0`, `fallbacks 0`, `matrix complete true`, all left markers met |
| Dist hashes | `shasum -a 256 dist/index.html dist/assets/index-Cb5sVPrX.js dist/assets/index-BHOhZuA_.css dist/single.html` | match `SHELL-STATUS.md`/claims prefixes (`3edb5c6f…`, `edc51cd0…`, `753997b6…`, `3e3b837b…`) |
| Stamp law spot check | `grep -n metaNow\|engineVersion\|ENGINE_PIN src/App.svelte` | `metaNow()` stamps `engineVersion()`; no `ENGINE_PIN`/hardcoded `67-cakepanz@` literal found |

## 2 · Findings (labeled)

### F1 — Acceptance composite is honestly incomplete at these bytes (VERIFIED, known/declared)
- **VERIFIED:** `ACCEPTANCE-RECEIPTS.txt` has 429 lines, 16 `EXIT_CODE=0` step blocks, 0 non-zero exits, no `ACCEPTANCE RUN COMPLETE`, ends mid `== 13b...` falsifier command. `deliveries/receipts/partH-s15/composite-wip-handover-2026-11-24.log` states WIP handover and resumes at relaunching `scripts/acceptance-run.sh`.
- **Risk:** any consumer treating this package as "composite green" without reading the meta layer would overclaim. The package itself is mostly honest about this (ZAI/UPDATE/README/handover say WIP mid-13b); full-claims correctly goes RED.

### F2 — `node-battery-receipt` full-claim is RED because the receipt file is stale, not because the battery fails now (VERIFIED)
- **VERIFIED:** `node scripts/check-claims.mjs` full phase reports `RED [node-battery-receipt] ... deliveries/receipts/node-battery.log ... pass 37 ... NOT FOUND`.
- **VERIFIED:** `deliveries/receipts/node-battery.log` is 35 lines and ends with `tests 23 / pass 23 / fail 0` (old receipt). Running the battery now at these bytes produced `tests 37 / pass 37 / fail 0`.
- **Assessment:** defect in receipt freshness / claim packaging, not an engine/shell node-battery regression. The fix is procedural: refresh `node-battery.log` at final bytes before full-claim/reseal.

### F3 — Side-by-side contract is materially improved; old vacuity class is addressed in code (VERIFIED from code+receipt)
- **VERIFIED:** `scripts/side-by-side-s15.mjs` has explicit non-vacuity markers per scene, fallback labeling, matrix completeness check, LEFT driven through w89 draft-setup UI (`#draftSlotSelect`/`#startDraftBtn`), and `new-only-s5-panel-settings-...` naming.
- **VERIFIED:** `s15-side-by-side.json` reports 41 captures, 40-cell matrix complete, 0 fallback, 4 right-side verdicts all pass checks, 41/41 markers met. Left s1-s3 show setup/options/pick markers, not boot-state fallback.
- **Residual risk:** LEFT reference depends on live/served w89 fallback path; reproducibility still depends on reference availability. Receipt captures this, but an independent verifier should preserve/reference w89 bytes exactly as receipted (`dbb8c27a…` noted in ZAI).

### F4 — Claims protocol is a good anti-overclaim guard, but phase boundaries must stay explicit (VERIFIED/INFERRED)
- **VERIFIED:** `claims.json` separates `packaging` and `full`; packaging passes 20/0, full correctly red on incomplete composite/stale node receipt. This directly addresses the prior literal-format/prose-overclaim failure class.
- **INFERRED:** this is the right pattern to keep extending for UI claims that are currently prose-only (e.g., "no horizontal scroll at 390", "Cinzel offline") by binding them to existing battery/side-by-side receipt fields rather than narrative.

### F5 — Stale-stamp / download / brag-link regressions appear guarded (VERIFIED spot checks)
- **VERIFIED:** `App.svelte` `metaNow()` stamps running `engineVersion()`; no `ENGINE_PIN`/`67-cakepanz@` literal. N36/N37 pass in live node battery. `check-claims` confirms no-stale-zip-claim, lineage note, R-13 plan filed.

### F6 — Package identity/lineage note is present and useful (VERIFIED)
- **VERIFIED:** `README-S17-PACKAGE-NOTE.md` clearly states s17 folder name is drop label, content lineage is S15 close-out continuation, engine pin `408410477` unchanged, data-sensitivity warning included. This resolves the prior auditor confusion class.

## 3 · UX / Cakepanz shell innovation brainstorm (INFERRED — proposals, not product edits)

These are shell/UX opportunities for Claude's engine-facing Cakepanz/76 Pancakes UI. No engine/pin/rules changes implied.

1. **"Receipt-backed confidence strip" in dev builds (INFERRED, high value / low risk).** A tiny dev-only footer strip showing `dist hash`, `engine stamp`, `seed code`, and `claims/check status age` would make stale-state mistakes visible before they become review findings. It should read from generated artifacts, never hand-typed text.
2. **Scene-contract capture mode for every major screen (INFERRED).** Generalize the side-by-side non-vacuity markers into a reusable `screen contract` manifest: required DOM anchors, forbidden states, viewport/theme matrix, and "what this screenshot proves". This turns visual review from aesthetic judgment into falsifiable evidence.
3. **"Intentional falloff" UX for incomplete flows (INFERRED).** The WIP acceptance state shows why explicit partial states matter. In-product, long-running operations (full-draft sim, season advance, import/export) should expose a visible state machine: running / partial / complete / interrupted, with resume action. No silent mid-state.
4. **Draft decision explainability, progressively disclosed (INFERRED).** Team Select already previews order; Draft Board has top-three/why concepts in the package lineage. Push this further: a collapsed "Why this pick" drawer showing slot need, value delta, flex penalty, and risk (gone%/ADP uncertainty) with one-line plain labels. Keep numbers honest and sourced from VM.
5. **Share/export trust UX (INFERRED).** P-209 brag/share constraints are good. Add a pre-copy "What leaves this device" line: "Text only. No save, no seed, no account." For file exports, include checksum/build token in filename or metadata panel to prevent stale-file confusion.
6. **Accessibility as a first-class receipt (INFERRED).** The package already has contrast/viewport work. Add a keyboard-only draft path receipt (Tab/Enter/Space/Undo), focus-visible snapshots, and reduced-motion parity checks to the same claims protocol. Accessibility regressions should fail like seal/claims failures.
7. **"Resume where I meant to be" clarity (INFERRED).** N28/N29 already encode resume laws. Surface this to users: on boot, show a small "Resumed: Week 4 / Draft complete / New draft" banner with one undo-safe "Go to Team Select instead" action. Reduces confusion without weakening restore correctness.
8. **Performance budget for board virtualization/render (INFERRED).** Large draft boards and replay captures can get heavy. Track a simple budget in receipts: DOM node count, long tasks during pick/scroll, and first interaction after boot. Fail budget only when it regresses beyond threshold; do not optimize blindly.

## 4 · What I would ask Z.ai / next seat to do (INFERRED)

1. Re-run `bash scripts/acceptance-run.sh` at these exact bytes to completion; file complete receipt tail.
2. Refresh `deliveries/receipts/node-battery.log` from the 37/37 run at final bytes.
3. Re-run `node scripts/check-claims.mjs` full phase after composite complete; expect the two current REDs to clear if receipts are refreshed honestly.
4. If any claim text drifts from tool output format again, fix the claim spec, not prose.

## 5 · Evidence / honesty boundary

- **VERIFIED:** commands above, file reads, pushed commit `f68b58200` on `origin/council/glyph`.
- **NOT RUN:** engine 430 suite, full Playwright acceptance, browser/slot/visual/shell batteries, falsifier gauntlets. I relied on package receipts for those and explicitly flagged the composite WIP state.
- **INFERRED:** UX innovation proposals; they are design directions, not accepted changes, not implemented.
