SPEAKER: pickle (council seat) | ROLE: reviewer | TASK: thorough review of zai-s17-closeout-2026-11-23 + innovation brainstorm for Cakepanz/76 Pancakes UI-UX shell over Claude's engine | DATE: 2026-11-23T19:10:00Z
FOR: Owner, Architect, MUSE, council
Labels: V = verified this sitting (command/read) · R = reported by artifact/receipt in repo · I = inference · U = not checked/run here

## 0) Push receipt (the artifact folder)

- **Pushed as requested (V):** `zai-s17-closeout-2026-11-23/` (677 files, ~24M) copied from `/Users/kosi/Desktop/Football Sim/zai-s17-closeout-2026-11-23` into repo root, committed and pushed to `council/pickle`.
- **Commit (V):** `21dbc4dac88fccaa934fd6c3a8b8e87cdc42616f` — "pickle: publish zai-s17-closeout-2026-11-23 artifact folder for review"
- **Remote verification (V):** `git ls-remote origin refs/heads/council/pickle` => `21dbc4dac88fccaa934fd6c3a8b8e87cdc42616f refs/heads/council/pickle`
- **Data-sensitivity note (V/R):** folder includes `data/nfl/madden27-ratings.csv`, `data/nfl/free-agents-old-ratings.csv`, `data/nfl/player-ids.csv` and pool packs. Owner explicitly asked to push now ("we havent migrated yet"). This is on public `kozikosi/Football-Sim` branch `council/pickle`; treat as public-readable. This is consistent with Owner's "hide for now" intent only as a temporary pre-migration state — migration/cutover still needs the data ruling/NOTICE/gate path.

## 1) What I reviewed (scope + method)

**V (read/checked this sitting):** README.md, SHELL-STATUS.md, DELIVERY-DECISIONS.md, FIXLOG.md (head), MANIFEST.txt (head), ENVELOPE-FREEZE.md, MERGE-GUIDE.md, SNAPSHOT.md (head), package.json, src/lib/port/seam.ts, src/App.svelte (head/large section), src/lib/components/DraftBoard.svelte, inbox/20261123-zai-innovation-backlog-ranked.md, dist sha256s, git boundary grep, node-battery receipt tail, vite/package/inbox drift note. 
**R (artifact-reported, not re-run here):** VERIFY.txt (1154 lines), ACCEPTANCE-RECEIPTS, shell/board/slot/visual batteries, engine 430/430, falsifier/receipt discipline, S15 side-by-side/handover claims, full MANIFEST checksums.
**U:** I did **not** run `npm ci`, build, engine tests, node/board/slot/visual/shell batteries, Playwright, or falsifiers in this worktree. No test pass/fail is claimed by me beyond what receipts/logs state.

## 2) What this artifact is (identity)

- **Folder name:** `zai-s17-closeout-2026-11-23` (V). 
- **Internal identity:** S15 close-out / Cakepanz shell artifact lineage. README/SHELL-STATUS/SNAPSHOT describe S15 close-out state, pin `408410477`, engine stamp `nfl1.1ac56c28928eff`, S15 laws/falsifiers, and handoff/cutover packaging (V). 
- **Interpretation (I):** "s17" in folder name appears to be a local drop label/date wrapper; the content is an S15 close-out shell package. Review treats content as S15 closeout artifact, not a new engine/S17 engine pin.

## 3) Verified structural facts

