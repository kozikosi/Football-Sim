SPEAKER: glyph | ROLE: verifier/reviewer | TASK: cakepanz-8 cross-seat review synthesis + continuation (UI/UX shell for Claude engine) | DATE: 2026-11-18T22:05:00Z

# Cakepanz-8 — other seats’ work reviewed and consolidated

**Context (VERIFIED):** Owner asked to push `/Users/kosi/Desktop/Football Sim/67-cakepanz-8-2026-11-18` to glyph branch and review; folder published at `_agents/glyph/deliveries/67-cakepanz-8-2026-11-18` on `origin/council/glyph` commit `e27df3d99952f35b6fa661b15f5d0fb39c953759`, and glyph review filed `inbox/20261118-2005-glyph-cakepanz-8-review-and-ideas.md` (`a0a127ba`). HY4 misroute ignored per Owner follow-up. This note synthesizes other seats’ pushed work (read from `origin` refs, 2026-11-18 fetch) and continues with prioritized fixes/innovations. No product, engine, governance, queue, or protected-constant edits.

## Seats reviewed (REPORTED from pushed refs/trees unless noted)

| Seat | Hosting (ref/commit, path) | Review/filing | Verdict/signal |
|---|---|---|---|
| Inkling | `origin/council/inkling@94b9ea0c`, `_agents/inkling/67-cakepanz-8-2026-11-18/`; bulletin `bulletin/20261118-1955-inkling.md` | `inbox/20261118-1954-inkling-cakepanz8-review.md` | **improved** (narrow). Byte-verified pins vs git archive (67/68), flex census 99 {0:17,2:17,6:42,12:23}, suites 394/406, node 33/33, dist/start-of-chat hashes match. Browser batteries/A2 mutation/composite not rerun; zip sha unverifiable from folder. |
| Beam | `origin/council/beam@3fa2ecb4`, `67-cakepanz-8-2026-11-18/` (root) | `inbox/20261118-1948-beam-P-337-review.md`, lane updated | **ok-with-nits**. Ran engine 394/406, gates 314/319, flex sha, diff outside engine clean, checked A1/P-337 anchors and new files. Nits: prepared extra engine file note, L4 projection scope, Owner call on 10th-pick flip, probe register note, falsify-late reverse direction. Browser/A2/fresh-clone not rerun. |
| Pickle | `origin/council/pickle@a9f6d6bf`, `_agents/pickle/deliveries/zai-cakepanz-8-2026-11-18/` + `.PROVENANCE.md`/`.SHA256SUMS` (`9a013582…d598f6d0d7b`); bulletin `bulletin/20261118-1955-pickle.md` | `inbox/20261118-1953-pickle-P-316-cakepanz8-review.md` | **improved**. Independently reran pins via git archive diff (67/68), flex census, engine 394/406, node 33/33, gates 314/319, cross-tree parity, anchors, receipt-falsifier F1–F12 all died (own run). Browser/falsify-late/acceptance composite/npm-ci rebuild/M3/takeover not rerun. |
| Ernie | `origin/council/ernie` (tip content shows delivery hosted at `_agents/ernie/deliveries/67-cakepanz-8-2026-11-18/`) | no cakepanz-8 verdict inbox found in scanned `origin/council/ernie` paths (UNKNOWN/NOT FOUND in this pass) | hosting present (REPORTED). |
| DS | `origin/council/ds` (commit subject "delivery as received... for reading; review follows"), root `67-cakepanz-8-2026-11-18/` present | no verdict file found in scanned paths (UNKNOWN/NOT FOUND) | hosting/intent present (REPORTED). |
| OR / others | OR had separate session work on tip; no cakepanz-8 verdict found in scanned paths | — | no cakepanz-8 review claim observed (REPORTED/limited scan). |

**Convergence (high confidence, cross-seat):** delivery is substantively strong and receipt-heavy — A1/A2 closures and Block B (P-337) anchors present in both trees; pins/flex/dist hashes consistent with claims; engine/node suites and gates independently reproduced by at least Inkling/Beam/Pickle in parts; receipt-falsifier F1–F12 died in Pickle’s own run. **Remaining confidence gap:** browser-level shell/slice/late batteries, A1 UI probes, A2 mutation runs, falsify-late execution, and full acceptance/fresh-clone composite are largely REPORTED (environment constraints) — independent clean-env replay remains the strongest acceptance step.

## Consolidated findings (VERIFIED in copied glyph source/logs unless labeled REPORTED)

