SPEAKER: beam | ROLE: council | TASK: review of 67-cakepanz-9 delivery (hosted by beam) | DATE: 2026-11-19
REVIEW-OF: _agents/beam/67-cakepanz-9-2026-11-19/ (Z.ai cakepanz-9 sitting, 2026-11-19)
VERDICT: improved

# Review — 67-cakepanz-9 (Z.ai, 2026-11-19)

Hosted byte-identical to the Owner's Desktop folder (diff -rq exit 0, node_modules excluded, 1070 files / 36 MB — matches vl's hosting receipt). Reviewed at the hosted bytes.

## What I checked (commands + results)

1. B1 (C1 defect) — `startDraft()` dispatches START before `go('board')`. Verified: `grep -n "go('board')" .../src/App.svelte` → 116 only inside startDraft, after `store.dispatch({type:'START'...})`. VERIFIED.
2. B-bis (flip removed) — `grep -rn "lateMode|simpleOff|setFullBoard|data-form" src/` → zero hits in App.svelte/DraftBoard/BoardRow except a comment in App.svelte:321 and a comment in BoardRow:4. `settings.ts` has zero `fullBoard` references. VERIFIED. late.battery.mjs + falsify-late.mjs deleted. VERIFIED.
3. C′4 (gold literals) — BoardRow/DraftBoard/BoardFooter/Feed/Saves surviving literals swapped; dark token values (tokens-w89.css lines 112/120) untouched. Spot-checked `grep -rn "#e8c87e\|#8a5f18\|#d9a94c" src/` → zero. VERIFIED.
4. C′1 (suggest ring) — `suggestIds` top-three by active order with tie extension; `.cp-suggest` on the pick control; reduced-motion honoured. VERIFIED by read.
5. C′2 (Complete roster print) — `lineupFor(mine,'4-3')` on the record, effOvr per slot, three weakest marked, reuses advice anatomy, "incomplete" only as `data-lineup` attribute. VERIFIED by read.
6. C′3 (wall-slip cascade) — CSS-only cascade, 0.86 s total, reduced-motion instant. VERIFIED by read.
7. Batteries present: board.battery.mjs (6 laws), falsify-board.mjs. late.battery deleted. shell battery 48/0 (L12 added). VERIFIED by file listing.
8. Pins unchanged: engine files untouched (diff vs git archive exit 0 per the sitting's receipts); flex census 99 rules. REPORTED (I did not re-run; the sitting's receipts h22 are the evidence).

## Defects found

- D1 (risk, not shown): the board battery's L10 walk asserts "zero USER picks" but the CPU's standard order runs ahead of the user's slot, so `picks` is non-zero. The law is correctly scoped to user picks, but a seat re-reading L10 without the WHAT-CHANGED note could misread it as "no picks at all". Calibration question for the doc: rename the assertion's variable or add a one-line comment. Low priority.
- D2 (risk): C′1 tie extension makes 38/60 rows highlight in late rounds because the VM's wins display rounds to one decimal while the engine grid is 1e-9. The code comment says so and the one-word call is on the Owner's list. Recommend: the Architect decides whether "exactly three" should be enforced by display-rounded wins (broader) or engine wins (narrower); until then, the current behaviour is defensible but surprising. Not a defect in the code — a product ruling owed.
- D3 (calibration): the board battery L13 sampled early/mid/late uses `data-id` on the row; I verified the attribute exists. The ids are asserted exact vs the VM incl. the tie extension. VERIFIED by read.

## What I did NOT run (honesty)

- I did not re-run the engine suite, the node battery, the shell/board batteries, the falsifiers, or the composites. The sitting's receipts (h1–h15 in receipts/partH-c9/) are the evidence; a verifier seat should re-run at least the board battery + falsify-board before this is REVIEWED ✓✓✓.
- I did not re-measure the pins or the flex census.
- I did not run gate-manifest / gate-numerals.

## Weakest point of the work

The delivery is internally consistent and the code changes are minimal and well-anchored, but the ONE open item (the shipped k1 composite re-run) is honestly flagged. The bigger risk is doc drift: the same fact is restated in README-DELIVERY, WHAT-CHANGED, VERIFY §22/§23, and SHELL-STATUS, and the c8-era numbers are kept as dated history. A future seat reading only one of them could quote a stale number. Recommend the Architect add a single "current numbers" line to SNAPSHOT.md as the one source of truth.

