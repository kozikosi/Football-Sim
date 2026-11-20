SPEAKER: orcaman | ROLE: council seat (advisor) | TASK: thorough review of zip-root-cakepanz-10 (Z.ai 2026-11-20 sitting, 67 Cakepanz 11, P-317/T1-T8) + implications and UI/UX brainstorm for cakepanz/Claude engine shell | DATE: 2026-11-20T04:43Z (UTC)
FOR: Owner / Architect / council — advisory review of the published delivery artifact (not a product build; Architect owns the product/engine)
ARTIFACT: `_agents/orcaman/deliveries/zip-root-cakepanz-10/` on `council/orcaman` @ `6526a527c46aeba2827233bdcc5675f65868f1d1` (pushed, verified `git ls-remote origin council/orcaman`). Source folder copied from `/Users/kosi/Desktop/Football Sim/zip-root-cakepanz-10` (41 files, ~424 KB) at Owner request. I did **not** re-run the cakepanz batteries or acceptance script in this worktree (no `cakepanz-4` build env/node_modules installed here); claims below distinguish **VERIFIED (artifact inspection in this session)**, **REPORTED (Z.ai receipts/report in the artifact)**, and **INFERRED/UNKNOWN**.

## 1) Scope and method (VERIFIED — what I actually read)

Read in full or in targeted detail (files present in the artifact): `README.md`, `INTAKE-LEDGER-2026-11-20.md`, `deliverables/sitting-report-2026-11-20.md`, `START-OF-CHAT-ZAI.md` (§2 rewrite), `CHECKSUMS.txt`, `cakepanz-4/inbox/20261120-0420-zai-C1-ring-raw-key-request.md`, `cakepanz-4/inbox/20261120-0430-zai-T7-seat-notes-review.md`, `cakepanz-4/deliveries/receipts/contrast-audit-latest.json`, all 18 `diffs/*.diff`, `batteries/slot.battery.mjs` (full), `cakepanz-4/tools/package-delivery.sh` (full), and sampled receipt/SNAPSHOT/VERIFY structure. I did not independently execute `md5 -c CHECKSUMS.txt` against the zip root beyond the artifact's stated claim (REPORTED: "unzip -t clean, 40 entries md5-verified" in Z.ai's handoff text; checksums file is present — **VERIFIABLE** by any seat with one command).

## 2) What this delivery is (REPORTED by artifact, structurally consistent)

A single-sitting, receipt-first package for 67 Cakepanz 11 covering: engine re-pin `5c808472 → 408410477` (five paths, per SNAPSHOT procedure), T1 P-317 draft-position selector end-to-end, T2 one-click draft on ringed rows, T3 `?seed=` + visible canonical base-36 draft code, T4 gone% a11y (`aria-describedby` to `.cp-sr` + `:focus-visible`), T5 seeded visual battery, T6 contrast guardrail + `shell-status.mjs` + `package-delivery.sh`, T7 review of four 20 Nov seat notes, T8 ring raw-key/suggestions request to Architect. It explicitly names one open gate item: staged acceptance stopped at stage 13b (F20 TAUTOLOGY in `falsify-board.mjs`, attributed to missing stale-server guard / PID-port isolation compared to `shell-falsifier.mjs`), with stages 13c–17 not run in that pass. Stages 1–16 are reported green in the sitting report/receipt narrative and individual suite receipts are included.

## 3) Review of the technical changes (VERIFIED by diff/artifact inspection unless noted)

### 3.1 Engine re-pin (prerequisite) — sound in intent, correctly bounded
- **VERIFIED:** SNAPSHOT/README/MERGE* banners and VERIFY §24 document the move to `408410477`; the report states `diff -rq` exit 0 against the pin worktree for 69 engine-side files and carried suite 430/430 at the new pin. Diffs show engine paths are part of the delivered `cakepanz-4/` snapshot (I did not diff engine bytes against architect tip myself — **REPORTED**, but the receipt form is the right one).
- **Assessment:** Re-pinning to consume the store's `pickSlot` is the sanctioned mechanism (SNAPSHOT procedure) and is preferable to copying engine logic into shell. Keeping `src/engine/**` verbatim (REPORTED) is correct discipline.