| Check | Result | Evidence |
|---|---|---|
| Folder present/pushed | 677 files, ~24M | V: `find`, `du`, git commit/push/ls-remote |
| Dist hashes match SHELL-STATUS | All 4 match exactly | V: `sha256sum` vs SHELL-STATUS lines |
| Engine import boundary | `src/lib` engine imports only in `src/lib/port/seam.ts` (+ `contract.ts` references seam, not engine) | V: `grep -rl "src/engine" src/lib` => `port/contract.ts`, `port/seam.ts`; `from '../../engine'` only `seam.ts` |
| Seam is the one door | Large typed re-export surface; screen/components consume port/bindings | V: seam.ts + App.svelte imports |
| Envelope frozen | Schema v1 frozen fields 1-11, per-slot whole-save LWW, no field merge, additive `deviceId?` reserved but not added | V: ENVELOPE-FREEZE.md |
| Truthful envelope stamp fix | `metaNow()` uses `engineVersion()` not hardcoded literal | V: App.svelte comment + `engineVersion: engineVersion()` |
| One-action-in-flight contract | `busy` flag gates START/pick/undo/LOAD; `dispatchAsync` used | V: App.svelte (`busy`, `dispatchAsync`, `finally { busy = false }`) |
| S15 toast-truth fix present | "Drafted..." toast only on landed pick; refused pick returns false and shows no drafted lie | V: DraftBoard.svelte `quickDraft` uses `landed = await onpick(...)` and returns on `false`; L31 noted in comments |
| Staged confirm guard | Confirm has null+guard+380ms window; L22 referenced | V: DraftBoard.svelte `confirmPick` |
| Ring derivation | Primary ring by engine-sorted array positions; tie extension display-rounded interim pending rawSort; stored suggest restored then cleared on interaction/sort | V: DraftBoard.svelte `ring` derived, `setSort` clears `savedSuggest`, comments cite S14/P2 L24 |
| No-build-in-review claim | I did not run tests/builds | V: explicit |

## 4) Receipts / reported state (R, not re-run)

- **SHELL-STATUS.md (R):** generated 2026-11-23T07:28:24Z; pin 408410477; dist hashes as verified above; "node battery (live): 37/37 pass, 0 fail"; contrast guardrail 2 pass 0 fail; visual 18/18 stale receipt; slot 28/28 stale receipt.
- **Node battery log tail (R):** `deliveries/receipts/node-battery.log` tail shows `23 pass, 0 fail, duration 8162ms` and ends at N18. 
- **Discrepancy observation (V observation, I caution):** SHELL-STATUS claims 37/37 live node laws, but the node-battery.log tail I sampled ends at 23/23. I did not reconcile the full log/history; this may be different runs, different battery files, truncation, or stale summary. **Do not cite either count as current without rerunning/reconciling the exact battery command and full receipt.**
- **README/SNAPSHOT claims (R):** engine 430/430 carried suite; node 35/35 at S13 handoff addendum; board 16/0; slot 28/0; visual 17/0; shell battery 24/24 etc. These are historical within artifact and should be read against the specific receipt files named, not assumed current for a new environment.

## 5) Review findings

### Strengths (good discipline)

1. **Clear seam discipline (V).** The one-door port seam is real in code, not just documented. This is the right shape for Claude engine drop-in / future re-pin / framework rebind.
2. **Save-envelope contract is explicit (V).** ENVELOPE-FREEZE is concrete, frozen-field listed, no-field-merge rule, additive-only reservation. This is a good migration/cutover safety artifact.
3. **Truthful-state fixes are present (V).** `engineVersion()` stamp from running engine (not hardcoded literal), L-ERR clearing after resolved actions, toast tied to landed pick, confirm guard, busy/one-in-flight. These are the right kind of trust fixes.
4. **Receipt-minded culture (R, partially V).** MANIFEST/CHECKSUMS/VERIFY/SHELL-STATUS/receipts/falsifiers show a strong "prove it" posture. The package is auditable in structure.
5. **Accessibility/progressive-hardening intent visible (V/R).** `role=status`, aria-live polite toast, focus-visible styles, reduced-motion checks, 44px/390px concerns appear in backlog and component patterns.

### Risks / gaps / concerns

1. **R-13 / Vite version drift (V).** `package.json` has `vite: "^7.3.6"` and `@sveltejs/vite-plugin-svelte: "^6.2.1"`. An inbox note already flags R-13 drift. Per current Owner decision context (R-13 settled to Vite 8 on 2026-11-19), this package should be treated as **drifted/stale on toolchain** until checked against the authoritative decision and updated deliberately. Not a casual bump — verify plugin/Node/CI compatibility.
2. **Receipt reconciliation needed (V observation).** SHELL-STATUS "live 37/37 node" vs node-battery.log tail "23/23" needs reconciliation before anyone cites battery confidence. Stale visual/slot receipts are also explicitly marked stale in SHELL-STATUS.
3. **Data sensitivity / public branch (V).** Pushing ratings/player-id/FA CSVs to public `council/pickle` was Owner-requested pre-migration, but it conflicts with "hide data for now" as a release/cutover posture. Migration plan must account for this history (archive/privacy/purge decision already in Delta 2), and this artifact should not be copied into a clean public 76Pancakes repo without the data ruling.
4. **S17 naming ambiguity (V/I).** External folder name says s17; contents are S15 closeout. This can confuse council members and future audits. Add a one-line alias note wherever referenced.
5. **Large artifact in repo root (I).** 24M/677 files at root is readable but heavy. Fine for temporary review; for long-term council hygiene, consider moving under `_agents/pickle/reviews/` or `_archive/` after review, or keep as-is if Owner wants easy discovery.
6. **Engine pin is historical and specific (V/R).** Pin is `408410477`, stamp `nfl1.1ac56c28928eff`. Any review/conclusion is valid for that pinned snapshot + this shell state. Re-pin/cutover must re-run the five-path procedure in SNAPSHOT/MERGE-GUIDE.
7. **Not runtime-verified by me (V).** I did not execute batteries/build. My review is structural + artifact-evidence + code-read, not a pass certificate.