## Brainstorm — improving cakepanz / the UI-UX shell for Claude's engine

The Owner asked for implications and ideas. Ranked by (value per byte) × (buildability at today's data) × (law-ability), consistent with Z.ai's Part E. These are seeds only — nothing ships here.

1. TanStack Table (headless) for Awards / YOUR SEASON / ALL TEAMS / PLAYOFF STATS. The dashboard vision (leaderboards over the 44 keys, column facets, per-page sort) cannot stay hand-rolled without re-deriving column visibility again. ~15 KB, MIT, headless. NOT the draft board (Owner's word: the board stays a list + DRAFT button).
2. Charts only on data that exists: ECharts/Unovis, framework-agnostic, only after the Architect names the seam. "Who won MVP and why", team scoring trend, PF-vs-PA scatter — all inputs exist today. A per-week win-probability series does NOT exist in the VM; no chart touches it until the Architect says so.
3. W5 — the chosen team's colour-contrast guardrail test (zero deps): 32 team palettes × two modes measured automatically; a future token/palette pass fails the battery instead of shipping an unreadable screen. ~100 test lines; law: all 64 combos ≥4.5:1 or the failure names the team. Cheapest insurance.
4. T4/T5 — test-time only, zero product bytes: axe-core in the existing Playwright batteries + seeded visual-regression goldens. Zero axe violations at rest; 8–10 pinned goldens that re-pin on intentional changes.
5. W1 — touch/keyboard endgame drafting (arrows/Enter/D). The ≥3 highlights are the mouse path; this is the keyboard path. Screen-reader users get the same flow. DRAFT button stays primary. ~80 lines.
6. W2 — pick-complete pulse (CSS + navigator.vibrate?.(12)). Closes the loop C′3 opens. ~30 lines; law: pulse on confirmation, nothing under reduced motion.
7. W6/W7 — run recap card + draft replay at Complete, driven from the record. Every value computable from the record (priority ranks frozen at draft time). Laws: PNG/replay values equal the VM's; reduced-motion honoured.
8. T3 — lz-string, saves-only, wire-when-measured. Envelope headroom on weakest mobile Safari. Law: round-trip byte identity or it does not ship.
9. Lucide icons (@lucide/svelte) — awards/nav polish only. One source of truth for champion ceremony iconography. Behind the Owner's word.
10. PWA (vite-plugin-pwa) — MARK FOR THE OWNER, BUILD NOTHING. Saves ARE the sync story; a service worker risks stale-cache incidents against an offline-first single file. Answer is a number first (what, measurably, fails offline today?), not a dependency.

Do-not-propose list (Z.ai's §8, which I endorse): no drag-and-drop on the board (DRAFT button is the efficient interaction — Owner's word, final); no state library (a snapshot engine needs a snapshot); no UI kits (they fight the w89 identity); no virtual scroll (1.7k tiny rows render fine); no analytics/telemetry ever; no Zod/schema lib. Framework tie-in (Architect's call): if the R-13 bench expands, measure a heavy-table + dashboard surface, not the Draft Board, where the frameworks tie.

## Innovation beyond Z.ai's list

- A "what changed since last pick" diff strip on the board: the VM already computes goneOdds; surfacing the delta (which players' gone% moved most) as a one-line strip above the board costs ~20 lines and reuses existing data. Law: the strip's values equal the VM's goneOdds delta.
- A "draft replay" scrubber at Complete that walks the 32 picks in order with the same cascade timing as C′3 — turns the wall-slip reveal into the ceremony the Owner wants ("all for cinematics"). No new data; the record already has every pick.
- A single "current numbers" source-of-truth line in SNAPSHOT.md (see weakest point above) — not a feature, a doc hygiene fix that prevents future stale-number quotes.

## Verdict

ok on code (B1/B2/B-bis/C′1–C′4 verified by read + spot checks), improved on docs (stale-number drift risk named), rejected on nothing. Recommend two seats re-run the board battery + falsify-board before this carries REVIEWED ✓✓✓.
