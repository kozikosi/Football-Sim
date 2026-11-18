SPEAKER: glyph | ROLE: verifier/reviewer | TASK: cakepanz-8 delivery review + UI/UX shell innovation for Claude engine | DATE: 2026-11-18T20:05:00Z

# Glyph review — `67-cakepanz-8-2026-11-18` (Z.ai handoff) pushed to `origin/council/glyph`

## Delivery / publication (VERIFIED)
- **Source copied:** `/Users/kosi/Desktop/Football Sim/67-cakepanz-8-2026-11-18` (present, 35M, 1006 files per local scan; no `node_modules` or `.git` directories found inside copy).
- **Pushed copy:** `_agents/glyph/deliveries/67-cakepanz-8-2026-11-18` on `origin/council/glyph`.
- **Publish commit:** `e27df3d99952f35b6fa661b15f5d0fb39c953759` (VERIFIED: local HEAD == `git ls-remote --heads origin council/glyph`).
- **Key doc hashes (copied tree, VERIFIED):**
  - `README-DELIVERY.md` sha256 `68f7ae36ced98fa34e45244d626f6ebc0b60f07c1f5445fcb09f8128181644a8`
  - `WHAT-CHANGED.md` sha256 `0fa12b42ebbe43994409268f12726a75d998d2af91292eb7cf4d9289c0ce3a20`
  - `START-OF-CHAT-ZAI.md` sha256 `3c0dfd3f4d505ba4e24ead0fec07ee01097faff6ebd16edf5d4c1afc15656bde` (matches Z.ai claim of byte-identical ×3 normalization intent; copies exist in package root and both app trees)

## What I checked (VERIFIED unless noted)
- **START-OF-CHAT orient/read done:** `pwd=/Users/kosi/Desktop/wt/glyph`, branch `council/glyph`, git common dir `/Users/kosi/Desktop/Football Sim/.git`; `git fetch && sync-base.sh` reported up to date with `council/base` (864a6aa1); `node tools/preserve.mjs check` showed **glyph worktree clean/OK** (global report listed unsaved/dirty states in other worktrees elsewhere — not touched). Read `AGENTS.md`, `PROJECT-KNOWLEDGE.md` (head/current blocks), `COUNCIL-BULLETIN.md` (CURRENT ROUND), `_agents/V23-OWNER-REQUESTS.md`, `_agents/glyph/GLYPH.md`; `git fetch && git show origin/architect/engine-and-seats:tools/council.mjs > /tmp/council.mjs`; `node /tmp/council.mjs next` produced no actions (REPORTED by tool output).
- **Structure present:** `cakepanz-4/`, `cakepanz-4-prepared/`, `receipts/partH-c8/` (40 logs), `WHAT-CHANGED.md`, `README-DELIVERY.md`, `README-DELIVERY-c7.md`, `VERIFY.txt`, updated shell/manifest/receipt docs, START-OF-CHAT-ZAI copies.
- **Engine/pin posture (from copied artifacts and receipts; claims REPORTED by Z.ai receipts unless independently rerun):**
  - Shipped engine tree differs from prepared in expected pin delta only at `src/engine/sports/nfl/sim/game.ts` and `src/engine/sports/nfl/sim/passclass.ts` (+ generated engine-node counterparts/stamp) per `diff -rq` of copied trees — consistent with stated pins **5c808472 (shipped, 67 files)** vs **65673a00 (prepared, 68 files)**. I did **not** rerun `diff -rq` against remote pin worktrees in this session; receipts/logs in `partH-c8/b1-engine-diff.log` report exit 0 / file counts 67/68 and flex byte-identity across pins.
  - `dist/single.html` sha256 identical in both trees: `1529a003763459aa78ab7ef92917a136f9cc9f0d841afe1915218bde2742e737` (VERIFIED from copied files), matching README.
