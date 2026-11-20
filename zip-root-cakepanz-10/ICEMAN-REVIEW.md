# Review: `zip-root-cakepanz-10` (cakepanz-11 sitting, 2026-11-20)

**Reviewer:** iceman (Iceman Free, OpenCode) · seat `council/iceman`  
**Date:** 2026-11-19 (local context) / package dated 2026-11-20T04:30Z in docs  
**Scope:** thorough read/review of the unpacked delivery folder pushed to this branch, plus implications and UI/UX/architecture ideas for 67 Cakepanz (the UI/UX shell consuming Claude's engine).  
**Method:** static inspection of the package contents in this repo (`README.md`, `START-OF-CHAT-ZAI.md`, `INTAKE-LEDGER-2026-11-20.md`, `deliverables/sitting-report-2026-11-20.md`, `CHECKSUMS.txt`, all 17 files in `diffs/`, `batteries/slot.battery.mjs`, `batteries/visual.battery.mjs`, `tools/shell-status.mjs`, `tools/package-delivery.sh`, `cakepanz-4/*` docs/receipts/scripts/batteries/inbox). **I did not run the acceptance script, Playwright batteries, or engine suite in this session** (would require the full build tree + deps + long runtime); claims below are labeled **VERIFIED (inspection)**, **REPORTED (package/receipts/Z.ai)**, or **INFERRED** accordingly.

---

## 1) What this package contains (VERIFIED, inspection)

- A compact sitting delivery: top-level docs (`README`, `START-OF-CHAT-ZAI`, `INTAKE-LEDGER`, `CHECKSUMS.txt`), `deliverables/sitting-report-2026-11-20.md`, 17 per-file `diffs/`, new/updated tool & battery sources (`tools/shell-status.mjs`, `tools/package-delivery.sh`, `batteries/slot.battery.mjs`, `batteries/visual.battery.mjs`), and `cakepanz-4/` carrying `SNAPSHOT.md`, `VERIFY.txt`, `SHELL-STATUS.md`, `ACCEPTANCE-RECEIPTS.txt`, inbox notes (T7, T8), scripts (`falsify-slot.mjs`), batteries (slot/visual/contrast), deliveries receipts (slot/visual/contrast JSON).
- **No full `src/` tree or `dist/` inside `cakepanz-4/`** (VERIFIED `find`); source changes are communicated via `diffs/` and the described file list. This is a relay/review artifact, not a runnable checkout by itself.
- Reported scope (REPORTED, sitting report): T1–T8 complete — engine re-pin `5c808472 → 408410477` (5 paths), P-317 draft-position selector end-to-end, T2 one-click draft on ringed rows, T3 `?seed=` replay code, T4 gone%-method a11y + focus-visible, T5 seeded visual battery, T6 contrast guardrail/shell-status/package-delivery tools, T7 seat-notes review, T8 ring-contract request to Architect.

## 2) Thorough review — by area

### 2.1 Engine re-pin & contract discipline (VERIFIED from diffs/docs, REPORTED receipts)
- **Positive:** `SNAPSHOT.md` was rewritten as the live contract for pin `408410477` (69 TS files, 430/430 carried suite, flex 99 rules 17/17/42/23, 4 pack files, stamp unchanged `nfl1.1ac56c28928eff`) with explicit 5-path procedure and byte-identity language; `VERIFY.txt §24` records re-pin receipts and separates "at re-pin bytes" from "final-state" receipts. `ACCEPTANCE-RECEIPTS.txt` tail shows engine 430/430 and node 33/33 at final bytes (REPORTED/recorded).
- **Positive:** rationale is sound — `pickSlot` (store) exists at tip, so T1 required the pin move; doing it as the sanctioned 5-path move (not ad-hoc edits) is the right discipline for a frozen snapshot consumer.
- **Implication:** the UI shell is now coupled to store behavior that includes `pickSlot`/`draftOrder` and (per snapshot prose) S3 context snapshot, S4 async twins, pass-class node present in snapshot — but the shell must keep passing no pass-class options unless explicitly decided (sitting report states "the product passes neither `passClass` nor `passGap` anywhere" — REPORTED; worth a quick grep in the landed tree when integrated).

### 2.2 T1 — P-317 draft-position selector (VERIFIED, diffs/scripts)
- **Seam:** `seam.ts` diff adds/re-exports `draftOrder` in both named exports and `engine` port object — good: shell uses the store's own order builder, not local recomputation (closes the old "store wiring is Architect's piece" gap stated in prior TeamSelect copy).
- **App dispatch:** `startDraft` now parses seed via `parseSeed()` (T3) and dispatches `START { seed, userTeam, ...(slot !== null && slot - 1 !== userTeam ? { pickSlot: slot } : {}) }` (VERIFIED). Omitting when natural is correct and keeps records clean; store also normalizes natural-slot per battery law N-S10 (REPORTED by tests).
- **TeamSelect:** local `orderWith()` removed; preview derives from `draftOrder(chosenIndex, chosenSlot)` only when a slot is chosen (VERIFIED). Copy updated to state the store trades/mirrors/restores. **Minor UX note:** when `chosenSlot === null` preview is null and the screen explains standard order — fine, but the "preview the store's own order" promise is only literal when a slot is picked (accurate enough).
- **Complete:** shows `record.pickSlot` truthfully and distinguishes natural-slot vs traded-slot restore semantics (VERIFIED). Adds `code <seed.toString(36)>` to provenance — aligns with T3.
- **Slot battery (`batteries/slot.battery.mjs`, VERIFIED):** strong design.
  - Independent oracle built from spec text (strict serpentine over swapped permutation every round), not from store implementation — excellent falsification property.
  - Node laws cover early/late slots (Bears@2, 49ers@32), record carries pickSlot, displaced team holds natural R1 slot, full 1024-order equality, undo byte-for-byte record restore incl. pickSlot/on-clock, save→restore via `hydrateApp` mem storage path, natural-slot omission, bad-slot rejection (33, 2.5).
  - Browser laws exercise real UI flow (Team Select → slot → DRAFT), assert displaced team picked first, real 3-action pick, mode lock, reload restore (no "pick is out of order"), late slot, natural-slot omission, zero page errors.
  - Writes `deliveries/receipts/slot-battery-latest.json` (VERIFIED). Depends on preview server + Playwright; skips loudly if missing — good.
  - **Small observation:** `state()` helper uses `s.error` directly (not coerced) and compares later as `error === null` / JSON in details — consistent with store shape; fine. `memStorage` implements StorageModule shape (`read/write/remove/keys/entries`) which matches hydrate usage (VERIFIED).
- **Falsifier (`scripts/falsify-slot.mjs`, VERIFIED):** mutates App START dispatch to drop `pickSlot`, apply-asserted anchor, builds/serves mutated copy, runs slot battery, requires B1+B3 to die, has stale-server guard (`want/got` asset hash check) and classifies unrunnable/tautology as failure. **This is the right pattern** and directly addresses "slot ignored" regression class.

### 2.3 T2 — One-click draft on ringed rows (VERIFIED, diffs)
- **Implementation:** `BoardRow` gains `onpickDirect` prop and a `.cp-quick` button rendered only when `suggest` is true, labeled `Draft {name} at {slotLabel}` and invoking `(onpickDirect ?? onpick)(r.id, r.slotId)` (VERIFIED). `DraftBoard` passes `onpickDirect={onpick}` (the direct store pick) while `onpick` still stages confirm for expand flow — clean separation.
- **UX/accessibility:** slot named on button avoids silent slot choice (good, addresses multi-fit ambiguity). Keyboard/focus-visible styling added (`:focus-visible` on main/chip/quick/confirm). Responsive rule wraps quick button at ≤430px (`flex-basis: 100%`, normal white-space) — preserves 390 law intent (REPORTED verified by visual battery W4).
- **Board battery delta:** adds L16/L17 (quick exists only on ringed rows, names slot, one click lands exactly one user pick with no confirm banner and CPU picks on; undo restores order/ring; non-ringed row still expands; Tab→quick has visible focus and Enter drafts). Re-anchors done in node battery N26 and falsify-board F17/F20 (VERIFIED in diffs) — necessary, but highlights anchor fragility (see risks).
- **Subtlety:** T2 relies on current suggestion/ring semantics (parsed sort values / existing C′1 logic) — T8 correctly asks to move ring policy/ids to engine view export so display parsing never drives advice. Until then, behavior is "correct enough" per current display grid but structurally brittle.

### 2.4 T3 — Seed replay (`?seed=`) & visible draft code (VERIFIED, diffs)
- **Parsing:** `parseSeed()` accepts 1–10 digit integers in `[1, 2^31-1]` or 1–6 char base-36 codes in same range; else random `1000..9999` draw (VERIFIED). Canonical displayed code is `seed.toString(36)` derived from resolved seed (`seedCode` state), shown in footer/Complete/share stamp and used in `?seed=` guidance — single source of truth.
- **Replay behavior:** `startDraft` now uses `parseSeed()` (so same URL seed pins draft) and start clears autosave in visual battery helper (battery note) — important for deterministic "two loads same board" tests. Save/restore path carries seed in record (existing store contract; W9 asserts reload replays seed) (REPORTED by battery).
- **Caveat (INFERRED):** `parseSeed` is evaluated at draft start; changing URL mid-session without restart won't re-seed current draft (expected). Garbage/integer behavior covered by visual battery W8 per source — good. No cryptographic/uniqueness claim needed (fine).

### 2.5 T4 — A11y for gone% method and focus visibility (VERIFIED, diffs)
- Gone% cell now has `aria-label="GONE%"` and `aria-describedby="cp-gone-desc-{r.id}"` pointing to a visually-hidden `.cp-sr` span containing `method(oddsMeta)`; hover tooltip remains `aria-hidden="true"` decorative (VERIFIED). This satisfies "method never only hidden from assistive tech" while keeping tooltip UX.
- In-flow `.cp-gonehow` remains in row detail (per prior D3/D2 context referenced in N26 re-anchor) — good redundancy for touch/keyboard readers.
- `:focus-visible` added to main/chip/quick/confirm controls (VERIFIED). Probe-a11y §2b reported PASS (REPORTED). **Note:** contrast/AA is separate (T6).

### 2.6 T5 — Seeded visual battery (VERIFIED, script)
- 13 laws at named seeds (`a3f2`, `k1x9`): ring count/tie rule per C′1 (3, >3 only on order tie — and script checks tie values), ring contiguous from top, one-click on ringed row lands one pick, 390 walk (`scrollWidth <= clientWidth`), zero page errors, footer code matches seed, two loads identical (60-row id order + ring + footer), garbage fallback without throw, integer seed pinning, seed survives save→restore reload.
- **Strength:** turns prior hand-measured disagreements into named automated checks; seed `a3f2` explicitly exercises tie case (documented in report/ledger). Requires dist + preview + Playwright; receipt written to `deliveries/receipts/visual-battery-latest.json` (present in package, VERIFIED).

### 2.7 T6 — Tooling: contrast guardrail, shell-status, package-delivery (VERIFIED, scripts)
- **Contrast guardrail (`contrast.battery.mjs`):** measures 32 team inks × 2 modes (resolved pale `color-mix` to hex) and shell token pairs against WCAG 2.1 AA 4.5:1. Names failures; distinguishes **KNOWN-HOLE** (pre-existing: dark Ravens, light Chargers, light Dolphins; plus known token holes incl. light gold2 pairs and dark rose ink on plum as listed in report/receipt context) from **NEW** holes (fails battery). Writes `deliveries/receipts/contrast-audit-latest.json` (present). **This is the right guardrail pattern** — prevents silent regression while acknowledging owner-ruling palette debt.
- **`shell-status.mjs`:** generates `SHELL-STATUS.md` with GENERATED banner; reads pin from `SNAPSHOT.md` (not hardcoded), hashes dist, runs live node+contrast batteries, reports receipt freshness for browser suites, extracts seed wiring lines, counts aria attrs (source vs dist), and probes ring at fixed seed via its own preview. **Good anti-rot tool.** Caveat: live runs can be slow/side-effectful (spawns preview, runs batteries); `--no-browser` exists. Gate-numerals/packaging dependency means status must be current when gates run (and package-delivery proved this by refusing on stale pin naming — REPORTED).
- **`package-delivery.sh`:** copy previous package → scratch → apply asserted delta list (`--strip` key mapping) → regenerate CHECKSUMS → verify → explain entry-count delta → run `gate-manifest` and `gate-numerals` on the tree → refuse-to-emit on any mismatch. **Excellent** for eliminating "stale file/wrong count/unverified hash" class. Report states its refusal path was proven by a real gate failure during testing (REPORTED) — exactly the intended behavior.

### 2.8 T7/T8 inbox notes (VERIFIED, inspection)
- **T7 review (`20261120-0430-zai-T7-seat-notes-review.md`):** substantive, evidence-aware review of four 20 Nov seat notes (passGap verification, S1 seam, Ernie passGap, plan-M). Adds useful suggestions (cite consumer of stale copy; pin Q7-like invariance for future advice/ring under context snapshot; pre-commit acceptance band X/Y before post-cutover ratings→gap fit). Flags plan-M relay (BASEBALL recommended vs AGENTS records BASKETBALL post-v1.1 — owner picks at MS-2). Notes `claude/NOW.md` = 16 lines vs ≤15 (REPORTED in note; I did not re-measure here). Verdicts all "ok", no build changes — appropriate.
- **T8 ring request (`20261120-0420-zai-C1-ring-raw-key-request.md`):** correctly identifies root cause (`draftBoard.ts` strips `_w/_p`, component parses display strings for tie/ring) and proposes contract 1 `suggestions { ids, rankedBy, cutoffRaw, reason }` (recommended) vs `rawSort`. Strong rationale: keep policy/semantics in engine view, avoid display-format coupling, make ring advice explainable/stable. Aligns with C′1 and future S3/context-aware advice invariance concerns.

### 2.9 Acceptance, falsifiers, and the open gate item (VERIFIED/REPORTED)
- `ACCEPTANCE-RECEIPTS.txt` in package shows green results through stage 13 (receipt-falsifier F0–F12 ALL DIED, shell-falsifier FA/FB/FC ALL DIED) and then stops mid stage 13b output (ends at `$ node --import ./scripts/node-port-register.mjs scripts/falsify-board.mjs` header with no verdict block in tail) (VERIFIED). Sitting report/README explain: **stopped at 13b (exit 1) due F13–F20 TAUTOLOGY report while six siblings died; likely `falsify-board.mjs` lacks D-2 stale-server guard/PID-port isolation** and stages 13c–17 did not run in that staged pass.
- **Assessment:** this is the most important caveat. Individual suites (engine/node/contrast/slice/shell/board/slot/visual/probes, receipt-falsifier, shell-falsifier, falsify-slot as reported) have receipts, but the single end-to-end staged "all green in one run" artifact is incomplete. Z.ai reported this honestly and named next action (carry stale-server guard into `falsify-board`, rerun 13b–17) — correct handling, but integrators must treat composite acceptance as **not fully closed** until re-run.
- Falsifier anchor maintenance: N26, F17, F20, FC re-anchored with intent preserved (VERIFIED in diffs). This is necessary churn; better long-term fix is less brittle mutation anchors (see innovations).

### 2.10 Documentation/process quality (VERIFIED)
- Intake ledger maps asks to actions and flags interpretations (slot omission behavior, canonical seed display, tie rule >3, re-pin necessity) — good traceability.
- START-OF-CHAT rewritten with current baseline/next actions — valuable for continuity.
- CHECKSUMS.txt present for package integrity (I did not run `md5 -c` in this review, but format/coverage visible).

## 3) Risks, gaps, and questions (actionable)

1. **Composite acceptance not closed (HIGH):** stage 13b TAUTOLOGY diagnosis + missing 13c–17 in staged run. **Action:** apply stale-server guard/PID-port isolation pattern (as in shell-falsifier/falsify-slot) to `falsify-board.mjs`, rerun 13b–17 and regenerate staged receipts at final bytes.
2. **Contrast debt remains owner-gated (MEDIUM):** 3 team-ink holes + token holes (gold2 on light panels, dark rose ink on plum) named and guarded against new regressions, but not fixed. **Action:** owner palette ruling; then shrink KNOWN baseline by updating tokens/team ink resolution intentionally.
3. **Ring semantics still display-parsed (MEDIUM, architectural):** T8 explains why `draftBoard.ts` stripping raws and component parsing strings is fragile. **Action:** Architect lands `suggestions { ids, rankedBy, cutoffRaw, reason }` (or agreed contract) and view consumes it as single source for ring + advice.
4. **Anchor brittleness in falsifiers/batteries (MEDIUM):** multiple re-anchors this sitting (N26, F17, F20, FC). **Action:** prefer semantic hooks/selectors/test IDs or AST-aware mutation targets for critical laws; keep "apply-asserted" but target stable constructs.
5. **Package is diff/receipt-heavy, not a runnable full tree (LOW, by design):** good for review relay, but integration requires applying delta to the correct base. `package-delivery.sh` mitigates this class when used properly.
6. **Pass-class/tilt options present in snapshot but must remain off unless ruled (LOW):** report states not passed anywhere (REPORTED). **Action:** keep a CI/grep guard ("no passClass/passGap in src/lib, src/App.svelte, batteries, scripts") across re-pins.
7. **Plan-M sport-two wording conflict flagged (PROCESS):** T7 relayed BASEBALL recommendation vs recorded BASKETBALL ruling — owner decision needed at MS-2 (not a code issue now).
8. **`claude/NOW.md` line-count nit (PROCESS, REPORTED):** noted in T7 as 16 vs ≤15; owner/maintainer concern outside this tree.

## 4) Further implications

- **Replayability becomes a first-class product feature:** `?seed=` + visible canonical code in footer/Complete/share card enables shareable drafts, bug reproduction, and deterministic QA. This is a major UX/testing multiplier if carried through all modes (season/what-if later) with clear provenance.
- **Draft-position choice is now part of the user contract and save contract:** `pickSlot` in record/restore means UI, shareables, analytics, and future sim comparisons must treat (team, seed, pickSlot, mode) as the draft identity tuple.
- **Advice/ring is evolving from decoration to explainable recommendation:** T2/T8 push toward "why these rows" (rankedBy/reason) — sets precedent for future context-aware advice (S3 snapshots) to be explicit, testable, and invariant where required (per T7 suggestion mirroring Q7).
- **Receipt-driven delivery culture scales if tooling stays trustworthy:** shell-status, contrast guardrail, package-delivery refuse-to-emit, and falsifiers-that-must-die are strong patterns. The 13b stale-server issue shows the meta-lesson: **guards must be uniform across every falsifier/runner**, not just newer ones.
- **Shell/engine boundary remains healthy when enforced:** re-pin moved snapshot verbatim; seam exports `draftOrder` rather than reimplementing order logic in UI. Preserving this boundary is critical as engine gains context-aware/advice features.

## 5) Innovation & brainstorming — improving Cakepanz / the UI/UX shell for Claude's engine

Prioritized ideas (mix of near-term, medium, and exploratory). I’ve aimed for high leverage on speedrun clarity, trust, accessibility, and replayability without assuming engine rewrites.

### A. Near-term, high confidence (shell-only or mostly shell)
1. **"Draft identity" header chip:** always-visible compact badge: `Team · Slot · Seed code · Mode · Pin` with copy-link (`?seed=&team=&slot=` style, once URL/state supports it). One tap shares/reloads the exact scenario; reinforces trust and replay.
2. **Ring explanation affordance (pre-T8 compatible, post-T8 richer):** small "Why highlighted?" popover on ringed rows: today can state rule ("top 3 by current sort, ties included"); after T8 use `reason/rankedBy/cutoffRaw` from engine. Makes advice legible, not magical.
3. **Pick timeline / undo stack mini-log:** a thin strip showing recent picks (mine vs CPU, slot #). Complements undo, helps users learn snake consequences of chosen slot, and debugs "did the CPU skip me?" anxiety.
4. **Keyboard-first speedrun mode:** explicit shortcuts (j/k move focus, Enter quick-draft ringed row, e expand, u undo) with an on-screen hint toggle; T2 already made the critical path keyboardable — formalize it.
5. **Seed presets & "reroll" controls:** buttons for "new seed", "copy seed", "paste/open seed" on Team Select; optional curated showcase seeds (great ties, dramatic falls) for demos/testing.
6. **Contrast/theme QA view (dev-only):** surface `contrast-audit-latest.json` in a hidden/dev panel so palette fixes are validated visually against the same named pairs the guardrail enforces.
7. **Empty/error/edge-state polish:** explicit states for bad seed in URL (show "using random seed X" toast), storage restore failure, and mode-lock explanation tooltip ("locked during draft to keep results comparable").

### B. Medium-term, leverage engine-view contracts (needs Architect collaboration but view-shaped)
8. **Land T8 suggestions contract:** render ring from `vm.suggestions.ids` and show `reason`; have battery assert exactness against export (eliminates parse/tie duplication). This is foundational for trustworthy advice.
9. **"What changed this pick?" deltas:** when sort/ring updates after a pick, subtly annotate movers (▲/▼ in rank among visible top set) driven by VM diffs — teaches engine valuation dynamics without exposing internals.
10. **Context-aware advice invariants in UI tests:** when S3/context snapshots land, codify "ring/advice stable under snapshot change" (mirroring Q7 intent from T7) so contextual simulation never silently perturbs draft guidance unless intended.
11. **Scenario compare (same seed/team, different slot):** side-by-side or quick-switch view showing pick # and first-pick player under slot A vs B. Uses deterministic seed + pickSlot; powerful for understanding the slot selector's value.
12. **Shareable as portable artifact:** include draft identity + ring rationale snapshot + top picks in share card metadata/text (and optionally a compact JSON blob) so shares are inspectable/replayable, not just images.

### C. Exploratory / bigger bets
13. **"Explain this recommendation" drawer (engine-fed):** when engine exposes factors, show a plain-language breakdown per suggested player (need fit, wins impact, scarcity/gone risk) — aligns with "advice, not decoration." Must stay truthful to engine outputs (no invented numbers).
14. **Mobile-first draft ergonomics pass:** thumb-reachable primary action bar at bottom on ≤430px (quick-draft/undo/confirm context), larger tap targets for chips, and progressive disclosure for dense rows — the 390 no-scroll law is necessary but not sufficient for comfort.
15. **Deterministic "coach replay" mode:** step through CPU picks with play/pause/speed using the same seeded run to understand board evolution (educational, great for streams/debugging) — purely view/state playback if events are recorded.
16. **Uniform observability strip (dev):** live display of pin, seed, pickSlot, save revision, order hash, and last autosave status in dev builds; reduces "which build/state am I looking at?" confusion during council verification.
17. **Falsifier hardening program:** propagate stale-server/PID-port guards to all falsifiers, standardize verdict parsing, and where feasible move from string-anchor mutations to token/AST or fixture-driven mutations for core invariants (slot passed, ring sourced from export, restore path intact).

### D. Principles to keep (implicit in this sitting, worth protecting)
- **Engine is truth, shell is view:** never recompute draft order/valuation semantics in UI when the store/view exports them.
- **Receipts over claims:** every UX-critical invariant deserves a named, automatable law (as T5 did for visual/ring/seed).
- **Advice must be explainable and stable-by-contract:** ring/suggestions should come with ranked-by/reason and explicit invariance expectations.
- **Guardrails name known debt, fail on new debt:** contrast guardrail pattern is a template for perf budgets, bundle size, a11y counts, etc.

## 6) Bottom line

**VERIFIED (inspection):** the package is coherent, well-documented, and the proposed shell changes (as diffs/scripts) are thoughtful: P-317 is wired through the correct seam (`draftOrder`/`pickSlot`), T2 adds a real speedrun affordance without removing flex/undo paths, T3 makes drafts replayable/shareable, T4 improves programmatic access to gone% method, and T6 adds strong anti-rot/anti-regression tooling. T7/T8 show good council hygiene (honest caveats, actionable contract request).

**REPORTED (by included receipts/report):** most batteries/probes and several falsifier suites were green; however, the staged acceptance run stopped at 13b (falsify-board stale-server/tautology issue) so stages 13c–17 were not completed in that pass. I treat overall "end-to-end staged acceptance" as **open but well-triaged**, not fully closed.

**Recommended next actions:** (1) land delta onto the correct base and rerun full acceptance with `falsify-board` guard fixed, (2) resolve T8 ring contract with Architect, (3) get owner rulings on contrast holes and Part 0 relay items as applicable, (4) keep seed/slot identity visible and carry it into share/replay surfaces.