## 6) Further implications

1. **Cutover implication:** This package is a strong candidate for "what shell behavior/contracts should survive into 76Pancakes," but not a drop-in public-release artifact while ratings-hide/data-ruling is unresolved. The shell's engine boundary is good; the data packaging is not cutover-clean.
2. **Receipt implication:** The receipt/falsifier discipline should be preserved in 76Pancakes, but receipts must be regenerated at the final cutover bytes. No stale receipt may be treated as current.
3. **Toolchain implication:** Before moving/merging, reconcile Vite 8 decision vs package.json 7.3.6 and plugin major. A toolchain mismatch can silently invalidate build/receipt assumptions.
4. **Engine-contract implication:** P-317 `pickSlot`/`draftOrder` and the shell's `dispatchAsync` busy contract are now part of UI correctness. Claude's engine/shell seam changes should preserve these or provide migration receipts.
5. **Share/save implication:** The "truthful stamp" fix is valuable and should be non-regressive. For 76Pancakes, add a visible build/provenance surface (engine stamp, shell build, data version/ruling state) so users/reviewers can tell what they are looking at.

## 7) Innovation / brainstorm — Cakepanz / 76 Pancakes UI-UX shell for Claude's engine

The goal below: **make the shell a trustworthy, fast, legible decision surface over Claude's engine** without turning it into scouting/GM bloat. All ideas are shell-only unless marked engine-contract. No scouting, no full GM, no faces, no downloads by default, no seed/private ids in brag.

### A. Trust & provenance (highest value / low-medium risk)

1. **Status Rail / Proof Drawer (ship first).** Persistent small rail: engine pin/stamp, shell build token, data version/ruling badge, save state, offline/local-only indicator. Dev-only drawer exposes receipt hashes, battery timestamps, and "why this number" links. 
   - *Value:* converts invisible rigor into user trust; prevents stale-receipt confusion.
   - *Risk:* UI clutter if overdesigned; keep collapsed by default.
   - *Owner/Architect:* Owner rules what provenance is public vs dev-only.

2. **"Restored / Replayable" banner.** When loading autosave/shared seed/slot, show "Restored from autosave slot A · revision 12 · engine stamp ..." with explicit actions: Continue / Start fresh / Copy replay code.
   - *Value:* makes state transitions legible; prevents confusion after restore.
   - *Risk:* banner fatigue; show only on state transitions.

3. **Receipt freshness badge.** In dev/proof mode, badge green only when receipt files match current dist/commit hash; stale/missing becomes amber with exact command.
   - *Value:* solves the "stale receipt" problem.
   - *Risk:* false confidence if hash scope incomplete. Needs careful definition.

### B. Draft-board decision UX (high value / medium risk)

4. **Promote "Why" into structured decision cards.** Keep ring/one-button speedrun, but make why copy a structured object: `headline`, `deltaWins`, `needFit`, `riskIfPass`, `source`. Render as dismissible microcard; tap to expand.
   - *Value:* faster trustable decisions; teaches engine model without exposing internals badly.
   - *Risk:* if numbers are rounded/raw mismatched, trust collapses. RawSort caveat applies.
   - *Engine-contract:* optional raw-sort/tie metadata would clean this up; otherwise label interim.

5. **Pick-confidence strip (not scouting).** For selected/suggested row show: "Now / Next your pick / Picks until you / Gone risk / Δ vs next best". All from existing VM/goneOdds.
   - *Value:* supports speedrun without adding new systems.
   - *Risk:* goneOdds is simulation-based; label method/sims.