- **A1/A2/Block B implementation anchors inspected (VERIFIED in copied source):**
  - `src/App.svelte`: `go()` redirects finished draft board -> `complete`; `hydrateBoot()` unconditionally `go('hub')` on season autosave path; exposes `vmStore`/`go` for probes; late-mode derivation `myPicks >= 10 && $draftState?.status !== 'done' && !simpleOff` (user's own 10th pick); advice panel hidden in late/simple mode.
  - `DraftBoard.svelte`: `data-form={lateMode ? 'simple' : 'full'}`, late-mode note "the board simplified — every number is still one click away", `Best available` + `FULL BOARD` door (calls `onfullboard` -> `simpleOff=true`, sticky full), passes `simple` to rows/footer.
  - `BoardRow.svelte`: simple row renders one recommendation number (`r.wins`) + gone% tooltip/method + `DRAFT` control; full row retains expanded columns/flex chips/fits; 390px tightening kept.
  - `BoardFooter.svelte`: simple form hides secondary sorts behind `SORT` toggle.
  - New/changed artifacts present: `batteries/late.battery.mjs`, `scripts/falsify-late.mjs`, `scripts/probe-a1-landing.mjs`, `scripts/node-port-register.mjs`; node battery includes **N28 RESUME** and **N29 DONE-DRAFT**; shell battery split **S29 boot-mandatory / S31 manual restore** (47 laws).
- **Receipt evidence sampled (REPORTED by included raw logs, spot-checked tails):**
  - `f8-a2-red-shell-battery.log`: **46 pass · 1 fail**, `FAIL S29 ... boot did NOT resume the hub — S29 red`.
  - `f8-a2-green-shell-battery.log`: **47 pass · 0 fail**, `S29 ... resumed from the autosave on boot`.
  - `f10-receipt-falsifier-final-shipped.log`: F0–F12 all **DIED**, exit 0.
  - `f11-falsify-late-final-shipped.log`: F0-late 6/6, **F13-late DIED**, exit 0.
  - `g5-gate-run2-shipped.log`: **PASS (314 entries verified, dist/ covered, converse clean)**; `g5-gate-run2-prepared.log`: **PASS (319 entries verified, ...)**.
  - `f12-d1-fresh-clone-final.log`: ends with late 6/6, shell 47/0, regen 314, gate PASS 314, "every exit above must be 0".
  - `b1-engine-diff.log`: reports shipped/prepared diffs exit 0 vs pin worktrees, flex `cmp` exit 0.
- **I did not rerun** the full acceptance suite, engine tests, browser batteries, falsifiers, fresh-clone composite, or manifest/gate regeneration in this session (environment/time not exercised here). All numeric suite claims below remain **REPORTED by Z.ai artifacts** unless explicitly marked VERIFIED by my spot checks above.

## Thorough review — correctness, safety, and fit

### A1 (mid-season refresh blank board / done-draft landing) — **sound fix shape, well-lawed (REPORTED by receipts, implementation VERIFIED)**
- **Strength:** routes by actual app/session state instead of a brittle `if (!r.draft)` gate: season resume takes precedence (`hydrateBoot -> go('hub')`) and finished drafts cannot render an empty board (`go('board')` coerced to `complete`). This matches both failure modes named in Z.ai report (mid-season refresh showed board shell/empty state; done-draft refresh/DRAFT nav confusion).
- **Law quality:** N28 asserts resume-to-running-hub with both autosaves; N29 asserts done-draft -> Complete (not blank board). F11/F12 mutate the exact prior failure shape and are reported died — good tautology resistance.
- **Implication/risk:** unconditional hub redirect on week-restore is correct for "season outranks finished draft screen" but assumes week restore success implies hub is the right destination for all resumed season states; future states (offseason/review/complete season contexts) should ensure `go('hub')`/hub screen can represent or route them. `draftSaveId/draftCreatedAt` lineage handling in `loadDraft` preserves identity on slot/autosave loads — good for save continuity.

### A2 (S29 tautology split) — **high-value test-hardening (REPORTED, anchor VERIFIED)**
- Splitting boot rehydration (mandatory when autosave exists) from manual restore (S31) closes a real blind spot: a locator-only test that passed via fallback could certify a broken boot. Red 46/1 then green 47/0 is the right proof pattern.
- **Implication:** future restore-path changes must satisfy both laws; CI/acceptance scripts updated to 47/0 and F0–F12 expectation reduce drift.

### A3–A9 (receipt/doc hygiene) — **necessary delivery integrity work (REPORTED/partly VERIFIED)**
- Regenerating the fresh-clone receipt at final state, fixing stale expectations/counts, adding register line, normalizing START-OF-CHAT copies, and pasting final gate stdout in VERIFY §21 materially improve auditability. This directly addresses prior council pain: "green claim / red-ended log" and count drift.
- **Caveat:** receipt bundles remain self-authored by the executor; independent re-execution by another seat/CI is still the strongest confirmation (but this package is much more falsifiable than before).

### Block B / P-337 late-draft simple board — **good render-layer simplification, semantics guarded (implementation VERIFIED, laws REPORTED)**
- **Design:** flips at user's 10th pick (not global pick count) — aligns with "ten deep rounds for user" even when picking late (e.g. 1.32). Presentation-only state (`lateMode`, `simpleOff`, sticky full-board door) is appropriate.
- **Information architecture:** simple rows keep the decision signal (`wins` as recommendation number) + risk (`gone%` with method tooltip preserved) + action (`DRAFT`), collapse flex clutter/advice/sorts behind toggles/door; honest disclosure line is good UX/trust.
- **Guardrail:** L4 claims board VM sha identical across mode flip at frozen state — critical invariant; F13 kills always-on plant. I verified `vmStore` exposure exists for probing; I did not rerun L4 myself.
- **Potential UX/product considerations (INFERRED, not defects):**
  - "Recommendation number" shown as `wins` may need label/tooltip consistency with "Model Value/Engine Value/Priority" naming debates elsewhere (Owner-open label decision noted in project docs).
  - Simple mode still allows row expansion in current implementation? (BoardRow renders expand button in simple mode but detail block is only in full branch except simple has `open` state toggle on main; expanded `cp-fits` block is `{#if open}` in full branch only — so simple expand appears inert except aria-expanded toggle.) Minor affordance nit; verify intended.
  - Gone% method tooltip depends on `oddsMeta` timing (App catches errors during CPU pick flight) — acceptable fallback text exists.
  - 390px simple-grid tightening is present; should remain covered by L5 in both forms (REPORTED pass).

### Safety / governance boundaries
- No engine-semantic/UI-state files outside stated scope appear altered in principle (REPORTED "zero engine files, zero port changes" and `diff -rq` clean outside engine delta between trees in Z.ai claim; my sampled source diffs show render/receipt/test tooling focus). I did **not** run a full forbidden-path audit against governance-protected files in repo context because this is a copied delivery artifact, not an integration commit to product/governance surfaces.
- Pins reported held (5c808472/65673a00), GLM off, gh-pages fix not placed, Block C not started, nothing pushed by Z.ai — all consistent with handoff constraints (REPORTED).

## Further implications (INFERRED)

1. **Routing/state authority should be centralized:** A1 fixes two concrete landings, but screen resolution is now split across `go()`, `hydrateBoot()`, hash sync, and action handlers. A small pure `resolveLanding({draftStatus, hasWeek, weekPhase, requestedScreen})` function (unit-tested, N28/N29-style) would prevent regressions as season phases grow (offseason, playoffs complete, review states).
2. **Autosave/session invariants need a single "session envelope" contract:** draft + week autosaves are coupled (clearing week on new draft/load is correct). Formalize invariants: which events invalidate which slot, and precedence order on boot (season active vs finished draft vs mid-draft). This matters for Slice 3+ and future save UX.
3. **Receipt reproducibility is improving but still portable-fragile:** browser batteries/fresh-clone flows depend on Playwright, ports, Node/register behavior, and environment. Keeping composite scripts deterministic (fixed ports or dynamic allocation recorded, seeded runs where possible, artifacted screenshots/logs per law) will make third-seat verification cheaper.
4. **Late-mode threshold is a product policy encoded in UI:** "user's own 10th pick" is sensible but policy-like; expose as a named constant/config with a comment tying to Owner intent so future tuning (overall pick 320 alternative mentioned) is explicit and testable.
5. **Simple/full is a view mode, not data mode — keep it that way:** preserving VM/hash equality across flip (L4) is the right architecture. Any future "simple recommendations" must be projections of existing engine outputs, never a second ranking logic in UI.

## Brainstorm — how to improve Cakepanz / the UI-UX shell for Claude's engine

### Near-term, high leverage (render-layer, engine-faithful)
- **State-aware resume banner:** on boot restore, show a brief "Resumed: Week X / Pick Y" confirmation with one undo-safe action (e.g. "Back to draft board" / "Open saves") so users trust hydration without hunting.
- **Late-board comprehension aids:** label the single rec number explicitly ("Model wins"/current agreed label once Owner decides), add compact legend for gone% color/meaning, and show "picks until your turn: N" near the simple header (data already in `oddsMeta`) to make risk actionable.
- **Empty/error states as first-class screens:** distinguish "no dataset", "autoload refused/corrupt save (verbatim)", "CPU resolving pick", and "season not started" with recoverable actions; avoid any state that can paint chrome-only blank areas (A1 class).
- **Keyboard/a11y pass:** ensure `FULL BOARD`/`SORT`/pick controls have focus order, visible focus, aria-live for turn/landing changes, and non-hover access to gone% method text on touch.

### Mid-term shell architecture
- **Pure navigation/landing resolver + view-model selectors:** keep Svelte components dumb; derive all screen flags (`canPlayWeek`, `showComplete`, `showResumeHub`, `lateMode`) from typed selectors over store/facade snapshots. This makes N28/N29/L1-style invariants easy to extend.
- **Session timeline/debug overlay (dev-only):** show current screen, draft status, pick counts, autosave timestamps/ids, and last refusal reason. Huge value for reproducing "refresh landed wrong" or save issues without reading storage manually.
- **Progressive save UX:** explicit slot cards with "draft / week / season / autosave" provenance, build/schema lineage, and safe restore previews using existing `olderBuildNote`/refusal messaging.

### Product/UX ideas aligned with Owner direction (needs Owner/Architect calls where noted)
- **Team takeover as continuous identity, not just theme:** once team chosen, carry crest/colors into hub/bracket/awards/share cards consistently while preserving readability/contrast (contrast failures called out in VERIFY must be resolved by Owner-approved tokens).
- **Feed as an event, not a log:** staged reveal pacing (30–60s target from V23 notes), clear drive/score deltas, turnovers named, overtime isolated, and skippable-but-meaningful summaries; keep engine truth, render progressively.
- **Draft-to-season narrative continuity:** "your class" recap card, needs filled vs remaining, and week-1 context generated from draft outcomes/lineup deltas (all from existing engine/record data).
- **Trust surfaces:** always-visible provenance/mode label near numbers (already started), "how calculated" affordances for wins/gone%, and no hidden fallback values.

### Innovation experiments (low-risk spikes, render-only or separate prototypes)
- **Compare mode at 390px:** swipe/stacked comparison for lineup/player decisions instead of dense tables; preserves the phone-first "no horizontal scroll" law.
- **"Explain my next pick" drawer:** deterministic text assembled from existing board VM fields (need, flex cost, gone%, wins delta) — no LLM, no new model claims.
- **Performance budget instrumentation:** measure row count/render cost at 60/200/500 visible players and virtualize list if needed while keeping selection/focus stable.
- **Visual regression harness:** screenshot states (team/board simple/board full/hub/complete/saves refusals) in light/dark/reduced-motion/390px to catch aesthetic and overflow regressions early.

## Bottom line
- **Pushed:** full `67-cakepanz-8-2026-11-18` folder copied into this branch and published at `e27df3d99952f35b6fa661b15f5d0fb39c953759` (VERIFIED).
- **Assessment:** the package is a substantive, receipt-heavy step forward: A1 landing correctness and A2 test truthfulness are addressed with concrete laws/falsifiers, and Block B delivers a sensible late-draft simplification without (by claim/design) moving engine semantics. My confidence is highest where implementation and raw receipts align (routing split, law/falsifier additions, gate outputs, dist hash). Full-suite numeric claims remain **REPORTED by included artifacts** pending independent rerun.
- **Primary follow-up:** independent seat/CI replay of the composite acceptance legs on a clean environment, plus Owner/Architect decisions already flagged (late-mode policy wording/threshold confirmation if needed, label/contrast decisions, gh-pages placement, prepared re-pin activation timing, Block C gate).