### 3.2 T1 P-317 draft-position selector — the right seam, good edge handling
- **VERIFIED:** `seam.ts` diff adds/re-exports `draftOrder`. `TeamSelect.svelte` deletes local `orderWith()`/snake math and previews via store's `draftOrder(chosenIndex, chosenSlot)`; copy updated to state store trades/mirrors/restores (removes "Architect's piece pending" language). `App.svelte` parses `?seed=` (base-36 or integer 1..2^31-1, random fallback), dispatches `START { seed, userTeam, pickSlot }` only when `slot` is non-null and not the natural slot (`slot - 1 !== userTeam`), derives canonical `seedCode`, and passes `seedCode` to board. `Complete.svelte` copy corrected; share stamp carries `(code …)`.
- **Strengths (VERIFIED):** Shell does not compute draft order (single source of truth in store/engine). Natural-slot omission matches store semantics and avoids dirtying record/autosave. `parseSeed` bounds and validates input types explicitly. Seed is stateful and survives display/restore semantics by design.
- **Slot battery (VERIFIED by reading):** 27 laws split node + browser, with an **independent oracle** written from spec text (not store function) — this is excellent falsification hygiene. Covers early (Bears slot 2) and late (49ers slot 32) non-natural slots, full 1,024-order equality, displaced-team position, every logged pick on oracle, undo byte-for-byte record return, save→restore replay via shell autosave/hydration path, natural-slot omission, bad-slot rejection (33, 2.5), and real UI flow (button names slot, displaced team picks first, 3-action pick, mode lock, reload restore, late/natural browser cases, zero page errors). Uses explicit memStorage shaped to hydrateApp's StorageModule contract. Skips loudly when Playwright/server missing — correct.
- **Minor note (INFERRED):** Browser section depends on `window.__cp.store` and specific selectors/classes; robust given the in-tree dev/test hooks but coupling to DOM/test hooks is inherent (acceptable for this battery class). No issue seen.

### 3.3 T2 one-click ringed-row draft — pragmatic UX, confirm bypass is intentional and documented
- **VERIFIED:** `BoardRow.svelte` wraps row top, adds `.cp-quick` button on suggested rows: `Draft {name} at {slotLabel}` calling `(onpickDirect ?? onpick)(r.id, r.slotId)` directly (bypasses expand→chip→confirm staging). `DraftBoard.svelte` passes `onpickDirect={onpick}` (store PICK path) while keeping expand/confirm path for flex. Responsive wrap at 430px; button styled distinctly (gold pill). Board battery extended L16/L17 (REPORTED 11/0).
- **Assessment:** This matches the stated speedrun/Owner intent for ringed recommendations while preserving deliberate flex choice. Naming the slot on the button is important (player may fit several slots) — correctly done. Direct dispatch is a conscious tradeoff (speed vs accidental pick); mitigated by restricting to suggested/ringed rows and keeping undo — reasonable for now (see brainstorm on confirmation/affordance tuning).

### 3.4 T3 seed/code — replayability is a strong product primitive
- **VERIFIED:** Query parsing, canonical base-36 `seedCode` shown in footer/Complete/share stamp, seed survives save→restore (REPORTED by battery). Visual battery exercises a3f2 (genuine tie, ring=4 per C′1 rule) and k1x9, identical boards on reload, garbage/integer handling — good coverage design (REPORTED 13/0).

### 3.5 T4 accessibility — meaningful closure of D3, with honest scope
- **VERIFIED:** Gone% cell gets `aria-describedby="cp-gone-desc-{r.id}"` pointing to `.cp-sr` text (method string); hover tooltip remains `aria-hidden="true"` decorative duplicate per D3 ruling. `.cp-sr` visually-hidden style added. `:focus-visible` outlines added to main/chip/quick (and board buttons per diff). N26 re-anchored to new bytes with sr-copy assert (REPORTED in report; diff intent clear).
- **Assessment:** Programmatic method association is the right fix; keeping tooltip decorative avoids double announcement. `:focus-visible` (not blanket `:focus`) is correct for keyboard users without mouse-focus noise.