6. **Undo rail + action ledger.** A small "Last action: Drafted X at SLOT · Undo" rail with 1-step undo prominent; optional dev ledger of last N actions (no private data).
   - *Value:* confidence and recoverability.
   - *Risk:* must not imply multi-step undo unless engine supports it.

### C. Accessibility / interaction clarity (high value / low risk)

7. **One-button doctrine, hardened.** Keep one visible Draft button per row. Add: 44px min targets, focus ring always visible, disabled-state contrast, no pulse when disabled/busy, focus handoff after START to first draft button, mobile long-name wrapping checks at 390px.
   - *Value:* directly improves usability and testability.
   - *Risk:* low; mostly CSS/ARIA discipline.

8. **Semantic controls audit.** Ensure flex chips, sort, slot picker, needs toggles are native buttons/radios where appropriate; toasts `role=status` polite, errors `assertive` only when needed.
   - *Value:* accessibility and less flaky testing.
   - *Risk:* low.

9. **Reduced-motion parity contract.** One motion token source (`data-motion=full|subtle|none` or equivalent) with reduced-motion media query parity. No animation-only meaning.
   - *Value:* accessible and calm.
   - *Risk:* medium if existing tokens scattered.

### D. Share / export discipline (medium value / low risk)

10. **One share formatter, preview-before-copy.** Preview exact text/image card payload before copy/share. No seed/save/private ids in brag by default; include replay code only on explicit "share replay".
    - *Value:* prevents accidental leakage; builds trust.
    - *Risk:* extra click; keep fast path.

11. **Live-link honesty.** If `VITE_BRAG_URL`/public link not live, show muted "goes live on release" - never dead button. 
    - *Value:* avoids fake affordance.
    - *Risk:* none.

### E. 76 Pancakes shell evolution (medium-high value / medium risk)

12. **"Shell over engine" observability mode.** A dev/owner mode that shows which VM/engine selector produced each panel (boardVM, goneOdds, seasonFacade, recap). 
    - *Value:* makes Claude engine integration debuggable; useful during cutover.
    - *Risk:* must be dev-gated.

13. **Scenario loader (dev-only).** Load fixed seeds/states for board/share/save/restore/season-end cases. Reuse battery fixtures where possible.
    - *Value:* accelerates QA and review; catches regressions.
    - *Risk:* accidental shipping; gate behind dev flag/build.

14. **Data-ruling-aware UI.** If ratings data is hidden/unavailable in public build, shell should show an honest "data not bundled in this build / provide licensed pack" state rather than broken/empty UI.
    - *Value:* required for "hide data for now" cutover.
    - *Risk:* product/engine contract work; needs Owner ruling.

15. **Session handoff / resume clarity.** A compact "where you left off" card on boot: draft/season/week, team, pick count, last saved, engine/data stamp. One-click resume.
    - *Value:* reduces lost context.
    - *Risk:* stale autosave conflicts; use explicit resolution.

## 8) Suggested next actions (no owners assigned)

- Reconcile node battery count discrepancy (SHELL-STATUS 37/37 vs node-battery.log tail 23/23) by running the named battery commands at the artifact's pinned environment and attaching full receipts.
- Run a fresh receipt pass in a clean environment (or confirm existing receipts) before treating this closeout as move/cutover-ready.
- Resolve Vite 8 / R-13 toolchain drift deliberately with compatibility checks.
- Keep this artifact out of clean public 76Pancakes repo until ratings data ruling/NOTICE/gate path is settled; carry over shell patterns, not raw sensitive data by default.
- If desired, convert innovation items A1-A3 + C7-C8 into a small shell-only proposal pack with falsifiable acceptance checks.

## 9) Questions for Owner / Architect (optional, high leverage)

1. For 76Pancakes public builds, is the goal "hide ratings in repo but allow embedded gameplay data in `dist`" or "no ratings shipped publicly at all until ruling"? (This decides data-gate/UI behavior.)
2. Should provenance (engine stamp/build token/data hash) be visible to normal users, or dev/proof-only?
3. Do you want the next shell pass to optimize for **draft speedrun confidence** (B4-B6) or **cutover trust/provenance** (A1-A3, E12-E14) first?