### 1) Block B — simple-mode row expand/detail is a dead affordance (convergent: Inkling, Pickle B2; VERIFIED)
`cakepanz-4/src/lib/components/BoardRow.svelte`: simple branch renders `<button class="cp-main cp-mainsimple" onclick={() => (open = !open)} aria-expanded={open}>` but has no `{#if open}` fits/detail block; fits render only in the full branch. Tapping toggles state/ARIA without visible detail; "every number is still one click away" / "row detail" promise is only partially true (global FULL BOARD door exists). **Impact:** small UX/a11y correctness lie in the simplification layer (engine numbers unaffected). **Proposal:** render shared fits/detail on `open` in both modes (or make simple row non-expandable and adjust copy/law) + assert in late battery that a simple-row expand reveals detail.

### 2) Block B — FULL BOARD choice not persisted across mid-draft refresh; L3 overstates (convergent: Pickle B1, Beam nit/idea; VERIFIED)
`src/App.svelte`: `simpleOff` is local `$state(false)` (set by door, reset on `startDraft`), not stored in autosave/meta and not restored in `hydrateBoot()` (`src/lib/port/hydrateApp.ts` has no `simpleOff`). Mid-draft refresh (supported by Slice 3) returns to simple mode when `myPicks >= 10`. `batteries/late.battery.mjs` L3 does one further in-page pick but no reload (`grep reload` none), so "STAYS full for the rest of the draft" is only partly exercised. **Impact:** user preference lost on reload; law weaker than claim. **Proposal (render/port glue, not engine):** persist boolean in draft autosave lineage/meta (additive) and restore on hydrate; add L7 (FULL BOARD → reload with draft autosave → still full) with falsifier.

### 3) A1 routing — `syncFromHash()` bypasses done-board redirect (Inkling; VERIFIED)
`src/App.svelte`: `go()` redirects `board`→`complete` when draft done, but `syncFromHash()` does `screen = r.screen` directly on hashchange. Back/bookmark/manual `#/board` on a done draft can re-enter the board path outside `go()` (and `refresh()` still swallows goneOdds done-draft throw by design) risking blank/empty board state. **Impact:** hash/deeplink path can re-open the class A1 fixed for other paths. **Proposal:** route hash sync through `go(r.screen, r.param)` or normalize done-board in router so redirect is structural (single authority).

### 4) Block B — sort vs displayed recommendation number can disagree (Pickle B3; VERIFIED by code shape)
Simple row always displays `r.wins` as the single rec number (`BoardRow.svelte`), while footer exposes SORT toggle in simple mode and reorders rows by chosen sort. Displayed number may not explain order after non-wins sort and is unlabeled. **Impact:** clarity/trust in "simple" decision view. **Proposal:** either label the metric explicitly (`WINS`) and/or bind displayed value+label to active sort, or constrain/reset sort in simple mode with clear copy.

### 5) Receipt/log hygiene and citation precision (Inkling; VERIFIED)
- `receipts/partH-c8/f4-a1-postfix-probes.log` tail ends exit=1 (Node v24 unsupported TS syntax crash in done-draft probe section under sandbox path), though earlier probes green — cited as post-fix evidence without "attempt" labeling in text.
- `receipts/partH-c8/f5-late-and-a1-final-shipped.log` contains pre-fix L4 fail (5/1) above later green A1 done-draft block (exit 0) — mixed final/earlier states in one log.
- A3 renamed old fresh-clone log correctly; similar tail-exit/attempt discipline needed for cited probe/late logs. **Proposal:** receipt-tail gate (every cited log ends exit 0 or is named/annotated attempt; final pointer explicit) in acceptance/checklist.

### 6) Minor maintainability/readability (Inkling; VERIFIED)
`Hub.svelte` week button class uses unparenthesized `&& ||`: `n < (season.slot + 0) && season.atLastPlayed === false || n <= season.slot - 1` — precedence yields `(a && b) || c`, likely intended but ambiguous; worth parens/named derived boolean.

### 7) Flip threshold policy (Beam/Pickle/Inkling/Z.ai noted; Owner call)
Late mode flips at user's 10th pick (`myPicks >= 10`), overall 289–320 depending on slot — aligns with "ten deep rounds" UX per Q6 (REPORTED rationale) but alternative overall-320 reading exists. Not a defect; needs Owner confirmation if policy is contested.

### 8) Block C / deployment gating (REPORTED, mixed signals)
Work order ties R-13 to A/B pushed and Owner relay; gh-pages fix still unplaced and live tree stale per prior context (not re-measured here). Ambiguity on whether hosting on council branches satisfies "pushed" gate is for MUSE/Owner, not a seat.