### 3.6 T5/T6 tooling and guardrails — high-value process work
- **VERIFIED:** Contrast guardrail (`contrast-audit-latest.json` present) names 3 AA holes (dark Ravens 4.21, light Chargers 4.28, light Dolphins 3.95) as KNOWN and states "a NEW hole FAILS" policy — turning known debt into a ratchet is good. `package-delivery.sh` implements previous→scratch→apply-asserted delta→fresh checksums→verify→explained entry-count delta→tree gates→refuse-to-emit; explicitly refuses on missing source/target/key issues, hash mismatch, unexplained count change, or gate failure — and the report notes its refusal path was proven by a real catch (REPORTED). `shell-status.mjs` generated status replaces hand-written rot risk (REPORTED). Falsifier anchors (F17/F20/FC/N26) re-anchored to moved bytes with intent preserved — disciplined (VERIFIED in diffs/report).

### 3.7 T7/T8 — review quality and Architect-facing contract request are solid
- **VERIFIED:** T7 gives concrete verdicts on four notes with receipts/cross-checks and useful additions (stale-copy consumer warning, advice-layer invariance mirroring Q7 for future context-aware provider, pre-committed acceptance band X/Y for post-cutover fit, `NOW.md` 16-line nit, path nit for `sim/drive.ts`/`sim/passclass.ts`). T8 clearly identifies root cause (`draftBoard.ts:61` strips `_w/_p`), explains why parsed display strings are fragile for ring semantics, compares `suggestions { ids, rankedBy, cutoffRaw, reason }` vs `rawSort`, recommends contract 1 (semantics/policy in view, kill parse, carry reason, stable advice), and states view-side readiness. This is actionable and well-reasoned.

## 4) The open gate item: stage 13b / F20 TAUTOLOGY (REPORTED, diagnosis plausible)

- **REPORTED:** Staged run green through 16 stages, stopped at 13b (exit 1): F13–F20 TAUTOLOGY on suggestion-wiring mutation (L13 stayed green) while six sibling 13b cases including re-anchored F17 died. Cause named: `falsify-board.mjs` lacks stale-server guard / PID-port isolation that `shell-falsifier.mjs` carries, so a mutant child may be served a stale build.
- **VERIFIED (partial):** `falsify-board.mjs` diff shows F17/F20 anchor updates consistent with new `pickSlot` dispatch and `onpickDirect/suggest` wiring; I did not audit the runner's server lifecycle/port isolation in this session.
- **Assessment:** Diagnosis is plausible and important — a falsifier that can read a stale served build produces false confidence and can masquerade as a TAUTOLOGY. Marking this as "not shipped green" and naming it as next FIRST fix is the honest, correct posture. **Do not treat the full staged acceptance as complete** until 13b–17 are re-run clean with the guard/port isolation carried into `falsify-board.mjs` (and receipts regenerated). This is a release-gating concern for the delta, not a reason to discard the work.

## 5) Risks, implications, and follow-ups (INFERRED/REPORTED where noted)

1. **Acceptance completeness:** Until 13b–17 pass on the final served bytes, the package is "mostly green with one named infra/falsifier defect" — consumers must not cite it as fully gate-clean. The fix is well-scoped (port stale-server guard + PID-port isolation into `falsify-board.mjs`, re-run).
2. **Contrast debt is now explicit but still user-visible:** Six named holes remain (three team inks, two light-gold2 pairs, dark rose ink) — a palette/Owner ruling is required; guardrail prevents regression but does not fix perception for affected teams/modes.
3. **Ring semantics remain display-derived until Architect lands C′1 export:** T8 is right — current string-parse tie logic is "correct by coincidence of format" in some cases; any display formatting change could silently alter ring membership. Until `suggestions` (recommended) or a numeric/raw export + exported tie walk ships, ring should be treated as advisory UI with known fragility (not engine truth).
4. **One-click direct draft UX:** Fast for speedrun flow but increases misclick cost on ringed rows (small touch targets/wrap on 390px). Undo exists, but affordance/confirmation policy may need tuning after Owner playtest (see brainstorm).
5. **Seed determinism contract:** `?seed=` + canonical code is a great share/debug primitive, but determinism depends on engine RNG/version/data parity — the artifact pins engine/data context; future consumers must keep "same seed + same pin + same pack/data" as the reproducibility contract.
6. **`package-delivery.sh` is a strong anti-rot tool** but assumes md5 tooling and the tree's gate scripts/expected env (e.g. `CP_PIN`) — portable enough for repo use, but gate pin env handling (now called out in report) must be documented wherever run.
7. **Housekeeping noted in T7:** `claude/NOW.md` at 16 lines vs ≤15 rule — minor, but worth landing by Architect/MUSE to keep governance hygiene (REPORTED/VERIFIED by T7 claim).

## 6) Implications for cakepanz as Claude's engine UI/UX shell

- **Shell/engine boundary is improving in the right direction:** re-exporting `draftOrder` through the seam and making Team Select/store consume one order source reduces "UI recomputes engine truth" drift. The T8 ring request pushes the same principle further (advice/selection semantics exported from view, not parsed from presentation strings).
- **Replayability becomes a first-class UX primitive:** seed codes in URL/footer/complete/share create a common language for bug reports, coaching, challenges, and regression reproduction — very valuable for an engine-backed product.
- **Receipt/falsifier culture is a product-quality moat:** batteries tied to spec-derived oracles, anti-rot status, refuse-to-emit packaging, and contrast ratchets reduce silent regressions as the shell grows (feed/shareables/season slices) — but only if infra defects like 13b are fixed promptly so the falsifier signal stays trustworthy.
- **A11y work (T4) sets a baseline pattern:** programmatic descriptions + visible keyboard focus should be generalized to all interactive board/chrome elements before more surfaces ship.

## 7) Brainstorm / innovation — improving cakepanz & the UI/UX shell for Claude's engine

Labeled as proposals (**IDEA**, not product changes; Architect owns engine/product). Grouped by leverage.

### A. Engine-view contracts (high leverage, reduces UI guessing)
1. **IDEA — land T8 contract 1:** export `suggestions { ids, rankedBy, cutoffRaw, reason }` (and keep it stable under snapshot/advice invariants à la Q7). Render ring and one-click affordance from it; add a `reason` tooltip/sr line so "recommended" is explained, not decorative.
2. **IDEA — expose "why now" per row from view:** a compact, structured rationale payload (e.g. top factors: positional need, value-over-replacement, gone risk, scheme/plan fit) so UI can show consistent explanations without recomputing model intent.
3. **IDEA — deterministic pick preview API:** given current state + candidate, return projected roster/needs/board impact deltas (pure, no mutation) to power hover/compare without UI-side simulation hacks.

### B. Draft-board interaction & comprehension (speed + clarity)
4. **IDEA — two-speed affordance:** keep one-click for ringed rows but add an explicit "confirm fast pick" micro-setting (or long-press on touch / modifier-click on desktop) and an immediate toast with **Undo** surfaced prominently for 3–5s after direct pick.
5. **IDEA — "on the clock" context strip:** always-visible strip showing current pick number, your next pick window, #picks until you, and which ringed targets are at risk before then (uses gone-odds/sim meta already surfaced) — turns risk into a planning aid.
6. **IDEA — compare mode:** select 2–3 players to compare raw values/need fit/gone odds side-by-side in a drawer (mobile-friendly sheet) instead of opening rows one by one.
7. **IDEA — board lenses:** quick filters/views (Best Available, By Need, Risers by gone%, Sleepers/value) that are views over engine ranking — never a second ranking — with the active lens labeled.
8. **IDEA — pick history + "what changed":** a lightweight timeline (last N picks, yours highlighted) and a "board moved since your last pick" diff cue (who jumped into/out of ring/risk band) to reduce cognitive load in long drafts.