## Prioritized continuation (actionable, no engine/pin moves)

**P0 — correctness/clarity before accepting P-337 as polished (render/port/test proposals):**
1. Persist `simpleOff` in draft autosave lineage and restore on hydrate; add reload-covering law (L7) so FULL BOARD truly "stays" across refresh.
2. Fix simple-row detail affordance (shared `{#if open}` fits block or remove toggle) and align copy/law.
3. Route `syncFromHash` through `go()` (or router-level normalization) to eliminate hash bypass of done-board redirect.
4. Make simple-mode sort/number semantics explicit (label or bind to active sort).

**P1 — trust/tooling hygiene:**
5. Receipt tail-green/attempt gate for cited logs; point WHAT-CHANGED/VERIFY at final-state logs for A1/late outcomes.
6. Parenthesize Hub week-class condition.
7. Port-layer framework-purity lint (`src/lib/port` free of framework imports) and "no black screens for reachable state×screen" invariant battery as standing shell laws.

**P2 — independent acceptance confidence:**
8. Independent clean-env replay of browser batteries, A1 probes, A2 mutation, falsify-late, and full acceptance/fresh-clone composite (seat/CI) to upgrade REPORTED UI claims.

## UI/UX shell innovation for Claude's engine (brainstorm, engine-faithful)

Ground rule: engine remains source of truth (slotWins20/model-first values, gone odds, draft/season simulation); shell projects and explains, never invents numbers.

1. **State-safe resume UX:** on boot restore show "Resumed: Pick Y / Week X" + clear recovery actions; pure `resolveLanding(draftStatus, weekState, requestedScreen)` selector to prevent future A1-class regressions.
2. **Late-board comprehension:** explicit metric label on simple rec cell (WINS/active sort), "picks until your turn" (from `oddsMeta`), and one-line "why this pick" from existing VM fields (need, flex cost, gone%, wins delta) — deterministic, no second ranking.
3. **Needs-first simple view:** optional "FILL MY NEEDS" presentation rank (view-only reorder by open-slot fit) alongside Best Available; keep VM/hash invariance law pattern (L4-style) for every mode flip.
4. **Draft Story / shareable recap at Complete:** 3–5 plain sentences from record (best value, biggest reach/risk taken, key need filled, class shape) — zero engine change, high delight/share value.
5. **One-click endgame assist (Owner-gated):** "auto-fill remaining picks" using engine’s current top recommendation with confirm preview; presentation/action convenience, not new valuation.
6. **Season continuity:** hub momentum (streak/last result/next opponent), restore-time stats recomputation from payload (avoid silent zeros), eventful 30–60s feed pacing with turnovers named and OT isolated (V23 direction) — all from engine outputs.
7. **Accessibility + 390px discipline:** ≥44px primary actions in simple mode, non-hover/touch access to gone% method, focus order/aria-live on landing/turn changes, and screenshot/visual regression states (light/dark/reduced-motion/390px/simple/full).
8. **Opt-in local tuning telemetry:** count simple/full usage and time-to-pick offline to inform P-337 threshold/policy with behavior, not only Q6 readings.

## Evidence notes
- Seat reviews read: `origin/council/inkling:inbox/20261118-1954-inkling-cakepanz8-review.md`, `origin/council/beam:inbox/20261118-1948-beam-P-337-review.md`, `origin/council/pickle:inbox/20261118-1953-pickle-P-316-cakepanz8-review.md` (+ bulletins/lanes/tips as cited).
- Local verification this pass: inspected `App.svelte`, `BoardRow.svelte`, `DraftBoard.svelte`, `BoardFooter.svelte`, `Hub.svelte`, `hydrateApp.ts`, `batteries/late.battery.mjs`; checked receipt tails `partH-c8/f4`, `f5`, `f8-a2-red/green`, `f10`, `f11`, `f12`, `b1`, gate logs.
- Not rerun by glyph this pass: full engine/shell/late/browser batteries, falsifiers, fresh-clone/acceptance composite, pin archive diffs beyond receipts/copy checks.

**Bottom line:** cakepanz-8 is a credible, well-instrumented step (A1/A2/Block B materially advanced) with convergent review confidence on core claims and a small set of concrete render-layer follow-ups (B1–B3, hash redirect, receipt hygiene) before calling P-337 fully polished. Pushed delivery + this synthesis give the Architect/Owner a merged view of seats’ work and next moves for the Claude-engine shell.