### C. Trust, explainability, and learning (make Claude's engine legible)
9. **IDEA — explanation layers:** default = plain-language one-liner; expand = factors; expert = raw numbers/method. Keep copy factual (no invented certainty) and tie every claim to the exported reason/odds meta.
10. **IDEA — gone% honesty UI:** always pair gone% with method/sim count context (already started with T4 method text) and show confidence bands or "simulated estimate" labeling consistently, especially when samples are thin.
11. **IDEA — post-pick feedback:** after a pick, show a small delta card ("filled X, remaining needs Y, next pick in Z, board impact") to reinforce cause/effect.

### D. Reproducibility, sharing, and coaching
12. **IDEA — canonical "draft code" UX:** one-tap copy/share of `?seed=<code>` (+ team/slot context) and a "Start from this code" entry on Team Select; optionally encode team+slot in URL params for a full shareable setup (validate/guard like seed parsing).
13. **IDEA — challenge/replay links:** share a code + "beat this outcome" framing (client-side comparison) once feed/complete flows support it; aligns with speedrun/replayability goals.
14. **IDEA — debug/export bundle (dev/advanced):** one action to export seed, engine pin, pack/data hashes, pick log — accelerates council/Owner bug reports.

### E. Accessibility, performance, and polish
15. **IDEA — full keyboard draft path audit:** ensure every action reachable without pointer (row expand, chip select, confirm, quick-draft, undo, filters, dialogs) with logical tab order and focus return after pick/undo; extend probe-a11y laws accordingly.
16. **IDEA — announce dynamic updates:** use polite live regions for "on the clock", pick results, and roster/need changes so screen-reader users track state without hunting.
17. **IDEA — 390px ergonomics pass:** validate quick-draft wrapped layout, tap target sizes (>=44px), and sticky controls don't obscure rows; add a visual battery case for narrow + long-name teams/players.
18. **IDEA — motion and clarity:** honor `prefers-reduced-motion` for any future transitions; keep state changes obvious (ring, pick flash, undo) without relying on color alone.

### F. Architecture/process for future slices (feed/shareables/season)
19. **IDEA — treat falsifier infra as production code:** fix 13b (stale-server guard + port isolation in `falsify-board.mjs`) and require "served hash == built hash" assertions in every browser-falsifier child to prevent recurrence.
20. **IDEA — contract tests at the seam:** for every engine-view field the shell relies on (suggestions, raw keys, odds meta, seed/restore), add a small seam-level test so view/engine evolution fails loudly before UI parses/assumes.
21. **IDEA — contrast token strategy:** resolve the 6 named holes via token-level adjustments (per-team ink or background pairing rules) with the guardrail shrinking KNOWN set over time; avoid per-screen ad hoc overrides.

## 8) Summary verdict

- **Delivery quality:** high. The artifact is thoughtfully structured (report, diffs, receipts, tools, batteries, falsifiers, inbox requests), explicitly honest about what is and isn't green, and advances P-317/T2–T6 in a disciplined way. T1's seam choice and the independent-oracle slot battery are particularly strong.
- **Publish/review request status:** **DONE.** Folder pushed to `council/orcaman` at `6526a527c` (VERIFIED by push output + `git ls-remote`); this review pushed as an inbox file on the same branch.
- **Ship-readiness of this delta (as-is):** **NOT fully gate-green** until the named 13b falsify-board stale-server/port-isolation defect is fixed and stages 13b–17 re-run clean at final bytes (REPORTED open item). All other reviewed aspects are coherent and well-receipted per the artifact.

Labels recap: artifact contents and diffs = **VERIFIED (inspection)**; battery/acceptance outcomes and re-pin byte-identity = **REPORTED (Z.ai receipts/report)**; risk/impact/brainstorm items = **INFERRED/IDEA**.
